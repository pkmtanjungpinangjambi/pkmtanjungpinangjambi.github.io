/*
 * Content Protection — UPTD Puskesmas Tanjung Pinang Kota Jambi
 *
 * This is a deterrent layer only. It cannot make public web assets impossible
 * to copy because browsers must receive HTML/CSS/JS/media to render the site.
 * Do not place secrets or patient data in frontend code.
 */
(function () {
  'use strict';

  const editableSelector = 'input, textarea, select, [contenteditable="true"], [contenteditable=""]';

  function isEditable(target) {
    return !!(target && target.closest && target.closest(editableSelector));
  }

  function wireServiceLink(targetText, href, ariaLabel) {
    const path = window.location.pathname || '';
    if (!path.endsWith('pelayanan.html')) return;

    const cluster = document.querySelector('details.cluster-2');
    if (!cluster) return;

    const items = cluster.querySelectorAll('.service-link');
    items.forEach(function (item) {
      const title = item.querySelector('strong');
      if (!title || title.textContent.trim() !== targetText) return;
      if (item.closest('a')) return;

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
      body.content-protected,
      body.content-protected * {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        user-select: none !important;
      }
      body.content-protected input,
      body.content-protected textarea,
      body.content-protected select,
      body.content-protected [contenteditable="true"],
      body.content-protected [contenteditable=""] {
        -webkit-user-select: text !important;
        -moz-user-select: text !important;
        user-select: text !important;
      }
      body.content-protected img,
      body.content-protected video {
        -webkit-user-drag: none !important;
        user-drag: none !important;
      }
    `;
    document.head.appendChild(style);
    document.body.classList.add('content-protected');
  }

  function blockEvent(event) {
    if (!isEditable(event.target)) event.preventDefault();
  }

  document.addEventListener('copy', blockEvent, true);
  document.addEventListener('cut', blockEvent, true);
  document.addEventListener('contextmenu', function (event) {
    if (!isEditable(event.target)) event.preventDefault();
  }, true);
  document.addEventListener('dragstart', function (event) {
    if (!isEditable(event.target)) event.preventDefault();
  }, true);
  document.addEventListener('keydown', function (event) {
    if (isEditable(event.target)) return;
    const key = String(event.key || '').toLowerCase();
    const modifier = event.ctrlKey || event.metaKey;
    const blocked =
      (modifier && ['c', 'x', 'u', 's'].includes(key)) ||
      (modifier && event.shiftKey && ['i', 'j', 'c'].includes(key)) ||
      event.key === 'F12';
    if (blocked) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, true);

  function init() {
    installStyle();
    wireServiceLink('Pelayanan Kesehatan Ibu Hamil, Bersalin, dan Nifas', 'pelayanan-ibu-hamil-bersalin-nifas.html', 'Buka Pelayanan Kesehatan Ibu Hamil, Bersalin, dan Nifas');
    wireServiceLink('Pelayanan Anak', 'pelayanan-anak.html', 'Buka Pelayanan Anak');
    wireServiceLink('Pelayanan Imunisasi', 'pelayanan-imunisasi.html', 'Buka Pelayanan Imunisasi');
    wireServiceLink('Pelayanan Tumbuh Kembang Anak', 'pelayanan-tumbuh-kembang-anak.html', 'Buka Pelayanan Tumbuh Kembang Anak');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
