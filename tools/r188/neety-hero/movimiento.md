# Neety /home: lo que sigue moviéndose tras la entrada

Fuentes: el código (`fuente/components/SignalFeed.tsx`, `PulsingDot.tsx`, `Loader.tsx`) y un muestreo
en vivo con Chrome real cada ~40 ms (`movimiento-muestras-1440.json`: 36 s a 1440×900;
`movimiento-muestras-390.json`: 8 s a 390×844). Los tiempos medidos coinciden con los del código
con un margen de ±1 frame.

## 0. La entrada (una sola vez por sesión)

En la primera visita de la sesión se monta un **Loader** a pantalla completa. Los tiempos van desde que arranca su timeline:

| t | qué pasa |
|---|---|
| 0,35 s | el isotipo aparece centrado (opacity 0→1, 0,45 s, power2.out) |
| 1,0 s | el isotipo se desplaza a su sitio (x → 0, 0,6 s, power3.inOut) |
| 1,25 s | las letras aparecen (opacity 0→1, 0,5 s, power2.out) |
| 2,1 s | fade-out de todo el loader (autoAlpha 1→0, 0,6 s, power2.inOut) + evento `neety:intro-done` |
| 2,7 s | hero completamente visible |

El hero **no tiene animación de entrada propia**: el atributo `data-reveal` está en el JSX, pero ningún
código lo usa. Debajo del loader el hero ya está pintado, en su estado final. Lo único que se
sincroniza es la cinta de tarjetas, que espera a `neety:intro-done`; medido: el evento llega a los 2181 ms y
la cinta arranca a los 2265 ms (+0,1 s de offset del timeline). Fallback: si el evento no llega, arranca sola a los 5 s.
En las visitas siguientes no hay loader y la cinta arranca al montar.

## 1. El punto del eyebrow (`PulsingDot`, size 4)

- **Punto**: Ø 4 px, `#431b44`. GSAP `scale 1 → 1.35`.
- **Halo**: disco del mismo tamaño detrás, `rgba(67,27,68,0.35)`. GSAP `scale 1 → 3` + `opacity 1 → 0`.
- Los dos van a la vez: `duration 1.2 s`, `ease sine.inOut`, `repeat -1`, `yoyo` →
  **periodo completo 2,4 s** (1,2 s abriendo y 1,2 s cerrando). Picos medidos: 1247, 3665, 6065, 8465… ms (Δ ≈ 2400 ms).
- Halo en el máximo = 4 × 3 = 12 px de diámetro, ya transparente. En el mínimo coincide con el punto y está a opacidad
  1 (del 0,35 de su color).
- Con `prefers-reduced-motion` queda quieto.

## 2. La cinta de tarjetas (`SignalFeed`)

### Geometría
- Se diseña en un lienzo fijo de **408 × 760 px** (el «stage») que se escala entero, sin reflujo:
  `scale = anchoCaja / 408`. Medido: **1,12745** en 1280 y 1440 (caja de 460 px); **0,79902** en 390 (caja de 326 px).
- El stage además se traslada para que la «zona activa» (y = 0,4 × 760 = **304 px de diseño**) caiga
  al **28 %** del alto de la caja en desktop (≥1024) o al **46 %** en móvil. Medido: `translateY(-102.8px)`
  en desktop y `-102.6px` en 390.
- Hay 7 tarjetas apiladas en columna con `gap 12px`. `offsetTop` / alto en px de diseño:

| # | tarjeta | top | alto |
|---|---|---|---|
| 0 | Neety encontró empresas que encajan | 0 | 232 |
| 1 | 3 personas clave encontradas | 244 | 256 |
| 2 | Iker empieza a activarse | 512 | 179 |
| 3 | Señal: Betsaide cerró una ronda de financiación | 703 | 102 |
| 4 | Neety te preparó el mensaje | 817 | 196 |
| 5 | Iker respondió: «Me interesa, hablemos» | 1025 | 96 |
| 6 | Reunión agendada | 1133 | 94 |

  Tras la 6 hay un hueco vacío de 340 px, para que el bucle separe la última de la primera.
- Máscara de la caja: `linear-gradient(to bottom, transparent, #000 14%, #000 72%, transparent)` en desktop y
  `… #000 10%, #000 82% …` en móvil.

### Profundidad por distancia (se recalcula en cada frame, `gsap.ticker`)
```
d = clamp( (|centroTarjeta − 304| − 26) / (244 × 0.8) , 0, 1 )    // px de diseño
opacity = 1 − 0.72·d          → 1 (activa) … 0.28 (lejos)
filter  = blur(5·d px)        → 0 … 5 px   (SOLO ≥1024 px; en móvil sin blur)
scale   = 1 − 0.05·d          → 1 … 0.95
```
Valores medidos con la cinta parada:

- Activa: `[opacity 1, blur 0, scale 1]`.
- Tarjetas lejanas: `[0.28, 5px, 0.95]`.
- Vecinas intermedias: por ejemplo `[0.533, 3.24px, 0.968]` o `[0.568, 3px, 0.97]`.
- Cuando la activa es la 5 o la 6, la tarjeta pequeña de al lado queda casi activa:
  `[0.963, 0.26px, 0.997]`.

En 390 los mismos valores, pero el blur siempre es 0.

### Esqueleto → contenido
- Cada tarjeta lleva un **esqueleto** con su misma forma (barras `rgba(67,27,68,.055)` y chips
  `rgba(67,27,68,.07)` con la `animate-pulse` de Tailwind: opacity 1→0,5→1, 2 s, cubic-bezier(.4,0,.6,1), infinito).
- Tarjetas **por debajo** de la activa: esqueleto visible (opacity 1) y contenido oculto.
- Tarjetas **por encima** (ya vistas): contenido completo y esqueleto a 0.
- Al aparcar una tarjeta en la zona activa (t = llegada):
  - **t − 0,12 s**: el esqueleto se funde (opacity → 0, 0,3 s, power1.out) y el título (`.sf-head`) aparece
    (opacity 0→1, 0,2 s, power1.out, sin desplazamiento).
  - **t − 0,12 s**: las filas (`.sf-in`) entran **desde `{opacity 0, y +18px, scale 0.92}` hasta `{1, 0, 1}`**,
    0,55 s, `power3.out`, con un stagger de 0,1 s (0,12 en las tarjetas 3 y 4; 0,14 en la 5 y la 6).
  - Las píldoras (`.sf-pop`: «Templado», «Hot», «18 Jun») hacen `{opacity 0, scale 0.5} → {1, 1}` en 0,5 s con
    `back.out(2)`, +0,2 s (tarjeta 2) o +0,5 s (tarjetas 3 y 6).
  - **Tarjeta 1**: el resaltado azul de la primera persona aparece (opacity 0→1, 0,5 s) a +0,7 s.
  - **Tarjeta 2**: la línea vertical crece (`scaleY 0→1`, 1,29 s, power2.inOut) desde +0,35 s. Las 3 acciones
    entran `{opacity 0, y 8} → {1, 0}` en 0,45 s y los puntos `scale 0→1` con `back.out(2.4)`, con un
    stagger de 0,42 s.
  - **Tarjeta 4**: el mensaje se **teclea letra a letra** desde t + 0,75 s (139 caracteres; entre 14 y 30 ms por letra,
    +8 ms en los espacios, +70 ms en las comas, +130 ms en `.?!`). El caret parpadea con `steps(1)` cada 0,45 s.
    Al terminar, el botón «Aprobar y enviar» hace un pulso `scale 0.95` (0,11 s yoyo) y pasa a «Enviado ✓»
    (verde `#0a935c` sobre `rgba(11,183,131,.15)`, 0,18–0,28 s).

### Orden y ritmo (medido; t = 0 cuando arranca la cinta)
Cada paso sube la cinta lo justo para centrar la siguiente tarjeta en la zona activa
(`y = 304 − (top + alto/2)`). Desplazamientos en px de diseño (en pantalla, × 1,127 en desktop o × 0,799 en móvil):

| paso | movimiento | dura | Δy (diseño) | parada después |
|---|---|---|---|---|
| entra la 0 | 0,00–0,50 s | 0,5 s power2.**out** | −380 (sube desde 0,5 × 760 por debajo) | 2,15 s |
| → 1 | 2,65–3,35 s | 0,7 s power2.inOut | −256 | 2,45 s |
| → 2 | 5,80–6,50 s | 0,7 s | −229,5 | 2,90 s |
| → 3 | 9,40–10,10 s | 0,7 s | −152,5 | 2,35 s |
| → 4 | 12,45–13,15 s | 0,7 s | −143 | **6,75 s** (tecleo) |
| → 5 | 19,90–20,60 s | 0,7 s | −140 | 2,25 s |
| → 6 | 22,85–23,55 s | 0,7 s | −107 | 2,35 s |
| salida | 25,90–26,40 s | 0,5 s power2.**in** | −418 (0,55 × 760, sale por arriba) | 0,12 s vacío |
| reinicio | **26,60 s** | — | salta a +568 (bajo la máscara) y vuelve a entrar la 0 | — |

**Ciclo completo: 26,6 s** (`repeat: -1`; antes de cada vuelta se resetean el tecleo, el botón y el set de «vistas»).
Valores de `y` de la cinta en cada parada: 568 (en espera) → 188 → −68 → −297,5 → −450 → −593 → −733 → −840 → −1258.

### En el estado de las capturas (~6 s tras cargar)
La cinta lleva unos 3,8 s: la **tarjeta 1 («3 personas clave encontradas»)** está aparcada y activa, con el
contenido completo. La 0 está encima, ya vista (0,28 / blur 5 / 0,95), y la 2 está debajo, en esqueleto. Lo mismo en los tres anchos.

## 3. Otros movimientos (solo con interacción, no en reposo)
- CTA «Solicitar demo» (`PillCta.module.css`): en hover, el label sube y una copia entra desde abajo (0,55 s,
  `cubic-bezier(.32,.72,0,1)`) y el punto da paso a una flecha. En `:active`, `scale(.955)` con un easing elástico.
- CTA del nav (`NavCta.module.css`): el mismo cambio de texto, sin punto.
- Enlaces del menú: una píldora blanca «líquida» sigue al hover (GSAP, en `Navbar.tsx`).
- Barra fija: `NavBlur` difumina el fondo y le da un tinte (300 ms) solo cuando la barra queda pegada al hacer scroll; en reposo arriba no se ve.
