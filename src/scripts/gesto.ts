// RONDA 118 · «EL GESTO» (referencia: Getty × Gehry, «Sculpting Harmony»: una sola línea a pluma que se dibuja con la música).
// De la PUNTA DE LA BATUTA sale una línea de tinta que dibuja el compás de 4/4 de un director (abajo · izquierda · derecha · arriba) a tempo de la música
// que suena (`fase()`), con su amplitud según lo que suena (`nivel()`). El centro del gesto pasea despacio por el recuadro, así que la línea va dejando un
// garabato de pluma que se borra por la cola (~9 s): nunca se llena. El trazo tiembla un poco (mano) y engorda cuando la pluma va despacio (presión).
// Vive en un lienzo entre el fondo y el director: la línea pasa por detrás de él. Movimiento reducido: no existe.
type Op = { clara: boolean; nivel: () => number; fase: () => number };
type Punto = { x: number; y: number; t: number; w: number };

const PUNTA: [number, number] = [0.648, 0.034]; // la punta de la batuta en director.webp (1490 × 1105)
// el dibujo del 4/4 (unidades del gesto, y hacia abajo): 1 abajo, 2 a la izquierda, 3 a la derecha, 4 arriba
const PATRON: [number, number][] = [[0, 1], [-0.95, 0.5], [0.95, 0.55], [0.1, -0.7]];
const COLA = 14000;

export function crearGesto(cv: HTMLCanvasElement, pie: HTMLElement, caja: HTMLElement, marco: HTMLElement, op: Op) {
  const c = cv.getContext('2d')!;
  const pts: Punto[] = [];
  let W = 0, H = 0, dpr = 1, punta = [0, 0], zona = { x0: 0, y0: 0, x1: 1, y1: 1 }, raf = 0, visible = true, t0 = 0, activo = false, amp = 0.5;
  const tinta = op.clara ? '36,28,25' : '234,221,231';

  const medir = () => {
    const pr = pie.getBoundingClientRect(), cr = caja.getBoundingClientRect(), mr = marco.getBoundingClientRect();
    dpr = Math.min(1.5, devicePixelRatio || 1); W = pr.width; H = pr.height;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    punta = [cr.left - pr.left + PUNTA[0] * cr.width, cr.top - pr.top + PUNTA[1] * cr.height];
    zona = { x0: mr.left - pr.left + mr.width * 0.22, x1: mr.left - pr.left + mr.width * 0.78, y0: mr.top - pr.top + mr.height * 0.18, y1: mr.top - pr.top + mr.height * 0.55 };
    pts.length = 0;
  };

  // la posición de la pluma en el instante t (ms)
  const pluma = (t: number) => {
    const b = op.fase(), k = ((Math.floor(b) % 4) + 4) % 4, f = b - Math.floor(b);
    const A = PATRON[k], B = PATRON[(k + 1) % 4];
    // ictus: cae deprisa al tiempo y frena antes del siguiente; un pequeño rizo perpendicular, como la muñeca
    const e = 1 - Math.pow(1 - f, 2.4), bul = Math.sin(Math.PI * f) * 0.32;
    const dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy) || 1;
    let gx = A[0] + dx * e - (dy / L) * bul, gy = A[1] + dy * e + (dx / L) * bul;
    // el dibujo gira y se deforma despacio: cada compás cae en otro sitio y la línea va acumulando garabato (no repite el mismo ocho)
    const ss0 = (t - t0) / 1000, ang = Math.sin(ss0 * 0.043) * 0.9 + ss0 * 0.021, ca = Math.cos(ang), sa = Math.sin(ang), ex = 1 + 0.35 * Math.sin(ss0 * 0.067);
    [gx, gy] = [(gx * ca - gy * sa) * ex, gx * sa + gy * ca];
    // el rebote del 1 (el tiempo fuerte)
    if (k === 0) gy -= Math.sin(Math.PI * Math.min(1, f * 2.2)) * 0.18;
    // el centro pasea despacio (Lissajous lento) y al empezar sale de la batuta
    const s = (t - t0) / 1000, sal = Math.min(1, s / 6), ss = sal * sal * (3 - 2 * sal);
    const cxL = zona.x0 + (zona.x1 - zona.x0) * (0.5 + 0.5 * Math.sin(s * 0.047)), cyL = zona.y0 + (zona.y1 - zona.y0) * (0.5 + 0.5 * Math.sin(s * 0.073 + 0.6));
    const cx = punta[0] + (cxL - punta[0]) * ss, cy = punta[1] + (cyL - punta[1]) * ss;
    // tamaño: la amplitud sigue a lo que suena (suavizada), y crece al salir
    const S = Math.min(W, H) * 0.2 * (0.6 + amp * 0.7) * (0.25 + 0.75 * ss);
    // la mano tiembla un poco
    const tx = Math.sin(t * 0.0131) * 1.1 + Math.sin(t * 0.0377) * 0.6, ty = Math.cos(t * 0.0113) * 1.1 + Math.sin(t * 0.0291) * 0.6;
    return [cx + gx * S + tx, cy + gy * S + ty];
  };

  const pintar = (ahora: number) => {
    raf = 0; if (!visible || !activo) return;
    amp += (Math.min(1, op.nivel() * 1.6) - amp) * 0.04;
    const [x, y] = pluma(ahora), u = pts[pts.length - 1];
    const v = u ? Math.hypot(x - u.x, y - u.y) : 0;
    // presión: despacio engorda, deprisa adelgaza
    const w = Math.max(0.7, 2.8 - v * 0.09);
    if (!u || v > 0.6) pts.push({ x, y, t: ahora, w: u ? u.w + (w - u.w) * 0.3 : w });
    while (pts.length && ahora - pts[0].t > COLA) pts.shift();
    c.setTransform(dpr, 0, 0, dpr, 0, 0); c.clearRect(0, 0, W, H); c.lineCap = 'round'; c.lineJoin = 'round';
    for (let i = 1; i < pts.length; i++) {
      const p = pts[i - 1], q = pts[i], edad = (ahora - q.t) / COLA, a = Math.pow(1 - edad, 1.3) * 0.7;
      if (a < 0.01) continue;
      c.strokeStyle = `rgba(${tinta},${a.toFixed(3)})`; c.lineWidth = q.w * (0.55 + 0.45 * (1 - edad));
      c.beginPath(); c.moveTo(p.x, p.y); c.lineTo(q.x, q.y); c.stroke();
    }
    // la punta de la pluma: una gota de savia
    c.fillStyle = 'rgba(255,97,107,0.9)'; c.beginPath(); c.arc(x, y, 2.2, 0, Math.PI * 2); c.fill();
    raf = requestAnimationFrame(pintar);
  };
  const pedir = () => { if (!raf && activo && visible) raf = requestAnimationFrame(pintar); };

  new ResizeObserver(() => { medir(); pedir(); }).observe(pie);
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (!visible) { cancelAnimationFrame(raf); raf = 0; } else pedir(); }).observe(pie);
  medir();
  return {
    empezar() { if (activo) return; activo = true; t0 = performance.now(); pts.length = 0; pedir(); },
  };
}
