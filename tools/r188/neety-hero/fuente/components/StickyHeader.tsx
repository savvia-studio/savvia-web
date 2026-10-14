"use client";

import { useEffect, useRef, useState } from "react";
import NavBlur from "./NavBlur";
import Navbar from "./Navbar";

/**
 * Sticky header at page level (outside the hero card, h-0 so it overlays without reserving a
 * flow row). `sticky top-0` pins it to the very top: main's p-4/p-5 padding gives the initial
 * ~16/20px inset over the hero, and as you scroll the bar rides up until it touches the top
 * edge, then stays there across every section.
 *
 * IMPORTANT: no `transform` here — a transformed ancestor becomes the containing block for
 * `position: fixed` descendants, which would collapse the navbar's full-screen mega-menu
 * backdrop (fixed inset-0) so it only covered the hero. The scroll flag just drives NavBlur's
 * blur+tint fade-in (single shared listener).
 *
 * The sticky wrapper cancels main's p-4/p-5 with negative margins so NavBlur can bleed to the
 * viewport walls (over page-level gradients the capped band read as a floating rectangle —
 * feedback 2026-08-19); the inner div restores the padding + 1600px cap for the navbar itself
 * (1640 = 1600 content + 2×20 px).
 */
/**
 * `flush`: páginas cuyo hero NO es una card con muesca (p. ej. la ficha del blog) en
 * móvil/tablet. Ahí el logo no tiene notch en el que asentarse, así que la barra
 * arranca ya pegada al techo (se cancela el p-4/p-5 del main con margen negativo) en
 * vez de subir 16/20px al hacer scroll — y queda alineada con la hamburguesa fija
 * (top-4). En lg se conserva el recorrido normal. Feedback 2026-08-27.
 */
export default function StickyHeader({ flush = false }: { flush?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // El flag salta cuando la barra queda FIJADA (rect.top <= 0), no por scrollY:
    // con un umbral de scroll el tinte se encendía mientras la barra aún subía por
    // el padding del main y su borde superior se leía como un corte blanco flotando
    // bajo el techo del viewport (feedback 2026-08-19).
    const onScroll = () => {
      const el = root.current;
      // En flush la barra ya nace en top 0: el tinte solo cuando hay scroll real.
      if (el) setScrolled(el.getBoundingClientRect().top <= 0 && (!flush || window.scrollY > 0));
    };
    onScroll(); // sync on mount (reload mid-scroll)
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [flush]);

  return (
    <div
      ref={root}
      data-reveal
      /* flush + <md: el navbar pierde su px-6 (pensado para asentarse dentro de la card) y
         el logo cae en los 16px del padding de página, alineado con el contenido. En md+
         ya coincide (p-5 + px-10 del nav = borde md:px-10 de las secciones).
         Confirmado por el cliente el 2026-08-27 tras probar ambas opciones. */
      className={`sticky top-0 z-40 -mx-4 h-0 md:-mx-5 ${
        flush ? "-mt-4 md:-mt-5 lg:mt-0 max-md:[&_nav]:px-0" : ""
      }`}
    >
      <NavBlur scrolled={scrolled} />
      <div className="mx-auto max-w-[1640px] px-4 md:px-5">
        <Navbar />
      </div>
    </div>
  );
}
