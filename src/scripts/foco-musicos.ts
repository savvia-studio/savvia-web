// RONDA 118 · «DIRIGE TÚ» sobre el cuarteto (versión clásica). Un lienzo encima de los músicos (y debajo del director): al señalar a uno, su figura se
// ENCIENDE (la propia lámina, sumada en luz con canto blando) y se le reconoce con las esquinas y el nombre en mono, muy discretos. Al irse, se apaga.
export type Musico = [number, number, number, number, string]; // x0 · y0 · x1 · y1 (fracciones de la lámina) · nombre
// ronda 118 (11.ª) · «al pasar por los músicos, que salga algo relacionado con la librería que te montamos, estilo colores.md»: cada músico lleva un archivo de
// la librería (su parte de la partitura de la web): nombre del archivo y unas líneas (con una muestra de color si la línea es un color)
export type Ficha = { archivo: string; lineas: [string, string?][] };

export function crearFocoMusicos(cv: HTMLCanvasElement, caja: HTMLElement, lamina: HTMLImageElement, musicos: Musico[], op: { clara: boolean; fichas?: Ficha[]; lienzoFichas?: HTMLCanvasElement }) {
  const cf = op.lienzoFichas?.getContext('2d') ?? null; // ronda 118 (11.ª): las fichas, en un lienzo encima de todo y más grande que la caja (si no, el director las tapa)
  const c = cv.getContext('2d')!;
  const luz = musicos.map(() => 0), dest = musicos.map(() => 0);
  let W = 0, H = 0, dpr = 1, raf = 0, sel = -1;
  const mono = getComputedStyle(document.documentElement).getPropertyValue('--font-mono').trim() || 'monospace';
  const tin = op.clara ? '36,28,25' : '234,221,231';
  const medir = () => { const r = caja.getBoundingClientRect(); dpr = Math.min(2, devicePixelRatio || 1); W = r.width; H = r.height; cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); if (op.lienzoFichas) { const f = op.lienzoFichas.getBoundingClientRect(); op.lienzoFichas.width = Math.round(f.width * dpr); op.lienzoFichas.height = Math.round(f.height * dpr); } pedir(); };
  const pintar = () => {
    raf = 0; let vivo = false;
    c.setTransform(dpr, 0, 0, dpr, 0, 0); c.clearRect(0, 0, W, H);
    let ox = 0, oy = 0, FW = W;
    if (cf && op.lienzoFichas) { const fr = op.lienzoFichas.getBoundingClientRect(), cr = caja.getBoundingClientRect(); ox = cr.left - fr.left; oy = cr.top - fr.top; FW = fr.width; cf.setTransform(dpr, 0, 0, dpr, 0, 0); cf.clearRect(0, 0, fr.width, fr.height); }
    if (!lamina.complete || !lamina.naturalWidth) return;
    const iw = lamina.naturalWidth, ih = lamina.naturalHeight;
    musicos.forEach((m, j) => {
      luz[j] += (dest[j] - luz[j]) * (dest[j] > luz[j] ? 0.12 : 0.06);
      if (Math.abs(dest[j] - luz[j]) > 0.004) vivo = true;
      const k = luz[j]; if (k < 0.01) return;
      const x0 = m[0] * W, y0 = m[1] * H, x1 = m[2] * W, y1 = m[3] * H;
      // la figura, sumada en luz (solo su caja, con el canto fundido)
      c.save(); c.beginPath(); c.rect(x0, y0, x1 - x0, y1 - y0); c.clip();
      c.globalCompositeOperation = op.clara ? 'multiply' : 'lighter'; c.globalAlpha = k * (op.clara ? 0.35 : 0.42);
      c.drawImage(lamina, m[0] * iw, m[1] * ih, (m[2] - m[0]) * iw, (m[3] - m[1]) * ih, x0, y0, x1 - x0, y1 - y0);
      c.restore();
      // el reconocimiento: cuatro esquinas que se cierran y el nombre
      const sh = (1 - k) * 8, L = Math.min(x1 - x0, y1 - y0) * 0.12, X0 = x0 - sh, Y0 = y0 - sh, X1 = x1 + sh, Y1 = y1 + sh;
      c.globalAlpha = 1; c.globalCompositeOperation = 'source-over'; c.lineWidth = 1; c.strokeStyle = `rgba(${tin},${(k * 0.7).toFixed(3)})`; c.beginPath();
      c.moveTo(X0, Y0 + L); c.lineTo(X0, Y0); c.lineTo(X0 + L, Y0); c.moveTo(X1 - L, Y0); c.lineTo(X1, Y0); c.lineTo(X1, Y0 + L);
      c.moveTo(X1, Y1 - L); c.lineTo(X1, Y1); c.lineTo(X1 - L, Y1); c.moveTo(X0 + L, Y1); c.lineTo(X0, Y1); c.lineTo(X0, Y1 - L); c.stroke();
      c.font = `10px ${mono}`; c.textBaseline = 'bottom'; c.fillStyle = `rgba(${tin},${(k * 0.85).toFixed(3)})`;
      // el nombre, en la esquina de arriba que da AFUERA (hacia el centro lo taparía el brazo del director; abajo se deshace con la figura)
      const fuera = (m[0] + m[2]) / 2 > 0.5; if (!op.fichas) { c.textAlign = fuera ? 'right' : 'left'; c.fillText(m[4], fuera ? X1 : X0, Y0 - 4); c.textAlign = 'left'; }
      // LA FICHA de la librería, encima del músico y hacia fuera: un archivo .md con sus líneas (las de color, con su muestra)
      const f = op.fichas?.[j];
      if (f) {
        const g: CanvasRenderingContext2D = cf ?? c;
        const lh = 15, pad = 10, fw = 176, fh = pad * 2 + 18 + f.lineas.length * lh;
        // hacia FUERA de la escena: a la izquierda de los de la izquierda y a la derecha de los de la derecha, a media altura del músico
        let fx = fuera ? ox + X1 + 16 : ox + X0 - fw - 16, fy = oy + y0 + (y1 - y0) * 0.18 + (1 - k) * 8;
        // si no cabe al lado (móvil), ENCIMA del músico
        if (fx < 4 || fx + fw > FW - 4) { fx = Math.max(4, Math.min(FW - fw - 4, fuera ? ox + X1 - fw : ox + X0)); fy = oy + y0 - fh - 22 + (1 - k) * 8; }
        g.globalAlpha = k;
        g.fillStyle = op.clara ? 'rgba(245,247,255,0.86)' : 'rgba(33,21,16,0.78)'; g.strokeStyle = `rgba(${tin},0.16)`; g.lineWidth = 1;
        g.beginPath(); g.roundRect(fx, fy, fw, fh, 8); g.fill(); g.stroke();
        g.textAlign = 'left'; g.textBaseline = 'top'; g.font = `10px ${mono}`;
        g.fillStyle = 'rgba(255,97,107,0.95)'; g.fillText('#', fx + pad, fy + pad); g.fillStyle = `rgba(${tin},0.92)`; g.fillText(f.archivo, fx + pad + 10, fy + pad);
        g.textAlign = 'right'; g.fillStyle = `rgba(${tin},0.45)`; g.fillText(m[4], fx + fw - pad, fy + pad); g.textAlign = 'left';
        g.fillStyle = `rgba(${tin},0.12)`; g.fillRect(fx + pad, fy + pad + 15, fw - pad * 2, 1);
        f.lineas.forEach(([t, col], i) => {
          const ly = fy + pad + 20 + i * lh; let tx = fx + pad;
          if (col) { g.fillStyle = col; g.beginPath(); g.roundRect(tx, ly + 1, 9, 9, 2); g.fill(); tx += 15; }
          g.fillStyle = `rgba(${tin},${col ? 0.85 : 0.7})`; g.fillText(t, tx, ly);
        });
        g.textBaseline = 'bottom';
      }
    });
    if (vivo) raf = requestAnimationFrame(pintar);
  };
  const pedir = () => { if (!raf) raf = requestAnimationFrame(pintar); };
  new ResizeObserver(medir).observe(caja); medir();
  lamina.addEventListener('load', pedir);
  return {
    // fx, fy: fracciones de la caja (null = soltar). Devuelve el nombre del músico señalado
    foco(fx: number | null, fy = 0): string | null {
      let j = -1;
      if (fx !== null) { let md = 0.05; musicos.forEach((m, i) => { const d = Math.hypot(Math.max(m[0] - fx, 0, fx - m[2]), Math.max(m[1] - fy, 0, fy - m[3]) * (H / Math.max(1, W))); if (d < md) { md = d; j = i; } }); }
      if (j !== sel) { sel = j; dest.fill(0); if (j >= 0) dest[j] = 1; pedir(); }
      return j >= 0 ? musicos[j][4] : null;
    },
  };
}
