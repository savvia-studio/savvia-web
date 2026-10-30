// Envío del brief del chat (ChatFlotante.astro): lo que rellena el visitante nos llega por correo con Resend, a Eric y a Andoni.
// Va a sus buzones y no a hola@ porque hola@ es un grupo de Google con cola de moderación: lo que cree spam se retiene y se descarta solo.
// Responder al correo contesta directamente al visitante (reply_to).
// Body: { ruta, respuestas: [{ q, a }], datos: { nombre, email, mas }, lang }. Devuelve { ok: true } solo si Resend lo ha aceptado; si no, la web
// le ofrece al visitante mandarlo por correo, así que aquí nunca se responde «ok» sin haberlo enviado.
// SEGURIDAD: solo desde savvia.studio, freno por IP y textos acotados. El correo va en texto plano: lo que escribe el visitante no se interpreta. No se guarda nada.
// Variables en Vercel: RESEND_API_KEY (obligatoria) · BRIEF_PARA (opcional, direcciones separadas por comas) · BRIEF_DE (opcional) · UPSTASH_REDIS_REST_URL y _TOKEN (recomendadas).

const PARA = (process.env.BRIEF_PARA || 'eric@savvia.studio,andoni@savvia.studio').split(',').map((c) => c.trim()).filter(Boolean);
const DE = process.env.BRIEF_DE || 'savvia.studio <web@savvia.studio>';
const POR_HORA = 5; // briefs por IP y hora
const ORIGENES = ['https://savvia.studio', 'https://www.savvia.studio'];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const visitas = new Map(); // respaldo sin Upstash: memoria de la instancia, NO es una garantía

const corto = (t, n) => String(t ?? '').trim().slice(0, n);
const linea = (t, n) => corto(t, n).replace(/\s+/g, ' ');

async function frenar(ip) {
  const url = process.env.UPSTASH_REDIS_REST_URL, tok = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && tok) {
    try {
      const k = `brief:${ip}:${new Date().toISOString().slice(0, 13)}`; // una cuenta por IP y hora
      const r = await fetch(`${url}/pipeline`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${tok}` },
        body: JSON.stringify([['INCR', k], ['EXPIRE', k, 3700]]),
        signal: AbortSignal.timeout(2500),
      });
      const n = (await r.json())?.[0]?.result;
      if (Number.isInteger(n)) return n > POR_HORA;
    } catch { /* si Upstash falla, cae al respaldo */ }
  }
  const ahora = Date.now();
  const v = (visitas.get(ip) || []).filter((t) => ahora - t < 3600_000);
  v.push(ahora);
  visitas.set(ip, v);
  if (visitas.size > 2000) visitas.clear();
  return v.length > POR_HORA;
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ error: 'method' });
  const clave = process.env.RESEND_API_KEY;
  if (!clave) return res.status(503).json({ error: 'sin-clave' });

  const origen = req.headers.origin || (req.headers.referer ? new URL(req.headers.referer).origin : '');
  const local = process.env.VERCEL_ENV !== 'production' && /^https?:\/\/(localhost|127\.0\.0\.1|[\w-]+\.vercel\.app)(:\d+)?$/.test(origen);
  if (!ORIGENES.includes(origen) && !local) return res.status(403).json({ error: 'origen' });

  const ip = String(req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'sin-ip';
  if (await frenar(ip)) return res.status(429).json({ error: 'limite' });

  let cuerpo = req.body;
  try { if (typeof cuerpo === 'string') cuerpo = JSON.parse(cuerpo || '{}'); } catch { return res.status(400).json({ error: 'datos' }); }
  const nombre = linea(cuerpo?.datos?.nombre, 120);
  const email = linea(cuerpo?.datos?.email, 200);
  const mas = corto(cuerpo?.datos?.mas, 2000);
  const respuestas = (Array.isArray(cuerpo?.respuestas) ? cuerpo.respuestas : []).slice(0, 20).map((x) => ({ q: linea(x?.q, 200), a: corto(x?.a, 1000) }));
  if (!nombre || !EMAIL.test(email) || !respuestas.length) return res.status(400).json({ error: 'datos' });

  const idioma = cuerpo?.lang === 'en' ? 'inglés' : 'castellano';
  const text = [
    `${nombre} <${email}>`,
    `Tipo de proyecto: ${linea(cuerpo?.ruta, 40) || 'sin indicar'} · Idioma: ${idioma}`,
    '',
    ...respuestas.flatMap((x) => [x.q, x.a, '']),
    ...(mas ? ['Algo más', mas, ''] : []),
    'Responde a este correo para contestarle. Le hemos dicho que le escribimos en un máximo de 48 horas.',
  ].join('\n');

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${clave}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: DE, to: PARA, reply_to: email, subject: `Nuevo brief · ${nombre}`, text }),
      signal: AbortSignal.timeout(8000),
    });
    if (!r.ok) {
      console.error('brief: Resend respondió', r.status); // sin datos del visitante en el registro
      return res.status(502).json({ error: 'proveedor' });
    }
    return res.status(200).json({ ok: true });
  } catch {
    console.error('brief: fallo al llamar a Resend');
    return res.status(502).json({ error: 'fallo' });
  }
}
