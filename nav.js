(function () {
  var b = document.querySelector('.sw-menu'), d = document.getElementById('drawer'), bd = document.getElementById('backdrop');
  if (!b || !d) return;
  function set(o) {
    document.body.classList.toggle('menu-open', o);
    b.setAttribute('aria-expanded', o);
    b.setAttribute('aria-label', o ? 'Close menu' : 'Open menu');
  }
  b.addEventListener('click', function () { set(!document.body.classList.contains('menu-open')); });
  if (bd) bd.addEventListener('click', function () { set(false); });
  d.addEventListener('click', function (e) { if (e.target.closest('a')) set(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') set(false); });
})();
