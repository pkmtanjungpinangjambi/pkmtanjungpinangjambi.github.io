/* Beranda culture module v4 — BerAKHLAK + 5S, linked to Profil. */
(function(){
  'use strict';
  const file=(window.location.pathname.split('/').pop()||'index.html').toLowerCase();
  if(file!=='index.html'&&file!=='') return;
  const esc=(v)=>String(v??'');
  const addStyle=()=>{
    if(document.getElementById('home-culture-v4-style')) return;
    const s=document.createElement('style'); s.id='home-culture-v4-style';
    s.textContent=`
      .home-culture-v4{margin:18px auto 10px;}
      .culture-shell{display:grid;grid-template-columns:1.05fr .95fr;gap:16px;align-items:stretch;padding:20px;border:1px solid #dce9e4;border-radius:22px;background:linear-gradient(135deg,#f8fcfa,#eef7f3);box-shadow:0 12px 30px rgba(0,59,45,.06)}
      .culture-copy{padding:6px 4px;display:flex;flex-direction:column;justify-content:center}
      .culture-kicker{margin:0 0 5px;color:#0b5d49;font-size:.7rem;font-weight:950;letter-spacing:.09em;text-transform:uppercase}
      .culture-title{margin:0;color:#183b33;font-size:clamp(1.25rem,2.8vw,1.85rem);font-weight:950;line-height:1.18}
      .culture-sub{margin:8px 0 14px;color:#65756e;font-size:.82rem;line-height:1.6;max-width:620px}
      .culture-links{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:auto}
      .culture-link{display:flex;align-items:center;gap:10px;padding:12px 13px;border:1px solid #d9e8e2;border-radius:15px;background:#fff;text-decoration:none;color:inherit;transition:transform .2s,box-shadow .2s,border-color .2s}
      .culture-link:hover{transform:translateY(-3px);box-shadow:0 10px 24px rgba(0,59,45,.08);border-color:#0b5d49}
      .culture-icon{width:38px;height:38px;flex:0 0 38px;display:grid;place-items:center;border-radius:11px;background:#f0f7f4;font-weight:950;font-size:.88rem;color:#0b5d49}
      .culture-link strong{display:block;color:#183b33;font-size:.78rem;line-height:1.2}
      .culture-link span{display:block;color:#77837e;font-size:.65rem;line-height:1.35;margin-top:3px}
      .culture-art{position:relative;min-height:260px;border-radius:18px;overflow:hidden;background:radial-gradient(circle at 50% 40%,#fff 0,#f5faf8 55%,#e6f2ec 100%);border:1px solid #dce9e4}
      .culture-art .art-title{position:absolute;left:0;right:0;top:15px;text-align:center;font-weight:950;font-size:clamp(1.45rem,4vw,2.35rem);letter-spacing:-.03em;color:#9d1818;text-shadow:0 3px 0 #fff}
      .art-core{position:absolute;left:50%;top:58%;transform:translate(-50%,-50%);width:108px;height:108px;border-radius:50%;background:linear-gradient(145deg,#1b3559,#0b5d49);display:grid;place-items:center;box-shadow:0 16px 30px rgba(0,59,45,.22),inset 0 2px 0 rgba(255,255,255,.35);border:5px solid #fff}
      .art-core b{font-size:2.15rem;color:#fff;line-height:1}
      .art-ring{position:absolute;left:50%;top:58%;transform:translate(-50%,-50%);width:210px;height:210px;border-radius:50%;border:10px solid #d5e8de}
      .art-chip{position:absolute;display:grid;place-items:center;width:76px;height:42px;border-radius:13px;color:#fff;font-weight:900;font-size:.62rem;line-height:1.1;text-align:center;box-shadow:0 8px 16px rgba(0,0,0,.12);border:2px solid rgba(255,255,255,.7)}
      .art-chip:nth-of-type(1){left:8%;top:36%;background:#b51e1e}.art-chip:nth-of-type(2){left:16%;bottom:13%;background:#d09b0b}.art-chip:nth-of-type(3){right:8%;top:36%;background:#1f79ba}.art-chip:nth-of-type(4){right:15%;bottom:13%;background:#6d3fc0}
      .art-caption{position:absolute;bottom:10px;left:0;right:0;text-align:center;color:#67756f;font-size:.63rem;font-weight:800}
      .culture-mini{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:12px;padding-top:11px;border-top:1px dashed #d6e5df}
      .culture-mini span{color:#68766f;font-size:.67rem;line-height:1.4}
      .culture-mini a{color:#0b5d49;font-size:.68rem;font-weight:900;text-decoration:none;white-space:nowrap}
      .leader-badges .culture-badge-link{display:inline-flex;align-items:center;gap:4px;background:#fff;border:1px solid #d8ebe5;border-radius:999px;padding:5px 10px;font-size:.74rem;font-weight:900;color:#0b5d49;text-decoration:none}
      .leader-badges .culture-badge-link:hover{border-color:#0b5d49;transform:translateY(-1px)}
      @media(max-width:860px){.culture-shell{grid-template-columns:1fr}.culture-art{min-height:250px}}
      @media(max-width:520px){.culture-links{grid-template-columns:1fr}.culture-art{min-height:235px}.art-core{width:92px;height:92px}.art-ring{width:185px;height:185px}.art-chip{width:68px;height:38px;font-size:.56rem}}
    `;
    document.head.appendChild(s);
  };
  const normalizeLeader=()=>{
    const box=document.querySelector('.leader-badges');
    if(!box) return;
    box.querySelectorAll('.culture-badge-link').forEach(a=>a.remove());
    box.querySelectorAll('span').forEach(span=>{
      const t=span.textContent.trim();
      if(/SEHATI/i.test(t)||/BerAKHLAK/i.test(t)) span.remove();
      else if(/5S/i.test(t)) span.remove();
    });
    const make=(emoji,label,desc)=>{
      const a=document.createElement('a'); a.className='culture-badge-link'; a.href='profil.html#motto-tata-nilai'; a.title=desc; a.textContent=`${emoji} ${label}`; return a;
    };
    box.append(make('🛡️','BerAKHLAK','Lihat Tata Nilai BerAKHLAK di Profil'),make('😊','5S','Lihat Motto 5S di Profil'));
  };
  const render=()=>{
    if(document.getElementById('home-culture-v4')) return;
    const main=document.querySelector('main'); if(!main) return;
    normalizeLeader();
    const section=document.createElement('section'); section.id='home-culture-v4'; section.className='container home-culture-v4';
    section.innerHTML=`
      <div class="culture-shell">
        <div class="culture-copy">
          <p class="culture-kicker">IDENTITAS BUDAYA PELAYANAN</p>
          <h2 class="culture-title">BerAKHLAK dalam pelayanan, 5S dalam setiap pertemuan.</h2>
          <p class="culture-sub">Nilai ASN <strong>BerAKHLAK</strong> memberi arah perilaku profesional, sedangkan <strong>5S</strong> menjadi budaya komunikasi yang ramah, sopan, dan dekat dengan masyarakat.</p>
          <div class="culture-links">
            <a class="culture-link" href="profil.html#motto-tata-nilai"><span class="culture-icon">🛡️</span><span><strong>BerAKHLAK</strong><span>Berorientasi Pelayanan · Akuntabel · Kompeten · Harmonis · Loyal · Adaptif · Kolaboratif</span></span></a>
            <a class="culture-link" href="profil.html#motto-tata-nilai"><span class="culture-icon">😊</span><span><strong>5S</strong><span>Senyum · Sapa · Salam · Sopan · Santun</span></span></a>
          </div>
          <div class="culture-mini"><span>Profil adalah sumber detail tata nilai dan motto.</span><a href="profil.html#motto-tata-nilai">Buka Profil →</a></div>
        </div>
        <div class="culture-art" role="img" aria-label="Visual BerAKHLAK dan 5S">
          <div class="art-title">BerAKHLAK</div>
          <div class="art-ring"></div><div class="art-core"><b>5S</b></div>
          <div class="art-chip">PELAYANAN</div><div class="art-chip">AKUNTABEL</div><div class="art-chip">HARMONIS</div><div class="art-chip">KOLABORATIF</div>
          <div class="art-caption">Nilai • Sikap • Budaya • Pelayanan</div>
        </div>
      </div>`;
    const v3=document.getElementById('home-v3');
    if(v3) v3.insertAdjacentElement('beforebegin',section);
    else{const info=main.querySelector('.info-bar');if(info) info.insertAdjacentElement('afterend',section);else main.prepend(section);}
  };
  addStyle();
  render();
})();
