// 29/10 · Eric (iPhone, Safari 26): al pegarse las píldoras de Servicios, las barras de Safari se ponían del salvia y se quedaban así en el Estudio («sigue
// cambiando las bandas»). Safari 26 ya no hace caso al theme-color: tiñe la barra de estado y la de abajo con el color de lo que toca cada borde (fijo o
// pegado, de 6 px o más) y, si luego no encuentra nada, se queda con lo último. Aquí se le da SIEMPRE algo que tomar: una tira fija de 12 px en cada borde (a 6 px, en el iPhone de Eric las barras se quedaban en BLANCO: Safari la ve, la descarta y no mira más; a 1 px tampoco)
// con el color de la sección que hay detrás (por la geometría de las secciones, no por lo que caiga bajo el punto). Van debajo de las barras de Safari
// (viewport-fit=cover): no se ven. Solo en iPhone e iPad. (Lo de antes no valía: una línea de 1 px, que Safari ignora y además se veía.)
const IOS = /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
if (IOS) {
  const tira = (lado: 'top' | 'bottom') => {
    const t = document.createElement('div');
    t.setAttribute('aria-hidden', 'true');
    t.style.cssText = `position:fixed;left:0;right:0;${lado}:0;height:12px;z-index:2147483000;pointer-events:none;`;
    document.body.append(t);
    return t;
  };
  const arriba = tira('top'), abajo = tira('bottom');
  // 29/10 (8.ª) · Eric: «en el hero al árbol se le corta la base» (la tira de abajo tapa 6 px de lo que toca el borde) y «¿pueden aparecer solo en las
  // secciones afectadas?». Solo existen alrededor de Servicios (lo único pegado al borde en móvil): desde una pantalla antes hasta una pantalla después,
  // cuando la sección siguiente ya ocupa los dos bordes y Safari ha tomado su color. Escondidas con display (con opacity 0 Safari las sigue leyendo).
  const mostrar = (si: boolean) => { arriba.style.display = abajo.style.display = si ? '' : 'none'; if (si) pedir(); };
  const servicios = document.getElementById('servicios');
  if (servicios) new IntersectionObserver(([e]) => mostrar(e.isIntersecting), { rootMargin: '100% 0px' }).observe(servicios);
  else mostrar(false);
  const opaco = (c: string) => !!c && c !== 'transparent' && !/,\s*0\)$/.test(c) && !/\/\s*0\)$/.test(c);
  let secciones: HTMLElement[] = [];
  // las secciones con fondo propio, en orden de documento (la última que contiene el punto es la más honda: main > section)
  const listar = () => { secciones = [...document.querySelectorAll<HTMLElement>('main, main > section, main > div, main > article, body > section, footer')].filter((s) => opaco(getComputedStyle(s).backgroundColor)); };
  const colorEn = (y: number) => {
    let el: HTMLElement | null = null;
    for (const s of secciones) { const r = s.getBoundingClientRect(); if (r.top <= y && r.bottom > y) el = s; }
    return el ? getComputedStyle(el).backgroundColor : getComputedStyle(document.documentElement).backgroundColor;
  };
  let raf = 0;
  const poner = () => {
    raf = 0;
    const a = colorEn(1), b = colorEn(innerHeight - 1);
    if (arriba.style.backgroundColor !== a) arriba.style.backgroundColor = a;
    if (abajo.style.backgroundColor !== b) abajo.style.backgroundColor = b;
  };
  const pedir = () => { if (!raf) raf = requestAnimationFrame(poner); };
  addEventListener('scroll', pedir, { passive: true });
  addEventListener('resize', () => { listar(); pedir(); });
  visualViewport?.addEventListener('resize', pedir);
  // la estación funde el fondo 2,4 s: se sigue fotograma a fotograma mientras dura
  addEventListener('savvia:estacion', () => { listar(); let n = 0; const paso = () => { poner(); if (++n < 180) requestAnimationFrame(paso); }; requestAnimationFrame(paso); });
  addEventListener('load', () => { listar(); pedir(); });
  listar(); pedir();
}
