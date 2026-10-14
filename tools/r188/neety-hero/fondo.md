# Neety /home: el degradado del hero

Capturas del fondo solo, sin contenido: `capturas/fondo-solo-<ancho>x<alto>@2x.png` (recorte exacto a la card, DPR 2).

## Capas
El degradado **no es CSS**: es **una sola imagen horneada** (degradado + grano) por breakpoint.
No hay capas de grano superpuestas, ni blend modes ni opacidades. Todo va en la imagen.

| breakpoint | capa | asset | tamaño intrínseco |
|---|---|---|---|
| ≥ 1024 px (lg) | `.home-hero-bg` | `fuente/public/assets/hero-bg-v4.avif` | 1472 × 905 (servido a 1×) |
| < 1024 px | `.home-hero-bg-mobile` | `fuente/public/assets/hero-bg-mobile-v5.avif` | 722 × 1848 (2× de 361 × 924) |

AVIF q80 con `chromaSubsampling 4:4:4` (a menos calidad se pierde el grano). Los másters (PNG de Figma con el efecto de ruido) están en
`neety/assets-src/home/` (`home-grad-3x.png`, `home-grad-mobile-3x.png`, …). No se han copiado porque pesan mucho y no se sirven.

## Cómo se aplica (valores computados en vivo)
```
card (main > div.isolate)   position:relative; isolation:isolate; max-width:1600px; margin:auto;
                            border-radius: 24px (md+) / 16px (<md)
  └ wrapper del fondo       position:absolute; inset:0; z-index:-10; overflow:hidden; border-radius igual
      └ capa                background: url(...) center / cover no-repeat
                            opacity 1 · mix-blend-mode normal · filter none
                            mask-image:  url(hero-notch.svg), linear-gradient(#000,#000)
                            mask-composite: exclude   (-webkit-: xor)   → el SVG RECORTA la muesca
```
- **Desktop**: la capa ocupa `left:-1px; right:0; top:0; bottom:-1px` (sangra 1 px para que no quede una línea fina
  de degradado en la muesca). `mask-size: var(--notch-w) auto, cover` · `mask-position: bottom left, 0 0`.
  `--notch-w = clamp(355px, min(100vw − 40px, 1600px) × 0.7, 850px)` → **850 px** en 1280 y 1440.
  La muesca (`hero-notch.svg`, viewBox 850×175) es el motivo de cuadrados encajados abajo a la izquierda. El subtítulo
  va dentro de ese hueco.
- **Móvil**: la capa ocupa `inset:-1px`. La máscara es `hero-notch-tr.svg` de **69,141 × 66,829 px** arriba a la derecha:
  es el hueco blanco donde va la hamburguesa (botón plum de 50×48 en la esquina). Abajo no hay muesca.
- `background-size: cover` + `center`: el degradado se escala con la card, independiente de la forma.
  Card medida: 1240×671,7 (1280×720) · 1400×795 (1440×900) · 358×753,1 (390×844).
- Debajo de la card, el fondo de la página es `--color-surface #f5f7f9`.
- La card de la cinta de tarjetas es un frost: `rgba(67,27,68,.1)` + `backdrop-filter: blur(20px)` (solo lg) sobre este degradado.
- Se precarga con `<link rel=preload as=image media=…>` en `HomePage.tsx` porque es el LCP.
