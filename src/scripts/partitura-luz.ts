// RONDA 118 · LA PARTITURA QUE SE ILUMINA (referencia de Andoni: el «Invierno» de Vivaldi visualizado: una partitura de orquesta impresa, en perspectiva,
// por la que pasa la cámara mientras cada nota se ENCIENDE al sonar). Un lienzo plano (la CSS lo inclina) con una partitura general: pentagramas con su
// instrumento, barras de compás y notas sembradas. El cabezal avanza A TEMPO de la canción (`fase()`: cada nota cae en su tiempo y se enciende en él) y el
// scroll desplaza la cámara por la obra. Lo ya sonado queda encendido y se va apagando; lo que viene, impreso y apagado.
type Op = { fase: () => number; clara: boolean; cabezal?: number }; // cabezal: dónde va, en fracción del ancho del lienzo
const INSTR = ['Flauto', 'Oboe', 'Clarinetto', 'Corno', 'Tromba', 'Timpani', 'Violino I', 'Violino II', 'Viola', 'Violoncello', 'Contrabbasso', 'Sassofono'];
// el color de la luz por familia: maderas en niebla, metales en coral, cuerdas en salvia, percusión y saxo en coral tenue
const FAM = [0, 0, 0, 1, 1, 2, 3, 3, 3, 3, 3, 1];
const LUZ = [[234, 221, 231], [255, 97, 107], [255, 150, 120], [150, 191, 230]];
const PX = 46; // px por tiempo

export function crearPartituraLuz(cv: HTMLCanvasElement, sec: HTMLElement, op: Op) {
  const c = cv.getContext('2d')!;
  const reducido = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let W = 0, H = 0, dpr = 1, raf = 0, visible = false, cam = 0, camMeta = 0;
  // ronda 118 (8.ª): las notas ENCENDIDAS de este fotograma (en el lienzo), para que el enjambre de los dolores salga de ellas
  let luces: [number, number, number][] = [];
  // la obra: por pentagrama, notas [tiempo (en tiempos, con subdivisión), escalón (0 = línea de abajo)]
  let sem = 118; const az = () => ((sem = (sem * 16807) % 2147483647) / 2147483647);
  const LARGO = 512; // tiempos de obra (luego vuelve a empezar)
  const notas: [number, number][][] = INSTR.map((_, i) => {
    const out: [number, number][] = []; let p = 4 + Math.floor(az() * 3), silencio = 0;
    const dens = FAM[i] === 3 ? 0.62 : FAM[i] === 2 ? 0.22 : 0.42;
    for (let b = 0; b < LARGO; b += 0.5) {
      if (silencio > 0) { silencio -= 0.5; continue; }
      if (az() < 0.04) { silencio = 2 + Math.floor(az() * 6); continue; }
      if (b % 1 !== 0 && az() > 0.35) continue;
      if (az() > dens) continue;
      p = Math.max(-2, Math.min(10, p + Math.round((az() - 0.5) * 4)));
      out.push([b, p]);
    }
    return out;
  });
  // el resplandor de una nota, una vez por color
  const halo = LUZ.map(([r, g, b]) => {
    const s = document.createElement('canvas'); s.width = s.height = 64; const x = s.getContext('2d')!;
    const gr = x.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, `rgba(255,255,255,1)`); gr.addColorStop(0.12, `rgba(${r},${g},${b},0.95)`); gr.addColorStop(0.4, `rgba(${r},${g},${b},0.28)`); gr.addColorStop(1, `rgba(${r},${g},${b},0)`);
    x.fillStyle = gr; x.fillRect(0, 0, 64, 64); return s;
  });
  const tinta = op.clara ? '36,28,25' : '234,221,231';
  const serif = getComputedStyle(document.documentElement).getPropertyValue('--font-display').trim() || 'serif';
  const medir = () => { const r = cv.getBoundingClientRect(); dpr = Math.min(1.25, devicePixelRatio || 1); W = cv.offsetWidth; H = cv.offsetHeight; cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); void r; pedir(); };
  const pintar = () => {
    raf = 0; if (!visible || !W) return;
    // la cámara: el scroll por la sección mueve la obra (suavizado); el cabezal, a tempo
    const sr = sec.getBoundingClientRect(), prog = Math.min(1, Math.max(0, (innerHeight - sr.top) / (sr.height + innerHeight)));
    camMeta = 0 * prog; cam += (camMeta - cam) * 0.08; // ronda 118 (9.ª) · «la partitura no se acelera al hacer scroll»: solo avanza a tempo
    const t = reducido ? 0 : op.fase(), cab = ((t * 0.5 + cam) % LARGO + LARGO) % LARGO; // el cabezal, en tiempos de obra (media velocidad: se lee)
    const x0 = W * (op.cabezal ?? 0.42); // dónde está el cabezal en el lienzo
    c.setTransform(dpr, 0, 0, dpr, 0, 0); c.clearRect(0, 0, W, H);
    const G = 7, ST = Math.max(G * 9, (H - 80) / INSTR.length); // separación entre líneas y entre pentagramas
    const y0 = (H - ST * INSTR.length) / 2 + ST * 0.3;
    const desde = cab - x0 / PX - 1, hasta = cab + (W - x0) / PX + 1;
    // las líneas y las barras (cada 4 tiempos), impresas
    c.lineWidth = 1; c.strokeStyle = `rgba(${tinta},0.16)`; c.beginPath();
    INSTR.forEach((_, i) => { const yb = y0 + i * ST + 4 * G; for (let l = 0; l < 5; l++) { c.moveTo(0, yb - l * G); c.lineTo(W, yb - l * G); } });
    for (let b = Math.ceil(desde / 4) * 4; b < hasta; b += 4) { const x = x0 + (b - cab) * PX; c.moveTo(x, y0); c.lineTo(x, y0 + (INSTR.length - 1) * ST + 4 * G); }
    c.stroke();
    // el nombre del instrumento al principio de cada sistema (cada 32 tiempos)
    c.font = `13px ${serif}`; c.fillStyle = `rgba(${tinta},0.32)`; c.textAlign = 'right'; c.textBaseline = 'middle';
    for (let b = Math.ceil(desde / 32) * 32; b < hasta; b += 32) { const x = x0 + (b - cab) * PX - 8; INSTR.forEach((n, i) => c.fillText(n, x, y0 + i * ST + 2 * G)); }
    // las notas: impresas las que vienen; ENCENDIDAS las que ya han sonado (más vivas cuanto más recientes)
    luces = [];
    INSTR.forEach((_, i) => {
      const yb = y0 + i * ST + 4 * G, L = halo[FAM[i]];
      for (const [b, p] of notas[i]) {
        let bb = b; if (bb < desde - LARGO / 2) bb += LARGO; if (bb < desde || bb > hasta) continue;
        const x = x0 + (bb - cab) * PX, y = yb - (p * G) / 2, atras = cab - bb;
        c.globalCompositeOperation = 'source-over'; c.globalAlpha = 1;
        c.fillStyle = `rgba(${tinta},0.28)`; c.beginPath(); c.ellipse(x, y, G * 0.62, G * 0.44, -0.4, 0, Math.PI * 2); c.fill();
        c.strokeStyle = `rgba(${tinta},0.2)`; c.beginPath(); c.moveTo(x + G * 0.55, y); c.lineTo(x + G * 0.55, y - G * 3.2); c.stroke();
        if (atras >= 0 && atras < 6) luces.push([x, y, FAM[i]]);
        if (atras >= 0 && !op.clara) {
          const k = 0.22 + 0.78 * Math.exp(-atras / 3), r = G * (2.2 + 2.6 * Math.exp(-atras / 1.2));
          c.globalCompositeOperation = 'lighter'; c.globalAlpha = k; c.drawImage(L, x - r, y - r, r * 2, r * 2);
        } else if (atras >= 0) {
          const k = 0.3 + 0.7 * Math.exp(-atras / 3);
          c.globalAlpha = k; c.fillStyle = `rgb(${LUZ[FAM[i]].join(',')})`; c.beginPath(); c.ellipse(x, y, G * 0.7, G * 0.5, -0.4, 0, Math.PI * 2); c.fill();
        }
      }
    });
    // el cabezal: una línea de luz finísima
    c.globalCompositeOperation = 'source-over'; c.globalAlpha = 1;
    const gr = c.createLinearGradient(x0 - 14, 0, x0 + 1, 0); gr.addColorStop(0, 'rgba(255,97,107,0)'); gr.addColorStop(1, 'rgba(255,97,107,0.07)');
    c.fillStyle = gr; c.fillRect(x0 - 14, y0 - G * 2, 15, INSTR.length * ST);
    if (!reducido) raf = requestAnimationFrame(pintar);
  };
  const pedir = () => { if (!raf && visible) raf = requestAnimationFrame(pintar); };
  new ResizeObserver(medir).observe(cv);
  new IntersectionObserver((e) => { visible = e[0].isIntersecting; if (visible) pedir(); else { cancelAnimationFrame(raf); raf = 0; } }).observe(sec);
  medir();
  // dónde caen en PANTALLA las notas encendidas: el lienzo va inclinado con CSS (transform 3D sobre su centro) dentro de un padre con perspectiva
  const pantalla = (): [number, number, number][] => {
    const pa = cv.parentElement; if (!pa || !luces.length) return [];
    const cs = getComputedStyle(pa), d = parseFloat(cs.perspective) || 900, [po, pv] = cs.perspectiveOrigin.split(' ').map(parseFloat);
    const m = new DOMMatrix(getComputedStyle(cv).transform), pr = pa.getBoundingClientRect(), cx = cv.offsetLeft, cy = cv.offsetTop;
    return luces.map(([x, y, f]) => {
      const q = m.transformPoint(new DOMPoint(x - W / 2, y - H / 2, 0)), X = cx + q.x, Y = cy + q.y, k = d / Math.max(1, d - q.z);
      return [pr.left + po + (X - po) * k, pr.top + pv + (Y - pv) * k, f] as [number, number, number];
    }).filter(([x, y]) => x > pr.left && x < pr.right && y > pr.top && y < pr.bottom);
  };
  return { pantalla };
}
