/* Homepage visual rescue — native sprite tiles + fresh culture assets. */
(function () {
  'use strict';

  var STYLE_ID = 'home-visual-rescue-style';
  var SPRITE_PARTS = [
    './assets/home-menu/sprite-hq-part-01.txt?v=20260907-rescue-2',
    './assets/home-menu/sprite-hq-part-02.txt?v=20260907-rescue-2'
  ];

  function installStyles() {
    if (document.getElementById(STYLE_ID)) return;
    var style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = '.hero-culture-mark[src*="akhlak.png"],.leader-5s-image[src*="5s.png"]{filter:none!important;opacity:1!important;mix-blend-mode:normal!important;image-rendering:auto!important}.hero-culture-mark,.leader-5s-image{backface-visibility:hidden}#home-menu10 .home-menu10-icon{width:104px!important;height:104px!important;flex:0 0 104px!important;background-repeat:no-repeat!important;background-size:520px 208px!important;background-attachment:scroll!important;image-rendering:auto!important}@media(max-width:620px){#home-menu10 .home-menu10-icon{width:88px!important;height:88px!important;flex-basis:88px!important;background-size:440px 176px!important}}';
    document.head.appendChild(style);
  }

  function bustCultureAssetImages() {
    var stamp = '20260907-color-final-3';
    document.querySelectorAll('.hero-culture-mark,.leader-5s-image').forEach(function (img) {
      var src = img.getAttribute('src') || '';
      if (/assets\/culture\/(akhlak|5s)\.png(?:\?|$)/.test(src) && src.indexOf(stamp) === -1) {
        img.src = src.split('?')[0] + '?v=' + stamp;
      }
    });
  }

  function applySprite(spriteBase64) {
    var icons = Array.from(document.querySelectorAll('#home-menu10 .home-menu10-icon'));
    if (icons.length !== 9) return false;

    var positions = [[1,0],[2,0],[3,0],[4,0],[0,1],[1,1],[2,1],[3,1],[4,1]];
    var desktopTile = 104;
    var mobileTile = 88;
    var background = 'url("data:image/webp;base64,' + spriteBase64 + '")';

    icons.forEach(function (icon, index) {
      var x = positions[index][0];
      var y = positions[index][1];
      icon.style.backgroundImage = background;
      icon.style.backgroundPosition = (-desktopTile * x) + 'px ' + (-desktopTile * y) + 'px';
      icon.style.backgroundSize = '520px 208px';
      icon.style.width = desktopTile + 'px';
      icon.style.height = desktopTile + 'px';
      icon.style.flexBasis = desktopTile + 'px';
      icon.style.setProperty('--bg-x-mobile', (-mobileTile * x) + 'px');
      icon.style.setProperty('--bg-y-mobile', (-mobileTile * y) + 'px');
    });

    var mobileStyleId = STYLE_ID + '-mobile';
    if (!document.getElementById(mobileStyleId)) {
      var mobile = document.createElement('style');
      mobile.id = mobileStyleId;
      mobile.textContent = '@media(max-width:620px){#home-menu10 .home-menu10-icon{background-position:var(--bg-x-mobile) var(--bg-y-mobile)!important}}';
      document.head.appendChild(mobile);
    }
    return true;
  }

  function loadSprite() {
    if (!document.getElementById('home-menu10')) return;
    Promise.all(SPRITE_PARTS.map(function (url) {
      return fetch(url, { cache: 'no-store' }).then(function (response) {
        if (!response.ok) throw new Error('HTTP ' + response.status);
        return response.text();
      });
    })).then(function (parts) {
      var sprite = parts.join('').trim();
      if (!/^UklGR/.test(sprite)) throw new Error('Sprite HQ invalid');
      applySprite(sprite);
    }).catch(function () {});
  }

  function init() {
    installStyles();
    bustCultureAssetImages();
    loadSprite();
  }

  var attempts = 0;
  var timer = setInterval(function () {
    attempts += 1;
    init();
    if (document.querySelectorAll('#home-menu10 .home-menu10-icon').length === 9 || attempts >= 12) clearInterval(timer);
  }, 500);

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
