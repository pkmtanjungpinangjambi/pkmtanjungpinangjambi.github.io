/*
 * Unified navigation bootstrap — UPTD Puskesmas Tanjung Pinang Kota Jambi
 * Keeps the original site logic intact while centralizing service navigation.
 */
(function () {
  'use strict';

  const file = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const isServicePage = file === 'manajemen-puskesmas.html' || file.startsWith('pelayanan-');

  function canonicalNavigation() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    const active = file === 'index.html' || file === '' ? 'home'
      : (file.startsWith('profil') || file === 'struktur.html') ? 'profil'
      : (file === 'pelayanan.html' || file.startsWith('pelayanan-') || file === 'manajemen-puskesmas.html' || file === 'jadwal.html' || file === 'tarif.html') ? 'pelayanan'
      : 'informasi';

    const oldCta = nav.querySelector('.nav-cta');
    const cta = oldCta ? oldCta.outerHTML : '<a class="nav-cta" href="https://wa.me/6282180622274" target="_blank" rel="noopener">WhatsApp</a>';
    const cls = key => key === active ? ' class="active"' : '';

    nav.innerHTML = `
<a href="index.html"${cls('home')}>Beranda</a>
<div class="nav-item-dropdown"><a href="profil.html"${cls('profil')}>Profil</a><button type="button" class="dropdown-caret-btn" aria-label="Buka submenu Profil" aria-expanded="false">▾</button><div class="dropdown-menu"><a href="profil.html#sejarah">Sejarah</a><a href="profil.html#visi-misi">Visi &amp; Misi</a><a href="profil.html#motto-tata-nilai">Motto &amp; Tata Nilai</a><a href="profil.html#karakter">Karakteristik &amp; Kekuatan</a></div></div>
<div class="nav-item-dropdown"><a href="pelayanan.html"${cls('pelayanan')}>Pelayanan</a><button type="button" class="dropdown-caret-btn" aria-label="Buka submenu Pelayanan" aria-expanded="false">▾</button><div class="dropdown-menu"><a href="pelayanan.html#klaster-1">Klaster 1 — Manajemen</a><a href="pelayanan-klaster-2-ibu-anak.html">Klaster 2 — Ibu &amp; Anak</a><a href="pelayanan.html#klaster-3">Klaster 3 — Dewasa &amp; Lansia</a><a href="pelayanan.html#klaster-4">Klaster 4 — Penyakit Menular</a><a href="pelayanan.html#klaster-5">Klaster 5 — Lintas Klaster</a></div></div>
<div class="nav-item-dropdown"><a href="informasi.html"${cls('informasi')}>Informasi</a><button type="button" class="dropdown-caret-btn" aria-label="Buka submenu Informasi" aria-expanded="false">▾</button><div class="dropdown-menu"><a href="index.html#pengumuman">Pengumuman</a><a href="index.html#berita">Berita &amp; Kegiatan</a><a href="informasi.html">Galeri Foto &amp; Video</a><a href="edukasi.html">Edukasi</a><a href="program.html">Program &amp; Inovasi</a><a href="index.html#ilp">Informasi ILP</a><a href="download.html">Download</a><a href="kontak.html">Kontak &amp; Lokasi</a></div></div>
${cta}`;
  }

  function bindDropdownCaretControls() {
    const nav = document.querySelector('.nav');
    if (!nav || nav.dataset.dropdownCaretReady === '1') return;
    nav.dataset.dropdownCaretReady = '1';

    nav.addEventListener('click', event => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const button = target.closest('.dropdown-caret-btn');
      if (!button || !nav.contains(button)) return;

      event.preventDefault();
      event.stopPropagation();

      const parent = button.closest('.nav-item-dropdown');
      if (!parent) return;

      const shouldOpen = !parent.classList.contains('open');
      nav.querySelectorAll('.nav-item-dropdown.open').forEach(item => {
        item.classList.remove('open');
        const caret = item.querySelector('.dropdown-caret-btn');
        if (caret) caret.setAttribute('aria-expanded', 'false');
      });

      if (shouldOpen) {
        parent.classList.add('open');
        button.setAttribute('aria-expanded', 'true');
      }
    }, true);
  }

  function normalizeManagementContent() {
    if (file !== 'manajemen-puskesmas.html') return;

    const intro = document.querySelector('.management-intro');
    const introText = intro?.querySelector('p');
    if (introText) {
      introText.textContent = introText.textContent.replace(
        'sedangkan menu Pelayanan berfokus pada Klaster 2–5.',
        'sedangkan menu Pelayanan mencakup Klaster 1–5.'
      );
    }

    document.querySelectorAll('.management-section .admin-ref').forEach(ref => {
      const firstStrong = ref.querySelector('strong');
      if (firstStrong && firstStrong.textContent.trim() === 'Rujukan utama:') {
        firstStrong.textContent = 'Dasar Hukum & Referensi:';
      }
      if (firstStrong && firstStrong.textContent.trim() === 'Dasar konten:') {
        firstStrong.textContent = 'Dasar Hukum & Referensi:';
      }
      ref.querySelectorAll('strong').forEach(strong => {
        if (strong.textContent.trim() === 'Sumber:') strong.textContent = 'Referensi:';
      });
    });
  }

  function ensureServiceBackLink() {
    if (!isServicePage || document.getElementById('service-back-to-hub')) return;

    const existing = document.querySelector('a.back-link');
    if (existing) {
      existing.id = 'service-back-to-hub';
      existing.href = 'pelayanan.html';
      existing.textContent = '← Kembali ke Pelayanan';
      existing.setAttribute('aria-label', 'Kembali ke Pelayanan');
      existing.classList.add('service-back-link');
      return;
    }

    const container = document.querySelector('.page-content .container')
      || document.querySelector('.page-content')
      || document.querySelector('main .container')
      || document.querySelector('main');
    if (!container) return;

    const link = document.createElement('a');
    link.id = 'service-back-to-hub';
    link.className = 'back-link service-back-link';
    link.href = 'pelayanan.html';
    link.setAttribute('aria-label', 'Kembali ke Pelayanan');
    link.textContent = '← Kembali ke Pelayanan';
    container.insertBefore(link, container.firstElementChild);
  }

  function installNavigationStyle() {
    if (document.getElementById('unified-service-navigation-style')) return;
    const style = document.createElement('style');
    style.id = 'unified-service-navigation-style';
    style.textContent = `
      .service-back-link { display:inline-flex; align-items:center; gap:6px; margin:0 0 20px; padding:9px 14px; border-radius:999px; background:#eef7f4; color:#0b5d49; border:1px solid #d8ebe5; font-size:.82rem; font-weight:800; text-decoration:none; }
      .service-back-link:hover { background:#dff0ea; text-decoration:none; }
    `;
    document.head.appendChild(style);
  }

  function loadOriginalScript() {
    if (window.__PKM_ORIGINAL_SCRIPT_LOADED) return;
    window.__PKM_ORIGINAL_SCRIPT_LOADED = true;
    const script = document.createElement('script');
    script.src = 'script-original.js?v=20260830-nav';
    script.defer = true;
    document.head.appendChild(script);
  }

  function loadSocialChannelsScript() {
    if (file !== 'informasi.html') return;
    if (window.__PKM_SOCIAL_CHANNELS_SCRIPT_LOADED) return;
    window.__PKM_SOCIAL_CHANNELS_SCRIPT_LOADED = true;
    const script = document.createElement('script');
    script.src = 'social-channels.js?v=20260901-social1';
    script.defer = true;
    document.head.appendChild(script);
  }

  canonicalNavigation();
  bindDropdownCaretControls();
  normalizeManagementContent();
  installNavigationStyle();
  ensureServiceBackLink();
  loadOriginalScript();
  loadSocialChannelsScript();
})();
