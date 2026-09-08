/*
 * Beranda — homepage visual orchestrator.
 * The core renderer owns menu creation; rescue only runs when the rendered
 * 10-card grid is incomplete, so the two paths never fight over the DOM.
 */
(function () {
  'use strict';

  var file = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  if (file !== 'index.html' && file !== '') return;

  var CORE_SRC = './home-menu-icons-core.js?v=20260908-sprite-stable';
  var RELEVANT_SRC = './home-relevant.js?v=20260907-5';
  var RESCUE_SRC = './home-visual-rescue.js?v=20260908-rescue-4';

  function loadScript(src, onload, onerror) {
    var script = document.createElement('script');
    script.src = src;
    script.onload = onload || function () {};
    script.onerror = onerror || function () {};
    document.head.appendChild(script);
  }

  function installSpriteStyles() {
    if (document.getElementById('home-sprite-style')) return;

    var style = document.createElement('style');
    style.id = 'home-sprite-style';
    style.textContent = `
      #home-menu10 .home-menu10-icon {
        width:128px!important;
        height:128px!important;
        flex:0 0 128px!important;
        background-repeat:no-repeat!important;
        background-size:640px 256px!important;
        background-attachment:scroll!important;
        image-rendering:auto!important;
      }
      #home-menu10 .home-menu10-card:nth-child(2) .home-menu10-icon{background-position:0 0!important}
      #home-menu10 .home-menu10-card:nth-child(3) .home-menu10-icon{background-position:-128px 0!important}
      #home-menu10 .home-menu10-card:nth-child(4) .home-menu10-icon{background-position:-256px 0!important}
      #home-menu10 .home-menu10-card:nth-child(5) .home-menu10-icon{background-position:-384px 0!important}
      #home-menu10 .home-menu10-card:nth-child(6) .home-menu10-icon{background-position:-512px 0!important}
      #home-menu10 .home-menu10-card:nth-child(7) .home-menu10-icon{background-position:0 -128px!important}
      #home-menu10 .home-menu10-card:nth-child(8) .home-menu10-icon{background-position:-128px -128px!important}
      #home-menu10 .home-menu10-card:nth-child(9) .home-menu10-icon{background-position:-256px -128px!important}
      #home-menu10 .home-menu10-card:nth-child(10) .home-menu10-icon{background-position:-384px -128px!important}
      @media(max-width:620px){
        #home-menu10 .home-menu10-icon{
          width:96px!important;
          height:96px!important;
          flex-basis:96px!important;
          background-size:480px 192px!important;
        }
        #home-menu10 .home-menu10-card:nth-child(2) .home-menu10-icon{background-position:0 0!important}
        #home-menu10 .home-menu10-card:nth-child(3) .home-menu10-icon{background-position:-96px 0!important}
        #home-menu10 .home-menu10-card:nth-child(4) .home-menu10-icon{background-position:-192px 0!important}
        #home-menu10 .home-menu10-card:nth-child(5) .home-menu10-icon{background-position:-288px 0!important}
        #home-menu10 .home-menu10-card:nth-child(6) .home-menu10-icon{background-position:-384px 0!important}
        #home-menu10 .home-menu10-card:nth-child(7) .home-menu10-icon{background-position:0 -96px!important}
        #home-menu10 .home-menu10-card:nth-child(8) .home-menu10-icon{background-position:-96px -96px!important}
        #home-menu10 .home-menu10-card:nth-child(9) .home-menu10-icon{background-position:-192px -96px!important}
        #home-menu10 .home-menu10-card:nth-child(10) .home-menu10-icon{background-position:-288px -96px!important}
      }
    `;
    document.head.appendChild(style);
  }

  function removeBerakhlakVisual() {
    document.querySelectorAll('#hero-culture-values').forEach(function (element) {
      element.remove();
    });
  }

  function hasCompleteMenu() {
    var section = document.getElementById('home-menu10');
    if (!section) return false;

    var cards = section.querySelectorAll('.home-menu10-card');
    var icons = section.querySelectorAll('.home-menu10-icon');
    var pelayanan = section.querySelector('.custom-pelayanan .home-menu10-custom-icon');
    if (cards.length !== 10 || icons.length !== 9 || !pelayanan) return false;
    if (!pelayanan.getAttribute('src')) return false;

    return Array.from(icons).every(function (icon) {
      var background = getComputedStyle(icon).backgroundImage;
      return background && background !== 'none';
    });
  }

  function loadRescueWhenNeeded() {
    window.setTimeout(function () {
      if (!hasCompleteMenu()) loadScript(RESCUE_SRC);
    }, 1200);
  }

  function loadRelevantThenRescue() {
    loadScript(RELEVANT_SRC, loadRescueWhenNeeded, loadRescueWhenNeeded);
  }

  function loadCore() {
    removeBerakhlakVisual();
    installSpriteStyles();
    loadScript(CORE_SRC, loadRelevantThenRescue, loadRelevantThenRescue);
  }

  loadScript('./home-visual-fix.js?v=20260907-5', loadCore, loadCore);
})();
