/* ═══════════════════════════════════════════
   Drill-Down Side Panel
   Right-sliding panel for decision details
   Opens when a Decision Card is clicked
   ═══════════════════════════════════════════ */

(function() {
  // ── Styles ──
  var st = document.createElement('style');
  st.textContent = `
    /* ── Overlay backdrop ── */
    .dd-backdrop {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.15);
      z-index: 299;
      opacity: 0;
      transition: opacity 0.25s;
    }
    .dd-backdrop.show {
      display: block;
      opacity: 1;
    }

    /* ── Panel ── */
    .dd-panel {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      width: 380px;
      max-width: 90vw;
      background: #fff;
      z-index: 300;
      transform: translateX(100%);
      transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
      display: flex;
      flex-direction: column;
      box-shadow: -8px 0 32px rgba(0,0,0,0.12);
    }
    .dd-panel.open {
      transform: translateX(0);
    }

    /* ── Panel Header ── */
    .dd-header {
      flex-shrink: 0;
      padding: 20px 20px 16px;
      border-bottom: 1px solid #e5e5e5;
      position: relative;
    }
    .dd-header-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
    }
    .dd-close {
      width: 28px;
      height: 28px;
      border: 1px solid #e5e5e5;
      border-radius: 6px;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #666;
      transition: all 0.15s;
    }
    .dd-close:hover {
      background: #FFECEC;
      border-color: #FD1D1D;
      color: #D11111;
    }
    .dd-close svg {
      width: 14px;
      height: 14px;
    }
    .dd-priority-badge {
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 3px 10px;
      border-radius: 6px;
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .dd-priority-badge.high { background: #FD1D1D; color: #fff; }
    .dd-priority-badge.medium { background: #FFCC00; color: #222; }
    .dd-priority-badge.low { background: #2BDE73; color: #fff; }

    .dd-title {
      font-size: 15px;
      font-weight: 800;
      color: #222;
      line-height: 1.35;
      letter-spacing: -0.01em;
    }
    .dd-header-meta {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-top: 8px;
    }
    .dd-meta-chip {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 11px;
      color: #666;
    }
    .dd-meta-chip strong { color: #222; font-weight: 700; }
    .dd-meta-chip svg { width: 12px; height: 12px; color: #a2aaad; }
    .dd-impact-badge {
      font-size: 12px;
      font-weight: 800;
      font-family: 'JetBrains Mono', monospace;
      color: #D11111;
    }

    /* ── Panel Body ── */
    .dd-body {
      flex: 1;
      overflow-y: auto;
      padding: 0;
    }
    .dd-body::-webkit-scrollbar { width: 5px; }
    .dd-body::-webkit-scrollbar-thumb { background: #e5e5e5; border-radius: 3px; }

    /* ── Sections ── */
    .dd-section {
      padding: 16px 20px;
      border-bottom: 1px solid #f0f0f0;
    }
    .dd-section:last-child { border-bottom: none; }
    .dd-section-label {
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #003399;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .dd-section-label svg { width: 12px; height: 12px; color: #FFCC00; }
    .dd-section-text {
      font-size: 12px;
      color: #444;
      line-height: 1.55;
    }

    /* ── Root Cause bullets ── */
    .dd-cause-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .dd-cause-list li {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      padding: 5px 0;
      font-size: 12px;
      color: #444;
      line-height: 1.45;
    }
    .dd-cause-list li::before {
      content: '';
      flex-shrink: 0;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #FD1D1D;
      margin-top: 5px;
    }
    .dd-cause-list li.medium::before { background: #FFCC00; }
    .dd-cause-list li.info::before { background: #003399; }

    /* ── Metrics Grid ── */
    .dd-metrics {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }
    .dd-metric {
      background: #fafaf8;
      border: 1px solid #e5e5e5;
      border-radius: 8px;
      padding: 10px 12px;
    }
    .dd-metric-label {
      font-size: 9px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #a2aaad;
      margin-bottom: 2px;
    }
    .dd-metric-value {
      font-size: 16px;
      font-weight: 800;
      color: #222;
      font-family: 'JetBrains Mono', monospace;
    }
    .dd-metric-value.red { color: #D11111; }
    .dd-metric-value.green { color: #1A9E52; }
    .dd-metric-value.blue { color: #003399; }

    /* ── Action Steps ── */
    .dd-steps {
      list-style: none;
      padding: 0;
      margin: 0;
      counter-reset: step;
    }
    .dd-steps li {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 6px 0;
      font-size: 12px;
      color: #444;
      line-height: 1.45;
    }
    .dd-steps li::before {
      counter-increment: step;
      content: counter(step);
      flex-shrink: 0;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #003399;
      color: #fff;
      font-size: 10px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 1px;
    }

    /* ── Execution Tracking ── */
    .dd-track-row {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 4px 0;
      font-size: 12px;
      color: #444;
    }
    .dd-track-label {
      font-weight: 700;
      color: #666;
      min-width: 60px;
    }

    /* ── Panel Footer ── */
    .dd-footer {
      flex-shrink: 0;
      padding: 14px 20px;
      border-top: 1px solid #e5e5e5;
      display: flex;
      gap: 8px;
      background: #fafaf8;
    }
    .dd-btn {
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 7px 14px;
      border: 1px solid #e5e5e5;
      border-radius: 7px;
      background: #fff;
      font-size: 11px;
      font-weight: 700;
      color: #444;
      cursor: pointer;
      transition: all 0.15s;
    }
    .dd-btn:hover {
      border-color: #003399;
      color: #003399;
      background: #E0E8F5;
    }
    .dd-btn svg { width: 13px; height: 13px; }
    .dd-btn.primary {
      background: #003399;
      color: #fff;
      border-color: #003399;
    }
    .dd-btn.primary:hover {
      background: #002266;
    }

    /* ── Empty state ── */
    .dd-empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      color: #a2aaad;
      font-size: 13px;
      gap: 8px;
    }
    .dd-empty svg { width: 32px; height: 32px; opacity: 0.3; }
  `;
  document.head.appendChild(st);

  // ── Create DOM elements ──
  var backdrop = document.createElement('div');
  backdrop.className = 'dd-backdrop';
  backdrop.onclick = function() { DDPanel.close(); };
  document.body.appendChild(backdrop);

  var panel = document.createElement('div');
  panel.className = 'dd-panel';
  panel.innerHTML = '<div class="dd-empty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/></svg> Select a decision to view details</div>';
  document.body.appendChild(panel);

  // ── Helpers ──
  function formatMoney(val) {
    if (!val || val === 0) return '$0';
    if (val >= 1000000) return '$' + (val / 1000000).toFixed(1) + 'M';
    if (val >= 1000) return '$' + (val / 1000).toFixed(0) + 'K';
    return '$' + val;
  }

  function formatDate(iso) {
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  function priorityIcon() {
    return '<svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>';
  }

  // ── Generate root causes from decision data ──
  function getRootCauses(d) {
    var causes = [];
    var id = d.id;
    if (id === 'd001') {
      causes = [
        { text: 'Stage 2 close rate is 34%, not the 60% reps report', type: '' },
        { text: '14 deals stuck in Stage 2 for more than 30 days', type: '' },
        { text: 'Average Stage 3 duration is 72 days — 2× industry benchmark', type: 'medium' },
        { text: 'Pipeline generation on track but quality is declining', type: 'info' }
      ];
    } else if (id === 'd002') {
      causes = [
        { text: 'Runway dropped to 17.4 months after Q1 overspend', type: '' },
        { text: 'CFO hiring gate requires 18-month minimum runway', type: 'medium' },
        { text: '3 AE hires on hold — pipeline coverage will drop further', type: '' },
        { text: 'Bridge funding not yet discussed with investors', type: 'info' }
      ];
    } else if (id === 'd003') {
      causes = [
        { text: 'Health score intervention playbook is working', type: 'info' },
        { text: '3 at-risk accounts saved in March ($210K ARR preserved)', type: 'info' },
        { text: 'Monthly churn dropped from 3.8% to 1.7%', type: 'medium' },
        { text: 'NRR improved to 108% — expansion outpacing churn', type: 'info' }
      ];
    } else if (id === 'd004') {
      causes = [
        { text: 'ACME Corp ($180K ARR) requires SOC2 Type II before signing', type: '' },
        { text: 'Security audit scheduled for April 15', type: 'medium' },
        { text: '60% of enterprise deals need security clearance', type: 'info' },
        { text: 'Losing this deal sets a precedent for future enterprise sales', type: '' }
      ];
    } else if (id === 'd005') {
      causes = [
        { text: 'Feature X has only 7% adoption after 6 months', type: '' },
        { text: 'Engineering cost: $50K/quarter to maintain', type: '' },
        { text: 'Mobile app has 3× the demand but no resources', type: 'medium' },
        { text: 'Sunset would free up 2 engineers for higher-impact work', type: 'info' }
      ];
    } else {
      causes = [
        { text: d.summary, type: 'info' }
      ];
    }
    return causes;
  }

  // ── Generate recommended actions ──
  function getActions(d) {
    var actions = [];
    var id = d.id;
    if (id === 'd001') {
      actions = [
        'Audit all 14 stuck deals — identify true blockers vs. ghost deals',
        'Recalculate Stage 2 close rate using 90-day trailing data',
        'Adjust Q2 forecast to realistic $3.8M (not $4.2M)',
        'Schedule pipeline review with each AE by Friday'
      ];
    } else if (id === 'd002') {
      actions = [
        'Schedule CFO + CEO meeting to discuss bridge funding options',
        'Model 3 scenarios: raise bridge, cut spend, delay hires 1 quarter',
        'Present hiring gate data to board with revenue impact analysis',
        'Identify minimum viable hire — which 1 of 3 AEs is most critical?'
      ];
    } else if (id === 'd003') {
      actions = [
        'Document playbook steps that saved the 3 accounts',
        'Roll out health score playbook to remaining at-risk accounts',
        'Set NRR target of 110% for Q2',
        'Share results with CRO for expansion revenue planning'
      ];
    } else if (id === 'd004') {
      actions = [
        'Confirm SOC2 audit timeline with security team',
        'Prepare interim security documentation for ACME',
        'Model deal loss impact: $180K ARR + enterprise precedent',
        'Negotiate ACME — partial payment on signing, rest post-SOC2'
      ];
    } else if (id === 'd005') {
      actions = [
        'Run 2-week user survey on Feature X — confirm low demand',
        'Model sunset cost: migration path, customer communication',
        'Reassign 2 engineers to mobile app sprint',
        'Set kill decision deadline: end of Q2'
      ];
    } else {
      actions = [
        'Review decision details with assigned owner',
        'Define success metrics and timeline',
        'Schedule follow-up review in 2 weeks'
      ];
    }
    return actions;
  }

  // ── Generate metrics ──
  function getMetrics(d) {
    var id = d.id;
    if (id === 'd001') return [
      { label: 'Coverage', value: '2.1×', cls: 'blue' },
      { label: 'Win Rate', value: '18%', cls: 'red' },
      { label: 'Stuck Deals', value: '32', cls: 'red' },
      { label: 'Gap', value: '$1.6M', cls: 'red' }
    ];
    if (id === 'd002') return [
      { label: 'Runway', value: '17.4mo', cls: 'red' },
      { label: 'Gate Req', value: '18mo', cls: 'blue' },
      { label: 'Burn Rate', value: '$420K', cls: '' },
      { label: 'AEs Blocked', value: '3', cls: 'red' }
    ];
    if (id === 'd003') return [
      { label: 'Churn Rate', value: '1.7%', cls: 'green' },
      { label: 'NRR', value: '108%', cls: 'green' },
      { label: 'Saved', value: '3 accts', cls: 'green' },
      { label: 'ARR Saved', value: '$210K', cls: 'green' }
    ];
    if (id === 'd004') return [
      { label: 'Deal Value', value: '$180K', cls: 'blue' },
      { label: 'SOC2 Due', value: 'Apr 15', cls: '' },
      { label: 'Risk', value: 'High', cls: 'red' },
      { label: 'Days Left', value: '6', cls: 'red' }
    ];
    if (id === 'd005') return [
      { label: 'Adoption', value: '7%', cls: 'red' },
      { label: 'Cost/Qtr', value: '$50K', cls: 'red' },
      { label: 'Age', value: '6mo', cls: '' },
      { label: 'Impact', value: '$250K', cls: 'blue' }
    ];
    return [
      { label: 'Impact', value: formatMoney(d.dollarImpact), cls: 'blue' },
      { label: 'Priority', value: d.priority, cls: '' },
      { label: 'Status', value: d.status, cls: '' },
      { label: 'Domain', value: d.domain, cls: '' }
    ];
  }

  // ── Render panel content ──
  function renderPanel(d) {
    var impact = formatMoney(d.dollarImpact);
    var statusLabel = (d.status || 'open').replace(/-/g, ' ');
    var owner = d.owner ? d.owner.split('@')[0] : 'Unassigned';
    var causes = getRootCauses(d);
    var actions = getActions(d);
    var metrics = getMetrics(d);

    var html = '';

    // Header
    html += '<div class="dd-header">';
    html += '<div class="dd-header-top">';
    html += '<div class="dd-priority-badge ' + d.priority + '">' + priorityIcon() + ' ' + d.priority + '</div>';
    html += '<div class="dd-close" onclick="DDPanel.close()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></div>';
    html += '</div>';
    html += '<div class="dd-title">' + d.title + '</div>';
    html += '<div class="dd-header-meta">';
    html += '<div class="dd-meta-chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> <strong>' + owner + '</strong></div>';
    html += '<div class="dd-meta-chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> ' + d.domain + '</div>';
    if (impact !== '$0') {
      html += '<div class="dd-impact-badge">' + impact + '</div>';
    }
    html += '</div>';
    html += '</div>';

    // Body
    html += '<div class="dd-body">';

    // Section 1: Decision Summary
    html += '<div class="dd-section">';
    html += '<div class="dd-section-label"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg> Decision Summary</div>';
    html += '<div class="dd-section-text">' + d.summary + '</div>';
    html += '</div>';

    // Section 2: Root Cause Analysis
    html += '<div class="dd-section">';
    html += '<div class="dd-section-label"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> Root Cause Analysis</div>';
    html += '<ul class="dd-cause-list">';
    causes.forEach(function(c) {
      html += '<li class="' + (c.type || '') + '">' + c.text + '</li>';
    });
    html += '</ul>';
    html += '</div>';

    // Section 3: Data Insights (Metrics)
    html += '<div class="dd-section">';
    html += '<div class="dd-section-label"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg> Data Insights</div>';
    html += '<div class="dd-metrics">';
    metrics.forEach(function(m) {
      html += '<div class="dd-metric"><div class="dd-metric-label">' + m.label + '</div><div class="dd-metric-value ' + m.cls + '">' + m.value + '</div></div>';
    });
    html += '</div>';
    html += '</div>';

    // Section 4: Recommended Actions
    html += '<div class="dd-section">';
    html += '<div class="dd-section-label"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> Recommended Actions</div>';
    html += '<ol class="dd-steps">';
    actions.forEach(function(a) {
      html += '<li>' + a + '</li>';
    });
    html += '</ol>';
    html += '</div>';

    // Section 5: Execution Tracking
    html += '<div class="dd-section">';
    html += '<div class="dd-section-label"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg> Execution Tracking</div>';
    html += '<div class="dd-track-row"><span class="dd-track-label">Owner</span> ' + owner + '</div>';
    html += '<div class="dd-track-row"><span class="dd-track-label">Status</span> <span class="dc-status ' + (d.status || 'open') + '">' + statusLabel + '</span></div>';
    html += '<div class="dd-track-row"><span class="dd-track-label">Created</span> ' + formatDate(d.createdAt) + '</div>';
    html += '<div class="dd-track-row"><span class="dd-track-label">Updated</span> ' + formatDate(d.updatedAt) + '</div>';
    html += '</div>';

    html += '</div>'; // end body

    // Footer
    html += '<div class="dd-footer">';
    html += '<button class="dd-btn primary" onclick="DDPanel.close()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> Assign Owner</button>';
    html += '<button class="dd-btn" onclick="DDPanel.close()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/></svg> Mark In Progress</button>';
    html += '<button class="dd-btn" onclick="DDPanel.close()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> Add Note</button>';
    html += '</div>';

    return html;
  }

  // ── Public API ──
  window.DDPanel = {
    open: function(decisionData) {
      panel.innerHTML = renderPanel(decisionData);
      panel.classList.add('open');
      backdrop.classList.add('show');

      // Highlight matching strip card
      document.querySelectorAll('.pstrip-card').forEach(function(c) {
        c.style.borderColor = c.dataset.id === decisionData.id ? '#003399' : '#e5e5e5';
        c.style.boxShadow = c.dataset.id === decisionData.id ? '0 0 0 1px #003399' : 'none';
      });

      // Highlight matching decision card
      document.querySelectorAll('.dc').forEach(function(c) {
        if (c.dataset.id === decisionData.id) {
          c.classList.add('expanded');
        } else {
          c.classList.remove('expanded');
        }
      });
    },
    close: function() {
      panel.classList.remove('open');
      backdrop.classList.remove('show');
      // Clear all highlights
      document.querySelectorAll('.pstrip-card').forEach(function(c) {
        c.style.borderColor = '#e5e5e5';
        c.style.boxShadow = 'none';
      });
      document.querySelectorAll('.dc.expanded').forEach(function(c) {
        c.classList.remove('expanded');
      });
    }
  };

  // ── Keyboard: Escape to close ──
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && panel.classList.contains('open')) {
      DDPanel.close();
    }
  });
})();
