/* BLACK NOVEMBER 2026 · contagem regressiva e galeria. A data fica no atributo data-end da faixa. */
(function () {
  var bar = document.querySelector('.bf-bar');
  if (!bar) return;
  var end = new Date(bar.getAttribute('data-end')).getTime();
  var cds = document.querySelectorAll('[data-bf-cd]');
  var clocks = document.querySelectorAll('.bf-clock');
  function p(n) { return n < 10 ? '0' + n : '' + n; }
  function tick() {
    var ms = end - Date.now();
    if (!(ms > 0)) {
      cds.forEach(function (e) { e.textContent = 'Encerrada'; });
      clocks.forEach(function (c) { c.parentNode.style.display = 'none'; });
      return false;
    }
    var s = Math.floor(ms / 1000), d = Math.floor(s / 86400), h = Math.floor(s % 86400 / 3600), m = Math.floor(s % 3600 / 60), x = s % 60;
    cds.forEach(function (e) { e.textContent = (d > 0 ? d + 'd ' : '') + p(h) + 'h ' + p(m) + 'm ' + p(x) + 's'; });
    var v = { d: p(d), h: p(h), m: p(m), s: p(x) };
    clocks.forEach(function (c) { c.querySelectorAll('[data-u]').forEach(function (e) { e.querySelector('b').textContent = v[e.getAttribute('data-u')]; }); });
    return true;
  }
  if (tick()) { var t = setInterval(function () { if (!tick()) clearInterval(t); }, 1000); }

  // Galeria: ampliar imagem
  var lb = document.createElement('div'); lb.className = 'lb'; lb.innerHTML = '<img alt="">'; document.body.appendChild(lb);
  document.querySelectorAll('.opp-shot').forEach(function (f) {
    f.addEventListener('click', function () { var i = f.querySelector('img'); lb.firstChild.src = i.getAttribute('data-full') || i.src; lb.firstChild.alt = i.alt; lb.classList.add('on'); });
  });
  lb.addEventListener('click', function () { lb.classList.remove('on'); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') lb.classList.remove('on'); });
})();
