// BROTA (28/10, enlaces del menú y del pie). Andoni: «que brote algo de la palabra, más integrado y realista, como tenemos en el 404».
// Al pasar el ratón (o con el foco de teclado), de los cantos de arriba de la tinta de la palabra brota lo de la estación, con las piezas del 404
// (tiempo-encima.ts): PRIMAVERA, florecillas con su tallo (margaritas, azules, alguna rosa); VERANO, hierba; OTOÑO, unas hojas que caen y se
// posan encima; INVIERNO, un poco de nieve que cuaja en los hombros de las letras. Crece en ola de izquierda a derecha y al salir se desvanece.
// La palabra se lee del DOM (el rectángulo de cada letra y su línea base) y se redibuja en una máscara de celdas: lo que brota asienta justo sobre
// la tinta real. Un lienzo pequeño dentro del propio enlace, que solo existe mientras el puntero está encima. Movimiento reducido: el estado final.
type Est = 'invierno' | 'otono' | 'primavera' | 'verano';
type Pieza = { x: number; y: number; t: number; a: number; b: number; c: number; d: number; col: string; tipo: string };

const C = 1.5; // celda de la máscara (px CSS)
const FLORES = ['margarita', 'margarita', 'margarita', 'azul', 'azul', 'rosa'];
const VERDES = ['#4f7a30', '#5f8c36', '#6f9c3c', '#86ad48', '#9dbb52', '#b5c75e', '#5a7d2c', '#3f6a2a'];
const HOJAS = ['#c65c2d', '#e0a03a', '#7a2e16', '#d98b3a', '#9c3b1c', '#efc070'];

// la estación de la web; una muestra (la del Storybook) puede llevar la suya propia en un contenedor con data-br-est
const leerEst = (el: HTMLElement): Est => {
  const e = el.closest<HTMLElement>('[data-br-est]')?.dataset.brEst || document.documentElement.dataset.estacion || '';
  return (['invierno', 'otono', 'primavera', 'verano'].includes(e) ? e : 'otono') as Est;
};

function brote(el: HTMLElement) {
  const reducido = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // la palabra: sus nodos de texto, la letra y la familia del texto de verdad (en el menú, el <span> de dentro)
  const nodos: Text[] = [];
  const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  for (let n = w.nextNode(); n; n = w.nextNode()) if ((n.textContent || '').trim()) nodos.push(n as Text);
  if (!nodos.length) return () => {};
  const portador = nodos[0].parentElement!, cs = getComputedStyle(portador);
  const fs = parseFloat(cs.fontSize), fam = cs.fontFamily, peso = cs.fontWeight;
  const caja = el.getBoundingClientRect();
  const est = leerEst(el), cae = est === 'otono' || est === 'invierno';
  // en otoño y en invierno lo que llega CAE: el lienzo sube más por encima de la palabra para que haya recorrido
  // 29/10 · Andoni: «en otoño y en invierno, que las hojas y la nieve caigan desde más abajo»: nacen a 1,1 cuerpos por encima (antes 1,9)
  const pad = Math.ceil(fs * 0.5), arriba = Math.ceil(fs * (cae ? 1.1 : 0.9));
  const W = Math.ceil(caja.width + pad * 2), H = Math.ceil(caja.height + arriba + pad);
  // la línea base, con una sonda en línea sin alto
  const sonda = document.createElement('span');
  sonda.style.cssText = 'display:inline-block;width:0;height:0;vertical-align:baseline';
  portador.appendChild(sonda);
  const base = sonda.getBoundingClientRect().bottom - caja.top + arriba;
  sonda.remove();
  const glifos: [string, number][] = [], rg = document.createRange();
  for (const n of nodos) {
    const txt = n.textContent || '';
    for (let k = 0; k < txt.length; k++) {
      if (/\s/.test(txt[k])) continue;
      rg.setStart(n, k); rg.setEnd(n, k + 1);
      glifos.push([txt[k], rg.getBoundingClientRect().left - caja.left + pad]);
    }
  }
  // máscara a celdas y los cantos que miran arriba (con aire encima)
  const GW = Math.ceil(W / C), GH = Math.ceil(H / C);
  const g = document.createElement('canvas'); g.width = GW; g.height = GH;
  const gx = g.getContext('2d', { willReadFrequently: true })!;
  gx.scale(1 / C, 1 / C); gx.font = `${peso} ${fs}px ${fam}`; gx.fillStyle = '#fff';
  for (const [ch, x] of glifos) gx.fillText(ch, x, base);
  const px = gx.getImageData(0, 0, GW, GH).data, mask = new Uint8Array(GW * GH);
  for (let i = 0; i < GW * GH; i++) if (px[i * 4 + 3] > 120) mask[i] = 1;
  const borde: [number, number][] = [];
  for (let cy = 3; cy < GH; cy++)
    for (let cx = 1; cx < GW - 1; cx++) {
      const i = cy * GW + cx;
      if (mask[i] && !mask[i - GW] && !mask[i - 2 * GW] && !mask[i - 3 * GW]) borde.push([cx * C + C / 2, cy * C + 0.5]);
    }
  if (!borde.length) return () => {};
  const x0 = Math.min(...borde.map((b) => b[0])), x1 = Math.max(...borde.map((b) => b[0]));
  const ola = (x: number) => ((x - x0) / Math.max(1, x1 - x0)) * 0.38;
  const elegir = () => borde[Math.floor(Math.random() * borde.length)];

  // lo que brota, según la estación (los tamaños, en proporción a la letra)
  const piezas: Pieza[] = [], copos: Pieza[] = [];
  const ancho = x1 - x0;
  if (est === 'primavera') {
    const n = Math.max(4, Math.round(ancho / (fs * 0.32)));
    for (let i = 0; i < n; i++) {
      const [x, y] = elegir();
      piezas.push({ x, y, t: ola(x) + Math.random() * 0.18, a: fs * (0.05 + Math.random() * 0.17), b: (Math.random() - 0.5) * 0.6, c: fs * (0.045 + Math.random() * 0.04), d: Math.random(), col: '', tipo: FLORES[Math.floor(Math.random() * FLORES.length)] });
    }
  } else if (est === 'verano') {
    const n = Math.max(12, Math.round(ancho / (fs * 0.055)));
    for (let i = 0; i < n; i++) {
      const [x, y] = elegir();
      piezas.push({ x: x + (Math.random() - 0.5) * C, y, t: ola(x) + Math.random() * 0.2, a: fs * (0.04 + Math.random() ** 1.6 * 0.24), b: (Math.random() - 0.5) * 0.5, c: (Math.random() - 0.5) * 0.6, d: Math.max(0.8, fs * (0.018 + Math.random() * 0.022)), col: VERDES[Math.floor(Math.random() * VERDES.length)], tipo: Math.random() < 0.06 ? 'espiga' : '' });
    }
  } else if (est === 'otono') {
    // 28/10: «que en otoño caigan más hojas» (antes una cada 0,55 de cuerpo) y «que parezca que van cayendo hacia la palabra»: cada hoja nace arriba
    // del lienzo, baja a velocidad casi constante (la de una hoja que ya cae) meciéndose y girando, y se posa en su canto sin frenar
    const n = Math.max(7, Math.round(ancho / (fs * 0.22)));
    for (let i = 0; i < n; i++) {
      const [x, y] = elegir();
      // d: la duración de la caída (s), según lo que tiene que bajar
      const sube = y - fs * (0.05 + Math.random() * 0.35);
      piezas.push({ x, y, t: Math.random() * 0.9, a: fs * (0.06 + Math.random() * 0.05), b: (Math.random() - 0.5) * 1.6, c: Math.random() * 6.28, d: sube / (fs * (1.5 + Math.random() * 0.6)), col: HOJAS[Math.floor(Math.random() * HOJAS.length)], tipo: '' });
    }
  } else {
    // los COPOS caen desde arriba (28/10: «que parezca que van cayendo hacia la palabra») y, donde llegan, la nieve CUAJA en una capa continua
    // sobre el canto (las caperuzas del 404), más gruesa a ratos: cada punto del canto empieza a cuajar cuando llega el copo más cercano
    const nC = Math.max(10, Math.round(ancho / (fs * 0.06)));
    for (let i = 0; i < nC; i++) {
      const [x, y] = elegir();
      const dur = (y - fs * 0.05) / (fs * (1.5 + Math.random() * 0.6));
      copos.push({ x, y, t: Math.random() * 0.55, a: fs * (0.018 + Math.random() * 0.018), b: Math.random() * 6.28, c: 0, d: dur, col: '', tipo: '' });
    }
    const f1 = Math.random() * 6.28, f2 = Math.random() * 6.28;
    for (const [x, y] of borde) {
      const grosor = 0.5 + 0.5 * Math.sin(x / (fs * 0.21) + f1) * Math.sin(x / (fs * 0.53) + f2);
      let llega = 9, dm = 1e9;
      for (const q of copos) { const d = Math.abs(q.x - x); if (d < dm) { dm = d; llega = q.t + q.d; } }
      piezas.push({ x, y, t: llega + Math.min(0.5, dm / (fs * 0.6)) * 0.4, a: fs * (0.014 + grosor * 0.026), b: 0, c: 0, d: 0, col: '', tipo: '' });
    }
  }
  piezas.sort((p, q) => p.y - q.y);

  // el lienzo, dentro del enlace
  const cv = document.createElement('canvas'), dpr = Math.min(2, devicePixelRatio || 1);
  cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
  cv.setAttribute('aria-hidden', 'true');
  cv.style.cssText = `position:absolute;left:${-pad}px;top:${-arriba}px;width:${W}px;height:${H}px;pointer-events:none;z-index:1`;
  el.appendChild(cv);
  const k = cv.getContext('2d')!;
  // invierno: la capa donde cuaja la nieve (se pinta entera con una sola sombra: así es una caperuza continua y no un collar de bolas)
  const nieve = document.createElement('canvas'); nieve.width = cv.width; nieve.height = cv.height;
  const nx = nieve.getContext('2d')!;
  // sobre lo claro, lo blanco (margaritas, nieve) se perdería: una sombra fría lo despega, como la nieve del 404 en invierno
  const sombra = est === 'invierno' ? 'rgba(70,86,116,.5)' : 'rgba(30,20,12,.35)';

  const florecilla = (x: number, y: number, r: number, tipo: string, abre: number) => {
    const col = tipo === 'azul' ? '118,146,218' : tipo === 'rosa' ? '246,198,214' : '252,251,246';
    const n = tipo === 'margarita' ? 11 : 5, largo = (tipo === 'margarita' ? r * 1.25 : r * 0.95) * abre, an = (tipo === 'margarita' ? r * 0.3 : r * 0.55) * Math.max(0.4, abre);
    k.save(); k.translate(x, y); k.scale(1, 0.7); k.fillStyle = `rgb(${col})`;
    for (let i = 0; i < n; i++) { const gg = (i / n) * 6.283 + x; k.beginPath(); k.ellipse(Math.cos(gg) * largo * 0.6, Math.sin(gg) * largo * 0.6, Math.max(0.3, largo * 0.55), an, gg, 0, 6.283); k.fill(); }
    k.shadowColor = 'transparent';
    k.fillStyle = tipo === 'margarita' ? 'rgb(236,184,58)' : 'rgb(248,236,190)';
    k.beginPath(); k.arc(0, 0, (tipo === 'margarita' ? r * 0.38 : r * 0.26) * (0.5 + 0.5 * abre), 0, 6.283); k.fill();
    k.restore();
  };
  const hoja = (x: number, y: number, s: number, a: number, col: string, plana = 1) => {
    k.save(); k.translate(x, y); k.rotate(a); k.scale(1, plana); k.fillStyle = col;
    k.beginPath(); k.moveTo(0, -s); k.quadraticCurveTo(s * 0.8, 0, 0, s); k.quadraticCurveTo(-s * 0.8, 0, 0, -s); k.fill();
    k.shadowColor = 'transparent';
    k.strokeStyle = 'rgba(40,20,10,.35)'; k.lineWidth = Math.max(0.5, s * 0.08); k.beginPath(); k.moveTo(0, -s * 0.8); k.lineTo(0, s * 0.95); k.stroke();
    k.restore();
  };
  const ease = (g: number) => 1 - (1 - g) ** 3;

  let t = 0, alfa = 1, sale = false, raf = 0, tAnt = 0, fin = false;
  const dibujar = () => {
    k.setTransform(1, 0, 0, 1, 0, 0); k.clearRect(0, 0, cv.width, cv.height); k.setTransform(dpr, 0, 0, dpr, 0, 0);
    k.globalAlpha = alfa;
    if (est === 'invierno') { nx.setTransform(1, 0, 0, 1, 0, 0); nx.clearRect(0, 0, nieve.width, nieve.height); nx.setTransform(dpr, 0, 0, dpr, 0, 0); nx.fillStyle = '#fff'; }
    let quedan = false;
    for (const p of piezas) {
      if (est === 'primavera') {
        const gr = Math.min(1, Math.max(0, (t - p.t) / 0.75)); if (gr <= 0) { quedan = true; continue; } if (gr < 1) quedan = true;
        const e = ease(gr), crece = Math.min(1, e * 1.5), abre = Math.max(0, (e - 0.45) / 0.55);
        const L = p.a * crece, tx = p.x + Math.sin(p.b) * L, ty = p.y - Math.cos(p.b) * L;
        k.strokeStyle = 'rgba(132,166,96,.95)'; k.lineWidth = Math.max(0.7, fs * 0.022); k.lineCap = 'round';
        k.beginPath(); k.moveTo(p.x, p.y); k.quadraticCurveTo(p.x, p.y - L * 0.5, tx, ty); k.stroke();
        if (p.d > 0.5 && L > fs * 0.08) {
          k.fillStyle = 'rgba(122,156,88,.9)'; const s = p.d > 0.75 ? 1 : -1;
          k.beginPath(); k.ellipse(p.x + s * fs * 0.035 * crece, p.y - L * 0.35, fs * 0.04 * crece, fs * 0.016 * crece, s * -0.6, 0, 6.283); k.fill();
        }
        k.save(); k.shadowColor = sombra; k.shadowBlur = 2; k.shadowOffsetY = 0.5;
        if (abre > 0) florecilla(tx, ty, p.c, p.tipo, abre);
        else { k.fillStyle = 'rgba(160,190,120,.9)'; k.beginPath(); k.arc(tx, ty, fs * 0.012 + crece * fs * 0.012, 0, 6.283); k.fill(); }
        k.restore();
      } else if (est === 'verano') {
        const gr = Math.min(1, Math.max(0, (t - p.t) / 0.7)); if (gr <= 0) { quedan = true; continue; }
        const e = ease(gr), L = p.a * e;
        // la brisa: una racha leve que recorre la hierba (sigue mientras el puntero está encima)
        const sw = reducido ? 0 : (Math.sin(t * 2.2 + p.x * 0.05) * 0.08) * Math.min(1, L / (fs * 0.2));
        const lean = p.b + sw, dxT = Math.sin(lean) * L + p.c * L * 0.35, tx = p.x + dxT, ty = p.y - Math.cos(lean) * L;
        const cxp = p.x + dxT * 0.25 + p.c * L * 0.25, cyp = p.y - L * 0.55, wd = p.d * (0.5 + 0.5 * e);
        k.fillStyle = p.col;
        k.beginPath(); k.moveTo(p.x - wd / 2, p.y); k.quadraticCurveTo(cxp - wd * 0.3, cyp, tx, ty); k.quadraticCurveTo(cxp + wd * 0.3, cyp, p.x + wd / 2, p.y); k.closePath(); k.fill();
        if (p.tipo === 'espiga' && e > 0.85) { k.fillStyle = '#d6c27a'; k.beginPath(); k.ellipse(tx, ty + fs * 0.03, fs * 0.018 + wd * 0.3, fs * 0.05, lean, 0, 6.283); k.fill(); }
        quedan = true; // la brisa no para mientras se ve
      } else if (est === 'otono') {
        // cae a velocidad casi constante (acelera solo al principio, como una hoja que se suelta), meciéndose de lado y girando; el vaivén se
        // apaga en el último tramo para que toque el canto donde le toca. Al tocar, solo se asienta: se aplana (no frena en el aire)
        const gr = Math.min(1, Math.max(0, (t - p.t) / p.d)); if (gr <= 0) { quedan = true; continue; } if (gr < 1) quedan = true;
        const y0 = fs * 0.05, yR = p.y - p.a * 0.35, cae = gr < 0.15 ? (gr * gr) / 0.3 : gr - 0.075, ee = cae / 0.925;
        const yy = y0 + (yR - y0) * ee, vaiven = Math.min(1, (1 - gr) / 0.25);
        const xx = p.x + Math.sin(gr * 7 + p.c) * fs * 0.14 * vaiven;
        const asienta = Math.min(1, Math.max(0, (t - p.t - p.d) / 0.18));
        k.save(); k.globalAlpha = alfa * Math.min(1, gr / 0.12); k.shadowColor = sombra; k.shadowBlur = 2; k.shadowOffsetY = 1;
        hoja(xx, yy, p.a, p.b + Math.sin(gr * 6 + p.c) * 1.1 * vaiven, p.col, 1 - 0.25 * asienta - 0.15 * (1 - vaiven) * Math.abs(Math.sin(gr * 6 + p.c)));
        k.restore();
        if (gr >= 1 && asienta < 1) quedan = true;
      } else {
        // la caperuza: cada punto del canto engorda desde cero en su turno de la ola; todo va a una capa y se pinta de una vez con su sombra fría
        const gr = Math.min(1, Math.max(0, (t - p.t) / 0.55)); if (gr <= 0) { quedan = true; continue; } if (gr < 1) quedan = true;
        const r = p.a * ease(gr);
        nx.beginPath(); nx.ellipse(p.x, p.y - r * 0.55, r * 1.25, r, 0, 0, 6.283); nx.fill();
      }
    }
    if (est === 'invierno') {
      // los copos en el aire: bajan a velocidad constante con un vaivén leve y se funden en la capa al llegar
      for (const q of copos) {
        const gr = (t - q.t) / q.d; if (gr <= 0) { quedan = true; continue; } if (gr >= 1) continue; quedan = true;
        const yy = fs * 0.05 + (q.y - q.a - fs * 0.05) * gr, xx = q.x + Math.sin(gr * 5 + q.b) * fs * 0.05 * (1 - gr);
        nx.globalAlpha = Math.min(1, gr / 0.15); nx.beginPath(); nx.arc(xx, yy, q.a, 0, 6.283); nx.fill();
      }
      nx.globalAlpha = 1;
      k.save(); k.setTransform(1, 0, 0, 1, 0, 0); k.globalAlpha = alfa;
      k.shadowColor = sombra; k.shadowBlur = 2.5 * dpr; k.shadowOffsetY = 1 * dpr;
      k.drawImage(nieve, 0, 0); k.restore();
    }
    return quedan;
  };
  const bucle = (ahora: number) => {
    raf = 0;
    const dt = Math.min(0.05, tAnt ? (ahora - tAnt) / 1000 : 0.016); tAnt = ahora;
    if (sale) alfa = Math.max(0, alfa - dt / 0.28); else t += dt;
    const quedan = dibujar();
    if (sale && alfa <= 0) { cv.remove(); fin = true; return; }
    if (quedan || sale) raf = requestAnimationFrame(bucle);
  };
  if (reducido) { t = 99; dibujar(); } else raf = requestAnimationFrame(bucle);
  // al salir: se desvanece (sin movimiento, se quita sin más)
  return () => {
    if (fin) return;
    if (reducido) { cv.remove(); fin = true; return; }
    sale = true; if (!raf) { tAnt = 0; raf = requestAnimationFrame(bucle); }
  };
}

export function brotar(raiz: ParentNode = document) {
  for (const el of raiz.querySelectorAll<HTMLElement>('.brota')) {
    let quitar: (() => void) | null = null;
    const entrar = () => { quitar?.(); quitar = brote(el); };
    const salir = () => { quitar?.(); quitar = null; };
    el.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') entrar(); });
    el.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') salir(); });
    el.addEventListener('focus', () => { if (el.matches(':focus-visible')) entrar(); });
    el.addEventListener('blur', salir);
  }
}
