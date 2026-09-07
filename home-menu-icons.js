/*
 * Beranda — orchestrator for the homepage visual/menu modules.
 * Culture visuals are rendered directly by index.html; this loader only starts
 * the visual/menu modules and the HQ sprite rescue layer.
 */
(function () {
  'use strict';

  function loadScript(src, onload, onerror) {
    var script = document.createElement('script');
    script.src = src;
    script.onload = onload;
    script.onerror = onerror || function () {};
    document.head.appendChild(script);
  }

  function loadRescue() {
    loadScript('./home-visual-rescue.js?v=20260907-7');
  }

  loadScript(
    './home-visual-fix.js?v=20260907-6',
    function () {
      loadScript(
        './home-menu-icons-core.js?v=20260907-6',
        function () {
          loadScript('./home-relevant.js?v=20260907-6', loadRescue, loadRescue);
        },
        function () {
          loadScript('./home-relevant.js?v=20260907-6', loadRescue, loadRescue);
        }
      );
    },
    function () {
      loadScript(
        './home-menu-icons-core.js?v=20260907-6',
        function () {
          loadScript('./home-relevant.js?v=20260907-6', loadRescue, loadRescue);
        },
        function () {
          loadRescue();
        }
      );
    }
  );
})();
