"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Logo from "./Logo";

/**
 * Loader de marca (primera visita por sesión). Overlay renderizado en SSR (cubre el hero desde
 * el primer paint → sin flash). En visitas repetidas, un script inline en `layout.tsx` añade
 * `.intro-seen` al <html> y el CSS oculta `.loader` antes del paint.
 *
 * Coreografía: gradiente de marca animado (mesh de blobs + grano) → el wordmark se construye
 * (primero el isotipo, luego las letras, en tinta) → fade-out ligero de todo el loader que
 * revela el hero. Respeta prefers-reduced-motion.
 */
export default function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      // Avisa (una sola vez) a la ilustración animada del hero (`SignalFeed`) para que arranque
      // desde su PRIMERA card justo cuando el intro revela la web. El flag global cubre la carrera
      // de montaje (si el evento se emite antes de que la ilustración se suscriba).
      const signalIntroDone = () => {
        const w = window as typeof window & { __neetyIntroDone?: boolean };
        if (w.__neetyIntroDone) return;
        w.__neetyIntroDone = true;
        window.dispatchEvent(new Event("neety:intro-done"));
      };

      let seen = false;
      try {
        seen = !!sessionStorage.getItem("neety-intro-seen");
      } catch {}

      const finish = () => {
        try {
          sessionStorage.setItem("neety-intro-seen", "1");
        } catch {}
        document.documentElement.classList.add("intro-seen");
        document.body.style.overflow = "";
        signalIntroDone();
        setDone(true);
      };

      // Ya visto en esta sesión → el CSS ya lo ocultó antes del paint; solo desmontar.
      if (seen) {
        signalIntroDone();
        setDone(true);
        return;
      }

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      // Bloquear scroll durante el intro.
      document.body.style.overflow = "hidden";

      if (reduce) {
        gsap.to(el, {
          autoAlpha: 0,
          duration: 0.3,
          delay: 0.4,
          onComplete: finish,
        });
        return;
      }

      const q = gsap.utils.selector(el);
      const blobs = q(".loader-blob");

      // Deriva ambiental de los blobs (loops independientes desfasados = orgánico).
      blobs.forEach((b, i) => {
        const dir = i % 2 ? -1 : 1;
        gsap.to(b, {
          xPercent: dir * 14,
          yPercent: dir * -10,
          duration: 4 + i,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
        gsap.to(b, {
          scale: 1.22,
          duration: 5 + i,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: finish,
      });

      // Build del wordmark (tinta): primero el isotipo, luego las letras (izq→der).
      // Ordenamos los paths del SVG por su posición X: el más a la izquierda es el isotipo.
      const paths = Array.from(
        el.querySelectorAll<SVGPathElement>(".loader-stage svg path"),
      ).sort((a, b) => a.getBBox().x - b.getBBox().x);
      const isotipo = paths[0];
      const letters = paths.slice(1);

      // Desplazamiento (en unidades de viewBox) para arrancar el isotipo CENTRADO en el stage:
      // llevamos su centro al centro del viewBox (que coincide con el centro del logo centrado).
      const svgEl = el.querySelector<SVGSVGElement>(".loader-stage svg");
      let centerOffset = 0;
      if (isotipo && svgEl) {
        const vb = svgEl.viewBox.baseVal;
        const bb = isotipo.getBBox();
        centerOffset = vb.x + vb.width / 2 - (bb.x + bb.width / 2);
      }

      // Estado inicial (el CSS deja los paths a opacity 0; el isotipo, además, arranca centrado).
      if (isotipo) gsap.set(isotipo, { opacity: 0, x: centerOffset });
      gsap.set(letters, { opacity: 0 });

      // Beat 1 — el isotipo aparece CENTRADO (solo fundido, sin escala).
      if (isotipo) {
        tl.to(isotipo, { opacity: 1, duration: 0.45, ease: "power2.out" }, 0.35);
      }
      // Beat 2 — el isotipo se desplaza a su sitio (izquierda), dejando hueco al texto.
      if (isotipo) {
        tl.to(isotipo, { x: 0, duration: 0.6, ease: "power3.inOut" }, 1.0);
      }
      // Beat 3 — las letras aparecen en el hueco liberado (fundido).
      tl.to(letters, { opacity: 1, duration: 0.5, ease: "power2.out" }, 1.25);

      // Final del load: fade-out ligero de todo el loader → revela el hero (que ya está debajo).
      tl.to(el, { autoAlpha: 0, duration: 0.6, ease: "power2.inOut" }, 2.1);
      // Al empezar el reveal, arranca la ilustración del hero (para que salga desde su 1ª card).
      tl.call(signalIntroDone, undefined, 2.1);
    },
    { scope: root },
  );

  if (done) return null;

  return (
    <div ref={root} className="loader" aria-hidden>
      {/* Gradiente de marca animado por código (mesh de blobs + grano).
          Opcional: sustituible por un <video> de loop en el futuro. */}
      <div className="loader-gradient">
        <div className="loader-blob loader-blob-1" />
        <div className="loader-blob loader-blob-2" />
        <div className="loader-blob loader-blob-3" />
        <div className="loader-grain" />
      </div>

      {/* El wordmark se construye: isotipo primero, luego las letras (GSAP anima sus paths). */}
      <div className="loader-stage">
        <Logo className="h-auto w-[220px] md:w-[260px]" fill="#2a0e2c" />
      </div>
    </div>
  );
}
