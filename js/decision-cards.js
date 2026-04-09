/* ═══════════════════════════════════════════
   Decision Cards — Structured Card Component
   Renders decision cards from /api/decisions
   Auto-injects at top of .main content area
   ═══════════════════════════════════════════ */

(function() {
  // ── Detect current portal ──
  var portal = (location.pathname.split('/').pop().replace(/\.html$/, '') || 'ceo');

  // ── Styles ──
  var st = document.createElement('style');
  st.textContent = `
    /* ── Decision Cards Section ── */
    .dc-section {
      margin-bottom: 24px;
    }
    .dc-section-head {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 14px;
    }
    .dc-section-title {
      font-size: 13px;
      font-weight: 700;
      color: #003399;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .dc-section-count {
      font-size: 10px;
      font-weight: 700;
      color: #FFCC00;
      background: #003399;
      padding: 2px 8px;
      border-radius: 10px;
    }

    /* ── Single Card ── */
    .dc {
      background: #fff;
      border: 1px solid #e5e5e5;
      border-radius: 10px;
      margin-bottom: 10px;
      overflow: hidden;
      transition: all 0.2s;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }
    .dc:hover {
      border-color: #ccc;
      box-shadow: 0 3px 12px rgba(0,0,0,0.08);
    }
    .dc.expanded {
      border-color: #003399;
      box-shadow: 0 4px 16px rgba(0,51,153,0.10);
    }

    /* ── Card Header ── */
    .dc-header {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 14px 18px;
      cursor: pointer;
      user-select: none;
    }
    .dc-priority {
      display: flex;
      align-items: center;
      gap: 5px;
      flex-shrink: 0;
      padding: 3px 9px;
      border-radius: 6px;
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .dc-priority.high {
      background: #FD1D1D;
      color: #fff;
    }
    .dc-priority.medium {
      background: #FFCC00;
      color: #222;
    }
    .dc-priority.low {
      background: #2BDE73;
      color: #fff;
    }
    .dc-priority svg {
      width: 11px;
      height: 11px;
    }
    .dc-title {
      flex: 1;
      font-size: 13px;
      font-weight: 700;
      color: #222;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .dc-status {
      flex-shrink: 0;
      font-size: 10px;
      font-weight: 600;
      padding: 3px 8px;
      border-radius: 6px;
      text-transform: capitalize;
    }
    .dc-status.open {
      background: #E0E8F5;
      color: #003399;
    }
    .dc-status.in-progress {
      background: #FFF8DB;
      color: #B89600;
    }
    .dc-status.completed {
      background: #E3FBED;
      color: #1A9E52;
    }
    .dc-status.blocked {
      background: #FFECEC;
      color: #D11111;
    }
    .dc-chevron {
      flex-shrink: 0;
      width: 16px;
      height: 16px;
      color: #a2aaad;
      transition: transform 0.2s;
    }
    .dc.expanded .dc-chevron {
      transform: rotate(90deg);
      color: #003399;
    }

    /* ── Card Body (always visible) ── */
    .dc-body {
      padding: 0 18px 14px;
    }
    .dc-summary {
      font-size: 12px;
      color: #444;
      line-height: 1.5;
      margin-bottom: 10px;
    }
    .dc-meta {
      display: flex;
      align-items: center;
      gap: 14px;
      flex-wrap: wrap;
    }
    .dc-meta-item {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 11px;
      color: #666;
    }
    .dc-meta-item strong {
      color: #222;
      font-weight: 700;
    }
    .dc-meta-item svg {
      width: 12px;
      height: 12px;
      color: #a2aaad;
    }
    .dc-impact {
      font-size: 11px;
      font-weight: 700;
      font-family: 'JetBrains Mono', monospace;
      color: #D11111;
    }

    /* ── Expandable Detail Panel ── */
    .dc-detail {
      display: none;
      border-top: 1px solid #e5e5e5;
      padding: 16px 18px;
      background: #fafaf8;
    }
    .dc.expanded .dc-detail {
      display: block;
    }
    .dc-detail-section {
      margin-bottom: 14px;
    }
    .dc-detail-section:last-child {
      margin-bottom: 0;
    }
    .dc-detail-label {
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #003399;
      margin-bottom: 6px;
    }
    .dc-detail-text {
      font-size: 12px;
      color: #444;
      line-height: 1.5;
    }

    /* ── Action Buttons ── */
    .dc-actions {
      display: flex;
      gap: 6px;
      padding: 12px 18px;
      border-top: 1px solid #e5e5e5;
      background: #fafaf8;
    }
    .dc-btn {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 5px 12px;
      border: 1px solid #e5e5e5;
      border-radius: 6px;
      background: #fff;
      font-size: 11px;
      font-weight: 600;
      color: #444;
      cursor: pointer;
      transition: all 0.15s;
    }
    .dc-btn:hover {
      border-color: #003399;
      color: #003399;
      background: #E0E8F5;
    }
    .dc-btn svg {
      width: 12px;
      height: 12px;
    }
    .dc-btn.primary {
      background: #003399;
      color: #fff;
      border-color: #003399;
    }
    .dc-btn.primary:hover {
      background: #002266;
    }

    /* ── Loading / Empty / Error ── */
    .dc-skeleton {
      background: #fff;
      border: 1px solid #e5e5e5;
      border-radius: 10px;
      padding: 18px;
      margin-bottom: 10px;
    }
    .dc-skeleton-bar {
      height: 12px;
      background: linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: dc-shimmer 1.5s infinite;
      border-radius: 4px;
      margin-bottom: 8px;
    }
    .dc-skeleton-bar:last-child { margin-bottom: 0; }
    .dc-skeleton-bar.w60 { width: 60%; }
    .dc-skeleton-bar.w80 { width: 80%; }
    .dc-skeleton-bar.w40 { width: 40%; }
    @keyframes dc-shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
    .dc-empty, .dc-error {
      font-size: 12px;
      color: #a2aaad;
      padding: 20px 18px;
      text-align: center;
      font-style: italic;
    }
    .dc-error {
      color: #D11111;
      font-style: normal;
    }
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

  function priorityIcon(p) {
    if (p === 'high') return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>';
    if (p === 'medium') return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>';
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
  }

  function chevronSvg() {
    return '<svg class="dc-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>';
  }

  // ── Render a single card ──
  function renderCard(d) {
    var impact = formatMoney(d.dollarImpact);
    var statusLabel = (d.status || 'open').replace(/-/g, ' ');
    var owner = d.owner ? d.owner.split('@')[0] : 'Unassigned';

    var html = '<div class="dc" data-id="' + d.id + '">';

    // Header row
    html += '<div class="dc-header" onclick="DCCards.toggle(\'' + d.id + '\')">';
    html += '<div class="dc-priority ' + d.priority + '">' + priorityIcon(d.priority) + ' ' + d.priority + '</div>';
    html += '<div class="dc-title">' + d.title + '</div>';
    html += '<div class="dc-status ' + (d.status || 'open') + '">' + statusLabel + '</div>';
    html += chevronSvg();
    html += '</div>';

    // Body — always visible
    html += '<div class="dc-body">';
    html += '<div class="dc-summary">' + d.summary + '</div>';
    html += '<div class="dc-meta">';
    html += '<div class="dc-meta-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> <strong>' + owner + '</strong></div>';
    html += '<div class="dc-meta-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> ' + d.domain + '</div>';
    if (impact) {
      html += '<div class="dc-impact">' + impact + '</div>';
    }
    html += '</div></div>';

    // Expandable detail
    html += '<div class="dc-detail">';
    html += '<div class="dc-detail-section"><div class="dc-detail-label">Why This Matters</div><div class="dc-detail-text">' + d.summary + '</div></div>';
    html += '<div class="dc-detail-section"><div class="dc-detail-label">Portal</div><div class="dc-detail-text">' + (d.portal || 'general').toUpperCase() + '</div></div>';
    html += '<div class="dc-detail-section"><div class="dc-detail-label">Timeline</div><div class="dc-detail-text">Created: ' + new Date(d.createdAt).toLocaleDateString('en-US', {month:'short',day:'numeric',year:'numeric'}) + ' · Updated: ' + new Date(d.updatedAt).toLocaleDateString('en-US', {month:'short',day:'numeric',year:'numeric'}) + '</div></div>';
    html += '</div>';

    // Action buttons
    html += '<div class="dc-actions">';
    html += '<button class="dc-btn primary" onclick="DCCards.action(\'assign\',\'' + d.id + '\')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> Assign</button>';
    html += '<button class="dc-btn" onclick="DCCards.action(\'progress\',\'' + d.id + '\')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/></svg> In Progress</button>';
    html += '<button class="dc-btn" onclick="DCCards.action(\'note\',\'' + d.id + '\')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> Note</button>';
    html += '</div>';

    html += '</div>';
    return html;
  }

  // ── Render full section ──
  function renderSection(decisions) {
    // Filter: CEO sees all, others see their portal + general
    var filtered = decisions.filter(function(d) {
      if (portal === 'ceo' || portal === 'admin') return true;
      return d.portal === portal || !d.portal;
    });

    // Sort: high first, then open/in-progress before completed
    filtered.sort(function(a, b) {
      var pa = priorityOrder(a.priority);
      var pb = priorityOrder(b.priority);
      if (pa !== pb) return pa - pb;
      var sa = a.status === 'completed' ? 1 : 0;
      var sb = b.status === 'completed' ? 1 : 0;
      return sa - sb;
    });

    if (filtered.length === 0) {
      return '<div class="dc-section">'
        + '<div class="dc-section-head"><span class="dc-section-title">Active Decisions</span></div>'
        + '<div class="dc-empty">No active decisions for this portal</div>'
        + '</div>';
    }

    var html = '<div class="dc-section">';
    html += '<div class="dc-section-head">';
    html += '<span class="dc-section-title">Active Decisions</span>';
    html += '<span class="dc-section-count">' + filtered.length + '</span>';
    html += '</div>';
    filtered.forEach(function(d) {
      html += renderCard(d);
    });
    html += '</div>';
    return html;
  }

  // ── Loading skeleton ──
  function renderSkeleton() {
    var html = '<div class="dc-section">';
    html += '<div class="dc-section-head"><span class="dc-section-title">Active Decisions</span></div>';
    for (var i = 0; i < 3; i++) {
      html += '<div class="dc-skeleton">'
        + '<div class="dc-skeleton-bar w60"></div>'
        + '<div class="dc-skeleton-bar w80"></div>'
        + '<div class="dc-skeleton-bar w40"></div>'
        + '</div>';
    }
    html += '</div>';
    return html;
  }

  // ── Inject into page ──
  function injectCards(html) {
    var existing = document.querySelector('.dc-section');
    if (existing) {
      existing.outerHTML = html;
      return;
    }

    var wrapper = document.createElement('div');
    wrapper.innerHTML = html;

    var main = document.querySelector('.main');
    if (main) {
      // Insert as first child of .main
      if (main.firstChild) {
        main.insertBefore(wrapper.firstElementChild, main.firstChild);
      } else {
        main.appendChild(wrapper.firstElementChild);
      }
    }
  }

  // ── Load data ──
  function loadCards() {
    injectCards(renderSkeleton());

    fetch('/api/decisions')
      .then(function(r) { return r.json(); })
      .then(function(data) {
        var decisions = data.decisions || [];
        window._dcDecisions = decisions;
        injectCards(renderSection(decisions));
      })
      .catch(function() {
        injectCards('<div class="dc-section">'
          + '<div class="dc-section-head"><span class="dc-section-title">Active Decisions</span></div>'
          + '<div class="dc-error">Unable to load decisions. <a href="#" onclick="DCCards.reload();return false" style="color:#003399;font-weight:600">Retry</a></div>'
          + '</div>');
      });
  }

  // ── Listen for real-time updates ──
  function listenForUpdates() {
    if (typeof io !== 'undefined') {
      try {
        var socket = io();
        socket.on('data-update', function(data) {
          if (data.source === 'decisions') loadCards();
        });
      } catch(e) {}
    }
  }

  // ── Public API ──
  window.DCCards = {
    toggle: function(id) {
      // Open drill-down panel if available
      if (window.DDPanel) {
        // Find decision data
        var card = document.querySelector('.dc[data-id="' + id + '"]');
        if (card && window._dcDecisions) {
          var decision = window._dcDecisions.filter(function(d) { return d.id === id; })[0];
          if (decision) {
            DDPanel.open(decision);
            return;
          }
        }
      }
      // Fallback: inline expand
      var card = document.querySelector('.dc[data-id="' + id + '"]');
      if (card) card.classList.toggle('expanded');
    },
    action: function(type, id) {
      console.log('[DCCards] Action:', type, 'on', id);
      // Placeholder — will connect to execution tracking
      var btn = event.currentTarget;
      var origText = btn.innerHTML;
      btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg> Done';
      btn.style.color = '#1A9E52';
      btn.style.borderColor = '#2BDE73';
      setTimeout(function() {
        btn.innerHTML = origText;
        btn.style.color = '';
        btn.style.borderColor = '';
      }, 1500);
    },
    reload: loadCards
  };

  // ── Init ──
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      loadCards();
      listenForUpdates();
    });
  } else {
    loadCards();
    listenForUpdates();
  }
})();
