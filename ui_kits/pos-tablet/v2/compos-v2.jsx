/*
 * Compos — Point of Sale System
 * File: v2/compos-v2.jsx
 * Module: Compos (demo · pantallas v2: acceso, menú, cobro y checks)
 *
 * Copyright (c) 2026 Isaac Serrano. All rights reserved.
 * This file is part of Compos and is proprietary and confidential.
 */
const { Icon } = window.ComposDesignSystem_9739cd;

/* ------------------------------------------------------------------ datos */
const V2_CATS = [
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
const V2_OPTIONS = {
  cafe: [{ id:'extras', name:'Extras', max:2, options:[['Shot de espresso', 15], ['Jarabe extra', 15]] }],
  frappe: [{ id:'extras', name:'Extras', max:2, options:[['Crema batida', 10], ['Shot de espresso', 15], ['Jarabe extra', 15]] }],
  sincafe: [{ id:'leche', name:'Leche', max:1, options:[['Entera', 0], ['Deslactosada', 0], ['Avena', 12], ['Almendra', 12]] }],
};
const V2_ALL = V2_CATS.flatMap((c) => c.items.map(([name, price]) => ({ name, price, cat:c })));
const V2_MODES = [['Aquí', 'utensils'], ['Domicilio', 'bike'], ['Pickup', 'shopping-bag']];
const V2_STATUS = { abierta:'Abierta', 'por-cerrar':'Por cerrar', cerrada:'Cerrada' };
const money = (n) => '$' + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
const ivaOf = (total) => { const sub = Math.round(total / 1.16 * 100) / 100; return { sub, iva: Math.round((total - sub) * 100) / 100 }; };

/* --------------------------------------------------- estado compartido */
const V2_KEY = 'compos-v2';
const v2Seed = () => ({ seq:1, orders:[{ id:'A-0001', mode:'Aquí', status:'abierta', opened:Date.now() - 28000,
  lines:[{ name:'Americano naranja', unit:85, base:70, qty:1, mods:['Shot de espresso'] }] }] });
const v2Load = () => { try { const d = JSON.parse(localStorage.getItem(V2_KEY)); if (d && Array.isArray(d.orders)) return d; } catch (e) {} return v2Seed(); };
const v2Save = (d) => { try { localStorage.setItem(V2_KEY, JSON.stringify(d)); } catch (e) {} };
const v2Next = (d) => { d.seq = (d.seq || 0) + 1; return 'A-' + String(d.seq).padStart(4, '0'); };
const v2Go = (file, extra) => { try { if (extra) Object.entries(extra).forEach(([k, v]) => localStorage.setItem(k, v)); } catch (e) {} location.href = file; };
const lineTotal = (l) => l.unit * l.qty;
const orderTotal = (o) => o.lines.reduce((s, l) => s + lineTotal(l), 0);

/* ------------------------------------------------------------ primitivas */
const S = {
  panel:{ background:'var(--surface-panel)', borderRadius:'var(--radius-lg)' },
  pill:(on) => ({ height:44, padding:'0 18px', borderRadius:'var(--radius-pill)', border: on ? '1px solid transparent' : '1px solid var(--border-strong)',
    background: on ? 'var(--surface-inverse)' : 'transparent', color: on ? 'var(--text-on-inverse)' : 'var(--text-primary)',
    fontSize:'var(--text-sm)', fontWeight:'var(--weight-semibold)', letterSpacing:'var(--tracking-wide)', cursor:'pointer', fontFamily:'inherit' }),
  sq:{ width:52, height:52, borderRadius:'var(--radius-sm)', border:'none', background:'var(--surface-raised)', color:'var(--text-primary)',
    display:'inline-flex', alignItems:'center', justifyContent:'center', cursor:'pointer' },
  bigBtn:(kind) => ({ height:56, flex:1, minWidth:0, borderRadius:'var(--radius-pill)', fontFamily:'inherit', fontSize:'var(--text-body)', fontWeight:'var(--weight-semibold)', cursor:'pointer',
    border: kind === 'outline' ? '1px solid var(--border-strong)' : '1px solid transparent',
    background: kind === 'primary' ? 'var(--surface-inverse)' : 'transparent',
    color: kind === 'primary' ? 'var(--text-on-inverse)' : 'var(--text-primary)' }),
};

function V2TopBar({ active }) {
  const tabs = [['CHECKS', 'Orders Layout.html'], ['MENU', 'Menu Layout.html'], ['REFUND', 'Refund Layout.html']];
  return (
    <header style={{ height:76, flex:'0 0 auto', display:'flex', alignItems:'center', gap:14, padding:'0 12px' }}>
      <button aria-label="Menú" style={S.sq} onClick={() => window.dispatchEvent(new Event('v2-rail'))}><Icon name="menu" size={22} /></button>
      <span style={{ fontSize:'var(--text-h3)', fontWeight:'var(--weight-semibold)' }}>Isaac</span>
      <button aria-label="Buscar" style={{ ...S.sq, marginRight:'auto' }} onClick={() => v2Go('Search Layout.html')}><Icon name="search" size={22} /></button>
      {tabs.map(([t, f]) => <button key={t} style={S.pill(t === active)} onClick={() => t !== active && v2Go(f)}>{t}</button>)}
    </header>
  );
}

const V2_RAIL = [['menu', 'circle-plus', 'Nueva orden', 'Menu Layout.html'], ['checks', 'clipboard-list', 'Checks', 'Orders Layout.html'],
  ['cocina', 'chef-hat', 'Cocina', 'Kitchen Layout.html'], ['turno', 'history', 'Turno', 'Shift Layout.html'], ['promos', 'tag', 'Descuentos', null],
  ['personal', 'users', 'Personal', 'Settings Layout.html'], ['ajustes', 'settings', 'Ajustes', 'Settings Layout.html']];
function V2Rail({ active }) {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => { const f = () => setOpen((o) => !o); window.addEventListener('v2-rail', f); return () => window.removeEventListener('v2-rail', f); }, []);
  const item = (id, ic, label, file, danger) => {
    const on = id === active;
    return (
      <button key={id} title={open ? undefined : label} onClick={() => file && !on && v2Go(file)} style={{ height:56, width:'100%', display:'flex', alignItems:'center',
        justifyContent: open ? 'flex-start' : 'center', gap:12, padding: open ? '0 16px' : 0, borderRadius:'var(--radius-sm)', border:'none', fontFamily:'inherit',
        background: on ? 'var(--surface-inverse)' : 'transparent', color: on ? 'var(--text-on-inverse)' : danger ? 'var(--danger-ink)' : 'var(--text-primary)',
        fontSize:'var(--text-sm)', fontWeight:'var(--weight-medium)', cursor: file ? 'pointer' : 'default', whiteSpace:'nowrap', overflow:'hidden' }}>
        <Icon name={ic} size={22} />{open && label}
      </button>
    );
  };
  return (
    <nav style={{ ...S.panel, width: open ? 210 : 84, flex:'0 0 auto', display:'flex', flexDirection:'column', gap:6, padding:14, boxSizing:'border-box', transition:'width 200ms ease' }}>
      {V2_RAIL.map((r) => item(...r))}
      <div style={{ marginTop:'auto' }}>{item('exit', 'log-out', 'Salir', 'index.html', true)}</div>
    </nav>
  );
}

function V2Modes({ mode, setMode }) {
  return (
    <div style={{ display:'flex', gap:8, overflowX:'auto', padding:'4px 0 14px', borderBottom:'1px solid var(--border-hairline)', scrollbarWidth:'none' }}>
      {V2_MODES.map(([m, ic]) => {
        const on = m === mode;
        return (
          <button key={m} onClick={() => setMode && setMode(m)} style={{ flex:'0 0 auto', height:46, padding:'0 18px', borderRadius:'var(--radius-pill)', fontFamily:'inherit',
            border: on ? '1px solid transparent' : '1px solid var(--border-strong)', background: on ? 'var(--surface-accent)' : 'transparent',
            color: on ? 'var(--text-on-light)' : 'var(--text-primary)', fontSize:'var(--text-sm)', fontWeight:'var(--weight-semibold)', display:'flex', alignItems:'center', gap:8, cursor:'pointer' }}>
            <Icon name={ic} size={18} />{m}
          </button>
        );
      })}
    </div>
  );
}

function V2Line({ line, onQty, compact }) {
  const { sub, iva } = ivaOf(lineTotal(line));
  return (
    <div style={{ background:'var(--surface-card)', borderRadius:'var(--radius-md)', padding:'14px 16px', display:'flex', gap:10 }}>
      <div style={{ flex:1, minWidth:0, display:'flex', flexDirection:'column', gap:3 }}>
        <span style={{ fontSize:'var(--text-h3)', fontWeight:'var(--weight-semibold)', color:window.inkOf('var(--periwinkle-200)'), lineHeight:1.2 }}>{line.name}</span>
        <span style={{ fontSize:'var(--text-sm)', color:'var(--text-secondary)' }}>{money(line.unit)}</span>
        {line.mods.length > 0 && <span style={{ fontSize:'var(--text-sm)', color:'var(--text-secondary)', borderLeft:'2px solid var(--border-strong)', paddingLeft:8 }}>{line.mods.join(' · ')}</span>}
        {compact && <span style={{ fontSize:'var(--text-xs)', color:'var(--text-muted)' }}>Subtotal {money(sub)} &nbsp; IVA {money(iva)}</span>}
      </div>
      {onQty
        ? <div style={{ display:'flex', alignItems:'center', gap:12, alignSelf:'flex-start' }}>
            <button aria-label="Quitar uno" onClick={() => onQty(line.qty - 1)} style={{ width:36, height:36, borderRadius:'var(--radius-xs)', border:'1px solid var(--border-strong)', background:'transparent', color:'var(--text-primary)', cursor:'pointer', display:'inline-flex', alignItems:'center', justifyContent:'center' }}><Icon name="minus" size={16} /></button>
            <span style={{ fontVariantNumeric:'tabular-nums', minWidth:12, textAlign:'center' }}>{line.qty}</span>
            <button aria-label="Agregar uno" onClick={() => onQty(line.qty + 1)} style={{ width:36, height:36, borderRadius:'var(--radius-xs)', border:'1px solid var(--border-strong)', background:'transparent', color:'var(--text-primary)', cursor:'pointer', display:'inline-flex', alignItems:'center', justifyContent:'center' }}><Icon name="plus" size={16} /></button>
          </div>
        : <span style={{ alignSelf:'center', color:'var(--text-secondary)', fontSize:'var(--text-sm)' }}>×{line.qty}</span>}
    </div>
  );
}

function V2Shell({ active, tab, children }) {
  return (
    <div style={{ height:'100%', display:'flex', flexDirection:'column', background:'var(--surface-canvas)' }}>
      <V2TopBar active={tab} />
      <div style={{ flex:1, minHeight:0, display:'flex', gap:12, padding:'0 12px 12px' }}>
        <V2Rail active={active} />
        {children}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- acceso */
function V2Login() {
  const [pin, setPin] = React.useState('');
  const [now, setNow] = React.useState(new Date());
  React.useEffect(() => { const t = setInterval(() => setNow(new Date()), 30000); return () => clearInterval(t); }, []);
  const push = (k) => {
    if (k === 'del') return setPin((p) => p.slice(0, -1));
    const next = (pin + k).slice(0, 4); setPin(next);
    if (next.length === 4) setTimeout(() => v2Go('Menu Layout.html'), 280);
  };
  React.useEffect(() => {
    const f = (e) => { if (/^\d$/.test(e.key)) push(e.key); if (e.key === 'Backspace') push('del'); };
    window.addEventListener('keydown', f); return () => window.removeEventListener('keydown', f);
  });
  const d0 = now.toLocaleDateString('es-MX', { weekday:'long', day:'numeric', month:'short', year:'numeric' });
  const date = d0.charAt(0).toUpperCase() + d0.slice(1);
  const time = now.toLocaleTimeString('es-MX', { hour:'2-digit', minute:'2-digit', hour12:false });
  const key = (k, content, style) => (
    <button key={k} aria-label={k === 'del' ? 'Borrar' : k} onClick={() => push(k)} style={{ width:84, height:84, borderRadius:'var(--radius-md)', border:'none', background:'var(--surface-raised)',
      color: k === 'del' ? 'var(--danger-ink)' : 'var(--text-primary)', fontFamily:'inherit', fontSize:'var(--text-h2)', fontWeight:'var(--weight-medium)', cursor:'pointer', display:'inline-flex', alignItems:'center', justifyContent:'center', ...style }}>{content}</button>
  );
  return (
    <div style={{ height:'100%', display:'flex', flexDirection:'column', background:'var(--surface-canvas)', padding:'20px 24px 24px', boxSizing:'border-box', gap:20 }}>
      <header style={{ display:'flex', alignItems:'center', gap:18 }}>
        <span style={{ display:'flex', flexDirection:'column', lineHeight:1.1 }}>
          <b style={{ fontSize:'var(--text-h3)', fontWeight:'var(--weight-semibold)' }}>Compos</b>
          <span style={{ fontSize:'var(--text-xs)', color:'var(--text-secondary)' }}>Semper listo</span>
        </span>
        <span style={{ fontSize:'var(--text-h3)', fontWeight:'var(--weight-semibold)' }}>Turno</span>
        <span style={{ fontSize:'var(--text-sm)', color:'var(--text-secondary)' }}>{date} • {time}</span>
        <span style={{ marginLeft:'auto', display:'flex', gap:22 }}>
          {['Impresora', 'Cajón', 'Sync'].map((s) => (
            <span key={s} style={{ display:'flex', alignItems:'center', gap:8, fontSize:'var(--text-xs)', fontWeight:'var(--weight-medium)', letterSpacing:'var(--tracking-wide)', textTransform:'uppercase', color:'var(--text-secondary)' }}>
              <span style={{ width:9, height:9, borderRadius:5, background:'var(--status-danger)' }}></span>{s}
            </span>
          ))}
        </span>
      </header>
      <div style={{ flex:1, minHeight:0, display:'flex', gap:28 }}>
        <div style={{ flex:1, display:'flex', flexDirection:'column', gap:12 }}>
          <button style={{ display:'flex', alignItems:'center', gap:18, height:104, padding:'0 24px', borderRadius:'var(--radius-md)', border:'none', background:'var(--surface-accent)', color:'var(--text-on-light)', textAlign:'left', fontFamily:'inherit', cursor:'pointer' }}>
            <span style={{ width:56, height:56, borderRadius:28, background:'var(--white)', display:'inline-flex', alignItems:'center', justifyContent:'center', fontSize:'var(--text-h3)' }}>I</span>
            <span style={{ display:'flex', flexDirection:'column' }}><b style={{ fontSize:'var(--text-h2)', fontWeight:'var(--weight-medium)' }}>Isaac</b><span style={{ fontSize:'var(--text-sm)' }}>Administrador</span></span>
          </button>
        </div>
        <div style={{ ...S.panel, flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:40 }}>
          <span style={{ fontSize:'var(--text-h3)', color:'var(--text-secondary)', fontWeight:'var(--weight-medium)' }}>Ingresa tu PIN</span>
          <div style={{ display:'flex', gap:14 }}>{[0, 1, 2, 3].map((i) => <span key={i} style={{ width:18, height:18, borderRadius:9, background: i < pin.length ? 'var(--surface-accent)' : 'var(--surface-raised)', transition:'background 120ms' }}></span>)}</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 84px)', gap:16, marginTop:40 }}>
            {['1','2','3','4','5','6','7','8','9'].map((k) => key(k, k))}
            <span></span>{key('0', '0')}{key('del', <Icon name="delete" size={28} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ menú */
function V2ProductCard({ item, onPick }) {
  const opts = V2_OPTIONS[item.cat.id];
  return (
    <button onClick={() => onPick(item)} style={{ display:'flex', flexDirection:'column', borderRadius:'var(--radius-md)', overflow:'hidden', border:'none', padding:0, background:'var(--surface-card)', cursor:'pointer', fontFamily:'inherit', textAlign:'left', minWidth:0 }}>
      <span style={{ background:item.cat.color, color:'var(--text-on-light)', display:'flex', alignItems:'center', gap:12, padding:'14px 14px', minHeight:80, boxSizing:'border-box' }}>
        <span style={{ width:38, height:38, flex:'0 0 auto', borderRadius:19, background:'rgba(17,19,21,.08)', display:'inline-flex', alignItems:'center', justifyContent:'center' }}><Icon name={item.cat.icon} size={20} /></span>
        <span style={{ fontSize:'var(--text-h3)', fontWeight:'var(--weight-semibold)', lineHeight:1.15 }}>{item.name}</span>
      </span>
      <span style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'16px 14px', color:'var(--text-primary)' }}>
        <span style={{ fontSize:'var(--text-h2)', fontWeight:'var(--weight-bold)', fontVariantNumeric:'tabular-nums' }}>{money(item.price)}</span>
        {opts && <span style={{ width:38, height:38, borderRadius:'var(--radius-xs)', background:'var(--surface-raised)', display:'inline-flex', alignItems:'center', justifyContent:'center', color:'var(--text-secondary)' }}><Icon name="sliders-vertical" size={18} /></span>}
      </span>
    </button>
  );
}

function V2Options({ item, onCancel, onAdd }) {
  const groups = V2_OPTIONS[item.cat.id] || [];
  const [sel, setSel] = React.useState({});
  const toggle = (g, o) => setSel((s) => {
    const cur = s[g.id] || [];
    if (cur.includes(o)) return { ...s, [g.id]:cur.filter((x) => x !== o) };
    return { ...s, [g.id]: g.max === 1 ? [o] : cur.length >= g.max ? cur : [...cur, o] };
  });
  const chosen = groups.flatMap((g) => (sel[g.id] || []).map((o) => g.options.find((x) => x[0] === o)));
  const total = item.price + chosen.reduce((s, [, d]) => s + d, 0);
  return (
    <React.Fragment>
      <main style={{ ...S.panel, flex:1, minWidth:0, padding:'22px 24px', display:'flex', flexDirection:'column', gap:22, overflowY:'auto' }}>
        <div><div style={{ fontSize:'var(--text-h2)', fontWeight:'var(--weight-semibold)' }}>{item.name}</div>
          <div style={{ fontSize:'var(--text-sm)', color:'var(--text-secondary)' }}>Elige las opciones del producto</div></div>
        {groups.map((g) => (
          <section key={g.id} style={{ display:'flex', flexDirection:'column', gap:12, maxWidth:420 }}>
            <div style={{ paddingBottom:10, borderBottom:'1px solid var(--border-hairline)' }}>
              <div style={{ fontSize:'var(--text-h3)', fontWeight:'var(--weight-semibold)' }}>{g.name}</div>
              <div style={{ fontSize:'var(--text-xs)', color:'var(--text-secondary)' }}>{g.max === 1 ? 'Elige 1' : 'Hasta ' + g.max}</div>
            </div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:10 }}>
              {g.options.map(([o, d]) => {
                const on = (sel[g.id] || []).includes(o);
                return (
                  <button key={o} onClick={() => toggle(g, o)} aria-pressed={on} style={{ width:238, minHeight:64, padding:'10px 14px', boxSizing:'border-box', borderRadius:'var(--radius-md)', fontFamily:'inherit',
                    border: on ? '1px solid transparent' : '1px solid var(--border-strong)', background: on ? 'var(--surface-accent)' : 'var(--surface-card)',
                    color: on ? 'var(--text-on-light)' : 'var(--text-primary)', display:'flex', alignItems:'center', justifyContent:'space-between', gap:10, cursor:'pointer', textAlign:'left' }}>
                    <span style={{ fontSize:'var(--text-body)', fontWeight:'var(--weight-medium)' }}>{o}</span>
                    {d > 0 && <span style={{ fontSize:'var(--text-sm)' }}>+ {money(d)}</span>}
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </main>
      <aside style={{ ...S.panel, width:360, flex:'0 0 auto', padding:20, boxSizing:'border-box', display:'flex', flexDirection:'column', gap:16 }}>
        <div style={{ fontSize:'var(--text-h2)', fontWeight:'var(--weight-semibold)' }}>{item.name}</div>
        <div style={{ flex:1, background:'var(--surface-card)', borderRadius:'var(--radius-md)', padding:'16px 18px', display:'flex', flexDirection:'column', gap:10 }}>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:'var(--text-body)' }}><span>Precio base</span><span>{money(item.price)}</span></div>
          {chosen.map(([o, d]) => <div key={o} style={{ display:'flex', justifyContent:'space-between', fontSize:'var(--text-sm)', color:'var(--text-secondary)' }}><span>{o}</span><span>+ {money(d)}</span></div>)}
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', borderTop:'1px solid var(--border-strong)', paddingTop:10 }}>
            <b style={{ fontSize:'var(--text-h3)' }}>Total</b><b style={{ fontSize:'var(--text-metric)', fontWeight:'var(--weight-semibold)', fontVariantNumeric:'tabular-nums' }}>{money(total)}</b>
          </div>
        </div>
        <button onClick={onCancel} style={{ ...S.bigBtn('ghost'), flex:'0 0 auto' }}>Cancelar</button>
        <button onClick={() => onAdd({ name:item.name, base:item.price, unit:total, qty:1, mods:chosen.map(([o]) => o) })} style={{ ...S.bigBtn('primary'), flex:'0 0 auto' }}>Agregar</button>
      </aside>
    </React.Fragment>
  );
}

function V2Menu() {
  const [data, setData] = React.useState(v2Load);
  const [cat, setCat] = React.useState('todos');
  const [mode, setMode] = React.useState('Aquí');
  const [lines, setLines] = React.useState([]);
  const [picking, setPicking] = React.useState(() => {
    const h = decodeURIComponent(location.hash.slice(1)); const m = h.match(/^opciones(?:=(.+))?$/);
    return m ? V2_ALL.find((i) => i.name === (m[1] || 'Americano naranja')) || null : null;
  });
  const items = cat === 'todos' ? V2_ALL : V2_ALL.filter((i) => i.cat.id === cat);
  const add = (l) => setLines((ls) => {
    const k = ls.findIndex((x) => x.name === l.name && x.mods.join() === l.mods.join());
    if (k < 0) return [...ls, l];
    const n = ls.slice(); n[k] = { ...n[k], qty:n[k].qty + l.qty }; return n;
  });
  const pick = (item) => V2_OPTIONS[item.cat.id] ? setPicking(item) : add({ name:item.name, base:item.price, unit:item.price, qty:1, mods:[] });
  const setQty = (i, q) => setLines((ls) => q <= 0 ? ls.filter((_, k) => k !== i) : ls.map((l, k) => k === i ? { ...l, qty:q } : l));
  const total = lines.reduce((s, l) => s + lineTotal(l), 0);
  const charge = () => {
    const d = v2Load(); const id = v2Next(d);
    d.orders.unshift({ id, mode, status:'abierta', opened:Date.now(), lines }); v2Save(d); setData(d);
    v2Go('Payment Layout.html', { 'compos-v2-pay':id });
  };
  const cats = [{ id:'todos', name:'Todos', icon:'layout-grid', count:V2_ALL.length, color:null }, ...V2_CATS.map((c) => ({ ...c, count:c.items.length }))];
  return (
    <V2Shell active="menu" tab="MENU">
      {picking ? <V2Options item={picking} onCancel={() => setPicking(null)} onAdd={(l) => { add(l); setPicking(null); }} /> : <React.Fragment>
        <main style={{ ...S.panel, flex:1, minWidth:0, display:'flex', flexDirection:'column', overflow:'hidden' }}>
          <div style={{ flex:1, overflowY:'auto', padding:22, display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))', gridAutoRows:'min-content', gap:14 }}>
            {items.map((it) => <V2ProductCard key={it.name} item={it} onPick={pick} />)}
          </div>
          <div style={{ flex:'0 0 auto', display:'flex', gap:10, overflowX:'auto', padding:'16px 22px 20px', borderTop:'1px solid var(--border-hairline)' }}>
            {cats.map((c) => {
              const on = c.id === cat;
              const ink = c.color ? window.inkOf(c.color) : 'var(--text-primary)';
              return (
                <button key={c.id} onClick={() => setCat(c.id)} style={{ flex:'0 0 auto', height:56, padding:'0 18px', borderRadius:'var(--radius-sm)', fontFamily:'inherit',
                  border:`1.5px solid ${c.color ? ink : 'var(--text-primary)'}`, background: on ? (c.color || 'var(--surface-inverse)') : 'transparent',
                  color: on ? (c.color ? 'var(--text-on-light)' : 'var(--text-on-inverse)') : ink, fontSize:'var(--text-sm)', fontWeight:'var(--weight-semibold)', display:'flex', alignItems:'center', gap:10, cursor:'pointer' }}>
                  <Icon name={c.icon} size={20} />{c.name}<span style={{ fontSize:'var(--text-xs)', opacity:.7, fontWeight:'var(--weight-medium)' }}>{c.count}</span>
                </button>
              );
            })}
          </div>
        </main>
        <aside style={{ ...S.panel, width:360, flex:'0 0 auto', padding:20, boxSizing:'border-box', display:'flex', flexDirection:'column', gap:6 }}>
          <div style={{ fontSize:'var(--text-h2)', fontWeight:'var(--weight-semibold)', marginBottom:6 }}>Nueva orden</div>
          <V2Modes mode={mode} setMode={setMode} />
          <div style={{ flex:1, minHeight:0, overflowY:'auto', display:'flex', flexDirection:'column', gap:8, paddingTop:8 }}>
            {lines.length === 0
              ? <div style={{ margin:'auto 0', display:'flex', flexDirection:'column', alignItems:'center', gap:10, color:'var(--text-secondary)', fontSize:'var(--text-sm)', textAlign:'center' }}><Icon name="shopping-cart" size={26} />Toca un producto para agregarlo a la orden.</div>
              : lines.map((l, i) => <V2Line key={i} line={l} onQty={(q) => setQty(i, q)} />)}
          </div>
          <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', padding:'10px 4px 14px' }}>
            <span style={{ fontSize:'var(--text-h2)', fontWeight:'var(--weight-medium)' }}>Total</span>
            <span style={{ fontSize:'var(--text-metric)', fontWeight:'var(--weight-semibold)', fontVariantNumeric:'tabular-nums' }}>{money(total)}</span>
          </div>
          <div style={{ display:'flex', gap:10 }}>
            <button style={S.bigBtn('outline')} disabled={!lines.length} onClick={() => setLines([])}>Nueva orden</button>
            <button style={{ ...S.bigBtn('primary'), ...(lines.length ? {} : { background:'var(--surface-raised)', color:'var(--text-muted)' }) }} disabled={!lines.length} onClick={charge}>Cobrar</button>
          </div>
        </aside>
      </React.Fragment>}
    </V2Shell>
  );
}

/* ----------------------------------------------------------------- cobro */
function V2OrderSummary({ order, footer, onQty, onDelete }) {
  const total = orderTotal(order); const { sub, iva } = ivaOf(total);
  return (
    <aside style={{ ...S.panel, width:360, flex:1, minHeight:0, padding:20, boxSizing:'border-box', display:'flex', flexDirection:'column', gap:8 }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:6 }}>
        <span style={{ fontSize:'var(--text-h2)', fontWeight:'var(--weight-semibold)' }}>Orden #{order.id}</span>
        {onDelete && <button aria-label="Eliminar orden" onClick={onDelete} style={{ ...S.sq, width:40, height:40 }}><Icon name="trash-2" size={18} /></button>}
      </div>
      <V2Modes mode={order.mode} />
      <div style={{ flex:1, minHeight:0, overflowY:'auto', display:'flex', flexDirection:'column', gap:8, paddingTop:8 }}>
        {order.lines.map((l, i) => <V2Line key={i} line={l} compact={!onQty} onQty={onQty ? (q) => onQty(i, q) : null} />)}
      </div>
      {footer === 'totals'
        ? <div style={{ background:'var(--surface-card)', borderRadius:'var(--radius-md)', padding:'16px 18px', display:'flex', flexDirection:'column', gap:8, fontSize:'var(--text-sm)', color:'var(--text-secondary)' }}>
            <div style={{ display:'flex', justifyContent:'space-between' }}><span>Subtotal</span><span>{money(sub)}</span></div>
            <div style={{ display:'flex', justifyContent:'space-between' }}><span>IVA</span><span>{money(iva)}</span></div>
            <div style={{ display:'flex', justifyContent:'space-between', paddingBottom:10, borderBottom:'1px dashed var(--border-strong)' }}><span>Descuento</span><span>{money(0)}</span></div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', color:'var(--text-primary)' }}><b style={{ fontSize:'var(--text-h3)' }}>Total</b><b style={{ fontSize:'var(--text-h2)', fontVariantNumeric:'tabular-nums' }}>{money(total)}</b></div>
          </div>
        : <div style={{ background:'var(--surface-card)', borderRadius:'var(--radius-md)', padding:'16px 18px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <b style={{ fontSize:'var(--text-h3)', fontWeight:'var(--weight-medium)' }}>Total</b>
            <span style={{ display:'flex', alignItems:'center', gap:8 }}><b style={{ fontSize:'var(--text-h2)', fontVariantNumeric:'tabular-nums' }}>{money(total)}</b><Icon name="chevron-down" size={16} /></span>
          </div>}
    </aside>
  );
}

function V2Payment() {
  const [data, setData] = React.useState(v2Load);
  const id = (() => { try { return localStorage.getItem('compos-v2-pay'); } catch (e) { return null; } })();
  const order = data.orders.find((o) => o.id === id) || data.orders.find((o) => o.status !== 'cerrada') || data.orders[0];
  const total = orderTotal(order);
  const [method, setMethod] = React.useState('Efectivo');
  const [amt, setAmt] = React.useState(String(total));
  const [fresh, setFresh] = React.useState(true);
  const [done, setDone] = React.useState(false);
  const recv = parseFloat(amt || '0') || 0;
  const key = (k) => {
    setFresh(false);
    setAmt((a) => {
      const cur = fresh ? '' : a;
      if (k === 'del') return cur.slice(0, -1);
      if (k === '.' && cur.includes('.')) return cur;
      if (/\.\d{2}$/.test(cur)) return cur;
      return (cur === '0' && k !== '.' ? '' : cur) + k;
    });
  };
  const pay = () => {
    const d = v2Load(); const o = d.orders.find((x) => x.id === order.id); if (o) { o.status = 'cerrada'; o.paidWith = method; } v2Save(d); setData(d); setDone(true);
    setTimeout(() => v2Go('Orders Layout.html'), 1100);
  };
  const methods = [['Efectivo', 'circle-dollar-sign'], ['Débito', 'credit-card'], ['Crédito', 'credit-card'], ['Transferencia', 'qr-code'], ['Vale', 'receipt']];
  const cash = method === 'Efectivo';
  const change = recv - total;
  const keypad = ['1','2','3','4','5','6','7','8','9','.','0','del'];
  return (
    <V2Shell active="menu" tab="MENU">
      <main style={{ ...S.panel, flex:1, minWidth:0, padding:'22px 22px', display:'flex', flexDirection:'column', gap:14 }}>
        <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between' }}>
          <div><div style={{ fontSize:'var(--text-h2)', fontWeight:'var(--weight-semibold)' }}>Cobrar</div><div style={{ fontSize:'var(--text-sm)', color:'var(--text-secondary)' }}>{order.id}</div></div>
          <button onClick={() => v2Go('Orders Layout.html')} style={{ border:'none', background:'transparent', color:'var(--danger-ink)', fontFamily:'inherit', fontSize:'var(--text-sm)', cursor:'pointer', padding:'6px 0' }}>Cancelar</button>
        </div>
        <div style={{ flex:1, minHeight:0, display:'flex', gap:18 }}>
          <div style={{ width:160, flex:'0 0 auto', display:'flex', flexDirection:'column', gap:10 }}>
            <span style={{ fontSize:'var(--text-sm)', color:'var(--text-secondary)' }}>Método de pago</span>
            {methods.map(([m, ic]) => {
              const on = m === method;
              return (
                <button key={m} onClick={() => setMethod(m)} aria-pressed={on} style={{ height:68, display:'flex', alignItems:'center', gap:12, padding:'0 16px', borderRadius:'var(--radius-sm)', border:'none', fontFamily:'inherit',
                  background: on ? 'var(--surface-inverse)' : 'var(--surface-raised)', color: on ? 'var(--text-on-inverse)' : 'var(--text-primary)', fontSize:'var(--text-h3)', fontWeight:'var(--weight-medium)', cursor:'pointer', whiteSpace:'nowrap', overflow:'hidden' }}>
                  <Icon name={ic} size={22} />{m === 'Transferencia' ? 'Transf.' : m}
                </button>
              );
            })}
          </div>
          <div style={{ flex:1, minWidth:0, display:'flex', flexDirection:'column', alignItems:'center', gap:14 }}>
            <span style={{ fontSize:'var(--text-sm)', color:'var(--text-secondary)' }}>{cash ? 'Monto recibido' : 'Monto a cobrar'}</span>
            <span style={{ fontSize:'var(--text-metric)', fontWeight:'var(--weight-semibold)', fontVariantNumeric:'tabular-nums', lineHeight:1 }}>{money(cash ? recv : total)}</span>
            {cash && <span style={{ fontSize:'var(--text-sm)', color: change >= 0 ? 'var(--text-positive)' : 'var(--status-checkedin)', minHeight:20 }}>{change >= 0 ? 'Cambio ' + money(change) : 'Faltan ' + money(-change)}</span>}
            {cash && <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:8 }}>
              {[['Exacto', total], ['$50', 50], ['$100', 100], ['$200', 200], ['$500', 500]].map(([l, v]) => (
                <button key={l} onClick={() => { setAmt(String(v)); setFresh(true); }} style={{ height:44, padding:'0 16px', borderRadius:'var(--radius-pill)', border:'1px solid var(--border-strong)', background:'transparent', color:'var(--text-primary)', fontFamily:'inherit', fontSize:'var(--text-sm)', cursor:'pointer' }}>{l}</button>
              ))}
            </div>}
            {cash && <div style={{ display:'grid', gridTemplateColumns:'repeat(3, minmax(0, 1fr))', gap:12, width:'100%', maxWidth:300, marginTop:'auto' }}>
              {keypad.map((k) => (
                <button key={k} aria-label={k === 'del' ? 'Borrar' : k} onClick={() => key(k)} style={{ height:72, borderRadius:'var(--radius-sm)', border:'none', background:'var(--surface-raised)', color: k === 'del' ? 'var(--danger-ink)' : 'var(--text-primary)', fontFamily:'inherit', fontSize:'var(--text-h2)', cursor:'pointer', display:'inline-flex', alignItems:'center', justifyContent:'center' }}>
                  {k === 'del' ? <Icon name="delete" size={26} /> : k}
                </button>
              ))}
            </div>}
            {!cash && <div style={{ margin:'auto 0', display:'flex', flexDirection:'column', alignItems:'center', gap:10, color:'var(--text-secondary)', fontSize:'var(--text-sm)', textAlign:'center', maxWidth:260 }}>
              <Icon name={method === 'Transferencia' ? 'qr-code' : method === 'Vale' ? 'receipt' : 'credit-card'} size={36} />
              {method === 'Transferencia' ? 'Muestra el QR al cliente y confirma cuando llegue la transferencia.' : method === 'Vale' ? 'Captura el folio del vale y confirma el pago.' : 'Cobra en la terminal y confirma cuando se apruebe.'}
            </div>}
          </div>
        </div>
      </main>
      <div style={{ width:360, flex:'0 0 auto', display:'flex', flexDirection:'column', gap:12 }}>
        <V2OrderSummary order={order} footer="totals" />
        <button onClick={pay} disabled={done || (cash && recv < total)} style={{ ...S.bigBtn('primary'), flex:'0 0 auto', ...(cash && recv < total ? { background:'var(--surface-raised)', color:'var(--text-muted)' } : {}) }}>
          {done ? '¡Pagado!' : 'Pagar'}
        </button>
      </div>
    </V2Shell>
  );
}

/* ---------------------------------------------------------------- checks */
function V2Checks() {
  const [data, setData] = React.useState(v2Load);
  const [filter, setFilter] = React.useState('abierta');
  const [selId, setSelId] = React.useState(null);
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => { const t = setInterval(() => setTick((x) => x + 1), 1000); return () => clearInterval(t); }, []);
  const save = (d) => { v2Save(d); setData({ ...d }); };
  const list = data.orders.filter((o) => o.status === filter);
  const sel = data.orders.find((o) => o.id === selId) || list[0] || null;
  const count = (s) => data.orders.filter((o) => o.status === s).length;
  const elapsed = (o) => { const s = Math.max(0, Math.floor((Date.now() - o.opened) / 1000)); return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0'); };
  const setQty = (i, q) => { const d = v2Load(); const o = d.orders.find((x) => x.id === sel.id); if (!o) return; if (q <= 0) o.lines.splice(i, 1); else o.lines[i].qty = q; save(d); };
  const setStatus = (s) => { const d = v2Load(); const o = d.orders.find((x) => x.id === sel.id); if (o) o.status = s; save(d); };
  const remove = () => { const d = v2Load(); d.orders = d.orders.filter((x) => x.id !== sel.id); save(d); setSelId(null); };
  const tabs = [['abierta', 'circle-dot', 'var(--sky-200)'], ['por-cerrar', 'flame', 'var(--order-warn)'], ['cerrada', 'circle-check', 'var(--text-secondary)']];
  const act = (label, ic, onClick, tone, disabled) => (
    <button onClick={onClick} disabled={disabled} style={{ height:48, padding:'0 18px', borderRadius:'var(--radius-pill)', fontFamily:'inherit', fontSize:'var(--text-sm)', fontWeight:'var(--weight-semibold)',
      border:`1px solid ${tone === 'danger' ? 'var(--danger-ink)' : 'var(--border-strong)'}`, background:'transparent', color: tone === 'danger' ? 'var(--danger-ink)' : 'var(--text-primary)',
      display:'flex', alignItems:'center', gap:8, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? .45 : 1 }}><Icon name={ic} size={18} />{label}</button>
  );
  return (
    <V2Shell active="checks" tab="CHECKS">
      <main style={{ ...S.panel, flex:1, minWidth:0, display:'flex', flexDirection:'column', overflow:'hidden' }}>
        <div style={{ padding:'24px 24px 0', fontSize:'var(--text-h1)', fontWeight:'var(--weight-semibold)' }}>Checks</div>
        <div style={{ flex:1, overflowY:'auto', padding:24, display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(380px, 1fr))', gridAutoRows:'min-content', gap:14 }}>
          {list.length === 0 && <div style={{ gridColumn:'1/-1', color:'var(--text-secondary)', fontSize:'var(--text-sm)', padding:'40px 0', textAlign:'center' }}>No hay órdenes {V2_STATUS[filter].toLowerCase()}s.</div>}
          {list.map((o) => {
            const on = sel && o.id === sel.id;
            return (
              <button key={o.id} onClick={() => setSelId(o.id)} style={{ textAlign:'left', fontFamily:'inherit', color:'var(--text-primary)', cursor:'pointer', background:'var(--surface-card)', borderRadius:'var(--radius-md)',
                border: on ? '2px solid var(--text-primary)' : '2px solid transparent', padding:16, display:'flex', flexDirection:'column', gap:12 }}>
                <span style={{ display:'flex', alignItems:'flex-start', gap:12 }}>
                  <span style={{ width:50, height:50, borderRadius:'var(--radius-sm)', background:'var(--sky-200)', color:'var(--text-on-light)', display:'inline-flex', alignItems:'center', justifyContent:'center' }}><Icon name={o.mode === 'Domicilio' ? 'bike' : o.mode === 'Pickup' ? 'shopping-bag' : 'utensils'} size={24} /></span>
                  <span style={{ flex:1, display:'flex', flexDirection:'column', gap:6 }}>
                    <span style={{ fontSize:'var(--text-h3)', fontWeight:'var(--weight-semibold)' }}>Orden <span style={{ color:window.inkOf('var(--mint-200)') }}>#{o.id}</span></span>
                    <span style={{ alignSelf:'flex-start', display:'inline-flex', alignItems:'center', gap:6, height:26, padding:'0 10px', borderRadius:'var(--radius-pill)', border:'1px solid ' + window.inkOf('var(--sky-200)'), color:window.inkOf('var(--sky-200)'), fontSize:'var(--text-xs)', fontWeight:'var(--weight-semibold)' }}><Icon name="circle-dot" size={12} />{V2_STATUS[o.status]}</span>
                  </span>
                  <span style={{ display:'inline-flex', alignItems:'center', gap:6, height:30, padding:'0 10px', borderRadius:'var(--radius-pill)', background:'var(--surface-raised)', fontSize:'var(--text-sm)', fontVariantNumeric:'tabular-nums' }}><Icon name="timer" size={14} />{elapsed(o)}</span>
                </span>
                <span style={{ fontSize:'var(--text-xs)', color:'var(--text-secondary)' }}>{o.mode}</span>
                <span style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  {o.lines.map((l, i) => (
                    <span key={i} style={{ display:'flex', alignItems:'center', gap:10, background:'var(--surface-panel)', borderRadius:'var(--radius-sm)', padding:'10px 12px' }}>
                      <span style={{ width:24, height:24, borderRadius:'var(--radius-xs)', background:'var(--surface-raised)', display:'inline-flex', alignItems:'center', justifyContent:'center', fontSize:'var(--text-xs)' }}>{l.qty}</span>
                      <span style={{ flex:1, display:'flex', flexDirection:'column' }}><span style={{ fontSize:'var(--text-sm)' }}>{l.name}</span>{l.mods.length > 0 && <span style={{ fontSize:'var(--text-xs)', color:'var(--text-secondary)' }}>{l.mods.join(' · ')}</span>}</span>
                      <span style={{ fontSize:'var(--text-sm)', fontVariantNumeric:'tabular-nums' }}>{money(lineTotal(l))}</span>
                    </span>
                  ))}
                </span>
                <span style={{ display:'flex', alignItems:'center', justifyContent:'flex-end', gap:10, borderTop:'1px solid var(--border-hairline)', paddingTop:12 }}>
                  <span style={{ fontSize:'var(--text-xs)', color:'var(--text-secondary)' }}>Subtotal</span><b style={{ fontSize:'var(--text-h3)', fontVariantNumeric:'tabular-nums' }}>{money(orderTotal(o))}</b>
                </span>
              </button>
            );
          })}
        </div>
        <div style={{ flex:'0 0 auto', borderTop:'1px solid var(--border-hairline)', padding:'16px 24px 20px', display:'flex', flexDirection:'column', gap:14 }}>
          <div style={{ display:'flex', flexWrap:'wrap', gap:10 }}>
            {act('Dividir', 'split', () => v2Go('Split Layout.html'), null, !sel)}
            {act('Combinar', 'merge', null, null, true)}
            <span style={{ marginLeft:'auto' }}>{act('Cancelar', 'x', remove, 'danger', !sel)}</span>
            {act('Imprimir', 'printer', null, null, true)}
          </div>
          <div style={{ display:'flex', gap:10 }}>
            {tabs.map(([s, ic, color]) => {
              const on = s === filter;
              return (
                <button key={s} onClick={() => { setFilter(s); setSelId(null); }} aria-pressed={on} style={{ flex:1, height:58, borderRadius:'var(--radius-sm)', fontFamily:'inherit', display:'flex', alignItems:'center', gap:10, padding:'0 16px',
                  border:`1.5px solid ${on ? 'transparent' : window.inkOf(color)}`, background: on ? color : 'transparent', color: on ? 'var(--text-on-light)' : window.inkOf(color), fontSize:'var(--text-sm)', fontWeight:'var(--weight-semibold)', cursor:'pointer', whiteSpace:'nowrap' }}>
                  <Icon name={ic} size={20} />{V2_STATUS[s]}<span style={{ marginLeft:'auto', minWidth:24, height:24, padding:'0 6px', boxSizing:'border-box', borderRadius:12, background:'rgba(127,127,127,.25)', display:'inline-flex', alignItems:'center', justifyContent:'center', fontSize:'var(--text-xs)' }}>{count(s)}</span>
                </button>
              );
            })}
          </div>
        </div>
      </main>
      {sel
        ? <div style={{ width:360, flex:'0 0 auto', display:'flex', flexDirection:'column', gap:12 }}>
            <V2OrderSummary order={sel} onQty={sel.status === 'cerrada' ? null : setQty} onDelete={sel.status === 'cerrada' ? null : remove} />
            {sel.status !== 'cerrada' && <div style={{ display:'flex', gap:10 }}>
              <button style={S.bigBtn('outline')} onClick={() => setStatus('por-cerrar')}>{sel.status === 'abierta' ? 'Preparar' : 'En cocina'}</button>
              <button style={S.bigBtn('primary')} onClick={() => v2Go('Payment Layout.html', { 'compos-v2-pay':sel.id })}>Cobrar</button>
            </div>}
          </div>
        : <aside style={{ ...S.panel, width:360, flex:'0 0 auto', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--text-secondary)', fontSize:'var(--text-sm)' }}>Elige una orden</aside>}
    </V2Shell>
  );
}

Object.assign(window, { V2Login, V2Menu, V2Payment, V2Checks });
