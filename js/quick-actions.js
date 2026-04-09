/* ═══════════════════════════════════════════
   Quick Actions Menu (+)
   Dropdown with Create Decision, Assign Task,
   Add Note, Upload Data
   ═══════════════════════════════════════════ */

(function() {
  // ── State ──
  var isOpen = false;
  var modalOpen = false;

  // ── Styles ──
  var st = document.createElement('style');
  st.textContent = `
    .qa-wrap {
      position: relative;
      display: flex;
      align-items: center;
    }

    /* ── Plus trigger ── */
    .qa-trigger {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #e5e5e5;
      border-radius: 8px;
      background: #fff;
      cursor: pointer;
      color: #003399;
      transition: all 0.15s;
    }
    .qa-trigger:hover {
      background: #003399;
      border-color: #003399;
      box-shadow: 0 2px 8px rgba(0,51,153,0.25);
    }
    .qa-trigger:hover svg { stroke: #fff; }
    .qa-trigger svg { width: 17px; height: 17px; }

    /* ── Dropdown ── */
    .qa-dd {
      display: none;
      position: absolute;
      top: calc(100% + 8px);
      right: 0;
      width: 220px;
      background: #fff;
      border: 1px solid #e5e5e5;
      border-radius: 10px;
      box-shadow: 0 10px 32px rgba(0,0,0,0.13);
      padding: 4px;
      z-index: 9999;
    }
    .qa-dd.open { display: block; }

    /* ── Menu item ── */
    .qa-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 12px;
      border-radius: 7px;
      cursor: pointer;
      transition: background 0.1s;
      border: none;
      background: none;
      width: 100%;
      text-align: left;
      font-family: 'Inter', sans-serif;
    }
    .qa-item:hover { background: #f5f5f5; }
    .qa-item-icon {
      width: 30px;
      height: 30px;
      border-radius: 7px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .qa-item-icon svg { width: 15px; height: 15px; }
    .qa-item-icon.blue { background: #E0E8F5; color: #003399; }
    .qa-item-icon.green { background: #E3FBED; color: #16A34A; }
    .qa-item-icon.purple { background: #EDE9FE; color: #7C3AED; }
    .qa-item-icon.amber { background: #FEF3C7; color: #D97706; }
    .qa-item-text {
      flex: 1;
    }
    .qa-item-label {
      font-size: 12px;
      font-weight: 600;
      color: #222;
    }
    .qa-item-sub {
      font-size: 10px;
      color: #a2aaad;
      margin-top: 1px;
    }
    .qa-item-badge {
      font-size: 9px;
      font-weight: 600;
      color: #a2aaad;
      background: #f5f5f5;
      padding: 2px 6px;
      border-radius: 4px;
    }

    /* ── Modal overlay ── */
    .qa-modal-bg {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.3);
      backdrop-filter: blur(4px);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .qa-modal {
      background: #fff;
      border-radius: 16px;
      padding: 28px;
      width: 440px;
      max-width: 92vw;
      box-shadow: 0 20px 60px rgba(0,0,0,0.18);
    }
    .qa-modal-head {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 20px;
    }
    .qa-modal-icon {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      background: #E0E8F5;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #003399;
    }
    .qa-modal-icon svg { width: 18px; height: 18px; }
    .qa-modal-title {
      font-size: 16px;
      font-weight: 700;
      color: #222;
    }
    .qa-modal-desc {
      font-size: 11px;
      color: #7a7770;
    }
    .qa-modal-close {
      margin-left: auto;
      width: 28px;
      height: 28px;
      border: none;
      background: none;
      cursor: pointer;
      color: #a2aaad;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.1s;
    }
    .qa-modal-close:hover { background: #f5f5f5; color: #222; }

    /* ── Form fields ── */
    .qa-field {
      margin-bottom: 14px;
    }
    .qa-label {
      display: block;
      font-size: 11px;
      font-weight: 600;
      color: #555;
      margin-bottom: 5px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .qa-input, .qa-select, .qa-textarea {
      width: 100%;
      padding: 9px 12px;
      border: 1px solid #e5e5e5;
      border-radius: 8px;
      font-size: 13px;
      font-family: 'Inter', sans-serif;
      color: #222;
      background: #fff;
      transition: border-color 0.15s;
      box-sizing: border-box;
    }
    .qa-input:focus, .qa-select:focus, .qa-textarea:focus {
      outline: none;
      border-color: #003399;
      box-shadow: 0 0 0 3px rgba(0,51,153,0.08);
    }
    .qa-textarea {
      resize: vertical;
      min-height: 60px;
    }
    .qa-row {
      display: flex;
      gap: 10px;
    }
    .qa-row .qa-field { flex: 1; }

    /* ── Modal actions ── */
    .qa-modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 20px;
    }
    .qa-btn {
      padding: 9px 18px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 600;
      font-family: 'Inter', sans-serif;
      cursor: pointer;
      transition: all 0.15s;
      border: 1px solid #e5e5e5;
      background: #fff;
      color: #555;
    }
    .qa-btn:hover { background: #f5f5f5; }
    .qa-btn-primary {
      background: #003399;
      color: #fff;
      border-color: #003399;
    }
    .qa-btn-primary:hover {
      background: #002a7a;
      box-shadow: 0 2px 8px rgba(0,51,153,0.3);
    }
    .qa-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* ── Coming soon ── */
    .qa-soon {
      padding: 32px 20px;
      text-align: center;
    }
    .qa-soon-icon {
      font-size: 32px;
      margin-bottom: 10px;
    }
    .qa-soon-text {
      font-size: 13px;
      font-weight: 600;
      color: #222;
      margin-bottom: 4px;
    }
    .qa-soon-sub {
      font-size: 11px;
      color: #a2aaad;
    }

    /* ── Success toast ── */
    .qa-toast {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 10001;
      background: #16A34A;
      color: #fff;
      padding: 12px 20px;
      border-radius: 10px;
      font-size: 12px;
      font-weight: 600;
      font-family: 'Inter', sans-serif;
      box-shadow: 0 8px 24px rgba(22,163,74,0.3);
      transform: translateY(80px);
      opacity: 0;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .qa-toast.show {
      transform: translateY(0);
      opacity: 1;
    }
    .qa-toast svg { width: 16px; height: 16px; flex-shrink: 0; }
  `;
  document.head.appendChild(st);

  // ── Icons ──
  var icons = {
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',
    decision: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>',
    assign: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>',
    note: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
    upload: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
  };

  // ── Get current portal ──
  function getCurrentPortal() {
    return (location.pathname.split('/').pop().replace(/\.html$/, '') || 'ceo');
  }

  // ── Build dropdown HTML ──
  function buildHTML() {
    var html = '<div class="qa-wrap" id="quick-actions">';
    html += '<button class="qa-trigger" onclick="QActions.toggle()">' + icons.plus + '</button>';
    html += '<div class="qa-dd" id="qa-dd">';
    html += '<button class="qa-item" onclick="QActions.createDecision()">';
    html += '<div class="qa-item-icon blue">' + icons.decision + '</div>';
    html += '<div class="qa-item-text"><div class="qa-item-label">Create Decision</div><div class="qa-item-sub">New decision with priority & domain</div></div>';
    html += '</button>';
    html += '<button class="qa-item" onclick="QActions.comingSoon(\'Assign Task\')">';
    html += '<div class="qa-item-icon green">' + icons.assign + '</div>';
    html += '<div class="qa-item-text"><div class="qa-item-label">Assign Task</div><div class="qa-item-sub">Delegate action to a team member</div></div>';
    html += '<span class="qa-item-badge">Soon</span>';
    html += '</button>';
    html += '<button class="qa-item" onclick="QActions.comingSoon(\'Add Note\')">';
    html += '<div class="qa-item-icon purple">' + icons.note + '</div>';
    html += '<div class="qa-item-text"><div class="qa-item-label">Add Note</div><div class="qa-item-sub">Quick note on current context</div></div>';
    html += '<span class="qa-item-badge">Soon</span>';
    html += '</button>';
    html += '<button class="qa-item" onclick="QActions.comingSoon(\'Upload Data\')">';
    html += '<div class="qa-item-icon amber">' + icons.upload + '</div>';
    html += '<div class="qa-item-text"><div class="qa-item-label">Upload Data</div><div class="qa-item-sub">Import CSV or data file</div></div>';
    html += '<span class="qa-item-badge">Soon</span>';
    html += '</button>';
    html += '</div>';
    html += '</div>';
    return html;
  }

  // ── Inject ──
  function inject() {
    var hdrR = document.querySelector('.hdr-r');
    if (!hdrR) return;

    var notifPanel = hdrR.querySelector('#notif-panel');
    var searchWrap = hdrR.querySelector('#global-search');
    var authArea = hdrR.querySelector('.auth-area');

    var wrapper = document.createElement('div');
    wrapper.innerHTML = buildHTML();
    var el = wrapper.firstElementChild;

    // Insert after notifications, before search
    if (searchWrap) {
      hdrR.insertBefore(el, searchWrap);
    } else if (authArea) {
      hdrR.insertBefore(el, authArea);
    } else {
      hdrR.appendChild(el);
    }
  }

  // ── Open / Close dropdown ──
  function openDD() {
    isOpen = true;
    document.getElementById('qa-dd').classList.add('open');
  }
  function closeDD() {
    isOpen = false;
    var dd = document.getElementById('qa-dd');
    if (dd) dd.classList.remove('open');
  }

  // ── Show toast ──
  function showToast(msg) {
    var existing = document.querySelector('.qa-toast');
    if (existing) existing.remove();
    var toast = document.createElement('div');
    toast.className = 'qa-toast';
    toast.innerHTML = icons.check + '<span>' + msg + '</span>';
    document.body.appendChild(toast);
    requestAnimationFrame(function() { toast.classList.add('show'); });
    setTimeout(function() {
      toast.classList.remove('show');
      setTimeout(function() { toast.remove(); }, 300);
    }, 3000);
  }

  // ── Show modal ──
  function showModal(type) {
    closeDD();
    modalOpen = true;

    if (type === 'decision') {
      showCreateDecisionModal();
    } else {
      showComingSoonModal(type);
    }
  }

  // ── Create Decision modal ──
  function showCreateDecisionModal() {
    var portal = getCurrentPortal();
    var bg = document.createElement('div');
    bg.className = 'qa-modal-bg';
    bg.id = 'qa-modal';
    bg.onclick = function(e) { if (e.target === bg) closeModal(); };

    var html = '<div class="qa-modal">';
    html += '<div class="qa-modal-head">';
    html += '<div class="qa-modal-icon">' + icons.decision + '</div>';
    html += '<div><div class="qa-modal-title">Create Decision</div><div class="qa-modal-desc">Add a new decision to track</div></div>';
    html += '<button class="qa-modal-close" onclick="QActions.closeModal()">' + icons.close + '</button>';
    html += '</div>';

    html += '<div class="qa-field"><label class="qa-label">Title</label><input class="qa-input" id="qa-title" type="text" placeholder="What decision needs to be made?" autofocus></div>';

    html += '<div class="qa-row">';
    html += '<div class="qa-field"><label class="qa-label">Priority</label><select class="qa-select" id="qa-priority"><option value="high">High</option><option value="medium" selected>Medium</option><option value="low">Low</option></select></div>';
    html += '<div class="qa-field"><label class="qa-label">Domain</label><select class="qa-select" id="qa-domain"><option value="Revenue">Revenue</option><option value="Pipeline">Pipeline</option><option value="Finance">Finance</option><option value="Operations">Operations</option><option value="Product">Product</option><option value="Engineering">Engineering</option><option value="Marketing">Marketing</option><option value="Customer">Customer</option></select></div>';
    html += '</div>';

    html += '<div class="qa-row">';
    html += '<div class="qa-field"><label class="qa-label">Portal</label><select class="qa-select" id="qa-portal">';
    var portals = ['ceo','cfo','cro','coo','cs','cto','cmo','cpo'];
    portals.forEach(function(p) {
      html += '<option value="' + p + '"' + (p === portal ? ' selected' : '') + '>' + p.toUpperCase() + '</option>';
    });
    html += '</select></div>';
    html += '<div class="qa-field"><label class="qa-label">$ Impact</label><input class="qa-input" id="qa-impact" type="text" placeholder="e.g. 500000"></div>';
    html += '</div>';

    html += '<div class="qa-field"><label class="qa-label">Summary</label><textarea class="qa-textarea" id="qa-summary" placeholder="Brief context for this decision..."></textarea></div>';

    html += '<div class="qa-modal-actions">';
    html += '<button class="qa-btn" onclick="QActions.closeModal()">Cancel</button>';
    html += '<button class="qa-btn qa-btn-primary" id="qa-submit" onclick="QActions.submitDecision()">Create Decision</button>';
    html += '</div>';
    html += '</div>';

    bg.innerHTML = html;
    document.body.appendChild(bg);

    // Focus title
    setTimeout(function() {
      var titleInput = document.getElementById('qa-title');
      if (titleInput) titleInput.focus();
    }, 100);

    // Escape to close
    bg.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeModal();
    });
  }

  // ── Coming Soon modal ──
  function showComingSoonModal(type) {
    var bg = document.createElement('div');
    bg.className = 'qa-modal-bg';
    bg.id = 'qa-modal';
    bg.onclick = function(e) { if (e.target === bg) closeModal(); };

    var labels = {
      'Assign Task': { icon: icons.assign, sub: 'Delegate actions to team members with deadlines and tracking' },
      'Add Note': { icon: icons.note, sub: 'Capture quick context notes attached to decisions' },
      'Upload Data': { icon: icons.upload, sub: 'Import CSV files for financials, pipeline, or accounts' }
    };
    var info = labels[type] || { icon: icons.plus, sub: '' };

    var html = '<div class="qa-modal">';
    html += '<div class="qa-modal-head">';
    html += '<div class="qa-modal-icon">' + info.icon + '</div>';
    html += '<div><div class="qa-modal-title">' + type + '</div><div class="qa-modal-desc">Coming soon</div></div>';
    html += '<button class="qa-modal-close" onclick="QActions.closeModal()">' + icons.close + '</button>';
    html += '</div>';
    html += '<div class="qa-soon">';
    html += '<div class="qa-soon-icon">🚧</div>';
    html += '<div class="qa-soon-text">' + type + '</div>';
    html += '<div class="qa-soon-sub">' + info.sub + '</div>';
    html += '</div>';
    html += '<div class="qa-modal-actions"><button class="qa-btn" onclick="QActions.closeModal()">Close</button></div>';
    html += '</div>';

    bg.innerHTML = html;
    document.body.appendChild(bg);
  }

  // ── Close modal ──
  function closeModal() {
    modalOpen = false;
    var m = document.getElementById('qa-modal');
    if (m) m.remove();
  }

  // ── Submit decision ──
  function submitDecision() {
    var title = document.getElementById('qa-title').value.trim();
    if (!title) {
      document.getElementById('qa-title').style.borderColor = '#FD1D1D';
      document.getElementById('qa-title').focus();
      return;
    }

    var submitBtn = document.getElementById('qa-submit');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Creating...';

    var impactVal = document.getElementById('qa-impact').value.replace(/[^0-9.]/g, '');
    var payload = {
      title: title,
      priority: document.getElementById('qa-priority').value,
      domain: document.getElementById('qa-domain').value,
      portal: document.getElementById('qa-portal').value,
      dollarImpact: parseFloat(impactVal) || 0,
      summary: document.getElementById('qa-summary').value.trim()
    };

    fetch('/api/decisions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(function(r) {
      if (!r.ok) throw new Error('Server error');
      return r.json();
    })
    .then(function(decision) {
      closeModal();
      showToast('Decision created: ' + decision.title);

      // Refresh decisions if the page has them
      if (typeof window._dcDecisions !== 'undefined') {
        window._dcDecisions.push(decision);
        if (typeof renderDecisionCards === 'function') renderDecisionCards();
      }
      // Reload page data if DSSData exists
      if (window.DSSData && window.DSSData.loadDecisions) {
        window.DSSData.loadDecisions();
      }
    })
    .catch(function(err) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Create Decision';
      alert('Failed to create decision: ' + err.message);
    });
  }

  // ── Coming soon handler ──
  function comingSoon(type) {
    closeDD();
    showModal(type);
  }

  // ── Public API ──
  window.QActions = {
    toggle: function() {
      if (isOpen) closeDD();
      else openDD();
    },
    createDecision: function() { showModal('decision'); },
    comingSoon: comingSoon,
    closeModal: closeModal,
    submitDecision: submitDecision
  };

  // ── Click outside ──
  document.addEventListener('click', function(e) {
    if (!e.target.closest('#quick-actions') && isOpen && !modalOpen) {
      closeDD();
    }
  });

  // ── Escape ──
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      if (modalOpen) closeModal();
      else if (isOpen) closeDD();
    }
  });

  // ── Init ──
  function init() {
    inject();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
