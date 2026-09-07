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

  function installUnifiedHeaderStyles() {
    if (document.getElementById('home-unified-header-style')) return;
    const style = document.createElement('style');
    style.id = 'home-unified-header-style';
    style.textContent = `
      /* HEADER UNIFIED — Beranda mengikuti master header seluruh menu */
      .site-header .nav-wrap .brand{
        align-items:center!important;
        align-self:center!important;
        gap:0!important;
        width:384px!important;
        max-width:384px!important;
        min-width:0!important;
        height:91px!important;
        flex:0 0 384px!important;
        overflow:visible!important;
      }
      .site-header .nav-wrap .brand > span:not(.brand-mark){display:none!important}
      .site-header .nav-wrap .brand .brand-mark{
        width:384px!important;
        height:91px!important;
        min-width:384px!important;
        max-width:384px!important;
        flex:0 0 384px!important;
        padding:0!important;
        margin:0!important;
        border:0!important;
        border-radius:0!important;
        background:transparent!important;
        box-shadow:none!important;
        overflow:visible!important;
        display:block!important;
      }
      .site-header .nav-wrap .brand .brand-mark img{
        content:url("./LOGO-KOTA-DINAS.PNG?v=20260907-header-unified")!important;
        display:block!important;
        width:384px!important;
        height:91px!important;
        min-width:384px!important;
        max-width:none!important;
        max-height:none!important;
        object-fit:contain!important;
        object-position:center!important;
        margin:0!important;
      }
      .site-header .nav-wrap .nav{display:flex!important;align-items:center!important;gap:4px!important}
      .site-header .nav-wrap .nav a{
        padding:10px 13px!important;
        border-radius:10px!important;
        font-size:.9rem!important;
        font-weight:700!important;
        color:#3d514b!important;
        background:transparent!important;
        text-decoration:none!important;
      }
      .site-header .nav-wrap .nav a:hover,.site-header .nav-wrap .nav a.active{background:var(--green-100)!important;color:var(--green-900)!important}
      .site-header .nav-wrap .nav .nav-cta{background:var(--green-900)!important;color:#fff!important;border:1px solid var(--green-900)!important}
      .site-header .nav-wrap .nav .nav-cta:hover{background:var(--green-700)!important;color:#fff!important;border-color:var(--green-700)!important}
      .site-header .nav-wrap .dropdown-caret-btn{background:transparent!important;color:#3d514b!important;border:0!important}
      .site-header .nav-wrap .dropdown-caret-btn:hover{background:var(--green-100)!important;color:var(--green-900)!important}
      @media(max-width:1180px){
        .site-header .nav-wrap .brand{width:360px!important;max-width:360px!important;height:86px!important;flex-basis:360px!important}
        .site-header .nav-wrap .brand .brand-mark{width:360px!important;height:86px!important;min-width:360px!important;max-width:360px!important;flex-basis:360px!important}
        .site-header .nav-wrap .brand .brand-mark img{width:360px!important;height:86px!important;min-width:360px!important}
        .site-header .nav-wrap .nav a{padding:9px 10px!important;font-size:.85rem!important}
      }
      @media(max-width:1024px){
        .site-header .nav-wrap .nav-toggle{display:block!important}
        .site-header .nav-wrap .nav{display:none!important;position:absolute!important;left:18px!important;right:18px!important;top:70px!important;background:#fff!important;border:1px solid var(--line)!important;border-radius:15px!important;padding:8px!important;box-shadow:var(--shadow)!important;flex-direction:column!important;align-items:stretch!important;z-index:70!important}
        .site-header .nav-wrap .nav.open{display:flex!important}
      }
      @media(max-width:600px){
        .site-header .nav-wrap .brand{width:282px!important;max-width:282px!important;height:67px!important;flex-basis:282px!important}
        .site-header .nav-wrap .brand .brand-mark{width:282px!important;height:67px!important;min-width:282px!important;max-width:282px!important;flex-basis:282px!important}
        .site-header .nav-wrap .brand .brand-mark img{width:282px!important;height:67px!important;min-width:282px!important}
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
        grid-template-columns:repeat(2,minmax(0,1fr));
        gap:14px;
        margin:18px 0 0;
        width:100%;
        max-width:920px;
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
      @media(max-width:900px){
        .hero-culture-values{grid-template-columns:1fr;max-width:620px}
      }
      @media(max-width:620px){
        .hero-culture-values{gap:10px;margin-top:15px;max-width:100%}
        .hero-culture-card{border-radius:15px;padding:6px}
        .hero-culture-mark{max-height:none}
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
    document.querySelectorAll('.leader-card-v2 #leader-5s-visual, .leader-card-v2 .leader-badges, .leader-card-v2 .leader-script').forEach(function (element) {
      element.remove();
    });
  }

  function createCultureCard(href, imageSrc, imageAlt, label) {
    const card = document.createElement('a');
    card.className = 'hero-culture-card';
    card.href = href;
    card.setAttribute('aria-label', label);

    const image = document.createElement('img');
    image.className = 'hero-culture-mark';
    image.src = imageSrc;
    image.alt = imageAlt;
    image.loading = 'eager';
    image.decoding = 'async';

    card.appendChild(image);
    return card;
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

    section.appendChild(createCultureCard(
      'profil.html#motto-tata-nilai',
      './assets/culture/akhlak.png',
      'Nilai budaya pelayanan BerAKHLAK',
      'Lihat tata nilai BerAKHLAK'
    ));

    section.appendChild(createCultureCard(
      'profil.html#motto-tata-nilai',
      './assets/culture/5s.png',
      'Motto pelayanan 5S: Senyum, Sapa, Salam, Sopan, Santun',
      'Lihat motto pelayanan 5S'
    ));

    tagline.insertAdjacentElement('afterend', section);
    if (oldFeatures) oldFeatures.remove();
  }

  function initVisualFix() {
    installUnifiedHeaderStyles();
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
