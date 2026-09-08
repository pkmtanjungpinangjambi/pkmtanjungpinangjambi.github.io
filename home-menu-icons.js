/*
 * Beranda — lightweight orchestrator for homepage visual/menu modules.
 * Culture visuals are static in index.html. The menu core keeps its existing
 * behavior, while the rescue renderer provides a deterministic fallback for
 * sprite-based quick-access logos.
 */
(function () {
  'use strict';

  var file = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  if (file !== 'index.html' && file !== '') return;

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

  function loadScript(src, onload, onerror) {
    var script = document.createElement('script');
    script.src = src;
    script.onload = onload;
    script.onerror = onerror || function () {};
    document.head.appendChild(script);
  }

  function loadRescue() {
    loadScript('./home-visual-rescue.js?v=20260908-fallback-2');
  }

  function loadRelevantThenRescue() {
    loadScript('./home-relevant.js?v=20260907-5', loadRescue, loadRescue);
  }

  function loadCore() {
    removeBerakhlakVisual();
    loadScript('./home-menu-icons-core.js?v=20260908-valid-sprite', function () {
      installSpriteStyles();
      loadRelevantThenRescue();
    }, function () {
      installSpriteStyles();
      loadRelevantThenRescue();
    });
  }

  loadScript(
    './home-visual-fix.js?v=20260907-5',
    loadCore,
    loadCore
  );
})();
