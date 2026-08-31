/*
 * Content Protection — UPTD Puskesmas Tanjung Pinang Kota Jambi
 *
 * Deterrent only; frontend assets remain public by design.
 */
(function () {
  'use strict';

  const editableSelector = 'input, textarea, select, [contenteditable="true"], [contenteditable=""]';
  const isEditable = target => !!(target && target.closest && target.closest(editableSelector));
  const NAV_VERSION = '2026-08-31-v6';

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
<div class="nav-item-dropdown"><a href="pelayanan.html"${linkClass('pelayanan')}>Pelayanan</a><button type="button" class="dropdown-caret-btn" aria-label="Buka submenu Pelayanan" aria-expanded="false">▾</button><div class="dropdown-menu"><a href="pelayanan.html#klaster-1">Klaster 1 — Manajemen</a><a href="pelayanan.html#klaster-2">Klaster 2 — Ibu &amp; Anak</a><a href="pelayanan.html#klaster-3">Klaster 3 — Dewasa &amp; Lansia</a><a href="pelayanan.html#klaster-4">Klaster 4 — Penyakit Menular</a><a href="pelayanan.html#klaster-5">Klaster 5 — Lintas Klaster</a></div></div>
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

  function ensureServiceBackLink() {
    const file = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
    const isServicePage = file === 'manajemen-puskesmas.html' || file.startsWith('pelayanan-');
    if (!isServicePage) return;

    const existing = document.querySelector('a.back-link');
    if (existing) {
      existing.id = 'service-back-to-hub';
      existing.href = 'pelayanan.html';
      existing.textContent = '← Kembali ke Pelayanan';
      existing.setAttribute('aria-label', 'Kembali ke Pelayanan');
      existing.classList.add('service-back-link');
      return;
    }

    if (document.getElementById('service-back-to-hub')) return;
    const container = document.querySelector('.page-content .container')
      || document.querySelector('.page-content')
      || document.querySelector('main .container')
      || document.querySelector('main');
    if (!container) return;

    const wrap = document.createElement('div');
    wrap.id = 'service-back-to-hub';
    wrap.className = 'service-backbar';
    wrap.innerHTML = '<a class="service-back-link" href="pelayanan.html" aria-label="Kembali ke Pelayanan">← Kembali ke Pelayanan</a>';
    container.insertBefore(wrap, container.firstElementChild);
  }

  function normalizeReferenceSections() {
    const candidates = document.querySelectorAll('section, details');
    candidates.forEach(container => {
      const heading = container.matches('details')
        ? container.querySelector(':scope > summary')
        : (container.querySelector(':scope > h2') || container.querySelector(':scope > h3'));
      if (!heading) return;

      const raw = heading.textContent.replace(/\s+/g, ' ').trim();
      const lower = raw.toLowerCase();
      const isReference = lower.includes('dasar hukum') || lower.includes('dasar &') || lower.includes('referensi');
      if (!isReference) return;

      container.classList.add('references-section');

      if (heading.matches('h2, h3')) {
        const prefixMatch = raw.match(/^\s*(\d+\s*[·.)-]\s*)/);
        const prefix = prefixMatch ? prefixMatch[1] : '';
        heading.textContent = `${prefix}Dasar Hukum & Referensi`;
      }
    });
  }

  function ensureKlaster1References() {
    const file = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
    if (file !== 'manajemen-puskesmas.html') return;
    if (document.getElementById('dasar-hukum-referensi')) return;

    const target = document.getElementById('standar-klaster-1');
    if (!target || !target.parentNode) return;

    const section = document.createElement('section');
    section.id = 'dasar-hukum-referensi';
    section.className = 'management-section management-preservation-added';
    section.innerHTML = `
      <h2>Dasar Hukum &amp; Referensi</h2>
      <p>Rujukan regulasi dan dokumen yang digunakan untuk menjelaskan penyelenggaraan Manajemen Puskesmas sebagai Klaster 1.</p>
      <div class="management-grid">
        <article class="management-card">
          <h3>Dasar Hukum</h3>
          <div class="management-reference-body">
            <p>Peraturan Menteri Kesehatan Nomor 19 Tahun 2024 tentang Penyelenggaraan Pusat Kesehatan Masyarakat.</p>
            <p>Keputusan Kepala UPTD Puskesmas Tanjung Pinang Nomor 39 Tahun 2026 tentang Standar Pelayanan Publik.</p>
          </div>
        </article>
        <article class="management-card">
          <h3>Referensi</h3>
          <div class="management-reference-body">
            <p>Profil UPTD Puskesmas Tanjung Pinang Kota Jambi Tahun 2025 dan pembaruan struktur manajemen 2026.</p>
            <p>Dokumen standar pelayanan dan informasi manajemen yang digunakan pada halaman Klaster 1.</p>
            <p><a href="https://jdih.kemkes.go.id/documents/peraturan-menteri-kesehatan-nomor-19-tahun-2024" target="_blank" rel="noopener noreferrer">Lihat Permenkes 19 Tahun 2024 di JDIH Kemenkes →</a></p>
          </div>
        </article>
      </div>
      <div class="admin-ref">Judul bagian dibuat tegas, sedangkan isi referensi menggunakan bobot regular/medium agar konsisten dengan standar referensi website.</div>
    `;

    const style = document.createElement('style');
    style.dataset.klaster1References = '1';
    style.textContent = `
      #dasar-hukum-referensi .management-reference-body { color:#62706c; font-size:.88rem; line-height:1.7; font-weight:500; }
      #dasar-hukum-referensi .management-reference-body p { margin:0 0 10px; }
      #dasar-hukum-referensi .management-reference-body p:last-child { margin-bottom:0; }
      #dasar-hukum-referensi .management-reference-body a { font-weight:500; }
    `;
    document.head.appendChild(style);
    target.parentNode.insertBefore(section, target);
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
      .source-list li, .source-list li strong, .refs li, .refs li strong,
      .references-section li, .references-section li strong,
      .references-section ol li, .references-section ol li strong,
      .references-section .source-list li, .references-section .source-list li strong { font-weight: 500 !important; }
      .service-backbar { margin: 0 0 18px; }
      .service-backbar a, .service-back-link { display:inline-flex; align-items:center; gap:6px; padding:9px 14px; border-radius:999px; background:#eef7f4; color:#0b5d49; border:1px solid #d8ebe5; font-size:.82rem; font-weight:800; text-decoration:none; }
      .service-backbar a:hover, .service-back-link:hover { background:#dff0ea; }
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
    normalizeReferenceSections();
    ensureKlaster1References();
    requestAnimationFrame(verifyPrimaryNavigation);
    setTimeout(verifyPrimaryNavigation, 120);
    ensureServiceBackLink();
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