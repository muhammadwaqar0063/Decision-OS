/* ═══════════════════════════════════════
   ArcusSoft Decision OS | Dark Mode
   Palette: #ffcc00 · #003399 · #222222 · #f5f5f5 · #2bde73 · #fd1d1d · #a2aaad
   ═══════════════════════════════════════ */
(function(){
  'use strict';

  var css = [
    /* ── Root Variables ── */
    'html.dark{',
    '  --bg:#111111;--bg2:#1a1a1a;--bg3:#242424;--bg4:#2e2e2e;',
    '  --surface:#1e1e1e;--surface2:#222222;--surface3:#282828;',
    '  --glass:rgba(17,17,17,.88);--glass2:rgba(17,17,17,.95);',
    '  --border:#2e2e2e;--border2:#3a3a3a;--border3:#4a4a4a;',
    '  --ink:#f0f0f0;--ink2:#d0d0d0;--ink3:#888888;--ink4:#5e5e5e;--ink5:#3a3a3a;',
    '  --blue:#4d88ff;--blue-soft:rgba(0,51,153,.2);--blue-glow:rgba(77,136,255,.12);--blue-text:#7aa8ff;',
    '  --gold:#ffd633;--gold-soft:rgba(255,204,0,.12);--gold-glow:rgba(255,204,0,.08);--gold-text:#ffe066;',
    '  --green:#5ce88a;--green-soft:rgba(43,222,115,.15);--green-glow:rgba(92,232,138,.1);--green-text:#5ce88a;',
    '  --red:#ff5555;--red-soft:rgba(253,29,29,.15);--red-glow:rgba(255,85,85,.08);--red-text:#ff7777;',
    '  --amber:#ffc033;--amber-soft:rgba(255,192,51,.15);--amber-glow:rgba(255,192,51,.1);--amber-text:#ffd066;',
    '  --purple:#a78bfa;--purple-soft:rgba(124,58,237,.15);--purple-glow:rgba(167,139,250,.1);--purple-text:#c4b5fd;',
    '  --orange:#fb923c;--orange-soft:rgba(234,88,12,.15);--orange-text:#fdba74;',
    '  --teal:#2dd4bf;--teal-soft:rgba(13,148,136,.15);--teal-text:#5eead4;',
    '  --rose:#fb7185;--rose-soft:rgba(225,29,72,.15);--rose-text:#fda4af;',
    '  --accent:#4d88ff;',
    '  --shadow:0 1px 3px rgba(0,0,0,.3),0 4px 12px rgba(0,0,0,.2);',
    '  --shadow-hover:0 2px 8px rgba(0,0,0,.35),0 8px 24px rgba(0,0,0,.25);',
    '  --shadow-lg:0 8px 32px rgba(0,0,0,.4),0 2px 8px rgba(0,0,0,.3);',
    '}',
    '',
    /* ── Global ── */
    'html.dark body{background:var(--bg);color:var(--ink)}',
    'html.dark ::selection{background:var(--gold);color:#222}',
    '',
    /* ── Header & Nav ── */
    'html.dark .hdr{background:rgba(17,17,17,.96)!important;box-shadow:0 1px 0 var(--accent)}',
    'html.dark .tabs{background:rgba(17,17,17,.96)!important}',
    'html.dark .topnav{background:var(--glass2)!important}',
    'html.dark .hdr-nav a:hover{background:var(--bg2)}',
    'html.dark .hdr-nav a.on{background:var(--gold);color:#222;box-shadow:0 2px 8px rgba(255,204,0,.2)}',
    'html.dark .hdr-r a:hover{background:var(--bg2)}',
    'html.dark .hdr-r a.on{background:var(--gold);color:#222;box-shadow:0 2px 8px rgba(255,204,0,.2)}',
    'html.dark .topnav .links a:hover{background:var(--bg2)}',
    'html.dark .topnav .links a.on{background:var(--gold);color:#222;box-shadow:0 2px 8px rgba(255,204,0,.2)}',
    '',
    /* ── Tabs ── */
    'html.dark .tab:hover{background:var(--bg2)}',
    'html.dark .tab.on{color:var(--gold-text);border-bottom-color:var(--gold);background:var(--gold-soft)}',
    'html.dark [data-portal="cro"] .tab.on{color:var(--green-text);border-bottom-color:var(--green);background:var(--green-soft)}',
    'html.dark [data-portal="cfo"] .tab.on{color:var(--amber-text);border-bottom-color:var(--amber);background:var(--amber-soft)}',
    'html.dark [data-portal="coo"] .tab.on{color:var(--orange-text);border-bottom-color:var(--orange);background:var(--orange-soft)}',
    'html.dark [data-portal="cs"] .tab.on{color:var(--red-text);border-bottom-color:var(--red);background:var(--red-soft)}',
    'html.dark [data-portal="cto"] .tab.on{color:var(--purple-text);border-bottom-color:var(--purple);background:var(--purple-soft)}',
    'html.dark [data-portal="cmo"] .tab.on{color:var(--teal-text);border-bottom-color:var(--teal);background:var(--teal-soft)}',
    'html.dark [data-portal="cpo"] .tab.on{color:var(--rose-text);border-bottom-color:var(--rose);background:var(--rose-soft)}',
    'html.dark [data-portal="outcomes"] .tab.on{color:var(--green-text);border-bottom-color:var(--green);background:var(--green-soft)}',
    'html.dark [data-portal="alerts"] .tab.on{color:var(--red-text);border-bottom-color:var(--red);background:var(--red-soft)}',
    'html.dark [data-portal="learning"] .tab.on{color:var(--purple-text);border-bottom-color:var(--purple);background:var(--purple-soft)}',
    'html.dark [data-portal="calculators"] .tab.on{color:var(--gold-text);border-bottom-color:var(--gold);background:var(--gold-soft)}',
    '',
    /* ── Cards & Panels ── */
    'html.dark .kc{background:var(--surface);border-color:var(--border)}',
    'html.dark .kc:hover{border-color:var(--border2)}',
    'html.dark .kc .kv{color:var(--ink)}',
    'html.dark .kc.accent-blue{border-top-color:var(--blue)}.kc.accent-blue .kv{color:var(--blue-text)}',
    'html.dark .kc.accent-green{border-top-color:var(--green)}.kc.accent-green .kv{color:var(--green-text)}',
    'html.dark .kc.accent-red{border-top-color:var(--red)}.kc.accent-red .kv{color:var(--red-text)}',
    'html.dark .kc.accent-amber{border-top-color:var(--amber)}.kc.accent-amber .kv{color:var(--amber-text)}',
    'html.dark .cd{background:var(--surface);border-color:var(--border)}',
    'html.dark .cd:hover{border-color:var(--border2);box-shadow:var(--shadow-hover)}',
    'html.dark .pcard{background:var(--surface);border-color:var(--border)}',
    'html.dark .pcard:hover{border-color:var(--border2)}',
    'html.dark .tcard{background:var(--surface);border-color:var(--border)}',
    'html.dark .stat{background:var(--surface);border-color:var(--border)}',
    'html.dark .wp-card,html.dark .ws-card{background:var(--surface);border-color:var(--border)}',
    'html.dark .wt-card{background:var(--surface);border-color:var(--border)}',
    'html.dark .sc-card{background:var(--surface);border-color:var(--border)}',
    'html.dark .modal{background:var(--surface);border-color:var(--border)}',
    'html.dark .modal h3{color:var(--ink)}',
    '',
    /* ── Right Panel ── */
    'html.dark .rs-section,html.dark .rs-section2{background:var(--surface);border-color:var(--border)}',
    'html.dark .rp-section{background:var(--surface);border-color:var(--border)}',
    'html.dark .rs-alert{background:var(--bg2);border-color:var(--border)}',
    'html.dark .rs-alert:hover{background:var(--surface)}',
    '',
    /* ── Tables ── */
    'html.dark th{background:var(--surface3);color:var(--ink3);border-color:var(--border)}',
    'html.dark td{border-color:var(--bg2);color:var(--ink2)}',
    'html.dark tbody tr:hover td{background:var(--surface3)}',
    'html.dark tr.alert td{background:var(--red-soft)!important}',
    'html.dark tr.good td{background:var(--green-soft)!important}',
    '',
    /* ── Forms ── */
    'html.dark input,html.dark select,html.dark textarea{background:var(--bg2);border-color:var(--border);color:var(--ink)}',
    'html.dark input:focus,html.dark select:focus,html.dark textarea:focus{border-color:var(--gold);background:var(--surface);box-shadow:0 0 0 3px rgba(255,204,0,.1)}',
    'html.dark .fi{background:var(--bg2);border-color:var(--border);color:var(--ink)}',
    'html.dark .fi:focus{border-color:var(--gold);background:var(--surface);box-shadow:0 0 0 3px rgba(255,204,0,.1)}',
    'html.dark .form-input{background:var(--bg2);border-color:var(--border);color:var(--ink)}',
    'html.dark .form-input:focus{border-color:var(--gold);background:var(--surface);box-shadow:0 0 0 3px rgba(255,204,0,.1)}',
    '',
    /* ── Buttons ── */
    'html.dark .btn{background:var(--surface);border-color:var(--border);color:var(--ink2)}',
    'html.dark .btn:hover{border-color:var(--border2);box-shadow:var(--shadow-hover)}',
    'html.dark .btn-blue{background:var(--blue);color:#fff;border-color:var(--blue)}',
    'html.dark .btn-blue:hover{background:#3a75e6}',
    'html.dark .btn-p,.html.dark .btn-primary{background:var(--gold);color:#222;border-color:var(--gold)}',
    'html.dark .btn-green{background:var(--green);color:#222;border-color:var(--green)}',
    'html.dark .btn-red{background:var(--red);color:#fff;border-color:var(--red)}',
    'html.dark .modal-btn{background:var(--surface);border-color:var(--border);color:var(--ink2)}',
    'html.dark .modal-btn.primary{background:var(--blue);color:#fff;border-color:var(--blue)}',
    '',
    /* ── Badges ── */
    'html.dark .bdg-blue{background:var(--blue-soft);color:var(--blue-text)}',
    'html.dark .bdg-green{background:var(--green-soft);color:var(--green-text)}',
    'html.dark .bdg-red{background:var(--red-soft);color:var(--red-text)}',
    'html.dark .bdg-amber{background:var(--amber-soft);color:var(--amber-text)}',
    'html.dark .bdg-purple{background:var(--purple-soft);color:var(--purple-text)}',
    'html.dark .bdg-teal{background:var(--teal-soft);color:var(--teal-text)}',
    'html.dark .bdg-rose{background:var(--rose-soft);color:var(--rose-text)}',
    'html.dark .bdg-gray{background:var(--bg2);color:var(--ink3)}',
    '',
    /* ── Story Card ── */
    'html.dark .story{background:linear-gradient(135deg,#1a1a1a 0%,#252525 100%);border:1px solid var(--border)}',
    'html.dark .story::after{background:linear-gradient(90deg,transparent,rgba(255,255,255,.02))}',
    'html.dark .story .story-n{color:var(--ink)}',
    'html.dark .story .story-n.green{color:var(--green-text)}',
    'html.dark .story .story-n.red{color:var(--red-text)}',
    'html.dark .story .story-n.blue{color:var(--blue-text)}',
    'html.dark .story .story-n.amber{color:var(--amber-text)}',
    'html.dark .story .s-num{color:rgba(255,255,255,.04)}',
    'html.dark .story .s-label{background:var(--bg2);border-color:var(--border);color:var(--ink3)}',
    'html.dark .story .s-title{color:var(--ink)}',
    'html.dark .story .s-body{color:var(--ink2)}',
    'html.dark .story .s-cta{background:var(--surface);border-color:var(--border);color:var(--ink2)}',
    'html.dark .story .s-cta:hover{border-color:var(--gold);color:var(--gold-text)}',
    '',
    /* ── Color Links ── */
    'html.dark .cl-green{background:var(--green-soft);color:var(--green-text);border-left-color:var(--green)}',
    'html.dark .cl-amber{background:var(--amber-soft);color:var(--amber-text);border-left-color:var(--amber)}',
    'html.dark .cl-blue{background:var(--blue-soft);color:var(--blue-text);border-left-color:var(--blue)}',
    'html.dark .cl-red{background:var(--red-soft);color:var(--red-text);border-left-color:var(--red)}',
    'html.dark .cl-rose{background:var(--rose-soft);color:var(--rose-text);border-left-color:var(--rose)}',
    'html.dark .cl-purple{background:var(--purple-soft);color:var(--purple-text);border-left-color:var(--purple)}',
    'html.dark .cl-teal{background:var(--teal-soft);color:var(--teal-text);border-left-color:var(--teal)}',
    '',
    /* ── Alerts ── */
    'html.dark .alert-strip{background:var(--surface);border-color:var(--border)}',
    'html.dark .alert-item{border-color:var(--border)}',
    'html.dark .alert-item.crit{background:var(--red-soft);border-color:rgba(253,29,29,.2);color:var(--red-text)}',
    'html.dark .alert-item.warn{background:var(--amber-soft);border-color:rgba(255,192,51,.2);color:var(--amber-text)}',
    'html.dark .alert-item.info{background:var(--blue-soft);border-color:rgba(0,51,153,.2);color:var(--blue-text)}',
    'html.dark .inline-alert{border-color:var(--border)}',
    'html.dark .inline-alert.crit{background:var(--red-soft);border-color:rgba(253,29,29,.2)}',
    'html.dark .inline-alert.warn{background:var(--amber-soft);border-color:rgba(255,192,51,.2)}',
    'html.dark .inline-alert.info{background:var(--blue-soft);border-color:rgba(0,51,153,.2)}',
    '',
    /* ── Progress Bars ── */
    'html.dark .prog{background:var(--bg3)}',
    'html.dark .rs-bar{background:var(--bg3)}',
    '',
    /* ── Scenario Engine ── */
    'html.dark .scen-bar{background:var(--bg2);border-color:var(--border)}',
    'html.dark .scen-btn:hover{background:var(--surface)}',
    'html.dark .scen-btn.on-bear,.html.dark .scen-btn.s-bear{background:var(--red);color:#fff}',
    'html.dark .scen-btn.on-base,.html.dark .scen-btn.s-base{background:var(--gold);color:#222}',
    'html.dark .scen-btn.on-bull,.html.dark .scen-btn.s-bull{background:var(--green);color:#222}',
    'html.dark .sg-cell.sel-bear{border-color:var(--red);background:var(--red-soft)}',
    'html.dark .sg-cell.sel-base{border-color:var(--gold);background:var(--gold-soft)}',
    'html.dark .sg-cell.sel-bull{border-color:var(--green);background:var(--green-soft)}',
    '',
    /* ── Playbook Steps ── */
    'html.dark .pb-step{border-left-color:var(--border);background:var(--surface)}',
    'html.dark .pb-step.cur{background:var(--amber-soft)}',
    'html.dark .pb-num{background:var(--ink4);color:#fff}',
    'html.dark .pb-step.done .pb-num{background:var(--green)}',
    'html.dark .pb-step.cur .pb-num{background:var(--amber)}',
    'html.dark .pb-desc{background:var(--bg2);border-color:var(--border);color:var(--ink2)}',
    'html.dark .pb-desc-blocked{background:var(--red-soft);color:var(--red-text)}',
    'html.dark .pb-step-active{background:var(--blue-soft)}',
    'html.dark .pb-step-blocked{background:var(--red-soft)}',
    'html.dark .pb-dot-done{background:var(--green)}',
    'html.dark .pb-dot-active{background:var(--blue)}',
    'html.dark .pb-dot-blocked{background:var(--red)}',
    'html.dark .pb-dot-pending{background:var(--ink4)}',
    'html.dark .pb-detail{background:var(--bg2);border-color:var(--border)}',
    'html.dark .pb-block-reason{background:var(--red-soft);border-color:rgba(253,29,29,.2);color:var(--red-text)}',
    'html.dark .pb-opt-card{background:var(--surface);border-color:var(--border)}',
    'html.dark .pb-opt-card:hover{border-color:var(--blue);background:var(--blue-soft)}',
    'html.dark .pb-opt-chosen{border-color:var(--green)!important;background:var(--green-soft)!important}',
    'html.dark .pb-rec-card{background:var(--surface);border-color:var(--border)}',
    'html.dark .pb-card{background:var(--surface);border-color:var(--border)}',
    'html.dark .pb-summary{background:var(--surface);border-color:var(--border)}',
    '',
    /* ── Decision Flow ── */
    'html.dark .df-node{background:var(--surface);border-color:var(--border);color:var(--ink2)}',
    'html.dark .df-node.warn{background:var(--amber-soft);border-left-color:var(--amber)}',
    'html.dark .df-node.yes{background:var(--green-soft);border-left-color:var(--green)}',
    'html.dark .df-node.no{background:var(--red-soft);border-left-color:var(--red)}',
    'html.dark .flow-n{background:var(--surface3);border-color:var(--border)}',
    'html.dark .flow-n.if{background:var(--gold-soft)}',
    'html.dark .flow-n.yes{background:var(--green-soft)}',
    'html.dark .flow-n.no{background:var(--amber-soft)}',
    'html.dark .flow-n.esc{background:var(--red-soft)}',
    '',
    /* ── Inaction / Cost of Inaction ── */
    'html.dark .inaction{background:var(--red-soft);border-color:rgba(253,29,29,.15)}',
    '',
    /* ── Insight Table ── */
    'html.dark .insight-table{background:var(--surface);border-color:var(--border)}',
    'html.dark .insight-head{border-color:var(--border);background:var(--surface3)}',
    'html.dark .insight-row{border-color:var(--bg2)}',
    'html.dark .insight-row:hover{background:var(--surface3)}',
    'html.dark .ir-impact.up{color:var(--green-text)}.ir-impact.dn{color:var(--red-text)}.ir-impact.warn{color:var(--amber-text)}',
    'html.dark .ir-action.act{color:var(--blue-text)}.ir-action.block{color:var(--red-text)}.ir-action.ok{color:var(--green-text)}',
    '',
    /* ── Cross-Portal ── */
    'html.dark .xp{background:var(--gold-soft);border-color:rgba(255,204,0,.15)}',
    'html.dark .xp-head{color:var(--gold-text)}',
    'html.dark .xp-link{border-color:rgba(255,204,0,.2);background:rgba(30,30,30,.6);color:var(--gold-text)}',
    'html.dark .xp-link:hover{background:var(--gold-soft);border-color:var(--gold)}',
    'html.dark .xp-intel{background:var(--surface);border-color:var(--border)}',
    '',
    /* ── Auth & Demo ── */
    'html.dark .auth-dd{background:var(--surface);border-color:var(--border)}',
    'html.dark .auth-dd-header{border-color:var(--border)}',
    'html.dark .auth-dd-item:hover{background:var(--bg2)}',
    'html.dark .auth-badge{border-color:var(--border)}',
    'html.dark .demo-card{background:var(--bg2);border-color:var(--border)}',
    'html.dark .demo-card:hover{border-color:var(--gold);background:var(--gold-soft)}',
    'html.dark .access-chip{border-color:var(--border);color:var(--ink3)}',
    'html.dark .access-chip.selected{border-color:var(--blue);background:var(--blue-soft);color:var(--blue-text)}',
    '',
    /* ── Toasts ── */
    'html.dark .toast.success{background:var(--green-soft);border-color:rgba(43,222,115,.2);color:var(--green-text)}',
    'html.dark .toast.error{background:var(--red-soft);border-color:rgba(253,29,29,.15);color:var(--red-text)}',
    '',
    /* ── Login Page ── */
    'html.dark .login-left{background:linear-gradient(135deg,#0a0a0f 0%,#0d1020 50%,#0a0f0a 100%)!important}',
    'html.dark .login-feature{background:rgba(30,30,34,.7);border-color:var(--border)}',
    'html.dark .login-feature:hover{background:var(--surface)}',
    'html.dark .session-banner{background:var(--amber-soft);border-color:var(--border)}',
    'html.dark .btn-login{background:linear-gradient(135deg,#ffd633,#e6b800);color:#222}',
    'html.dark .btn-login:hover{box-shadow:0 4px 16px rgba(255,204,0,.3)}',
    '',
    /* ── Walkthrough ── */
    'html.dark #walkthrough{background:rgba(0,0,0,.5)}',
    'html.dark .wt-card{background:var(--surface);border-color:var(--border)}',
    'html.dark .wt-card .step-dot{background:var(--bg3)}',
    'html.dark .wt-card .step-dot.active{background:var(--blue)}',
    'html.dark .wt-card .step-dot.done{background:var(--green)}',
    'html.dark .wt-btn{background:var(--surface);border-color:var(--border);color:var(--ink2)}',
    'html.dark .wt-btn.primary{background:var(--blue);color:#fff;border-color:var(--blue)}',
    '',
    /* ── Hero / Landing ── */
    'html.dark .hero h1 strong{background:linear-gradient(135deg,#4d88ff,#ffd633);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}',
    'html.dark .grid-floor{background-image:linear-gradient(90deg,rgba(77,136,255,.08) 1px,transparent 1px),linear-gradient(0deg,rgba(77,136,255,.08) 1px,transparent 1px)}',
    '',
    /* ── Toggle Button ── */
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
    '.dss-theme-toggle svg{position:absolute;transition:opacity .35s ease,transform .35s ease;width:17px;height:17px;stroke:currentColor;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;}',
    '.dss-theme-toggle .dss-icon-sun{opacity:0;transform:rotate(180deg) scale(.3)}',
    '.dss-theme-toggle .dss-icon-moon{opacity:1;transform:rotate(0) scale(1)}',
    'html.dark .dss-theme-toggle .dss-icon-sun{opacity:1;transform:rotate(0) scale(1)}',
    'html.dark .dss-theme-toggle .dss-icon-moon{opacity:0;transform:rotate(-180deg) scale(.3)}',
    'html.dark .dss-theme-toggle{border-color:var(--border2)}',
    '.dss-theme-toggle.dss-toggle-fixed{position:fixed;top:18px;right:18px;z-index:9999}'
  ].join('\n');

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  var moonSVG = '<svg class="dss-icon-moon" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  var sunSVG = '<svg class="dss-icon-sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';

  var KEY = 'arcussoft-theme';
  function applyTheme(t) {
    document.documentElement.classList.toggle('dark', t === 'dark');
  }

  var saved = localStorage.getItem(KEY);
  if (saved) {
    applyTheme(saved);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme:dark)').matches) {
    applyTheme('dark');
  }

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
