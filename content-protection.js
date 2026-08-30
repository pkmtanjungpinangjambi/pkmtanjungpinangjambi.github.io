/*
 * Content Protection — UPTD Puskesmas Tanjung Pinang Kota Jambi
 *
 * Deterrent only; frontend assets remain public by design.
 */
(function () {
  'use strict';

  const editableSelector = 'input, textarea, select, [contenteditable="true"], [contenteditable=""]';
  const isEditable = target => !!(target && target.closest && target.closest(editableSelector));
  const NAV_VERSION = '2026-08-30-v3';

  function normalizePrimaryNavigation() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    const file = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
    let active = 'informasi';
    if (file === 'index.html' || file === '') active = 'home';
    else if (file.startsWith('profil') || file === 'struktur.html') active = 'profil';
    else if (file === 'pelayanan.html' || file.startsWith('pelayanan-') || file === 'manajemen-puskesmas.html' || file === 'jadwal.html' || file === 'tarif.html') active = 'pelayanan';

    const oldCta = nav.querySelector('.nav-cta');
    const cta = oldCta ? oldCta.outerHTML : '<a class="nav-cta" href="https://wa.me/6282180622274" target="_blank" rel="noopener">WhatsApp</a>';

    const linkClass = key => key === active ? ' class="active"' : '';
    nav.innerHTML = `
<a href="index.html"${linkClass('home')}>Beranda</a>
<div class="nav-item-dropdown"><a href="profil.html"${linkClass('profil')}>Profil</a><button type="button" class="dropdown-caret-btn" aria-label="Buka submenu Profil" aria-expanded="false">▾</button><div class="dropdown-menu"><a href="profil.html#sejarah">Sejarah</a><a href="profil.html#visi-misi">Visi &amp; Misi</a><a href="profil.html#motto-tata-nilai">Motto &amp; Tata Nilai</a><a href="profil.html#karakter">Karakteristik &amp; Kekuatan</a></div></div>
<div class="nav-item-dropdown"><a href="pelayanan.html"${linkClass('pelayanan')}>Pelayanan</a><button type="button" class="dropdown-caret-btn" aria-label="Buka submenu Pelayanan" aria-expanded="false">▾</button><div class="dropdown-menu"><a href="pelayanan.html#klaster-1">Klaster 1 — Manajemen</a><a href="pelayanan-klaster-2-ibu-anak.html">Klaster 2 — Ibu &amp; Anak</a><a href="pelayanan.html#klaster-3">Klaster 3 — Dewasa &amp; Lansia</a><a href="pelayanan.html#klaster-4">Klaster 4 — Penyakit Menular</a><a href="pelayanan.html#klaster-5">Klaster 5 — Lintas Klaster</a></div></div>
<div class="nav-item-dropdown"><a href="informasi.html"${linkClass('informasi')}>Informasi</a><button type="button" class="dropdown-caret-btn" aria-label="Buka submenu Informasi" aria-expanded="false">▾</button><div class="dropdown-menu"><a href="index.html#pengumuman">Pengumuman</a><a href="index.html#berita">Berita &amp; Kegiatan</a><a href="informasi.html">Galeri Foto &amp; Video</a><a href="edukasi.html">Edukasi</a><a href="program.html">Program &amp; Inovasi</a><a href="index.html#ilp">Informasi ILP</a><a href="download.html">Download</a><a href="kontak.html">Kontak &amp; Lokasi</a></div></div>
${cta}`;

    nav.dataset.primaryNavigationVersion = NAV_VERSION;

    nav.querySelectorAll('.dropdown-caret-btn').forEach(btn => {
      btn.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        const parent = btn.closest('.nav-item-dropdown');
        const wasOpen = parent.classList.contains('open');
        nav.querySelectorAll('.nav-item-dropdown.open').forEach(drop => {
          drop.classList.remove('open');
          const control = drop.querySelector('.dropdown-caret-btn');
          if (control) control.setAttribute('aria-expanded', 'false');
        });
        if (!wasOpen) {
          parent.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  function verifyPrimaryNavigation() {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    const topLevel = Array.from(nav.children);
    const labels = topLevel.map(item => {
      const link = item.matches('a') ? item : item.querySelector(':scope > a');
      return link ? link.textContent.trim() : '';
    }).filter(Boolean);
    const valid = labels.slice(0, 5).join('|');
    if (nav.dataset.primaryNavigationVersion !== NAV_VERSION || /Manajemen Utama/i.test(valid) || /Manajemen Puskesmas/i.test(valid)) {
      normalizePrimaryNavigation();
    }
  }

  function wireNavigationGuard() {
    const nav = document.querySelector('.nav');
    if (!nav || nav.dataset.primaryNavigationGuard === '1') return;
    nav.dataset.primaryNavigationGuard = '1';
    let scheduled = false;
    const observer = new MutationObserver(() => {
      if (scheduled) return;
      scheduled = true;
      queueMicrotask(() => {
        scheduled = false;
        verifyPrimaryNavigation();
      });
    });
    observer.observe(nav, { childList: true, subtree: true });
  }

  function ensureManagementBackLink() {
    if (!window.location.pathname.toLowerCase().endsWith('manajemen-puskesmas.html')) return;
    if (document.getElementById('management-back-to-services')) return;
    const anchor = document.querySelector('.management-intro') || document.querySelector('.page-content .container');
    if (!anchor || !anchor.parentNode) return;

    const wrap = document.createElement('div');
    wrap.id = 'management-back-to-services';
    wrap.className = 'management-backbar';
    wrap.innerHTML = '<a href="pelayanan.html#klaster-1" aria-label="Kembali ke Pelayanan semua klaster">← Kembali ke Pelayanan · Semua Klaster</a>';
    anchor.parentNode.insertBefore(wrap, anchor);
  }

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
      .source-list li, .source-list li strong, .refs li, .refs li strong { font-weight: 500 !important; }
      .management-backbar { margin: 0 0 18px; }
      .management-backbar a { display:inline-flex; align-items:center; gap:6px; padding:9px 14px; border-radius:999px; background:#eef7f4; color:#0b5d49; border:1px solid #d8ebe5; font-size:.82rem; font-weight:800; text-decoration:none; }
      .management-backbar a:hover { background:#dff0ea; }
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
    normalizePrimaryNavigation();
    installStyle();
    wireNavigationGuard();
    requestAnimationFrame(verifyPrimaryNavigation);
    setTimeout(verifyPrimaryNavigation, 120);
    ensureManagementBackLink();
    wireServiceLink('details.cluster-2', 'Pelayanan Kesehatan Ibu Hamil, Bersalin, dan Nifas', 'pelayanan-ibu-hamil-bersalin-nifas.html', 'Buka Pelayanan Kesehatan Ibu Hamil, Bersalin, dan Nifas');
    wireServiceLink('details.cluster-2', 'Pelayanan Anak', 'pelayanan-anak.html', 'Buka Pelayanan Anak');
    wireServiceLink('details.cluster-2', 'Pelayanan Imunisasi', 'pelayanan-imunisasi.html', 'Buka Pelayanan Imunisasi');
    wireServiceLink('details.cluster-2', 'Pelayanan Tumbuh Kembang Anak', 'pelayanan-tumbuh-kembang-anak.html', 'Buka Pelayanan Tumbuh Kembang Anak');
    wireServiceLink('details.cluster-3', 'Pelayanan Kesehatan Usia Dewasa', 'pelayanan-kesehatan-dewasa.html', 'Buka Pelayanan Kesehatan Usia Dewasa');
    wireServiceLink('details.cluster-3', 'Pelayanan Kesehatan Lansia', 'pelayanan-kesehatan-lansia.html', 'Buka Pelayanan Kesehatan Lansia');
    wireServiceLink('details.cluster-3', 'Pelayanan Keluarga Berencana (KB)', 'pelayanan-kb.html', 'Buka Pelayanan Keluarga Berencana');
    wireServiceLink('details.cluster-3', 'Pelayanan Calon Pengantin (Caten)', 'pelayanan-catin.html', 'Buka Pelayanan Calon Pengantin');
    wireServiceLink('details.cluster-3', 'Pelayanan UBM (Upaya Berhenti Merokok)', 'pelayanan-ubm.html', 'Buka Pelayanan UBM');
    wireServiceLink('details.cluster-4', 'Pelayanan Penyakit Tuberkulosis', 'pelayanan-tuberkulosis.html', 'Buka Pelayanan Penyakit Tuberkulosis');
    wireServiceLink('details.cluster-4', 'Pelayanan PDP, VCT dan IMS', 'pelayanan-pdp-vct-ims.html', 'Buka Pelayanan PDP, VCT dan IMS');
    wireServiceLink('details.cluster-4', 'Pelayanan Klinik Sanitasi', 'pelayanan-klinik-sanitasi.html', 'Buka Pelayanan Klinik Sanitasi');
    wireServiceLink('details.cluster-4', 'Pelayanan Gigitan Hewan Pembawa Rabies (GHPR)', 'pelayanan-ghpr.html', 'Buka Pelayanan Gigitan Hewan Pembawa Rabies');
    wireServiceLink('details.cluster-4', 'Pelayanan Penanggulangan Krisis Kesehatan', 'pelayanan-krisis-kesehatan.html', 'Buka Pelayanan Penanggulangan Krisis Kesehatan');
    wireServiceLink('details.cluster-5', 'Pelayanan Kesehatan Gigi dan Mulut', 'pelayanan-kesehatan-gigi-mulut.html', 'Buka Pelayanan Kesehatan Gigi dan Mulut');
    wireServiceLink('details.cluster-5', 'Pelayanan Gawat Darurat', 'pelayanan-gawat-darurat.html', 'Buka Pelayanan Gawat Darurat');
    wireServiceLink('details.cluster-5', 'Pelayanan Laboratorium', 'pelayanan-laboratorium.html', 'Buka Pelayanan Laboratorium');
    wireServiceLink('details.cluster-5', 'Pelayanan Resep Obat', 'pelayanan-resep-obat.html', 'Buka Pelayanan Resep Obat');
    wireServiceLink('details.cluster-5', 'Pelayanan CKG (Cek Kesehatan Gratis)', 'pelayanan-ckg.html', 'Buka Pelayanan Cek Kesehatan Gratis');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();