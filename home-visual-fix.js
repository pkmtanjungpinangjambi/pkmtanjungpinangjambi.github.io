/* Homepage visual compatibility layer — tablet grid, sprite fallback, and Hero culture values. */
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
        grid-template-columns:repeat(2,minmax(0,170px));
        gap:14px;
        margin:18px 0 0;
      }
      .hero-culture-card{
        display:block;
        min-width:0;
        padding:0;
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
        background-color:#fff;
        background-image:url('./assets/culture/berakhlak-5s.svg');
        background-repeat:no-repeat;
        background-size:200% auto;
      }
      .hero-culture-mark--berakhlak{background-position:left center}
      .hero-culture-mark--5s{background-position:right center}
      @media(max-width:620px){
        .hero-culture-values{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:15px}
        .hero-culture-card{border-radius:15px}
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

    const berakhlak = document.createElement('a');
    berakhlak.className = 'hero-culture-card';
    berakhlak.href = 'profil.html#motto-tata-nilai';
    berakhlak.setAttribute('aria-label', 'Lihat tata nilai BerAKHLAK');
    const berakhlakMark = document.createElement('span');
    berakhlakMark.className = 'hero-culture-mark hero-culture-mark--berakhlak';
    berakhlakMark.setAttribute('aria-hidden', 'true');
    berakhlak.appendChild(berakhlakMark);

    const fiveS = document.createElement('a');
    fiveS.className = 'hero-culture-card';
    fiveS.href = 'profil.html#motto-tata-nilai';
    fiveS.setAttribute('aria-label', 'Lihat motto pelayanan 5S');
    const fiveSMark = document.createElement('span');
    fiveSMark.className = 'hero-culture-mark hero-culture-mark--5s';
    fiveSMark.setAttribute('aria-hidden', 'true');
    fiveS.appendChild(fiveSMark);

    section.append(berakhlak, fiveS);
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
