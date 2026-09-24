// Hornea una lámina de naturaleza (sobre BLANCO) en UNA TINTA cálida con alfa, para vivir sobre Cacao.
//   node tools/tinta.cjs <entrada> <salida.webp> [anchoMax]
// · alfa  = cuánto se aparta el píxel del blanco (con umbral: los primeros niveles son ruido del fondo)
// · color = duotono por luminancia: sombras Nogal → medios Rosa arcilla → luces Rosa niebla
// Así las sombras del árbol se hunden en el Cacao y las luces son las que dibujan: el árbol sale de lo oscuro.
// Escribe también una vista previa sobre Cacao en tools/shots/_tinta.jpg e imprime la caja y el eje del tronco.
const sharp = require('sharp');
const [src, out, maxW = '1800', modo = 'tinta', corte = '1'] = process.argv.slice(2); // modo: tinta | color · corte: fracción del alto de la caja que se conserva
const ARCILLA = [0xe5, 0xac, 0x9e], NIEBLA = [0xea, 0xdd, 0xe7];
const mix = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);
const ss = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

(async () => {
  const { data, info } = await sharp(src).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info, N = W * H;
  // 1) alfa = cuánto se aparta del blanco; 2) luminancia PREMULTIPLICADA (quitando la parte de blanco que lleva el píxel).
  const A = Buffer.alloc(N), P = Buffer.alloc(N);
  for (let i = 0, p = 0; i < N; i++, p += 3) {
    const r = data[p], g = data[p + 1], b = data[p + 2];
    const a = ss(0.05, 0.5, (255 - Math.min(r, g, b)) / 255);
    const L = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    A[i] = Math.round(a * 255);
    P[i] = Math.round(Math.min(1, Math.max(0, L - (1 - a))) * 255);
  }
  // 3) TONO = desenfoque(P) / desenfoque(A): convolución normalizada. El blanco del fondo no aporta, así que los cantos
  //    translúcidos toman el tono de la hoja vecina (sin filo blanco) y el grano no se posteriza en curvas de nivel.
  // OJO: sharp puede devolver el gris desenfocado con MÁS de un canal; se lee con el paso que diga `info.channels`
  // (leerlo como 1 canal da rayas horizontales: fallo cazado mirando).
  const gris = async (buf) => {
    const o = await sharp(buf, { raw: { width: W, height: H, channels: 1 } }).blur(2.2).raw().toBuffer({ resolveWithObject: true });
    const k = o.info.channels, out = Buffer.alloc(N);
    for (let i = 0; i < N; i++) out[i] = o.data[i * k];
    return out;
  };
  const [Ab, Pb] = await Promise.all([gris(A), gris(P)]);
  const rgba = Buffer.alloc(N * 4);
  let x0 = W, y0 = H, x1 = 0, y1 = 0;
  // UNA SOLA TINTA (como la referencia, que es un solo azul): el color casi no cambia; lo que dibuja es la DENSIDAD.
  // Sobre oscuro la densidad es la LUZ de la lámina: las luces llevan tinta y las sombras dejan ver el Cacao.
  // Descartado al verlo: duotono Nogal→arcilla→niebla por píxel (salía solarizado, con filo blanco en cada canto).
  for (let i = 0; i < N; i++) {
    const cob = A[i] / 255;
    const T = Ab[i] > 2 ? Math.min(1, Pb[i] / Ab[i]) : 0;
    const t = ss(0.1, 0.78, T);
    const a = cob * (0.16 + 0.84 * Math.pow(t, 1.15));
    const c = mix(ARCILLA, NIEBLA, Math.pow(t, 3) * 0.7);
    if (modo === 'color') {
      // COLOR REAL: el píxel es a·C + (1−a)·blanco → C = (píxel − (1−a)·255) / a. Sin esto, halo pálido de pegatina sobre Cacao.
      const k = Math.max(cob, 0.12);
      for (let ch = 0; ch < 3; ch++) rgba[i * 4 + ch] = Math.min(255, Math.max(0, (data[i * 3 + ch] - (1 - cob) * 255) / k));
      rgba[i * 4 + 3] = A[i];
    } else {
      rgba[i * 4] = c[0]; rgba[i * 4 + 1] = c[1]; rgba[i * 4 + 2] = c[2]; rgba[i * 4 + 3] = Math.round(a * 255);
    }
    if (cob > 0.06) { const x = i % W, y = (i / W) | 0; if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  }
  // caja del sujeto con margen (el desenfoque del shader necesita aire alrededor)
  const m = Math.round(W * 0.03);
  x0 = Math.max(0, x0 - m); y0 = Math.max(0, y0 - m); x1 = Math.min(W - 1, x1 + m); y1 = Math.min(H - 1, y1);
  const w = x1 - x0 + 1, h = Math.round((y1 - y0 + 1) * +corte);
  // eje del tronco: centro de masa del alfa en la franja baja de la caja
  let sx = 0, sa = 0;
  for (let y = y0 + h - Math.round(h * 0.08); y < y0 + h - 2; y++) for (let x = x0; x <= x1; x++) { const a = A[y * W + x]; sx += x * a; sa += a; }
  console.log(JSON.stringify({ origen: [W, H], caja: [x0, y0, w, h], tronco: +((sx / sa - x0) / w).toFixed(4) }));
  const img = sharp(rgba, { raw: { width: W, height: H, channels: 4 } }).extract({ left: x0, top: y0, width: w, height: h }).resize({ width: Math.min(+maxW, w) });
  await img.clone().webp({ quality: 88, alphaQuality: 100 }).toFile(out); // alfa sin pérdida: con 90 quedaba ruido en el fondo y se veía la CAJA de la lámina
  await img.clone().flatten({ background: '#302018' }).jpeg({ quality: 84 }).toFile('tools/shots/_tinta.jpg');
})();
