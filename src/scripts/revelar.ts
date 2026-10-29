// RONDA 232 · Andoni: «al cambiar de estaciones, en todas las secciones y mockups se tiene que cambiar fluido; en el hero funciona perfecto: cogerlo
// de referencia y llevarlo a todas». El cambio del hero (rondas 66–67): la estación nueva llega ya pintada y se DESCUBRE con el canto de papel
// rasgado que crece desde un origen (2,6 s, curva suave), mientras la vieja se apaga detrás del frente. Aquí, ese gesto para cualquier capa.
export const DUR_ESTACION = 2600;
const MASCARA = "url('/media/rasgo-circulo.png')";
const reducido = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
// 29/10 · Eric, en /proyectos: «la primera vez aparece un poco de glitch, como que hay un salto»: mientras la máscara no ha llegado, el navegador
// esconde entera la capa enmascarada (la foto vieja desaparecía un instante y volvía con el agujero). Se pide al cargar y se espera antes de rasgar
let mascaraLista: Promise<unknown> | null = null;
// (una máscara CSS se pide en modo CORS: un <img> normal no le servía de caché, por eso crossOrigin; y una capa invisible ya con la máscara puesta
// deja la imagen de la máscara cargada en el motor de estilos antes del primer barrido)
export const mascaraPedida = () => (mascaraLista ??= (() => {
  const i = new Image(); i.crossOrigin = 'anonymous'; i.src = '/media/rasgo-circulo.png';
  const c = document.createElement('i');
  c.setAttribute('aria-hidden', 'true');
  c.style.cssText = 'position:fixed;left:0;top:0;width:2px;height:2px;opacity:0.01;pointer-events:none;z-index:-1';
  ponMascara(c, `${MASCARA} 0 0 / 2px 2px no-repeat`);
  document.body.append(c);
  return Promise.all([i.decode().catch(() => {}), new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))]);
})());

const ponMascara = (el: HTMLElement, m: string) => { el.style.setProperty('-webkit-mask', m); el.style.setProperty('mask', m); };

/** Descubre `nuevo` (que ya está encima de `viejo`) con el canto rasgado desde (ox, oy), en fracciones de su caja. Al acabar, `fin`. */
export function revelar(nuevo: HTMLElement, opc: { ox?: number; oy?: number; dur?: number; viejo?: HTMLElement | null; fin?: () => void } = {}) {
  const { ox = 0.5, oy = 1, dur = DUR_ESTACION, viejo, fin } = opc;
  if (reducido()) { fin?.(); return () => {}; }
  let a = 0, vivo = true;
  ponMascara(nuevo, `${MASCARA} 0 0 / 0 0 no-repeat`);
  const paso = (ahora: number) => {
    if (!vivo) return;
    if (!a) a = ahora;
    const k = Math.min(1, (ahora - a) / dur), e = k * k * (3 - 2 * k), w = nuevo.offsetWidth, h = nuevo.offsetHeight, S = Math.max(8, Math.hypot(w, h) * 2.4 * e);
    ponMascara(nuevo, `${MASCARA} ${(ox * w - S / 2).toFixed(1)}px ${(oy * h - S / 2).toFixed(1)}px / ${S.toFixed(1)}px ${S.toFixed(1)}px no-repeat`);
    if (viejo) viejo.style.opacity = String(1 - Math.min(1, Math.max(0, (k - 0.15) / 0.75)));
    if (k < 1) requestAnimationFrame(paso);
    else { ponMascara(nuevo, ''); if (viejo) viejo.style.opacity = ''; fin?.(); }
  };
  requestAnimationFrame(paso);
  // cancelar: lo deja descubierto del todo (otro cambio encima manda el último)
  return () => { if (!vivo) return; vivo = false; ponMascara(nuevo, ''); if (viejo) viejo.style.opacity = ''; };
}

/** Para lo que cambia por CSS (una imagen de fondo, una foto por atributo): se congela una copia del aspecto VIEJO encima y se le abre un agujero
 *  rasgado desde (ox, oy) hasta que no queda nada. `copia` es el elemento ya montado con el aspecto viejo. */
export function rasgarCopia(copia: HTMLElement, opc: { ox?: number; oy?: number; dur?: number; ref?: HTMLElement; fin?: () => void } = {}) {
  // `ref`: la caja que se VE (p. ej. la pieza que recorta una lámina ampliada): el origen y el tamaño del círculo se miden en ella
  // `fin`: en vez de quitar la copia al acabar (cuando la «copia» es el propio elemento viejo, que se devuelve a su sitio)
  const { ox = 0.5, oy = 1, dur = DUR_ESTACION, ref, fin } = opc;
  const acabar = () => { if (fin) { for (const k of ['-webkit-mask', 'mask', '-webkit-mask-composite', 'mask-composite', 'opacity']) copia.style.removeProperty(k); fin(); } else copia.remove(); };
  if (reducido()) { acabar(); return; }
  let a = 0;
  const pon = (m: string) => {
    copia.style.setProperty('-webkit-mask', m); copia.style.setProperty('mask', m);
    copia.style.setProperty('-webkit-mask-composite', 'xor'); copia.style.setProperty('mask-composite', 'exclude');
  };
  const paso = (ahora: number) => {
    if (!copia.isConnected) return;
    if (!a) a = ahora;
    const k = Math.min(1, (ahora - a) / dur), e = k * k * (3 - 2 * k);
    let w = copia.offsetWidth, h = copia.offsetHeight, x = ox * w, y = oy * h;
    if (ref) {
      const rc = copia.getBoundingClientRect(), rr = ref.getBoundingClientRect(), sx = rc.width / (w || 1), sy = rc.height / (h || 1);
      x = (rr.left + ox * rr.width - rc.left) / sx; y = (rr.top + oy * rr.height - rc.top) / sy; w = rr.width / sx; h = rr.height / sy;
    }
    const S = Math.max(8, Math.hypot(w, h) * 2.4 * e);
    pon(`linear-gradient(#000, #000), ${MASCARA} ${(x - S / 2).toFixed(1)}px ${(y - S / 2).toFixed(1)}px / ${S.toFixed(1)}px ${S.toFixed(1)}px no-repeat`);
    copia.style.opacity = String(1 - Math.min(1, Math.max(0, (k - 0.15) / 0.75)));
    if (k < 1) requestAnimationFrame(paso); else acabar();
  };
  requestAnimationFrame(paso);
}

export const estaVisible = (el: Element) => { const r = el.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth; };
