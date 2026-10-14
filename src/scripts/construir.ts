// RONDA 162 (Eric) · «por cada uno de ellos, antes del thumbnail, mostrar la animación del reel: el agente y nosotros vamos pintando el thumbnail».
// La construcción del reel (r138/r152), rehecha en vivo dentro de la pantalla del monitor: la retícula, «el agente», Andoni y Eric dibujan las cajas
// de la maqueta (medidas a ojo sobre cada miniatura, en % de la pantalla) y al final la miniatura se PINTA encima con el canto rasgado desde la
// última caja. `parar()` lo corta en seco (cambio de proyecto, sentarse, coger la web).

type Caja = [x: number, y: number, w: number, h: number, tipo?: 't' | 'b' | 'v' | 'r'];
// t = línea de titular (más tinta) · b = botón (redondo, savia) · v = visual (grande, más claro) · r = visual redondo · sin tipo = texto/estructura
type Plano = { fondo: string; tinta: string; cajas: Caja[] };

const PLANOS: Record<string, Plano> = {
  kuanta: {
    fondo: '#141519', tinta: '#f5f5f7',
    cajas: [[4, 1.8, 7, 3.6], [31, 2.6, 33, 2.4], [77, 1.8, 15, 3.6, 'b'], [8, 24, 28, 9, 't'], [8, 35, 24, 9, 't'], [8, 46, 26, 9, 't'], [53, 19, 34, 62, 'r'], [8, 57, 27, 9, 't'], [8, 70, 37, 8], [8, 84, 13, 5, 'b'], [22, 84, 7, 5], [60, 84, 19, 7]],
  },
  arkdev: {
    fondo: '#f7f2ec', tinta: '#1b1714',
    cajas: [[4, 2.2, 8, 3.2], [25, 2.6, 26, 2.4], [67, 2, 17, 4, 'b'], [41, 17, 18, 2.6], [29, 23, 45, 7.5, 't'], [26, 31.5, 50, 7.5, 't'], [31, 40.5, 38, 8.5], [40, 53, 9, 5, 'b'], [49.5, 53, 10.5, 5], [21, 69, 58, 31, 'v']],
  },
  playground: {
    fondo: '#f6f4fb', tinta: '#17142a',
    cajas: [[2, 3.5, 8, 5], [30, 5, 40, 2.4], [86, 3.5, 11, 4.5, 'b'], [30, 20, 40, 8, 't'], [31, 29, 38, 8, 't'], [32, 39, 36, 6], [40, 47, 10, 5.5, 'b'], [51, 47, 8.5, 5.5], [19, 58, 62, 42, 'v'], [74, 51, 9, 9, 'r']],
  },
  neety: {
    fondo: '#eef0f6', tinta: '#2a1a2e',
    cajas: [[3, 1.5, 94, 74, 'v'], [5, 4.5, 8, 4], [52, 6, 40, 2.6], [5, 18, 18, 2.4], [5, 23, 40, 8, 't'], [5, 31, 30, 8, 't'], [5, 39, 30, 8, 't'], [61, 30, 27, 28], [5, 64, 12, 5.5, 'b'], [18, 65, 10, 3], [5, 80, 30, 9]],
  },
};

// RONDA 187 (Eric: «los punteros, iguales a los de savvia agentic; que se muevan con su misma rapidez y suavidad; y que cada uno haga cosas distintas,
// en lugares y orden diferentes: más natural»). Mismo dibujo que LaPartitura (la flecha de 16, la etiqueta en píldora del color, el clic que encoge y la
// onda), la misma curva de mano (0,42 0 0,24 1) con su ARCO (sube hasta 40 px o el 12 % del trayecto) y su ritmo (guion × 1/0,62). Un solo reloj (rAF):
// la posición de cada puntero y el trazo de cada caja son una función del tiempo. Cada uno tiene SU oficio y SU orden:
//   · el agente (savia) · la ESTRUCTURA: titulares y líneas, de arriba abajo, deprisa y seguido.
//   · Andoni (cobalto) · el DISEÑO: empieza por lo grande (el visual), duda un momento antes de trazarlo, y luego los botones, que pulsa al acabar.
//   · Eric (cereza) · el DESARROLLO: la navegación y los textos de abajo arriba, y al final REVISA con un clic una caja que ya está.
const flecha = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 1.5 L14 7 L8.4 8.4 L6.2 14 Z"/></svg>';

const curva = (x1: number, y1: number, x2: number, y2: number) => {
  const X = (u: number) => 3 * x1 * u * (1 - u) ** 2 + 3 * x2 * u * u * (1 - u) + u ** 3;
  const Y = (u: number) => 3 * y1 * u * (1 - u) ** 2 + 3 * y2 * u * u * (1 - u) + u ** 3;
  return (x: number) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let lo = 0, hi = 1, u = x;
    for (let i = 0; i < 22; i++) { const v = X(u); if (Math.abs(v - x) < 1e-5) break; if (v < x) lo = u; else hi = u; u = (lo + hi) / 2; }
    return Y(u);
  };
};
const MANO = curva(0.42, 0, 0.24, 1), FLUJO = curva(0.6, 0, 0.4, 1), SUBE = curva(0, 0, 0.2, 1), FUNDIDO = curva(0.5, 0, 0.5, 1);
const VEL = 0.62; // el de LaPartitura: sus segundos de guion, a tiempo real
const s = (g: number) => g / VEL;
const clamp = (v: number, a = 0, c = 1) => Math.min(c, Math.max(a, v));
const prog = (t: number, a: number, c: number) => (c <= a ? (t >= c ? 1 : 0) : clamp((t - a) / (c - a)));
const azar = (a: number, c: number) => a + Math.random() * (c - a);

// un tramo del puntero: de (x0,y0) a (x1,y1) entre t0 y t1, con la mano (arco) o quieto/arrastrando (recto)
type Tramo = { t0: number; t1: number; x0: number; y0: number; x1: number; y1: number; ez: (x: number) => number; arco: boolean };
type Trazo = { caja: Caja; t0: number; t1: number; el?: HTMLElement };

export function construir(capa: HTMLElement, slug: string, cap: string, alAcabar: () => void): () => void {
  const plano = PLANOS[slug];
  if (!plano) { alAcabar(); return () => {}; }
  let vivo = true, raf = 0;
  capa.replaceChildren();
  capa.style.setProperty('--c-fondo', plano.fondo);
  capa.style.setProperty('--c-tinta', plano.tinta);
  capa.classList.add('on');
  const W = capa.clientWidth || 1, H = capa.clientHeight || 1;

  const reticula = document.createElement('i'); reticula.className = 'c-reticula';
  capa.append(reticula);

  // el reparto: cada caja, a quien le toca por oficio
  const cajas = plano.cajas;
  const esAgente = (c: Caja) => c[4] === 't';
  const esAndoni = (c: Caja) => c[4] === 'v' || c[4] === 'r' || c[4] === 'b';
  // los textos de cuerpo, al que vaya más libre de los dos (agente o Eric), para que ninguno cargue con todo; estimación: viaje + trazo por caja
  const coste = (c: Caja) => 1.4 + ((c[2] + c[3]) / 120) * 0.7;
  const agente = cajas.filter(esAgente).sort((a, b) => a[1] - b[1] || a[0] - b[0]);
  const andoni = [...cajas.filter((c) => c[4] === 'v' || c[4] === 'r').sort((a, b) => b[2] * b[3] - a[2] * a[3]), ...cajas.filter((c) => c[4] === 'b').sort((a, b) => b[1] - a[1])];
  const resto = cajas.filter((c) => !esAgente(c) && !esAndoni(c));
  const eric = resto.filter((c) => c[1] < 10).sort((a, b) => a[0] - b[0]);
  const carga = [agente.reduce((a, c) => a + coste(c), 0.12), andoni.reduce((a, c) => a + coste(c) + (c[4] === 'b' ? 0.7 : 0), 0.4 + 0.9), eric.reduce((a, c) => a + coste(c), 0.7)];
  const extraA: Caja[] = [], extraE: Caja[] = [];
  resto.filter((c) => c[1] >= 10).sort((a, b) => b[2] * b[3] - a[2] * a[3]).forEach((c) => {
    if (carga[0] <= carga[2]) { extraA.push(c); carga[0] += coste(c); } else { extraE.push(c); carga[2] += coste(c); }
  });
  const lista = [
    [...agente, ...extraA.sort((a, b) => a[1] - b[1] || a[0] - b[0])], // el agente sigue bajando
    andoni,
    [...eric, ...extraE.sort((a, b) => b[1] - a[1])], // Eric, de abajo arriba
  ];
  const quienes: [string, string, number, number, number][] = [
    // nombre, clase, entra desde (fuera de la pantalla, en %), y cuándo empieza
    ['el agente', 'agente', 108, 30, 0.12],
    ['Andoni', 'andoni', 28, 112, 0.4],
    ['Eric', 'eric', -8, 6, 0.7],
  ];
  const trazos: Trazo[] = [];
  const P = quienes.map(([txt, cls, x0, y0, t0], q) => {
    const el = document.createElement('span'); el.className = `c-cursor ${cls}`;
    el.innerHTML = `<i class="onda"></i>${flecha}<b>${txt}</b>`;
    capa.append(el);
    const tramos: Tramo[] = [], clics: number[] = [];
    let t = t0, x = x0, y = y0;
    const mano = (x1: number, y1: number, dur?: number) => {
      const d = Math.hypot(x1 - x, ((y1 - y) * H) / W);
      const dd = dur ?? s(0.32 + clamp(d / 100) * 0.42); // de 0,5 s (cerca) a 1,2 s (de punta a punta), como los viajes de LaPartitura
      tramos.push({ t0: t, t1: t + dd, x0: x, y0: y, x1, y1, ez: MANO, arco: true });
      t += dd; x = x1; y = y1;
    };
    const quieto = (dur: number) => { tramos.push({ t0: t, t1: t + dur, x0: x, y0: y, x1: x, y1: y, ez: (v) => v, arco: false }); t += dur; };
    const arrastra = (x1: number, y1: number, dur: number) => { tramos.push({ t0: t, t1: t + dur, x0: x, y0: y, x1, y1, ez: FLUJO, arco: false }); t += dur; x = x1; y = y1; };
    const mis = lista[q];
    mis.forEach((c, i) => {
      const [cx, cy, cw, ch, tipo] = c;
      // el agente encadena las líneas seguidas sin respiro; los demás llegan, se lo piensan y siguen
      if (q === 1 && i === 0) { mano(cx + cw * 0.5, cy + ch * 0.45); quieto(s(0.16)); mano(cx, cy, s(0.3)); } // Andoni ronda el visual antes de empezar
      else mano(cx, cy);
      quieto(q === 0 ? s(0.04) : s(azar(0.06, 0.12)));
      clics.push(t);
      const dur = s(0.16 + clamp((cw + ch) / 120) * (q === 1 ? 0.55 : 0.32));
      trazos.push({ caja: c, t0: t, t1: t + dur });
      arrastra(cx + cw, cy + ch, dur);
      if (q === 1 && tipo === 'b') { quieto(s(0.05)); clics.push(t); quieto(s(0.1)); } // y lo pulsa
      quieto(q === 0 ? s(azar(0.02, 0.06)) : s(azar(0.06, 0.16)));
    });
    return { el, tramos, clics, x, y, get fin() { return t; }, set fin(v) { t = v; }, revisa: (c: Caja) => { mano(c[0] + c[2] * 0.6, c[1] + c[3] * 0.55); clics.push(t); quieto(s(0.25)); }, deriva: (dx: number, dy: number) => mano(x + dx, y + dy, s(0.6)), salir: (x1: number, y1: number, t1: number) => { if (t1 > t) quieto(t1 - t); mano(x1, y1, s(0.55)); } };
  });

  // Eric REVISA al final una caja del agente (un clic y una pausa); los que acaban antes derivan un poco mientras esperan
  const delAgente = trazos.filter((r) => esAgente(r.caja));
  if (delAgente.length && P[2].fin < Math.max(P[0].fin, P[1].fin) - s(0.6)) P[2].revisa(delAgente[Math.floor(Math.random() * delAgente.length)].caja);
  const fin = Math.max(...P.map((p) => p.fin));
  P.forEach((p) => { if (fin - p.fin > s(0.9)) p.deriva(azar(-4, 4), azar(3, 7)); });
  const tPintar = Math.max(...P.map((p) => p.fin)) + 0.15;
  const salida: [number, number][] = [[110, 70], [20, 115], [-12, 40]];
  P.forEach((p, q) => p.salir(salida[q][0], salida[q][1], tPintar + 0.15 + q * 0.08));
  const tFin = tPintar + 1.1;

  const [ux, uy, uw, uh] = trazos.length ? trazos.reduce((a, b) => (b.t1 > a.t1 ? b : a)).caja : cajas[cajas.length - 1];
  let img: HTMLImageElement | null = null;

  const pos = (p: (typeof P)[number], t: number) => {
    const tr = p.tramos;
    let i = 0;
    while (i < tr.length - 1 && tr[i].t1 <= t) i++;
    const r = tr[i];
    if (!r) return [p.x, p.y];
    const k = r.ez(prog(t, r.t0, r.t1));
    let x = (r.x0 + (r.x1 - r.x0) * k) * (W / 100), y = (r.y0 + (r.y1 - r.y0) * k) * (H / 100);
    if (r.arco) { const d = Math.hypot(((r.x1 - r.x0) * W) / 100, ((r.y1 - r.y0) * H) / 100); y -= Math.sin(Math.PI * k) * Math.min(40, d * 0.12); }
    return [x, y];
  };
  const blip = (t: number, t0: number, d: number) => {
    const p = prog(t, t0, t0 + d);
    return p <= 0 || p >= 1 ? 0 : p < 0.25 ? SUBE(p / 0.25) : 1 - FUNDIDO((p - 0.25) / 0.75);
  };

  const t0 = performance.now();
  const frame = () => {
    if (!vivo) return;
    const t = (performance.now() - t0) / 1000;
    // ronda 188 · Eric: «al acabar y salir la web, el velo se corta a mitad»: las cajas y la retícula seguían ENCIMA de la miniatura pintada (el círculo tapaba
    // media esfera) hasta que se fundía la capa. Ahora se apagan mientras la pintura las cubre y el final es la captura limpia, igual que la web de debajo
    const bajo = 1 - FUNDIDO(prog(t, tPintar + 0.15, tPintar + 0.85));
    reticula.style.opacity = String(FUNDIDO(prog(t, 0, 0.4)) * bajo);
    for (const r of trazos) {
      if (t < r.t0) continue;
      if (!r.el) {
        const [x, y, w, h, tipo] = r.caja;
        r.el = document.createElement('i');
        r.el.className = `c-caja${tipo ? ' ' + tipo : ''}`;
        Object.assign(r.el.style, { left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%` });
        capa.insertBefore(r.el, P[0].el);
      }
      // la caja se TRAZA desde la esquina, con el mismo ritmo que el puntero que la arrastra
      const k = FLUJO(prog(t, r.t0, r.t1));
      r.el.style.clipPath = k >= 1 ? '' : `inset(0 ${(100 - k * 100).toFixed(2)}% ${(100 - k * 100).toFixed(2)}% 0)`;
      r.el.style.opacity = ((0.4 + 0.6 * k) * bajo).toFixed(3);
    }
    P.forEach((p, q) => {
      const [x, y] = pos(p, t);
      p.el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      let cl = 0, on = 0;
      for (const tc of p.clics) { cl = Math.max(cl, blip(t, tc, 0.35)); const o = prog(t, tc, tc + 0.5); if (o > 0 && o < 1) on = o; }
      p.el.style.setProperty('--clic', cl.toFixed(3));
      p.el.style.setProperty('--onda', on.toFixed(3));
      p.el.style.opacity = (FUNDIDO(prog(t, quienes[q][4] - 0.1, quienes[q][4] + 0.3)) * (1 - FUNDIDO(prog(t, tPintar + 0.4, tPintar + 0.85)))).toFixed(3);
    });
    // la miniatura se PINTA encima desde la última caja, con el canto rasgado de la casa
    if (t >= tPintar) {
      if (!img) {
        img = document.createElement('img'); img.className = 'c-pintura'; img.src = cap; img.alt = '';
        img.style.setProperty('--ox', `${ux + uw / 2}%`); img.style.setProperty('--oy', `${uy + uh / 2}%`);
        capa.insertBefore(img, P[0].el);
      }
      // ronda 188 · el círculo rasgado nace en la última caja (a menudo en una esquina): a 320 % no llegaba a la esquina opuesta y quedaba un trozo sin pintar
      // hasta que se fundía la capa. Crece hasta pasar la esquina más lejana y, pintada, se quita la máscara: queda la captura entera, igual que la web de debajo
      const pm = prog(t, tPintar, tPintar + 1);
      if (pm >= 1) { img.style.mask = 'none'; img.style.setProperty('-webkit-mask', 'none'); }
      else {
        // en px y centrado en la última caja (con % la posición es relativa al sobrante y el círculo se alejaba de su origen al crecer)
        const cx = ((ux + uw / 2) / 100) * W, cy = ((uy + uh / 2) / 100) * H;
        const R = Math.max(Math.hypot(cx, cy), Math.hypot(W - cx, cy), Math.hypot(cx, H - cy), Math.hypot(W - cx, H - cy));
        const m = curva(0.55, 0, 0.25, 1)(pm) * R * 2.3, mp = `${(cx - m / 2).toFixed(1)}px ${(cy - m / 2).toFixed(1)}px`, ms = `${m.toFixed(1)}px ${m.toFixed(1)}px`;
        img.style.maskSize = ms; img.style.setProperty('-webkit-mask-size', ms);
        img.style.maskPosition = mp; img.style.setProperty('-webkit-mask-position', mp);
      }
    }
    if (t >= tFin) {
      alAcabar();
      capa.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 350, easing: 'ease-out', fill: 'forwards' }).onfinish = () => vivo && parar();
      return;
    }
    raf = requestAnimationFrame(frame);
  };
  raf = requestAnimationFrame(frame);

  function parar() {
    vivo = false;
    cancelAnimationFrame(raf);
    capa.getAnimations({ subtree: true }).forEach((a) => a.cancel());
    capa.classList.remove('on');
    capa.replaceChildren();
  }
  return parar;
}
