(function () {
  var K = 'compos-theme';
  window.COMPOS_THEMES = [{ id:'default', label:'Oscuro' }, { id:'light', label:'Claro' }, { id:'hc', label:'Alto contraste' }, { id:'blue', label:'Azul (marca)' }];
  // «Tu color»: el cliente elige un color y la app se adapta. Se guarda como 'custom:#RRGGBB'.
  window.COMPOS_COLORS = [{ id:'verde', label:'Verde', hex:'#1E9E5A' }, { id:'rosa', label:'Rosa', hex:'#E0457B' }, { id:'amarillo', label:'Amarillo', hex:'#F2B90C' },
    { id:'naranja', label:'Naranja', hex:'#F0712C' }, { id:'morado', label:'Morado', hex:'#7B4FE0' }, { id:'turquesa', label:'Turquesa', hex:'#0FA3A3' }];
  var root = document.documentElement, set = [];
  var rgb = function (h) { return [1, 3, 5].map(function (i) { return parseInt(h.substr(i, 2), 16); }); };
  var hex = function (c) { return '#' + c.map(function (v) { return ('0' + Math.round(v).toString(16)).slice(-2); }).join(''); };
  var mix = function (a, b, t) { var x = rgb(a), y = rgb(b); return hex(x.map(function (v, i) { return v * t + y[i] * (1 - t); })); };
  var lum = function (h) { return rgb(h).map(function (v) { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }).reduce(function (s, v, i) { return s + v * [0.2126, 0.7152, 0.0722][i]; }, 0); };
  var put = function (k, v) { root.style.setProperty(k, v); set.push(k); };
  var apply = function (t) {
    if (!t || t === 'qsr') t = 'default';                     // el tema rojo y amarillo ya no se ofrece
    set.forEach(function (k) { root.style.removeProperty(k); }); set = [];
    var m = /^custom:(#[0-9a-f]{6})$/i.exec(t);
    if (!m) { root.setAttribute('data-theme', t); return; }
    var c = m[1], light = lum(c) > 0.42, ink = mix(c, '#000000', light ? 0.45 : 0.75);
    root.setAttribute('data-theme', 'blue');                  // base clara de marca, con el color elegido encima
    put('--surface-canvas', mix(c, '#F4F4F2', 0.12)); put('--surface-panel', '#FFFFFF');
    put('--surface-card', mix(c, '#FFFFFF', 0.07)); put('--surface-raised', mix(c, '#FFFFFF', 0.17));
    put('--surface-inverse', c); put('--text-on-inverse', light ? '#111315' : '#FFFFFF');
    put('--surface-accent', mix(c, '#FFFFFF', 0.38)); put('--periwinkle-200', mix(c, '#FFFFFF', 0.38));
    put('--text-primary', '#141617'); put('--text-secondary', '#45484C'); put('--text-muted', '#5E6267');
    put('--text-link', ink); put('--accent-ink', ink); put('--brand-stripe', c);
    put('--border-hairline', 'rgba(20,22,23,.12)'); put('--border-strong', 'rgba(20,22,23,.30)'); put('--border-dashed', 'rgba(20,22,23,.26)');
  };
  var t = 'default';
  try { t = localStorage.getItem(K) || 'default'; } catch (e) {}
  apply(t);
  window.inkOf = function (v) { return 'color-mix(in oklch, ' + v + ' var(--ink-mix), black)'; };
  window.composTheme = function () { var a = root.getAttribute('data-theme') || 'default'; try { var s = localStorage.getItem(K); if (s && s.indexOf('custom:') === 0) return s; } catch (e) {} return a; };
  window.composSetTheme = function (n) { try { localStorage.setItem(K, n); } catch (e) {} apply(n); window.dispatchEvent(new Event('compos-theme')); };
})();
