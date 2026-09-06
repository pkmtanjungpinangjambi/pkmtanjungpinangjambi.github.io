/*
 * Beranda — 10 ikon menu utama.
 * Ikon sekarang menggunakan SVG inline agar tetap tajam di semua resolusi.
 * Modul hanya berjalan di homepage dan tidak menyentuh header/logo.
 */
(function () {
  'use strict';

  const file = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  if (file !== 'index.html' && file !== '') return;
  if (document.getElementById('home-menu10')) return;

  const ICON_DEFS = {
    pelayanan: `
      <svg viewBox="0 0 84 84" width="84" height="84" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="g-pelayanan" x1="14" y1="10" x2="70" y2="74"><stop offset="0" stop-color="#8ef0cf"/><stop offset="1" stop-color="#087b5b"/></linearGradient>
          <filter id="s-pelayanan" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="5" stdDeviation="4" flood-opacity=".22"/></filter>
        </defs>
        <circle cx="42" cy="43" r="31" fill="url(#g-pelayanan)" filter="url(#s-pelayanan)"/>
        <circle cx="33" cy="31" r="9" fill="#fff" opacity=".2"/>
        <path d="M42 25v36M24 43h36" stroke="#fff" stroke-width="8" stroke-linecap="round"/>
      </svg>`,
    profil: `
      <svg viewBox="0 0 84 84" width="84" height="84" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="g-profil" x1="14" y1="8" x2="72" y2="78"><stop offset="0" stop-color="#8ac8ff"/><stop offset="1" stop-color="#1967b8"/></linearGradient>
          <filter id="s-profil" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="5" stdDeviation="4" flood-opacity=".22"/></filter>
        </defs>
        <circle cx="42" cy="43" r="31" fill="url(#g-profil)" filter="url(#s-profil)"/>
        <circle cx="42" cy="31" r="10" fill="#fff" opacity=".94"/>
        <path d="M23 62c2-12 10-18 19-18s17 6 19 18" fill="#fff" opacity=".94"/>
        <circle cx="31" cy="22" r="7" fill="#fff" opacity=".18"/>
      </svg>`,
    jadwal: `
      <svg viewBox="0 0 84 84" width="84" height="84" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="g-jadwal" x1="12" y1="8" x2="72" y2="78"><stop offset="0" stop-color="#ffd88a"/><stop offset="1" stop-color="#db7b18"/></linearGradient>
          <filter id="s-jadwal" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="5" stdDeviation="4" flood-opacity=".22"/></filter>
        </defs>
        <circle cx="42" cy="43" r="31" fill="url(#g-jadwal)" filter="url(#s-jadwal)"/>
        <rect x="24" y="25" width="36" height="35" rx="7" fill="#fff" opacity=".95"/>
        <path d="M24 35h36M33 21v10M51 21v10" stroke="#b45c0d" stroke-width="4.5" stroke-linecap="round"/>
        <circle cx="34" cy="44" r="2.5" fill="#db7b18"/><circle cx="42" cy="44" r="2.5" fill="#db7b18"/><circle cx="50" cy="44" r="2.5" fill="#db7b18"/>
        <circle cx="34" cy="52" r="2.5" fill="#db7b18"/><circle cx="42" cy="52" r="2.5" fill="#db7b18"/><circle cx="50" cy="52" r="2.5" fill="#db7b18"/>
      </svg>`,
    edukasi: `
      <svg viewBox="0 0 84 84" width="84" height="84" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="g-edukasi" x1="10" y1="8" x2="74" y2="78"><stop offset="0" stop-color="#d9b7ff"/><stop offset="1" stop-color="#7141b8"/></linearGradient>
          <filter id="s-edukasi" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="5" stdDeviation="4" flood-opacity=".22"/></filter>
        </defs>
        <circle cx="42" cy="43" r="31" fill="url(#g-edukasi)" filter="url(#s-edukasi)"/>
        <path d="M25 27c7-4 13-4 17 0v33c-4-4-10-4-17 0z" fill="#fff" opacity=".96"/>
        <path d="M59 27c-7-4-13-4-17 0v33c4-4 10-4 17 0z" fill="#fff" opacity=".82"/>
        <path d="M42 28v30" stroke="#7141b8" stroke-width="3" opacity=".7"/>
      </svg>`,
    program: `
      <svg viewBox="0 0 84 84" width="84" height="84" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="g-program" x1="12" y1="10" x2="72" y2="76"><stop offset="0" stop-color="#fff19c"/><stop offset="1" stop-color="#d4a900"/></linearGradient>
          <filter id="s-program" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="5" stdDeviation="4" flood-opacity=".22"/></filter>
        </defs>
        <circle cx="42" cy="43" r="31" fill="url(#g-program)" filter="url(#s-program)"/>
        <path d="M30 40c0-8 5-14 12-14s12 6 12 14c0 5-3 8-6 11v6H36v-6c-3-3-6-6-6-11z" fill="#fff" opacity=".95"/>
        <path d="M35 61h14" stroke="#fff" stroke-width="5" stroke-linecap="round"/>
        <path d="M42 20v-3M26 27l-2-2M58 27l2-2" stroke="#fff" stroke-width="3.5" stroke-linecap="round" opacity=".78"/>
      </svg>`,
    informasi: `
      <svg viewBox="0 0 84 84" width="84" height="84" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="g-informasi" x1="12" y1="8" x2="72" y2="78"><stop offset="0" stop-color="#91e7ff"/><stop offset="1" stop-color="#137d9b"/></linearGradient>
          <filter id="s-informasi" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="5" stdDeviation="4" flood-opacity=".22"/></filter>
        </defs>
        <circle cx="42" cy="43" r="31" fill="url(#g-informasi)" filter="url(#s-informasi)"/>
        <circle cx="42" cy="43" r="18" fill="#fff" opacity=".95"/>
        <circle cx="42" cy="33" r="3" fill="#137d9b"/>
        <path d="M42 40v15" stroke="#137d9b" stroke-width="5" stroke-linecap="round"/>
        <circle cx="31" cy="25" r="7" fill="#fff" opacity=".2"/>
      </svg>`,
    galeri: `
      <svg viewBox="0 0 84 84" width="84" height="84" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="g-galeri" x1="10" y1="10" x2="74" y2="78"><stop offset="0" stop-color="#ffb4c9"/><stop offset="1" stop-color="#c23867"/></linearGradient>
          <filter id="s-galeri" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="5" stdDeviation="4" flood-opacity=".22"/></filter>
        </defs>
        <circle cx="42" cy="43" r="31" fill="url(#g-galeri)" filter="url(#s-galeri)"/>
        <rect x="23" y="28" width="38" height="30" rx="6" fill="#fff" opacity=".95"/>
        <circle cx="33" cy="38" r="4" fill="#c23867"/>
        <path d="M27 53l10-10 7 7 6-6 7 9z" fill="#c23867" opacity=".86"/>
      </svg>`,
    pengaduan: `
      <svg viewBox="0 0 84 84" width="84" height="84" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="g-pengaduan" x1="10" y1="10" x2="74" y2="78"><stop offset="0" stop-color="#ff9aab"/><stop offset="1" stop-color="#ba3249"/></linearGradient>
          <filter id="s-pengaduan" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="5" stdDeviation="4" flood-opacity=".22"/></filter>
        </defs>
        <circle cx="42" cy="43" r="31" fill="url(#g-pengaduan)" filter="url(#s-pengaduan)"/>
        <path d="M24 31c0-5 4-8 9-8h18c5 0 9 3 9 8v12c0 5-4 8-9 8H40l-9 8v-8h-2c-3 0-5-3-5-8z" fill="#fff" opacity=".95"/>
        <circle cx="34" cy="37" r="2.3" fill="#ba3249"/><circle cx="42" cy="37" r="2.3" fill="#ba3249"/><circle cx="50" cy="37" r="2.3" fill="#ba3249"/>
      </svg>`,
    jejaring: `
      <svg viewBox="0 0 84 84" width="84" height="84" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="g-jejaring" x1="10" y1="8" x2="74" y2="78"><stop offset="0" stop-color="#9fe7d1"/><stop offset="1" stop-color="#0c7a60"/></linearGradient>
          <filter id="s-jejaring" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="5" stdDeviation="4" flood-opacity=".22"/></filter>
        </defs>
        <circle cx="42" cy="43" r="31" fill="url(#g-jejaring)" filter="url(#s-jejaring)"/>
        <path d="M30 49l12-15 13 11M30 49l-1 10M42 34l10-7M55 45l1 13" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="30" cy="49" r="6" fill="#fff"/><circle cx="42" cy="34" r="6" fill="#fff"/><circle cx="55" cy="45" r="6" fill="#fff"/><circle cx="29" cy="59" r="6" fill="#fff"/>
      </svg>`,
    kontak: `
      <svg viewBox="0 0 84 84" width="84" height="84" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="g-kontak" x1="10" y1="8" x2="74" y2="78"><stop offset="0" stop-color="#b8d2ff"/><stop offset="1" stop-color="#315ba8"/></linearGradient>
          <filter id="s-kontak" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="5" stdDeviation="4" flood-opacity=".22"/></filter>
        </defs>
        <circle cx="42" cy="43" r="31" fill="url(#g-kontak)" filter="url(#s-kontak)"/>
        <path d="M29 27c2-2 5-2 7 0l4 5c1 2 1 4-1 5l-4 3c2 4 5 7 9 9l3-4c1-2 3-2 5-1l5 4c2 2 2 5 0 7l-2 2c-2 2-6 3-10 1-8-4-15-10-20-18-2-4-1-8 1-10z" fill="#fff" opacity=".95"/>
        <circle cx="30" cy="23" r="7" fill="#fff" opacity=".18"/>
      </svg>`
  };

  const menuItems = [
    { key: 'pelayanan', title: 'Pelayanan', href: 'pelayanan.html', alt: 'Menu Pelayanan' },
    { key: 'profil', title: 'Profil', href: 'profil.html', alt: 'Menu Profil' },
    { key: 'jadwal', title: 'Jadwal', href: 'jadwal.html', alt: 'Menu Jadwal' },
    { key: 'edukasi', title: 'Edukasi', href: 'edukasi.html', alt: 'Menu Edukasi' },
    { key: 'program', title: 'Program', href: 'program.html', alt: 'Menu Program & Inovasi' },
    { key: 'informasi', title: 'Informasi', href: 'informasi.html', alt: 'Menu Informasi' },
    { key: 'galeri', title: 'Galeri', href: 'informasi.html#foto', alt: 'Menu Galeri' },
    { key: 'pengaduan', title: 'Pengaduan', href: 'kontak.html', alt: 'Menu Pengaduan' },
    { key: 'jejaring', title: 'Jejaring', href: 'jejaring-puskesmas.html', alt: 'Menu Jejaring' },
    { key: 'kontak', title: 'Kontak', href: 'kontak.html', alt: 'Menu Kontak' }
  ];

  function addStyles() {
    if (document.getElementById('home-menu10-style')) return;

    const style = document.createElement('style');
    style.id = 'home-menu10-style';
    style.textContent = `
      #home-menu10{padding:42px 0 50px;background:#fff;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
      #home-menu10 .home-menu10-head{text-align:center;max-width:760px;margin:0 auto 24px}
      #home-menu10 .home-menu10-kicker{display:inline-flex;align-items:center;justify-content:center;padding:7px 12px;border-radius:999px;background:var(--green-100);color:var(--green-900);font-size:.75rem;font-weight:900;letter-spacing:.06em;text-transform:uppercase}
      #home-menu10 h2{margin:10px 0 6px;color:var(--green-900);font-size:clamp(1.55rem,3vw,2.1rem);line-height:1.15}
      #home-menu10 p{margin:0;color:var(--muted);font-size:.88rem}
      #home-menu10 .home-menu10-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:14px}
      #home-menu10 .home-menu10-card{display:flex;flex-direction:column;align-items:center;justify-content:flex-start;min-height:158px;padding:15px 10px 13px;border:1px solid var(--line);border-radius:18px;background:linear-gradient(180deg,#fff,#f8fcfa);text-decoration:none;box-shadow:0 8px 24px rgba(0,59,45,.06);transition:transform .2s ease,box-shadow .2s ease,border-color .2s ease}
      #home-menu10 .home-menu10-card:hover,#home-menu10 .home-menu10-card:focus-visible{transform:translateY(-4px);box-shadow:0 15px 32px rgba(0,59,45,.12);border-color:#b9ddd1;outline:none}
      #home-menu10 .home-menu10-icon{width:84px;height:84px;flex:0 0 84px;display:grid;place-items:center;border-radius:16px;margin-bottom:10px}
      #home-menu10 .home-menu10-icon svg{width:84px;height:84px;display:block;overflow:visible}
      #home-menu10 .home-menu10-label{color:var(--green-900);font-size:.9rem;font-weight:900;text-align:center;line-height:1.25}
      #home-menu10 .home-menu10-note{display:block;margin-top:4px;font-size:.69rem;color:var(--muted);text-align:center;line-height:1.35}
      #home-menu10 .home-menu10-loading{grid-column:1/-1;text-align:center;padding:24px;color:var(--muted);font-size:.84rem}
      @media(max-width:980px){#home-menu10 .home-menu10-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
      @media(max-width:620px){#home-menu10{padding:34px 0 40px}#home-menu10 .home-menu10-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:11px}#home-menu10 .home-menu10-card{min-height:148px;padding:12px 8px}#home-menu10 .home-menu10-icon,#home-menu10 .home-menu10-icon svg{width:78px;height:78px}#home-menu10 .home-menu10-icon{flex-basis:78px}#home-menu10 .home-menu10-note{display:none}}
    `;
    document.head.appendChild(style);
  }

  function cleanupHomeContent() {
    const berAkhlak = Array.from(document.querySelectorAll('.leader-badges .culture-badge-link'))
      .find(function (link) { return (link.textContent || '').includes('BerAKHLAK'); });
    if (berAkhlak) berAkhlak.remove();

    const latestGalleryPanel = Array.from(document.querySelectorAll('.home-tri-section .panel'))
      .find(function (panel) {
        const heading = panel.querySelector('.panel-head h3');
        return heading && (heading.textContent || '').includes('Galeri Terbaru');
      });
    if (latestGalleryPanel) latestGalleryPanel.remove();

    const videoGallery = document.getElementById('video-galeri');
    if (videoGallery) videoGallery.remove();
  }

  function buildSection() {
    const section = document.createElement('section');
    section.id = 'home-menu10';
    section.setAttribute('aria-labelledby', 'home-menu10-title');
    section.innerHTML = `
      <div class="container">
        <div class="home-menu10-head">
          <span class="home-menu10-kicker">Menu Utama</span>
          <h2 id="home-menu10-title">Akses Cepat Puskesmas</h2>
          <p>Informasi dan layanan utama UPTD Puskesmas Tanjung Pinang dalam satu tampilan.</p>
        </div>
        <div class="home-menu10-grid" aria-live="polite">
          <div class="home-menu10-loading">Menyiapkan ikon menu…</div>
        </div>
      </div>`;
    return section;
  }

  function render(section) {
    const grid = section.querySelector('.home-menu10-grid');
    if (!grid) return;

    grid.textContent = '';
    menuItems.forEach(function (item) {
      const link = document.createElement('a');
      link.className = 'home-menu10-card';
      link.href = item.href;
      link.setAttribute('aria-label', item.alt);

      const icon = document.createElement('span');
      icon.className = 'home-menu10-icon';
      icon.innerHTML = ICON_DEFS[item.key];

      const label = document.createElement('span');
      label.className = 'home-menu10-label';
      label.textContent = item.title;

      const note = document.createElement('span');
      note.className = 'home-menu10-note';
      note.textContent = item.title === 'Pelayanan' ? '5 Klaster ILP' : item.title;

      link.appendChild(icon);
      link.appendChild(label);
      link.appendChild(note);
      grid.appendChild(link);
    });
  }

  function init() {
    const hero = document.querySelector('.hero-home');
    if (!hero) return;

    cleanupHomeContent();
    addStyles();
    const section = buildSection();
    hero.insertAdjacentElement('afterend', section);
    render(section);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
