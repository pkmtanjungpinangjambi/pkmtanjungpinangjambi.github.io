/* Homepage visual rescue — native HQ sprite tiles + fresh culture assets. */
(function () {
  'use strict';

  var STYLE_ID = 'home-visual-rescue-style';
  var SPRITE_PARTS = [
    './assets/home-menu/sprite-hq-part-01.txt?v=20260907-rescue-3',
    './assets/home-menu/sprite-hq-part-02.txt?v=20260907-rescue-3'
  ];
  var POSITIONS = [[1,0],[2,0],[3,0],[4,0],[0,1],[1,1],[2,1],[3,1],[4,1]];

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
      if (/assets\/culture\/(akhlak|5s)\.png(?:\?|$)/.test(src) && src.indexOf(stamp) === -1) {
        img.src = src.split('?')[0] + '?v=' + stamp;
      }
    });
  }

  function applySprite(spriteBase64) {
    var icons = Array.from(document.querySelectorAll('#home-menu10 .home-menu10-icon'));
    if (icons.length !== POSITIONS.length) return false;

    var desktopTile = 120;
    var mobileTile = 92;
    var background = 'url("data:image/webp;base64,' + spriteBase64 + '")';
    icons.forEach(function (icon, index) {
      var x = POSITIONS[index][0];
      var y = POSITIONS[index][1];
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

  function ensureCards() {
    var section = document.getElementById('home-menu10');
    var grid = section && section.querySelector('.home-menu10-grid');
    if (!grid || grid.querySelectorAll('.home-menu10-icon').length === 9) return;
    var custom = grid.querySelector('.custom-pelayanan');
    var labels = ['Profil','Jadwal','Edukasi','Program','Informasi','Galeri','Pengaduan','Jejaring','Kontak'];
    var hrefs = ['profil.html','jadwal.html','edukasi.html','program.html','informasi.html','informasi.html#foto','kontak.html','jejaring-puskesmas.html','kontak.html'];
    grid.textContent = '';
    if (custom) grid.appendChild(custom);
    labels.forEach(function(label,index){
      var link=document.createElement('a'); link.className='home-menu10-card'; link.href=hrefs[index]; link.setAttribute('aria-label','Menu '+label);
      var icon=document.createElement('span'); icon.className='home-menu10-icon'; icon.setAttribute('aria-hidden','true');
      var text=document.createElement('span'); text.className='home-menu10-label'; text.textContent=label;
      link.appendChild(icon); link.appendChild(text); grid.appendChild(link);
    });
  }

  function loadSprite() {
    var section = document.getElementById('home-menu10');
    if (!section) return;
    ensureCards();
    Promise.all(SPRITE_PARTS.map(function(url){
      return fetch(url,{cache:'no-store'}).then(function(response){
        if(!response.ok) throw new Error('HTTP '+response.status);
        return response.text();
      });
    })).then(function(parts){
      var sprite=parts.join('').trim();
      if(!/^UklGR/.test(sprite)) throw new Error('Invalid WebP sprite');
      applySprite(sprite);
    }).catch(function(){
      /* Keep the normal homepage loader as fallback. */
    });
  }

  function init(){installStyles();bustCultureAssets();loadSprite();}
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true}); else init();
  var attempts=0; var timer=setInterval(function(){attempts+=1;init();if(document.querySelectorAll('#home-menu10 .home-menu10-icon').length===9||attempts>=12)clearInterval(timer);},500);
})();
