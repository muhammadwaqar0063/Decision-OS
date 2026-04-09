/* ═══════════════════════════════════════════
   Global Search
   Search across decisions, metrics, entities
   Expanding search bar in header
   ═══════════════════════════════════════════ */

(function() {
  // ── State ──
  var isOpen = false;
  var searchIndex = null;

  // ── Styles ──
  var st = document.createElement('style');
  st.textContent = `
    .gs-wrap {
      position: relative;
      display: flex;
      align-items: center;
    }

    /* ── Trigger icon ── */
    .gs-trigger {
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
    }
    .gs-trigger:hover {
      background: #f5f5f5;
      border-color: #e5e5e5;
      color: #003399;
    }
    .gs-trigger svg { width: 15px; height: 15px; }

    /* ── Search box (expanded) ── */
    .gs-box {
      display: none;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 320px;
      z-index: 9998;
    }
    .gs-box.open {
      display: flex;
      align-items: center;
      gap: 0;
      background: #fff;
      border: 2px solid #003399;
      border-radius: 9px;
      box-shadow: 0 6px 24px rgba(0,51,153,0.12);
      overflow: hidden;
    }
    .gs-icon {
      flex-shrink: 0;
      padding: 0 0 0 10px;
      color: #003399;
      display: flex;
      align-items: center;
    }
    .gs-icon svg { width: 14px; height: 14px; }
    .gs-input {
      flex: 1;
      border: none;
      outline: none;
      padding: 8px 6px;
      font-size: 12px;
      font-weight: 500;
      color: #222;
      background: transparent;
      min-width: 0;
    }
    .gs-input::placeholder {
      color: #a2aaad;
    }
    .gs-close {
      flex-shrink: 0;
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      background: none;
      cursor: pointer;
      color: #a2aaad;
      transition: all 0.1s;
      margin: 0 4px 0 0;
      border-radius: 5px;
    }
    .gs-close:hover {
      background: #FFECEC;
      color: #D11111;
    }
    .gs-close svg { width: 12px; height: 12px; }

    /* ── Results dropdown ── */
    .gs-results {
      display: none;
      position: absolute;
      top: calc(100% + 6px);
      right: 0;
      width: 380px;
      max-height: 420px;
      overflow-y: auto;
      background: #fff;
      border: 1px solid #e5e5e5;
      border-radius: 10px;
      box-shadow: 0 8px 28px rgba(0,0,0,0.12);
      padding: 6px;
      z-index: 9999;
    }
    .gs-results.open {
      display: block;
    }
    .gs-results::-webkit-scrollbar { width: 5px; }
    .gs-results::-webkit-scrollbar-thumb { background: #e5e5e5; border-radius: 3px; }

    /* ── Result group ── */
    .gs-group {
      margin-bottom: 4px;
    }
    .gs-group:last-child { margin-bottom: 0; }
    .gs-group-label {
      font-size: 9px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #003399;
      padding: 6px 10px 4px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .gs-group-count {
      font-size: 9px;
      font-weight: 700;
      color: #fff;
      background: #003399;
      padding: 0px 6px;
      border-radius: 6px;
      min-width: 16px;
      text-align: center;
    }

    /* ── Result item ── */
    .gs-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 10px;
      border-radius: 7px;
      cursor: pointer;
      transition: background 0.1s;
    }
    .gs-item:hover {
      background: #f5f5f5;
    }
    .gs-item-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .gs-item-dot.high { background: #FD1D1D; }
    .gs-item-dot.medium { background: #FFCC00; }
    .gs-item-dot.low { background: #2BDE73; }
    .gs-item-dot.health-good { background: #2BDE73; }
    .gs-item-dot.health-warn { background: #FFCC00; }
    .gs-item-dot.health-bad { background: #FD1D1D; }
    .gs-item-dot.metric { background: #003399; }
    .gs-item-info {
      flex: 1;
      min-width: 0;
    }
    .gs-item-title {
      font-size: 12px;
      font-weight: 600;
      color: #222;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .gs-item-sub {
      font-size: 10px;
      color: #888;
      margin-top: 1px;
    }
    .gs-item-badge {
      flex-shrink: 0;
      font-size: 10px;
      font-weight: 700;
      color: #666;
      font-family: 'JetBrains Mono', monospace;
    }

    /* ── No results ── */
    .gs-empty {
      padding: 24px 16px;
      text-align: center;
      color: #a2aaad;
      font-size: 12px;
      font-style: italic;
    }

    /* ── Keyboard hint ── */
    .gs-hint {
      padding: 6px 10px;
      font-size: 9px;
      color: #a2aaad;
      text-align: center;
      border-top: 1px solid #f0f0f0;
      margin-top: 4px;
    }
    .gs-hint kbd {
      display: inline-block;
      padding: 1px 5px;
      font-size: 9px;
      font-family: inherit;
      background: #f5f5f5;
      border: 1px solid #e5e5e5;
      border-radius: 3px;
    }
  `;
  document.head.appendChild(st);

  // ── Format money ──
  function formatMoney(val) {
    if (!val || val === 0) return '$0';
    if (val >= 1000000) return '$' + (val / 1000000).toFixed(1) + 'M';
    if (val >= 1000) return '$' + (val / 1000).toFixed(0) + 'K';
    return '$' + val;
  }

  // ── Build search index ──
  function buildIndex() {
    searchIndex = [];

    // Decisions
    var decisions = window._dcDecisions || [];
    decisions.forEach(function(d) {
      searchIndex.push({
        type: 'decision',
        id: d.id,
        title: d.title,
        sub: d.domain + ' · ' + (d.status || 'open').replace(/-/g, ' ') + ' · ' + (d.portal || '').toUpperCase(),
        priority: d.priority,
        searchText: (d.title + ' ' + d.summary + ' ' + d.domain + ' ' + (d.portal || '')).toLowerCase()
      });
    });

    // Accounts
    if (window._gsAccounts) {
      window._gsAccounts.forEach(function(a) {
        var healthClass = a.health >= 80 ? 'health-good' : a.health >= 60 ? 'health-warn' : 'health-bad';
        searchIndex.push({
          type: 'entity',
          id: a.id,
          title: a.name,
          sub: a.tier + ' · ' + a.segment + ' · Health: ' + a.health,
          dot: healthClass,
          badge: formatMoney(a.arr),
          searchText: (a.name + ' ' + a.tier + ' ' + a.segment).toLowerCase()
        });
      });
    }

    // Metrics (hardcoded common KPIs from portals)
    var metrics = [
      { title: 'Pipeline Coverage', sub: 'CRO · Revenue', value: '2.1×' },
      { title: 'Win Rate', sub: 'CRO · Revenue', value: '18%' },
      { title: 'Net Revenue Retention', sub: 'CRO · Revenue', value: '103%' },
      { title: 'MRR', sub: 'CFO · Financials', value: '$2.1M' },
      { title: 'Burn Rate', sub: 'CFO · Financials', value: '$420K/mo' },
      { title: 'Runway', sub: 'CFO · Financials', value: '17.4 months' },
      { title: 'Churn Rate', sub: 'CS · Customer', value: '1.7%' },
      { title: 'ARR', sub: 'CEO · Company', value: '$25.2M' },
      { title: 'NPS Score', sub: 'CS · Customer', value: '62' },
      { title: 'Customer Health Avg', sub: 'CS · Customer', value: '78' },
      { title: 'Sprint Velocity', sub: 'CTO · Engineering', value: '42 pts' },
      { title: 'CAC Payback', sub: 'CMO · Marketing', value: '14 months' },
      { title: 'Feature Adoption', sub: 'CPO · Product', value: '73%' },
      { title: 'At-Risk ARR', sub: 'CRO · Revenue', value: '$1.3M' },
      { title: 'Expansion Opportunity', sub: 'CRO · Revenue', value: '$483K' }
    ];
    metrics.forEach(function(m) {
      searchIndex.push({
        type: 'metric',
        title: m.title,
        sub: m.sub,
        dot: 'metric',
        badge: m.value,
        searchText: (m.title + ' ' + m.sub).toLowerCase()
      });
    });
  }

  // ── Search ──
  function search(query) {
    if (!searchIndex) buildIndex();
    if (!query || query.length < 2) return null;

    var q = query.toLowerCase().trim();
    var results = { decisions: [], metrics: [], entities: [] };

    searchIndex.forEach(function(item) {
      if (item.searchText.indexOf(q) === -1) return;
      if (item.type === 'decision') results.decisions.push(item);
      else if (item.type === 'metric') results.metrics.push(item);
      else if (item.type === 'entity') results.entities.push(item);
    });

    return results;
  }

  // ── Render results ──
  function renderResults(results) {
    if (!results) return '';

    var total = results.decisions.length + results.metrics.length + results.entities.length;
    if (total === 0) {
      return '<div class="gs-empty">No results found</div>';
    }

    var html = '';

    if (results.decisions.length > 0) {
      html += '<div class="gs-group">';
      html += '<div class="gs-group-label">Decisions <span class="gs-group-count">' + results.decisions.length + '</span></div>';
      results.decisions.forEach(function(r) {
        html += '<div class="gs-item" onclick="GSearch.open(\'' + r.id + '\',\'decision\')">';
        html += '<div class="gs-item-dot ' + r.priority + '"></div>';
        html += '<div class="gs-item-info"><div class="gs-item-title">' + r.title + '</div><div class="gs-item-sub">' + r.sub + '</div></div>';
        html += '</div>';
      });
      html += '</div>';
    }

    if (results.metrics.length > 0) {
      html += '<div class="gs-group">';
      html += '<div class="gs-group-label">Metrics <span class="gs-group-count">' + results.metrics.length + '</span></div>';
      results.metrics.forEach(function(r) {
        html += '<div class="gs-item">';
        html += '<div class="gs-item-dot metric"></div>';
        html += '<div class="gs-item-info"><div class="gs-item-title">' + r.title + '</div><div class="gs-item-sub">' + r.sub + '</div></div>';
        html += '<div class="gs-item-badge">' + r.badge + '</div>';
        html += '</div>';
      });
      html += '</div>';
    }

    if (results.entities.length > 0) {
      html += '<div class="gs-group">';
      html += '<div class="gs-group-label">Accounts <span class="gs-group-count">' + results.entities.length + '</span></div>';
      results.entities.forEach(function(r) {
        html += '<div class="gs-item">';
        html += '<div class="gs-item-dot ' + r.dot + '"></div>';
        html += '<div class="gs-item-info"><div class="gs-item-title">' + r.title + '</div><div class="gs-item-sub">' + r.sub + '</div></div>';
        html += '<div class="gs-item-badge">' + r.badge + '</div>';
        html += '</div>';
      });
      html += '</div>';
    }

    html += '<div class="gs-hint"><kbd>Esc</kbd> to close · <kbd>↑↓</kbd> to navigate</div>';
    return html;
  }

  // ── Build HTML ──
  function buildHTML() {
    var html = '<div class="gs-wrap" id="global-search">';
    html += '<button class="gs-trigger" onclick="GSearch.toggle()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></button>';
    html += '<div class="gs-box" id="gs-box">';
    html += '<div class="gs-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></div>';
    html += '<input class="gs-input" id="gs-input" type="text" placeholder="Search decisions, metrics, accounts..." oninput="GSearch.onInput(this.value)">';
    html += '<button class="gs-close" onclick="GSearch.close()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>';
    html += '</div>';
    html += '<div class="gs-results" id="gs-results"></div>';
    html += '</div>';
    return html;
  }

  // ── Inject ──
  function inject() {
    var hdrR = document.querySelector('.hdr-r');
    if (!hdrR) return;

    var wrapper = document.createElement('div');
    wrapper.innerHTML = buildHTML();
    var searchEl = wrapper.firstElementChild;

    // Insert before auth-area or as first child of .hdr-r
    var authArea = hdrR.querySelector('.auth-area');
    if (authArea) {
      hdrR.insertBefore(searchEl, authArea);
    } else {
      hdrR.insertBefore(searchEl, hdrR.firstChild);
    }
  }

  // ── Open / Close ──
  function openSearch() {
    isOpen = true;
    document.getElementById('gs-box').classList.add('open');
    document.getElementById('gs-trigger') && document.querySelector('.gs-trigger').style.display = 'none';
    var input = document.getElementById('gs-input');
    if (input) { input.focus(); input.value = ''; }
    document.getElementById('gs-results').classList.remove('open');
    document.getElementById('gs-results').innerHTML = '';
  }

  function closeSearch() {
    isOpen = false;
    var box = document.getElementById('gs-box');
    if (box) box.classList.remove('open');
    var trigger = document.querySelector('.gs-trigger');
    if (trigger) trigger.style.display = '';
    var results = document.getElementById('gs-results');
    if (results) { results.classList.remove('open'); results.innerHTML = ''; }
  }

  // ── Load accounts data ──
  function loadAccounts() {
    fetch('/api/data/accounts')
      .then(function(r) { return r.json(); })
      .then(function(data) {
        window._gsAccounts = data.accounts || [];
      })
      .catch(function() {});
  }

  // ── Public API ──
  window.GSearch = {
    toggle: function() {
      if (isOpen) closeSearch();
      else openSearch();
    },
    close: closeSearch,
    onInput: function(val) {
      var resultsEl = document.getElementById('gs-results');
      if (!resultsEl) return;
      if (!val || val.length < 2) {
        resultsEl.classList.remove('open');
        resultsEl.innerHTML = '';
        return;
      }
      var results = search(val);
      resultsEl.innerHTML = renderResults(results);
      resultsEl.classList.add('open');
    },
    open: function(id, type) {
      closeSearch();
      if (type === 'decision' && window.DDPanel && window._dcDecisions) {
        var decision = window._dcDecisions.filter(function(d) { return d.id === id; })[0];
        if (decision) DDPanel.open(decision);
      }
    }
  };

  // ── Click outside to close ──
  document.addEventListener('click', function(e) {
    if (!e.target.closest('#global-search') && isOpen) {
      closeSearch();
    }
  });

  // ── Keyboard shortcuts ──
  document.addEventListener('keydown', function(e) {
    // Cmd/Ctrl + K to open search
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (isOpen) closeSearch();
      else openSearch();
      return;
    }
    // Escape to close
    if (e.key === 'Escape' && isOpen) {
      closeSearch();
    }
  });

  // ── Init ──
  function init() {
    inject();
    loadAccounts();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
