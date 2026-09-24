## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

---

# Savvia · web 2 (desde 2026-09-21)

La web de **Savvia**, el estudio de Andoni y Eric (Donostia). Lead: Nilo. Se empezó de cero en Astro el 21/09/2026.
La biblioteca de referencias y las 81 rondas anteriores viven en `../savvia_inspo/` (su `CLAUDE.md` es el archivo histórico;
el brief de esta web está en `../savvia_inspo/docs/WEB-2-BRIEF.md`). **PUBLICADA en https://savvia.studio desde la ronda 38 (22/09/2026), con
`noindex`** (sustituye a la v58 de la web anterior). Modo revisión para Eric: https://savvia.studio/?feedback=1 (Agentation, solo escritorio).
**Publicar:** `npx astro build` → `mkdir -p dist/.vercel && cp ../savvia_inspo/dist/.vercel/project.json dist/.vercel/` (el build borra `dist/`) →
`cd dist && vercel deploy --prod --yes` (proyecto `savvia-home` de Vercel, que tiene el dominio; DNS en DonDominio → Vercel) → `node tools/verify.cjs
https://savvia.studio/`.

## Orden de trabajo (acordado)
1. Estructura y copy → 2. color y tipografía → 3. la página ENTERA maquetada y leída, sin animación → 4. UNA firma.
No empezar por el hero ni por un efecto. «Un mecanismo visual no es un concepto.»

## Sistema — manda `DESIGN.md` (guía de Andoni, 21/09/2026). LEERLO antes de tocar nada visual.
- **WEB OSCURA con detalles en claro** (21/09): base Cacao; claros solo «¿Qué es la Savvia?» (Rosa niebla) y el pie (Rosa arcilla).
  Superficies `surface-dark/light/warm`; los componentes usan `text-fg · text-fg2 · border-rule · border-rule-strong · bg-hole · text-mark`
  y `.link`, nunca un color de texto concreto.
- **Color:** Cacao · Nogal · Naranja vivo · Rosa arcilla · Rosa niebla · Iris, valores exactos, sin colores nuevos. Naranja = acción
  principal + UNA pieza (el documento `savvia.md`). **Iris = la IA, en detalles MUY sutiles**: un píxel Iris junto a la palabra (`.ia`, en el copy `[[IA]]`);
  nunca como texto, fondo ni enlace. Enlaces: subrayados, en el color del texto. Sin degradados, brillos ni sombras por defecto. Radio 8 px.
- **Tipografía:** **Family 400** titulares (hoy el archivo es la versión de PRUEBA: sin acentos ni ñ ¿ ¡ → caen a Georgia hasta comprar la
  licencia; NO escribir titulares sin tildes para esquivarlo) · **Manrope** 400/500/600 lectura e interfaz · **IBM Plex Mono 400** detalles (ronda 17; antes Geist Mono).
  API de fuentes de Astro (`astro.config.mjs`), autoalojadas. Escala: `text-h1 · h2 · h3 · lead · body · aux · ui · detail`.
- **Espaciado:** escala de Tailwind v4 (4 px) SOLO en los pasos de la guía: `1 2 3 4 6 8 12 16 24 32` (+ `14` = 56 px en móvil).
  Se comprueba con `node tools/spacing-lint.cjs`. Contenedor `wrap` (1200 + márgenes 20/32/48), `section-y` (**80→192** desde la ronda 9:
  «hay que dar más aire a cada sección»; amplía el tope de 128 de la guía por decisión de Andoni), `grid-12`
  (4 columnas en móvil), `measure` (64ch).
- **Componentes:** `.btn .btn-primary/.btn-secondary` (48 px, relleno 24, Manrope 600), `.link` (Iris subrayado), `.detail`.
- **Copy:** todo en `src/data/home.ts`. Lo marcado `falta` son datos de Andoni y Eric: no se inventan.
- **Hero (ronda 13, a prueba):** la ACUARELA del roble de Andoni (`tools/fuente-hero-r13.webp` → `tools/recorte-hero.py` → `hero-arbol.webp` +
  `hero-raices.webp`, partidas por la línea de suelo y centradas en el tronco) animada con `src/scripts/estela.ts` (franjas que llegan como
  pinceladas horizontales; rachas raras en reposo). El roble de palabras de la ronda 12 sigue en `palabras.ts`, sin uso.
  **Ronda 14:** más pequeño (`--roble-h`), nace de una GOTA de savia que cae a la base y corre por el suelo; tramado con puntos CLAROS,
  haces de LUZ diagonales sobre la copa (referencia sythera) y deriva de color lenta. Titular bajado: titular y árbol juntos abajo.
- **Ronda 15:** CARGA (`Cargador.astro`): la firma «savvia» se escribe con una gota de savia en la punta; se descuelga de la última «a» y
  cae a la base del tronco (`savvia:gota`). El árbol se DIBUJA y se PINTA con canto de papel rasgado (Shopify), cantos en SEMITONO de
  puntos (sythera), textura que HIERVE en reposo (clusia) y un halo desenfocado. MARCO: panel entre carriles del que sobresale la copa.
- **Carriles (ronda 14):** `Carriles.astro` — bordes del contenido (`wrap`) a la vista + línea y cruces «+» al empezar cada sección. Botón en la
  barra (`[data-carriles-boton]`) para quitarlos/ponerlos; se recuerda (`localStorage` «savvia-carriles»; estado del primer frame en el head).
- **Separación entre secciones del mismo color (ronda 13):** `[data-brota]` (global.css): la sección brota desde el centro de su borde superior
  con una máscara elíptica atada al scroll. Sin rayas ni ramas. `animation-timeline` va por variable (el minificador lo fundía en el atajo).
- **Hero (ronda 12):** el roble y sus raíces están hechos de PALABRAS del vocabulario de Savvia (`src/scripts/palabras.ts`, lienzo 2D; las
  palabras, en `hero.vocabulario` / `hero.vocabularioRaiz` de `home.ts`). El render 3D de la ronda 11 es el MOLDE de la forma. Cambia de
  estación solo (viran de color, caen como hojas, rebrotan). Regla dura 7: la tipografía vive en canvas (la familia se lee del h1).
- **Hero (ronda 11, ahora molde):** el roble y sus raíces son NUESTROS, en 3D: `tools/blender/roble.py` (Blender 5.2, Cycles) → una toma que se parte por la
  línea de suelo en `public/media/roble3d-arbol.webp` (hero) y `roble3d-raices.webp` (Raices.astro). El efecto es el TRAMADO ordenado de
  `src/scripts/tramado.ts` (Bayer 8×8): textura de estampa y forma de CRECER (se imprime punto a punto). Tamaño único: `--roble-h/--roble-w`.
- **Hero (ronda 10, composición que sigue):** FONDO PLANO; el roble de pie sobre una línea (cartel «keep it clean»), raíces FUERA del hero.
  Las láminas sobre blanco se recortan con `node tools/tinta.cjs <lámina> <salida.webp> 1800 color <fracción de alto>` (modo `tinta` = una sola
  tinta, el de la ronda 9, ya sin uso). Vuelve a no haber ningún degradado en la web.
- **Logotipo (ronda 10):** `public/savvia-logo.svg` (de Andoni, blanco; la v v es caligráfica). El favicon sigue siendo provisional.
- **Transiciones (rondas 9 y 11):** `src/scripts/entradas.ts`: `data-entra` en titulares (palabras que suben desde una máscara), `data-enfoca` en
  bloques (de fuera de foco a nítido) y **`data-sube` en TODA sección que cambia de color**: la transición líquida de la web anterior (la que
  llega asoma como una gota por el centro, se ensancha y lo ocupa todo). Hoy: La Savvia, Proyectos y el pie.
- **Subtítulos (ronda 11):** regular y Rosa niebla al 60 % (`--fg2` en oscuro). **Fondo:** grano muy fino (`public/media/grano.png`) en todas las superficies.
- **Cristal (ronda 11):** la interfaz sobre la escena de Proyectos (lista, ficha, barra de iconos) va en cristal estilo Apple (desenfoque + velo Cacao + filo).
- **Provisional:** el favicon (las dos v antiguas recoloreadas) hasta recibir el símbolo.
- **RONDA 19 (lo que queda fijo):** el GRANO va en `html` (`background-color`, no el atajo `background`, que lo borraba en toda sección sin superficie).
  Subtítulos: `text-lead` = 20 px fijos (solo el hero) · `text-sub` = 18 px (los de sección). CARGA: la arranca el visitante MANTENIENDO PULSADO
  (la gotita se llena); «sa  ia» aparece y las v las dibuja la gota a su paso (logotipo INLINE, `Cargador.astro`). PROYECTOS: dentro del monitor va la
  WEB REAL en `<iframe>` (1440 px reducido con `transform: scale`; solo la activa; Neety enseña captura porque manda `x-frame-options`); las láminas
  de la mesa son las NUEVAS de Andoni (1672×941; pantalla left 39,18 · top 37,08 · 21,48 × 20,85 %); las estaciones viven bajo el (+) (abanico gooey).
  `Tronco.astro` (nueva, antes de La Savvia): la ventana en la pared con la CORTEZA (shader, paralaje). `Pie.astro`: el logotipo a todo el ancho que
  se LLENA DE SAVIA con el scroll. «Otros trabajos»: vídeo real de cada web al pasar (`tools/grabar-otros.cjs` → `public/media/anteriores/video/`),
  Remerge en el MÓVIL de la mesa y Cubbo en el iMac de la mesa de roble (pantallas en perspectiva: homografía → `matrix3d`, `--s` por JS).
  HERO: al pasar el cursor, el árbol se desdibuja y se redibuja (`ciclo()` en `estela.ts`); clic = estación siguiente. La gota de las raíces RESBALA
  por el eje de la raíz principal (`Raices.astro › data-eje`) y vive en el `<body>`.
- **RONDA 20 (lo que queda fijo):** la CARGA la arranca el visitante DIBUJANDO UN CÍRCULO con el ratón o el dedo (espacio/intro también; «saltar»,
  rueda o Escape la saltan) y las v se dibujan con la PLUMADA de la gota (máscara de trazo con `stroke-dashoffset`, no un frente en x). Estaciones del
  árbol con verdes de verdad y copa raleada en invierno (`est` es vec4) + rótulo mono al pasar. En Proyectos el SONIDO es la quinta gota del (+); sentarse
  y levantarse son un DOLLY de cámara de 1,5 s (`.escena.dolly`); sobre la escena la barra va en claro sin mezcla (`html.sobre-escena`). Cubbo vuelve a la
  mancha con degradado; el relevo de logotipos es un BARRIDO con filo de savia (`clip-path`). `Pie.astro`: ILUSTRACIÓN de Andoni en tres capas con
  paralaje (`public/media/pie/`). `Tronco.astro`: la CORTEZA REAL (`public/media/corteza.webp`), la sombra de la mano al entrar y TALLAR arrastrando
  (lienzo pegado a la corteza; «borrar»). Atributos de pista renombrados (`data-carga-pista`, `data-tronco-pista`): `data-pista` es solo Proyectos.
- **RONDA 21 (lo que queda fijo):** la sección del TRONCO se va (componente borrado; en el backup r20). El (+) y sus gotas son CÍRCULOS DE CRISTAL
  translúcidos (velo Cacao 52 % + desenfoque de fondo + filo; icono Rosa niebla; pulsado = Rosa niebla con icono Cacao), sin píldora; la capa
  líquida del gooey va al 22 %. Al levantarse, `html.estudio-sentado` se quita cuando la cámara se posa (1,5 s) y el botón del menú ignora clics
  1,6 s (`window.__levantado`). El clic en el árbol VIRA el color (interpolación del uniform `est`, ~1,2 s), sin redibujar; el redibujado solo en
  la carga (`ciclo()` queda sin uso). `Pie.astro`: paisaje con PROFUNDIDAD (scroll + ratón por capa, con retraso), ESTACIONES cada 6 s (`filter`
  por capa, fundido de 2,4 s) y el LOGOTIPO sutil (Cacao al 22 %) entre montes y árboles.
- **RONDA 22 (lo que queda fijo):** el cambio de estación SE PINTA con el frente rasgado de la aparición: en el árbol, en el shader (`est` → `estB`
  con `ev`, 2,2 s desde la base); en el pie, con una MÁSCARA rasgada que se desplaza (`public/media/pie/rasgo.png`, `tools/lineas.cjs`) sobre una
  copia de cada capa (`.pint.b`). El pie se DIBUJA al llegar (líneas del grabado `*-lineas.webp` → pintura) y sube por detrás del contenido (solape
  96 px); el titular es «La [logotipo] de tu web.»; sin logotipo entre capas. En el abanico, el grupo nunca coge el puntero (solo sus botones,
  abiertos). Los logotipos de «Otros trabajos» entran y se van con BLUR. En el menú, al pasar por una opción las demás se desenfocan.
- **RONDA 23 (lo que queda fijo):** el paisaje del pie lo pinta el MISMO MOTOR que el árbol (`estela.ts` con `radial`, `paisaje` y `estaciones`
  propias): un lienzo WebGL por capa (`*.webp` es la textura y el respaldo sin WebGL); `*-lineas.webp` y `rasgo.png` ya no se usan (el dibujo sale del
  shader). Llegada: el logotipo del titular se dibuja (máscara) → gota desde su rabo → salpica en el horizonte (`HORIZONTE`, 51 columnas) → cada
  lienzo pone ahí su `origen()` y crece 2,6 s. Estaciones con `renacer()` desde la base cada 6 s. El paisaje va `position: absolute` al pie, DETRÁS del
  contenido (solape 282 px a 1280); la línea mono va sobre la hierba en blanco por diferencia. El logotipo del titular mide 2,18 em de ancho
  (altura de x de Family = 0,47 em). OJO Astro: sus atributos de ámbito cuentan en la especificidad: una regla de estado (`.marca.dibuja svg`) con
  menos selectores que la base (`.titular .marca svg`) PIERDE; hay que repetir la cadena.
- **RONDA 24 (lo que queda fijo):** `gota.ts › caerRealista()` es la caída completa de una gota (cuello que se estrangula, resto, satélite, estela
  desenfocada, salpicadura): la usa el pie. El HERO carga en la estación de HOY (otoño desde el 22-sep, invierno 21-dic, primavera 21-mar, verano
  21-jun; `estela.ts › estacion(n)` la fija sin pintar) y el marco lleva «desde 2020» (abajo-izquierda) y la estación (abajo-derecha), dentro del
  recuadro. La gota de las raíces la LLEVA EL SCROLL (p = 0 al asomar la fila, 1 con su borde al 62 %). Las FAQ abren y cierran con el alto medido
  (WAAPI) y el + gira a ×. El pie mide 100 lvh, su subtítulo es «El estudio que orquesta la IA para elevar tu web.», el paisaje se solapa con el final
  del texto (padding 15 vw) y lleva un velo Rosa arcilla arriba para que se lea; sus enlaces desenfocan a los demás (`:has(:hover)`, igual en el
  menú). La BARRA sobre lo claro (La Savvia, pie) va en Cacao sin mezcla (`html.sobre-claro`, por `elementsFromPoint`); el logotipo de la barra es una
  máscara con color. La estela de Eric y Andoni es la HIERBA de la acuarela (`/media/pie/hierba.webp`), destapada a su paso, sin brisa. Navegadores:
  barra 8,6 cqh y campo 4,4 (Proyectos), 14 px y campo de 8 (Otros). «Todos los proyectos» va junto al titular, pegado a la línea, píldora que se
  llena de Naranja. La Savvia: sin subtítulo, plato sin `sticky`, solo «Ver documento» (subrayado que crece). Menú: radio 12.

- **RONDA 39 (lo que queda fijo):** ORDEN hero › dolores › proyectos destacados › nuestros proyectos › servicios › la savvia › equipo › preguntas › pie.
  Claim «Una web que crece contigo.» (el de antes, «El estudio web que orquesta la IA.», es el titular del Estudio). Se habla SIEMPRE a quien entra; la
  primera persona, solo en el Estudio. `Recorrido.astro` = los DOLORES: cuatro paradas fijadas con el scroll en escritorio (dolor · demo · respuesta, un
  hilo de savia que despierta la tarjeta; carril abajo), apiladas en móvil y con movimiento reducido; es el ÚNICO tramo fijado además de Proyectos. Raíces
  pintadas y con la estación de la web. La estación es de toda la web (`src/scripts/estacion.ts`, `--noche`). Láminas de la mesa a 1600/2560/5120 px (la de
  5120 al sentarse). Tipografía de texto a prueba: ABC Areal + ABC Areal Mono (`?tipo=antes` = Manrope + Plex). Servicios estilo Athletics (tools/ref39/).
  Voces intercaladas en «Nuestros proyectos». Producto: `Agentic.astro` («savvia agentic»).

- **RONDA 40 (lo que queda fijo):** ESTACIONES con la paleta de Andoni (`--noche` + `--arbol`; por meses; tabla en DESIGN.md); el árbol, las raíces y el
  paisaje del pie pintan la hoja en el color de la estación (`estela.ts › ESTACIONES_ARBOL`, uniform `ek`). Icono MÓRFICO de estación en la barra
  (`Nav.astro › [data-estacion-ic]`, 96 puntos en polares). Oscuro hasta Proyectos destacados; después, claro alternando niebla/arcilla; pie oscuro.
  Proyectos: «Los destacados de savvia agentic.», sin salida (pista 350 lvh), sin números (flechas; en móvil, flechas y nombre), «Ver caso de estudio +»
  → `/casos/<slug>` (páginas pendientes). Dolores: la tarjeta llega en BOCETO (`#boceto`, fotograma fijo a líneas) y cobra vida en círculo desde donde
  llega la savia; el carril es una raíz con brotes en `--arbol`. Tres voces que rotan en Nuestros proyectos (señalan su proyecto). Servicios sin
  savvia agentic, con demo al pasar. Menú y formulario se DIBUJAN (`src/scripts/dibujar.ts` + `public/media/rasgo-circulo.png`).

- **RONDA 41 (lo que queda fijo):** subtítulo del hero «Eleva tu web con criterio.». Dolores: SOLO la primera tarjeta se dibuja, al caer la gota, como el
  árbol (líneas con frente blando + pintura con canto rasgado desde el impacto); antes no existe; las otras van vivas. FLORA de las láminas de Andoni
  (`public/media/flora/`, recortadas con `tools/recorte.py`) por estación: brezo · helecho · roble con bellotas · acebo y petirrojo (flores blancas NO:
  sobre oscuro pierde los pétalos), alrededor de las tarjetas y a ras del prado del pie. Brote del carril al LLEGAR a cada parada. Proyectos: llamada
  «Desliza dentro» como la de «Sentarse» (se va con el primer gesto sobre la web: capa `[data-capta]`); navegador de cristal claro con la web por debajo.
  Voces: centradas al abrir «Nuestros proyectos», un solo nombre. Icono de vídeo en las piezas. Icono de estación relleno. Estudio en oscuro.
  Formulario: `dibujar.ts` modo `arbol` (copia filtrada a líneas + pintura rasgada). Transición líquida: 120 muestras adaptadas a la campana.

- **RONDA 42 (lo que queda fijo):** fuera la FIRMA a mano bajo los dolores. `Flora.astro`: rama de las láminas pintada con el motor del árbol (toda la lámina
  en el color de la estación, `intensidad: 2`; se dibuja al verse; se repinta al cambiar de estación), en los dolores (espera a `savvia:tarjeta`),
  junto a los testimonios, en el estudio y en las preguntas (solo escritorio). Testimonios: fila entera en MEDIO del mosaico, con flechas finas.
  Icono de vídeo = cámara, sin texto. Pie: el TIEMPO de la estación en un lienzo (otoño hojas · invierno nieve · verano sol, haz y motas · primavera
  flores que brotan); fuera las ramas de lámina del pie. «Desliza dentro» sale HACIA ARRIBA, sobre el cielo.

- **RONDA 43 (lo que queda fijo):** `Puente.astro` tras los dolores: los cuatro problemas tachados con savia + «Para eso está [savvia agentic].». Pie: hojas y nieve
  que SE POSAN y se acumulan (capa acumulada), brezo de la lámina en primavera, el rayo del hero en verano (`.luz-pie`, sigue al ratón, se apaga con el
  formulario); el formulario vuelve a SUBIR desde el paisaje (sin dibujado). Estela del estudio por estación. Preguntas = CONVERSACIÓN con Eric y Andoni
  (sugerencias + pregunta libre; contestan por turnos). Vídeos del mosaico regrabados paso a paso (`tools/grabar-paso.cjs`) y reglas del <video> en
  `:global` (set:html no lleva ámbito). Sentarse: las láminas de 5120 px se cargan al posarse la cámara y solo la visible; el viaje, en su capa y sin
  desenfoque de la barra.

## Diccionario
**La marca se escribe «savvia», SIEMPRE con s minúscula** (ronda 16), también a principio de frase y en metadatos.
**Se dice:** orquestar · criterio · elevar · desarrollo agéntico · a medida · de principio a fin · documentado · fuente de verdad ·
claridad · versatilidad · contigo · Eric y Andoni · Donostia.
**No se presume:** ni años de experiencia ni número de clientes ni «pioneros». El trabajo lo demuestra. «Desde 2020» solo como detalle
en mono en el pie.
**No se dice:** *prompt* · Madrid · treseiscero (en ningún sitio) · vibe coding · «lavado de cara» como oferta · jerga de generador.

## Rechazado — NO VOLVER (condensado de 81 rondas; el detalle, en `../savvia_inspo/CLAUDE.md`)
- Cursivas en cualquier sitio. Eyebrows encima de titulares. CTA con forma de campo de texto («parece IA»). Nada que reste seriedad
  (rebotes, ramas en letras, etiquetas torcidas: cayó tres veces).
- Una home cuyo protagonista sea un efecto (partículas, metaballs, mosaicos, pasillo 3D). Secciones con el mismo esqueleto repetido.
- Fondos de paisaje en el hero (cayó cuatro veces): el hero va sobre fondo plano. Geometría 3D en tiempo real con aspecto de juguete.
- Agua que cae, mesas y cantos; aros estampados como respuesta del agua; relevos entre dos formas (un cambio de estado es UNA masa).
- Gastar scroll en pasar proyectos (slider sí, scrub no). Proyectos «por dentro» largos en la home: corto en la home, detalle en su página.
- Textura de papel en fondos; recortes de papel sueltos (fauna, logos, kits); vector con nodos; azul pluma; Maragsa.
  **Excepción pedida por Andoni (ronda 9): las RAÍCES sí van en estilo papel recortado**, y pocas.
- De la ronda 8 (caídos en la 9): la píldora fija «Cuéntanos tu proyecto» («va fuera») y el botón del pie con ese texto; el menú a pantalla
  completa (ahora tarjeta que crece desde el botón); en los pasos, la tarjeta apilada con detalles flotando y pestañas («solo dejamos las cards»);
  las raíces a línea fina y muchas; la interfaz de Proyectos en CAJAS (paneles con fondo, contador grande, paleta con hex, botón naranja
  «Sentarse»): encima de la escena, lo mínimo; el roble en color real debajo del titular (ahora una tinta, con el tallo tras el titular).
- De la ronda 11 (caídos en la 12): el roble 3D con tramado como figura del hero («lo que más nos falta es atinar el hero»: ahora es de palabras;
  el render se queda de molde); la transición líquida con relleno PLANO (con la textura «se queda el fondo cortado»); los paneles laterales de
  Proyectos en tarjeta de cristal («me gustaban más como antes») y la lista como simple columna (ahora dial de radio sin fin); «Abrir la web» en
  la vista sentado; las demos 01, 02 y 04 del carrusel (genéricas: «que representen mejor lo que se dice»); la sección 3 como DOCUMENTO y su modo
  «guías» (ahora «receta» = sistema de ingredientes); las LÍNEAS RECTAS entre secciones (`border-t`): separadores orgánicos.
- De la ronda 12 (caídos en la 13): las RAMAS dibujadas como separador («prefiero una separación más orgánica vía animación»); la demo 02 con tres
  direcciones y un cursor («me gustaba más lo que teníamos antes»: vuelve la fusión, ahora con dos ratones); el haz que recorría el documento de la
  demo 03 (ahora savia líquida); «Cambia el titular» como orden de la demo 04 (poco: ahora traducir la web entera); la hierba de verdes saturados en
  fila («parece un pegote»); el roble de palabras en el hero (se prueba la acuarela).
- De la ronda 10 (caídos en la 11): la LÁMINA del roble generada por imagen («tenemos que dejar de usar esa imagen, no me gusta nada») y las raíces de
  papel; el número y el paso en las tarjetas del carrusel; los subtítulos en Rosa arcilla; la web del proyecto que aparecía con un fundido (ahora
  se TECLEA la dirección y carga); estación y sonido como palabras sueltas (ahora barra de iconos); la info lateral sin fondo («se lee mal»);
  el navegador esquemático (ahora Safari realista); los retratos en rectángulos Rosa arcilla.
- De la ronda 9 (caídos en la 10): el SUELO de degradado con grano en el hero («quitamos los gradientes estilo paisaje, quiero fondo plano»:
  QUINTA vez que cae un paisaje en el hero, esta vez abstracto) y, con él, el roble en una tinta con el tallo tras el titular; el píxel Iris
  del titular del hero («quitamos el puntito azul»); los CARNÉS de color en abanico con mosaico (ahora carrusel oscuro con demos, como
  Libraries.dev) y el TITULAR de esa sección («no quiero que tenga titular»); la entrada de Proyectos como lámina enmarcada que crece («tiene
  que ser mucho mejor»); sentado con zoom ×4 y paisaje desenfocado («no hacer tanto zoom para que el ordenador no se difumine»); la web del
  monitor como captura a sangre sin navegador.
- De la ronda 18 (caídos en la 19): la LUPA del hero (ronda 17: ahora el árbol se desdibuja y se redibuja al pasar); la carga que arrancaba sola
  (ahora la arranca el visitante); la gota que rodaba por el lomo de las v (ahora las dibuja: baja por el trazo y sube por el fino); la gota de las
  raíces cayendo recta desde el borde (ahora resbala por la raíz); las capturas estáticas en el monitor (ahora la web real); los cuatro botones de
  estación en fila (ahora bajo el (+)); el pie en dos columnas y línea (ahora con el logotipo que se llena); las barras de navegador de 24 px.
- De la ronda 19 (caídos en la 20): la carga por MANTENER PULSADO (ahora, un círculo); las v reveladas por un frente en x (ahora a trazo); el
  shader de corteza (ahora la foto real); el logotipo del pie que se llenaba de savia (ahora la ilustración con paralaje); Cubbo en el iMac de roble
  («lo dejamos como estaba con el fondo de gradiente»); el relevo de logotipos con fundido gooey (ahora barrido); el sonido fuera del (+).
- De la ronda 20 (caídos en la 21): la sección del tronco con la corteza («fuera»); la píldora de cristal alrededor del (+) y las gotas opacas
  («sin la card cuadrada de fuera, el estilo semitransparente de antes»); el redibujado del árbol al clicar y al pasar el cursor («solo con la
  animación de carga»).
- De la ronda 21 (caídos en la 22): el viraje de color liso de las estaciones («alguna animación chula, que parezca que se va pintando»); el
  logotipo entre las capas del pie («quitamos el logo; la savia de tu web, esa savia, que sea el logo»); el barrido de savia en los logotipos de
  Otros trabajos (ahora blur); el paisaje separado del contenido («mucho más arriba, casi solaparse»).
- De la ronda 22 (caídos en la 23): el barrido diagonal con máscara rasgada para dibujar y recolorear el pie («tal y como se dibuja el árbol», «los
  recolores como los del hero»: ahora el motor del árbol); el paisaje que solo tocaba el contenido («tiene que solaparse con el texto»); el
  logotipo del titular a 2,55 em («el mismo alto que el texto»).
- De la ronda 23 (caídos en la 24): el paisaje del pie tras TODO el texto («no tan arriba»); la gota del pie simple («mucho más realista»); la
  gota de las raíces por tiempo («que caiga con el scroll»); el círculo de la carga con WAAPI sobre atributos SVG (se colgaba en WebKit); los
  rótulos del hero fuera del recuadro y «clic para cambiar»; la mezcla por diferencia de la barra sobre lo claro (daba un azul sucio); las briznas
  dibujadas de la estela del equipo; la barra de navegador de 11 cqh y el campo de 6,6; «Todos los proyectos» debajo del mosaico con «→»; el
  subtítulo de La Savvia, su plato pegajoso y «Copiar savvia.md»; el radio 24 del menú; el pitch largo del pie.
- Iris como bloque de color bajo una palabra (21/09: «el azul, en detalles muy sutiles»). Frases de credenciales («seis años», «más de
  80 clientes»): «no queremos tener que justificarnos diciendo esas cosas».
- De la ronda 38 (caídos en la 39): el claim «El estudio web que orquesta la IA.» en el hero (pasa al Estudio); los pasos como CARRUSEL (ahora
  recorrido por dolores con el scroll); los testimonios en Servicios (ahora entre proyectos); Servicios en acordeón con lámina al lado (ahora
  lista tipo Athletics); las raíces que se componían con el scroll (ahora fijas, con la estación); «Otros trabajos» (ahora «Nuestros proyectos»);
  hablar en primera persona fuera del Estudio.
- De la ronda 39 (caídos en la 40): el claim «Una web que crece contigo.» y todo «hacer crecer tu web» (Keynote: elevar); la paleta de fondos girados
  en OKLCH (ahora la de Andoni); las etiquetas que brotaban en Servicios (ahora una demo con sentido) y savvia agentic en Servicios; «Proyectos 01/04» y
  los números del dial; «Ver la web +»; la SALIDA animada de Proyectos; la tarjeta dormida en negro (ahora boceto); cinco testimonios quietos
  intercalados (ahora tres que rotan); el paisaje del pie que rotaba de estación solo cada 6 s (ahora la estación de la web).
- De la ronda 41 (caídos en la 42): la firma a mano con colas bajo los dolores; la flora con sus colores de lámina (ahora en el color de la estación);
  los testimonios antes del mosaico; la píldora «vídeo» con texto; las ramas de lámina en el pie (lo pedido era el tiempo de cada estación); «Desliza
  dentro» hacia abajo.
- De la ronda 42 (caídos en la 43): el formulario que se dibujaba (vuelve a subir desde el paisaje); las flores dibujadas del pie («infantiles»: ahora
  brezo de la lámina); el haz dibujado en el lienzo en verano (ahora el rayo del hero); las FAQ en acordeón (ahora conversación).
- De la guía: beige/crema/marfil en vez de Rosa niebla; verde de marca; naranja apagado a terracota; Iris dominante; todos los
  colores con la misma importancia; decoración para llenar huecos.

## Guardarraíles
- `npx astro check` y `npx astro build` en verde antes de dar nada por hecho. Verificar con `node tools/verify.cjs <url>`
  (Chrome real + WebKit, 1280×720 y 390×844: consola limpia, 0 respuestas ≥ 400, desborde 0).
- Lo que deba correr en el primer frame va en `<script is:inline>` en el head. Alturas de pantalla en `lvh`/`dvh`, nunca `vh`.
- Antes de estrenar una clase o un selector global: `grep`. (En Astro los estilos de componente van acotados: usarlos.)
- No se hace commit, push ni deploy sin que Andoni lo pida (el 22/09 pidió publicar: ver receta arriba). `noindex` puesto hasta tener licencias y visto bueno.

## Registro de rondas
### Ronda 1 — 2026-09-21 · arranque en Astro
- **Andoni (textual):** «creo que quiero empezar de nuevo construyendo sobre astro. Y vamos a redefinir colores y la typo» ·
  «Titulares: Family (compraremos la typo completa) · Textos: Manrope · Detalles: Geist mono» · «me gustaría también que uses de
  referencia alguna librería para espaciados y paddings para no crear a libre albedrío».
- **Hecho:** Astro 7.3.3 + Tailwind 4.3 (integración oficial), fuentes por la API de Astro, tokens, retícula de 13 y el esqueleto de la
  home con las ocho secciones del documento de estructura y el copy afinado (426 palabras con los avisos de FALTA), en gris.
- **Medido:** `astro check` 0 errores; Chrome real y WebKit, 1280×720 y 390×844: consola limpia, 0 respuestas ≥ 400, desborde 0;
  Family, Manrope y Geist Mono cargan en los dos motores.
- **Pendiente de Andoni:** paleta; visto bueno a estructura y copy; los datos marcados FALTA; si la gota/savia de la v58 sobrevive.

### Ronda 2 — 2026-09-21 · entra la guía de diseño (color, tipo, espaciado, componentes)
- **Andoni (textual):** «perfecto esto ya me gusta más. Te voy a pasar ahora una guía de uso de colores, textos y demás.»
- **Hecho:** la guía, tal cual, en `DESIGN.md` + «Aplicación en esta web». Tokens rehechos desde ella: seis colores exactos, escala
  tipográfica 72/48/32/22/18/14/16/13 fluida, espaciado 4·8·12·16·24·32·48·64·96·128 (sustituye a la escala Fibonacci de la ronda 1),
  contenedor de 1200 con márgenes 20/32/48, retícula de 12 (antes 13), radio 8, botones y enlaces de la guía. Reparto: página Rosa niebla;
  «¿Qué es la Savvia?» bloque Rosa arcilla con el documento `savvia.md` en Naranja (la pieza expresiva; su contenido es REAL: la Savvia de
  esta web) y filete naranja en el paso 03 que lo anuncia; pie Cacao con el tagline en Rosa arcilla; Iris solo en enlaces e indicador de FAQ.
  CTA pasa a «Cuéntanos tu proyecto» (ejemplo de la guía). Barra de desarrollo de Astro desactivada (salía en las capturas).
- **Medido:** contrastes de las parejas que la guía no lista (tabla en `DESIGN.md`): Iris/arcilla 3,21 e Iris/cacao 2,49 NO valen → regla.
  h1 72 px a 1280 y 44 px a 390. `spacing-lint`: todo en escala. `astro check` 0 errores. Chrome real y WebKit, 1280×720 y 390×844:
  consola limpia, 0 respuestas ≥ 400, desborde 0, las tres fuentes cargan.
- **Pendiente de Andoni:** logotipo y símbolo (la guía habla de un símbolo naranja y formas orgánicas que no tengo); si vuelven las
  etiquetas sobre titulares (la guía las presupone; se quitaron todas en la web anterior); visto bueno a estructura y copy; datos FALTA.

### Ronda 3 — 2026-09-21 · la web pasa a oscuro con detalles en claro
- **Andoni (textual):** «¿podemos hacer dark mode la web con detalles en light?»
- **Interpretación:** no es un conmutador: la web ES oscura. Los «detalles en light» tienen que significar algo, no repartirse: uno para
  la idea central (la Savvia) y otro para el cierre.
- **Hecho:** tokens semánticos por superficie (`surface-dark/light/warm` → `fg · fg2 · rule · link · mark · hole`); base Cacao con texto Rosa
  niebla y secundario Rosa arcilla; «¿Qué es la Savvia?» en Rosa niebla con el documento Naranja; pie en Rosa arcilla; Iris solo dentro de
  lo claro; botón principal en Cacao sobre arcilla (Naranja/arcilla = 1,48:1). `theme-color` y `color-scheme` a oscuro.
- **Medido:** `astro check` 0 errores; `spacing-lint` en escala; Chrome real y WebKit, 1280×720 y 390×844: consola limpia, 0 respuestas
  ≥ 400, desborde 0. Parejas en uso: niebla/cacao 11,89 · arcilla/cacao 7,97 · cacao/niebla 11,89 · nogal/niebla 6,94 · cacao/arcilla 7,97 ·
  nogal/arcilla 4,65 · cacao/naranja 5,39.
- **Pendiente de Andoni:** si los dos claros son esos (alternativa: pie oscuro y solo UNA ventana clara); logotipo y símbolo; etiquetas sobre
  titulares; estructura y copy; datos FALTA.

### Ronda 4 — 2026-09-21 · Iris pasa a significar «la IA»
- **Andoni (textual):** «me gustaría usar el azul para detalles de IA».
- **Hecho:** clase `.ia` (bloque Iris, texto Rosa niebla, radio 8) y marca `[[…]]` en `src/data/home.ts` (`src/lib/rich.ts`). Tres usos:
  «orquesta la IA» (h1), «habla con la IA» (paso 04) y «la IA entiende» (la Savvia). Iris sale de enlaces e indicadores para no diluirse.
- **Medido:** Rosa niebla / Iris 4,78:1 (la pareja de la guía). Chrome real y WebKit, 1280×720 y 390×844: consola limpia, 0 ≥ 400, desborde 0.
- **Pendiente:** dónde más vive el detalle de IA cuando haya contenido real (p. ej. «hecho con desarrollo agéntico» en cada proyecto nuevo).

### Ronda 5 — 2026-09-21 · el azul, mínimo; y la experiencia no se dice
- **Andoni (textual):** «el azul lo usaremos en detalles muy sutiles» · «lo de que llevamos 6 años haciendo web tampoco lo queremos decir
  explícitamente, que sea algo muy sutil en algún lado tipo desde 2020 o que se sobreentienda con la propia web. Queremos que nuestro
  trabajo ya justifique esa experiencia, no queremos tener que justificarnos diciendo esas cosas».
- **Hecho:** `.ia` deja de ser un bloque Iris y pasa a ser un píxel Iris en el hueco superior derecho de la «A» (dos usos: h1 y «la IA
  entiende»). Copy: fuera «Y seis años de oficio antes» + «Más de 80 clientes desde 2020» → «Trabajo anterior.» con los nombres de cliente
  como lista tipográfica, sin cifras; «Eric y Andoni. Los dos en cada web.» y texto sin años ni recuentos; «desde 2020» solo en la línea
  mono del pie.
- **Fallos propios cazados mirando:** el píxel, primero, caía justo encima del punto final (se leía «IA:»); como superíndice con ancho,
  separaba la palabra del punto. Solución: sin ancho, dentro de la caja de la «A».
- **Medido:** ver verificación de la ronda (Chrome real y WebKit, 1280×720 y 390×844).

### Ronda 6 — 2026-09-21 · la historia (método + savia), vuelve el roble y los proyectos se navegan dentro del ordenador
- **Andoni (textual):** «me gustaría conservar la estructura […] donde nos centramos en responder las preguntas a los clientes. Creo que lo que
  más encaja con eso es la 2 con la 3. Tenemos que crear algo memorable que la gente recuerde» · «me sigue tirando la idea de tener un árbol
  en el hero pero es muy importante que lo importante del hero sea el titular, el árbol nace de la savvia y no quita protagonismo al titular,
  sino que indica que la savvia hace florecer. El árbol tiene que ser un Roble pedunculado que es típico del País Vasco. Luego de ese roble
  nacen raíces que nos llevan a la segunda sección. En los proyectos me gustaría mostrarlos dentro de un ordenador y que puedas navegar en
  ellos. El mockup […] quiero que cambien de estación. Y luego quiero que tenga sonido esta sección. También importante que muestre
  información estilo como lo hace aquí: https://huyml.co/».
- **Historia acordada:** el MÉTODO (conversación → decisión → documento → web viva) contado con la imagen de LA SAVIA (lo que corre por
  dentro y mantiene viva la web = la Savvia). La estructura por preguntas del visitante se conserva.
- **Referencia medida (huyml.co):** una sola pantalla fija; la pieza en el centro; a la derecha la lista de proyectos (categoría · NOMBRE ·
  raya · una frase), el activo a plena tinta y el resto retirado; a la izquierda los hechos del activo (equipo, rol, lanzamiento), que se
  desenfocan al cambiar; contador grande «05 /19»; muestras de color; conmutador «Audio Off —»; 5 elementos de audio.
- **Hecho — sección Proyectos (`src/components/Proyectos.astro`, `src/scripts/sonido-estudio.ts`):** la escena de la mesa de Andoni
  (4 láminas sacadas de `~/Desktop/savvia-estaciones-web.mp4`, 1920×1080 → `public/media/estudio/`), con la pantalla del monitor MEDIDA
  (left 39,219 % · top 37,130 % · 21,406 × 20,926 %) y dentro la web de cada proyecto (captura completa a 1100 px, `public/media/proyectos/`).
  **Cada proyecto trae su estación** (Multiverse invierno · Playground primavera · Neety otoño · Zernio verano): al cambiar de proyecto
  cambia el paisaje (fundido 1,6 s) y el ambiente sonoro. Se cambia con la lista, ← → o clic: NUNCA con el scroll de la página.
  **«Sentarse y navegar»:** el escenario pasa a ocupar la pantalla (FLIP), la cámara se acerca al monitor, el paisaje pierde foco, el marco
  del monitor se redibuja nítido y dentro se hace scroll por la web; Esc o «Levantarse» sale; el scroll de la página se bloquea mientras.
  Información como huyml: contador y hechos a la izquierda (se enfocan al cambiar), lista a la derecha.
  **Sonido** (apagado por defecto, nace con el clic en «Sonido», se recuerda): ambiente sintetizado por estación oído a través del cristal
  (brisa + pájaros · aire cálido + chicharra · rachas + hojas · viento sordo) y efectos: doble clic de «encajado» al cambiar, peso al
  sentarse. Calla fuera de pantalla. Pico del ambiente 0,05. Sondas `window.__sfxCount()` y `window.__sonido()`.
- **Medido (`node tools/estudio-test.cjs`, Chrome real y WebKit a 1280×720, Chrome a 390×844):** consola limpia, 0 respuestas ≥ 400,
  desborde 0; cambio de proyecto → capa, contador y web correctos; sentado: pantalla de 557 px a 1280 (286 px a 390); rueda dentro del
  monitor: 900 px dentro y 0 en la página; Esc sale y devuelve el scroll; sonido On 0,043 → Off 0,0003 a los 2,5 s (el fundido corre siempre).
- **Pendiente:** el ROBLE del hero y sus raíces (falta la lámina: ver abajo); láminas de la mesa a 4K (a 1920 la ampliación va blanda);
  en móvil la pantalla sentada es pequeña (286 px): decidir alternativa; audición del sonido con Andoni; muestras de color por proyecto
  (no se han inventado); vídeo en vez de captura para las webs con scroll animado; frases y estación de cada proyecto, por confirmar.
- **Encargo de lámina a Andoni — roble pedunculado (Quercus robur):** misma herramienta y luz que la mesa; árbol ENTERO y aislado sobre
  fondo LISO Cacao #302018 (lección de la ronda 60 anterior: fondo plano, nunca recortado sobre negro con halo); copa ancha y baja, tronco
  corto y grueso, ramas tortuosas; cuatro estaciones con el MISMO encuadre; ≥ 3000 px de alto; sin suelo ni paisaje.

### Ronda 7 — 2026-09-21 · llega el roble (y 11 láminas más), hero tipo clusia, nav tipo offmenu, raíces y la escena a pantalla completa
- **Andoni (textual, 9 puntos + `~/Downloads/savvia_euskal_nature_assets.zip` + capturas):** «te paso el árbol y voy a generar más flora y fauna
  con este estilo para tenerlo durante la web. Y te voy a ir pasando sección por sección lo que me imagino» · 1 «El hero algo muy limpio estilo
  clusia.com/about. No usemos italic nunca, es muy IA» · 2 «El nav bar algo limpio como offmenu.design. Animación incluida» · 3 los 4 pasos como
  la captura de melius (tarjeta central apilada + detalles flotando + pestañas) · 4 FAQs más humanizadas y que en la última puedas ESCRIBIR una
  pregunta y se conteste · 5 equipo = 3D de Eric y Andoni estilo arantxabarcia.com · 6 en algún punto, romper la barrera: ver las entrañas de
  cómo se diseña una web (guías) y que el usuario pueda MOVER elementos y cambiar el layout · 7 el mockup de estaciones a TODA la pantalla y
  encima: cambiar de proyecto, de estación, sentarse y la paleta de cada web (huyml) · 8 mantener las raíces hacia la segunda sección ·
  9 servicios como la captura (lista tipográfica grande, el activo a plena tinta + testimonio al lado).
- **Referencias medidas:** clusia/about = fondo marrón muy oscuro (casi nuestro Cacao), titular centrado de 64 px, nav mínima; sus imágenes son
  láminas verdes «con estelas» (de ahí sale el estilo de las de Andoni) metidas en tarjetas pequeñas sobre oscuro. offmenu = logotipo arriba-izquierda,
  arriba-derecha un punto (cambia el tema) y una REJILLA de 9 puntos (menú), y abajo-izquierda una píldora negra «Let's work together» con icono de puntos.
- **Láminas (12):** roble, rama con bellotas, helecho, brezo, acebo, flores blancas, petirrojo, rapaz, vaca pirenaica, montaña, costa, Gaztelugatxe.
  Todas 1800×1420 sobre BLANCO puro, sin alfa, recortadas de una hoja (traen trozos de las vecinas en los bordes) y **el roble viene cortado por
  arriba y por la derecha**. `tools/recorte.py`: alfa por distancia al blanco (los 10 primeros niveles son ruido: sin ese umbral quedaba un RECTÁNGULO
  fantasma sobre Cacao), masa principal, y en la zona translúcida el color se toma de la tinta opaca vecina (si no, halo pálido de pegatina).
- **Hecho:** (1) `Hero.astro`: oscuro, titular centrado, subtítulo y el roble debajo (≤ 46 lvh, nunca detrás del titular), con el TRONCO centrado
  (medido: 56,3 % del ancho de la lámina) y revelado de la raíz a la copa al cargar. (2) `Nav.astro`: «savvia» + rejilla de 9 puntos (respira al pasar;
  abierta, las diagonales forman el aspa) con `mix-blend-mode: difference`; menú a pantalla completa con enlaces en Family que entran escalonados;
  píldora naranja fija «Cuéntanos tu proyecto» con icono de puntos — abajo a la DERECHA (a la izquierda tapaba texto) y se retira sobre la escena,
  con el menú abierto y al llegar al pie. (8) `Raices.astro`: raíces a línea en Rosa arcilla, fractales (apertura constante por nivel), generadas al
  compilar con semilla, que crecen con el scroll (frente al 80 % de la pantalla) y la SAVIA naranja por dentro de la principal. (7) `Proyectos.astro`:
  la escena a 100 lvh y sangre; encima, mando (4 estaciones · Sonido · Sentarse), panel izquierdo (contador, hechos y PALETA con hex) y lista a la
  derecha (el activo con su frase). La estación se puede cambiar a mano; al cambiar de proyecto vuelve la suya. Sentado, la pantalla mide 1101×605 a 1280.
- **Fallos propios cazados mirando:** rectángulo fantasma y halo del roble (arriba); web borrosa al sentarse (la capa iba con `will-change` y Chrome la
  guardaba a 1×: fuera); la píldora tapaba el titular de la sección 2 y competía con «Sentarse».
- **Medido:** `astro check` 0 errores; `spacing-lint` en escala; Chrome real y WebKit, 1280×720 y 390×844: consola limpia, 0 ≥ 400, desborde 0;
  `tools/estudio-test.cjs`: proyecto, estación manual, sentarse, scroll dentro (900 / 0 en la página), Esc y sonido On→Off correctos en los tres.
- **PENDIENTE de los 9 puntos:** 3 (pasos tipo melius), 4 (FAQ con pregunta libre), 5 (3D de los dos: hacen falta los modelos o fotos para generarlos),
  6 (modo «entrañas»: guías + elementos que se mueven) y 9 (servicios tipográficos + testimonio).
- **Pendiente de Andoni:** el ROBLE ENTERO (el 1920×1080 que pegó en el chat, como archivo; el del zip está cortado) y, si puede, las láminas
  generadas sobre Cacao #302018 en vez de blanco (sobre oscuro el recorte siempre deja un filo claro); escena de la mesa a 4K; paletas reales.

### Ronda 8 — 2026-09-21 · pasos tipo melius, servicios tipográficos con voces, preguntas con pregunta libre y el modo «entrañas»
- **Andoni (textual):** «vale sigue con las siguientes partes y luego te voy dando feedback» (puntos 3, 4, 6 y 9 de la ronda 7; el 5 —3D de los dos— espera modelos).
- **Hecho:**
  · **3 · `Recorrido.astro`:** tarjeta central con las otras tres apiladas detrás (asoman por arriba, cada vez más estrechas), DETALLES flotando alrededor
    y pestañas Entender · Decidir · Documentar · Entregar (clic, ← →; no gasta scroll). Las láminas (bellotas, helecho, roble) van SOBRE SU BLANCO dentro
    de la tarjeta clara: ahí no hay que recortarlas. El paso 03 lleva el documento naranja. Los detalles son REALES (de cómo se ha hecho esta web):
    102 referencias fichadas, las tres tipografías, los seis colores, DESIGN.md, lo rechazado, 81 rondas, lo que se mide.
  · **9 · `Servicios.astro`:** lista tipográfica grande en Family (44→96 px): Web nueva · Evolución · Formación; el activo a plena tinta y desplegado,
    el resto al 32 %. Al lado, cinco TESTIMONIOS REALES (los de la web anterior: Isotrol, Invopop, Claudia BE, Minimum Run, Monad) con flechas, contador
    y línea de progreso (9 s; se para al pasar el cursor, fuera de pantalla y con movimiento reducido).
  · **4 · `Preguntas.astro`:** contestan «Eric y Andoni» en primera persona (respuestas PROVISIONALES de Nilo en `home.ts`), y la última fila es un campo
    «¿Tienes otra?». Se contesta por palabras clave en el navegador (exacta = 2 puntos, misma raíz = 1), con un «están escribiendo…» de 0,9 s, y la página
    DICE que no hay ninguna IA detrás. Sin respuesta escrita → lo dice y ofrece mandarla por correo con la pregunta ya puesta. Sonda `window.__preguntar()`.
  · **6 · `LaSavvia.astro` — las entrañas:** «Ver las guías» enseña las 12 columnas reales en Naranja (el Naranja es la Savvia: el sistema), numera las
    columnas y rotula cada bloque («titular · col 1–6»). Los bloques SE ARRASTRAN y encajan en la columna más cercana (y en pasos de 24 px en vertical);
    también con las flechas del teclado; «Devolver a su sitio» lo deshace. Las columnas de destino se iluminan mientras arrastras. En móvil y táctil solo
    se ven las guías (4 columnas). Sonda `window.__entranas()`.
  · **Píldora de contacto:** se retira al BAJAR y vuelve al subir (tapaba el botón «Devolver a su sitio» y texto del documento: regla dura 10).
- **Fallos propios cazados:** un comentario `//` en una línea única se comió el resto del script de Preguntas (500 en toda la página; lo cazó `astro check`);
  «¿cuánto me va a costar?» contestaba lo de los plazos («cuanto» ≈ «cuando» por raíz) → peso doble a la coincidencia exacta y fuera «cuando»;
  en móvil las tarjetas de detrás asomaban por debajo de los detalles → alto máximo.
- **Medido (`node tools/ronda8-test.cjs`, Chrome real y WebKit a 1280×720, Chrome a 390×844):** consola limpia, 0 respuestas ≥ 400, desborde 0; pestaña 3 →
  pila «2301»; arrastre del titular 310 px → col 4 y +24 px (Chrome y WebKit; en 390 no se mueve, como debe); servicio 3 abierto; voz 02; pregunta de
  precio → respuesta de precio; pregunta sin respuesta → aviso + correo.
- **Pendiente:** 5 (3D de Eric y Andoni: hacen falta los `.glb` o un retrato de cada uno para generarlos); respuestas de las FAQ y los tres servicios, por
  confirmar; visto bueno de los clientes a las citas; el roble entero y las láminas sobre Cacao; escena de la mesa a 4K.


### Ronda 9 — 2026-09-21 · nueve puntos: menú en tarjeta, el roble en una tinta, suelo de degradado, transiciones, aire, entrar en el mockup, raíces de papel y carnés
- **Andoni (textual, 9 puntos + capturas + `~/Desktop/24e32c49…_720w.mp4`):** 1 «El menú se tiene que abrir como en la captura» (offmenu: tarjeta oscura
  redondeada que sale del botón, enlaces grandes, filete y un grupo pequeño) · 2 «En el hero quiero generar un árbol que se vea igual de bonito que este
  vídeo […] Me gusta mucho cómo se sintetiza con el titular sin molestarlo» · 3 «Igual podemos integrar este estilo de gradientes simulando paisajes»
  (cartel «Tranquility»: cinta azul de aerógrafo con grano) · 4 «Tenemos que poner animaciones para transicionar a las secciones» · 5 «hay que dar más
  aire a cada sección» · 6 «los proyectos […] que parezca que entras al mockup cuando haces scroll hacia él […] la interfaz que se ve por encima mucho
  más minimalista y sutil. Lo de sentarse […] que salga una línea de la silla como indicando el elemento y que ponga sentarse. Los proyectos tienes que
  poder hacer scroll en ellos siempre, aunque no estés en vista de sentado. Y […] que en el fondo en cada estación tuviera detalles, ejemplo: otoño caen
  hojas en el paisaje pero sutil. El protagonista son los proyectos» · 7 «La segunda sección solo dejamos las cards y las raíces tienen que ser con el
  estilo papel que hicimos. Ese estilo pero que no sean tantas raíces» · 8 «Cuéntanos tu proyecto va fuera» · 9 «La segunda sección quiero unas cards con
  más personalidad. Algo como las capturas [Interface Craft Library Card] pero con nuestros colores. Importante mantener la firma de savvia a mano y que se
  extienda por todas».
- **Referencia medida (el vídeo, 720×900, 9,5 s, hoja en el scratch):** una flor en UNA SOLA tinta (azul sobre blanco) que florece despacio; foco selectivo
  (nítida en el centro, blanda en los bordes); estambres hechos de cuentas; y el TALLO baja por detrás del titular casi transparente y desenfocado: por eso
  «no lo molesta». Lo que se roba: una tinta, profundidad de campo, florecer, y el tallo pálido tras el texto. No la flor.
- **Hecho:**
  · **1 · `Nav.astro`:** el menú es una TARJETA (Rosa niebla, radio 24) que crece desde la caja del botón (recorte `inset()` animado, 0,65 s) con los
    enlaces en Family `text-h2`, filete y un grupo «Más» (Carta fundacional + correo); velo Cacao detrás (se despega también sobre lo claro); Esc
    cierra y devuelve el foco. Con la tarjeta abierta el botón deja la mezcla por diferencia (daba un verde sucio sobre niebla) y pasa a Cacao.
  · **8:** fuera la píldora fija y el botón del pie; «Hablemos» es un enlace más del menú y el correo sigue grande en el pie.
  · **2 + 3 · `Hero.astro`, `tools/tinta.cjs`, `public/media/roble-tinta.webp`:** llegó el ROBLE ENTERO (`~/Downloads/roble1.webp`, copia en
    `tools/fuentes-roble1.webp`). Se hornea en una tinta (Rosa arcilla; alfa = cobertura × luz) y un solo lienzo WebGL a todo el hero hace: crecer desde
    la base del tronco (3,4 s; lo recién llegado viene fuera de foco), profundidad de campo (16 muestras en disco; nítido en el centro de la copa, que
    respira), brisa en la copa, el tronco desvanecido al 17 % tras el titular y PROLONGADO como un tallo pálido hasta el suelo, y el SUELO: dos lomas
    oscuras contra una bruma de la misma tinta con grano de aerógrafo. La geometría es CSS (`--aw`, `--at`; el tronco al 53,75 % va al centro); el JS solo
    mide. WebGL2 con mipmaps (sin ellos la lámina reducida chispeaba). Sin WebGL queda la lámina; con movimiento reducido, un fotograma ya crecido.
  · **7 · `Raices.astro`:** 7 raíces (principal + 4 + 2) como FORMAS de papel Rosa niebla con sombra dura y rayitas desde una orilla; crecen de verdad:
    cada forma se desvela a lo largo de su eje con una máscara SVG (el eje, trazado gordo, que se dibuja con el scroll); la savia naranja por dentro.
    Nacen en la loma donde acaba el tallo (`--suelo`, que mide el hero).
  · **9 · `Recorrido.astro`:** cuatro CARNÉS en abanico (perspectiva; el que pisas o enfocas se pone de frente; en móvil, fila con snap): Rosa niebla ·
    Rosa arcilla · NARANJA (el paso 03, «Creamos tu Savvia») · Nogal. Mosaico 18×10 calculado al compilar con sharp: la lámina de cada paso PIXELADA
    (bellotas, helecho, roble) y, en el 03, los renglones de `savvia.md`. Dos tintas en serif, campos «Entregable» y «Paso» en mono, y la FIRMA «savvia»
    a mano (un trazo SVG) cuya cola llega al borde y sigue en el carné siguiente; se escribe de izquierda a derecha al entrar. Se mantiene el h2.
  · **4 · `src/scripts/entradas.ts` + `global.css`:** titulares palabra a palabra desde máscara; bloques que entran en foco; `.loma` (la sección clara y el
    pie asoman como una loma que se aplana: `animation-timeline: view()`, recto donde no exista). **5:** `--space-section` 56→128 pasa a 80→192.
  · **6 · `Proyectos.astro`:** pista sticky de 160 lvh: la escena llega como lámina enmarcada (escala .58, radio 40) y crece hasta llenar la pantalla; la
    interfaz aparece al llegar. Interfaz sin cajas: ficha abajo-izquierda (en móvil arriba), lista abajo-derecha, estación y sonido en una línea sobre la
    zona oscura de la mesa. **«Sentarse» = llamada desde la silla** (punto en el respaldo 58,7 % · 81 %, línea a 45° y la palabra; todo es el botón).
    La web del monitor se recorre SIEMPRE; se activa al MOVER el ratón por la escena (si no, un scroll de página con el cursor quieto en el centro se
    quedaba dentro del monitor). **Aire de estación** (canvas tras el cristal, nunca sobre monitor, pie ni montantes): 16 hojas en otoño, nieve, pétalos, motas.
- **Fallos propios cazados:** el servidor de desarrollo (3 h abierto) servía la hoja de estilos VIEJA del hero y el hero medía 60.994 px → reiniciar
  `astro dev` cuando un componente se reescribe entero; medía el envoltorio del titular (con su relleno) y el shader desvanecía el árbol entero → se mide
  el `h1`; el duotono Nogal→arcilla→niebla por píxel salía SOLARIZADO con filo blanco (tres intentos) → una sola tinta; sharp devuelve el gris desenfocado
  con más de un canal (rayas horizontales); la firma se leía «savrra» (v redondas) → v en pico; la llamada «Sentarse» no tenía caja (ni clic fiable ni
  anillo de foco); en móvil el mando tapaba la lista y la ficha pisaba la llamada (los dos los cazó la prueba, no el ojo); alfa con pérdida del WebP
  dejaba ver la CAJA de la lámina → alfa sin pérdida + umbral en el shader (medido: dentro y fuera de la caja, 50·33·25).
- **Medido:** `astro check` 0 errores · `astro build` OK · `spacing-lint` en escala · `tools/verify.cjs` Chrome real y WebKit, 1280×720 y 390×844:
  consola limpia, 0 respuestas ≥ 400, desborde 0 en los cuatro · WebKit pinta el shader · movimiento reducido: árbol crecido, firmas escritas, escena
  ya dentro · `tools/proy.cjs` (1280 y 390): rueda sobre el monitor sin sentarse = 300 px dentro, 0 en la página; cambio de proyecto, sentarse y Esc OK ·
  `tools/menu.cjs`: abre, Esc cierra y devuelve el foco al botón. **SIN medir:** histograma de frames del hero (16 muestras por píxel a toda pantalla) en GPU
  real y en un móvil de verdad; en headless el GL va por software.
- **Backup:** `../savvia-web.bak-r8-2026-09-21/` (src + AGENTS + DESIGN de la ronda 8).
- **Pendiente de Andoni:** si el h2 de los pasos se queda (pidió «solo las cards»); la tinta del roble (Rosa arcilla; la alternativa es Naranja, que es «la
  Savvia», pero se comería el 5–15 % de la guía); para que el árbol FLOREZCA de verdad como el vídeo hace falta un vídeo del roble (misma herramienta, fondo
  blanco liso, cámara fija): entra por el mismo shader cambiando la textura; los entregables de los carnés (Briefing · Dirección de diseño · savvia.md ·
  Web y documentación) son de Nilo; radio 24 de la tarjeta del menú y 16 de los carnés (la guía da 8 «como punto de partida»); sentado en móvil sigue
  pequeño; medir rendimiento en GPU real; los FALTA de siempre.

### Ronda 10 — 2026-09-21 · el cartel (árbol sobre línea, raíces fuera), carrusel con demos, el logotipo, entrada «desde la pantalla», navegador, interfaz a los lados y láminas en servicios
- **Andoni (textual, 8 puntos + 1 a media ronda; cartel «keep it clean» de Hakan Dinc, esquema de la interfaz, `~/Desktop/1700x1280.mp4`, `savvia_logo.svg`):**
  1 «El hero quitamos los gradientes estilo paisaje, quiero fondo plano» · 2 «quiero conseguir un efecto como el árbol que te paso. Si podemos conseguir algo
  como eso triunfo. Pero que las raíces queden fuera del hero y cuando haces scroll crezcan» · 3 «la segunda sección te paso un vídeo de cómo quiero que sea.
  No quiero que tenga titular. Quiero que las raíces vayan directamente a las cards. Y las animaciones de dentro de cada card para explicar el paso quiero que
  sea muy parecido a lo que ves en el vídeo» · 4 «Añade este logo como savvia» · 5 «te voy a mandar cómo quiero la interfaz alrededor del ordenador. Las webs en
  la pantalla tienen que quedar más realistas, como si estuvieran abiertas en el navegador, y ajustarse perfecto» · 6 «Cuando te sientas no hacer tanto zoom para
  que el ordenador no se difumine» · 7 «La entrada del mockup […] tiene que ser mucho mejor. Igual podemos mostrar el titular de antes "Lo último, con desarrollo
  agéntico." centrado y que esto parezca que se ajusta a la pantalla del ordenador y luego ya salen los proyectos» · 8 «En nuestros servicios cuando haces hover
  en cada uno que salga una imagen representativa» · (a media ronda) «quitamos el puntito azul del titular del hero».
- **Referencias medidas:** el cartel = fondo plano, árbol real centrado con mucho aire, LÍNEA negra gruesa y corta bajo el tronco, raíces debajo. El vídeo
  (Libraries.dev, 1700×1280, 60 fps; hoja en `tools/ref10/sheet.jpg`) = carrusel horizontal de tarjetas oscuras, la del centro activa y mayor, vecinas cortadas a
  los lados; dentro de cada una un escenario más oscuro con una demo EN VIVO («Border beam», «Thinking orbs» con píldoras «Agent searching… Solving… Thinking…»,
  «Gooey», «Liquid metal»); título y frase pequeños, abajo; avanza solo. El esquema = lista de proyectos a la IZQUIERDA (el activo con una raya, los demás
  retirados), el monitor en el centro y a la DERECHA dos líneas de datos + «Case study +».
- **Hecho:**
  · **1 + 2 · `Hero.astro`, `public/media/roble-color.webp`:** fondo plano; titular arriba; el roble EN SU COLOR (recorte nuevo: color des-mezclado del blanco,
    cortado al 90 % del alto, donde el tronco aún es sólido) de pie sobre una línea Rosa niebla de 4 px (62 % del ancho del árbol), a 48 px del pliegue. El ALTO del
    árbol se calcula con lo que queda de pantalla (`--ah`): la línea cae siempre dentro del primer pantallazo (medido a 1280×720, 1680×1000 y 390×844). El lienzo
    WebGL ya solo cubre la caja del árbol: crece desde la base saliendo del desenfoque y queda NÍTIDO, con brisa mínima. **`Raices.astro`:** nacen bajo la línea,
    fuera del hero, y crecen con el scroll; la principal se corrige hacia el eje y ACABA sobre la tarjeta del centro; el contenedor mide lo que el dibujo.
  · **3 · `Recorrido.astro`:** sin titular. Carrusel sin fin de 4 tarjetas oscuras (cada una vive en un hueco −2…1; la que cruza de extremo a extremo se
    teletransporta invisible y entra desde fuera), avance cada 5,2 s (se para con el cursor encima, fuera de pantalla y con movimiento reducido), flechas, teclado y
    clic en una vecina. Cuatro demos en CSS puro que calcan las del vídeo contando NUESTRO paso: 01 píldoras que llegan + orbes (escuchar, entender) · 02 dos
    direcciones que se FUNDEN en una (filtro gooey) · 03 `savvia.md` escribiéndose con un haz Naranja recorriendo el borde (`@property --giro`) · 04 la píldora de
    publicar con anillo metálico que gira y «cambio publicado ✓». Solo corre la demo activa. La firma de savvia a mano se queda como un trazo bajo la fila, de lado a lado.
  · **4 · `Nav.astro`:** `public/savvia-logo.svg`. · **9b:** `[[IA]]` fuera del h1 (queda uno: «la IA entiende»).
  · **7 · `Proyectos.astro` — entrada:** pista sticky de 250 lvh. Al llegar, la PANTALLA del ordenador llena la ventana y enseña el titular (el h2 de la sección);
    con el scroll la cámara se ALEJA (zoom exponencial, anclado al centro de la pantalla) hasta descubrir la mesa, y el titular queda del tamaño de la pantalla del
    monitor; a partir del 84 % se funde y aparece la web. El titular va FUERA de la capa escalada (se rasteriza grande y se reduce: nítido); la escena lleva
    `will-change` solo mientras entra.
  · **5:** la web va ABIERTA EN UN NAVEGADOR (semáforo + dirección con el dominio real, en unidades `cqh` de la propia pantalla) y las cuatro webs se han
    RECAPTURADO a 1440 px (`tools/capturar-webs.cjs`): la de Neety desbordaba en horizontal (1583 px) y por eso dejaba una banda vacía. Interfaz como el esquema:
    lista a la izquierda (raya en el activo), a la derecha sector · trabajo · frase · «Ver la web +»; velos laterales; estación y sonido abajo; en móvil, ficha arriba y números abajo.
  · **6:** sentado, la pantalla ocupa ~el 52 % del ancho (antes el 86 %: de ×4 a ×2,3) y NADA se desenfoca.
  · **8 · `Servicios.astro`:** una lámina de Andoni por servicio (bellotas · roble · helecho) en una tarjeta apaisada a la DERECHA del nombre que pisas, a su altura,
    con un paralaje mínimo del cursor; se abre con un recorte desde el centro. Solo con ratón.
- **Fallos propios cazados:** el árbol se salía del primer pantallazo (la línea no se veía) → alto calculado, no fijo; filo del lienzo visible (las estelas de la lámina
  llegan al canto) → bordes desvanecidos en el shader; filo BLANCO alrededor del titular dentro del monitor (subpíxeles) → el titular mide un 1,4 % más que la pantalla;
  la lámina de servicios bajo el cursor TAPABA lo que se estaba leyendo (regla dura 10) → al lado del nombre; en móvil las raíces quedaban enanas con 270 px de hueco.
- **Medido:** `astro check` 0 errores · `astro build` OK · `spacing-lint` en escala · `tools/verify.cjs` Chrome real y WebKit, 1280×720 y 390×844: consola limpia,
  0 respuestas ≥ 400, desborde 0 en los cuatro · `tools/proy.cjs` (1280 y 390): entrada en cuatro puntos, rueda sobre el monitor = 300 px dentro y 0 en la página, cambio
  de proyecto, sentarse y Esc · `tools/serv.cjs`: cada servicio enseña SU lámina · `tools/menu.cjs` OK · WebKit y movimiento reducido sin errores.
  **SIN medir:** fluidez de la entrada (capa de 1280×720 escalada ×4,8 con `will-change`) y del hero en GPU real y en un móvil de verdad.
- **Backup:** `../savvia-web.bak-r9-2026-09-21/`; las capturas antiguas de las webs, en `tools/bak-proyectos/`.
- **Pendiente de Andoni:** la línea del hero es Rosa niebla (en el cartel es negra: sobre Cacao no se vería); las cuatro demos y sus textos («Escuchando…», «Tu equipo»,
  «cambio publicado») son de Nilo; «Ver la web +» lleva a la web en vivo (no hay páginas de caso); qué lámina representa cada servicio; favicon con el símbolo nuevo;
  escena de la mesa a 4K (sentado a ×2,3 la lámina de 1920 px sigue algo blanda); rendimiento en dispositivo real; los FALTA de siempre.

### Ronda 11 — 2026-09-21 · el roble en 3D con tramado, transición líquida, teclear el proyecto, barra tipo Apple, el equipo andando y textura
- **Andoni (textual, 7 puntos + imagen de un roble con su terrón y raíces + `~/Desktop/savvia_walk_assets_for_claude.zip`):** 1 «El hero tenemos que dejar de usar esa
  imagen, no me gusta nada. Tenemos que hacer el roble nosotros en 3D junto con las raíces con el estilo de la imagen que te paso. Y además le tenemos que dar algún
  efecto chulo estilo dithering o ruido» · 2 «La segunda sección me gusta mucho pero quitaría de la card el número con el paso y haría el titular algo más grande» ·
  3 «Todos los subtítulos van en regular de peso y con un 60 % de opacidad respecto al color principal claro» · 4 «Todos los cambios de color entre secciones tienen que
  ir con una animación. La que teníamos en el anterior savvia me gustaba» · 5 «en vez de desaparecer y aparecer el primer proyecto […] que parezca que alguien typea el
  primer proyecto en la pantalla y hace una animación de cargar, y sale el proyecto. El menú inferior tiene que ser algo estilo Apple, más recogido y con iconitos. El menú
  lateral con la info de proyectos se lee mal […]. El navegador […] se tiene que ver mucho más realista» · 6 «unas imágenes de nosotros estilo 3D que van frame a frame
  […] salgamos Eric y yo a cada lado, nos juntemos al centro a medida que sale el titular y luego si haces hover en alguno […] salen nuestras descripciones» ·
  7 «Al fondo podemos darle algo de textura, tiene que ser muy sutil».
- **Decisión que deja:** la segunda sección (carrusel con demos) GUSTA («me gusta mucho»).
- **Hecho:**
  · **1 · `tools/blender/roble.py` → `Hero.astro`, `Raices.astro`, `src/scripts/tramado.ts`:** roble pedunculado generado por script (tronco en S con cuello
    ensanchado y musgo a manchas; 7 brazos tortuosos dentro de una envolvente elipsoidal; ~44.000 hojas LOBULADAS verde oliva; terrón irregular con migas y hierba;
    13 raíces maestras + 3 niveles, en cono). Cycles, cámara ORTOGRÁFICA, 1500×2249, 72 muestras, ~3 min en el Mac. Se parte por la línea de suelo (SUELO 0,53763;
    eje del tronco 0,54892). El TRAMADO (Bayer 8×8, celda de 2 px CSS, 5 niveles por canal; el canto translúcido también se trama) da la textura y hace CRECER:
    el árbol se imprime desde la base del tronco al cargar (3 s) y las raíces desde el cuello hacia abajo con el scroll. Brisa mínima en la copa.
  · **2:** tarjetas sin «01 · Entender»; titular a `text-lead`. · **3:** `--fg2` en oscuro = Rosa niebla al 60 % (5,4:1). · **7:** `public/media/grano.png` (240 px,
    motas con alfa ≤ 12 %) como fondo repetido de `html` y de las tres superficies: sin modos de mezcla ni capa fija (no cuesta al hacer scroll).
  · **4 · `entradas.ts` + `global.css`:** `data-sube` recrea la transición de la web anterior con SU misma curva (campana 1/(1+t²)^1,5 que gana alto y ancho con el
    scroll). Sustituye a `.loma`. En las tres fronteras de color: → La Savvia (claro), → Proyectos (vuelta a Cacao), → pie (Rosa arcilla).
  · **5 · `Proyectos.astro`:** al terminar de entrar, Safari abre una pestaña EN BLANCO, alguien TECLEA el dominio (46–106 ms por tecla, con cursor), la barra de
    progreso avanza a tirones y la página se descubre de arriba abajo; al cambiar de proyecto, lo mismo en rápido. SAFARI realista: semáforo, barra lateral,
    atrás/adelante, campo con candado y recarga, compartir · nueva · pestañas, y un reflejo mínimo del cristal. BARRA INFERIOR: píldora de cristal con iconos (flor, sol,
    hoja, copo | altavoz) y etiqueta al pasar. Lista y ficha en paneles de CRISTAL (se leen sobre cualquier estación).
  · **6 · `tools/andar.cjs` → `Estudio.astro`:** de cada fotograma se conserva la masa principal (varios traían un trozo del vecino), alineada por los pies, en tiras de
    5 celdas. Entran por los lados con el SCROLL; la pose sale de lo ANDADO (un paso cada 0,2 de celda: no patinan); el último 20 % frena, giran y funden a la pose final
    (a la misma escala: Eric 342/487). La descripción sale con la LÍNEA DE LLAMADA (la de «Sentarse») y el otro se retira; ratón, foco o toque. Los 7–10 de Eric venían
    CORTADOS por la derecha en el zip → se usan sus 1–4 volteados. Ya sabemos quién es quién: Andoni, camiseta gris; Eric, camisa vaquera.
- **Fallos propios cazados:** primer roble ralo y ladeado con raíces «de barba» (regla dura 1: era la FORMA → envolvente de copa, cono de raíces); la tapa de la curva del
  tronco asomaba como un pie plano (el tronco arranca dentro del terrón); una llave suelta en `global.css` tiró la página (500) al quitar `.loma`; en móvil la barra nueva
  tapaba la lista, el árbol se salía por la izquierda y la nota de Eric quedaba cortada (los tres, cazados por prueba o captura).
- **Medido:** `astro check` 0 errores · `astro build` OK · `spacing-lint` en escala · `tools/verify.cjs` Chrome real y WebKit, 1280×720 y 390×844: consola limpia,
  0 respuestas ≥ 400, desborde 0 · `tools/proy.cjs` (1280 y 390): pestaña en blanco → tecleo → carga → web; rueda dentro del monitor 300 / página 0; cambio, sentarse, Esc ·
  `tools/equipo.cjs` (1280 y 390): llegan, y al pasar por Eric se abre SOLO su nota · `tools/sube.cjs`: las tres fronteras · WebKit y movimiento reducido sin errores.
  **SIN medir:** rendimiento en GPU real (tramado del hero a DPR 2, `backdrop-filter` de los tres cristales sobre la escena).
- **Backup:** `../savvia-web.bak-r10-2026-09-21/`.
- **Pendiente de Andoni:** el roble es una primera versión (se cambia con números del script: porte, densidad, musgo, terrón; o más niveles de trama); las frases y el rol de
  cada uno (siguen FALTA); qué estación/icono por defecto; la escena de la mesa a 4K; rendimiento en dispositivo real.

### Ronda 12 — 2026-09-21 · el roble de palabras, transición con textura, dial de proyectos, puntos que se funden, demos nuevas, «la receta», vegetación a su paso y separadores orgánicos
- **Andoni (textual, 8 puntos + cartel de una flor hecha de palabras):** 1 «Lo que más nos falta es atinar el hero. Podemos hacer un roble con palabras que estén en el
  vocabulario de savvia como lo que te paso […] Y que sea animado. Que las palabras cambien de color y parezca que el árbol cambia de estación. Incluso que las palabras
  caigan como hojas. Y las raíces que salen también se construyen con palabras» · 2 «Las transiciones cuando hay textura fallan porque se queda como el fondo cortado» ·
  3 «En los proyectos los menús laterales no quiero que vayan dentro de una card. Me gustaban más como antes. El menú de la izquierda tiene que parecer […] un radio que
  puede ir hacia arriba y hacia abajo infinitamente […] que los proyectos de las esquinas se vean difuminados. Cuando te sientas me gustaría que quedase claro que con el
  escape puedes salir y tener también una (x) […] también quitar ver web de esta vista» · 4 «el menú superior cuando haces hover que se junten como gotas los puntos de las
  esquinas. Y cuando está abierta y haces hover lo mismo pero formando un x» · 5 «Las cards de la sección 2 me gusta mucho como quedan pero tenemos que hacer que las
  ilustraciones representen mejor lo que se dice en cada una siguiendo el mismo estilo. También […] una animación de entrada» · 6 «En la sección 3 ponemos savvia es la
  receta de tu web. Y en vez de un documento, ponemos un sistema. Esta sección te dejo que la repienses» · 7 «Eric y Andoni generan vegetación a su paso hasta juntarse
  y poner algo que indique que si haces hover se ve info de ellos» · 8 «No usar líneas rectas como separación entre secciones, usar algo más original».
- **Hecho:**
  · **1 · `src/scripts/palabras.ts` → `Hero.astro`, `Raices.astro`:** el render 3D es el MOLDE (alfa = dónde hay árbol; color = hoja o madera). Hoja = palabras enteras
    del vocabulario (densidad 0,4: que se LEAN); madera y raíces = trozos cortos apilados, como los tallos del cartel. Family leída del h1. Crece desde la base del tronco
    (3,4 s). ESTACIONES solas: verano (verdes del molde) → otoño (Naranja, Rosa arcilla) → invierno (el 74 % de las hojas CAE: cada una a su tiempo, con gravedad, vaivén y
    giro propio; quedan pocas y pálidas) → primavera (rebrotan claras, alguna en rosa). La ola del cambio baja por la copa. Solo se repinta mientras algo cambia. Las raíces,
    también de palabras («raíz», «briefing», «qué vendes»…), se escriben con el scroll.
  · **2:** la gota de la transición es ahora un `<div>` con el MISMO fondo que la sección que llega (color + grano) recortado con `clip-path: polygon()`.
  · **8 · `Separador.astro`:** una rama fina que ondula y echa brotes, generada con semilla y dibujada al entrar. Fuera los `border-t` de Servicios, Estudio, Preguntas y
    «Trabajo anterior».
  · **4 · `Nav.astro`:** filtro gooey en la rejilla. Cerrada + hover: las cuatro esquinas viajan al centro y se funden en una gota. Abierta + hover: se acercan lo justo
    para que la trama las una en una X continua.
  · **5 · `Recorrido.astro`:** 01 = el BRIEFING (alguien escucha; las tres preguntas del paso se contestan una a una) · 02 = TRES direcciones sobre la mesa y un cursor que
    duda, compara y elige una · 03 = `savvia.md` con el haz (se queda) · 04 = una orden escrita («Cambia el titular») y la web de arriba CAMBIA + «cambio publicado». Al
    activarse una tarjeta su demo se reinicia (se clona el nodo): todas sus piezas van a una. ENTRADA: suben desde abajo saliendo del desenfoque, la del centro primero.
  · **6 · `LaSavvia.astro`, `home.ts › laSavvia`:** «La Savvia es la receta de tu web.» Seis INGREDIENTES con sus valores reales (Color · Tipografía · Espaciado ·
    Componentes · Voz · Lo descartado) y, sobre la pieza Naranja, el PLATO: una página en miniatura que enseña qué decide cada uno (se pintan sus seis colores; se rotulan
    sus tres tipografías; una franja naranja ocupa EXACTAMENTE cada hueco con su medida; se contornean botón, enlace y tarjeta; el titular «de generador» sale tachado y
    entra el nuestro; las decisiones descartadas, tachadas). Va sola hasta que tocas un ingrediente. Sustituye al documento y al modo «guías».
  · **3 · `Proyectos.astro`:** laterales sin tarjeta (velo más hondo + sombra de texto + peso 500). EL DIAL: la lista repetida 5 veces gira sin fin (rueda, clic, flechas),
    el activo nítido en el centro, el resto pierde foco y tinta con la distancia, máscara arriba y abajo; vuelve a la copia central sin que se note. SENTADO: (x) de cristal
    arriba a la derecha + «esc para levantarte» abajo (en táctil, solo la x); fuera «Abrir la web».
  · **7 · `Estudio.astro`:** un lienzo de hierba (briznas sembradas con semilla, cuatro verdes, alguna flor) que BROTA por donde ya han pasado; aviso «Pasa el cursor por cada
    uno» (en táctil «Toca a cada uno») con punto Naranja que late, al juntarse.
- **Fallos propios cazados:** la copa empastada (densidad 0,62 → 0,4) y todas las hojas cayendo a la vez como una lámina (→ reloj propio por hoja); en la sección 3, el
  acordeón movía las filas bajo el cursor y saltaba de ingrediente (→ detalle en bloque de alto fijo) y las medidas iban a ojo (→ pseudo-elementos enganchados a los bloques
  reales); la demo 04 desincronizada (→ reinicio al activarse); en MÓVIL el dial heredaba el desplazamiento vertical y quedaba encima del monitor (lo cazó la prueba:
  rueda dentro = 0).
- **Medido:** `astro check` 0 errores · `astro build` OK · `spacing-lint` en escala · `tools/verify.cjs` Chrome real y WebKit, 1280×720 y 390×844: consola limpia, 0 respuestas
  ≥ 400, desborde 0 · `tools/proy.cjs` (1280 y 390): la rueda sobre el dial cambia de proyecto (→ Neety), rueda dentro del monitor 300 / página 0, sentarse, Esc ·
  `tools/sistema.cjs`, `tools/pasos.cjs`, `tools/equipo.cjs`, `tools/menu.cjs` OK · WebKit y movimiento reducido sin errores.
  **SIN medir:** coste del lienzo de palabras durante los pasos de estación (~900 `fillText` por frame) en un móvil real.
- **Backup:** `../savvia-web.bak-r11-2026-09-21/`.
- **Pendiente de Andoni:** el vocabulario del roble y de las raíces (salen del diccionario; se cambian en `home.ts`); ritmo de las estaciones; los textos de los ingredientes
  y la frase de entrada de la sección 3 son de Nilo; frases y rol de cada uno (FALTA); rendimiento en dispositivo real.

### Ronda 13 — 2026-09-21 · caras, ratones, savia líquida, IAs, la receta en documento, buscador en Cacao, brotar, hierba y la acuarela en el hero
- **Andoni (textual, 7 puntos + la acuarela de un roble):** 1.1 «En escuchando que salgan la cara de Eric y mía para humanizar» · 1.2 «Creamos tu savvia me gusta
  pero si podemos darle un toque savvia, como líquido o algo mejor» · 1.3 «Decidimos qué diseño encaja contigo me gustaba más lo que teníamos antes, lo único que
  le faltaba era poner los ratones nuestro y de cliente como ayudando a elegir» · 1.4 «que salgan los iconos de todas las IAs y pedirle algo más complejo que
  cambiar un titular, algo que el cliente diga hostia, esto me cuesta hacer» · 2 «Savvia es la receta de tu web: cuando terminan todos los pasos me gustaría que
  se transformase en un documento que puedes dar de comer a cualquier IA» · 3 «El desarrollo agéntico tiene un color de fondo diferente, tiene como un corte […]
  que la primera web que cargue en ese propio marrón salga un buscador que typeas la web y carga la primera. El resto están bien. Quiero que los gradientes de
  izquierda y derecha sean radiales» · 4 «Quita las ramas […] prefiero una separación más orgánica vía animación» · 5 «La hierba […] mucho más sintetizada con el
  fondo y orgánica. Ahora parece un pegote» · 6 «El hero te paso una imagen y ya veremos cómo la animamos, quiero probar» · 7 «el savvia omod firma me mola, podemos
  animarlo […] en loop. Animación sutil».
- **Hecho:**
  · **1 · `Recorrido.astro`:** 01 las caras (`public/media/equipo/cara-*.webp`, recortadas de la pose final) en la píldora, con filo Naranja en el que «habla» y
    nivel de audio · 02 vuelve la fusión gooey de la ronda 10 con DOS punteros con etiqueta (Savvia en Naranja, Tú en Rosa niebla) que cogen cada uno una
    dirección y la arrastran; «decidido juntos ✓» · 03 el marco del documento es un aro Naranja con filtro gooey: tres gotas lo recorren y lo engordan al pasar
    y abajo una gota se hincha y se descuelga · 04 fila de logotipos de 8 IAs (`src/data/ias.ts`, @lobehub/icons-static-svg, MIT; se encienden en ola al enviar)
    y la orden «Tradúcela al euskera e inglés»: la web cambia a «Donostian egina.» y «Made in Donostia.», sale el selector ES · EU · EN y «24 páginas · 3 idiomas ·
    publicada ✓». La tarjeta 04 dura 7,6 s en el carrusel. **7:** una vez escrita, la FIRMA la recorre una gota de savia (destello Naranja) cada 9 s.
  · **2 · `LaSavvia.astro`:** tras los seis ingredientes, la página del plato se aparta y se despliega `savvia.md` (la receta entera, escrita línea a línea; los
    ingredientes de la lista se encienden con su línea) con «Dáselo a cualquier IA» + los logotipos. «Ver como documento / como web» y «Copiar savvia.md» (copia
    de verdad el mismo texto). 9 s en documento y vuelve a empezar.
  · **3 · `Proyectos.astro`:** el titular-pantalla lleva el MISMO grano que la sección, contra-escalado para medir siempre 240 px (el «corte» era un Cacao plano
    contra uno con grano). Al terminar de entrar, la pantalla es una PÁGINA DE INICIO Cacao con el mismo titular al mismo tamaño relativo (el fundido no se ve);
    el titular sube, sale un buscador, se teclea el dominio, corre una carga Naranja por su filo y la página de inicio se retira dejando Safari con la web. Los
    cambios de proyecto, como antes. Velos laterales RADIALES centrados en el dial y en la ficha.
  · **4 · `global.css` `[data-brota]`:** fuera `Separador.astro`. Servicios, Estudio y Preguntas brotan desde el centro de su borde superior (máscara elíptica
    de borde blando, `animation-timeline: view()`).
  · **5 · `Estudio.astro`:** hierba en MATAS (más densas y altas hacia el centro), briznas afiladas y curvas en los tonos de la acuarela (oliva, ocre, hoja seca,
    nogal), degradado de la base a la punta, sombra baja que se come la base, lados que se desvanecen, brisa lenta y una capa corta DELANTE de los pies.
  · **6 · `Hero.astro`, `Raices.astro`, `src/scripts/estela.ts`:** la acuarela sobre Cacao (sin halo hueso) y una primera animación: el árbol se compone de abajo
    arriba con franjas que llegan como pinceladas horizontales (el lenguaje de la propia lámina); en reposo, rachas raras en la copa. Las raíces, igual, con el
    scroll. Sin la línea Rosa niebla (la lámina trae su suelo).
- **Fallos propios cazados:** el titular de la página de inicio se veía DOBLE durante el fundido (el buscador ocupaba sitio y el estreno empezaba antes de que el
  titular-pantalla se fuera → buscador absoluto y estreno a 0,965); los dos punteros acababan uno encima del otro al fundirse; la orden de la 04 se salía bajo el
  botón en móvil; la hierba nueva salía casi invisible (densidad ×2,4); la página de inicio se tragaba la rueda sobre el monitor (lo cazó `proy.cjs`: 0 dentro →
  `pointer-events: none`); `[data-brota]` no hacía nada: Lightning CSS fundía `animation-timeline` en el atajo `animation` y Chrome lo descartaba (→ variable).
- **Medido:** `astro check` 0 errores · `astro build` OK · `spacing-lint` en escala · `tools/verify.cjs` Chrome real y WebKit, 1280×720 y 390×844: consola limpia,
  0 respuestas ≥ 400, desborde 0 · `tools/proy.cjs` 1280 y 390: rueda dentro 300 / página 0, cambio, sentarse, Esc · `pasos`, `sistema` (el documento copia el
  mismo texto), `equipo`, `menu` OK · `tools/r13.cjs` / `r13b.cjs`: capturas de cada punto en Chrome 1280 y 390 y WebKit 1280 · hero a 1280×720: suelo a 672
  (48 px del pliegue). **SIN medir:** fluidez en GPU real (8 muestras por píxel en el hero; la brisa de la hierba repinta mientras se ve).
- **Backup:** `../savvia-web.bak-r12-2026-09-21/`.
- **Pendiente de Andoni:** cómo animar la acuarela (esta es la primera prueba; la lámina es de 1672 px: para pantallas grandes hace falta más resolución); si la
  orden de la 04 (traducir) es la «hostia» que buscaba o prefiere otra; los textos de la receta en documento; los FALTA de siempre.

### Ronda 14 — 2026-09-21 · el árbol nace de una gota, luz y trama clara, tarjeta 04 de campaña, ver otros proyectos sentado (y nítido), salida de Proyectos y carriles
- **Andoni (textual, en varios mensajes + `savvia-recursos/original-0ae0ba…mp4`, web «sythera»):** «el árbol del hero tiene que ser más pequeño, mimetizarse mejor
  con el fondo y parecer que se crea desde una gota de savvia. Luego estaría guay que cambiase ligeramente de color o que tuviese algún efecto estilo dittering» ·
  «en la card de Te entregamos una web que habla con la IA, que el prompt sea algo más complejo, estilo hazme esta página de marketing, y el icono de enviar el
  mensaje que sea un icono estilo IA» · «en la vista sentado de proyectos que también puedas ver otros» · «tal y como tenemos una animación de entrada a los
  proyectos destacados, tener una de salida» · «ese dittering podemos hacer que tenga un color clarito. Ahora que el árbol es más pequeño bajamos el titular y
  podemos añadir este efecto luz al árbol, y añadir los carriles que marcan los límites del contenido de la web, y que estos puedas quitarlos y ponerlos» ·
  «cuando te sientes difuminas el ordenador, déjalo nítido completamente, si eso pon un poco más de blur al fondo».
- **Referencia medida (el vídeo, 2922×2160, 5 s):** titular arriba y el árbol justo debajo; la copa se deshace en PUNTOS en los cantos; HACES DE LUZ diagonales
  desde arriba a la derecha hasta el tronco, solo sobre las hojas; carriles verticales finos en los bordes del contenido y cruces «+» donde cortan las líneas de sección.
- **Hecho:**
  · **Hero (`estela.ts`, `Hero.astro`, `global.css`):** árbol al ~70 % (a 1280×720: 519×240); una GOTA Naranja cae a la base del tronco (0,95 s), la savia corre por la
    línea de suelo y de ahí BROTA el árbol (frente radial desde el impacto, franjas horizontales cortas, lo recién llegado teñido de Naranja). Mimetizado: color
    hundido un 14 % hacia el Cacao, lo translúcido más tenue y TRAMADO Bayer 4×4 (celda 2 px) con PUNTOS CLAROS en los cantos, en la luz y en las luces de la copa.
    LUZ: tres haces diagonales que se mueven y titilan despacio, solo sobre el árbol, al terminar de brotar. Deriva de tono ±6° en ola. Reposo a ~30 fps.
    Titular BAJADO: el hueco libre va encima; titular y árbol juntos abajo (64 px entre ellos).
  · **Tarjeta 04:** orden en dos renglones «Hazme la landing de campaña / de otoño, con nuestro estilo»; se va la web de siempre, barrido «Generando…» y la landing
    se monta bloque a bloque (etiqueta, titular «Otoño, a medida.», botón Naranja, tres tarjetas); «landing nueva · 6 bloques · publicada ✓». Enviar = CHISPA de IA
    (gira y se enciende en Naranja al mandar). En móvil la tarjeta es más alta (1,62 × ancho).
  · **Proyectos (`Proyectos.astro`):** SENTADO, píldora abajo «‹ 01/04 Multiverse Computing ›» para ver los otros sin levantarse (el «esc» sube arriba). NÍTIDO:
    la pantalla y un marco de monitor en CSS (medido en la lámina: 9 px a los lados, 8 arriba y abajo) se maquetan k veces más grandes y se contra-escalan 1/k →
    escala neta 1; la foto y el aire de estación se desenfocan (4 px ×k). SALIDA: la pista pasa a 350 lvh (entrada 0–48 %, descanso, salida 58–94 %): la cámara vuelve
    a meterse en la pantalla, la interfaz se retira y la pantalla se llena del Cacao con grano; al soltarse, sigue «Trabajo anterior.» sin corte.
  · **Carriles (`Carriles.astro`, `Nav.astro`, `Base.astro`):** dos líneas en los bordes del `wrap` (a 1280: x 48 y 1231), una línea + dos cruces por sección, mezcla por
    diferencia; se trazan al cargar; botón «||» en la barra para quitarlos/ponerlos (se recuerda).
- **Fallos propios cazados:** la trama del canto dibujaba la CAJA del lienzo en puntos (alfa casi nulo → umbral 0,05); la deriva de tono viraba a magenta (±9° → ±6°);
  la luz primero no se veía y luego era un velo (haces más estrechos); la orden de la 04 se cortaba en móvil y la vista se aplastaba (flex: none + tarjeta más alta);
  `otroN` usado antes de declararse (se habría roto el script: movido arriba); las filas de los carriles las crea el JS y no llevaban el ámbito de Astro (→ :global).
- **Medido:** `astro check` 0 errores · `astro build` OK · `spacing-lint` en escala · `tools/verify.cjs` Chrome real y WebKit, 1280×720 y 390×844: consola limpia, 0 ≥ 400,
  desborde 0 · `tools/proy.cjs` 1280 y 390: rueda dentro 300 / página 0, cambio, sentarse, Esc · `tools/r14.cjs` (Chrome 1280 y 390, WebKit 1280): gota → savia → brote,
  tarjeta 04, sentado → siguiente = Playground IEP, salida en 5 puntos · sentado a DPR 2 en Chrome y WebKit: pantalla 665 px, marco 694, texto de la web nítido ·
  `tools/carriles.cjs`: se ven (7 filas), se quitan, siguen quitados al recargar, se vuelven a poner · `pasos`, `sistema`, `equipo`, `menu` OK.
  **SIN medir:** fluidez en GPU real (el hero pinta a 30 fps en reposo con luz + trama; desenfoque de la foto sentado).
- **Backup:** `../savvia-web.bak-r13-2026-09-21/`.
- **Pendiente de Andoni:** intensidad y ángulo de la luz; densidad de los puntos claros; si los carriles van también en móvil y por defecto puestos; la lámina de la
  acuarela a más resolución; los FALTA de siempre.

### Ronda 15 — 2026-09-21 · la carga con la gota, dibujo → pintura rasgada, semitono, hervor, halo y el marco
- **Andoni (textual + captura de sythera):** «podemos hacer que cuando caiga la gota tenga este efecto: shopify.com/es-es/editions/winter2026#agentic, y quiero
  que el árbol aún se mimetice mejor con el fondo y tenga el efecto de la captura que te paso. Fíjate cómo está enmarcado. Quiero eso. Y que el árbol tenga una
  animación estilo la de la flor de aquí cuando esté parado: clusia.com/about. También fíjate cómo se mimetiza con el fondo. Casi lo tenemos» · «la animación de
  carga quiero que sea como esta: off.site, pero la gota se desliza entre las letras de savvia cayendo desde la última palabra y creando el árbol».
- **Referencias medidas (Chrome real, `tools/ref15/`):** Shopify «Agentic» = la sección entra por un borde de PAPEL RASGADO y la imagen aparece primero como
  GRABADO (líneas claras) y luego pintada · sythera = árbol en un PANEL entre los carriles del que la copa sobresale, cantos en SEMITONO de puntos redondos,
  cruces «+» en las esquinas, lados a trazos · clusia = la flor es un vídeo de 2,1 s en bucle cuya textura HIERVE a saltos con destellos horizontales en los
  cantos; en la página su color sangra en el fondo con un halo muy desenfocado · off.site = pantalla lisa, el logotipo caligráfico se escribe y de su última
  letra sale un hilo que baja.
- **Hecho:**
  · **`Cargador.astro` + `src/data/firma.ts`:** velo Cacao con grano; la firma se escribe en Rosa niebla (1,9 s) con la gota Naranja en la PUNTA del trazo
    (resbala por las letras); punto de la i; la gota se hincha colgando de la «a», se descuelga y CAE (gravedad, se estira) hasta la base del tronco mientras
    el velo se abre; al tocar suelo avisa (`savvia:gota`). Se salta con clic, tecla o rueda; recarga a media página o movimiento reducido: sin carga.
  · **`estela.ts`:** DIBUJO (bordes de luminancia en claro) por delante; la PINTURA lo sigue con canto RASGADO (ruido a dos escalas) y un filo claro de fibras;
    lo recién pintado, teñido de savia. SEMITONO a 45° (celda 5 px) en los cantos, puntos algo más claros (sustituye a la trama Bayer). HERVOR a 12 saltos/s
    (celdas de 3 px que se corren un píxel) y destellos horizontales en los cantos. Se quedan la luz y la deriva de tono. Las raíces usan el mismo dibujo →
    pintura con el scroll.
  · **`Hero.astro`:** MARCO (panel Rosa niebla al 4 % sobre Cacao, con grano, entre los carriles, lados a trazos; empieza al 60 % de la copa y llega al pie;
    su fila de carriles con cruces vía `[data-carril-fila]`). HALO: el árbol desenfocado 28 px detrás, al 30 %, cuando termina de pintarse.
- **Fallos propios cazados:** una mancha Naranja con filo al pie del árbol era el frente de las RAÍCES asomando con el scroll a 0 (→ el frente arranca por
  debajo de cero); el tinte de savia teñía el árbol entero mientras crecía (→ más corto y más suave).
- **Medido:** `astro check` 0 errores · `astro build` OK · `spacing-lint` en escala · `tools/verify.cjs` Chrome real y WebKit, 1280×720 y 390×844: consola limpia,
  0 ≥ 400, desborde 0 · `tools/r15.cjs` (Chrome 1280 y 390, WebKit 1280): firma → gota → caída → dibujo → pintura → reposo; la gota se suelta y el velo desaparece ·
  `tools/carga.cjs`: movimiento reducido sin carga y con el árbol; un clic la salta · `proy` (1280 y 390), `pasos`, `sistema`, `equipo`, `menu`, `carriles` OK.
  **SIN medir:** fluidez en GPU real (el shader del hero ahora hace 9 lecturas de textura por píxel a 30 fps en reposo).
- **Backup:** NO se hizo antes de empezar (fallo de Nilo): el último previo es `../savvia-web.bak-r13-2026-09-21/` (antes de la 14). Estado al
  cerrar la 15: `../savvia-web.bak-r15-2026-09-21/`.
- **Pendiente de Andoni:** si la carga sale en cada visita o solo en la primera de la sesión (hoy: en cada carga); cuánto se ve el marco; intensidad del hervor.

### Ronda 16 — 2026-09-21 · carga con el logotipo nuevo y cámara, puntos 10 → 0 %, carriles siempre en el hero, árbol mayor y a ras del hero, tarjetas entre carriles, «savvia» en minúscula
- **Andoni (textual, en varios mensajes + la captura de sythera otra vez):** «casi lo tenemos: el árbol aún más mimetizado con el fondo, las líneas quiero que carguen
  por defecto y que en el hero se mantengan siempre. La animación de carga tiene que ser mucho más smooth y con el logo nuevo de savvia. Además tiene que caer la gota
  dibujando un poco el rastro y parecer como que el hero aparece desde abajo y al caer debajo del titular se genera el árbol. […] el fondo detrás del árbol va de color
  sólido a nada, es un gradiente. A mí me gustaría replicarlo pero con puntos que son casi del color del fondo. Nuestro color claro al 10 % y que vaya a 0 %» · «el árbol
  lo hacemos un poco más grande» · «la parte de abajo del árbol tiene que coincidir con la altura del hero para que no se vea el corte» · «el cuadrado que contiene el
  árbol también tiene que quedar más arriba y que se vea en el hero» · «las cards de la segunda sección tienen que quedar dentro de los límites de las líneas. Además las
  de los lados, en los extremos, me gustaría que pareciese que se meten en el fondo con un gradiente» · «el logo de savvia del menú lo veo muy grande» · «siempre que
  pongamos savvia que sea la s en minúscula».
- **Hecho:**
  · **`Cargador.astro` (rehecho):** un solo reloj (un rAF; solo `transform`, `mask-position` y el `d` del rastro). El LOGOTIPO nuevo se descubre de izquierda a derecha
    detrás de la gota, que RUEDA por el contorno superior de las letras (medido al compilar con sharp y suavizado). Cuelga de la última «a», engorda y CAE dejando un
    RASTRO Naranja fino; la CÁMARA baja con ella: logotipo, rastro y gota viven en un «mundo» que sube y el HERO SUBE DESDE ABAJO (`html.cargando` lo desplaza 100 lvh
    desde el <head>; salvavidas a los 8 s). La gota acelera en pantalla y la cámara se posa con curva suave en el mismo instante → `savvia:gota` → el árbol se genera
    bajo el titular; entonces aparecen la barra y se trazan los carriles. 3,7 s. Se salta con clic, tecla, rueda o dedo. Sustituye a la firma a mano de la ronda 15.
  · **Hero:** árbol mayor (a 1280×720: 640×296; antes 519×240) y su pie ES el pie del hero (sin relleno inferior; las raíces nacen pegadas, sin corte). MARCO más
    arriba y entero dentro del hero (86 % del alto del árbol: la copa sobresale un 14 %), hecho de PUNTOS Rosa niebla al 10 % en retícula a 45° que se desvanecen a 0 %
    hacia abajo (sin relleno liso); filas con cruces arriba del marco y al pie del hero. Más MIMETIZADO: color un 20 % hacia el Cacao, saturación 0,84, cobertura que
    cae hacia fuera (más árbol deshecho en semitono), alfa 0,94 y el grano de la página por encima, recortado a la forma del árbol.
  · **Carriles:** cargan SIEMPRE puestos (fuera el `localStorage`); quitados, en el HERO SE MANTIENEN (verticales recortados al alto del hero en pantalla; sus filas no se van).
  · **Tarjetas de los pasos:** la fila mide lo que el contenido (entre carriles), recorta, y una máscara funde los extremos (26 % a cada lado en escritorio, 5 % en móvil).
  · **Barra:** logotipo de 24/32 px de alto a 16/24. · **Copy:** «savvia» en minúscula en todos los textos visibles, título y descripción.
- **Fallos propios cazados:** el grano sobre el árbol dibujaba su CAJA como un rectángulo más claro (→ recortado con la propia lámina como máscara); en la tarjeta 04
  inactiva el titular nuevo CORRÍA encima del viejo (el atajo `animation` reiniciaba `animation-play-state` con más especificidad → regla de pausa con `!important`).
- **Medido:** `astro check` 0 errores · `astro build` OK · `spacing-lint` en escala · `tools/verify.cjs` Chrome real y WebKit, 1280×720 y 390×844: consola limpia, 0 ≥ 400,
  desborde 0 · `tools/r16.cjs` (Chrome 1280 y 390, WebKit 1280): logotipo → gota rueda → cae con rastro → el hero sube → árbol; al acabar, sin velo, sin `cargando`, hero
  sin transform · `tools/carriles.cjs`: 9 filas, 2 del hero; quitados quedan 2 filas y los verticales recortados a 720 px; al recargar vuelven · `tools/carga.cjs`:
  movimiento reducido sin carga; un clic la salta · `proy` (1280 y 390), `pasos`, `sistema`, `equipo`, `menu` OK.
  **SIN medir:** fluidez de la carga y del hero en GPU real y en un móvil de verdad (en headless el GL va por software).
- **Backup:** `../savvia-web.bak-r15-2026-09-21/` (estado previo a esta ronda).
- **Pendiente de Andoni:** si la carga sale en cada visita o solo una vez por sesión; duración (3,7 s); la firma a mano bajo las tarjetas sigue siendo la antigua
  (¿pasa también al logotipo nuevo?); los FALTA de siempre.

### Ronda 17 — 2026-09-21 · la gota en lágrima, marco a 40 px del subtítulo, sección 2 con aire, «Trabajo anterior» en mosaico, IBM Plex Mono, líneas fijas y huevo de pascua
- **Andoni (textual):** «La animación de carga quiero que caiga como una gota lo naranja. Luego en el hero el recuadro de detrás del árbol lo hacemos más alto, que llegue
  hasta estar a 40 px del subtítulo. La segunda sección quitamos las líneas superiores y le quiero dar más espacio por arriba y por abajo, darle más aire. Y otros
  trabajos lo quiero mostrar más estilo agencia creativa […] northmail.app, como tienen la sección "Channels designed for life's moments": así quiero mostrar los
  proyectos. Con mockups, gradientes de ese estilo. Y la mono vamos a cambiar a IBM Plex Mono. Y las líneas se quedan siempre, no se quitan. Luego al hacer hover en el
  árbol del hero pasa algo, algún easter egg».
- **Referencia medida (northmail.app, `tools/ref17/`):** titular grande arriba a la izquierda; MOSAICO asimétrico sobre 12 columnas, piezas de tamaños distintos y
  escalonadas, con mucho aire; cada pieza = imagen con el nombre GRANDE encima (arriba a la izquierda) y un pie pequeño debajo; la primera pieza es un degradado de
  aerógrafo con un icono y el texto de entrada; los teléfonos van ladeados y se salen de la pieza.
- **Hecho:**
  · **Carga:** la gota es una LÁGRIMA (cabeza redonda + cola afilada en SVG): rodando casi no tiene cola; colgando le crece hacia arriba; al caer se estira con la
    velocidad y mira hacia donde va (forma suavizada, sin saltos).
  · **Hero:** el marco vive ahora en la caja del pie y empieza a 40 px del subtítulo (medido: 40) hasta el pie del hero; el árbol, dentro, con 32 px de aire.
    **HUEVO DE PASCUA:** el cursor sobre el árbol es una LUPA que retira la pintura y deja ver el DIBUJO de debajo, con un aro de savia; un CLIC deja caer otra gota y
    el roble rebrota en la estación siguiente (otoño → invierno → primavera → verano; solo viran las hojas, la madera se queda; el halo acompaña).
  · **Sección 2:** sin fila de carriles arriba (`data-sin-fila`); aire: 64/128 px arriba (móvil/escritorio), +64 abajo y la firma a 96 px de los mandos.
  · **`Anteriores.astro` (nuevo) — «Trabajo anterior.»:** mosaico de 5 piezas + la de entrada (degradado con la gota). Cada pieza: DEGRADADO de nuestra paleta muy
    desenfocado con grano (excepción consciente a «sin degradados», pedida por Andoni; sin Iris), el nombre en Family arriba a la izquierda, el MOCKUP de Safari con la
    captura REAL (de la web anterior, `public/media/anteriores/`) ladeado y saliéndose, y pie en mono con el dominio y el sector (reales, de `casos.json`; Cubbo y
    Remerge no tienen sector y no se inventa). Enlazan a la web del cliente. Al pasar: el mockup se endereza y sube, y las manchas giran. Una columna en móvil.
  · **Tipografía:** IBM Plex Mono 400/500 (API de fuentes de Astro) sustituye a Geist Mono en config, tokens, copy de la receta y `DESIGN.md`.
  · **Carriles:** siempre puestos: fuera el botón de la barra y todo el estado de quitar/poner.
- **Fallos propios cazados:** `padding-top` duplicado en el pie del hero (mandaba el viejo); el verano salía verde neón (saturación 0,95 → 0,62); nombres ilegibles
  sobre manchas claras del mosaico (→ velo Cacao arriba de cada pieza).
- **Medido:** `astro check` 0 errores · `astro build` OK · `spacing-lint` en escala · `tools/verify.cjs` Chrome real y WebKit, 1280×720 y 390×844: consola limpia, 0 ≥ 400,
  desborde 0; IBM Plex Mono carga · `tools/r17.cjs` (Chrome 1280 y 390, WebKit 1280): subtítulo→marco 40 px; árbol 640×296 con pie en 720 = pie del hero; lupa y las
  cuatro estaciones; mosaico · `tools/carriles.cjs`: sin botón, 9 filas, ninguna en la sección 2 · `carga`, `proy` (1280 y 390), `pasos`, `sistema`, `equipo`, `menu` OK.
  **SIN medir:** fluidez en GPU real (lupa a 60 fps sobre el shader del hero; 6 desenfoques de 34 px en el mosaico).
- **Backup:** `../savvia-web.bak-r16-2026-09-21/` (estado previo).
- **Pendiente de Andoni:** la frase de entrada de «Trabajo anterior» es de Nilo; permiso de los clientes para enseñar sus webs; si el huevo de pascua se queda con
  lupa + estaciones; `/proyectos` no existe aún (el enlace «Todos los proyectos»).

### Ronda 18 — 2026-09-21 · sentado todo nítido, descanso largo en Proyectos, gota realista que salpica, la gota que despierta las tarjetas y «Otros trabajos» con marca propia
- **Andoni (textual, en varios mensajes):** «en los proyectos, cuando estás en la vista en detalle, el ordenador completo se tiene que ver bien enfocado junto con la mesa,
  el desenfoque solo tiene que ir en el paisaje» → (después) «cuando te sientas dejamos toda la imagen nítida sin nada» · «el trabajo anterior le tenemos que dar más aire
  y a todo, y no podemos usar el mismo gradiente en todos. Lo ideal sería usar en algunas imágenes un mockup con fondo realista como el que hemos puesto con estaciones.
  Tener variedad. Y que entren con alguna animación» · «La animación de salida de los proyectos me gusta pero si scrolleas demasiado te pierdes los proyectos» · «La gota
  que cae de savvia […] lo más realista posible a una gota que caiga desde savvia y salpique; quitamos la estela que deja o deja una estela muy muy sutil» · «al hacer
  scroll me gustaría que se desvelan las raíces y cae otra gota hacia las tarjetas que al caer encima de la card le da vida» · «la sección trabajo anterior, llamarla otros
  trabajos» · «los gradientes de detrás pueden ser relacionados con cada proyecto y el logo que está encima del gradiente ser los de los proyectos rotando con un efecto
  líquido de transición».
- **Hecho:**
  · **Sentado:** primero se hizo «solo el paisaje desenfocado» (copia nítida recortada + paisaje pre-desenfocado sin halos) y Andoni lo cambió a TODO NÍTIDO: se retiró
    entero (capas, recorte, láminas generadas y script). Quedan el marco de monitor en CSS y la pantalla a escala neta 1. Sentado, los carriles no se ven.
  · **Proyectos · descanso:** pista de 350 → 455 lvh: entrada 120 lvh, DESCANSO 130 lvh (antes 25), salida 90 lvh. A 1280×720 hay 946 px de scroll con los proyectos quietos.
  · **`src/scripts/gota.ts` (nuevo):** `salpicar()` (corona plana + gotitas en parábola con gravedad, en un rAF, se limpia sola) y `formaGota()` (tiembla al soltarse,
    se alarga con la velocidad). **Carga:** sin rastro dibujado; cuello solo mientras cuelga, se recoge en 120 ms, cae casi redonda con una estela de velocidad al 16 %
    como mucho y SALPICA en la base del tronco (11 gotitas).
  · **Sección 2 · la gota que da vida (`Recorrido.astro`):** las tarjetas llegan DORMIDAS (sin color, apagadas, demos paradas, carrusel quieto). Al asomar la fila al 70 %
    de la pantalla, una gota se forma en la punta de la raíz, cae, salpica en el canto de la tarjeta central y DESPIERTAN: una onda de savia recorre la central, vuelve el
    color (la central primero, luego las vecinas) y su demo arranca desde el principio. Si la página se abre ya más abajo o hay movimiento reducido: despiertas sin teatro.
  · **`Anteriores.astro` → «Otros trabajos.»:** más aire (piezas más estrechas, tres filas escalonadas con columnas vacías, 128 px entre filas, 96–128 alrededor). Tres
    tipos de pieza: ESCENA (la mesa en una estación con la web del cliente DENTRO del monitor: Invopop en otoño, Isotrol en invierno), MANCHA (navegador ladeado:
    Business Online Payroll, Cubbo) y CLARO (navegador recto cortado por abajo, nombre en Cacao: Remerge). Los DEGRADADOS salen de los colores de la web de cada
    cliente (medidos en su captura: `home.ts › anteriores[].color`). La pieza de entrada: los cinco LOGOTIPOS (de la web anterior de savvia; BOP usa el de SurePayroll,
    su matriz) rotan cada 2,8 s con relevo líquido (gooey solo durante el relevo: en reposo el logotipo está limpio) y el degradado vira a los colores del proyecto
    (`@property --c1…3`). ENTRADA: cada pieza se descubre de abajo arriba, el fondo llega ampliado y el mockup sube después.
- **Fallos propios cazados:** desenfocar la foto entera sentado dejaba HALOS del pie y de los parteluces sobre el paisaje (→ paisaje pre-desenfocado con convolución
  normalizada; luego retirado todo a petición); la onda de la tarjeta salía gruesa (borde escalado ×46 → más fino); `animation` del titular de la 04 (ronda 16) ya cubierto.
- **Medido:** `astro check` 0 errores · `astro build` OK · `spacing-lint` en escala · `tools/verify.cjs` Chrome real y WebKit, 1280×720 y 390×844: consola limpia, 0 ≥ 400,
  desborde 0 · `tools/r18.cjs` (Chrome 1280 y 390, WebKit 1280): gota → salpicadura → árbol; tarjetas dormidas → gota → despiertas = true; Proyectos quietos al 36, 50 y
  68 % de la pista · `tools/otros.cjs` (Chrome 1280 y 390, WebKit 1280): mosaico completo y relevo de logotipos · `tools/sentado.cjs` (Chrome y WebKit, DPR 2): todo nítido ·
  `proy` (1280 y 390), `pasos`, `sistema`, `equipo`, `menu`, `carriles`, `carga` OK. **SIN medir:** fluidez en GPU real (filtro de color en 4 tarjetas dormidas; 4
  desenfoques de 34 px + gooey puntual en el mosaico).
- **Backup:** `../savvia-web.bak-r17c-2026-09-21/` (estado previo).
- **Pendiente de Andoni:** la escena de la mesa sigue siendo de 1920 px: sentado (×2,3) mesa y teclado quedan algo blandos por resolución, no por desenfoque → hace falta la
  lámina a 4K; permiso de los clientes para usar logotipo y captura; frase de entrada de «Otros trabajos» (de Nilo); `/proyectos` no existe.

### Ronda 19 — 2026-09-22 · la carga que arranca el visitante y dibuja las v, la gota que resbala por la raíz, la web real en el monitor, el (+) de estaciones, el tronco tras la pared, el pie que se llena de savia, vídeos en Otros trabajos y el árbol que se redibuja
- **Andoni (textual, 11 puntos + 6 láminas):** 1 «quiero que salga la sa__ia y las 2 v se dibujan junto con la gota pasando. Luego la gota al descolgarse de
  la a tiene que parecer más realista. Y al caer, si te fijas en una gota real al caer parece como que el resto se desenfoca por la velocidad. También me
  gustaría que la animación inicial la tuviera que empezar el usuario de alguna manera original» · 2 «La gota que sale de las raíces tiene que parecer que
  sale de las raíces, como se desliza por ellas y cae» · 3 «En el ordenador del mockup se tienen que ver las webs reales, que puedas ver las animaciones y
  todo; te paso la web donde Eric lo hizo (treseiscero-stg.webflow.io/product-2-3-1)» · 4 «Los subtítulos después del hero van a 18px y el del hero a 20px»
  · 5 «Te paso las imágenes del mockup donde cambia la luz según la estación y más mockups para otros proyectos» · 6 «Los botones de cambiar de estación
  quiero que vayan bajo un (+) redondeado que cuando lo clicas de él salen los iconos como si se fuesen multiplicando haciendo una circunferencia
  alrededor de él. La animación de separarse del (+) tiene que ser líquida» · 7 «una sección donde el fondo de la web pareciese una pared construida sobre
  un árbol: se ve el fondo de la web y en el medio hay un rectángulo muy redondeado donde se ve la corteza del árbol como si fuera por detrás de la web» ·
  8 «el footer necesitamos algo más original» · 9 «En otros trabajos las barras de los navegadores son muy gordas y en Remerge deberíamos enseñar la
  versión móvil. Estaría guay que al hacer hover se viera el vídeo de cada proyecto. Si podemos hacerlo con la herramienta de brag mejor» · 10 «Al pasar
  del mockup a otros proyectos hay un corte en el fondo que no me gusta. Esa transición tiene que ser más smooth» · 11 «Cuando pasas el ratón por encima
  del árbol del hero que tenga el efecto de cuando aparece el árbol, como que se desdibuja y dibuja».
- **Referencia medida (la maqueta de Eric):** dos `<iframe>` sin src en el HTML (se cargan por JS), uno de 1680×958 reducido con `transform: scale(.2395)`
  y otro de 400×760 con `scale(calc(100cqi / 400px))`: la web real a tamaño de escritorio, encogida a la pantalla. Es lo que se ha hecho.
- **Hecho:**
  · **10 · el corte (medido antes de tocar):** bajo la salida de Proyectos el fondo era Cacao PLANO (49·32·24, desviación 0) y encima Cacao con grano
    (52·35·27, desviación 3). Causa: `html { background: var(--bg) }` (atajo) pisaba el `background-image` del grano de la ronda 11 en TODA sección sin
    clase de superficie (hero, pasos, Otros trabajos, Servicios, Estudio, Preguntas iban lisas). → `background-color`. El grano es ahora continuo en toda
    la página y la salida de Proyectos ya no tiene costura (medido: mismo color y misma desviación arriba y abajo).
  · **4 · subtítulos:** `--text-lead` 20 px fijos (hero) y `--text-sub` 18 px nuevo (La Savvia, Estudio, Servicios, Tronco, pie). `DESIGN.md` anotado.
  · **5 · láminas:** las cuatro de la mesa sustituidas (luz por estación; 1672×941 + `-m` a 1100; las antiguas en `tools/bak-estudio/`); pantalla medida por
    inundación en las cuatro → 39,18 · 37,08 · 21,48 × 20,85 % (`PANT`, `.pantalla`, `.marco-monitor`, Anteriores). Móvil e iMac → `public/media/anteriores/
    mesa-movil.webp` y `mesa-roble.webp`, con sus cuatro esquinas de pantalla medidas.
  · **3 · la web real (`Proyectos.astro`):** cada `.web` lleva `data-src` (la url) y `data-cap` (captura); el JS monta un `<iframe>` a 1440 px (1024 en
    móvil) y lo reduce a la pantalla con `scale` (se reajusta al sentarse: la pantalla se maqueta k veces mayor). Solo se monta la del proyecto ACTIVO (al
    cambiar, la anterior se desmonta): cuatro webs con WebGL a la vez era demasiado. El tecleo y la barra de carga esperan al `load` real del iframe (la
    barra se queda al 90 % hasta que llega). Neety manda `x-frame-options: SAMEORIGIN` → `embed: false` en `home.ts` y enseña su captura.
  · **6 · el (+) (`Proyectos.astro › .abanico`):** una capa de GOTAS Rosa niebla (la del (+) y cuatro que nacen de ella) bajo un filtro gooey
    (`#goo-estaciones`) solo mientras se separan o se juntan, y encima los botones transparentes con el icono en Cacao. Se colocan en una circunferencia
    de 64 px (−200°, −150°, −100°, −50°: del lado izquierdo al hombro derecho, sin pisar el sonido) con muelle al abrir y sin rebote al cerrar; el (+) gira
    a ×. Cierra con clic fuera, Esc o al sentarse. El grupo va `inert` y sin `pointer-events` cerrado.
  · **1 · la carga (`Cargador.astro`, rehecha):** el logotipo INLINE (los seis trazos del SVG): «sa  ia» aparece y las dos v viven bajo una máscara que
    avanza con la gota. El camino de la gota por las v está medido en el trazo (baja por el grueso, sube por el fino, rodea el rizo, sigue la ligadura; luego
    el palo de la i, por debajo del punto, el lomo de la última a y la punta de su rabo). EMPIEZA EL VISITANTE: una gotita espera al pie de la primera v;
    MANTENIENDO PULSADO (ratón, dedo, espacio o intro) se llena en 0,9 s y echa a rodar; soltar antes la vacía; a los 1,8 s sin nada, «mantén pulsado» en
    mono. DESCOLGARSE: la gota engorda y cae por su peso mientras un CUELLO la sujeta y se estrangula; al romperse queda un resto que se retrae y un
    SATÉLITE minúsculo que cae detrás. CAER: estela con DESENFOQUE DE MOVIMIENTO anisótropo (`feGaussianBlur` en la dirección del avance, proporcional a la
    velocidad en pantalla; la cabeza casi nítida). Rueda, deslizar el dedo o Escape la saltan. El salvavidas del `<head>` ya solo mira si el script corrió.
  · **2 · la gota de las raíces (`Recorrido.astro` + `Raices.astro › data-eje`):** el eje de la raíz principal medido en la lámina (recto bajo el tronco,
    luego por la raíz que llega más abajo hasta su punta, 0,507 · 0,889); la gota nace arriba, RESBALA por el eje cogiendo velocidad (la cola detrás, pegada
    a la raíz), cuelga de la punta y cae a la tarjeta. Vive en el `<body>` en coordenadas de página (cruza dos secciones que recortan).
  · **11 · el árbol (`estela.ts › ciclo()`):** al entrar el cursor, `g` baja de 1 a 0 en 0,8 s (la pintura se retira hacia la base y quedan las líneas del
    dibujo, que también se van) y vuelve a 1 en 3 s como en la aparición, sin gota ni savia por el suelo. El clic cambia de estación con el mismo ciclo.
    La LUPA de la ronda 17 se va.
  · **7 · `Tronco.astro` (nueva, entre los pasos y La Savvia):** la página es la pared; una VENTANA muy redondeada (radio 40–80 px, canto en sombra) deja
    ver la CORTEZA: shader (ruido multifractal con crestas, estirado a lo alto, deformación de dominio, luz desde arriba a la izquierda; Cacao en las
    grietas, Nogal en las placas, Rosa arcilla en las luces) con PARALAJE (recorre el 35 % de lo que recorre la ventana). Solo repinta con el scroll y a la
    vista; DPR ≤ 1,5. Sin WebGL, Nogal con grano. Frase de Nilo («Detrás de cada web, un tronco.»).
  · **8 · `Pie.astro` (rehecho):** el logotipo a todo el ancho del `wrap`, al pie, en Cacao, que se LLENA DE SAVIA (Naranja, superficie ondulada que se
    mueve un periodo cada 9 s, parada fuera de la vista) según entra el pie: lleno cuando la página toca fondo. Arriba, titular, pitch (18 px), correo y
    enlaces; la línea mono. Sin JS: al 62 %. Movimiento reducido: nivel fijo, sin ola.
  · **9 · «Otros trabajos» (`Anteriores.astro`):** VÍDEO real de cada web (`tools/grabar-otros.cjs`: Chrome real recorriendo la página 7 s, screencast
    CDP remuestreado a 24 fps → mp4 h264 de 0,5–0,8 MB; Remerge grabada a 390 px como móvil; el primer fotograma es el póster) que se reproduce al pasar el
    cursor o enfocar; en táctil, a la vista. brag redibuja la web en HTML: para webs ajenas es mejor grabar la real. Remerge en el MÓVIL de la mesa y Cubbo
    en el iMac de la mesa de ROBLE: las pantallas van en PERSPECTIVA con una homografía (cuadrado unidad → cuatro esquinas medidas) escrita como
    `matrix3d`; sus términos en píxeles usan `--s` (ancho real de la mesa / 1672, por `ResizeObserver`). Barras de navegador a 16 px (antes 24).
- **Fallos propios cazados:** la estela de la gota nacía a escala 1 y opacidad 1 (un rastro largo mientras rodaba) → solo cayendo; el iframe y la
  captura los crea el JS y las reglas de Astro no les llegaban (el `transform-origin` no se aplicaba: la web salía descentrada) → `:global`; los botones
  del abanico quedaban a opacidad 0 abiertos (especificidad); `const Video = () => <video/>` no es un componente en Astro (`NoMatchingRenderer`: la página
  se cortaba tras Proyectos) → HTML con `set:html`; el servidor de desarrollo sirvió el componente viejo tras reescribirlo entero (otra vez: reiniciar);
  la gota de las raíces perdía el eje siguiendo una rama lateral (trazado de abajo arriba desde la punta); el grupo del abanico, aunque inerte, tapaba el
  (+) para WebKit; la prueba de Proyectos «saltaba» la carga con un clic (ahora eso la LLENA) y clicaba una fila del dial fuera de la máscara.
- **Medido:** `astro check` 0 errores · `astro build` OK · `spacing-lint` en escala · `tools/verify.cjs` sobre `astro preview` (Chrome real y WebKit, 1280×720
  y 390×844): consola limpia, 0 respuestas ≥ 400, desborde 0, las tres fuentes cargan · el corte: 52·35·27 (desv. 3,1) arriba y 49·32·24 (desv. 0) abajo
  → uniforme · `tools/r19-carga.cjs` (Chrome 1280 y 390, WebKit 1280): «sa  ia» + pista → pulsado 1,1 s → las v dibujadas → cuelga → cae → `savvia:gota`,
  hero sin transform, velo fuera · `tools/r19-raiz.cjs` (los tres): resbala por la raíz → cae → tarjetas despiertas, gota en el body · `tools/r19-proy.cjs`
  (los tres): iframe de Multiverse a 1440 px escalado ×0,19, descubierto al cargar; abanico abierto con las cuatro gotas a (−60,22)(−55,−32)(−11,−63)(41,−49) px del (+); cambio de estación; clic fuera lo cierra; cambio de proyecto → solo una web montada; sentado 666×323 dentro de la
  pantalla de 666×363 · `tools/r19-otros.cjs` (los tres): las cinco piezas reproducen su vídeo al pasar; `--s` y `matrix3d` puestos en móvil e iMac ·
  `tools/r19-tronco-pie.cjs` (los tres): corteza pintada (1024×446 a 1280), nivel de savia a −26 (lleno) al tocar fondo · `tools/r19-hero.cjs` (Chrome y
  WebKit): ciclo de desdibujar y redibujar (capturas a 0,25 / 0,6 / 1,4 / 2,2 / 3,2 s). **SIN medir:** fluidez en GPU real (iframe con WebGL ajeno dentro
  del monitor; el shader de la corteza a pantalla ancha; los cinco vídeos con hover en móvil).
- **Backup:** `../savvia-web.bak-r18-2026-09-22/` (estado previo). Las láminas de la mesa antiguas (1920 px): `tools/bak-estudio/`.
- **Pendiente de Andoni:** las seis láminas llegaron PEGADAS en el chat y salen a 1672 px (menos que las de 1920 que había): hacen falta los archivos
  originales (a 4K si puede) para sentado y para el iMac; que Eric quite `x-frame-options` en neety.treseiscero.app (entonces `embed: false` fuera y la web
  real entra sola); la frase del Tronco es de Nilo; ¿la corteza real (foto o acuarela de su mano) en vez del shader?; permiso de los clientes para los
  vídeos de sus webs; ¿el (+) también con el sonido dentro?; los vídeos pesan 0,5–0,8 MB cada uno (solo se cargan al pasar); los FALTA de siempre.

### Ronda 20 — 2026-09-22 · el círculo que arranca la carga y las v a trazo, estaciones de verdad, el sonido en el (+), dolly de cámara, Cubbo en mancha, barrido de logotipos, la ilustración del pie y la corteza real que se puede tallar
- **Andoni (textual, 8 puntos + 4 láminas + 1 a media ronda):** 1 «¿Podemos hacer que para iniciar la web tengas que hacer un círculo con el ratón? La
  animación de la gota tiene que parecer que dibuja las v realmente» · 2 «Al clicar la imagen del árbol me gusta que cambie de color, podemos hacer que
  cambien como de estaciones» · 3 «Dentro del + de proyectos también ponemos el sonido para poner y quitar» · 4 «Al sentarte que parezca que la cámara se
  acerca como con motion a la pantalla, lo mismo al salir» · 5 «En proyectos Cubbo lo dejamos como estaba con el fondo de gradiente» · 6 «Cambiamos la
  animación de cómo pasan los logos en otros proyectos» · 7 «En el footer quiero poner una ilustración bonita con efecto parallax, te paso las diferentes
  capas» · 8 «Te paso una corteza muy realista para la sección. Tiene que parecer como que está detrás de la web como si la web fuese una pared. Y al
  meter la mano dentro pudieses tocar y encima de esa corteza que el usuario pueda hacer algo» · (a media ronda) «en proyectos destacados, savvia se tiene
  que ver con el color claro».
- **Hecho:**
  · **1 · `Cargador.astro`:** el CÍRCULO: un rastro Naranja sigue al puntero (pointermove; en táctil, arrastrando) y cuando la vuelta se cierra (giro
    acumulado ≥ 342° alrededor del centro de la traza, radio ≥ 18 px), el anillo se encoge hasta el pie de la primera v y se vuelve la gota. Pista a los
    1,6 s: «dibuja un círculo» + «saltar». Las V A TRAZO: la máscara de las v es la PLUMADA de la gota (el mismo camino, suavizado con Catmull-Rom a
    5 px, como trazo de 78 unidades con puntas redondas) destapada con `stroke-dashoffset` a la vez que avanza: la tinta aparece solo por donde pasa.
  · **2 · `estela.ts` + `Hero.astro`:** `est` pasa a vec4 (tono, saturación, aclarado, RALEO): invierno = gris pálido y la copa pierde las hojas claras
    (queda rala); primavera = verde fresco (giro −1,9 rad, aclarada); verano = verde hondo (−2,15). Halos a juego. Rótulo mono al pasar el cursor:
    «primavera · clic para cambiar de estación».
  · **3 · `Proyectos.astro`:** el sonido es la QUINTA gota del abanico (ángulos −200 … 0, cada 50°); fuera el separador y el botón suelto.
  · **4:** sentarse y levantarse son un DOLLY: escenario y escena viajan juntos 1,5 s con curva de cámara (`cubic-bezier(.7,0,.16,1)`: arranca despacio,
    planea, se posa); `.escena.dolly` solo durante el viaje.
  · **(media ronda):** `html.sobre-escena` mientras la sección pasa bajo la barra → la barra sin mezcla por diferencia y en claro (`Nav.astro`).
  · **5 · `Anteriores.astro`:** Cubbo vuelve a `mancha` con su degradado (el iMac de roble queda en `QUAD`, sin uso). **6:** el relevo de logotipos es
    un BARRIDO: un filo de savia cruza la pieza de izquierda a derecha; detrás recorta el que se va y delante destapa el que llega (`clip-path`
    animado, 1,2 s); sin filtro gooey.
  · **7 · `Pie.astro` (rehecho):** las tres capas de Andoni (montes · árboles · hierba, acuarela de otoño con alfa, 2000×667 + `-m`) a sangre al pie;
    PARALAJE: según entra el pie cada capa se asienta desde más abajo (montes 40 px, árboles 90, hierba 150). El logotipo que se llenaba se retira.
  · **8 · `Tronco.astro` (rehecho):** la CORTEZA REAL de Andoni en la ventana, un 30 % más alta que ella y con paralaje. LA MANO: al entrar el puntero,
    una sombra blanda lo sigue con retraso (la mano dentro del hueco). TALLAR: arrastrando con ratón o lápiz se graba un SURCO (sombra dentro del corte
    arriba a la izquierda, fondo de madera clara mate, filo de luz abajo a la derecha) en un lienzo pegado a la corteza; pista «talla algo en la corteza»
    al pasar; «borrar». En táctil no se talla (el dedo hace scroll).
- **Fallos propios cazados:** el botón «borrar» arrancaba un trazo y, con la captura del puntero, su clic no llegaba (→ se excluye del tallado); el filo del
  barrido se movía un 100 % de SU ancho (2 px) en vez del de la pieza (→ `left`); `data-pista` repetido en la carga, el tronco y Proyectos rompía las
  pruebas (→ renombrados); un `$$` en un `String.replace` se convirtió en `$` y dejó una prueba sin piezas; el relieve de la talla parecía una cuerda
  (sombra abajo a la derecha = relieve) → sombra dentro del surco arriba a la izquierda.
- **Medido:** `astro check` 0 errores · `astro build` OK · `spacing-lint` en escala · `tools/verify.cjs` sobre `astro preview` (Chrome real y WebKit, 1280×720
  y 390×844): consola limpia, 0 respuestas ≥ 400, desborde 0 · `tools/r20-carga.cjs` (Chrome 1280 y 390, WebKit 1280): «sa  ia» + pista → círculo de 28
  puntos → `.circulo` → v dibujadas (plumada a 0) → cuelga → cae → `savvia:gota`, hero sin transform, velo fuera · `tools/r20-hero.cjs` (Chrome y WebKit):
  otoño → invierno → primavera → verano con su rótulo · `tools/r20-tronco-pie.cjs` (los tres): paralaje de la corteza (k 0,38 → 0,57), mano dentro y
  pista, talla de 7 361 px, «borrar» → 0, ilustración asentada (`--p` 0) al tocar fondo · `tools/r19-proy.cjs` (los tres): sonido dentro del abanico en
  (64, 0), `sobre-escena` y barra sin mezcla, dolly capturado a 0,6 s, sentado 666×323 · `tools/r19-otros.cjs` (Chrome y WebKit): relevo 0 → 1 con
  barrido; las cinco piezas reproducen su vídeo. **SIN medir:** fluidez en GPU real (dolly con el iframe dentro; foto de corteza a 1672 px en ventanas
  anchas; tres capas de 2000 px en el pie).
- **Backup:** `../savvia-web.bak-r19-2026-09-22/` (estado previo).
- **Pendiente de Andoni:** las láminas siguen llegando pegadas en el chat (corteza a 1672 px, capas a 2000 px): originales si los hay; la frase del Tronco
  y la pista «talla algo en la corteza» son de Nilo; ¿algo más «encima de la corteza» además de tallar (p. ej. que lo tallado se quede entre visitas)?;
  `x-frame-options` de Neety; permisos de clientes; los FALTA de siempre.

### Ronda 21 — 2026-09-22 · fuera el tronco, el (+) de cristal sin tarjeta, la × que abría el menú, el paisaje con profundidad y estaciones (con el logotipo entre capas) y el árbol que solo vira de color
- **Andoni (textual, 5 puntos):** 1 «Fuera la sección de la corteza» · 2 «En proyectos, el + sin la card cuadrada de fuera y el estilo como
  teníamos antes semitransparente, tanto del + como de los iconos que salen» · 3 «En proyectos en la vista destacada la (x) para salir activa el
  menú superior, tenemos que corregirlo» · 4 «El paisaje del footer tiene que parecer que tiene profundidad y cuando muevas el ratón se note, y que
  pase por las diferentes estaciones. Y ponemos el logo de savvia sutil entre las diferentes capas del paisaje» · 5 «En el hero cuando clicas para
  cambiar de color que no haga la animación de redibujado. La animación de redibujado solo con la animación de carga».
- **Hecho:**
  · **1:** `Tronco.astro` borrado y fuera de `index.astro` (con su copy en `home.ts`). Queda en el backup r20 por si vuelve.
  · **2 · `Proyectos.astro`:** el mando ya no lleva la píldola `.cristal`; el (+) y las cinco gotas son círculos de cristal translúcido (velo Cacao
    52 % + `backdrop-filter` + filo Rosa niebla 18 %), icono Rosa niebla 75–80 %; al pasar, un poco más claro; pulsado = Rosa niebla con icono Cacao (el
    estilo de la barra de la ronda 11). La capa líquida (gotas opacas bajo el gooey) se ve al 22 %: la unión sigue siendo líquida, translúcida.
  · **3:** la × está donde el botón del menú. Al levantarse, `html.estudio-sentado` (barra oculta y sin puntero) se quita al POSARSE la cámara (1,5 s),
    no al instante, y `Nav.astro` ignora clics en el botón del menú durante 1,6 s tras levantarse (`window.__levantado`).
  · **4 · `Pie.astro`:** PROFUNDIDAD: además del paralaje del scroll, cada capa se aparta del RATÓN según su lejanía (montes 6 px, logotipo 12,
    árboles 20, hierba 34; con retraso, lerp 0,07; en táctil no) y va un 4 % más grande para no enseñar bordes. ESTACIONES: otoño → invierno →
    primavera → verano cada 6 s a la vista, con un viraje por capa (`filter`: invierno desaturado y claro; primavera y verano, giro de tono a
    verde con saturación 0,5–0,6) y fundido de 2,4 s; con movimiento reducido, otoño quieto. EL LOGOTIPO de savvia entre montes y árboles, en Cacao
    al 22 %, como un letrero al fondo del valle, y con su propia profundidad.
  · **5 · `estela.ts` + `Hero.astro`:** el clic ya no redibuja: `renacer(n)` fija la estación meta y el uniform `est` se interpola por frame (~1,2 s);
    fuera el `pointerenter` del ciclo. El redibujado queda solo en la carga.
- **Fallos propios cazados:** los verdes de primavera y verano del pie salían de neón (saturación 0,85–0,95 → 0,5–0,6); la verificación se cortó por un
  patrón de `grep` (no por el build).
- **Medido:** `astro check` 0 errores · `astro build` OK · `spacing-lint` en escala · `tools/verify.cjs` sobre `astro preview` (Chrome real y WebKit, 1280×720
  y 390×844): consola limpia, 0 respuestas ≥ 400, desborde 0 · `tools/r21-pie.cjs` (los tres): con el ratón a la izquierda la hierba se desplaza
  +23 px y los montes +4 (a la derecha, −23); estaciones otoño → invierno → primavera con sus filtros; logotipo presente al 22 % · `tools/r19-proy.cjs`
  (los tres): tras la ×, `menu-abierto` false, barra a opacidad 0 mientras dura el dolly y visible después; abanico de cristal · `tools/r20-hero.cjs`
  (Chrome y WebKit): invierno → primavera → verano por clic · `tools/r20-carga.cjs` OK. **SIN medir:** fluidez en GPU real (tres capas de 2000 px con
  `filter` en transición + paralaje de ratón).
- **Backup:** `../savvia-web.bak-r20-2026-09-22/` (estado previo).
- **Pendiente de Andoni:** ritmo de las estaciones del pie (6 s) y si el logotipo va más o menos visible (22 %); originales de las capas si los hay;
  `x-frame-options` de Neety; permisos de clientes; los FALTA de siempre.

### Ronda 22 — 2026-09-22 · las estaciones se pintan (árbol y pie), el pie se dibuja como el hero y sube hasta el contenido con «savvia» de logotipo, la × del abanico, y blur en logotipos y menú
- **Andoni (textual, 3 puntos + 1 a media ronda):** 1 «El cambio de color de estaciones que tenga alguna animación chula, tanto en el footer como en el
  árbol del hero, que parezca que se va pintando» · 2 «En el footer el paisaje tiene que estar mucho más arriba, casi solaparse con el contenido, y quitamos
  el logo de savvia. Hacemos que la savia de tu web, esa savia, sea el logo. Además el paisaje se tiene que dibujar con el efecto de Shopify que tenemos
  en el hero» · 3 «El + de proyectos cuando se convierte en × cuesta cerrarlo. Es como que no puedes clicarlo» · (a media ronda) «la animación de cambio
  de logos en proyectos también hay que cambiarla: que entren con blur y se vayan con blur. Esto también lo aplicamos a cuando haces hover dentro del nav
  bar a las opciones: el resto se hacen blur».
- **Hecho:**
  · **1 · árbol (`estela.ts`):** dos estaciones en el shader (`est` la que está, `estB` la que llega) y `ev` (0 → 1 en 2,2 s): la nueva avanza desde la
    base del tronco con el MISMO frente rasgado de la aparición (ruido a dos escalas), con el filo teñido de savia; al acabar, releva. Un clic a medio pintar
    no salta: la que llegaba pasa a ser la vieja.
  · **1 · pie (`Pie.astro`, `tools/lineas.cjs`):** máscara RASGADA (`rasgo.png`, 1200×400: un tercio opaco, una rampa diagonal a 30° con ruido a dos
    escalas, un tercio transparente) que se desplaza con `mask-position` (100 % = tapado, 0 % = destapado; el canto, irregular). Cada capa lleva la pintura
    `a` (estación actual) y una copia `b` (la siguiente, con su filtro) que la máscara destapa en 2,2 s; al acabar, `a` coge el filtro sin fundido y `b`
    se tapa. Otoño → invierno → primavera → verano cada 6 s a la vista.
  · **2 · pie:** el paisaje sube por detrás del contenido (margen negativo: solape de 96 px a 1280, 64 en móvil; la línea mono queda sobre la hierba). Fuera
    el logotipo entre capas. El titular es «La savvia de tu web.» con la palabra hecha LOGOTIPO (SVG en línea, 2,55 em, en el color del texto). SE DIBUJA
    al llegar (Shopify, como el árbol): las LÍNEAS del grabado (`*-lineas.webp`: Sobel de luminancia × alfa, umbral, en Cacao, 1400 px) entran con el
    frente rasgado (1,4 s) y la PINTURA las sigue (1,8 s); luego las líneas se van. Movimiento reducido: pintado y quieto.
  · **3 · `Proyectos.astro`:** el grupo del abanico (una caja de 48 px sobre el (+)) nunca coge el puntero; solo sus botones, y solo abiertos. La × cierra.
  · **(media ronda) · `Anteriores.astro`:** relevo de logotipos con BLUR: el que se va se desenfoca (16 px) y se apaga; el que llega entra desenfocado y
    enfoca con 0,25 s de retraso. Fuera el barrido. **`Nav.astro`:** al pasar por una opción del menú, las demás bajan a 0,4 y se desenfocan 4 px.
- **Fallos propios cazados:** las líneas del grabado salían a 370–465 KB (un empaste de bordes): umbral y 1400 px → 195–240 KB.
- **Medido:** `astro check` 0 errores · `astro build` OK · `spacing-lint` en escala · `tools/verify.cjs` sobre `astro preview` (Chrome real y WebKit, 1280×720
  y 390×844): consola limpia, 0 respuestas ≥ 400, desborde 0 · `tools/r22-pie.cjs` (los tres): líneas → pintura → `pintado` (líneas a 0), logotipo en el
  titular, solape 96/64 px, la estación siguiente a medio pintar (máscara al 25–33 %) y relevada (`a` con el filtro de invierno) · `tools/r20-hero.cjs`
  (Chrome y WebKit): cada estación capturada a medio pintar (el frente verde subiendo por la copa) y pintada · `tools/r19-proy.cjs` (los tres): el abanico
  cierra con la × · `tools/r19-otros.cjs`: relevo 0 → 1 · menú: al pasar por «La savvia», las otras opciones con `blur(4px)` y 0,4. **SIN medir:** fluidez
  en GPU real (tres capas × 3 imágenes con máscara y filtro en el pie).
- **Backup:** `../savvia-web.bak-r21-2026-09-22/` (estado previo).
- **Pendiente de Andoni:** ritmo de las estaciones (6 s) y duración del pintado (2,2 s); si el titular con el logotipo se lee bien a su tamaño (2,55 em);
  originales de las capas; `x-frame-options` de Neety; permisos de clientes; los FALTA de siempre.

### Ronda 23 — 2026-09-22 · el pie con el motor del árbol: el logotipo se dibuja, cae la gota y el paisaje se dibuja y se pinta desde el impacto; estaciones como el hero; paisaje tras el texto; logotipo a la altura de x
- **Andoni (textual):** «El paisaje del footer tiene que solaparse con el texto. Y quiero que cuando llegues al footer el logo de savvia se dibuje, cae
  la gota y se dibuja el paisaje tal y como se dibuja el árbol de arriba. Por otro lado, el logo de savvia hay que ajustarlo para que tenga el mismo alto
  que el texto. Y los recolores del footer tienen que ser como los del hero».
- **Hecho:**
  · **`estela.ts`:** tres opciones nuevas: `radial` (frente en círculo desde el origen, sin gota), `paisaje` (una lámina entera: sin hundir el color
    hacia el Cacao, sin elipse de cobertura, sin bordes desvanecidos, sin semitono en los cantos) y `estaciones` (tabla propia); y `origen(x, y)` para
    mover el origen en caliente. El resto (dibujo de líneas por delante, pintura con canto rasgado, filo de savia, estaciones que se pintan) es el mismo.
  · **`Pie.astro` (rehecho):** cada capa (montes · árboles · hierba) es un lienzo del motor, con su lámina de textura. LLEGADA (al 30 % a la vista):
    el logotipo del titular se DIBUJA de izquierda a derecha (1,1 s); de la punta del rabo de su «a» se descuelga una GOTA (forma, cuelga, cae con
    gravedad) hasta el HORIZONTE del paisaje a esa x (medido: primera fila con tinta de árboles + hierba, 51 columnas, ya con el paralaje aplicado),
    SALPICA, y cada lienzo pone ahí su origen y crece 2,6 s: líneas del grabado por delante, pintura rasgada detrás, en círculo. ESTACIONES: cada 6 s
    `renacer(k)` en los tres desde la base (tabla propia: invierno gris claro sin ralear; primavera y verano verdes contenidos).
  · **Solape:** el paisaje va absoluto al pie, detrás del contenido (`padding-bottom` 12 vw): los montes, claros, pasan tras los enlaces (solape 282 px a
    1280, 69 en móvil); la línea mono queda sobre la hierba en blanco por diferencia (se lee en cualquier estación).
  · **Logotipo del titular:** altura de x de Family medida en canvas (0,47 em); la «a» del logotipo es 0,696 de su alto → 0,675 em de alto, 2,18 em de
    ancho, con el pie en la línea base.
- **Fallos propios cazados:** la regla que destapa el logotipo (`.marca.dibuja svg`) perdía contra la base (`.titular .marca svg`): los atributos de ámbito
  de Astro cuentan en la especificidad (0,6,1 contra 0,4,1) → se repite la cadena; en la esquina de la hierba salía un PARCHE de semitono (los cantos
  translúcidos de la lámina) → sin semitono en modo paisaje; la prueba medía antes de que acabara el pintado (5 s).
- **Medido:** `astro check` 0 errores · `astro build` OK · `spacing-lint` en escala · `tools/verify.cjs` sobre `astro preview` (Chrome real y WebKit, 1280×720
  y 390×844): consola limpia, 0 respuestas ≥ 400, desborde 0 · `tools/r23-pie.cjs` (los tres): logotipo dibujado (49 px de alto a 1280, 30 en móvil) →
  gota → salpicadura → líneas y pintura en círculo desde el impacto (capturas a 1,5 / 2,8 / 4,6 / 6,2 s) → `pintado`; invierno pintado desde la base
  a los 6 s; solape 282/69 px; línea mono en `difference` · `tools/r20-hero.cjs` y `tools/r20-carga.cjs` (Chrome): sin regresión tras tocar el shader.
  **SIN medir:** fluidez en GPU real (tres lienzos de 2000×667 a DPR ≤ 2 pintando a la vez durante 2,6 s y en cada estación).
- **Backup:** `../savvia-web.bak-r22-2026-09-22/` (estado previo).
- **Pendiente de Andoni:** ritmo de las estaciones (6 s) y del pintado (2,6 s); `*-lineas.webp` y `rasgo.png` quedan en `public/media/pie/` sin uso
  (se borran si no vuelven); `x-frame-options` de Neety; permisos de clientes; los FALTA de siempre.

### Ronda 24 — 2026-09-22 · trece puntos: pie (altura, gota real, 100 lvh, subtítulo, enlaces, legibilidad), círculo de la carga en WebKit, estación de hoy y rótulos en el marco, gota de las raíces con el scroll, FAQ, hierba de acuarela, navegadores finos, «Todos los proyectos», La Savvia, menú, barra sobre lo claro
- **Andoni (textual):** «el footer no tan arriba, y la gota que cae de savvia mucho más realista» · «La animación inicial: el círculo que dibujas se
  buguea y baja contigo; una vez lo dibujas empieza la animación y desaparece» · «En el hero dentro del recuadro, en la esquina derecha abajo poner la
  estación y que la web cargue con el árbol en la estación que estamos, luego al clicar la puedes cambiar. Y en la esquina izquierda abajo, desde 2020»
  · «En la segunda sección podemos hacer que la gota caiga con el scroll, si no el usuario se la va a perder» · «Animaciones de cómo se abren las FAQ
  más pulidas» · «que el footer, como es cambio de color, tenga la animación de cambio de color y ocupe casi toda la pantalla. El subtítulo: lo dejamos
  solo en esto: el estudio que orquesta la IA para elevar tu web» · «Los hover de las opciones del footer más minimalista y fluidas, lo del blur me vale
  también aquí» · «me gustaría que la estela que dejamos Eric y yo se pareciera a las ilustraciones del hero y footer» · «El navegador de los proyectos,
  la parte superior tiene que ser más finita. Y donde escribes la web tiene que dejar más aire arriba y abajo. Lo mismo en otros proyectos» · «En otros
  proyectos, ver todos los proyectos a la derecha del titular pegado a la línea derecha, con una animación más fluida, como que se rellena de naranja, y
  la flecha más minimalista» · «La sección la savvia es la receta de tu web: lo de la derecha no se mueve con el scroll de posición y quitamos el
  subtítulo. Dejamos solo ver documento con una animación de hover más pulida» · «El nav bar que se abre a la derecha, menos redondeo» · (a media ronda)
  «hay que hacer que las palabras que quedan en el footer se lean bien, el paisaje un poco más arriba. Y el savvia del menú al llegar al footer vuelve al
  color oscuro» · «desde 2020 y la estación quiero que estén dentro del recuadro del árbol, no fuera. Y en la estación solo ponemos la estación».
- **Hecho:** ver «RONDA 24 (lo que queda fijo)» arriba. Notas: la barra sobre lo claro iba en «diferencia» (blanco sobre Rosa arcilla = azul verdoso
  sucio: eso era «vuelve al color oscuro») → sobre La Savvia y el pie, Cacao sin mezcla; el círculo de la carga se animaba con WAAPI sobre `cx/cy/r`
  (en WebKit no cuentan como propiedades: el arranque no llegaba y el rastro te seguía) → rAF sobre los atributos y el rastro se borra al cerrar la
  vuelta; el cuerpo de cada FAQ se anima con su alto medido (abrir 0,52 s, cerrar 0,38 s; el atributo `open` se quita al terminar) y las demás se
  cierran igual; la hierba de acuarela se destapa con canto blando por donde ya han pasado (a la izquierda de Andoni y a la derecha de Eric), con los
  lados del paseo desvanecidos y la base fundida en el Cacao; la gota de las raíces: p 0–0,08 nace · 0,08–0,66 resbala · 0,66–0,76 cuelga · 0,76–1 cae
  (al llegar, salpica y despierta; hacia atrás, vuelve).
- **Fallos propios cazados:** un comentario HTML dentro del `map` de las FAQ rompía la expresión; la limpieza de «Copiar» dejó `md` huérfano en la sonda;
  la hierba de acuarela no se repintaba (dependía del bucle de brisa, que ya no corre) → se repinta desde el paseo; el blur de los enlaces saltaba al
  pasar por los HUECOS de la lista (`ul:hover`) → `ul:has(a:hover)`; los rótulos del marco se salían del recuadro en pantallas anchas (iban relativos al
  hero) → hijos del marco; el 22 de septiembre salía «verano» (frontera al 23) → otoño desde el 22.
- **Medido:** `astro check` 0 errores · `astro build` OK · `spacing-lint` en escala · `tools/verify.cjs` sobre `astro preview` (Chrome real y WebKit, 1280×720
  y 390×844): consola limpia, 0 respuestas ≥ 400, desborde 0 · `tools/r24.cjs` (los tres): estación «otoño» al cargar, rótulos dentro del marco, la gota
  en tres puntos del scroll (725 → 839 → 934 px) y tarjetas despiertas, plato sin `sticky`, un botón, sin subtítulo, barra en Cacao sobre La Savvia y el pie,
  «Todos los proyectos» pegado a la línea y Naranja al pasar, FAQ 2 abierta (141 px) y cerrada, pie de 720 px con el subtítulo nuevo · `tools/r23-pie.cjs`
  (los tres): logotipo → gota realista (cuello, satélite) → paisaje pintado → invierno · `tools/r20-carga.cjs` (Chrome y WebKit): círculo → arranque.
  **SIN medir:** fluidez en GPU real.
- **Backup:** `../savvia-web.bak-r23-2026-09-22/` (estado previo).
- **Pendiente de Andoni:** si la hierba de acuarela del equipo va más baja (hoy cubre el 62 % del paseo); el velo del pie (92 % → 0 en el 46 % de arriba);
  `x-frame-options` de Neety; permisos de clientes; los FALTA de siempre.

### Ronda 25 — 2026-09-22 · los rótulos del marco (por fin visibles), el paisaje del pie algo más arriba y legible, la gota de las raíces más lenta y la estela del equipo sutil
- **Andoni (textual):** «falta el desde 2020 y la estación donde te he dicho» · «El paisaje algo más arriba y que los textos que van superpuestos se
  puedan leer bien» · «la gota de la segunda sección que caiga algo más lento» · «el rastro que dejamos Eric y yo algo estilo lo que tenemos pero
  mucho más sutil. Y que no sea literalmente el fondo del footer».
- **Hecho:**
  · **Hero:** los rótulos estaban DENTRO del marco y su máscara (los puntos que se desvanecen a 0 hacia abajo) los borraba: ahora van en la misma caja
    del recuadro pero fuera de la máscara (`--marco-w` repite la anchura del marco; 16 px por dentro de sus cantos). «desde 2020» abajo a la izquierda,
    la estación abajo a la derecha; aparecen con el árbol pintado.
  · **Pie:** `padding-bottom` 15 → 12 vw (el paisaje sube tras los enlaces) y el velo Rosa arcilla más hondo (62 % del alto del paisaje; 96 → 80 → 35 → 0):
    lo que queda tras el texto se lee.
  · **Sección 2:** el recorrido de la gota va atado a 0,56 pantallas de scroll (antes 0,38): más lenta al mismo scroll; llega abajo con el borde de la
    fila al 44 % de la pantalla.
  · **Estudio:** solo la franja más baja de la hierba de la acuarela (el 17 % inferior de la lámina: las puntas, sin colinas), a un 28 % del alto del
    paseo, al 60 % y fundida hacia arriba; delante de los pies, un filo del 9 % al 55 %. Ya no es el paisaje del pie: son unas puntas de hierba a su paso.
- **Medido:** `astro check` 0 errores · `astro build` OK · `spacing-lint` en escala · `tools/verify.cjs` sobre `astro preview` (Chrome real y WebKit, 1280×720
  y 390×844): consola limpia, 0 respuestas ≥ 400, desborde 0 · `tools/r24.cjs` (los tres): rótulos dentro del recuadro y a opacidad 1 (captura: «desde
  2020» y «otoño» en las esquinas), la gota a 720 → 781 → 863 px en los mismos tres puntos de scroll (antes 725 → 839 → 934: más lenta) ·
  `tools/r23-pie.cjs` (Chrome y WebKit): pie pintado, solape 129 px, línea mono en diferencia · captura del equipo: puntas de hierba bajas y tenues.
- **Backup:** `../savvia-web.bak-r24-2026-09-22/` (estado previo).
- **Pendiente de Andoni:** `x-frame-options` de Neety; permisos de clientes; los FALTA de siempre.

### Ronda 26 — 2026-09-22 · el pie más arriba, sin el cambio de color y con la transición líquida; fuera los FALTA (menos el equipo); las FAQ conservan su línea y llevan las caras; la pantalla encaja en el monitor; la estela, mínima
- **Andoni (textual):** 1 «Aún más arriba el footer» · 2 «En el footer hay un cambio de color que no me gusta» · 3 «Al entrar al footer necesitamos cambio
  de color» · 4 «Quita todos los FALTA, menos los del equipo» · 5 «Al abrir y cerrar los FAQ se va la línea de arriba» · 6 «Pon nuestras fotos en el FAQ» ·
  7 «En proyectos destacados encajar mejor la pantalla al ordenador, hay algún hueco blanco» · 8 «La estela que dejamos todavía algo mucho más sutil».
- **Hecho:**
  · **1 · pie:** `padding-bottom` 12 → 8 vw: el paisaje sube tras los enlaces y el subtítulo.
  · **2:** eran dos cosas: la línea mono en blanco por DIFERENCIA (viraba de color sobre el paisaje) → Rosa niebla con sombra Cacao; y el filo superior
    del velo (Rosa arcilla lisa contra la sección con grano) → el velo lleva el GRANO de la página por encima y cubre todo el paisaje.
  · **3:** el pie tenía `overflow: hidden` (por las capas del paisaje) y recortaba la gota de la transición líquida, que vive por encima de su borde
    superior → el recorte pasa al paisaje; la transición se ve (captura: la ola Rosa arcilla entrando sobre el Cacao).
  · **4:** fuera los FALTA del pie (correo), de Proyectos y de Servicios; quedan los dos del equipo (`dist/index.html`: 2).
  · **5:** la sección de FAQ llevaba `data-brota` (máscara elíptica atada al alto de la sección): al abrir una FAQ la sección crece, el progreso de la
    máscara retrocede y borraba la línea de arriba → sin `data-brota` ahí.
  · **6:** las caras reales (`cara-eric.webp`, `cara-andoni.webp`) en vez de las iniciales.
  · **7:** la pantalla pasa a la caja blanca ENTERA medida en las láminas (39,03 · 36,96 · 21,78 × 21,04 %; antes recortaba 0,1 % por lado y dejaba un
    filo blanco); también el marco de sentado y las escenas de Otros trabajos.
  · **8:** solo el 12 % inferior de la lámina de hierba (las puntas), al 18 % del alto del paseo, al 38 %, fundida desde más abajo; delante, un filo del 6 %.
- **Fallos propios cazados:** un parche fallido a mitad (buscaba la línea mono antigua del contenido) dejó sin aplicar el resto del lote hasta rehacerlo.
- **Medido:** `astro check` 0 errores · `astro build` OK · `spacing-lint` en escala · `tools/verify.cjs` sobre `astro preview` (Chrome real y WebKit, 1280×720
  y 390×844): consola limpia, 0 respuestas ≥ 400, desborde 0 · `tools/r24.cjs` (los tres): FAQ abre y cierra con las seis líneas (WebKit: 1px solid en
  todas, capturas a medio abrir y a medio cerrar), hero y gota OK · `tools/r23-pie.cjs` (Chrome y WebKit): pintado, solape 77 px, línea sin mezcla ·
  `tools/r19-proy.cjs` (Chrome y WebKit) + zoom del monitor: la web ocupa la pantalla sin filo blanco · captura de la entrada al pie: la ola de color.
- **Backup:** `../savvia-web.bak-r25-2026-09-22/` (estado previo).
- **Pendiente de Andoni:** `x-frame-options` de Neety; permisos de clientes; los datos del equipo (los dos FALTA que quedan).

### Ronda 27 — 2026-09-22 · el pie a 80 px con «Contáctanos» cortado por la hierba, la línea de las FAQ (ahora sí), la luz del hero que sigue al ratón, la estela limpia, y enlaces sutiles
- **Andoni (textual):** 1 «El paisaje del footer más arriba aún. Que esté a 80 px de Carta fundacional» · 2 «Reestructurar el footer, quitamos
  hola@savvia. Ponemos un contáctanos grande entre los dos layers de paisaje, tiene que quedar cortado, y tiene que ocupar todo el ancho que marcan las
  líneas. Al hacer hover se difumina» · 3 «Las FAQ al abrirse siguen haciendo que la línea superior de esa sección se vaya» · 4 «En el hero, tal y como
  el árbol tiene un rayo de luz, que ese rayo entre desde arriba afectando a todo el hero, como si entrase por una ventana desde la naturaleza y genere
  sombras muy sutiles. También se mueve siguiendo al ratón» · 5 «La estela que marcamos Eric y yo tiene que ser algo muy sintetizado con el fondo, que
  no parezca un pegote y no se vean líneas de corte por arriba y por abajo. Algo muy limpio» · (a media ronda) «El botón de ver todos los proyectos,
  mucho más sutil, como el de ver documento. Y el texto de debajo de ver documento va fuera» · «Recuerda que la luz tiene que salir después de la
  animación inicial de la web».
- **Hecho:**
  · **1 · pie:** fuera el `min-height`; `padding-bottom = 80px + 0,564 × alto del paisaje` (las cimas están al 43,6 % de la lámina) → cimas a 79 px del
    último enlace (medido).
  · **2:** fuera el correo. «Contáctanos» (Family, enlace `mailto:`) entre los árboles y la hierba, que le tapa el pie: cortado. A todo el ancho de las
    líneas: el tamaño de letra sale de medir el texto y corregirlo con el ancho real del elemento (1172 px en 1184). Al pasar, se difumina (blur 7 px).
    El bloque del contenido ya no coge el puntero (pisaba el «Contáctanos»); solo sus enlaces.
  · **3 · `Carriles.astro`:** la causa real: las filas se RECREAN en cada cambio de alto del body (abrir una FAQ) y, con `html.carriles-entran` puesto,
    cada fila nueva volvía a TRAZARSE de 0 a 100 % (la línea «se iba» y volvía). Ahora, pasados 1,5 s del primer trazado, las filas recolocadas nacen
    quietas (`.fila.quieta`). Medido: al abrir, la fila sigue a 1280 px de ancho en todo momento (antes, 950 a medio trazo).
  · **4 · hero:** dos haces oblicuos de Rosa niebla en «screen», más fuertes arriba (máscara), que se desplazan con el ratón (lerp 0,05; en táctil y con
    movimiento reducido, quietos); el titular proyecta una sombra que se mueve al contrario; los haces del árbol (shader, uniform `lx`) siguen la misma
    luz. Y solo después de la animación inicial: la luz y la sombra entran (2,4 s) con `.crecido`.
  · **5 · estudio:** fuera la lámina: un SUELO blando (elipse de Nogal al 50 % → 0, sin bordes) que se descubre por donde ya han pasado, y pocas briznas
    cortas y pálidas (VW/26 matas; alfa 0,3–0,5); la base se funde en 26 px. Sin cortes.
  · **(media ronda):** «Todos los proyectos» como «Ver documento» (subrayado que crece + flecha; sin píldora); fuera el cierre bajo «Ver documento».
- **Fallos propios cazados:** un parche partió la regla `.contenido` y dejó una llave suelta: los dos motores descartaban la regla siguiente
  (`.titular .marca`), y el logotipo del titular salía a 72 px de alto en WebKit (681×373) → arreglado; el «Contáctanos» se quedaba un 6 % corto
  (el lienzo medía con la fuente de respaldo) → corrección con el ancho real.
- **Medido:** `astro check` 0 errores · `astro build` OK · `spacing-lint` en escala · `tools/verify.cjs` sobre `astro preview` (Chrome real y WebKit, 1280×720
  y 390×844): consola limpia, 0 respuestas ≥ 400, desborde 0 · `tools/r24.cjs` (los tres) · `tools/r23-pie.cjs` (los tres): logotipo 49 px, pintado, invierno
  · cimas a 79 px, «Contáctanos» 1172 px y `blur(7px)` al pasar, enlaces clicables · fila de la sección de FAQ a 1280 px antes, durante y después de abrir
  · luz a 0 al cargar y tras saltar, a 1 con el árbol pintado; capturas con el ratón a la izquierda y a la derecha.
- **Backup:** `../savvia-web.bak-r26-2026-09-22/` (estado previo).
- **Pendiente de Andoni:** `x-frame-options` de Neety; permisos de clientes; los datos del equipo.

### Ronda 28 — 2026-09-22 · la luz atraviesa el árbol, el pie a 160 px con los enlaces a la derecha y alineados, el logotipo al tamaño del título, «Contáctanos» mimetizado y la estela que se apaga al avanzar
- **Andoni (textual):** 1 «La luz que entra tiene que salir desde arriba y atravesar el árbol. Ahora mismo solo se queda en el árbol» · 2 «En el footer el
  paisaje lo movemos a 160 px de Carta fundacional» · 3 «Las opciones de navegación pegadas a la derecha y alineadas arriba con el título de la
  izquierda» · 4 «El logo de savvia tiene que tener el mismo tamaño de letras que el resto del título y estar completamente alineado» · 5 «El contáctanos
  tiene que mimetizarse más con el fondo» · 6 «La estela que nos sale a Eric y a mí, que desaparezca según avanzamos hasta que estemos en el centro y ya
  queda limpio».
- **Hecho:**
  · **1 · hero:** los haces llegan enteros hasta abajo (la máscara solo apaga el último tramo: 100 % hasta el 62 %, 35 % al final) y son más fuertes
    (pico 0,26 en «screen»): entran desde arriba y cruzan el árbol; los del shader siguen sincronizados con el ratón.
  · **2 · pie:** `padding-bottom = 160px + 0,564 × alto del paisaje` → cimas a 159 px del último enlace (medido).
  · **3:** la lista de enlaces alineada a la derecha (pegada a la línea: 0 px) y su primera mayúscula a la altura de la del titular (desplazamiento de
    0,14 × el cuerpo del h1: 10 px a 1280; medido: caja del titular 161 → mayúscula ~175; enlace 171 → ~175).
  · **4:** el logotipo mide ahora la ALTURA DE ASCENDENTES de Family (0,71 em, medida con la «l»): el punto de la i arriba del todo y su «a» a 0,494 em,
    un 5 % sobre la x de Family; sin el desplazamiento de 0,03 em: el pie de las letras en la línea base. Ancho 2,29 em (51 px de alto a 1280).
  · **5:** «Contáctanos» en Cacao con `mix-blend-mode: multiply` al 42 % (al pasar, 55 % y desenfocado): se hunde en el paisaje.
  · **6 · estudio:** la estela solo queda en un tramo detrás de cada uno (se funde hacia atrás en un 30 % del paseo) y TODO se apaga con el avance
    (factor 1 − avance/0,9): al juntarse en el centro no queda nada. Suelo al 70 % y briznas al 0,42–0,67 para que se vea mientras dura.
- **Medido:** `astro check` 0 errores · `astro build` OK · `spacing-lint` en escala · `tools/verify.cjs` sobre `astro preview` (Chrome real y WebKit, 1280×720
  y 390×844): consola limpia, 0 respuestas ≥ 400, desborde 0 · `tools/r23-pie.cjs` y `tools/r24.cjs` (los tres) OK · medidas del pie: cimas 159, enlaces a
  0 px de la línea, logotipo 51 px, «Contáctanos» en multiplicar · capturas: luz cruzando el árbol; estela a medio camino y limpia al juntarse.
- **Backup:** `../savvia-web.bak-r27-2026-09-22/` (estado previo).
- **Pendiente de Andoni:** `x-frame-options` de Neety; permisos de clientes; los datos del equipo.

### Ronda 29 — 2026-09-22 · el «Contáctanos» tras el paisaje y más hundido, la luz del hero visible fuera del árbol, la estela más presente
- **Andoni (textual):** 1 «El contáctanos tiene que salir después de que haya salido el paisaje, y tiene que estar aún más metido hacia abajo» · 2 «En el hero
  solo veo los rayos de luz en el árbol, no por fuera» · 3 «La estela que dejamos Eric y yo tiene que notarse más».
- **Hecho:**
  · **1 · pie:** «Contáctanos» nace a opacidad 0 y sin puntero; entra (1,6 s) con `.pintado` (el paisaje ya dibujado y pintado). Del 26 % al 12 % desde
    abajo: la hierba le tapa más de la mitad.
  · **2 · hero:** la capa de luz iba en `mix-blend-mode: screen`, y fuera del lienzo del árbol Safari no la pintaba (Chrome sí, tenue). Ahora es luz
    NORMAL: Rosa niebla translúcida (haces al 17 % de pico) + un RESPLANDOR de ventana arriba (elipse radial, 13 %) que también sigue al ratón; la máscara
    solo apaga el último 30 %. Sombra del titular algo más marcada (0,55). Captura: los haces cruzan todo el hero y el árbol.
  · **3 · estudio:** el resplandor del suelo estaba centrado en el paseo (donde aún no habían pasado) y la máscara lo borraba: ahora hay una elipse cálida
    (126·84·60) bajo los pies de CADA uno, que la máscara recorta a lo que queda detrás (cola del 45 % del paseo); más matas (VW/16), briznas más altas
    y al 0,6–0,9; la franja que funde la base baja a 10 px. Se apaga con el avance con curva cúbica (1 − (avance/0,98)³): entera hasta media marcha, 0 al
    juntarse. Medido: cobertura del lienzo 7,4 % → 6,1 % → 0 % a lo largo del paseo.
  · **(media ronda) · la luz incide en el árbol:** el brillo del árbol (shader) baja de 0,95 a 0,5 y se coloca EXACTAMENTE bajo el haz principal del
    hero: misma inclinación (18°, tan 0,325) y la misma x a la altura de la copa, calculada de la geometría (`alinear()` en Hero.astro; también con el
    ratón). Lo que se ve es un haz que entra desde arriba y cae sobre el árbol.
- **Medido:** `astro check` 0 errores · `astro build` OK · `spacing-lint` en escala · `tools/verify.cjs` sobre `astro preview` (Chrome real y WebKit, 1280×720
  y 390×844): consola limpia, 0 respuestas ≥ 400, desborde 0 · `tools/r23-pie.cjs` (WebKit) y `tools/r24.cjs` (WebKit y 390) OK · «Contáctanos» a 0 a los
  2,5 s de llegar y a 0,42 con el paisaje pintado.
- **Backup:** `../savvia-web.bak-r28-2026-09-22/` (estado previo).
- **Pendiente de Andoni:** intensidad de la luz (haces 17 %, ventana 13 %); `x-frame-options` de Neety; permisos de clientes; los datos del equipo.

### Ronda 30 — 2026-09-22 · un solo haz sutil tras el titular que entra antes que la luz del árbol, «Contáctanos» más arriba, la tarjeta de Remerge cubierta
- **Andoni (textual):** «vamos a hacer unas pruebas más con el haz de luz y si no lo quitamos» · 1 «El haz de luz del hero tiene que ser más sutil y solo
  salir desde un sitio. Va por detrás del titular. Y en la animación de carga primero entra el haz desde arriba del hero y luego crea la luz en el árbol»
  · 2 «En el footer contáctanos más arriba, que se vea algo más» · 3 «Solucionar el problema de la card de Remerge» → «es la card que no cubre todo, es la
  única que no se ve redondeada».
- **Hecho:**
  · **1 · hero:** UN solo haz (fuera el segundo y el resplandor de ventana), pico 0,11, en `z-index: 0` (detrás del titular, z 1, y del árbol). SECUENCIA: al
    caer la gota (`savvia:gota`) el haz ENTRA desde arriba (`.luz-entra`: opacidad 0 → 1 y baja un 18 % en 2,6 s) mientras el árbol se dibuja; la luz sobre
    el árbol la pone el shader al terminar de pintarse (ronda 29: alineada bajo el haz, a media intensidad). Medido: haz a 0,52 a los 0,3 s y a 0,95 a
    1,2 s de la gota; perfil de brillo con el haz presente (38 → 56 → 38 en la fila 380).
  · **2 · pie:** «Contáctanos» del 12 % al 19 % desde abajo.
  · **3 · Otros trabajos:** la escena del móvil iba con zoom 1,35: la lámina 16:9 solo cubría el 76 % de alto de la pieza cuadrada (por eso ni redondeaba
    ni tapaba el fondo). Zoom 1,9: cubre (medido: la mesa 719×405 sobre una pieza de 379×379, pantalla del móvil centrada, 105×226).
- **Fallos propios cazados:** un parche dejó las reglas de la máscara fuera de `.luz` (llave de más) y los dos motores descartaron la regla del haz: el haz
  no se pintaba (perfil de brillo plano) → recompuesto. Regla nueva para la casa: tras cada parche de CSS, medir un perfil de brillo o el estilo computado, no
  solo mirar la captura.
- **Medido:** `astro check` 0 errores · `astro build` OK · `spacing-lint` en escala · `tools/verify.cjs` sobre `astro preview` (Chrome real y WebKit, 1280×720
  y 390×844): consola limpia, 0 respuestas ≥ 400, desborde 0 · `tools/r23-pie.cjs`, `tools/r24.cjs` (WebKit), `tools/r19-otros.cjs` OK.
- **Backup:** `../savvia-web.bak-r29-2026-09-22/` (estado previo).
- **Pendiente de Andoni:** si el haz se queda o se quita (hoy: uno, al 11 %); el vídeo de Remerge lleva capturado un botón azul de consentimiento de su web
  (abajo a la izquierda): se regraba escondiéndolo si se quiere; `x-frame-options` de Neety; permisos de clientes; los datos del equipo.

### Ronda 31 — 2026-09-22 · sin sombra en el titular, haz más tenue, y «Contáctanos» que se vuelve CTA al pasar
- **Andoni (textual):** 1 «El titular del hero le has puesto un sombreado que no quiero. El haz de luz todavía un poco más sutil» · 2 «El contáctanos cuando le
  haces hover que se convierta en un CTA».
- **Hecho:**
  · **1 · hero:** fuera la sombra del titular (`text-shadow: none`, medido); el haz baja del 11 % al 7,5 % de pico.
  · **2 · pie:** al pasar por «Contáctanos» ya no se difumina: sale del paisaje (sin `multiply`), pasa a NARANJA pleno y a opacidad 1, y encima aparece el
    correo en mono con una flecha («hola@savvia.studio →»), que sube 6 px al entrar. Medido: color 255·104·31, mezcla normal, correo a 1.
- **Medido:** `astro check` 0 errores · `astro build` OK · `spacing-lint` en escala · `tools/verify.cjs` sobre `astro preview` (Chrome real y WebKit, 1280×720
  y 390×844): consola limpia, 0 respuestas ≥ 400, desborde 0 · `tools/r23-pie.cjs` (WebKit) OK.
- **Backup:** `../savvia-web.bak-r30-2026-09-22/` (estado previo).
- **Pendiente de Andoni:** si el haz se queda (hoy 7,5 %); el botón de consentimiento capturado en el vídeo de Remerge; `x-frame-options` de Neety; permisos
  de clientes; los datos del equipo.

### Ronda 32 — 2026-09-22 · «Contáctanos» hace emerger del paisaje un formulario de contacto en cristal esmerilado
- **Andoni (textual + referencia: una barra de cristal esmerilado sobre un fondo orgánico, con la flecha «↳» a la izquierda y cruces «+» fuera de las
  esquinas):** «quiero que el contáctanos se convierta en algo estilo lo que te paso» → «mejor: cuando hagas hover en contáctanos, que salga como si
  emergiera del paisaje un formulario de contacto» → «con el estilo ese de cristal esmerilado».
- **Hecho (`Pie.astro`):** «Contáctanos» pasa a ser un botón (`aria-expanded`, `aria-controls`). Al pasar el ratón (o pulsar, o enfocar con teclado) la
  palabra se retira (desenfoque + opacidad) y del horizonte SUBE el formulario: panel de cristal esmerilado (Rosa niebla al 46 % + desenfoque de fondo 20 px
  + filo + sombra suave) a todo el ancho de las líneas, con las cuatro cruces fuera de las esquinas; entra desplazándose y recortado por abajo
  (`clip-path`), 0,9 s. Campos: Nombre · Correo · Cuéntanos (subrayados; foco en Naranja); «Enviar» con la flecha «↳»; «cerrar». Se queda abierto mientras
  se rellena; Esc, «cerrar» o un clic fuera lo devuelven al paisaje. ENVÍO: hoy por `mailto:` (se abre el correo con el mensaje listo y firmado): no hay
  servidor.
- **Fallos propios cazados:** un comentario HTML dentro de una expresión JSX rompió la página (500 en la verificación): fuera del `map`.
- **Medido:** `astro check` 0 errores · `astro build` OK · `spacing-lint` en escala · `tools/verify.cjs` sobre `astro preview` (Chrome real y WebKit, 1280×720
  y 390×844): consola limpia, 0 respuestas ≥ 400, desborde 0 · `tools/r23-pie.cjs` (WebKit y 390) OK · Chrome 1280: al pasar, formulario `on` de 1184×287 con
  `backdrop-filter`, palabra a 0, tres campos; sigue abierto al escribir; Esc lo cierra y la palabra vuelve. Capturas a 0,35 s (emergiendo) y abierto.
- **Ajustes de la misma ronda (Andoni):** «el cristal tiene que quedar metido entre el paisaje como el contáctanos» · «el botón de cerrar no funciona» ·
  «el contáctanos tiene que ir con la tipografía de los titulares; para que el formulario entre entero podemos separar más el paisaje de las opciones de
  arriba» → el formulario vive DENTRO del paisaje, entre los árboles y la hierba (velo z 1 · cristal z 2 · hierba z 3): la hierba le corta el pie por los
  lados y «Enviar» va centrado, en el valle (medido: clicable); el cierre es una × en la esquina y ya cierra (el fallo: al devolver el foco a «Contáctanos»,
  el `focus` lo reabría → solo abre con foco de teclado y se ignora tras cerrar); «Contáctanos» en Family (`font: inherit` del botón la pisaba: medido
  `Family`); el paisaje a 280 px de «Carta fundacional» (antes 160) para que el panel entre entero por debajo de los enlaces.
- **Backup:** `../savvia-web.bak-r31-2026-09-22/` (estado previo).
- **Pendiente de Andoni:** el envío real (un servicio de formularios o un endpoint: hoy `mailto:`); los textos de los campos; el botón de consentimiento en el
  vídeo de Remerge; si el haz del hero se queda; `x-frame-options` de Neety; permisos de clientes; los datos del equipo.

### Ronda 33 — 2026-09-22 · el formulario sale de verdad de las montañas
- **Andoni (textual):** «no lo conseguimos: el formulario tiene que salir desde abajo para que parezca que sale desde las montañas. Hazlo más alto para que el
  CTA entre bien y deja más espacio por los lados; de esta manera llegará hasta abajo la card y parecerá que sale de verdad de las montañas».
- **Hecho (`Pie.astro › .formulario`):** el panel apoya su pie en el borde inferior del paisaje (`bottom: 0`; medido: 0 px), es más estrecho (60 % de las
  líneas, mínimo 40 rem: 768 px a 1280) y más alto (395 px: el relleno de abajo, el 30 % del alto del paisaje, sube el CTA hasta el valle). ENTRA subiendo
  desde detrás de las colinas: `translate` del 100 % a 0 en 1,1 s, sin fundido ni recorte (el paisaje, con `overflow: hidden`, esconde lo que aún está
  bajo tierra); al cerrar vuelve a hundirse. Sigue entre los árboles y la hierba: la hierba lo corta por los lados; «Enviar» y la × quedan libres (medido).
- **Medido:** `astro check` 0 errores · `astro build` OK · `spacing-lint` en escala · `tools/verify.cjs` sobre `astro preview` (Chrome real y WebKit, 1280×720
  y 390×844): consola limpia, 0 respuestas ≥ 400, desborde 0 · `tools/r23-pie.cjs` (WebKit y 390) OK · Chrome: capturas a 0,3 s (a medio subir) y abierto;
  pie en el borde, por debajo de los enlaces, Enviar y × clicables, cierra.
- **Backup:** el de la ronda 32 (`../savvia-web.bak-r31-2026-09-22/`) sigue siendo el previo a este bloque.
- **Pendiente de Andoni:** el envío real del formulario; y lo de siempre.

### Ronda 34 — 2026-09-22 · «Enviar» por encima del prado
- **Andoni (textual + captura):** «el Enviar ponlo donde te indico [abajo a la derecha del panel] por encima del prado, así generamos como un efecto visual».
- **Hecho (`Pie.astro`):** el botón sale del panel (un hijo del panel no puede pintarse sobre la hierba, que va delante) y vive en el paisaje DESPUÉS de la
  hierba (z 4), enviando el formulario por su atributo `form="form-contacto"`. Se coloca en la esquina inferior derecha del panel (misma fórmula de ancho:
  a 24 px de su borde derecho, a un 14 % del alto del paisaje): la hierba le pasa por detrás. Sube y baja con el panel (`.form-abierto`), fuera del orden
  de tabulación mientras está cerrado. El aviso de envío se escribe antes de abrir el correo.
- **Fallo propio cazado:** el clic en «Enviar» (fuera del panel) contaba como «clic fuera» y cerraba el formulario antes de enviar (medido: el submit no
  se disparaba) → el botón queda excluido de esa comprobación; ahora el clic dispara el submit y escribe el aviso.
- **Medido:** `astro check` 0 errores · `astro build` OK · `spacing-lint` en escala · `tools/verify.cjs` sobre `astro preview` (Chrome real y WebKit, 1280×720
  y 390×844): consola limpia, 0 respuestas ≥ 400, desborde 0 · `tools/r23-pie.cjs` (WebKit y 390) OK · Chrome: botón a 24 px del borde derecho del panel,
  z por delante de la hierba, clicable, y su clic dispara el `submit` del formulario.
- **Pendiente de Andoni:** el envío real; y lo de siempre.

### Ronda 35 — 2026-09-22 · la tarjeta llega hasta arriba (y el CTA entra dentro); la línea mono legible sobre cualquier fondo
- **Andoni (textual + captura con una línea roja bajo los enlaces):** «nada nada: que la card llegue hasta donde te llego y así entra dentro el CTA» ·
  «haz que savvia · Donostia · desde 2020 y © 2026 se lean bien independientemente del fondo».
- **Hecho (`Pie.astro`):** «Enviar» vuelve DENTRO del panel (abajo a la derecha de los campos, junto al aviso). El panel es más alto (relleno inferior del
  52 % del alto del paisaje: el CTA queda por encima del prado, a 222 px del borde inferior a 1280) y ASOMA por encima de las colinas: la caja del paisaje lleva una
  franja transparente arriba (`--extra`: 12 rem) con las capas ancladas abajo a su alto propio (`--alto`), y sigue recortando de verdad con `overflow: clip`
  (un primer intento con `clip-path` dejó 26 px de desborde horizontal: clip-path recorta lo visible, no lo que hace scroll → cazado por verify), y el pie deja 400 px entre «Carta fundacional» y el
  paisaje (el panel queda a 160 px de los enlaces). Sigue subiendo desde detrás de las colinas y la hierba lo corta por los lados. La línea mono: primero sobre
  píldoras de cristal (Andoni: «quita lo que le has puesto rodeando, el típico efecto de color dodge y listo») → sin nada alrededor, Rosa niebla en
  `mix-blend-mode: color-dodge`. Y «el botón de enviar más abajo»: relleno inferior del panel del 52 % al 40 % del alto del paisaje (Enviar a ~170 px del
  borde inferior, libre por encima del prado).
- **Medido:** `astro check` 0 errores · `astro build` OK · `spacing-lint` en escala · `tools/verify.cjs` sobre `astro preview` (Chrome real y WebKit, 1280×720
  y 390×844): consola limpia, 0 respuestas ≥ 400, desborde 0 · `tools/r23-pie.cjs` (WebKit y 390) OK · Chrome: panel asoma (top 231 < paisaje 285),
  a 160 px de los enlaces, Enviar dentro, libre y su clic dispara el submit; píldoras con `backdrop-filter`.
- **Pendiente de Andoni:** el envío real; y lo de siempre.

### Ronda 36 — 2026-09-22 · el CTA a ras del prado, con hover de gota que cae donde está el puntero
- **Andoni (textual + captura con la posición marcada bajo el botón):** «ahí tiene que ir el CTA, y ponle una animación de hover como si cayese una gota
  dentro cuando haces hover y que empiece eso desde donde pones el ratón».
- **Hecho (`Pie.astro › .enviar`):** el relleno inferior del panel baja al 34 % del alto del paisaje: el pie del botón descansa en el borde del prado (la hierba
  le roza la base por la derecha; el resto, libre). HOVER DE GOTA: al entrar el puntero, el JS fija el punto de caída (`--gx/--gy`, en % del botón) y un
  disco Naranja nace ahí (scale 0 → 1, 0,7 s expo) hasta llenar el botón, con un aro de onda que se abre y se apaga desde el mismo punto; el texto pasa a
  Cacao. Al salir, el disco se recoge hacia el punto por donde salió el ratón. Con teclado (foco) se llena desde el centro; con movimiento reducido, sin
  animación.
- **Medido:** `astro check` 0 errores · `astro build` OK · `spacing-lint` en escala · `tools/verify.cjs` sobre `astro preview` (Chrome real y WebKit, 1280×720
  y 390×844): consola limpia, 0 respuestas ≥ 400, desborde 0 · `tools/r23-pie.cjs` (WebKit y 390) OK · Chrome: gota en (6,8 %, 12,5 %) al entrar por la
  esquina, botón lleno (scale 1, texto Cacao), vacío al salir; capturas a 160 ms y lleno.
- **Pendiente de Andoni:** el envío real; y lo de siempre.

### Ronda 37 — 2026-09-22 · la tarjeta sube hasta la línea marcada, sin mover el botón
- **Andoni (textual + captura):** «el formulario quiero que suba hasta ahí y deja el botón donde está; no quiero que bajes el formulario entero».
- **Hecho (`Pie.astro`):** la tarjeta crece por ARRIBA: cabecera de 64 px, «Cuéntanos» de 5 líneas y 32 px entre campos; el pie y «Enviar» no se mueven
  (relleno inferior al 34 %). La franja transparente del paisaje sube a 18 rem para que asome. Medido a 1280: tarjeta de 537 px, su copa 100 px por encima
  de las colinas y a 104 px de los enlaces; «Enviar» a 145 px del borde inferior, libre; desborde 0.
- **Medido:** `astro check` 0 errores · `astro build` OK · `spacing-lint` en escala · `tools/verify.cjs` sobre `astro preview` (Chrome real y WebKit, 1280×720
  y 390×844): consola limpia, 0 respuestas ≥ 400, desborde 0 · `tools/r23-pie.cjs` (WebKit y 390) OK.
- **Pendiente de Andoni:** el envío real; y lo de siempre.

### Ronda 38 — 2026-09-22 · PUBLICADA en savvia.studio (con sonido más bajo, metadatos de compartir y Agentation para Eric)
- **Andoni (textual):** «vamos a publicarlo en savvia.studio» · (antes) «el sonido de las estaciones tiene que ser más sutil, se escucha demasiado» · «y pon
  el agentation para que Eric pueda dejar feedback».
- **Hecho:**
  · **Sonido (`sonido-estudio.ts`):** pico del ambiente 0,05 → 0,018; el doble clic de cambio a la mitad; sentarse y levantarse a la mitad.
  · **Metadatos (`Base.astro`):** `og:type/site_name/locale/url/title/description/image` (URL absoluta: https://savvia.studio/og.jpg, 1200×630, 89 KB: el
    hero con el roble pintado, sin barra ni carriles, generado con Chrome real), `twitter:card=summary_large_image`, `apple-touch-icon` (la vv sobre Cacao).
    Canonical y `theme-color` ya estaban. Sigue `noindex`.
  · **Agentation (`Base.astro`, `<script is:inline>`):** solo con `?feedback=1`; carga react + agentation 3.0.2 desde esm.sh con `?deps=` (una sola
    instancia de React); en móvil avisa «solo escritorio». Sin el parámetro no se pide nada.
  · **Publicación:** `astro build` → `dist/` enlazado al proyecto `savvia-home` (los ids de `../savvia_inspo/dist/.vercel/project.json`) →
    `vercel deploy --prod --yes`. El dominio no se ha tocado (ya apuntaba a ese proyecto).
- **Medido EN VIVO (https://savvia.studio):** `tools/verify.cjs` con Chrome real y WebKit, 1280×720 y 390×844: consola limpia, 0 respuestas ≥ 400,
  desborde 0, Family/Manrope/IBM Plex Mono cargan · `og:image` responde 200 `image/jpeg` · la página es la nueva (`data-contacta` presente) ·
  `/?feedback=1`: barra de Agentation y lienzo de anotación presentes, consola limpia.
- **Backup:** los de las rondas anteriores; la web anterior sigue reconstruible desde `../savvia_inspo/`.
- **Pendiente de Andoni:** la LICENCIA de Family (sigue siendo el archivo de PRUEBA de Klim: los titulares con tilde caen a Georgia y servirla en abierto
  incumple sus condiciones de prueba: comprarla y sustituir el archivo); quitar `noindex` cuando toque; el envío real del formulario (hoy `mailto:`);
  `x-frame-options` de Neety; permisos de clientes; datos del equipo; el botón de consentimiento en el vídeo de Remerge.

- **Nota (22/09, tras publicar):** Andoni: «el formulario por el momento es diseño, no funciona». Se queda así: al enviar intenta abrir el correo del
  visitante con el mensaje escrito (`mailto:`); sin cliente de correo, nada visible. Para que envíe de verdad: Formspree/Web3Forms (cuenta con
  hola@savvia.studio + clave) o una función en Vercel con Resend (clave + dominio verificado). Pendiente de decisión.

### Ronda 39 — 2026-09-23 · claim hacia el cliente, dolores con el scroll, reestructura, Servicios tipo Athletics, voces entre proyectos, fondo por estación, raíces fijas, Areal a prueba, láminas a 8K y «savvia agentic»
- **Andoni (textual, 13 puntos + las cuatro láminas de la mesa a 8K + ABC Areal):** 1 «Los mockups del ordenador hay que hacerlos más nítidos» · 2 «Quiero
  probar como sans la Areal que te paso, también la probamos como mono» · 3 «Hay que poner algún indicador de que se puede hacer scroll en el ordenador.
  También tiene que ser más notorio que el menú de la izquierda puedes cambiar de proyecto» · 4 «El claim principal […] algo que responda hacia el cliente.
  Qué hay aquí para mí. Y el estudio web que orquesta la IA lo dejamos para el equipo o servicios» · 5 «La segunda sección tenemos que enfocarla más a los
  pains del usuario. Y no hacer que sea un slider, hacer como que es un recorrido que funciona con el scroll» · 6 «Reestructuramos la web: hero > pains >
  proyectos destacados > nuestros proyectos (pasa a este título) > servicios > savvia es la receta de tu web > equipo > FAQs > footer» · 7 «Para mostrar
  servicios algo estilo […] athleticsnyc.com, Our specialties» · 8 «Siempre hablamos de cara a resolver cosas hacia la persona que entra, el yo solo lo
  proyectamos en equipo» · 9 «Después de proyectos destacados ya no atrapamos el scroll» · 10 «En nuestros proyectos tenemos que ver la manera de
  intercalar testimonios, quitándolos de servicios» · 11 «Que el color oscuro de fondo cambie con las estaciones […] Otoño sería el que casa con el actual» ·
  12 «En el hero las raíces se sincronizan con cada estación del año y ya no aparecen en scroll, son fijas, y en scroll mantenemos solo la gota» · 13 «Tenemos
  que buscar alguna forma de introducir un nombre para productizar savvia, savvia agentic o algo así».
- **Referencia medida (athleticsnyc.com, `tools/ref39/`):** lista de cuatro especialidades en serif enorme con letra de índice A–D; con el scroll las líneas
  se aclaran; al pasar por una, las demás se apagan y brotan PÍLDORAS de color (subespecialidades) encima y alrededor de la palabra, rectas.
- **Hecho:**
  · **1:** láminas nuevas (7680×4320) → `public/media/estudio/*-m.webp` 1600 · `*.webp` 2560 · `*-xl.webp` 5120 (76–380 KB). Se pide la que cubre la pantalla
    a su densidad; al sentarse, las cuatro suben a 5120. Pantalla medida otra vez: 39,12 · 37,03 · 21,61 × 20,92 %, dentro de la caja de siempre (no cambia).
    Las de 1672 px, en `tools/bak-estudio-r38/`.
  · **2:** ABC Areal (variable) + ABC Areal Mono (400/500) por la API de fuentes; `?tipo=antes` para comparar. Copy de la receta y de las demos, actualizado.
  · **3 · `Proyectos.astro`:** píldora «desliza dentro» con la rueda del ratón al pie de la web; sale al descubrirse cada web y se va cuando el puntero entra
    en la pantalla o te sientas. Dial: «Proyectos 01/04», flechas arriba y abajo, cursor de arrastre vertical y, al llegar, un empujón del dial (sube y baja)
    con las flechas latiendo.
  · **4 + 8 · copy (`home.ts`):** hero «Una web que crece contigo.» / «A medida, con criterio y lista para que la cambies con IA.»; Estudio «El estudio web que
    orquesta la IA.»; preguntas, servicios y dolores en segunda persona; título, descripción e imagen para compartir rehechos (`tools/r39-og.cjs`).
  · **5 · `Recorrido.astro` (rehecho):** cuatro dolores («Tu web ya no cuenta lo que haces.» · «Tu web podría ser la de cualquiera.» · «Nadie sabe ya por qué tu
    web es así.» · «Cada cambio es un presupuesto y una espera.») con su respuesta y la demo de siempre en el centro, sobre el eje del roble. Escritorio: pista
    de 100 + 4 × 75 lvh; en cada parada un hilo Naranja sale del dolor, llega a la tarjeta (que despierta con su onda), sigue a la respuesta y la descubre;
    el carril de abajo se llena. La gota de la raíz cae en la primera tarjeta justo cuando la pista se fija. Móvil y movimiento reducido: apiladas.
  · **6:** orden nuevo; Proyectos sin transición de color (viene de oscuro); el Estudio, que ahora sale de La savvia (clara), lleva la transición líquida.
  · **7 · `Servicios.astro` (rehecho):** A · B · C en mono, nombre en Family de 48 a 112 px cuya tinta se llena con el scroll, y al lado lo que te llevas; al
    pasar, las otras se desenfocan y brotan las etiquetas (en móvil, debajo y siempre visibles). Cierre con la marca «savvia agentic».
  · **9:** después de Proyectos no hay nada fijado.
  · **10 · `Anteriores.astro`:** cinco voces intercaladas en cuatro filas (Invopop junto a Invopop, Isotrol junto a Isotrol), cita en Family.
  · **11:** `--noche` por estación (tabla en DESIGN.md), con transición de 2,4 s; el árbol se mimetiza con el fondo nuevo (uniform `fo`) y `theme-color` cambia.
  · **12 · `Raices.astro`:** pintadas desde el principio; viran con la estación bajando desde el cuello (0,7 s después que la copa).
  · **13:** `Agentic.astro` + `producto` en `home.ts` + la pregunta «¿Qué es savvia agentic?».
- **Medido:** `astro check` 0 errores · `astro build` OK · `spacing-lint` en escala · `tools/verify.cjs` (Chrome real y WebKit, 1280×720 y 390×844): consola
  limpia, 0 respuestas ≥ 400, desborde 0, Family + ABC Areal + ABC Areal Mono cargan · `tools/r39.cjs` (Chrome 1280 y 390, WebKit 1280): gota → despierta al
  fijarse, parada 0 resuelta, paradas 1–3 activas y resueltas en orden; clic en el árbol → `html[data-estacion]=invierno`, fondo 27·36·45, theme-color #1b242d;
  flecha del dial 01 → 02; señal de scroll encendida; voces en su sitio; etiquetas a opacidad 1 al pasar · `tools/r39-sentado.cjs` (DPR 2): 2560 → 5120 al
  sentarse · movimiento reducido: sin carga, dolores apilados y resueltos · `?tipo=antes`: Manrope + IBM Plex Mono. **SIN medir:** fluidez en GPU real.
- **Backup:** `../savvia-web.bak-r38-2026-09-23/` (estado previo).
- **Pendiente de Andoni:** si Areal se queda (y si la licencia de Dinamo cubre el uso web de savvia); el nombre «savvia agentic» y dónde más debe aparecer
  (alternativas: «savvia.md» como producto, «savvia core»); los textos de los dolores, las respuestas y las etiquetas de Servicios (de Nilo); en móvil
  dos voces seguidas en «Nuestros proyectos» (Minimum Run y Monad); **no se ha publicado**: savvia.studio sigue con la ronda 38 hasta que lo pidas.

### Ronda 40 — 2026-09-23 · paleta de estaciones, árbol en el color de la estación, boceto que cobra vida, raíz con brotes, destacados de savvia agentic, web clara tras Proyectos, voces que rotan, titular del Keynote, demos en Servicios, menú y formulario que se dibujan, icono mórfico
- **Andoni (textual, 10 puntos + la tabla «Savvia — Colores por estación»):** 1 «Me gusta lo de las estaciones pero te voy a pasar una nueva paleta […] El árbol
  también tenemos que ajustar el color con el que se pinta por estación» · 2 «La card cuando llegas […] me desentona un poco porque venimos de mucha
  naturaleza. Que sea un boceto o algo muy mimetizado con el fondo y cuando le cae la gota desde arriba ya cobra la vida […] Luego el camino de los 4 pasos
  le falta ese toque savvia de naturaleza pero la estructura actual me gusta» · 3 «Los destacados de savvia agentic» · 4 «Quitamos proyectos con números.
  Con las flechas ya es suficiente. Y en vez de ver la web tenemos que poner ver caso de estudio» · 5 «La salida de proyectos destacados quitamos la
  animación, dejamos scroll normal. Y desde ahí la web ya es light mode, alternando entre los diferentes colores claros» · 6 «Los testimonios ponemos menos
  cantidad y que sean animados y vayan rotando» · 7 «El titular principal no tiene que ser crecer tu web, podemos mirar del documento keynote […] Lo mismo
  para los servicios» · 8 «Los servicios al hacer hover no usamos lo mismo que la referencia […] Y fuera el savvia agentic de aquí» · 9 «El formulario de
  contacto que salga dibujándose como lo hace el paisaje del footer, lo mismo cuando se cierra […] lo mismo para el menú superior» · 10 «Al lado del
  desplegable del menú un icono para cambiar de estación […] que el mismo icono se transforma en los 4 diferentes».
- **Del Keynote («Narrativa – Savvia», leído de sus .iwa):** el pitch («empresas que están cambiando y su web ya no les representa») y el mensaje clave de
  beneficio («mejor web en menos tiempo y a menor coste») → titular «Tu web, a la altura de lo que haces.» y subtítulo «Mejor web, en menos tiempo y a menor
  coste: con criterio y con IA.». Servicios: «Tres maneras de elevar tu web.».
- **Hecho:** 1 · paleta en `global.css`/`estacion.ts`/`<head>` (por meses); el shader pinta la hoja en el color de la estación (sombra · tono · luz + 14 % de
  la lámina); el halo del árbol es su silueta en `--arbol`; raíces y pie, igual. 2 · `Recorrido.astro`: dos capas por tarjeta (boceto con filtro de bordes de
  luminancia y trazo tembloroso; viva que se descubre en círculo desde la gota o el hilo); el carril es una raíz que ondula, la savia corre por ella y en cada
  parada resuelta brota un tallo con dos hojas en `--arbol`. 3–4 · Proyectos: título, flechas sin números, «Ver caso de estudio +». 5 · pista de 350 lvh sin
  salida; secciones claras alternas con transición líquida; pie oscuro (cristal oscuro, «Contáctanos» en Rosa niebla a poca tinta y Naranja al pasar).
  6 · tres voces que rotan cada 9 s (palabras que suben, hilo de savia que mide el tiempo, el proyecto citado lleva un punto de savia). 8 · `Servicios.astro`:
  demo al pasar (boceto → web · sección e idioma nuevos + publicado · checklist del equipo); en móvil, debajo y a la vista. 9 · `dibujar.ts`: líneas del contorno
  y de las partes, luego la pintura rasgada en círculo desde el puntero o el botón; al cerrar, al revés. 10 · icono mórfico (hoja · copo · flor · sol).
- **Fallos propios cazados:** el filtro del boceto convolucionaba también el alfa y borraba todo lo de dentro (solo quedaba el contorno) → `preserveAlpha`;
  el formulario se reabría si el puntero seguía sobre la palabra al cerrarlo → espera a que salga; un nombre (`dibujar`) chocaba con una función del pie.
- **Medido:** `astro check` 0 errores · `astro build` OK · `spacing-lint` en escala · `tools/verify.cjs` (Chrome real y WebKit, 1280×720 y 390×844): consola
  limpia, 0 respuestas ≥ 400, desborde 0 · `tools/r40.cjs` (Chrome 1280 y 390, WebKit 1280): icono → invierno 42·41·50 → primavera 56·42·45 → verano 31·53·42 →
  otoño 59·35·27; menú dibujado y cerrado; paradas en orden; sin «Proyectos 01/04», enlace `/casos/multiverse`, pista 3,5 pantallas; fondos claros alternos
  (234·221·231 / 229·172·158) y pie 59·35·27; voz 1 → Isotrol señalado, voz 2 → Invopop; formulario abierto y cerrado · boceto en Chrome y WebKit (captura) ·
  sentado 2560 → 5120 · movimiento reducido sin errores. **SIN medir:** fluidez en GPU real (máscaras animadas con desenfoque de fondo en el formulario).
- **Backup:** `../savvia-web.bak-r39-2026-09-23/`.
- **Pendiente de Andoni:** las páginas de caso de estudio (`/casos/<slug>`: hoy dan 404); si el pie oscuro es como lo imaginaba (la tabla lo nombra entre lo
  oscuro); el titular (alternativas del Keynote: «Mejor web, en menos tiempo.», «La web que te representa.»); las demos de Servicios (de Nilo); no publicado.

### Ronda 41 — 2026-09-23 · la primera tarjeta se dibuja como el árbol, flora de las láminas por estación, brotes al llegar, «Eleva tu web con criterio», llamada de scroll, navegador de cristal, voces centradas, icono de vídeo, icono relleno, estudio oscuro, formulario como el árbol, transición líquida lisa
- **Andoni (textual, 8 puntos + 2 a media ronda):** 1 «Las cards que se dibujan, solo se dibuja la primera y al caer la gota de savvia. Se tiene que dibujar como se dibuja
  el árbol, con ese toque de Shopify. El resto de cards ya van animadas como antes. Que la card tenga algunos detalles florales alrededor y que cambien con
  la estación. Luego abajo en la línea del proceso me gusta que salga el brote pero a veces no sale: que cada vez que llegues al paso salga» · 2 «El
  subtítulo del hero tiene que ser eleva tu web con criterio» · 3 «Lo de desliza dentro que salga como lo de sentarse. Y una vez deslizas se va» · 4 «Los
  testimonios que rotan, ponerlos entre medias de los destacados, centrado, y luego seguimos mostrando más proyectos. Los textos no tienen espacio entre las
  palabras. Solo mostramos el nombre de la persona […]. Cerciorarse que todos los proyectos encajan bien en el mockup. Añadir un icono de que los mockups
  tienen vídeo» · 5 «El icono de cambio de estación que sea relleno» · 6 «El estudio web que orquesta la IA con fondo oscuro» · 7 «El formulario de
  contáctanos probar que se dibuje como el árbol del hero» · 8 «En el footer también añadir más detalles de flora por cada estación» · (a media ronda)
  «la animación de cambio de color entre secciones […] hay un momento que se ve como geométrica y tiene que ser siempre fluida» · «el navegador de los
  proyectos destacados tiene que ser mucho más elegante, incluso un poco translúcido, que se note que cuando haces scroll la web pasa por debajo».
- **Hecho:** 1 · `Recorrido.astro`: la primera tarjeta está oculta hasta la gota; en el impacto el boceto aparece con un frente blando en círculo y la capa viva
  le sigue con la máscara rasgada (0,38 s detrás); luego el boceto se retira y arranca su demo. Las otras tres ya no tienen boceto. Flora detrás de cada tarjeta
  (`--flora-a/-b` por `html[data-estacion]`). Brotes con `li.on`. 2 · `home.ts`. 3 · `Proyectos.astro`: llamada (punto que late, línea, «Desliza dentro» con
  la rueda) desde la esquina de la pantalla hacia la mesa (en móvil, recta hacia abajo); una capa transparente sobre la web recoge el primer gesto (rueda, dedo
  o clic), quita la llamada y se retira. Navegador: barra de cristal claro (blanco 60 % + desenfoque 10 px + saturación) flotando sobre la web, que ocupa toda
  la pantalla. 4 · `Anteriores.astro`: la voz abre la sección, centrada, con un solo nombre y el hilo de savia; espacios entre palabras (se unían al partirlas);
  isotrol pasa al centro del mosaico; píldora «vídeo» en cada pieza que se retira mientras suena. Revisados los cuatro destacados en el monitor y las cinco
  piezas con su vídeo (capturas `r41-*-monitor-*`, `r41-*-pieza-*`): encajan. 5 · `Nav.astro`: relleno. 6 · `Estudio.astro` en `surface-dark`. 7 · `dibujar.ts`
  modo `arbol`. 8 · `Pie.astro`: tres ramas por estación a ras del prado. Transición: `entradas.ts` con 120 muestras concentradas alrededor de la cima (y pasos
  de 1/1000).
- **Fallos propios cazados:** el pie se quedaba SIN PINTAR si el observador de la llegada corría antes que el de los lienzos (al saltar al final): ahora la
  llegada los crea (3 de 3 pintados, antes fallaba al azar); la flora de las tarjetas desbordaba 350 px en móvil → `overflow-x: clip` en la sección (no rompe
  el fijado).
- **Medido:** `astro check` 0 errores · `astro build` OK · `spacing-lint` en escala · `tools/verify.cjs` (Chrome real y WebKit, 1280×720 y 390×844): consola limpia,
  0 respuestas ≥ 400, desborde 0 · `tools/r41.cjs` (Chrome 1280 y 390, WebKit 1280): tarjeta oculta antes de la gota y dibujada después; brotes en las cuatro
  paradas; llamada encendida y retirada tras la rueda (capa quitada); voz con espacios y un nombre; estudio 59·35·27; formulario abierto y cerrado sin copias;
  desborde 0. En la consola de Chrome aparece un error DENTRO de una web de cliente embebida («{{ s.t }}»), no de savvia.
- **Backup:** `../savvia-web.bak-r40-2026-09-23/`.
- **Pendiente de Andoni:** las páginas `/casos/<slug>`; si la flora de las tarjetas va también en móvil (hoy asoma poco); no publicado.

### Ronda 42 — 2026-09-23 · fuera la firma, flora pintada como el árbol en más sitios, testimonios en medio con flechas, cámara, el tiempo de cada estación en el pie, «Desliza dentro» hacia arriba
- **Andoni (textual, 6 puntos + captura de la firma + 1 a media ronda):** 1 «Lo que te paso en la captura va fuera» · 2 «Los detalles que hemos puesto en las
  cards me gustan pero tienen que ser más sutiles y, como el árbol del hero, se adaptan en color a la estación. Cuando cambiamos de estación cambian de color
  como el árbol» · 3 «Igual esos detalles de flora podemos añadirlos en más sitios de la web, de manera sutil» · 4 «Los testimonios no van antes de nuestros
  proyectos, van entre medias, y que puedas cambiar de testimonio con unas flechas muy sutiles» · 5 «El icono de vídeo sin texto, solo icono, el típico de la
  camarita» · 6 «En el footer […]: otoño caen hojas, invierno nieva, verano sale el sol (igual el rayo de luz), primavera salen flores» · (a media ronda)
  «desliza dentro que salga hacia arriba en vez de hacia abajo, para verse».
- **Hecho:** 1 · `Recorrido.astro` sin firma. 2–3 · `Flora.astro` (nuevo) con `estela.ts` (intensidad > 1,5 tiñe toda la lámina; el helecho, verde pálido, no
  pasaba el umbral de «hoja»); una pareja alrededor de la ranura de la tarjeta, dos junto a la voz, dos en el estudio y una en las preguntas (fondos claros:
  se mimetiza con Rosa niebla). 4 · `Anteriores.astro`: la voz es una fila entera tras la primera fila del mosaico, con flechas de 1,3 px. 5 · cámara de
  trazo en una píldora de cristal. 6 · `Pie.astro`: lienzo `[data-clima]` sobre el paisaje y bajo el texto; se apaga con el formulario abierto; al cambiar de
  estación se funde lo de antes y entra lo nuevo. `Proyectos.astro`: la llamada nace en la esquina superior izquierda de la pantalla y sube al cielo.
- **Fallos propios cazados:** la nieve seguía sobre el formulario abierto (la regla que la apaga perdía por especificidad contra la que la enciende) → medido
  en WebKit: 0,97 cerrado, 0 abierto; las flores de primavera no se veían (rosa sobre prado rosa) → claras con filo Rosa flor; la flora del estudio casi
  desaparecía en invierno → más opacidad.
- **Medido:** `astro check` 0 errores · `astro build` OK · `spacing-lint` en escala · `tools/verify.cjs` (Chrome real y WebKit, 1280×720 y 390×844): consola limpia,
  0 respuestas ≥ 400, desborde 0 · `tools/r42.cjs` (Chrome 1280 y 390, WebKit 1280): sin errores ni avisos de contextos WebGL (11 lienzos del motor); firma
  ausente; flora dibujada tras la tarjeta y repintada al cambiar a invierno; voz en el mosaico, flecha 0 → 1; las cuatro estaciones del pie capturadas.
- **Backup:** `../savvia-web.bak-r41-2026-09-23/`.
- **Pendiente de Andoni:** las páginas `/casos/<slug>`; no publicado.

### Ronda 43 — 2026-09-23 · el puente «Para eso está savvia agentic», el tiempo que se posa, el rayo del verano, el formulario que sube, la estela por estación, preguntas en conversación, mockups que encajan, vídeos fluidos y la cámara al sentarse
- **Andoni (textual, 7 puntos + 1 a media ronda):** 1 «Después de la segunda sección tenemos que poner un titular que diga para eso está savvia agentic o algo así,
  hilando con los problemas de arriba. Problema → solución» · 2 «En el footer: en otoño e invierno tanto la nieve como las hojas que se vayan quedando en el
  paisaje, como si poco a poco se fuese acumulando. En primavera las flores más realistas y menos infantiles. En verano poner el rayo de luz que tenemos en
  el hero, que se mueve con el ratón ligeramente. Y ojo que el rayo se va al salir el formulario» · 3 «El formulario del footer sale como teníamos, desde
  abajo, pareciendo que sale desde el paisaje» · 4 «La estela que dejamos Eric y yo también se tiene que adaptar a las estaciones» · 5 «Las FAQs hacerlas más
  originales» · 6 «Remerge e Isotrol no encajan bien en el mockup, tienen fallos» · 7 «El vídeo de Invopop va como a tirones el scroll» · (a media ronda)
  «al sentarnos hemos perdido ese movimiento de cámara que teníamos antes, y al salir igual».
- **Hecho:** 1 · `Puente.astro` + `home.ts › puente`. 2 · `Pie.astro`: el suelo sale de HORIZONTE; cada hoja o copo que llega a su profundidad se PINTA en una
  capa acumulada (hasta 320 hojas y 1.600 copos; la nieve deja además un velo de escarcha) y cae otro; primavera = matas de brezo (la lámina) que brotan de
  abajo arriba y se mecen; verano = resplandor + motas + el haz del hero (capa `.luz-pie`, 18°, sigue al ratón, se apaga con el formulario). 3 · vuelve
  la subida de la ronda 33. 4 · `Estudio.astro`: paleta por estación (briznas, resplandor, flores). 5 · `Preguntas.astro` (rehecho): conversación con caras,
  «escribiendo…», sugerencias y pregunta libre (se clona un intercambio para conservar el ámbito de estilos). 6 · la causa: el <video> lo inserta
  `set:html` sin el ámbito de Astro, así que sus reglas (tamaño, `object-fit: cover`) NUNCA se aplicaban: bandas en las pantallas y la web del móvil
  recortada → `:global`; además la pantalla va por encima del grano de la pieza. 7 · el screencast CDP soltaba fotogramas (Invopop: 49 repetidos de 192;
  BOP 39, Cubbo 19, Isotrol 16, Remerge 10) → `tools/grabar-paso.cjs`: scroll exacto por fotograma, captura y 30 fps; los cinco regrabados; fuera los
  avisos de cookies (Isotrol) y el botón de Usercentrics (Remerge). Invopop: 1 fotograma quieto en todo el tramo de scroll (el del frenado final).
  (media ronda) · al sentarse se cambiaban las CUATRO láminas a 5120 px en pleno viaje; ahora solo la visible y al posarse (1,65 s); `.escena.dolly` con
  `will-change` y sin `backdrop-filter` en la barra durante el viaje.
- **Medido:** `astro check` 0 errores · `astro build` OK · `spacing-lint` en escala · `tools/verify.cjs` (Chrome real y WebKit, 1280×720 y 390×844): consola
  limpia, 0 respuestas ≥ 400, desborde 0 · `tools/r43.cjs` (Chrome 1280 y 390, WebKit 1280): puente tachado; tres intercambios (sugerencia y libre con enlace
  de correo, con estilo); formulario sube, baja y se oculta; rayo 1 → 0 con el formulario; capturas del pie en las cuatro estaciones tras 14 s · dolly
  (Chrome headless): 108 fotogramas en 1,8 s, máximo 33 ms. **SIN medir:** fluidez del dolly en GPU real (la causa probable estaba en la GPU: decodificar y
  subir cuatro láminas de 5120 px).
- **Backup:** `../savvia-web.bak-r42-2026-09-23/`; los vídeos anteriores, en `tools/grab/r42/` y `tools/grab/invopop-r42.mp4`.
- **Pendiente de Andoni:** confirmar en su Mac que el dolly vuelve a verse; las páginas `/casos/<slug>`; no publicado.

### Ronda 44 — 2026-09-23 · el puente pasa a ser el titular de los destacados
- **Andoni (textual):** «lo que has puesto para finalizar la segunda sección va como titular de los destacados y se mete en el ordenador. Pero el titular va
  todo en la misma tipo».
- **Hecho:** `home.ts › proyectos.titulo` = «Para eso está savvia agentic.» (titular-pantalla de Proyectos y página de inicio del monitor), en Family entero, sin
  logotipo ni mono. Fuera la sección `Puente.astro` (guardada en `tools/retirados/Puente.r43.astro.txt`) y `home.ts › puente`.
- **Medido:** `astro check` 0 errores · `astro build` OK · `tools/verify.cjs` (Chrome real y WebKit, 1280×720 y 390×844): consola limpia, 0 ≥ 400, desborde 0 ·
  capturas de la entrada (el titular llena la pantalla, la cámara se aleja y queda en el monitor); h2 en Family en los dos motores.
- **Pendiente de Andoni:** si los cuatro problemas tachados (la línea mono del puente) vuelven en algún sitio; las páginas `/casos/<slug>`; no publicado.
- **A media ronda (Andoni):** «al abrir el formulario en el footer que no se vayan las hojas, ni la nieve, ni nada» · «hay que poner flores en primavera pero
  que encajen con el fondo, lo que hemos puesto ahora es un pegote total» · «los servicios no van por letras, van por número» · «al testimonio que va entre
  nuestros proyectos darle más espacio por arriba y por abajo».
- **Hecho:** con el formulario abierto el tiempo y el rayo SIGUEN; lo que cae se recorta en el hueco del panel (pasa por detrás). Primavera: fuera el brezo; un
  lienzo `[data-flores]` DENTRO de la capa de la hierba (nace sobre el prado real y se mueve con él): 280 florecillas pintadas (manchas blandas blanco y rosa
  pálido, algo de Rosa flor) en 60 matas, más pequeñas en lo lejano, que brotan al llegar al pie. Servicios 01 · 02 · 03. Testimonio: +64 px arriba y abajo
  (~200 px de aire medidos).
- **Fallos propios cazados:** las flores se sembraban con el prado aún desplazado por el paralaje (todas caían abajo) y las ya pintadas se perdían si el pie
  cambiaba de tamaño → lienzo propio en la capa de la hierba.
- **Medido:** `tools/verify.cjs` (Chrome real y WebKit, 1280×720 y 390×844): consola limpia, 0 ≥ 400, desborde 0 · lienzo del tiempo a opacidad 1 con el
  formulario abierto (Chrome y WebKit, primavera e invierno) · captura del prado en primavera.

### Ronda 45 — 2026-09-23 · el menú se abre como el cambio de estación del árbol · PUBLICADA en savvia.studio
- **Andoni (textual):** «el menú superior cuando se abre que se abra como los cambios de colores del árbol, y con eso ya publicamos».
- **Hecho:** `dibujar.ts` modo `estacion`: la tarjeta se PINTA con la máscara de papel rasgado creciendo desde el botón y, justo delante del frente, un anillo
  Naranja de ~11 px con el mismo canto (dos máscaras restadas: `mask-composite: subtract` / `-webkit-mask-composite: source-out`) que se apaga al llegar;
  al cerrar, se recoge hacia el botón. Sin líneas previas. `Nav.astro` lo usa al abrir y al cerrar.
- **Publicación:** `astro build` → `dist/.vercel/project.json` (proyecto `savvia-home`) → `vercel deploy --prod --yes` → alias https://savvia.studio
  (deployment `dpl_Ajw6dfERCqDsJwoena9WxwWPPFPd`). Sigue `noindex, nofollow`.
- **Medido EN VIVO (https://savvia.studio):** `tools/verify.cjs` (Chrome real y WebKit, 1280×720 y 390×844): consola limpia, 0 respuestas ≥ 400, desborde 0,
  Family + ABC Areal + ABC Areal Mono cargan · título «savvia — Tu web, a la altura de lo que haces» · `og.jpg` 200 image/jpeg · láminas 5120, flora, máscara
  rasgada y vídeos 200 · menú abre y cierra (Chrome y WebKit) · `?feedback=1`: Agentation montado.
- **Backup:** `../savvia-web.bak-r44-2026-09-23/`.
- **Pendiente de Andoni:** licencia de Family (sigue el archivo de PRUEBA de Klim: titulares con tilde caen a Georgia) y confirmar que la de ABC Areal (Dinamo)
  cubre el uso web; quitar `noindex` cuando toque; las páginas `/casos/<slug>` (hoy 404); el envío real del formulario (hoy `mailto:`); confirmar en su Mac el
  movimiento de cámara al sentarse.

### Ronda 46 — 2026-09-23 · «Desliza dentro» a la derecha y el reproductor de los testimonios en vídeo
- **Andoni (textual):** «En proyectos destacados mueve el scroll a la derecha para que se lea mejor» · «En testimonios, si tenemos video del testimonio poner
  un iconito como el de los proyectos para que puedas clicas y verlo. Este se abre como un modal. Podemos encuadrarlo en un reproductor estilo savvia».
- **Interpretación:** «el scroll» = la llamada «Desliza dentro» (a la izquierda competía con el dial de proyectos).
- **Hecho:** `Proyectos.astro`: la llamada nace en la esquina superior DERECHA de la pantalla (en espejo: punto 59,2 % · 39,4 %, línea hacia arriba a la
  derecha, palabra a su derecha, sobre el cielo y encima de la ficha); en móvil sigue recta y centrada. `home.ts › voces[]`: campos `video` y `poster`
  (vacíos: hoy no hay ningún vídeo). `Anteriores.astro`: la cámara de cristal de las piezas entre el nombre y la flecha, solo con la voz que tenga vídeo
  (si ninguna tiene, no existe; si alguna, el hueco se reserva para que las flechas no salten). REPRODUCTOR: `<dialog>` modal; tarjeta Cacao con grano que se
  PINTA desde la cámara (`dibujar.ts` modo `estacion`, como el menú) y se recoge hacia ella al cerrar; nombre y rol arriba, ×; vídeo sin controles del
  navegador (clic = reproducir/pausar, botón grande con el vídeo parado); debajo, reproducir, el HILO DE SAVIA (el de la voz que rota) que mide y busca
  (clic, arrastre, ← →), tiempo en mono con cifras tabulares y sonido. Esc, × o clic fuera cierran; el foco vuelve a la cámara; la rotación de voces se para
  mientras se ve.
- **Medido:** `astro check` 0 errores · `astro build` OK · `spacing-lint` en escala · `tools/verify.cjs` (Chrome real y WebKit, 1280×720 y 390×844): consola
  limpia, 0 ≥ 400, desborde 0 · `tools/r46.cjs` (Chrome 1280 y 390, WebKit 1280; vídeo de prueba inyectado en la voz 0): llamada encendida a la derecha
  (punto a 20 px de la esquina de la pantalla); sin vídeos la cámara no existe; con vídeo sale solo en su voz; abre y suena con sonido; buscar al 50 %;
  pausa; silencio; Esc cierra y devuelve el foco; clic fuera cierra; desborde 0.
- **Backup:** `../savvia-web.bak-r45-2026-09-23/` (src, AGENTS, DESIGN).
- **A media ronda (Andoni):** «los vídeos puedes sacarlos de treseiscero.com» · «en proyectos destacados el menú de la web se queda detrás de la barra de
  navegación» · «en nuestros proyectos cambia el título a: Más proyectos».
- **Hecho:** los tres testimonios en vídeo de la web anterior (Juan Moliner · Invopop, Javi Ferrer · Codely, Thomas Hauer · THX; descargados con permiso de
  files.tryflowdrive.com, 88 MB) → verticales a 540×960, h264 CRF 28, audio mono 80 kbps, `faststart` (3,6–4,1 MB) + póster en `public/media/voces/`.
  Codely y THX entran como voces que rotan (ahora cinco; tres con cámara); la cita de Codely, extracto fiel; la de THX, traducida y sin el nombre del estudio
  anterior. Reproductor: `ar` por voz; en vertical la tarjeta se estrecha para que el vídeo quepa entero en la ventana. MONITOR: la web ya no pasa bajo la
  barra de cristal (un iframe de otro dominio se desplaza dentro de sí: solo podía quedar TAPADA) → `.visor` empieza bajo la barra; el punto de «Desliza
  dentro», justo fuera de la esquina de la pantalla (dentro tapaba el menú de la web). `home.ts › proyectos.titulo2` = «Más proyectos.».
- **Medido:** `tools/r46.cjs` (Chrome 1280 y 390, WebKit 1280): borde inferior de la barra = borde superior de la web (277 px a 1280); título «Más proyectos.»;
  cámaras en las voces 2–4; el vídeo de Invopop abre, suena, busca al 50 % (0:33 / 1:07), pausa, silencia y cierra · `tools/verify.cjs`: limpio en los cuatro.
- **PUBLICADA (23/09) en https://savvia.studio** (deployment `dpl_BTyL8UgaKLo4ZEg6Ta5oe9s9XnM8`, sigue `noindex`); verificada en vivo con `tools/verify.cjs`.
- **Pendiente de Andoni:** los vídeos pueden NOMBRAR el estudio anterior de viva voz (no se ha revisado el audio); visto bueno de Codely y THX a salir en la
  web.

### Ronda 47 — 2026-09-23 · sentado, el sonido se oye como con cascos puestos
- **Andoni (textual):** «cuando te sientas es como que el sonido esté muy de fondo, como si estuvieses en modo focus y tuvieses unos cascos puestos: los
  escuchas, pero más de fondo».
- **Hecho (`sonido-estudio.ts › foco()`, llamado al sentarse y al levantarse):** el ambiente pasa por unos CASCOS: paso bajo de 18 kHz → 480 Hz, pico suave
  de +3 dB en 180 Hz (la presión de la almohadilla) y ganancia al 42 %; entra y sale con `setTargetAtTime` (τ 0,45 s, ~1,5 s: el tiempo del viaje de cámara).
  Los efectos de interfaz (sentarse, cambio de proyecto) no pasan por los cascos: siguen nítidos.
- **Medido:** `tools/r46-cascos.cjs` (Chrome y WebKit, sonido encendido): de pie corte 18.000 Hz y nivel 1 → a 0,4 s de sentarse 7.514 / 0,65 (WebKit 3.874 /
  0,53) → sentado 533 / 0,42 (WebKit 505 / 0,42) → levantado 17.983 / 1; sin errores · `tools/verify.cjs` limpio en los cuatro.
- **SIN medir:** la escucha: el número dice que filtra; si suena a «cascos» lo decide Andoni con el oído.
- **A media ronda (Andoni):** «en los testimonios sin vídeo se queda la barra de progreso sin centrar: quitamos la barra de progreso y el icono del vídeo lo
  hacemos más sutil, más mimetizado con el fondo» · «los vídeos al cerrarlos empiezan de 0 de nuevo: tienen que seguir donde los habías dejado».
- **Hecho (`Anteriores.astro`):** fuera el hilo de tiempo de las voces (siguen rotando cada 9 s, sin indicador); la cámara pasa a su sitio, CENTRADA bajo el
  nombre, sin cristal: filo de 1 px en `--rule` e icono en `--fg2` (al pasar, `--fg`); el hueco se reserva en las voces sin vídeo. Cada vídeo recuerda su
  punto al cerrarse (`Map` por `src`; al cambiar de vídeo se restaura en `loadedmetadata`; si había terminado, vuelve a 0).
- **Medido:** `tools/r46.cjs` (Chrome 1280 y 390, WebKit 1280): nombre y cámara a 0 px del centro; cerrado a 33,8 s → al reabrir 33,6–35,2 s ·
  `tools/r47-reanuda.cjs`: Invopop 20 s → Codely 10 s → Invopop vuelve en 21 s → Codely en 11 s · `tools/verify.cjs` limpio en los cuatro.
- **A media ronda (Andoni):** «el hover del botón, que se rellene de naranja con el efecto de coloreado que ya usamos en otros sitios».
- **Hecho:** la cámara lleva la GOTA del «Enviar» del pie (ronda 36): disco Naranja que nace donde entra el puntero (`--gx/--gy`), onda Cacao que se abre, el
  icono pasa a Cacao y el filo se apaga; al salir se recoge hacia donde sale; con teclado, desde el centro; con movimiento reducido, sin animación.
- **Medido:** `tools/r47-gota.cjs` (Chrome y WebKit, DPR 2): entra por la esquina (12,5 %), gota a escala 1 e icono Cacao; al salir, escala 0 ·
  `tools/verify.cjs` limpio en los cuatro.
- **A media ronda (Andoni):** «al rellenarse el icono pasa a fill y blanco, y con esto ya publicas» → relleno y Rosa niebla (el claro de la paleta).
- **PUBLICADA (23/09) en https://savvia.studio** (deployment `dpl_DTm4xdgC7aoDb9EUz9rrfU9v6Ddf`, sigue `noindex`): cascos, testimonios sin barra, cámara con gota,
  vídeos que se reanudan. Verificada en vivo con `tools/verify.cjs` (Chrome y WebKit, 1280 y 390: limpia, 0 ≥ 400, desborde 0).
- **Pendiente de Andoni:** escuchar los cascos; los vídeos pueden nombrar el estudio anterior de viva voz; visto bueno de Codely y THX.

### Ronda 48 — 2026-09-23 · las raíces hierven como la copa
- **Andoni (textual):** «en el hero el árbol tiene como un dithering, movimiento: ¿podemos ponerlo en las raíces también?»
- **Hecho:** `Raices.astro` crea su lienzo con `soplo: true` (el hervor de la copa: celdas de 3 px que saltan un píxel 12 veces por segundo, destellos
  horizontales en los cantos y la deriva de color lenta). Como `soplo` también encendía los haces de luz, `estela.ts` gana la opción `sinLuz` (uniform `lz`):
  bajo tierra no entra la luz. Se para fuera de pantalla (el mismo IntersectionObserver de siempre) y con movimiento reducido.
- **Medido:** `tools/r47-raices.cjs`: píxeles de las raíces que cambian en 250 ms: 17,5 % (Chrome) y 18 % (WebKit); en la web publicada, 0 % · 61 fps con
  hero y raíces a la vista (headless) · `tools/verify.cjs` limpio en los cuatro. **SIN medir:** coste en GPU real y móvil (dos lienzos a ~30 fps en reposo).
- **A media ronda (Andoni):** «deja testimonios de texto solo: los vídeos dicen treseiscero todos» · «y con eso publica ya».
- **Hecho:** `home.ts › voces[]` sin `video` (los mp4 y pósters, en `tools/retirados/voces/`); sin ningún vídeo la cámara no existe (`data-alguno`). Codely y THX se
  quedan como voces de texto. El reproductor y la gota de la cámara quedan en el código, dormidos: vuelven solos si una voz lleva `video`.
- **PUBLICADA (23/09) en https://savvia.studio** (deployment `dpl_Fj3CrWRcKcfqWeNnYGCzP4FxeNXW`, sigue `noindex`). Medido EN VIVO: `tools/verify.cjs` (Chrome y
  WebKit, 1280 y 390) limpio, 0 ≥ 400, desborde 0 · raíces hirviendo (17,3 % de píxeles cambian en 250 ms) · 0 referencias a vídeos de testimonio y
  `/media/voces/invopop.mp4` da 404 (ya no se sirve).
- **Pendiente de Andoni:** visto bueno de Codely y THX a salir con su cita.

## Rechazado — añadidos de la ronda 48 (NO VOLVER)
- Testimonios en VÍDEO de la web anterior: todos nombran el estudio anterior de viva voz. Solo texto, salvo vídeos nuevos grabados para savvia.

### Ronda 49 — 2026-09-23 · menos «tu web» · PUBLICADA
- **Andoni (textual):** «se repite mucho tu web en toda la web. Podemos intentar reducir eso y publica».
- **Hecho:** de 20 «tu web» visibles a 6. Se quedan los que cargan el mensaje: titular y subtítulo del hero, el primer dolor, «Tres maneras de elevar tu web.»,
  «La savvia es la receta de tu web.» y «La savvia de tu web.» (pie). Reescritos: agentic «La web, su receta y los agentes…» · dolor 1 «…qué ha dejado de
  contarse» · dolor 2 «Podría ser la web de cualquiera.» · dolor 3 «Nadie sabe ya por qué está hecha así.» · respuesta 4 «Se cambia hablándole.» · demo 01
  «¿Qué ha dejado de contar?» · La savvia «una parte de la web» y «Donde se entiende todo.» · plato «A la altura de lo que haces.» · Servicios «¿Qué puede
  hacer savvia por ti?», «Una web nueva, de principio a fin.», «Siempre al día.» · FAQ «hacer y cuidar una web: a medida, con su savvia…», «sabe cambiarla» ·
  pitch del pie «El estudio que orquesta la IA, con criterio.» · descripción de metadatos sin el segundo «tu web».
- **PUBLICADA (23/09) en https://savvia.studio** (deployment `dpl_6rQsxg7ZU7xitihk94N2UTa4vcNp`, sigue `noindex`). `tools/verify.cjs` EN VIVO (Chrome y WebKit,
  1280 y 390): limpio, 0 ≥ 400, desborde 0; los textos nuevos, servidos.
- **Pendiente de Andoni:** si el subtítulo del hero («Eleva tu web con criterio.», justo bajo «Tu web, a la altura…») también se cambia: son dos seguidos.

### Ronda 50 — 2026-09-24 · pruebas de color: la paleta 2 y el logotipo nuevo
- **Andoni (textual):** «vale quiero hacer pruebas de colores, te paso nuevos» (guía «Savvia — Nueva paleta de color») · «y nuevo logo»
  (`~/Downloads/logo_savia3.svg`).
- **Hecho:**
  · **Tokens (`global.css`):** Coral · Cobalto · Cereza · Cítrico; `--color-naranja` pasa a ser un alias de Coral (todo lo que era la savia: gotas, hilos, filos,
    CTA). Fuera Rosa arcilla e Iris. `surface-warm` = COBALTO con texto Rosa niebla (antes Rosa arcilla); `--mark` sobre oscuro = Cítrico; `.ia` = Cobalto.
    Tabla de estaciones: sin cambios (coincide con la guía). DESIGN.md › «Paleta 2».
  · **Reparto (un acento por bloque):** Servicios, el bloque Cobalto (botón en Cacao; la barra en Rosa niebla sin mezcla: `html.sobre-color`, porque la
    diferencia daba amarillo); La savvia, el plato y `savvia.md` en CÍTRICO (su mini-página: botón Coral, tarjeta Cobalto; los siete colores nuevos en
    «Color»). Los usos de Rosa arcilla: en oscuro → Rosa niebla al 70 %; fondos neutros → Nogal/Cacao; la dirección B de la demo 02 → Cobalto; «publicado ✓»
    de la demo 04 → Cítrico. Texto pequeño Coral sobre claro → Cacao (guía). Literales en scripts y shaders: `gota.ts`, `estela.ts` (filo de savia),
    `palabras.ts`, flores del estudio, aviso de Agentation. Copy de la receta y de `savvia.md` con la paleta nueva.
  · **Logotipo (`public/savvia-logo.svg` ← `logo_savia3.svg`; el anterior en `tools/retirados/savvia-logo.r49.svg`):** 1118×348; las dos v y el punto de la i
    son UN trazo que sale de la «a». Barra, marca de producto y titular del pie, al nuevo alto. CARGA: el recorrido de la gota se ha MEDIDO otra vez sobre el
    trazo nuevo (`vvGuia`, 33 puntos: cola de la «a» → primera v → rizo → ligadura → segunda v → trazo largo → remolino del punto; comprobado en
    `tools/shots/r50-logo-guia.png`); la i espera sin punto hasta que llega la gota.
- **Medido:** `astro check` 0 errores · `astro build` OK · `spacing-lint` en escala · contrastes de la guía (todos ≥ 4,6 salvo los avisados) ·
  `tools/r20-carga.cjs` (Chrome y WebKit): círculo → v dibujadas (plumada a 0) → cae → hero sin transform · `tools/r50.cjs` (Chrome 1280 y 390, WebKit 1280):
  sin errores, fondos Servicios 52·86·211 y plato 233·214·75, desborde 0; barra sobre Cobalto: Rosa niebla, `normal` · `tools/verify.cjs` limpio en los cuatro.
- **Backup:** `../savvia-web.bak-r49-2026-09-24/` (src, logo, AGENTS, DESIGN, config).
- **Pendiente de Andoni:** verlo (en local; savvia.studio sigue con la paleta anterior); Cereza sin usar (¿portadas de «Más proyectos» en Cobalto/Cereza en vez de
  los degradados de cada cliente?); la guía nombra Geist Mono y la web lleva ABC Areal Mono a prueba desde la ronda 39: no se ha tocado; favicon e imagen para
  compartir siguen con el logotipo anterior; no publicado.
- **A media ronda (Andoni):** «el cítrico va fuera, no me convence» · «actualiza el favicon y la imagen para compartir» · «el cereza ya veremos dónde lo usamos» ·
  «los degradados de cada cliente no se tocan» · «typos has hecho bien, conservamos las que están» · «el navegador de proyectos destacados mucho más finito, con
  backdrop y el buscador del navegador centrado» · «el indicador de scroll como estaba antes, encima de la pantalla del ordenador».
- **Hecho:** fuera `--color-citrico`; el plato de La savvia vuelve al papel del antiguo Naranja: CORAL; `--mark` sobre oscuro en Coral y en Cobalto en Rosa niebla;
  «publicado ✓» en Coral; copy de la paleta con seis colores. FAVICON y ICONO de iPhone con las v nuevas (el trazo 4 del logotipo, medido con sharp: caja
  309 · 29 · 552 × 318): favicon Cacao sobre Rosa niebla con radio 22 % y las v al 88 % del ancho (se leen a 16 px); `apple-touch-icon.png` 180 px, Rosa niebla
  sobre Cacao. IMAGEN PARA COMPARTIR (`tools/r50-og.cjs`): el hero en otoño con el logotipo nuevo en la barra, sin iconos ni carriles, 1200×630. Las tres
  con `?v=50` en la dirección (las redes guardan la imagen anterior por URL). Los anteriores, en `tools/retirados/*.r49.*`. NAVEGADOR (`Proyectos.astro ›
  .cromo`): 7,4 → 4,6 cqh (7 px a 1280), cristal más marcado (niebla al 50 % + desenfoque 16 px + saturación), iconos y semáforo más pequeños y la
  dirección CENTRADA en la barra (absoluta); la web sigue empezando bajo la barra. INDICADOR: vuelve la píldora de la ronda 39 («desliza dentro» con la rueda)
  al pie de la web, dentro de la pantalla; se va con el primer gesto (capa `capta`). Fuera la llamada con punto y línea.
- **Medido:** `tools/r50-navegador.cjs` (Chrome 1280 y 390, WebKit 1280, DPR 2): dirección a 0 px del centro de la barra, web a 0 px bajo la barra, píldora
  encendida y dentro de la pantalla; tras una rueda, apagada y capa quitada · favicon a 16, 32 y 256 px revisado · `tools/verify.cjs` limpio en los cuatro.
- **A media ronda (Andoni):** «el navegador de proyectos destacados: lo que se escribe en el navegador, centrado. Y ponerle algo de opacidad con blur, un poco
  de efecto cristal».
- **Hecho:** el texto de la dirección no estaba centrado porque la recarga empujaba con `margin-left: auto` → la recarga, absoluta al borde derecho; el
  candado sigue pegado al texto y su ancho se compensa al otro lado (lo escrito, en el centro exacto). CRISTAL: tras la barra no había nada que desenfocar (la
  web empieza debajo para no taparle el menú) → `.tras-cromo`: la cabecera de la CAPTURA de la web activa (`--cap`, se pone al arrancar y en cada `navegar`),
  bajo una barra de niebla al 42 % con desenfoque 14 px y saturación: el cristal se tiñe con los colores de cada proyecto (gris con Multiverse, que es oscura).
- **Medido:** `tools/r50-navegador.cjs` (Chrome 1280 y 390, WebKit 1280, DPR 2): texto a 0 px del centro de la barra, `backdrop-filter: blur(14px)
  saturate(1.8)`, captura detrás, web a 0 px bajo la barra, píldora OK · `tools/verify.cjs` limpio en los cuatro.
- **Pendiente de Andoni:** verlo en local; dónde va el Cereza; no publicado.
- **A media ronda (Andoni):** «el favicon ponlo color oscuro sobre claro, que se verá mejor» → el `favicon.svg` ya era Cacao sobre Rosa niebla; lo que se veía
  claro sobre oscuro era el `apple-touch-icon.png` (Safari lo usa también en favoritos y pestañas): ahora igual, Cacao sobre Rosa niebla. Versión `?v=51` en los
  dos para saltar la caché. No publicado.
- **Corrección (Andoni):** «al revés, me refería blanco sobre oscuro» → favicon y `apple-touch-icon.png`: las v en Rosa niebla sobre Cacao (el «blanco» de la
  paleta). `?v=52`. Revisado a 16, 32, 64 y 180 px. No publicado.
- **A media ronda (Andoni):** «hay un bug al sentarse que hace que el navegador recupere el color sólido».
- **Causa:** la regla de la ronda 43 `.escena.dolly .cromo` quitaba el `backdrop-filter` durante el viaje de cámara (1,5 s) y ponía la barra en blanco al 92 %.
- **Hecho:** el cristal ya no es un `backdrop-filter` en vivo: `.tras-cromo::before` es la franja de la captura PRE-desenfocada (`blur(1,8 cqh)` + saturación,
  en unidades de la pantalla) y la barra, niebla al 42 % encima. Mismo aspecto de pie, en el viaje y sentado; y sin coste de desenfoque en cada fotograma.
- **Medido:** `tools/r50-sentado.cjs` (Chrome y WebKit): fondo de la barra 0,42 de pie, en el viaje y sentado (antes 0,92 en el viaje) · `tools/verify.cjs` limpio.
- **GitHub (24/09, Andoni: «tenemos que subirlo a GitHub para compartir con mi socio Eric»):** repositorio PRIVADO https://github.com/AndoniMart/savvia-web
  (rama `main`, primer commit `e828761`; privado porque lleva las fuentes con licencia y capturas de webs de clientes). Fuera del repositorio (`.gitignore`):
  `tools/grab/` (grabaciones en bruto, 238 MB), `tools/retirados/voces/` (vídeos que nombran el estudio anterior), `tools/shots/`, `.vercel/`, `dist/`.
  Pendiente: invitar a Eric como colaborador (falta su usuario de GitHub). Publicar en savvia.studio sigue siendo la receta de arriba (no depende de GitHub).
