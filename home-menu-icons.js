/*
 * Beranda — orchestrator for the homepage visual/menu modules.
 * Legacy culture markup is suppressed before the visual fixer runs so the old
 * 2029 feature icons and leader badges cannot flash during initialization.
 */
(function () {
  'use strict';

  const legacySelectors = [
    '#home-culture-v4',
    '#home-culture',
    '.hero-home .hero-copy > .feat-grid',
    '.leader-card-v2 > .leader-badges',
    '.leader-card-v2 > .leader-script'
  ];

  function suppressLegacyMarkup() {
    legacySelectors.forEach(function (selector) {
      document.querySelectorAll(selector).forEach(function (element) {
        element.remove();
      });
    });
  }

  function installLegacyGuardStyles() {
    if (document.getElementById('home-legacy-culture-guard')) return;

    const style = document.createElement('style');
    style.id = 'home-legacy-culture-guard';
    style.textContent = `
      #home-culture-v4,
      #home-culture,
      .hero-home .hero-copy > .feat-grid,
      .leader-card-v2 > .leader-badges,
      .leader-card-v2 > .leader-script {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
  }

  function loadScript(src, onload, onerror) {
    const script = document.createElement('script');
    script.src = src;
    script.onload = onload;
    script.onerror = onerror || function () {};
    document.head.appendChild(script);
  }

  installLegacyGuardStyles();
  suppressLegacyMarkup();

  // Protect against any obsolete module being injected after initialization.
  const observer = new MutationObserver(function () {
    suppressLegacyMarkup();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });

  loadScript(
    './home-visual-fix.js?v=20260907-5',
    function () {
      loadScript(
        './home-menu-icons-core.js?v=20260907-5',
        function () {
          loadScript('./home-relevant.js?v=20260907-5');
        },
        function () {
          loadScript('./home-relevant.js?v=20260907-5');
        }
      );
    },
    function () {
      // Keep the homepage functional even if the visual compatibility layer fails.
      loadScript('./home-menu-icons-core.js?v=20260907-5', function () {
        loadScript('./home-relevant.js?v=20260907-5');
      });
    }
  );
})();
