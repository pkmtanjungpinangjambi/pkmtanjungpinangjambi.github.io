/* Homepage visual compatibility layer — tablet grid and Hero culture values. */
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

  function installHeroCultureStyles() {
    if (document.getElementById('home-hero-culture-style')) return;
    const style = document.createElement('style');
    style.id = 'home-hero-culture-style';
    style.textContent = `
      .hero-culture-values{
        display:grid;
        grid-template-columns:repeat(2,minmax(0,210px));
        gap:14px;
        margin:18px 0 0;
      }
      .hero-culture-card{
        display:block;
        min-width:0;
        padding:8px;
        border:1px solid #dfeae6;
        border-radius:18px;
        background:#fff;
        box-shadow:0 8px 22px rgba(0,59,45,.055);
        overflow:hidden;
        text-decoration:none;
        transition:transform .2s ease,box-shadow .2s ease,border-color .2s ease;
      }
      .hero-culture-card:hover,.hero-culture-card:focus-visible{
        transform:translateY(-3px);
        border-color:#b9ddd1;
        box-shadow:0 14px 28px rgba(0,59,45,.1);
        outline:none;
      }
      .hero-culture-mark{
        width:100%;
        height:170px;
        display:block;
        object-fit:contain;
        object-position:center;
        background:#fff;
      }
      @media(max-width:620px){
        .hero-culture-values{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:15px}
        .hero-culture-card{border-radius:15px;padding:6px}
        .hero-culture-mark{height:145px}
      }
      @media(max-width:380px){
        .hero-culture-mark{height:132px}
      }
    `;
    document.head.appendChild(style);
  }

  function removeStandaloneCulture() {
    document.querySelectorAll('#home-culture-v4, #home-culture').forEach(function (element) {
      element.remove();
    });
  }

  function removeLeaderCulture() {
    document.querySelectorAll('.leader-badges').forEach(function (element) {
      element.remove();
    });
  }

  function installHeroCulture() {
    const heroCopy = document.querySelector('.hero-copy');
    const tagline = heroCopy && heroCopy.querySelector('.home-tagline');
    const oldFeatures = heroCopy && heroCopy.querySelector('.feat-grid');
    if (!heroCopy || !tagline || document.getElementById('hero-culture-values')) return;

    installHeroCultureStyles();

    const section = document.createElement('div');
    section.id = 'hero-culture-values';
    section.className = 'hero-culture-values';
    section.setAttribute('aria-label', 'Identitas budaya pelayanan');

    const createCultureCard = (src, alt, ariaLabel) => {
      const card = document.createElement('a');
      card.className = 'hero-culture-card';
      card.href = 'profil.html#motto-tata-nilai';
      card.setAttribute('aria-label', ariaLabel);

      const image = document.createElement('img');
      image.className = 'hero-culture-mark';
      image.src = src;
      image.alt = alt;
      image.loading = 'eager';
      image.decoding = 'async';
      card.appendChild(image);
      return card;
    };

    section.append(
      createCultureCard('./assets/culture/akhlak.png', 'Nilai budaya pelayanan BerAKHLAK', 'Lihat tata nilai BerAKHLAK'),
      createCultureCard('./assets/culture/5s.png', 'Motto pelayanan 5S: Senyum, Sapa, Salam, Sopan, Santun', 'Lihat motto pelayanan 5S')
    );

    tagline.insertAdjacentElement('afterend', section);
    if (oldFeatures) oldFeatures.remove();
  }

  function initVisualFix() {
    installTabletGrid();
    installHeroCultureStyles();
    removeStandaloneCulture();
    removeLeaderCulture();
    installHeroCulture();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVisualFix, { once: true });
  } else {
    initVisualFix();
  }

  window.setTimeout(initVisualFix, 250);
})();
