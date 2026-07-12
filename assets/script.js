document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.main-nav ul');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      menu.classList.toggle('open');
      var expanded = menu.classList.contains('open');
      toggle.setAttribute('aria-expanded', expanded);
    });
  }

  // Font size control
  var root = document.documentElement;
  var sizeStep = parseFloat(localStorage.getItem('tsmh-font-step') || '0');
  applyFontStep(sizeStep);

  var incBtn = document.getElementById('font-inc');
  var decBtn = document.getElementById('font-dec');
  var resetBtn = document.getElementById('font-reset');
  if (incBtn) incBtn.addEventListener('click', function () { sizeStep = Math.min(sizeStep + 1, 3); applyFontStep(sizeStep); });
  if (decBtn) decBtn.addEventListener('click', function () { sizeStep = Math.max(sizeStep - 1, -2); applyFontStep(sizeStep); });
  if (resetBtn) resetBtn.addEventListener('click', function () { sizeStep = 0; applyFontStep(sizeStep); });

  function applyFontStep(step) {
    root.style.fontSize = (15 + step) + 'px';
    localStorage.setItem('tsmh-font-step', step);
  }

  // High contrast toggle
  var contrastBtn = document.getElementById('contrast-toggle');
  if (localStorage.getItem('tsmh-contrast') === '1') {
    document.body.classList.add('high-contrast');
  }
  if (contrastBtn) {
    contrastBtn.addEventListener('click', function () {
      document.body.classList.toggle('high-contrast');
      localStorage.setItem('tsmh-contrast', document.body.classList.contains('high-contrast') ? '1' : '0');
    });
  }

  // Visitor counter (cosmetic, session based illustrative figure)
  var counterEl = document.getElementById('visitor-count');
  if (counterEl) {
    var base = 4218763;
    var day = Math.floor(Date.now() / 86400000);
    counterEl.textContent = (base + day * 37).toLocaleString('en-IN');
  }

  // Current date in footer bits
  document.querySelectorAll('.js-today').forEach(function (el) {
    el.textContent = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
  });
});
