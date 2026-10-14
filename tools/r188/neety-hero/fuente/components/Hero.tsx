import PulsingDot from "./PulsingDot";
import RequestDemoButton from "./RequestDemoButton";
import SignalFeed from "./SignalFeed";
import { copy, type Lang } from "@/lib/i18n";

/* Copy por idioma. El eyebrow lleva la última palabra en plum pleno (`accent`) y el
   titular termina en una frase atenuada (`h1Dim`, que en ≥1360px salta de línea). */
const COPY = copy({
  es: {
    eyebrow: { start: "Detecta. Prioriza.", accent: "Actúa." },
    h1Start: "Detecta a quién vender, cuándo hacerlo y",
    h1Dim: "qué acción tomar.",
    demo: "Solicitar demo",
    how: "Ver cómo funciona",
    subtitle:
      "No es otra herramienta para enviar más mensajes. Neety te dice qué cuentas importan hoy, por qué y qué debería hacer tu equipo con ellas.",
  },
  en: {
    eyebrow: { start: "Detect. Prioritize.", accent: "Act." },
    h1Start: "Detect who to sell to, when to do it and",
    h1Dim: "what action to take.",
    demo: "Request a demo",
    how: "See how it works",
    subtitle:
      "Not another tool for sending more messages. Neety tells you which accounts matter today, why, and what your team should do about them.",
  },
});

/** Párrafo de apoyo del hero (lo pinta HomePage bajo la card en móvil). */
export const heroSubtitle = (lang: Lang) => COPY[lang].subtitle;

export default function Hero({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  // pt clears the now-overlapping page-level navbar (~76px mobile / ~96px md+) plus the
  // original gap (48/64/80px) — the bar no longer reserves its own flow row inside the card.
  // On lg+ four vertical levers compress via svh-clamps on SHORT viewports (MacBook Air
  // ≈ 715–870px useful) so the subtitle stays above the fold: this pt (33% of the height
  // deficit, floor 128px = still clears the navbar), the headline→CTA gap (40%, floor
  // 108px — the lever that yields at the short end so the subtitle margin doesn't have
  // to), the subtitle's notch margin (13%, max −16px: CTA→mask-edge clearance is exactly
  // this margin − 77px, so every px squeezed here crowds the buttons against the notch)
  // and the headline cap (--h1-cap: 64→52px as a
  // HEIGHT STEP at <840px, not a slope — fonts 53–58px put the headline's first line flush
  // against the SignalFeed card at 1200–1360w, so the size must jump past that band; at
  // 52px the line clears the feed by ~50px and the headline stays at 3 lines). Measured
  // hero height: ≈960px at lg (4-line headline), ≈890px from 1360px (3 lines) — hence the
  // two constant tiers. On viewports tall enough every formula saturates at the design
  // values — zero change where the hero already fit.
  return (
    <section className="relative px-4 pb-2 pt-[124px] md:px-10 md:pt-[160px] lg:pt-[clamp(128px,calc(33svh_-_149px),176px)] min-[1360px]:pt-[clamp(128px,calc(33svh_-_126px),176px)]">
      <div className="relative flex flex-col">
        {/* Title + CTA */}
        <div>
          {/* Eyebrow tag */}
          <div data-reveal className="flex items-center gap-3">
            <PulsingDot size={4} />
            <span className="font-mono text-base font-medium uppercase tracking-wide text-plum/60">
              {t.eyebrow.start} <span className="text-plum">{t.eyebrow.accent}</span>
            </span>
          </div>

          {/* Headline */}
          <h1 data-reveal className="mt-3 max-w-[720px] text-balance font-display text-[length:clamp(2.5rem,5.6vw,var(--h1-cap,4rem))] [@media(max-height:839px)]:[--h1-cap:52px] font-medium leading-[1.12] tracking-[-0.02em] text-plum min-[1024px]:max-w-[560px] min-[1200px]:max-w-[640px] min-[1360px]:max-w-[49rem]! min-[1360px]:text-wrap">
            {t.h1Start}{" "}
            <span className="text-plum/40 min-[1360px]:block">{t.h1Dim}</span>
          </h1>

          {/* CTAs */}
          <div data-reveal className="mt-6 flex flex-wrap items-center gap-4 lg:mt-[clamp(108px,calc(40svh_-_194px),200px)] lg:gap-6 min-[1360px]:mt-[clamp(108px,calc(40svh_-_166px),200px)]">
            <RequestDemoButton href="#">{t.demo}</RequestDemoButton>
            <a
              href="#como-funciona"
              className="font-display text-sm font-medium text-plum transition-opacity hover:opacity-70 lg:text-base"
            >
              {t.how}
            </a>
          </div>
        </div>

        {/* Animated illustration — inline on mobile (below the CTAs, full width), pulled out
            to an absolute overlay on desktop. The wrapper spans the whole right space (from
            ~508px, just right of the headline, to right-8). The illustration fills that space
            up to a 460px cap; once it hits the cap and there's slack, `mx-auto` centers it
            within its right space instead of pinning it to the right wall — never covers the
            title (left edge never goes past ~508px). */}
        <div data-reveal className="pointer-events-none relative mx-auto mt-10 w-full max-w-[400px] select-none lg:absolute lg:-top-2 lg:left-[508px] lg:right-8 lg:mx-0 lg:mt-0 lg:w-auto lg:max-w-none xl:right-16">
          <div className="w-full lg:ml-auto lg:max-w-[460px]">
            <SignalFeed />
          </div>
        </div>

        {/* Desktop supporting copy — sits inside the mask notch. On mobile the subtitle is
            rendered below the card (on white) in HomePage.tsx. marginTop scales with the notch
            height so the CTAs above always clear the notch edge by ~48px; --sub-squeeze
            trims up to 24px of it on short viewports (see the fold levers note at the top). */}
        <p
          data-reveal
          className="hidden max-w-[500px] font-body text-[clamp(1.125rem,1rem+0.35vw,1.25rem)] font-normal leading-[1.5] text-ink/60 lg:block lg:[--sub-squeeze:clamp(0px,calc(128px_-_13svh),16px)] min-[1360px]:[--sub-squeeze:clamp(0px,calc(119px_-_13svh),16px)]"
          style={{ marginTop: "calc(var(--notch-w) * 0.1706 - 50px - var(--sub-squeeze, 0px))" }}
        >
          {t.subtitle}
        </p>
      </div>
    </section>
  );
}
