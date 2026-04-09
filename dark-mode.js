/* ═══════════════════════════════════════
   ArcusSoft Decision OS | Dark Mode
   Palette: #ffcc00 · #003399 · #222222 · #f5f5f5 · #2bde73 · #fd1d1d · #a2aaad
   ═══════════════════════════════════════ */
(function(){
  'use strict';

  // ── Inject styles ──
  var css = [
    'html.dark{',
    '  --bg:#111111;--bg2:#1a1a1a;--bg3:#242424;--bg4:#2e2e2e;',
    '  --surface:#1e1e1e;--surface2:#222222;--surface3:#282828;',
    '  --glass:rgba(17,17,17,.88);--glass2:rgba(17,17,17,.95);',
    '  --border:#2e2e2e;--border2:#3a3a3a;--border3:#4a4a4a;',
    '  --ink:#f0f0f0;--ink2:#d0d0d0;--ink3:#888888;--ink4:#5e5e5e;--ink5:#3a3a3a;',
    '  --blue:#4d88ff;--blue-soft:rgba(0,51,153,.2);--blue-glow:rgba(77,136,255,.12);--blue-text:#7aa8ff;',
    '  --gold:#ffd633;--gold-soft:rgba(255,204,0,.12);--gold-glow:rgba(255,204,0,.08);--gold-text:#ffe066;',
    '  --green:#5ce88a;--green-soft:rgba(43,222,115,.12);--green-glow:rgba(92,232,138,.1);--green-text:#5ce88a;',
    '  --red:#ff5555;--red-soft:rgba(253,29,29,.12);--red-glow:rgba(255,85,85,.08);--red-text:#ff7777;',
    '  --amber:#ffc033;--amber-soft:rgba(255,192,51,.12);--amber-glow:rgba(255,192,51,.1);--amber-text:#ffd066;',
    '  --purple:#a78bfa;--purple-soft:rgba(124,58,237,.12);--purple-glow:rgba(167,139,250,.1);--purple-text:#c4b5fd;',
    '  --orange:#fb923c;--orange-soft:rgba(234,88,12,.12);--orange-text:#fdba74;',
    '  --teal:#2dd4bf;--teal-soft:rgba(13,148,136,.12);--teal-text:#5eead4;',
    '  --rose:#fb7185;--rose-soft:rgba(225,29,72,.12);--rose-text:#fda4af;',
    '  --accent:#4d88ff;',
    '  --shadow:0 1px 3px rgba(0,0,0,.3),0 4px 12px rgba(0,0,0,.2);',
    '  --shadow-hover:0 2px 8px rgba(0,0,0,.35),0 8px 24px rgba(0,0,0,.25);',
    '  --shadow-lg:0 8px 32px rgba(0,0,0,.4),0 2px 8px rgba(0,0,0,.3);',
    '}',
    'html.dark body{background:var(--bg);color:var(--ink)}',
    'html.dark .hdr{background:rgba(17,17,17,.96)!important;box-shadow:0 1px 0 var(--accent)}',
    'html.dark .tabs{background:rgba(17,17,17,.96)!important}',
    'html.dark .topnav{background:var(--glass2)!important}',
    'html.dark .kc{background:var(--surface);border-color:var(--border)}',
    'html.dark .kc:hover{border-color:var(--border2)}',
    'html.dark .cd{background:var(--surface);border-color:var(--border)}',
    'html.dark .cd:hover{border-color:var(--border2)}',
    'html.dark .pcard{background:var(--surface);border-color:var(--border)}',
    'html.dark .pcard:hover{border-color:var(--border2)}',
    'html.dark .tcard{background:var(--surface);border-color:var(--border)}',
    'html.dark .rs-section,html.dark .rs-section2{background:var(--surface);border-color:var(--border)}',
    'html.dark .rs-alert{background:var(--bg2);border-color:var(--border)}',
    'html.dark .rs-alert:hover{background:var(--surface)}',
    'html.dark .rp-section{background:var(--surface);border-color:var(--border)}',
    'html.dark .alert-strip{background:var(--surface);border-color:var(--border)}',
    'html.dark .stat{background:var(--surface);border-color:var(--border)}',
    'html.dark .wp-card,html.dark .ws-card{background:var(--surface);border-color:var(--border)}',
    'html.dark .wt-card{background:var(--surface);border-color:var(--border)}',
    'html.dark .sc-card{background:var(--surface);border-color:var(--border)}',
    'html.dark input,html.dark select,html.dark textarea{background:var(--bg2);border-color:var(--border);color:var(--ink)}',
    'html.dark input:focus,html.dark select:focus,html.dark textarea:focus{border-color:var(--gold);background:var(--surface);box-shadow:0 0 0 3px rgba(255,204,0,.1)}',
    'html.dark .auth-dd{background:var(--surface);border-color:var(--border)}',
    'html.dark .auth-dd-header{border-color:var(--border)}',
    'html.dark .auth-dd-item:hover{background:var(--bg2)}',
    'html.dark .auth-badge{border-color:var(--border)}',
    'html.dark .tab:hover{background:var(--bg2)}',
    'html.dark .tab.on{color:var(--gold-text);border-bottom-color:var(--gold);background:var(--gold-soft)}',
    'html.dark .hdr-nav a:hover{background:var(--bg2)}',
    'html.dark .hdr-nav a.on{background:var(--gold);color:#222;box-shadow:0 2px 8px rgba(255,204,0,.2)}',
    'html.dark .hdr-r a:hover{background:var(--bg2)}',
    'html.dark .hdr-r a.on{background:var(--gold);color:#222;box-shadow:0 2px 8px rgba(255,204,0,.2)}',
    'html.dark .topnav .links a:hover{background:var(--bg2)}',
    'html.dark .topnav .links a.on{background:var(--gold);color:#222;box-shadow:0 2px 8px rgba(255,204,0,.2)}',
    'html.dark .btn{background:var(--surface);border-color:var(--border);color:var(--ink2)}',
    'html.dark .btn:hover{border-color:var(--border2);box-shadow:var(--shadow-hover)}',
    'html.dark .btn-blue{background:var(--blue);color:#fff;border-color:var(--blue)}',
    'html.dark .btn-blue:hover{background:#3a75e6}',
    'html.dark .btn-p{background:var(--gold);color:#222;border-color:var(--gold);box-shadow:0 2px 8px rgba(255,204,0,.2)}',
    'html.dark .btn-p:hover{background:#e6b800}',
    'html.dark .btn-green{background:var(--green);color:#222;border-color:var(--green)}',
    'html.dark .btn-red{background:var(--red);color:#fff;border-color:var(--red)}',
    'html.dark .bdg-blue{background:var(--blue-soft);color:var(--blue-text)}',
    'html.dark .bdg-green{background:var(--green-soft);color:var(--green-text)}',
    'html.dark .bdg-red{background:var(--red-soft);color:var(--red-text)}',
    'html.dark .bdg-amber{background:var(--amber-soft);color:var(--amber-text)}',
    'html.dark .bdg-purple{background:var(--purple-soft);color:var(--purple-text)}',
    'html.dark th{background:var(--surface3);color:var(--ink3);border-color:var(--border)}',
    'html.dark td{border-color:var(--bg2);color:var(--ink2)}',
    'html.dark tbody tr:hover td{background:var(--surface3)}',
    'html.dark .fi{background:var(--bg2);border-color:var(--border);color:var(--ink)}',
    'html.dark .fi:focus{border-color:var(--gold);background:var(--surface);box-shadow:0 0 0 3px rgba(255,204,0,.1)}',
    'html.dark .kc.at-blue{border-top-color:var(--blue)}',
    'html.dark .kc.at-green{border-top-color:var(--green)}',
    'html.dark .kc.at-amber{border-top-color:var(--amber)}',
    'html.dark .kc.at-red{border-top-color:var(--red)}',
    'html.dark .kc .kv{color:var(--ink)}',
    'html.dark .modal{background:var(--surface);border-color:var(--border)}',
    'html.dark .modal h3{color:var(--ink)}',
    'html.dark .modal-btn{background:var(--surface);border-color:var(--border);color:var(--ink2)}',
    'html.dark .modal-btn.primary{background:var(--blue);color:#fff;border-color:var(--blue)}',
    'html.dark .access-chip{border-color:var(--border);color:var(--ink3)}',
    'html.dark .access-chip.selected{border-color:var(--blue);background:var(--blue-soft);color:var(--blue-text)}',
    'html.dark .toast.success{background:var(--green-soft);border-color:rgba(43,222,115,.2);color:var(--green-text)}',
    'html.dark .toast.error{background:var(--red-soft);border-color:rgba(253,29,29,.15);color:var(--red-text)}',
    'html.dark .perm-toggle .on circle{fill:var(--green)}',
    'html.dark .login-left{background:linear-gradient(135deg,#0a0a0f 0%,#0d1020 50%,#0a0f0a 100%)!important}',
    'html.dark .login-feature{background:rgba(30,30,34,.7);border-color:var(--border)}',
    'html.dark .login-feature:hover{background:var(--surface)}',
    'html.dark .session-banner{background:var(--amber-soft);border-color:var(--border)}',
    'html.dark .demo-card{background:var(--bg2);border-color:var(--border)}',
    'html.dark .demo-card:hover{border-color:var(--gold);background:var(--gold-soft)}',
    'html.dark .form-input{background:var(--bg2);border-color:var(--border);color:var(--ink)}',
    'html.dark .form-input:focus{border-color:var(--gold);background:var(--surface);box-shadow:0 0 0 3px rgba(255,204,0,.1)}',
    'html.dark .btn-login{background:linear-gradient(135deg,#ffd633,#e6b800);color:#222}',
    'html.dark .btn-login:hover{box-shadow:0 4px 16px rgba(255,204,0,.3)}',
    'html.dark ::selection{background:var(--gold);color:#222}',
    '',
    '/* ── Toggle Button ── */',
    '.dss-theme-toggle{',
    '  display:inline-flex;align-items:center;justify-content:center;',
    '  width:34px;height:34px;border-radius:9px;cursor:pointer;',
    '  background:transparent;border:1.5px solid var(--border);',
    '  color:var(--ink3);position:relative;overflow:hidden;',
    '  transition:background .2s,border-color .2s,color .2s,transform .15s;',
    '  flex-shrink:0;outline:none;box-shadow:none;',
    '  -webkit-appearance:none;appearance:none;',
    '  padding:0;margin:0;margin-left:10px;',
    '  font-size:0;line-height:0;',
    '}',
    '.dss-theme-toggle:hover{background:var(--bg2);color:var(--ink);border-color:var(--border2);transform:scale(1.05)}',
    '.dss-theme-toggle:active{transform:scale(.95)}',
    '.dss-theme-toggle:focus{outline:none;box-shadow:0 0 0 2px var(--blue-glow)}',
    '.dss-theme-toggle svg{',
    '  position:absolute;transition:opacity .35s ease,transform .35s ease;',
    '  width:17px;height:17px;stroke:currentColor;fill:none;',
    '  stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;',
    '}',
    '.dss-theme-toggle .dss-icon-sun{opacity:0;transform:rotate(180deg) scale(.3)}',
    '.dss-theme-toggle .dss-icon-moon{opacity:1;transform:rotate(0) scale(1)}',
    'html.dark .dss-theme-toggle .dss-icon-sun{opacity:1;transform:rotate(0) scale(1)}',
    'html.dark .dss-theme-toggle .dss-icon-moon{opacity:0;transform:rotate(-180deg) scale(.3)}',
    'html.dark .dss-theme-toggle{border-color:var(--border2)}',
    '',
    '/* ── Login page fixed toggle ── */',
    '.dss-theme-toggle.dss-toggle-fixed{position:fixed;top:18px;right:18px;z-index:9999}'
  ].join('\n');

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // ── SVG icons ──
  var moonSVG = '<svg class="dss-icon-moon" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  var sunSVG = '<svg class="dss-icon-sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';

  // ── Apply theme ──
  var KEY = 'arcussoft-theme';
  function applyTheme(t) {
    document.documentElement.classList.toggle('dark', t === 'dark');
  }

  // Apply immediately (before paint if possible)
  var saved = localStorage.getItem(KEY);
  if (saved) {
    applyTheme(saved);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme:dark)').matches) {
    applyTheme('dark');
  }

  // ── Create toggle button ──
  function createToggle() {
    var btn = document.createElement('button');
    btn.className = 'dss-theme-toggle';
    btn.title = 'Toggle dark mode';
    btn.setAttribute('aria-label', 'Toggle dark mode');
    btn.innerHTML = moonSVG + sunSVG;
    btn.addEventListener('click', function() {
      var isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem(KEY, isDark ? 'dark' : 'light');
    });
    return btn;
  }

  // ── Insert toggle into nav ──
  function insertToggle() {
    if (document.querySelector('.dss-theme-toggle')) return;
    var toggle = createToggle();

    var hdrR = document.querySelector('.hdr-r');
    if (hdrR) { hdrR.appendChild(toggle); return; }

    var hdrNav = document.querySelector('.hdr-nav');
    if (hdrNav) { hdrNav.appendChild(toggle); return; }

    var topnavLinks = document.querySelector('.topnav .links');
    if (topnavLinks) { topnavLinks.appendChild(toggle); return; }

    toggle.classList.add('dss-toggle-fixed');
    document.body.appendChild(toggle);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', insertToggle);
  } else {
    insertToggle();
  }

  window.toggleTheme = function() {
    var isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem(KEY, isDark ? 'dark' : 'light');
  };

})();
