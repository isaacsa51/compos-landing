/*
 * Compos — sitio web
 * File: worker.js
 * Sirve el sitio estático y recibe el formulario de contacto en POST /api/contacto.
 * El correo sale con Cloudflare Email Service (binding EMAIL en wrangler.jsonc) hacia CONTACT_TO.
 *
 * Copyright (c) 2026 Isaac Serrano. All rights reserved.
 */
const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' } });
const clean = (v, max) => String(v == null ? '' : v).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max);
const oneLine = (v, max) => clean(v, max).replace(/[\r\n]+/g, ' ');
const html = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const EMAIL_RE = /^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']{2,}$/;

async function contacto(request, env) {
  if (request.method !== 'POST') return json({ ok: false, error: 'Método no permitido.' }, 405);

  // Solo aceptamos envíos desde este mismo sitio.
  const origin = request.headers.get('Origin');
  if (origin && new URL(origin).host !== new URL(request.url).host) return json({ ok: false, error: 'Origen no permitido.' }, 403);

  let d;
  try { d = await request.json(); } catch (e) { return json({ ok: false, error: 'Datos inválidos.' }, 400); }

  // Trampa para bots: el campo «sitio» está oculto para personas.
  if (d && d.sitio) return json({ ok: true });

  const f = {
    nombre: oneLine(d.nombre, 80), negocio: oneLine(d.negocio, 100), correo: oneLine(d.correo, 120), telefono: oneLine(d.telefono, 30),
    tipo: oneLine(d.tipo, 40), sucursales: oneLine(d.sucursales, 20), mensaje: clean(d.mensaje, 2000),
  };
  if (!f.nombre || !f.negocio || !f.mensaje) return json({ ok: false, error: 'Llena los campos marcados.' }, 400);
  if (!EMAIL_RE.test(f.correo)) return json({ ok: false, error: 'Revisa tu correo, parece incompleto.' }, 400);

  const rows = [['Nombre', f.nombre], ['Negocio', f.negocio], ['Correo', f.correo], ['Teléfono', f.telefono || '—'], ['Tipo de negocio', f.tipo || '—'], ['Sucursales', f.sucursales || '—']];
  const text = rows.map(([k, v]) => k + ': ' + v).join('\n') + '\n\nMensaje:\n' + f.mensaje + '\n\n— Enviado desde el formulario de puntocompos.com. Responde a este correo para contestarle a ' + f.nombre + '.';
  const body = '<div style="font-family:Inter,Arial,sans-serif;color:#111315;max-width:560px">' +
    '<h2 style="font-size:20px;margin:0 0 16px">Nuevo contacto desde el sitio</h2>' +
    '<table style="border-collapse:collapse;width:100%;font-size:14px">' + rows.map(([k, v]) =>
      '<tr><td style="padding:8px 12px 8px 0;color:#5E6267;white-space:nowrap;vertical-align:top">' + html(k) + '</td><td style="padding:8px 0;font-weight:600">' + html(v) + '</td></tr>').join('') + '</table>' +
    '<p style="font-size:14px;color:#5E6267;margin:20px 0 6px">Mensaje</p>' +
    '<div style="font-size:15px;line-height:1.5;white-space:pre-wrap;background:#F4F4F8;border-radius:12px;padding:14px 16px">' + html(f.mensaje) + '</div>' +
    '<p style="font-size:12px;color:#5E6267;margin-top:20px">Responde a este correo para contestarle a ' + html(f.nombre) + '.</p></div>';

  try {
    await env.EMAIL.send({
      to: env.CONTACT_TO || 'info@puntocompos.com',
      from: { email: env.CONTACT_FROM || 'formulario@puntocompos.com', name: 'Compos · sitio web' },
      replyTo: { email: f.correo, name: f.nombre },
      subject: 'Contacto web: ' + f.negocio + ' (' + f.nombre + ')',
      text, html: body,
    });
    return json({ ok: true });
  } catch (e) {
    console.error('contacto', e && e.code, e && e.message);
    return json({ ok: false, error: 'No pudimos enviar tu mensaje.' }, 502);
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/contacto') return contacto(request, env);
    return env.ASSETS.fetch(request);
  },
};
