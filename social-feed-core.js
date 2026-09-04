(function(){
  const grid=document.getElementById('social-feed-grid');
  const status=document.getElementById('social-feed-status');
  if(!grid) return;

  const INSTAGRAM_URL='https://www.instagram.com/pkm.tanjungpinang.jambi';
  const FACEBOOK_URL='https://web.facebook.com/kiki.ayu.98229';
  const YOUTUBE_URL='https://www.youtube.com/@puskesmastanjungpinangkota7276';

  function esc(value){
    return String(value||'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  }
  function dateText(value){
    try{return new Intl.DateTimeFormat('id-ID',{day:'2-digit',month:'short',year:'numeric'}).format(new Date(value));}
    catch(e){return '';}
  }
  function card(item){
    const image=item.image?`<div class="social-card-media"><img src="${esc(item.image)}" alt="Konten Instagram UPTD Puskesmas Tanjung Pinang" loading="lazy"></div>`:'';
    return `<article class="social-card">${image}<div class="social-card-body"><div class="social-card-meta"><span class="social-badge">📷 Instagram</span><time datetime="${esc(item.created_time)}">${dateText(item.created_time)}</time></div><p class="social-card-text">${esc(item.text)||'Informasi terbaru dari UPTD Puskesmas Tanjung Pinang.'}</p><a class="social-card-link" href="${esc(item.permalink)}" target="_blank" rel="noopener noreferrer">Lihat di Instagram →</a></div></article>`;
  }

  function addOfficialLinks(){
    const section=grid.closest('section');
    if(!section || section.querySelector('.social-official-links')) return;
    const head=section.querySelector('.section-head');
    if(!head) return;
    const box=document.createElement('div');
    box.className='social-official-links';
    box.style.cssText='display:flex;flex-wrap:wrap;gap:10px;margin-top:14px';
    box.innerHTML=`<a href="${INSTAGRAM_URL}" target="_blank" rel="noopener noreferrer" class="btn btn-green" aria-label="Buka Instagram resmi Puskesmas Tanjung Pinang">📷 Instagram Resmi</a><a href="${FACEBOOK_URL}" target="_blank" rel="noopener noreferrer" class="btn btn-outline" aria-label="Buka Facebook resmi Puskesmas Tanjung Pinang">🔵 Facebook Resmi</a><a href="${YOUTUBE_URL}" target="_blank" rel="noopener noreferrer" class="btn btn-outline" aria-label="Buka YouTube resmi Puskesmas Tanjung Pinang">▶️ YouTube Resmi</a>`;
    head.appendChild(box);
  }

  addOfficialLinks();

  fetch('/api/social-feed',{headers:{Accept:'application/json'}})
    .then(response=>response.json().then(data=>({ok:response.ok,data})))
    .then(result=>{
      if(!result.ok||!result.data.ok) throw new Error(result.data.message||'Feed Instagram belum tersedia');
      const items=Array.isArray(result.data.items)?result.data.items.slice(0,5):[];
      grid.innerHTML=items.length?items.map(card).join(''):'<div class="social-empty">Belum ada posting Instagram yang dapat ditampilkan.</div>';
      if(status){status.textContent='5 posting terbaru dari Instagram resmi @pkm.tanjungpinang.jambi.';status.classList.remove('error');}
    })
    .catch(error=>{
      grid.innerHTML='<div class="social-empty">Posting Instagram belum dapat dimuat saat ini.</div>';
      if(status){status.textContent='Feed Instagram belum aktif. Website tetap berjalan normal.';status.classList.add('error');}
      console.warn('Instagram feed:',error);
    });
})();