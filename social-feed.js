(function(){
  'use strict';

  function load(src){
    return new Promise(function(resolve,reject){
      const script=document.createElement('script');
      script.src=src;
      script.defer=true;
      script.onload=resolve;
      script.onerror=reject;
      document.head.appendChild(script);
    });
  }

  function normalizeLeaderCulture(){
    const file=(window.location.pathname.split('/').pop()||'index.html').toLowerCase();
    if(file!=='index.html') return;

    const badges=document.querySelector('.leader-badges');
    if(!badges || badges.dataset.cultureNormalized==='1') return;

    badges.dataset.cultureNormalized='1';

    if(!document.getElementById('leader-culture-badge-style')){
      const style=document.createElement('style');
      style.id='leader-culture-badge-style';
      style.textContent=`
        .leader-badges{display:flex;gap:8px;flex-wrap:wrap}
        .leader-badges .culture-badge-link{display:inline-flex;align-items:center;gap:5px;background:#fff;border:1px solid var(--line);border-radius:999px;padding:5px 10px;font-size:.74rem;font-weight:900;color:var(--green-800);text-decoration:none;transition:transform .2s,box-shadow .2s,border-color .2s}
        .leader-badges .culture-badge-link:hover,.leader-badges .culture-badge-link:focus-visible{transform:translateY(-1px);border-color:var(--green-500);box-shadow:0 6px 14px rgba(0,59,45,.10);outline:none}
        .leader-badges .culture-logo-link{padding:2px 5px;background:transparent;border-color:transparent;box-shadow:none}
        .leader-badges .culture-logo-link:hover,.leader-badges .culture-logo-link:focus-visible{background:transparent;border-color:transparent;box-shadow:none}
        .leader-badges .culture-logo-link img{display:block;width:auto;height:48px;max-width:84px;object-fit:contain}
      `;
      document.head.appendChild(style);
    }

    const link=document.createElement('a');
    link.className='culture-badge-link culture-logo-link';
    link.href='profil.html#motto-tata-nilai';
    link.setAttribute('aria-label','BerAKHLAK dan 5S — Motto & Tata Nilai');
    const img=document.createElement('img');
    img.src='assets/culture/berakhlak-5s.svg';
    img.alt='BerAKHLAK dan 5S';
    img.loading='eager';
    img.width=64;
    img.height=52;
    link.appendChild(img);
    badges.replaceChildren(link);
  }

  const file=(window.location.pathname.split('/').pop()||'index.html').toLowerCase();
  if(file==='index.html' || file===''){
    normalizeLeaderCulture();
  }

  const tasks=[];
  if(file==='index.html'){
    tasks.push(load('home-culture.js').catch(function(error){console.warn('Homepage culture:',error);}));
  }

  if(document.getElementById('social-feed-grid')){
    tasks.push(Promise.all(tasks).then(function(){return load('social-feed-core.js');}));
  }
})();
