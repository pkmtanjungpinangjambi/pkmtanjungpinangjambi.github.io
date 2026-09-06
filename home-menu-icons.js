/*
 * Beranda — 10 ikon menu utama.
 * Ikon berasal dari aset Library yang telah dipaketkan menjadi sprite WebP.
 * Modul hanya berjalan di homepage dan tidak menyentuh header.
 */
(function () {
  'use strict';

  const file = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  if (file !== 'index.html' && file !== '') return;
  if (document.getElementById('home-menu10')) return;

  const SPRITE_PARTS = [
    './assets/home-menu/sprite-56-part-01.txt?v=20260906-1',
    './assets/home-menu/sprite-56-part-02.txt?v=20260906-1'
  ];
  const PELAYANAN_ICON_URL = './assets/home-menu/pelayanan-custom.webp.txt?v=20260907-1';

  const menuItems = [
    { title: 'Pelayanan', href: 'pelayanan.html', x: 0, y: 0, alt: 'Menu Pelayanan', customIcon: true },
    { title: 'Profil', href: 'profil.html', x: 1, y: 0, alt: 'Menu Profil' },
    { title: 'Jadwal', href: 'jadwal.html', x: 2, y: 0, alt: 'Menu Jadwal' },
    { title: 'Edukasi', href: 'edukasi.html', x: 3, y: 0, alt: 'Menu Edukasi' },
    { title: 'Program', href: 'program.html', x: 4, y: 0, alt: 'Menu Program & Inovasi' },
    { title: 'Informasi', href: 'informasi.html', x: 0, y: 1, alt: 'Menu Informasi' },
    { title: 'Galeri', href: 'informasi.html#foto', x: 1, y: 1, alt: 'Menu Galeri' },
    { title: 'Pengaduan', href: 'kontak.html', x: 2, y: 1, alt: 'Menu Pengaduan' },
    { title: 'Jejaring', href: 'jejaring-puskesmas.html', x: 3, y: 1, alt: 'Menu Jejaring' },
    { title: 'Kontak', href: 'kontak.html', x: 4, y: 1, alt: 'Menu Kontak' }
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
      #home-menu10 .home-menu10-icon{width:84px;height:84px;flex:0 0 84px;background-repeat:no-repeat;background-position:var(--bg-x) var(--bg-y);background-size:420px 168px;border-radius:16px;display:block;margin-bottom:10px}
      #home-menu10 .home-menu10-custom-icon{width:110px;height:118px;flex:0 0 118px;display:block;object-fit:contain;object-position:center center;margin:-4px 0 0}
      #home-menu10 .home-menu10-card.custom-pelayanan{min-height:158px;padding-top:8px}
      #home-menu10 .home-menu10-card.custom-pelayanan .home-menu10-label,
      #home-menu10 .home-menu10-card.custom-pelayanan .home-menu10-note{display:none}
      #home-menu10 .home-menu10-label{color:var(--green-900);font-size:.9rem;font-weight:900;text-align:center;line-height:1.25}
      #home-menu10 .home-menu10-note{display:block;margin-top:4px;font-size:.69rem;color:var(--muted);text-align:center;line-height:1.35}
      #home-menu10 .home-menu10-loading{grid-column:1/-1;text-align:center;padding:24px;color:var(--muted);font-size:.84rem}
      @media(max-width:980px){#home-menu10 .home-menu10-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
      @media(max-width:620px){#home-menu10{padding:34px 0 40px}#home-menu10 .home-menu10-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:11px}#home-menu10 .home-menu10-card{min-height:148px;padding:12px 8px}#home-menu10 .home-menu10-icon{width:78px;height:78px;flex-basis:78px;background-size:390px 156px}#home-menu10 .home-menu10-custom-icon{width:96px;height:108px;flex-basis:108px;margin:-3px 0 0}#home-menu10 .home-menu10-note{display:none}}
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

  function render(section, spriteBase64, pelayananBase64) {
    const grid = section.querySelector('.home-menu10-grid');
    if (!grid) return;

    const spriteDataUrl = 'url("data:image/webp;base64,' + spriteBase64 + '")';
    const pelayananDataUrl = 'data:image/webp;base64,' + pelayananBase64;
    grid.textContent = '';

    menuItems.forEach(function (item) {
      const link = document.createElement('a');
      link.className = 'home-menu10-card' + (item.customIcon ? ' custom-pelayanan' : '');
      link.href = item.href;
      link.setAttribute('aria-label', item.alt);

      if (item.customIcon && pelayananBase64) {
        const icon = document.createElement('img');
        icon.className = 'home-menu10-custom-icon';
        icon.src = pelayananDataUrl;
        icon.alt = '';
        icon.setAttribute('aria-hidden', 'true');
        link.appendChild(icon);
      } else {
        const icon = document.createElement('span');
        icon.className = 'home-menu10-icon';
        icon.setAttribute('aria-hidden', 'true');
        icon.style.backgroundImage = spriteDataUrl;
        icon.style.setProperty('--bg-x', (-84 * item.x) + 'px');
        icon.style.setProperty('--bg-y', (-84 * item.y) + 'px');
        link.appendChild(icon);
      }

      const label = document.createElement('span');
      label.className = 'home-menu10-label';
      label.textContent = item.title;

      const note = document.createElement('span');
      note.className = 'home-menu10-note';
      note.textContent = item.title === 'Pelayanan' ? '5 Klaster ILP' : item.title;

      link.appendChild(label);
      link.appendChild(note);
      grid.appendChild(link);
    });

    const mobileStyle = document.getElementById('home-menu10-style');
    if (mobileStyle) {
      mobileStyle.textContent += `\n@media(max-width:620px){#home-menu10 .home-menu10-icon{background-position:calc(var(--bg-x) * .928571) calc(var(--bg-y) * .928571)}}`;
    }
  }

  function loadAssets(section) {
    Promise.all([
      Promise.all(SPRITE_PARTS.map(function (url) {
        return fetch(url, { cache: 'force-cache' }).then(function (response) {
          if (!response.ok) throw new Error('HTTP ' + response.status);
          return response.text();
        });
      })),
      fetch(PELAYANAN_ICON_URL, { cache: 'force-cache' }).then(function (response) {
        if (!response.ok) throw new Error('HTTP ' + response.status);
        return response.text();
      })
    ])
      .then(function (results) {
        const spriteParts = results[0];
        const pelayananBase64 = results[1].trim();
        const spriteBase64 = spriteParts.join('').trim();
        if (!spriteBase64 || !/^UklGR/.test(spriteBase64)) throw new Error('Sprite tidak valid');
        if (!pelayananBase64 || !/^UklGR/.test(pelayananBase64)) throw new Error('Ikon Pelayanan tidak valid');
        render(section, spriteBase64, pelayananBase64);
      })
      .catch(function () {
        const grid = section.querySelector('.home-menu10-grid');
        if (grid) grid.innerHTML = '<div class="home-menu10-loading">Ikon menu belum dapat dimuat. Silakan muat ulang halaman.</div>';
      });
  }

  function init() {
    const hero = document.querySelector('.hero-home');
    if (!hero) return;

    cleanupHomeContent();
    addStyles();
    const section = buildSection();
    hero.insertAdjacentElement('afterend', section);
    loadAssets(section);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
