// TRANSICIONES ENTRE SECCIONES (ronda 9 · «tenemos que poner animaciones para transicionar a las secciones»).
// Un solo lenguaje, el del hero: las cosas ENTRAN EN FOCO. Jerarquía:
//   1. [data-entra]  titulares: las palabras suben desde una máscara, escalonadas (una vez).
//   2. [data-enfoca] bloques de contenido: de fuera de foco a nítidos, sin desplazarse (una vez). --d = retardo en pasos.
//   3. [data-sube]   cambio de COLOR entre secciones: la transición líquida de la web anterior (la sección que llega asoma como una
//                    gota por el centro, se ensancha y lo ocupa todo). Un <path> por frontera, movido por el scroll.
// Sin JS o con movimiento reducido todo está a la vista desde el principio (los estados ocultos cuelgan de html.js.anima).
const reducido = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reducido && 'IntersectionObserver' in window) {
  const partir = (el: HTMLElement) => {
    // solo texto plano: si lleva marcado dentro (p. ej. el píxel de IA), entra entero
    if (el.children.length) return el.classList.add('entero');
    const palabras = (el.textContent ?? '').trim().split(/\s+/);
    el.setAttribute('aria-label', palabras.join(' '));
    el.textContent = '';
    palabras.forEach((p, i) => {
      const caja = document.createElement('span'), dentro = document.createElement('span');
      caja.className = 'pal';
      caja.setAttribute('aria-hidden', 'true');
      dentro.style.setProperty('--n', String(i));
      dentro.textContent = p;
      caja.append(dentro);
      el.append(caja, ' ');
    });
  };
  const ver = new IntersectionObserver(
    (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visto'); ver.unobserve(e.target); } }),
    { rootMargin: '0px 0px -12% 0px', threshold: 0.15 },
  );
  document.querySelectorAll<HTMLElement>('[data-entra]').forEach((el) => { partir(el); ver.observe(el); });
  document.querySelectorAll<HTMLElement>('[data-enfoca]').forEach((el) => ver.observe(el));
  document.documentElement.classList.add('anima');

  // ── Transición líquida. Misma curva que la web anterior: campana 1/(1+t²)^1.5 que gana altura (ee) y anchura (w) con p.
  // RONDA 12: la gota ya no es un <path> relleno de color PLANO (con la textura de fondo se veía «el fondo cortado»): es un <div> con el
  // MISMO fondo que la sección que llega (color + grano), recortado con clip-path: polygon(). Misma materia a los dos lados del borde.
  const subes = [...document.querySelectorAll<HTMLElement>('[data-sube]')].map((sec) => {
    const gota = document.createElement('div');
    gota.className = 'sube'; gota.setAttribute('aria-hidden', 'true');
    // la luz del pie también va DENTRO de su gota marrón (recortada por su curva): «que la luz esté en todo lo marrón»; su geometría, en Pie.astro (:global(.sube) .luz-pie)
    const luz = sec.hasAttribute('data-pie') ? sec.querySelector(':scope > .luz-pie') : null;
    if (luz) gota.appendChild(luz.cloneNode(true));
    sec.prepend(gota);
    return { sec, path: gota, v: -1, on: false };
  });
  // RONDA 216 · Eric: «si el marrón toca las letras de Consultoría, lo que toque tiene que volverse blanco»: en las secciones con `data-sube-eco`, la gota lleva dentro un ECO
  // del contenido de la sección anterior, alineado por abajo y con la superficie de la que llega (texto claro). La gota, recortada con su curva, recorta también el eco:
  // donde el marrón cubre el contenido, se ve el contenido en blanco; el resto, el original. Es una copia (sin ids, inerte): se rehace cuando cambia el original.
  for (const s of subes) {
    if (!s.sec.hasAttribute('data-sube-eco')) continue;
    let previo = s.sec.previousElementSibling as HTMLElement | null;
    // el pie va fuera de <main>: su sección anterior es la última de <main>
    if (previo?.tagName === 'MAIN') previo = ([...previo.children].reverse().find((c) => c.tagName === 'SECTION') as HTMLElement | undefined) ?? null;
    while (previo && previo.tagName !== 'SECTION') previo = previo.previousElementSibling as HTMLElement | null;
    const fuente = previo?.querySelector<HTMLElement>(':scope > .wrap');
    if (!previo || !fuente) continue;
    const superficie = [...s.sec.classList].find((c) => c.startsWith('surface-')) ?? 'surface-dark';
    const rehacer = () => {
      s.path.querySelector('.sube-eco')?.remove();
      const caja = previo!.cloneNode(false) as HTMLElement; // sus atributos (el CSS de su componente cuelga de ellos)
      ['id', 'data-sube', 'aria-labelledby'].forEach((a) => caja.removeAttribute(a));
      caja.className = `sube-eco ${superficie}`; caja.setAttribute('aria-hidden', 'true'); caja.setAttribute('inert', '');
      const copia = fuente.cloneNode(true) as HTMLElement;
      copia.querySelectorAll('[id]').forEach((e) => e.removeAttribute('id'));
      copia.querySelectorAll('[data-carril-fila]').forEach((e) => e.removeAttribute('data-carril-fila')); // la copia no es una guía: Carriles la contaba y trazaba una línea doble
      copia.querySelectorAll('video, canvas, iframe').forEach((e) => e.remove());
      copia.querySelectorAll('[data-cine] img').forEach((e) => e.remove()); // RONDA 218: la réplica de Neety (19 MB decodificada) no se copia al eco
      caja.appendChild(copia);
      s.path.appendChild(caja);
    };
    let t = 0;
    const pedirEco = () => { clearTimeout(t); t = window.setTimeout(() => { if ((s as any).on) rehacer(); }, 250); };
    // se hace al acercarse la sección (la marca `on` la pone el IntersectionObserver de más abajo) y se rehace si el original cambia de clase o de contenido
    (s as any).eco = rehacer;
    // RONDA 218: lo que pasa DENTRO de la película (data-cine: chips, estados, clases a cada fotograma) no rehace el eco: se rehacía ~4 veces cada 10 s con su réplica de 19 MB y la pestaña de Safari se quedaba sin memoria
    new MutationObserver((ms) => { if (ms.some((m) => !(m.target as Element).closest?.('[data-cine]') && !((m.target as Node).parentElement?.closest('[data-cine]')))) pedirEco(); }).observe(previo, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ['class', 'aria-selected', 'aria-pressed', 'aria-expanded', 'hidden', 'data-estado'] });
  }
  // RONDA 41 · «hay un momento que se ve como geométrica y tiene que ser siempre fluida»: con 33 muestras repartidas por igual, al principio (gota
  // estrecha, w = 12) la cima caía entre 3 o 4 puntos y se veía un PICO poligonal. Ahora las muestras se reparten según la propia campana: se
  // concentran donde la curva cambia (alrededor de la cima, a la escala de su anchura) y hay 120: el contorno es liso en todo el recorrido.
  const N = 120;
  // móvil: la sección es estrecha y alta, y la misma campana sale PICUDA: se ensancha ×2 (el ancho de la campana va en % del ancho de la gota)
  const ancho = () => (innerWidth < 768 ? 2 : 1);
  const dibujar = (gota: HTMLElement, p: number) => {
    const ee = 1 - Math.pow(1 - p, 2.2), w = (12 + 310 * p * p * p * p) * ancho();
    let d = '0% 100%';
    for (let i = 0; i <= N; i++) {
      const u = (i / N) * 2 - 1; // −1…1
      // x = 50 + w·sinh(a·u)/sinh(a)·… : denso cerca del centro (a la escala de w), y llega a los bordes
      const a = Math.asinh(50 / Math.max(w * 0.6, 1)), x = 50 + (Math.sinh(a * u) / Math.sinh(a)) * 50, t = (x - 50) / w;
      d += `,${x.toFixed(2)}% ${(100 - (100 * ee) / Math.pow(1 + t * t, 1.5)).toFixed(2)}%`;
    }
    gota.style.clipPath = `polygon(${d},100% 100%)`;
  };
  let pedido = false;
  const mover = () => {
    pedido = false;
    const vh = innerHeight;
    for (const s of subes) {
      if (!s.on) continue;
      const v = Math.round(Math.min(1, Math.max(0, (vh - s.sec.getBoundingClientRect().top) / (vh * (s.sec.hasAttribute('data-pie') ? 0.9 : 0.72)))) * 1000) / 1000; // ronda 41: pasos finos (antes 1/200 daba saltos)
      if (v !== s.v) { s.v = v; dibujar(s.path, v); }
    }
  };
  // RONDA 65 · «el logo, cuando pasas entre secciones, cambia mal de color: se queda un rato con el que no toca»: la gota de la sección que llega
  // cubre la barra ANTES de que llegue la sección. La barra pregunta aquí qué sección pinta un punto, contando con la gota (misma curva que dibujar)
  (window as any).__subeEn = (x: number, y: number): HTMLElement | null => {
    for (const s of subes) {
      if (!s.on || s.v <= 0) continue;
      const r = s.path.getBoundingClientRect();
      if (y < r.top || y > r.bottom || x < r.left || x > r.right) continue;
      const p = s.v, ee = 1 - Math.pow(1 - p, 2.2), w = (12 + 310 * p * p * p * p) * ancho(), t = ((x - r.left) / r.width * 100 - 50) / w;
      const tope = r.top + (r.height * (100 - (100 * ee) / Math.pow(1 + t * t, 1.5))) / 100;
      if (y >= tope) return s.sec;
    }
    return null;
  };
  const pedir = () => { if (!pedido) { pedido = true; requestAnimationFrame(mover); } };
  const io = new IntersectionObserver((es) => { es.forEach((e) => { const s = subes.find((x) => x.sec === e.target); if (s) { const antes = s.on; s.on = e.isIntersecting; if (s.on && !antes && (s as any).eco && !s.path.querySelector('.sube-eco')) (s as any).eco(); } }); pedir(); }, { rootMargin: '30% 0px' });
  subes.forEach((s) => io.observe(s.sec));
  addEventListener('scroll', pedir, { passive: true });
  addEventListener('resize', pedir);
}
