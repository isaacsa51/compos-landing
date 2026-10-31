(function () {
  var K = 'compos-theme';
  window.COMPOS_THEMES = [{ id:'default', label:'Oscuro' }, { id:'light', label:'Claro' }, { id:'hc', label:'Alto contraste' }, { id:'qsr', label:'Rojo y amarillo (marca)' }, { id:'blue', label:'Azul (marca)' }];
  var apply = function (t) { document.documentElement.setAttribute('data-theme', t); };
  var t = 'default';
  try { t = localStorage.getItem(K) || 'default'; } catch (e) {}
  apply(t);
  window.inkOf = function (v) { return 'color-mix(in oklch, ' + v + ' var(--ink-mix), black)'; };
  window.composTheme = function () { return document.documentElement.getAttribute('data-theme') || 'default'; };
  window.composSetTheme = function (n) { try { localStorage.setItem(K, n); } catch (e) {} apply(n); window.dispatchEvent(new Event('compos-theme')); };
})();
