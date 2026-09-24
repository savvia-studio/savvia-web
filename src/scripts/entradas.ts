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
    sec.prepend(gota);
    return { sec, path: gota, v: -1, on: false };
  });
  // RONDA 41 · «hay un momento que se ve como geométrica y tiene que ser siempre fluida»: con 33 muestras repartidas por igual, al principio (gota
  // estrecha, w = 12) la cima caía entre 3 o 4 puntos y se veía un PICO poligonal. Ahora las muestras se reparten según la propia campana: se
  // concentran donde la curva cambia (alrededor de la cima, a la escala de su anchura) y hay 120: el contorno es liso en todo el recorrido.
  const N = 120;
  const dibujar = (gota: HTMLElement, p: number) => {
    const ee = 1 - Math.pow(1 - p, 2.2), w = 12 + 310 * p * p * p * p;
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
      const v = Math.round(Math.min(1, Math.max(0, (vh - s.sec.getBoundingClientRect().top) / (vh * 0.72))) * 1000) / 1000; // ronda 41: pasos finos (antes 1/200 daba saltos)
      if (v !== s.v) { s.v = v; dibujar(s.path, v); }
    }
  };
  const pedir = () => { if (!pedido) { pedido = true; requestAnimationFrame(mover); } };
  const io = new IntersectionObserver((es) => { es.forEach((e) => { const s = subes.find((x) => x.sec === e.target); if (s) s.on = e.isIntersecting; }); pedir(); }, { rootMargin: '30% 0px' });
  subes.forEach((s) => io.observe(s.sec));
  addEventListener('scroll', pedir, { passive: true });
  addEventListener('resize', pedir);
}
