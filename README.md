# Compos: maqueta del producto

Un sitio pequeño que presenta el punto de venta como demo funcional. Cada pantalla es el kit de UI
real corriendo en un iframe; nada es captura.

**Órdenes, clientes, personal, plataformas y cifras son datos de ejemplo.** No se envía nada a
ningún lado; casi todo se reinicia al recargar. Precios en MXN con IVA 16% incluido.

## Páginas

- `index.html`: sitio de presentación con el menú en vivo, el flujo en cinco fases, las 13 pantallas
  de tablet, la app de teléfono y el selector de tema.
- `demo.html`: demo guiada. Lista de pasos a la izquierda, la tablet (o el teléfono) en medio y qué
  probar a la derecha. Abre cualquier paso con `demo.html#<id-del-paso>`; `#phone` abre la app de
  teléfono.
- La lista de pasos (id, fase, título, archivo, texto, «prueba esto») es el script `POS_FLOW` al
  inicio de `index.html` y `demo.html`. Mantén ambos iguales al reordenar o renombrar pasos.
- `site.css`: estilos del sitio, sobre los tokens de `../styles.css`.

## El flujo

| Fase   | Pasos (`#id`)                                                                                                             |
|--------|---------------------------------------------------------------------------------------------------------------------------|
| Abrir  | Entra con tu PIN `signin` · Abre el turno `shift`                                                                         |
| Tomar  | Acepta pedidos a domicilio `incoming` · Arma una cuenta `menu`                                                            |
| Operar | Cuentas abiertas `orders` · Manda a cocina `kitchen` · Encuentra lo que sea `search` · Avisos y autorizaciones `feedback` |
| Cobrar | Divide la cuenta `split` · Cobra `payment` · Reembolsa `refund`                                                           |
| Cerrar | Reportes `reports` · Ajustes `settings`                                                                                   |

## Datos de prueba

- PIN para entrar: 4 dígitos cualquiera
- PIN de gerente (reembolsos, anulaciones, descuentos, cambios de permisos): `1234`

## Cómo se conecta

Las pantallas se enlazan entre sí (menú lateral, pestañas Checks/Menu, Cobrar → Cobro, Dividir,
resultados de búsqueda). Al navegar dentro de la demo, la guía detecta la pantalla nueva y avanza a
ese paso. Las flechas del teclado recorren el flujo.

El selector de tema guarda la preferencia `compos-theme`, así que el tema elegido se aplica en todas
las pantallas.

## Idioma

Las pantallas se muestran en español con `ui_kits/i18n.js`, que traduce el texto al momento de
dibujarlo. Los valores internos (tipos de orden, estados, secciones) siguen en inglés en el código
porque también funcionan como claves. Para cambiar un texto, edita el diccionario de ese archivo.

## Cómo abrirlo

La carpeta es autocontenida: abre `index.html` con doble clic o sírvela con cualquier servidor
estático. Necesita internet para React, Babel, las fuentes Inter / Space Grotesk y los íconos Lucide
(todo desde CDN).

- `styles.css`, `_ds_bundle.js`: copia de los tokens y componentes compilados del sistema de diseño
- `ui_kits/`: copia de las pantallas de tablet y teléfono, con su JSX incluido para que corran
  directo desde el disco

Son copias. Si cambias el sistema de diseño, vuelve a generarlas en lugar de editarlas aquí.

## No incluido

Pantalla para el cliente, plantillas de ticket, administración del menú y persistencia real todavía
no están diseñadas.
