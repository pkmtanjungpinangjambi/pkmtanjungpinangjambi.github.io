(function(){
  const toggle=document.querySelector('.nav-toggle');
  const nav=document.querySelector('.nav');
  if(toggle&&nav){toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});}
  document.querySelectorAll('[data-filter-group]').forEach(group=>{
    const buttons=group.querySelectorAll('[data-filter]');
    const target=group.dataset.filterGroup;
    const cards=document.querySelectorAll('[data-filter-target="'+target+'"]');
    buttons.forEach(btn=>btn.addEventListener('click',()=>{
      buttons.forEach(b=>b.classList.remove('active'));btn.classList.add('active');
      const value=btn.dataset.filter;
      cards.forEach(card=>{card.hidden=!(value==='all'||card.dataset.category===value);});
    }));
  });
  document.querySelectorAll('[data-tabs]').forEach(root=>{
    const buttons=root.querySelectorAll('[data-tab]');
    const panels=root.querySelectorAll('[data-panel]');
    buttons.forEach(btn=>btn.addEventListener('click',()=>{
      buttons.forEach(b=>b.classList.remove('active'));panels.forEach(p=>p.classList.remove('active'));
      btn.classList.add('active');const panel=root.querySelector('[data-panel="'+btn.dataset.tab+'"]');if(panel)panel.classList.add('active');
    }));
  });
})();
