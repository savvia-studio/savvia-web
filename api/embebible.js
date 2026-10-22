// ¿Se deja embeber esta web en un iframe de savvia.studio? Lo mira el SERVIDOR (el navegador no puede: un iframe rechazado no avisa).
// GET /api/embebible?url=https://neety.treseiscero.app/home → { ok: boolean, motivo }. Solo contesta por webs *.treseiscero.app y las dos demos de Vercel (no es un proxy abierto).
// Mandan las mismas reglas que el navegador: `frame-ancestors` del CSP, y solo si no hay, `X-Frame-Options`. Ante cualquier duda o fallo: ok = false
// (la web enseña entonces la captura, que nunca falla).
const PROPIOS = /^[a-z0-9-]+\.treseiscero\.app$/i;
// octubre 2026 · Quantus y Patchbay (conceptos propios, rehechos sin nada del cliente) viven en Vercel: también se preguntan
const DEMOS = new Set(['quantus-demo.vercel.app', 'patchbay-web.vercel.app']);
const NUESTROS = ['https://savvia.studio', 'https://www.savvia.studio'];

function ancestros(csp) {
  const d = csp.split(',').flatMap((p) => p.split(';')).map((s) => s.trim()).find((s) => /^frame-ancestors\s/i.test(s));
  if (!d) return null;
  const fuentes = d.split(/\s+/).slice(1).map((s) => s.toLowerCase());
  return fuentes.some((f) => f === '*' || f === 'https:' || NUESTROS.some((o) => f === o || (f.startsWith('https://*.') && o.endsWith(f.slice(9)))));
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
  let u;
  try { u = new URL(String(req.query?.url || '')); } catch { return res.status(400).json({ ok: false, motivo: 'url' }); }
  if (u.protocol !== 'https:' || !(PROPIOS.test(u.hostname) || DEMOS.has(u.hostname))) return res.status(403).json({ ok: false, motivo: 'host' });
  try {
    const r = await fetch(u, { method: 'GET', redirect: 'follow', signal: AbortSignal.timeout(6000), headers: { Referer: 'https://savvia.studio/' } });
    if (!r.ok) return res.status(200).json({ ok: false, motivo: `estado-${r.status}` });
    const csp = ancestros(r.headers.get('content-security-policy') || '');
    if (csp !== null) return res.status(200).json({ ok: csp, motivo: csp ? 'csp' : 'csp-no' });
    const xfo = (r.headers.get('x-frame-options') || '').trim();
    if (xfo) return res.status(200).json({ ok: false, motivo: 'x-frame-options' });
    return res.status(200).json({ ok: true, motivo: 'libre' });
  } catch {
    return res.status(200).json({ ok: false, motivo: 'sin-respuesta' });
  }
}
