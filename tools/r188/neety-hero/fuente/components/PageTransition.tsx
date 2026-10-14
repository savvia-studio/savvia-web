"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "gsap";

/**
 * Transición de página: un VELO con el gradiente de marca del Loader (base cream + blobs
 * + grano) hace un fundido suave sobre la página — sin bordes ni desplazamientos: cubre
 * con opacidad, la ruta nueva se monta debajo y el velo se desvanece. La vida se la dan
 * los blobs (deriva ambiental por CSS, eco del intro) y una respiración de escala casi
 * imperceptible; el isotipo en tinta asoma tenue en el centro mientras dura el velo.
 *
 * Uso: envolver la app en <PageTransitionProvider> (layout.tsx) y usar <TransitionLink>
 * en los enlaces internos (href que empieza por "/"). Enlaces externos, anclas ("#"),
 * target="_blank" o clics con modificador siguen el comportamiento nativo del navegador.
 */

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const TransitionContext = createContext<{
  navigate: (href: string) => void;
  prefetch: (href: string) => void;
}>({ navigate: () => {}, prefetch: () => {} });

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const curtainRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<SVGSVGElement>(null);
  const covering = useRef(false);
  const routeChanged = useRef(false);
  const failsafe = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Devuelve el velo a su estado de reposo (oculto). */
  const reset = useCallback(() => {
    covering.current = false;
    if (failsafe.current) clearTimeout(failsafe.current);
    const curtain = curtainRef.current;
    if (curtain) gsap.set(curtain, { autoAlpha: 0, pointerEvents: "none" });
  }, []);

  const reveal = useCallback(() => {
    const curtain = curtainRef.current;
    const mark = markRef.current;
    if (!curtain) return;
    if (failsafe.current) clearTimeout(failsafe.current);
    const reduce = prefersReducedMotion();
    /* La flecha sale disparada hacia arriba-derecha (continúa su diagonal)… */
    if (mark && !reduce) {
      gsap.to(mark, {
        x: 28,
        y: -28,
        opacity: 0,
        duration: 0.35,
        delay: 0.08,
        ease: "power2.in",
        overwrite: true,
      });
    }
    /* …mientras el velo se desvanece. Micro-delay para que la ruta nueva pinte debajo. */
    gsap.to(curtain, {
      autoAlpha: 0,
      duration: reduce ? 0.3 : 0.5,
      delay: 0.08,
      ease: "power2.inOut",
      overwrite: true,
      onComplete: reset,
    });
  }, [reset]);

  const navigate = useCallback(
    (href: string) => {
      if (covering.current) return;
      /* Misma ruta (p.ej. «Eventos» del menú estando en /eventos): sin cortina,
         solo subir arriba — antes no pasaba nada y parecía un enlace roto. */
      if (href === pathname) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const curtain = curtainRef.current;
      const sheet = sheetRef.current;
      if (!curtain) {
        router.push(href);
        return;
      }
      covering.current = true;
      routeChanged.current = false;

      const push = () => {
        router.push(href);
        /* Failsafe: si la ruta no llega a cambiar (error de red…), destapar igualmente. */
        failsafe.current = setTimeout(() => {
          if (covering.current && !routeChanged.current) reveal();
        }, 4000);
      };

      const reduce = prefersReducedMotion();
      const mark = markRef.current;
      gsap.set(curtain, { pointerEvents: "auto" });
      /* Respiración: el velo entra un pelín "grande" y asienta — imperceptible pero vivo. */
      if (sheet && !reduce) {
        gsap.fromTo(
          sheet,
          { scale: 1.06 },
          { scale: 1, duration: 1.1, ease: "power1.out", overwrite: true },
        );
      }
      /* La flecha (isotipo) entra volando por su diagonal, desde abajo-izquierda, y se
         posa en el centro; en reveal() continúa el vuelo y sale por arriba-derecha. */
      if (mark) {
        if (reduce) {
          gsap.set(mark, { x: 0, y: 0, opacity: 1 });
        } else {
          gsap.fromTo(
            mark,
            { x: -32, y: 32, opacity: 0, scale: 0.9 },
            {
              x: 0,
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.5,
              delay: 0.08,
              ease: "power3.out",
              overwrite: true,
            },
          );
        }
      }
      gsap.to(curtain, {
        autoAlpha: 1,
        duration: reduce ? 0.2 : 0.3,
        ease: "power2.out",
        overwrite: true,
        onComplete: push,
      });
    },
    [pathname, router, reveal],
  );

  /* La ruta nueva ya está montada bajo el velo → desvanecerlo. Los back/forward del
     navegador cambian pathname sin velo y no disparan nada (covering=false). */
  useEffect(() => {
    if (!covering.current) return;
    routeChanged.current = true;
    reveal();
  }, [pathname, reveal]);

  const prefetch = useCallback((href: string) => router.prefetch(href), [router]);
  const ctx = useMemo(() => ({ navigate, prefetch }), [navigate, prefetch]);

  return (
    <TransitionContext.Provider value={ctx}>
      {children}

      {/* Velo: gradiente de marca del Loader (clases reutilizadas) a viewport completo.
          Solo anima opacidad (y una escala sutil de la lámina) — sin bordes que se vean. */}
      <div
        ref={curtainRef}
        aria-hidden
        className="invisible pointer-events-none fixed inset-0 z-[120] opacity-0"
      >
        <div ref={sheetRef} className="page-curtain-sheet">
          <div className="loader-blob loader-blob-1" />
          <div className="loader-blob loader-blob-2" />
          <div className="loader-blob loader-blob-3" />
          <div className="loader-grain" />
          {/* Isotipo en tinta, centrado — la "flecha": GSAP lo hace entrar volando por su
              diagonal y salir por la opuesta. El centrado va en un wrapper (margen negativo
              vía translate de Tailwind NO: GSAP pisaría el transform) → left/top con calc. */}
          <svg
            ref={markRef}
            viewBox="0 0 10.7587 10.7264"
            className="absolute left-[calc(50%-20px)] top-[calc(50%-20px)] w-10 opacity-0 md:left-[calc(50%-24px)] md:top-[calc(50%-24px)] md:w-12"
            aria-hidden
          >
            <path
              d="M9.90598 0H4.46198C3.99086 0 3.60862 0.382243 3.60862 0.853364L4.21523 3.1897C4.28795 3.47064 4.22083 3.77643 4.01572 3.98216C4.00018 3.9977 3.9834 4.01323 3.96662 4.02753C3.76462 4.20094 3.48369 4.25128 3.22513 4.1854L0.853364 3.57567C0.382242 3.57567 0 3.95792 0 4.42904V9.87304C0 10.3442 0.382242 10.7264 0.853364 10.7264H6.29737C6.76849 10.7264 7.15073 10.3442 7.15073 9.87304L6.59446 7.50811C6.53728 7.26509 6.587 7.00343 6.74984 6.81386C6.76351 6.79832 6.77781 6.78278 6.79211 6.76786C6.98602 6.57395 7.27379 6.50869 7.53981 6.57395L9.90536 7.15073C10.3765 7.15073 10.7587 6.76849 10.7587 6.29736V0.853364C10.7587 0.382243 10.3765 0 9.90536 0H9.90598Z"
              fill="#2a0e2c"
            />
          </svg>
        </div>
      </div>
    </TransitionContext.Provider>
  );
}

/* Enlace interno con transición. Mismo API que un <a>; para href externos/anclas se
   comporta como un <a> normal. En hover pre-carga la ruta (router.prefetch). */
export function TransitionLink({
  href,
  onClick,
  onMouseEnter,
  target,
  ...rest
}: ComponentPropsWithoutRef<"a"> & { href: string }) {
  const { navigate, prefetch } = useContext(TransitionContext);
  const internal = href.startsWith("/");

  return (
    <a
      href={href}
      target={target}
      onMouseEnter={(e) => {
        onMouseEnter?.(e);
        if (internal) prefetch(href);
      }}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        if (!internal || target === "_blank") return;
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        navigate(href);
      }}
      {...rest}
    />
  );
}
