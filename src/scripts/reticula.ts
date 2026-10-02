// RONDA 100 · LA RETÍCULA QUE LATE. Andoni: «el pulso se tiene que propagar por todos los puntos del hero, por todo el recuadro» · «en el footer, lo mismo: por todo
// el footer». Una retícula de puntos a 45° (la del marco del hero, ronda 16) dibujada UNA vez en una lámina; encima, cada onda de color del jazz recorre los
// puntos: los que pisa su anillo se tiñen de su color y crecen, y detrás queda un poso que se apaga. Solo se repinta mientras hay ondas vivas.
export function crearReticula(cv: HTMLCanvasElement, op: { paso?: number; alfa?: number; vel?: number; ancho?: number; vida?: number } = {}) {
  const c = cv.getContext('2d')!, base = document.createElement('canvas');
  const reducido = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const PASO = op.paso ?? 8, ALFA = op.alfa ?? 0.1, VEL = op.vel ?? 260, ANCHO = op.ancho ?? 38, VIDA = op.vida ?? 3;
  let W = 0, H = 0, dpr = 1, raf = 0, visto = false, tinta = '234,221,231';
  const ondas: { x: number; y: number; t0: number; f: number; c: number[] }[] = [];
  const medir = () => {
    const r = cv.getBoundingClientRect(); dpr = Math.min(2, devicePixelRatio || 1);
    W = r.width; H = r.height; if (W < 2 || H < 2) return;
    cv.width = base.width = Math.round(W * dpr); cv.height = base.height = Math.round(H * dpr);
    const m = getComputedStyle(cv).color.match(/\d+/g); if (m) tinta = m.slice(0, 3).join(',');
    const b = base.getContext('2d')!; b.setTransform(dpr, 0, 0, dpr, 0, 0); b.clearRect(0, 0, W, H); b.fillStyle = `rgba(${tinta},${ALFA})`;
    for (let y = PASO / 2, f = 0; y < H; y += PASO / 2, f++) for (let x = f % 2 ? PASO / 2 : 0; x < W; x += PASO) { b.beginPath(); b.arc(x, y, 1.1, 0, 6.2832); b.fill(); }
    pintar(performance.now());
  };
  const pintar = (ahora: number) => {
    c.setTransform(1, 0, 0, 1, 0, 0); c.clearRect(0, 0, cv.width, cv.height); c.drawImage(base, 0, 0);
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    for (let i = ondas.length - 1; i >= 0; i--) if ((ahora - ondas[i].t0) / 1000 > VIDA) ondas.splice(i, 1);
    for (const o of ondas) {
      const e = (ahora - o.t0) / 1000, R = e * VEL, vida = 1 - e / VIDA;
      c.fillStyle = `rgb(${Math.round(o.c[0] * 255)},${Math.round(o.c[1] * 255)},${Math.round(o.c[2] * 255)})`;
      const y0 = Math.max(0, o.y - R - ANCHO * 2), y1 = Math.min(H, o.y + R + ANCHO * 2);
      const x0 = Math.max(0, o.x - R - ANCHO * 2), x1 = Math.min(W, o.x + R + ANCHO * 2);
      for (let f = Math.max(0, Math.floor(y0 / (PASO / 2)) - 1); ; f++) {
        const y = (PASO / 2) * (f + 1); if (y > y1) break;
        const dy = y - o.y, off = f % 2 ? PASO / 2 : 0;
        for (let x = off + PASO * Math.max(0, Math.floor((x0 - off) / PASO)); x < x1; x += PASO) {
          const d = Math.hypot(x - o.x, dy);
          const q = Math.exp(-Math.pow((d - R) / ANCHO, 2)) * o.f * vida + (d < R ? Math.max(0, 1 - (R - d) / 160) * 0.28 * o.f * vida * vida : 0);
          if (q < 0.04) continue;
          c.globalAlpha = Math.min(0.6, q * 0.55); c.beginPath(); c.arc(x, y, 1.1 + q * 1.1, 0, 6.2832); c.fill();
        }
      }
    }
    c.globalAlpha = 1;
  };
  const frame = (ahora: number) => { raf = 0; if (!visto) return; pintar(ahora); if (ondas.length) raf = window.setTimeout(() => requestAnimationFrame(frame), 30) as unknown as number; };
  new ResizeObserver(() => medir()).observe(cv);
  new IntersectionObserver((e) => { visto = e[0].isIntersecting; if (visto && ondas.length && !raf) raf = requestAnimationFrame(frame); }).observe(cv);
  return {
    // x, y en pantalla; c = rgb 0–1
    onda(x: number, y: number, f = 1, col: number[] = [1, 0.38, 0.42]) {
      if (reducido || !visto) return;
      const r = cv.getBoundingClientRect(); ondas.push({ x: x - r.left, y: y - r.top, t0: performance.now(), f, c: col }); if (ondas.length > 6) ondas.shift();
      if (!raf) raf = requestAnimationFrame(frame);
    },
  };
}
