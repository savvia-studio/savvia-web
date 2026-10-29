// DIBUJARSE (ronda 40). Andoni: «el formulario de contacto que salga dibujándose como lo hace el paisaje del footer, lo mismo cuando se cierra. Si
// podemos conseguir lo mismo para el menú superior cuando se abre». El paisaje (estela.ts) entra en dos tiempos: primero el DIBUJO (líneas claras) y
// detrás la PINTURA con canto de papel rasgado, en círculo desde un origen. Aquí, lo mismo para una pieza del DOM:
//   1 · líneas: el contorno de la pieza y el de sus partes (campos, botones, enlaces) se trazan (stroke-dashoffset), escalonadas;
//   2 · pintura: la pieza se descubre con una máscara de papel rasgado en círculo (public/media/rasgo-circulo.webp) que crece desde el origen;
//   3 · las líneas se van. Al cerrar, al revés: la pintura se recoge hacia el origen y las líneas se destrazan.
// Las líneas van en una capa FIJA (se recoloca cada frame) dentro del mismo padre que la pieza: comparte su contexto de apilado.
const MASCARA = "url('/media/rasgo-circulo.webp')";
import { mascaraPedida } from './revelar';
const RADIO = 0.44; // el radio del círculo dentro de la imagen (fracción del lado)
const NS = 'http://www.w3.org/2000/svg';

type Op = { abrir: boolean; origen: [number, number]; color: string; piezas?: string; alTerminar?: () => void; arbol?: boolean; estacion?: boolean; sinMarco?: boolean };

// RONDA 45 · «el menú superior, cuando se abre, que se abra como los cambios de color del árbol»: el cambio de estación del árbol es un frente de PAPEL
// RASGADO que avanza desde un origen con el filo teñido de SAVIA (Naranja) y se asienta. Aquí: la pieza se pinta con la máscara rasgada creciendo desde
// el origen y, justo delante del frente, un anillo Naranja con el mismo canto (dos máscaras restadas) que se apaga al llegar. Sin líneas previas.
function pintarComoEstacion(el: HTMLElement, op: Op) {
  const r0 = el.getBoundingClientRect(), cs = getComputedStyle(el);
  const ox = op.origen[0] - r0.left, oy = op.origen[1] - r0.top;
  const R = Math.max(Math.hypot(ox, oy), Math.hypot(r0.width - ox, oy), Math.hypot(ox, r0.height - oy), Math.hypot(r0.width - ox, r0.height - oy)) * 1.08;
  // 30/10 · Andoni, en el iPhone: «el menú no se anima, sale de golpe y tarda en salir». La máscara rasgada crece hasta más del doble de la pantalla y en un
  // iPhone (DPR 3) son decenas de millones de píxeles que rasterizar en cada fotograma: Safari no pinta nada hasta que se quita, al final. En pantallas
  // táctiles, un círculo que crece desde el botón (clip-path con transición: barato) en lugar de la máscara
  if (matchMedia('(pointer: coarse)').matches) {
    const T = op.abrir ? 820 : 460, circ = (r: number) => `circle(${r.toFixed(1)}px at ${ox.toFixed(1)}px ${oy.toFixed(1)}px)`;
    let vivo = true, t = 0;
    const fin = () => { if (!vivo) return; vivo = false; clearTimeout(t); el.style.removeProperty('clip-path'); el.style.removeProperty('transition'); vivos.delete(el); };
    vivos.set(el, fin);
    el.style.transition = 'none';
    el.style.clipPath = circ(op.abrir ? 0 : R);
    void el.offsetWidth;
    el.style.transition = `clip-path ${T}ms ${op.abrir ? 'cubic-bezier(0.33, 0.9, 0.36, 1)' : 'cubic-bezier(0.55, 0, 0.75, 0.2)'}`;
    el.style.clipPath = circ(op.abrir ? R : 0);
    t = window.setTimeout(() => { if (!vivo) return; fin(); op.alTerminar?.(); }, T + 40);
    return;
  }
  const filo = document.createElement('i');
  filo.setAttribute('aria-hidden', 'true');
  filo.style.cssText = `position:fixed;left:${r0.left}px;top:${r0.top}px;width:${r0.width}px;height:${r0.height}px;border-radius:${cs.borderRadius};background:var(--color-naranja);pointer-events:none;z-index:${cs.zIndex === 'auto' ? 1 : Number(cs.zIndex) + 1};-webkit-mask-composite:source-out;mask-composite:subtract`;
  el.parentElement!.append(filo);
  const capa = (s: number) => `${MASCARA} ${ox - s / 2}px ${oy - s / 2}px / ${Math.max(0.01, s)}px ${Math.max(0.01, s)}px no-repeat`;
  const poner = (e: HTMLElement, v: string) => { e.style.setProperty('-webkit-mask', v); e.style.setProperty('mask', v); e.style.setProperty('-webkit-mask-composite', 'source-out'); e.style.setProperty('mask-composite', 'subtract'); };
  const pintar = (k: number) => {
    const s = ((R * k) / RADIO) * 1.04;
    el.style.setProperty('-webkit-mask', capa(s)); el.style.setProperty('mask', capa(s));
    poner(filo, `${capa(s + 26)}, ${capa(s)}`); // el anillo (~11 px de ancho): el círculo algo mayor MENOS el de la pintura
  };
  const T = op.abrir ? 1050 : 600; // ronda 264 · al cerrar, más corto y SIN arranque lento (antes 720 ms con k²: el recorte tarda en tocar la pieza y parece que espera)
  pintar(op.abrir ? 0 : 1);
  let t0 = 0, vivo = true, raf = 0;
  const fin = () => { vivo = false; cancelAnimationFrame(raf); filo.remove(); el.style.removeProperty('-webkit-mask'); el.style.removeProperty('mask'); vivos.delete(el); };
  vivos.set(el, fin);
  const paso = (ahora: number) => {
    if (!vivo) return;
    if (!t0) t0 = ahora;
    const k = Math.min(1, (ahora - t0) / T);
    const e = op.abrir ? 1 - Math.pow(1 - k, 2.4) : Math.pow(1 - k, 1.7); // abrir: sale rápido y se asienta; cerrar: se recoge hacia el origen
    pintar(e);
    filo.style.opacity = String(0.75 * (op.abrir ? Math.pow(1 - k, 0.7) : Math.pow(1 - k, 0.4) * Math.min(1, k * 6)));
    if (k < 1) raf = requestAnimationFrame(paso); else { fin(); op.alTerminar?.(); }
  };
  // (30/10 · Andoni: «el menú en Safari se abre raro las primeras veces, como si no hiciera la animación»): mientras la imagen de la máscara no ha llegado,
  // Safari esconde entera la capa enmascarada (la tarjeta aparecía de golpe al final). Se espera a que esté (precargada al cargar la página: Nav.astro)
  mascaraPedida().then(() => { if (vivo) raf = requestAnimationFrame(paso); });
}

// RONDA 41 · «el formulario de contáctanos, probar que se dibuje como el árbol del hero»: en modo `arbol` las líneas no son contornos trazados sino
// el DIBUJO de la propia pieza (una copia pasada por un filtro de bordes de luminancia, en el color de la línea), que aparece con un frente blando en
// círculo desde el origen; la pintura rasgada la sigue. Es el gesto del árbol (Shopify): grabado primero, pintura detrás.
function filtroBoceto(color: string) {
  const id = 'boceto-dom';
  if (!document.getElementById(id)) {
    const [r, g, b] = (color.match(/[\d.]+/g) ?? ['234', '221', '231']).map(Number);
    const d = document.createElement('div');
    d.innerHTML = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><filter id="${id}" x="-4%" y="-4%" width="108%" height="108%" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0.33 0.33 0.33 0 0 0.33 0.33 0.33 0 0 0.33 0.33 0.33 0 0 0 0 0 1 0"/><feConvolveMatrix order="3" kernelMatrix="-1 -1 -1 -1 8 -1 -1 -1 -1" preserveAlpha="true"/><feColorMatrix type="matrix" values="0 0 0 0 ${r / 255} 0 0 0 0 ${g / 255} 0 0 0 0 ${b / 255} 2.8 2.8 2.8 0 0" result="l"/><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7" result="n"/><feDisplacementMap in="l" in2="n" scale="3" xChannelSelector="R" yChannelSelector="G"/></filter></svg>`;
    document.body.append(d.firstElementChild!);
  }
  return `url(#${id})`;
}

function dibujarComoArbol(el: HTMLElement, op: Op) {
  const r0 = el.getBoundingClientRect();
  const ox = op.origen[0] - r0.left, oy = op.origen[1] - r0.top;
  const R = Math.max(Math.hypot(ox, oy), Math.hypot(r0.width - ox, oy), Math.hypot(ox, r0.height - oy), Math.hypot(r0.width - ox, r0.height - oy)) * 1.06;
  // la copia-dibujo: mismas clases y mismo sitio (hermana de la pieza), sin interacción ni ids, pasada por el filtro de bordes
  const copia = el.cloneNode(true) as HTMLElement;
  copia.removeAttribute('id'); copia.querySelectorAll('[id]').forEach((n) => n.removeAttribute('id'));
  copia.setAttribute('aria-hidden', 'true'); copia.inert = true; copia.hidden = false;
  copia.style.cssText += `;filter:${filtroBoceto(op.color)};pointer-events:none;-webkit-backdrop-filter:none;backdrop-filter:none${op.sinMarco ? '' : `;box-shadow:inset 0 0 0 1px ${op.color}`}`; // ronda 181: `sinMarco` para piezas sin caja (las demos de los dolores)
  el.after(copia);
  const poner = (e: HTMLElement, v: string) => { e.style.setProperty('-webkit-mask', v); e.style.setProperty('mask', v); };
  const lineas = (r: number) => poner(copia, `radial-gradient(circle at ${ox}px ${oy}px, #000 ${Math.max(0, r - 40)}px, transparent ${r + 0.1}px)`);
  const pintura = (r: number) => { const S = Math.max(0.01, (r / RADIO) * 1.04); poner(el, `${MASCARA} ${ox - S / 2}px ${oy - S / 2}px / ${S}px ${S}px no-repeat`); };
  const LIN = op.abrir ? 950 : 700, PIN = op.abrir ? 1300 : 750, RET = op.abrir ? 320 : 0;
  if (op.abrir) { lineas(0); pintura(0); } else lineas(R);
  let t0 = 0, vivo = true, raf = 0;
  const fin = () => { vivo = false; cancelAnimationFrame(raf); copia.remove(); el.style.removeProperty('-webkit-mask'); el.style.removeProperty('mask'); vivos.delete(el); };
  vivos.set(el, fin);
  const paso = (ahora: number) => {
    if (!vivo) return;
    if (!t0) t0 = ahora;
    const t = ahora - t0;
    if (op.abrir) {
      const k1 = Math.min(1, t / LIN); lineas(R * (1 - Math.pow(1 - k1, 2.2)));
      const k2 = Math.min(1, Math.max(0, (t - RET) / PIN)); pintura(R * (1 - Math.pow(1 - k2, 1.8)));
      copia.style.opacity = String(1 - Math.min(1, Math.max(0, (t - RET - PIN * 0.75) / 300)));
      if (t < RET + PIN + 300) raf = requestAnimationFrame(paso); else { fin(); op.alTerminar?.(); }
    } else {
      // al cerrar: la pintura se recoge hacia el origen y deja el dibujo, que se recoge después
      const k2 = Math.min(1, t / PIN); pintura(R * (1 - k2 * k2));
      const k1 = Math.min(1, Math.max(0, (t - PIN * 0.5) / LIN)); lineas(R * (1 - k1 * k1));
      if (t < PIN * 0.5 + LIN) raf = requestAnimationFrame(paso); else { fin(); op.alTerminar?.(); }
    }
  };
  raf = requestAnimationFrame(paso);
}
const vivos = new WeakMap<HTMLElement, () => void>();

export function dibujar(el: HTMLElement, op: Op) {
  vivos.get(el)?.(); // una animación a medias se corta: manda la nueva
  const reducido = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const limpiarMascara = () => { el.style.removeProperty('-webkit-mask'); el.style.removeProperty('mask'); };
  if (reducido) { limpiarMascara(); op.alTerminar?.(); return; }
  if (op.arbol) return dibujarComoArbol(el, op);
  if (op.estacion) return pintarComoEstacion(el, op);

  // ── la capa de líneas
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('aria-hidden', 'true');
  svg.style.cssText = `position:fixed;left:0;top:0;overflow:visible;pointer-events:none;z-index:${getComputedStyle(el).zIndex === 'auto' ? 1 : getComputedStyle(el).zIndex}`;
  el.parentElement!.append(svg);
  const r0 = el.getBoundingClientRect();
  const trazos: SVGPathElement[] = [];
  const linea = (d: string) => {
    const p = document.createElementNS(NS, 'path');
    p.setAttribute('d', d); p.setAttribute('pathLength', '1'); p.setAttribute('fill', 'none'); p.setAttribute('stroke', op.color);
    p.setAttribute('stroke-width', '1'); p.setAttribute('stroke-linecap', 'round'); p.setAttribute('vector-effect', 'non-scaling-stroke');
    p.style.strokeDasharray = '1'; p.style.strokeDashoffset = op.abrir ? '1' : '0';
    svg.append(p); trazos.push(p);
  };
  const rr = (x: number, y: number, w: number, h: number, r: number) => {
    r = Math.min(r, w / 2, h / 2);
    return `M${x + r} ${y}H${x + w - r}Q${x + w} ${y} ${x + w} ${y + r}V${y + h - r}Q${x + w} ${y + h} ${x + w - r} ${y + h}H${x + r}Q${x} ${y + h} ${x} ${y + h - r}V${y + r}Q${x} ${y} ${x + r} ${y}Z`;
  };
  linea(rr(0, 0, r0.width, r0.height, parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0));
  if (op.piezas) el.querySelectorAll<HTMLElement>(op.piezas).forEach((p) => {
    const r = p.getBoundingClientRect(); if (!r.width) return;
    const x = r.left - r0.left, y = r.top - r0.top;
    if (p.matches('input, textarea, a, [data-subraya]')) linea(`M${x} ${y + r.height}H${x + r.width}`);
    else linea(rr(x, y, r.width, r.height, parseFloat(getComputedStyle(p).borderTopLeftRadius) || 0));
  });
  const colocar = () => { const r = el.getBoundingClientRect(); svg.style.transform = `translate(${r.left}px, ${r.top}px)`; svg.setAttribute('width', String(r.width)); svg.setAttribute('height', String(r.height)); };
  colocar();

  // ── la pintura: el círculo rasgado, en px de la pieza
  const ox = op.origen[0] - r0.left, oy = op.origen[1] - r0.top;
  const lejos = Math.max(Math.hypot(ox, oy), Math.hypot(r0.width - ox, oy), Math.hypot(ox, r0.height - oy), Math.hypot(r0.width - ox, r0.height - oy));
  const S = (lejos / RADIO) * 1.08;
  const mascara = (k: number) => {
    const s = Math.max(0.01, S * k);
    const v = `${MASCARA} ${ox - s / 2}px ${oy - s / 2}px / ${s}px ${s}px no-repeat`;
    el.style.setProperty('-webkit-mask', v); el.style.setProperty('mask', v);
  };
  if (op.abrir) mascara(0);

  const T_LINEAS = 520, T_PINTA = op.abrir ? 950 : 700, RETRASO = op.abrir ? 260 : 0, ESCALON = 35;
  let raf = 0, t0 = 0, vivo = true;
  const fin = () => { vivo = false; cancelAnimationFrame(raf); svg.remove(); limpiarMascara(); vivos.delete(el); };
  vivos.set(el, fin);
  const paso = (ahora: number) => {
    if (!vivo) return;
    if (!t0) t0 = ahora;
    const t = ahora - t0;
    colocar();
    if (op.abrir) {
      trazos.forEach((p, i) => { const k = Math.min(1, Math.max(0, (t - i * ESCALON) / T_LINEAS)); p.style.strokeDashoffset = String(1 - (1 - Math.pow(1 - k, 3))); });
      const kp = Math.min(1, Math.max(0, (t - RETRASO) / T_PINTA)); mascara(1 - Math.pow(1 - kp, 2.2));
      // las líneas se van cuando la pintura ya las ha cubierto
      svg.style.opacity = String(1 - Math.min(1, Math.max(0, (t - RETRASO - T_PINTA * 0.7) / 350)));
      if (t < RETRASO + T_PINTA + 360) raf = requestAnimationFrame(paso); else { fin(); op.alTerminar?.(); }
    } else {
      const kp = Math.min(1, t / T_PINTA); mascara(1 - kp * kp);
      trazos.forEach((p, i) => { const k = Math.min(1, Math.max(0, (t - T_PINTA * 0.55 - i * ESCALON * 0.6) / (T_LINEAS * 0.8))); p.style.strokeDashoffset = String(k * k); });
      if (t < T_PINTA * 0.55 + trazos.length * ESCALON * 0.6 + T_LINEAS * 0.8 + 20) raf = requestAnimationFrame(paso); else { fin(); op.alTerminar?.(); }
    }
  };
  raf = requestAnimationFrame(paso);
}
