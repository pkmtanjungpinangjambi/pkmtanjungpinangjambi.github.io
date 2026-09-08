/* Homepage visual compatibility layer — tablet grid, Hero culture values, unified header, and leader culture. */
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
        grid-template-columns:minmax(0,460px);
        gap:14px;
        margin:18px 0 0;
        width:100%;
        max-width:460px;
      }
      .hero-culture-card{
        display:flex;
        align-items:center;
        justify-content:center;
        min-width:0;
        min-height:260px;
        padding:10px;
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
        display:block;
        width:auto;
        height:auto;
        max-width:100%;
        max-height:240px;
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
        max-width:264px;
      }
      .leader-5s-link:hover,.leader-5s-link:focus-visible{
        border-color:#b9ddd1;
        box-shadow:0 10px 24px rgba(0,59,45,.1);
        outline:none;
      }
      .leader-5s-image{
        display:block;
        width:100%;
        max-width:216px;
        height:auto;
        object-fit:contain;
      }

      /* Stable leadership composition: explicit grid + no timer-based reinitialization. */
      .hero-home .hero-home-inner{align-items:start!important}
      .hero-home .leader-wrap{
        display:grid!important;
        grid-template-columns:minmax(0,345px) minmax(250px,290px)!important;
        align-items:center!important;
        justify-content:center!important;
        gap:0!important;
        min-height:430px!important;
      }
      .hero-home .leader-img{
        display:block!important;
        width:100%!important;
        max-width:345px!important;
        margin:0!important;
        justify-self:center!important;
        align-self:center!important;
      }
      .hero-home .leader-card-v2{
        width:min(290px,100%)!important;
        margin:0 0 0 -38px!important;
        align-self:center!important;
        justify-self:start!important;
        position:relative!important;
        z-index:2!important;
      }
      @media(max-width:1180px){
        .hero-home .leader-wrap{grid-template-columns:minmax(0,430px) minmax(250px,290px)!important;min-height:430px!important}
        .hero-home .leader-img{max-width:430px!important}
      }
      @media(max-width:900px){
        .hero-home .leader-wrap{grid-template-columns:minmax(0,430px) minmax(250px,290px)!important;min-height:430px!important;gap:0!important}
        .hero-home .leader-card-v2{margin:0 0 0 -30px!important}
      }
      @media(max-width:700px){
        .hero-home .leader-wrap{grid-template-columns:1fr!important;min-height:0!important;justify-items:center!important;gap:0!important;padding:14px!important}
        .hero-home .leader-img{max-width:430px!important}
        .hero-home .leader-card-v2{width:min(340px,94%)!important;margin:-1px auto 0!important;justify-self:center!important;align-self:start!important}
      }
      @media(max-width:620px){
        .hero-home .leader-wrap{padding:14px!important}
        .hero-home .leader-card-v2{margin:-1px auto 0!important}
      }

      @media(max-width:620px){
        .hero-culture-values{grid-template-columns:minmax(0,1fr);gap:10px;margin-top:15px;max-width:100%}
        .hero-culture-card{min-height:0;border-radius:15px;padding:8px}
        .hero-culture-mark{max-width:100%;max-height:288px}
        .leader-5s-link{max-width:234px}
        .leader-5s-image{max-width:198px}
      }
    `;
    document.head.appendChild(style);
  }

  function upgradeCultureAssetPaths() {
    document.querySelectorAll('.hero-culture-mark').forEach(function (image) {
      image.src = './assets/culture/akhlak-hq.webp?v=20260908-hq';
    });
    document.querySelectorAll('.leader-5s-image').forEach(function (image) {
      image.src = './assets/culture/5s-hq.webp?v=20260908-hq';
    });
  }

  function removeStandaloneCulture() {
    document.querySelectorAll('#home-culture-v4, #home-culture').forEach(function (element) {
      element.remove();
    });
  }

  function normalizeLeaderCulture() {
    const leaderCard = document.querySelector('.leader-card-v2');
    if (!leaderCard || leaderCard.dataset.pkmCultureNormalized === '1') return;

    leaderCard.querySelectorAll('#leader-5s-visual, .leader-badges, .leader-script').forEach(function (element) {
      element.remove();
    });

    const period = leaderCard.querySelector('.periode-text');
    if (!period) return;

    const link = document.createElement('a');
    link.id = 'leader-5s-visual';
    link.className = 'leader-5s-link';
    link.href = 'profil.html#motto-tata-nilai';
    link.setAttribute('aria-label', 'Lihat motto pelayanan 5S');

    const image = document.createElement('img');
    image.className = 'leader-5s-image';
    image.src = './assets/culture/5s-hq.webp';
    image.alt = 'Motto pelayanan 5S: Senyum, Sapa, Salam, Sopan, Santun';
    image.loading = 'eager';
    image.decoding = 'async';

    link.appendChild(image);
    period.insertAdjacentElement('afterend', link);
    leaderCard.dataset.pkmCultureNormalized = '1';
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
    image.src = './assets/culture/akhlak-hq.webp';
    image.alt = 'Nilai budaya pelayanan BerAKHLAK';
    image.loading = 'eager';
    image.decoding = 'async';

    card.appendChild(image);
    section.appendChild(card);
    tagline.insertAdjacentElement('afterend', section);
    if (oldFeatures) oldFeatures.remove();
  }

  function initVisualFix() {
    installUnifiedHeaderStyles();
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
})();
