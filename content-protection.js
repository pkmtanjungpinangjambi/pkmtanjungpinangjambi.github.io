/*
 * Content Protection — UPTD Puskesmas Tanjung Pinang Kota Jambi
 *
 * Deterrent only; frontend assets remain public by design.
 */
(function () {
  'use strict';

  const editableSelector = 'input, textarea, select, [contenteditable="true"], [contenteditable=""]';
  const isEditable = target => !!(target && target.closest && target.closest(editableSelector));

  function wireServiceLink(clusterSelector, targetText, href, ariaLabel) {
    if (!window.location.pathname.endsWith('pelayanan.html')) return;
    const cluster = document.querySelector(clusterSelector);
    if (!cluster) return;
    cluster.querySelectorAll('.service-link').forEach(item => {
      const title = item.querySelector('strong');
      if (!title || title.textContent.trim() !== targetText || item.closest('a')) return;
      const link = document.createElement('a');
      link.className = item.className;
      link.href = href;
      link.style.textDecoration = 'none';
      link.style.color = 'inherit';
      link.setAttribute('aria-label', ariaLabel);
      link.innerHTML = item.innerHTML;
      item.replaceWith(link);
    });
  }

  function installStyle() {
    if (document.getElementById('content-protection-style')) return;
    const style = document.createElement('style');
    style.id = 'content-protection-style';
    style.textContent = `
      body.content-protected, body.content-protected * { -webkit-user-select:none !important; -moz-user-select:none !important; user-select:none !important; }
      body.content-protected input, body.content-protected textarea, body.content-protected select, body.content-protected [contenteditable="true"], body.content-protected [contenteditable=""] { -webkit-user-select:text !important; -moz-user-select:text !important; user-select:text !important; }
      body.content-protected img, body.content-protected video { -webkit-user-drag:none !important; user-drag:none !important; }
    `;
    document.head.appendChild(style);
    document.body.classList.add('content-protected');
  }

  function blockEvent(event) { if (!isEditable(event.target)) event.preventDefault(); }
  document.addEventListener('copy', blockEvent, true);
  document.addEventListener('cut', blockEvent, true);
  document.addEventListener('contextmenu', event => { if (!isEditable(event.target)) event.preventDefault(); }, true);
  document.addEventListener('dragstart', event => { if (!isEditable(event.target)) event.preventDefault(); }, true);
  document.addEventListener('keydown', event => {
    if (isEditable(event.target)) return;
    const key = String(event.key || '').toLowerCase();
    const modifier = event.ctrlKey || event.metaKey;
    const blocked = (modifier && ['c','x','u','s'].includes(key)) || (modifier && event.shiftKey && ['i','j','c'].includes(key)) || event.key === 'F12';
    if (blocked) { event.preventDefault(); event.stopPropagation(); }
  }, true);

  function init() {
    installStyle();
    wireServiceLink('details.cluster-2', 'Pelayanan Kesehatan Ibu Hamil, Bersalin, dan Nifas', 'pelayanan-ibu-hamil-bersalin-nifas.html', 'Buka Pelayanan Kesehatan Ibu Hamil, Bersalin, dan Nifas');
    wireServiceLink('details.cluster-2', 'Pelayanan Anak', 'pelayanan-anak.html', 'Buka Pelayanan Anak');
    wireServiceLink('details.cluster-2', 'Pelayanan Imunisasi', 'pelayanan-imunisasi.html', 'Buka Pelayanan Imunisasi');
    wireServiceLink('details.cluster-2', 'Pelayanan Tumbuh Kembang Anak', 'pelayanan-tumbuh-kembang-anak.html', 'Buka Pelayanan Tumbuh Kembang Anak');
    wireServiceLink('details.cluster-3', 'Pelayanan Kesehatan Usia Dewasa', 'pelayanan-kesehatan-dewasa.html', 'Buka Pelayanan Kesehatan Usia Dewasa');
    wireServiceLink('details.cluster-3', 'Pelayanan Kesehatan Lansia', 'pelayanan-kesehatan-lansia.html', 'Buka Pelayanan Kesehatan Lansia');
    wireServiceLink('details.cluster-3', 'Pelayanan Keluarga Berencana (KB)', 'pelayanan-kb.html', 'Buka Pelayanan Keluarga Berencana');
    wireServiceLink('details.cluster-3', 'Pelayanan Calon Pengantin (Caten)', 'pelayanan-catin.html', 'Buka Pelayanan Calon Pengantin');
    wireServiceLink('details.cluster-3', 'Pelayanan UBM (Upaya Berhenti Merokok)', 'pelayanan-ubm.html', 'Buka Pelayanan UBM');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();