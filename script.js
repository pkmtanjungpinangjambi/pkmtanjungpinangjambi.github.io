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
<div class="nav-item-dropdown"><a href="pelayanan.html"${cls('pelayanan')}>Pelayanan</a><button type="button" class="dropdown-caret-btn" aria-label="Buka submenu Pelayanan" aria-expanded="false">▾</button><div class="dropdown-menu"><a href="pelayanan.html#klaster-1">Klaster 1 — Manajemen</a><a href="pelayanan.html#klaster-2">Klaster 2 — Ibu &amp; Anak</a><a href="pelayanan.html#klaster-3">Klaster 3 — Dewasa &amp; Lansia</a><a href="pelayanan.html#klaster-4">Klaster 4 — Penyakit Menular</a><a href="pelayanan.html#klaster-5">Klaster 5 — Lintas Klaster</a></div></div>
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

  function normalizeInformationContent() {
    const infoPages = new Set(['informasi.html', 'edukasi.html', 'program.html', 'download.html']);
    if (!infoPages.has(file)) return;

    const topbarAddress = document.querySelector('.topbar-inner span:first-child');
    if (topbarAddress) {
      topbarAddress.textContent = '📍 Jl. Taruma Negara No. 50, Kel. Tanjung Pinang, Kec. Jambi Timur, Kota Jambi';
    }

    if (!document.getElementById('information-correlation-style')) {
      const style = document.createElement('style');
      style.id = 'information-correlation-style';
      style.textContent = `
        .info-correlation-box{margin:22px 0;padding:18px;border:1px solid #dbe8e3;border-radius:16px;background:#f7fbf9}
        .info-correlation-box h2{margin:0 0 7px;color:#0b5d49;font-size:1.15rem}
        .info-correlation-box p{margin:0;color:#60706b;font-size:.86rem;line-height:1.65}
        .info-correlation-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-top:14px}
        .info-correlation-item{display:block;padding:13px 14px;border:1px solid #dfe9e5;border-radius:12px;background:#fff;text-decoration:none;color:inherit}
        .info-correlation-item strong{display:block;color:#0b5d49;font-size:.88rem;margin-bottom:4px}
        .info-correlation-item span{display:block;color:#68756f;font-size:.78rem;line-height:1.55}
        .info-correlation-tag{display:inline-flex;margin-top:10px;padding:5px 9px;border-radius:999px;background:#eef7f4;color:#0b5d49;border:1px solid #d8ebe5;font-size:.72rem;font-weight:800}
        @media(max-width:760px){.info-correlation-grid{grid-template-columns:1fr}}
      `;
      document.head.appendChild(style);
    }

    const addTag = (card, text) => {
      if (!card || card.querySelector('.info-correlation-tag')) return;
      const tag = document.createElement('span');
      tag.className = 'info-correlation-tag';
      tag.textContent = text;
      card.appendChild(tag);
    };

    if (file === 'edukasi.html') {
      const cards = document.querySelectorAll('.cards .card');
      addTag(cards[0], 'Korelasi: Klaster 4 — Penanggulangan Penyakit Menular');
      addTag(cards[1], 'Korelasi: lintas siklus hidup → tindak lanjut sesuai hasil pemeriksaan');
      addTag(cards[2], 'Korelasi: dokumentasi & edukasi seluruh klaster');
      addTag(cards[3], 'Korelasi: komunikasi & edukasi seluruh klaster');
    }

    if (file === 'program.html') {
      const cards = document.querySelectorAll('.cards .card');
      addTag(cards[0], 'Korelasi: struktur Pelayanan Klaster 1–5');
      addTag(cards[1], 'Korelasi: Profil → Motto & Tata Nilai');
      addTag(cards[2], 'Korelasi: Beranda → ILP & seluruh klaster');
      addTag(cards[3], 'Korelasi: Manajemen → mutu, evaluasi & perbaikan');
    }

    if (file === 'download.html' && !document.getElementById('download-correlation')) {
      const list = document.querySelector('.page-content .container ul');
      if (list) {
        const box = document.createElement('section');
        box.id = 'download-correlation';
        box.className = 'info-correlation-box';
        box.innerHTML = `
          <h2>Korelasi Dokumen dengan Pelayanan</h2>
          <p>Dokumen unduhan menjadi bukti pendukung tata kelola dan mutu pelayanan. Sebagian besar terkait langsung dengan Klaster 1 — Manajemen, sementara penggunaannya mendukung seluruh klaster pelayanan.</p>
          <div class="info-correlation-grid">
            <a class="info-correlation-item" href="pelayanan.html#klaster-1"><strong>Klaster 1 — Manajemen</strong><span>Standar pelayanan, maklumat, struktur, dan pengelolaan mutu.</span></a>
            <a class="info-correlation-item" href="kontak.html"><strong>Pengaduan &amp; Kontak</strong><span>Mekanisme konsultasi/pengaduan dan kanal komunikasi masyarakat.</span></a>
            <a class="info-correlation-item" href="index.html#ilp"><strong>ILP &amp; Pelayanan</strong><span>Dokumen dan informasi pendukung dalam kerangka pelayanan primer terintegrasi.</span></a>
          </div>`;
        list.insertAdjacentElement('beforebegin', box);
      }
    }

    if (file === 'informasi.html' && !document.getElementById('information-correlation')) {
      const toolbar = document.querySelector('.galeri-toolbar');
      if (toolbar) {
        const box = document.createElement('section');
        box.id = 'information-correlation';
        box.className = 'info-correlation-box';
        box.innerHTML = `
          <h2>Peta Korelasi Informasi</h2>
          <p>Menu Informasi bukan berdiri sendiri. Setiap bagian mengarahkan masyarakat dari informasi umum menuju edukasi, program, layanan ILP, dokumen resmi, dan kanal komunikasi.</p>
          <div class="info-correlation-grid">
            <a class="info-correlation-item" href="index.html#pengumuman"><strong>Pengumuman</strong><span>Informasi resmi dan pemberitahuan terbaru.</span></a>
            <a class="info-correlation-item" href="index.html#berita"><strong>Berita &amp; Kegiatan</strong><span>Aktivitas dan capaian Puskesmas yang dapat didokumentasikan di galeri.</span></a>
            <a class="info-correlation-item" href="edukasi.html"><strong>Edukasi Kesehatan</strong><span>Materi kesehatan yang dikaitkan dengan kebutuhan siklus hidup dan klaster layanan.</span></a>
            <a class="info-correlation-item" href="program.html"><strong>Program &amp; Inovasi</strong><span>Hubungan program, ILP, budaya pelayanan, dan mutu.</span></a>
            <a class="info-correlation-item" href="index.html#ilp"><strong>Informasi ILP</strong><span>Kerangka lima klaster sebagai struktur utama pelayanan.</span></a>
            <a class="info-correlation-item" href="download.html"><strong>Download</strong><span>Dokumen pendukung, standar pelayanan, dan bukti mutu.</span></a>
          </div>`;
        toolbar.insertAdjacentElement('afterend', box);
      }
    }
  }

  function normalizeKlaster2Content() {
    if (file === 'pelayanan-klaster-2-ibu-anak.html') {
      const sasaranNote = document.querySelector('#sasaran > p');
      if (sasaranNote) {
        sasaranNote.textContent = 'Dalam kerangka ILP, sasaran Klaster 2 mencakup ibu hamil, ibu bersalin, ibu nifas, bayi, balita/anak prasekolah, anak usia sekolah, dan remaja. Lima kartu di bawah merupakan pengelompokan tampilan agar mudah dipahami.';
      }

      if (!document.getElementById('klaster2-correlation-style')) {
        const style = document.createElement('style');
        style.id = 'klaster2-correlation-style';
        style.textContent = `
          .klaster2-correlation{margin-top:18px;padding:18px;border:1px solid #dbe8e3;border-radius:16px;background:#f7fbf9}
          .klaster2-correlation h3{margin:0 0 7px;color:#0b5d49;font-size:1rem}
          .klaster2-correlation p{margin:0;color:#60706b;font-size:.82rem;line-height:1.6}
          .klaster2-correlation-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:9px;margin-top:13px}
          .klaster2-correlation-item{display:block;padding:12px;border:1px solid #dfe9e5;border-radius:12px;background:#fff;text-decoration:none}
          .klaster2-correlation-item strong{display:block;color:#0b5d49;font-size:.79rem;line-height:1.4}
          .klaster2-correlation-item span{display:block;margin-top:5px;color:#68756f;font-size:.72rem;line-height:1.5}
          @media(max-width:900px){.klaster2-correlation-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
          @media(max-width:560px){.klaster2-correlation-grid{grid-template-columns:1fr 1fr}}
        `;
        document.head.appendChild(style);
      }

      if (!document.getElementById('klaster2-correlation')) {
        const layanan = document.getElementById('layanan');
        if (layanan) {
          const box = document.createElement('div');
          box.id = 'klaster2-correlation';
          box.className = 'klaster2-correlation';
          box.innerHTML = `
            <h3>Korelasi Utama Klaster 2</h3>
            <p>Hubungan layanan dibuat eksplisit: sasaran → layanan inti → layanan lintas klaster → tindak lanjut → data dan mutu. Korelasi ini adalah peta layanan, bukan pengganti SOP klinis.</p>
            <div class="klaster2-correlation-grid">
              <a class="klaster2-correlation-item" href="pelayanan-klaster-2-anc-triple-eliminasi.html"><strong>🤰 Ibu</strong><span>ANC · Triple Eliminasi · SIHEPI → tindak lanjut ibu/bayi.</span></a>
              <a class="klaster2-correlation-item" href="pelayanan-anak.html"><strong>👶 Anak</strong><span>Pelayanan anak dan MTBS sesuai kebutuhan.</span></a>
              <a class="klaster2-correlation-item" href="pelayanan-imunisasi.html"><strong>💉 Pencegahan</strong><span>Imunisasi sebagai bagian kesinambungan perlindungan anak.</span></a>
              <a class="klaster2-correlation-item" href="pelayanan-tumbuh-kembang-anak.html"><strong>📈 Tumbuh Kembang</strong><span>Antropometri, perkembangan, edukasi, dan rujukan.</span></a>
              <a class="klaster2-correlation-item" href="#ukp-ukm"><strong>🔗 Lintas &amp; Manajemen</strong><span>Laboratorium, farmasi, jejaring, PWS, Monev, mutu, dan risiko.</span></a>
            </div>`;
          layanan.appendChild(box);
        }
      }
    }

    if (file === 'pelayanan-klaster-2-anc-triple-eliminasi.html') {
      const warning = document.querySelector('.callout.warning');
      if (warning) {
        warning.innerHTML = '<strong>Catatan regulasi 2026:</strong> Permenkes 52 Tahun 2017 telah dicabut/digantikan dalam kerangka Permenkes 3 Tahun 2026 tentang Penanggulangan Penyakit, dengan ketentuan tertentu yang masih dinyatakan berlaku. Karena itu, untuk status regulasi 2026 website menggunakan Permenkes 3 Tahun 2026 sebagai rujukan terbaru dan Permenkes 6 Tahun 2024 sebagai salah satu dasar teknis SPM kesehatan ibu hamil.';
      }
      document.querySelectorAll('#referensi .source-list li').forEach(item => {
        if (item.textContent.includes('Permenkes Nomor 3 Tahun 2026')) {
          item.textContent = 'Permenkes Nomor 3 Tahun 2026 tentang Penanggulangan Penyakit, sebagai rujukan regulasi terbaru bidang penanggulangan penyakit dan status ketentuan tertentu dari regulasi sebelumnya.';
        }
      });
    }
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

  function loadHomeKlasterDashboard() {
    if (file !== 'index.html' && file !== '') return;
    if (window.__PKM_HOME_KLASTER_DASHBOARD_LOADED) return;
    window.__PKM_HOME_KLASTER_DASHBOARD_LOADED = true;
    const script = document.createElement('script');
    script.src = 'home-klaster-dashboard.js?v=20260904-v4';
    script.defer = true;
    document.head.appendChild(script);
  }

  canonicalNavigation();
  bindDropdownCaretControls();
  normalizeManagementContent();
  normalizeInformationContent();
  normalizeKlaster2Content();
  installNavigationStyle();
  ensureServiceBackLink();
  loadOriginalScript();
  loadSocialChannelsScript();
  loadHomeKlasterDashboard();
})();
