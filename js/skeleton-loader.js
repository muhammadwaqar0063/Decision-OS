/* ═══════════════════════════════════════════
   Skeleton Loader
   Shimmer placeholders for KPI boxes, charts,
   and content cards while page loads
   ═══════════════════════════════════════════ */

(function() {
  // ── Styles ──
  var st = document.createElement('style');
  st.textContent = `
    /* ── Shimmer animation ── */
    @keyframes sk-shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
    .sk-shimmer {
      background: linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 37%, #f0f0f0 63%);
      background-size: 200% 100%;
      animation: sk-shimmer 1.5s infinite;
      border-radius: 4px;
    }

    /* ── KPI Box Skeleton ── */
    .sk-kpi-label {
      height: 10px;
      width: 70%;
      margin-bottom: 8px;
    }
    .sk-kpi-value {
      height: 22px;
      width: 50%;
      margin-bottom: 6px;
    }
    .sk-kpi-sub {
      height: 9px;
      width: 80%;
    }

    /* ── Chart Skeleton ── */
    .sk-chart-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 5;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 6px;
      padding: 20px;
      background: #fff;
      border-radius: 0 0 10px 10px;
    }
    .sk-chart-bar {
      height: 8px;
      border-radius: 4px;
    }
    .sk-chart-bar:nth-child(1) { width: 40%; }
    .sk-chart-bar:nth-child(2) { width: 65%; }
    .sk-chart-bar:nth-child(3) { width: 50%; }
    .sk-chart-bar:nth-child(4) { width: 75%; }
    .sk-chart-bar:nth-child(5) { width: 30%; }

    /* ── Card Skeleton ── */
    .sk-card-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 5;
      padding: 20px;
      background: #fff;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .sk-card-line {
      height: 11px;
      border-radius: 4px;
    }
    .sk-card-line.w70 { width: 70%; }
    .sk-card-line.w90 { width: 90%; }
    .sk-card-line.w50 { width: 50%; }
    .sk-card-line.w60 { width: 60%; }

    /* ── Story Skeleton ── */
    .sk-story-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 5;
      padding: 28px 32px;
      background: linear-gradient(135deg, #2a2a2a 0%, #333 100%);
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .sk-story-line {
      height: 11px;
      border-radius: 4px;
      background: linear-gradient(90deg, rgba(255,255,255,0.06) 25%, rgba(255,255,255,0.1) 37%, rgba(255,255,255,0.06) 63%);
      background-size: 200% 100%;
      animation: sk-shimmer 1.5s infinite;
    }
    .sk-story-line.w80 { width: 80%; }
    .sk-story-line.w60 { width: 60%; }
    .sk-story-line.w90 { width: 90%; }
    .sk-story-line.w40 { width: 40%; }

    /* ── Right Panel Skeleton ── */
    .sk-rp-overlay {
      padding: 16px 20px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    /* ── Hidden state ── */
    .sk-done .sk-chart-overlay,
    .sk-done .sk-card-overlay,
    .sk-done .sk-story-overlay {
      display: none !important;
    }
  `;
  document.head.appendChild(st);

  // ── Create shimmer bar element ──
  function shimmerBar(cls) {
    return '<div class="sk-shimmer ' + cls + '"></div>';
  }

  function storyBar(cls) {
    return '<div class="sk-story-line ' + cls + '"></div>';
  }

  // ── Apply skeleton to KPI rows ──
  function skeletonizeKPIs() {
    document.querySelectorAll('.krow .kc').forEach(function(kc) {
      // Only if not already processed
      if (kc.dataset.skDone) return;
      kc.dataset.skDone = '1';

      var kl = kc.querySelector('.kl');
      var kv = kc.querySelector('.kv');
      var ks = kc.querySelector('.ks');

      if (kl) kl.innerHTML = shimmerBar('sk-kpi-label');
      if (kv) kv.innerHTML = shimmerBar('sk-kpi-value');
      if (ks) ks.innerHTML = shimmerBar('sk-kpi-sub');
    });
  }

  // ── Apply skeleton to charts ──
  function skeletonizeCharts() {
    document.querySelectorAll('.chart-wrap').forEach(function(cw) {
      if (cw.dataset.skDone) return;
      cw.dataset.skDone = '1';
      cw.style.position = 'relative';

      var overlay = document.createElement('div');
      overlay.className = 'sk-chart-overlay';
      overlay.innerHTML = '<div class="sk-shimmer sk-chart-bar"></div>'
        + '<div class="sk-shimmer sk-chart-bar"></div>'
        + '<div class="sk-shimmer sk-chart-bar"></div>'
        + '<div class="sk-shimmer sk-chart-bar"></div>'
        + '<div class="sk-shimmer sk-chart-bar"></div>';
      cw.appendChild(overlay);
    });
  }

  // ── Apply skeleton to content cards ──
  function skeletonizeCards() {
    document.querySelectorAll('.cd').forEach(function(cd) {
      if (cd.dataset.skDone) return;
      // Skip if it has a chart (chart skeleton handles those)
      if (cd.querySelector('.chart-wrap')) {
        cd.dataset.skDone = '1';
        return;
      }
      cd.dataset.skDone = '1';
      cd.style.position = 'relative';

      var overlay = document.createElement('div');
      overlay.className = 'sk-card-overlay';
      overlay.innerHTML = shimmerBar('sk-card-line w70')
        + shimmerBar('sk-card-line w90')
        + shimmerBar('sk-card-line w50')
        + shimmerBar('sk-card-line w60');
      cd.appendChild(overlay);
    });
  }

  // ── Apply skeleton to story panels ──
  function skeletonizeStories() {
    document.querySelectorAll('.story').forEach(function(s) {
      if (s.dataset.skDone) return;
      s.dataset.skDone = '1';
      s.style.position = 'relative';

      var overlay = document.createElement('div');
      overlay.className = 'sk-story-overlay';
      overlay.innerHTML = storyBar('w80')
        + storyBar('w60')
        + storyBar('w90')
        + storyBar('w40');
      s.appendChild(overlay);
    });
  }

  // ── Remove all skeletons (called when page is ready) ──
  function removeSkeletons() {
    // Restore KPI values
    // We need the original data — but since the HTML is static,
    // the skeletons just temporarily replaced visible content.
    // Reload the page data by calling the portal's init functions.
    // Simplest: just reload after a delay.

    // Remove chart overlays
    document.querySelectorAll('.sk-chart-overlay').forEach(function(el) {
      el.style.transition = 'opacity 0.3s';
      el.style.opacity = '0';
      setTimeout(function() { el.remove(); }, 300);
    });

    // Remove card overlays
    document.querySelectorAll('.sk-card-overlay').forEach(function(el) {
      el.style.transition = 'opacity 0.3s';
      el.style.opacity = '0';
      setTimeout(function() { el.remove(); }, 300);
    });

    // Remove story overlays
    document.querySelectorAll('.sk-story-overlay').forEach(function(el) {
      el.style.transition = 'opacity 0.3s';
      el.style.opacity = '0';
      setTimeout(function() { el.remove(); }, 300);
    });

    // Restore KPIs by reloading the page content
    // The original HTML is in the DOM, skeletons just replaced innerHTML
    // We need to restore from original — simplest is to reload from a cached copy
    if (window._skOriginalHTML) {
      Object.keys(window._skOriginalHTML).forEach(function(selector) {
        var el = document.querySelector(selector);
        if (el) el.innerHTML = window._skOriginalHTML[selector];
      });
    }
  }

  // ── Save original HTML before skeletonizing ──
  function saveOriginals() {
    window._skOriginalHTML = {};
    document.querySelectorAll('.krow .kc').forEach(function(kc, i) {
      window._skOriginalHTML['.krow .kc:nth-child(' + (i + 1) + ')'] = kc.innerHTML;
    });
  }

  // ── Init ──
  function init() {
    saveOriginals();
    skeletonizeKPIs();
    skeletonizeCharts();
    skeletonizeCards();
    skeletonizeStories();

    // Remove skeletons after content loads
    // Wait for Chart.js if it's loading
    function checkReady() {
      if (typeof Chart !== 'undefined') {
        // Chart.js loaded — wait a tick for charts to render
        setTimeout(removeSkeletons, 800);
      } else if (document.querySelector('.chart-wrap')) {
        // Charts exist but Chart.js not loaded yet — keep checking
        setTimeout(checkReady, 200);
      } else {
        // No charts — just remove after short delay
        setTimeout(removeSkeletons, 500);
      }
    }

    // Start checking after a minimum display time
    setTimeout(checkReady, 600);
  }

  // Run as early as possible
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
