// GOTAS DE SAVIA (ronda 18) · lo que comparten la gota de la carga (Cargador.astro) y la que cae de las raíces a las tarjetas (Recorrido.astro).
// · `salpicar`: al tocar una superficie la gota ROMPE: una corona plana que se abre y se apaga + gotitas que saltan en parábola (gravedad
//   real, cada una con su tamaño y su velocidad), se estiran en el aire y desaparecen al volver a caer. Todo con `transform`, en un solo rAF,
//   y se limpia solo. Coordenadas en píxeles dentro de `padre` (que debe estar posicionado).
// · `formaGota`: cómo se deforma una gota que cae: recién descolgada TIEMBLA (oscilación amortiguada ancho/alto) y con la velocidad se alarga
//   un poco. Una gota real cae casi redonda; la «lágrima» solo existe mientras cuelga.
import { tinta } from './tinta';
const NARANJA = () => tinta('coral'); // ronda 50: Coral; ronda 61: leído de la paleta activa (el nombre se queda: es «la savia»)

export function formaGota(msDesdeSoltar: number, velPxPorFrame: number) {
  const tiembla = Math.sin(msDesdeSoltar * 0.034) * Math.exp(-msDesdeSoltar / 260) * 0.22;
  const estira = Math.min(0.32, velPxPorFrame * 0.011);
  return { sx: 1 + tiembla - estira * 0.45, sy: 1 - tiembla + estira };
}

export function salpicar(padre: HTMLElement, x: number, y: number, op: { n?: number; fuerza?: number; color?: string } = {}) {
  const n = op.n ?? 9, F = op.fuerza ?? 1, color = op.color ?? NARANJA();
  const G = 1700; // px/s²
  const hacer = (w: number, h: number) => {
    const el = document.createElement('i');
    el.setAttribute('aria-hidden', 'true');
    el.style.cssText = `position:absolute;left:0;top:0;width:${w}px;height:${h}px;margin:${-h / 2}px 0 0 ${-w / 2}px;border-radius:50%;background:${color};pointer-events:none;will-change:transform,opacity;z-index:5`;
    padre.append(el);
    return el;
  };
  // la corona: un disco plano que se abre a ras de la superficie
  const corona = hacer(26, 7);
  const gotas = Array.from({ length: n }, (_, i) => {
    const lado = i % 2 ? 1 : -1, a = (0.25 + Math.random() * 0.9) * lado; // ángulo respecto a la vertical
    const v = (230 + Math.random() * 300) * F, d = 2.5 + Math.random() * 3.5;
    return { el: hacer(d, d), vx: Math.sin(a) * v, vy: -Math.cos(a) * v, d };
  });
  let t0 = 0;
  const paso = (ahora: number) => {
    if (!t0) t0 = ahora;
    const t = (ahora - t0) / 1000;
    let vivas = 0;
    const kc = Math.min(1, t / 0.42), ec = 1 - Math.pow(1 - kc, 3);
    corona.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${0.3 + ec * 1.9 * F}, ${1 - ec * 0.6})`;
    corona.style.opacity = String(0.9 * (1 - kc));
    for (const g of gotas) {
      const px = g.vx * t, py = g.vy * t + 0.5 * G * t * t;
      if (py > 2 && t > 0.05) { g.el.style.opacity = '0'; continue; }
      vivas++;
      const vyA = g.vy + G * t, ang = Math.atan2(vyA, g.vx), vel = Math.hypot(g.vx, vyA);
      g.el.style.transform = `translate3d(${x + px}px, ${y + py}px, 0) rotate(${ang}rad) scale(${1 + vel * 0.0012}, ${1 - vel * 0.0004})`;
      g.el.style.opacity = String(Math.min(1, 1.5 - t * 1.6));
    }
    if (vivas || kc < 1) requestAnimationFrame(paso);
    else { corona.remove(); gotas.forEach((g) => g.el.remove()); }
  };
  requestAnimationFrame(paso);
}

// RONDA 24 · `caerRealista`: la caída COMPLETA de una gota que se descuelga de algo (la del pie, desde el rabo de la «a» del logotipo), con la
// misma física que la de la carga: cuelga y ENGORDA mientras un CUELLO la sujeta y se estrangula; al romperse queda un RESTO que se retrae y
// se suelta un SATÉLITE detrás; cae con gravedad, tiembla, se estira y su ESTELA se desenfoca en la dirección del movimiento. Al tocar `y1`
// salpica y avisa. Todo en píxeles dentro de `padre` (posicionado); se limpia sola.
// 28/10 · `tono`: los colores de la gota de agua (los de la carga, por estación: Cargador.astro › --gota-*); `sobreClaro`: un filo finísimo y una sombra
// blanda para que la gota translúcida se vea sobre el blanco (el final del Storybook)
export function caerRealista(padre: HTMLElement, x: number, y0: number, y1: number, op: { alImpacto?: () => void; color?: string; agua?: boolean; tono?: { a: string; b: string; c: string; luz: string }; sobreClaro?: boolean } = {}) {
  // RONDA 66 · `agua`: la gota translúcida de la carga (cuerpo que deja ver el fondo, canto que refracta, luz transmitida y brillo), no pintura
  const color = op.agua ? 'rgba(246, 228, 204, .42)' : op.color ?? NARANJA(), id = 'g' + Math.random().toString(36).slice(2, 8);
  const T = op.tono ?? { a: '#f3dcc0', b: '#e9c9a3', c: '#f6e4cc', luz: '#ffd9a8' };
  const ns = 'http://www.w3.org/2000/svg';
  const svg = (w: number, h: number, vb: string, ox: number, oy: number) => {
    const s = document.createElementNS(ns, 'svg');
    s.setAttribute('viewBox', vb); s.setAttribute('aria-hidden', 'true');
    s.style.cssText = `position:absolute;left:${-ox}px;top:${-oy}px;width:${w}px;height:${h}px;overflow:visible;fill:${color};pointer-events:none;z-index:5;transform-origin:${ox}px ${oy}px;will-change:transform`;
    padre.append(s); return s;
  };
  // el cuello: de la punta (0,0) a la gota (0,Lc); el resto que se retrae
  const cuello = svg(40, 40, '-20 -4 40 40', 20, 4);
  const cuelloD = document.createElementNS(ns, 'path'), resto = document.createElementNS(ns, 'circle');
  cuello.append(cuelloD, resto);
  cuello.style.transform = `translate3d(${x}px, ${y0}px, 0)`;
  // la gota: estela con desenfoque de movimiento + cabeza (el x del viewBox es la dirección de avance: la svg gira)
  const gota = svg(42, 16, '-34 -8 42 16', 34, 8);
  if (op.sobreClaro) gota.style.filter = 'drop-shadow(0 1px 1.5px rgb(34 28 24 / .22))';
  gota.innerHTML = `<defs><filter id="${id}a" filterUnits="userSpaceOnUse" x="-160" y="-60" width="220" height="120"><feGaussianBlur stdDeviation="0 0"/></filter><filter id="${id}b" filterUnits="userSpaceOnUse" x="-40" y="-40" width="80" height="80"><feGaussianBlur stdDeviation="0 0"/></filter></defs><path filter="url(#${id}a)" d="M0 -2.4C-22 -1.8 -70 -0.6 -110 0C-70 0.6 -22 1.8 0 2.4Z" transform="scale(0,1)" style="opacity:0"/>${op.agua
    ? `<defs><radialGradient id="${id}g" cx="0" cy="0" r="6" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${T.a}" stop-opacity=".1"/><stop offset=".62" stop-color="${T.b}" stop-opacity=".18"/><stop offset=".86" stop-color="${T.c}" stop-opacity=".5"/><stop offset="1" stop-color="#fff3e4" stop-opacity=".85"/></radialGradient><radialGradient id="${id}t" cx="0" cy="3.4" r="4.6" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${T.luz}" stop-opacity=".62"/><stop offset="1" stop-color="${T.luz}" stop-opacity="0"/></radialGradient></defs><g filter="url(#${id}b)"><circle r="6" fill="url(#${id}g)"${op.sobreClaro ? ' stroke="rgb(34 28 24 / .28)" stroke-width=".45"' : ''}/><g class="brillo"><circle r="4.6" fill="url(#${id}t)" transform="translate(0 .4)"/><ellipse cx="-2.1" cy="-2.6" rx="1.7" ry="1.05" transform="rotate(-35 -2.1 -2.6)" fill="#fff" fill-opacity=".92"/><circle cx="2.4" cy="-1.2" r=".45" fill="#fff" fill-opacity=".6"/></g></g>`
    : `<circle r="6" filter="url(#${id}b)"/>`}`;
  const brilloG = gota.querySelector<SVGGElement>('.brillo');
  const estela = gota.querySelector('path')!, mb = gota.querySelector(`#${id}a feGaussianBlur`)!, mbc = gota.querySelector(`#${id}b feGaussianBlur`)!;
  const sat = document.createElement('i');
  sat.style.cssText = `position:absolute;left:-1.7px;top:-1.7px;width:3.4px;height:3.4px;border-radius:50%;background:${color};opacity:0;pointer-events:none;z-index:5`;
  padre.append(sat);
  const entre = (t: number, a: number, b: number) => Math.min(1, Math.max(0, (t - a) / (b - a)));
  const cuelloPath = (Lc: number, r: number, wa: number, wm: number) => `M${-wa} 0C${-wm} ${Lc * 0.42} ${-r * 0.8} ${Lc * 0.72} ${-r * 0.8} ${Lc}L${r * 0.8} ${Lc}C${r * 0.8} ${Lc * 0.72} ${wm} ${Lc * 0.42} ${wa} 0Z`;
  const FORMA = 380, COLGAR = 560, G = 1500, yC = y0 + 20, dur = Math.sqrt((2 * Math.max(12, y1 - yC)) / G) * 1000, FIN = FORMA + COLGAR + dur;
  let t0 = 0, py = y0, estelaS = 0, satT = -1, satY = 0;
  const paso = (ahora: number) => {
    if (!t0) t0 = ahora;
    const t = ahora - t0;
    let y = y0, sx = 1, sy = 1, gordo = 1, ang = Math.PI / 2, dx = 0;
    if (t < FORMA) {
      // NACE en la punta: una perla que crece
      const k = t / FORMA, e = 0.5 - 0.5 * Math.cos(Math.PI * k); gordo = 0.2 + e * 0.8; y = y0 + e * 3;
      cuelloD.setAttribute('d', cuelloPath(3, 6 * gordo, 3.5, 3));
    } else if (t < FORMA + COLGAR) {
      // SE DESCUELGA: engorda y cae por su peso; el cuello se alarga y se estrangula
      const k = entre(t, FORMA, FORMA + COLGAR), e = k * k * (3 - 2 * k);
      gordo = 1 + 0.32 * e;
      const r = 6 * gordo, Lc = 3 + 17 * e;
      dx = Math.sin(k * 9) * 0.6 * (1 - k); y = y0 + Lc;
      cuelloD.setAttribute('d', cuelloPath(Lc, r, 4.2 - 2.6 * e, r * 0.72 * (1 - Math.pow(k, 1.6)) + 0.7));
      sx = 1 - 0.08 * e; sy = 1 + 0.16 * e;
    } else {
      const tc = t - FORMA - COLGAR;
      if (tc < 40 && satT < 0) { cuelloD.setAttribute('d', ''); satT = ahora; satY = y0 + 9; sat.style.opacity = '1'; }
      const rk = entre(tc, 0, 220); resto.setAttribute('r', String(2.4 * (1 - rk))); resto.setAttribute('cy', String(-3 * rk));
      y = yC + 0.5 * G * Math.pow(tc / 1000, 2);
      gordo = 1.3;
      const vel = y - py, f = formaGota(tc, vel); sx = f.sx; sy = f.sy;
      estelaS += ((tc > 100 ? Math.min(1, vel * 0.05) : 0) - estelaS) * 0.22;
      estela.setAttribute('transform', `scale(${estelaS.toFixed(3)}, 1)`); estela.style.opacity = String(0.42 * estelaS);
      mb.setAttribute('stdDeviation', `${Math.min(9, vel * 0.28).toFixed(2)} 0.4`); mbc.setAttribute('stdDeviation', `${Math.min(1.4, vel * 0.035).toFixed(2)} 0.15`);
      if (satT > 0) { const ts = (ahora - satT) / 1000, sy2 = satY + 0.5 * G * ts * ts * 0.85; sat.style.transform = `translate3d(${x}px, ${Math.min(y1, sy2)}px, 0) scale(${1 + ts * 1.2}, ${1 - ts * 0.15})`; sat.style.opacity = String(Math.max(0, 1 - ts * 1.6)); }
    }
    py = y;
    gota.style.transform = `translate3d(${x + dx}px, ${Math.min(y, y1)}px, 0) rotate(${ang}rad) scale(${(gordo * sy).toFixed(3)}, ${(gordo * sx).toFixed(3)})`;
    brilloG?.setAttribute('transform', `rotate(${((-ang * 180) / Math.PI).toFixed(1)})`);
    if (t < FIN) return void requestAnimationFrame(paso);
    gota.remove(); cuello.remove();
    salpicar(padre, x, y1, { n: 11, fuerza: 0.95, color: op.agua ? 'rgba(246, 228, 204, .7)' : color });
    op.alImpacto?.();
    setTimeout(() => sat.remove(), 800);
  };
  requestAnimationFrame(paso);
}
