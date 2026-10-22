// La captura de cada proyecto del portfolio (la del CMS de treseiscero) → public/media/portfolio/<slug>.webp, y tres colores de su web para el
// degradado de su pieza (fondo · secundario · acento), medidos en la captura. node tools/portfolio-tsc/medios.cjs
const fs = require('fs'), sharp = require('sharp');
const ARCH = 'src/data/portfolio-tsc.json';
const datos = JSON.parse(fs.readFileSync(ARCH, 'utf8'));
fs.mkdirSync('public/media/portfolio', { recursive: true });
const hex = (r, g, b) => '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');
(async () => {
  for (const d of datos) {
    const dest = `public/media/portfolio/${d.slug}.webp`;
    if (!fs.existsSync(dest)) {
      const r = await fetch(d.captura);
      if (!r.ok) { console.log('✗', d.slug, r.status); continue; }
      const buf = Buffer.from(await r.arrayBuffer());
      await sharp(buf).resize({ width: 1280, withoutEnlargement: true }).webp({ quality: 80 }).toFile(dest);
    }
    const m = await sharp(dest).metadata();
    d.medida = [m.width, m.height];
    // colores: cubos de 16 niveles; el más frecuente es el fondo; el más saturado con presencia, el acento; el siguiente distinto, el secundario
    const { data } = await sharp(dest).resize(96, 54, { fit: 'fill' }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
    const cubos = new Map();
    for (let i = 0; i < data.length; i += 3) {
      const k = (data[i] >> 4) * 256 + (data[i + 1] >> 4) * 16 + (data[i + 2] >> 4);
      const c = cubos.get(k) ?? { n: 0, r: 0, g: 0, b: 0 }; c.n++; c.r += data[i]; c.g += data[i + 1]; c.b += data[i + 2]; cubos.set(k, c);
    }
    const lista = [...cubos.values()].map((c) => ({ n: c.n, r: c.r / c.n, g: c.g / c.n, b: c.b / c.n })).map((c) => ({ ...c, s: Math.max(c.r, c.g, c.b) - Math.min(c.r, c.g, c.b) })).sort((a, b) => b.n - a.n);
    const dist = (a, b) => Math.hypot(a.r - b.r, a.g - b.g, a.b - b.b);
    const fondo = lista[0];
    const acento = lista.filter((c) => c.n >= 6 && dist(c, fondo) > 60).sort((a, b) => b.s - a.s)[0] ?? lista[1] ?? fondo;
    const sec = lista.find((c) => dist(c, fondo) > 40 && dist(c, acento) > 40) ?? acento;
    d.colores = [fondo, sec, acento].map((c) => hex(c.r, c.g, c.b));
    console.log(d.slug, d.colores.join(' '));
  }
  fs.writeFileSync(ARCH, JSON.stringify(datos, null, 1));
})();
