/* ═══════════════════════════════════════════
   Decision Priority Strip
   Shows top 3-5 highest priority decisions
   Auto-injects between tabs and main layout
   ═══════════════════════════════════════════ */

(function() {
  // ── Styles ──
  var st = document.createElement('style');
  st.textContent = `
    .pstrip {
      position: fixed;
      top: 102px;
      left: 0;
      right: 0;
      z-index: 198;
      height: 56px;
      background: #fafaf8;
      border-bottom: 1px solid #e5e5e5;
      display: flex;
      align-items: center;
      padding: 0 32px;
      gap: 8px;
      overflow-x: auto;
      overflow-y: hidden;
      scrollbar-width: none;
      -webkit-overflow-scrolling: touch;
    }
    .pstrip::-webkit-scrollbar { display: none; }

    .pstrip-label {
      flex-shrink: 0;
      font-size: 9px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #003399;
      padding: 4px 10px 4px 6px;
      border-right: 2px solid #FFCC00;
      margin-right: 2px;
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .pstrip-label svg { opacity: 1; color: #FFCC00; }

    .pstrip-card {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 12px;
      background: #ffffff;
      border: 1px solid #e5e5e5;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.15s;
      max-width: 260px;
      min-width: 160px;
    }
    .pstrip-card:hover {
      border-color: #ccc;
      box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    }

    .pstrip-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .pstrip-dot.high { background: #FD1D1D; }
    .pstrip-dot.medium { background: #d97706; }
    .pstrip-dot.low { background: #2BDE73; }

    .pstrip-info {
      flex: 1;
      min-width: 0;
    }
    .pstrip-title {
      font-size: 11px;
      font-weight: 600;
      color: #222;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.3;
      max-width: 180px;
    }
    .pstrip-meta {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-top: 2px;
    }
    .pstrip-status {
      font-size: 9px;
      font-weight: 600;
      color: #7a7770;
      text-transform: capitalize;
    }
    .pstrip-domain {
      font-size: 9px;
      font-weight: 600;
      color: #003399;
      background: #E0E8F5;
      padding: 1px 6px;
      border-radius: 4px;
    }
    .pstrip-impact {
      font-size: 9px;
      font-weight: 600;
      color: #7a7770;
      font-family: 'JetBrains Mono', monospace;
    }

    .pstrip-loading {
      font-size: 11px;
      color: #a2aaad;
      padding: 0 14px;
    }

    .pstrip-empty {
      font-size: 11px;
      color: #16A34A;
      padding: 0 14px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .pstrip-empty svg { flex-shrink: 0; opacity: 0.7; }

    .pstrip-error {
      font-size: 11px;
      color: #DC2626;
      padding: 0 14px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .pstrip-error svg { flex-shrink: 0; }
    .pstrip-error a {
      color: #003399;
      font-weight: 600;
      text-decoration: none;
      padding: 2px 8px;
      border-radius: 4px;
      transition: background 0.1s;
    }
    .pstrip-error a:hover { background: #E0E8F5; }
  `;
  document.head.appendChild(st);

  // ── Helpers ──
  function formatMoney(val) {
    if (!val || val === 0) return '';
    if (val >= 1000000) return '$' + (val / 1000000).toFixed(1) + 'M';
    if (val >= 1000) return '$' + (val / 1000).toFixed(0) + 'K';
    return '$' + val;
  }

  function priorityOrder(p) {
    return { high: 0, medium: 1, low: 2 }[p] || 3;
  }

  // ── Render ──
  function renderStrip(decisions) {
    // Sort: high first, then open/in-progress before completed
    var sorted = decisions.slice().sort(function(a, b) {
      var pa = priorityOrder(a.priority);
      var pb = priorityOrder(b.priority);
      if (pa !== pb) return pa - pb;
      var sa = a.status === 'completed' ? 1 : 0;
      var sb = b.status === 'completed' ? 1 : 0;
      return sa - sb;
    });

    // Take top 5
    var top = sorted.slice(0, 5);

    var html = '<div class="pstrip-label"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> Priority</div>';

    top.forEach(function(d) {
      var impact = formatMoney(d.dollarImpact);
      var statusLabel = d.status.replace('-', ' ');
      html += '<div class="pstrip-card" data-id="' + d.id + '" onclick="PStrip.open(\'' + d.id + '\')">'
        + '<div class="pstrip-dot ' + d.priority + '"></div>'
        + '<div class="pstrip-info">'
        + '<div class="pstrip-title">' + d.title + '</div>'
        + '<div class="pstrip-meta">'
        + '<span class="pstrip-status">' + statusLabel + '</span>'
        + '<span class="pstrip-domain">' + d.domain + '</span>'
        + (impact ? '<span class="pstrip-impact">' + impact + '</span>' : '')
        + '</div></div></div>';
    });

    return html;
  }

  // ── Inject into page ──
  function injectStrip(html) {
    var existing = document.querySelector('.pstrip');
    if (existing) {
      existing.innerHTML = html;
      return;
    }

    var strip = document.createElement('div');
    strip.className = 'pstrip';
    strip.innerHTML = html;

    // Insert before .layout
    var layout = document.querySelector('.layout');
    if (layout) {
      layout.parentNode.insertBefore(strip, layout);
      // Adjust layout margin-top to account for strip (56px)
      var currentMargin = parseInt(getComputedStyle(layout).marginTop) || 0;
      layout.style.marginTop = (currentMargin + 56) + 'px';
    } else {
      // Fallback: insert after .tabs
      var tabs = document.querySelector('.tabs');
      if (tabs) tabs.parentNode.insertBefore(strip, tabs.nextSibling);
    }
  }

  // ── Load data ──
  function loadDecisions() {
    // Show loading state
    var existing = document.querySelector('.pstrip');
    if (!existing) {
      injectStrip('<div class="pstrip-label"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> Priority</div><div class="pstrip-loading">Loading decisions...</div>');
    }

    fetch('/api/decisions')
      .then(function(r) { return r.json(); })
      .then(function(data) {
        if (data.decisions && data.decisions.length > 0) {
          if (!window._dcDecisions) window._dcDecisions = data.decisions;
          var html = renderStrip(data.decisions);
          injectStrip(html);
        } else {
          injectStrip('<div class="pstrip-label"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> Priority</div><div class="pstrip-empty"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> All clear — no high-priority decisions</div>');
        }
      })
      .catch(function() {
        injectStrip('<div class="pstrip-label"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> Priority</div><div class="pstrip-error"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg> Unable to load <a href="#" onclick="PSStrip.reload();return false">Retry</a></div>');
      });
  }

  // ── Listen for real-time updates ──
  function listenForUpdates() {
    if (typeof io === 'undefined') {
      var s = document.createElement('script');
      s.src = '/socket.io/socket.io.js';
      s.onload = function() {
        try {
          var socket = io();
          socket.on('data-update', function(data) {
            if (data.source === 'decisions') loadDecisions();
          });
        } catch(e) {}
      };
      document.head.appendChild(s);
    } else {
      try {
        var socket = io();
        socket.on('data-update', function(data) {
          if (data.source === 'decisions') loadDecisions();
        });
      } catch(e) {}
    }
  }

  // ── Public API ──
  window.PStrip = {
    open: function(id) {
      // Highlight strip card
      document.querySelectorAll('.pstrip-card').forEach(function(c) {
        c.style.borderColor = c.dataset.id === id ? '#003399' : '#e5e5e5';
        c.style.boxShadow = c.dataset.id === id ? '0 0 0 1px #003399' : 'none';
      });

      // Open drill-down panel if available
      if (window.DDPanel && window._dcDecisions) {
        var decision = window._dcDecisions.filter(function(d) { return d.id === id; })[0];
        if (decision) {
          DDPanel.open(decision);
          return;
        }
      }

      // Fallback: scroll to Decision Card
      var dc = document.querySelector('.dc[data-id="' + id + '"]');
      if (dc) {
        document.querySelectorAll('.dc.expanded').forEach(function(el) {
          if (el.dataset.id !== id) el.classList.remove('expanded');
        });
        dc.classList.add('expanded');
        dc.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    },
    reload: loadDecisions
  };

  // ── Init ──
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      loadDecisions();
      listenForUpdates();
    });
  } else {
    loadDecisions();
    listenForUpdates();
  }
})();
