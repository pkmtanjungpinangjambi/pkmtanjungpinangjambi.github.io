/* Homepage visual rescue — sprite icons + fresh culture assets. */
(function () {
  'use strict';

  var STYLE_ID = 'home-visual-rescue-style';
  var SPRITE_PARTS = [
    './assets/home-menu/sprite-hq-part-01.txt?v=20260907-rescue-1',
    './assets/home-menu/sprite-hq-part-02.txt?v=20260907-rescue-1'
  ];

  function installStyles() {
    if (document.getElementById(STYLE_ID)) return;
    var style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = '\n      .hero-culture-mark[src*="akhlak.png"],\n      .leader-5s-image[src*="5s.png"]{\n        filter:none!important;opacity:1!important;mix-blend-mode:normal!important;image-rendering:auto!important;\n      }\n      #home-menu10 .home-menu10-icon{\n        width:104px!important;height:104px!important;flex-basis:104px!important;\n        background-repeat:no-repeat!important;background-size:520px 208px!important;\n        image-rendering:auto!important;\n      }\n      @media(max-width:620px){\n        #home-menu10 .home-menu10-icon{\n          width:88px!important;height:88px!important;flex-basis:88px!important;\n          background-size:440px 176px!important;\n        }\n      }\n    ';
    document.head.appendChild(style);
  }

  function bustCultureAssetImages() {
    var stamp = '20260907-color-final-2';
    document.querySelectorAll('.hero-culture-mark, .leader-5s-image').forEach(function (img) {
      var src = img.getAttribute('src') || '';
      if (/assets\/culture\/(akhlak|5s)\.png(?:\?|$)/.test(src) && src.indexOf(stamp) === -1) {
        var clean = src.split('?')[0];
        img.src = clean + '?v=' + stamp;
      }
    });
  }

  function applySprite(spriteBase64) {
    var icons = Array.from(document.querySelectorAll('#home-menu10 .home-menu10-icon'));
    if (icons.length !== 9) return false;

    var positions = [
      [1, 0], [2, 0], [3, 0], [4, 0],
      [0, 1], [1, 1], [2, 1], [3, 1], [4, 1]
    ];
    var desktopTile = 104;
    var mobileTile = 88;
    var background = 'url("data:image/webp;base64,' + spriteBase64 + '")';

    icons.forEach(function (icon, index) {
      var x = positions[index][0];
      var y = positions[index][1];
      icon.style.backgroundImage = background;
      icon.style.setProperty('--bg-x', (-desktopTile * x) + 'px');
      icon.style.setProperty('--bg-y', (-desktopTile * y) + 'px');
      icon.style.backgroundPosition = (-desktopTile * x) + 'px ' + (-desktopTile * y) + 'px';
      icon.style.backgroundSize = '520px 208px';
      icon.style.width = desktopTile + 'px';
      icon.style.height = desktopTile + 'px';
      icon.style.flexBasis = desktopTile + 'px';
      icon.style.imageRendering = 'auto';

      var mobile = document.createElement('style');
      mobile.textContent = '@media(max-width:620px){#home-menu10 .home-menu10-icon:nth-of-type(' + (index + 1) + '){width:' + mobileTile + 'px!important;height:' + mobileTile + 'px!important;flex-basis:' + mobileTile + 'px!important;background-size:440px 176px!important;background-position:' + (-mobileTile * x) + 'px ' + (-mobileTile * y) + 'px!important}}';
      document.head.appendChild(mobile);
    });
    return true;
  }

  function loadSprite() {
    if (!document.getElementById('home-menu10')) return false;
    return Promise.all(SPRITE_PARTS.map(function (url) {
      return fetch(url, { cache: 'no-store' }).then(function (response) {
        if (!response.ok) throw new Error('HTTP ' + response.status);
        return response.text();
      });
    }))
      .then(function (parts) {
        var spriteBase64 = parts.join('').trim();
        if (!/^UklGR/.test(spriteBase64)) throw new Error('Sprite HQ tidak valid');
        return applySprite(spriteBase64);
      })
      .catch(function () { return false; });
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
    if (document.getElementById('home-menu10') && document.querySelectorAll('#home-menu10 .home-menu10-icon').length === 9) {
      clearInterval(timer);
    }
    if (attempts >= 12) clearInterval(timer);
  }, 500);

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
