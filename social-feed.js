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

  const tasks=[];
  if((window.location.pathname.split('/').pop()||'index.html').toLowerCase()==='index.html'){
    tasks.push(load('home-culture.js').catch(function(error){console.warn('Homepage culture:',error);}));
  }

  if(document.getElementById('social-feed-grid')){
    tasks.push(Promise.all(tasks).then(function(){return load('social-feed-core.js');}));
  }
})();