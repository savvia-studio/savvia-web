// EL ROBLE DE PALABRAS (ronda 12). Referencia de Andoni: un cartel donde una flor está hecha de palabras pequeñas en serif.
// «Un roble con palabras que estén en el vocabulario de Savvia […] animado: que las palabras cambien de color y parezca que el árbol
//  cambia de estación. Incluso que las palabras caigan como hojas. Y las raíces que salen también se construyen con palabras.»
// · La FORMA sale de nuestro roble 3D (el render de Blender hace de MOLDE: su alfa dice dónde hay árbol; su color, si es hoja o madera).
// · Hoja = palabras enteras del vocabulario; madera = trozos cortos apilados (como los tallos del cartel). Todo horizontal, en Family.
// · Estaciones (solo modo «arbol»): verano → otoño (las palabras viran a Naranja y arcilla) → invierno (caen como hojas: gravedad,
//   vaivén y giro; quedan pocas, pálidas) → primavera (rebrotan, claras, con alguna en rosa) → verano. El cambio recorre la copa en ola.
// · Coste: solo se repinta mientras algo cambia (crecer, virar, caer). En reposo el lienzo está quieto: cero trabajo.
// OJO regla dura 7: aquí la tipografía vive en canvas. La familia se LEE del h1 (no se escribe a mano).
type Pal = { x: number; y: number; t: string; s: number; hoja: boolean; d: number; r: number; r2: number; c: [number, number, number]; cae: boolean };
type Op = { vocab: string[]; origen: [number, number]; modo: 'arbol' | 'raices' };
export type Palabras = { crecer(g: number): void; visible(si: boolean): void };

const NIEBLA: [number, number, number] = [234, 221, 231], ARCILLA: [number, number, number] = [229, 172, 158], NARANJA: [number, number, number] = [246, 83, 64], NOGAL: [number, number, number] = [150, 104, 80];
const mix = (a: number[], b: number[], k: number) => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k];
const ss = (a: number, b: number, x: number) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
const EST = ['verano', 'otono', 'invierno', 'primavera'] as const;
const PAUSA = { verano: 5200, otono: 3600, invierno: 2600, primavera: 3800 }, PASO = { verano: 3200, otono: 5600, invierno: 3800, primavera: 3200 }; // PASO[x] = lo que tarda en irse de x

export function crearPalabras(cv: HTMLCanvasElement, molde: HTMLImageElement, op: Op): Palabras {
  const c = cv.getContext('2d')!;
  const reducido = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const familia = getComputedStyle(document.querySelector('h1') ?? document.body).fontFamily;
  let ps: Pal[] = [], W = 0, H = 0, dpr = 1, g = 0, listo = false, ve = true, raf = 0;
  let est = 0, fase: 'pausa' | 'paso' = 'pausa', t0 = 0, quieto = false; // quieto = ya pintado y nada cambia: no se repinta // estación actual y, si «paso», hacia la siguiente
  let semilla = 7; const rnd = () => ((semilla = (semilla * 1664525 + 1013904223) % 4294967296) / 4294967296);

  function sembrar() {
    const r = cv.getBoundingClientRect(); W = r.width; H = r.height; if (W < 8) return;
    dpr = Math.min(devicePixelRatio || 1, 2); cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    // el molde, a baja resolución
    const MW = 300, MH = Math.round((MW * molde.naturalHeight) / molde.naturalWidth), m = document.createElement('canvas'); m.width = MW; m.height = MH;
    const mc = m.getContext('2d', { willReadFrequently: true })!; mc.drawImage(molde, 0, 0, MW, MH); const px = mc.getImageData(0, 0, MW, MH).data;
    semilla = 7; ps = [];
    const esc = Math.max(0.72, Math.min(1.25, W / 480)), sx = 8.4 * esc, sy = 6.6 * esc; let flujo = 0, vi = 0;
    const texto = op.vocab.join(' ').replace(/\s+/g, ' ');
    for (let y = sy; y < H - 2; y += sy) for (let x = sx * 0.5; x < W; x += sx) {
      const jx = x + (rnd() - 0.5) * sx * 0.9, jy = y + (rnd() - 0.5) * sy * 0.8;
      const i = (Math.min(MH - 1, Math.floor((jy / H) * MH)) * MW + Math.min(MW - 1, Math.floor((jx / W) * MW))) * 4;
      if (px[i + 3] < 120) continue;
      const R = px[i], G = px[i + 1], B = px[i + 2], hoja = op.modo === 'arbol' && G > R * 1.06 && G > B;
      if (rnd() > (hoja ? 0.4 : 0.88)) continue; // la copa, suelta: que las palabras se LEAN (con 0,62 se empastaba)
      let t: string;
      if (hoja) t = op.vocab[vi++ % op.vocab.length];
      else { const n = 2 + Math.floor(rnd() * 3); t = texto.slice(flujo, flujo + n).trim() || 'sa'; flujo = (flujo + n) % (texto.length - 4); }
      const d = Math.hypot((jx / W - op.origen[0]) * (W / H), jy / H - op.origen[1]);
      ps.push({ x: jx, y: jy, t, s: Math.round((hoja ? 9.5 + rnd() * 3.5 : 8.5 + rnd() * 2.5) * esc), hoja, d, r: rnd(), r2: rnd(), c: [R, G, B], cae: hoja && rnd() < 0.74 });
    }
    quieto = false;
    const dmax = Math.max(...ps.map((p) => p.d)) || 1; ps.forEach((p) => (p.d /= dmax));
    ps.sort((a, b) => a.s - b.s); // menos cambios de fuente
    listo = true;
  }

  // color de una palabra en una estación
  function color(p: Pal, e: (typeof EST)[number]): number[] {
    if (!p.hoja) { const l = (p.c[0] + p.c[1] + p.c[2]) / 765; return op.modo === 'raices' ? mix(NOGAL, ARCILLA, 0.25 + l * 1.6 + p.r * 0.2) : mix(NOGAL, ARCILLA, 0.2 + l * 1.4); }
    const verde = mix([p.c[0] * 1.15, Math.min(255, p.c[1] * 1.32), p.c[2] * 1.05], NIEBLA, 0.16);
    if (e === 'verano') return verde;
    if (e === 'otono') return p.r < 0.45 ? NARANJA : p.r < 0.8 ? ARCILLA : mix(NARANJA, NOGAL, 0.45);
    if (e === 'invierno') return mix(NIEBLA, [90, 78, 74], 0.35);
    return p.r > 0.84 ? ARCILLA : mix(verde, NIEBLA, 0.45);
  }

  function pintar(ahora: number) {
    raf = 0; if (!listo) return;
    if (!t0) t0 = ahora;
    const a = EST[est];
    let k = 0; // progreso del paso a → b
    if (op.modo === 'arbol' && !reducido && g >= 1) {
      const dt = ahora - t0;
      if (fase === 'pausa' && dt > PAUSA[a]) { fase = 'paso'; t0 = ahora; quieto = false; }
      else if (fase === 'paso') { k = Math.min(1, dt / PASO[a]); if (k >= 1) { est = (est + 1) % 4; fase = 'pausa'; t0 = ahora; k = 0; } }
    }
    const A = EST[est], Bn = EST[(est + 1) % 4];
    const vivo = op.modo === 'arbol' && !reducido && g >= 1;
    if (quieto && fase === 'pausa') { if (ve && vivo) raf = requestAnimationFrame(pintar); return; }
    c.setTransform(dpr, 0, 0, dpr, 0, 0); c.clearRect(0, 0, W, H); c.textAlign = 'center'; c.textBaseline = 'middle';
    let fs = 0;
    for (const p of ps) {
      const nace = ss(0, 0.16, g * 1.35 - p.d - p.r * 0.12); if (nace <= 0) continue;
      if (p.s !== fs) { fs = p.s; c.font = `${fs}px ${familia}`; }
      // la ola del cambio baja por la copa: cada palabra vira a su tiempo
      const kk = fase === 'paso' ? ss(0, 0.3, k * 1.3 - (p.y / H) * 0.5 - p.r * 0.5) : 0;
      const col = kk > 0 ? mix(color(p, A), color(p, Bn), kk) : color(p, A);
      let alfa = nace * (p.hoja ? 0.92 : 0.95), x = p.x, y = p.y, giro = 0;
      if (p.hoja && p.cae) {
        // caer: en el paso otoño → invierno; en invierno no están; en invierno → primavera rebrotan
        // cada hoja se suelta A SU TIEMPO (r2) y cae en ~1/4 del paso: nunca toda la copa a la vez
        const cay = A === 'otono' && fase === 'paso' ? Math.max(0, (k - p.r2 * 0.76) / 0.24) : A === 'invierno' ? 2 : 0;
        if (A === 'invierno') alfa *= fase === 'paso' ? ss(0, 0.4, k * 1.4 - p.r) : 0;
        else if (cay > 0) { const q = Math.min(1, cay), lado = p.r > 0.5 ? 1 : -1; y = p.y + Math.pow(q, 1.7) * (H - p.y + 14); x = p.x + lado * (Math.sin(q * (3 + p.r * 4) + p.r2 * 9) * (10 + p.r * 26) * q + q * 18 * (p.r2 - 0.5)); giro = lado * (0.3 + p.r2 * 1.5) * Math.sin(q * (2.5 + p.r * 3)) ; alfa *= 1 - ss(0.8, 1, q); }
      }
      if (alfa <= 0.01) continue;
      c.fillStyle = `rgba(${col[0] | 0},${col[1] | 0},${col[2] | 0},${alfa.toFixed(3)})`;
      if (giro) { c.save(); c.translate(x, y); c.rotate(giro); c.fillText(p.t, 0, 0); c.restore(); } else c.fillText(p.t, x, y);
    }
    quieto = fase === 'pausa';
    if (ve && vivo) raf = requestAnimationFrame(pintar);
  }
  const pedir = () => { if (!raf) raf = requestAnimationFrame(pintar); };
  const arrancar = () => document.fonts.ready.then(() => { sembrar(); cv.classList.add('listo'); pedir(); });
  molde.complete && molde.naturalWidth ? arrancar() : molde.addEventListener('load', arrancar, { once: true });
  let ancho = 0;
  new ResizeObserver(() => { const w = cv.getBoundingClientRect().width; if (listo && Math.abs(w - ancho) > 2) { ancho = w; sembrar(); pedir(); } }).observe(cv);
  return {
    crecer(x) { const k = Math.min(1, Math.max(0, x)); if (Math.abs(k - g) > 0.0008 || (k === 1 && g !== 1)) { g = k; quieto = false; if (k === 1) t0 = 0; pedir(); } },
    visible(si) { ve = si; if (si) pedir(); },
  };
}
