/* Generado desde compos-mobile.jsx (Babel, preset react). Edita el .jsx y vuelve a compilar. */
/*
 * Compos — Point of Sale System
 * File: ui_kits/pos-mobile/compos-mobile.jsx
 * Module: Compos (demo · versión de teléfono de cada pantalla)
 *
 * Copyright (c) 2026 Isaac Serrano. All rights reserved.
 * This file is part of Compos and is proprietary and confidential.
 *
 * Se compila a compos-mobile.js (Babel, preset react). Edita este archivo y vuelve a compilar:
 *   node -e "const B=require('@babel/standalone'),f=require('fs');f.writeFileSync('compos-mobile.js',B.transform(f.readFileSync('compos-mobile.jsx','utf8'),{presets:['react']}).code)"
 */
(function () {
  const {
    Icon
  } = window.ComposDesignSystem_9739cd;
  const h = React.createElement;
  const {
    useState,
    useEffect
  } = React;

  /* ------------------------------------------------------------------ datos */
  const CATS = [{
    id: 'cafe',
    name: 'Con café',
    icon: 'coffee',
    color: 'var(--sage-200)',
    items: [['Americano espresso', 45], ['Americano naranja', 70], ['Americano limón', 70], ['Espresso tonic', 65], ['Cold brew tonic', 65], ['Cappuccino', 65], ['Flat white', 65], ['Latte natural', 60], ['Latte vainilla', 70], ['Latte caramelo', 70], ['Mocha', 72], ['Espresso doble', 40], ['Cortado', 50]]
  }, {
    id: 'frappe',
    name: 'Frappés',
    icon: 'cup-soda',
    color: 'var(--lilac-200)',
    items: [['Frappé moka', 85], ['Frappé caramelo', 85], ['Frappé cookies', 90], ['Frappé matcha', 90], ['Frappé taro', 90], ['Frappé chai', 85], ['Frappé fresa', 85]]
  }, {
    id: 'sincafe',
    name: 'Sin café',
    icon: 'leaf',
    color: 'var(--sky-200)',
    items: [['Matcha latte', 75], ['Chai latte', 70], ['Chocolate', 60], ['Taro latte', 75]]
  }, {
    id: 'pan',
    name: 'Panadería',
    icon: 'croissant',
    color: 'var(--rose-200)',
    items: [['Croissant', 45], ['Concha', 30], ['Rol de canela', 55]]
  }];
  const OPTIONS = {
    cafe: [{
      name: 'Extras',
      max: 2,
      options: [['Shot de espresso', 15], ['Jarabe extra', 15]]
    }],
    frappe: [{
      name: 'Extras',
      max: 2,
      options: [['Crema batida', 10], ['Shot de espresso', 15], ['Jarabe extra', 15]]
    }],
    sincafe: [{
      name: 'Leche',
      max: 1,
      options: [['Entera', 0], ['Deslactosada', 0], ['Avena', 12], ['Almendra', 12]]
    }]
  };
  const ALL = CATS.flatMap(c => c.items.map(([name, price]) => ({
    name,
    price,
    cat: c
  })));
  const MODES = [['Aquí', 'utensils'], ['Domicilio', 'bike'], ['Pickup', 'shopping-bag']];
  const money = n => (n < 0 ? '-$' : '$') + Math.abs(n).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const ivaOf = t => {
    const sub = Math.round(t / 1.16 * 100) / 100;
    return {
      sub,
      iva: Math.round((t - sub) * 100) / 100
    };
  };
  const ink = v => window.inkOf ? window.inkOf(v) : v;

  /* ---------------------------- estado compartido con las pantallas de tablet */
  const KEY = 'compos-v2';
  const seed = () => ({
    seq: 1,
    orders: [{
      id: 'A-0001',
      mode: 'Aquí',
      status: 'abierta',
      opened: Date.now() - 28000,
      lines: [{
        name: 'Americano naranja',
        unit: 85,
        base: 70,
        qty: 1,
        mods: ['Shot de espresso']
      }]
    }]
  });
  const load = () => {
    try {
      const d = JSON.parse(localStorage.getItem(KEY));
      if (d && Array.isArray(d.orders)) return d;
    } catch (e) {}
    return seed();
  };
  const save = d => {
    try {
      localStorage.setItem(KEY, JSON.stringify(d));
    } catch (e) {}
  };
  const nextId = d => {
    d.seq = (d.seq || 0) + 1;
    return 'A-' + String(d.seq).padStart(4, '0');
  };
  const go = (file, extra) => {
    try {
      if (extra) Object.entries(extra).forEach(([k, v]) => localStorage.setItem(k, v));
    } catch (e) {}
    location.href = file;
  };
  const getKey = k => {
    try {
      return localStorage.getItem(k);
    } catch (e) {
      return null;
    }
  };
  const total = o => o.lines.reduce((s, l) => s + l.unit * l.qty, 0);
  const useTick = ms => {
    const [, set] = useState(0);
    useEffect(() => {
      const t = setInterval(() => set(x => x + 1), ms || 1000);
      return () => clearInterval(t);
    }, []);
  };
  const clock = sec => String(Math.floor(sec / 60)).padStart(2, '0') + ':' + String(Math.max(0, sec) % 60).padStart(2, '0');

  /* ------------------------------------------------------------ primitivas */
  const font = {
    fontFamily: 'inherit'
  };
  const btn = (kind, extra) => ({
    ...font,
    height: 52,
    flex: 1,
    minWidth: 0,
    borderRadius: 'var(--radius-pill)',
    fontSize: 'var(--text-body)',
    fontWeight: 'var(--weight-semibold)',
    cursor: 'pointer',
    border: kind === 'outline' ? '1px solid var(--border-strong)' : kind === 'danger' ? '1px solid var(--danger-ink)' : '1px solid transparent',
    background: kind === 'primary' ? 'var(--surface-inverse)' : 'transparent',
    color: kind === 'primary' ? 'var(--text-on-inverse)' : kind === 'danger' ? 'var(--danger-ink)' : 'var(--text-primary)',
    ...extra
  });
  const chip = (on, extra) => ({
    ...font,
    flex: '0 0 auto',
    height: 38,
    padding: '0 14px',
    borderRadius: 'var(--radius-pill)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    border: on ? '1px solid transparent' : '1px solid var(--border-strong)',
    background: on ? 'var(--surface-inverse)' : 'transparent',
    color: on ? 'var(--text-on-inverse)' : 'var(--text-primary)',
    fontSize: 'var(--text-sm)',
    fontWeight: 'var(--weight-semibold)',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    ...extra
  });
  const card = extra => ({
    background: 'var(--surface-card)',
    borderRadius: 'var(--radius-md)',
    padding: 14,
    ...extra
  });
  const iconBtn = {
    width: 44,
    height: 44,
    borderRadius: 'var(--radius-sm)',
    border: 'none',
    background: 'var(--surface-raised)',
    color: 'var(--text-primary)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    flex: '0 0 auto'
  };
  const label = {
    fontSize: 'var(--text-xs)',
    letterSpacing: 'var(--tracking-wide)',
    color: 'var(--text-muted)',
    textTransform: 'uppercase'
  };
  const row = {
    display: 'flex',
    alignItems: 'center',
    gap: 10
  };
  const scrollX = {
    display: 'flex',
    gap: 8,
    overflowX: 'auto',
    scrollbarWidth: 'none',
    flex: '0 0 auto'
  };
  function Chips({
    items,
    value,
    onChange
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: scrollX
    }, items.map(([id, text, n, ic]) => /*#__PURE__*/React.createElement("button", {
      key: id,
      style: chip(id === value),
      onClick: () => onChange(id)
    }, ic && /*#__PURE__*/React.createElement(Icon, {
      name: ic,
      size: 16
    }), text, n !== undefined && /*#__PURE__*/React.createElement("span", {
      style: {
        opacity: .7,
        fontWeight: 'var(--weight-medium)'
      }
    }, n))));
  }
  function Segmented({
    items,
    value,
    onChange
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        background: 'var(--surface-raised)',
        borderRadius: 'var(--radius-pill)',
        padding: 4,
        gap: 4,
        flex: '0 0 auto'
      }
    }, items.map(([id, text, n]) => /*#__PURE__*/React.createElement("button", {
      key: id,
      onClick: () => onChange(id),
      style: {
        ...font,
        flex: 1,
        height: 36,
        border: 'none',
        borderRadius: 'var(--radius-pill)',
        cursor: 'pointer',
        background: id === value ? 'var(--surface-inverse)' : 'transparent',
        color: id === value ? 'var(--text-on-inverse)' : 'var(--text-primary)',
        fontSize: 'var(--text-sm)',
        fontWeight: 'var(--weight-semibold)',
        whiteSpace: 'nowrap'
      }
    }, text, n !== undefined ? ' · ' + n : '')));
  }
  function Toggle({
    on,
    onChange
  }) {
    return /*#__PURE__*/React.createElement("button", {
      role: "switch",
      "aria-checked": on,
      onClick: () => onChange(!on),
      style: {
        width: 48,
        height: 28,
        borderRadius: 14,
        border: 'none',
        padding: 3,
        cursor: 'pointer',
        flex: '0 0 auto',
        background: on ? 'var(--surface-inverse)' : 'var(--surface-raised)',
        display: 'flex',
        justifyContent: on ? 'flex-end' : 'flex-start',
        transition: 'all 150ms'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 22,
        height: 22,
        borderRadius: 11,
        background: on ? 'var(--text-on-inverse)' : 'var(--text-secondary)'
      }
    }));
  }
  function Keypad({
    onKey,
    decimal
  }) {
    const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', decimal ? '.' : '', '0', 'del'];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 10
      }
    }, keys.map((k, i) => k === '' ? /*#__PURE__*/React.createElement("span", {
      key: i
    }) : /*#__PURE__*/React.createElement("button", {
      key: i,
      onClick: () => onKey(k),
      "aria-label": k === 'del' ? 'Borrar' : k,
      style: {
        ...font,
        height: 58,
        borderRadius: 'var(--radius-sm)',
        border: 'none',
        cursor: 'pointer',
        background: 'var(--surface-raised)',
        color: k === 'del' ? 'var(--danger-ink)' : 'var(--text-primary)',
        fontSize: 'var(--text-h2)',
        fontWeight: 'var(--weight-medium)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, k === 'del' ? /*#__PURE__*/React.createElement(Icon, {
      name: "delete",
      size: 22
    }) : k)));
  }
  function Dots({
    n
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 16,
        justifyContent: 'center'
      }
    }, [0, 1, 2, 3].map(i => /*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        width: 14,
        height: 14,
        borderRadius: 7,
        background: i < n ? 'var(--surface-inverse)' : 'transparent',
        border: '2px solid ' + (i < n ? 'transparent' : 'var(--border-strong)'),
        boxSizing: 'border-box',
        transition: 'background 120ms'
      }
    })));
  }
  function Sheet({
    title,
    sub,
    onClose,
    children,
    footer
  }) {
    return /*#__PURE__*/React.createElement("div", {
      onClick: onClose,
      style: {
        position: 'absolute',
        inset: 0,
        background: 'rgba(0,0,0,.5)',
        zIndex: 20,
        display: 'flex',
        alignItems: 'flex-end'
      }
    }, /*#__PURE__*/React.createElement("div", {
      onClick: e => e.stopPropagation(),
      style: {
        width: '100%',
        maxHeight: '88%',
        background: 'var(--surface-panel)',
        borderRadius: '24px 24px 0 0',
        display: 'flex',
        flexDirection: 'column',
        animation: 'msheet 220ms var(--ease-standard, ease)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 40,
        height: 4,
        borderRadius: 2,
        background: 'var(--border-strong)',
        margin: '10px auto 4px'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        ...row,
        padding: '8px 16px 10px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-h3)',
        fontWeight: 'var(--weight-semibold)'
      }
    }, title), sub && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-sm)',
        color: 'var(--text-secondary)'
      }
    }, sub)), /*#__PURE__*/React.createElement("button", {
      "aria-label": "Cerrar",
      style: iconBtn,
      onClick: onClose
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "x",
      size: 20
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        overflowY: 'auto',
        padding: '0 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        minHeight: 0
      }
    }, children), footer && /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 10,
        padding: '14px 16px 20px'
      }
    }, footer)));
  }
  function Toast({
    text
  }) {
    if (!text) return null;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        left: 16,
        right: 16,
        bottom: 96,
        zIndex: 30,
        background: 'var(--surface-inverse)',
        color: 'var(--text-on-inverse)',
        borderRadius: 'var(--radius-md)',
        padding: '12px 14px',
        fontSize: 'var(--text-sm)',
        fontWeight: 'var(--weight-medium)',
        ...row
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "circle-check",
      size: 18
    }), text);
  }
  const useToast = () => {
    const [t, set] = useState('');
    const show = s => {
      set(s);
      clearTimeout(window.__mt);
      window.__mt = setTimeout(() => set(''), 2200);
    };
    return [t, show];
  };
  function ManagerPin({
    onClose,
    onOk,
    why
  }) {
    const [pin, setPin] = useState('');
    const [bad, setBad] = useState(false);
    const push = k => {
      if (k === 'del') return setPin(p => p.slice(0, -1));
      const n = (pin + k).slice(0, 4);
      setPin(n);
      setBad(false);
      if (n.length === 4) setTimeout(() => {
        if (n === '1234') onOk();else {
          setBad(true);
          setPin('');
        }
      }, 200);
    };
    return /*#__PURE__*/React.createElement(Sheet, {
      title: "PIN de gerente",
      sub: why,
      onClose: onClose
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
        padding: '8px 0 20px'
      }
    }, /*#__PURE__*/React.createElement(Dots, {
      n: pin.length
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'center',
        fontSize: 'var(--text-sm)',
        color: bad ? 'var(--danger-ink)' : 'var(--text-secondary)'
      }
    }, bad ? 'PIN incorrecto, intenta de nuevo' : 'Demo: el PIN de gerente es 1234'), /*#__PURE__*/React.createElement(Keypad, {
      onKey: push
    })));
  }

  /* --------------------------------------------------------------- shell */
  const NAV = [['menu', 'circle-plus', 'Nueva orden', 'Menu.html'], ['checks', 'clipboard-list', 'Checks', 'Orders.html'], ['incoming', 'bell-ring', 'Entrantes', 'Incoming.html', '4'], ['cocina', 'chef-hat', 'Cocina', 'Kitchen.html'], ['turno', 'history', 'Turno', 'Shift.html'], ['split', 'split', 'Dividir cuenta', 'Split.html'], ['refund', 'undo-2', 'Reembolso', 'Refund.html'], ['search', 'search', 'Buscar', 'Search.html'], ['reports', 'chart-column', 'Reportes', 'Reports.html'], ['settings', 'settings', 'Ajustes', 'Settings.html']];
  try {
    const st = document.createElement('style');
    st.textContent = '@keyframes mdrawer{from{transform:translateX(-100%)}to{transform:none}}@keyframes mscrim{from{opacity:0}to{opacity:1}}';
    document.head.appendChild(st);
  } catch (e) {}
  function StatusBar() {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        height: 44,
        flex: '0 0 auto',
        display: 'flex',
        alignItems: 'center',
        padding: '0 26px',
        fontSize: 15,
        fontWeight: 600,
        position: 'relative'
      }
    }, "9:41", /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        top: 10,
        width: 110,
        height: 30,
        borderRadius: 20,
        background: '#000'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: 'auto',
        display: 'inline-flex',
        gap: 6,
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "signal",
      size: 15
    }), /*#__PURE__*/React.createElement(Icon, {
      name: "wifi",
      size: 15
    }), /*#__PURE__*/React.createElement(Icon, {
      name: "battery-full",
      size: 18
    })));
  }

  /* Menú de navegación: oculto siempre; la hamburguesa lo abre encima de todo, sin mover el contenido. */
  function Drawer({
    tab,
    onClose
  }) {
    useEffect(() => {
      const k = e => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', k);
      return () => window.removeEventListener('keydown', k);
    }, []);
    const item = (id, ic, text, file, badge, danger) => {
      const on = id === tab;
      return /*#__PURE__*/React.createElement("button", {
        key: id,
        onClick: () => on ? onClose() : go(file),
        "aria-current": on ? 'page' : undefined,
        style: {
          ...font,
          ...row,
          gap: 14,
          width: '100%',
          height: 52,
          padding: '0 16px',
          border: 'none',
          borderRadius: 'var(--radius-sm)',
          cursor: 'pointer',
          background: on ? 'var(--surface-inverse)' : 'transparent',
          color: on ? 'var(--text-on-inverse)' : danger ? 'var(--danger-ink)' : 'var(--text-primary)',
          fontSize: 'var(--text-body)',
          fontWeight: 'var(--weight-medium)',
          textAlign: 'left'
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: ic,
        size: 22
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          flex: 1
        }
      }, text), badge && /*#__PURE__*/React.createElement("span", {
        style: {
          minWidth: 22,
          height: 22,
          borderRadius: 11,
          background: 'var(--danger-ink)',
          color: '#fff',
          fontSize: 12,
          fontWeight: 600,
          display: 'grid',
          placeItems: 'center'
        }
      }, badge));
    };
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        zIndex: 50
      }
    }, /*#__PURE__*/React.createElement("div", {
      onClick: onClose,
      style: {
        position: 'absolute',
        inset: 0,
        background: 'rgba(0,0,0,.55)',
        animation: 'mscrim 200ms ease'
      }
    }), /*#__PURE__*/React.createElement("nav", {
      "aria-label": "Navegaci\xF3n",
      style: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: '82%',
        maxWidth: 320,
        background: 'var(--surface-panel)',
        borderRadius: '0 24px 24px 0',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'var(--shadow-float, 0 20px 50px rgba(0,0,0,.4))',
        animation: 'mdrawer 220ms var(--ease-standard, ease)'
      }
    }, /*#__PURE__*/React.createElement(StatusBar, null), /*#__PURE__*/React.createElement("div", {
      style: {
        ...row,
        gap: 12,
        padding: '6px 16px 16px'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 44,
        height: 44,
        borderRadius: 22,
        background: 'var(--periwinkle-200)',
        color: 'var(--text-on-light)',
        display: 'grid',
        placeItems: 'center',
        fontWeight: 600
      }
    }, "I"), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 'var(--weight-semibold)'
      }
    }, "Isaac"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-xs)',
        color: 'var(--text-secondary)'
      }
    }, "Administrador \xB7 Caja 1")), /*#__PURE__*/React.createElement("button", {
      "aria-label": "Cerrar men\xFA",
      style: iconBtn,
      onClick: onClose
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "x",
      size: 20
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minHeight: 0,
        overflowY: 'auto',
        padding: '0 10px',
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }
    }, NAV.map(n => item(...n))), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '10px 10px 28px',
        borderTop: '1px solid var(--border-hairline)'
      }
    }, item('exit', 'log-out', 'Salir', 'index.html', null, true))));
  }
  function Shell({
    tab,
    title,
    sub,
    back,
    right,
    children,
    footer,
    overlay,
    noNav
  }) {
    const [menu, setMenu] = useState(false);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--surface-canvas)',
        color: 'var(--text-primary)',
        position: 'relative',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement(StatusBar, null), title !== undefined && /*#__PURE__*/React.createElement("header", {
      style: {
        ...row,
        padding: '4px 16px 10px',
        flex: '0 0 auto'
      }
    }, !noNav && /*#__PURE__*/React.createElement("button", {
      "aria-label": "Abrir men\xFA",
      "aria-expanded": menu,
      style: iconBtn,
      onClick: () => setMenu(true)
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "menu",
      size: 22
    })), back && /*#__PURE__*/React.createElement("button", {
      "aria-label": "Atr\xE1s",
      style: {
        ...iconBtn,
        background: 'transparent'
      },
      onClick: () => go(back)
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-left",
      size: 20
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-h2)',
        fontWeight: 'var(--weight-semibold)',
        letterSpacing: 'var(--tracking-tight)',
        lineHeight: 1.15,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }, title), sub && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-xs)',
        color: 'var(--text-secondary)',
        marginTop: 2,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }, sub)), right), /*#__PURE__*/React.createElement("main", {
      style: {
        flex: 1,
        minHeight: 0,
        overflowY: 'auto',
        padding: '0 16px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: 12
      }
    }, children), footer && /*#__PURE__*/React.createElement("div", {
      style: {
        flex: '0 0 auto',
        padding: '10px 16px',
        display: 'flex',
        gap: 10,
        borderTop: '1px solid var(--border-hairline)'
      }
    }, footer), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 22,
        flex: '0 0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 134,
        height: 5,
        borderRadius: 3,
        background: 'var(--text-primary)',
        opacity: .85
      }
    })), overlay, menu && /*#__PURE__*/React.createElement(Drawer, {
      tab: tab,
      onClose: () => setMenu(false)
    }));
  }
  const stamp = () => {
    const d = new Date();
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const mon = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    return days[d.getDay()] + ', ' + d.getDate() + ' ' + mon[d.getMonth()] + ' · ' + String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
  };

  /* ================================================================ 1 · PIN */
  function MLogin() {
    const [pin, setPin] = useState('');
    const push = k => {
      if (k === 'del') return setPin(p => p.slice(0, -1));
      const n = (pin + k).slice(0, 4);
      setPin(n);
      if (n.length === 4) setTimeout(() => go('Menu.html'), 260);
    };
    const dot = t => /*#__PURE__*/React.createElement("span", {
      style: {
        ...row,
        gap: 5,
        fontSize: 10,
        letterSpacing: 'var(--tracking-wide)',
        color: 'var(--text-secondary)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 6,
        height: 6,
        borderRadius: 3,
        background: 'var(--status-danger, var(--danger-ink))'
      }
    }), t);
    return /*#__PURE__*/React.createElement(Shell, {
      noNav: true
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...row,
        paddingTop: 6
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 'var(--weight-semibold)',
        fontSize: 'var(--text-body)'
      }
    }, "Compos"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: 'var(--text-muted)'
      }
    }, "Semper listo")), /*#__PURE__*/React.createElement("div", {
      style: {
        marginLeft: 'auto',
        display: 'flex',
        gap: 10
      }
    }, dot('IMPRESORA'), dot('CAJÓN'), dot('SYNC'))), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-xs)',
        color: 'var(--text-secondary)'
      }
    }, "Turno \xB7 ", stamp()), /*#__PURE__*/React.createElement("div", {
      style: {
        ...card({
          background: 'var(--periwinkle-200)',
          color: 'var(--text-on-light)'
        }),
        ...row,
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 40,
        height: 40,
        borderRadius: 20,
        background: '#fff',
        color: '#111315',
        display: 'grid',
        placeItems: 'center',
        fontWeight: 600
      }
    }, "I"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 'var(--weight-semibold)'
      }
    }, "Isaac"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-xs)'
      }
    }, "Administrador")), /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 20,
      style: {
        marginLeft: 'auto'
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        gap: 22,
        paddingBottom: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'center',
        fontSize: 'var(--text-body)',
        color: 'var(--text-secondary)'
      }
    }, "Ingresa tu PIN"), /*#__PURE__*/React.createElement(Dots, {
      n: pin.length
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '0 22px'
      }
    }, /*#__PURE__*/React.createElement(Keypad, {
      onKey: push
    }))));
  }

  /* ============================================================== 2 · Turno */
  function MShift() {
    const [retiros, setRetiros] = useState([['11:30', 1000]]);
    const [pin, setPin] = useState(null);
    const [closed, setClosed] = useState(false);
    const [toast, show] = useToast();
    const retirado = retiros.reduce((s, r) => s + r[1], 0);
    const esperado = 2000 + 5775 - 338 - retirado;
    const metodos = [['banknote', 'Efectivo', 5775], ['credit-card', 'Crédito', 9635], ['credit-card', 'Débito', 3240], ['bike', 'Uber Eats', 2580, 1], ['bike', 'Rappi', 1346, 1], ['bike', 'DiDi Food', 812, 1]];
    const retirar = n => {
      const d = new Date();
      setRetiros(r => [...r, [String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'), n]]);
      show('Retiro de ' + money(n) + ' registrado');
    };
    return /*#__PURE__*/React.createElement(Shell, {
      tab: "turno",
      title: "Turno",
      sub: closed ? 'Turno cerrado · corte Z impreso' : 'Abierto desde 07:00 · Lena P. · Caja 1',
      right: /*#__PURE__*/React.createElement("span", {
        style: chip(false, {
          height: 30,
          cursor: 'default',
          color: closed ? 'var(--text-secondary)' : ink('var(--mint-200)'),
          borderColor: 'currentColor'
        })
      }, closed ? 'Cerrado' : 'Abierto'),
      footer: /*#__PURE__*/React.createElement("button", {
        style: btn('primary'),
        disabled: closed,
        onClick: () => setPin(true)
      }, closed ? 'Turno cerrado' : 'Cerrar turno'),
      overlay: /*#__PURE__*/React.createElement(React.Fragment, null, pin && /*#__PURE__*/React.createElement(ManagerPin, {
        why: "Cerrar el turno imprime el corte Z",
        onClose: () => setPin(null),
        onOk: () => {
          setPin(null);
          setClosed(true);
          show('Turno cerrado');
        }
      }), /*#__PURE__*/React.createElement(Toast, {
        text: toast
      }))
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: card({
        gridColumn: '1 / -1'
      })
    }, /*#__PURE__*/React.createElement("div", {
      style: label
    }, "Ventas brutas"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-h1)',
        fontWeight: 'var(--weight-semibold)'
      }
    }, "$23,388.00"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-xs)',
        color: 'var(--text-secondary)'
      }
    }, "64 \xF3rdenes \xB7 prom. $365.44")), /*#__PURE__*/React.createElement("div", {
      style: card()
    }, /*#__PURE__*/React.createElement("div", {
      style: label
    }, "Reembolsos"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-h3)',
        fontWeight: 'var(--weight-semibold)',
        color: 'var(--danger-ink)'
      }
    }, "-$338.00"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-xs)',
        color: 'var(--text-secondary)'
      }
    }, "2 reemb. \xB7 1 anul.")), /*#__PURE__*/React.createElement("div", {
      style: card()
    }, /*#__PURE__*/React.createElement("div", {
      style: label
    }, "Efectivo esperado"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-h3)',
        fontWeight: 'var(--weight-semibold)'
      }
    }, money(esperado)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-xs)',
        color: 'var(--text-secondary)'
      }
    }, "fondo $2,000 + efectivo \u2212 retiros"))), /*#__PURE__*/React.createElement("div", {
      style: card()
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...label,
        marginBottom: 8
      }
    }, "Ventas por m\xE9todo"), metodos.map(([ic, n, v, pre]) => /*#__PURE__*/React.createElement("div", {
      key: n,
      style: {
        ...row,
        padding: '7px 0',
        fontSize: 'var(--text-sm)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: ic,
      size: 16
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }, n), pre && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        padding: '2px 8px',
        borderRadius: 10,
        background: 'var(--mint-200)',
        color: 'var(--text-on-light)'
      }
    }, "Prepagado"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontVariantNumeric: 'tabular-nums'
      }
    }, money(v))))), /*#__PURE__*/React.createElement("div", {
      style: card()
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...label,
        marginBottom: 10
      }
    }, "Retiro de efectivo"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8
      }
    }, [500, 1000, 2000].map(n => /*#__PURE__*/React.createElement("button", {
      key: n,
      disabled: closed,
      style: chip(false, {
        flex: 1,
        justifyContent: 'center',
        height: 44
      }),
      onClick: () => retirar(n)
    }, money(n).replace('.00', '')))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 10
      }
    }, retiros.map(([t, n], i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        ...row,
        fontSize: 'var(--text-sm)',
        padding: '5px 0',
        color: 'var(--text-secondary)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }, t), /*#__PURE__*/React.createElement("span", null, money(n)))))), /*#__PURE__*/React.createElement("button", {
      style: btn('outline', {
        flex: '0 0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8
      }),
      onClick: () => show('Corte X enviado a la impresora')
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "printer",
      size: 18
    }), "Imprimir corte X"));
  }

  /* ========================================================= 3 · Entrantes */
  const INCOMING = [{
    id: 'RP-0912',
    plat: 'Rappi',
    who: 'Carlos V.',
    secs: 22,
    total: 433,
    items: [[1, 'Frappé moka'], [2, 'Croissant'], [1, 'Rol de canela']],
    addr: 'Río Presidio 412, Centro',
    note: null
  }, {
    id: 'UE-2231',
    plat: 'Uber Eats',
    who: 'Mia T.',
    secs: 93,
    total: 387,
    items: [[2, 'Latte vainilla'], [1, 'Matcha latte']],
    addr: 'Av. Álvaro Obregón 18, depto 3',
    note: 'Sin popotes'
  }, {
    id: 'DD-5530',
    plat: 'DiDi Food',
    who: 'Noah B.',
    secs: 130,
    total: 507,
    items: [[3, 'Frappé cookies'], [2, 'Concha']],
    addr: 'Calle Ángel Flores 77',
    note: null
  }, {
    id: 'W-118',
    plat: 'Sitio web',
    who: 'Carla N.',
    secs: 148,
    total: 258,
    items: [[1, 'Cappuccino'], [1, 'Chai latte'], [1, 'Croissant']],
    addr: 'Pickup en tienda',
    note: null
  }];
  function MIncoming() {
    useTick();
    const [start] = useState(Date.now());
    const [list, setList] = useState(INCOMING);
    const [filter, setFilter] = useState('Todas');
    const [sel, setSel] = useState(null);
    const [prep, setPrep] = useState(15);
    const [accepted, setAccepted] = useState(0);
    const [sound, setSound] = useState(true);
    const [toast, show] = useToast();
    const left = o => Math.max(0, o.secs + 60 - Math.floor((Date.now() - start) / 1000));
    const plats = ['Todas', 'Uber Eats', 'Rappi', 'DiDi Food', 'Sitio web'];
    const shown = list.filter(o => filter === 'Todas' || o.plat === filter);
    const act = (o, ok) => {
      setList(l => l.filter(x => x.id !== o.id));
      setSel(null);
      if (ok) setAccepted(n => n + 1);
      show(ok ? '#' + o.id + ' aceptada · lista en ' + prep + ' min' : '#' + o.id + ' rechazada');
    };
    return /*#__PURE__*/React.createElement(Shell, {
      tab: "incoming",
      title: "Entrantes",
      sub: accepted + ' aceptadas en esta sesión · las más urgentes primero',
      right: /*#__PURE__*/React.createElement("span", {
        style: {
          ...row,
          gap: 6,
          fontSize: 'var(--text-xs)',
          color: 'var(--text-secondary)'
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "volume-2",
        size: 16
      }), /*#__PURE__*/React.createElement(Toggle, {
        on: sound,
        onChange: setSound
      })),
      overlay: /*#__PURE__*/React.createElement(React.Fragment, null, sel && /*#__PURE__*/React.createElement(Sheet, {
        title: '#' + sel.id,
        sub: sel.plat + ' · ' + sel.who + ' · rechazo automático en ' + clock(left(sel)),
        onClose: () => setSel(null),
        footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
          style: btn('danger'),
          onClick: () => act(sel, false)
        }, "Rechazar"), /*#__PURE__*/React.createElement("button", {
          style: btn('primary'),
          onClick: () => act(sel, true)
        }, "Aceptar \xB7 ", prep, " min"))
      }, /*#__PURE__*/React.createElement("div", {
        style: card()
      }, /*#__PURE__*/React.createElement("div", {
        style: label
      }, "Cliente"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontWeight: 'var(--weight-semibold)',
          marginTop: 4
        }
      }, sel.who), /*#__PURE__*/React.createElement("div", {
        style: {
          ...row,
          gap: 6,
          fontSize: 'var(--text-sm)',
          color: 'var(--text-secondary)',
          marginTop: 4
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "map-pin",
        size: 14
      }), sel.addr), sel.note && /*#__PURE__*/React.createElement("div", {
        style: {
          ...row,
          gap: 6,
          fontSize: 'var(--text-sm)',
          color: ink('var(--order-warn)'),
          marginTop: 4
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "sticky-note",
        size: 14
      }), sel.note)), /*#__PURE__*/React.createElement("div", {
        style: card()
      }, /*#__PURE__*/React.createElement("div", {
        style: label
      }, "Productos"), sel.items.map(([q, n]) => /*#__PURE__*/React.createElement("div", {
        key: n,
        style: {
          ...row,
          fontSize: 'var(--text-sm)',
          padding: '6px 0'
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          color: 'var(--text-muted)'
        }
      }, q, "\xD7"), /*#__PURE__*/React.createElement("span", {
        style: {
          flex: 1
        }
      }, n))), /*#__PURE__*/React.createElement("div", {
        style: {
          ...row,
          borderTop: '1px solid var(--border-hairline)',
          paddingTop: 10,
          marginTop: 6
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          flex: 1,
          fontWeight: 'var(--weight-semibold)'
        }
      }, "Total"), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 10,
          padding: '2px 8px',
          borderRadius: 10,
          background: 'var(--mint-200)',
          color: 'var(--text-on-light)'
        }
      }, "Pagado v\xEDa ", sel.plat), /*#__PURE__*/React.createElement("span", {
        style: {
          fontWeight: 'var(--weight-semibold)'
        }
      }, money(sel.total)))), /*#__PURE__*/React.createElement("div", {
        style: label
      }, "Lista en"), /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          gap: 8,
          paddingBottom: 4
        }
      }, [10, 15, 20, 30].map(m => /*#__PURE__*/React.createElement("button", {
        key: m,
        style: chip(m === prep, {
          flex: 1,
          justifyContent: 'center'
        }),
        onClick: () => setPrep(m)
      }, m, " min")))), /*#__PURE__*/React.createElement(Toast, {
        text: toast
      }))
    }, /*#__PURE__*/React.createElement(Chips, {
      items: plats.map(p => [p, p, p === 'Todas' ? list.length : list.filter(o => o.plat === p).length]),
      value: filter,
      onChange: setFilter
    }), shown.length === 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'center',
        color: 'var(--text-muted)',
        padding: '60px 0',
        fontSize: 'var(--text-sm)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "inbox",
      size: 28
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 8
      }
    }, "Sin pedidos pendientes")), shown.map(o => {
      const l = left(o);
      const urgent = l < 60;
      return /*#__PURE__*/React.createElement("div", {
        key: o.id,
        onClick: () => setSel(o),
        style: {
          ...card(),
          cursor: 'pointer',
          border: urgent ? '1px solid var(--danger-ink)' : '1px solid var(--border-hairline)'
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: row
      }, /*#__PURE__*/React.createElement(Icon, {
        name: o.plat === 'Sitio web' ? 'globe' : 'bike',
        size: 18
      }), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontWeight: 'var(--weight-semibold)'
        }
      }, "#", o.id), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 'var(--text-xs)',
          color: 'var(--text-secondary)'
        }
      }, o.plat, " \xB7 ", o.who)), /*#__PURE__*/React.createElement("span", {
        style: {
          fontVariantNumeric: 'tabular-nums',
          fontSize: 'var(--text-sm)',
          fontWeight: 'var(--weight-semibold)',
          color: urgent ? 'var(--danger-ink)' : 'var(--text-secondary)'
        }
      }, clock(l))), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 'var(--text-sm)',
          color: 'var(--text-secondary)',
          margin: '8px 0'
        }
      }, o.items.map(([q, n]) => q + '× ' + n).join(' · ')), /*#__PURE__*/React.createElement("div", {
        style: row
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontWeight: 'var(--weight-semibold)',
          flex: 1
        }
      }, money(o.total)), /*#__PURE__*/React.createElement("button", {
        "aria-label": "Rechazar",
        onClick: e => {
          e.stopPropagation();
          act(o, false);
        },
        style: {
          ...iconBtn,
          background: 'transparent',
          border: '1px solid var(--danger-ink)',
          color: 'var(--danger-ink)',
          borderRadius: 22
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "x",
        size: 18
      })), /*#__PURE__*/React.createElement("button", {
        onClick: e => {
          e.stopPropagation();
          act(o, true);
        },
        style: btn('primary', {
          flex: '0 0 auto',
          height: 44,
          padding: '0 22px'
        })
      }, "Aceptar")));
    }));
  }

  /* ============================================================== 4 · Menú */
  function MMenu() {
    const [data, setData] = useState(load);
    const [mode, setMode] = useState('Aquí');
    const [cat, setCat] = useState('todos');
    const [lines, setLines] = useState([]);
    const [opt, setOpt] = useState(null);
    const [picked, setPicked] = useState([]);
    const [cart, setCart] = useState(false);
    useEffect(() => {
      const m = decodeURIComponent(location.hash.slice(1)).match(/^opciones(?:=(.+))?$/);
      if (m) {
        const it = ALL.find(x => x.name === (m[1] || 'Americano naranja'));
        if (it) {
          setOpt(it);
          setPicked([]);
        }
      }
    }, []);
    const items = cat === 'todos' ? ALL : ALL.filter(i => i.cat.id === cat);
    const add = (item, mods) => {
      const extra = mods.reduce((s, m) => s + m[1], 0);
      const unit = item.price + extra;
      const names = mods.map(m => m[0]);
      setLines(ls => {
        const i = ls.findIndex(l => l.name === item.name && l.mods.join() === names.join());
        if (i >= 0) {
          const c = [...ls];
          c[i] = {
            ...c[i],
            qty: c[i].qty + 1
          };
          return c;
        }
        return [...ls, {
          name: item.name,
          unit,
          base: item.price,
          qty: 1,
          mods: names
        }];
      });
    };
    const pick = item => {
      if (OPTIONS[item.cat.id]) {
        setOpt(item);
        setPicked([]);
      } else add(item, []);
    };
    const qty = (i, q) => setLines(ls => q <= 0 ? ls.filter((_, j) => j !== i) : ls.map((l, j) => j === i ? {
      ...l,
      qty: q
    } : l));
    const t = lines.reduce((s, l) => s + l.unit * l.qty, 0);
    const n = lines.reduce((s, l) => s + l.qty, 0);
    const place = pay => {
      const d = load();
      const id = nextId(d);
      d.orders.unshift({
        id,
        mode,
        status: 'abierta',
        opened: Date.now(),
        lines
      });
      save(d);
      setData(d);
      if (pay) go('Payment.html', {
        'compos-v2-pay': id
      });else go('Orders.html');
    };
    const groups = opt ? OPTIONS[opt.cat.id] : [];
    const toggle = (g, o) => setPicked(p => {
      const has = p.find(x => x[0] === o[0]);
      if (has) return p.filter(x => x[0] !== o[0]);
      const inG = p.filter(x => g.options.some(y => y[0] === x[0]));
      let next = p;
      if (inG.length >= g.max) next = p.filter(x => x[0] !== inG[0][0]);
      return [...next, o];
    });
    return /*#__PURE__*/React.createElement(Shell, {
      tab: "menu",
      title: "Nueva orden",
      sub: 'Orden #' + 'A-' + String((data.seq || 0) + 1).padStart(4, '0') + ' · ' + mode,
      right: /*#__PURE__*/React.createElement("button", {
        "aria-label": "Buscar",
        style: iconBtn,
        onClick: () => go('Search.html')
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "search",
        size: 20
      })),
      footer: /*#__PURE__*/React.createElement("button", {
        disabled: !n,
        onClick: () => setCart(true),
        style: btn('primary', {
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
          gap: 10,
          opacity: n ? 1 : .45
        })
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "shopping-bag",
        size: 18
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          flex: 1,
          textAlign: 'left'
        }
      }, n ? 'Ver orden · ' + n + (n === 1 ? ' producto' : ' productos') : 'Toca un producto'), /*#__PURE__*/React.createElement("span", null, money(t))),
      overlay: /*#__PURE__*/React.createElement(React.Fragment, null, opt && /*#__PURE__*/React.createElement(Sheet, {
        title: opt.name,
        sub: "Elige las opciones del producto",
        onClose: () => setOpt(null),
        footer: /*#__PURE__*/React.createElement("button", {
          style: btn('primary'),
          onClick: () => {
            add(opt, picked);
            setOpt(null);
            history.replaceState(null, '', location.pathname);
          }
        }, "Agregar \xB7 ", money(opt.price + picked.reduce((s, m) => s + m[1], 0)))
      }, groups.map(g => /*#__PURE__*/React.createElement("div", {
        key: g.name,
        style: {
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          paddingBottom: 8
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          ...row
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontWeight: 'var(--weight-semibold)',
          flex: 1
        }
      }, g.name), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 'var(--text-xs)',
          color: 'var(--text-muted)'
        }
      }, "Hasta ", g.max)), g.options.map(o => {
        const on = picked.some(x => x[0] === o[0]);
        return /*#__PURE__*/React.createElement("button", {
          key: o[0],
          onClick: () => toggle(g, o),
          style: {
            ...font,
            ...card({
              padding: '14px'
            }),
            ...row,
            cursor: 'pointer',
            color: 'var(--text-primary)',
            fontSize: 'var(--text-body)',
            textAlign: 'left',
            border: on ? '1px solid var(--text-primary)' : '1px solid transparent'
          }
        }, /*#__PURE__*/React.createElement("span", {
          style: {
            width: 22,
            height: 22,
            borderRadius: g.max === 1 ? 11 : 6,
            border: '2px solid var(--border-strong)',
            display: 'grid',
            placeItems: 'center',
            background: on ? 'var(--surface-inverse)' : 'transparent',
            color: 'var(--text-on-inverse)'
          }
        }, on && /*#__PURE__*/React.createElement(Icon, {
          name: "check",
          size: 14
        })), /*#__PURE__*/React.createElement("span", {
          style: {
            flex: 1
          }
        }, o[0]), /*#__PURE__*/React.createElement("span", {
          style: {
            color: 'var(--text-secondary)',
            fontSize: 'var(--text-sm)'
          }
        }, o[1] ? '+' + money(o[1]) : 'Incluido'));
      })))), cart && /*#__PURE__*/React.createElement(Sheet, {
        title: "Orden",
        sub: mode + ' · precios con IVA 16% incluido',
        onClose: () => setCart(false),
        footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
          style: btn('outline'),
          onClick: () => place(false)
        }, "Guardar"), /*#__PURE__*/React.createElement("button", {
          style: btn('primary'),
          onClick: () => place(true)
        }, "Cobrar ", money(t)))
      }, lines.map((l, i) => /*#__PURE__*/React.createElement("div", {
        key: i,
        style: {
          ...card(),
          ...row,
          alignItems: 'flex-start'
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1,
          minWidth: 0
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontWeight: 'var(--weight-semibold)',
          color: ink('var(--periwinkle-200)')
        }
      }, l.name), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 'var(--text-sm)',
          color: 'var(--text-secondary)'
        }
      }, money(l.unit)), l.mods.length > 0 && /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 'var(--text-sm)',
          color: 'var(--text-secondary)',
          borderLeft: '2px solid var(--border-strong)',
          paddingLeft: 8,
          marginTop: 4
        }
      }, l.mods.join(' · '))), /*#__PURE__*/React.createElement("div", {
        style: {
          ...row,
          gap: 10
        }
      }, /*#__PURE__*/React.createElement("button", {
        "aria-label": "Quitar uno",
        style: {
          ...iconBtn,
          width: 34,
          height: 34
        },
        onClick: () => {
          qty(i, l.qty - 1);
          if (lines.length === 1 && l.qty === 1) setCart(false);
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "minus",
        size: 16
      })), /*#__PURE__*/React.createElement("span", {
        style: {
          minWidth: 12,
          textAlign: 'center'
        }
      }, l.qty), /*#__PURE__*/React.createElement("button", {
        "aria-label": "Agregar uno",
        style: {
          ...iconBtn,
          width: 34,
          height: 34
        },
        onClick: () => qty(i, l.qty + 1)
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "plus",
        size: 16
      }))))), /*#__PURE__*/React.createElement("div", {
        style: {
          ...card(),
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          fontSize: 'var(--text-sm)',
          color: 'var(--text-secondary)'
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: row
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          flex: 1
        }
      }, "Subtotal"), money(ivaOf(t).sub)), /*#__PURE__*/React.createElement("div", {
        style: row
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          flex: 1
        }
      }, "IVA"), money(ivaOf(t).iva)), /*#__PURE__*/React.createElement("div", {
        style: {
          ...row,
          color: 'var(--text-primary)',
          fontSize: 'var(--text-h3)',
          fontWeight: 'var(--weight-semibold)'
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          flex: 1
        }
      }, "Total"), money(t)))))
    }, /*#__PURE__*/React.createElement("div", {
      style: scrollX
    }, MODES.map(([m, ic]) => /*#__PURE__*/React.createElement("button", {
      key: m,
      onClick: () => setMode(m),
      style: chip(false, m === mode ? {
        background: 'var(--surface-accent)',
        color: 'var(--text-on-light)',
        borderColor: 'transparent'
      } : {})
    }, /*#__PURE__*/React.createElement(Icon, {
      name: ic,
      size: 16
    }), m))), /*#__PURE__*/React.createElement(Chips, {
      items: [['todos', 'Todos', ALL.length, 'layout-grid'], ...CATS.map(c => [c.id, c.name, c.items.length, c.icon])],
      value: cat,
      onChange: setCat
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 10
      }
    }, items.map(it => {
      const inCart = lines.filter(l => l.name === it.name).reduce((s, l) => s + l.qty, 0);
      return /*#__PURE__*/React.createElement("button", {
        key: it.name,
        onClick: () => pick(it),
        style: {
          ...font,
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          borderRadius: 'var(--radius-md)',
          background: it.cat.color,
          color: 'var(--text-on-light)',
          padding: 12,
          minHeight: 104,
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          position: 'relative'
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: it.cat.icon,
        size: 18
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          fontWeight: 'var(--weight-semibold)',
          fontSize: 'var(--text-sm)',
          lineHeight: 1.2,
          flex: 1
        }
      }, it.name), /*#__PURE__*/React.createElement("span", {
        style: {
          ...row,
          justifyContent: 'space-between',
          fontWeight: 'var(--weight-semibold)'
        }
      }, money(it.price), OPTIONS[it.cat.id] && /*#__PURE__*/React.createElement(Icon, {
        name: "sliders-horizontal",
        size: 15
      })), inCart > 0 && /*#__PURE__*/React.createElement("span", {
        style: {
          position: 'absolute',
          top: 10,
          right: 10,
          minWidth: 22,
          height: 22,
          borderRadius: 11,
          background: '#111315',
          color: '#fff',
          fontSize: 12,
          display: 'grid',
          placeItems: 'center'
        }
      }, inCart));
    })));
  }

  /* ============================================================ 5 · Checks */
  function MChecks() {
    useTick();
    const [data, setData] = useState(load);
    const [filter, setFilter] = useState('abierta');
    const [selId, setSelId] = useState(null);
    const commit = d => {
      save(d);
      setData({
        ...d
      });
    };
    const count = s => data.orders.filter(o => o.status === s).length;
    const list = data.orders.filter(o => o.status === filter);
    const sel = data.orders.find(o => o.id === selId);
    const elapsed = o => clock(Math.floor((Date.now() - o.opened) / 1000));
    const mut = fn => {
      const d = load();
      const o = d.orders.find(x => x.id === selId);
      if (o) fn(o, d);
      commit(d);
    };
    const STAT = {
      abierta: ['Abierta', 'var(--sky-200)'],
      'por-cerrar': ['Por cerrar', 'var(--order-warn)'],
      cerrada: ['Cerrada', 'var(--text-secondary)']
    };
    return /*#__PURE__*/React.createElement(Shell, {
      tab: "checks",
      title: "Checks",
      sub: data.orders.length + ' órdenes en este turno',
      right: /*#__PURE__*/React.createElement("button", {
        "aria-label": "Nueva orden",
        style: iconBtn,
        onClick: () => go('Menu.html')
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "plus",
        size: 20
      })),
      overlay: sel && /*#__PURE__*/React.createElement(Sheet, {
        title: 'Orden #' + sel.id,
        sub: sel.mode + ' · ' + STAT[sel.status][0] + ' · ' + elapsed(sel),
        onClose: () => setSelId(null),
        footer: sel.status === 'cerrada' ? /*#__PURE__*/React.createElement("button", {
          style: btn('outline'),
          onClick: () => go('Refund.html')
        }, "Reembolsar") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
          style: btn('outline'),
          onClick: () => {
            mut(o => {
              o.status = 'por-cerrar';
            });
          }
        }, "Preparar"), /*#__PURE__*/React.createElement("button", {
          style: btn('primary'),
          onClick: () => go('Payment.html', {
            'compos-v2-pay': sel.id
          })
        }, "Cobrar ", money(total(sel))))
      }, sel.lines.length === 0 && /*#__PURE__*/React.createElement("div", {
        style: {
          color: 'var(--text-muted)',
          fontSize: 'var(--text-sm)',
          textAlign: 'center',
          padding: 20
        }
      }, "Sin productos"), sel.lines.map((l, i) => /*#__PURE__*/React.createElement("div", {
        key: i,
        style: {
          ...card(),
          ...row,
          alignItems: 'flex-start'
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1,
          minWidth: 0
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontWeight: 'var(--weight-semibold)',
          color: ink('var(--periwinkle-200)')
        }
      }, l.name), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 'var(--text-sm)',
          color: 'var(--text-secondary)'
        }
      }, money(l.unit), l.mods.length ? ' · ' + l.mods.join(' · ') : '')), sel.status !== 'cerrada' ? /*#__PURE__*/React.createElement("div", {
        style: {
          ...row,
          gap: 10
        }
      }, /*#__PURE__*/React.createElement("button", {
        "aria-label": "Quitar uno",
        style: {
          ...iconBtn,
          width: 34,
          height: 34
        },
        onClick: () => mut(o => {
          if (o.lines[i].qty <= 1) o.lines.splice(i, 1);else o.lines[i].qty -= 1;
        })
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "minus",
        size: 16
      })), /*#__PURE__*/React.createElement("span", null, l.qty), /*#__PURE__*/React.createElement("button", {
        "aria-label": "Agregar uno",
        style: {
          ...iconBtn,
          width: 34,
          height: 34
        },
        onClick: () => mut(o => {
          o.lines[i].qty += 1;
        })
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "plus",
        size: 16
      }))) : /*#__PURE__*/React.createElement("span", {
        style: {
          color: 'var(--text-secondary)'
        }
      }, "\xD7", l.qty))), /*#__PURE__*/React.createElement("div", {
        style: {
          ...card(),
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          fontSize: 'var(--text-sm)',
          color: 'var(--text-secondary)'
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: row
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          flex: 1
        }
      }, "Subtotal"), money(ivaOf(total(sel)).sub)), /*#__PURE__*/React.createElement("div", {
        style: row
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          flex: 1
        }
      }, "IVA"), money(ivaOf(total(sel)).iva)), /*#__PURE__*/React.createElement("div", {
        style: {
          ...row,
          color: 'var(--text-primary)',
          fontSize: 'var(--text-h3)',
          fontWeight: 'var(--weight-semibold)'
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          flex: 1
        }
      }, "Total"), money(total(sel)))), sel.status !== 'cerrada' && /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          gap: 8,
          paddingBottom: 4
        }
      }, /*#__PURE__*/React.createElement("button", {
        style: chip(false, {
          flex: 1,
          justifyContent: 'center',
          height: 44
        }),
        onClick: () => go('Split.html')
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "split",
        size: 16
      }), "Dividir"), /*#__PURE__*/React.createElement("button", {
        style: chip(false, {
          flex: 1,
          justifyContent: 'center',
          height: 44,
          color: 'var(--danger-ink)',
          borderColor: 'var(--danger-ink)'
        }),
        onClick: () => {
          const d = load();
          d.orders = d.orders.filter(x => x.id !== selId);
          commit(d);
          setSelId(null);
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "x",
        size: 16
      }), "Cancelar")))
    }, /*#__PURE__*/React.createElement(Segmented, {
      items: [['abierta', 'Abierta', count('abierta')], ['por-cerrar', 'Por cerrar', count('por-cerrar')], ['cerrada', 'Cerrada', count('cerrada')]],
      value: filter,
      onChange: setFilter
    }), list.length === 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'center',
        color: 'var(--text-muted)',
        padding: '60px 0',
        fontSize: 'var(--text-sm)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "clipboard-list",
      size: 28
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 8
      }
    }, "No hay \xF3rdenes en ", STAT[filter][0].toLowerCase())), list.map(o => /*#__PURE__*/React.createElement("button", {
      key: o.id,
      onClick: () => setSelId(o.id),
      style: {
        ...font,
        ...card(),
        border: '1px solid var(--border-hairline)',
        textAlign: 'left',
        cursor: 'pointer',
        color: 'var(--text-primary)',
        display: 'flex',
        flexDirection: 'column',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: row
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 38,
        height: 38,
        borderRadius: 'var(--radius-sm)',
        background: STAT[o.status][1],
        color: 'var(--text-on-light)',
        display: 'grid',
        placeItems: 'center'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: MODES.find(m => m[0] === o.mode)[1],
      size: 18
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 'var(--weight-semibold)'
      }
    }, "Orden #", o.id), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-xs)',
        color: 'var(--text-secondary)'
      }
    }, o.mode, " \xB7 ", STAT[o.status][0])), /*#__PURE__*/React.createElement("span", {
      style: {
        ...row,
        gap: 4,
        fontSize: 'var(--text-sm)',
        color: 'var(--text-secondary)',
        fontVariantNumeric: 'tabular-nums'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "timer",
      size: 14
    }), elapsed(o))), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-sm)',
        color: 'var(--text-secondary)'
      }
    }, o.lines.map(l => l.qty + '× ' + l.name).join(' · ') || 'Sin productos'), /*#__PURE__*/React.createElement("div", {
      style: {
        ...row,
        borderTop: '1px solid var(--border-hairline)',
        paddingTop: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        fontSize: 'var(--text-xs)',
        color: 'var(--text-muted)'
      }
    }, "Total"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 'var(--weight-semibold)'
      }
    }, money(total(o)))))));
  }

  /* ============================================================ 6 · Cocina */
  const TICKETS = [{
    id: '400',
    st: 'nueva',
    who: 'Pickup · Lena Park',
    mins: 9,
    items: [[1, 'Latte caramelo'], [1, 'Croissant']]
  }, {
    id: '410',
    st: 'nueva',
    who: 'Pickup · Daniel Ruiz',
    mins: 4,
    items: [[2, 'Frappé taro', 'Crema batida'], [1, 'Mocha'], [1, 'Concha']]
  }, {
    id: '412',
    st: 'preparando',
    who: 'Uber Eats · Mia Torres',
    mins: 23,
    pre: true,
    items: [[1, 'Cold brew tonic'], [1, 'Matcha latte'], [3, 'Concha']]
  }, {
    id: '407',
    st: 'preparando',
    who: 'Repartidor propio · Grace Kim',
    mins: 14,
    items: [[1, 'Cappuccino'], [2, 'Rol de canela']]
  }, {
    id: '396',
    st: 'lista',
    who: 'Pickup · Sam Ortiz',
    mins: 31,
    items: [[1, 'Chai latte'], [1, 'Croissant']]
  }];
  function MKitchen() {
    const [list, setList] = useState(TICKETS);
    const [col, setCol] = useState('nueva');
    const [toast, show] = useToast();
    const cols = [['nueva', 'Nueva'], ['preparando', 'Preparando'], ['lista', 'Lista']];
    const next = {
      nueva: ['preparando', 'Empezar'],
      preparando: ['lista', 'Marcar lista'],
      lista: [null, 'Entregar']
    };
    const advance = t => {
      const [n] = next[t.st];
      setList(l => n ? l.map(x => x.id === t.id ? {
        ...x,
        st: n
      } : x) : l.filter(x => x.id !== t.id));
      show(n ? '#' + t.id + ' → ' + cols.find(c => c[0] === n)[1] : '#' + t.id + ' entregada');
    };
    const tone = m => m >= 20 ? 'var(--danger-ink)' : m >= 12 ? ink('var(--order-warn)') : 'var(--text-secondary)';
    const shown = list.filter(t => t.st === col).sort((a, b) => b.mins - a.mins);
    return /*#__PURE__*/React.createElement(Shell, {
      tab: "cocina",
      title: "Cocina",
      sub: list.length + ' comandas activas · las más antiguas primero',
      overlay: /*#__PURE__*/React.createElement(Toast, {
        text: toast
      })
    }, /*#__PURE__*/React.createElement(Segmented, {
      items: cols.map(([id, t]) => [id, t, list.filter(x => x.st === id).length]),
      value: col,
      onChange: setCol
    }), shown.length === 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'center',
        color: 'var(--text-muted)',
        padding: '60px 0',
        fontSize: 'var(--text-sm)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "chef-hat",
      size: 28
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 8
      }
    }, "Nada por aqu\xED")), shown.map(t => /*#__PURE__*/React.createElement("div", {
      key: t.id,
      style: {
        ...card(),
        borderTop: '3px solid ' + (t.st === 'nueva' ? 'var(--sky-200)' : t.st === 'preparando' ? 'var(--order-warn)' : 'var(--mint-200)')
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: row
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--text-h2)',
        fontWeight: 'var(--weight-semibold)',
        flex: 1
      }
    }, "#", t.id), t.pre && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        padding: '2px 8px',
        borderRadius: 10,
        background: 'var(--mint-200)',
        color: 'var(--text-on-light)'
      }
    }, "Prepagado"), /*#__PURE__*/React.createElement("span", {
      style: {
        ...row,
        gap: 4,
        fontSize: 'var(--text-sm)',
        fontWeight: 'var(--weight-semibold)',
        color: tone(t.mins)
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "timer",
      size: 14
    }), clock(t.mins * 60 + 2))), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-xs)',
        color: 'var(--text-secondary)',
        margin: '2px 0 10px'
      }
    }, t.who), t.items.map(([q, n, mod], i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        ...row,
        padding: '6px 0',
        alignItems: 'flex-start'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 24,
        height: 24,
        borderRadius: 6,
        background: 'var(--surface-raised)',
        display: 'grid',
        placeItems: 'center',
        fontSize: 12,
        fontWeight: 600,
        flex: '0 0 auto'
      }
    }, q), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 'var(--weight-medium)'
      }
    }, n), mod && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-xs)',
        color: 'var(--text-secondary)'
      }
    }, mod)))), /*#__PURE__*/React.createElement("button", {
      style: btn(t.st === 'lista' ? 'primary' : 'outline', {
        width: '100%',
        marginTop: 10,
        height: 46
      }),
      onClick: () => advance(t)
    }, next[t.st][1]))));
  }

  /* ========================================================== 7 · Dividir */
  const SPLIT_ITEMS = [['Cold brew tonic', 65], ['Matcha latte', 75], ['Frappé cookies', 90], ['Frappé cookies', 90], ['Concha', 30], ['Concha', 30], ['Rol de canela', 55], ['Latte vainilla', 70]];
  function MSplit() {
    const [acct, setAcct] = useState(SPLIT_ITEMS.map(() => 0));
    const [n, setN] = useState(1);
    const [sel, setSel] = useState([]);
    const [view, setView] = useState(0);
    const [toast, show] = useToast();
    const [done, setDone] = useState(false);
    const sum = k => SPLIT_ITEMS.reduce((s, it, i) => s + (acct[i] === k ? it[1] : 0), 0);
    const tog = i => setSel(s => s.includes(i) ? s.filter(x => x !== i) : [...s, i]);
    const moveTo = k => {
      setAcct(a => a.map((x, i) => sel.includes(i) ? k : x));
      setSel([]);
      setView(k);
      show(sel.length + (sel.length === 1 ? ' producto movido' : ' productos movidos') + ' a la cuenta 412.' + (k + 1));
    };
    const name = k => k === 0 ? 'Cuenta 1' : '412.' + (k + 1);
    const here = SPLIT_ITEMS.map((it, i) => [it, i]).filter(([, i]) => acct[i] === view);
    return /*#__PURE__*/React.createElement(Shell, {
      tab: "split",
      title: "Dividir cuenta",
      sub: 'Orden #412 · ' + n + (n === 1 ? ' cuenta' : ' cuentas'),
      back: "Orders.html",
      footer: sel.length ? /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          width: '100%'
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 'var(--text-xs)',
          color: 'var(--text-secondary)'
        }
      }, "Mover ", sel.length, " a\u2026"), /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          gap: 8,
          overflowX: 'auto'
        }
      }, Array.from({
        length: n
      }, (_, k) => k).filter(k => k !== view).map(k => /*#__PURE__*/React.createElement("button", {
        key: k,
        style: chip(false, {
          height: 44
        }),
        onClick: () => moveTo(k)
      }, name(k))), /*#__PURE__*/React.createElement("button", {
        style: chip(true, {
          height: 44
        }),
        onClick: () => {
          setN(n + 1);
          moveTo(n);
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "plus",
        size: 16
      }), "Nueva cuenta"))) : /*#__PURE__*/React.createElement("button", {
        style: btn('primary'),
        disabled: n < 2 || done,
        onClick: () => {
          setDone(true);
          show('División confirmada · ' + n + ' cuentas');
        }
      }, done ? 'División confirmada' : n < 2 ? 'Toca productos para separarlos' : 'Confirmar división'),
      overlay: /*#__PURE__*/React.createElement(Toast, {
        text: toast
      })
    }, /*#__PURE__*/React.createElement("div", {
      style: scrollX
    }, Array.from({
      length: n
    }, (_, k) => /*#__PURE__*/React.createElement("button", {
      key: k,
      onClick: () => {
        setView(k);
        setSel([]);
      },
      style: {
        ...font,
        ...card({
          padding: '10px 14px',
          minWidth: 110
        }),
        textAlign: 'left',
        cursor: 'pointer',
        color: 'var(--text-primary)',
        border: k === view ? '1px solid var(--text-primary)' : '1px solid transparent'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-xs)',
        color: 'var(--text-secondary)'
      }
    }, name(k), " \xB7 ", acct.filter(x => x === k).length), /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 'var(--weight-semibold)'
      }
    }, money(sum(k)))))), /*#__PURE__*/React.createElement("div", {
      style: row
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        ...label,
        flex: 1
      }
    }, name(view), " \xB7 toca para seleccionar"), here.length > 0 && /*#__PURE__*/React.createElement("button", {
      style: {
        ...font,
        border: 'none',
        background: 'none',
        color: 'var(--text-secondary)',
        fontSize: 'var(--text-xs)',
        cursor: 'pointer'
      },
      onClick: () => setSel(here.map(([, i]) => i))
    }, "Seleccionar todo")), here.length === 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        ...card(),
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: 'var(--text-sm)',
        padding: 30
      }
    }, "Cuenta vac\xEDa"), here.map(([[nm, p], i]) => {
      const on = sel.includes(i);
      return /*#__PURE__*/React.createElement("button", {
        key: i,
        onClick: () => tog(i),
        style: {
          ...font,
          ...card({
            padding: '12px 14px'
          }),
          ...row,
          cursor: 'pointer',
          color: 'var(--text-primary)',
          textAlign: 'left',
          border: on ? '1px solid var(--text-primary)' : '1px solid transparent'
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          width: 22,
          height: 22,
          borderRadius: 6,
          border: '2px solid var(--border-strong)',
          display: 'grid',
          placeItems: 'center',
          background: on ? 'var(--surface-inverse)' : 'transparent',
          color: 'var(--text-on-inverse)'
        }
      }, on && /*#__PURE__*/React.createElement(Icon, {
        name: "check",
        size: 14
      })), /*#__PURE__*/React.createElement("span", {
        style: {
          flex: 1
        }
      }, nm), /*#__PURE__*/React.createElement("span", {
        style: {
          color: 'var(--text-secondary)',
          fontVariantNumeric: 'tabular-nums'
        }
      }, p.toFixed(2)));
    }));
  }

  /* ============================================================ 8 · Cobrar */
  function MPayment() {
    const [data, setData] = useState(load);
    const id = getKey('compos-v2-pay');
    const order = data.orders.find(o => o.id === id) || data.orders.find(o => o.status !== 'cerrada') || data.orders[0];
    const t = order ? total(order) : 0;
    const [method, setMethod] = useState('Efectivo');
    const [amt, setAmt] = useState('');
    const [done, setDone] = useState(false);
    const got = amt === '' ? t : parseFloat(amt) || 0;
    const change = Math.max(0, got - t);
    const push = k => setAmt(a => k === 'del' ? a.slice(0, -1) : k === '.' && a.includes('.') ? a : (a + k).replace(/^0+(?=\d)/, '').slice(0, 8));
    const pay = () => {
      const d = load();
      const o = d.orders.find(x => x.id === order.id);
      if (o) {
        o.status = 'cerrada';
        o.paidWith = method;
      }
      save(d);
      setData(d);
      setDone(true);
    };
    const methods = [['Efectivo', 'banknote'], ['Débito', 'credit-card'], ['Crédito', 'credit-card'], ['Transf.', 'qr-code'], ['Vale', 'ticket']];
    if (!order) return /*#__PURE__*/React.createElement(Shell, {
      tab: "checks",
      title: "Cobrar",
      back: "Orders.html"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        color: 'var(--text-muted)',
        textAlign: 'center',
        padding: 60
      }
    }, "No hay \xF3rdenes por cobrar"));
    if (done) return /*#__PURE__*/React.createElement(Shell, {
      tab: "checks",
      title: "Cobrar",
      sub: 'Orden #' + order.id,
      footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
        style: btn('outline'),
        onClick: () => go('Orders.html')
      }, "Ver checks"), /*#__PURE__*/React.createElement("button", {
        style: btn('primary'),
        onClick: () => go('Menu.html')
      }, "Nueva orden"))
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 72,
        height: 72,
        borderRadius: 36,
        background: 'var(--mint-200)',
        color: 'var(--text-on-light)',
        display: 'grid',
        placeItems: 'center'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 34
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-h1)',
        fontWeight: 'var(--weight-semibold)'
      }
    }, "Pagado"), /*#__PURE__*/React.createElement("div", {
      style: {
        color: 'var(--text-secondary)'
      }
    }, money(t), " con ", method.toLowerCase(), method === 'Efectivo' && change > 0 ? ' · cambio ' + money(change) : ''), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-sm)',
        color: 'var(--text-muted)'
      }
    }, "Ticket enviado a la impresora")));
    return /*#__PURE__*/React.createElement(Shell, {
      tab: "checks",
      title: "Cobrar",
      sub: 'Orden #' + order.id + ' · ' + order.lines.reduce((s, l) => s + l.qty, 0) + ' productos',
      back: "Orders.html",
      right: /*#__PURE__*/React.createElement("button", {
        style: {
          ...font,
          border: 'none',
          background: 'none',
          color: 'var(--danger-ink)',
          fontSize: 'var(--text-sm)',
          cursor: 'pointer'
        },
        onClick: () => go('Orders.html')
      }, "Cancelar"),
      footer: /*#__PURE__*/React.createElement("button", {
        style: btn('primary'),
        disabled: method === 'Efectivo' && got < t,
        onClick: pay
      }, "Pagar ", money(t))
    }, /*#__PURE__*/React.createElement("div", {
      style: scrollX
    }, methods.map(([m, ic]) => /*#__PURE__*/React.createElement("button", {
      key: m,
      style: chip(m === method, {
        height: 44
      }),
      onClick: () => {
        setMethod(m);
        setAmt('');
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: ic,
      size: 16
    }), m))), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'center',
        padding: '4px 0'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-xs)',
        color: 'var(--text-secondary)'
      }
    }, method === 'Efectivo' ? 'Monto recibido' : 'Monto a cobrar'), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 40,
        fontWeight: 'var(--weight-semibold)',
        letterSpacing: 'var(--tracking-tight)',
        fontVariantNumeric: 'tabular-nums'
      }
    }, money(method === 'Efectivo' ? got : t)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-sm)',
        color: method === 'Efectivo' && got < t ? 'var(--danger-ink)' : 'var(--text-secondary)'
      }
    }, method === 'Efectivo' ? got < t ? 'Faltan ' + money(t - got) : 'Cambio ' + money(change) : 'Total con IVA ' + money(ivaOf(t).iva))), method === 'Efectivo' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 6
      }
    }, [['Exacto', ''], ['$50', '50'], ['$100', '100'], ['$200', '200'], ['$500', '500']].map(([l, v]) => /*#__PURE__*/React.createElement("button", {
      key: l,
      style: chip(amt === v, {
        flex: 1,
        justifyContent: 'center',
        padding: 0,
        height: 38
      }),
      onClick: () => setAmt(v)
    }, l))), /*#__PURE__*/React.createElement(Keypad, {
      onKey: push,
      decimal: true
    })) : /*#__PURE__*/React.createElement("div", {
      style: {
        ...card({
          padding: 20
        }),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        textAlign: 'center',
        marginTop: 8
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: method === 'Transf.' ? 'qr-code' : method === 'Vale' ? 'ticket' : 'nfc',
      size: 40
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 'var(--weight-semibold)'
      }
    }, method === 'Transf.' ? 'Muestra el QR de CoDi o la CLABE' : method === 'Vale' ? 'Escanea o escribe el folio del vale' : 'Acerca, inserta o desliza la tarjeta'), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-sm)',
        color: 'var(--text-secondary)'
      }
    }, "En la demo, toca Pagar para simular la aprobaci\xF3n.")), /*#__PURE__*/React.createElement("div", {
      style: {
        ...card(),
        fontSize: 'var(--text-sm)',
        color: 'var(--text-secondary)'
      }
    }, order.lines.map((l, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        ...row,
        padding: '3px 0'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }, l.qty, "\xD7 ", l.name), money(l.unit * l.qty)))));
  }

  /* ========================================================= 9 · Reembolso */
  const PAID = [{
    id: '412',
    at: '12:05',
    who: 'Mia Torres',
    via: 'Uber Eats',
    items: [['Cold brew tonic', 65], ['Matcha latte', 75], ['Frappé cookies', 90], ['Concha', 30]]
  }, {
    id: '407',
    at: '12:16',
    who: 'Grace Kim',
    via: 'Tarjeta',
    items: [['Cappuccino', 65], ['Rol de canela', 55], ['Rol de canela', 55]]
  }, {
    id: '401',
    at: '11:42',
    who: 'Omar Haddad',
    via: 'Tarjeta',
    items: [['Latte caramelo', 70], ['Croissant', 45]]
  }, {
    id: '391',
    at: '10:58',
    who: 'Ivy Chen',
    via: 'Rappi',
    items: [['Frappé moka', 85], ['Concha', 30]]
  }];
  function MRefund() {
    const [sel, setSel] = useState(null);
    const [items, setItems] = useState([]);
    const [why, setWhy] = useState(null);
    const [pin, setPin] = useState(false);
    const [toast, show] = useToast();
    const [done, setDone] = useState([]);
    const amt = sel ? items.reduce((s, i) => s + sel.items[i][1], 0) : 0;
    const reasons = ['Producto equivocado', 'Calidad', 'Tardó demasiado', 'Cobro duplicado', 'Otro'];
    const open = o => {
      setSel(o);
      setItems([]);
      setWhy(null);
    };
    return /*#__PURE__*/React.createElement(Shell, {
      tab: "refund",
      title: "Reembolso",
      sub: "Elige una cuenta pagada y luego los productos a devolver",
      overlay: /*#__PURE__*/React.createElement(React.Fragment, null, sel && /*#__PURE__*/React.createElement(Sheet, {
        title: 'Orden #' + sel.id,
        sub: 'Pagada ' + sel.at + ' · ' + sel.who + ' · ' + sel.via,
        onClose: () => setSel(null),
        footer: /*#__PURE__*/React.createElement("button", {
          style: btn('primary'),
          disabled: !items.length || !why,
          onClick: () => setPin(true)
        }, items.length && why ? 'Reembolsar ' + money(amt) : !items.length ? 'Elige productos' : 'Elige un motivo')
      }, /*#__PURE__*/React.createElement("div", {
        style: label
      }, "Productos"), sel.items.map(([n, p], i) => {
        const on = items.includes(i);
        return /*#__PURE__*/React.createElement("button", {
          key: i,
          onClick: () => setItems(s => on ? s.filter(x => x !== i) : [...s, i]),
          style: {
            ...font,
            ...card({
              padding: '12px 14px'
            }),
            ...row,
            cursor: 'pointer',
            color: 'var(--text-primary)',
            border: on ? '1px solid var(--text-primary)' : '1px solid transparent'
          }
        }, /*#__PURE__*/React.createElement("span", {
          style: {
            width: 22,
            height: 22,
            borderRadius: 6,
            border: '2px solid var(--border-strong)',
            display: 'grid',
            placeItems: 'center',
            background: on ? 'var(--surface-inverse)' : 'transparent',
            color: 'var(--text-on-inverse)'
          }
        }, on && /*#__PURE__*/React.createElement(Icon, {
          name: "check",
          size: 14
        })), /*#__PURE__*/React.createElement("span", {
          style: {
            flex: 1,
            textAlign: 'left'
          }
        }, n), money(p));
      }), /*#__PURE__*/React.createElement("div", {
        style: label
      }, "Motivo"), /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8
        }
      }, reasons.map(r => /*#__PURE__*/React.createElement("button", {
        key: r,
        style: chip(r === why),
        onClick: () => setWhy(r)
      }, r))), /*#__PURE__*/React.createElement("div", {
        style: {
          ...card(),
          fontSize: 'var(--text-sm)',
          color: 'var(--text-secondary)',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          marginBottom: 4
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: row
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          flex: 1
        }
      }, items.length, " productos \xB7 regresa v\xEDa ", sel.via)), /*#__PURE__*/React.createElement("div", {
        style: row
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          flex: 1
        }
      }, "IVA 16% incluido"), money(ivaOf(amt).iva)), /*#__PURE__*/React.createElement("div", {
        style: {
          ...row,
          color: 'var(--text-primary)',
          fontWeight: 'var(--weight-semibold)',
          fontSize: 'var(--text-h3)'
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          flex: 1
        }
      }, "Reembolso"), money(amt)))), pin && /*#__PURE__*/React.createElement(ManagerPin, {
        why: 'Autoriza el reembolso de ' + money(amt),
        onClose: () => setPin(false),
        onOk: () => {
          setPin(false);
          setDone(d => [...d, sel.id]);
          show('Reembolso de ' + money(amt) + ' autorizado');
          setSel(null);
        }
      }), /*#__PURE__*/React.createElement(Toast, {
        text: toast
      }))
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...row,
        ...card({
          padding: '0 12px',
          height: 46
        })
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "search",
      size: 18
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--text-muted)',
        fontSize: 'var(--text-sm)'
      }
    }, "Busca por orden o cliente")), PAID.map(o => {
      const r = done.includes(o.id);
      return /*#__PURE__*/React.createElement("button", {
        key: o.id,
        disabled: r,
        onClick: () => open(o),
        style: {
          ...font,
          ...card(),
          ...row,
          textAlign: 'left',
          cursor: r ? 'default' : 'pointer',
          color: 'var(--text-primary)',
          border: '1px solid var(--border-hairline)',
          opacity: r ? .55 : 1
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontWeight: 'var(--weight-semibold)'
        }
      }, "Orden #", o.id, " ", /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 'var(--text-xs)',
          color: 'var(--text-secondary)',
          fontWeight: 'var(--weight-regular)'
        }
      }, "Pagada ", o.at)), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 'var(--text-xs)',
          color: 'var(--text-secondary)'
        }
      }, o.who, " \xB7 ", o.via)), /*#__PURE__*/React.createElement("span", {
        style: {
          fontWeight: 'var(--weight-semibold)'
        }
      }, r ? 'Reembolsada' : money(o.items.reduce((s, i) => s + i[1], 0))), !r && /*#__PURE__*/React.createElement(Icon, {
        name: "chevron-right",
        size: 18
      }));
    }));
  }

  /* ============================================================ 10 · Buscar */
  function MSearch() {
    const [q, setQ] = useState('la');
    const [f, setF] = useState('todas');
    const s = q.trim().toLowerCase();
    const prods = s ? ALL.filter(i => i.name.toLowerCase().includes(s)) : [];
    const orders = s ? load().orders.filter(o => o.id.toLowerCase().includes(s) || o.lines.some(l => l.name.toLowerCase().includes(s))) : [];
    const people = s ? ['Lena Park', 'Daniel Ruiz', 'Mia Torres', 'Grace Kim', 'Carla Núñez'].filter(n => n.toLowerCase().includes(s)) : [];
    const mark = t => {
      const i = t.toLowerCase().indexOf(s);
      if (!s || i < 0) return t;
      return [t.slice(0, i), /*#__PURE__*/React.createElement("mark", {
        key: "m",
        style: {
          background: 'var(--periwinkle-200)',
          color: 'var(--text-on-light)',
          borderRadius: 3
        }
      }, t.slice(i, i + s.length)), t.slice(i + s.length)];
    };
    const show = k => f === 'todas' || f === k;
    return /*#__PURE__*/React.createElement(Shell, {
      tab: "search",
      title: "Buscar",
      back: "Menu.html"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...row,
        ...card({
          padding: '0 12px',
          height: 48
        }),
        border: '1px solid var(--border-strong)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "search",
      size: 18
    }), /*#__PURE__*/React.createElement("input", {
      value: q,
      onChange: e => setQ(e.target.value),
      placeholder: "Platillo, orden o cliente",
      style: {
        ...font,
        flex: 1,
        minWidth: 0,
        background: 'transparent',
        border: 'none',
        outline: 'none',
        color: 'var(--text-primary)',
        fontSize: 'var(--text-body)'
      }
    }), q && /*#__PURE__*/React.createElement("button", {
      "aria-label": "Borrar",
      onClick: () => setQ(''),
      style: {
        border: 'none',
        background: 'none',
        color: 'var(--text-secondary)',
        cursor: 'pointer',
        display: 'flex'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "x",
      size: 18
    }))), /*#__PURE__*/React.createElement(Chips, {
      items: [['todas', 'Todas', prods.length + orders.length + people.length], ['menu', 'Menú', prods.length], ['cuentas', 'Cuentas', orders.length], ['clientes', 'Clientes', people.length]],
      value: f,
      onChange: setF
    }), show('cuentas') && orders.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: label
    }, "Cuentas \xB7 ", orders.length), orders.map(o => /*#__PURE__*/React.createElement("button", {
      key: o.id,
      onClick: () => go('Orders.html'),
      style: {
        ...font,
        ...card({
          padding: '12px 14px'
        }),
        ...row,
        border: 'none',
        textAlign: 'left',
        cursor: 'pointer',
        color: 'var(--text-primary)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "receipt",
      size: 18
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 'var(--weight-semibold)'
      }
    }, "Orden #", o.id), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-xs)',
        color: 'var(--text-secondary)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }, o.lines.map(l => l.name).join(', '))), /*#__PURE__*/React.createElement("span", {
      style: chip(false, {
        height: 26,
        padding: '0 10px',
        fontSize: 11,
        cursor: 'inherit'
      })
    }, o.status === 'cerrada' ? 'Cerrada' : 'Abierta')))), show('menu') && prods.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: label
    }, "Productos \xB7 ", prods.length), prods.map(p => /*#__PURE__*/React.createElement("button", {
      key: p.name,
      onClick: () => go('Menu.html' + (OPTIONS[p.cat.id] ? '#opciones=' + encodeURIComponent(p.name) : '')),
      style: {
        ...font,
        ...card({
          padding: '12px 14px'
        }),
        ...row,
        border: 'none',
        borderLeft: '4px solid ' + p.cat.color,
        textAlign: 'left',
        cursor: 'pointer',
        color: 'var(--text-primary)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 'var(--weight-medium)'
      }
    }, mark(p.name)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-xs)',
        color: 'var(--text-secondary)'
      }
    }, p.cat.name)), money(p.price)))), show('clientes') && people.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: label
    }, "Clientes \xB7 ", people.length), people.map(n => /*#__PURE__*/React.createElement("div", {
      key: n,
      style: {
        ...card({
          padding: '12px 14px'
        }),
        ...row
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 32,
        height: 32,
        borderRadius: 16,
        background: 'var(--lilac-200)',
        color: 'var(--text-on-light)',
        display: 'grid',
        placeItems: 'center',
        fontWeight: 600
      }
    }, n[0]), /*#__PURE__*/React.createElement("span", null, mark(n))))), s && !prods.length && !orders.length && !people.length && /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'center',
        color: 'var(--text-muted)',
        padding: '50px 0',
        fontSize: 'var(--text-sm)'
      }
    }, "Sin resultados para \u201C", q, "\u201D"));
  }

  /* ========================================================== 11 · Reportes */
  const PERIODS = {
    hoy: {
      v: 23387,
      o: 64,
      d: 60,
      k: '7m 40s',
      hours: [600, 1500, 2500, 1900, 1750, 2900, 3200, 1900, 1100, 1650, 2500]
    },
    semana: {
      v: 148220,
      o: 402,
      d: 57,
      k: '8m 05s',
      hours: [900, 1800, 2600, 2300, 2000, 3100, 3300, 2400, 1500, 1900, 2700]
    },
    mes: {
      v: 611480,
      o: 1688,
      d: 58,
      k: '7m 52s',
      hours: [800, 1700, 2700, 2100, 1900, 3000, 3400, 2200, 1300, 1800, 2600]
    }
  };
  function MReports() {
    const [p, setP] = useState('hoy');
    const [toast, show] = useToast();
    const d = PERIODS[p];
    const max = Math.max(...d.hours);
    const plats = [['Uber Eats', 'var(--mint-200)', 17, 7174, .30], ['Rappi', 'var(--rose-200)', 9, 4146, .25], ['DiDi Food', 'var(--order-warn)', 7, 2818, .22]];
    const top = [['Latte vainilla', 'Con café', 148], ['Frappé cookies', 'Frappés', 96], ['Americano naranja', 'Con café', 61], ['Concha', 'Panadería', 58], ['Matcha latte', 'Sin café', 44]];
    return /*#__PURE__*/React.createElement(Shell, {
      tab: "reports",
      title: "Reportes",
      right: /*#__PURE__*/React.createElement("button", {
        "aria-label": "Exportar",
        style: iconBtn,
        onClick: () => show('Reporte exportado a CSV')
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "download",
        size: 20
      })),
      overlay: /*#__PURE__*/React.createElement(Toast, {
        text: toast
      })
    }, /*#__PURE__*/React.createElement(Segmented, {
      items: [['hoy', 'Hoy'], ['semana', 'Semana'], ['mes', 'Mes']],
      value: p,
      onChange: setP
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: card({
        background: 'var(--periwinkle-200)',
        color: 'var(--text-on-light)',
        gridColumn: '1 / -1'
      })
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "wallet",
      size: 18
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-xs)',
        marginTop: 6
      }
    }, "Ventas brutas"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-h1)',
        fontWeight: 'var(--weight-semibold)'
      }
    }, money(d.v))), [['receipt', 'Órdenes', d.o], ['bike', 'Domicilio', d.d + '%'], ['chef-hat', 'Prom. cocina', d.k]].map(([ic, l, v]) => /*#__PURE__*/React.createElement("div", {
      key: l,
      style: card({
        padding: 12
      })
    }, /*#__PURE__*/React.createElement(Icon, {
      name: ic,
      size: 16
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-xs)',
        color: 'var(--text-secondary)',
        marginTop: 6
      }
    }, l), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-h3)',
        fontWeight: 'var(--weight-semibold)'
      }
    }, v)))), /*#__PURE__*/React.createElement("div", {
      style: card()
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 'var(--weight-semibold)',
        marginBottom: 4
      }
    }, "Desglose de domicilio"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-xs)',
        color: 'var(--text-secondary)',
        marginBottom: 10
      }
    }, "Comisi\xF3n de plataforma y pago neto"), plats.map(([n, c, o, b, fee]) => /*#__PURE__*/React.createElement("div", {
      key: n,
      style: {
        padding: '8px 0',
        borderTop: '1px solid var(--border-hairline)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: row
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 8,
        height: 8,
        borderRadius: 4,
        background: ink(c)
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        fontWeight: 'var(--weight-medium)'
      }
    }, n), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--text-sm)'
      }
    }, money(b * (1 - fee)))), /*#__PURE__*/React.createElement("div", {
      style: {
        ...row,
        fontSize: 'var(--text-xs)',
        color: 'var(--text-secondary)',
        marginTop: 3
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }, o, " \xF3rdenes \xB7 bruto ", money(b)), /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--danger-ink)'
      }
    }, "-", money(b * fee), " \xB7 ", Math.round(fee * 100), "%"))))), /*#__PURE__*/React.createElement("div", {
      style: card()
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 'var(--weight-semibold)',
        marginBottom: 10
      }
    }, "Ventas por hora"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'flex-end',
        gap: 5,
        height: 120
      }
    }, d.hours.map((v, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        height: '100%',
        justifyContent: 'flex-end'
      }
    }, /*#__PURE__*/React.createElement("div", {
      title: money(v),
      style: {
        width: '100%',
        height: v / max * 100 + '%',
        background: 'var(--mint-200)',
        borderRadius: '4px 4px 0 0'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 9,
        color: 'var(--text-muted)'
      }
    }, 7 + i))))), /*#__PURE__*/React.createElement("div", {
      style: card()
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 'var(--weight-semibold)',
        marginBottom: 6
      }
    }, "M\xE1s vendidos"), top.map(([n, c, v], i) => /*#__PURE__*/React.createElement("div", {
      key: n,
      style: {
        ...row,
        padding: '7px 0',
        fontSize: 'var(--text-sm)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--text-muted)',
        width: 14
      }
    }, i + 1), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 'var(--weight-medium)'
      }
    }, n), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-xs)',
        color: 'var(--text-secondary)'
      }
    }, c)), /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--text-secondary)'
      }
    }, v, " vendidos")))));
  }

  /* ========================================================== 12 · Ajustes */
  const SECTIONS = [['general', 'store', 'General'], ['impuestos', 'percent', 'Impuestos y cargos'], ['tipos', 'clock', 'Tipos de orden y tiempos'], ['plataformas', 'bike', 'Plataformas de domicilio'], ['dispositivos', 'printer', 'Impresoras y dispositivos'], ['pagos', 'credit-card', 'Pagos y propinas'], ['personal', 'shield-check', 'Personal y permisos'], ['apariencia', 'palette', 'Apariencia']];
  function MSettings() {
    const [sec, setSec] = useState(null);
    const [cur, setCur] = useState('MXN');
    const [h24, setH24] = useState(true);
    const [lang, setLang] = useState('Español');
    const [perm, setPerm] = useState({
      desc: false,
      anul: false,
      reemb: false,
      cajon: true
    });
    const [pin, setPin] = useState(false);
    const [toast, show] = useToast();
    const [theme, setTheme] = useState(() => getKey('compos-theme') || 'default');
    const field = (l, v, sub) => /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--text-sm)',
        fontWeight: 'var(--weight-medium)'
      }
    }, l), sub && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--text-xs)',
        color: 'var(--text-muted)',
        marginTop: -4
      }
    }, sub), /*#__PURE__*/React.createElement("input", {
      defaultValue: v,
      style: {
        ...font,
        height: 46,
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--border-strong)',
        background: 'var(--surface-card)',
        color: 'var(--text-primary)',
        padding: '0 12px',
        fontSize: 'var(--text-body)'
      }
    }));
    const opts = (vals, v, set) => /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 6
      }
    }, vals.map(x => /*#__PURE__*/React.createElement("button", {
      key: x,
      style: chip(x === v, {
        height: 34,
        padding: '0 12px'
      }),
      onClick: () => set(x)
    }, x)));
    const line = (l, ctrl) => /*#__PURE__*/React.createElement("div", {
      key: l,
      style: {
        ...row,
        justifyContent: 'space-between',
        padding: '12px 0',
        borderTop: '1px solid var(--border-hairline)',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--text-sm)',
        fontWeight: 'var(--weight-medium)'
      }
    }, l), ctrl);
    const THEMES = [['default', 'Oscuro'], ['light', 'Claro'], ['hc', 'Alto contraste'], ['blue', 'Azul']];
    const pickTheme = id => {
      setTheme(id);
      if (window.composSetTheme) window.composSetTheme(id);
    };
    const body = {
      general: /*#__PURE__*/React.createElement(React.Fragment, null, field('Nombre del negocio', 'Ollie Coffee — Centro'), field('Dirección', 'Calle Ángel Flores 210, Centro', 'Se imprime en los tickets'), line('Moneda', opts(['USD', 'MXN', 'EUR'], cur, setCur)), line('Reloj de 24 horas', /*#__PURE__*/React.createElement(Toggle, {
        on: h24,
        onChange: setH24
      })), line('Idioma', opts(['English', 'Español'], lang, setLang))),
      personal: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 'var(--text-sm)',
          color: 'var(--text-secondary)'
        }
      }, "Qu\xE9 puede hacer el personal sin PIN de gerente"), [['desc', 'Aplicar descuentos'], ['anul', 'Anular productos enviados'], ['reemb', 'Reembolsar'], ['cajon', 'Abrir el cajón sin venta']].map(([k, l]) => line(l, /*#__PURE__*/React.createElement(Toggle, {
        on: perm[k],
        onChange: v => setPerm({
          ...perm,
          [k]: v
        })
      })))),
      apariencia: /*#__PURE__*/React.createElement(React.Fragment, null, THEMES.map(([id, l]) => line(l, /*#__PURE__*/React.createElement("button", {
        style: chip(theme === id, {
          height: 34
        }),
        onClick: () => pickTheme(id)
      }, theme === id ? 'Activo' : 'Usar'))), /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          padding: '12px 0',
          borderTop: '1px solid var(--border-hairline)'
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 'var(--text-sm)',
          fontWeight: 'var(--weight-medium)'
        }
      }, "Tu color"), /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          gap: 10,
          flexWrap: 'wrap'
        }
      }, (window.COMPOS_COLORS || []).map(c => {
        const id = 'custom:' + c.hex,
          on = theme === id;
        return /*#__PURE__*/React.createElement("button", {
          key: c.id,
          "aria-label": c.label,
          "aria-pressed": on,
          onClick: () => pickTheme(id),
          style: {
            width: 40,
            height: 40,
            borderRadius: 20,
            cursor: 'pointer',
            background: c.hex,
            border: '3px solid ' + (on ? 'var(--text-primary)' : 'transparent'),
            boxShadow: 'inset 0 0 0 2px var(--surface-panel)'
          }
        });
      }))))
    };
    const saveIt = () => {
      if (sec === 'personal') setPin(true);else show('Cambios guardados');
    };
    if (sec) {
      const s = SECTIONS.find(x => x[0] === sec);
      return /*#__PURE__*/React.createElement(Shell, {
        tab: "settings",
        title: s[2],
        right: /*#__PURE__*/React.createElement("button", {
          "aria-label": "Atr\xE1s",
          style: iconBtn,
          onClick: () => setSec(null)
        }, /*#__PURE__*/React.createElement(Icon, {
          name: "x",
          size: 20
        })),
        footer: /*#__PURE__*/React.createElement("button", {
          style: btn('primary'),
          onClick: saveIt
        }, "Guardar"),
        overlay: /*#__PURE__*/React.createElement(React.Fragment, null, pin && /*#__PURE__*/React.createElement(ManagerPin, {
          why: "Los cambios de permisos piden autorizaci\xF3n",
          onClose: () => setPin(false),
          onOk: () => {
            setPin(false);
            show('Permisos actualizados');
          }
        }), /*#__PURE__*/React.createElement(Toast, {
          text: toast
        }))
      }, body[sec] || /*#__PURE__*/React.createElement("div", {
        style: {
          ...card({
            padding: 24
          }),
          textAlign: 'center',
          color: 'var(--text-secondary)',
          fontSize: 'var(--text-sm)'
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: s[1],
        size: 28
      }), /*#__PURE__*/React.createElement("div", {
        style: {
          marginTop: 8
        }
      }, "Esta secci\xF3n est\xE1 en la app completa. En la demo prueba General, Personal y permisos o Apariencia.")));
    }
    return /*#__PURE__*/React.createElement(Shell, {
      tab: "settings",
      title: "Ajustes",
      sub: "Ollie Coffee \u2014 Centro"
    }, /*#__PURE__*/React.createElement("div", {
      style: card({
        padding: '4px 14px'
      })
    }, SECTIONS.map(([id, ic, l], i) => /*#__PURE__*/React.createElement("button", {
      key: id,
      onClick: () => setSec(id),
      style: {
        ...font,
        ...row,
        width: '100%',
        border: 'none',
        borderTop: i ? '1px solid var(--border-hairline)' : 'none',
        background: 'none',
        color: 'var(--text-primary)',
        cursor: 'pointer',
        padding: '14px 0',
        fontSize: 'var(--text-body)',
        textAlign: 'left'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: ic,
      size: 18
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }, l), /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-right",
      size: 18
    })))), /*#__PURE__*/React.createElement("button", {
      style: btn('danger', {
        flex: '0 0 auto'
      }),
      onClick: () => go('index.html')
    }, "Salir"));
  }
  Object.assign(window, {
    MLogin,
    MShift,
    MIncoming,
    MMenu,
    MChecks,
    MKitchen,
    MSplit,
    MPayment,
    MRefund,
    MSearch,
    MReports,
    MSettings
  });
})();