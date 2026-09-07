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
        grid-template-columns:minmax(0,460px);
        gap:14px;
        margin:18px 0 0;
        width:100%;
        max-width:460px;
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
        height:auto;
        max-height:285px;
        display:block;
        object-fit:contain;
        object-position:center;
        background:#fff;
      }
      .leader-5s-link{
        display:flex;
        justify-content:center;
        align-items:center;
        margin:8px auto 0;
        padding:4px 6px;
        border-radius:16px;
        text-decoration:none;
        background:#fff;
        border:1px solid #dfeae6;
        box-shadow:0 6px 18px rgba(0,59,45,.06);
        width:100%;
        max-width:220px;
      }
      .leader-5s-link:hover,.leader-5s-link:focus-visible{
        border-color:#b9ddd1;
        box-shadow:0 10px 24px rgba(0,59,45,.1);
        outline:none;
      }
      .leader-5s-image{
        display:block;
        width:100%;
        max-width:180px;
        height:auto;
        object-fit:contain;
      }
      @media(max-width:620px){
        .hero-culture-values{grid-template-columns:minmax(0,1fr);gap:10px;margin-top:15px;max-width:100%}
        .hero-culture-card{border-radius:15px;padding:6px}
        .hero-culture-mark{max-height:none}
        .leader-5s-link{max-width:195px}
        .leader-5s-image{max-width:165px}
      }
    `;
    document.head.appendChild(style);
  }

  function removeStandaloneCulture() {
    document.querySelectorAll('#home-culture-v4, #home-culture').forEach(function (element) {
      element.remove();
    });
  }

  function normalizeLeaderCulture() {
    const leaderCard = document.querySelector('.leader-card-v2');
    if (!leaderCard) return;

    leaderCard.querySelectorAll('.leader-badges, .leader-script').forEach(function (element) {
      element.remove();
    });

    if (leaderCard.querySelector('#leader-5s-visual')) return;

    const period = leaderCard.querySelector('.periode-text');
    if (!period) return;

    const link = document.createElement('a');
    link.id = 'leader-5s-visual';
    link.className = 'leader-5s-link';
    link.href = 'profil.html#motto-tata-nilai';
    link.setAttribute('aria-label', 'Lihat motto pelayanan 5S');

    const image = document.createElement('img');
    image.className = 'leader-5s-image';
    image.src = './assets/culture/5s.png';
    image.alt = 'Motto pelayanan 5S: Senyum, Sapa, Salam, Sopan, Santun';
    image.loading = 'eager';
    image.decoding = 'async';

    link.appendChild(image);
    period.insertAdjacentElement('afterend', link);
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

    const card = document.createElement('a');
    card.className = 'hero-culture-card';
    card.href = 'profil.html#motto-tata-nilai';
    card.setAttribute('aria-label', 'Lihat tata nilai BerAKHLAK');

    const image = document.createElement('img');
    image.className = 'hero-culture-mark';
    image.src = './assets/culture/akhlak.png';
    image.alt = 'Nilai budaya pelayanan BerAKHLAK';
    image.loading = 'eager';
    image.decoding = 'async';

    card.appendChild(image);
    section.appendChild(card);

    tagline.insertAdjacentElement('afterend', section);
    if (oldFeatures) oldFeatures.remove();
  }

  function initVisualFix() {
    installTabletGrid();
    installHeroCultureStyles();
    removeStandaloneCulture();
    normalizeLeaderCulture();
    installHeroCulture();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVisualFix, { once: true });
  } else {
    initVisualFix();
  }

  window.setTimeout(initVisualFix, 250);
})();