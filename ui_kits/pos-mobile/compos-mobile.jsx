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
const { Icon } = window.ComposDesignSystem_9739cd;
const h = React.createElement;
const { useState, useEffect } = React;

/* ------------------------------------------------------------------ datos */
const CATS = [
  { id:'cafe', name:'Con café', icon:'coffee', color:'var(--sage-200)', items:[
    ['Americano espresso', 45], ['Americano naranja', 70], ['Americano limón', 70], ['Espresso tonic', 65],
    ['Cold brew tonic', 65], ['Cappuccino', 65], ['Flat white', 65], ['Latte natural', 60], ['Latte vainilla', 70],
    ['Latte caramelo', 70], ['Mocha', 72], ['Espresso doble', 40], ['Cortado', 50]] },
  { id:'frappe', name:'Frappés', icon:'cup-soda', color:'var(--lilac-200)', items:[
    ['Frappé moka', 85], ['Frappé caramelo', 85], ['Frappé cookies', 90], ['Frappé matcha', 90],
    ['Frappé taro', 90], ['Frappé chai', 85], ['Frappé fresa', 85]] },
  { id:'sincafe', name:'Sin café', icon:'leaf', color:'var(--sky-200)', items:[
    ['Matcha latte', 75], ['Chai latte', 70], ['Chocolate', 60], ['Taro latte', 75]] },
  { id:'pan', name:'Panadería', icon:'croissant', color:'var(--rose-200)', items:[
    ['Croissant', 45], ['Concha', 30], ['Rol de canela', 55]] },
];
const OPTIONS = {
  cafe: [{ name:'Extras', max:2, options:[['Shot de espresso', 15], ['Jarabe extra', 15]] }],
  frappe: [{ name:'Extras', max:2, options:[['Crema batida', 10], ['Shot de espresso', 15], ['Jarabe extra', 15]] }],
  sincafe: [{ name:'Leche', max:1, options:[['Entera', 0], ['Deslactosada', 0], ['Avena', 12], ['Almendra', 12]] }],
};
const ALL = CATS.flatMap((c) => c.items.map(([name, price]) => ({ name, price, cat:c })));
const MODES = [['Aquí', 'utensils'], ['Domicilio', 'bike'], ['Pickup', 'shopping-bag']];
const money = (n) => (n < 0 ? '-$' : '$') + Math.abs(n).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
const ivaOf = (t) => { const sub = Math.round(t / 1.16 * 100) / 100; return { sub, iva:Math.round((t - sub) * 100) / 100 }; };
const ink = (v) => (window.inkOf ? window.inkOf(v) : v);

/* ---------------------------- estado compartido con las pantallas de tablet */
const KEY = 'compos-v2';
const seed = () => ({ seq:1, orders:[{ id:'A-0001', mode:'Aquí', status:'abierta', opened:Date.now() - 28000,
  lines:[{ name:'Americano naranja', unit:85, base:70, qty:1, mods:['Shot de espresso'] }] }] });
const load = () => { try { const d = JSON.parse(localStorage.getItem(KEY)); if (d && Array.isArray(d.orders)) return d; } catch (e) {} return seed(); };
const save = (d) => { try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) {} };
const nextId = (d) => { d.seq = (d.seq || 0) + 1; return 'A-' + String(d.seq).padStart(4, '0'); };
const go = (file, extra) => { try { if (extra) Object.entries(extra).forEach(([k, v]) => localStorage.setItem(k, v)); } catch (e) {} location.href = file; };
const getKey = (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } };
const total = (o) => o.lines.reduce((s, l) => s + l.unit * l.qty, 0);
const useTick = (ms) => { const [, set] = useState(0); useEffect(() => { const t = setInterval(() => set((x) => x + 1), ms || 1000); return () => clearInterval(t); }, []); };
const clock = (sec) => String(Math.floor(sec / 60)).padStart(2, '0') + ':' + String(Math.max(0, sec) % 60).padStart(2, '0');

/* ------------------------------------------------------------ primitivas */
const font = { fontFamily:'inherit' };
const btn = (kind, extra) => ({ ...font, height:52, flex:1, minWidth:0, borderRadius:'var(--radius-pill)', fontSize:'var(--text-body)', fontWeight:'var(--weight-semibold)', cursor:'pointer',
  border: kind === 'outline' ? '1px solid var(--border-strong)' : kind === 'danger' ? '1px solid var(--danger-ink)' : '1px solid transparent',
  background: kind === 'primary' ? 'var(--surface-inverse)' : 'transparent',
  color: kind === 'primary' ? 'var(--text-on-inverse)' : kind === 'danger' ? 'var(--danger-ink)' : 'var(--text-primary)', ...extra });
const chip = (on, extra) => ({ ...font, flex:'0 0 auto', height:38, padding:'0 14px', borderRadius:'var(--radius-pill)', display:'inline-flex', alignItems:'center', gap:6,
  border: on ? '1px solid transparent' : '1px solid var(--border-strong)', background: on ? 'var(--surface-inverse)' : 'transparent',
  color: on ? 'var(--text-on-inverse)' : 'var(--text-primary)', fontSize:'var(--text-sm)', fontWeight:'var(--weight-semibold)', cursor:'pointer', whiteSpace:'nowrap', ...extra });
const card = (extra) => ({ background:'var(--surface-card)', borderRadius:'var(--radius-md)', padding:14, ...extra });
const iconBtn = { width:44, height:44, borderRadius:'var(--radius-sm)', border:'none', background:'var(--surface-raised)', color:'var(--text-primary)', display:'inline-flex', alignItems:'center', justifyContent:'center', cursor:'pointer', flex:'0 0 auto' };
const label = { fontSize:'var(--text-xs)', letterSpacing:'var(--tracking-wide)', color:'var(--text-muted)', textTransform:'uppercase' };
const row = { display:'flex', alignItems:'center', gap:10 };
const scrollX = { display:'flex', gap:8, overflowX:'auto', scrollbarWidth:'none', flex:'0 0 auto' };

function Chips({ items, value, onChange }) {
  return <div style={scrollX}>{items.map(([id, text, n, ic]) => (
    <button key={id} style={chip(id === value)} onClick={() => onChange(id)}>
      {ic && <Icon name={ic} size={16} />}{text}{n !== undefined && <span style={{ opacity:.7, fontWeight:'var(--weight-medium)' }}>{n}</span>}
    </button>))}</div>;
}

function Segmented({ items, value, onChange }) {
  return (
    <div style={{ display:'flex', background:'var(--surface-raised)', borderRadius:'var(--radius-pill)', padding:4, gap:4, flex:'0 0 auto' }}>
      {items.map(([id, text, n]) => (
        <button key={id} onClick={() => onChange(id)} style={{ ...font, flex:1, height:36, border:'none', borderRadius:'var(--radius-pill)', cursor:'pointer',
          background: id === value ? 'var(--surface-inverse)' : 'transparent', color: id === value ? 'var(--text-on-inverse)' : 'var(--text-primary)',
          fontSize:'var(--text-sm)', fontWeight:'var(--weight-semibold)', whiteSpace:'nowrap' }}>{text}{n !== undefined ? ' · ' + n : ''}</button>))}
    </div>
  );
}

function Toggle({ on, onChange }) {
  return (
    <button role="switch" aria-checked={on} onClick={() => onChange(!on)} style={{ width:48, height:28, borderRadius:14, border:'none', padding:3, cursor:'pointer', flex:'0 0 auto',
      background: on ? 'var(--surface-inverse)' : 'var(--surface-raised)', display:'flex', justifyContent: on ? 'flex-end' : 'flex-start', transition:'all 150ms' }}>
      <span style={{ width:22, height:22, borderRadius:11, background: on ? 'var(--text-on-inverse)' : 'var(--text-secondary)' }} />
    </button>
  );
}

function Keypad({ onKey, decimal }) {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', decimal ? '.' : '', '0', 'del'];
  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:10 }}>
      {keys.map((k, i) => k === '' ? <span key={i} /> : (
        <button key={i} onClick={() => onKey(k)} aria-label={k === 'del' ? 'Borrar' : k} style={{ ...font, height:58, borderRadius:'var(--radius-sm)', border:'none', cursor:'pointer',
          background:'var(--surface-raised)', color: k === 'del' ? 'var(--danger-ink)' : 'var(--text-primary)', fontSize:'var(--text-h2)', fontWeight:'var(--weight-medium)',
          display:'flex', alignItems:'center', justifyContent:'center' }}>{k === 'del' ? <Icon name="delete" size={22} /> : k}</button>))}
    </div>
  );
}

function Dots({ n }) {
  return <div style={{ display:'flex', gap:16, justifyContent:'center' }}>{[0, 1, 2, 3].map((i) => (
    <span key={i} style={{ width:14, height:14, borderRadius:7, background: i < n ? 'var(--surface-inverse)' : 'transparent', border:'2px solid ' + (i < n ? 'transparent' : 'var(--border-strong)'), boxSizing:'border-box', transition:'background 120ms' }} />))}</div>;
}

function Sheet({ title, sub, onClose, children, footer }) {
  return (
    <div onClick={onClose} style={{ position:'absolute', inset:0, background:'rgba(0,0,0,.5)', zIndex:20, display:'flex', alignItems:'flex-end' }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width:'100%', maxHeight:'88%', background:'var(--surface-panel)', borderRadius:'24px 24px 0 0',
        display:'flex', flexDirection:'column', animation:'msheet 220ms var(--ease-standard, ease)' }}>
        <div style={{ width:40, height:4, borderRadius:2, background:'var(--border-strong)', margin:'10px auto 4px' }} />
        <div style={{ ...row, padding:'8px 16px 10px' }}>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:'var(--text-h3)', fontWeight:'var(--weight-semibold)' }}>{title}</div>
            {sub && <div style={{ fontSize:'var(--text-sm)', color:'var(--text-secondary)' }}>{sub}</div>}
          </div>
          <button aria-label="Cerrar" style={iconBtn} onClick={onClose}><Icon name="x" size={20} /></button>
        </div>
        <div style={{ overflowY:'auto', padding:'0 16px', display:'flex', flexDirection:'column', gap:10, minHeight:0 }}>{children}</div>
        {footer && <div style={{ display:'flex', gap:10, padding:'14px 16px 20px' }}>{footer}</div>}
      </div>
    </div>
  );
}

function Toast({ text }) {
  if (!text) return null;
  return <div style={{ position:'absolute', left:16, right:16, bottom:96, zIndex:30, background:'var(--surface-inverse)', color:'var(--text-on-inverse)', borderRadius:'var(--radius-md)',
    padding:'12px 14px', fontSize:'var(--text-sm)', fontWeight:'var(--weight-medium)', ...row }}><Icon name="circle-check" size={18} />{text}</div>;
}
const useToast = () => { const [t, set] = useState(''); const show = (s) => { set(s); clearTimeout(window.__mt); window.__mt = setTimeout(() => set(''), 2200); }; return [t, show]; };

function ManagerPin({ onClose, onOk, why }) {
  const [pin, setPin] = useState(''); const [bad, setBad] = useState(false);
  const push = (k) => {
    if (k === 'del') return setPin((p) => p.slice(0, -1));
    const n = (pin + k).slice(0, 4); setPin(n); setBad(false);
    if (n.length === 4) setTimeout(() => { if (n === '1234') onOk(); else { setBad(true); setPin(''); } }, 200);
  };
  return (
    <Sheet title="PIN de gerente" sub={why} onClose={onClose}>
      <div style={{ display:'flex', flexDirection:'column', gap:18, padding:'8px 0 20px' }}>
        <Dots n={pin.length} />
        <div style={{ textAlign:'center', fontSize:'var(--text-sm)', color: bad ? 'var(--danger-ink)' : 'var(--text-secondary)' }}>{bad ? 'PIN incorrecto, intenta de nuevo' : 'Demo: el PIN de gerente es 1234'}</div>
        <Keypad onKey={push} />
      </div>
    </Sheet>
  );
}

/* --------------------------------------------------------------- shell */
const NAV = [['menu', 'circle-plus', 'Nueva orden', 'Menu.html'], ['checks', 'clipboard-list', 'Checks', 'Orders.html'], ['incoming', 'bell-ring', 'Entrantes', 'Incoming.html', '4'],
  ['cocina', 'chef-hat', 'Cocina', 'Kitchen.html'], ['turno', 'history', 'Turno', 'Shift.html'], ['split', 'split', 'Dividir cuenta', 'Split.html'], ['refund', 'undo-2', 'Reembolso', 'Refund.html'],
  ['search', 'search', 'Buscar', 'Search.html'], ['reports', 'chart-column', 'Reportes', 'Reports.html'], ['settings', 'settings', 'Ajustes', 'Settings.html']];
try { const st = document.createElement('style'); st.textContent = '@keyframes mdrawer{from{transform:translateX(-100%)}to{transform:none}}@keyframes mscrim{from{opacity:0}to{opacity:1}}'; document.head.appendChild(st); } catch (e) {}

function StatusBar() {
  return (
    <div style={{ height:44, flex:'0 0 auto', display:'flex', alignItems:'center', padding:'0 26px', fontSize:15, fontWeight:600, position:'relative' }}>
      9:41
      <span style={{ position:'absolute', left:'50%', transform:'translateX(-50%)', top:10, width:110, height:30, borderRadius:20, background:'#000' }} />
      <span style={{ marginLeft:'auto', display:'inline-flex', gap:6, alignItems:'center' }}>
        <Icon name="signal" size={15} /><Icon name="wifi" size={15} /><Icon name="battery-full" size={18} />
      </span>
    </div>
  );
}

/* Menú de navegación: oculto siempre; la hamburguesa lo abre encima de todo, sin mover el contenido. */
function Drawer({ tab, onClose }) {
  useEffect(() => { const k = (e) => { if (e.key === 'Escape') onClose(); }; window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k); }, []);
  const item = (id, ic, text, file, badge, danger) => {
    const on = id === tab;
    return (
      <button key={id} onClick={() => (on ? onClose() : go(file))} aria-current={on ? 'page' : undefined} style={{ ...font, ...row, gap:14, width:'100%', height:52, padding:'0 16px', border:'none', borderRadius:'var(--radius-sm)', cursor:'pointer',
        background: on ? 'var(--surface-inverse)' : 'transparent', color: on ? 'var(--text-on-inverse)' : danger ? 'var(--danger-ink)' : 'var(--text-primary)',
        fontSize:'var(--text-body)', fontWeight:'var(--weight-medium)', textAlign:'left' }}>
        <Icon name={ic} size={22} /><span style={{ flex:1 }}>{text}</span>
        {badge && <span style={{ minWidth:22, height:22, borderRadius:11, background:'var(--danger-ink)', color:'#fff', fontSize:12, fontWeight:600, display:'grid', placeItems:'center' }}>{badge}</span>}
      </button>
    );
  };
  return (
    <div style={{ position:'absolute', inset:0, zIndex:50 }}>
      <div onClick={onClose} style={{ position:'absolute', inset:0, background:'rgba(0,0,0,.55)', animation:'mscrim 200ms ease' }} />
      <nav aria-label="Navegación" style={{ position:'absolute', top:0, bottom:0, left:0, width:'82%', maxWidth:320, background:'var(--surface-panel)', borderRadius:'0 24px 24px 0',
        display:'flex', flexDirection:'column', boxShadow:'var(--shadow-float, 0 20px 50px rgba(0,0,0,.4))', animation:'mdrawer 220ms var(--ease-standard, ease)' }}>
        <StatusBar />
        <div style={{ ...row, gap:12, padding:'6px 16px 16px' }}>
          <span style={{ width:44, height:44, borderRadius:22, background:'var(--periwinkle-200)', color:'var(--text-on-light)', display:'grid', placeItems:'center', fontWeight:600 }}>I</span>
          <div style={{ flex:1, minWidth:0 }}><div style={{ fontWeight:'var(--weight-semibold)' }}>Isaac</div><div style={{ fontSize:'var(--text-xs)', color:'var(--text-secondary)' }}>Administrador · Caja 1</div></div>
          <button aria-label="Cerrar menú" style={iconBtn} onClick={onClose}><Icon name="x" size={20} /></button>
        </div>
        <div style={{ flex:1, minHeight:0, overflowY:'auto', padding:'0 10px', display:'flex', flexDirection:'column', gap:2 }}>{NAV.map((n) => item(...n))}</div>
        <div style={{ padding:'10px 10px 28px', borderTop:'1px solid var(--border-hairline)' }}>{item('exit', 'log-out', 'Salir', 'index.html', null, true)}</div>
      </nav>
    </div>
  );
}

function Shell({ tab, title, sub, back, right, children, footer, overlay, noNav }) {
  const [menu, setMenu] = useState(false);
  return (
    <div style={{ height:'100%', display:'flex', flexDirection:'column', background:'var(--surface-canvas)', color:'var(--text-primary)', position:'relative', overflow:'hidden' }}>
      <StatusBar />
      {title !== undefined && (
        <header style={{ ...row, padding:'4px 16px 10px', flex:'0 0 auto' }}>
          {!noNav && <button aria-label="Abrir menú" aria-expanded={menu} style={iconBtn} onClick={() => setMenu(true)}><Icon name="menu" size={22} /></button>}
          {back && <button aria-label="Atrás" style={{ ...iconBtn, background:'transparent' }} onClick={() => go(back)}><Icon name="arrow-left" size={20} /></button>}
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:'var(--text-h2)', fontWeight:'var(--weight-semibold)', letterSpacing:'var(--tracking-tight)', lineHeight:1.15, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{title}</div>
            {sub && <div style={{ fontSize:'var(--text-xs)', color:'var(--text-secondary)', marginTop:2, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{sub}</div>}
          </div>
          {right}
        </header>
      )}
      <main style={{ flex:1, minHeight:0, overflowY:'auto', padding:'0 16px 16px', display:'flex', flexDirection:'column', gap:12 }}>{children}</main>
      {footer && <div style={{ flex:'0 0 auto', padding:'10px 16px', display:'flex', gap:10, borderTop:'1px solid var(--border-hairline)' }}>{footer}</div>}
      <div style={{ height:22, flex:'0 0 auto', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <span style={{ width:134, height:5, borderRadius:3, background:'var(--text-primary)', opacity:.85 }} />
      </div>
      {overlay}
      {menu && <Drawer tab={tab} onClose={() => setMenu(false)} />}
    </div>
  );
}

const stamp = () => {
  const d = new Date(); const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const mon = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  return days[d.getDay()] + ', ' + d.getDate() + ' ' + mon[d.getMonth()] + ' · ' + String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
};

/* ================================================================ 1 · PIN */
function MLogin() {
  const [pin, setPin] = useState('');
  const push = (k) => {
    if (k === 'del') return setPin((p) => p.slice(0, -1));
    const n = (pin + k).slice(0, 4); setPin(n);
    if (n.length === 4) setTimeout(() => go('Menu.html'), 260);
  };
  const dot = (t) => <span style={{ ...row, gap:5, fontSize:10, letterSpacing:'var(--tracking-wide)', color:'var(--text-secondary)' }}><span style={{ width:6, height:6, borderRadius:3, background:'var(--status-danger, var(--danger-ink))' }} />{t}</span>;
  return (
    <Shell noNav>
      <div style={{ ...row, paddingTop:6 }}>
        <div><div style={{ fontWeight:'var(--weight-semibold)', fontSize:'var(--text-body)' }}>Compos</div><div style={{ fontSize:10, color:'var(--text-muted)' }}>Semper listo</div></div>
        <div style={{ marginLeft:'auto', display:'flex', gap:10 }}>{dot('IMPRESORA')}{dot('CAJÓN')}{dot('SYNC')}</div>
      </div>
      <div style={{ fontSize:'var(--text-xs)', color:'var(--text-secondary)' }}>Turno · {stamp()}</div>
      <div style={{ ...card({ background:'var(--periwinkle-200)', color:'var(--text-on-light)' }), ...row, gap:12 }}>
        <span style={{ width:40, height:40, borderRadius:20, background:'#fff', color:'#111315', display:'grid', placeItems:'center', fontWeight:600 }}>I</span>
        <div><div style={{ fontWeight:'var(--weight-semibold)' }}>Isaac</div><div style={{ fontSize:'var(--text-xs)' }}>Administrador</div></div>
        <Icon name="check" size={20} style={{ marginLeft:'auto' }} />
      </div>
      <div style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'flex-end', gap:22, paddingBottom:8 }}>
        <div style={{ textAlign:'center', fontSize:'var(--text-body)', color:'var(--text-secondary)' }}>Ingresa tu PIN</div>
        <Dots n={pin.length} />
        <div style={{ padding:'0 22px' }}><Keypad onKey={push} /></div>
      </div>
    </Shell>
  );
}

/* ============================================================== 2 · Turno */
function MShift() {
  const [retiros, setRetiros] = useState([['11:30', 1000]]);
  const [pin, setPin] = useState(null); const [closed, setClosed] = useState(false); const [toast, show] = useToast();
  const retirado = retiros.reduce((s, r) => s + r[1], 0);
  const esperado = 2000 + 5775 - 338 - retirado;
  const metodos = [['banknote', 'Efectivo', 5775], ['credit-card', 'Crédito', 9635], ['credit-card', 'Débito', 3240], ['bike', 'Uber Eats', 2580, 1], ['bike', 'Rappi', 1346, 1], ['bike', 'DiDi Food', 812, 1]];
  const retirar = (n) => { const d = new Date(); setRetiros((r) => [...r, [String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'), n]]); show('Retiro de ' + money(n) + ' registrado'); };
  return (
    <Shell tab="turno" title="Turno" sub={closed ? 'Turno cerrado · corte Z impreso' : 'Abierto desde 07:00 · Lena P. · Caja 1'}
      right={<span style={chip(false, { height:30, cursor:'default', color: closed ? 'var(--text-secondary)' : ink('var(--mint-200)'), borderColor:'currentColor' })}>{closed ? 'Cerrado' : 'Abierto'}</span>}
      footer={<button style={btn('primary')} disabled={closed} onClick={() => setPin(true)}>{closed ? 'Turno cerrado' : 'Cerrar turno'}</button>}
      overlay={<>{pin && <ManagerPin why="Cerrar el turno imprime el corte Z" onClose={() => setPin(null)} onOk={() => { setPin(null); setClosed(true); show('Turno cerrado'); }} />}<Toast text={toast} /></>}>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
        <div style={card({ gridColumn:'1 / -1' })}><div style={label}>Ventas brutas</div><div style={{ fontSize:'var(--text-h1)', fontWeight:'var(--weight-semibold)' }}>$23,388.00</div><div style={{ fontSize:'var(--text-xs)', color:'var(--text-secondary)' }}>64 órdenes · prom. $365.44</div></div>
        <div style={card()}><div style={label}>Reembolsos</div><div style={{ fontSize:'var(--text-h3)', fontWeight:'var(--weight-semibold)', color:'var(--danger-ink)' }}>-$338.00</div><div style={{ fontSize:'var(--text-xs)', color:'var(--text-secondary)' }}>2 reemb. · 1 anul.</div></div>
        <div style={card()}><div style={label}>Efectivo esperado</div><div style={{ fontSize:'var(--text-h3)', fontWeight:'var(--weight-semibold)' }}>{money(esperado)}</div><div style={{ fontSize:'var(--text-xs)', color:'var(--text-secondary)' }}>fondo $2,000 + efectivo − retiros</div></div>
      </div>
      <div style={card()}>
        <div style={{ ...label, marginBottom:8 }}>Ventas por método</div>
        {metodos.map(([ic, n, v, pre]) => (
          <div key={n} style={{ ...row, padding:'7px 0', fontSize:'var(--text-sm)' }}>
            <Icon name={ic} size={16} /><span style={{ flex:1 }}>{n}</span>
            {pre && <span style={{ fontSize:10, padding:'2px 8px', borderRadius:10, background:'var(--mint-200)', color:'var(--text-on-light)' }}>Prepagado</span>}
            <span style={{ fontVariantNumeric:'tabular-nums' }}>{money(v)}</span>
          </div>))}
      </div>
      <div style={card()}>
        <div style={{ ...label, marginBottom:10 }}>Retiro de efectivo</div>
        <div style={{ display:'flex', gap:8 }}>{[500, 1000, 2000].map((n) => <button key={n} disabled={closed} style={chip(false, { flex:1, justifyContent:'center', height:44 })} onClick={() => retirar(n)}>{money(n).replace('.00', '')}</button>)}</div>
        <div style={{ marginTop:10 }}>{retiros.map(([t, n], i) => <div key={i} style={{ ...row, fontSize:'var(--text-sm)', padding:'5px 0', color:'var(--text-secondary)' }}><span style={{ flex:1 }}>{t}</span><span>{money(n)}</span></div>)}</div>
      </div>
      <button style={btn('outline', { flex:'0 0 auto', display:'flex', alignItems:'center', justifyContent:'center', gap:8 })} onClick={() => show('Corte X enviado a la impresora')}><Icon name="printer" size={18} />Imprimir corte X</button>
    </Shell>
  );
}

/* ========================================================= 3 · Entrantes */
const INCOMING = [
  { id:'RP-0912', plat:'Rappi', who:'Carlos V.', secs:22, total:433, items:[[1, 'Frappé moka'], [2, 'Croissant'], [1, 'Rol de canela']], addr:'Río Presidio 412, Centro', note:null },
  { id:'UE-2231', plat:'Uber Eats', who:'Mia T.', secs:93, total:387, items:[[2, 'Latte vainilla'], [1, 'Matcha latte']], addr:'Av. Álvaro Obregón 18, depto 3', note:'Sin popotes' },
  { id:'DD-5530', plat:'DiDi Food', who:'Noah B.', secs:130, total:507, items:[[3, 'Frappé cookies'], [2, 'Concha']], addr:'Calle Ángel Flores 77', note:null },
  { id:'W-118', plat:'Sitio web', who:'Carla N.', secs:148, total:258, items:[[1, 'Cappuccino'], [1, 'Chai latte'], [1, 'Croissant']], addr:'Pickup en tienda', note:null },
];
function MIncoming() {
  useTick();
  const [start] = useState(Date.now());
  const [list, setList] = useState(INCOMING); const [filter, setFilter] = useState('Todas'); const [sel, setSel] = useState(null);
  const [prep, setPrep] = useState(15); const [accepted, setAccepted] = useState(0); const [sound, setSound] = useState(true); const [toast, show] = useToast();
  const left = (o) => Math.max(0, o.secs + 60 - Math.floor((Date.now() - start) / 1000));
  const plats = ['Todas', 'Uber Eats', 'Rappi', 'DiDi Food', 'Sitio web'];
  const shown = list.filter((o) => filter === 'Todas' || o.plat === filter);
  const act = (o, ok) => { setList((l) => l.filter((x) => x.id !== o.id)); setSel(null); if (ok) setAccepted((n) => n + 1); show(ok ? '#' + o.id + ' aceptada · lista en ' + prep + ' min' : '#' + o.id + ' rechazada'); };
  return (
    <Shell tab="incoming" title="Entrantes" sub={accepted + ' aceptadas en esta sesión · las más urgentes primero'}
      right={<span style={{ ...row, gap:6, fontSize:'var(--text-xs)', color:'var(--text-secondary)' }}><Icon name="volume-2" size={16} /><Toggle on={sound} onChange={setSound} /></span>}
      overlay={<>{sel && (
        <Sheet title={'#' + sel.id} sub={sel.plat + ' · ' + sel.who + ' · rechazo automático en ' + clock(left(sel))} onClose={() => setSel(null)}
          footer={<><button style={btn('danger')} onClick={() => act(sel, false)}>Rechazar</button><button style={btn('primary')} onClick={() => act(sel, true)}>Aceptar · {prep} min</button></>}>
          <div style={card()}><div style={label}>Cliente</div><div style={{ fontWeight:'var(--weight-semibold)', marginTop:4 }}>{sel.who}</div>
            <div style={{ ...row, gap:6, fontSize:'var(--text-sm)', color:'var(--text-secondary)', marginTop:4 }}><Icon name="map-pin" size={14} />{sel.addr}</div>
            {sel.note && <div style={{ ...row, gap:6, fontSize:'var(--text-sm)', color:ink('var(--order-warn)'), marginTop:4 }}><Icon name="sticky-note" size={14} />{sel.note}</div>}</div>
          <div style={card()}><div style={label}>Productos</div>{sel.items.map(([q, n]) => <div key={n} style={{ ...row, fontSize:'var(--text-sm)', padding:'6px 0' }}><span style={{ color:'var(--text-muted)' }}>{q}×</span><span style={{ flex:1 }}>{n}</span></div>)}
            <div style={{ ...row, borderTop:'1px solid var(--border-hairline)', paddingTop:10, marginTop:6 }}><span style={{ flex:1, fontWeight:'var(--weight-semibold)' }}>Total</span>
              <span style={{ fontSize:10, padding:'2px 8px', borderRadius:10, background:'var(--mint-200)', color:'var(--text-on-light)' }}>Pagado vía {sel.plat}</span><span style={{ fontWeight:'var(--weight-semibold)' }}>{money(sel.total)}</span></div></div>
          <div style={label}>Lista en</div>
          <div style={{ display:'flex', gap:8, paddingBottom:4 }}>{[10, 15, 20, 30].map((m) => <button key={m} style={chip(m === prep, { flex:1, justifyContent:'center' })} onClick={() => setPrep(m)}>{m} min</button>)}</div>
        </Sheet>)}<Toast text={toast} /></>}>
      <Chips items={plats.map((p) => [p, p, p === 'Todas' ? list.length : list.filter((o) => o.plat === p).length])} value={filter} onChange={setFilter} />
      {shown.length === 0 && <div style={{ textAlign:'center', color:'var(--text-muted)', padding:'60px 0', fontSize:'var(--text-sm)' }}><Icon name="inbox" size={28} /><div style={{ marginTop:8 }}>Sin pedidos pendientes</div></div>}
      {shown.map((o) => { const l = left(o); const urgent = l < 60; return (
        <div key={o.id} onClick={() => setSel(o)} style={{ ...card(), cursor:'pointer', border: urgent ? '1px solid var(--danger-ink)' : '1px solid var(--border-hairline)' }}>
          <div style={row}><Icon name={o.plat === 'Sitio web' ? 'globe' : 'bike'} size={18} />
            <div style={{ flex:1 }}><div style={{ fontWeight:'var(--weight-semibold)' }}>#{o.id}</div><div style={{ fontSize:'var(--text-xs)', color:'var(--text-secondary)' }}>{o.plat} · {o.who}</div></div>
            <span style={{ fontVariantNumeric:'tabular-nums', fontSize:'var(--text-sm)', fontWeight:'var(--weight-semibold)', color: urgent ? 'var(--danger-ink)' : 'var(--text-secondary)' }}>{clock(l)}</span></div>
          <div style={{ fontSize:'var(--text-sm)', color:'var(--text-secondary)', margin:'8px 0' }}>{o.items.map(([q, n]) => q + '× ' + n).join(' · ')}</div>
          <div style={row}><span style={{ fontWeight:'var(--weight-semibold)', flex:1 }}>{money(o.total)}</span>
            <button aria-label="Rechazar" onClick={(e) => { e.stopPropagation(); act(o, false); }} style={{ ...iconBtn, background:'transparent', border:'1px solid var(--danger-ink)', color:'var(--danger-ink)', borderRadius:22 }}><Icon name="x" size={18} /></button>
            <button onClick={(e) => { e.stopPropagation(); act(o, true); }} style={btn('primary', { flex:'0 0 auto', height:44, padding:'0 22px' })}>Aceptar</button></div>
        </div>); })}
    </Shell>
  );
}

/* ============================================================== 4 · Menú */
function MMenu() {
  const [data, setData] = useState(load);
  const [mode, setMode] = useState('Aquí'); const [cat, setCat] = useState('todos');
  const [lines, setLines] = useState([]); const [opt, setOpt] = useState(null); const [picked, setPicked] = useState([]); const [cart, setCart] = useState(false);
  useEffect(() => { const m = decodeURIComponent(location.hash.slice(1)).match(/^opciones(?:=(.+))?$/); if (m) { const it = ALL.find((x) => x.name === (m[1] || 'Americano naranja')); if (it) { setOpt(it); setPicked([]); } } }, []);
  const items = cat === 'todos' ? ALL : ALL.filter((i) => i.cat.id === cat);
  const add = (item, mods) => {
    const extra = mods.reduce((s, m) => s + m[1], 0); const unit = item.price + extra; const names = mods.map((m) => m[0]);
    setLines((ls) => { const i = ls.findIndex((l) => l.name === item.name && l.mods.join() === names.join()); if (i >= 0) { const c = [...ls]; c[i] = { ...c[i], qty:c[i].qty + 1 }; return c; }
      return [...ls, { name:item.name, unit, base:item.price, qty:1, mods:names }]; });
  };
  const pick = (item) => { if (OPTIONS[item.cat.id]) { setOpt(item); setPicked([]); } else add(item, []); };
  const qty = (i, q) => setLines((ls) => q <= 0 ? ls.filter((_, j) => j !== i) : ls.map((l, j) => j === i ? { ...l, qty:q } : l));
  const t = lines.reduce((s, l) => s + l.unit * l.qty, 0); const n = lines.reduce((s, l) => s + l.qty, 0);
  const place = (pay) => { const d = load(); const id = nextId(d); d.orders.unshift({ id, mode, status:'abierta', opened:Date.now(), lines }); save(d); setData(d);
    if (pay) go('Payment.html', { 'compos-v2-pay':id }); else go('Orders.html'); };
  const groups = opt ? OPTIONS[opt.cat.id] : [];
  const toggle = (g, o) => setPicked((p) => { const has = p.find((x) => x[0] === o[0]); if (has) return p.filter((x) => x[0] !== o[0]);
    const inG = p.filter((x) => g.options.some((y) => y[0] === x[0])); let next = p; if (inG.length >= g.max) next = p.filter((x) => x[0] !== inG[0][0]); return [...next, o]; });
  return (
    <Shell tab="menu" title="Nueva orden" sub={'Orden #' + 'A-' + String((data.seq || 0) + 1).padStart(4, '0') + ' · ' + mode}
      right={<button aria-label="Buscar" style={iconBtn} onClick={() => go('Search.html')}><Icon name="search" size={20} /></button>}
      footer={<button disabled={!n} onClick={() => setCart(true)} style={btn('primary', { display:'flex', alignItems:'center', padding:'0 20px', gap:10, opacity: n ? 1 : .45 })}>
        <Icon name="shopping-bag" size={18} /><span style={{ flex:1, textAlign:'left' }}>{n ? 'Ver orden · ' + n + (n === 1 ? ' producto' : ' productos') : 'Toca un producto'}</span><span>{money(t)}</span></button>}
      overlay={<>
        {opt && (
          <Sheet title={opt.name} sub="Elige las opciones del producto" onClose={() => setOpt(null)}
            footer={<button style={btn('primary')} onClick={() => { add(opt, picked); setOpt(null); history.replaceState(null, '', location.pathname); }}>Agregar · {money(opt.price + picked.reduce((s, m) => s + m[1], 0))}</button>}>
            {groups.map((g) => (
              <div key={g.name} style={{ display:'flex', flexDirection:'column', gap:8, paddingBottom:8 }}>
                <div style={{ ...row }}><span style={{ fontWeight:'var(--weight-semibold)', flex:1 }}>{g.name}</span><span style={{ fontSize:'var(--text-xs)', color:'var(--text-muted)' }}>Hasta {g.max}</span></div>
                {g.options.map((o) => { const on = picked.some((x) => x[0] === o[0]); return (
                  <button key={o[0]} onClick={() => toggle(g, o)} style={{ ...font, ...card({ padding:'14px' }), ...row, cursor:'pointer', color:'var(--text-primary)', fontSize:'var(--text-body)', textAlign:'left',
                    border: on ? '1px solid var(--text-primary)' : '1px solid transparent' }}>
                    <span style={{ width:22, height:22, borderRadius: g.max === 1 ? 11 : 6, border:'2px solid var(--border-strong)', display:'grid', placeItems:'center', background: on ? 'var(--surface-inverse)' : 'transparent', color:'var(--text-on-inverse)' }}>{on && <Icon name="check" size={14} />}</span>
                    <span style={{ flex:1 }}>{o[0]}</span><span style={{ color:'var(--text-secondary)', fontSize:'var(--text-sm)' }}>{o[1] ? '+' + money(o[1]) : 'Incluido'}</span></button>); })}
              </div>))}
          </Sheet>)}
        {cart && (
          <Sheet title="Orden" sub={mode + ' · precios con IVA 16% incluido'} onClose={() => setCart(false)}
            footer={<><button style={btn('outline')} onClick={() => place(false)}>Guardar</button><button style={btn('primary')} onClick={() => place(true)}>Cobrar {money(t)}</button></>}>
            {lines.map((l, i) => (
              <div key={i} style={{ ...card(), ...row, alignItems:'flex-start' }}>
                <div style={{ flex:1, minWidth:0 }}><div style={{ fontWeight:'var(--weight-semibold)', color:ink('var(--periwinkle-200)') }}>{l.name}</div>
                  <div style={{ fontSize:'var(--text-sm)', color:'var(--text-secondary)' }}>{money(l.unit)}</div>
                  {l.mods.length > 0 && <div style={{ fontSize:'var(--text-sm)', color:'var(--text-secondary)', borderLeft:'2px solid var(--border-strong)', paddingLeft:8, marginTop:4 }}>{l.mods.join(' · ')}</div>}</div>
                <div style={{ ...row, gap:10 }}>
                  <button aria-label="Quitar uno" style={{ ...iconBtn, width:34, height:34 }} onClick={() => { qty(i, l.qty - 1); if (lines.length === 1 && l.qty === 1) setCart(false); }}><Icon name="minus" size={16} /></button>
                  <span style={{ minWidth:12, textAlign:'center' }}>{l.qty}</span>
                  <button aria-label="Agregar uno" style={{ ...iconBtn, width:34, height:34 }} onClick={() => qty(i, l.qty + 1)}><Icon name="plus" size={16} /></button></div>
              </div>))}
            <div style={{ ...card(), display:'flex', flexDirection:'column', gap:6, fontSize:'var(--text-sm)', color:'var(--text-secondary)' }}>
              <div style={row}><span style={{ flex:1 }}>Subtotal</span>{money(ivaOf(t).sub)}</div><div style={row}><span style={{ flex:1 }}>IVA</span>{money(ivaOf(t).iva)}</div>
              <div style={{ ...row, color:'var(--text-primary)', fontSize:'var(--text-h3)', fontWeight:'var(--weight-semibold)' }}><span style={{ flex:1 }}>Total</span>{money(t)}</div></div>
          </Sheet>)}
      </>}>
      <div style={scrollX}>{MODES.map(([m, ic]) => <button key={m} onClick={() => setMode(m)} style={chip(false, m === mode ? { background:'var(--surface-accent)', color:'var(--text-on-light)', borderColor:'transparent' } : {})}><Icon name={ic} size={16} />{m}</button>)}</div>
      <Chips items={[['todos', 'Todos', ALL.length, 'layout-grid'], ...CATS.map((c) => [c.id, c.name, c.items.length, c.icon])]} value={cat} onChange={setCat} />
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
        {items.map((it) => { const inCart = lines.filter((l) => l.name === it.name).reduce((s, l) => s + l.qty, 0); return (
          <button key={it.name} onClick={() => pick(it)} style={{ ...font, border:'none', cursor:'pointer', textAlign:'left', borderRadius:'var(--radius-md)', background:it.cat.color, color:'var(--text-on-light)',
            padding:12, minHeight:104, display:'flex', flexDirection:'column', gap:6, position:'relative' }}>
            <Icon name={it.cat.icon} size={18} />
            <span style={{ fontWeight:'var(--weight-semibold)', fontSize:'var(--text-sm)', lineHeight:1.2, flex:1 }}>{it.name}</span>
            <span style={{ ...row, justifyContent:'space-between', fontWeight:'var(--weight-semibold)' }}>{money(it.price)}{OPTIONS[it.cat.id] && <Icon name="sliders-horizontal" size={15} />}</span>
            {inCart > 0 && <span style={{ position:'absolute', top:10, right:10, minWidth:22, height:22, borderRadius:11, background:'#111315', color:'#fff', fontSize:12, display:'grid', placeItems:'center' }}>{inCart}</span>}
          </button>); })}
      </div>
    </Shell>
  );
}

/* ============================================================ 5 · Checks */
function MChecks() {
  useTick();
  const [data, setData] = useState(load); const [filter, setFilter] = useState('abierta'); const [selId, setSelId] = useState(null);
  const commit = (d) => { save(d); setData({ ...d }); };
  const count = (s) => data.orders.filter((o) => o.status === s).length;
  const list = data.orders.filter((o) => o.status === filter);
  const sel = data.orders.find((o) => o.id === selId);
  const elapsed = (o) => clock(Math.floor((Date.now() - o.opened) / 1000));
  const mut = (fn) => { const d = load(); const o = d.orders.find((x) => x.id === selId); if (o) fn(o, d); commit(d); };
  const STAT = { abierta:['Abierta', 'var(--sky-200)'], 'por-cerrar':['Por cerrar', 'var(--order-warn)'], cerrada:['Cerrada', 'var(--text-secondary)'] };
  return (
    <Shell tab="checks" title="Checks" sub={data.orders.length + ' órdenes en este turno'}
      right={<button aria-label="Nueva orden" style={iconBtn} onClick={() => go('Menu.html')}><Icon name="plus" size={20} /></button>}
      overlay={sel && (
        <Sheet title={'Orden #' + sel.id} sub={sel.mode + ' · ' + STAT[sel.status][0] + ' · ' + elapsed(sel)} onClose={() => setSelId(null)}
          footer={sel.status === 'cerrada'
            ? <button style={btn('outline')} onClick={() => go('Refund.html')}>Reembolsar</button>
            : <><button style={btn('outline')} onClick={() => { mut((o) => { o.status = 'por-cerrar'; }); }}>Preparar</button>
                <button style={btn('primary')} onClick={() => go('Payment.html', { 'compos-v2-pay':sel.id })}>Cobrar {money(total(sel))}</button></>}>
          {sel.lines.length === 0 && <div style={{ color:'var(--text-muted)', fontSize:'var(--text-sm)', textAlign:'center', padding:20 }}>Sin productos</div>}
          {sel.lines.map((l, i) => (
            <div key={i} style={{ ...card(), ...row, alignItems:'flex-start' }}>
              <div style={{ flex:1, minWidth:0 }}><div style={{ fontWeight:'var(--weight-semibold)', color:ink('var(--periwinkle-200)') }}>{l.name}</div>
                <div style={{ fontSize:'var(--text-sm)', color:'var(--text-secondary)' }}>{money(l.unit)}{l.mods.length ? ' · ' + l.mods.join(' · ') : ''}</div></div>
              {sel.status !== 'cerrada'
                ? <div style={{ ...row, gap:10 }}>
                    <button aria-label="Quitar uno" style={{ ...iconBtn, width:34, height:34 }} onClick={() => mut((o) => { if (o.lines[i].qty <= 1) o.lines.splice(i, 1); else o.lines[i].qty -= 1; })}><Icon name="minus" size={16} /></button>
                    <span>{l.qty}</span>
                    <button aria-label="Agregar uno" style={{ ...iconBtn, width:34, height:34 }} onClick={() => mut((o) => { o.lines[i].qty += 1; })}><Icon name="plus" size={16} /></button></div>
                : <span style={{ color:'var(--text-secondary)' }}>×{l.qty}</span>}
            </div>))}
          <div style={{ ...card(), display:'flex', flexDirection:'column', gap:6, fontSize:'var(--text-sm)', color:'var(--text-secondary)' }}>
            <div style={row}><span style={{ flex:1 }}>Subtotal</span>{money(ivaOf(total(sel)).sub)}</div><div style={row}><span style={{ flex:1 }}>IVA</span>{money(ivaOf(total(sel)).iva)}</div>
            <div style={{ ...row, color:'var(--text-primary)', fontSize:'var(--text-h3)', fontWeight:'var(--weight-semibold)' }}><span style={{ flex:1 }}>Total</span>{money(total(sel))}</div></div>
          {sel.status !== 'cerrada' && (
            <div style={{ display:'flex', gap:8, paddingBottom:4 }}>
              <button style={chip(false, { flex:1, justifyContent:'center', height:44 })} onClick={() => go('Split.html')}><Icon name="split" size={16} />Dividir</button>
              <button style={chip(false, { flex:1, justifyContent:'center', height:44, color:'var(--danger-ink)', borderColor:'var(--danger-ink)' })}
                onClick={() => { const d = load(); d.orders = d.orders.filter((x) => x.id !== selId); commit(d); setSelId(null); }}><Icon name="x" size={16} />Cancelar</button>
            </div>)}
        </Sheet>)}>
      <Segmented items={[['abierta', 'Abierta', count('abierta')], ['por-cerrar', 'Por cerrar', count('por-cerrar')], ['cerrada', 'Cerrada', count('cerrada')]]} value={filter} onChange={setFilter} />
      {list.length === 0 && <div style={{ textAlign:'center', color:'var(--text-muted)', padding:'60px 0', fontSize:'var(--text-sm)' }}><Icon name="clipboard-list" size={28} /><div style={{ marginTop:8 }}>No hay órdenes en {STAT[filter][0].toLowerCase()}</div></div>}
      {list.map((o) => (
        <button key={o.id} onClick={() => setSelId(o.id)} style={{ ...font, ...card(), border:'1px solid var(--border-hairline)', textAlign:'left', cursor:'pointer', color:'var(--text-primary)', display:'flex', flexDirection:'column', gap:8 }}>
          <div style={row}><span style={{ width:38, height:38, borderRadius:'var(--radius-sm)', background:STAT[o.status][1], color:'var(--text-on-light)', display:'grid', placeItems:'center' }}><Icon name={MODES.find((m) => m[0] === o.mode)[1]} size={18} /></span>
            <div style={{ flex:1 }}><div style={{ fontWeight:'var(--weight-semibold)' }}>Orden #{o.id}</div><div style={{ fontSize:'var(--text-xs)', color:'var(--text-secondary)' }}>{o.mode} · {STAT[o.status][0]}</div></div>
            <span style={{ ...row, gap:4, fontSize:'var(--text-sm)', color:'var(--text-secondary)', fontVariantNumeric:'tabular-nums' }}><Icon name="timer" size={14} />{elapsed(o)}</span></div>
          <div style={{ fontSize:'var(--text-sm)', color:'var(--text-secondary)' }}>{o.lines.map((l) => l.qty + '× ' + l.name).join(' · ') || 'Sin productos'}</div>
          <div style={{ ...row, borderTop:'1px solid var(--border-hairline)', paddingTop:8 }}><span style={{ flex:1, fontSize:'var(--text-xs)', color:'var(--text-muted)' }}>Total</span><span style={{ fontWeight:'var(--weight-semibold)' }}>{money(total(o))}</span></div>
        </button>))}
    </Shell>
  );
}

/* ============================================================ 6 · Cocina */
const TICKETS = [
  { id:'400', st:'nueva', who:'Pickup · Lena Park', mins:9, items:[[1, 'Latte caramelo'], [1, 'Croissant']] },
  { id:'410', st:'nueva', who:'Pickup · Daniel Ruiz', mins:4, items:[[2, 'Frappé taro', 'Crema batida'], [1, 'Mocha'], [1, 'Concha']] },
  { id:'412', st:'preparando', who:'Uber Eats · Mia Torres', mins:23, pre:true, items:[[1, 'Cold brew tonic'], [1, 'Matcha latte'], [3, 'Concha']] },
  { id:'407', st:'preparando', who:'Repartidor propio · Grace Kim', mins:14, items:[[1, 'Cappuccino'], [2, 'Rol de canela']] },
  { id:'396', st:'lista', who:'Pickup · Sam Ortiz', mins:31, items:[[1, 'Chai latte'], [1, 'Croissant']] },
];
function MKitchen() {
  const [list, setList] = useState(TICKETS); const [col, setCol] = useState('nueva'); const [toast, show] = useToast();
  const cols = [['nueva', 'Nueva'], ['preparando', 'Preparando'], ['lista', 'Lista']];
  const next = { nueva:['preparando', 'Empezar'], preparando:['lista', 'Marcar lista'], lista:[null, 'Entregar'] };
  const advance = (t) => { const [n] = next[t.st]; setList((l) => n ? l.map((x) => x.id === t.id ? { ...x, st:n } : x) : l.filter((x) => x.id !== t.id));
    show(n ? '#' + t.id + ' → ' + cols.find((c) => c[0] === n)[1] : '#' + t.id + ' entregada'); };
  const tone = (m) => m >= 20 ? 'var(--danger-ink)' : m >= 12 ? ink('var(--order-warn)') : 'var(--text-secondary)';
  const shown = list.filter((t) => t.st === col).sort((a, b) => b.mins - a.mins);
  return (
    <Shell tab="cocina" title="Cocina" sub={list.length + ' comandas activas · las más antiguas primero'} overlay={<Toast text={toast} />}>
      <Segmented items={cols.map(([id, t]) => [id, t, list.filter((x) => x.st === id).length])} value={col} onChange={setCol} />
      {shown.length === 0 && <div style={{ textAlign:'center', color:'var(--text-muted)', padding:'60px 0', fontSize:'var(--text-sm)' }}><Icon name="chef-hat" size={28} /><div style={{ marginTop:8 }}>Nada por aquí</div></div>}
      {shown.map((t) => (
        <div key={t.id} style={{ ...card(), borderTop:'3px solid ' + (t.st === 'nueva' ? 'var(--sky-200)' : t.st === 'preparando' ? 'var(--order-warn)' : 'var(--mint-200)') }}>
          <div style={row}><span style={{ fontSize:'var(--text-h2)', fontWeight:'var(--weight-semibold)', flex:1 }}>#{t.id}</span>
            {t.pre && <span style={{ fontSize:10, padding:'2px 8px', borderRadius:10, background:'var(--mint-200)', color:'var(--text-on-light)' }}>Prepagado</span>}
            <span style={{ ...row, gap:4, fontSize:'var(--text-sm)', fontWeight:'var(--weight-semibold)', color:tone(t.mins) }}><Icon name="timer" size={14} />{clock(t.mins * 60 + 2)}</span></div>
          <div style={{ fontSize:'var(--text-xs)', color:'var(--text-secondary)', margin:'2px 0 10px' }}>{t.who}</div>
          {t.items.map(([q, n, mod], i) => <div key={i} style={{ ...row, padding:'6px 0', alignItems:'flex-start' }}>
            <span style={{ width:24, height:24, borderRadius:6, background:'var(--surface-raised)', display:'grid', placeItems:'center', fontSize:12, fontWeight:600, flex:'0 0 auto' }}>{q}</span>
            <div><div style={{ fontWeight:'var(--weight-medium)' }}>{n}</div>{mod && <div style={{ fontSize:'var(--text-xs)', color:'var(--text-secondary)' }}>{mod}</div>}</div></div>)}
          <button style={btn(t.st === 'lista' ? 'primary' : 'outline', { width:'100%', marginTop:10, height:46 })} onClick={() => advance(t)}>{next[t.st][1]}</button>
        </div>))}
    </Shell>
  );
}

/* ========================================================== 7 · Dividir */
const SPLIT_ITEMS = [['Cold brew tonic', 65], ['Matcha latte', 75], ['Frappé cookies', 90], ['Frappé cookies', 90], ['Concha', 30], ['Concha', 30], ['Rol de canela', 55], ['Latte vainilla', 70]];
function MSplit() {
  const [acct, setAcct] = useState(SPLIT_ITEMS.map(() => 0)); const [n, setN] = useState(1); const [sel, setSel] = useState([]); const [view, setView] = useState(0); const [toast, show] = useToast(); const [done, setDone] = useState(false);
  const sum = (k) => SPLIT_ITEMS.reduce((s, it, i) => s + (acct[i] === k ? it[1] : 0), 0);
  const tog = (i) => setSel((s) => s.includes(i) ? s.filter((x) => x !== i) : [...s, i]);
  const moveTo = (k) => { setAcct((a) => a.map((x, i) => sel.includes(i) ? k : x)); setSel([]); setView(k); show(sel.length + (sel.length === 1 ? ' producto movido' : ' productos movidos') + ' a la cuenta 412.' + (k + 1)); };
  const name = (k) => k === 0 ? 'Cuenta 1' : '412.' + (k + 1);
  const here = SPLIT_ITEMS.map((it, i) => [it, i]).filter(([, i]) => acct[i] === view);
  return (
    <Shell tab="split" title="Dividir cuenta" sub={'Orden #412 · ' + n + (n === 1 ? ' cuenta' : ' cuentas')} back="Orders.html"
      footer={sel.length
        ? <div style={{ display:'flex', flexDirection:'column', gap:8, width:'100%' }}>
            <div style={{ fontSize:'var(--text-xs)', color:'var(--text-secondary)' }}>Mover {sel.length} a…</div>
            <div style={{ display:'flex', gap:8, overflowX:'auto' }}>
              {Array.from({ length:n }, (_, k) => k).filter((k) => k !== view).map((k) => <button key={k} style={chip(false, { height:44 })} onClick={() => moveTo(k)}>{name(k)}</button>)}
              <button style={chip(true, { height:44 })} onClick={() => { setN(n + 1); moveTo(n); }}><Icon name="plus" size={16} />Nueva cuenta</button></div></div>
        : <button style={btn('primary')} disabled={n < 2 || done} onClick={() => { setDone(true); show('División confirmada · ' + n + ' cuentas'); }}>{done ? 'División confirmada' : n < 2 ? 'Toca productos para separarlos' : 'Confirmar división'}</button>}
      overlay={<Toast text={toast} />}>
      <div style={scrollX}>{Array.from({ length:n }, (_, k) => (
        <button key={k} onClick={() => { setView(k); setSel([]); }} style={{ ...font, ...card({ padding:'10px 14px', minWidth:110 }), textAlign:'left', cursor:'pointer', color:'var(--text-primary)', border: k === view ? '1px solid var(--text-primary)' : '1px solid transparent' }}>
          <div style={{ fontSize:'var(--text-xs)', color:'var(--text-secondary)' }}>{name(k)} · {acct.filter((x) => x === k).length}</div>
          <div style={{ fontWeight:'var(--weight-semibold)' }}>{money(sum(k))}</div></button>))}</div>
      <div style={row}><span style={{ ...label, flex:1 }}>{name(view)} · toca para seleccionar</span>
        {here.length > 0 && <button style={{ ...font, border:'none', background:'none', color:'var(--text-secondary)', fontSize:'var(--text-xs)', cursor:'pointer' }} onClick={() => setSel(here.map(([, i]) => i))}>Seleccionar todo</button>}</div>
      {here.length === 0 && <div style={{ ...card(), textAlign:'center', color:'var(--text-muted)', fontSize:'var(--text-sm)', padding:30 }}>Cuenta vacía</div>}
      {here.map(([[nm, p], i]) => { const on = sel.includes(i); return (
        <button key={i} onClick={() => tog(i)} style={{ ...font, ...card({ padding:'12px 14px' }), ...row, cursor:'pointer', color:'var(--text-primary)', textAlign:'left', border: on ? '1px solid var(--text-primary)' : '1px solid transparent' }}>
          <span style={{ width:22, height:22, borderRadius:6, border:'2px solid var(--border-strong)', display:'grid', placeItems:'center', background: on ? 'var(--surface-inverse)' : 'transparent', color:'var(--text-on-inverse)' }}>{on && <Icon name="check" size={14} />}</span>
          <span style={{ flex:1 }}>{nm}</span><span style={{ color:'var(--text-secondary)', fontVariantNumeric:'tabular-nums' }}>{p.toFixed(2)}</span></button>); })}
    </Shell>
  );
}

/* ============================================================ 8 · Cobrar */
function MPayment() {
  const [data, setData] = useState(load);
  const id = getKey('compos-v2-pay');
  const order = data.orders.find((o) => o.id === id) || data.orders.find((o) => o.status !== 'cerrada') || data.orders[0];
  const t = order ? total(order) : 0;
  const [method, setMethod] = useState('Efectivo'); const [amt, setAmt] = useState(''); const [done, setDone] = useState(false);
  const got = amt === '' ? t : parseFloat(amt) || 0; const change = Math.max(0, got - t);
  const push = (k) => setAmt((a) => k === 'del' ? a.slice(0, -1) : (k === '.' && a.includes('.')) ? a : (a + k).replace(/^0+(?=\d)/, '').slice(0, 8));
  const pay = () => { const d = load(); const o = d.orders.find((x) => x.id === order.id); if (o) { o.status = 'cerrada'; o.paidWith = method; } save(d); setData(d); setDone(true); };
  const methods = [['Efectivo', 'banknote'], ['Débito', 'credit-card'], ['Crédito', 'credit-card'], ['Transf.', 'qr-code'], ['Vale', 'ticket']];
  if (!order) return <Shell tab="checks" title="Cobrar" back="Orders.html"><div style={{ color:'var(--text-muted)', textAlign:'center', padding:60 }}>No hay órdenes por cobrar</div></Shell>;
  if (done) return (
    <Shell tab="checks" title="Cobrar" sub={'Orden #' + order.id} footer={<><button style={btn('outline')} onClick={() => go('Orders.html')}>Ver checks</button><button style={btn('primary')} onClick={() => go('Menu.html')}>Nueva orden</button></>}>
      <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:12, textAlign:'center' }}>
        <span style={{ width:72, height:72, borderRadius:36, background:'var(--mint-200)', color:'var(--text-on-light)', display:'grid', placeItems:'center' }}><Icon name="check" size={34} /></span>
        <div style={{ fontSize:'var(--text-h1)', fontWeight:'var(--weight-semibold)' }}>Pagado</div>
        <div style={{ color:'var(--text-secondary)' }}>{money(t)} con {method.toLowerCase()}{method === 'Efectivo' && change > 0 ? ' · cambio ' + money(change) : ''}</div>
        <div style={{ fontSize:'var(--text-sm)', color:'var(--text-muted)' }}>Ticket enviado a la impresora</div>
      </div>
    </Shell>);
  return (
    <Shell tab="checks" title="Cobrar" sub={'Orden #' + order.id + ' · ' + order.lines.reduce((s, l) => s + l.qty, 0) + ' productos'} back="Orders.html"
      right={<button style={{ ...font, border:'none', background:'none', color:'var(--danger-ink)', fontSize:'var(--text-sm)', cursor:'pointer' }} onClick={() => go('Orders.html')}>Cancelar</button>}
      footer={<button style={btn('primary')} disabled={method === 'Efectivo' && got < t} onClick={pay}>Pagar {money(t)}</button>}>
      <div style={scrollX}>{methods.map(([m, ic]) => <button key={m} style={chip(m === method, { height:44 })} onClick={() => { setMethod(m); setAmt(''); }}><Icon name={ic} size={16} />{m}</button>)}</div>
      <div style={{ textAlign:'center', padding:'4px 0' }}>
        <div style={{ fontSize:'var(--text-xs)', color:'var(--text-secondary)' }}>{method === 'Efectivo' ? 'Monto recibido' : 'Monto a cobrar'}</div>
        <div style={{ fontSize:40, fontWeight:'var(--weight-semibold)', letterSpacing:'var(--tracking-tight)', fontVariantNumeric:'tabular-nums' }}>{money(method === 'Efectivo' ? got : t)}</div>
        <div style={{ fontSize:'var(--text-sm)', color: method === 'Efectivo' && got < t ? 'var(--danger-ink)' : 'var(--text-secondary)' }}>
          {method === 'Efectivo' ? (got < t ? 'Faltan ' + money(t - got) : 'Cambio ' + money(change)) : 'Total con IVA ' + money(ivaOf(t).iva)}</div>
      </div>
      {method === 'Efectivo' ? <>
        <div style={{ display:'flex', gap:6 }}>{[['Exacto', ''], ['$50', '50'], ['$100', '100'], ['$200', '200'], ['$500', '500']].map(([l, v]) =>
          <button key={l} style={chip(amt === v, { flex:1, justifyContent:'center', padding:0, height:38 })} onClick={() => setAmt(v)}>{l}</button>)}</div>
        <Keypad onKey={push} decimal />
      </> : (
        <div style={{ ...card({ padding:20 }), display:'flex', flexDirection:'column', alignItems:'center', gap:10, textAlign:'center', marginTop:8 }}>
          <Icon name={method === 'Transf.' ? 'qr-code' : method === 'Vale' ? 'ticket' : 'nfc'} size={40} />
          <div style={{ fontWeight:'var(--weight-semibold)' }}>{method === 'Transf.' ? 'Muestra el QR de CoDi o la CLABE' : method === 'Vale' ? 'Escanea o escribe el folio del vale' : 'Acerca, inserta o desliza la tarjeta'}</div>
          <div style={{ fontSize:'var(--text-sm)', color:'var(--text-secondary)' }}>En la demo, toca Pagar para simular la aprobación.</div>
        </div>)}
      <div style={{ ...card(), fontSize:'var(--text-sm)', color:'var(--text-secondary)' }}>
        {order.lines.map((l, i) => <div key={i} style={{ ...row, padding:'3px 0' }}><span style={{ flex:1 }}>{l.qty}× {l.name}</span>{money(l.unit * l.qty)}</div>)}
      </div>
    </Shell>
  );
}

/* ========================================================= 9 · Reembolso */
const PAID = [
  { id:'412', at:'12:05', who:'Mia Torres', via:'Uber Eats', items:[['Cold brew tonic', 65], ['Matcha latte', 75], ['Frappé cookies', 90], ['Concha', 30]] },
  { id:'407', at:'12:16', who:'Grace Kim', via:'Tarjeta', items:[['Cappuccino', 65], ['Rol de canela', 55], ['Rol de canela', 55]] },
  { id:'401', at:'11:42', who:'Omar Haddad', via:'Tarjeta', items:[['Latte caramelo', 70], ['Croissant', 45]] },
  { id:'391', at:'10:58', who:'Ivy Chen', via:'Rappi', items:[['Frappé moka', 85], ['Concha', 30]] },
];
function MRefund() {
  const [sel, setSel] = useState(null); const [items, setItems] = useState([]); const [why, setWhy] = useState(null); const [pin, setPin] = useState(false); const [toast, show] = useToast(); const [done, setDone] = useState([]);
  const amt = sel ? items.reduce((s, i) => s + sel.items[i][1], 0) : 0;
  const reasons = ['Producto equivocado', 'Calidad', 'Tardó demasiado', 'Cobro duplicado', 'Otro'];
  const open = (o) => { setSel(o); setItems([]); setWhy(null); };
  return (
    <Shell tab="refund" title="Reembolso" sub="Elige una cuenta pagada y luego los productos a devolver"
      overlay={<>
        {sel && (
          <Sheet title={'Orden #' + sel.id} sub={'Pagada ' + sel.at + ' · ' + sel.who + ' · ' + sel.via} onClose={() => setSel(null)}
            footer={<button style={btn('primary')} disabled={!items.length || !why} onClick={() => setPin(true)}>{items.length && why ? 'Reembolsar ' + money(amt) : !items.length ? 'Elige productos' : 'Elige un motivo'}</button>}>
            <div style={label}>Productos</div>
            {sel.items.map(([n, p], i) => { const on = items.includes(i); return (
              <button key={i} onClick={() => setItems((s) => on ? s.filter((x) => x !== i) : [...s, i])} style={{ ...font, ...card({ padding:'12px 14px' }), ...row, cursor:'pointer', color:'var(--text-primary)', border: on ? '1px solid var(--text-primary)' : '1px solid transparent' }}>
                <span style={{ width:22, height:22, borderRadius:6, border:'2px solid var(--border-strong)', display:'grid', placeItems:'center', background: on ? 'var(--surface-inverse)' : 'transparent', color:'var(--text-on-inverse)' }}>{on && <Icon name="check" size={14} />}</span>
                <span style={{ flex:1, textAlign:'left' }}>{n}</span>{money(p)}</button>); })}
            <div style={label}>Motivo</div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>{reasons.map((r) => <button key={r} style={chip(r === why)} onClick={() => setWhy(r)}>{r}</button>)}</div>
            <div style={{ ...card(), fontSize:'var(--text-sm)', color:'var(--text-secondary)', display:'flex', flexDirection:'column', gap:4, marginBottom:4 }}>
              <div style={row}><span style={{ flex:1 }}>{items.length} productos · regresa vía {sel.via}</span></div>
              <div style={row}><span style={{ flex:1 }}>IVA 16% incluido</span>{money(ivaOf(amt).iva)}</div>
              <div style={{ ...row, color:'var(--text-primary)', fontWeight:'var(--weight-semibold)', fontSize:'var(--text-h3)' }}><span style={{ flex:1 }}>Reembolso</span>{money(amt)}</div></div>
          </Sheet>)}
        {pin && <ManagerPin why={'Autoriza el reembolso de ' + money(amt)} onClose={() => setPin(false)} onOk={() => { setPin(false); setDone((d) => [...d, sel.id]); show('Reembolso de ' + money(amt) + ' autorizado'); setSel(null); }} />}
        <Toast text={toast} /></>}>
      <div style={{ ...row, ...card({ padding:'0 12px', height:46 }) }}><Icon name="search" size={18} /><span style={{ color:'var(--text-muted)', fontSize:'var(--text-sm)' }}>Busca por orden o cliente</span></div>
      {PAID.map((o) => { const r = done.includes(o.id); return (
        <button key={o.id} disabled={r} onClick={() => open(o)} style={{ ...font, ...card(), ...row, textAlign:'left', cursor: r ? 'default' : 'pointer', color:'var(--text-primary)', border:'1px solid var(--border-hairline)', opacity: r ? .55 : 1 }}>
          <div style={{ flex:1 }}><div style={{ fontWeight:'var(--weight-semibold)' }}>Orden #{o.id} <span style={{ fontSize:'var(--text-xs)', color:'var(--text-secondary)', fontWeight:'var(--weight-regular)' }}>Pagada {o.at}</span></div>
            <div style={{ fontSize:'var(--text-xs)', color:'var(--text-secondary)' }}>{o.who} · {o.via}</div></div>
          <span style={{ fontWeight:'var(--weight-semibold)' }}>{r ? 'Reembolsada' : money(o.items.reduce((s, i) => s + i[1], 0))}</span>
          {!r && <Icon name="chevron-right" size={18} />}</button>); })}
    </Shell>
  );
}

/* ============================================================ 10 · Buscar */
function MSearch() {
  const [q, setQ] = useState('la'); const [f, setF] = useState('todas');
  const s = q.trim().toLowerCase();
  const prods = s ? ALL.filter((i) => i.name.toLowerCase().includes(s)) : [];
  const orders = s ? load().orders.filter((o) => o.id.toLowerCase().includes(s) || o.lines.some((l) => l.name.toLowerCase().includes(s))) : [];
  const people = s ? ['Lena Park', 'Daniel Ruiz', 'Mia Torres', 'Grace Kim', 'Carla Núñez'].filter((n) => n.toLowerCase().includes(s)) : [];
  const mark = (t) => { const i = t.toLowerCase().indexOf(s); if (!s || i < 0) return t; return [t.slice(0, i), <mark key="m" style={{ background:'var(--periwinkle-200)', color:'var(--text-on-light)', borderRadius:3 }}>{t.slice(i, i + s.length)}</mark>, t.slice(i + s.length)]; };
  const show = (k) => f === 'todas' || f === k;
  return (
    <Shell tab="search" title="Buscar" back="Menu.html">
      <div style={{ ...row, ...card({ padding:'0 12px', height:48 }), border:'1px solid var(--border-strong)' }}>
        <Icon name="search" size={18} />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Platillo, orden o cliente" style={{ ...font, flex:1, minWidth:0, background:'transparent', border:'none', outline:'none', color:'var(--text-primary)', fontSize:'var(--text-body)' }} />
        {q && <button aria-label="Borrar" onClick={() => setQ('')} style={{ border:'none', background:'none', color:'var(--text-secondary)', cursor:'pointer', display:'flex' }}><Icon name="x" size={18} /></button>}
      </div>
      <Chips items={[['todas', 'Todas', prods.length + orders.length + people.length], ['menu', 'Menú', prods.length], ['cuentas', 'Cuentas', orders.length], ['clientes', 'Clientes', people.length]]} value={f} onChange={setF} />
      {show('cuentas') && orders.length > 0 && <><div style={label}>Cuentas · {orders.length}</div>{orders.map((o) => (
        <button key={o.id} onClick={() => go('Orders.html')} style={{ ...font, ...card({ padding:'12px 14px' }), ...row, border:'none', textAlign:'left', cursor:'pointer', color:'var(--text-primary)' }}>
          <Icon name="receipt" size={18} /><div style={{ flex:1, minWidth:0 }}><div style={{ fontWeight:'var(--weight-semibold)' }}>Orden #{o.id}</div>
            <div style={{ fontSize:'var(--text-xs)', color:'var(--text-secondary)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{o.lines.map((l) => l.name).join(', ')}</div></div>
          <span style={chip(false, { height:26, padding:'0 10px', fontSize:11, cursor:'inherit' })}>{o.status === 'cerrada' ? 'Cerrada' : 'Abierta'}</span></button>))}</>}
      {show('menu') && prods.length > 0 && <><div style={label}>Productos · {prods.length}</div>{prods.map((p) => (
        <button key={p.name} onClick={() => go('Menu.html' + (OPTIONS[p.cat.id] ? '#opciones=' + encodeURIComponent(p.name) : ''))} style={{ ...font, ...card({ padding:'12px 14px' }), ...row, border:'none', borderLeft:'4px solid ' + p.cat.color, textAlign:'left', cursor:'pointer', color:'var(--text-primary)' }}>
          <div style={{ flex:1 }}><div style={{ fontWeight:'var(--weight-medium)' }}>{mark(p.name)}</div><div style={{ fontSize:'var(--text-xs)', color:'var(--text-secondary)' }}>{p.cat.name}</div></div>{money(p.price)}</button>))}</>}
      {show('clientes') && people.length > 0 && <><div style={label}>Clientes · {people.length}</div>{people.map((n) => (
        <div key={n} style={{ ...card({ padding:'12px 14px' }), ...row }}><span style={{ width:32, height:32, borderRadius:16, background:'var(--lilac-200)', color:'var(--text-on-light)', display:'grid', placeItems:'center', fontWeight:600 }}>{n[0]}</span><span>{mark(n)}</span></div>))}</>}
      {s && !prods.length && !orders.length && !people.length && <div style={{ textAlign:'center', color:'var(--text-muted)', padding:'50px 0', fontSize:'var(--text-sm)' }}>Sin resultados para “{q}”</div>}
    </Shell>
  );
}

/* ========================================================== 11 · Reportes */
const PERIODS = { hoy:{ v:23387, o:64, d:60, k:'7m 40s', hours:[600, 1500, 2500, 1900, 1750, 2900, 3200, 1900, 1100, 1650, 2500] },
  semana:{ v:148220, o:402, d:57, k:'8m 05s', hours:[900, 1800, 2600, 2300, 2000, 3100, 3300, 2400, 1500, 1900, 2700] },
  mes:{ v:611480, o:1688, d:58, k:'7m 52s', hours:[800, 1700, 2700, 2100, 1900, 3000, 3400, 2200, 1300, 1800, 2600] } };
function MReports() {
  const [p, setP] = useState('hoy'); const [toast, show] = useToast(); const d = PERIODS[p]; const max = Math.max(...d.hours);
  const plats = [['Uber Eats', 'var(--mint-200)', 17, 7174, .30], ['Rappi', 'var(--rose-200)', 9, 4146, .25], ['DiDi Food', 'var(--order-warn)', 7, 2818, .22]];
  const top = [['Latte vainilla', 'Con café', 148], ['Frappé cookies', 'Frappés', 96], ['Americano naranja', 'Con café', 61], ['Concha', 'Panadería', 58], ['Matcha latte', 'Sin café', 44]];
  return (
    <Shell tab="reports" title="Reportes" right={<button aria-label="Exportar" style={iconBtn} onClick={() => show('Reporte exportado a CSV')}><Icon name="download" size={20} /></button>} overlay={<Toast text={toast} />}>
      <Segmented items={[['hoy', 'Hoy'], ['semana', 'Semana'], ['mes', 'Mes']]} value={p} onChange={setP} />
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8 }}>
        <div style={card({ background:'var(--periwinkle-200)', color:'var(--text-on-light)', gridColumn:'1 / -1' })}><Icon name="wallet" size={18} /><div style={{ fontSize:'var(--text-xs)', marginTop:6 }}>Ventas brutas</div>
          <div style={{ fontSize:'var(--text-h1)', fontWeight:'var(--weight-semibold)' }}>{money(d.v)}</div></div>
        {[['receipt', 'Órdenes', d.o], ['bike', 'Domicilio', d.d + '%'], ['chef-hat', 'Prom. cocina', d.k]].map(([ic, l, v]) => (
          <div key={l} style={card({ padding:12 })}><Icon name={ic} size={16} /><div style={{ fontSize:'var(--text-xs)', color:'var(--text-secondary)', marginTop:6 }}>{l}</div><div style={{ fontSize:'var(--text-h3)', fontWeight:'var(--weight-semibold)' }}>{v}</div></div>))}
      </div>
      <div style={card()}>
        <div style={{ fontWeight:'var(--weight-semibold)', marginBottom:4 }}>Desglose de domicilio</div>
        <div style={{ fontSize:'var(--text-xs)', color:'var(--text-secondary)', marginBottom:10 }}>Comisión de plataforma y pago neto</div>
        {plats.map(([n, c, o, b, fee]) => (
          <div key={n} style={{ padding:'8px 0', borderTop:'1px solid var(--border-hairline)' }}>
            <div style={row}><span style={{ width:8, height:8, borderRadius:4, background:ink(c) }} /><span style={{ flex:1, fontWeight:'var(--weight-medium)' }}>{n}</span><span style={{ fontSize:'var(--text-sm)' }}>{money(b * (1 - fee))}</span></div>
            <div style={{ ...row, fontSize:'var(--text-xs)', color:'var(--text-secondary)', marginTop:3 }}><span style={{ flex:1 }}>{o} órdenes · bruto {money(b)}</span><span style={{ color:'var(--danger-ink)' }}>-{money(b * fee)} · {Math.round(fee * 100)}%</span></div>
          </div>))}
      </div>
      <div style={card()}>
        <div style={{ fontWeight:'var(--weight-semibold)', marginBottom:10 }}>Ventas por hora</div>
        <div style={{ display:'flex', alignItems:'flex-end', gap:5, height:120 }}>{d.hours.map((v, i) => (
          <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:4, height:'100%', justifyContent:'flex-end' }}>
            <div title={money(v)} style={{ width:'100%', height:(v / max * 100) + '%', background:'var(--mint-200)', borderRadius:'4px 4px 0 0' }} />
            <span style={{ fontSize:9, color:'var(--text-muted)' }}>{7 + i}</span></div>))}</div>
      </div>
      <div style={card()}>
        <div style={{ fontWeight:'var(--weight-semibold)', marginBottom:6 }}>Más vendidos</div>
        {top.map(([n, c, v], i) => <div key={n} style={{ ...row, padding:'7px 0', fontSize:'var(--text-sm)' }}><span style={{ color:'var(--text-muted)', width:14 }}>{i + 1}</span>
          <div style={{ flex:1 }}><div style={{ fontWeight:'var(--weight-medium)' }}>{n}</div><div style={{ fontSize:'var(--text-xs)', color:'var(--text-secondary)' }}>{c}</div></div><span style={{ color:'var(--text-secondary)' }}>{v} vendidos</span></div>)}
      </div>
    </Shell>
  );
}

/* ========================================================== 12 · Ajustes */
const SECTIONS = [['general', 'store', 'General'], ['impuestos', 'percent', 'Impuestos y cargos'], ['tipos', 'clock', 'Tipos de orden y tiempos'], ['plataformas', 'bike', 'Plataformas de domicilio'],
  ['dispositivos', 'printer', 'Impresoras y dispositivos'], ['pagos', 'credit-card', 'Pagos y propinas'], ['personal', 'shield-check', 'Personal y permisos'], ['apariencia', 'palette', 'Apariencia']];
function MSettings() {
  const [sec, setSec] = useState(null); const [cur, setCur] = useState('MXN'); const [h24, setH24] = useState(true); const [lang, setLang] = useState('Español');
  const [perm, setPerm] = useState({ desc:false, anul:false, reemb:false, cajon:true }); const [pin, setPin] = useState(false); const [toast, show] = useToast(); const [theme, setTheme] = useState(() => getKey('compos-theme') || 'default');
  const field = (l, v, sub) => <div style={{ display:'flex', flexDirection:'column', gap:6 }}><span style={{ fontSize:'var(--text-sm)', fontWeight:'var(--weight-medium)' }}>{l}</span>
    {sub && <span style={{ fontSize:'var(--text-xs)', color:'var(--text-muted)', marginTop:-4 }}>{sub}</span>}
    <input defaultValue={v} style={{ ...font, height:46, borderRadius:'var(--radius-sm)', border:'1px solid var(--border-strong)', background:'var(--surface-card)', color:'var(--text-primary)', padding:'0 12px', fontSize:'var(--text-body)' }} /></div>;
  const opts = (vals, v, set) => <div style={{ display:'flex', gap:6 }}>{vals.map((x) => <button key={x} style={chip(x === v, { height:34, padding:'0 12px' })} onClick={() => set(x)}>{x}</button>)}</div>;
  const line = (l, ctrl) => <div key={l} style={{ ...row, justifyContent:'space-between', padding:'12px 0', borderTop:'1px solid var(--border-hairline)', gap:12 }}><span style={{ fontSize:'var(--text-sm)', fontWeight:'var(--weight-medium)' }}>{l}</span>{ctrl}</div>;
  const THEMES = [['default', 'Oscuro'], ['light', 'Claro'], ['hc', 'Alto contraste'], ['blue', 'Azul']];
  const pickTheme = (id) => { setTheme(id); if (window.composSetTheme) window.composSetTheme(id); };
  const body = {
    general: <>{field('Nombre del negocio', 'Ollie Coffee — Centro')}{field('Dirección', 'Calle Ángel Flores 210, Centro', 'Se imprime en los tickets')}
      {line('Moneda', opts(['USD', 'MXN', 'EUR'], cur, setCur))}{line('Reloj de 24 horas', <Toggle on={h24} onChange={setH24} />)}{line('Idioma', opts(['English', 'Español'], lang, setLang))}</>,
    personal: <><div style={{ fontSize:'var(--text-sm)', color:'var(--text-secondary)' }}>Qué puede hacer el personal sin PIN de gerente</div>
      {[['desc', 'Aplicar descuentos'], ['anul', 'Anular productos enviados'], ['reemb', 'Reembolsar'], ['cajon', 'Abrir el cajón sin venta']].map(([k, l]) => line(l, <Toggle on={perm[k]} onChange={(v) => setPerm({ ...perm, [k]:v })} />))}</>,
    apariencia: <>{THEMES.map(([id, l]) => line(l, <button style={chip(theme === id, { height:34 })} onClick={() => pickTheme(id)}>{theme === id ? 'Activo' : 'Usar'}</button>))}
      <div style={{ display:'flex', flexDirection:'column', gap:10, padding:'12px 0', borderTop:'1px solid var(--border-hairline)' }}>
        <span style={{ fontSize:'var(--text-sm)', fontWeight:'var(--weight-medium)' }}>Tu color</span>
        <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>{(window.COMPOS_COLORS || []).map((c) => { const id = 'custom:' + c.hex, on = theme === id; return (
          <button key={c.id} aria-label={c.label} aria-pressed={on} onClick={() => pickTheme(id)} style={{ width:40, height:40, borderRadius:20, cursor:'pointer', background:c.hex,
            border:'3px solid ' + (on ? 'var(--text-primary)' : 'transparent'), boxShadow:'inset 0 0 0 2px var(--surface-panel)' }} />); })}</div>
      </div></>,
  };
  const saveIt = () => { if (sec === 'personal') setPin(true); else show('Cambios guardados'); };
  if (sec) { const s = SECTIONS.find((x) => x[0] === sec); return (
    <Shell tab="settings" title={s[2]} right={<button aria-label="Atrás" style={iconBtn} onClick={() => setSec(null)}><Icon name="x" size={20} /></button>}
      footer={<button style={btn('primary')} onClick={saveIt}>Guardar</button>}
      overlay={<>{pin && <ManagerPin why="Los cambios de permisos piden autorización" onClose={() => setPin(false)} onOk={() => { setPin(false); show('Permisos actualizados'); }} />}<Toast text={toast} /></>}>
      {body[sec] || <div style={{ ...card({ padding:24 }), textAlign:'center', color:'var(--text-secondary)', fontSize:'var(--text-sm)' }}><Icon name={s[1]} size={28} /><div style={{ marginTop:8 }}>Esta sección está en la app completa. En la demo prueba General, Personal y permisos o Apariencia.</div></div>}
    </Shell>); }
  return (
    <Shell tab="settings" title="Ajustes" sub="Ollie Coffee — Centro">
      <div style={card({ padding:'4px 14px' })}>{SECTIONS.map(([id, ic, l], i) => (
        <button key={id} onClick={() => setSec(id)} style={{ ...font, ...row, width:'100%', border:'none', borderTop: i ? '1px solid var(--border-hairline)' : 'none', background:'none', color:'var(--text-primary)', cursor:'pointer', padding:'14px 0', fontSize:'var(--text-body)', textAlign:'left' }}>
          <Icon name={ic} size={18} /><span style={{ flex:1 }}>{l}</span><Icon name="chevron-right" size={18} /></button>))}</div>
      <button style={btn('danger', { flex:'0 0 auto' })} onClick={() => go('index.html')}>Salir</button>
    </Shell>
  );
}

Object.assign(window, { MLogin, MShift, MIncoming, MMenu, MChecks, MKitchen, MSplit, MPayment, MRefund, MSearch, MReports, MSettings });
})();
