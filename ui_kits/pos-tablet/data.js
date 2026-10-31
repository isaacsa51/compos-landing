const NAV = ['Menu','Orders','Reservation','Chat','Dashboard','Accounting','Settings'];
const STAFF = ['Lena P.','Marco R.','Sofía G.'];

const CATEGORIES = [
  { name:'Entradas', count:13, icon:'soup',   color:'var(--sage-200)' },
  { name:'Sopas',     count:8,  icon:'soup',     color:'var(--lilac-200)' },
  { name:'Arroces y fideos',     count:10, icon:'wheat',    color:'var(--sky-200)' },
  { name:'Sushi',     count:15, icon:'fish',     color:'var(--sage-200)' },
  { name:'Platos fuertes',count:7, icon:'drumstick',color:'var(--rose-200)' },
  { name:'Postres',  count:9,  icon:'cake',     color:'var(--lilac-200)' },
  { name:'Bebidas',    count:11, icon:'cup-soda', color:'var(--rose-200)' },
  { name:'Alcohol',   count:12, icon:'martini',  color:'var(--mint-200)' },
];

const DISHES = [
  { name:'Pollo karaage', price:'$145',  accent:'var(--rose-200)' },
  { name:'Pollo teriyaki',  price:'$165', accent:'var(--rose-200)' },
  { name:'Res bulgogi',   price:'$219', accent:'var(--rose-200)' },
  { name:'Costillas coreanas',      price:'$249', accent:'var(--rose-200)' },
  { name:'Res a la plancha',     price:'$229', accent:'var(--rose-200)' },
  { name:'Alitas picantes',  price:'$139',  accent:'var(--rose-200)' },
  { name:'Salmón glaseado',        price:'$269', accent:'var(--rose-200)' },
  { name:'Camarón tempura',     price:'$199', accent:'var(--rose-200)' },
];

const ORDERS = [
  { table:'A1', order:412, subtotal:'$934.00', items:[{qty:1,name:'Pollo karaage',price:'$145'},{qty:1,name:'Limonada',price:'$45'},{qty:3,name:'Bowl spicy tuna',price:'$179'},{qty:3,name:'Mochi de matcha',price:'$69'}] },
  { table:'B2', order:410, subtotal:'$546.00', items:[{qty:2,name:'Bowl teriyaki',price:'$159',mods:['Mediano','Fideos','Ramen','Salmón']},{qty:1,name:'Bowl spicy tuna',price:'$179',mods:['Chico','Pollo']},{qty:1,name:'Jugo de naranja',price:'$49'}] },
  { table:'D4', order:407, subtotal:'$690.00', items:[{qty:1,name:'Pad thai',price:'$169'},{qty:1,name:'Limonada',price:'$45'},{qty:2,name:'Camarón tempura',price:'$199'},{qty:2,name:'Té de jazmín',price:'$39'}] },
  { table:'D1', order:401, subtotal:'$179.00',  items:[{qty:1,name:'Bowl spicy tuna',price:'$179'}] },
  { table:'A2', order:400, subtotal:'$291.00', items:[{qty:1,name:'Costillas coreanas',price:'$249'},{qty:1,name:'Té de frutos rojos',price:'$42'}] },
  { table:'E1', order:396, subtotal:'$218.00', items:[{qty:1,name:'Pad thai',price:'$169'},{qty:1,name:'Jugo de naranja',price:'$49'}] },
  { table:'D2', order:391, subtotal:'$95.00', items:[{qty:1,name:'Gyozas (6)',price:'$95'}] },
  { table:'E4', order:390, subtotal:'$407.00', items:[{qty:1,name:'Ramen tonkotsu',price:'$189',mods:['Grande','Arroz','Camarón','Ajonjolí']},{qty:1,name:'Yakisoba',price:'$149',mods:['Mediano','Udon']},{qty:1,name:'Mochi de matcha',price:'$69'}] },
];

const TABLES = [
  { code:'A1', status:'reserved',   time:'18:30' },
  { code:'A2', status:'checked-in', time:'17:00' },
  { code:'B1', status:'free',       time:'-' },
  { code:'B2', status:'reserved',   time:'15:00' },
  { code:'B3', status:'checked-in', time:'17:30' },
  { code:'B4', status:'free',       time:'-' },
  { code:'C1', status:'checked-in', time:'17:30' },
  { code:'C2', status:'free',       time:'-' },
  { code:'C3', status:'reserved',   time:'18:00' },
];

const RESERVATIONS = [
  { table:'Bar', name:'Arlene McCoy', guests:1, start:13, span:2, tone:'dark' },
  { table:'Bar', name:'Mitchell',     guests:2, start:17, span:1, tone:'dark' },
  { table:'A1',  name:'Cody Fisher',  guests:3, start:18, span:2, tone:'mint' },
  { table:'A2',  name:'Alex',         guests:5, start:11, span:2, tone:'dark' },
  { table:'A2',  name:'Leslie',       guests:6, start:15, span:1, tone:'mint' },
  { table:'B1',  name:'Anna',         guests:2, start:11, span:1, tone:'dark' },
  { table:'B2',  name:'Devon Lane',   guests:2, start:15, span:2, tone:'mint' },
  { table:'B3',  name:'Jacob Jones',  guests:2, start:12, span:2, tone:'dark' },
];

const UPSALE = [
  { name:'Pollo teriyaki',  orders:120, icon:'drumstick' },
  { name:'Pad thai',orders:114, icon:'wheat' },
  { name:'Edamame',      orders:98,  icon:'egg-fried' },
  { name:'Udon de res', orders:82,  icon:'soup' },
];

const WEEK = [
  { label:'Sun', value:440 },{ label:'Mon', value:300 },{ label:'Tue', value:355 },
  { label:'Wed', value:400 },{ label:'Thu', value:355 },{ label:'Fri', value:445 },{ label:'Sat', value:205 },
];

Object.assign(window, { NAV, STAFF, CATEGORIES, DISHES, ORDERS, TABLES, RESERVATIONS, UPSALE, WEEK });
