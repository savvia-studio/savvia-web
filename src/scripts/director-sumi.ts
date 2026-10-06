// RONDA 115 · EL DIRECTOR A TINTA. Andoni: «esta idea [la pincelada suena] pero dibujando el director de orquesta, con la disposición de antes, y que el dibujo
// se haga más rápido».
// Las pinceladas SALEN DE LA LÁMINA (director-nitido.webp: de espaldas, brazos arriba, capa y batuta): se lee a una rejilla pequeña (luz, alfa) y se decide qué
// tinta pide cada sitio (en oscuro la tinta es CLARA: pinta lo claro de la lámina; en la paleta clara, lo oscuro). Como un pintor de sumi-e, por capas:
//   1 · la BATUTA, de la punta a la mano (de ahí nace todo: la V de la carga cae en su punta);
//   2 · el GESTO: el contorno de la silueta y los cantos fuertes, trazos secos y rápidos;
//   3 · las AGUADAS: las masas (capa, mangas, espalda), mucha agua y poca tinta;
//   4 · las PINCELADAS que siguen la forma (la dirección de los pliegues: perpendicular al gradiente de luz);
//   5 · los ACENTOS: lo que más tinta pide, toques cortos y cargados.
// Cada pincelada lleva su `t0` y su `dur` en SEGUNDOS: ~11 s en total. Unidades: x/y en fracción de la lámina, w en fracción de su ALTO.
export type Voz = 'batuta' | 'gesto' | 'aguada' | 'forma' | 'acento';
export type Pincelada = { voz: Voz; pts: [number, number, number][]; pig: number; agua: number; carga: number; gasto: number; semilla: number; t0: number; dur: number };

export const BATUTA: [number, number, number, number] = [0.632, 0.02, 0.733, 0.132]; // punta → mano

export function trazosDirector(img: HTMLImageElement, { clara = false, semilla = 7 } = {}) {
  const GW = 300, GH = Math.round((GW * img.naturalHeight) / img.naturalWidth);
  const cv = document.createElement('canvas'); cv.width = GW; cv.height = GH;
  const cx = cv.getContext('2d', { willReadFrequently: true })!; cx.drawImage(img, 0, 0, GW, GH);
  const px = cx.getImageData(0, 0, GW, GH).data, N = GW * GH;
  const A = new Float32Array(N), L = new Float32Array(N), T = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    A[i] = px[i * 4 + 3] / 255; L[i] = (0.299 * px[i * 4] + 0.587 * px[i * 4 + 1] + 0.114 * px[i * 4 + 2]) / 255;
    T[i] = A[i] * (clara ? 0.18 + 0.82 * (1 - L[i]) : 0.14 + 0.86 * Math.pow(L[i], 0.85));
  }
  const borrar = (src: Float32Array, r: number) => { // caja separable, dos pasadas ≈ gaussiana
    let a = Float32Array.from(src), b = new Float32Array(N);
    for (let pasada = 0; pasada < 2; pasada++) {
      for (let y = 0; y < GH; y++) { let s = 0, n = 0; for (let x = -r; x < GW + r; x++) { if (x + r < GW) { s += a[y * GW + x + r]; n++; } if (x - r - 1 >= 0) { s -= a[y * GW + x - r - 1]; n--; } if (x >= 0 && x < GW) b[y * GW + x] = s / Math.max(1, n); } }
      for (let x = 0; x < GW; x++) { let s = 0, n = 0; for (let y = -r; y < GH + r; y++) { if (y + r < GH) { s += b[(y + r) * GW + x]; n++; } if (y - r - 1 >= 0) { s -= b[(y - r - 1) * GW + x]; n--; } if (y >= 0 && y < GH) a[y * GW + x] = s / Math.max(1, n); } }
    }
    return a;
  };
  const Tg = borrar(T, 7), Tm = borrar(T, 2), Lm = borrar(L, 3), Am = borrar(A, 1);
  const en = (f: Float32Array, x: number, y: number) => { const xi = Math.max(0, Math.min(GW - 1, Math.round(x))), yi = Math.max(0, Math.min(GH - 1, Math.round(y))); return f[yi * GW + xi]; };
  // la dirección de la forma: perpendicular al gradiente de la luz (los pliegues); si no hay gradiente, hacia abajo (la capa cae)
  const dir = (x: number, y: number, f = Lm) => { const gx = en(f, x + 1, y) - en(f, x - 1, y), gy = en(f, x, y + 1) - en(f, x, y - 1); const m = Math.hypot(gx, gy); return m < 0.004 ? [Math.PI / 2, 0] : [Math.atan2(gy, gx) + Math.PI / 2, m]; };
  let h = (semilla * 7919) % 2147483647 || 1; const az = () => ((h = (h * 16807) % 2147483647) / 2147483647);
  const out: Pincelada[] = [];
  const norm = (pts: [number, number, number][]) => pts.map(([x, y, w]) => [x / GW, y / GH, w / GH] as [number, number, number]);
  // sigue el campo de direcciones desde (x, y) `pasos` veces; corta al salir de la figura
  const seguir = (x: number, y: number, pasos: number, paso: number, w0: number, campo = Lm) => {
    const pts: [number, number, number][] = []; let [a] = dir(x, y, campo); const s = az() < 0.5 ? 1 : -1; a += s > 0 ? 0 : Math.PI;
    for (let i = 0; i <= pasos; i++) {
      if (en(A, x, y) < 0.35) break;
      const f = i / Math.max(1, pasos); pts.push([x, y, w0 * (0.55 + 0.45 * Math.sin(Math.PI * Math.min(1, f * 1.15 + 0.08)))]);
      let [na] = dir(x, y, campo); if (Math.cos(na - a) < 0) na += Math.PI; a = a * 0.55 + na * 0.45; // sin giros bruscos
      x += Math.cos(a) * paso; y += Math.sin(a) * paso;
    }
    return pts;
  };
  // 1 · LA BATUTA (0 s)
  const [bx0, by0, bx1, by1] = BATUTA;
  out.push({ voz: 'batuta', pts: [[bx0, by0, 0.0035], [bx0 + (bx1 - bx0) * 0.5, by0 + (by1 - by0) * 0.5, 0.005], [bx1, by1, 0.007]], pig: 1, agua: 0.15, carga: 1, gasto: 0.3, semilla: 3, t0: 0, dur: 0.45 });
  // 2 · EL GESTO: puntos del canto de la silueta y de los cantos de luz fuertes, de arriba abajo
  const gesto: { x: number; y: number }[] = [];
  for (let k = 0; k < 9000 && gesto.length < 170; k++) {
    const x = 2 + az() * (GW - 4), y = 2 + az() * (GH - 4), a = en(Am, x, y), canto = a > 0.25 && a < 0.75;
    const [, mL] = dir(x, y), fuerte = en(A, x, y) > 0.6 && mL > 0.07;
    if ((canto && az() < 0.5) || (fuerte && az() < 0.12)) gesto.push({ x, y });
  }
  gesto.sort((p, q) => p.y - q.y).forEach((p, i) => {
    const canto = en(Am, p.x, p.y) < 0.8, pts = seguir(p.x, p.y, 5 + Math.floor(az() * 5), 2.2, canto ? 0.9 : 0.7, canto ? Am : Lm);
    if (pts.length < 3) return;
    out.push({ voz: 'gesto', pts: norm(pts), pig: clara ? 0.85 : 0.7, agua: 0.12, carga: 0.75, gasto: 0.7, semilla: az() * 50, t0: 0.35 + (i / 170) * 2.2, dur: 0.32 });
  });
  // 3 · LAS AGUADAS: una rejilla gruesa sobre las masas, del centro (la espalda) hacia fuera
  const aguadas: { x: number; y: number; t: number }[] = [];
  for (let y = 6; y < GH; y += 11) for (let x = 6; x < GW; x += 11) { const jx = x + (az() - 0.5) * 7, jy = y + (az() - 0.5) * 7, t = en(Tg, jx, jy); if (t > 0.16 && en(A, jx, jy) > 0.4) aguadas.push({ x: jx, y: jy, t }); }
  const cxm = GW * 0.47, cym = GH * 0.45;
  aguadas.sort((p, q) => Math.hypot(p.x - cxm, p.y - cym) - Math.hypot(q.x - cxm, q.y - cym)).forEach((p, i, l) => {
    const pts = seguir(p.x, p.y, 2, 4, 6.5 + az() * 3.5, Tg); if (pts.length < 2) return;
    out.push({ voz: 'aguada', pts: norm(pts), pig: 0.1 + 0.26 * p.t, agua: 1.15, carga: 1, gasto: 0.1, semilla: az() * 50, t0: 2 + (i / l.length) * 2.6, dur: 0.45 });
  });
  // 4 · LAS PINCELADAS DE FORMA: donde más tinta pide la lámina, siguiendo los pliegues; de arriba abajo
  const formas: { x: number; y: number; t: number }[] = [];
  for (let k = 0; k < 20000 && formas.length < 300; k++) { const x = az() * GW, y = az() * GH, t = en(Tm, x, y); if (en(A, x, y) > 0.5 && az() < t * t * 1.4) formas.push({ x, y, t }); }
  formas.sort((p, q) => p.y - q.y).forEach((p, i, l) => {
    const pts = seguir(p.x, p.y, 4 + Math.floor(az() * 4), 3, 1.8 + p.t * 2.2); if (pts.length < 3) return;
    out.push({ voz: 'forma', pts: norm(pts), pig: 0.22 + 0.62 * p.t, agua: 0.3, carga: 0.9, gasto: 0.55, semilla: az() * 50, t0: 4 + (i / l.length) * 4.6, dur: 0.3 });
  });
  // 5 · LOS ACENTOS: el 8 % que más tinta pide, toques cortos y cargados
  const acentos: { x: number; y: number }[] = [];
  for (let k = 0; k < 20000 && acentos.length < 90; k++) { const x = az() * GW, y = az() * GH; if (en(Tm, x, y) > 0.68 && en(A, x, y) > 0.7 && az() < 0.3) acentos.push({ x, y }); }
  acentos.sort((p, q) => p.y - q.y).forEach((p, i, l) => {
    const pts = seguir(p.x, p.y, 2, 2.2, 1.3 + az()); if (pts.length < 2) return;
    out.push({ voz: 'acento', pts: norm(pts), pig: 1.1, agua: 0.14, carga: 0.95, gasto: 0.4, semilla: az() * 50, t0: 8.4 + (i / l.length) * 2, dur: 0.18 });
  });
  return out;
}
