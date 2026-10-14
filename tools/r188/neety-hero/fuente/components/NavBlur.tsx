/**
 * Progressive blur + surface tint behind the sticky navbar. Driven by the `scrolled` flag from
 * StickyHeader (single scroll listener up there). Off at the very top of the page (over the
 * hero it isn't needed); fades in once scrolled so the bar reads as a consistent frosted band
 * over whatever passes underneath — light areas included, thanks to the tint.
 *
 * The blur is gated by animating the RADIUS (blur(0) → blur(Npx)), not the wrapper opacity,
 * because `backdrop-filter` ignores ancestor opacity in Chromium. The tint is a plain gradient
 * background whose opacity fades normally. Three stacked blur layers with downward-fading masks
 * give a graduated blur (strong at the top edge, gone by the bottom); the tint fades likewise.
 */
const LAYERS: { blur: number; mask: string }[] = [
  { blur: 2, mask: "linear-gradient(to bottom, #000, #000 55%, transparent)" },
  { blur: 5, mask: "linear-gradient(to bottom, #000, #000 28%, transparent 72%)" },
  { blur: 11, mask: "linear-gradient(to bottom, #000, #000 12%, transparent 46%)" },
];

// surface (#f5f7f9) tint — near-solid while the nav links pass (top ~45%), then a long eased
// fade so over gradientes de página (p.ej. /sobre-neety) el borde inferior se funde como una
// nube en vez de cortar en banda (feedback 2026-08-19). La banda va full-bleed (StickyHeader
// cancela el padding del main), así tampoco quedan esquinas ni paredes visibles.
const TINT =
  "linear-gradient(to bottom, rgba(245,247,249,0.92) 0%, rgba(245,247,249,0.9) 45%, rgba(245,247,249,0.68) 62%, rgba(245,247,249,0.4) 78%, rgba(245,247,249,0.18) 90%, rgba(245,247,249,0) 100%)";

export default function NavBlur({ scrolled }: { scrolled: boolean }) {
  return (
    /* La banda ASOMA 24/32px por encima del origen sticky (-top + altura extra): como el
       origen queda a solo 16/20px del techo (padding del main), su borde superior está
       SIEMPRE fuera del viewport, fijada o no — sin esto, el fade-out de 300ms al despegarse
       la barra enseñaba el borde como un corte blanco (feedback 2026-08-19). */
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 -top-6 -z-10 h-30 md:-top-8 md:h-40"
    >
      {LAYERS.map(({ blur, mask }, i) => {
        const filter = `blur(${scrolled ? blur : 0}px)`;
        return (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              backdropFilter: filter,
              WebkitBackdropFilter: filter,
              transition:
                "backdrop-filter 300ms ease-out, -webkit-backdrop-filter 300ms ease-out",
              maskImage: mask,
              WebkitMaskImage: mask,
            }}
          />
        );
      })}
      {/* Tinte translúcido (surface) sobre el blur — hace que la barra se lea también sobre
          zonas claras y unifica el fondo del navbar en scroll. */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{ background: TINT, opacity: scrolled ? 1 : 0 }}
      />
    </div>
  );
}
