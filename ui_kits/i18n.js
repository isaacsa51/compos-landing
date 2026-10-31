// Spanish UI for the mockup. Data values (order types, nav keys, statuses) stay English inside the code
// because they double as lookup keys; this layer translates only what reaches the screen, by patching
// React.createElement. Load it after react and before the screens render.
(function () {
  var D = {
    // navigation and tabs
    'Menu':'Menú', 'Orders':'Órdenes', 'Incoming':'Entrantes', 'Kitchen':'Cocina', 'Shift':'Turno', 'Reports':'Reportes',
    'Settings':'Ajustes', 'Exit':'Salir', 'Search':'Buscar', 'Soon':'Pronto', 'Toggle navigation':'Mostrar navegación',
    'Open navigation':'Abrir navegación', 'Theme':'Tema', 'Dashboard':'Tablero', 'Tables':'Mesas', 'Chat':'Chat',
    'Reservation':'Reservas', 'Accounting':'Contabilidad', 'Checks':'Cuentas',
    // order types and statuses
    'Dine here':'Aquí', 'Pickup':'Pickup', 'Delivery':'Domicilio', 'Open':'Abierta', 'Pending Close':'Por cerrar',
    'Pending close':'Por cerrar', 'Preparing':'Preparando', 'Ready':'Lista', 'Closed':'Cerrada', 'Void':'Anulada',
    'New':'Nueva', 'Paid':'Pagada', 'Prepaid':'Prepagado', 'Refunded':'Reembolsado', 'Expired':'Expirada',
    'Items not yet sent':'Aún sin enviar', 'In preparation · can add more':'En preparación · se puede agregar más',
    // check and cart
    'New Check':'Nueva cuenta', 'Total':'Total', 'Subtotal':'Subtotal', 'Tax 10%':'IVA 16% incluido', 'Checkout':'Cobrar',
    'Send & close':'Enviar y cerrar', 'Card payment':'Pago con tarjeta', 'Tap an item to add it to the check.':'Toca un producto para agregarlo a la cuenta.',
    '· no payment needed':'· no requiere cobro', 'Paid in advance via':'Pagado por adelantado vía', 'items':'productos',
    'Order':'Orden', 'Order #':'Orden #', 'No items':'Sin productos', 'Delete order':'Borrar orden', 'Edit order':'Editar orden',
    'Split':'Dividir', 'Combine':'Combinar', 'Print':'Imprimir', 'Cancel':'Cancelar', 'No checks in this status.':'No hay cuentas en este estado.',
    'Bar · has modifiers':'Cocina · con opciones', 'Has modifiers':'Con opciones', 'has modifiers':'con opciones', 'Bar':'Barra',
    '86 · Sold out':'Agotado', 'Back in stock':'Disponible otra vez', 'Mark sold out':'Marcar agotado', 'Done':'Listo',
    'View check':'Ver cuenta', 'Check is empty':'La cuenta está vacía', 'Place Order':'Enviar orden', 'Add to Order':'Agregar a la orden',
    '+ Add':'+ Agregar', 'Tap a dish to start the order.':'Toca un platillo para empezar la orden.', 'Table':'Mesa', 'QT':'CANT',
    'Items':'Productos', 'Price':'Precio', 'Payement Method':'Método de pago', 'more':'más', 'Order:':'Orden:',
    // modifiers
    'Back to menu':'Volver al menú', 'From':'Desde', 'required choices':'opciones obligatorias', 'Note added':'Nota agregada', 'Note':'Nota',
    'Instructions for the barista, e.g. extra hot, half foam':'Instrucciones para cocina, p. ej. sin cebolla, salsa aparte',
    'No modifiers yet':'Sin opciones todavía', 'Ready to add':'Listo para agregar', 'Required · Pick 1':'Obligatorio · elige 1',
    'Optional · Pick 1':'Opcional · elige 1', 'If':'Si es', 'Add':'Agregar',
    // customer
    'customer':'cliente', 'Close':'Cerrar', 'Platform':'Plataforma', 'Name':'Nombre', 'Phone':'Teléfono', 'Address':'Dirección',
    'Delivery notes':'Notas de entrega', 'Notes':'Notas', 'Customer name':'Nombre del cliente', 'Street, number, apt':'Calle, número, depto',
    'Gate code, leave at door…':'Código del portón, dejar en la puerta…', 'Optional':'Opcional', 'Save customer':'Guardar cliente',
    'Pickup at counter':'Recoge en mostrador', 'Add customer details · required':'Agrega los datos del cliente · obligatorio', 'Own driver':'Repartidor propio',
    // void, refund, discount reasons
    'Customer cancelled':'El cliente canceló', 'Duplicate order':'Orden duplicada', 'Entered by mistake':'Capturada por error',
    'Item unavailable':'Producto no disponible', 'Payment failed':'Falló el pago', 'Other':'Otro', 'Wrong item':'Producto equivocado',
    'Quality issue':'Problema de calidad', 'Late delivery':'Entrega tardía', 'Missing item':'Faltó un producto',
    'Loyal customer':'Cliente frecuente', 'Staff meal':'Comida del personal', 'Service recovery':'Compensación por servicio', 'Promotion':'Promoción',
    'Items not yet paid will be removed. A reason is required.':'Se quitan los productos sin pagar. El motivo es obligatorio.',
    'Describe the reason (required)':'Describe el motivo (obligatorio)', 'Add a note (optional)':'Agrega una nota (opcional)',
    'Note (optional)':'Nota (opcional)', 'Keep order':'Conservar orden', 'Void order':'Anular orden',
    // feedback showcase
    'Toasts & dialogs':'Avisos y diálogos', 'Toasts · tap to trigger':'Avisos · toca para mostrar', 'Confirmation dialogs':'Diálogos de confirmación',
    'Send to kitchen':'Enviar a cocina', 'Close shift':'Cerrar turno', 'Unsaved changes':'Cambios sin guardar', 'Delete check':'Borrar cuenta',
    'Manager override · demo PIN 1234':'Autorización de gerente · PIN de prueba 1234', 'Refund':'Reembolso', 'Discount':'Descuento',
    'No-sale drawer':'Abrir cajón sin venta', 'positive':'éxito', 'incoming':'entrante', 'warning':'aviso', 'danger':'error', 'neutral':'neutral',
    'Sent to kitchen':'Enviada a cocina', 'Payment declined':'Pago rechazado', 'Printer reconnected':'Impresora reconectada',
    'Kitchen printer':'Impresora de cocina', 'Undo':'Deshacer', 'View':'Ver', 'Retry':'Reintentar', 'Close shift?':'¿Cerrar turno?',
    'Shift closed':'Turno cerrado', 'Leave with unsaved changes?':'¿Salir sin guardar?', 'Settings you changed on this page will be lost.':'Se pierden los ajustes que cambiaste en esta página.',
    'Discard changes':'Descartar cambios', 'Changes discarded':'Cambios descartados', 'Order #412 moves to Pending Close. You can still add items.':'La orden #412 pasa a Por cerrar. Todavía puedes agregar productos.',
    "3 items will be removed and the kitchen notified. This can't be undone.":'Se quitan 3 productos y se avisa a cocina. No se puede deshacer.',
    'Send 3 items to kitchen?':'¿Enviar 3 productos a cocina?', 'Open cash drawer':'Abrir cajón de dinero', 'No sale':'Sin venta',
    'Refund approved':'Reembolso aprobado', 'Discount applied':'Descuento aplicado', 'Drawer opened':'Cajón abierto',
    "Rules: toasts report what happened (never ask); dialogs ask before anything that can't be undone silently; powerful actions — refund, discount, void/delete, no-sale drawer — always take a reason first, then a manager PIN.":
      'Reglas: los avisos informan lo que pasó y nunca preguntan; los diálogos piden confirmación antes de algo que no se puede deshacer; las acciones delicadas (reembolso, descuento, anular o borrar, abrir el cajón sin venta) piden primero un motivo y luego el PIN de un gerente.',
    'Add discount':'Agregar descuento', 'Change discount':'Cambiar descuento', 'Percent':'Porcentaje', 'Amount':'Monto', 'Reason · required':'Motivo · obligatorio',
    'Discount removed':'Descuento quitado', 'Remove':'Quitar', 'Manager approval':'Aprobación de gerente', 'Dismiss':'Descartar',
    'Wrong PIN — try again':'PIN incorrecto, intenta de nuevo', 'Approve':'Aprobar', 'Delete':'Borrar', 'Accept':'Aceptar', 'Reject':'Rechazar',
    // incoming
    'All':'Todas', 'Website':'Sitio web', 'Walk-in':'Mostrador', 'Too busy':'Muy ocupados', 'Item sold out':'Producto agotado',
    'Closing soon':'Cerrando pronto', 'Outside delivery area':'Fuera de zona de entrega', 'Suspected fraud':'Sospecha de fraude',
    'No order selected':'Ninguna orden seleccionada', 'Customer':'Cliente', 'Ready in':'Lista en', 'Back':'Volver',
    'Accept ·':'Aceptar ·', 'Reject order':'Rechazar orden', 'The customer and platform are notified. Pick a reason.':'Se avisa al cliente y a la plataforma. Elige un motivo.',
    'accepted this session · most urgent first':'aceptadas en esta sesión · las más urgentes primero', 'Alert sound':'Sonido de alerta',
    'No incoming orders. New ones appear here with a sound.':'No hay órdenes entrantes. Las nuevas aparecen aquí con un sonido.',
    'Accepted · sent to kitchen':'Aceptada · enviada a cocina',
    // kitchen
    'Start preparing':'Empezar', 'Mark ready':'Marcar lista', 'Handed off':'Entregar', 'Recall':'Recuperar', 'Nothing here.':'Nada por aquí.',
    'active tickets · oldest first · tap an item to check it off':'comandas activas · las más antiguas primero · toca un producto para marcarlo',
    // payment
    'Cash':'Efectivo', 'Credit':'Crédito', 'Debit':'Débito', 'Card':'Tarjeta', 'Change calculated':'Calcula el cambio',
    'Tap, insert or swipe':'Acerca, inserta o desliza', 'PIN on terminal':'PIN en la terminal', 'Back to check':'Volver a la cuenta',
    'Payment':'Cobro', 'Payment type':'Método de pago', 'Balance':'Saldo', 'Change due':'Cambio', 'Paid in full':'Pagado completo',
    'Amount received ·':'Monto recibido ·', 'Remaining':'Restante', 'Remove payment':'Quitar pago', 'Pay remaining balance':'Cobrar el saldo restante',
    'Hide':'Ocultar', 'Breakdown':'Desglose', 'Tips':'Propina', 'Received':'Recibido', 'Change':'Cambio', 'Print Receipt':'Imprimir ticket',
    'Apply':'Aplicar', 'Tips amount':'Monto de propina', 'Scan the QR code':'Escanea el código QR', 'E-Wallet':'Billetera digital',
    // refund
    'Original tender':'Método original', 'Store credit':'Saldo a favor', 'Items to refund':'Productos a reembolsar', 'Refund all':'Reembolsar todo',
    'Refund to':'Reembolsar a', 'Select items to refund':'Elige los productos a reembolsar', 'Choose a reason':'Elige un motivo',
    'Refund another check':'Reembolsar otra cuenta', 'Select items, reason and method':'Elige productos, motivo y método',
    'Paid checks today':'Cuentas pagadas hoy', 'Pick a paid check, then the items to return':'Elige una cuenta pagada y luego los productos a devolver',
    'Select a check to refund':'Elige una cuenta para reembolsar', 'Refund details':'Detalle del reembolso', 'Reason and refund method appear here.':'Aquí aparecen el motivo y el método de reembolso.',
    // reports
    'Today':'Hoy', 'Week':'Semana', 'Month':'Mes', 'Gross sales':'Ventas brutas', 'Delivery share':'Parte de domicilio',
    'Avg kitchen time':'Tiempo prom. en cocina', 'Sales by channel':'Ventas por canal', 'Delivery breakdown':'Desglose de domicilio',
    'gross ·':'brutos ·', 'in platform fees':'en comisiones de plataforma', 'Gross':'Bruto', 'Fee':'Comisión', 'Net payout':'Pago neto',
    'Avg ticket':'Ticket prom.', 'Avg prep':'Prep. prom.', 'Sales by hour':'Ventas por hora', 'Sales by day':'Ventas por día',
    'Sales by week':'Ventas por semana', 'Top items':'Más vendidos', 'sold':'vendidos', 'Export':'Exportar', 'Report exported':'Reporte exportado',
    "Platform orders are paid out by the platform; they don't count toward cash in drawer.":'Las órdenes de plataforma las paga la plataforma; no cuentan como efectivo en caja.',
    'Mon':'Lun', 'Tue':'Mar', 'Wed':'Mié', 'Thu':'Jue', 'Fri':'Vie', 'Sat':'Sáb', 'Sun':'Dom', 'W1':'S1', 'W2':'S2', 'W3':'S3', 'W4':'S4',
    // search
    'Close search':'Cerrar búsqueda', 'Items, order #, customer name or phone':'Productos, # de orden, nombre o teléfono del cliente',
    'Clear':'Borrar', 'Customers':'Clientes', 'Menu items':'Productos', 'Type to search menu items, checks and customers.':'Escribe para buscar productos, cuentas y clientes.',
    'No results for “':'Sin resultados para “',
    // settings
    'General':'General', 'Taxes & fees':'Impuestos y cargos', 'Order types & timers':'Tipos de orden y tiempos', 'Delivery platforms':'Plataformas de domicilio',
    'Printers & devices':'Impresoras y dispositivos', 'Payments & tips':'Pagos y propinas', 'Staff & permissions':'Personal y permisos', 'Appearance':'Apariencia',
    'Cashier':'Cajero', 'Shift lead':'Encargado', 'Manager':'Gerente', 'Void / delete check':'Anular / borrar cuenta', 'Mark items 86':'Marcar agotados',
    'Edit menu & prices':'Editar menú y precios', 'Business':'Negocio', 'Business name':'Nombre del negocio', 'Printed on receipts':'Se imprime en los tickets',
    'Currency':'Moneda', '24-hour clock':'Reloj de 24 horas', 'Language':'Idioma', 'Sales tax':'IVA', 'Applied to subtotal after discounts':'Se aplica al subtotal después de descuentos',
    'Prices include tax':'Los precios incluyen IVA', 'Menu prices already contain tax':'Los precios del menú ya incluyen el IVA', 'Own-driver delivery fee':'Costo de envío con repartidor propio',
    'Service charge':'Cargo por servicio', 'Percent added to every check':'Porcentaje que se suma a cada cuenta', 'Order types':'Tipos de orden',
    'Require customer details':'Pedir datos del cliente', 'Name and phone before checkout on pickup and delivery':'Nombre y teléfono antes de cobrar en pickup y domicilio',
    'Check timers':'Tiempos de cuenta', 'Warn after':'Avisar después de', 'Timer turns amber':'El tiempo se pone ámbar', 'Late after':'Retrasada después de',
    'Timer turns red with an alert':'El tiempo se pone rojo con una alerta', 'Connected platforms':'Plataformas conectadas',
    'Paused — not receiving orders':'En pausa, sin recibir órdenes', 'Auto-accept':'Aceptar automático', 'Receiving':'Recibiendo',
    'Incoming queue':'Cola de entrantes', 'Acceptance window':'Tiempo para aceptar', 'Orders auto-reject after this':'Después de este tiempo las órdenes se rechazan solas',
    'Devices':'Dispositivos', 'Receipt printer':'Impresora de tickets', 'Cash drawer':'Cajón de dinero', 'Card terminal':'Terminal de tarjetas',
    'Connected':'Conectado', 'Not responding — check cable or Wi-Fi':'No responde, revisa el cable o el Wi-Fi', 'Online':'En línea', 'Offline':'Sin conexión',
    'Test print':'Imprimir prueba', 'Test':'Probar', 'Reconnect':'Reconectar', 'Accepted payments':'Pagos aceptados',
    'Quick cash chips':'Botones de efectivo rápido', 'Bill-sized amounts above the keypad':'Montos de billetes sobre el teclado',
    'Ask for tip on card payments':'Pedir propina en pagos con tarjeta', 'Tip presets (%)':'Propinas sugeridas (%)',
    'Who can do it without a manager PIN':'Quién puede hacerlo sin PIN de gerente',
    'Off = the action asks for a manager PIN. Saving permission changes needs manager approval.':'Apagado = la acción pide PIN de gerente. Guardar cambios de permisos requiere aprobación de un gerente.',
    'Theme · applies immediately':'Tema · se aplica al instante', 'Discard':'Descartar', 'Save':'Guardar', 'Settings saved':'Ajustes guardados',
    'Change staff permissions':'Cambiar permisos del personal',
    // shift
    'Refunds & voids':'Reembolsos y anulaciones', 'Expected cash':'Efectivo esperado', 'Sales by tender':'Ventas por método', 'Cash drops':'Retiros de efectivo',
    'None yet':'Ninguno todavía', 'Open shift':'Abrir turno', 'Count the starting cash in the drawer.':'Cuenta el efectivo inicial de la caja.',
    'Starting cash':'Efectivo inicial', 'Close shift · count drawer':'Cerrar turno · contar caja', 'Expected':'Esperado', 'Counted':'Contado',
    'Variance':'Diferencia', '· variance':'· diferencia', 'Print end-of-day report':'Imprimir corte del día', 'Open new shift':'Abrir nuevo turno',
    'Cash drop':'Retiro de efectivo', 'Print X report':'Imprimir corte X', 'Open since 07:00':'Abierto desde 07:00',
    'Lena P. · Register 1':'Lena P. · Caja 1', '2 refunds · 1 void':'2 reembolsos · 1 anulación', 'Start':'Inicial',
    // split
    'Check':'Cuenta', 'Select all':'Seleccionar todo', 'Remove check':'Quitar cuenta', 'Move':'Mover', 'here':'aquí',
    'Empty · select items and move them here':'Vacía · selecciona productos y muévelos aquí', 'Back to checks':'Volver a cuentas',
    'Split check':'Dividir cuenta', 'checks':'cuentas', 'Confirm split':'Confirmar división', 'Tap item(s) to select':'Toca productos para seleccionarlos',
    'Create new check':'Crear nueva cuenta',
    // old tablet kit: sign-in, tables, reservations, dashboard
    'Enter your PIN':'Ingresa tu PIN', 'Shift 2':'Turno 2', 'Monday, 6 Feb 2023  •  8:23 AM':'Lunes 6 de feb. 2023  •  8:23',
    'Layout of halls':'Plano del salón', 'New reservation':'Nueva reserva', 'Current':'Actual', 'Feb 4, 2023':'4 feb. 2023',
    'Revenue':'Ingresos', 'Paid orders':'Órdenes pagadas', 'Tip amount':'Propinas', 'Dishes sold':'Platillos vendidos',
    "Today's upsale":'Más pedidos hoy', 'See All':'Ver todo', 'Accepted orders':'Órdenes aceptadas', '1st floor':'Planta baja',
    '2nd floor':'Primer piso', '3rd floor':'Segundo piso', 'back to orders':'volver a órdenes', 'Seats':'Lugares', 'Table management':'Mesas',
    '4 Feb 2023  •  8:23 AM':'4 feb. 2023  •  8:23', 'Check-in':'Registrar llegada', 'Free':'Libre', 'Reserved':'Reservada', 'Checked-in':'Ocupada',
    // phone captions
    'Tap the check bar to open the cart':'Toca la barra de la cuenta para abrir el carrito', 'Modifiers':'Opciones',
    'Shown when a coffee item is tapped':'Aparecen al tocar un bowl o ramen', 'Timers turn amber at 10 min, red at 20':'El tiempo se pone ámbar a los 10 min y rojo a los 20',
    'New → Preparing → Ready':'Nueva → Preparando → Lista', 'Select items, move or create checks':'Elige productos, muévelos o crea cuentas',
    'Check → items → reason → method':'Cuenta → productos → motivo → método', 'Menu, checks and customers':'Menú, cuentas y clientes',
    'Summary, cash drops, close & count':'Resumen, retiros, cierre y conteo', 'Accept / reject with countdown':'Aceptar o rechazar con cuenta regresiva',
    'KPIs, delivery breakdown, channel mix':'Indicadores, domicilio y canales', 'Sections → detail, save bar':'Secciones → detalle, barra para guardar',
    'Override PIN 1234':'PIN de autorización 1234', 'Shown on Checkout from either screen':'Aparece al cobrar desde cualquier pantalla',
    // themes
    'Dark':'Oscuro', 'Light':'Claro', 'High contrast':'Alto contraste'
  };
  var lower = { 'receipt printer':'la impresora de tickets', 'kitchen printer':'la impresora de cocina', 'cash drawer':'el cajón de dinero', 'card terminal':'la terminal de tarjetas' };

  var R = [
    [/^Order #(.+)$/, function (m, a) { return 'Orden #' + a; }],
    [/^Check #(.+) voided$/, function (m, a) { return 'Cuenta #' + a + ' anulada'; }],
    [/^Check #(.+) deleted$/, function (m, a) { return 'Cuenta #' + a + ' borrada'; }],
    [/^Check #(.+) open (\d+) min$/, function (m, a, b) { return 'Cuenta #' + a + ' abierta hace ' + b + ' min'; }],
    [/^Delete check #(.+)\?$/, function (m, a) { return '¿Borrar la cuenta #' + a + '?'; }],
    [/^Delete check #(.+)$/, function (m, a) { return 'Borrar cuenta #' + a; }],
    [/^Void \/ delete check #(.+)$/, function (m, a) { return 'Anular / borrar cuenta #' + a; }],
    [/^Void order #(.+)$/, function (m, a) { return 'Anular orden #' + a; }],
    [/^Reject order #(.+)\?$/, function (m, a) { return '¿Rechazar la orden #' + a + '?'; }],
    [/^Order #(.+) rejected$/, function (m, a) { return 'Orden #' + a + ' rechazada'; }],
    [/^Auto-reject in (.+)$/, function (m, a) { return 'Rechazo automático en ' + a; }],
    [/^New (.+) order$/, function (m, a) { return 'Nueva orden de ' + t(a); }],
    [/^ready in (\d+) min$/, function (m, a) { return 'lista en ' + a + ' min'; }],
    [/^customer notified$/, function () { return 'se avisó al cliente'; }],
    [/^(\d+) items?$/, function (m, a) { return a + (a === '1' ? ' producto' : ' productos'); }],
    [/^(\d+) refunds?$/, function (m, a) { return a + (a === '1' ? ' reembolso' : ' reembolsos'); }],
    [/^(\d+) voids?$/, function (m, a) { return a + (a === '1' ? ' anulación' : ' anulaciones'); }],
    [/^(\d+) orders$/, function (m, a) { return a + ' órdenes'; }],
    [/^orders ·$/, function () { return 'órdenes ·'; }],
    [/^86 · (\d+)$/, function (m, a) { return 'Agotados · ' + a; }],
    [/^86$/, function () { return 'Agotado'; }],
    [/^Time to accept$/, function () { return 'Tiempo para aceptar'; }],
    [/^(\d+) orders · avg (.+)$/, function (m, a, b) { return a + ' órdenes · prom. ' + b; }],
    [/^(\d+) min$/, function (m, a) { return a + ' min'; }],
    [/^Closed in$/, function () { return 'Cerrada en'; }],
    [/^(Pending close|Open) for (.+)$/, function (m, a, b) { return (a === 'Open' ? 'Abierta hace ' : 'Por cerrar hace ') + b; }],
    [/^Paid via (.+)$/, function (m, a) { return 'Pagado vía ' + a; }],
    [/^Choose (.+)$/, function (m, a) { return 'Elige ' + a; }],
    [/^Required · (\d+)–(\d+)$/, function (m, a, b) { return 'Obligatorio · ' + a + '–' + b; }],
    [/^Optional · Up to (\d+)$/, function (m, a) { return 'Opcional · hasta ' + a; }],
    [/^Required$/, function () { return 'Obligatorio'; }],
    [/^Add (\$.+)$/, function (m, a) { return 'Agregar ' + a; }],
    [/^Pay (\$.+)$/, function (m, a) { return 'Cobrar ' + a; }],
    [/^Refund (\$.+)$/, function (m, a) { return 'Reembolsar ' + a; }],
    [/^Refunded (\$.+)$/, function (m, a) { return 'Reembolsado ' + a; }],
    [/^Refund #(.+)$/, function (m, a) { return 'Reembolso #' + a; }],
    [/^Apply −(\$.+)$/, function (m, a) { return 'Aplicar −' + a; }],
    [/^Applies to the subtotal of (\$[\d.]+)\. Needs manager approval\.$/, function (m, a) { return 'Se aplica al subtotal de ' + a + '. Requiere aprobación de un gerente.'; }],
    [/^Discount (.+) \(−(\$.+)\)$/, function (m, a, b) { return 'Descuento ' + a + ' (−' + b + ')'; }],
    [/^Discount ([\d.$%]+)$/, function (m, a) { return 'Descuento ' + a; }],
    [/^Discount ([\d.$%]+) · (.+)$/, function (m, a, b) { return 'Descuento ' + a + ' · ' + t(b); }],
    [/^approved by (.+)$/, function (m, a) { return 'aprobado por ' + a; }],
    [/^Approved by (.+)$/, function (m, a) { return 'Aprobado por ' + a; }],
    [/^by (.+)$/, function (m, a) { return 'por ' + a; }],
    [/^Permissions approved by (.+)$/, function (m, a) { return 'Permisos aprobados por ' + a; }],
    [/^Test sent to (.+)$/, function (m, a) { return 'Prueba enviada a ' + (lower[a] || a); }],
    [/^(.+) reconnected$/, function (m, a) { return t(a) + ' reconectado'; }],
    [/^(.+) auto-accept$/, function (m, a) { return t(a) + ': aceptar automático'; }],
    [/^(.+) receiving$/, function (m, a) { return t(a) + ': recibiendo'; }],
    [/^Auto-accept on · ready in (\d+) min$/, function (m, a) { return 'Aceptación automática · lista en ' + a + ' min'; }],
    [/^Manual accept · default (\d+) min$/, function (m, a) { return 'Aceptación manual · ' + a + ' min por defecto'; }],
    [/^(\d+) selected · tap “Move here” on a check or create a new one$/, function (m, a) { return a + ' seleccionados · toca «Mover aquí» en una cuenta o crea una nueva'; }],
    [/^New check with (\d+)$/, function (m, a) { return 'Nueva cuenta con ' + a; }],
    [/^Check (\d+)$/, function (m, a) { return 'Cuenta ' + a; }],
    [/^Recall #(.+)$/, function (m, a) { return 'Recuperar #' + a; }],
    [/^Theme: (.+)$/, function (m, a) { return 'Tema: ' + t(a); }],
    [/^Tender (\$.+)$/, function (m, a) { return 'Recibir ' + a; }],
    [/^CSV sent to (.+)$/, function (m, a) { return 'CSV enviado a ' + a; }],
    [/^Start (\$.+) \+ cash − drops$/, function (m, a) { return 'Inicial ' + a + ' + efectivo − retiros'; }],
    [/^Back to (.+)$/, function (m, a) { return 'Devolver a ' + a; }],
    [/^Card ending (\d+)$/, function (m, a) { return 'Tarjeta con terminación ' + a; }],
    [/^tendered (\$.+)$/, function (m, a) { return 'recibido ' + a; }],
    [/^Counted (\$[\d.]+) · variance ([+−-]?\$[\d.]+)\. An end-of-day report will print\.$/, function (m, a, b) { return 'Contado ' + a + ' · diferencia ' + b + '. Se imprime el corte del día.'; }],
    [/^(.+) is part of the product but was not shown in the source kit — intentionally left blank\.$/, function (m, a) { return t(a) + ' existe en el producto, pero no venía en el kit original; se dejó en blanco a propósito.'; }]
  ];

  function core(s) {
    if (Object.prototype.hasOwnProperty.call(D, s)) return D[s];
    for (var i = 0; i < R.length; i++) { var m = s.match(R[i][0]); if (m) return R[i][1].apply(null, m); }
    if (s.indexOf(' · ') > 0) {
      var parts = s.split(' · '), out = parts.map(function (p) { var x = core(p); return x == null ? p : x; });
      if (out.join(' · ') !== s) return out.join(' · ');
    }
    return null;
  }
  function t(s) {
    if (typeof s !== 'string') return s;
    var m = s.match(/^(\s*)([\s\S]*?)(\s*)$/);
    if (!m[2]) return s;
    var x = core(m[2]);
    return x == null ? s : m[1] + x + m[3];
  }
  window.composT = t;

  var PROPS = ['title', 'placeholder', 'label', 'aria-label', 'message', 'confirmLabel', 'cancelLabel', 'actionLabel', 'action', 'detail', 'hint', 'totalLabel', 'alt', 'route'];
  var ce = React.createElement;
  React.createElement = function (type, props) {
    var a = Array.prototype.slice.call(arguments);
    if (props) {
      var np = null;
      for (var i = 0; i < PROPS.length; i++) {
        var k = PROPS[i], v = props[k];
        if (typeof v === 'string') { var tv = t(v); if (tv !== v) { np = np || Object.assign({}, props); np[k] = tv; } }
      }
      if (np) a[1] = np;
    }
    for (var j = 2; j < a.length; j++) {
      if (typeof a[j] === 'string') a[j] = t(a[j]);
      else if (Array.isArray(a[j])) a[j] = a[j].map(function (c) { return typeof c === 'string' ? t(c) : c; });
    }
    return ce.apply(React, a);
  };

  var dt = document.title.split(' — ');
  if (dt.length === 2) document.title = dt[0] + ' — ' + t(dt[1].replace(/ Layouts?$/, '')).replace(/^Phone$/, 'Teléfono');
  document.documentElement.lang = 'es';
})();
