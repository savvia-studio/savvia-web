// RONDA 117 · EL FONDO QUE DESVELAN LOS PULSOS (hero y pie). Una lámina encajada en su caja (cover) y TRAMADA (Bayer 4×4, celdas de 3 px, 4 niveles):
// en GRIS siempre a la vista (tenue) y, donde pasa un pulso —un anillo que nace en el centro de abajo, sube en 6,5 s y deja el color unos segundos—, en COLOR
// saturado. EL TOQUE DE IA: cada pulso «lee» tres de las figuras marcadas (`detecta`, fracciones de la lámina) como una visión artificial: esquinas de
// detección que se cierran y la etiqueta con su confianza, en mono, que se apagan en 3 s.
export type Deteccion = [number, number, number, number, string, string];
export type Fondo = { pulso: (f?: number, ox?: number, oy?: number) => void; medir: () => void; foco: (fx: number | null, fy?: number) => string | null };

export function crearFondoRevela(cv: HTMLCanvasElement, caja: HTMLElement, src: string, op: { clara: boolean; noche: number[]; detecta?: Deteccion[]; recorteY?: number; cuantas?: number; grisAlfa?: number }): Fondo {
  const cf = cv.getContext('2d')!, masc = document.createElement('canvas'), cm = masc.getContext('2d')!, tram = document.createElement('canvas'), gris = document.createElement('canvas'), capa = document.createElement('canvas'), cc = capa.getContext('2d')!;
  const foto = new Image(); foto.decoding = 'async'; foto.src = src;
  const DET = op.detecta ?? [], RY = op.recorteY ?? 0.5, CUANTAS = op.cuantas ?? 3, clara = op.clara;
  const anillos: { t0: number; f: number; sel: number[]; ox: number; oy: number }[] = [];
  let raf = 0, oW = 0, oH = 0, visible = true, ultimo = 0;
  const CEL = 3, BAY = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
  const vistos = DET.map(() => -1e9);
  let mapa = { ox: 0, oy: 0, sx: 1, sy: 1 };
  // RONDA 118 · «DIRIGE TÚ»: un FOCO que sigue a la batuta (el cursor): alrededor, la orquesta en color; el músico señalado queda reconocido mientras se le señala
  let fx = -1, fy = -1, fk = 0, fqDest = 0, fsel = -1;
  const mono = getComputedStyle(document.documentElement).getPropertyValue('--font-mono').trim() || 'monospace';
  const tramar = () => {
    if (!foto.complete || !foto.naturalWidth || !oW) return;
    const r = caja.getBoundingClientRect(), w = Math.max(1, Math.round(r.width / CEL)), h = Math.max(1, Math.round(r.height / CEL));
    const t = document.createElement('canvas'); t.width = w; t.height = h; const tc = t.getContext('2d', { willReadFrequently: true })!;
    const k = Math.max(w / foto.naturalWidth, h / foto.naturalHeight), dw = foto.naturalWidth * k, dh = foto.naturalHeight * k;
    tc.drawImage(foto, (w - dw) / 2, (h - dh) * RY, dw, dh);
    mapa = { ox: ((w - dw) / 2) * (oW / w), oy: (h - dh) * RY * (oH / h), sx: dw * (oW / w), sy: dh * (oH / h) };
    const im = tc.getImageData(0, 0, w, h), d = im.data, ig = tc.createImageData(w, h), g = ig.data, L = 4;
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4, b = (BAY[(y % 4) * 4 + (x % 4)] + 0.5) / 16, Y = (0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2]) / 255;
      const gv = Math.min(255, (Math.floor((Y * 0.82 + 0.06) * L + b) / L) * 255); g[i] = g[i + 1] = g[i + 2] = gv; g[i + 3] = 255;
      for (let c = 0; c < 3; c++) { const v = Math.min(1, Math.max(0, (Y + (d[i + c] / 255 - Y) * 1.7) * 1.12)); d[i + c] = Math.min(255, (Math.floor(v * L + b) / L) * 255); }
    }
    const tg = document.createElement('canvas'); tg.width = w; tg.height = h; tg.getContext('2d')!.putImageData(ig, 0, 0);
    tc.putImageData(im, 0, 0);
    tram.width = gris.width = capa.width = oW; tram.height = gris.height = capa.height = oH;
    const tt = tram.getContext('2d')!, gg = gris.getContext('2d')!; tt.imageSmoothingEnabled = gg.imageSmoothingEnabled = false; tt.drawImage(t, 0, 0, oW, oH); gg.drawImage(tg, 0, 0, oW, oH);
    pintar(performance.now());
  };
  const medir = () => { const c = caja.getBoundingClientRect(), dd = Math.min(1.5, devicePixelRatio || 1); oW = Math.round(c.width * dd); oH = Math.round(c.height * dd); cv.width = masc.width = oW; cv.height = masc.height = oH; tramar(); };
  foto.addEventListener('load', tramar);
  const pintar = (ahora: number) => {
    raf = 0; if (!oW || !tram.width || !visible) return;
    cm.globalCompositeOperation = 'destination-out'; cm.fillStyle = 'rgba(0,0,0,0.02)'; cm.fillRect(0, 0, oW, oH); cm.globalCompositeOperation = 'source-over';
    for (let i = anillos.length - 1; i >= 0; i--) {
      const cx = anillos[i].ox * oW, cy = anillos[i].oy * oH, R = Math.hypot(Math.max(cx, oW - cx), Math.max(cy, oH - cy)) * 1.05; // ronda 117: el origen puede ser otro (el cursor)
      const e = (ahora - anillos[i].t0) / 6500; if (e > 1) { anillos.splice(i, 1); continue; }
      const r = R * (1 - Math.pow(1 - e, 1.6)), a = anillos[i].f * (1 - e) * 0.3, ancho = oH * 0.16;
      DET.forEach((d, j) => { const bx = mapa.ox + ((d[0] + d[2]) / 2) * mapa.sx, by = mapa.oy + ((d[1] + d[3]) / 2) * mapa.sy; if (anillos[i].sel.includes(j) && vistos[j] < anillos[i].t0 && r >= Math.hypot(bx - cx, by - cy)) vistos[j] = ahora; });
      const gr = cm.createRadialGradient(cx, cy, Math.max(0, r - ancho), cx, cy, r + ancho);
      gr.addColorStop(0, 'rgba(0,0,0,0)'); gr.addColorStop(0.5, `rgba(0,0,0,${a.toFixed(3)})`); gr.addColorStop(1, 'rgba(0,0,0,0)');
      cm.fillStyle = gr; cm.beginPath(); cm.arc(cx, cy, r + ancho, 0, Math.PI * 2); cm.fill();
    }
    fk += (fqDest - fk) * 0.08;
    if (fk > 0.01 && fx >= 0) {
      const R = oH * 0.26, gf = cm.createRadialGradient(fx, fy, 0, fx, fy, R);
      gf.addColorStop(0, `rgba(0,0,0,${(fk * 0.16).toFixed(3)})`); gf.addColorStop(0.55, `rgba(0,0,0,${(fk * 0.08).toFixed(3)})`); gf.addColorStop(1, 'rgba(0,0,0,0)');
      cm.fillStyle = gf; cm.beginPath(); cm.arc(fx, fy, R, 0, Math.PI * 2); cm.fill();
      if (fsel >= 0 && fqDest > 0) vistos[fsel] = Math.max(vistos[fsel], ahora - 300);
    }
    cc.clearRect(0, 0, oW, oH); cc.globalCompositeOperation = 'source-over'; cc.drawImage(tram, 0, 0);
    cc.globalCompositeOperation = 'destination-in'; cc.drawImage(masc, 0, 0); cc.globalCompositeOperation = 'source-over';
    cf.clearRect(0, 0, oW, oH); cf.globalAlpha = op.grisAlfa ?? (clara ? 0.3 : 0.22); if (cf.globalAlpha > 0) cf.drawImage(gris, 0, 0);
    cf.globalAlpha = 1; cf.drawImage(capa, 0, 0); // (el pie pinta su gris con el motor del roble: grisAlfa 0)
    // (antes se medía la caja en cada fotograma; es la misma densidad que en medir())
    const dp = Math.min(1.5, devicePixelRatio || 1), tin = clara ? '36,28,25' : '234,221,231';
    cf.lineWidth = Math.max(1, dp); cf.font = `${(9.5 * dp).toFixed(1)}px ${mono}`; cf.textBaseline = 'bottom';
    DET.forEach((d, j) => {
      const e = (ahora - vistos[j]) / 3000; if (e < 0 || e > 1) return;
      const ent = Math.min(1, e / 0.1), al = (e < 0.1 ? ent : 1 - Math.pow((e - 0.1) / 0.9, 2)) * 0.85;
      const x0 = mapa.ox + d[0] * mapa.sx, y0 = mapa.oy + d[1] * mapa.sy, x1 = mapa.ox + d[2] * mapa.sx, y1 = mapa.oy + d[3] * mapa.sy;
      const sh = (1 - ent) * 6 * dp, L = Math.min(x1 - x0, y1 - y0) * 0.14, X0 = x0 - sh, Y0 = y0 - sh, X1 = x1 + sh, Y1 = y1 + sh;
      cf.strokeStyle = `rgba(${tin},${(al * 0.9).toFixed(3)})`; cf.beginPath();
      cf.moveTo(X0, Y0 + L); cf.lineTo(X0, Y0); cf.lineTo(X0 + L, Y0); cf.moveTo(X1 - L, Y0); cf.lineTo(X1, Y0); cf.lineTo(X1, Y0 + L);
      cf.moveTo(X1, Y1 - L); cf.lineTo(X1, Y1); cf.lineTo(X1 - L, Y1); cf.moveTo(X0 + L, Y1); cf.lineTo(X0, Y1); cf.lineTo(X0, Y1 - L); cf.stroke();
      const wn = cf.measureText(d[4] + ' ').width, ty = Y0 - 4 * dp;
      cf.fillStyle = `rgba(${tin},${al.toFixed(3)})`; cf.fillText(d[4], X0, ty);
      cf.fillStyle = `rgba(255,97,107,${al.toFixed(3)})`; cf.fillText(d[5], X0 + wn, ty);
    });
    if (anillos.length || fk > 0.01 || fqDest > 0 || ahora - ultimo < 9000) raf = requestAnimationFrame(pintar);
  };
  const pulso = (f = 1, ox = 0.5, oy = 1) => {
    const sel: number[] = []; while (sel.length < Math.min(CUANTAS, DET.length)) { const j = Math.floor(Math.random() * DET.length); if (!sel.includes(j)) sel.push(j); }
    anillos.push({ t0: performance.now(), f, sel, ox, oy }); ultimo = performance.now(); if (!raf) raf = requestAnimationFrame(pintar);
  };
  new IntersectionObserver(([x]) => { visible = x.isIntersecting; if (visible && !raf) raf = requestAnimationFrame(pintar); }).observe(caja);
  new ResizeObserver(() => medir()).observe(caja); medir();
  const foco = (x: number | null, y = 0) => {
    if (x === null) { fqDest = 0; fsel = -1; if (!raf) raf = requestAnimationFrame(pintar); return null; }
    fx = x * oW; fy = y * oH; fqDest = 1; ultimo = performance.now();
    // el músico señalado: la caja que contiene la batuta o, si no, la más cercana a menos de un 7 % del ancho
    let mejor = -1, md = oW * 0.07;
    DET.forEach((d, j) => {
      const x0 = mapa.ox + d[0] * mapa.sx, y0 = mapa.oy + d[1] * mapa.sy, x1 = mapa.ox + d[2] * mapa.sx, y1 = mapa.oy + d[3] * mapa.sy;
      const dx = Math.max(x0 - fx, 0, fx - x1), dy = Math.max(y0 - fy, 0, fy - y1), dd = Math.hypot(dx, dy);
      if (dd < md || (dd === 0 && md === 0)) { md = dd; mejor = j; }
    });
    if (mejor !== fsel && mejor >= 0) vistos[mejor] = performance.now();
    fsel = mejor; if (!raf) raf = requestAnimationFrame(pintar);
    return mejor >= 0 ? DET[mejor][4] : null;
  };
  return { pulso, medir, foco };
}
