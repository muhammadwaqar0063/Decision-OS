/* ═══════════════════════════════════════════
   Domain Tabs with Sub-Filters
   Unified tab system for decision filtering
   Injects above Decision Cards section
   ═══════════════════════════════════════════ */

(function() {
  // ── State ──
  var activeDomain = 'all';
  var activeSort = 'priority';
  var activeView = 'cards';
  var activeFilters = {}; // { portal: 'cro', status: 'open', ... }

  // ── Styles ──
  var st = document.createElement('style');
  st.textContent = `
    /* ── Domain Tabs Container ── */
    .dt-wrap {
      margin-bottom: 16px;
    }

    /* ── Tab Bar ── */
    .dt-tabs {
      display: flex;
      align-items: center;
      gap: 2px;
      padding: 0;
      margin-bottom: 10px;
      border-bottom: 2px solid #e5e5e5;
    }
    .dt-tab {
      padding: 8px 16px;
      font-size: 12px;
      font-weight: 600;
      color: #666;
      background: none;
      border: none;
      border-bottom: 2px solid transparent;
      margin-bottom: -2px;
      cursor: pointer;
      transition: all 0.15s;
      white-space: nowrap;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .dt-tab:hover {
      color: #003399;
    }
    .dt-tab.active {
      color: #003399;
      border-bottom-color: #FFCC00;
      font-weight: 700;
    }
    .dt-tab-count {
      font-size: 9px;
      font-weight: 700;
      background: #e5e5e5;
      color: #666;
      padding: 1px 6px;
      border-radius: 8px;
      min-width: 18px;
      text-align: center;
    }
    .dt-tab.active .dt-tab-count {
      background: #003399;
      color: #fff;
    }

    /* ── Controls Row ── */
    .dt-controls {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      flex-wrap: wrap;
    }

    /* ── Sub-Filters ── */
    .dt-filters {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
    }
    .dt-filter-chip {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px 10px;
      font-size: 11px;
      font-weight: 600;
      color: #666;
      background: #fff;
      border: 1px solid #e5e5e5;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.15s;
      position: relative;
    }
    .dt-filter-chip:hover {
      border-color: #003399;
      color: #003399;
    }
    .dt-filter-chip.active {
      background: #E0E8F5;
      border-color: #003399;
      color: #003399;
    }
    .dt-filter-chip svg {
      width: 10px;
      height: 10px;
      transition: transform 0.15s;
    }
    .dt-filter-chip.open svg {
      transform: rotate(180deg);
    }

    /* ── Filter Dropdown ── */
    .dt-filter-dd {
      display: none;
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      min-width: 160px;
      background: #fff;
      border: 1px solid #e5e5e5;
      border-radius: 8px;
      box-shadow: 0 6px 20px rgba(0,0,0,0.1);
      padding: 4px;
      z-index: 250;
    }
    .dt-filter-dd.show {
      display: block;
    }
    .dt-filter-opt {
      padding: 6px 10px;
      font-size: 11px;
      color: #444;
      border-radius: 5px;
      cursor: pointer;
      transition: background 0.1s;
    }
    .dt-filter-opt:hover {
      background: #f5f5f5;
    }
    .dt-filter-opt.selected {
      background: #E0E8F5;
      color: #003399;
      font-weight: 700;
    }

    /* ── Sort + View ── */
    .dt-right {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .dt-sort {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 11px;
      color: #666;
    }
    .dt-sort select {
      font-size: 11px;
      font-weight: 600;
      color: #003399;
      background: #fff;
      border: 1px solid #e5e5e5;
      border-radius: 5px;
      padding: 3px 6px;
      cursor: pointer;
      outline: none;
    }
    .dt-sort select:focus {
      border-color: #003399;
    }
    .dt-view-toggle {
      display: flex;
      border: 1px solid #e5e5e5;
      border-radius: 6px;
      overflow: hidden;
    }
    .dt-view-btn {
      padding: 4px 8px;
      background: #fff;
      border: none;
      cursor: pointer;
      color: #a2aaad;
      display: flex;
      align-items: center;
      transition: all 0.15s;
    }
    .dt-view-btn:not(:last-child) {
      border-right: 1px solid #e5e5e5;
    }
    .dt-view-btn svg {
      width: 14px;
      height: 14px;
    }
    .dt-view-btn:hover {
      color: #666;
      background: #fafafa;
    }
    .dt-view-btn.active {
      color: #003399;
      background: #E0E8F5;
    }

    /* ── Active Filters Bar ── */
    .dt-active-filters {
      display: none;
      align-items: center;
      gap: 6px;
      margin-top: 8px;
      flex-wrap: wrap;
    }
    .dt-active-filters.show {
      display: flex;
    }
    .dt-active-label {
      font-size: 10px;
      font-weight: 700;
      color: #a2aaad;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .dt-active-tag {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 2px 8px;
      font-size: 10px;
      font-weight: 600;
      color: #003399;
      background: #E0E8F5;
      border-radius: 4px;
    }
    .dt-active-tag .dt-remove {
      width: 12px;
      height: 12px;
      cursor: pointer;
      color: #003399;
      opacity: 0.6;
      transition: opacity 0.1s;
    }
    .dt-active-tag .dt-remove:hover {
      opacity: 1;
    }
    .dt-clear-all {
      font-size: 10px;
      font-weight: 600;
      color: #D11111;
      cursor: pointer;
      padding: 2px 6px;
      border-radius: 4px;
      transition: background 0.1s;
    }
    .dt-clear-all:hover {
      background: #FFECEC;
    }

    /* ── List View ── */
    .dc-section.list-view .dc {
      border-radius: 6px;
      margin-bottom: 4px;
    }
    .dc-section.list-view .dc-header {
      padding: 10px 14px;
    }
    .dc-section.list-view .dc-body {
      display: none;
    }
    .dc-section.list-view .dc-detail {
      display: none !important;
    }
    .dc-section.list-view .dc-actions {
      display: none;
    }
    .dc-section.list-view .dc.expanded .dc-body {
      display: block;
    }
  `;
  document.head.appendChild(st);

  // ── Helpers ──
  function getUniqueValues(decisions, key) {
    var vals = {};
    decisions.forEach(function(d) {
      if (d[key]) vals[d[key]] = (vals[d[key]] || 0) + 1;
    });
    return vals;
  }

  // ── Render ──
  function renderTabs(decisions) {
    var domains = getUniqueValues(decisions, 'domain');
    var domainList = Object.keys(domains).sort();

    var html = '<div class="dt-wrap">';

    // Tab bar
    html += '<div class="dt-tabs">';
    html += '<button class="dt-tab' + (activeDomain === 'all' ? ' active' : '') + '" onclick="DTabs.setDomain(\'all\')">All <span class="dt-tab-count">' + decisions.length + '</span></button>';
    domainList.forEach(function(d) {
      html += '<button class="dt-tab' + (activeDomain === d ? ' active' : '') + '" onclick="DTabs.setDomain(\'' + d + '\')">' + d + ' <span class="dt-tab-count">' + domains[d] + '</span></button>';
    });
    html += '</div>';

    // Controls row
    html += '<div class="dt-controls">';

    // Sub-filters
    html += '<div class="dt-filters">';

    // Portal filter
    var portals = getUniqueValues(decisions, 'portal');
    var portalList = Object.keys(portals).sort();
    if (portalList.length > 1) {
      html += '<div class="dt-filter-chip' + (activeFilters.portal ? ' active' : '') + '" onclick="DTabs.toggleFilter(\'portal\', this)">';
      html += activeFilters.portal ? ('Portal: ' + activeFilters.portal.toUpperCase()) : 'Portal';
      html += ' <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="6 9 12 15 18 9"/></svg>';
      html += '<div class="dt-filter-dd">';
      html += '<div class="dt-filter-opt' + (!activeFilters.portal ? ' selected' : '') + '" onclick="event.stopPropagation();DTabs.setFilter(\'portal\',null)">All Portals</div>';
      portalList.forEach(function(p) {
        html += '<div class="dt-filter-opt' + (activeFilters.portal === p ? ' selected' : '') + '" onclick="event.stopPropagation();DTabs.setFilter(\'portal\',\'' + p + '\')">' + p.toUpperCase() + ' (' + portals[p] + ')</div>';
      });
      html += '</div></div>';
    }

    // Status filter
    var statuses = getUniqueValues(decisions, 'status');
    var statusList = Object.keys(statuses).sort();
    html += '<div class="dt-filter-chip' + (activeFilters.status ? ' active' : '') + '" onclick="DTabs.toggleFilter(\'status\', this)">';
    html += activeFilters.status ? ('Status: ' + activeFilters.status) : 'Status';
    html += ' <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="6 9 12 15 18 9"/></svg>';
    html += '<div class="dt-filter-dd">';
    html += '<div class="dt-filter-opt' + (!activeFilters.status ? ' selected' : '') + '" onclick="event.stopPropagation();DTabs.setFilter(\'status\',null)">All Statuses</div>';
    statusList.forEach(function(s) {
      html += '<div class="dt-filter-opt' + (activeFilters.status === s ? ' selected' : '') + '" onclick="event.stopPropagation();DTabs.setFilter(\'status\',\'' + s + '\')">' + s.replace(/-/g,' ') + ' (' + statuses[s] + ')</div>';
    });
    html += '</div></div>';

    // Priority filter
    var priorities = getUniqueValues(decisions, 'priority');
    var priorityList = Object.keys(priorities).sort();
    html += '<div class="dt-filter-chip' + (activeFilters.priority ? ' active' : '') + '" onclick="DTabs.toggleFilter(\'priority\', this)">';
    html += activeFilters.priority ? ('Priority: ' + activeFilters.priority) : 'Priority';
    html += ' <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="6 9 12 15 18 9"/></svg>';
    html += '<div class="dt-filter-dd">';
    html += '<div class="dt-filter-opt' + (!activeFilters.priority ? ' selected' : '') + '" onclick="event.stopPropagation();DTabs.setFilter(\'priority\',null)">All Priorities</div>';
    priorityList.forEach(function(p) {
      html += '<div class="dt-filter-opt' + (activeFilters.priority === p ? ' selected' : '') + '" onclick="event.stopPropagation();DTabs.setFilter(\'priority\',\'' + p + '\')">' + p.charAt(0).toUpperCase() + p.slice(1) + ' (' + priorities[p] + ')</div>';
    });
    html += '</div></div>';

    html += '</div>'; // end filters

    // Sort + View
    html += '<div class="dt-right">';
    html += '<div class="dt-sort">Sort: <select onchange="DTabs.setSort(this.value)">';
    html += '<option value="priority"' + (activeSort === 'priority' ? ' selected' : '') + '>Priority</option>';
    html += '<option value="impact"' + (activeSort === 'impact' ? ' selected' : '') + '>Impact</option>';
    html += '<option value="recency"' + (activeSort === 'recency' ? ' selected' : '') + '>Recency</option>';
    html += '</select></div>';
    html += '<div class="dt-view-toggle">';
    html += '<button class="dt-view-btn' + (activeView === 'cards' ? ' active' : '') + '" onclick="DTabs.setView(\'cards\')" title="Card View"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg></button>';
    html += '<button class="dt-view-btn' + (activeView === 'list' ? ' active' : '') + '" onclick="DTabs.setView(\'list\')" title="List View"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg></button>';
    html += '</div>';
    html += '</div>';

    html += '</div>'; // end controls

    // Active filters display
    var hasFilters = activeFilters.portal || activeFilters.status || activeFilters.priority;
    html += '<div class="dt-active-filters' + (hasFilters ? ' show' : '') + '">';
    html += '<span class="dt-active-label">Filters:</span>';
    if (activeFilters.portal) html += '<span class="dt-active-tag">Portal: ' + activeFilters.portal.toUpperCase() + ' <svg class="dt-remove" onclick="DTabs.setFilter(\'portal\',null)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></span>';
    if (activeFilters.status) html += '<span class="dt-active-tag">Status: ' + activeFilters.status + ' <svg class="dt-remove" onclick="DTabs.setFilter(\'status\',null)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></span>';
    if (activeFilters.priority) html += '<span class="dt-active-tag">Priority: ' + activeFilters.priority + ' <svg class="dt-remove" onclick="DTabs.setFilter(\'priority\',null)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></span>';
    if (hasFilters) html += '<span class="dt-clear-all" onclick="DTabs.clearFilters()">Clear all</span>';
    html += '</div>';

    html += '</div>'; // end wrap
    return html;
  }

  // ── Apply filters + sort to decisions ──
  function filterAndSort(decisions) {
    var filtered = decisions.filter(function(d) {
      if (activeDomain !== 'all' && d.domain !== activeDomain) return false;
      if (activeFilters.portal && d.portal !== activeFilters.portal) return false;
      if (activeFilters.status && d.status !== activeFilters.status) return false;
      if (activeFilters.priority && d.priority !== activeFilters.priority) return false;
      return true;
    });

    // Sort
    filtered.sort(function(a, b) {
      if (activeSort === 'priority') {
        var po = { high: 0, medium: 1, low: 2 };
        var pa = po[a.priority] || 3, pb = po[b.priority] || 3;
        if (pa !== pb) return pa - pb;
        return (a.status === 'completed' ? 1 : 0) - (b.status === 'completed' ? 1 : 0);
      }
      if (activeSort === 'impact') {
        return (b.dollarImpact || 0) - (a.dollarImpact || 0);
      }
      if (activeSort === 'recency') {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      }
      return 0;
    });

    return filtered;
  }

  // ── Inject tabs ──
  function injectTabs(html) {
    var existing = document.querySelector('.dt-wrap');
    if (existing) {
      existing.outerHTML = html;
      return;
    }

    var wrapper = document.createElement('div');
    wrapper.innerHTML = html;

    // Insert before .dc-section
    var dcSection = document.querySelector('.dc-section');
    if (dcSection) {
      dcSection.parentNode.insertBefore(wrapper.firstElementChild, dcSection);
    }
  }

  // ── Re-render Decision Cards with filtered data ──
  function reRenderCards(decisions) {
    var filtered = filterAndSort(decisions);
    var dcSection = document.querySelector('.dc-section');
    if (!dcSection) return;

    // Update count badge
    var countEl = dcSection.querySelector('.dc-section-count');
    if (countEl) countEl.textContent = filtered.length;

    // Update view class
    dcSection.classList.toggle('list-view', activeView === 'list');

    // Re-render cards
    var cardsHtml = '';
    if (filtered.length === 0) {
      cardsHtml = '<div class="dc-empty">No decisions match current filters</div>';
    } else {
      filtered.forEach(function(d) {
        cardsHtml += renderSingleCard(d);
      });
    }

    // Remove old cards, keep header
    var header = dcSection.querySelector('.dc-section-head');
    dcSection.innerHTML = '';
    if (header) dcSection.appendChild(header);
    var temp = document.createElement('div');
    temp.innerHTML = cardsHtml;
    while (temp.firstChild) {
      dcSection.appendChild(temp.firstChild);
    }
  }

  // ── Render a single card (duplicate from decision-cards.js for filtering) ──
  function renderSingleCard(d) {
    function formatMoney(val) {
      if (!val || val === 0) return '';
      if (val >= 1000000) return '$' + (val / 1000000).toFixed(1) + 'M';
      if (val >= 1000) return '$' + (val / 1000).toFixed(0) + 'K';
      return '$' + val;
    }
    function priorityIcon(p) {
      if (p === 'high') return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>';
      if (p === 'medium') return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>';
      return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
    }

    var impact = formatMoney(d.dollarImpact);
    var statusLabel = (d.status || 'open').replace(/-/g, ' ');
    var owner = d.owner ? d.owner.split('@')[0] : 'Unassigned';

    var html = '<div class="dc" data-id="' + d.id + '">';
    html += '<div class="dc-header" onclick="DCCards.toggle(\'' + d.id + '\')">';
    html += '<div class="dc-priority ' + d.priority + '">' + priorityIcon(d.priority) + ' ' + d.priority + '</div>';
    html += '<div class="dc-title">' + d.title + '</div>';
    html += '<div class="dc-status ' + (d.status || 'open') + '">' + statusLabel + '</div>';
    html += '<svg class="dc-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>';
    html += '</div>';
    html += '<div class="dc-body">';
    html += '<div class="dc-summary">' + d.summary + '</div>';
    html += '<div class="dc-meta">';
    html += '<div class="dc-meta-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> <strong>' + owner + '</strong></div>';
    html += '<div class="dc-meta-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> ' + d.domain + '</div>';
    if (impact) html += '<div class="dc-impact">' + impact + '</div>';
    html += '</div></div>';
    html += '<div class="dc-detail">';
    html += '<div class="dc-detail-section"><div class="dc-detail-label">Why This Matters</div><div class="dc-detail-text">' + d.summary + '</div></div>';
    html += '<div class="dc-detail-section"><div class="dc-detail-label">Portal</div><div class="dc-detail-text">' + (d.portal || 'general').toUpperCase() + '</div></div>';
    html += '<div class="dc-detail-section"><div class="dc-detail-label">Timeline</div><div class="dc-detail-text">Created: ' + new Date(d.createdAt).toLocaleDateString('en-US', {month:'short',day:'numeric',year:'numeric'}) + ' · Updated: ' + new Date(d.updatedAt).toLocaleDateString('en-US', {month:'short',day:'numeric',year:'numeric'}) + '</div></div>';
    html += '</div>';
    html += '<div class="dc-actions">';
    html += '<button class="dc-btn primary" onclick="DCCards.action(\'assign\',\'' + d.id + '\')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> Assign</button>';
    html += '<button class="dc-btn" onclick="DCCards.action(\'progress\',\'' + d.id + '\')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/></svg> In Progress</button>';
    html += '<button class="dc-btn" onclick="DCCards.action(\'note\',\'' + d.id + '\')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> Note</button>';
    html += '</div>';
    html += '</div>';
    return html;
  }

  // ── Full refresh ──
  function refresh() {
    var decisions = window._dcDecisions || [];
    // Apply portal filter (CEO sees all)
    var portal = (location.pathname.split('/').pop().replace(/\.html$/, '') || 'ceo');
    var portalDecisions = decisions.filter(function(d) {
      if (portal === 'ceo' || portal === 'admin') return true;
      return d.portal === portal || !d.portal;
    });

    injectTabs(renderTabs(portalDecisions));
    reRenderCards(portalDecisions);
  }

  // ── Close all dropdowns ──
  function closeDropdowns() {
    document.querySelectorAll('.dt-filter-dd.show').forEach(function(dd) {
      dd.classList.remove('show');
      dd.parentElement.classList.remove('open');
    });
  }

  document.addEventListener('click', function(e) {
    if (!e.target.closest('.dt-filter-chip')) closeDropdowns();
  });

  // ── Public API ──
  window.DTabs = {
    setDomain: function(domain) {
      activeDomain = domain;
      refresh();
    },
    setSort: function(sort) {
      activeSort = sort;
      refresh();
    },
    setView: function(view) {
      activeView = view;
      refresh();
    },
    toggleFilter: function(key, chipEl) {
      var dd = chipEl.querySelector('.dt-filter-dd');
      if (!dd) return;
      var isOpen = dd.classList.contains('show');
      closeDropdowns();
      if (!isOpen) {
        dd.classList.add('show');
        chipEl.classList.add('open');
      }
    },
    setFilter: function(key, value) {
      closeDropdowns();
      if (value) {
        activeFilters[key] = value;
      } else {
        delete activeFilters[key];
      }
      refresh();
    },
    clearFilters: function() {
      activeFilters = {};
      refresh();
    },
    refresh: refresh
  };

  // ── Init: wait for decisions data ──
  function init() {
    if (window._dcDecisions) {
      refresh();
    } else {
      setTimeout(init, 200);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { setTimeout(init, 500); });
  } else {
    setTimeout(init, 500);
  }
})();
