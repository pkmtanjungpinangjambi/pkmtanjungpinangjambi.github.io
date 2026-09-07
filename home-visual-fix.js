/* Homepage visual compatibility layer — tablet grid, sprite fallback, culture deduplication. */
(function () {
  'use strict';

  const originalFetch = window.fetch.bind(window);
  window.fetch = function (input, init) {
    try {
      const url = typeof input === 'string' ? input : input && input.url;
      if (url) {
        const replacements = [
          ['sprite-56-part-01.txt?v=20260906-1', 'sprite-hq-part-01.txt?v=20260907-2'],
          ['sprite-56-part-02.txt?v=20260906-1', 'sprite-hq-part-02.txt?v=20260907-2']
        ];
        for (const [oldPart, newPart] of replacements) {
          if (url.includes(oldPart)) {
            const nextUrl = url.replace(oldPart, newPart);
            return originalFetch(nextUrl, init);
          }
        }
      }
    } catch (error) {
      console.warn('[PKM] Visual compatibility fetch layer failed:', error);
    }
    return originalFetch(input, init);
  };

  function installTabletGrid() {
    if (document.getElementById('home-tablet-grid-fix')) return;
    const style = document.createElement('style');
    style.id = 'home-tablet-grid-fix';
    style.textContent = `
      @media (min-width:621px) and (max-width:980px){
        #home-menu10 .home-menu10-grid{grid-template-columns:repeat(4,minmax(0,1fr)) !important}
      }
    `;
    document.head.appendChild(style);
  }

  function removeStandaloneCulture() {
    document.querySelectorAll('#home-culture-v4, #home-culture').forEach(function (element) {
      element.remove();
    });
  }

  function preserveLeaderCulture() {
    const badges = document.querySelector('.leader-badges');
    if (!badges) return;

    const texts = Array.from(badges.querySelectorAll('.culture-badge-link')).map(function (link) {
      return (link.textContent || '').trim();
    });

    if (!texts.some(function (text) { return text.includes('BerAKHLAK'); })) {
      const link = document.createElement('a');
      link.className = 'culture-badge-link';
      link.href = 'profil.html#motto-tata-nilai';
      link.textContent = '💚 BerAKHLAK';
      badges.insertBefore(link, badges.firstElementChild || null);
    }

    if (!Array.from(badges.querySelectorAll('.culture-badge-link')).some(function (link) {
      return (link.textContent || '').includes('5S');
    })) {
      const link = document.createElement('a');
      link.className = 'culture-badge-link';
      link.href = 'profil.html#motto-tata-nilai';
      link.textContent = '😊 5S';
      badges.appendChild(link);
    }
  }

  function initVisualFix() {
    installTabletGrid();
    removeStandaloneCulture();
    preserveLeaderCulture();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVisualFix, { once: true });
  } else {
    initVisualFix();
  }

  window.setTimeout(initVisualFix, 250);
})();
