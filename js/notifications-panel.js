/* ═══════════════════════════════════════════
   Notifications Panel
   Bell icon in header with unread count
   Dropdown panel for recent alerts
   ═══════════════════════════════════════════ */

(function() {
  // ── State ──
  var isOpen = false;
  var alerts = [];
  var readIds = JSON.parse(localStorage.getItem('np-read') || '[]');

  // ── Styles ──
  var st = document.createElement('style');
  st.textContent = `
    .np-wrap {
      position: relative;
      display: flex;
      align-items: center;
    }

    /* ── Bell trigger ── */
    .np-bell {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid transparent;
      border-radius: 7px;
      background: none;
      cursor: pointer;
      color: #666;
      transition: all 0.15s;
      position: relative;
    }
    .np-bell:hover {
      background: #f5f5f5;
      border-color: #e5e5e5;
      color: #003399;
    }
    .np-bell svg { width: 16px; height: 16px; }

    /* ── Unread badge ── */
    .np-badge {
      position: absolute;
      top: 2px;
      right: 2px;
      min-width: 15px;
      height: 15px;
      padding: 0 4px;
      border-radius: 8px;
      background: #FD1D1D;
      color: #fff;
      font-size: 9px;
      font-weight: 700;
      font-family: 'JetBrains Mono', monospace;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
      box-shadow: 0 1px 3px rgba(253,29,29,0.4);
    }
    .np-badge.zero { display: none; }

    /* ── Dropdown panel ── */
    .np-panel {
      display: none;
      position: absolute;
      top: calc(100% + 8px);
      right: -40px;
      width: 380px;
      max-height: 480px;
      background: #fff;
      border: 1px solid #e5e5e5;
      border-radius: 12px;
      box-shadow: 0 12px 36px rgba(0,0,0,0.14);
      z-index: 9999;
      overflow: hidden;
    }
    .np-panel.open { display: flex; flex-direction: column; }

    /* ── Panel header ── */
    .np-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px 16px 10px;
      border-bottom: 1px solid #f0f0f0;
      flex-shrink: 0;
    }
    .np-title {
      font-size: 13px;
      font-weight: 700;
      color: #222;
    }
    .np-mark-read {
      font-size: 10px;
      font-weight: 600;
      color: #003399;
      cursor: pointer;
      border: none;
      background: none;
      padding: 4px 8px;
      border-radius: 5px;
      transition: all 0.1s;
    }
    .np-mark-read:hover {
      background: #E0E8F5;
    }

    /* ── Scrollable list ── */
    .np-list {
      overflow-y: auto;
      flex: 1;
      padding: 6px;
    }
    .np-list::-webkit-scrollbar { width: 4px; }
    .np-list::-webkit-scrollbar-thumb { background: #e5e5e5; border-radius: 2px; }

    /* ── Time group label ── */
    .np-group-label {
      font-size: 9px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #a2aaad;
      padding: 10px 10px 4px;
    }

    /* ── Alert item ── */
    .np-item {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 10px;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.1s;
      text-decoration: none;
      position: relative;
    }
    .np-item:hover { background: #f5f5f5; }
    .np-item.unread { background: #f8f9ff; }
    .np-item.unread:hover { background: #eef1fb; }

    /* ── Unread dot ── */
    .np-item.unread::before {
      content: '';
      position: absolute;
      left: 4px;
      top: 50%;
      transform: translateY(-50%);
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #003399;
    }

    /* ── Severity icon ── */
    .np-sev {
      width: 28px;
      height: 28px;
      border-radius: 7px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      margin-top: 1px;
    }
    .np-sev svg { width: 14px; height: 14px; }
    .np-sev.critical { background: #FEE2E2; color: #DC2626; }
    .np-sev.warning { background: #FEF3C7; color: #D97706; }
    .np-sev.info { background: #E0E8F5; color: #003399; }

    /* ── Item content ── */
    .np-item-body {
      flex: 1;
      min-width: 0;
    }
    .np-item-title {
      font-size: 12px;
      font-weight: 600;
      color: #222;
      line-height: 1.3;
    }
    .np-item-desc {
      font-size: 11px;
      color: #888;
      margin-top: 2px;
      line-height: 1.3;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .np-item-meta {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 4px;
    }
    .np-item-time {
      font-size: 10px;
      color: #a2aaad;
    }
    .np-item-portal {
      font-size: 9px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #003399;
      background: #E0E8F5;
      padding: 1px 6px;
      border-radius: 4px;
    }
    .np-item-impact {
      font-size: 10px;
      font-weight: 700;
      color: #DC2626;
      font-family: 'JetBrains Mono', monospace;
    }

    /* ── Empty state ── */
    .np-empty {
      padding: 40px 16px;
      text-align: center;
    }
    .np-empty-icon {
      font-size: 28px;
      margin-bottom: 8px;
      opacity: 0.4;
    }
    .np-empty-text {
      font-size: 12px;
      color: #a2aaad;
    }

    /* ── Footer ── */
    .np-footer {
      padding: 8px 12px;
      border-top: 1px solid #f0f0f0;
      text-align: center;
      flex-shrink: 0;
    }
    .np-footer a {
      font-size: 11px;
      font-weight: 600;
      color: #003399;
      text-decoration: none;
      padding: 4px 12px;
      border-radius: 5px;
      transition: background 0.1s;
    }
    .np-footer a:hover {
      background: #E0E8F5;
    }
  `;
  document.head.appendChild(st);

  // ── Severity SVG icons ──
  var sevIcons = {
    critical: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
    warning: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
  };

  // ── Time ago ──
  function timeAgo(dateStr) {
    var now = new Date();
    var then = new Date(dateStr);
    var diffMs = now - then;
    var diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 1) return 'Just now';
    if (diffMin < 60) return diffMin + 'm ago';
    var diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return diffHr + 'h ago';
    var diffDay = Math.floor(diffHr / 24);
    if (diffDay === 1) return 'Yesterday';
    return diffDay + 'd ago';
  }

  // ── Group label ──
  function getGroup(dateStr) {
    var now = new Date();
    var then = new Date(dateStr);
    var diffHr = (now - then) / 3600000;
    if (diffHr < 24) return 'Today';
    if (diffHr < 48) return 'Yesterday';
    return 'Earlier';
  }

  // ── Build HTML ──
  function buildHTML() {
    var unreadCount = alerts.filter(function(a) { return readIds.indexOf(a.id) === -1; }).length;

    var html = '<div class="np-wrap" id="notif-panel">';
    html += '<button class="np-bell" onclick="NPanel.toggle()">';
    html += '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>';
    html += '<span class="np-badge' + (unreadCount === 0 ? ' zero' : '') + '" id="np-badge">' + unreadCount + '</span>';
    html += '</button>';
    html += '<div class="np-panel" id="np-dropdown">';

    // Header
    html += '<div class="np-header">';
    html += '<span class="np-title">Notifications</span>';
    if (unreadCount > 0) {
      html += '<button class="np-mark-read" onclick="NPanel.markAllRead()">Mark all read</button>';
    }
    html += '</div>';

    // List
    html += '<div class="np-list" id="np-list">';
    html += renderList();
    html += '</div>';

    // Footer
    html += '<div class="np-footer"><a href="alerts">View all alerts →</a></div>';

    html += '</div>';
    html += '</div>';
    return html;
  }

  // ── Render list ──
  function renderList() {
    if (alerts.length === 0) {
      return '<div class="np-empty"><div class="np-empty-icon">🔔</div><div class="np-empty-text">No notifications</div></div>';
    }

    // Sort by createdAt descending
    var sorted = alerts.slice().sort(function(a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    // Group by time
    var groups = {};
    sorted.forEach(function(a) {
      var g = getGroup(a.createdAt);
      if (!groups[g]) groups[g] = [];
      groups[g].push(a);
    });

    var html = '';
    var groupOrder = ['Today', 'Yesterday', 'Earlier'];
    groupOrder.forEach(function(g) {
      if (!groups[g]) return;
      html += '<div class="np-group-label">' + g + '</div>';
      groups[g].forEach(function(a) {
        var isUnread = readIds.indexOf(a.id) === -1;
        html += '<div class="np-item' + (isUnread ? ' unread' : '') + '" onclick="NPanel.clickItem(\'' + a.id + '\')">';
        html += '<div class="np-sev ' + a.severity + '">' + (sevIcons[a.severity] || sevIcons.info) + '</div>';
        html += '<div class="np-item-body">';
        html += '<div class="np-item-title">' + a.title + '</div>';
        html += '<div class="np-item-desc">' + a.description + '</div>';
        html += '<div class="np-item-meta">';
        html += '<span class="np-item-time">' + timeAgo(a.createdAt) + '</span>';
        html += '<span class="np-item-portal">' + a.portal + '</span>';
        if (a.dollarImpactFormatted) {
          html += '<span class="np-item-impact">' + a.dollarImpactFormatted + '</span>';
        }
        html += '</div>';
        html += '</div>';
        html += '</div>';
      });
    });

    return html;
  }

  // ── Inject into header ──
  function inject() {
    var hdrR = document.querySelector('.hdr-r');
    if (!hdrR) return;

    // Insert before global-search if it exists, otherwise before auth-area
    var searchWrap = hdrR.querySelector('#global-search');
    var authArea = hdrR.querySelector('.auth-area');

    var wrapper = document.createElement('div');
    wrapper.innerHTML = buildHTML();
    var el = wrapper.firstElementChild;

    if (searchWrap) {
      hdrR.insertBefore(el, searchWrap);
    } else if (authArea) {
      hdrR.insertBefore(el, authArea);
    } else {
      hdrR.insertBefore(el, hdrR.firstChild);
    }
  }

  // ── Update badge count ──
  function updateBadge() {
    var badge = document.getElementById('np-badge');
    if (!badge) return;
    var unreadCount = alerts.filter(function(a) { return readIds.indexOf(a.id) === -1; }).length;
    badge.textContent = unreadCount;
    badge.classList.toggle('zero', unreadCount === 0);
  }

  // ── Open / Close ──
  function openPanel() {
    isOpen = true;
    document.getElementById('np-dropdown').classList.add('open');
  }

  function closePanel() {
    isOpen = false;
    var dd = document.getElementById('np-dropdown');
    if (dd) dd.classList.remove('open');
  }

  // ── Load alerts ──
  function loadAlerts() {
    fetch('/api/alerts')
      .then(function(r) { return r.json(); })
      .then(function(data) {
        alerts = data.alerts || [];
        // Refresh the rendered panel
        var list = document.getElementById('np-list');
        if (list) list.innerHTML = renderList();
        updateBadge();
        // Update header mark-read button
        var header = document.querySelector('.np-header');
        if (header) {
          var btn = header.querySelector('.np-mark-read');
          var unreadCount = alerts.filter(function(a) { return readIds.indexOf(a.id) === -1; }).length;
          if (unreadCount > 0 && !btn) {
            var newBtn = document.createElement('button');
            newBtn.className = 'np-mark-read';
            newBtn.textContent = 'Mark all read';
            newBtn.onclick = function() { NPanel.markAllRead(); };
            header.appendChild(newBtn);
          } else if (unreadCount === 0 && btn) {
            btn.remove();
          }
        }
      })
      .catch(function() {});
  }

  // ── Public API ──
  window.NPanel = {
    toggle: function() {
      if (isOpen) closePanel();
      else { loadAlerts(); openPanel(); }
    },
    close: closePanel,
    markAllRead: function() {
      alerts.forEach(function(a) {
        if (readIds.indexOf(a.id) === -1) readIds.push(a.id);
      });
      localStorage.setItem('np-read', JSON.stringify(readIds));
      updateBadge();
      var list = document.getElementById('np-list');
      if (list) list.innerHTML = renderList();
      // Remove mark-read button
      var btn = document.querySelector('.np-mark-read');
      if (btn) btn.remove();
    },
    clickItem: function(id) {
      // Mark as read
      if (readIds.indexOf(id) === -1) {
        readIds.push(id);
        localStorage.setItem('np-read', JSON.stringify(readIds));
        updateBadge();
      }
      closePanel();
      // Navigate to alerts page
      window.location.href = 'alerts';
    }
  };

  // ── Click outside to close ──
  document.addEventListener('click', function(e) {
    if (!e.target.closest('#notif-panel') && isOpen) {
      closePanel();
    }
  });

  // ── Escape to close ──
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isOpen) closePanel();
  });

  // ── Init ──
  function init() {
    inject();
    loadAlerts();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
