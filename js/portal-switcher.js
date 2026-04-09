/* ═══════════════════════════════════════════
   Portal Switcher Dropdown
   Replaces hardcoded portal links with
   a compact dropdown in the header
   ═══════════════════════════════════════════ */

(function() {
  var currentPortal = (location.pathname.split('/').pop().replace(/\.html$/, '') || 'ceo');

  var portals = [
    { id: 'ceo',  label: 'CEO Portal',  icon: '🏢' },
    { id: 'cfo',  label: 'CFO Portal',  icon: '💰' },
    { id: 'cro',  label: 'CRO Portal',  icon: '📈' },
    { id: 'coo',  label: 'COO Portal',  icon: '⚙️' },
    { id: 'cs',   label: 'CS Portal',   icon: '🛡️' },
    { id: 'cto',  label: 'CTO Portal',  icon: '🔧' },
    { id: 'cmo',  label: 'CMO Portal',  icon: '📣' },
    { id: 'cpo',  label: 'CPO Portal',  icon: '🎯' }
  ];

  var current = portals.filter(function(p) { return p.id === currentPortal; })[0] || portals[0];

  // ── Styles ──
  var st = document.createElement('style');
  st.textContent = `
    .psw {
      position: relative;
      display: flex;
      align-items: center;
    }
    .psw-trigger {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 5px 10px;
      border: 1px solid #e5e5e5;
      border-radius: 7px;
      background: #fff;
      cursor: pointer;
      transition: all 0.15s;
      font-size: 12px;
      font-weight: 700;
      color: #222;
      white-space: nowrap;
    }
    .psw-trigger:hover {
      border-color: #003399;
      box-shadow: 0 1px 4px rgba(0,51,153,0.08);
    }
    .psw-trigger .psw-icon {
      font-size: 14px;
      line-height: 1;
    }
    .psw-trigger .psw-chevron {
      width: 12px;
      height: 12px;
      color: #a2aaad;
      transition: transform 0.2s;
      flex-shrink: 0;
    }
    .psw.open .psw-trigger .psw-chevron {
      transform: rotate(180deg);
      color: #003399;
    }
    .psw.open .psw-trigger {
      border-color: #003399;
      background: #E0E8F5;
    }

    .psw-dropdown {
      display: none;
      position: absolute;
      top: calc(100% + 6px);
      left: 0;
      min-width: 200px;
      background: #fff;
      border: 1px solid #e5e5e5;
      border-radius: 10px;
      box-shadow: 0 8px 28px rgba(0,0,0,0.12);
      padding: 4px;
      z-index: 9999;
    }
    .psw.open .psw-dropdown {
      display: block;
    }
    .psw-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      border-radius: 7px;
      cursor: pointer;
      transition: background 0.1s;
      text-decoration: none;
    }
    .psw-item:hover {
      background: #f5f5f5;
    }
    .psw-item.current {
      background: #E0E8F5;
    }
    .psw-item .psw-item-icon {
      font-size: 15px;
      width: 22px;
      text-align: center;
      line-height: 1;
    }
    .psw-item .psw-item-label {
      font-size: 12px;
      font-weight: 600;
      color: #222;
    }
    .psw-item.current .psw-item-label {
      color: #003399;
      font-weight: 700;
    }
    .psw-item .psw-item-badge {
      margin-left: auto;
      font-size: 9px;
      font-weight: 700;
      color: #fff;
      background: #003399;
      padding: 1px 6px;
      border-radius: 4px;
      text-transform: uppercase;
    }
  `;
  document.head.appendChild(st);

  // ── Build dropdown items ──
  function buildDropdown() {
    var html = '';
    portals.forEach(function(p) {
      var isCurrent = p.id === currentPortal;
      html += '<a class="psw-item' + (isCurrent ? ' current' : '') + '" href="' + p.id + '">';
      html += '<span class="psw-item-icon">' + p.icon + '</span>';
      html += '<span class="psw-item-label">' + p.label + '</span>';
      if (isCurrent) html += '<span class="psw-item-badge">Current</span>';
      html += '</a>';
    });
    return html;
  }

  // ── Build switcher HTML ──
  function buildSwitcher() {
    var html = '<div class="psw" id="portal-switcher">';
    html += '<div class="psw-trigger" onclick="PSW.toggle()">';
    html += '<span class="psw-icon">' + current.icon + '</span>';
    html += '<span>' + current.label + '</span>';
    html += '<svg class="psw-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="6 9 12 15 18 9"/></svg>';
    html += '</div>';
    html += '<div class="psw-dropdown">';
    html += buildDropdown();
    html += '</div>';
    html += '</div>';
    return html;
  }

  // ── Inject into page ──
  function inject() {
    var coEl = document.querySelector('.co');
    if (!coEl) return;

    // Replace .co with switcher
    var wrapper = document.createElement('div');
    wrapper.innerHTML = buildSwitcher();
    coEl.parentNode.replaceChild(wrapper.firstElementChild, coEl);

    // Remove portal links from nav (keep utility links)
    var nav = document.querySelector('.hdr-nav');
    if (nav) {
      var links = nav.querySelectorAll('a');
      var portalIds = portals.map(function(p) { return p.id; });
      links.forEach(function(a) {
        var href = a.getAttribute('href');
        if (href && portalIds.indexOf(href.replace(/^\//, '')) !== -1) {
          a.remove();
        }
      });
      // Remove the separator if it's now the first child
      var firstSep = nav.querySelector('.sep');
      if (firstSep && firstSep === nav.firstElementChild) {
        firstSep.remove();
      }
    }
  }

  // ── Close dropdown on outside click ──
  document.addEventListener('click', function(e) {
    var sw = document.getElementById('portal-switcher');
    if (sw && !sw.contains(e.target)) {
      sw.classList.remove('open');
    }
  });

  // ── Escape to close ──
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      var sw = document.getElementById('portal-switcher');
      if (sw) sw.classList.remove('open');
    }
  });

  // ── Public API ──
  window.PSW = {
    toggle: function() {
      var sw = document.getElementById('portal-switcher');
      if (sw) sw.classList.toggle('open');
    },
    close: function() {
      var sw = document.getElementById('portal-switcher');
      if (sw) sw.classList.remove('open');
    }
  };

  // ── Init ──
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
