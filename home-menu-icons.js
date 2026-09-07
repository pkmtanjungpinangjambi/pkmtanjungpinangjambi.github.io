/*
 * Bootstrap homepage scripts without changing the public HTML structure.
 * The original 10-icon module is preserved in home-menu-icons-core.js.
 */
(function () {
  'use strict';

  var visualFix = document.createElement('script');
  visualFix.src = './home-visual-fix.js?v=20260907-2';
  visualFix.onload = loadCore;
  visualFix.onerror = loadCore;
  document.head.appendChild(visualFix);

  function loadCore() {
    var core = document.createElement('script');
    core.src = './home-menu-icons-core.js?v=20260907-2';
    core.onload = function () {
      var relevant = document.createElement('script');
      relevant.src = './home-relevant.js?v=20260907-2';
      document.head.appendChild(relevant);
    };
    core.onerror = function () {
      var fallback = document.createElement('script');
      fallback.src = './home-relevant.js?v=20260907-2';
      document.head.appendChild(fallback);
    };
    document.head.appendChild(core);
  }
})();
