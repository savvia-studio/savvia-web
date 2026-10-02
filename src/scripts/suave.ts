// RONDA 90 · SCROLL SUAVE con Lenis 1.3 (Andoni: «estoy viendo si meter un smooth scrolling como Lenis, pero hay que cerciorarse de que no genere ningún
// problema con las animaciones que ya tenemos»). Lenis mueve el scroll NATIVO (no transforma la página): `scrollY`, `position: sticky`, los
// IntersectionObserver y todo lo atado al scroll de la web siguen funcionando igual; solo cambia cómo llega la rueda.
// · `autoToggle`: se detiene solo cuando la página bloquea el scroll con `overflow: hidden` (la carga, el menú abierto, sentado en Proyectos).
// · `allowNestedScroll`: lo que tiene su propio scroll (la conversación de las FAQ, el reel) sigue con el suyo.
// · `prevent`: la rueda no se la lleva Lenis donde la usa la web para otra cosa: el dial de proyectos, el ecualizador de volumen, la carga, los diálogos y
//   la pantalla del monitor.
// · NO se usa su CSS recomendado: incluye `iframe { pointer-events: none }` mientras está activo y dejaría muerta la web real del monitor.
// · Sin Lenis: `?lenis=0`, movimiento reducido, o pantallas táctiles (en el móvil el scroll nativo ya es el bueno).
import Lenis from 'lenis';

const sin = /[?&]lenis=0/.test(location.search) || matchMedia('(prefers-reduced-motion: reduce)').matches || !matchMedia('(hover: hover) and (pointer: fine)').matches;
if (!sin) {
  const PREVENIR = '[data-lista],[data-eq],[data-cargador],dialog,[data-pantalla],[data-lenis-prevent]';
  const lenis = new Lenis({
    autoRaf: true,
    autoToggle: true,
    anchors: true,
    allowNestedScroll: true,
    stopInertiaOnNavigate: true,
    lerp: 0.1,
    prevent: (node: HTMLElement) => !!node.closest?.(PREVENIR),
  });
  (window as any).__lenis = lenis;
}
