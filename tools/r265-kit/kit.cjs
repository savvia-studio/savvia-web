// RONDA 265 · el kit de descarga del brandbook (public/descargas/): por estación, favicon (32, 64, 180 a sangre), avatar redondo para Telegram (512 y
// 640; Telegram lo recorta en círculo: el roble cabe entero), avatar de LinkedIn y X (400), y los fondos: X (1500 × 500) y LinkedIn (1584 × 396) del
// paisaje del pie (tools/r265-kit/fondos.cjs). El avatar es el favicon de la ronda 156 con el roble más recogido para que no lo corte el círculo.
const sharp = require('sharp'), fs = require('fs');
const NOCHE = { otono: '#3b231b', invierno: '#f5f5f7', primavera: '#3a2932', verano: '#1b3125' };
const D = 'public/descargas/'; fs.mkdirSync(D, { recursive: true });
(async () => {
  for (const [e, fondo] of Object.entries(NOCHE)) {
    // ronda 265 · Andoni: «usa como favicon, Telegram, LinkedIn y Twitter los que te pasé de "tenue"» (~/Desktop/savvia-favicons-telegram-luz-tenue,
    // ImageGen, luz al 35 %): los favicons tal cual; Telegram, su `subir-telegram.png` (1024, encuadre completo); LinkedIn y X, ese mismo a 400.
    const T = process.env.HOME + '/Desktop/savvia-favicons-telegram-luz-tenue';
    for (const t of [16, 32, 48, 64, 180, 192, 512]) fs.copyFileSync(`${T}/favicon/${e}/favicon-${t}.png`, `${D}savvia-favicon-${e}-${t}.png`);
    fs.copyFileSync(`${T}/favicon/${e}/favicon.ico`, `${D}savvia-favicon-${e}.ico`);
    fs.copyFileSync(`${T}/telegram/${e}/subir-telegram.png`, `${D}savvia-telegram-${e}.png`);
    await sharp(`${T}/telegram/${e}/subir-telegram.png`).resize(400, 400).png().toFile(`${D}savvia-avatar-${e}-400.png`);
    // fondos: recorte del paisaje del pie, apoyado abajo
    const src = `tools/r265-kit/out/pie-${e}.png`, m = await sharp(src).metadata();
    for (const [nom, w, h] of [['x', 1500, 500], ['linkedin', 1584, 396]]) {
      const ch = Math.round(m.width * h / w);
      await sharp(src).extract({ left: 0, top: m.height - ch, width: m.width, height: ch }).resize(w, h).jpeg({ quality: 90, mozjpeg: true }).toFile(`${D}savvia-fondo-${nom}-${e}.jpg`);
    }
    console.log(e, 'ok');
  }
  // el LOGOTIPO: la palabra (public/savvia-palabra.svg) en blanco y en Cacao, en SVG y en PNG transparente de 2400 px; y uno en el tono claro de cada estación (sobre su noche: 8,6–10,3:1; invierno, tinta: 12,4:1)
  const svg = fs.readFileSync('public/savvia-palabra.svg', 'utf8');
  const TINTAS = { blanco: '#F5F5F7', cacao: '#3B231B', otono: '#ECBF8F', invierno: '#22303E', primavera: '#F4C7D5', verano: '#CFE6A4' };
  for (const [n, c] of Object.entries(TINTAS)) {
    const v = svg.replace('fill="white"', `fill="${c}"`);
    fs.writeFileSync(`${D}savvia-logotipo-${n}.svg`, v);
    await sharp(Buffer.from(v), { density: 300 }).resize(2400).png().toFile(`${D}savvia-logotipo-${n}.png`);
  }
  console.log('logotipos ok');
})();
