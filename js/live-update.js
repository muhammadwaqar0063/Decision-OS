/* ═══ Live Update Toast ═══
   Shows a non-intrusive banner when the server detects new git changes.
   Requires: socket.io client (loaded from server) */
(function(){
  // Inject toast styles
  var st = document.createElement('style');
  st.textContent = '#live-toast{position:fixed;bottom:20px;right:20px;z-index:9999;background:#222222;color:#fff;padding:10px 18px;border-radius:8px;font:600 12px/1.4 Inter,sans-serif;box-shadow:0 8px 24px rgba(0,0,0,.25);transform:translateY(100px);opacity:0;transition:all .3s ease;display:flex;align-items:center;gap:10px;cursor:pointer}#live-toast.show{transform:translateY(0);opacity:1}#live-toast .dot{width:8px;height:8px;border-radius:50%;background:#2bde73;flex-shrink:0;animation:pulse-dot 1.5s ease-in-out infinite}@keyframes pulse-dot{0%,100%{opacity:1}50%{opacity:.3}}';
  document.head.appendChild(st);

  // Create toast element
  var toast = document.createElement('div');
  toast.id = 'live-toast';
  toast.innerHTML = '<span class="dot"></span><span id="live-toast-msg">New changes detected</span>';
  document.body.appendChild(toast);

  var hideTimer;
  toast.addEventListener('click', function(){ location.reload(); });

  function show(msg){
    document.getElementById('live-toast-msg').textContent = msg || 'New changes detected';
    toast.classList.add('show');
    clearTimeout(hideTimer);
    hideTimer = setTimeout(function(){ toast.classList.remove('show'); }, 6000);
  }

  // Connect via socket.io if available
  function init(){
    if(typeof io === 'undefined'){
      // Fallback: load socket.io from server
      var s = document.createElement('script');
      s.src = '/socket.io/socket.io.js';
      s.onload = connect;
      s.onerror = function(){ /* server may not have socket.io */ };
      document.head.appendChild(s);
    } else { connect(); }
  }

  function connect(){
    try{
      var socket = io();
      socket.on('git-update', function(data){
        show('Changes pulled — click to refresh');
      });
      socket.on('data-update', function(data){
        show(data.source + ' updated — click to refresh');
      });
    }catch(e){}
  }

  // Also expose a manual pull endpoint
  window.pullChanges = function(){
    fetch('/api/pull').then(function(r){return r.json()}).then(function(d){
      show(d.message || 'Pulled');
      if(d.changed) setTimeout(function(){ location.reload(); }, 1500);
    }).catch(function(){ show('Pull failed — check server'); });
  };

  init();
})();
