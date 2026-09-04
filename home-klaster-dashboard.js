/* Public dashboard: five service clusters. No patient/PHI data. */
(function () {
  'use strict';
  const file = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  if (file !== 'index.html' && file !== '') return;

  const loadConfig = (done) => {
    if (Array.isArray(window.KLASTER_CONFIG)) return done(window.KLASTER_CONFIG);
    const script = document.createElement('script');
    script.src = 'data/klaster-config.js?v=20260904';
    script.defer = true;
    script.onload = () => Array.isArray(window.KLASTER_CONFIG) && done(window.KLASTER_CONFIG);
    script.onerror = () => console.warn('[PKM] Konfigurasi klaster gagal dimuat.');
    document.head.appendChild(script);
  };

  function style() {
    if (document.getElementById('home-klaster-dashboard-style')) return;
    const s = document.createElement('style'); s.id='home-klaster-dashboard-style';
    s.textContent = `
      .home-klaster-dashboard{margin:34px auto 0;padding:24px;border:1px solid #dbe9e3;border-radius:22px;background:linear-gradient(180deg,#fbfefd,#f2f8f5);box-shadow:0 10px 30px rgba(0,59,45,.07)}
      .home-klaster-head{text-align:center;max-width:780px;margin:0 auto 18px}
      .home-klaster-kicker{margin:0;color:#0b5d49;font-size:.74rem;font-weight:900;letter-spacing:.06em;text-transform:uppercase}
      .home-klaster-title{margin:5px 0 7px;color:#183b33;font-size:clamp(1.3rem,2.8vw,1.9rem);font-weight:900}
      .home-klaster-intro{margin:0;color:#64736d;font-size:.86rem;line-height:1.7}
      .home-klaster-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px}
      .home-klaster-card{display:block;padding:16px 14px;border:1px solid #dfeae6;border-radius:16px;background:#fff;color:inherit;text-decoration:none;box-shadow:0 6px 16px rgba(0,59,45,.05);transition:transform .2s,box-shadow .2s,border-color .2s}
      .home-klaster-card:hover{transform:translateY(-4px);border-color:#0b5d49;box-shadow:0 12px 24px rgba(0,59,45,.10)}
      .home-klaster-code{display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:10px;background:#eef7f4;color:#0b5d49;font-weight:900;font-size:.78rem}
      .home-klaster-card h3{margin:10px 0 5px;color:#183b33;font-size:.92rem;line-height:1.3}
      .home-klaster-card p{margin:0;color:#6c7772;font-size:.75rem;line-height:1.5}
      .home-klaster-modules{margin-top:9px;color:#0b5d49;font-size:.7rem;font-weight:800;line-height:1.45}
      .home-klaster-foot{display:flex;justify-content:center;margin-top:17px}
      .home-klaster-cta{display:inline-flex;align-items:center;gap:7px;padding:10px 15px;border-radius:999px;background:#0b5d49;color:#fff;text-decoration:none;font-size:.8rem;font-weight:900}
      @media(max-width:1050px){.home-klaster-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
      @media(max-width:650px){.home-klaster-dashboard{padding:18px 14px}.home-klaster-grid{grid-template-columns:1fr 1fr}.home-klaster-card{padding:14px 12px}}
      @media(max-width:420px){.home-klaster-grid{grid-template-columns:1fr}}
    `;
    document.head.appendChild(s);
  }

  function render(config){
    if (document.getElementById('home-klaster-dashboard')) return;
    const main = document.querySelector('main');
    if (!main) return;
    const anchor = main.querySelector('.hero-home') || main.firstElementChild;
    const section = document.createElement('section');
    section.id='home-klaster-dashboard'; section.className='home-klaster-dashboard';
    const head=document.createElement('div'); head.className='home-klaster-head';
    head.innerHTML='<p class="home-klaster-kicker">PUSKESMAS · 5 KLASTER</p><h2 class="home-klaster-title">Pelayanan Terintegrasi dalam Satu Pintu</h2><p class="home-klaster-intro">Pilih klaster sesuai kebutuhan. Informasi pelayanan, jadwal, skrining, tindak lanjut, dan mutu mengikuti struktur klaster masing-masing.</p>';
    const grid=document.createElement('div'); grid.className='home-klaster-grid';
    config.forEach((c)=>{
      const a=document.createElement('a'); a.className='home-klaster-card'; a.href=`pelayanan.html#${c.id}`; a.setAttribute('aria-label',`Buka ${c.code} ${c.name}`);
      const code=document.createElement('span'); code.className='home-klaster-code'; code.textContent=c.code;
      const h=document.createElement('h3'); h.textContent=c.name;
      const p=document.createElement('p'); p.textContent=c.scope;
      const m=document.createElement('div'); m.className='home-klaster-modules'; m.textContent=(c.dataModules||[]).slice(0,3).join(' · ') + ((c.dataModules||[]).length>3 ? ' …' : '');
      a.append(code,h,p,m); grid.appendChild(a);
    });
    const foot=document.createElement('div'); foot.className='home-klaster-foot'; foot.innerHTML='<a class="home-klaster-cta" href="pelayanan.html">Lihat Seluruh Pelayanan →</a>';
    section.append(head,grid,foot);
    if (anchor?.classList.contains('hero-home')) anchor.insertAdjacentElement('afterend',section); else main.prepend(section);
  }

  loadConfig((config)=>{style();render(config);});
})();
