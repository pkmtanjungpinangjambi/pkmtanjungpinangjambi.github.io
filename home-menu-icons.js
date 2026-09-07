/*
 * Bootstrap homepage scripts without changing the public HTML structure.
 * The original 10-icon module is preserved in home-menu-icons-core.js.
 */
(function () {
  'use strict';

  var visualFix = document.createElement('script');
  visualFix.src = './home-visual-fix.js?v=20260907-7';
  visualFix.onload = loadCore;
  visualFix.onerror = loadCore;
  document.head.appendChild(visualFix);

  function loadCore() {
    var core = document.createElement('script');
    core.src = './home-menu-icons-core.js?v=20260907-7';
    core.onload = loadRelevant;
    core.onerror = loadRelevant;
    document.head.appendChild(core);
  }

  function loadRelevant() {
    var relevant = document.createElement('script');
    relevant.src = './home-relevant.js?v=20260907-7';
    relevant.onload = loadRescue;
    relevant.onerror = loadRescue;
    document.head.appendChild(relevant);
  }

  function loadRescue() {
    if (document.getElementById('home-visual-rescue-script')) return;
    var rescue = document.createElement('script');
    rescue.id = 'home-visual-rescue-script';
    rescue.src = './home-visual-rescue.js?v=20260907-3';
    document.head.appendChild(rescue);
  }
})();
