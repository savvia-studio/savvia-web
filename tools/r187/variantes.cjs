// Ronda 187 · variantes del logotipo «savvia» sobre el contorno actual (public/savvia-palabra.svg). Lámina para decidir; no toca la web.
const fs = require('fs'), sharp = require('sharp');
const S = fs.readFileSync('public/savvia-palabra.svg', 'utf8'), D = S.match(/ d="([^"]+)"/)[1];
const subs = D.split(/(?=M)/); // 0 s · 1 a · 2 contraguía · 3 v · 4 v · 5 punto · 6 i · 7 a · 8 contraguía
const mueve = (p, dx) => p.replace(/(-?[\d.]+)(\s|-)/g, (m) => m) && p; // (sin uso)
// A · el punto de la i como gota (punta arriba), misma masa que el círculo (r 58)
const gota = 'M1806 -706C1818 -676 1864 -652 1864 -614C1864 -582 1838 -556 1806 -556C1774 -556 1748 -582 1748 -614C1748 -652 1794 -676 1806 -706Z';
// C · el brazo fino de cada v remata en gota en vez de en remate recto
const vC = (dx) => `M${977+dx} -95L${1093+dx} -398C${1079+dx} -438 ${1098+dx} -472 ${1131+dx} -472C${1162+dx} -472 ${1180+dx} -446 ${1170+dx} -416C${1165+dx} -401 ${1150+dx} -388 ${1140+dx} -370L${974+dx} 0H${933+dx}L${762+dx} -427H${713+dx}V-462H${923+dx}V-427H${853+dx}Z`;
// B · las dos v comparten el remate de en medio (un solo puente)
const puente = 'M1150 -462H1240V-427H1150Z';
const arma = (o) => { const s = [...subs]; if (o.C) { s[3] = vC(0); s[4] = vC(496); } if (o.A) s[5] = gota; let d = s.join(''); if (o.B) d += puente; return d; };
const V = [['Actual', {}], ['A · punto en gota', { A: 1 }], ['B · vv unidas', { B: 1 }], ['C · v con remate en gota', { C: 1 }], ['A + C', { A: 1, C: 1 }], ['A + B', { A: 1, B: 1 }]];
const svg = (d, fill) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-11 -730 2373 748"><path fill="${fill}" d="${d}"/></svg>`;
fs.mkdirSync('tools/r187/svg', { recursive: true });
(async () => {
  const W = 1800, filas = [];
  for (const [n, o] of V) {
    const d = arma(o); fs.writeFileSync(`tools/r187/svg/${n.split(' ')[0].replace(/\W/g, '') || 'X'}.svg`, svg(d, '#302018'));
    const grande = await sharp(Buffer.from(svg(d, '#302018'))).resize(1100).png().toBuffer();
    const peq = await sharp(Buffer.from(svg(d, '#F5F5F7'))).resize({ height: 24 }).png().toBuffer();
    const peqZ = await sharp(peq).resize({ height: 96, kernel: 'nearest' }).png().toBuffer();
    const pm = await sharp(peqZ).metadata();
    const fondo = await sharp({ create: { width: pm.width + 48, height: 144, channels: 4, background: '#3b231b' } }).composite([{ input: peqZ, left: 24, top: 24 }]).png().toBuffer();
    const t = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="40"><text x="0" y="28" font-family="Helvetica" font-size="26" fill="#302018">${n}</text></svg>`);
    filas.push(await sharp({ create: { width: W, height: 470, channels: 4, background: '#F5F5F7' } })
      .composite([{ input: t, left: 40, top: 20 }, { input: grande, left: 40, top: 80 }, { input: fondo, left: 1180, top: 160 }]).png().toBuffer());
  }
  await sharp({ create: { width: W, height: 470 * filas.length, channels: 4, background: '#F5F5F7' } })
    .composite(filas.map((f, i) => ({ input: f, left: 0, top: 470 * i }))).png().toFile(process.argv[2]);
  console.log('ok');
})();
