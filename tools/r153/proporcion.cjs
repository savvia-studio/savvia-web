// Ronda 153 · CUÁNTO SE USA CADA COLOR: de las grabaciones de la web entregada (portada + vídeos de detalle), 4 fotogramas por vídeo a 240 px;
// cada píxel cuenta para el color de su paleta más cercano (si está a menos de 46 en RGB; el resto —fotos, degradados, antialias— no cuenta).
// Salida: porcentaje de cada color sobre los píxeles clasificados. → tools/r153/proporcion.json
const sharp = require('/Users/andonimart/Desktop/savvia/savvia-web-main/node_modules/sharp');
const { execSync } = require('child_process');
const fs = require('fs');
const src = fs.readFileSync('src/data/proyectos.ts', 'utf8');
// paletas leídas del propio archivo de datos (slug → hex[])
const pal = {};
for (const bloque of src.split(/\n  \{\n    slug: /).slice(1)) {
  const slug = bloque.match(/^'([^']+)'/)[1];
  const m = bloque.match(/paleta: \[([\s\S]*?)\]/);
  if (m) pal[slug] = [...m[1].matchAll(/hex: '(#[0-9A-Fa-f]{6})'/g)].map((x) => x[1]);
}
const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
(async () => {
  const out = {};
  for (const [slug, hexes] of Object.entries(pal)) {
    const dir = `public/media/obra/${slug}`;
    const vids = fs.readdirSync(dir).filter((f) => /^(portada|x-.*)\.mp4$/.test(f));
    const cuenta = hexes.map(() => 0); let total = 0;
    for (const v of vids) {
      const dur = parseFloat(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${dir}/${v}`).toString());
      for (const t of [0.1, 0.35, 0.6, 0.85]) {
        const buf = execSync(`ffmpeg -loglevel error -ss ${(dur * t).toFixed(2)} -i ${dir}/${v} -frames:v 1 -vf scale=240:-1 -f image2pipe -vcodec png -`);
        const { data, info } = await sharp(buf).removeAlpha().raw().toBuffer({ resolveWithObject: true });
        const cs = hexes.map(rgb);
        for (let i = 0; i < data.length; i += 3) {
          let best = -1, bd = 1e9;
          for (let k = 0; k < cs.length; k++) { const d = (data[i] - cs[k][0]) ** 2 + (data[i + 1] - cs[k][1]) ** 2 + (data[i + 2] - cs[k][2]) ** 2; if (d < bd) { bd = d; best = k; } }
          if (bd < 46 * 46) { cuenta[best]++; total++; }
        }
      }
    }
    out[slug] = Object.fromEntries(hexes.map((h, k) => [h, Math.round((cuenta[k] / total) * 1000) / 10]));
    console.log(slug, vids.length, 'vídeos', JSON.stringify(out[slug]));
  }
  fs.writeFileSync('tools/r153/proporcion.json', JSON.stringify(out, null, 1));
})();
