# Neety: el hero de /home, extraído para replicarlo

Extraído el 14-oct-2026 de `/Users/ericruiz/ShipStudio/neety`, rama `main` en `22dadf4` + cambios sin
commitear del working tree, que es lo que servía el dev server. En el proyecto Neety no se ha cambiado nada.

## Qué hay aquí
| archivo | qué es |
|---|---|
| `fuente/` | copia literal de los archivos del hero, con la misma ruta relativa que en el repo (tabla de abajo) |
| `capturas/hero-<w>x<h>@2x.png` | hero entero, DPR 2; en 390 incluye el subtítulo, que va debajo de la card |
| `capturas/viewport-<w>x<h>@2x.png` | el viewport tal cual, DPR 2 |
| `capturas/fondo-solo-<w>x<h>@2x.png` | solo el degradado con su máscara, recortado a la card, sin contenido |
| `medidas-1280.json`, `medidas-1440.json`, `medidas-390.json` | medidas en vivo (formato abajo) |
| `fondo.md` | capas del degradado y cómo se aplica |
| `movimiento.md` | todo lo que sigue moviéndose: punto, cinta, esqueletos, orden y tiempos |
| `movimiento-muestras-1440.json`, `movimiento-muestras-390.json` | muestreo crudo cada ~40 ms (36 s y 8 s) |

Medido con playwright-core y **Google Chrome** (`channel: 'chrome'`, headless) contra el dev server de Ship Studio
(`localhost:3159/home`), en un contexto limpio para que se viera el loader de la primera visita. Captura a ~6 s de la carga,
con el loader ya desmontado. En las capturas se han ocultado los overlays de desarrollo (indicador de Next y toolbar de Agentation).
Los scripts están en el scratchpad de la sesión de Claude; no se han guardado aquí.

## Formato de `medidas-<ancho>.json`
- `viewport`: w, h, dpr y ancho de la scrollbar (0; las scrollbars de macOS se superponen al contenido).
- `contenedor`: `main` (padding 16/20 px), **`heroCard`** (`anchoContenedor`, `max-width 1600`, radio, `--notch-w`
  resuelto), `heroSection` (padding) y el wrapper del nav fijo.
- `elementos[]`: nav, logo, `menu-link-1…5`, `nav-login`, `nav-cta`, `hamburguesa-movil`, eyebrow (+ punto, halo,
  core, texto, acento), `h1` (+ `lineas[]`: caja y texto exactos de cada línea renderizada), `h1-segunda-parte-atenuada`,
  `subtitulo` (+ líneas), `fila-ctas`, `cta-primario` (+ `partes[]`: fondo, label, punto), `cta-secundario` y la caja,
  la máscara y el stage escalado de la cinta. De cada uno: `box` {x, y, w, h **relativos a la esquina superior izquierda de la card del
  hero**, más xViewport/yViewport}, font-family, font-size, font-weight, line-height, letter-spacing,
  text-transform, color, background, border, border-radius, padding, opacity, filter, backdrop-filter, transform,
  mix-blend-mode y `text`. En desktop no existe la hamburguesa y en móvil faltan el login y el CTA del nav (`missing: true`).
- `tarjetaActiva`: índice (1 en los tres anchos), el marco frost, la tarjeta blanca y **cada fila** (título y 3 personas) con sus líneas.
- `todasLasTarjetas[]`: caja, opacity, filter y transform de las 7 en ese instante.
- `fondo[]` y `fondoWrapper`: las dos capas del degradado (una con `display:none` según el breakpoint).

## Breakpoints, y cuál de los tres viewports representa cada uno
El texto del punto 5 del encargo llegó cortado. Esto es lo que hace el hero en cada tramo y qué viewport
medido corresponde a cada uno:

| tramo | qué cambia | viewport medido |
|---|---|---|
| **< 768 (md)** | card radio 16 px, `main` p-4; nav sin enlaces, con hamburguesa plum 50×48 metida en la muesca de arriba a la derecha | **390×844** |
| **< 1024 (lg)** | layout de una columna: la cinta va debajo de los CTA (caja 310:290, máx. 400 px), sin blur en las tarjetas; el subtítulo **sale de la card** y va debajo, sobre fondo blanco; degradado móvil con muesca arriba a la derecha | 390×844 |
| **1024–1359** | 2 columnas: cinta absoluta desde x=508 hasta right-8 (`xl:right-16`), máx. 460 px; h1 `max-w 640` (560 en 1024–1199); el atenuado sigue en la misma línea | **1280×720** |
| **≥ 1360** | h1 `max-w 49rem` (784) y «qué acción tomar.» **salta a su propia línea** (`display:block`) | **1440×900** |
| **alto < 840 px** | el h1 baja de 64 a **52 px** (`--h1-cap`) y el padding superior y el hueco h1→CTA se comprimen con `svh` | afecta a **1280×720** (por eso su h1 mide 52 px) |

Por todo esto, **1440×900 es el más cercano al diseño**: h1 a su tope de 64 px, aunque los `clamp` de alto
todavía comprimen un poco. Medido: padding superior **148 px** (176 de diseño) y hueco h1→CTA **166 px** (200 de diseño).
1280×720 está en los mínimos: pt **128**, hueco **108**, h1 **52 px**. Es un portátil bajo con el hero comprimido.
Para el hero «sin comprimir» haría falta un viewport de más de ~990 px de alto en ≥1360 de ancho.

## Mapa de archivos (`fuente/<ruta>` = ruta original en `/Users/ericruiz/ShipStudio/neety/<ruta>`)
| ruta | papel en el hero |
|---|---|
| `app/(es)/home/page.tsx` | ruta /home (fina: llama a HomePage con `lang="es"`) |
| `components/pages/HomePage.tsx` | **la card del hero**: `main`, preloads, `--notch-w`, capas del degradado + máscaras, subtítulo móvil |
| `components/Hero.tsx` | **el hero**: eyebrow, h1, CTA, cinta, subtítulo de desktop (copy es/en) |
| `components/StickyHeader.tsx` | barra fija a nivel de página (h-0, encima de la card) |
| `components/NavBlur.tsx` | desenfoque y tinte de la barra al hacer scroll |
| `components/Navbar.tsx` | nav: logo, enlaces, píldora de hover, mega-menú, login, CTA |
| `components/nav-data.ts` | textos y hrefs del nav |
| `components/login-urls.ts` | URL de «Log in» |
| `components/NavCta.module.css` | animación de texto del CTA del nav |
| `components/Logo.tsx` | logotipo (SVG inline 130×32, `#2A0E2C`) |
| `components/PulsingDot.tsx` | el punto que late del eyebrow |
| `components/RequestDemoButton.tsx` | CTA «Solicitar demo» (envoltorio de PillCta) |
| `components/PillCta.tsx` + `PillCta.module.css` | la píldora: fondo, label que rueda, punto → flecha |
| `components/SignalFeed.tsx` | **la cinta de tarjetas `sf-card`** (datos, esqueletos, timeline GSAP) ⚠ tenía cambios sin commitear (Jon → Iker); se ha copiado tal cual se sirve |
| `components/MobileMenu.tsx` | hamburguesa móvil y menú a pantalla completa |
| `components/Loader.tsx` | la entrada: splash de marca de la primera visita, que emite `neety:intro-done` |
| `components/PageTransition.tsx` | `TransitionLink` (cortina entre páginas) que usan los enlaces |
| `components/RootShell.tsx` | carga de fuentes (`next/font`): Switzer local 400/500/600, Bricolage 400–700, Inter 400/500, Roboto Mono 500; gate del loader |
| `lib/i18n.ts`, `lib/i18n-client.tsx` | `copy({es,en})`, `ROUTES`, `useLang` |
| `app/globals.css` | **tokens** (`@theme`: plum #431b44, ink #2a0e2c, surface #f5f7f9…; fuentes), `.home-hero-bg(-mobile)`, estilos del `.loader` |
| `app/fonts/switzer-{400,500,600}.woff2` | Switzer autoalojada |
| `public/assets/hero-bg-v4.avif`, `hero-bg-mobile-v5.avif` | degradado con grano horneado (desktop / móvil) |
| `public/assets/hero-notch.svg`, `hero-notch-tr.svg` | máscaras de las muescas (abajo a la izquierda en desktop, arriba a la derecha en móvil) |
| `public/assets/bento-logos/{betsaide,arania,fagor-automation}.avif` | logos de empresa de las tarjetas |
| `public/assets/anim/{jon,nerea,ines}-96.jpg` | fotos de las personas de las tarjetas |
| `public/assets/anim/neety-isotipo.svg` | isotipo de la tarjeta «mensaje» |

Iconos de las tarjetas: `@phosphor-icons/react` en duotono (Buildings, Users, ThermometerHot, FireSimple,
ArrowBendUpLeft, CalendarCheck), 16 o 12 px. Animación: `gsap` + `@gsap/react`.
