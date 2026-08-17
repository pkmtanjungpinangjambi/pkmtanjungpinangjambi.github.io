(function(){
  const grid=document.getElementById('social-feed-grid');
  const status=document.getElementById('social-feed-status');
  if(!grid) return;

  function esc(value){
    return String(value||'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  }
  function dateText(value){
    try{return new Intl.DateTimeFormat('id-ID',{day:'2-digit',month:'short',year:'numeric'}).format(new Date(value));}
    catch(e){return '';}
  }
  function card(item){
    const source=item.source==='instagram'?'Instagram':'Facebook';
    const badge=item.source==='instagram'?'📷 Instagram':'f Facebook';
    const image=item.image?`<div class="social-card-media"><img src="${esc(item.image)}" alt="Konten ${source} UPTD Puskesmas Tanjung Pinang" loading="lazy"></div>`:'';
    return `<article class="social-card">${image}<div class="social-card-body"><div class="social-card-meta"><span class="social-badge">${badge}</span><time datetime="${esc(item.created_time)}">${dateText(item.created_time)}</time></div><p class="social-card-text">${esc(item.text)||'Informasi terbaru dari UPTD Puskesmas Tanjung Pinang.'}</p><a class="social-card-link" href="${esc(item.permalink)}" target="_blank" rel="noopener noreferrer">Lihat di ${source} →</a></div></article>`;
  }

  fetch('/api/social-feed',{headers:{Accept:'application/json'}})
    .then(response=>response.json().then(data=>({ok:response.ok,data})))
    .then(result=>{
      if(!result.ok||!result.data.ok) throw new Error(result.data.message||'Feed belum tersedia');
      const items=Array.isArray(result.data.items)?result.data.items:[];
      grid.innerHTML=items.length?items.map(card).join(''):'<div class="social-empty">Belum ada konten yang dapat ditampilkan.</div>';
      if(status) status.textContent='Diperbarui otomatis dari kanal Instagram dan Facebook resmi.';
    })
    .catch(error=>{
      grid.innerHTML='<div class="social-empty">Konten media sosial belum dapat dimuat saat ini.</div>';
      if(status){status.textContent='Feed media sosial belum aktif. Website tetap berjalan normal.';status.classList.add('error');}
      console.warn('Social feed:',error);
    });
})();
