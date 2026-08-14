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
    const cards=document.querySelectorAll(
      '[data-filter-target="'+target+'"]'
    );

    buttons.forEach(btn=>{
      btn.addEventListener('click',()=>{
        buttons.forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');

        const value=btn.dataset.filter;

        cards.forEach(card=>{
          card.hidden=!(
            value==='all' ||
            card.dataset.category===value
          );
        });
      });
    });
  });

  document.querySelectorAll('[data-tabs]').forEach(root=>{
    const buttons=root.querySelectorAll('[data-tab]');
    const panels=root.querySelectorAll('[data-panel]');

    buttons.forEach(btn=>{
      btn.addEventListener('click',()=>{
        buttons.forEach(b=>b.classList.remove('active'));
        panels.forEach(p=>p.classList.remove('active'));

        btn.classList.add('active');

        const panel=root.querySelector(
          '[data-panel="'+btn.dataset.tab+'"]'
        );

        if(panel){
          panel.classList.add('active');
        }
      });
    });
  });

  /*
   * V2.11
   * Tidak menambahkan/menduplikasi blok CKG, BPJS, WhatsApp,
   * Google Maps, atau visitor counter.
   * Blok layanan yang sudah ada di HTML tetap menjadi satu-satunya sumber.
   *
   * Perlindungan ringan untuk gambar:
   * - mencegah drag gambar
   * - mencegah context menu khusus pada gambar
   */

  document.addEventListener('dragstart',function(e){
    if(e.target && e.target.tagName==='IMG'){
      e.preventDefault();
    }
  });

  document.addEventListener('contextmenu',function(e){
    if(e.target && e.target.tagName==='IMG'){
      e.preventDefault();
    }
  });

  /* Dropdown menu nav "Profil" */
  document.querySelectorAll('.dropdown-caret-btn').forEach(function(btn){
    btn.addEventListener('click',function(e){
      e.preventDefault();
      e.stopPropagation();
      var parent=btn.closest('.nav-item-dropdown');
      var isOpen=parent.classList.contains('open');
      document.querySelectorAll('.nav-item-dropdown.open').forEach(function(d){
        d.classList.remove('open');
        var b=d.querySelector('.dropdown-caret-btn');
        if(b) b.setAttribute('aria-expanded','false');
      });
      if(!isOpen){
        parent.classList.add('open');
        btn.setAttribute('aria-expanded','true');
      }
    });
  });
  document.addEventListener('click',function(e){
    if(!e.target.closest('.nav-item-dropdown')){
      document.querySelectorAll('.nav-item-dropdown.open').forEach(function(d){
        d.classList.remove('open');
        var b=d.querySelector('.dropdown-caret-btn');
        if(b) b.setAttribute('aria-expanded','false');
      });
    }
  });

  /* Aktivasi tab Profil berdasarkan hash URL, misal profil.html#struktur */
  function activatePanelById(id){
    var target=document.getElementById(id);
    if(!target || !target.classList.contains('profile-panel')) return false;
    var tabName=target.dataset.panel;
    var btn=document.querySelector('[data-tab="'+tabName+'"]');
    if(btn){
      btn.click();
      setTimeout(function(){
        target.scrollIntoView({behavior:'smooth',block:'start'});
      },60);
      return true;
    }
    return false;
  }

  if(window.location.hash){
    activatePanelById(window.location.hash.slice(1));
  }

  document.querySelectorAll('a[href*="#"]').forEach(function(link){
    var url;
    try{ url=new URL(link.href); }catch(e){ return; }
    if(url.pathname.endsWith('profil.html') && url.hash && window.location.pathname.endsWith('profil.html')){
      link.addEventListener('click',function(e){
        var id=url.hash.slice(1);
        var target=document.getElementById(id);
        if(target && target.classList.contains('profile-panel')){
          e.preventDefault();
          activatePanelById(id);
        }
      });
    }
  });

})();
