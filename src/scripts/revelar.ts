// RONDA 232 · Andoni: «al cambiar de estaciones, en todas las secciones y mockups se tiene que cambiar fluido; en el hero funciona perfecto: cogerlo
// de referencia y llevarlo a todas». El cambio del hero (rondas 66–67): la estación nueva llega ya pintada y se DESCUBRE con el canto de papel
// rasgado que crece desde un origen (2,6 s, curva suave), mientras la vieja se apaga detrás del frente. Aquí, ese gesto para cualquier capa.
export const DUR_ESTACION = 2600;
const MASCARA = "url('/media/rasgo-circulo.webp')";
const reducido = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
// 29/10 · Eric, en /proyectos: «la primera vez aparece un poco de glitch, como que hay un salto»: mientras la máscara no ha llegado, el navegador
// esconde entera la capa enmascarada (la foto vieja desaparecía un instante y volvía con el agujero). Se pide al cargar y se espera antes de rasgar
let mascaraLista: Promise<unknown> | null = null;
// (una máscara CSS se pide en modo CORS: un <img> normal no le servía de caché, por eso crossOrigin; y una capa invisible ya con la máscara puesta
// deja la imagen de la máscara cargada en el motor de estilos antes del primer barrido)
export const mascaraPedida = () => (mascaraLista ??= (() => {
  const i = new Image(); i.crossOrigin = 'anonymous'; i.src = '/media/rasgo-circulo.webp';
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
  // (29/10) la caja se mide en el primer fotograma y no en cada uno: leerla justo después de mover la máscara obligaba a recalcular los estilos de
  // toda la página en cada fotograma (con varios rasgados a la vez, en el móvil, el cambio de estación iba a tirones)
  let a = 0, vivo = true, w = 0, h = 0;
  ponMascara(nuevo, `${MASCARA} 0 0 / 0 0 no-repeat`);
  const paso = (ahora: number) => {
    if (!vivo) return;
    if (!a) { a = ahora; w = nuevo.offsetWidth; h = nuevo.offsetHeight; }
    const k = Math.min(1, (ahora - a) / dur), e = k * k * (3 - 2 * k), S = Math.max(8, Math.hypot(w, h) * 2.4 * e);
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
  let a = 0, w = 0, h = 0, x = 0, y = 0; // la geometría, medida en el primer fotograma (ver revelar)
  const pon = (m: string) => {
    copia.style.setProperty('-webkit-mask', m); copia.style.setProperty('mask', m);
    copia.style.setProperty('-webkit-mask-composite', 'xor'); copia.style.setProperty('mask-composite', 'exclude');
  };
  const paso = (ahora: number) => {
    if (!copia.isConnected) return;
    if (!a) {
      a = ahora; w = copia.offsetWidth; h = copia.offsetHeight; x = ox * w; y = oy * h;
      if (ref) {
        const rc = copia.getBoundingClientRect(), rr = ref.getBoundingClientRect(), sx = rc.width / (w || 1), sy = rc.height / (h || 1);
        x = (rr.left + ox * rr.width - rc.left) / sx; y = (rr.top + oy * rr.height - rc.top) / sy; w = rr.width / sx; h = rr.height / sy;
      }
    }
    const k = Math.min(1, (ahora - a) / dur), e = k * k * (3 - 2 * k);
    const S = Math.max(8, Math.hypot(w, h) * 2.4 * e);
    pon(`linear-gradient(#000, #000), ${MASCARA} ${(x - S / 2).toFixed(1)}px ${(y - S / 2).toFixed(1)}px / ${S.toFixed(1)}px ${S.toFixed(1)}px no-repeat`);
    copia.style.opacity = String(1 - Math.min(1, Math.max(0, (k - 0.15) / 0.75)));
    if (k < 1) requestAnimationFrame(paso); else acabar();
  };
  requestAnimationFrame(paso);
}

export const estaVisible = (el: Element) => { const r = el.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth; };

/** (30/10 · Andoni: «revisar cambios de estaciones fluidos en todos lados») Para una foto que cambia de archivo con la estación: se descarga y descodifica
 *  la nueva fuera de pantalla; entonces se congela encima una copia de la vieja, se pone la nueva (ya lista: sin hueco) y a la copia se le abre el
 *  rasgado. Sin la foto a la vista, o con movimiento reducido, el cambio es directo. `src` o `srcset` (+ `sizes` del propio elemento). */
export function cambiarFoto(img: HTMLImageElement, nuevo: { src?: string; srcset?: string }, opc: { ox?: number; oy?: number; ref?: HTMLElement } = {}) {
  const aplicar = () => { if (nuevo.srcset != null) img.srcset = nuevo.srcset; if (nuevo.src != null) img.src = nuevo.src; };
  if ((nuevo.src != null && img.getAttribute('src') === nuevo.src && nuevo.srcset == null) || (nuevo.srcset != null && img.getAttribute('srcset') === nuevo.srcset)) return;
  if (reducido() || !img.complete || !img.naturalWidth || !estaVisible(img)) { aplicar(); return; }
  const pre = new Image();
  if (nuevo.srcset != null) { pre.sizes = img.sizes || `${Math.round(img.getBoundingClientRect().width)}px`; pre.srcset = nuevo.srcset; }
  if (nuevo.src != null) pre.src = nuevo.src;
  const listo = pre.decode().catch(() => {});
  Promise.race([listo, new Promise((r) => setTimeout(r, 5000))]).then(() => {
    const padre = img.offsetParent as HTMLElement | null;
    if (!padre || !img.isConnected) { aplicar(); return; }
    const copia = img.cloneNode(false) as HTMLImageElement;
    copia.removeAttribute('srcset'); copia.removeAttribute('data-mesa'); copia.removeAttribute('data-mesa-m'); copia.removeAttribute('id');
    copia.src = img.currentSrc || img.src; copia.setAttribute('aria-hidden', 'true'); copia.alt = '';
    const rp = padre.getBoundingClientRect(), ri = img.getBoundingClientRect(), sx = rp.width / (padre.offsetWidth || 1), sy = rp.height / (padre.offsetHeight || 1);
    const cs = getComputedStyle(img);
    copia.style.cssText = `position:absolute;margin:0;left:${(ri.left - rp.left) / sx - padre.clientLeft}px;top:${(ri.top - rp.top) / sy - padre.clientTop}px;width:${img.offsetWidth}px;height:${img.offsetHeight}px;object-fit:${cs.objectFit};object-position:${cs.objectPosition};border-radius:${cs.borderRadius};z-index:${cs.zIndex === 'auto' ? 1 : cs.zIndex};pointer-events:none;transform:${cs.transform}`;
    padre.append(copia);
    aplicar();
    rasgarCopia(copia, { ox: opc.ox ?? 0.5, oy: opc.oy ?? 1, ref: opc.ref });
  });
}
