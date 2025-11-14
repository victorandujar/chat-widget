;(function(){
  try {
    var currentScript = document.currentScript;
    var attrs = {};
    if (currentScript && currentScript.dataset) {
      for (var k in currentScript.dataset) { attrs[k] = currentScript.dataset[k]; }
    }
    var base = (currentScript && currentScript.src) ? currentScript.src.replace(/loader.js(?:?.*)?$/,'') : './';
    fetch(base + 'latest.json', {cache: 'no-cache'})
      .then(function(res){ return res.json(); })
      .then(function(j){
        var s = document.createElement('script');
        s.src = base + j.file + (j.version ? ('?v=' + encodeURIComponent(j.version)) : '');
        // copy data attributes
        for (var k in attrs) { s.setAttribute('data-' + k.replace(/([A-Z])/g, '-$1').toLowerCase(), attrs[k]); }
        s.async = true;
        document.head.appendChild(s);
      }).catch(function(e){ console.error('Failed to load widget:', e); });
  } catch(e){ console.error(e); }
})();