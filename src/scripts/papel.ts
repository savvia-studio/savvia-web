// RONDA 90–91 · EL ESTILO PAPEL. Andoni pasa un vídeo (v0.mp4: una llama hecha de ETIQUETAS de papel con una palabra impresa, superpuestas en tonos, giradas,
// que tiemblan a pocos fotogramas por segundo) y en la ronda 91 lo elige: «me mola el estilo papel, pero va muy ralentizada la web; quiero que el dibujo tenga
// más detalle para que se aprecie que es un director de orquesta; los colores, que se mimeticen mejor con el fondo».
// · Cada etiqueta cae donde la lámina (la NÍTIDA, sin el sueño) tiene tinta; más pequeñas y más densas donde hay contorno (manos, cabeza, batuta): detalle.
//   Su color, el de la lámina posterizado y FUNDIDO con el fondo de la web; dentro, una palabra de savvia en un tono más hondo.
// · La batuta, una tira de papel larga y fina (un rectángulo no puede dibujarla).
// · RENDIMIENTO (ronda 91, medido: 31 fps con picos de 1,2 s con la CPU ×4): antes cada onda obligaba a repintar con texto las ~1.500 etiquetas en cada
//   fotograma. Ahora cada etiqueta se pinta UNA VEZ en una lámina de recortes (atlas) y luego solo se coloca (drawImage); el temblor son tres fotogramas ya
//   compuestos que se alternan a 6 por segundo; y una onda solo levanta (se vuelve a colocar, desplazada y aclarada) lo que está en su anillo.
type Etq = { x: number; y: number; w: number; h: number; a: number; sx: number; sy: number; d: number; lum: number; br: number; bw: number; bw2: number };
const PALABRAS = ['batuta', 'criterio', 'agente', 'tempo', 'voz', 'IA', 'savvia', 'partitura', 'compás', 'código', 'diseño', 'web', 'ritmo', 'orquesta', 'atril', 'nota'];

// RONDA 92 · «en el hero claro, el director y los ordenadores con colores más POP, estilo wepresent.wetransfer.com» (pastel pop: lima, mantequilla, salmón, lavanda,
// con el negro de la tinta). Con `pop`, cada etiqueta toma un color de esta tabla según el matiz y el tono de la lámina
// RONDA 93 · «más colores pop, y la ilustración con más contraste de colores»: cada zona tiene ahora una LUZ y una SOMBRA saturadas y de matiz distinto
// (capa coral → frambuesa; camisa limón → naranja; piel rosa → naranja; peanas amarillo → naranja; pantallas celeste → cobalto) y salpicaduras de
// acento (lima, verde, rosa, cobalto, lavanda). Lo oscuro va en tinta o en cobalto: así no salen agujeros negros, salen sombras de color
// RONDA 94 · Andoni fija la paleta del director en claro: Blanco frío #F5F7FF (fondo) · Tinta cálida #241C19 · Azul eléctrico #3046FF · Rosa pop #FF67C8 ·
// Lima luminoso #E4FF57 · Mandarina #FF793F («detalles que conecten con el color del director»). Solo esos: la capa en mandarina con la sombra en rosa y la
// sombra honda en azul; la camisa en lima con la sombra en azul; la piel en rosa y mandarina; las peanas en mandarina y tinta; las pantallas en azul con
// destellos de lima; el pelo y lo muy oscuro en tinta. Un 10 % de acentos sueltos de la misma paleta
const POP = { tinta: [36, 28, 25], azul: [48, 70, 255], rosa: [255, 103, 200], lima: [228, 255, 87], mandarina: [255, 121, 63], blanco: [245, 247, 255] } as const;
const ACENTOS = [POP.lima, POP.rosa, POP.azul, POP.mandarina];
const popDe = (r: number, g: number, b: number, lum: number, az: number) => {
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), sat = mx - mn;
  let h = 0;
  if (sat > 0.001) h = mx === r ? ((g - b) / sat) % 6 : mx === g ? (b - r) / sat + 2 : (r - g) / sat + 4;
  h = (h * 60 + 360) % 360;
  if (az < 0.1) return ACENTOS[Math.floor(az * 40) % ACENTOS.length]; // acentos sueltos (10 %)
  if (lum < 0.1 || (sat < 0.1 && lum < 0.3) || (lum < 0.2 && h > 12 && h < 45)) return az < 0.3 ? POP.azul : POP.tinta; // pelo, pantalón, lo muy oscuro
  if (h >= 170 && h <= 280 && sat > 0.03) return lum > 0.5 ? POP.lima : POP.azul; // pantallas
  if ((h < 22 || h > 335) && sat > 0.34) return lum > 0.26 ? POP.mandarina : lum > 0.14 ? POP.rosa : POP.azul; // la capa
  if (h < 26) return lum > 0.5 ? POP.rosa : POP.mandarina; // la piel (manos, nuca)
  if (h < 66) return lum > 0.58 ? POP.lima : sat > 0.4 ? POP.mandarina : POP.azul; // camisa clara (lima, sombras en azul) · peanas doradas (mandarina)
  return lum > 0.6 ? POP.lima : POP.rosa;
};
// la palabra impresa: en tinta sobre los colores claros, en blanco frío sobre los hondos (más contraste)
const hondo = (c: readonly number[]) => 0.299 * c[0] + 0.587 * c[1] + 0.114 * c[2] < 110;
export type Muestra = { i: number; x: number; y: number; w: number; h: number; a: number; col: string; pen: string };
// RONDA 94 · «que el director mueva los brazos, que se sienta animado»: un RIG mínimo. Cada brazo es un segmento hombro → mano (en fracciones de la lámina);
// las etiquetas que caen a lo largo de él giran alrededor del hombro (con un peso que crece desde el hombro, para que la tela del cuerpo no se rompa) y el
// antebrazo gira un poco más alrededor del codo. Los ángulos laten a compás (`bpm`): la mano de la batuta marca el tiempo, la otra respira despacio.
// `pose`: ángulos de partida por brazo (radianes; el pie usa otra postura con la misma lámina)
export type Brazo = { hombro: [number, number]; mano: [number, number]; ancho: number };
export function crearPapel(cv: HTMLCanvasElement, img: HTMLImageElement, op: { origen: [number, number]; semilla?: number; batuta?: [number, number, number, number]; densidad?: number; pop?: boolean; brazos?: Brazo[]; bpm?: number; pose?: number[]; amplitud?: number; luzHaz?: boolean }) {
  const c = cv.getContext('2d')!;
  const reducido = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let etq: Etq[] = [], W = 0, H = 0, dpr = 1, listo = false, suelta = false, t0 = 0, raf = 0, visto = true;
  let atlas: HTMLCanvasElement | null = null;
  const variantes: HTMLCanvasElement[] = [];
  const ondas: { x: number; y: number; t0: number; f: number }[] = [];
  // RONDA 93 · las etiquetas que se han DESPRENDIDO (vuelan al manifiesto): dejan su hueco en el collage
  let huecos = new Set<number>(), sucio = false;
  const BR = op.brazos ?? [];
  let ang = BR.map((_, k) => op.pose?.[k] ?? 0), ang2 = BR.map(() => 0);
  // gira (x, y) [px del lienzo] con el brazo k: primero el antebrazo alrededor del codo (peso w2), luego todo alrededor del hombro (peso w)
  const rot = (x: number, y: number, cx0: number, cy0: number, a: number) => { const c0 = Math.cos(a), s0 = Math.sin(a), dx = x - cx0, dy = y - cy0; return [cx0 + dx * c0 - dy * s0, cy0 + dx * s0 + dy * c0]; };
  const mover = (x: number, y: number, k: number, w: number, w2: number): [number, number, number] => {
    const b = BR[k], hx = b.hombro[0] * W, hy = b.hombro[1] * H, ex = hx + (b.mano[0] * W - hx) * 0.55, ey = hy + (b.mano[1] * H - hy) * 0.55;
    let p = [x, y];
    if (w2 > 0) { const [ex2, ey2] = rot(ex, ey, hx, hy, 0); p = rot(p[0], p[1], ex2, ey2, ang2[k] * w2); }
    p = rot(p[0], p[1], hx, hy, ang[k] * w);
    return [p[0], p[1], ang[k] * w + ang2[k] * w2];
  };
  let fondo: [number, number, number] = [59, 35, 27];
  let sem = op.semilla ?? 7;
  const az = () => { sem = (sem * 16807) % 2147483647; return sem / 2147483647; };
  const fuente = getComputedStyle(document.documentElement).getPropertyValue('--font-mono') || 'monospace';

  const preparar = () => {
    const r = cv.getBoundingClientRect(); dpr = Math.min(2, devicePixelRatio || 1);
    W = r.width; H = r.height; if (W < 2 || H < 2) return;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    // muestrear la lámina
    const SW = 320, SH = Math.round((SW * img.naturalHeight) / img.naturalWidth);
    const m = document.createElement('canvas'); m.width = SW; m.height = SH;
    const mc = m.getContext('2d', { willReadFrequently: true })!; mc.drawImage(img, 0, 0, SW, SH);
    const d = mc.getImageData(0, 0, SW, SH).data;
    const lumA = (x: number, y: number) => { const i = (Math.min(SH - 1, Math.max(0, y)) * SW + Math.min(SW - 1, Math.max(0, x))) * 4, al = d[i + 3] / 255; return al < 0.1 ? -0.4 : (0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2]) / 255 / al; };
    const u = Math.max(4, W / 92) * (op.densidad ?? 1); // el módulo de la etiqueta
    const n = Math.round(((W * H) / (u * u * 3)) * 1.9);
    etq = [];
    sem = op.semilla ?? 7;
    const [fr, fg, fb] = fondo;
    for (let k = 0, intentos = 0; k < n && intentos < n * 14; intentos++) {
      const sx = Math.floor(az() * SW), sy = Math.floor(az() * SH), i = (sy * SW + sx) * 4, al = d[i + 3] / 255;
      if (al < 0.4) continue;
      // DETALLE: el contraste local (contornos, manos, pliegues): ahí van más etiquetas y más pequeñas
      const g = Math.min(1, (Math.abs(lumA(sx + 2, sy) - lumA(sx - 2, sy)) + Math.abs(lumA(sx, sy + 2) - lumA(sx, sy - 2))) * 1.6);
      if (az() > 0.45 + 0.55 * g) continue;
      let rr = d[i] / al / 255, gg = d[i + 1] / al / 255, bb = d[i + 2] / al / 255;
      const lum = 0.299 * rr + 0.587 * gg + 0.114 * bb;
      // posterizar (6 tonos, el matiz se conserva), apagar un poco y FUNDIR con el fondo
      const q = Math.round(lum * 5) / 5, k2 = lum > 0.01 ? (0.1 + q * 0.9) / lum : 1;
      rr = Math.min(1, rr * k2); gg = Math.min(1, gg * k2); bb = Math.min(1, bb * k2);
      const gris = 0.299 * rr + 0.587 * gg + 0.114 * bb;
      const fun = fr + fg + fb > 380 ? 0.08 : 0.24; // sobre claro se funde menos (si no, se lava)
      const mez = (v: number, f: number) => Math.round((v * 0.86 + gris * 0.14) * 255 * (1 - fun) + f * fun);
      let col = `rgb(${mez(rr, fr)},${mez(gg, fg)},${mez(bb, fb)})`;
      let p2: readonly number[] | null = null;
      if (op.pop) { p2 = popDe(rr, gg, bb, q, az()); col = `rgb(${p2[0]},${p2[1]},${p2[2]})`; }
      const claroF = fr + fg + fb > 380; // sobre fondo claro (ronda 91), la palabra va en tinta cálida
      const pen = p2 ? (hondo(p2) ? 'rgba(245,247,255,0.82)' : 'rgba(36,28,25,0.62)') : claroF ? 'rgba(36,28,25,0.55)' : `rgba(${Math.round(fr * 0.5)},${Math.round(fg * 0.5)},${Math.round(fb * 0.5)},0.62)`;
      const esc = 1 - 0.5 * g;
      const rot = az(), a = rot < 0.3 ? 0 : rot < 0.58 ? (Math.PI / 2) * (az() < 0.5 ? 1 : -1) : (az() - 0.5) * 1.6;
      const x = ((sx + az()) / SW) * W, y = ((sy + az()) / SH) * H;
      const w = u * (2.4 + az() * 1.4) * esc, h = u * (0.9 + az() * 0.3) * esc;
      etq.push({ x, y, w, h, a, sx: 0, sy: 0, d: Math.hypot((x / W - op.origen[0]) * (W / H), y / H - op.origen[1]), lum: q, ...{ col, pen, t: PALABRAS[Math.floor(az() * PALABRAS.length)] } } as Etq & { col: string; pen: string; t: string });
      k++;
    }
    // a qué brazo pertenece cada etiqueta (proyección sobre el segmento hombro → mano, en px)
    for (const e of etq) {
      e.br = -1; e.bw = 0; e.bw2 = 0;
      BR.forEach((b, k) => {
        const hx = b.hombro[0] * W, hy = b.hombro[1] * H, mx = b.mano[0] * W, my = b.mano[1] * H, vx = mx - hx, vy = my - hy, L2 = vx * vx + vy * vy;
        const t = ((e.x - hx) * vx + (e.y - hy) * vy) / L2, px = hx + vx * t, py = hy + vy * t, dist = Math.hypot(e.x - px, e.y - py);
        if (t > -0.05 && t < 1.6 && dist < b.ancho * W * (t < 0.2 ? 0.8 : t > 0.85 ? 1.35 : 1)) { // la mano entera (dedos, puño) va con el brazo
          const w = Math.min(1, Math.max(0, (t - 0.02) / 0.3)); const ww = w * w * (3 - 2 * w);
          if (ww > e.bw) { e.br = k; e.bw = ww; e.bw2 = Math.min(1, Math.max(0, (t - 0.5) / 0.2)); }
        }
      });
      // lo que cae sobre la BATUTA (de la mano a la punta) va entero con el brazo de la batuta
      if (op.batuta && BR.length > 1) {
        const [bx0, by0, bx1, by1] = op.batuta, ax2 = bx1 * W, ay2 = by1 * H, vx = bx0 * W - ax2, vy = by0 * H - ay2, L2 = vx * vx + vy * vy;
        const t = ((e.x - ax2) * vx + (e.y - ay2) * vy) / L2, dist = Math.hypot(e.x - (ax2 + vx * t), e.y - (ay2 + vy * t));
        if (t > -0.1 && t < 1.1 && dist < W * 0.03) { e.br = 1; e.bw = 1; e.bw2 = 1; }
      }
    }
    etq.sort((p, q2) => p.lum - q2.lum);
    // EL ATLAS: cada etiqueta, pintada una sola vez
    const pad = 2, filaMax = 2048;
    let ax = 0, ay = 0, altoFila = 0;
    for (const e of etq) { const ew = Math.ceil(e.w * dpr) + pad, eh = Math.ceil(e.h * dpr) + pad; if (ax + ew > filaMax) { ax = 0; ay += altoFila; altoFila = 0; } e.sx = ax; e.sy = ay; ax += ew; altoFila = Math.max(altoFila, eh); }
    atlas = document.createElement('canvas'); atlas.width = filaMax; atlas.height = Math.max(1, ay + altoFila);
    const ac = atlas.getContext('2d')!; ac.textBaseline = 'middle';
    for (const e0 of etq) {
      const e = e0 as Etq & { col: string; pen: string; t: string }, ew = e.w * dpr, eh = e.h * dpr;
      ac.save(); ac.translate(e.sx, e.sy); ac.fillStyle = e.col; ac.fillRect(0, 0, ew, eh);
      ac.beginPath(); ac.rect(0, 0, ew, eh); ac.clip();
      ac.fillStyle = e.pen; ac.font = `600 ${(eh * 0.78).toFixed(1)}px ${fuente}`; ac.fillText(e.t.toUpperCase(), eh * 0.15, eh * 0.53);
      ac.restore();
    }
    // tres fotogramas del temblor, ya compuestos
    variantes.length = 0;
    for (let v = 0; v < 3; v++) { const o = document.createElement('canvas'); o.width = cv.width; o.height = cv.height; const oc = o.getContext('2d')!; componer(oc, v, 9, undefined, BR.length ? 'cuerpo' : 'todo'); variantes.push(o); }
    listo = true;
  };
  // colocar las etiquetas (hasta el radio R desde el origen); `solo`: solo las que caen en los anillos de las ondas, desplazadas y aclaradas
  const componer = (cx: CanvasRenderingContext2D, v: number, R: number, solo?: { x: number; y: number; r: number; a: number }[], que: 'todo' | 'cuerpo' | 'brazos' = 'todo') => {
    if (!atlas) return;
    if (!solo && que !== 'brazos') cx.clearRect(0, 0, cv.width, cv.height);
    let s2 = 31 + v * 977;
    const j = () => { s2 = (s2 * 16807) % 2147483647; return s2 / 2147483647 - 0.5; };
    for (let n = 0; n < etq.length; n++) {
      const e = etq[n];
      const jx = j(), jy = j(), ja = j();
      if (e.d > R) continue;
      const enBrazo = e.br >= 0 && e.bw > 0.01;
      if ((que === 'cuerpo' && enBrazo) || (que === 'brazos' && (!enBrazo || huecos.has(n)))) continue;
      let x = e.x + jx * e.h * 0.5, y = e.y + jy * e.h * 0.5, a = e.a + ja * 0.12, luz = 0;
      if (enBrazo) { const m = mover(x, y, e.br, e.bw, e.bw2); x = m[0]; y = m[1]; a += m[2]; }
      if (solo) {
        for (const o of solo) { const dx = x - o.x, dy = y - o.y, dl = Math.hypot(dx, dy) + 0.01; if (Math.abs(dl - o.r) > 70) continue; const k = Math.exp(-Math.pow((dl - o.r) / 34, 2)) * o.a; x += (dx / dl) * k * 6; y += (dy / dl) * k * 6; a += k * 0.22; luz += k; }
        if (luz < 0.04) continue;
      }
      const nace = Math.min(1, (R - e.d) * 9);
      cx.setTransform(dpr * Math.cos(a), dpr * Math.sin(a), -dpr * Math.sin(a), dpr * Math.cos(a), x * dpr, y * dpr);
      cx.globalAlpha = nace;
      cx.drawImage(atlas, e.sx, e.sy, e.w * dpr, e.h * dpr, -e.w / 2, -e.h / 2, e.w, e.h);
      if (luz > 0.04) { cx.globalAlpha = Math.min(0.4, luz * 0.4); cx.fillStyle = 'rgb(255,236,214)'; cx.fillRect(-e.w / 2, -e.h / 2, e.w, e.h); }
    }
    // la BATUTA: una tira de papel larga y fina, encima de todo
    if (op.batuta && R > 0.1 && que !== 'cuerpo') {
      const [bx0, by0, bx1, by1] = op.batuta;
      let x0 = bx0 * W, y0 = by0 * H, x1 = bx1 * W, y1 = by1 * H;
      if (BR.length > 1) { [x0, y0] = mover(x0, y0, 1, 1, 1); [x1, y1] = mover(x1, y1, 1, 1, 1); }
      const L = Math.hypot(x1 - x0, y1 - y0), angB = Math.atan2(y1 - y0, x1 - x0), hb = Math.max(2, W / 260);
      cx.setTransform(dpr * Math.cos(angB), dpr * Math.sin(angB), -dpr * Math.sin(angB), dpr * Math.cos(angB), x0 * dpr, y0 * dpr);
      cx.globalAlpha = Math.min(1, R * 3); cx.fillStyle = `rgb(${Math.round(232 * 0.8 + fondo[0] * 0.2)},${Math.round(220 * 0.8 + fondo[1] * 0.2)},${Math.round(200 * 0.8 + fondo[2] * 0.2)})`;
      cx.fillRect(0, -hb / 2, L, hb);
    }
    cx.setTransform(1, 0, 0, 1, 0, 0); cx.globalAlpha = 1;
  };
  let ult = 0, ultOnda = 0, v = 0;
  // RONDA 94 · «que se note la iluminación de la luz de arriba en el director (hero oscuro)»: el HAZ del hero (el mismo, que sigue al ratón) se pinta SOBRE las
  // etiquetas (solo donde hay papel): una banda oblicua de luz cálida, más fuerte arriba, y un velo de luz cenital que se apaga hacia los pies
  let haz: { x: number; y: number; ancho: number } | null = null;
  const iluminar = () => {
    if (!haz || !op.luzHaz) return;
    c.globalCompositeOperation = 'source-atop';
    const g0 = c.createLinearGradient(0, 0, 0, cv.height); g0.addColorStop(0, 'rgba(255,226,190,0.12)'); g0.addColorStop(0.6, 'rgba(255,226,190,0.03)'); g0.addColorStop(1, 'rgba(255,226,190,0)');
    c.fillStyle = g0; c.fillRect(0, 0, cv.width, cv.height);
    // la banda: el eje pasa por (x, y) e inclina como el haz (skewX −18°: más abajo, más a la izquierda)
    c.setTransform(dpr, 0, -0.325 * dpr, dpr, (haz.x + 0.325 * haz.y) * dpr, 0);
    const g = c.createLinearGradient(-haz.ancho, 0, haz.ancho, 0);
    g.addColorStop(0, 'rgba(255,232,200,0)'); g.addColorStop(0.28, 'rgba(255,232,200,0.07)'); g.addColorStop(0.5, 'rgba(255,238,214,0.2)'); g.addColorStop(0.72, 'rgba(255,232,200,0.07)'); // ronda 95: «más sutil» g.addColorStop(1, 'rgba(255,232,200,0)');
    c.fillStyle = g; c.fillRect(-haz.ancho, 0, haz.ancho * 2, H);
    c.setTransform(1, 0, 0, 1, 0, 0); c.globalCompositeOperation = 'source-over';
  };
  const posar = (ahora: number) => {
    if (!BR.length || reducido) return;
    const amp = op.amplitud ?? 1, tb = (ahora / 1000) * ((op.bpm ?? 92) / 60), fb = tb % 1, b0 = op.pose?.[0] ?? 0, b1 = op.pose?.[1] ?? 0;
    // la mano de la batuta: baja en cada tiempo (el «ictus»), rebota y vuelve a subir; el antebrazo la sigue con algo de retraso
    ang[1] = b1 + amp * (0.075 * Math.sin(Math.PI * tb) + 0.035 * Math.exp(-fb * 5));
    ang2[1] = amp * 0.09 * Math.sin(Math.PI * tb - 0.7);
    // la otra mano, más lenta: respira cada dos tiempos
    if (BR.length > 0) { ang[0] = b0 + amp * 0.06 * Math.sin(Math.PI * tb * 0.5 + 1.1); ang2[0] = amp * 0.08 * Math.sin(Math.PI * tb * 0.5 + 0.3); }
  };
  const frame = (ahora: number) => {
    raf = 0; if (!listo || !visto) return;
    if (!suelta) { c.clearRect(0, 0, cv.width, cv.height); return; }
    if (!t0) t0 = ahora;
    const R = reducido ? 9 : ((ahora - t0) / 1000) * 0.55;
    for (let i = ondas.length - 1; i >= 0; i--) if ((ahora - ondas[i].t0) / 1000 > 3.4) ondas.splice(i, 1);
    const cambia = ahora - ult > 160; // el temblor, a 6 por segundo
    if (cambia) { ult = ahora; v = (v + 1) % 3; }
    const anima = BR.length > 0 && !reducido;
    if (R < 2.5) { if (ahora - ultOnda > 33) { ultOnda = ahora; posar(ahora); componer(c, v, R); iluminar(); } }
    else if ((anima && ahora - ultOnda > 30) || (sucio && ahora - ultOnda > 66) || cambia || (ondas.length && ahora - ultOnda > 40)) { // los huecos, a saltos (15 por segundo), como el papel
      sucio = false;
      ultOnda = ahora;
      posar(ahora);
      c.clearRect(0, 0, cv.width, cv.height);
      c.drawImage(variantes[v], 0, 0);
      // los HUECOS de las etiquetas desprendidas: se recortan del fotograma ya compuesto (medido: recomponer el collage entero hundía los fotogramas)
      if (huecos.size) {
        c.globalCompositeOperation = 'destination-out'; c.fillStyle = '#000';
        for (const n of huecos) { const e = etq[n]; if (!e || (BR.length && e.br >= 0 && e.bw > 0.01)) continue; c.setTransform(dpr * Math.cos(e.a), dpr * Math.sin(e.a), -dpr * Math.sin(e.a), dpr * Math.cos(e.a), e.x * dpr, e.y * dpr); c.fillRect(-e.w * 0.45, -e.h * 0.45, e.w * 0.9, e.h * 0.9); }
        c.setTransform(1, 0, 0, 1, 0, 0); c.globalCompositeOperation = 'source-over';
      }
      if (BR.length) componer(c, v, 9, undefined, 'brazos');
      if (ondas.length) {
        const r = cv.getBoundingClientRect();
        componer(c, v, 9, ondas.map((o) => { const e = (ahora - o.t0) / 1000; return { x: o.x - r.left, y: o.y - r.top, r: e * 380, a: o.f * Math.pow(1 - e / 3.4, 1.6) * Math.min(1, e * 6) }; }));
      }
      iluminar();
    }
    if (!reducido) raf = requestAnimationFrame(frame);
  };
  const pedir = () => { if (!raf) raf = requestAnimationFrame(frame); };
  const arrancar = () => { preparar(); cv.classList.add('listo'); pedir(); };
  const iniciar = () => document.fonts.ready.then(() => (typeof requestIdleCallback === 'function' ? requestIdleCallback(arrancar, { timeout: 400 }) : setTimeout(arrancar, 0))); // Safari no tiene requestIdleCallback
  img.complete && img.naturalWidth ? iniciar() : img.addEventListener('load', iniciar, { once: true });
  let rz = 0;
  new ResizeObserver(() => { if (!listo) return; clearTimeout(rz); rz = window.setTimeout(() => { preparar(); pedir(); }, 150); }).observe(cv);
  return {
    soltar() { if (suelta) return; suelta = true; t0 = 0; pedir(); },
    visible(si: boolean) { visto = si; if (si) pedir(); },
    onda(x: number, y: number, f = 1) { if (reducido) return; ondas.push({ x, y, t0: performance.now(), f }); pedir(); },
    // el color del fondo (al que se funden las etiquetas)
    fondo(r: number, g: number, b: number) { const cambio = r !== fondo[0] || g !== fondo[1] || b !== fondo[2]; fondo = [r, g, b]; if (cambio && listo) { preparar(); pedir(); } },
    // RONDA 94 · el haz: un punto de su eje (px del lienzo) y su semiancho
    luz(x?: number, y?: number, ancho?: number) { if (typeof x !== 'number') return; haz = { x, y: y ?? 0, ancho: ancho ?? 120 }; sucio = true; pedir(); },
    origen() {},
    // RONDA 94 · un punto de la lámina (fracciones) movido con el brazo k (la mano, la punta de la batuta), en fracciones
    punto(k: number, x: number, y: number): [number, number] { if (!BR[k] || !W) return [x, y]; const m = mover(x * W, y * H, k, 1, 1); return [m[0] / W, m[1] / H]; },
    // RONDA 92 · etiquetas REALES del collage (posición, tamaño y giro en fracciones del lienzo, y su color): de ellas salen las palabras del manifiesto
    // RONDA 93 · ordenadas de ABAJO ARRIBA (el director se deshace desde los pies hacia la batuta) y entre las más grandes (que se lean al volar); con su índice
    muestras(n: number): Muestra[] {
      if (!etq.length) return [];
      const idx = etq.map((_, i) => i).filter((i) => etq[i].w > 0).sort((p, q) => etq[q].w * etq[q].h - etq[p].w * etq[p].h).slice(0, Math.max(n, Math.floor(etq.length * 0.45)));
      const paso = idx.length / n, elegidas: number[] = [];
      for (let i = 0; i < n; i++) elegidas.push(idx[Math.floor(i * paso + ((i * 7919) % 97) / 97 * paso * 0.9) % idx.length]);
      elegidas.sort((p, q) => etq[q].y - etq[p].y);
      return elegidas.map((i) => { const e = etq[i] as Etq & { col: string; pen: string }; return { i, x: e.x / W, y: e.y / H, w: e.w / W, h: e.h / H, a: e.a, col: e.col, pen: e.pen }; });
    },
    huecos(lista: number[]) { if (lista.length === huecos.size && lista.every((i) => huecos.has(i))) return; huecos = new Set(lista); sucio = true; if (reducido) pedir(); },
  };
}
