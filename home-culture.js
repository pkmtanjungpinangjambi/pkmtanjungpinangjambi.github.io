(function(){
  'use strict';

  const file=(window.location.pathname.split('/').pop()||'index.html').toLowerCase();
  if(file!=='index.html' || document.getElementById('home-culture-v4')) return;

  const hero=document.querySelector('.hero-home');
  if(!hero) return;

  const style=document.createElement('style');
  style.textContent=`
    .home-culture-v4{padding:24px 0 8px;background:#f8fbfa}
    .home-culture-v4 .culture-wrap{background:linear-gradient(135deg,#eef8f5,#fff);border:1px solid #d9ebe5;border-radius:24px;padding:24px;box-shadow:0 10px 30px rgba(0,59,45,.07)}
    .home-culture-v4 .culture-head{display:flex;align-items:flex-end;justify-content:space-between;gap:18px;margin-bottom:18px}
    .home-culture-v4 h2{margin:5px 0 0;color:#073f31;font-size:clamp(1.45rem,3vw,2.1rem);line-height:1.15}
    .home-culture-v4 .culture-head p{margin:0;max-width:620px;color:#5d6f69;font-size:.88rem;line-height:1.55;text-align:right}
    .home-culture-v4 .culture-grid{display:grid;grid-template-columns:1.15fr .85fr;gap:18px;align-items:stretch}
    .home-culture-v4 .culture-visual,.home-culture-v4 .culture-card{display:block;text-decoration:none;color:inherit;background:#fff;border:1px solid #dce9e5}
    .home-culture-v4 .culture-visual{position:relative;overflow:hidden;border-radius:18px;min-height:280px;box-shadow:0 12px 30px rgba(0,59,45,.08)}
    .home-culture-v4 .culture-visual img{display:block;width:100%;height:100%;min-height:280px;object-fit:cover;background:#fff}
    .home-culture-v4 .culture-visual-badge{position:absolute;left:14px;bottom:14px;padding:9px 13px;border-radius:999px;background:rgba(0,51,35,.88);color:#fff;font-size:.73rem;font-weight:900;box-shadow:0 8px 22px rgba(0,0,0,.18)}
    .home-culture-v4 .culture-copy{display:grid;grid-template-rows:1fr 1fr;gap:12px}
    .home-culture-v4 .culture-card{padding:18px;border-radius:16px;box-shadow:0 7px 20px rgba(0,59,45,.05)}
    .home-culture-v4 .culture-card strong{display:block;color:#0b5d49;font-size:1rem;margin-bottom:7px}
    .home-culture-v4 .culture-card p{margin:0;color:#5d6f69;font-size:.82rem;line-height:1.6}
    .home-culture-v4 .tag{display:inline-flex;margin-top:11px;padding:5px 9px;border-radius:999px;background:#eef7f4;color:#0b5d49;border:1px solid #d7ebe4;font-size:.68rem;font-weight:900}
    @media(max-width:860px){.home-culture-v4 .culture-head{display:block}.home-culture-v4 .culture-head p{margin-top:8px;text-align:left}.home-culture-v4 .culture-grid{grid-template-columns:1fr}}
    @media(max-width:520px){.home-culture-v4 .culture-wrap{padding:16px;border-radius:18px}.home-culture-v4 .culture-visual,.home-culture-v4 .culture-visual img{min-height:210px}}
  `;
  document.head.appendChild(style);

  const section=document.createElement('section');
  section.id='home-culture-v4';
  section.className='home-culture-v4';
  section.setAttribute('aria-labelledby','home-culture-title');
  section.innerHTML=`
    <div class="container culture-wrap">
      <div class="culture-head">
        <div><span class="kicker">BUDAYA PELAYANAN</span><h2 id="home-culture-title">BerAKHLAK &amp; 5S</h2></div>
        <p>Nilai yang menjadi dasar perilaku pelayanan ASN dan budaya komunikasi pelayanan di UPTD Puskesmas Tanjung Pinang.</p>
      </div>
      <div class="culture-grid">
        <a class="culture-visual" href="profil.html#motto-tata-nilai" aria-label="Lihat Motto dan Tata Nilai: BerAKHLAK dan 5S">
          <img src="assets/culture/berakhlak-5s.svg" alt="Visual budaya pelayanan BerAKHLAK dan 5S UPTD Puskesmas Tanjung Pinang" loading="lazy">
          <span class="culture-visual-badge">❤️ Lihat Motto &amp; Tata Nilai →</span>
        </a>
        <div class="culture-copy">
          <a class="culture-card" href="profil.html#motto-tata-nilai"><strong>BerAKHLAK</strong><p>Berorientasi Pelayanan, Akuntabel, Kompeten, Harmonis, Loyal, Adaptif, dan Kolaboratif.</p><span class="tag">Core Values ASN</span></a>
          <a class="culture-card" href="profil.html#motto-tata-nilai"><strong>5S — Budaya Komunikasi</strong><p>Senyum, Sapa, Salam, Sopan, Santun sebagai budaya komunikasi pelayanan yang dekat dengan masyarakat.</p><span class="tag">Melayani dengan Hati</span></a>
        </div>
      </div>
    </div>`;

  hero.insertAdjacentElement('afterend',section);
})();