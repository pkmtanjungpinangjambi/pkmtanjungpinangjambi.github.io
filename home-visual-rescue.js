/* Homepage visual rescue — native HQ sprite tiles + fresh culture assets. */
(function () {
  'use strict';

  var STYLE_ID = 'home-visual-rescue-style';
  var SPRITE_PARTS = [
    './assets/home-menu/sprite-hq-part-01.txt?v=20260907-rescue-4',
    './assets/home-menu/sprite-hq-part-02.txt?v=20260907-rescue-4'
  ];
  var PELAYANAN_ICON_URL = './assets/home-menu/pelayanan-custom.webp.txt?v=20260907-rescue-4';
  var MENU_ITEMS = [
    { title: 'Pelayanan', href: 'pelayanan.html', x: 0, y: 0, alt: 'Menu Pelayanan', custom: true },
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

  function installStyles() {
    if (document.getElementById(STYLE_ID)) return;
    var style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = '.hero-culture-mark,.leader-5s-image{filter:none!important;opacity:1!important;mix-blend-mode:normal!important;image-rendering:auto!important}.hero-culture-mark,.leader-5s-image{backface-visibility:hidden}#home-menu10 .home-menu10-icon{width:120px!important;height:120px!important;flex:0 0 120px!important;background-repeat:no-repeat!important;background-size:600px 240px!important;background-attachment:scroll!important;image-rendering:auto!important}@media(max-width:620px){#home-menu10 .home-menu10-icon{width:92px!important;height:92px!important;flex-basis:92px!important;background-size:460px 184px!important;background-position:var(--rescue-x-mobile) var(--rescue-y-mobile)!important}}';
    document.head.appendChild(style);
  }

  function bustCultureAssets() {
    var stamp = '20260907-color-final-4';
    document.querySelectorAll('.hero-culture-mark,.leader-5s-image').forEach(function (img) {
      var src = img.getAttribute('src') || '';
      if (/assets\/culture\/(akhlak|5s)\.png(?:\?|$)/.test(src) && src.indexOf(stamp) === -1) img.src = src.split('?')[0] + '?v=' + stamp;
    });
  }

  function buildMenuCard(item, spriteBackground, pelayananBase64) {
    var link = document.createElement('a');
    link.className = 'home-menu10-card' + (item.custom ? ' custom-pelayanan' : '');
    link.href = item.href;
    link.setAttribute('aria-label', item.alt);

    if (item.custom && pelayananBase64) {
      var image = document.createElement('img');
      image.className = 'home-menu10-custom-icon';
      image.src = 'data:image/webp;base64,' + pelayananBase64;
      image.alt = '';
      image.setAttribute('aria-hidden', 'true');
      link.appendChild(image);
    } else if (!item.custom) {
      var icon = document.createElement('span');
      icon.className = 'home-menu10-icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.style.backgroundImage = spriteBackground;
      icon.style.setProperty('--bg-x', (-84 * item.x) + 'px');
      icon.style.setProperty('--bg-y', (-84 * item.y) + 'px');
      link.appendChild(icon);
    }

    var label = document.createElement('span');
    label.className = 'home-menu10-label';
    label.textContent = item.title;
    var note = document.createElement('span');
    note.className = 'home-menu10-note';
    note.textContent = item.custom ? '5 Klaster ILP' : item.title;
    link.appendChild(label);
    link.appendChild(note);
    return link;
  }

  function ensureAllCards(grid, spriteBase64, pelayananBase64) {
    if (grid.querySelectorAll('.home-menu10-icon').length === 9 && grid.querySelector('.custom-pelayanan')) return;
    var background = spriteBase64 ? 'url("data:image/webp;base64,' + spriteBase64 + '")' : '';
    grid.textContent = '';
    MENU_ITEMS.forEach(function (item) { grid.appendChild(buildMenuCard(item, background, pelayananBase64)); });
  }

  function applySprite(spriteBase64) {
    var icons = Array.from(document.querySelectorAll('#home-menu10 .home-menu10-icon'));
    if (icons.length !== 9) return false;
    var desktopTile = 120;
    var mobileTile = 92;
    var background = 'url("data:image/webp;base64,' + spriteBase64 + '")';
    icons.forEach(function (icon, index) {
      var x = MENU_ITEMS[index + 1].x;
      var y = MENU_ITEMS[index + 1].y;
      icon.style.backgroundImage = background;
      icon.style.backgroundSize = '600px 240px';
      icon.style.backgroundPosition = (-desktopTile * x) + 'px ' + (-desktopTile * y) + 'px';
      icon.style.width = desktopTile + 'px';
      icon.style.height = desktopTile + 'px';
      icon.style.flexBasis = desktopTile + 'px';
      icon.style.setProperty('--rescue-x-mobile', (-mobileTile * x) + 'px');
      icon.style.setProperty('--rescue-y-mobile', (-mobileTile * y) + 'px');
    });
    return true;
  }

  function loadAssets() {
    var section = document.getElementById('home-menu10');
    if (!section) return;
    var grid = section.querySelector('.home-menu10-grid');
    if (!grid) return;

    Promise.all([
      Promise.all(SPRITE_PARTS.map(function (url) {
        return fetch(url, { cache: 'no-store' }).then(function (response) {
          if (!response.ok) throw new Error('HTTP ' + response.status);
          return response.text();
        });
      })),
      fetch(PELAYANAN_ICON_URL, { cache: 'no-store' }).then(function (response) {
        if (!response.ok) throw new Error('HTTP ' + response.status);
        return response.text();
      })
    ]).then(function (results) {
      var sprite = results[0].join('').trim();
      var pelayanan = results[1].trim();
      if (!/^UklGR/.test(sprite)) throw new Error('Invalid HQ sprite');
      if (!/^UklGR/.test(pelayanan)) pelayanan = '';
      ensureAllCards(grid, sprite, pelayanan);
      applySprite(sprite);
    }).catch(function () {
      /* The original loader remains the primary source of truth. */
    });
  }

  function init() {
    installStyles();
    bustCultureAssets();
    loadAssets();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();

  var attempts = 0;
  var timer = setInterval(function () {
    attempts += 1;
    init();
    if (document.querySelectorAll('#home-menu10 .home-menu10-icon').length === 9 && document.querySelector('.custom-pelayanan')) clearInterval(timer);
    if (attempts >= 12) clearInterval(timer);
  }, 500);
})();
