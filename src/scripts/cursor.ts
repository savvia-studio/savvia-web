// RONDA 103 · EL CURSOR. Andoni: «transformamos el cursor a un punto que deja un rastro muy ligero de ondas». Un punto de savia (Coral) que sigue al ratón
// con un pelo de retraso y, al moverse, va soltando aros finos que se abren y se apagan (los de las ondas del hero, en pequeño). Sobre lo que se pulsa, el
// punto crece un poco; al pulsar, suelta una onda más clara. Solo con ratón (en táctil no hay cursor) y sin movimiento reducido. Vuelve el cursor del
// sistema donde haría falta: con un diálogo abierto (va en la capa superior, por encima de todo), en los campos de texto y dentro de la web del monitor
// (un iframe: ahí el documento ya no recibe el ratón).
// RONDA 104 · «el cursor deja una ESTELA, no va dejando ondas: una estela musical muy sutil»: fuera los aros. Detrás del punto queda el camino reciente
// (0,75 s) dibujado como dos hilos finos que ondulan uno contra otro a lo largo del recorrido (las ondas de frecuencia de la batuta del hero, en pequeño);
// más anchos y claros junto al punto, se adelgazan y se apagan hacia atrás.
const fino = matchMedia('(hover: hover) and (pointer: fine)').matches;
const reducido = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (fino && !reducido && !/[?&]cursor=0/.test(location.search)) {
  const raiz = document.documentElement;
  const punto = document.createElement('div'); punto.className = 'cursor-punto'; punto.setAttribute('aria-hidden', 'true');
  const cv = document.createElement('canvas'); cv.className = 'cursor-rastro'; cv.setAttribute('aria-hidden', 'true');
  document.body.append(cv, punto);
  const c = cv.getContext('2d')!;
  let W = 0, H = 0, dpr = 1, x = -99, y = -99, px = -99, py = -99, raf = 0, dentro = false, sobre = false, col = '255,97,107';
  const medir = () => { dpr = Math.min(2, devicePixelRatio || 1); W = innerWidth; H = innerHeight; cv.width = W * dpr; cv.height = H * dpr; };
  medir(); addEventListener('resize', medir);
  const leerColor = () => { const m = getComputedStyle(punto).backgroundColor.match(/\d+/g); if (m) col = m.slice(0, 3).join(','); };
  const camino: { x: number; y: number; t: number }[] = [];
  const VIDA = 750;
  const frame = (ahora: number) => {
    raf = 0;
    px += (x - px) * 0.35; py += (y - py) * 0.35;
    punto.style.transform = `translate3d(${px}px,${py}px,0) translate(-50%,-50%) scale(${sobre ? 1.8 : 1})`;
    const t = performance.now();
    while (camino.length && t - camino[0].t > VIDA) camino.shift();
    c.setTransform(dpr, 0, 0, dpr, 0, 0); c.clearRect(0, 0, W, H);
    if (camino.length > 2) {
      // la estela termina en el punto (donde se ve), no en el ratón
      const pts = [...camino, { x: px, y: py, t }];
      let s = 0; const lon = [0]; for (let i = 1; i < pts.length; i++) { s += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y); lon.push(s); }
      c.lineCap = 'round';
      for (const [fq, fa, al] of [[0.09, 1, 0.22], [0.13, -0.8, 0.14]]) {
        for (let i = 1; i < pts.length; i++) {
          const a = pts[i - 1], b2 = pts[i], dx = b2.x - a.x, dy = b2.y - a.y, d = Math.hypot(dx, dy) || 1, nx = -dy / d, ny = dx / d;
          const v = 1 - (t - b2.t) / VIDA, amp = 3.2 * v * fa, ph = t / 140;
          const o0 = Math.sin(lon[i - 1] * fq - ph) * amp, o1 = Math.sin(lon[i] * fq - ph) * amp;
          c.strokeStyle = `rgba(${col},${Math.max(0, v) * al})`; c.lineWidth = 0.5 + v * 0.8;
          c.beginPath(); c.moveTo(a.x + nx * o0, a.y + ny * o0); c.lineTo(b2.x + nx * o1, b2.y + ny * o1); c.stroke();
        }
      }
    }
    if (camino.length || Math.abs(x - px) + Math.abs(y - py) > 0.3) raf = requestAnimationFrame(frame);
  };
  const pedir = () => { if (!raf) raf = requestAnimationFrame(frame); };
  const modal = () => !!document.querySelector('dialog[open]');
  addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    const sin = modal(); raiz.classList.toggle('cursor-propio', !sin);
    if (!dentro) { dentro = true; px = x = e.clientX; py = y = e.clientY; leerColor(); raiz.classList.add('cursor-dentro'); }
    x = e.clientX; y = e.clientY;
    const el = e.target as Element | null;
    sobre = !!el?.closest?.('a, button, [role="button"], summary, label, [data-cursor]');
    const u = camino[camino.length - 1]; if (!u || Math.hypot(x - u.x, y - u.y) > 3) camino.push({ x, y, t: performance.now() });
    pedir();
  }, { passive: true });
  addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse') return; punto.classList.add('pulsa'); pedir(); }, { passive: true });
  addEventListener('pointerup', () => punto.classList.remove('pulsa'), { passive: true });
  // al salir de la ventana (o entrar en un iframe) el punto se esconde
  document.addEventListener('mouseout', (e) => { if (!e.relatedTarget) { dentro = false; raiz.classList.remove('cursor-dentro'); } });
  addEventListener('blur', () => { dentro = false; raiz.classList.remove('cursor-dentro'); });
}
export {};
