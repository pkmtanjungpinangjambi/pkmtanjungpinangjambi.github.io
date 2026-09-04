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

  load('home-culture.js')
    .catch(function(error){console.warn('Homepage culture:',error);})
    .finally(function(){load('social-feed-core.js').catch(function(error){console.warn('Instagram feed:',error);});});
})();