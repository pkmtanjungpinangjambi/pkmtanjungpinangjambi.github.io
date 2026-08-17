(function(){
  const toggle=document.querySelector('.nav-toggle');
  const nav=document.querySelector('.nav');
  if(toggle&&nav){
    toggle.addEventListener('click',()=>{
      const open=nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded',String(open));
    });
  }

  document.querySelectorAll('[data-filter-group]').forEach(group=>{
    const buttons=group.querySelectorAll('[data-filter]');
    const target=group.dataset.filterGroup;
    const cards=document.querySelectorAll('[data-filter-target="'+target+'"]');
    buttons.forEach(btn=>btn.addEventListener('click',()=>{
      buttons.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const value=btn.dataset.filter;
      cards.forEach(card=>{card.hidden=!(value==='all'||card.dataset.category===value);});
    }));
  });

  document.querySelectorAll('[data-tabs]').forEach(root=>{
    const buttons=root.querySelectorAll('[data-tab]');
    const panels=root.querySelectorAll('[data-panel]');
    buttons.forEach(btn=>btn.addEventListener('click',()=>{
      buttons.forEach(b=>b.classList.remove('active'));
      panels.forEach(p=>p.classList.remove('active'));
      btn.classList.add('active');
      const panel=root.querySelector('[data-panel="'+btn.dataset.tab+'"]');
      if(panel) panel.classList.add('active');
    }));
  });

  document.addEventListener('dragstart',e=>{if(e.target&&e.target.tagName==='IMG') e.preventDefault();});
  document.addEventListener('contextmenu',e=>{if(e.target&&e.target.tagName==='IMG') e.preventDefault();});

  document.querySelectorAll('.dropdown-caret-btn').forEach(btn=>{
    btn.addEventListener('click',e=>{
      e.preventDefault();e.stopPropagation();
      const parent=btn.closest('.nav-item-dropdown');
      const isOpen=parent.classList.contains('open');
      document.querySelectorAll('.nav-item-dropdown.open').forEach(d=>{
        d.classList.remove('open');
        const b=d.querySelector('.dropdown-caret-btn');
        if(b)b.setAttribute('aria-expanded','false');
      });
      if(!isOpen){parent.classList.add('open');btn.setAttribute('aria-expanded','true');}
    });
  });
  document.addEventListener('click',e=>{
    if(!e.target.closest('.nav-item-dropdown')){
      document.querySelectorAll('.nav-item-dropdown.open').forEach(d=>{
        d.classList.remove('open');
        const b=d.querySelector('.dropdown-caret-btn');
        if(b)b.setAttribute('aria-expanded','false');
      });
    }
  });

  function activatePanelById(id){
    const target=document.getElementById(id);
    if(!target||!target.classList.contains('profile-panel')) return false;
    const root=target.closest('[data-tabs]');
    if(!root) return false;
    const tabName=target.dataset.panel;
    const btn=root.querySelector('[data-tab="'+tabName+'"]');
    if(btn){btn.click();}else{
      root.querySelectorAll('.profile-panel').forEach(panel=>panel.classList.remove('active'));
      target.classList.add('active');
      root.querySelectorAll('[data-tab]').forEach(button=>button.classList.remove('active'));
    }
    setTimeout(()=>target.scrollIntoView({behavior:'smooth',block:'start'}),60);
    return true;
  }

  if(window.location.hash) activatePanelById(window.location.hash.slice(1));
  document.querySelectorAll('a[href*="#"]').forEach(link=>{
    let url;try{url=new URL(link.href);}catch(e){return;}
    if(url.pathname.endsWith('profil.html')&&url.hash&&window.location.pathname.endsWith('profil.html')){
      link.addEventListener('click',e=>{
        const id=url.hash.slice(1),target=document.getElementById(id);
        if(target&&target.classList.contains('profile-panel')){e.preventDefault();activatePanelById(id);}
      });
    }
  });

  function addStyleOnce(id,css){
    if(document.getElementById(id)) return;
    const style=document.createElement('style');style.id=id;style.textContent=css;document.head.appendChild(style);
  }

  function loadLeaflet(callback){
    if(window.L){callback();return;}
    if(!document.getElementById('leaflet-css-characteristic')){
      const link=document.createElement('link');link.id='leaflet-css-characteristic';link.rel='stylesheet';link.href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';document.head.appendChild(link);
    }
    let script=document.getElementById('leaflet-js-characteristic');
    if(script){script.addEventListener('load',callback,{once:true});return;}
    script=document.createElement('script');script.id='leaflet-js-characteristic';script.src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload=callback;
    script.onerror=()=>{const map=document.getElementById('characteristic-map');if(map)map.innerHTML='<div class="char-map-error">Peta interaktif belum dapat dimuat. Silakan coba lagi.</div>';};
    document.head.appendChild(script);
  }

  function renderCharacteristic(){
    if(!window.location.pathname.endsWith('profil.html')) return;
    const panel=document.getElementById('karakter');
    if(!panel||panel.dataset.characteristicReady==='1') return;
    panel.dataset.characteristicReady='1';

    addStyleOnce('characteristic-v1-style',`
      .char-shell{margin-top:24px}
      .char-summary{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin:20px 0 28px}
      .char-stat{padding:18px;border:1px solid var(--line,#e2e8f0);border-radius:16px;background:#fff;box-shadow:0 6px 20px rgba(0,0,0,.04)}
      .char-stat b{display:block;font-size:1.65rem;color:#0b5d49;line-height:1}
      .char-stat span{display:block;margin-top:8px;color:#55706a;font-size:.78rem}
      .char-note{margin:14px 0 24px;padding:12px 14px;border-left:4px solid #0b5d49;background:#eef8f5;color:#45635c;font-size:.82rem;line-height:1.5;border-radius:8px}
      .char-section{margin-top:34px;padding-top:28px;border-top:1px solid var(--line,#e2e8f0);scroll-margin-top:100px}
      .char-section h3{margin-bottom:8px}
      .char-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:16px}
      .char-card{padding:18px;border:1px solid var(--line,#e2e8f0);border-radius:14px;background:#fff}
      .char-card strong{display:block;color:#0b5d49;margin-bottom:6px}
      .char-card p{margin:0;color:#55706a;font-size:.86rem;line-height:1.55}
      .char-placeholder{opacity:.82;background:#fafcfc}
      .char-map-wrap{margin-top:16px;border:1px solid var(--line,#e2e8f0);border-radius:16px;overflow:hidden;background:#fff}
      #characteristic-map{height:500px;width:100%}
      .char-map-caption{padding:14px 16px;font-size:.78rem;color:#66736f;border-top:1px solid var(--line,#e2e8f0);line-height:1.5}
      .char-map-error{padding:30px;text-align:center;color:#8a4b4b;background:#fff6f6}
      .char-villages{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;margin-top:14px}
      .char-village{padding:12px;border:1px solid #d8ebe5;background:#fff;color:#0b5d49;font-weight:800;border-radius:10px;cursor:pointer;font-size:.78rem}
      .char-village.active,.char-village:hover{background:#0b5d49;color:#fff}
      .char-strengths{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:16px}
      .char-strength{padding:18px;border-radius:16px;background:linear-gradient(135deg,#eef8f5,#f8fcfb);border:1px solid #d9ebe5}
      .char-strength h4{margin:0 0 7px;color:#0b5d49}
      .char-strength p{margin:0;color:#55706a;font-size:.86rem;line-height:1.55}
      .char-source{margin-top:24px;padding-top:16px;border-top:1px dashed #d9e5e1;color:#6a7774;font-size:.75rem;line-height:1.55}
      @media(max-width:760px){.char-summary,.char-grid,.char-strengths{grid-template-columns:1fr}.char-villages{grid-template-columns:1fr 1fr}#characteristic-map{height:430px}}
      @media(max-width:480px){.char-village{padding:11px 8px;font-size:.72rem}}
      @media(min-width:901px){.quick-grid.char-quick-ready{grid-template-columns:repeat(5,1fr)}}
    `);

    panel.innerHTML=`
      <h2>Karakteristik &amp; Kekuatan Wilayah</h2>
      <p>Profil ringkas wilayah kerja UPTD Puskesmas Tanjung Pinang yang menggabungkan data profil Puskesmas, peta wilayah kerja, jaringan pelayanan, dan ruang untuk data pendukung yang akan diperbarui secara bertahap.</p>
      <div class="char-shell">
        <div class="char-summary" aria-label="Ringkasan karakteristik">
          <div class="char-stat"><b>5</b><span>Kelurahan wilayah kerja</span></div>
          <div class="char-stat"><b>12,46 km²</b><span>Luas wilayah kerja</span></div>
          <div class="char-stat"><b>35.742</b><span>Penduduk · Desember 2025</span></div>
          <div class="char-stat"><b>3</b><span>Puskesmas Pembantu</span></div>
          <div class="char-stat"><b>42</b><span>Posyandu aktif · 2025</span></div>
          <div class="char-stat"><b>5</b><span>Klaster dalam penerapan ILP</span></div>
        </div>
        <div class="char-note"><strong>Sumber utama:</strong> Profil UPTD Puskesmas Tanjung Pinang Kota Jambi Tahun 2025, termasuk data penduduk Desember 2025. Data yang belum memiliki angka final tetap ditampilkan sebagai tanda em dash (—).</div>
        <section class="char-section" id="karakter-wilayah">
          <h3>Wilayah Kerja &amp; Peta Interaktif</h3>
          <p>Wilayah kerja mencakup Tanjung Pinang, Rajawali, Kasang, Kasang Jaya, dan Sejinjang. Peta digunakan untuk visualisasi wilayah kerja, bukan sebagai penetapan hukum batas administrasi.</p>
          <div class="char-villages" id="characteristic-villages"></div>
          <div class="char-map-wrap">
            <div id="characteristic-map" aria-label="Peta interaktif wilayah kerja UPTD Puskesmas Tanjung Pinang"></div>
            <div class="char-map-caption">Sumber geometri: layanan geospasial Badan Informasi Geospasial (BIG). Peta digunakan untuk visualisasi informasi wilayah kerja, bukan sebagai penetapan hukum batas administrasi.</div>
          </div>
        </section>
        <section class="char-section" id="karakter-jaringan">
          <h3>Jaringan Pelayanan</h3>
          <div class="char-grid">
            <article class="char-card"><strong>Puskesmas</strong><p>UPTD Puskesmas Tanjung Pinang sebagai fasilitas pelayanan kesehatan primer.</p></article>
            <article class="char-card"><strong>Puskesmas Pembantu</strong><p>3 Pustu: Kasang Jaya, Sijenjang I, dan Sijenjang II.</p></article>
            <article class="char-card"><strong>Posyandu</strong><p>42 Posyandu aktif berdasarkan Profil Puskesmas Tahun 2025.</p></article>
            <article class="char-card"><strong>Klaster ILP</strong><p>5 klaster dalam penyelenggaraan Integrasi Layanan Primer.</p></article>
          </div>
        </section>
        <section class="char-section" id="karakter-data">
          <h3>Data Pendukung</h3>
          <div class="char-grid">
            <article class="char-card char-placeholder"><strong>Kepadatan penduduk</strong><p>— Belum diisi sampai ada angka sumber final.</p></article>
            <article class="char-card char-placeholder"><strong>SD</strong><p>— Belum diisi sampai ada angka sumber final.</p></article>
            <article class="char-card char-placeholder"><strong>SMP</strong><p>— Belum diisi sampai ada angka sumber final.</p></article>
            <article class="char-card char-placeholder"><strong>SMA/SMK</strong><p>— Belum diisi sampai ada angka sumber final.</p></article>
          </div>
        </section>
        <section class="char-section" id="karakter-kekuatan">
          <h3>Kekuatan Pelayanan</h3>
          <div class="char-strengths">
            <article class="char-strength"><h4>🤝 Dekat dengan masyarakat</h4><p>Jaringan Pustu dan Posyandu mendukung pelayanan yang menjangkau wilayah kerja.</p></article>
            <article class="char-strength"><h4>🧩 Integrasi Layanan Primer</h4><p>Penyelenggaraan pelayanan disusun dalam 5 klaster sesuai struktur layanan Puskesmas.</p></article>
            <article class="char-strength"><h4>💡 Semangat inovasi</h4><p>Inovasi ditempatkan sebagai bagian dari arah pelayanan primer yang inovatif dan terintegrasi.</p></article>
            <article class="char-strength"><h4>❤️ Budaya 5S</h4><p>Senyum, Sapa, Salam, Sopan, Santun menjadi identitas komunikasi pelayanan.</p></article>
          </div>
        </section>
        <p class="char-source">Sumber internal: Profil UPTD Puskesmas Tanjung Pinang Kota Jambi Tahun 2025 dan materi pembaruan website 2026.<br>Sumber geospasial: BIG.</p>
      </div>`;
    loadLeaflet(()=>initCharacteristicMap());
  }

  function initCharacteristicMap(){
    const el=document.getElementById('characteristic-map');
    if(!el||el.dataset.mapReady==='1'||!window.L) return;
    el.dataset.mapReady='1';
    const names=["Tanjung Pinang","Sijinjang","Kasang","Kasang Jaya","Rajawali"];
    const aliases={
      "Tanjung Pinang":["tanjung pinang","tanjungpinang"],
      "Sijinjang":["sijinjang","sijenjang","sejinjang"],
      "Kasang":["kasang"],
      "Kasang Jaya":["kasang jaya","kasangjaya"],
      "Rajawali":["rajawali"]
    };
    const regionInfo={
      "Tanjung Pinang":{description:"Wilayah kerja UPTD Puskesmas Tanjung Pinang di Kecamatan Jambi Timur.",maps:"https://maps.app.goo.gl/GohWewWGF9WBMFNc7"},
      "Sijinjang":{description:"Wilayah kerja UPTD Puskesmas Tanjung Pinang di Kecamatan Jambi Timur. Pada data geospasial BIG, nama wilayah dapat tampil sebagai “Sijenjang”.",maps:"https://maps.app.goo.gl/qw5y2gLMPUZQHHnGA"},
      "Kasang":{description:"Wilayah kerja UPTD Puskesmas Tanjung Pinang di Kecamatan Jambi Timur.",maps:"https://maps.app.goo.gl/E96JT77D25Lvtn7Y8"},
      "Kasang Jaya":{description:"Wilayah kerja UPTD Puskesmas Tanjung Pinang di Kecamatan Jambi Timur.",maps:"https://maps.app.goo.gl/yi27vTWMeSm97saY6"},
      "Rajawali":{description:"Wilayah kerja UPTD Puskesmas Tanjung Pinang di Kecamatan Jambi Timur.",maps:"https://maps.app.goo.gl/1kq4vKTXwjsjW5Nu9"}
    };
    const fallback={
      "Tanjung Pinang":[-1.5930,103.6315],
      "Sijinjang":[-1.5821,103.6418],
      "Kasang":[-1.5851,103.6242],
      "Kasang Jaya":[-1.5861,103.6334],
      "Rajawali":[-1.5908,103.6228]
    };
    const colors=["#d71920","#b51219","#e53b42","#8f0c12","#f05a60"];
    const map=L.map(el,{zoomControl:true,scrollWheelZoom:true,doubleClickZoom:true}).setView([-1.606,103.63],13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:'&copy; OpenStreetMap contributors'}).addTo(map);
    let geoLayer=null,selectedLayer=null;
    const buttonWrap=document.getElementById('characteristic-villages');
    function featureName(f){const p=f.properties||{};return p.WADMKD||p.wadmkd||p.NAMKEL||p.nama_kelurahan||p.NAMA_KELURAHAN||p.NAMOBJ||p.namobj||'';}
    function normalizeName(value){return String(value||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]/g,'');}
    function canonicalName(value){
      const n=normalizeName(value);
      for(const displayName of names){
        const candidates=aliases[displayName]||[normalizeName(displayName)];
        if(candidates.some(c=>normalizeName(c)===n)) return displayName;
      }
      const matches=[];
      for(const displayName of names){
        const candidates=aliases[displayName]||[normalizeName(displayName)];
        candidates.forEach(c=>{const nc=normalizeName(c);if(nc&&(n.includes(nc)||nc.includes(n)))matches.push({displayName,length:nc.length});});
      }
      matches.sort((a,b)=>b.length-a.length);
      return matches.length?matches[0].displayName:'';
    }
    function styleFeature(f){
      const name=canonicalName(featureName(f));
      const idx=names.findIndex(n=>n.toLowerCase()===name.toLowerCase());
      return {color:colors[idx>=0?idx:0],weight:2,fillColor:colors[idx>=0?idx:0],fillOpacity:.22};
    }
    function activateButton(name){buttonWrap.querySelectorAll('.char-village').forEach(b=>{const active=b.dataset.name.toLowerCase()===name.toLowerCase();b.classList.toggle('active',active);});}
    function selectLayer(layer,name,zoomTo=true){
      if(selectedLayer&&selectedLayer!==layer) layerStyle(selectedLayer,2,.22);
      selectedLayer=layer;layerStyle(layer,4,.42);activateButton(name);
      if(zoomTo) map.fitBounds(layer.getBounds(),{padding:[30,30],maxZoom:16});
      layer.openPopup();
    }
    function layerStyle(layer,weight,fillOpacity){layer.setStyle({weight:weight,fillOpacity:fillOpacity});if(weight>2&&layer.bringToFront)layer.bringToFront();}
    function focusVillage(name){
      if(!geoLayer) return;
      const wanted=canonicalName(name)||name;let target=null;
      geoLayer.eachLayer(layer=>{if(canonicalName(featureName(layer.feature))===wanted)target=layer;});
      if(target){selectLayer(target,wanted,true);return;}
      if(fallback[wanted]){map.flyTo(fallback[wanted],15,{duration:.8});activateButton(wanted);}
    }
    names.forEach(name=>{
      const b=document.createElement('button');b.type='button';b.className='char-village';b.dataset.name=name;b.textContent=name;
      b.addEventListener('click',()=>focusVillage(name));buttonWrap.appendChild(b);
    });
    function fetchVillage(name){
      const aliasesQuery=(aliases[name]||[]).concat([name]);
      const values=Array.from(new Set(aliasesQuery));
      const clauses=values.map(v=>"LOWER(WADMKD)='"+String(v).toLowerCase().replace(/'/g,"''")+"'").join(' OR ');
      const where="WADMKK='Kota Jambi' AND ("+clauses+")";
      const url='https://geoservices.big.go.id/rbi/rest/services/BATASWILAYAH/Administrasi_AR_KelDesa_10K/MapServer/0/query?where='+encodeURIComponent(where)+'&outFields='+encodeURIComponent('WADMKD,WADMKC,WADMKK,WADMPR,KDEBPS,KDEPUM')+'&returnGeometry=true&outSR=4326&f=geojson';
      return fetch(url).then(r=>{if(!r.ok)throw new Error('HTTP '+r.status+' untuk '+name);return r.json();});
    }
    Promise.all(names.map(fetchVillage)).then(results=>{
      const merged={type:'FeatureCollection',features:[]};const seen=new Set();
      results.forEach((data,idx)=>{
        if(!data||!Array.isArray(data.features)) return;
        data.features.forEach(f=>{
          const canonical=canonicalName(featureName(f))||names[idx];
          const key=canonical.toLowerCase()+'|'+String((f.properties||{}).KDEBPS||(f.properties||{}).KDEPUM||'');
          if(!seen.has(key)){seen.add(key);merged.features.push(f);}
        });
      });
      if(!merged.features.length) throw new Error('Tidak ada polygon kelurahan yang berhasil dimuat dari layanan BIG.');
      geoLayer=L.geoJSON(merged,{style:styleFeature,onEachFeature:(f,layer)=>{
        const officialName=featureName(f),name=canonicalName(officialName)||officialName,p=f.properties||{};
        layer.bindPopup('<div class="popup-title">'+name+'</div><div class="popup-sub">Nama data BIG: '+officialName+'<br>Kecamatan '+(p.WADMKC||'Jambi Timur')+'<br>Kota '+(p.WADMKK||'Jambi')+'<br><a href="'+((regionInfo[name]||{}).maps||'#')+'" target="_blank" rel="noopener">Buka Google Maps →</a></div>');
        layer.on({mouseover:()=>layerStyle(layer,4,.38),mouseout:()=>{if(selectedLayer!==layer)layerStyle(layer,2,.22);else layerStyle(layer,4,.42);},click:()=>selectLayer(layer,canonicalName(name)||name,false)});
      }}).addTo(map);
      map.fitBounds(geoLayer.getBounds(),{padding:[30,30]});
      setTimeout(()=>focusVillage('Tanjung Pinang'),350);
    }).catch(err=>{
      console.error(err);
      names.forEach(name=>{
        const c=L.circleMarker(fallback[name],{radius:7,color:'#d71920',weight:2,fillColor:'#d71920',fillOpacity:.45}).addTo(map);
        c.bindPopup('<div class="popup-title">'+name+'</div><div class="popup-sub">Polygon BIG sedang tidak tersedia. <a href="'+((regionInfo[name]||{}).maps||'#')+'" target="_blank" rel="noopener">Buka Google Maps →</a></div>');
      });
      map.fitBounds(L.featureGroup(Object.values(map._layers).filter(x=>x instanceof L.CircleMarker)).getBounds(),{padding:[25,25]});
    });
  }

  function injectHomeShortcut(){
    if(!window.location.pathname.endsWith('index.html')&&window.location.pathname!=='/'&&window.location.pathname!=='')return;
    const grid=document.querySelector('.quick-grid');
    if(!grid||grid.querySelector('[data-characteristic-shortcut]'))return;
    grid.classList.add('char-quick-ready');
    const a=document.createElement('a');a.href='profil.html#karakter';a.className='quick-item';a.setAttribute('data-characteristic-shortcut','1');
    a.innerHTML='<span class="quick-number">05</span><h2>Karakteristik</h2><p>Wilayah kerja dan kekuatan pelayanan</p>';grid.appendChild(a);
  }

  renderCharacteristic();
  injectHomeShortcut();
})();
