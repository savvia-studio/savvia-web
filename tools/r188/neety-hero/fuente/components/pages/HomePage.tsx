import type { Metadata } from "next";
import StickyHeader from "@/components/StickyHeader";
import Hero, { heroSubtitle } from "@/components/Hero";
import MobileMenu from "@/components/MobileMenu";
import BottomBlur from "@/components/BottomBlur";
import Clients from "@/components/Clients";
import Metrics from "@/components/Metrics";
import Diferencial from "@/components/Diferencial";
import Features from "@/components/Features";
import How from "@/components/How";
import Integraciones from "@/components/Integraciones";
import UseCases from "@/components/UseCases";
import Diagnostico from "@/components/Diagnostico";
import Footer from "@/components/Footer";
import { ROUTES, alternates, withOpenGraph, type Lang } from "@/lib/i18n";

/* Home completa, aparcada en /home y /en/home (noindex) mientras `/` y `/en` muestran la
   portada coming soon (components/ComingSoon.tsx). Cuando la web esté lista, apuntar
   app/(es)/page.tsx y app/(en)/en/page.tsx a este componente (con alternates(ROUTES.home))
   y borrar las rutas /home.

   Componente de página COMPARTIDO por los dos idiomas: app/(es)/home/page.tsx y
   app/(en)/en/home/page.tsx solo le pasan `lang`. Las secciones de servidor reciben
   `lang` por props; las cliente (Features, How, UseCases, Diagnostico, SignalFeed…) lo
   leen de useLang(). */
export function homeMetadata(lang: Lang): Metadata {
  return withOpenGraph(
    {
      alternates: alternates(ROUTES.homeDraft, lang),
      robots: { index: false, follow: false },
    },
    lang,
  );
}

export default function HomePage({ lang }: { lang: Lang }) {
  return (
    <main className="relative min-h-screen bg-surface p-4 md:p-5">
      {/* Preload del fondo del hero (es el LCP de la página): al ser background CSS el
          navegador no lo descubre hasta parsear el CSS (~4s de retraso medidos con
          Lighthouse móvil, 31-ago). React iza estos <link> al <head>; el media replica el
          corte lg (64rem) entre .home-hero-bg-mobile y .home-hero-bg — si se versiona el
          asset en globals.css, actualizar también aquí. SIN fetchPriority="high" a
          propósito: con 811KB de imagen, la prioridad alta le roba el ancho de banda al
          CSS/JS crítico y el FCP se dispara (medido 2,2s → 7s en 4G simulada); en
          prioridad normal el preload adelanta el descubrimiento igual sin frenar el
          primer pintado. */}
      <link
        rel="preload"
        as="image"
        href="/assets/hero-bg-mobile-v5.avif"
        media="(max-width: 63.9375rem)"
      />
      <link
        rel="preload"
        as="image"
        href="/assets/hero-bg-v4.avif"
        media="(min-width: 64rem)"
      />
      {/* Sticky navbar at PAGE level (direct child of <main>) so it stays pinned across
          EVERY section — hero, Clients, Metrics… — not just the hero card. It lives OUTSIDE
          the card and is h-0 + overflow-visible, so it overlays the hero (floating over the
          gradient) without reserving a flow row; the hero's top padding clears it. `sticky`
          then pins it until main's bottom. mx-auto max-w matches the card so the logo/CTAs
          stay aligned with the card content; top-4/5 matches the card inset. z-40 so the
          navbar's own mega-menu backdrop (fixed, z-40) and content (z-50) keep their order,
          above the card (which is `isolate`). NavBlur fades a progressive blur in on scroll
          so the bar stays legible over whatever passes underneath. */}
      <StickyHeader />

      {/* rounded-* = the frame's corner radius, fixed in px (never flattens, even on huge
          screens). The gradient below is clipped to these corners by its own wrapper — the
          container itself is NOT overflow-hidden so nothing clips the overlaid navbar. */}
      <div
        className="relative isolate mx-auto max-w-[1600px] rounded-2xl md:rounded-3xl"
        style={
          {
            // Notch width in px, shared by the mask AND the hero layout so content can be
            // positioned relative to the bite. Card width = min(100vw - 40px, 1600px);
            // 0.7 = the bite fraction — its left corner stays anchored, so a wider fraction
            // pushes the interlocking-squares edge further right, keeping them clear of the
            // subtitle at reduced-desktop widths (~1024–1200px). Clamped 355–850px, and it
            // caps at 850 from ~1254px up, so wider screens are unchanged.
            "--notch-w":
              "clamp(355px, calc(min(100vw - 40px, 1600px) * 0.7), 850px)",
          } as React.CSSProperties
        }
      >
        {/* Hero background = granular gradient (cover) with a 9-slice-style mask, wrapped in
            its own overflow-hidden+rounded box so the corners stay clipped WITHOUT making the
            container an overflow-hidden ancestor (which would break the sticky navbar).
              • the 4 rounded corners come from this wrapper's border-radius (fixed px)
              • the bottom-left bite (interlocking-squares motif from @S-Vector) is an SVG
                mask anchored bottom-left, sized in PIXELS with `auto` height so its squares
                stay square and never turn rectangular. Only the flat edges stretch.
            The gradient itself covers/scales with the hero, decoupled from the shape.
            Plain CSS background (not next/image) to avoid the image optimizer caching. */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-2xl md:rounded-3xl">
          {/* Mobile background: granular gradient with a single TOP-RIGHT notch that carves a
              white pocket around the hamburger button (no bottom-left bite on mobile — the
              illustration is inline and the subtitle lives below the card on white).
              -inset-px (like plataforma/precios/manifesto): bleeds the mask 1px past the
              wrapper's clip on every side — anchored top-right with a fractional width
              (69.141px), subpixel AA left a hairline of gradient along the notch's right
              edge (feedback 2026-08-31). */}
          <div
            className="home-hero-bg-mobile absolute -inset-px bg-cover bg-center lg:hidden"
            style={{
              WebkitMaskImage:
                "url(/assets/hero-notch-tr.svg), linear-gradient(#000, #000)",
              maskImage:
                "url(/assets/hero-notch-tr.svg), linear-gradient(#000, #000)",
              WebkitMaskPosition: "top right, 0 0",
              maskPosition: "top right, 0 0",
              WebkitMaskSize: "69.141px 66.829px, cover",
              maskSize: "69.141px 66.829px, cover",
              WebkitMaskRepeat: "no-repeat, no-repeat",
              maskRepeat: "no-repeat, no-repeat",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          />
          {/* Desktop background: same gradient + the bottom-left interlocking-squares notch.
              -left-px (like -bottom-px): bleeds the mask 1px past the wrapper's clip edge so
              subpixel AA can't leave a hairline of gradient along the notch's left wall. */}
          <div
            className="home-hero-bg absolute -left-px right-0 top-0 -bottom-px hidden bg-cover bg-center lg:block"
            style={{
              WebkitMaskImage:
                "url(/assets/hero-notch.svg), linear-gradient(#000, #000)",
              maskImage:
                "url(/assets/hero-notch.svg), linear-gradient(#000, #000)",
              WebkitMaskPosition: "bottom left, 0 0",
              maskPosition: "bottom left, 0 0",
              // bite width from the shared --notch-w var (px, capped so it never distorts);
              // height auto -> aspect locked -> squares stay square.
              WebkitMaskSize: "var(--notch-w) auto, cover",
              maskSize: "var(--notch-w) auto, cover",
              WebkitMaskRepeat: "no-repeat, no-repeat",
              maskRepeat: "no-repeat, no-repeat",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          />
        </div>

        <Hero lang={lang} />
      </div>

      {/* Mobile hamburger + full-screen menu overlay (Figma "Mobile – Menu"). Rendered at the
          page level (outside the card's rounded background). The trigger sits flush with the
          card's top-right corner, so the white L-gap to the notch mask reads symmetric. */}
      <MobileMenu />

      {/* Mobile supporting copy — below the card, on the white page background (desktop
          shows this inside the notch, from Hero). Aligned with the content's left edge. */}
      <p data-reveal className="px-4 pt-6 font-body text-[clamp(1.125rem,1rem+0.35vw,1.25rem)] font-normal leading-[1.5] text-ink/60 lg:hidden">
        {heroSubtitle(lang)}
      </p>

      {/* Sección "Nuestros clientes" (Figma frame "clients"). */}
      <Clients lang={lang} />

      {/* Sección "Por qué Neety" — métricas (Figma frame "Metrics"). */}
      <Metrics lang={lang} />

      {/* Sección "De ruido a señal" — antes/después (Figma frame "Diferencial"). */}
      <Diferencial lang={lang} />

      {/* Sección "Neety por dentro" — 3 cards apiladas tipo carpeta sticky (Figma frame "Features"). */}
      <Features />

      {/* Sección "Cómo funciona" — steps con raíl de progreso pinneado (Figma frame "How"). */}
      <How />

      {/* Sección "Integraciones" — pastillas de stack conectadas al producto en vídeo
          (Figma frame "Integraciones"). */}
      <Integraciones lang={lang} />

      {/* Sección "Casos de uso" — tabs con caso + ejemplo de producto (Figma frame "Casos de uso"). */}
      <UseCases />

      {/* Sección "Diagnóstico beneficios" — qué verás en la demo (Figma frame "Diagnostico beneficios"). */}
      <Diagnostico />

      {/* Footer — CTA final + columnas de navegación + línea legal (Figma "footer_wraper"). */}
      <Footer lang={lang} />

      {/* Progressive blur fijo al borde inferior del viewport (80px): el contenido entra
          difuminándose al hacer scroll. */}
      <BottomBlur />
    </main>
  );
}
