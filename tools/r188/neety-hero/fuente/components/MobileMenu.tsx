"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { CaretLeft } from "@phosphor-icons/react";
import Logo from "./Logo";
import PulsingDot from "./PulsingDot";
import RequestDemoButton from "./RequestDemoButton";
import { TransitionLink } from "./PageTransition";
import { navCopy, navDropdowns, navItems, type Card, type Dropdown } from "./nav-data";
import { LOGIN_URLS } from "./login-urls";
import { useLang, useNavFeatured } from "@/lib/i18n-client";
import { ROUTES } from "@/lib/i18n";

/* Figma: "Neety Home – 1.1 – Mobile – Menu" (14634-8524) + carpeta "Casos de uso" (14634-10652).
   Full-screen overlay opened from the mobile/tablet hamburger. The hamburger itself is the
   toggle: its two lines morph into an X while open. It is NEVER replaced — folder navigation
   uses a separate "← Atrás" button in the logo's place. Dropdown data is reused from Navbar
   (single source of truth). */

function mobileCards(d: Dropdown): Card[] {
  return d.kind === "grid" ? d.columns.flat() : d.items;
}

function MobileCard({
  icon: IconCmp,
  title,
  desc,
  href,
  onNavigate,
}: Card & { onNavigate: () => void }) {
  return (
    /* TransitionLink: cortina para hrefs internos; con "#" actúa como <a> normal. */
    <TransitionLink
      href={href}
      onClick={onNavigate}
      className="block rounded-lg border border-plum/5 p-4 transition-colors active:bg-azul/10"
    >
      <div className="flex items-center gap-3">
        <IconCmp size={20} weight="fill" className="shrink-0 text-plum" aria-hidden />
        <span className="font-sans text-sm font-medium text-plum">{title}</span>
      </div>
      <p className="mt-1 pl-8 font-body text-sm leading-[21px] text-plum/60">{desc}</p>
    </TransitionLink>
  );
}

export default function MobileMenu() {
  const lang = useLang();
  const t = navCopy(lang);
  const navFeatured = useNavFeatured(); // card de «Recursos» elegida en Sanity (o null)
  const NAV_ITEMS = navItems(lang, navFeatured);
  const DROPDOWNS = navDropdowns(lang, navFeatured);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [folder, setFolder] = useState<string | null>(null);

  // Al cerrar el menú, vuelve siempre a la lista raíz.
  useEffect(() => {
    if (!open) setFolder(null);
  }, [open]);

  // Lock scroll + close on Escape while the menu is open. Uses the position:fixed body
  // technique so the scroll freezes WITHOUT removing the (always-visible) scrollbar — the
  // viewport width stays constant, so the 768px breakpoint never flips and the logo/hamburger
  // don't jump. The scroll position is preserved and restored on close.
  // Escape: en carpeta → vuelve a la lista; en lista → cierra el menú.
  useEffect(() => {
    if (!open) return;
    const scrollY = window.scrollY;
    const body = document.body;
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setFolder((f) => {
        if (f) return null;
        setOpen(false);
        return null;
      });
    };
    window.addEventListener("keydown", onKey);
    return () => {
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      // instant: con scroll-behavior:smooth en html, restaurar la posición animaría.
      window.scrollTo({ top: scrollY, behavior: "instant" });
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <>
      {/* Hamburger ⇄ X toggle — plum square at the card's top-right corner. Sits above the
          overlay (z-70) so it stays visible/clickable to close. NUNCA se reemplaza. */}
      <button
        type="button"
        aria-label={open ? t.closeMenu : t.openMenu}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={`fixed right-4 top-4 z-[70] flex h-12 w-[50px] flex-col items-center justify-center gap-2 rounded-lg transition-colors duration-300 md:right-5 md:top-5 lg:hidden ${
          open ? "bg-plum/5" : "bg-plum"
        }`}
      >
        <span
          className={`block h-[1.5px] w-[18px] rounded-full transition-all duration-300 ease-out ${
            open ? "translate-y-[5px] rotate-45 bg-plum" : "bg-white"
          }`}
        />
        <span
          className={`block h-[1.5px] w-[18px] rounded-full transition-all duration-300 ease-out ${
            open ? "-translate-y-[5px] -rotate-45 bg-plum" : "bg-white"
          }`}
        />
      </button>

      {/* Overlay */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t.menu}
        style={{ transition: "transform 600ms cubic-bezier(0.16,1,0.3,1)" }}
        className={`fixed inset-0 z-[60] flex flex-col bg-surface lg:hidden ${
          open ? "translate-x-0" : "pointer-events-none translate-x-full"
        }`}
      >
        {/* Cabecera — logo (lista) o "← Atrás" (carpeta). pl-5/md:pl-9 = 4px por dentro del borde
            del listado (NO alinear con el logo del navbar: probado 2026-08-28 y descartado,
            quedaba demasiado a la derecha). Offset vertical ~el de la X (arriba-dcha)
            + 2px para que ópticamente no quede alto. El hamburguesa/X va aparte y no se toca. */}
        <div className="pl-5 pt-[28px] md:pl-9 md:pt-[30px]">
          <div
            className={`relative inline-flex h-7 items-center transition duration-[450ms] ease-out md:h-8 ${
              open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
            style={{ transitionDelay: open ? "90ms" : "0ms" }}
          >
            {/* Logo (raíz) y "Atrás" (carpeta) se apilan y hacen cross-fade + micro-slide al
                entrar/salir de una carpeta, en vez de reemplazarse en seco. Ambos salen/entran
                desde la izquierda para acompañar el drill-down horizontal. */}
            <a
              href={ROUTES.homeDraft[lang]}
              aria-label={t.logoAria}
              aria-hidden={folder != null}
              tabIndex={folder ? -1 : 0}
              className={`inline-block transition-[opacity,transform] duration-300 ease-out ${
                folder ? "pointer-events-none -translate-x-2 opacity-0" : "translate-x-0 opacity-100"
              }`}
            >
              <Logo className="h-7 w-auto md:h-8" />
            </a>
            <button
              type="button"
              onClick={() => setFolder(null)}
              aria-hidden={folder == null}
              tabIndex={folder ? 0 : -1}
              className={`absolute inset-y-0 left-0 inline-flex items-center gap-2 font-sans text-base text-plum transition-[opacity,transform] duration-300 ease-out ${
                folder ? "translate-x-0 opacity-100" : "pointer-events-none -translate-x-2 opacity-0"
              }`}
            >
              <CaretLeft size={18} weight="bold" aria-hidden />
              {t.back}
            </button>
          </div>
        </div>

        {/* Zona deslizante — lista raíz ↔ carpeta (drill-down horizontal). La línea
            separadora vive aquí (contenedor estático), así se mantiene al abrir carpetas. */}
        <div className="relative mt-7 flex-1 overflow-hidden border-t border-plum/10">
          {/* Lista raíz */}
          <nav
            aria-hidden={folder != null}
            className={`absolute inset-0 overflow-y-auto px-6 transition-transform md:px-10 duration-[550ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              folder ? "pointer-events-none -translate-x-[20%]" : "translate-x-0"
            }`}
          >
            <ul className="flex flex-col pb-12">
              {NAV_ITEMS.map((item, i) => (
                <li
                  key={item.label}
                  className={`transition duration-[450ms] ease-out ${
                    open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                  }`}
                  style={{ transitionDelay: open ? `${150 + i * 45}ms` : "0ms" }}
                >
                  {item.dropdown ? (
                    <button
                      type="button"
                      onClick={() => setFolder(item.label)}
                      className="flex w-full items-center justify-between border-b border-plum/10 py-8 text-left"
                    >
                      <span className="font-sans text-base font-normal text-plum">
                        {item.label}
                      </span>
                      <span
                        aria-hidden
                        className="font-sans text-lg font-normal leading-none text-plum"
                      >
                        +
                      </span>
                    </button>
                  ) : (
                    <TransitionLink
                      href={item.href ?? "#"}
                      onClick={closeMenu}
                      aria-current={pathname === item.href ? "page" : undefined}
                      className="flex w-full items-center justify-between border-b border-plum/10 py-8"
                    >
                      <span className="inline-flex items-center gap-2.5 font-sans text-base font-normal text-plum">
                        {/* marcador de página actual: puntito de marca (ver Navbar) */}
                        {pathname === item.href && <PulsingDot size={3} className="shrink-0" />}
                        {item.label}
                      </span>
                    </TransitionLink>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Carpetas (una por dropdown): entra como bloque, SIMÉTRICO a la salida de la lista
              (misma distancia/duración/easing) → uno reemplaza al otro a la misma velocidad. */}
          {DROPDOWNS.map((d) => {
            const active = folder === d.label;
            return (
              <div
                key={d.label}
                aria-hidden={!active}
                style={{
                  transition:
                    "translate 550ms cubic-bezier(0.16,1,0.3,1), opacity 220ms ease-out",
                }}
                className={`absolute inset-0 overflow-y-auto bg-surface px-6 md:px-10 ${
                  active
                    ? "translate-x-0 opacity-100"
                    : "pointer-events-none translate-x-[30%] opacity-0"
                }`}
              >
                <p className="pb-3 pt-6 font-mono text-xs font-medium uppercase tracking-wide text-plum/40">
                  {d.label}
                </p>
                <div className="flex flex-col gap-1 pb-12">
                  {mobileCards(d.dropdown).map((card) => (
                    <MobileCard key={card.title} {...card} onNavigate={closeMenu} />
                  ))}
                </div>
              </div>
            );
          })}

          {/* Nubecita — fade sobre los CTAs que separa la lista scrolleable del footer fijo.
              El contenido se desvanece bajo ella al desplazarse. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-surface via-surface/80 to-transparent"
          />
        </div>

        {/* Bottom CTAs (Figma CTA-wrapper) */}
        <div
          className={`flex flex-col items-center gap-4 px-4 pb-6 pt-6 md:px-8 transition duration-[450ms] ease-out ${
            open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
          style={{ transitionDelay: open ? "360ms" : "0ms" }}
        >
          <RequestDemoButton onClick={closeMenu} block>
            {t.demo}
          </RequestDemoButton>
          {/* Un solo «Log in» → login nuevo (app.neety.com), como en la barra de
              desktop (feedback 2026-08-31, 2ª ronda); el par nuevo/clásico sigue
              en el footer. */}
          <a
            href={LOGIN_URLS.nuevo}
            onClick={closeMenu}
            className="self-center font-display text-sm font-medium text-plum transition-opacity hover:opacity-70"
          >
            {t.login}
          </a>
        </div>
      </div>
    </>
  );
}
