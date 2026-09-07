/*
 * Bootstrap homepage scripts without changing the public HTML structure.
 * The original 10-icon module is preserved in home-menu-icons-core.js.
 */
(function () {
  'use strict';

  var core = document.createElement('script');
  core.src = './home-menu-icons-core.js?v=20260907-1';
  core.onload = function () {
    var relevant = document.createElement('script');
    relevant.src = './home-relevant.js?v=20260907-1';
    relevant.onload = function () {
      var layout = document.createElement('script');
      layout.src = './home-layout-polish.js?v=20260907-1';
      document.head.appendChild(layout);
    };
    document.head.appendChild(relevant);
  };
  core.onerror = function () {
    var relevant = document.createElement('script');
    relevant.src = './home-relevant.js?v=20260907-1';
    relevant.onload = function () {
      var layout = document.createElement('script');
      layout.src = './home-layout-polish.js?v=20260907-1';
      document.head.appendChild(layout);
    };
    document.head.appendChild(relevant);
  };
  document.head.appendChild(core);
})();