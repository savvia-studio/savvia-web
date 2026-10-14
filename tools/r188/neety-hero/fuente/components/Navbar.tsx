"use client";

/* eslint-disable @next/next/no-img-element */

import {
  useRef,
  useState,
  type FocusEvent as ReactFocusEvent,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import type { IconWeight } from "@phosphor-icons/react";
import Logo from "./Logo";
import PulsingDot from "./PulsingDot";
import { TransitionLink } from "./PageTransition";
import navCta from "./NavCta.module.css";
import { useLang, useNavFeatured } from "@/lib/i18n-client";
import { ROUTES } from "@/lib/i18n";

/* ---- dropdown data ------------------------------------------------------- */
/* El contenido de la nav (labels, cards, hrefs por idioma) vive en nav-data.ts. */
import { navCopy, navDropdowns, navItems, type Card, type Dropdown, type Featured, type NavItem } from "./nav-data";
import { LOGIN_URLS } from "./login-urls";
export type { Card, Dropdown, NavItem };

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Aplana las columnas por filas para llenar un grid sin huecos. */
export function interleave(columns: Card[][]): Card[] {
  const rows = Math.max(...columns.map((c) => c.length));
  const out: Card[] = [];
  for (let r = 0; r < rows; r++) {
    for (const col of columns) if (col[r]) out.push(col[r]);
  }
  return out;
}

/* ---- dropdown cards ------------------------------------------------------ */

function UseCaseCard({
  icon: IconCmp,
  title,
  desc,
  href,
  weight = "regular",
  onEnter,
}: Card & { weight?: IconWeight; onEnter: (el: HTMLElement) => void }) {
  return (
    /* TransitionLink: para hrefs internos ("/casos-de-uso/…") dispara la cortina;
       con "#" (páginas pendientes) se comporta como un <a> normal. */
    <TransitionLink
      href={href}
      data-card
      data-anim
      onMouseEnter={(e) => onEnter(e.currentTarget)}
      className="group/card block h-full rounded-lg border border-plum/5 p-4 transition-colors duration-300 hover:bg-azul/10"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-3">
          <IconCmp size={20} weight={weight} className="shrink-0 text-plum" aria-hidden />
          <span className="font-sans text-sm font-medium text-plum">{title}</span>
        </span>
        {/* Ranura derecha: vacía en reposo; la pulsing dot solo aparece al hacer hover. */}
        <span className="relative grid size-3.5 shrink-0 place-items-center">
          <PulsingDot size={4} className="col-start-1 row-start-1 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100" />
        </span>
      </div>
      <p className="mt-1 pl-8 font-body text-sm leading-[21px] text-plum/60">{desc}</p>
    </TransitionLink>
  );
}

function FeaturedCard({
  image,
  title,
  desc,
  href,
  onEnter,
}: Featured & { onEnter: () => void }) {
  return (
    <a
      href={href}
      data-anim
      onMouseEnter={onEnter}
      className="group/feat flex w-[280px] flex-col"
    >
      <div className="relative">
        <div className="h-[162px] w-[280px] overflow-hidden rounded-md bg-surface">
          <img
            src={image}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover/feat:scale-105"
          />
        </div>
        {/* Badge Neety (isotipo blanco sobre plum), esquina superior derecha. */}
        <span className="absolute right-1 top-1 flex size-8 items-center justify-center rounded bg-plum">
          <img
            src="/assets/anim/neety-isotipo.svg"
            alt=""
            className="size-4 object-contain [filter:brightness(0)_invert(1)]"
          />
        </span>
      </div>
      <div className="flex flex-col gap-1 py-2">
        <p className="font-display text-sm font-normal tracking-[-0.2px] text-plum">
          {title}
        </p>
        <p className="font-body text-xs leading-[18px] text-plum/60">{desc}</p>
      </div>
    </a>
  );
}

/* Contenido de un mega-menú. Cada uno gestiona su propio "dim" de cards; el tamaño y el
   cross-fade entre menús los orquesta el Navbar (contenedor compartido). */
function DropdownContent({
  label,
  dropdown,
}: {
  label: string;
  dropdown: Dropdown;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  const dimOthers = (active: HTMLElement) => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = prefersReducedMotion();
    root.querySelectorAll<HTMLElement>("[data-card]").forEach((c) =>
      gsap.to(c, {
        opacity: c === active ? 1 : 0.4,
        duration: reduce ? 0 : 0.3,
        ease: "power2.out",
      }),
    );
  };
  const resetDim = () => {
    const root = rootRef.current;
    if (!root) return;
    gsap.to(root.querySelectorAll("[data-card]"), {
      opacity: 1,
      duration: prefersReducedMotion() ? 0 : 0.3,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={rootRef}
      data-content={label}
      onMouseLeave={resetDim}
      className="absolute left-0 top-0"
    >
      {dropdown.kind === "grid" ? (
        /* Grid simétrico: filas de igual altura (auto-rows-fr), sin huecos. */
        <div className="grid w-[680px] auto-rows-fr grid-cols-2 gap-1 p-3">
          {interleave(dropdown.columns).map((card) => (
            <UseCaseCard
              key={card.title}
              {...card}
              weight={dropdown.iconWeight}
              onEnter={dimOthers}
            />
          ))}
        </div>
      ) : (
        /* Lista de enlaces; en "featured" se añade la card destacada a la derecha. */
        <div className="flex items-stretch">
          <div
            className={`flex w-[358px] flex-col gap-1 py-3 pl-3 ${
              dropdown.kind === "featured" ? "pr-2" : "pr-3"
            }`}
          >
            {dropdown.items.map((card) => (
              <UseCaseCard
                key={card.title}
                {...card}
                weight={dropdown.iconWeight}
                onEnter={dimOthers}
              />
            ))}
          </div>
          {dropdown.kind === "featured" && (
            <div className="py-3 pl-2 pr-3">
              <FeaturedCard {...dropdown.featured} onEnter={resetDim} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ---- navbar -------------------------------------------------------------- */

/* Un desplegable está "activo" si la página actual es una de sus entradas
   (p.ej. /casos-de-uso/* activa "Casos de uso") — mismo puntito de marca que
   los enlaces planos (feedback 2026-08-19). */
const dropdownCards = (d: Dropdown): Card[] =>
  d.kind === "grid" ? d.columns.flat() : d.items;

export default function Navbar() {
  const pathname = usePathname();
  const lang = useLang();
  const t = navCopy(lang);
  const navFeatured = useNavFeatured(); // card de «Recursos» elegida en Sanity (o null)
  const NAV_ITEMS = navItems(lang, navFeatured);
  const DROPDOWNS = navDropdowns(lang, navFeatured);
  const [openLabel, setOpenLabel] = useState<string | null>(null);

  const isMenuOpen = DROPDOWNS.some((i) => i.label === openLabel);

  const ulRef = useRef<HTMLUListElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const pillActive = useRef<HTMLElement | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const prevOpen = useRef<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };
  const openMenu = (label: string) => {
    cancelClose();
    setOpenLabel(label);
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenLabel(null), 120);
  };

  /* Contenedor compartido: al cambiar de menú morphea de tamaño (líquido) y hace
     cross-fade del contenido; al abrir desde cerrado, entra con fade + stagger. */
  useGSAP(
    () => {
      const shell = shellRef.current;
      if (!shell) return;
      const reduce = prefersReducedMotion();
      const contents = Array.from(
        shell.querySelectorAll<HTMLElement>("[data-content]"),
      );
      const active = openLabel
        ? contents.find((c) => c.dataset.content === openLabel) ?? null
        : null;
      const wasOpen = prevOpen.current != null;
      prevOpen.current = openLabel;

      if (!active) {
        gsap.to(shell, {
          autoAlpha: 0,
          y: -8,
          duration: reduce ? 0 : 0.18,
          ease: "power2.in",
          overwrite: true,
        });
        return;
      }

      // cross-fade de contenidos — solo al CAMBIAR entre menús abiertos. Al
      // abrir desde cerrado se apagan los inactivos en seco (gsap.set): el
      // panel del último menú abierto seguía a alpha 1 y, con tween, se veía
      // un instante desvaneciéndose sobre el nuevo (feedback 2026-08-19:
      // flash de Recursos al abrir Casos de uso).
      contents.forEach((c) => {
        const target = { autoAlpha: c === active ? 1 : 0 };
        if (!wasOpen || reduce) {
          gsap.set(c, { ...target, overwrite: "auto" });
        } else {
          gsap.to(c, {
            ...target,
            duration: 0.22,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      });

      const w = active.offsetWidth;
      const h = active.offsetHeight;
      const items = active.querySelectorAll("[data-anim]");

      if (!wasOpen || reduce) {
        // abrir desde cerrado: fija tamaño, entra con fade + stagger.
        gsap.set(shell, { width: w, height: h });
        gsap.set(items, { clearProps: "opacity,visibility" });
        gsap.fromTo(
          shell,
          { autoAlpha: 0, y: -8 },
          { autoAlpha: 1, y: 0, duration: reduce ? 0 : 0.28, ease: "power3.out", overwrite: true },
        );
        if (reduce) {
          gsap.set(items, { autoAlpha: 1, y: 0 });
        } else {
          gsap.fromTo(
            items,
            { autoAlpha: 0, y: 10 },
            { autoAlpha: 1, y: 0, duration: 0.34, ease: "power2.out", stagger: 0.045, delay: 0.06 },
          );
        }
      } else {
        // switch líquido: morphea ancho/alto hacia el nuevo menú y los ítems del
        // nuevo entran con el MISMO stagger que al abrir (feedback 2026-08-28).
        gsap.fromTo(
          items,
          { autoAlpha: 0, y: 10 },
          { autoAlpha: 1, y: 0, duration: 0.34, ease: "power2.out", stagger: 0.045, delay: 0.04, overwrite: "auto" },
        );
        gsap.to(shell, {
          width: w,
          height: h,
          autoAlpha: 1,
          y: 0,
          duration: 0.42,
          ease: "power3.out",
          overwrite: true,
        });
      }
    },
    { dependencies: [openLabel], scope: wrapRef },
  );

  /* Pastilla blanca "líquida" bajo los items de la nav. */
  const movePill = (el: HTMLElement) => {
    const pill = pillRef.current;
    if (!pill || pillActive.current === el) return;
    const first = pillActive.current === null;
    pillActive.current = el;
    const reduce = prefersReducedMotion();
    const box = {
      x: el.offsetLeft,
      y: el.offsetTop,
      width: el.offsetWidth,
      height: el.offsetHeight,
    };
    if (first || reduce) {
      gsap.set(pill, box);
      gsap.to(pill, {
        autoAlpha: 1,
        duration: reduce ? 0 : 0.2,
        ease: "power2.out",
        overwrite: true,
      });
    } else {
      const curX = Number(gsap.getProperty(pill, "x")) || 0;
      const dx = box.x - curX;
      const dist = Math.abs(dx);
      const stretch = Math.min(dist / 260, 1) * 0.16;
      const dur = 0.3 + Math.min(dist / 700, 1) * 0.25;
      gsap
        .timeline({ overwrite: true })
        .to(pill, { ...box, autoAlpha: 1, duration: dur, ease: "power3.out" }, 0)
        .to(
          pill,
          {
            scaleX: 1 + stretch,
            scaleY: 1 - stretch * 0.5,
            transformOrigin: dx >= 0 ? "right center" : "left center",
            duration: dur * 0.38,
            ease: "power2.out",
          },
          0,
        )
        .to(
          pill,
          { scaleX: 1, scaleY: 1, duration: dur * 0.7, ease: "power2.out" },
          dur * 0.34,
        );
    }
  };
  const hidePill = () => {
    const pill = pillRef.current;
    if (!pill) return;
    pillActive.current = null;
    gsap.to(pill, {
      autoAlpha: 0,
      scaleX: 1,
      scaleY: 1,
      duration: prefersReducedMotion() ? 0 : 0.25,
      ease: "power2.out",
      overwrite: true,
    });
  };
  const handleNavPointer = (e: ReactMouseEvent | ReactFocusEvent) => {
    const el = (e.target as HTMLElement).closest("[data-navitem]") as HTMLElement | null;
    if (el && ulRef.current?.contains(el)) movePill(el);
  };
  const handleNavBlur = (e: ReactFocusEvent) => {
    if (!ulRef.current?.contains(e.relatedTarget as Node)) {
      hidePill();
      scheduleClose();
    }
  };

  return (
    <>
      {/* Backdrop con blur: fixed a todo el viewport, por debajo del navbar (z-50) y por
          encima del contenido (Hero, z auto). Solo desktop, donde existen los mega-menús. */}
      <div
        aria-hidden
        className={`fixed inset-0 z-40 hidden bg-plum/5 backdrop-blur-[6px] transition-opacity duration-300 lg:block ${
          isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <nav className="relative z-50 flex w-full items-center justify-between gap-4 px-6 py-6 md:px-10 md:py-8">
        {/* Logo */}
        {/* La home vive en /home mientras dure el coming soon; cambiar a "/" al lanzarla. */}
        <TransitionLink href={ROUTES.homeDraft[lang]} aria-label={t.logoAria} className="shrink-0">
          <Logo className="h-7 w-auto md:h-8" />
        </TransitionLink>

        {/* Right cluster: links + CTAs (desktop) */}
        <div className="hidden items-center gap-3 lg:flex lg:gap-5">
          <ul
            ref={ulRef}
            onMouseOver={handleNavPointer}
            onMouseLeave={hidePill}
            onFocus={handleNavPointer}
            onBlur={handleNavBlur}
            className="relative hidden items-center lg:flex"
          >
            {/* Pastilla blanca líquida, detrás de los items. */}
            <span
              ref={pillRef}
              aria-hidden
              className="pointer-events-none absolute left-0 top-0 rounded-full bg-white opacity-0 will-change-transform"
            />

            {NAV_ITEMS.map((item) => {
              if (item.dropdown) {
                const current = dropdownCards(item.dropdown).some(
                  (c) => c.href !== "#" && pathname === c.href,
                );
                return (
                  <li key={item.label}>
                    <button
                      type="button"
                      aria-haspopup="true"
                      aria-expanded={openLabel === item.label}
                      aria-current={current ? "page" : undefined}
                      data-navitem
                      onMouseEnter={() => openMenu(item.label)}
                      onMouseLeave={scheduleClose}
                      onFocus={() => openMenu(item.label)}
                      onClick={() =>
                        setOpenLabel((cur) => (cur === item.label ? null : item.label))
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Escape") setOpenLabel(null);
                      }}
                      className={`relative z-10 flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 font-sans text-sm font-normal text-plum transition-opacity duration-300 ${
                        openLabel && openLabel !== item.label ? "opacity-40" : "opacity-100"
                      }`}
                    >
                      {/* mismo marcador de página actual que los enlaces planos */}
                      {current && <PulsingDot size={3} className="mr-1 shrink-0" />}
                      {item.label}
                      <span aria-hidden className="text-plum/70">
                        {openLabel === item.label ? "−" : "+"}
                      </span>
                    </button>
                  </li>
                );
              }
              return (
                <li key={item.label}>
                  <TransitionLink
                    href={item.href ?? "#"}
                    data-navitem
                    aria-current={pathname === item.href ? "page" : undefined}
                    className={`relative z-10 flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-2 font-sans text-sm font-normal text-plum transition-opacity duration-300 ${
                      openLabel && openLabel !== item.label ? "opacity-40" : "opacity-100"
                    }`}
                  >
                    {/* marcador de página actual: solo el puntito de marca, sin cambio de peso
                        (semibold «gordo», medium invisible; feedback 2026-08-04) */}
                    {pathname === item.href && <PulsingDot size={3} className="shrink-0" />}
                    {item.label}
                  </TransitionLink>
                </li>
              );
            })}

            {/* Mega-menú compartido — centrado bajo la nav. pt-3 = puente de hover. */}
            <div
              ref={wrapRef}
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
              /* Al pulsar un enlace del menú se cierra (también si lleva a la
                 misma ruta, donde no hay cambio de pathname que lo cierre). */
              onClick={(e) => {
                if ((e.target as HTMLElement).closest("a")) setOpenLabel(null);
              }}
              className={`absolute left-1/2 top-full z-30 -translate-x-1/2 pt-3 ${
                isMenuOpen ? "" : "pointer-events-none"
              }`}
            >
              <div
                ref={shellRef}
                role="menu"
                aria-label={openLabel ?? undefined}
                className="invisible relative overflow-hidden rounded-2xl border border-plum/5 bg-white opacity-0 shadow-[0_16px_48px_-16px_rgba(67,27,68,0.30)]"
              >
                {DROPDOWNS.map((d) => (
                  <DropdownContent key={d.label} label={d.label} dropdown={d.dropdown} />
                ))}
              </div>
            </div>
          </ul>

          <div className="flex items-center gap-3">
            {/* Un solo «Log in» → login nuevo (app.neety.com): el par nuevo/clásico
                del 31-ago se quedó en el footer; en la barra el cliente lo quiso
                único (feedback 2026-08-31, 2ª ronda). Externo: <a> normal. */}
            <a
              href={LOGIN_URLS.nuevo}
              className="hidden whitespace-nowrap font-display text-sm font-medium text-plum transition-opacity hover:opacity-70 sm:inline-flex"
            >
              {t.login}
            </a>
            <TransitionLink
              href={ROUTES.solicitarDemo[lang]}
              className={`${navCta.btn} inline-flex items-center whitespace-nowrap rounded-full bg-plum/75 px-4 py-2 font-display text-sm font-medium text-white transition-colors duration-200 hover:bg-plum`}
            >
              <span className={navCta.swap} data-text={t.demo}>
                <span className={navCta.label}>{t.demo}</span>
              </span>
            </TransitionLink>
          </div>
        </div>
      </nav>
    </>
  );
}
