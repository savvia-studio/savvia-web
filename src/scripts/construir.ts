// RONDA 162 (Eric) · «por cada uno de ellos, antes del thumbnail, mostrar la animación del reel: el agente y nosotros vamos pintando el thumbnail».
// La construcción del reel (r138/r152), rehecha en vivo dentro de la pantalla del monitor: la retícula, «el agente», Andoni y Eric dibujan las cajas
// de la maqueta (medidas a ojo sobre cada miniatura, en % de la pantalla) y al final la miniatura se PINTA encima con el canto rasgado desde la
// última caja. Todo con WAAPI; `parar()` lo corta en seco (cambio de proyecto, sentarse, coger la web).

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

const flecha = '<svg viewBox="0 0 12 16" aria-hidden="true"><path d="M1 1v12.5l3.4-3.1 2.3 5 2.1-.9-2.3-5H11L1 1z"/></svg>';

export function construir(capa: HTMLElement, slug: string, cap: string, alAcabar: () => void): () => void {
  const plano = PLANOS[slug];
  if (!plano) { alAcabar(); return () => {}; }
  let vivo = true;
  const tiempos: number[] = [];
  const luego = (ms: number, f: () => void) => tiempos.push(window.setTimeout(() => vivo && f(), ms));
  capa.replaceChildren();
  capa.style.setProperty('--c-fondo', plano.fondo);
  capa.style.setProperty('--c-tinta', plano.tinta);
  capa.classList.add('on');

  const reticula = document.createElement('i'); reticula.className = 'c-reticula';
  capa.append(reticula);
  reticula.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400, fill: 'forwards' });

  // RONDA 163 (Eric: «en vez de nosotros, Andoni y Eric; y que sea más smooth»): TRES cursores, el agente (savia), Andoni y Eric. Cada uno recorre
  // SUS cajas en cola (nunca dos movimientos a la vez en el mismo cursor): llega a la esquina, traza la caja hasta la esquina opuesta y sigue.
  // Se mueven con transform en píxeles (sin `left/top`: nada de recalcular la maqueta en cada fotograma) y con una curva de ida y vuelta suave.
  const W = capa.clientWidth || 1, H = capa.clientHeight || 1;
  const px = (x: number, y: number) => `translate(${(x / 100) * W}px, ${(y / 100) * H}px)`;
  const suave = 'cubic-bezier(0.45, 0, 0.2, 1)';
  const quienes: [string, string, number, number][] = [['el agente', 'agente', 92, 90], ['Andoni', 'andoni', 4, 94], ['Eric', 'eric', 50, 104]];
  const cursores = quienes.map(([txt, cls, x0, y0]) => {
    const c = document.createElement('span'); c.className = `c-cursor ${cls}`;
    c.innerHTML = `${flecha}<b>${txt}</b>`;
    c.style.transform = px(x0, y0);
    capa.append(c);
    c.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400, delay: 150, fill: 'forwards' });
    return { el: c, x: x0, y: y0, t: 250 };
  });
  const ir = (c: (typeof cursores)[number], x: number, y: number, dur: number) => {
    const desde = px(c.x, c.y), hasta = px(x, y);
    c.el.style.transform = hasta;
    c.el.animate([{ transform: desde }, { transform: hasta }], { duration: dur, easing: suave });
    c.x = x; c.y = y;
  };
  const LLEGAR = 340, TRAZAR = 300, RESPIRO = 30;
  plano.cajas.forEach(([x, y, w, h, tipo], i) => {
    const c = cursores[i % 3], t = c.t;
    c.t += LLEGAR + TRAZAR + RESPIRO;
    luego(t, () => ir(c, x, y, LLEGAR));
    luego(t + LLEGAR, () => {
      const b = document.createElement('i');
      b.className = `c-caja${tipo ? ' ' + tipo : ''}`;
      Object.assign(b.style, { left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%` });
      capa.insertBefore(b, cursores[0].el);
      // la caja se TRAZA desde la esquina del cursor, con el mismo ritmo que él
      b.animate([{ clipPath: 'inset(0 100% 100% 0)', opacity: 0.4 }, { clipPath: 'inset(0 0 0 0)', opacity: 1 }], { duration: TRAZAR, easing: suave, fill: 'forwards' });
      ir(c, x + w, y + h, TRAZAR);
    });
  });

  // la miniatura se PINTA encima desde la última caja, con el canto rasgado de la casa, cuando el último cursor ha terminado
  const tPintar = Math.max(...cursores.map((c) => c.t)) + 200;
  const [ux, uy, uw, uh] = plano.cajas[plano.cajas.length - 1];
  luego(tPintar, () => {
    const img = document.createElement('img'); img.className = 'c-pintura'; img.src = cap; img.alt = '';
    img.style.setProperty('--ox', `${ux + uw / 2}%`); img.style.setProperty('--oy', `${uy + uh / 2}%`);
    capa.insertBefore(img, cursores[0].el);
    img.animate([{ maskSize: '0% 0%', WebkitMaskSize: '0% 0%' } as Keyframe, { maskSize: '320% 320%', WebkitMaskSize: '320% 320%' } as Keyframe], { duration: 1000, easing: 'cubic-bezier(0.55, 0, 0.25, 1)', fill: 'forwards' });
    cursores.forEach((c) => c.el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 400, delay: 350, fill: 'forwards' }));
  });
  luego(tPintar + 1050, () => { alAcabar(); capa.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 350, easing: 'ease-out', fill: 'forwards' }).onfinish = () => vivo && parar(); });

  function parar() {
    vivo = false;
    tiempos.forEach(clearTimeout);
    capa.getAnimations({ subtree: true }).forEach((a) => a.cancel());
    capa.classList.remove('on');
    capa.replaceChildren();
  }
  return parar;
}
