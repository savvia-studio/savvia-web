// RONDA 96 · EL ESTILO RETRATO. Andoni: «me gusta por donde vamos pero en el hero quiero probar otro estilo, el que hemos usado para los retratos de los
// testimonios grandes» (y pasa las láminas nuevas del director, de espaldas con sus atriles y de perfil para el pie).
// Es el tratamiento de los retratos de «Más proyectos» (rondas 68–72), llevado a una escena:
// · UNA tinta, la del texto de la sección. En oscuro la tinta es clara y sale de lo CLARO de la lámina (camisa, oro, luces de la capa): un dibujo a tiza
//   sobre la noche. En la paleta clara, la tinta es oscura y sale de lo oscuro, como el carboncillo de los retratos.
// · Encima de la tinta continua, el SEMITONO de puntos a 45° de la casa (celda de 3,5 px), que pesa más en los medios tonos y hacia los cantos (que vienen ya
//   rotos con ruido de tools/r96/capas.py: el dibujo se deshace en el papel).
// · Se DIBUJA: primero lo más entintado, en rayas diagonales como el sombreado, y desde la punta de la batuta hacia fuera (el origen).
// · Y es MÚSICA: cuando pasa una onda (los atriles, la carga, una selección), los puntos de su anillo VIBRAN (se corren media celda y engordan). No se
//   recalcula nada: hay dos láminas ya hechas (la quieta y la vibrada) y la onda es un anillo de degradado que deja ver la vibrada (drawImage, GPU).
// Misma API que el papel (soltar · fondo · onda · visible · luz · punto · muestras · huecos): el hero y el manifiesto no distinguen un estilo del otro.
export type Muestra = { i: number; x: number; y: number; w: number; h: number; a: number; col: string; pen: string };

export function crearRetrato(cv: HTMLCanvasElement, img: HTMLImageElement, op: { origen: [number, number]; clara?: boolean; semilla?: number; dur?: number; dprMax?: number }) {
  const c = cv.getContext('2d')!;
  const reducido = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const DUR = op.dur ?? 2800, CEL = 3.5;
  let W = 0, H = 0, dpr = 1, listo = false, suelta = false, fin = false, visto = true, raf = 0, t0 = 0, impar = false, sucio = false;
  let d = new Float32Array(0), t = new Float32Array(0), im: ImageData | null = null;
  let tinta: [number, number, number] = [234, 221, 231], fondo: [number, number, number] = [59, 35, 27];
  const base = document.createElement('canvas'), vib = document.createElement('canvas'), tmp = document.createElement('canvas');
  const ondas: { x: number; y: number; t0: number; f: number }[] = [];
  let lista: Omit<Muestra, 'i'>[] = [], huecos = new Set<number>();
  let sem = op.semilla ?? 7;
  const az = () => { sem = (sem * 16807) % 2147483647; return sem / 2147483647; };
  // ruido de valor suave (el de los retratos): las rayas del orden del dibujo
  const ruido = (() => {
    const N = 256, tb = new Float32Array(N * N); let h = 1234567 + (op.semilla ?? 0);
    for (let i = 0; i < tb.length; i++) { h = (h * 1103515245 + 12345) & 0x7fffffff; tb[i] = h / 0x7fffffff; }
    return (x: number, y: number) => {
      const xi = Math.floor(x), yi = Math.floor(y), fx = x - xi, fy = y - yi, sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
      const g = (a: number, b: number) => tb[((b & 255) << 8) | (a & 255)];
      return (g(xi, yi) * (1 - sx) + g(xi + 1, yi) * sx) * (1 - sy) + (g(xi, yi + 1) * (1 - sx) + g(xi + 1, yi + 1) * sx) * sy;
    };
  })();
  const punto = (u: number, v: number, R: number) => {
    const fu = (((u / CEL) % 1) + 1) % 1, fv = (((v / CEL) % 1) + 1) % 1, du = fu - 0.5, dv = fv - 0.5, r = Math.sqrt(du * du + dv * dv) * CEL;
    return Math.min(1, Math.max(0, (R - r) / 0.7 + 0.5));
  };
  const preparar = () => {
    const r = cv.getBoundingClientRect();
    dpr = Math.min(op.dprMax ?? 1.5, devicePixelRatio || 1);
    W = Math.round(r.width * dpr); H = Math.round(r.height * dpr);
    if (W < 2 || H < 2 || !img.naturalWidth) return false;
    cv.width = W; cv.height = H;
    for (const x of [base, vib, tmp]) { x.width = W; x.height = H; }
    const m = getComputedStyle(cv).color.match(/[\d.]+/g);
    if (m) tinta = [+m[0], +m[1], +m[2]];
    const o = document.createElement('canvas'); o.width = W; o.height = H;
    const oc = o.getContext('2d', { willReadFrequently: true })!; oc.drawImage(img, 0, 0, W, H);
    const px = oc.getImageData(0, 0, W, H).data, n = W * H, esc = 1 / dpr;
    d = new Float32Array(n); t = new Float32Array(n);
    const dB = c.createImageData(W, H), dV = c.createImageData(W, H), oB = dB.data, oV = dV.data;
    const [R, G, B] = tinta, diag = Math.hypot(W, H), ox = op.origen[0] * W, oy = op.origen[1] * H;
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const i = y * W + x, a = px[i * 4 + 3] / 255;
      if (a < 0.02) continue;
      const L = (0.299 * px[i * 4] + 0.587 * px[i * 4 + 1] + 0.114 * px[i * 4 + 2]) / 255;
      const k = Math.min(1, Math.max(0, ((op.clara ? 1 - L : L) - 0.06) / 0.86));
      // un suelo de tinta para que lo hondo (pelo, pantallas) no se quede en un agujero: la silueta se lee entera
      const tn = a * (0.12 + 0.88 * Math.pow(k, 1.1));
      const u = (x + y) * esc * 0.7071, v = (x - y) * esc * 0.7071;
      const peso = 0.26 + 0.34 * (1 - Math.abs(tn - 0.5) * 2) + 0.25 * (1 - a);
      const hay = tn > 0.02 ? 1 : 0;
      const di = tn * (1 - peso) + punto(u, v, Math.sqrt(tn) * CEL * 0.58) * peso * hay;
      // la VIBRADA: la trama corrida media celda y más gruesa (el semitono que tiembla al paso de la onda)
      const dv2 = Math.min(1, tn * (1 - peso) * 1.12 + punto(u + CEL / 2, v + CEL / 2, Math.sqrt(tn) * CEL * 0.74) * peso * 1.25 * hay);
      d[i] = di;
      t[i] = 0.36 * (1 - di) + 0.22 * ruido(u / 46, v / 2.6) + 0.42 * (Math.hypot(x - ox, y - oy) / diag);
      const j = i * 4;
      oB[j] = oV[j] = R; oB[j + 1] = oV[j + 1] = G; oB[j + 2] = oV[j + 2] = B;
      oB[j + 3] = 255 * di * 0.88; oV[j + 3] = 255 * dv2 * 0.92;
    }
    base.getContext('2d')!.putImageData(dB, 0, 0);
    vib.getContext('2d')!.putImageData(dV, 0, 0);
    im = c.createImageData(W, H);
    // las MUESTRAS para el manifiesto: trozos del dibujo (donde hay tinta) que se desprenden; su color, la tinta fundida con el fondo
    lista = [];
    for (let k = 0, intentos = 0; k < 260 && intentos < 20000; intentos++) {
      const x = az() * W, y = az() * H, di = d[(Math.floor(y) * W + Math.floor(x))] || 0;
      if (di < 0.32) continue;
      const mz = 0.45 + 0.4 * Math.min(1, di), cl = (q: number) => Math.round(tinta[q] * mz + fondo[q] * (1 - mz));
      const w = (28 + az() * 34) * dpr, h = w * (0.34 + az() * 0.12);
      lista.push({ x: x / W, y: y / H, w: w / W, h: h / H, a: (az() - 0.5) * 0.5, col: `rgb(${cl(0)},${cl(1)},${cl(2)})`, pen: op.clara ? 'rgba(245,247,255,0.82)' : 'rgba(36,28,25,0.62)' });
      k++;
    }
    return true;
  };
  // EL DIBUJO: lo más entintado primero, en rayas, desde el origen (como los retratos, a 30 fps)
  const dibujar = (p: number) => {
    if (!im) return;
    const o = im.data, [R, G, B] = tinta, n = W * H, lo = p * 1.18 - 0.14;
    for (let i = 0; i < n; i++) {
      const di = d[i]; if (di < 0.02) continue;
      const q = (lo - t[i]) / 0.14, e = q <= 0 ? 0 : q >= 1 ? 1 : q * q * (3 - 2 * q);
      if (!e) continue;
      const j = i * 4; o[j] = R; o[j + 1] = G; o[j + 2] = B; o[j + 3] = 255 * di * 0.88 * e;
    }
    c.putImageData(im, 0, 0);
  };
  // EN REPOSO: la lámina quieta, las ondas (anillos donde asoma la vibrada) y los huecos de lo que se ha desprendido
  const componer = (ahora: number) => {
    c.globalCompositeOperation = 'source-over'; c.clearRect(0, 0, W, H); c.drawImage(base, 0, 0);
    const r = cv.getBoundingClientRect();
    for (let k = ondas.length - 1; k >= 0; k--) {
      const w = ondas[k], e = (ahora - w.t0) / 1000;
      if (e > 3.4) { ondas.splice(k, 1); continue; }
      const a = w.f * Math.pow(1 - e / 3.4, 1.6) * Math.min(1, e * 6); if (a < 0.01) continue;
      const x = (w.x - r.left) * dpr, y = (w.y - r.top) * dpr, R = e * 380 * dpr, an = 56 * dpr;
      const tc = tmp.getContext('2d')!;
      tc.globalCompositeOperation = 'source-over'; tc.clearRect(0, 0, W, H); tc.drawImage(vib, 0, 0);
      const g = tc.createRadialGradient(x, y, Math.max(0, R - an), x, y, R + an);
      g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(0.5, `rgba(0,0,0,${Math.min(1, a).toFixed(3)})`); g.addColorStop(1, 'rgba(0,0,0,0)');
      tc.globalCompositeOperation = 'destination-in'; tc.fillStyle = g; tc.fillRect(0, 0, W, H);
      c.drawImage(tmp, 0, 0);
    }
    if (huecos.size) {
      c.globalCompositeOperation = 'destination-out'; c.fillStyle = '#000';
      for (const i of huecos) { const m = lista[i]; if (!m) continue; c.setTransform(Math.cos(m.a), Math.sin(m.a), -Math.sin(m.a), Math.cos(m.a), m.x * W, m.y * H); c.fillRect(-m.w * W * 0.45, -m.h * H * 0.45, m.w * W * 0.9, m.h * H * 0.9); }
      c.setTransform(1, 0, 0, 1, 0, 0); c.globalCompositeOperation = 'source-over';
    }
    sucio = false;
  };
  const frame = (ahora: number) => {
    raf = 0;
    if (!listo || !visto) return;
    if (suelta && !fin) {
      if (!t0) t0 = ahora;
      const p = reducido ? 1 : Math.min(1, (ahora - t0) / DUR);
      impar = !impar;
      if (p >= 1) { fin = true; componer(ahora); } else if (impar) dibujar(1 - Math.pow(1 - p, 2.2));
      if (!fin) { pedir(); return; }
    }
    if (!fin) return;
    if (ondas.length || sucio) { componer(ahora); if (ondas.length) pedir(); }
  };
  const pedir = () => { if (!raf) raf = requestAnimationFrame(frame); };
  const arrancar = () => { if (!preparar()) return; listo = true; if (suelta) { cv.classList.add('listo'); pedir(); } };
  const iniciar = () => (img.complete && img.naturalWidth ? Promise.resolve() : new Promise<void>((r) => img.addEventListener('load', () => r(), { once: true }))).then(() => setTimeout(arrancar, 0));
  iniciar();
  let rz = 0;
  new ResizeObserver(() => { if (!listo) return; clearTimeout(rz); rz = window.setTimeout(() => { if (preparar()) { if (fin) sucio = true; pedir(); } }, 150); }).observe(cv);
  return {
    soltar() { if (suelta) return; suelta = true; t0 = 0; if (listo) { cv.classList.add('listo'); pedir(); } },
    visible(si: boolean) { visto = si; if (si) pedir(); },
    onda(x: number, y: number, f = 1) { if (reducido || !fin) return; ondas.push({ x, y, t0: performance.now(), f }); pedir(); },
    fondo(r: number, g: number, b: number) { fondo = [r, g, b]; },
    luz() {},
    punto(_k: number, x: number, y: number) { return [x, y]; },
    muestras(n: number): Muestra[] { return lista.slice(0, Math.max(n, 0)).map((m, i) => ({ i, ...m })).sort((p, q) => q.y - p.y); }, // de los pies a la batuta, como el papel
    huecos(l: number[]) { if (l.length === huecos.size && l.every((i) => huecos.has(i))) return; huecos = new Set(l); sucio = true; pedir(); },
  };
}
