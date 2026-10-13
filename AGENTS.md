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
**Publicar (desde el 24/09/2026):** el proyecto `savvia-home` de Vercel (el que tiene el dominio; DNS en DonDominio → Vercel) está CONECTADO al repositorio
privado https://github.com/AndoniMart/savvia-web: `git push` a `main` = compila en Vercel y publica en savvia.studio (~15 s) → `node tools/verify.cjs
https://savvia.studio/`. Commit y push, solo cuando Andoni lo pida. (La receta anterior, `vercel deploy --prod` desde `dist/`, sigue valiendo de emergencia.)
**OJO (04/10/2026):** Vercel solo despliega los push cuyo commit es de Andoni; los de Eric quedan en «Deployment was blocked» (ver ronda 83) hasta que
Andoni lo añada a su equipo de Vercel. Mientras tanto, lo que suba Eric lo publica Andoni (Redeploy en Vercel o un push suyo).

## Rutina entre Eric y Andoni (desde el 29/09/2026)
Los dos trabajan sobre el mismo repositorio, cada uno en su ordenador. Git no sincroniza solo.
1. **Al empezar:** `git pull`. Lo hace solo el hook `.claude/hooks/al-empezar.sh` al abrir cada sesión de Claude Code y avisa si
   no pudo (cambios que chocan) o si hay commits o cambios pendientes de subir. Si avisa de un fallo, resolverlo ANTES de tocar nada.
2. **Al terminar:** commit y `git push`, para que el otro lo tenga. OJO: push a `main` = se PUBLICA en savvia.studio. Se sube
   cuando quien está trabajando lo pide; al cerrar una tarea, recordárselo si queda trabajo sin subir.

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
- **A media ronda (Andoni):** «cuando la web carga, en la navegación se ve un fondo raro; incluso cuando la web está cargada, detrás del navegador se ve como un
  fondo raro».
- **Causa:** la franja de la CAPTURA tras la barra (desenfocada y saturada) salía también con la pestaña en blanco y no coincidía con la web en vivo.
- **Hecho:** fuera la franja: `.tras-cromo` es UN color, `--tinte`: `#fbfbfa` (pestaña en blanco) mientras se teclea y carga, y al descubrirse la web el tono medio
  de la cabecera de su captura, medido al compilar con sharp (`data-tinte`: Multiverse 41·29·34, Playground 230·228·240, Neety 224·216·220, Zernio
  245·231·225), con transición de 0,6 s. La barra, niebla al 42 % encima: cristal tintado, igual en el viaje de cámara.
- **Medido:** `tools/r50-tinte.cjs` (Chrome y WebKit): estreno 251·251·250 cargando → Multiverse 41·29·34 → cambio 251·251·250 cargando → Playground 230·228·240;
  capturas de los cuatro estados · `tools/r50-sentado.cjs` y `tools/verify.cjs` limpios. No publicado; no subido a GitHub (último commit `7a0894c`).
- **PUBLICADA (24/09) por GitHub:** Andoni conectó `savvia-home` al repositorio; push de `239b794` → despliegue de producción `savvia-home-m5bkktjlm` en 13 s.
  Medido EN VIVO (https://savvia.studio): `tools/verify.cjs` (Chrome y WebKit, 1280 y 390) limpio, 0 ≥ 400, desborde 0 · tintes, favicon `?v=52`, logotipo nuevo,
  píldora de scroll y paleta 2 servidos · `tools/r50-tinte.cjs` en vivo: blanco cargando → 41·29·34 con Multiverse. Sigue `noindex`. Eric: lo invita Andoni.
- **Favicon nuevo (Andoni, `~/Desktop/favicon.svg`: «tiene que atravesar de lado a lado, como está»):** su dibujo TAL CUAL (el trazo de las v, 64×64, que entra por
  la izquierda y sale por arriba a la derecha, recortado por el borde); solo se le pone el fondo Cacao con radio 14 (el archivo viene en blanco sobre
  transparente: en una pestaña clara no se vería) y las v en Rosa niebla. `apple-touch-icon.png` igual, a sangre (iOS redondea). `?v=53`. Los anteriores, en
  `tools/retirados/*.r50b.*`. Revisado a 16, 32, 64 y 180 px. No subido.

### Ronda 51 — 2026-09-24 · crítica de la web y la sección 2 en la dirección A, «el roble que sana» (a prueba, en local)
- **Andoni (textual):** «Nilo podemos mirar posibles mejoras de la web, por ejemplo cosas que no encajan, o cosas que creamos que se salen de lo que es savvia.
  Usar el criterio» · «quiero que revises con ojos de diseñador, la sección 2 no nos acaba de convencer» · «vamos a probar la A y si no me convence la B, todo
  en local».
- **Crítica (resumen):** la web pasa el «¿podría ser de otro?», pero sobra: ~12 mecanismos. En vivo: 7 enlaces a 404 (`/carta`, `/proyectos`, los cuatro
  `/casos/…`), «FALTA · Frase…» a la vista en el Estudio, texto secundario sobre Cobalto a 3,18:1. Por decidir: la carga que obliga a dibujar un círculo, tres
  nombres (savvia · la savvia · savvia agentic), los proyectos en la pantalla 8 de 20, Eric y Andoni en 3D realista en un mundo de acuarela, el vacío del pie.
  SECCIÓN 2: el mismo esqueleto cuatro veces (dolor · tarjeta negra · respuesta), la jerarquía al revés (el dolor en h3, la tarjeta medio vacía domina), demos de
  interfaz que hablan el idioma de un SaaS y repiten a Servicios, flora de relleno, 4,4 pantallas fijadas. Direcciones: A «el roble que sana», B «tachado» (mi
  recomendación), C «antes / después» (falta material).
- **Hecho (A):** `src/components/Dolores.astro` sustituye en `index.astro` a `Recorrido.astro` (que se queda intacto). Cada parada es un cartel: el dolor en
  `text-h1` (Family) y al otro lado, alternando, una rama de las láminas (roble con bellotas · helecho · brezo · acebo) pintada con el motor del árbol en una
  quinta «estación», MARCHITA (ceniza parda `#5e534c`, raleo 0,55). Un HILO de savia (Coral, 2 px, con su gota en la punta) baja desde arriba al centro (la
  punta de las raíces) y serpentea hasta la base de cada rama con curvas que salen y llegan en vertical; se dibuja con el scroll (su punta al 62 % de la
  pantalla) y al tocar una base la SANA: `renacer(estación de hoy)` con el frente rasgado y el filo de savia desde la base; el dolor se apaga a `--fg2` y la
  respuesta sube desde el desenfoque. El hilo pasa por DETRÁS de los bloques de texto (máscara con un hueco por bloque). Sin fijar el scroll, sin tarjetas ni
  demos. Móvil: una columna. Movimiento reducido: todo sano y el hilo entero.
- **Medido:** `astro check` 0 errores · `astro build` OK · `spacing-lint` en escala · `tools/r51A-dolores.cjs` (1280 y 390): las cuatro ramas sanan en orden, hilo
  3702/3702 px (1280); la sección pasa de 4,4 a 3,3 pantallas (1280) y de la pantalla 20,6 a 19,6 de página · WebKit: ramas pintadas y sanando en orden ·
  movimiento reducido: todo sano · `tools/verify.cjs` limpio en los cuatro. **SIN medir:** cuatro lienzos WebGL más en GPU real.
- **Backup:** `../savvia-web.bak-r51-2026-09-24/`.
- **Pendiente de Andoni:** verla en local (http://localhost:4331); si no convence, la B «tachado»; el bloque 1 de la crítica (404, FALTA, contraste) sigue sin
  arreglar; no publicado ni subido.
- **A media ronda (Andoni):** «vamos a probar la B, aunque esta [la A] me gusta y añadiendo las cards que teníamos puede quedar bien. Así que probamos B y luego
  probamos eso».
- **Hecho:** las tres, CONMUTABLES en la misma página (`index.astro`, un `<script is:inline>` pone `html[data-s2]` antes del primer pintado; `global.css` oculta las
  otras): sin parámetro → **B** · `?s2=a` → **A** · `?s2=a2` → **A con tarjetas**.
  · **B «tachado» (`DoloresB.astro`):** cada dolor, un cartel en Family de 44 a 120 px con `max-width: 12ch` (parte en 2–3 líneas); un trazo de savia (Coral,
    pulso de mano estable, puntas redondas) por LÍNEA, medido con `Range.getClientRects()`, lo tacha renglón a renglón mientras la frase sube del 72 % al 38 % de
    la pantalla (atado al scroll: al subir se destacha); tachado, se apaga a `--fg2` y la respuesta (h2 + texto) sube desde el desenfoque, en las columnas 7–11.
    Sin fijar el scroll. 3,7 pantallas a 1280 (antes 4,4).
  · **A con tarjetas:** las cuatro demos de la sección antigua sacadas a `TarjetaPaso.astro` (mismo marcado y CSS; los filtros gooey con otro id porque la
    sección antigua sigue en la página, oculta). `Dolores.astro` gana `id` y `tarjetas`: la tarjeta delante y la rama detrás, más grande, asomando alrededor
    y con su base bajo la tarjeta; la tarjeta DUERME (opaca, `saturate(.35) brightness(.6)`: sin gris frío) y, cuando la savia llega a la base, la rama sana y
    la demo arranca desde el principio; fuera de pantalla, parada. El script de `Dolores.astro` recorre todas las secciones (la A y la A2 conviven).
- **Fallos propios cazados:** la tarjeta dormida al 55 % de opacidad dejaba ver la rama gris a través (un fantasma) → opaca; en gris frío desentonaba → apagada
  sin perder el calor.
- **Medido:** `tools/r51B-dolores.cjs` (1280 y 390): los cuatro carteles tachados línea a línea (3 · 2 · 3 · 3 líneas a 1280) y resueltos ·
  `tools/r51A2-dolores.cjs` (1280 y 390): cuatro ramas sanas y cuatro demos vivas, en orden; 3,6 pantallas a 1280 · `tools/r51A-dolores.cjs` sin cambios ·
  `tools/verify.cjs` limpio con y sin `?s2=a2` (Chrome y WebKit, 1280 y 390) · `astro check` 0 errores · `spacing-lint` en escala.
- **Pendiente de Andoni:** elegir entre B, A y A2 (http://localhost:4331, `?s2=a`, `?s2=a2`); al elegir, se quita el conmutador y las secciones que sobren
  (y `Recorrido.astro` si no vuelve). No publicado ni subido.
- **A media ronda (Andoni):** «me gusta la de las cards, pero podemos hacer que el recorrido se parezca más a algo como las 2 v del logo, un recorrido no tan
  uniforme, y lo que fluye por ello que sea una gota que va dando vida a las cards. Al dar vida se dibujan como el roble. Los detalles de flores mucho más
  sutiles en las cards» · «y luego que la gota llegue hasta "Para eso está savvia agentic" y al llegar se genera ese titular».
- **Hecho (`Dolores.astro`, reescrito):** EL RECORRIDO es un trazo CALIGRÁFICO de plumilla ancha: una cinta rellena cuyo grosor sale del ángulo de la tangente
  (pluma a −0,62 rad: grueso al bajar, fino en la diagonal que sube; 1,1 → 11 px, 7 en móvil; suavizado y afilado en las puntas), con un RIZO de una vuelta
  entre parada y parada (como el lazo de la primera v); la forma entera se ve al 7 % y la savia (Coral) se descubre tras la gota con una máscara: la línea
  central, gruesa, con `stroke-dashoffset` (la técnica de las v de la carga). LA GOTA: una elipse Coral orientada a su marcha y estirada con la velocidad. Al
  entrar en una tarjeta (por arriba) SALPICA (`gota.ts`), la rama de detrás sana y la tarjeta, que NO EXISTÍA (invisible hasta entonces), SE DIBUJA COMO EL
  ROBLE (`dibujar.ts`, modo `arbol`: su grabado a líneas y la pintura rasgada desde el impacto) y su demo arranca; la gota sigue por detrás de la tarjeta y
  sale por abajo. FLORA más sutil: la rama detrás al 26 % marchita y al 42 % sana, al 116 % de la tarjeta. AL FINAL la gota cae fuera de la sección y
  «Para eso está savvia agentic.» (Proyectos) no existe hasta que la gota ha terminado y el titular asoma: se GENERA con la máscara rasgada creciendo desde
  su centro (`global.css › h2.generado`, solo con `?s2=a2` y sin movimiento reducido).
- **Fallos propios cazados:** el rizo salía como una joroba (la vuelta se repartía en el 22 % del tramo) → 8 %; el titular anclado arriba quedaba TAPADO al
  final (el borde del círculo de la máscara acababa por debajo del texto) → desde el centro; la prueba del titular llamaba a `getComputedStyle` fuera de la página.
- **Medido:** `tools/r51A2-dolores.cjs` (1280 y 390): cuatro tarjetas vivas en orden, trazo entero (4.696 px a 1280) · `tools/r51A2-titular.cjs` (Chrome y
  WebKit): tarjetas invisibles al empezar → la 2.ª capturada a líneas y pintándose → titular oculto antes de terminar la gota y visible (generado) al asomar ·
  `tools/verify.cjs` limpio con `?s2=a2` y sin parámetro (Chrome y WebKit, 1280 y 390).
- **Pendiente de Andoni:** verla en http://localhost:4331/?s2=a2; si se queda, quitar el conmutador, la A sin tarjetas, la B y `Recorrido.astro`. No publicado.
- **A media ronda (Andoni, con `~/Desktop/3136x2080.mp4` y una lámina de las cuatro estaciones al óleo):** «el recorrido, ¿puede ser como si fueran raíces que
  se extienden desde las del árbol?» · «las tarjetas, ¿podemos hacer algo del estilo del vídeo? Te paso imágenes para usar de fondo» · «y cuando llegue a
  savvia agentic, que haga un pulso como de agua y ese pulso genere el titular».
- **Referencia medida (el vídeo, 3136×2080, 24 s; `tools/ref52/`):** una tarjeta vertical: un ÓLEO de paisaje a sangre; encima, ANILLOS DE CRISTAL
  concéntricos (una lente escalonada: cada anillo amplía y desplaza el cuadro, con un filo de luz) que respiran despacio; abajo, un panel esmerilado con un
  símbolo y el texto, y un botón en píldora.
- **Hecho:** · RAÍZ (`Dolores.astro`): la línea central ondea (dos senos lentos), gruesa arriba (9 px, 6 en móvil, donde nace de las raíces del árbol) y cada
  vez más fina con un pulso irregular, en el color del árbol de la estación hundido en la noche; RAICILLAS sembradas cada 70–150 px a los lados (curvas,
  alguna ramificada) que BROTAN tras la gota (atadas al scroll); por dentro, un hilo de savia Coral de 1,6 px. Fuera el trazo caligráfico con rizos.
  · TARJETAS (`TarjetaPaso.astro`, `fondo`): el óleo de su estación a sangre (la lámina de Andoni partida en cuatro → `public/media/tarjetas/`: 01 primavera ·
  02 verano · 03 otoño · 04 invierno; el recorrido pasa por el año), los ANILLOS DE CRISTAL en un lienzo 2D (siete discos concéntricos, cada uno con el cuadro
  un 4,5 % más ampliado y subido, filo de luz arriba y sombra abajo; se abren despacio; solo con la tarjeta viva y a la vista, ~30 fps; sin WebGL: la página
  roza el límite de contextos) y la demo en un panel ESMERILADO (niebla oscura al 42 % + desenfoque 14 px) del 38 % hacia abajo; la tarjeta, 1:1,42.
  · PULSO DE AGUA (`global.css › .pulso-agua`, `h2.generado`): al asomar el titular con la gota ya llegada, tres ondas finas (niebla con filo Coral) se abren
  desde su centro, escalonadas 0,28 s; la primera DESCUBRE el titular (máscara radial de borde blando atada a `--onda`, desde el desenfoque).
- **Fallos propios cazados:** las ondas crecían con `scale` y el borde engordaba con ellas (aros gruesos) → crece el tamaño.
- **Medido:** `tools/r51A2-dolores.cjs` (1280 y 390): cuatro tarjetas vivas en orden, raíz entera; la sección mide 4,2 pantallas a 1280 (las tarjetas son más
  altas) · `tools/r51A2-titular.cjs` (Chrome y WebKit): titular oculto hasta el final y generado con las ondas (capturas a 250, 450, 700 y 1.500 ms) ·
  `tools/verify.cjs` con `?s2=a2` limpio (Chrome y WebKit, 1280 y 390).
- **Pendiente de Andoni:** verlo (http://localhost:4331/?s2=a2); las láminas de óleo son de 466×832 px (en la tarjeta, a DPR 2, se amplían ×1,5: hacen falta a más
  resolución si se quedan); la sección ha crecido a 4,2 pantallas; no publicado.
- **Ajuste:** la demo de `savvia.md` se salía del panel esmerilado en móvil → 88 % de ancho, texto a 10 px y líneas con puntos suspensivos. verify limpio.
- **A media ronda (Andoni, con una captura de la tarjeta del vídeo):** «quiero que la card se parezca lo máximo posible, y los fondos de las cards van
  sincronizados con la estación que estamos. La animación son ondas de agua por encima del óleo: es como si tuviese un charco por encima y ondea
  continuamente» · «al llegar a savvia agentic la onda tiene que empezar desde la raíz y esa onda genera el titular, como si se crease en agua».
- **Hecho:** `TarjetaAgua.astro` (nueva; `TarjetaPaso.astro`, con las demos, queda guardada): la tarjeta de la captura, 1:1,78, a sangre, radio 6 % del ancho:
  el ÓLEO de la ESTACIÓN DE HOY en las cuatro (al cambiar de estación, el nuevo entra como una onda desde el centro); encima el AGUA, un fragment shader:
  ondas ESCALONADAS que se abren desde el icono (0,5 · 0,645: el anillo más pequeño le hace de halo), dentro de cada banda el cuadro se desplaza y se amplía
  y en el borde SALTA (la lente de la captura), un ondulado fino en la pincelada, filo de luz arriba y sombra por dentro; UN solo contexto WebGL para las
  cuatro (cada tarjeta viva y a la vista se dibuja en él y se copia a su lienzo 2D, ~30 fps). Encima: el icono de la estación en blanco (las formas polares de
  la barra), la EXPLICACIÓN del paso en un panel esmerilado (blanco al 11 %, desenfoque 1,5 px) y una PÍLDORA blanca con el paso del método (Entender ·
  Decidir · Documentar · Entregar). A la izquierda quedan el dolor y la respuesta corta. TITULAR: las ondas nacen arriba al centro del titular-pantalla
  (donde acaba la raíz y cae la gota); la primera lo descubre con una máscara radial y el texto sale ONDULADO (filtro `#agua-titular`, desplazamiento 22 →
  0 en 2,6 s) hasta asentarse.
- **Fallos propios cazados:** (1) al fijar el centro de las ondas metí un comentario `//` en mitad de una línea de JS y se tragó el resto: la escala del óleo,
  el tiempo y el cambio de estación no llegaban a la GPU (la tarjeta salía de un color plano: leía siempre el centro del cuadro) → aislado devolviendo la
  textura sola y leyendo el uniform (`[0, 0]`); (2) lo mismo, otra vez, en el titular (la compilación falló). REGLA para la casa: nunca un `//` en una línea
  con más sentencias detrás; el comentario, en su línea. (3) el ondulado del titular inclinaba las letras (parecían cursivas, rechazadas) → redondo y corto.
- **Medido:** `tools/r51-agua.cjs` (Chrome y WebKit, DPR 2): el agua mueve el 82–88 % de la tarjeta en 1 s; comparada lado a lado con la captura ·
  `tools/r51A2-titular.cjs` (Chrome y WebKit): titular oculto hasta que llega la gota y generado desde el agua · `tools/r51A2-dolores.cjs` (1280 y 390) ·
  `tools/verify.cjs` con `?s2=a2` limpio (Chrome y WebKit, 1280 y 390).
- **Pendiente de Andoni:** verlo (http://localhost:4331/?s2=a2); los óleos siguen a 466×832 (en retina se amplían: mejor a más resolución, y sin la cinta de
  cristal que traen pintada, que ahora compite con el agua); no publicado.

### Ronda 52 — 2026-09-24 · el agua de la referencia (discos de cristal), 16 óleos por estación y la tarjeta que se funde con la noche (a prueba, en local)
- **Andoni (textual + lámina de 4×4 óleos, `~/Desktop/estaciones 4.png`):** «en las cards de naturaleza no estamos consiguiendo ese efecto chulo del agua que tiene
  la referencia» · «te paso 4 imágenes para cada estación» · «las cards que se mimeticen mejor con el fondo».
- **Referencia medida otra vez (`3136x2080.mp4`, recortes de la tarjeta cada 0,5 s y cada 0,125 s):** no son aros finos ni ondas repetidas: son 4–5 DISCOS DE
  CRISTAL grandes, casi concéntricos (desplazados a la izquierda al crecer), espaciados de forma regular; cada disco AMPLÍA de golpe lo que tiene debajo
  (el cuadro salta en el canto); el canto es GRUESO: una franja donde la pintura se estira en vetas, con filo de luz arriba a la izquierda y una media luna
  oscura por dentro al otro lado; el óleo, muy ampliado, con la pincelada a la vista.
- **Hecho (`TarjetaAgua.astro`, shader reescrito):** ocho discos con radio lineal (0,17 del alto por paso) que CRECEN despacio desde el icono (un paso cada
  ~7,7 s; cada uno aparece y se retira sin salto, `w`, con identidad estable para su vaivén); ampliación ×1,24 y corrimiento por disco; canto de cristal
  (franja del 10 % exterior que empuja hacia fuera + vetas tangenciales), luz y media luna de sombra; un temblor fino de superficie. RELIEVE de pincelada
  (ruido anisótropo en coordenadas de la lámina, iluminado por diferencias: la lente lo amplía con el óleo) para que las láminas de 250 px no se lean
  blandas. SE FUNDE: algo desaturado, teñido de la noche de la estación (uniform `N`, vira con el cambio), cantos fundidos hacia ella, sin sombra, fondo
  `--noche`, el grano de la página encima y la píldora en Rosa niebla. ÓLEOS: la lámina 4×4 recortada por sus canalones blancos → `public/media/tarjetas/
  <estación>-<0..3>.webp` (640×968, lanczos + enfoque suave): cada tarjeta su cuadro, los cuatro de la estación de hoy. Los de la ronda 51, en
  `tools/retirados/tarjetas-r51/` (siguen en `public/` por `TarjetaPaso.astro`, guardada).
- **Medido:** `astro check` 0 errores · `tools/r51-agua.cjs` (Chrome y WebKit, DPR 2): la tarjeta cambia el 71–83 % de sus píxeles en 1 s, sin errores ·
  cuatro estaciones capturadas en escritorio y móvil (16 texturas cargadas, `gl.getError` 0) · `tools/r51A2-dolores.cjs`: las cuatro tarjetas vivas y el
  recorrido entero · `tools/verify.cjs` con `?s2=a2` (Chrome y WebKit, 1280 y 390): consola limpia, 0 ≥ 400, desborde 0. **SIN medir:** GPU real (12 muestras
  del óleo por píxel + 8 discos, una tarjeta a la vez a ~30 fps).
- **Pendiente de Andoni:** las láminas llegan a 250×380 por cuadro (a más resolución la pincelada sería real, no simulada); traen pintada la cinta de cristal,
  que en algunas (primavera) se suma a los discos; no publicado ni subido.
- **PUBLICADA (24/09) en https://savvia.studio** (Andoni: «me gusta, súbelo a GitHub y publica. Aún habrá que darle más vueltas»): la sección 2 por defecto
  es la A2 (tarjetas de agua); `?s2=b` y `?s2=a` siguen de prueba. Push de `06cbba8` → en vivo a los 12 s. Medido EN VIVO: `tools/verify.cjs` (Chrome y WebKit,
  1280 y 390) limpio, 0 ≥ 400, desborde 0 · la tarjeta de agua ondea (65–70 % de píxeles en 1 s) en Chrome y WebKit. Sigue `noindex`.
- **Arreglo (Andoni: «cuando cambie de estación las cards cambien bien, ahora se bugean y te enseñan otra estación»):** dos causas. (1) En el shader la mezcla iba
  AL REVÉS: la estación nueva salía de golpe fuera del frente, la vieja crecía desde el icono comiéndosela y al acabar saltaba a la nueva → ahora la nueva
  crece desde el icono y fuera sigue la vieja. (2) Carrera: con varios clics mientras cargaban las láminas, la última en llegar ganaba → manda la última
  pedida (`pedido`); a media onda, lo que ya se ve es el punto de partida. Medido: `tools/r52-cambio.cjs` (Chrome y WebKit): un cambio, ráfagas de 2, 3 y 5
  clics y un clic a media onda → la tarjeta acaba siempre en la estación de la página; captura a 0,7 s con el invierno entrando desde el icono.

### Ronda 53 — 2026-09-25 · copy del Keynote y H1 concreto, el arnés de la IA, la receta de papel, ejemplos reales en Servicios y el cilindro (en local)
- **Andoni (textual):** 1 «Los copies tienen que estar más cerca del keynote. Y el H1 tenemos que mejorarlo, ahora mismo es muy amplio y no dice nada. Más
  específicos para que cuando entre un cliente diga hostia, esto pueden hacer por mí» · 2 «La sección de savvia la receta de tu web quiero hacer una receta
  de papel estilo poetry.camera pero que tenga relación con savvia. Al final el papel sale del árbol. Para nosotros la receta es esto que entregamos a cliente:
  neety.treseiscero.app/library» · 3 «Servicios me gusta cómo los mostramos pero hay que afinar los copies y ver qué mostramos al hacer hover: igual un ejemplo
  real de cada paso» · 4 «Más proyectos: al hacer scroll, que parezca que la página está curvada hacia dentro, como un cilindro» · (a media ronda) «el
  concepto del arnés de la IA: la receta de savvia te ayuda a que la IA te lleve a donde tú quieres llegar y no a otro sitio que no querías».
- **Keynote releído** (`savvia-recursos/Narrativa - Savvia.key`, texto sacado de sus .iwa): pitch («empresas que están cambiando y su web ya no les representa…
  no ofrece un lavado de cara: la rehace entera de principio a fin con el cliente dentro»), los cuatro problemas («Web anclada en paradigma anterior»), la
  diapositiva de servicios (orquestación con desarrollo agéntico · procesos que elevan la calidad y reducen costes · todo documentado · formación) y beneficios
  («mejor web en menos tiempo y a menor coste»).
- **Hecho:**
  · **1 · copy (`home.ts`):** H1 «Una web a medida que tu equipo cambia con IA, sin romperla.» (qué: web a medida; para quién gana: tu equipo; la promesa: con IA
    y sin salirse de la marca = el arnés); subtítulo, el de Andoni (ronda 41). `max-w` 16 → 20ch; `--roble-h` −5 rem en escritorio (el titular ocupa 3 líneas;
    a 1280×720 el roble pasa de 296 a 216 px y el hero sigue midiendo 720). Dolores con los problemas del Keynote («Tu web ya no te representa.» · «Podría ser
    la web de cualquiera.» · «Nadie sabe cómo cambiarla sin romperla.» · «Cada cambio es un presupuesto y una espera.»); el tercero presenta el ARNÉS.
  · **3 · Servicios:** copy del Keynote («Rehecha de principio a fin.» · «Cambios en horas, no en presupuestos.» · «Tu equipo, al mando de la IA.») y, al pasar,
    un EJEMPLO REAL en vez del dibujo: la home de Zernio recorrida entera en un navegador; una petición real del manual de Neety que se escribe palabra a palabra
    («Añade una métrica más a la sección “Por qué Neety”…») con «publicado ✓»; el manual de Neety recorrido despacio (`public/media/servicios/manual-neety.webp`,
    `tools/r53-manual.cjs`). Pie en mono «Ejemplo real · …».
  · **2 · `LaReceta.astro` (nueva; `LaSavvia.astro` queda guardada):** sección oscura; de fondo, NUESTRO ROBLE (la acuarela del hero) grande y desenfocado: el papel
    sale del árbol. Cinco TIRAS de papel térmico estilo poetry.camera (Rosa niebla con grano, mono, título centrado, una raya ASCII distinta cada una, giro de
    ±1,2° como mucho, paralaje propio en escritorio, fila con desplazamiento lateral en móvil) con la receta REAL entregada a Neety: fundamentos · guardarraíles
    (el arnés) · lo que pide su equipo · ticket · decisiones. Cada tira SE IMPRIME al llegar (se descubre de arriba abajo a tirones, `steps(16)`). Titular «La savvia
    es la receta de tu web.» + «Y el arnés de tu IA: lo que hace que te lleve a donde quieres ir, y no a otro sitio.» + enlace a la receta entera (library de Neety).
    El Estudio pierde su transición líquida (ahora va de oscuro a oscuro).
  · **4 · el CILINDRO (`Anteriores.astro`):** cabecera, piezas y voces sobre la cara interior de un cilindro de radio 0,95 pantallas (1,25 en móvil): a un ángulo
    φ = d/R del centro de la pantalla, cada bloque se acerca R(1 − cos φ), se recoge hacia el centro y se inclina φ (rotateX). Centros medidos sin transformar;
    más allá del tope, el bloque se queda como en el tope (primer intento: volvían a entrar en pantalla). `overflow-x: clip` en la sección. Sin movimiento reducido.
- **Medido:** `astro check` 0 errores y 0 avisos · `astro build` OK · `spacing-lint` en escala · `tools/verify.cjs` (Chrome y WebKit, 1280 y 390): consola limpia,
  0 ≥ 400, desborde 0 · `tools/r53-cilindro.cjs` (Chrome 1280 y 390, WebKit 1280): desborde 0 en cinco puntos del scroll, curvatura capturada · `tools/r53-servicios.cjs`
  (Chrome y WebKit, DPR 2): los tres ejemplos abiertos al pasar (opacidad 1), sin 404 · `tools/r53-receta.cjs` (Chrome 1280 y 390, WebKit 1280): cinco tiras
  impresas, desborde 0 · `tools/r52-cambio.cjs` sin regresión. **SIN medir:** fluidez del cilindro en GPU real (8 bloques con `perspective` por scroll).
- **Backup:** `../savvia-web.bak-r52-2026-09-25/`.
- **Pendiente de Andoni:** el H1 (alternativas: «Tu web, rehecha a medida y lista para que tu equipo la cambie con IA.» · «Webs a medida que tu equipo cambia con
  IA, sin salirse de tu marca.»); si el subtítulo «Eleva tu web con criterio.» se queda o pasa a «Mejor web, en menos tiempo y a menor coste.»; permiso de Neety
  para enseñar su receta y enlazar su library; las tiras rozan dos reglas de «Rechazado» (papel suelto, giro) por petición expresa: se mantienen casi rectas;
  no publicado ni subido.
- **A media ronda (Andoni):** «sin romperla no me gusta, es muy despectivo» → H1 «Una web a medida que tu equipo cambia con IA, fiel a tu marca.» (el arnés dicho en
  positivo) y el tercer dolor, «Nadie sabe cómo cambiarla.». Medido: el hero sigue en 720 a 1280×720 (titular de 3 líneas, 227 px) y en 844 a 390×844.
- **Rechazado (ronda 53):** decir lo que hace la IA en negativo («sin romperla»): es despectivo con quien cambia su web. El arnés se cuenta en positivo.

### Ronda 54 — 2026-09-25 · el hero limpio, las demos sin tarjeta, Servicios que se construyen, la receta clara (humana + digital, de izquierda a derecha) y la ventana del pie (en local)
- **Andoni (textual):** «en el hero hemos añadido unos detalles de naturaleza al fondo que no proceden» · 1 «al lado de cada pain algo que lo represente
  visualmente. Antes teníamos unas cards que me gustaban pero no encajaban: utilizar la animación de dentro de las cards sin las cards» · 2 «en servicios,
  cambiar los nombres grandes, no me convencen. Algo más comercial; y al hacer hover representar un ejemplo real pero cómo se ejecuta, cómo se va
  construyendo cada caso» · 3 «la receta de savvia, que caiga en un color claro y los tickets con más personalidad y más humanos. En cada ticket superponer
  algo digital que enfatice lo que pasa en cada uno. También es un proceso de izquierda a derecha, mostrarlo mejor. El árbol de fondo va fuera» · 4 «en el
  footer, en algún lado pequeño, una ventanita que puedas abrir y de la cual entra luz».
- **Hecho:**
  · **Hero:** eran las ramas del ESTUDIO (fallo de Nilo en la ronda 53: al quitarle `data-sube` perdió su `position: relative` y sus `Flora` absolutas se fueron
    al principio de la página) → `relative` en `Estudio.astro` (y vuelve `data-sube`: la receta es clara otra vez). Medido: 0 ramas en el primer pantallazo.
  · **1 · `TarjetaPaso.astro` › `desnuda`:** las cuatro demos (escuchando, las dos direcciones que se funden, `savvia.md` líquido, la landing de campaña)
    SIN tarjeta: sin fondo, sin filo y sin el pozo oscuro (que era un color plano sin grano), sobre la sección; `Dolores.astro` las usa en lugar de las
    tarjetas de agua (`TarjetaAgua.astro` queda guardada) y enseña ya la respuesta larga. La raíz pasa por DETRÁS de cada demo (hueco en su máscara) y la rama
    del fondo baja a 0,22 / 0,14.
  · **2 · `Servicios.astro`:** nombres «Web a medida» · «Cambios con IA» · «Equipos con IA». Al pasar, un PROCESO de 10 s con pasos que se encienden abajo:
    Zernio (briefing real → boceto con las cajas de su hero medidas en su captura → sistema con sus colores → su web) · Neety (la petición real de su manual se
    escribe → lo que hace el agente → la vista previa con la métrica nueva → «publicado en neety.com ✓») · Neety (su equipo recorre cuatro apartados reales de
    su manual: `public/media/servicios/manual-*.webp`, `tools/r54-manual-pasos.cjs`). Cada proceso se REINICIA entero cada 10 s mientras está abierto (los
    retrasos de CSS solo valen en la primera vuelta). Demo más ancha (4 columnas).
  · **3 · `LaReceta.astro` (rehecha):** sección CLARA, sin árbol. PROCESO: 01 tu marca → 02 el arnés → 03 tu equipo pide → 04 queda escrito → 05 la cuenta,
    sobre un hilo de savia que avanza de izquierda a derecha; cada ticket se imprime en su turno (0,9 s). HUMANO: papel térmico casi blanco con el canto de
    abajo DENTADO y TINTA A MANO en Coral que se dibuja después (círculo, subrayado, tachado, vistos). DIGITAL: sobre cada ticket aterriza una pieza de
    interfaz recta y nítida: muestras de la paleta con el token · «#FF2E9A no está en la receta → usa Naranja Core» (el arnés) · el agente leyendo la receta →
    «sección lista ✓» · «docs/decisiones.md +3 líneas» · «publicado · neety.com ✓». Cada una en su altura, asomando por el lado.
  · **4 · `Pie.astro`:** VENTANA de dos hojas de madera bajo el subtítulo («abre la ventana»); al pasar, se entreabre; al abrirla, las hojas giran, el cielo
    se enciende y entra un HAZ de luz cálida que baja en diagonal hasta el paisaje: el barrido de los cuatro cristales (la cruz del marco hace sombra) que se
    abre al alejarse, con motas de polvo. «ciérrala» la cierra; con el formulario abierto, la luz se apaga.
- **Medido:** `astro check` 0 errores y 0 avisos · `astro build` OK · `spacing-lint` en escala · `tools/verify.cjs` (Chrome y WebKit, 1280 y 390): consola limpia,
  0 ≥ 400, desborde 0 · `tools/r54-dolores.cjs` (Chrome 1280 y 390, WebKit 1280): cuatro demos vivas · `tools/r54-servicios.cjs` (Chrome y WebKit): los tres
  procesos capturados en sus cuatro fases · `tools/r53-receta.cjs` (Chrome 1280 y 390, WebKit 1280): cinco tickets impresos, desborde 0 · `tools/r54-ventana.cjs`
  (Chrome 1280 y 390, WebKit 1280): abre (k 1) y cierra (k 0) · cilindro sin regresión.
- **Backup:** `../savvia-web.bak-r52-2026-09-25/` (antes de la ronda 53; la 53 no se llegó a publicar).
- **Pendiente de Andoni:** los nombres de Servicios (alternativas: «Tu web, nueva» · «Web viva» · «Formación IA»); si el boceto de Zernio y la métrica de Neety
  (reconstrucciones del proceso con material real) le valen como «ejemplo real»; permiso de Neety y Zernio; no publicado ni subido.

### Ronda 55 — 2026-09-25 · óleos pintados en el fondo de los dolores, la ventana discreta con la luz sincronizada y el ticket que se imprime con el scroll (en local)
- **Andoni (textual):** 1 «en la segunda sección, debajo de cada ilustración animada, los fondos estilo óleo de cada estación; muy mimetizados con el fondo,
  como si estuvieran pintados en el fondo y con el efecto dithering; sustituyen a los detalles de naturaleza» · 2 «la ventana del footer más realista y sutil,
  y no indiques nada de que se abre: que la gente la descubra si indaga en el footer; que llame un poco la atención pero muy poco. Y cuando se va la luz no
  está bien sincronizado y no parece realista» · 3 «la receta me gusta, pero que a medida que haces scroll se vaya imprimiendo el ticket: un ticket continuo con
  los diferentes pasos, y por encima salen esos resaltes digitales».
- **Hecho:**
  · **1 · `Dolores.astro`:** bajo cada demo, el ÓLEO de su paso en la estación de la web (`public/media/tarjetas/<estación>-<k>-v.webp`: las láminas de Andoni con
    un borde que se desvanece irregular, horneado con `tools/r55-oleos-vineta.cjs`) pintado con el MOTOR DEL ÁRBOL (`estela.ts`): se hunde en la noche, se
    deshace en semitono hacia fuera y HIERVE (soplo sin luz), con un 25 % del color de la estación. No existe hasta que llega la savia: entonces se dibuja y
    se pinta desde el centro (2,6 s), a la vez que la demo. Al cambiar de estación, lienzo nuevo con el cuadro nuevo (el viejo suelta su contexto WebGL).
    Fuera las ramas de flora. Opacidad 0,52.
  · **2 · `Pie.astro` › la ventana:** sin rótulo. Hueco con sombra dentro, marco fino, alféizar y contraventanas de LAMAS; entre las lamas se escapa, tenue, la
    luz de fuera. Al pasar, las hojas se entreabren y se cuela una rendija de luz. La LUZ ya no «viaja» (crecer y recogerse no era realista): sale de la
    ABERTURA. Un solo reloj (`ap`) gira las hojas y recorta el haz a la rendija que dejan: al abrir se ensancha desde el centro; al cerrar se estrecha y se
    apaga justo cuando las hojas se juntan (curva de madera: arranca y frena).
  · **3 · `LaReceta.astro` (rehecha; la de la ronda 54, en `tools/retirados/LaReceta.r54.astro.txt`):** una IMPRESORA (ranura oscura) fija a tres cuartos
    de la pantalla; el ticket, UNO y largo con los cinco pasos seguidos (cabecera «savvia · la receta de la web de Neety», dentado arriba y abajo), sale de
    ella con el scroll a tirones de una línea. Cada paso, cuando ha salido entero, recibe su tinta a mano y, a su lado y montada sobre el canto, su pieza
    digital (derecha e izquierda alternando; en móvil, sobre el canto de abajo). El papel y sus dientes van en una capa (`::before`): la máscara ya no
    recorta las piezas.
- **Medido:** `astro check` 0 errores y 0 avisos · `astro build` OK · `spacing-lint` en escala · `tools/verify.cjs` (Chrome y WebKit, 1280 y 390): consola limpia,
  0 ≥ 400, desborde 0 · `tools/r55-receta.cjs` (Chrome 1280 y 390, WebKit 1280): impreso 57 → 475 → 893 → 1311 → 1729 → 1768 px con el scroll y 0 → 5 pasos
  marcados, desborde 0 · `tools/r55-ventana.cjs` (Chrome 1280 y 390, WebKit 1280): abertura 0 · 0,13 (rendija) · abriéndose · 1 · cerrándose · 0 · `tools/
  r55-oleos-estacion.cjs` (Chrome y WebKit): otoño → invierno cambia el cuadro, 4 lienzos, sin errores · `tools/r54-dolores.cjs` y `r54-servicios.cjs` sin
  regresión. `tools/r52-cambio.cjs` queda obsoleta (probaba las tarjetas de agua, que ya no se usan).
- **Pendiente de Andoni:** el cambio de estación del óleo es inmediato (se podría pintar con el frente rasgado como el árbol); no publicado ni subido.

### Ronda 56 — 2026-09-25 · el óleo cambia de estación pintándose, el ticket imprime de verdad (con sonido y flora) y la luz se filtra por las lamas e ilumina «Contáctanos» (en local)
- **Andoni (textual):** 1 «¿podemos hacer que los fondos de la segunda sección se cambien al cambiar de estación como cambia el árbol del hero?» · 2 «el ticket que se va
  imprimiendo, que parezca que se imprime de verdad; ahora parece muy artificial, uno de verdad va más a tirones. Y si podemos ponerle sonido de ticket que
  se imprime sería top. También añadirle algunos detalles florales a la receta alrededor si no queda muy a destono» · 3 «la ventana: como has puesto
  persianita, que se filtre un poco de luz por esos huecos. Al hacer hover no sale nada de luz, solo al clicar. Y si podemos hacer que ilumine el
  contáctanos y además proyecte su sombra sería top» · (a media ronda) «el sonido del ticket lo puedes sacar de aquí: silencio.es».
- **Hecho:**
  · **1 · `Dolores.astro`:** al cambiar de estación, el óleo nuevo se PINTA ENCIMA del viejo con el frente del árbol (líneas y pintura rasgada con filo de savia,
    2,4 s) sobre un lienzo nuevo; al acabar, el viejo se retira y suelta su contexto WebGL. Capturado a 0,65 s: el invierno avanzando sobre el otoño.
  · **2 · `LaReceta.astro` (la de la ronda 55, en `tools/retirados/LaReceta.r55.astro.txt`):** el ticket va ENGANCHADO a la boca de la impresora y sale hacia
    ARRIBA (escenario sticky de 100 lvh dentro de una «imprenta» tan alta como el ticket + una pantalla). El scroll marca hasta dónde hay que imprimir; la
    IMPRESORA va a su ritmo: una línea cada 28–40 ms en ráfagas, pausas cortas cada 4–8 líneas y una larga (0,3–0,46 s) entre pasos; si se queda muy atrás,
    dos líneas por tirón; nunca desimprime; termina aunque ya no se vea. Cada tirón sube el papel en dos golpes con rebote de 1 px; la impresora vibra y se
    enciende su piloto. SONIDO sintetizado (Web Audio): motor continuo (rasgueo filtrado + zumbido del paso a paso) con un golpe por línea y dos pitidos al
    terminar; solo tras un gesto en la página y nunca con `savvia:sonido = 0`. silencio.es usa grabaciones propias (`print1.2.mp3`, `print2.1.mp3`,
    `beep.mp3`, «all rights reserved»): NO se han copiado. FLORA: helecho y brezo (motor del árbol, fondo niebla) a los lados, solo escritorio.
    Con movimiento reducido: el ticket entero, en su sitio.
  · **3 · `Pie.astro` › la ventana:** con las hojas cerradas, la luz se FILTRA entre las lamas: el haz de la ventana hecho de hilos finos (trama en la dirección
    de la luz, desenfocada 1,4 px, al 26 %), que se apaga según se abre. Al pasar, se entreabre (abertura 0,2) y sale luz de verdad. «Contáctanos» se ILUMINA
    donde cae la luz (una copia en luz cálida a media intensidad, recortada con `clip-path: path()` a la forma exacta del haz y de los hilos) y proyecta su
    SOMBRA en la dirección de la luz (42 px); todo con el mismo reloj de las hojas.
- **Medido:** `astro check` 0 errores y 0 avisos · `astro build` OK · `spacing-lint` en escala · `tools/verify.cjs` (Chrome y WebKit, 1280 y 390): consola limpia,
  0 ≥ 400, desborde 0 · `tools/r56-receta.cjs` (Chrome 1280 y 390, WebKit 1280): impreso/objetivo 0/0 · 76/84 · 380/624 · 950/1164 · 1463/1704 · 1710/1768 →
  1768/1768, cinco pasos marcados, audio «running» tras el clic, desborde 0 · movimiento reducido: ticket entero (1775 px) y cinco pasos · `tools/r55-ventana.cjs`
  (Chrome 1280 y 390, WebKit 1280) · `tools/r55-oleos-estacion.cjs` (Chrome y WebKit). **SIN medir:** la escucha del sonido (lo decide Andoni con el oído).
- **Pendiente de Andoni:** escuchar la impresora; si quiere una grabación real, hace falta una con licencia (librería o grabada por nosotros): la de silencio.es
  es suya; no publicado ni subido.

### Ronda 57 — 2026-09-25 · las siluetas en la ventana y su sombra en la luz, «still eric&andoni», la sombra de «Contáctanos», la ventana que se cierra con el formulario, el ticket que vuelve a la impresora, el altavoz y la maleza (en local)
- **Andoni (textual):** «cuando la ventana está cerrada la luz que proyecta tiene que ser mucho más sutil; cuando se abre se pueden desvelar dos siluetas en la ventana
  y debajo escribirse muy pequeño "still eric&andoni". Le falta proyectar sombra al contáctanos cuando se abre la ventana. Y recuerda que las siluetas también
  habría que tenerlas en cuenta para cómo se proyecta la luz» · «en el ticket, poner en esa sección para activar y quitar sonido. Y los detalles florales,
  que salgan como envolviendo el ticket, como si fueran parte de la naturaleza» · (a media ronda) «la luz de la ventana no se va al abrirse el formulario» ·
  «el ticket, cuando haces scroll hacia arriba una vez abierto, se buguea y se ve mal: una vez abierto lo dejamos abierto y puedes hacer scroll en él
  metiéndose por donde ha salido».
- **Hecho (`Pie.astro`):** la luz filtrada entre las lamas, al 9 % (antes 26 %). SILUETAS: dos bustos a contraluz en la parte baja del cristal (`#siluetas-v`), que
  se desvelan con la abertura; su SOMBRA viaja en el haz: el cristal barrido por la luz en 90 copias de las siluetas (más grandes cuanto más lejos) dentro de
  una máscara desenfocada. Debajo se escribe letra a letra «still eric&andoni» (mono, 9 px, alineada con la ventana). El haz llega ya hasta el suelo del paisaje
  (97 % del pie) y no se desvanece del todo: la «n» iluminada proyecta su sombra (56 px en la dirección de la luz) sobre la colina. Al abrir el formulario, la
  ventana SE CIERRA (con su animación: la luz se va con las hojas); fuera el `visibility: hidden` que la cortaba de golpe.
- **Hecho (`LaReceta.astro`):** lo IMPRESO se queda impreso (ni se reimprime ni suena) y lo que ASOMA sigue al scroll en los dos sentidos: al subir, el papel se
  mete por la boca; al bajar, vuelve a salir (`asoma = min(impreso, scroll)`); ya no se monta sobre el titular. ALTAVOZ en la propia impresora («sonido», con
  ondas o tachado): comparte `savvia:sonido` con la web y pulsarlo es el gesto que deja sonar. MALEZA: helecho y brezo por delante del papel (y detrás de la
  impresora) y roble con bellotas y acebo por detrás, alrededor de la boca: el ticket sale entre las ramas (escenario con `isolation`).
- **Medido:** `astro check` 0 errores y 0 avisos · `astro build` OK · `spacing-lint` en escala · `tools/verify.cjs` (Chrome y WebKit, 1280 y 390): consola limpia,
  0 ≥ 400, desborde 0 · `tools/r57-receta-vuelta.cjs` (Chrome 1280 y 390, WebKit 1280): al subir, asoma 1768 → 0 px con el scroll y 0 veces sobre el titular ·
  `tools/r57-receta-flora.cjs` (Chrome y WebKit): altavoz on → off (`0`) → on (`1`, audio «running») · `tools/r55-ventana.cjs` (Chrome 1280 y 390, WebKit 1280) ·
  ventana abierta + formulario → ventana cerrada (k 0) · `tools/r56-receta.cjs` sin regresión.
- **Pendiente de Andoni:** escuchar la impresora; las siluetas son bustos genéricos (si quiere, se recortan de fotos de perfil de los dos); no publicado ni subido.

### Ronda 58 — 2026-09-25 · sonido de impresora térmica, el ticket que se queda abierto y la luz del punto final (fuera la ventana) (en local)
- **Andoni (textual):** 1 «el sonido del ticket tiene que ser más realista. Una vez hecha la animación de scroll no quiero secuestrar el scroll para volver arriba: el
  ticket se queda abierto y puedes scrollear sobre él» · 2 «quitamos la ventana del footer; si podemos conseguir algo parecido de una forma más sintetizada con el
  diseño, mejor».
- **Hecho:**
  · **1 · `LaReceta.astro` › sonido:** «brrrrt» de térmica: MOTOR (sierra ~430 Hz saturada con `tanh`, pasa-banda 1,4 kHz) + CABEZAL (ruido pasa-altos 2,6 kHz),
    los dos temblando al ritmo de los pasos (trémolo cuadrado ~96 Hz, 0,35–1); microcorte de 6 ms entre líneas; al acabar, la CUCHILLA que corta el papel
    (golpe de ruido corto + chasquido que baja de 3,2 a 1,4 kHz) en vez de pitidos. Renderizado a `tools/shots/r58-impresora.wav` (`tools/r58-sonido-wav.cjs`,
    misma síntesis y mismo ritmo) para escucharlo.
  · **1 · `LaReceta.astro` › abierto:** al terminar de imprimir, el escenario deja de ir fijo y se ANCLA en la página justo donde está (sin salto); el ticket queda
    fuera entero y el scroll es normal (ya no se mete por la boca).
  · **2 · `Pie.astro`:** fuera la ventana, las siluetas y la firma (en `tools/retirados/Pie.r57-ventana.astro.txt`). La luz sale ahora del PUNTO FINAL de «La savvia
    de tu web.»: en reposo respira muy despacio (un halo mínimo), al pasar se aviva, al pulsarlo se enciende como una bombilla (un parpadeo) y cae un CONO de luz
    cálida desenfocado hasta el paisaje, con motas; ilumina «Contáctanos» (copia en luz recortada al cono) y le hace proyectar su sombra; otro clic lo apaga; con
    el formulario, se apaga solo.
- **Medido:** `astro check` 0 errores y 0 avisos · `astro build` OK · `spacing-lint` en escala · `tools/verify.cjs` (Chrome y WebKit, 1280 y 390): consola limpia,
  0 ≥ 400, desborde 0 · `tools/r58-receta-abierta.cjs` (Chrome 1280 y 390, WebKit 1280): abierta, el ticket quieto en la página al volver arriba, 0 veces sobre
  el titular · `tools/r58-punto.cjs` (Chrome 1280 y 390, WebKit 1280): encendida (k 1) → con formulario apagada (k 0) · `tools/r56-receta.cjs` y
  `r57-receta-flora.cjs` sin regresión · espectro del `.wav`: ráfagas con armónicos del motor y ruido del cabezal, pausas y la cuchilla.
- **Pendiente de Andoni:** escuchar `r58-impresora.wav`; si quiere, una grabación real con licencia; no publicado ni subido.

## Rechazado — añadidos de la ronda 58 (NO VOLVER)
- La VENTANA del pie (rondas 54–57: contraventanas, luz filtrada, siluetas, «still eric&andoni»): «quitamos la ventana; algo parecido, más sintetizado con el diseño».

### Ronda 59 — 2026-09-25 · sonidos grabados (impresora y ambiente del estudio), el logotipo en el ticket y la bombilla medio fundida del pie (en local)
- **Andoni (textual):** 1 «la receta de savvia que tenga un sonido más realista, si hace falta sácalo de internet» · 2 «en la receta sale el logo de savvia» · 3 «en el footer
  me gusta lo del punto, pero que parpadee como si fuera una bombilla a medio fundir y cuando clicas ilumina todo el contáctanos; y corregir que cuando abres el
  formulario no se solape lo iluminado con el formulario» · (a media ronda) «y los sonidos de ambiente de fondo del mockup, si lo podemos sacar de internet
  también, mejor: sonidos muy naturales».
- **Hecho:**
  · **Sonidos (`public/media/sonido/`, fuentes y licencia en `tools/fuentes-sonido.md`: Pixabay, uso libre sin atribución):** la IMPRESORA es una grabación
    real de una térmica Epson: 7,6 s de impresión en bucle (desde un punto al azar) mientras tira, con el microcorte por línea, y la CUCHILLA grabada al
    terminar (`LaReceta.astro`; fuera la síntesis). El AMBIENTE del estudio (`sonido-estudio.ts`) son grabaciones de campo, una por estación, en bucles de
    45 s con fundido cruzado de 3 s y −23 LUFS: bosque por la mañana (primavera) · prado con grillos (verano) · viento en los árboles (otoño) · rachas de
    viento (invierno); fundido de 2,5 s al cambiar; paso bajo suave de 7 kHz (el cristal); nivel 0,2 (≈ −37 LUFS). Solo se descarga la estación que suena y
    solo con el sonido encendido (360 KB cada una). Cascos al sentarse y efectos de interfaz, como estaban.
  · **Ticket:** la cabecera es el LOGOTIPO (máscara de `savvia-logo.svg` en la tinta del papel, 1,9 rem).
  · **Pie › el punto:** en reposo titila como una bombilla medio fundida (ciclo irregular de 7,3 s con caídas bruscas); encendida, cada 2,6–9 s la luz entera
    tiembla 2–4 veces. El cono apunta al centro de «Contáctanos» y se abre hasta cubrir la palabra ENTERA (iluminada y con su sombra). Al abrir el formulario, la
    palabra iluminada desaparece en el acto y el cono se apaga en 220 ms: ya no se cruza con el panel.
- **Medido:** `astro check` 0 errores · `astro build` OK · `spacing-lint` en escala · `tools/verify.cjs` (Chrome y WebKit, 1280 y 390): consola limpia, 0 ≥ 400,
  desborde 0 · `tools/r59-sonidos.cjs` (Chrome y WebKit): los mp3 responden 200, el ambiente suena (contexto «running», ganancia 0,19) y la impresora imprime el
  ticket entero con el contexto «running» · `tools/r59-punto.cjs` (Chrome 1280 y 390, WebKit 1280): encendida k 1; a 260 ms de abrir el formulario, luz de la
  palabra a 0 · `tools/r58-receta-abierta.cjs` sin regresión. **SIN medir:** la escucha (lo decide Andoni con el oído).
- **Pendiente de Andoni:** escuchar impresora y los cuatro ambientes (hay alternativas descargadas y analizadas para cada estación); no publicado ni subido.
- **A media ronda (Andoni):** «los sonidos ambiente, que se escuchen menos, más sutiles» → nivel del ambiente 0,2 → 0,09 (≈ −44 LUFS; unos 7 dB menos). Sentado, con los
  cascos, baja además al 42 %. Medido: ganancia 0,09 con el sonido encendido.
- **A media ronda (Andoni):** «la impresora y los clics, más bajo también» → impresora 0,55 → 0,28 y cuchilla 0,8 → 0,4; clics de cambio de proyecto, sentarse y levantarse,
  a la mitad (`sonido-estudio.ts › fx`).
- **A media ronda (Andoni):** «la (x) en la vista focus a veces abre el nav bar: que no ocurra nunca». Causa: la × está donde el botón del menú y el bloqueo era solo
  de 1,6 s: quien repetía el clic en la × mientras la cámara aún se posaba caía en el menú. Ahora (`Nav.astro`), al levantarse el botón queda BLOQUEADO hasta
  que el ratón SALE de su zona (±24 px); con dedo, 2,5 s; con teclado, 0,3 s. Medido (`tools/r59-cruz.cjs`, Chrome 1280 y 390, WebKit 1280): × y tres clics más
  en el mismo sitio a 0,3 · 1,7 · 3 s, dos veces seguidas → el menú nunca se abre; al salir y volver, el menú abre normal.
- **A media ronda (Andoni):** «cuando encendemos la luz en el footer y se abre el formulario, la luz no se apaga: se queda por detrás» → aclarado: «la luz, si la
  tienes encendida al abrir el formulario, tiene que quedarse por detrás». Fuera el apagado automático: la luz SIGUE encendida y el panel la tapa (el cono,
  que va por encima del paisaje, lleva un `clip-path` con el hueco del panel, `path(evenodd, …)`, seguido fotograma a fotograma mientras sube y baja); la
  palabra iluminada se retira con la palabra. Medido (Chrome y WebKit, 1280): con el formulario abierto k 1 y el hueco puesto; al cerrarlo, sin hueco y la luz
  sigue encendida; capturas subiendo y abierto.
- **A media ronda (Andoni, con captura):** «la luz no se transparenta por detrás de la card y luego hace un raro a la izquierda» · «el formulario debería proyectar algo
  de sombra al abrirse». El hueco duro en el cono dejaba el cristal sin luz → una COPIA del cono vive dentro del paisaje, justo detrás del panel (mismo z, antes en
  el DOM; delante del velo y de los árboles), recortada al panel: el desenfoque del cristal la deja ver esmerilada. SOMBRA: una mancha oscura desenfocada (44 px)
  del tamaño del panel, dentro del paisaje, detrás del panel y de la hierba (no oscurece el prado de delante: la primera versión, con `box-shadow` sobre el paisaje,
  dibujaba un rectángulo en la hierba); con la luz encendida se desplaza 50 px en la dirección de la luz y se oscurece (0,34 → 0,64). Medido (Chrome y WebKit, 1600):
  capturas con la luz encendida y apagada; al cerrar, la copia a 0 y la luz sigue encendida.
- **A media ronda (Andoni):** «el formulario tiene que proyectar sombra hacia delante pero con perspectiva: corta la luz a izquierda y derecha con una línea recta y queda
  raro; debería seguir la perspectiva». La sombra de la luz es ahora una CUÑA: de las dos esquinas de arriba del panel, siguiendo los rayos que salen del punto, hasta
  más allá del suelo (se abre con la distancia); se resta del cono con una `<mask>` SVG desenfocada (7 px: canto blando) en vez del hueco recto. La copia de la luz
  tras el cristal no lleva la cuña. La mancha de la sombra ya no se desplaza con la luz (queda la sombra blanda de siempre). Capturas Chrome y WebKit a 1600.
- **PUBLICADA (25/09) en https://savvia.studio** (Andoni: «sube a GitHub y publica»): rondas 53–59 en un commit, push de `6eeef92` → Vercel. Medido EN VIVO:
  `tools/verify.cjs` (Chrome y WebKit, 1280 y 390) limpio, 0 ≥ 400, desborde 0 (una primera pasada dio un 404 de un script de la versión anterior mientras
  se propagaba el despliegue; a los 20 s, limpio) · `tools/r59-sonidos.cjs` en vivo: mp3 200, ambiente y impresora suenan. Sigue `noindex`.

### Ronda 60 — 2026-09-28 · el REEL de proyectos (primer corte, en local; el menú aún no se toca)
- **Andoni (textual):** «me gustaría hacer un reel chulo de todos los proyectos que hay en la web y que salga en el menú superior cuando se abre; si clicas lo ves en
  grande» · «entran los 6-7 mejores» · «tenemos permiso de todos; Zernio se puede poner ya como marca blanca, con otro nombre» · «propón tú un nombre» · «de momento
  usamos la primera de Pixabay, Distant Miles».
- **Hecho:** `tools/reel/grabar.cjs`: dos tomas por web en Chrome real a 1920×1080 (Remerge a 390 px ×3): VIVO (screencast CDP remuestreado a 30 fps; 31–57 fps
  reales) y SCROLL (paso a paso, 8 s). Siete webs: Multiverse, Zernio → **Amarra** (marca blanca: texto y logotipo cambiados en la página al grabar; su intro
  con el símbolo se corta), Playground IEP, Neety, Invopop, Isotrol, Remerge. Fuera: Business Online Payroll y Cubbo. `tools/reel/montar.cjs` → `tools/reel/hf/`
  (HyperFrames): 26,8 s cortados al pulso de la música (92 BPM, medido con librosa): gota que cae y abre la primera web con el papel rasgado · cinco webs con su
  nombre en píldora · «Webs a medida.» (Family) · Remerge en móvil · Multiverse en el golpe · seis cortes a pulso · la cámara sale de la pantalla a la mesa de
  otoño · el logotipo se descubre + «savvia.studio · reel 2026».
- **Fallo propio cazado:** el cambio de nombre de Zernio reescribía el título de la página dentro de su propio observador: bucle infinito que colgaba la
  grabación → solo si el título aún dice «Zernio».
- **Medido:** `hyperframes check` sin errores (contraste 3/3) · render 1920×1080 a 30 fps en 52 s · sin fotogramas negros; congelados solo donde se quiere (antes
  de la gota, titular, cierre) · audio −15,9 dB de media, pico −1,9 dB. `renders/reel-savvia-v1-ver.mp4` (20 MB) para verlo.
- **Pendiente de Andoni:** el primer corte; el nombre «Amarra» (alternativas: Dársena, Pontón); la música definitiva; después, el reel en el menú (miniatura en
  bucle sin sonido + reproductor grande que se pinta desde ella).
- **A media ronda (Andoni):** «quiero verlo ya en la web puesto, pero en local» → `Nav.astro`: en la fila de «Más» del menú, a la derecha (en móvil, debajo a
  todo el ancho), la MINIATURA del reel (`public/media/reel/reel-mini.mp4`, 7 s del golpe de Multiverse al montaje, 640 px, 238 KB, en bucle y sin sonido; se
  pide al abrir el menú y se para al cerrarlo) con la píldora «▶ Reel · 0:27». Al pulsarla, el menú se recoge y el REEL (`reel.mp4`, 1600 px, 7,5 MB) se pinta
  en una tarjeta oscura desde la miniatura (como el reproductor de testimonios), con sonido; pausa, hilo de savia que mide y busca, silencio, ×; Esc o clic
  fuera lo recogen. Medido (`tools/r60-reel.cjs`, Chrome 1280 y 390, WebKit 1280): miniatura en marcha con el menú abierto → reel abierto, sonando y con
  sonido, menú cerrado, tarjeta 1024×631 (366×260 en móvil), desborde 0 → Esc lo cierra; consola limpia · `astro check` 0 errores · `spacing-lint` en escala.
  No publicado ni subido.
- **A media ronda (Andoni):** «el reel hay que mejorarlo: repetimos demasiadas veces las mismas animaciones; buscar de cada web más momentos característicos, no
  solo el hero, animaciones de otras secciones, e intercalarlos. El resto me gusta» → `tools/reel/momentos.cjs` (+ `grabar-comun.cjs`): en cada web se miden sus
  secciones y se graba EN VIVO cada una mientras entra en pantalla (scroll lento y real: se disparan sus animaciones de entrada), 46 tomas con hoja de contactos
  (`tools/grab/reel-m/hoja-*.jpg`). Reel v2 (misma estructura, misma música): cada web sale 2–3 veces con momentos distintos (Amarra: los iconos que atracan en
  su API y la sección oscura · Playground: el cohete, «Twenty-one tools» y las notas adhesivas · Neety: las cifras que cuentan y el flujo de señales · Isotrol:
  el mapa y su hero en la mesa · Invopop: el globo y los casos · Multiverse: los cubos isométricos, la esfera en el golpe y la pila roja · Remerge: su bloque
  amarillo en el móvil); ninguna animación se repite. Rótulo solo la primera vez (y la píldora ya no asoma vacía). Menú actualizado (`reel.mp4` 7,8 MB,
  `reel-mini.mp4` 258 KB). Medido: `hyperframes check` OK, render 57 s, sin negros; `tools/r60-reel.cjs` OK en los tres.

### Ronda 61 — 2026-09-28 · PALETA 3 a prueba (en local)
- **Andoni (textual):** «también quiero probar otra paleta de colores»: Vandyke Brown #362304 · Seashell Pink #FFCFC4 · Grenadine Pink #FF616B · Pale Lemon Yellow
  #FFF59E · Salvia Blue #96BFE6 · Violet Blue #202D85; base Seashell + Vandyke; botones Grenadine con texto Vandyke (sustituye a #F65340); texto Vandyke sobre
  rosa, coral, amarillo y azul claro; Seashell sobre marrón; Lemon sobre Violet; un acento dominante por sección; nada de coral o amarillo como texto pequeño
  sobre claro; mismas tipografías, estructura y espaciados · «en las diferentes estaciones mantenemos lo que coincide entre estaciones».
- **Interpretación:** mismos papeles, colores nuevos; lo que cambia con la estación (fondo oscuro y árbol) se queda; cambia lo que es igual todo el año.
- **Hecho:** CONMUTABLE: `html[data-paleta]` desde el `<head>` (por defecto 3; `?paleta=2` la anterior). `global.css`: en la 3, Cacao → Vandyke, Rosa niebla →
  Seashell, Coral → Grenadine, Cobalto → Violet (Servicios, con texto y detalles en Lemon; su botón principal pasa a Grenadine), Nogal → mezcla de Vandyke y
  Seashell; «Más proyectos» sobre Salvia Blue (el fondo alternativo, el de las tarjetas de proyectos). Los colores que estaban escritos a mano ahora leen la
  paleta activa (`src/scripts/tinta.ts`): la gota y su salpicadura, el filo de savia del shader del árbol, las líneas con que se dibujan menú, reel, tarjetas
  y pie, la flora sobre claro, los carriles y los puntos del marco del hero.
- **Medido:** contraste Vandyke/Seashell 10,70 · Vandyke/Grenadine 5,13 · Vandyke/Salvia 7,79 · Lemon/Violet 10,59 · Seashell sobre la noche de otoño 10,38 y de
  verano 9,35 · Grenadine/Violet 4,04 (solo en el botón grande) · `astro check` 0 errores · `spacing-lint` en escala · `tools/verify.cjs` (Chrome y WebKit, 1280 y 390)
  limpio, desborde 0 · `tools/r61-paleta.cjs`: las nueve secciones capturadas en la 3 y en la 2 (`tools/shots/r61-p3-*`, `r61-p2-*`).
- **Pendiente de Andoni:** verla; si «Más proyectos» en Salvia le encaja (o qué sección lleva el fondo alternativo); dónde entra el Lemon además de Servicios;
  favicon e imagen para compartir siguen con la paleta 2; no publicado ni subido.

### Ronda 62 — 2026-09-28 · paleta combinada, la página de PROYECTOS y el CASO DE ESTUDIO de cada uno (en local)
- **Andoni (textual):** 1 «combinar ambas paletas: de la nueva me gusta el nuevo naranja más suave y para servicios el azul clarito; el resto, la paleta
  anterior» · 2 «una página con todos nuestros proyectos, estilo focuslab.agency/work: algunos destacados y luego todos, paginado y con filtros» · 3 «página en
  detalle de cada proyecto con su caso de estudio, como focuslab.agency/work/marketo» · «por el momento los que tenemos en la web; ya iremos añadiendo los de
  treseiscero poco a poco».
- **Referencia medida (`tools/ref62/`):** /work = titular serif enorme; destacados en ritmo entera · mitades · entera, con nombre y lista de servicios; banda
  de cifras; rejilla de todos; «Let's talk». /work/marketo = nombre enorme; entradilla + dos columnas con «Services provided» a la derecha; imágenes a sangre
  alternadas con rejillas; frases grandes; apartados por disciplina; testimonio; siguiente caso en grande.
- **Hecho:**
  · **Paleta:** fuera la paleta 3 y su conmutador. Queda la 2 con `--color-coral` = Grenadine #FF616B (todo lo que era savia y acción) y Servicios
    (`surface-warm`) en Salvia Blue #96BFE6 con texto Cacao (7,1:1); sobre él la barra va en Cacao (se trata como superficie clara). Cobalto sigue en los
    detalles pequeños de las ilustraciones. `src/scripts/tinta.ts` se queda: los scripts leen los colores de los tokens.
  · **Datos (`src/data/proyectos.ts`):** una ficha por proyecto (nombre, sector, lugar, servicios, herramientas, resumen, entradilla, contexto, frase, apartados,
    cifras, cita, color, portada y galería). SOLO HECHOS: textos de los casos de la web anterior (`../savvia_inspo/assets/treseiscero/proyectos.json`, que
    venían recortados), el registro de rondas y lo que se ve en cada web. Nueve proyectos: los cuatro destacados (Multiverse, **Amarra** = Zernio en marca
    blanca, Playground IEP, Neety) y los cinco de «Más proyectos». Citas reales: Sean Klamm (Playground) e Inés López-Pita (Isotrol, traducida).
  · **Medios (`tools/reel/obra.cjs` → `public/media/obra/<slug>/`):** portada y 3–4 momentos por proyecto, sacados de las grabaciones del reel (Business Online
    Payroll y Cubbo, grabados ahora); 1440 px (móvil 600), sin sonido, con póster; 12,7 MB en total. Se descargan al verse (o al pasar, en el listado).
  · **`/proyectos`:** titular «Webs a medida, de principio a fin.»; los cuatro destacados en el ritmo de la referencia; «Todos los proyectos.» con filtros por
    servicio (píldoras) y sector (desplegable), recuento, 6 por página con paginación numerada, y el estado en la dirección (`?servicio=&sector=&p=`).
  · **`/proyectos/<slug>`:** «← Proyectos», el nombre enorme, entradilla y contexto a dos columnas con la ficha (servicios, sector, lugar, con quién,
    herramientas, «Ver la web»), portada a todo el ancho, la frase en Coral, galería intercalada con los apartados, cifras, cita en claro y «Siguiente proyecto».
  · **Común:** `Medio.astro` (vídeo sobre el color de su web; las webs móviles, en un teléfono); `Base.astro` gana `carga` (solo la home tiene la animación
    de carga); el menú lleva «Proyectos» a /proyectos y el resto a `/#…`; «Ver caso de estudio +» de los destacados lleva a su caso (Zernio → /proyectos/amarra).
- **Medido:** `astro check` 0 errores · `spacing-lint` en escala · `astro build` OK (10 páginas nuevas) · `tools/verify.cjs` en /, /proyectos y
  /proyectos/remerge (Chrome y WebKit, 1280 y 390): consola limpia, 0 ≥ 400, desborde 0 · `tools/r62-obras.cjs`: 6 visibles y 2 páginas; filtro «Migración» →
  2; página 2 → 3 y `?p=2`; casos de Multiverse, Remerge y Playground sin desborde · el pie se dibuja también en las páginas nuevas.
- **Pendiente de Andoni:** los textos de los casos (de Nilo, con hechos reales; revisarlos); en la home el destacado sigue llamándose «Zernio» (¿pasa a Amarra
  también ahí?); años de cada proyecto (no constan); más imágenes propias para los casos (procesos, bocetos, sistema) cuando las haya; no publicado ni subido.

### Ronda 63 — 2026-09-28 · proyectos en claro, destacados como «Más proyectos», buscador, casos a fondo, transiciones entre páginas y el hero que se quedaba en blanco (en local)
- **Andoni (textual):** 1 «estas páginas las haría en light mode; los destacados, representarlos como en "Más proyectos"» · 2 «los filtros más elegantes y un
  buscador inteligente donde puedas buscar los que quieras» · 3 «los casos de estudio tienen que tener bastante más información, que veas cada proyecto al detalle;
  en las métricas no pondría las rondas, cosas relevantes sobre el proyecto» · (a media ronda) «quiero tener transiciones animadas entre diferentes páginas» ·
  «al hacer scroll hasta abajo y volver arriba, las imágenes del hero salen en blanco, como si no cargasen» (la home).
- **Hecho:**
  · **En claro:** `/proyectos` y `/proyectos/<slug>` sobre Rosa niebla (`surface-light`); la cita del cliente, en oscuro para marcar el ritmo.
  · **Destacados (`src/components/obra/Pieza.astro`):** la pieza de «Más proyectos», reutilizable: mancha (degradado con los tres colores de SU web y el navegador
    ladeado), claro (navegador recto), escena (la mesa con la web en el monitor) y teléfono; el nombre grande encima y el vídeo al pasar. Mosaico asimétrico en 12
    columnas: Multiverse (mancha) · Amarra (escena de verano) · Playground (mancha) · Neety (claro). `proyectos.ts` gana `colores` por proyecto.
  · **Buscador y filtros:** una línea grande en Family sin caja, cuyo subrayado se llena de savia; ejemplos para probar; filtros tipográficos (Servicio y Sector)
    con recuento en voladita y el activo subrayado con un punto Coral. El buscador, todo en el navegador: sin acentos ni mayúsculas, SINÓNIMOS del oficio
    («multilingüe» → multidioma, «fintech» → banca y facturación, «IA» → agéntico…), prefijos, UNA errata en lo que se escribe (no en los sinónimos: «blanco»
    casaba con «banco») y orden por relevancia (nombre > sector y servicios > el resto del caso). Estado en la dirección (`?q=&servicio=&sector=&p=`).
  · **Casos a fondo:** cuatro agentes leyeron las fuentes (registros de Multiverse y Playground, makingof de Neety y Zernio, los casos completos de
    treseiscero.com). Cada caso: el reto · la web SECCIÓN A SECCIÓN · EL SISTEMA (paleta en muestras y tipografías) · ilustración, movimiento, contenido… · POR
    DENTRO (técnica) y LO QUE SE DESCARTÓ · cifras del PROYECTO (Multiverse: 11 secciones, 13 ilustraciones isométricas, 512 cubos, 0 % de fotogramas lentos; Playground:
    21 herramientas, 13 pegatinas, 3,9 MB; Remerge: +30 páginas, +350 fichas, 4 idiomas, 2 meses…) · la cita. Nuevas citas reales: Juan Moliner (Invopop), Ignasi
    Vegas (Cubbo), Guilherme Escobar (Remerge), traducidas. Ciudades que constan: Madrid, Rochester, Ciudad de México, Berlín, Sevilla, Chicago.
  · **Transiciones (`global.css`):** las nativas entre documentos (`@view-transition`, sin ClientRouter: ningún script de la home cambia). La página que se va se
    hunde y se desenfoca; la que llega se descubre desde abajo como una gota que se ensancha; el vídeo de un proyecto viaja de su tarjeta a la portada de su caso
    (`view-transition-name: obra-<slug>`). Movimiento reducido: sin animación.
  · **El hero en blanco (causa medida):** la home llegaba a 18 contextos WebGL y Chrome y Safari mantienen 16: tiraban los más antiguos, el árbol y las raíces.
    `estela.ts`: cada lienzo suelta su contexto a más de una pantalla (WEBGL_lose_context) y lo recupera al acercarse, rehaciendo programa, textura y estado
    (estación, fondo, origen, luz) sin repetir la aparición. Fallo propio cazado: `setTimeout(dormir, 0)` leía `dormir` antes de declararlo y rompía el lienzo.
- **Medido:** `tools/r63-hero-contextos.cjs` (Chrome y WebKit): bajar hasta el pie y volver → árbol y raíces con contexto y pintados (antes: perdidos); lienzos vivos
  a la vez, de 18 a ~4 · `tools/r63-obras.cjs`: «multilingüe» → Invopop, Cubbo, Remerge, Isotrol · «fintech» → Invopop, Business Online Payroll · «webflw» → los de
  Webflow · «migración coreano» → Cubbo, Remerge · la pieza suena al pasar · `pagereveal` con transición en listado → caso → listado → home · `tools/verify.cjs` en /,
  /proyectos y dos casos (Chrome y WebKit, 1280 y 390): limpio, desborde 0 · estaciones del árbol y óleos sin regresión · `astro check` 0 · `spacing-lint` OK · build OK.
- **Pendiente de Andoni:** revisar los textos (citas traducidas; Neety y Amarra, de los makingof); ¿«Zernio» pasa a Amarra también en la home?; no publicado ni subido.

### Ronda 64 — 2026-09-28 · el titular-buscador, orden libre, casos con la marca intercalada y la transición de savia (en local)
- **Andoni (textual):** 1 «en "Todos los proyectos" dejamos solo el buscador; en el buscador está escrito por defecto "Todos los proyectos": el titular se convierte en
  el propio buscador. Quitamos los filtros, o los ponemos mucho más sutiles bajo un botón de filtros. Y poder cambiar el layout de uno ordenado a uno desordenado.
  Los proyectos, dentro de su gradiente, no con el hero al completo» · 2 «dentro de cada proyecto, quitamos métricas en grande; más estilo agencia creativa:
  ir intercalando detalles de la web + detalles de la marca (colores puestos de forma animada, tipografía, etc.)» · 3 «la animación de cambio de página, más
  notable y más savvia».
- **Hecho:**
  · **Listado:** el h2 ES el buscador (campo en Family a tamaño h2, «Todos los proyectos.» escrito; al enfocar se atenúa y el filete se llena de savia; Esc
    borra). A la derecha, discretos: «Filtros» (despliega las dos líneas; un número Coral dice cuántos hay puestos) y el ORDEN: rejilla o LIBRE (seis sitios en 12
    columnas con anchos, proporciones, alturas y giros distintos; al pasar, la pieza se endereza). Cada proyecto, dentro de SU degradado (la `Pieza` de «Más
    proyectos»: navegador ladeado si su marca es oscura, recto si es clara, teléfono si es móvil). Los cambios de orden, filtros y página se animan (View
    Transitions en la misma página, un nombre por tarjeta; `html.vt-local` evita el rasgado de página entera). Fuera las sugerencias y el botón «Borrar».
  · **Casos:** fuera las cifras en grande (pasan, pequeñas, a la ficha: «En cifras»). La marca se intercala con el texto: COLOR (bandas verticales de su paleta
    que suben una tras otra y se ensanchan al pasar) · un DETALLE de la web junto al reto · TIPOGRAFÍA (su muestra, escrita en SU web con SU fuente y capturada
    como imagen —Söhne, Untitled Sans, GT America, Editorial New o Politetype son de pago: no se sirven desde savvia—, que se imprime de abajo arriba) · otro
    DETALLE junto al primer apartado. Detalles (`tools/r64-detalles.py`): en cada momento grabado se busca la ventana cuadrada con más detalle (energía de bordes,
    sin la barra) y se recorta el vídeo. Marca de los cinco proyectos anteriores MEDIDA en su web en vivo (`tools/r64-marca.cjs` → paleta y tipografías).
  · **Transición (`src/scripts/transicion.ts` + `global.css`):** al pulsar un enlace a otra página, la SAVIA (Coral con grano) nace donde pulsas y se extiende con
    canto de papel rasgado (`rasgo-circulo.png`) hasta cubrir la pantalla, con el logotipo en el centro (0,62 s); la página nueva se abre RASGANDO ese papel desde
    el centro (1 s). Sin soporte: la capa se retira sola (`html.vt-llega`). No se intercepta: otra web, anclas, nueva pestaña, modificadores, movimiento reducido.
- **Fallos propios cazados:** los momentos más cortos de lo previsto (Cubbo m01 dura 1,9 s): ffmpeg no escribía el fotograma y se reutilizaba el anterior (todos los
  recortes en el mismo sitio) → duración real con ffprobe; el segundo detalle de Multiverse caía en una zona oscura vacía → otro momento; restos de la página del
  cliente en dos muestras (menú de BOP, raya de Remerge) → se oculta todo menos la muestra.
- **Medido:** `tools/r64-obras.cjs` (Chrome 1280 y 390, WebKit 1280): placeholder «Todos los proyectos.»; filtros plegados que se abren; orden libre con 6 piezas;
  «fintech» → Invopop y BOP; la savia capturada a 180 / 380 / 600 ms y llegada al caso sin restos; desborde 0 · `tools/verify.cjs` en /, /proyectos y tres casos
  (Chrome y WebKit, 1280 y 390): limpio · el hero sigue volviendo pintado · `astro check` 0 · `spacing-lint` OK · build OK.
- **Pendiente de Andoni:** verlo y decidir la duración de la savia (0,62 s + 1 s); ¿la transición también al entrar en la home (ahora la home tiene además su
  carga)?; no publicado ni subido.

### Ronda 65 · 2026-09-29 · feedback por secciones: hero, 3 dolores, destacados sin ficha, más proyectos con hechos y testimonios, servicios en tres formas, la receta en DESIGN.md, el pie partido y la barra (en local)
- **Andoni (textual, resumido por secciones):** HERO «H1: Elevamos tu web con IA · H2: Especializados en orquestar el diseño y desarrollo agéntico · la gota de la
  animación inicial, en vez de naranja, una gota más realista de agua/savia · sustituimos desde 2020 por la hora y la estación por desde 2020 · en invierno el
  árbol sin hojas y en verano con más tonalidades de verde» · SECCIÓN 2 el copy nuevo (tres dolores) y «unir las ilustraciones animadas 3 y 4» · DESTACADOS
  «el titular: Proyectos destacados con desarrollo agéntico; quitamos toda la info de los proyectos y que la escena solo te incite a sentarte y cambiar de
  estación; los proyectos no tienen su propia estación; al entrar en detalle, información reducida y botón de ver case study» · MÁS PROYECTOS «más proyectos;
  entre medias, métricas y logos de empresas con las que hemos trabajado, estilo Minimum Run; testimonios con el estilo de la captura (te haré yo las
  imágenes); quitamos los detalles florales» · SERVICIOS «Trabajamos de tres formas contigo. En función de lo que necesites: End-to-end, Colaboración,
  Consultoría», sus etiquetas, «quitar lo del hover y que las etiquetas encajen en cada uno» · LA RECETA «un md estilo los design.md de styles.refero.design,
  más resumido; lo superpuesto con más sustancia; y lo de publicado en Neety, un botón a su librería» · PIE «quitamos la iluminación del punto; que entre una
  luz como en el hero en todos los escenarios y que ilumine el Contáctanos; el Contáctanos dividido, la primera parte delante de las montañas y la última
  detrás; al pasar, se transforma en un botón como teníamos antes, que llevará a un cal.com» · GENERAL «el logo solo con letras; en el hero el logo y el menú
  se ven azul claro: tiene que ser el claro de la paleta; iconos de estación que parezcan más cada estación; el logo cambia mal de color entre secciones».
- **Hecho:**
  · **Hero:** copy nuevo (`home.ts`); `--roble-h` vuelve a `100lvh − 26,5rem` (titular de una línea). Esquinas del marco: la HORA de Donostia al minuto
    (`Intl`, Europe/Madrid) y «desde 2020». La GOTA de la carga es de agua/savia: cuerpo translúcido (degradado radial), canto que refracta, luz transmitida
    abajo y brillo especular que no gira con la gota (`data-brillo` contra-rotado); rastro, anillo, cuello, satélite y salpicadura en el mismo tono.
    Árbol: INVIERNO con raleo 1 = sin hojas (la hoja se mide en el color ORIGINAL de la lámina, saturación > 0,13–0,23; queda la madera) y sin el halo de
    copa; VERANO: cada mata vira entre verde amarillento, hondo azulado y oliva (ruido a dos escalas) con luces lima (`estela.ts`, solo si la estación es verde).
  · **Sección 2:** tres dolores con el copy de Andoni («AI slop» y «savvia agentic» en minúscula). La demo 3 une la receta y la landing (`TarjetaPaso` i = 2,
    `.arnes`): `savvia.md` en su marco líquido que se ENCIENDE mientras la IA lo lee, la orden, «Leyendo la receta…» y la landing, un solo reloj de 7 s.
    Fuera de la página las pruebas A y B (queda `Dolores.astro` con `tarjetas`; `DoloresB.astro` guardada).
  · **Destacados (`Proyectos.astro`):** titular «Proyectos destacados con desarrollo agéntico.». De pie: ni ficha, ni dial, ni flechas; «Siéntate a ver los
    proyectos» y, junto al (+), «Cambia la estación». La escena lleva la ESTACIÓN DE LA WEB (y la sigue si se cambia en el hero o la barra, sin recargar la web del
    monitor). SENTADO: ficha de cristal al lado del monitor (sector, nombre, una frase y «Ver caso de estudio», botón Coral; en móvil sin la frase).
  · **Más proyectos (`Anteriores.astro`):** cuatro proyectos más del portfolio (Monad, Routal, THX, Naterra: sector y lugar de sus casos, colores medidos, vídeo
    de su grabación real a 960×600). Tras la primera fila, HECHOS Y LOGOTIPOS (referencia minimum.run, `tools/ref65/`): «Han confiado su web a Eric y Andoni.»,
    01 Más de 40 webs publicadas · 02 Clientes en seis países · 03 Desde 2020 (reales: 41 webs en el portfolio + las agénticas; España, EE. UU., Reino Unido,
    Austria, México, Alemania) y 12 logotipos en baldosas (sacados de la cabecera de cada web, `tools/r65-logos.cjs` → `public/media/logos/`). Tras la tercera,
    TESTIMONIOS a sangre en oscuro (la captura de Andoni): línea arriba, RETRATO (hueco listo: `retrato` en `home.ts`, vacío hasta que lleguen sus imágenes),
    cita, nombre y cargo: Sean Klamm, Ignasi Vegas, Juan Moliner, Guilherme Escobar. Fuera la flora, las voces que rotaban y el reproductor dormido.
  · **Servicios (reescrito):** «Trabajamos de tres formas contigo.» / «En función de lo que necesites.» · 01 End-to-end (15 etiquetas: todas) · 02 Colaboración
    (8) · 03 Consultoría (6). Ampliadas por Nilo: sistema de diseño, desarrollo agéntico, arquitectura de contenidos, SEO técnico, accesibilidad y rendimiento,
    la receta (savvia.md), formación, auditoría. Mismo orden en las tres; al asomar la fila las etiquetas ENCAJAN una a una. Sin hover.
  · **La receta:** el paso 01 es un DESIGN.md resumido (formato refero: título, frase, color con nombre y valor, tipografía con medidas, espacio), todo de la
    librería REAL de Neety leída hoy (Naranja Core, Azul bebé, Berenjena, Ciruela, Base cálida; Bricolage/Switzer; H1 112/64; xtiny…xxhuge; 96·128·224).
    Piezas digitales con sustancia: tabla de tokens (`app/globals.css · @theme`), el arnés de `CLAUDE.md`, los cuatro pasos del agente, el diff de
    `docs/decisiones.md`; la última es el BOTÓN «Ver la librería de Neety →» (clicable).
  · **Pie:** fuera el punto de luz y el FORMULARIO. El haz del hero entra en TODAS las estaciones y, donde cruza la palabra, la ilumina (copia en luz cálida con
    máscara de la banda del haz, calculada con el ratón). «Contáctanos» PARTIDO: «Contác» delante de las montañas (el enlace, entre árboles y hierba) y «tanos»
    detrás (antes de los montes en el DOM: las montañas lo tapan). Al pasar sale ENTERA por delante de todo, en Coral, con el destino encima (hoy el correo;
    `pie.cal` para el cal.com cuando exista). La tenuidad va en el color del texto (no en la opacidad), para que la luz brille más que la palabra.
  · **General:** logotipo SOLO LETRAS (vuelve el de las rondas 10–49; el de la 50, en `tools/retirados/savvia-logo.r64.svg`) y con él el recorrido de la gota
    por las dos v en la carga. La barra deja la mezcla por diferencia (sobre Cacao daba azul pálido): Rosa niebla, Cacao sobre lo claro. El cambio de color
    ya no se retrasa: se mira bajo el LOGOTIPO y contando con la gota de color de la sección que llega (`entradas.ts › __subeEn`), que cubría la barra antes
    que la sección. ICONOS DE ESTACIÓN (`src/scripts/formas-estacion.ts`): hoja de roble lobulada con rabillo, copo con ramas, flor de cerezo con pétalos
    mellados, sol con rayos largos y cortos; en la barra siguen transformándose (160 puntos remuestreados, mismo sentido, desde arriba) y en el (+) van rellenos.
- **Fallos propios cazados:** comentarios HTML dentro de expresiones JSX (otra vez, en Anteriores) → al frontmatter; un comentario `//` pegado delante de `];`
  (el selector del cilindro) → en su línea; el cilindro deformaba la franja oscura a sangre en trapecio → la franja va plana; etiquetas largas desbordando la
  columna en móvil → a todo el ancho; la ficha sentado pisaba el monitor a 1280 → más estrecha y más a la derecha; la copia iluminada heredaba la opacidad 0,22.
- **Medido:** `astro check` 0 errores · `spacing-lint` en escala · `astro build` OK (11 páginas) · `tools/verify.cjs` en /, /proyectos y /proyectos/multiverse (Chrome
  y WebKit, 1280 y 390): consola limpia, 0 ≥ 400, desborde 0 · `tools/r65a.cjs` (Chrome 1280 y 390, WebKit 1280): hero de 720/844, hora, 3 paradas, ficha oculta
  de pie y visible sentado con enlace al caso · `tools/r65-pie.cjs` (Chrome 1280 y 390, WebKit 1280): corte medido, al pasar Coral y recorte abierto, la parte de
  detrás se retira, luz a 1 · `tools/r65-barra.cjs` (Chrome y WebKit): 0 desajustes entre el color del logotipo y el fondo real en 5 fronteras × 20 posiciones
  (fuera de la escena de Proyectos, donde va en claro a propósito) · capturas de cada sección en `tools/shots/r65-*`.
- **Backup:** `../savvia-web.bak-r64-2026-09-29/`.
- **Pendiente de Andoni:** las imágenes de los retratos (grabado a contraluz, fondo transparente); el enlace de cal.com; el invierno sale del mismo cuadro sin
  hojas (quedan tronco, ramas y algún resto oscuro): un roble de invierno pintado por Andoni sería lo definitivo; ¿«Zernio» pasa a Amarra también en la
  home? (el monitor enseña zernio.treseiscero.app); casos de estudio de los cuatro proyectos nuevos (hoy enlazan a su web); no publicado ni subido.

## Rechazado — añadidos de la ronda 65 (NO VOLVER)
- El FORMULARIO de contacto del pie (rondas 32–59) y la LUZ del punto final (58–59): «Contáctanos» es un botón (cal.com).
- Proyectos destacados con ficha, dial y estación propia por proyecto: de pie, la escena solo invita a sentarse y a cambiar de estación.
- Las demos de proceso al pasar por Servicios (rondas 53–54) y los nombres «Web a medida · Cambios con IA · Equipos con IA».
- La flora y las voces que rotaban en «Más proyectos».
- El logotipo de la ronda 50 (el trazo que salía de la «a»): solo letras.
- La mezcla por diferencia en la barra.

### Ronda 66 · 2026-09-29 · carga por estación con la palabra, robles por estación, logotipo tipográfico, Donostia en los pasos, cuadrícula que rota, un testimonio con retrato, etiquetas tachadas, CTA único (en local)
- **Andoni (textual, 14 puntos + tres zip: robles v02, retratos al carboncillo, Donostia en cuatro estaciones):** 1 «la animación inicial también tiene que depender de la
  estación» · 2 «en el hero, los nuevos árboles; solo la hora, sin Donostia» · 3 «el logo: savvia con la tipografía; luego añadiremos otro» · 4 «los paisajes
  nuevos van dentro de los 3 pasos de la sección 2» · 5 «en el tercer paso, el botón de enviar a la IA tiene que parecer más botón de enviar a la IA; y quitamos
  "hecho en Donostia"» · 6 «en proyectos destacados quitamos el navegador; no puedes hacer scroll hasta que no te sientas» · 7 «las métricas de más proyectos
  como la captura; todas van rotando de manera animada» · 8 «los testimonios destacados, uno como teníamos antes, rotando; te paso las imágenes: José Luis,
  Alberto de Transcend y Danny Saltaren; y no hagas cambio de color» · 9 «revisa que todos los proyectos encajan bien en el navegador; sin cortar» · 10 «en
  Trabajamos de tres formas contigo, que los tags sean compartidos y, según vas pasando de uno a otro, se van tachando los que no aplican; más presencia» ·
  11 «en el md de referencia hay cosas que cambian de color como un link; eso lo trasladamos» · 12 «la gota del footer, transparente como la de la carga» ·
  13 «el Contáctanos: "Conta" por delante de las montañas y el resto por detrás; y se tiene que transformar en un CTA con el estilo del formulario de antes» ·
  14 «los CTAs, todos con el estilo del footer y una animación de hover original».
- **Hecho:**
  · **1 · 3 · `Cargador.astro`:** la palabra «savvia» en Family (apenas visible) y la gota que RUEDA por encima de sus letras entintándola a su paso (el camino se
    mide en el navegador: un Range por letra, la altura de x de Family y la línea base de la fuente), cuelga de la última «a» y cae. Por ESTACIÓN: el fondo (la
    noche de la estación), el tono de la gota (savia ámbar · hielo · rocío verde · miel) y lo que cae alrededor (hojas · nieve · pétalos · motas de luz que suben).
    Logotipo tipográfico también en la barra (26/32 px), el titular del pie (se dibuja y de su «a» cae la gota), el ticket y la transición entre páginas.
  · **2 · `Hero.astro` + `Raices.astro`:** los cuatro robles de Andoni recortados como el de la ronda 13 (`tools/r66-robles.py` → `/media/hero/arbol-*` y
    `raices-*`, mismo suelo y eje; alineados). Se elige la lámina de la estación al parsear; el motor ya no tiñe (intensidad 0). Al cambiar de estación el roble
    nuevo se DIBUJA y PINTA encima del viejo (2,4 s, las raíces 0,7 s después) y el viejo suelta su contexto. Halo y grano recortados con la lámina de la estación.
    La esquina, solo la hora.
  · **4 · sección 2:** los paisajes de Donostia (0 La Concha · 1 Peine del Viento · 2 Urumea) de la estación de la web, a 640 × 960 con el borde deshilachado
    (`tools/r66-oleos.cjs`); los anteriores, en `tools/retirados/tarjetas-r65/`. **5:** botón de enviar como el de los chats (círculo claro con flecha hacia
    arriba; al mandar se hunde y es el cuadrado de «parar» mientras genera); «La web de siempre.» en lugar de «Hecho en Donostia.».
  · **6 · destacados:** sin navegador (la web ocupa la pantalla del monitor) y sin la píldora «desliza dentro»; la web solo coge el puntero sentado.
  · **7 · la CUADRÍCULA (la captura):** 3 × 2 celdas de trazo discontinuo con punto en los cruces; cada celda releva su contenido cada 4,8 s, escalonadas: citas
    cortas (Olga Tintoré, Juan Moliner, Sean Klamm, Félix Gonzalo, Ignasi Vegas, Guilherme Escobar), «Colaboramos con Minimum», «Mención de honor · Awwwards» (×2;
    símbolo de Simple Icons, CC0: awwwards.com bloquea la descarga automática), cifras (+40 webs, 6 países, desde 2020) y logotipos de clientes.
  · **8 · el TESTIMONIO:** uno a la vez, cada 9 s, con flechas finas; retrato al carboncillo de Andoni a la izquierda (`/media/testimonios/`), la cita en Family, en
    claro (sin cambio de color): José Luis Antúnez (Routal), Alberto Arenaza (Transcend Network) y Danny Saltaren (Minimum), traducidas y sin el nombre del estudio anterior.
  · **9:** los navegadores de las piezas «mancha» y «claro», ENTEROS dentro de su pieza (80 % de ancho, centrados; la mancha apenas ladeada). Medido: 0 px fuera en las nueve.
  · **10 · Servicios:** una sola nube de etiquetas (las 15), grandes (16 px, filo fuerte), FIJA a la derecha mientras pasan las tres formas; la activa (la de media
    pantalla o la del puntero) tacha con un trazo de savia, una tras otra, las que no le tocan. En móvil, la nube bajo cada forma, ya tachada.
  · **11 · la receta:** los valores (hex, archivos .md, tokens de espacio, medidas) en Cobalto y subrayado de puntos, como los enlaces del DESIGN.md de refero.
  · **12:** `caerRealista({ agua: true })`: la gota del pie translúcida, con canto, luz transmitida y brillo, y salpicadura clara.
  · **13 · el pie:** «Contá» delante de las montañas y «ctanos» detrás. Al pasar (o enfocar; con el dedo, primer toque) la palabra se retira y SUBE desde detrás de
    las montañas el panel de CRISTAL del formulario de antes (velo de la noche, desenfoque, filo y cruces), entre los árboles y la hierba: «Contáctanos · Cuéntanos
    qué necesita tu web.» y el CTA (hoy al correo; `pie.cal` para el cal.com).
  · **14 · el CTA único (`global.css › .btn-primary` + `src/scripts/cta.ts`):** el contrario de su superficie con el icono «↳»; al pasar, una GOTA Coral cae donde entra
    el puntero, llena el botón y abre una onda; al salir se recoge hacia donde sale; con teclado, desde el centro. En el pie, la ficha de los destacados y la receta.
- **Fallos propios cazados:** al sustituir los datos de «Más proyectos» se fue el enlace «Todos los proyectos» (repuesto); otro `//` pegado delante de código en la
  misma línea (la hora); el lienzo nuevo del cambio de estación, creado con `createElement`, no llevaba el atributo de ámbito de Astro y salía a 300 × 150 en una
  esquina → clonado del lienzo actual.
- **Medido:** `astro check` 0 errores · `spacing-lint` en escala · `astro build` OK · `tools/verify.cjs` en /, /proyectos y /proyectos/multiverse (Chrome y WebKit, 1280 y
  390): consola limpia, 0 ≥ 400, desborde 0 · `tools/r66-carga.cjs` (otoño e invierno): la gota rueda y entinta, cae, el hero carga su roble · `tools/r65a.cjs`
  (Chrome y WebKit): 3 paradas, roble de invierno y de verano tras cambiar · `tools/r66-piezas.cjs`: 0 px fuera en las 9 piezas · `tools/r66-pie.cjs` (Chrome 1280 y
  390, WebKit 1280): corte medido, panel arriba, CTA mojado.
- **Backup:** `../savvia-web.bak-r65-2026-09-29/`.
- **Pendiente de Andoni:** el enlace de cal.com; el logotipo definitivo («luego añadiremos otro»); el logotipo de Awwwards oficial si lo tiene (hoy su símbolo +
  el nombre); qué proyectos ganaron las dos menciones (hoy sin nombrar); no publicado ni subido.

## Rechazado — añadidos de la ronda 66 (NO VOLVER)
- El navegador (barra de Safari) sobre la web del monitor en los destacados, y poder recorrerla sin sentarse.
- Etiquetas de servicios separadas por forma: son compartidas y se tachan.
- La franja oscura de testimonios en «Más proyectos» (sin cambio de color) y los cuatro a la vez: uno que rota, con retrato.
- El roble único recoloreado por el motor: cada estación tiene su lámina.

### Ronda 67 · 2026-09-29 · cambio de estación sin salto (y cerezo en primavera), hoja, retratos tramados, cuadrícula de líneas guía, destacados que rotan y cargan, CTA de cristal, el pie y las v de la carga (en local)
- **Andoni (textual):** 1 «los cambios de estación del árbol tienen un salto raro; en primavera me gustaba el tono rosáceo estilo cerezo» · 2 «el icono de otoño, una hoja» ·
  3 «a los retratos, el estilo dithering, que se mimeticen con el fondo; el cambio de testimonios, animado con el estilo de savvia» · 4 «el cuadro que alterna testimonios,
  métricas y logos: que los contornos salgan de las líneas guía de la web, más sutiles, el contenido más pequeño con más aire, y que roten mucho más tranquilos» · 5 «en
  más proyectos, más aire vertical; al final solo 2 proyectos» · 6 «en destacados, antes de sentarte, que rote entre los proyectos de manera orgánica y tranquila; al
  sentarte carga un proyecto; al cambiar, una animación de carga; tiene una línea blanca por arriba; el botón de ver caso de estudio, más sutil» · 7 «en la receta, una vez
  impresa, que no quede tanto espacio con el titular» · 8 «en el footer: el "Conta" por delante de todo, incluso del prado, y el resto entre medias como antes; al pasar se
  convierte en un CTA estilo la captura [cristal esmerilado, "↳", cruces fuera de las esquinas]; y todos los CTAs con ese estilo» · 9 «la luz del footer tiene que salir
  desde arriba del todo» · 10 «los tags de "Trabajamos de tres formas contigo", más animados y con más presencia» · (a media ronda) «Cubbo salía como de un lado y me gustaba:
  aplicarlo a otros proyectos» · «quitamos lo de mención de honor de Awwwards; la línea de Isotrol, Monad y Naterra, como la primera» · «Remerge hay que encajarlo bien
  dentro del móvil» · «en la animación de carga, que se creen las dos v como antes».
- **Hecho:**
  · **1 · Hero y raíces:** el salto era el roble viejo, que se transparentaba bajo el nuevo y desaparecía de golpe al final (y un destello de líneas al empezar). Ahora el
    lienzo nuevo llega ya pintado y se DESCUBRE con el canto de papel rasgado desde la base del tronco (2,6 s, `mask` con `rasgo-circulo.png`) mientras el viejo se apaga
    detrás del frente (raíces: desde el cuello). PRIMAVERA vuelve a teñirse de rosa cerezo (el motor tiñe la hoja solo en primavera, intensidad 0,9).
  · **2:** hoja clásica (punta, lomo y rabillo) en `formas-estacion.ts`, en la barra y en el (+).
  · **3 · Testimonio:** el retrato al carboncillo se pinta como TRAMA de puntos (retícula a 45°, celda de 5 px) en el color del texto, en un lienzo 2D; el relevo es el
    PINTADO RASGADO de savvia (`dibujar`, modo estación, con el filo de savia) desde abajo al centro.
  · **4 · Cuadrícula:** sus líneas son las de los carriles (horizontales a todo el ancho de la ventana, verticales finas, cruces «+» en cada cruce; los bordes de fuera, los
    carriles), al 20 %, y se TRAZAN al llegar. Contenido a 16/13 px con más relleno; releva cada 9 s (escalonado 1,5 s, fundido de 1,2–1,5 s). Fuera las menciones de Awwwards
    (en su sitio, Monad y Routal).
  · **5 · Más proyectos:** `row-gap` 32 → 48 (escritorio) y 16 → 24 (móvil). Naterra sube a la fila de Isotrol y Monad, que ahora repite la composición de la primera (cuadrada
    · 3 : 4 · 4 : 5 bajada); la última fila, Routal y THX. Vuelve el navegador que ASOMA ladeado por un lado y por abajo (ronda 18) en todas las piezas con navegador, alternando
    el lado (`izq`). REMERGE: la pantalla del móvil se midió de nuevo ajustando rectas a sus cuatro bordes (antes eran las esquinas de dentro del redondeo: asomaba el blanco
    de la lámina) y con su redondeo real (12,5 % / 5,8 %).
  · **6 · Destacados:** de pie, las CAPTURAS de los cuatro proyectos rotan cada 7 s con un fundido desenfocado (se para con el puntero sobre el monitor); al sentarse se
    CARGA la web real con una PANTALLA DE CARGA (noche con grano, «savvia», una línea de savia que corre y el dominio; mínimo 0,8 s) y lo mismo al cambiar de proyecto
    sentado; ya no se teclea la dirección. La línea blanca de arriba era el blanco de la pantalla de la lámina: un filo del color del bisel lo tapa. El botón de la ficha, el
    CTA de cristal en pequeño.
  · **7 · Receta:** la imprenta arranca 52 lvh más arriba: impresa, el ticket queda a ~230 px del titular (antes, cerca de 600).
  · **8 · Pie:** «Contá» va DELANTE DE TODO (el enlace, después de la hierba, recortado); «ctanos», entre los árboles y la hierba. Al pasar, la palabra entera se recoge un poco
    y se hace CTA: cristal esmerilado, «↳» y cruces que se cierran. **14 · CTA único (`.btn-primary`):** el de la captura: cristal (sin radio), «↳», cuatro cruces fuera de
    las esquinas; al pasar, las cruces se cierran sobre las esquinas y la gota de savia llena el cristal desde el puntero (`clip-path: circle` en el pseudo).
  · **9:** la capa de luz del pie sube hasta el borde de arriba de la ventana mientras el pie asoma (`--arriba`), sin fundido arriba.
  · **10 · Servicios:** etiquetas de 18 px, LLENAS las que aplican (el color del texto en píldora) y, al cambiar de forma, cada una salta a su estado con un rebote, una tras
    otra; las que no aplican se tachan, encogen y se apagan.
  · **Carga · «las dos v como antes»:** la palabra en Family como SVG (un solo `<text>` en dos capas): «sa» e «ia» aparecen y la gota DIBUJA cada v (baja por el trazo grueso,
    sube por el fino; la plumada con `stroke-dashoffset`), luego rueda por la «i» y la «a» y cae. Todo medido en el navegador (`getExtentOfChar`).
- **Fallos propios cazados:** `mask-image` no admite la máscara completa (posición y tamaño): el revelado no se veía → `mask`; `getExtentOfChar` devuelve un SVGRect sin
  `.right` (NaN en el camino de la gota); otro comentario HTML dentro de una expresión (Pie).
- **Medido:** `astro check` 0 errores · `spacing-lint` en escala · `astro build` OK · `tools/verify.cjs` en /, /proyectos y /proyectos/multiverse (Chrome y WebKit, 1280 y 390):
  consola limpia, 0 ≥ 400, desborde 0 · `tools/r67-salto.cjs`: el cambio de estación fotograma a fotograma · `tools/r67-destacados.cjs` (Chrome y WebKit): rota 1 → 2 de pie,
  web montada sentado, pantalla de carga al cambiar · `tools/r67-pie.cjs` (Chrome 1280 y 390, WebKit): «Contá» delante (z 4), CTA de cristal al pasar · `tools/r67-receta.cjs`:
  hueco 232 px · `tools/r67-mas.cjs`: retratos tramados y relevo · carga: la gota dibuja las dos v (capturas).
- **Backup:** `../savvia-web.bak-r66-2026-09-29/`.
- **Pendiente de Andoni:** el enlace de cal.com; el logotipo definitivo; no publicado ni subido.

### Ronda 68 · 2026-09-29 · la vista sentado en el idioma del CTA, la × que abría el menú, retratos dibujados y citas escritas, etiquetas atadas a su forma, «Contáctanos» con aire y fuera el resplandor del estudio (en local)
- **Andoni (textual, con dos capturas):** 1 «el CTA y el resto no hablan el mismo idioma por los redondeos: que todo hable el idioma del CTA» · 2 «en esa pantalla, al darle a
  la (X) abres el menú» · 3 «los retratos de los testimonios, menos dithering y como estaban, como dibujadas, más mimetizadas; y el cambio se bugea: al cambiar, que se
  dibujen los retratos y se escriba el testimonio» · 4 «los tags, más parecidos a los CTAs; no encajan en cada servicio y parece que pertenecen al siguiente» · 5 «al botón
  de Contáctanos, más padding por todos lados y que la flecha se vea más» · 6 «en Eric y Andoni abajo se ve un rayo de luz, es un bug».
- **Hecho:**
  · **1 · sentado (`Proyectos.astro`) + clase global `.cruces` (`global.css`, las cruces del CTA para cualquier caja):** todo RECTO y con cruces: el aviso de esc y la ×
    (juntos), el selector de proyecto, la ficha, `kbd`, los rótulos del abanico; flechas y × con puntas rectas. Las flechas del testimonio, rectas.
  · **2:** la × estaba EN EL MISMO SITIO que el botón del menú (arriba a la derecha). Ahora vive arriba en el centro, en el mismo cristal que «esc para levantarte».
    Medido: × + cuatro clics más en el mismo punto (0,3 · 0,7 · 1,1 · 1,5 s) → el menú no se abre (Chrome, WebKit, 390).
  · **3 · `Anteriores.astro`:** el CARBONCILLO tal cual (sin trama), en la tinta del texto de la sección (alfa = lo oscuro del trazo: el papel es el fondo) y que se DIBUJA en
    2,4 s: primero lo más oscuro, luego los medios tonos, en rayas diagonales como su sombreado. La cita se ESCRIBE letra a letra (≤ 2,6 s, el hueco reservado para que el
    alto no baile, cursor de savia). El fallo del relevo era una carrera (dos lienzos y un `dibujar` asíncrono que, con clics seguidos, apagaba el que ya estaba delante):
    ahora cada relevo lleva su número y el anterior se abandona.
  · **4 · `Servicios.astro`:** etiquetas rectas de cristal con cruces; las que aplican, con las cruces cerradas y un salto al entrar; las que no, sin cristal, tachadas y
    apagadas. La nube ya no va fija a media pantalla: VIAJA hasta la altura de la forma activa con su rótulo «02 · Colaboración incluye 8/16». «Auditoría de tu web» entra en
    la lista común (Consultoría la tenía y no se veía).
  · **5 · `Pie.astro`:** más cristal alrededor de la palabra (y cruces más abiertas), la palabra un poco más recogida (0,66) y «↳» más grande y a plena tinta (la regla que
    apagaba la palabra también apagaba la flecha).
  · **6 · `Estudio.astro`:** era el RESPLANDOR del suelo (rondas 27–29): una elipse más alta que el lienzo, cortada en seco por arriba. Fuera; la estela son las briznas.
- **Medido:** `astro check` 0 errores y 0 avisos · `spacing-lint` en escala · `astro build` OK · `tools/verify.cjs` en /, /proyectos y /proyectos/multiverse (Chrome y WebKit,
  1280 y 390): limpio, 0 ≥ 400, desborde 0 · `tools/r68.cjs` (Chrome 1280 y 390, WebKit 1280): menú cerrado tras la ×, retrato dibujándose y cita a medio escribir, nube a la
  altura de su forma (dy 48 px en las dos primeras; la última asoma bajo su fila), CTA con la flecha a plena tinta.
- **Backup:** `../savvia-web.bak-r67-2026-09-29/`.
- **Pendiente de Andoni:** el enlace de cal.com; el logotipo definitivo; el (+) de estaciones sigue siendo redondo (gotas líquidas): ¿también recto?; no publicado ni subido.
- **A media ronda (Andoni, `~/Desktop/Logo_savvia_def.svg` + `isotiposavvia_def.svg`):** «te adjunto el logo e isotipo».
- **Hecho:** `public/savvia-logo.svg` = el logotipo DEFINITIVO (isotipo, la v caligráfica, + «savvia»; 1275×439) y `public/savvia-isotipo.svg`. El logotipo, como máscara en el
  color del texto, en la barra (34 px de alto en móvil, 42 en escritorio: las letras a la altura de la palabra de antes), la cabecera del ticket y la transición entre
  páginas. FAVICON y `apple-touch-icon.png`: el isotipo en Rosa niebla sobre Cacao (`?v=68`). Imagen para compartir rehecha (`tools/r68-og.cjs`, sin la hora; `?v=68`). Lo
  anterior, en `tools/retirados/*.r67.*`. Sin tocar: la animación de carga (la gota sigue dibujando las dos v sobre la palabra) y «La savvia de tu web.» del pie (la palabra
  dentro de la frase).
- **Medido:** `tools/r68-logo.cjs` (Chrome 1280 y 390, WebKit 1280): logotipo 122×42 / 99×34, Rosa niebla sobre oscuro y Cacao sobre claro, ticket y transición con el
  logotipo nuevo, sin errores · `astro check` 0 · build OK · `tools/verify.cjs` limpio.

### Ronda 69 · 2026-09-29 · la carga dibuja el isotipo y lo encaja en la barra, destacados que cargan sin teclear, CTA de la ficha sin cruces, transición líquida entre páginas y miniaturas enteras (en local)
- **Andoni (textual):** 1 «que la animación de carga dibuje el isotipo únicamente, cae la gota y el isotipo se encaja arriba con savvia» · (a media ronda) «en la animación de
  carga solo quiero que se vea "dibuja un círculo" como estado inicial, y de ahí ya se dibuja el isotipo» · 2 «cuando llegas a proyectos destacados, una animación de carga,
  pero no se escribe la url» · 3 «en la vista en detalle de destacados quitamos del CTA los + de alrededor» · 4 «la animación de transición entre páginas, algo más orgánico» ·
  5 «revisamos las miniaturas de todos los proyectos en la página de proyectos: que estén bien encajadas y la web no se vea cortada».
- **Interpretación:** «arriba a la derecha con savvia» = el sitio del isotipo en el logotipo de la barra (delante de «savvia», arriba a la izquierda).
- **Hecho:**
  · **1 · `Cargador.astro`:** estado inicial = solo «dibuja un círculo» (y «saltar») en el centro. Al cerrar el círculo, la gota DIBUJA el isotipo por su eje (medido sobre el
    dibujo, 23 puntos; con la plumada de 50 cubre el 99,8 % de la forma: `tools/r68-iso` en el scratch): sube por la colita, baja por el trazo grueso, sube por el fino,
    remata en la bola, se descuelga de ella y cae al roble. Mientras cae, el isotipo VUELA a la barra (translate + scale al rectángulo del isotipo del logotipo) y ahí se
    encaja delante de «savvia», que aparece con la barra. Fuera la palabra «sa ia» de la carga.
  · **2 · `Proyectos.astro`:** el estreno ya no teclea la dirección en un buscador: el titular de la pantalla se funde en la PANTALLA DE CARGA (noche con grano, el logotipo
    nuevo y la línea de savia) y la web se descubre cargada (mínimo 1,4 s). La pantalla de carga de sentado también lleva el logotipo.
  · **3:** el «Ver caso de estudio» de la ficha, sin cruces (la ficha ya las lleva).
  · **4 · `transicion.ts` (reescrito) + `global.css` + `Base.astro`:** la savia es un LÍQUIDO (`clip-path: path()` por fotograma): al pulsar, una mancha con el canto
    ondulante (cuatro ondas que se mueven a su ritmo) crece desde el dedo con gotitas por delante que se traga; en la página nueva, que nace cubierta (html.vt-llega con el
    logotipo, desde el <head>; salvavidas 3 s), la mancha se ESCURRE hacia abajo con las últimas gotas. Fuera las transiciones nativas entre documentos (siguen dentro de
    /proyectos: orden, filtros y páginas).
  · **5 · `obra/Pieza.astro`:** el navegador ENTERO dentro de la pieza (lo más ancho que quepa bajo el nombre, centrado, la mancha apenas ladeada) y la web a su proporción real
    (16:9, la de las grabaciones: antes 16:10 recortaba los lados, y el claro, 1:1, la cortaba por abajo); el teléfono se dimensiona por el alto (se salía por abajo en las
    piezas bajas).
- **Medido:** `astro check` 0 errores y 0 avisos · `spacing-lint` en escala · build OK · `tools/verify.cjs` en /, /proyectos y /proyectos/remerge (Chrome y WebKit, 1280 y 390): limpio,
  desborde 0 · `tools/r68-carga.cjs` (Chrome otoño e invierno, WebKit): inicio solo con la pista → isotipo dibujándose → gota → isotipo en la barra junto a «savvia» ·
  `tools/r68-estreno.cjs` (Chrome y WebKit): pantalla de carga a 1 sin dirección y web descubierta · `tools/r68-transicion.cjs` (Chrome 1280 y 390, WebKit): llega al caso, sin
  capas colgadas · `tools/r68-obras.cjs` (Chrome 1280 y 390, WebKit): 0 px fuera en rejilla y en orden libre.
- **Pendiente de Andoni:** el enlace de cal.com; el (+) de estaciones sigue redondo; no publicado ni subido.

### Ronda 70 · 2026-09-29 · transición en marrón, la carga solo la primera vez, retratos más fundidos, Servicios sin números y con aire, FAQ rectas (en local)
- **Andoni (textual):** «la animación entre pantallas, que no vaya al naranja, que vaya al marrón» · «la animación de carga inicial, que solo se ejecute la primera vez» · «los
  retratos, más mimetizados con el fondo aún» · «en Trabajamos de tres formas contigo, quitar la numeración y dejar más aire entre servicios para que los tags entren mejor»
  · «actualizar el chat de FAQs para que mantenga la estética sin redondeos de los CTA».
- **Hecho:** la savia de la transición (salida, llegada y la capa del <head>) en Cacao con grano y el logotipo en Rosa niebla · la carga se recuerda en este navegador
  (`localStorage` «savvia:carga», al terminarla o saltarla); `?carga=1` la fuerza para revisarla · retratos: tinta al 62 % (antes 86 %), en `multiply` sobre el grano, y el
  dibujo se deshace hacia los bordes · Servicios: fuera los números (también en el rótulo de la nube) y cada forma con 96 px arriba y abajo en escritorio (48 en móvil) ·
  FAQ: caras, burbujas, sugerencias, campo y botón rectos; el campo y el botón, un solo bloque con las cruces del CTA y la flecha «↳».
- **Medido:** `astro check` 0 · `spacing-lint` en escala · build OK · `tools/verify.cjs` en / y /proyectos (Chrome y WebKit, 1280 y 390): limpio, desborde 0 · `tools/r69.cjs`
  (Chrome y WebKit): carga la primera vez, no al recargar, sí con `?carga=1`; FAQ y transición capturadas.
- **Pendiente de Andoni:** el enlace de cal.com; el (+) de estaciones sigue redondo; no publicado ni subido.

### Ronda 71 · 2026-09-29 · caras redondas en el chat y la transición, más elegante (en local)
- **Andoni (textual):** «en el chat, nuestras caras que vayan con redondeo» · «la animación de transición entre páginas, que se vea más elegante; ahora se ve algo infantil».
- **Hecho:** FAQ: las caras (cabecera y conversación) vuelven a ser redondas; lo demás sigue recto · `transicion.ts`: fuera la mancha ondulante y las gotitas. La savia es una
  CORTINA de Cacao con grano que SUBE con el borde en campana suave (la curva de la transición entre secciones), más alta donde pulsas, y el logotipo entra enfocándose
  (0,82 s); en la página nueva la cortina sigue subiendo y se va por arriba, la campana por el centro (1 s).
- **Medido:** `astro check` 0 · build OK · `tools/verify.cjs` en / y /proyectos (Chrome y WebKit, 1280 y 390): limpio · `tools/r68-transicion.cjs` (Chrome 1280 y 390, WebKit): llega
  al caso sin capas colgadas; fotogramas revisados.
- **Pendiente de Andoni:** el enlace de cal.com; el (+) de estaciones sigue redondo; no publicado ni subido.

### Ronda 72 · 2026-09-29 · retratos: menos fundidos y con el semitono de la casa, suave (en local)
- **Andoni (textual):** «los retratos algo menos mimetizados con el fondo y con el efecto dithering del resto de la web, pero no tan exagerado».
- **Hecho (`Anteriores.astro`):** tinta al 80 % (antes 62 %), el difuminado del borde empieza más lejos y es más corto, y encima de la tinta continua un SEMITONO de puntos a
  45° (celda de 3,5 px, como los cantos del roble) mezclado al 28–82 % según el tono (más en los medios tonos y hacia los bordes). Se sigue dibujando igual al cambiar.
- **Medido:** `astro check` 0 · build OK · `tools/verify.cjs` en / limpio · `tools/r68.cjs` (Chrome y WebKit) sin errores; retrato capturado (`tools/shots/r72-retrato.png`).
- **Pendiente de Andoni:** el enlace de cal.com; el (+) de estaciones sigue redondo; no publicado ni subido.

### Ronda 73 · 2026-09-29 · la transición sin logotipo y Servicios en tabla (en local)
- **Andoni (textual):** «en las transiciones entre páginas no pongas el logo de savvia todo el rato» · «la sección de tres maneras de trabajar contigo tenemos que mejorarla,
  no me gusta; démosle una vuelta».
- **Diagnóstico de Servicios:** desde la ronda 66 lo que no funcionaba era la NUBE de etiquetas compartida: viajaba de una forma a otra y nunca quedaba claro de cuál era
  (tres rondas parcheándolo). La información es una comparación (tres formas × dieciséis cosas): su forma natural es una tabla, no una nube.
- **Hecho:** `transicion.ts` + `global.css`: la cortina de Cacao va sin logotipo (al salir y al llegar). `Servicios.astro` (reescrito): TABLA. Cabecera con las tres formas
  (nombre en Family, qué es y «16 de 16 / 8 de 16 / 6 de 16»); filas con las dieciséis cosas en cuatro grupos (Estrategia · Diseño y movimiento · Desarrollo · Después);
  donde una forma lo incluye, una gota de savia (caen fila a fila al llegar); donde no, un filete. Una BANDA de cristal con las cruces del CTA marca la columna que
  miras (sigue al puntero; por defecto End-to-end) y las otras bajan a media tinta. En móvil, tres fichas rectas con cruces, cada una con su lista. Fuera la nube, el
  tachado y la tinta que se llenaba.
- **Medido:** `astro check` 0 · `spacing-lint` en escala · build OK · `tools/verify.cjs` en / y /proyectos (Chrome y WebKit, 1280 y 390): limpio, desborde 0 · `tools/r73-serv.cjs`
  (Chrome 1280 y 390, WebKit 1280): columna 3 al pasar por Consultoría, sin errores · `tools/r68-transicion.cjs`: cortina lisa, sin logotipo.
- **Pendiente de Andoni:** los grupos de la tabla y sus nombres son de Nilo; el enlace de cal.com; el (+) de estaciones sigue redondo; no publicado ni subido.

### Ronda 74 · 2026-09-29 · transición en tres capas de ola, cabecera de Servicios que acompaña el scroll y fuera la flora (en local)
- **Andoni (textual):** «trabajemos mejor la transición entre páginas, sigue sin convencerme; elegante pero vistoso» · «me gusta cómo has planteado los servicios, pero que los
  titulares sigan el scroll para que puedas seguir leyendo lo que incluye cada uno» · (a media ronda) «quitamos los detalles florales que hay en diferentes secciones, los
  dejamos limpios».
- **Hecho:**
  · **Transición (`transicion.ts`, `global.css › .vt-capa`):** probadas en la ronda y descartadas: vetas por las columnas de la retícula (con cúpulas parecían dedos; planas, un
    gráfico de barras). Queda: TRES CAPAS de savia (Coral, Nogal y Cacao con grano) que suben una tras otra (95 ms de desfase, 0,72 s cada una), con el borde en ola suave
    que se desplaza y un bulto más alto donde pulsas; al llegar salen en orden inverso (el Cacao descubre el Nogal, luego el Coral, luego la página), la ola más alta en el
    centro. Sin logotipo.
  · **Servicios:** la cabecera de la tabla (las tres formas) se queda PEGADA bajo la barra mientras pasan las filas y, pegada, se recoge a nombre y cuenta; su fondo tapa el
    hueco bajo la barra; la columna activa conserva su tinte.
  · **Flora:** fuera las ramas de LaReceta (la maleza de la impresora), Estudio y Preguntas. Se queda el tiempo de cada estación del pie (es el paisaje).
- **Medido:** `astro check` 0 · `spacing-lint` en escala · build OK · `tools/verify.cjs` en / y /proyectos (Chrome y WebKit, 1280 y 390): limpio · `tools/r73-serv.cjs` (Chrome 1280 y 390,
  WebKit): cabecera pegada y recogida, sin errores · `tools/r68-transicion.cjs` (Chrome 1280 y 390, WebKit): sin capas colgadas; fotogramas en `tools/shots/r74-vt-hoja.jpg`.
- **Pendiente de Andoni:** el enlace de cal.com; el (+) de estaciones sigue redondo; no publicado ni subido.

### Ronda 75 · 2026-09-29 · la transición entre páginas, como la de secciones · PUBLICADA
- **Andoni (textual):** «la transición entre pantallas es demasiado larga y no me gusta; dejamos algo como tenemos de transición entre secciones y listo. Y con eso ya publicas» ·
  «haces commit a GitHub y publicas».
- **Hecho (`transicion.ts`, `global.css`):** la GOTA de `data-sube`: una capa de Cacao con grano asoma por el centro de abajo con el perfil de campana, se ensancha y cubre
  (0,5 s); en la página nueva, la página asoma igual y el Cacao se retira (0,55 s). Fuera las tres capas de ola.
- **Medido:** `astro check` 0 · build OK · `tools/verify.cjs` en /, /proyectos y /proyectos/multiverse (Chrome y WebKit, 1280 y 390): limpio · `tools/r68-transicion.cjs` (Chrome y WebKit).
- **PUBLICADA (29/09) en https://savvia.studio:** commit `bcdb29b` → Vercel. Fuera del repositorio (`.gitignore`) el material en bruto de `tools/` (láminas originales, tomas del reel, música): 250 → 45 MB. Medido EN VIVO: `tools/verify.cjs` en /, /proyectos y /proyectos/multiverse (Chrome y WebKit, 1280 y 390) limpio, 0 ≥ 400, desborde 0; logotipo, favicon, imagen para compartir y reel responden 200; la transición llega al caso sin capas colgadas. Sigue `noindex`.
- **Pendiente de Andoni:** el enlace de cal.com; el (+) de estaciones sigue redondo.

### Ronda 76 · 2026-09-30 · el feedback de Eric (vídeo del 29/09): redondeos de vuelta, Donostia más discreto, cuadrícula con Farco y Awwwards, fondos de marca, reel, sin cilindro y rendimiento (en local)
- **Eric (vídeo de 11 min, transcrito y ubicado fotograma a fotograma; resumen confirmado por Andoni):** invierno sin hojas y nevado; primavera con rosas más
  hondos y variados; «orquestar queda muy bien en grande»; Donostia distrae; la respuesta más grande que el problema y fuera el «01»; fuera las ondas del
  titular de los destacados; sonido apagado de inicio; prefiere los botones redondeados; la web va a trompicones (mañana la ve José Luis); la pieza de logotipos
  parece que hacemos logos (mejor el reel); «Todos los proyectos» no encaja; el giro en el eje (cilindro) no convence y en la cuadrícula las cruces no casan;
  logotipos más grandes y proporcionales; citas de 2–3 líneas; «Han confiado su web» suena raro; falta Farco; son más de 80; Awwwards; Monad con otro tono;
  Naterra, Isotrol y Remerge con algo de su marca; THX en su azul; un cuarto testimonio (Juanjo Velaz); quitar «8 de 16» y afinar el cambio de columna;
  la impresora más abajo; el 3D del estudio, a mejorar; el CTA del pie parpadea; en el pie, invierno todo nevado y primavera con margaritas y flores azules.
- **Andoni (textual):** «Vamos a recuperar los redondeos que teníamos y ajustamos todo a eso» · «Dejamos las de Donostia pero que tengan menos presencia» ·
  «Ponemos Awwwards pero con su logo, lo puedes sacar de su web» · «Tenemos 80; te pasé datos del CMS y no están todos subidos ahí».
- **Hecho:**
  · **Redondeos:** el CTA (`.btn-primary`) vuelve a ser PÍLDORA de cristal con la gota y sin cruces; `.cruces` ya solo redondea. Vuelven los radios de antes de la
    ronda 68: chat de las FAQ (burbujas 18/4, sugerencias y campo en píldora, botón redondo), vista sentado (barras en píldora, botones redondos, ficha y
    cristal a 16, rótulos a 8, `kbd` a 6), flechas del testimonio redondas, banda y fichas de Servicios a 16, CTA del pie en píldora. Trazos con punta redonda.
  · **Hero:** «Orquestamos tu web con IA.» (antes «Elevamos…»). INVIERNO: el motor ralea todas las hojas y pone NIEVE en los cantos de la madera que miran al
    cielo (`estela.ts`, `nieve`). PRIMAVERA: cada mata vira entre frambuesa hondo, cerezo y blanco rosado (ruido a dos escalas, como los verdes del verano).
  · **Dolores:** el dolor en `text-h3` y la respuesta en `text-h1`; fuera el «01». Óleos de Donostia al 30 % (antes 52) y fundidos hacia los bordes.
  · **Destacados:** fuera el titular que se generaba en el agua con ondas (queda el titular y la entrada al monitor). SONIDO apagado de inicio para todos
    (clave nueva `savvia:son`: quien lo encendió antes también empieza apagado; la impresora de la receta, igual).
  · **Más proyectos:** la pieza de entrada es el REEL en bucle y mudo (`reel-bucle.mp4`, 22 s, 750 KB); al pulsarla se abre el reel grande (el mismo reproductor
    de la barra, pintado desde la pieza). «Todos los proyectos» es el CTA de la casa. Fuera el CILINDRO (en `tools/retirados/cilindro.r75.txt`). CUADRÍCULA: citas
    largas (extractos fieles), «Hemos hecho la web de», «Colaboramos con» Minimum y **Farco Studio** (logotipo de su web), «Mención de honor» con el logotipo
    oficial de **Awwwards** (sacado de awwwards.com), **+80** webs, logotipos al mismo peso óptico (área constante, proporción leída con sharp). FONDOS de marca:
    Isotrol, su atardecer con aerogeneradores redibujado en silueta (`fondos/isotrol.svg`); Naterra, la madera de su propia web; Remerge, su amarillo con la web
    en un teléfono; Monad en su verde; THX en azul claro.
  · **Servicios:** fuera «N de 16»; la columna cambia por intención (90 ms sobre ella), no al rozarla en diagonal.
  · **Receta:** la impresora a 86 lvh (antes 72).
  · **Pie:** el CTA ya no parpadea (la zona de cierre es la caja de la palabra entera, medida al abrir; antes el recogerse sacaba el borde de debajo del
    puntero). INVIERNO: el paisaje se pinta en blanco de nieve entero (`ESTACIONES_PIE`). PRIMAVERA: margaritas (pétalos y botón amarillo), flores azules y
    alguna rosa, dibujadas con pétalos de cerca.
  · **Rendimiento (web-perf-forensics):** tres causas medidas. (1) Cada lienzo WebGL dormido se REHACÍA (programa + textura) al volver a su sección: con 8
    contextos en la home (antes 18) ya no hace falta dormir en Chrome (`LIMITE` 12); en Safari se sigue durmiendo (no libera enseguida los retirados). (2) El
    retrato del testimonio se calculaba y repintaba píxel a píxel a densidad retina (~520.000 px por fotograma, 2,4 s cada 9 s): a 1,25 y a 30 fps, con la
    imagen reutilizada. (3) El paisaje del pie, los óleos y las raíces se pintan a DPR 1,5 (el árbol del hero sigue a 2). Además, los óleos de los dolores
    solo cambian de lienzo al acercarse (antes, cada cambio de estación desde el hero creaba tres contextos). Si el navegador tira un contexto, se recupera.
- **Medido:** `astro check` 0 errores · `astro build` OK · `spacing-lint` en escala · `tools/verify.cjs` en /, /proyectos y /proyectos/multiverse (Chrome y WebKit,
  1280 y 390): consola limpia, 0 ≥ 400, desborde 0 · `tools/r76.cjs` (Chrome 1280 y 390, WebKit 1280): CTA abierto en los 10 movimientos sobre la palabra
  (antes se abría y cerraba) y cerrado al salir; las capturas de cada punto en `tools/shots/r76-*` · `tools/r76-vuelta.cjs` (Chrome real, DPR 2, CPU ×4, bajar
  y volver a subir la home), dos pasadas: publicada → local: bajando, bloqueo 2037/790 ms → 523/667 ms y tarea máxima 645/417 → 226/228 ms; SUBIENDO, 4
  tareas largas (84–115 ms) y 8 contextos rehechos → 0 y 0 · WebKit: tras seis cambios de estación y un viaje entero, el árbol del hero sigue pintado (el aviso
  «too many active WebGL contexts» ya salía en la publicada con la misma prueba). **SIN medir:** fluidez en la GPU real del Mac de Eric (el entorno sin ventana
  se estrangula a 30 fps a DPR 2 incluso con una página vacía: no sirve para eso).
- **Backup:** `../savvia-web.bak-r75-2026-09-30/`.
- **Pendiente de Andoni:** el testimonio de **Juanjo Velaz** (no hay cita suya en ningún material: hace falta el texto y su retrato); qué proyectos ganaron la
  mención de Awwwards (hoy sin nombrar); «el 3D del estudio, mejorarlo» (hacen falta modelos o fotos nuevas de los dos); el copy de «Hemos hecho la web de»
  (alternativa: «Su web es nuestra»); el enlace de cal.com.

### Ronda 77 · 2026-09-30 · eyebrows, destacados directos, «Ver caso de estudio» en texto, heroes que rotan, «Contáctanos» estable · PUBLICADA (con la 76, commit 5732beb; verificada en vivo: Chrome y WebKit, 1280 y 390, limpia, desborde 0; sigue noindex)
- **Andoni (textual):** «Los problemas se tienen que ver más como un eyebrow» · «Cuando llegas a proyectos destacados quitamos la animación de carga, que salgan
  directamente los proyectos» · «En vista en detalle, el botón de ver case study, sin card: que sea solo texto» · «Más proyectos: fuera el botón de ver todos
  los proyectos; donde estaban los logos pusimos el reel pero prefiero heros que van rotando con el estilo del resto, rotando entre varios» · «El botón de
  contáctanos: que se pueda hacer hover fácil y no parezca que se rompe» · (a media ronda) «Remerge, ponlo con el mockup que teníamos antes, me gustaba más» ·
  «el H1, déjalo en Elevamos tu web con IA como estaba» · «Y una vez hayas hecho esto, publica».
- **Hecho:**
  · **Dolores:** el dolor es un EYEBROW (mono pequeño con un punto de savia) encima de la respuesta, que es el titular. Petición expresa: «eyebrows encima de
    titulares» estaba en lo rechazado; aquí sí.
  · **Destacados:** sin pantalla de carga al llegar: el titular se funde y debajo ya está la web (su captura). La carga queda solo al sentarse. En la ficha,
    «Ver caso de estudio» es texto con subrayado que crece y flecha (sin botón).
  · **Más proyectos:** fuera «Todos los proyectos» de la cabecera. La pieza de entrada es una pieza de marca más (degradado + navegador que asoma) que ROTA entre
    los heroes de los cuatro destacados (Multiverse, Amarra, Playground, Neety) cada 4,2 s con el relevo de desenfoque y el degradado virando a los colores de
    cada web; lleva a /proyectos. Remerge vuelve al móvil sobre la mesa (el teléfono de la ronda 76, fuera).
  · **Hero:** vuelve «Elevamos tu web con IA.».
  · **«Contáctanos»:** ya no se recoge ni se recoloca al pasar. El enlace ocupa la palabra entera (se recorta su texto, no su caja): la zona de hover es grande
    y no cambia. Al pasar, las dos mitades se encienden (la de detrás, tras las montañas) y encima sube una píldora de cristal «↳ Escríbenos» (con cal.com,
    «Agenda una llamada»).
- **Medido:** `astro check` 0 errores · `spacing-lint` en escala · `astro build` OK · `tools/verify.cjs` en /, /proyectos y /proyectos/multiverse (Chrome y WebKit,
  1280 y 390): consola limpia, 0 ≥ 400, desborde 0 · `tools/r76.cjs` (Chrome y WebKit): CTA abierto en los 10 movimientos y cerrado al salir · destacados:
  `estrenando` nunca se pone a lo largo de la entrada; la web del monitor visible al llegar (`tools/shots/r77-destacados.jpg`).
- **Pendiente de Andoni:** Juanjo Velaz (cita y retrato); menciones de Awwwards; 3D del estudio; cal.com.

### Ronda 78 · 2026-09-30 · eyebrows sin punto, heroes legibles con relevo, «Escríbenos» que brota de la tilde (en local)
- **Andoni (textual):** «a los eyebrows les quitamos el punto» · «en más proyectos, los que van rotando: que todos los títulos se lean sobre el fondo y que al
  cambiar entre proyectos tenga alguna animación» · «el Escríbenos del Contáctanos me gusta, pero si podemos hacer que salga de manera que parece que sale del
  propio Contáctanos, sería top».
- **Hecho:** · Dolores: fuera el punto del eyebrow. · Heroes: si el primer color de su web es claro (luminancia > 0,5: Amarra y Neety), el nombre va en Cacao
  y sin sombra (clase `tinta-oscura`, la pone el relevo). RELEVO: el navegador que se va baja y se desenfoca; el nuevo SUBE desde abajo (22 %) y enfoca; el
  nombre sale palabra a palabra por arriba y el nuevo sube desde su máscara. · «Contáctanos»: la píldora BROTA de la TILDE de la «á»: una gota de savia
  en el acento, un hilo que sube (0–0,4 s) y en su punta la píldora se abre como una gota que se ensancha (círculo → píldora, 0,3–0,9 s); al irse, al revés.
  El centro y la altura de la tilde los mide el JS con un Range sobre la «á».
- **Medido:** `astro check` 0 · build OK · `spacing-lint` en escala · `tools/verify.cjs` en / (Chrome y WebKit, 1280 y 390) limpio, desborde 0 · `tools/r78.cjs`
  (Chrome 1280 y 390, WebKit 1280): los cuatro nombres capturados legibles (claros: Multiverse no, Amarra sí, Playground no, Neety sí); la gota apoyada
  en la tilde · secuencia medida por fotograma: hilo scaleY 0 → 0,53 (128 ms) → 1 (≈500 ms); píldora circle 0 → 22 % (394 ms) → 75 % (≈1 s).
- **PUBLICADA (30/09)** a petición de Andoni («sí, publícalo»).

### Ronda 79 · 2026-09-30 · «Contáctanos» se ilumina en degradado (en local)
- **Andoni (textual):** «el contáctanos se me hace raro que se ilumine más una parte que la otra; que se ilumine como si fuera un gradiente».
- **Hecho (`Pie.astro`, `global.css › @property --brillo`):** las dos mitades llevan el MISMO degradado radial (texto con `background-clip: text`) en la misma
  caja: la luz nace en la tilde de la «á» (de donde brota el «Escríbenos») y se apaga hacia los extremos (78 % → 50 % → 16 % sobre la tinta tenue); --brillo
  0 → 1 en 0,9 s la enciende. En reposo, la tinta de siempre (22 %), igual en toda la palabra.
- **Medido:** build OK · `tools/verify.cjs` en / (Chrome y WebKit, 1280 y 390) limpio · capturas al pasar en Chrome y WebKit: degradado continuo entre «Contá» y
  «ctanos».
- **PUBLICADA (30/09)** a petición de Andoni («sí, publícalo»).

### Ronda 80 · 2026-09-30 · el ticket sin «0 €», la librería como mensaje a la IA y la PUERTA del «Contáctanos» (en local)
- **Andoni (textual):** «en la receta, quitamos lo de 0 €» · «el botón a la librería, que parezca el típico de mandar un mensaje a la IA» · «el Contáctanos al hacer
  hover: la iluminación entre Contá y el resto queda rara, más progresiva y natural» · «el Escríbenos, que salga como una extensión del Contáctanos, como si
  fuera una puerta o algo así, relacionado con savvia».
- **Hecho:** · Ticket: fuera «Lavado de cara ..... 0 €» (y su tachado). · Librería: un cuadro de chat («✦ Enséñame la librería de Neety») con el botón redondo de
  enviar (flecha hacia arriba; al pasar, Coral y sube). · «Contáctanos»: la luz sale de ARRIBA, de la puerta, en un degradado ancho de cinco pasos (1,2 s)
  igual en las dos mitades. LA PUERTA: la tilde de la «á» es la bisagra; al pasar se traza una línea de savia sobre ella, la puerta GIRA hacia arriba sobre
  su borde de abajo (rotateX −96° → 0, 0,2–0,8 s) y se LLENA DE SAVIA desde la bisagra (0,5–1,2 s); el texto pasa a Cacao. Al irse: se vacía, se cierra y la
  línea se recoge. (Trampa: el minificador fundía `translate` con `transform` y perdía el desplazamiento: todo dentro de `transform`.)
- **Medido:** `astro check` 0 · `spacing-lint` en escala · build OK · `tools/verify.cjs` en / (Chrome y WebKit, 1280 y 390) limpio · `tools/r80.cjs` (Chrome y WebKit):
  sin «€» en la receta; apertura medida por fotograma (giro 342 ms → 0,76, 675 ms → 1; llenado 675 ms → 69 %, 1 s → 99 %); la puerta apoyada sobre la tilde.
- **PUBLICADA (30/09)** a petición de Andoni («sí, publícalo»).

### Ronda 81 · 2026-09-30 · heroes en tira, «Contáctanos» en degradado y que aparece, Eric y Andoni tras la puerta, raíces por estación (en local)
- **Andoni (textual):** 1 «En más proyectos no me gusta cómo rotan; una animación más fluida» · 2 «el Contá se sigue iluminando más que el actanos: que sea un
  gradiente de izquierda a derecha, a la izquierda más iluminado y a la derecha menos; y cuando aparece el footer el Contáctanos aparece de golpe, tiene que
  salir más orgánico» · 3 «en vez de Escríbenos, que es lo mismo que Contáctanos, que salgamos Eric y yo diciendo haz clic para agendar una reunión con
  nosotros» · 4 «las raíces del hero ahora no se ajustan con la estación».
- **Hecho:** · 1 · los heroes van en TIRA: el que está sale por la izquierda y el siguiente entra por la derecha a la vez (1,4 s, curva lenta de entrada y
  salida), sin desenfoque; el nombre sale por arriba y el nuevo sube; el degradado vira con la misma curva; cada 4,6 s. · 2 · la luz del hover es un
  degradado LINEAL de izquierda (plena) a derecha (poco más que la tinta de reposo) sobre la palabra entera; la mitad de detrás lleva un 18 % más (las
  montañas la apagan) para que no haya escalón en «á|c». APARICIÓN: las letras se descubren de izquierda a derecha con canto blando (máscara, --rev) y salen
  del desenfoque en 2,2–2,6 s; la mitad de detrás, 0,3 s después; la copia iluminada por el haz entra al final (antes la máscara de aparición sustituía a la
  del haz y la copia cubría la palabra entera). · 3 · tras la puerta, las CARAS de Eric y Andoni (se asoman al abrirse) y «Haz clic para agendar una reunión
  con nosotros» (hoy el enlace sigue yendo al correo: falta el cal.com). · 4 · medido: las raíces salían del MISMO marrón rojizo en las cuatro estaciones
  mientras la copa se nevaba, florecía o reverdecía; ahora el motor tiñe la raíz en el color de la estación (invierno 0,8 · primavera 0,65 · verano 0,5;
  otoño, la lámina tal cual).
- **Medido:** `astro check` 0 · `spacing-lint` en escala · build OK · `tools/verify.cjs` en / y /proyectos (Chrome y WebKit, 1280 y 390) limpio · capturas de las
  raíces en las cuatro estaciones (antes y después) · posición de los heroes por fotograma: el que sale 70 → −308 px y el que entra 447 → 70 px a la vez · la
  aparición del «Contáctanos» a 0,3 / 0,9 / 1,6 / 3 s · la puerta con las caras en Chrome y WebKit.
- **PUBLICADA (30/09)** con las rondas 78–80 (commit `9104d05`, Andoni: «publica ya»). Verificada EN VIVO: `tools/verify.cjs` en /, /proyectos y /proyectos/multiverse
  (Chrome y WebKit, 1280 y 390) limpio, 0 ≥ 400, desborde 0 (una primera pasada de la home pilló el despliegue a medias: HTML nuevo con sus archivos aún en 404;
  a los 20 s, limpio). Sigue `noindex`.
- **Pendiente:** el enlace de cal.com (la puerta ya dice «agendar»).

### Ronda 82 · 2026-09-30 · el nombre anterior que reaparecía en los heroes (en local)
- **Andoni (textual):** «en más proyectos, cuando cambian los proyectos parece que hay un minibug con el titular anterior que se vuelve a ver».
- **Causa:** al quitar `.sale` (1,5 s después del relevo), las palabras del nombre anterior volvían a su sitio de espera (abajo) con la transición de 1,1 s y
  cruzaban la máscara. **Hecho:** el regreso es instantáneo; solo se animan la entrada (`.on`) y la salida (`.sale`).
- **Medido:** sonda por fotograma durante 14 s (tres relevos): palabras de un nombre que no es el activo ni el que sale, dentro de su máscara → publicada 21
  fotogramas, local 0.
- **PUBLICADA (30/09)** a petición de Andoni («sí, publícalo»).

### Ronda 83 · 2026-10-03 · feedback de Eric (Agentation): el titular del hero más arriba y copy nuevo (en local)
- **Eric (textual, sobre `.hero > .wrap.titular`, 1710×985):** «Esto tiene que estar más arriba, dejar más aire abajo. H1: Orquestamos tu web con IA. Sub: Somos
  especialistas en desarrollo agéntico.» · (a media ronda, tras verlo a partes iguales) «un poco más abajo».
- **Hecho:** `Hero.astro`: el hueco libre del hero ya no va entero encima del titular (ronda 14): dos tercios encima y un tercio debajo (la caja del titular
  ocupa el hueco y lo reparte con dos separadores, `::before` flex 2 y `::after` flex 1). El marco y el árbol no se mueven; los 40 px del subtítulo al marco
  (ronda 17) pasan a ser el mínimo. `home.ts`: H1 «Orquestamos tu web con IA.» y subtítulo «Somos especialistas en desarrollo agéntico.» («Ia» → «IA»).
- **OJO, por acordar entre los dos:** «Orquestamos tu web con IA.» en el H1 está en «Rechazado» desde la ronda 77 (Andoni: «déjalo en Elevamos tu web con IA
  como estaba»). Eric lo vuelve a pedir: no se publica hasta que lo acuerden. La imagen para compartir (`og.jpg`) sigue con el titular anterior.
- **Medido** (Chrome real y WebKit, movimiento reducido; `tools/verify.cjs` no corre en el Mac de Eric: apunta a `/Users/andonimart/…`): a 1710×985 el H1 pasa
  de y 303 a 234 y el aire bajo el subtítulo de 40 a 109 px; a 1280×720, de 222 a 180 (40 → 82 px); a 390×844, de 404 a 301 (40 → 143 px). H1 en una
  línea en escritorio (769 px) y dos en móvil; hero de 100 lvh y árbol en su sitio en todos; consola limpia, desborde 0 · `astro check` 0 errores ·
  `spacing-lint` en escala · `astro build` OK.
- **A media ronda (Eric, sobre `.pie-arbol`):** «a la hora de entrada las + salen de izquierda a derecha y eso no quiero; quiero que salgan directamente en su
  posición». Causa: se escalaba la FILA entera (0 → 1 desde la izquierda) y las cruces, que son sus hijas, viajaban con ella. **Hecho (`Carriles.astro`):** la
  línea va en un `::before` de la fila y es lo único que se traza; las cruces aparecen en su sitio (fundido de 0,5 s). Vale para todas las filas de la web.
  **Medido** (Chrome y WebKit, 1710 y 390, sonda por fotograma durante 2,6 s): las cruces en una sola posición x (251 y 1450 a 1710; 16 y 365 a 390), opacidad
  0 → 1; la línea sigue trazándose (escala 0 → 1).
- **A media ronda (Eric):** «la parrilla detrás del árbol igual tiene que sincronizarse antes de la entrada del árbol, ¿no?». Medido antes: sin animación de
  carga todo arrancaba a la vez y a los 0,7 s el árbol iba por la mitad con la línea y las cruces aún trazándose; los puntos del marco estaban desde el primer
  fotograma. **Hecho:** `Base.astro` marca `html.sin-carga` en el `<head>` (visita sin carga); `Hero.astro`: los puntos del marco entran a la vez que la línea y
  las cruces (0,2 s + 0,7 s) y el árbol y el haz esperan 0,9 s a que la parrilla esté puesta. Con la animación de carga no cambia nada (el árbol nace en el
  impacto de la gota y el marco sube con el hero) y con movimiento reducido tampoco. **Medido** (Chrome y WebKit, 1710×985): capturas a 250 / 700 / 1200 /
  1800 / 2600 / 4200 ms (parrilla puesta a 700 ms y sin árbol; el árbol empieza a ~1 s); los tres caminos (sin carga, `?carga=1` + «saltar», movimiento
  reducido) acaban con el árbol crecido y sin errores. **Sin hacer:** con carga, líneas y cruces siguen trazándose en el impacto, a la vez que nace el árbol
  (adelantarlas toca `Cargador.astro`, que tiene cambios de otra sesión).
- **A media ronda (Eric, sobre `.cargador .pista`):** «Aquí se tiene que dibujar una V. Y el botón de saltar tiene que ser más alineado al diseño» · (al verlo)
  «la tipo de "dibuja una v", ¿está alineada con el diseño? me parece AI slop». **Hecho (`Cargador.astro`):** el gesto que arranca la carga es una V (la del
  isotipo), no un círculo: el rastro baja, hace vértice y vuelve a subir abriéndose. `leerV()` lee el rastro HACIA ATRÁS desde el puntero (lo que hiciera
  antes el ratón no cuenta), con histéresis de 6 px: brazos ≥ 4,5 % del lado corto de la ventana (≥ 36 px), el segundo ≥ 55 % del primero, uno a cada lado
  del vértice, en PICO (a un cuarto de altura mide ≤ la mitad de su boca: una U o un círculo no pasan) y sin garabatos; rastro de 3,2 s; cada toque empieza
  limpio). Reconocida, la V del visitante se enciende y se RECOGE hasta el arranque del isotipo, donde se vuelve la gota (fuera el anillo). Espacio o intro:
  una V sintética. La consigna, a solas en la pantalla, es un TITULAR: «Dibuja una v.» en Family a `text-h2` (antes, mono de 13 px en minúsculas). «Saltar» es
  la píldora de cristal de la casa (`.btn-primary` con su gota Coral al pasar) en pequeño: 32 px de alto (48 para el dedo), Areal 14. Tras saltar o acabar, el
  rastro deja de escuchar el puntero.
  **Dos fallos cazados por Eric al probarlo:** (1) «no me la detecta»: la primera versión tomaba como vértice lo más bajo de TODO el rastro, y quien llegaba
  con el ratón desde abajo y dibujaba a continuación no pasaba → se lee hacia atrás desde el puntero. (2) «aparece un cacho de lo que se va a pintar»: la bola
  del isotipo asomaba antes de dibujar nada (la máscara iba con raya 1000 y hueco 1000: la raya siguiente empezaba justo al final del camino y su punta
  redonda destapaba la bola; no salía en Chrome sin ventana, sí en la vista previa de Ship Studio) → hueco de 3000 y la copia a plena tinta no se pinta
  hasta que la gota echa a rodar (`.dibuja`).
  **Medido** (Chrome real, `?carga=1`): 19 gestos a 1710×985: arrancan la V que llega desde abajo, la de vértice redondeado, la lenta, la pequeña (55 px), el
  «visto», de derecha a izquierda, con pulso, muy abierta y estrecha; NO arrancan círculos (cuatro), una U, solo bajar, ida y vuelta por la misma línea ni
  ir hacia «Saltar» y volver · 0 píxeles del isotipo antes de la V a 1710×985@2, 1280×720, 1170×1292 y 390×844@3, y la carga termina en los cuatro · espacio
  arranca; «Saltar» se moja al pasar y salta; Family cargada (48 / 34 px), desborde 0, consola limpia · `astro check` 0 errores · `spacing-lint` en escala ·
  `astro build` OK. **SIN medir:** WebKit (aquí no hay Playwright con WebKit) ni una mano de verdad: lo confirma Eric en su vista previa.
  **Después (Eric):** «escape para saltar o así, algo más rápido de entender» · «con icono bonito» · «que esté abajo centrado con un pelín de aire». El botón
  dice «esc para saltar» (la tecla en su chapa, como «esc para levantarte» de Proyectos; se sigue pudiendo pulsar) con un icono de SALTO (un arco con su flecha
  por encima de una piedra, trazo de los CTA); en táctil, «Saltar» + icono. Va al pie de la pantalla, centrado, a 48 px del borde (32 en móvil + zona
  segura); la consigna queda sola en el centro; aparece y se va con ella. Medido (Chrome real, 1710×985 y 390×844 táctil): centrado (0 px), aire 48 / 32,
  clic o toque salta, Esc salta, al reconocer la V el botón se apaga; desborde 0, consola limpia.
  **Para revisarla (Eric: «en incógnito se me salta»):** `/?carga=1` la fuerza SIEMPRE (`Base.astro`): aunque ya se haya visto y, desde ahora, aunque el
  sistema pida movimiento reducido; vale junto a `?feedback=1`. Y la RUEDA ya no la salta con un roce: hace falta un scroll de verdad (≥ 90 px seguidos,
  pasado el primer medio segundo); antes cualquier evento de rueda (un roce del trackpad, la inercia de la página anterior) la saltaba y la daba por vista.
  Medido (Chrome real): navegador limpio sin parámetro → sale; roce de 12 px → sigue; scroll de 160 px → salta; segunda visita → no sale; `?carga=1` → sale,
  también con movimiento reducido (y termina bien tras la V). La causa de que a Eric se le saltara NO está confirmada: la rueda es la hipótesis.
  **NO VOLVER:** el círculo como gesto de la carga (rondas 20–82) y la consigna en mono pequeña.
- **PRUEBA hero-claro (Eric, 03/10; «que el fondo del hero sea blanco y el resto de elementos white se ajusten a dark; una prueba nada más, fácilmente
  reversible»):** detrás de un parámetro, sin él no cambia nada: `?hero=blanco` (blanco puro) y `?hero=claro` (Rosa niebla). El `<head>` pone
  `html.hero-claro` (+ `hero-blanco`) y el hero pasa a `surface-light`: titular en Cacao, subtítulo y esquinas en Nogal, barra en Cacao (`sobre-claro`
  desde el primer fotograma), puntos y trazos del marco en Cacao (`--tinta-hero`); SIN haz de luz ni su brillo sobre el árbol (en oscuro se leía como una banda gris; Eric: «quitamos»); el árbol se hunde hacia el fondo claro (`fondo()`) y las líneas
  del dibujo, el filo y los puntos del canto van en Cacao cuando el fondo es claro (`estela.ts › claro`). Las raíces y lo demás siguen oscuros: la línea de
  suelo es la frontera. Para quitarla: buscar «PRUEBA hero-claro» (Base, Hero, Nav, estela.ts). **Medido** (Chrome sin ventana, 1440×900, movimiento
  reducido): fondo 255·255·255, h1 48·32·24, consola limpia, desborde 0; sin parámetro, el hero igual que antes · `astro check` 0 errores. **SIN medir:**
  con la animación de carga, WebKit, móvil y las otras estaciones (en invierno la nieve del árbol es blanca sobre blanco).
- **A media ronda (Eric):** el primer dolor pasa a leerse como una frase: eyebrow «Si tu web no se alinea con tu marca…» · titular «Pasamos tiempo mano a mano»
  (sin punto: sigue debajo) · texto «contigo entendiendo lo que necesita tu proyecto.» (`home.ts`; los otros dos dolores, sin tocar) · «los tres se tienen
  que animar stagger»: en cada parada, al llegar la savia, eyebrow → titular → texto entran uno tras otro desde el desenfoque (retrasos 0,30 · 0,46 · 0,62 s;
  `Dolores.astro`). Antes el eyebrow estaba a la vista desde el principio y la respuesta entraba en bloque; ahora el eyebrow descansa ya en `--fg2`.
  **Medido** (Chrome sin ventana, por fotograma): antes de la savia las tres a 0; a 333 ms solo el eyebrow ha empezado (0,03 · 0 · 0); al final las tres a 1;
  consola limpia. **SIN medir:** el ritmo a ojo (el GL por software da 2–3 fotogramas por segundo): lo juzga Eric en su vista previa.
- **A media ronda (Eric): «ponme agentation siempre»:** en LOCAL (`astro dev`) Agentation va siempre puesto; publicada, `?feedback=1` se RECUERDA en ese
  navegador (`localStorage` «savvia:feedback») hasta `?feedback=0`. Quien nunca lo haya pedido sigue sin cargar nada (`Base.astro`). Medido en local sin
  parámetro: `#reviewRoot` montado; con `?feedback=0`, nada.
- **A media ronda (Eric, Agentation sobre `#contenido`):** «la parte de abajo del árbol también debería crecer para abajo, al igual que el árbol crece para
  arriba». **Hecho (`Raices.astro`):** las raíces ya no están pintadas desde el principio: se DIBUJAN y se PINTAN hacia abajo desde el cuello (líneas por
  delante, pintura rasgada con filo de savia), con el reloj y la curva del árbol (3,6 s), cuando el árbol ha empezado a brotar Y las raíces asoman en
  pantalla (quedan bajo el pliegue del hero: a la vez que el árbol no lo vería nadie). Por tiempo y una sola vez, no atadas al scroll (lo rechazado en la
  ronda 39 era componerlas CON el scroll; Andoni pidió entonces «fijas»: por acordar entre los dos). Página abierta ya más abajo o movimiento reducido:
  pintadas sin más. Un cambio de estación a medio crecer sigue desde donde iba. **Medido** (Chrome sin ventana, 1440×900): a 1,5 s de asomar, el frente
  va por la punta de las raíces; a 4 s, pintadas; consola limpia. La otra nota del mismo pegado (las «+» de izquierda a derecha) ya estaba resuelta en
  esta ronda: medido otra vez, las cruces solo ocupan una posición x (116 y 1315 a 1440) durante toda la entrada.
- **A media ronda (Eric, Agentation): los otros dos dolores, con el mismo patrón que el primero** (`home.ts`): 2 · «Si lo que haces se ve como AI slop…» /
  «Con tu dirección y criterio» / «generamos skills únicas.» · 3 · «Si la consistencia del diseño se rompe en cada cambio…» / «Creamos savvia: el agente para
  tu web» / «El sistema consistente que conecta tu web con la IA.» («AI slop» en minúscula, como en la ronda 65; «Creamos» con mayúscula, como los otros dos
  titulares). El tercero ya no dice «savvia agentic: el arnés de tu web»; el nombre «savvia agentic» sigue en otros sitios de la web (por acordar).
  Medido a 1710×985: titulares en 2 · 2 · 3 líneas, desborde 0, consola limpia.
  **Retoque (Eric, a continuación):** 2 · «…AI Slop…» (con mayúscula, a petición suya) / «Con tu dirección y nuestro criterio» / «generamos skills únicas de
  diseño y desarrollo web.» · 3 · «savvia: el agente que guía tu web.» / «Un sistema que conecta tu página web con la IA.» (Eric escribió «Savvia»: se deja
  en minúscula por la regla de la ronda 16; el titular del 2, sin punto porque la frase sigue debajo).
- **ISOTIPO con el vértice más a la derecha (Eric, 03/10; «isotipos MUY parecidos pero que nos quiten un poco de la apariencia de saxofón; que la segunda
  curva, la de abajo, esté un poco más a la derecha para que esté más centrada y haga alusión al nacimiento de un tallo» → de siete variantes en el
  lienzo https://claude.ai/artifact/TZMV8vTngSYuARuJEp3NmT eligió la B: «esta es la ganadora yo creo» · «aplícala»):** el trazado de siempre con un
  desplazamiento horizontal que crece hacia abajo (x += 64 · t^1,15, t de y = 165 a 436): gancho de entrada y bola en su sitio, el vértice 64 unidades
  (17 % del ancho) a la derecha; mismo lienzo 370 × 439 y 1275 × 439. Cambian `public/savvia-isotipo.svg`, `savvia-logo.svg`, `favicon.svg` (recentrado),
  `apple-touch-icon.png` y `og.jpg` (`tools/r83-og.cjs`; lleva el H1 de la ronda 83: si el titular vuelve atrás, regenerarla), todo con `?v=83`. En
  `Cargador.astro` el EJE por el que la gota dibuja el isotipo va con la misma deformación. Los anteriores, en `tools/retirados/*.r82.*`. **Medido:** la
  plumada cubre el 99,9 % de la forma nueva (con el eje viejo, el 74 %) · Chrome sin ventana, 1280×720, `?carga=1`: la V arranca, la gota dibuja el
  isotipo entero, cae, el árbol crece desde el impacto y el isotipo encaja en la barra; consola limpia · `astro check` 0 errores · build OK ·
  `spacing-lint` en escala. **SIN medir:** WebKit y móvil. **Por confirmar con Andoni** (es marca): no se publica hasta que lo acuerden.
- **A media ronda (Eric):** «el trazo que se dibuja cuando dibuja el usuario, que sea como de pincel, un trazo parecido al isotipo». **Hecho
  (`Cargador.astro`):** el rastro deja de ser una línea de 2 px (`<polyline>`) y se pinta en un lienzo 2D con la PLUMA del isotipo (`pincel()` +
  `pintar()`): los puntos del ratón se remuestrean cada 3 px y se alisan; el grosor sale de la dirección (grueso al bajar, 11–16 px según la ventana;
  fino al subir y en horizontal, el 30 %), suavizado a lo largo del trazo; entra afilado (30 px) y remata en una bolita en la punta. Rosa niebla al 90 %;
  reconocida la V, pasa al tono de la gota y se recoge en ella como antes. **Medido** (Chrome sin ventana, 1280×720, DPR 2, `?carga=1`): entrada fina,
  brazo grueso, subida fina con bolita; la V se reconoce, la gota dibuja el isotipo, cae y la carga termina; consola limpia · `astro check` 0 errores ·
  build OK. **SIN medir:** con el dedo (móvil) y WebKit.
- **A media ronda (Eric):** «igual que haga falta un clic para empezar a dibujar, ¿no?» · «el trazo un poco más fino». **Hecho (`Cargador.astro`):** se
  dibuja con el botón (o el dedo) PULSADO, como con un lápiz: mover el ratón sin pulsar no deja rastro ni arranca nada; al soltar sin haber hecho una V, el
  trazo se apaga (0,4 s). Quien pasea el ratón 400 px sin pulsar recibe una segunda línea bajo la consigna, «con el clic pulsado» (Areal 18, `--fg2`; cuelga
  sin mover el titular; se va al pulsar). Pulsar sobre «esc para saltar» no empieza un trazo. Pincel más fino: 8–11,5 px al bajar (antes 11–16).
  OJO: este cambio y el del pincel se hicieron en DOS sesiones a la vez sobre el mismo archivo; quedó encajado a mano (el `mover` pinta con `pintar(pincel())`).
  **Medido** (Chrome real, 1710×985, `?carga=1`): los 20 gestos de la batería con el botón pulsado (11 V arrancan; círculos, U, ida y vuelta y demás, no);
  una V perfecta SIN pulsar no arranca ni pinta nada (0 píxeles en el lienzo) y saca la segunda línea; la carga termina tras la V · `astro check` 0 errores ·
  `spacing-lint` en escala · `astro build` OK. **SIN medir:** con el dedo y WebKit.
- **SUBIDA A GITHUB (04/10, Eric: «sube a producción los cambios que hice ayer» · «publica todo pero /musica no se toca»), SIN PUBLICAR TODAVÍA:** commit
  `cadbe37` en `main` (toda la ronda 83, con el H1 y el isotipo nuevos; `vercel.json` sin tocar; fuera `package-lock.json` y `.claude/`). Vercel BLOQUEÓ el
  despliegue («Deployment was blocked», https://vercel.com/andonimart/savvia-home/HgEfUDhSJXGEcBU9fKyvv8TZ3tf2): es el primer commit de Eric en `main`; su
  autor (`ericruiz@MacBook-Air-de-Eric.local`, Git sin identidad configurada) no es de la cuenta de Vercel de Andoni, y la cuenta de Vercel de este Mac
  (`tech-6826`, equipo Criterio Design) no tiene acceso a `savvia-home`. savvia.studio sigue con la versión anterior (medido: `favicon.svg?v=68`, H1 de
  antes; /, /proyectos, /musica y /musica-clara responden 200). **Para publicarla:** Andoni, desde Vercel (Redeploy del commit `cadbe37`) o con cualquier
  push suyo a `main` (vale uno vacío). **Para que no vuelva a pasar:** Andoni invita a Eric a su equipo de Vercel y Eric configura su identidad de Git con
  el correo de su cuenta de GitHub (`ericruizmolero`). Antes de compilar: `astro check` 0 errores · `spacing-lint` en escala · `astro build` OK (11 páginas).

## Rechazado — añadidos de la ronda 77 (NO VOLVER)
- La pantalla de carga al llegar a Proyectos destacados (rondas 68–76).
- El reel como pieza de «Más proyectos» (ronda 76) y el teléfono de Remerge sobre su amarillo (ronda 76).
- El «Contáctanos» que se recogía en un CTA de cristal al pasar (rondas 67–76): «parece que se rompe».
- La luz del «Contáctanos» más fuerte en una mitad que en la otra (ronda 77) y la píldora que brotaba de un hilo (ronda 78): ahora, una puerta.
- «Orquestamos tu web con IA.» en el H1 (ronda 76).

## Rechazado — añadidos de la ronda 76 (NO VOLVER)
- Los botones y paneles RECTOS con cruces (rondas 67–75): vuelven los redondeos.
- El titular de Proyectos que se generaba en el agua con ondas (rondas 51–75).
- El CILINDRO de «Más proyectos» (ronda 53) y la pieza de logotipos que rotaban (parecía que hacemos logos).
- «Han confiado su web» y la cifra de 40 webs (son más de 80).
- El sonido encendido al llegar.

### Ronda 125 · 2026-10-07 · de vuelta a NATURALEZA: titular, salvapantallas, savvia agentic de la rama musical y sonidos de clic (en local, rama `main`)
- **Andoni (textual):** «dejamos lo musical, nos quedamos con naturaleza, con lo que hay hoy en savvia.studio» · 1 «h1: Elevamos tu web con IA» · 2 «subtítulo: Especialistas en orquestar con desarrollo agéntico» · 3 «salvapantallas» · 4 «savvia agentic: actualizamos la que hay en savvia.studio por la que tenemos ahora en la parte musical, pero tiene que ir más lento» · 5 «en savvia.studio añadir los sonidos de clics».
- **Contexto:** la rama `musica` (rondas 83–124, publicada en /musica) se queda como estaba; esto se trabaja en `main` (worktree `../savvia-web-main`), lo publicado en savvia.studio (Eric, ronda 83, + logotipo y favicon de naturaleza). La numeración sigue a la de `musica`.
- **Hecho:**
  · **1–2 · `home.ts`:** «Elevamos tu web con IA.» / «Especialistas en orquestar con desarrollo agéntico.».
  · **3 · `Entreacto.astro` (nuevo; en la rama musical era la partitura):** tras 60 s sin tocar nada (o al volver a la pestaña tras más de 30 s fuera) la pantalla se funde a la noche de la estación y el ROBLE de la estación de la web se dibuja y se pinta con el motor del hero (`estela.ts`) desde la base; debajo, «hora · Donostia · estación» y «Mueve el ratón para volver» (táctil: «Toca para volver»). Cualquier gesto la retira (el roce del ratón no). No sale en la carga, sentado, con el menú o un diálogo abiertos. Oculta, no pinta. `?reposo=5` para probarla; `window.__reposo`.
  · **4 · savvia agentic:** `LaPartitura.astro` de la rama musical (la librería de Neety usada en tiempo real: seis piezas reales que los agentes llevan a su home) sustituye a `LaReceta` (guardada, fuera de la página), con su copy (`home.ts › partitura`, `receta.titulo` «savvia agentic.», subtítulo genérico) y las tipografías de Neety (Bricolage Grotesque, Google; Switzer, Fontshare: `astro.config.mjs` + `Base.astro`). MÁS LENTO: el guion al 62 % (`VEL`: un bucle de ~26 s en vez de 16). Sus sonidos, de `sonidos.ts`; el remate de «Publicar» es un piano suave (`tocar`) en vez del piano eléctrico del jazz.
  · **5 · `src/scripts/sonidos.ts` (= `musica.ts` de la rama musical) + `src/scripts/clics.ts` (en `Base.astro`, toda la web):** al pasar el ratón por un enlace o un botón, una tecla mecánica muy suave; al pulsar, el clic de un ratón. Solo con ratón; no antes del primer gesto; mudo si el visitante apagó el sonido (`savvia:son` = '0'; el ambiente de Proyectos sigue con su regla: solo con '1').
- **Medido:** `astro check` 0 · `tools/r125/natura.cjs` (Chrome 1280, WebKit 1280, Chrome 390): titular y subtítulo nuevos; reposo abierto a los 6 s y cerrado al mover (capturas `tools/shots/r125-reposo-*`); savvia agentic con su título y el reloj al 62 % (1,8 s de guion en 3 s) · `tools/r125/clics.cjs` (Chrome y WebKit): suenan al pasar y al pulsar, 0 con el sonido apagado · `tools/verify.cjs` en /, /proyectos y /proyectos/multiverse (Chrome y WebKit, 1280 y 390) limpio, desborde 0. (Las pruebas viven en la carpeta de la rama musical, `../savvia-web/tools/r125/`.)
- **Pendiente:** no publicado ni subido.

### Ronda 126 · 2026-10-07 · savvia agentic con nuestras salidas, Eric y Andoni sin hover, menú nuevo, Kuanta y Arkdev, proyectos más grandes, Manifiesto y Lab (en local, rama `main`)
- **Andoni (textual):** 1 «en savvia agentic, en el output, cosas que nos representen más: Cambios de copy · Editar ilustraciones · Crear landings de Ads · Trabajar el CMS» · 2 «Eric y Andoni: lo de pasar el ratón por encima parece un poco AI slop, lo cambiamos» · 3 «páginas del menú: Portfolio, Lab y Manifesto; luego, en pequeño, nuestro correo y handbook» · 4 «Multiverse Computing: reemplazar su logo, finalmente no quisieron la web, y el contenido relacionado; Zernio, otro nombre y logo, algo así como Arkdev» · 5 «en proyectos, que las webs se vean más grandes y salgan como desde abajo; organizar en filas de 2 y de 3, y algo original» · 6 «una página de manifesto chula con el texto de la versión musical, estilo los manifestos de mymind» · 7 «una página de labs con experimentos, que se sienta un laboratorio, algo caótico».
- **Hecho:**
  · **1 · `home.ts › partitura.sale`** = las cuatro de Andoni; `LaPartitura.astro`: cuatro cajas de salida centradas (antes seis) y su aria-label.
  · **2 · `Estudio.astro`:** fuera el hover con línea de llamada, la nota y el aviso que latía. Al juntarse, un pie de foto quieto bajo cada uno (nombre en mono sobre un filete). El paseo ya no recorta por abajo.
  · **3 · `home.ts › nav`** Portfolio (/proyectos) · Lab (/lab) · Manifesto (/manifiesto); en pequeño el correo y «Handbook · pronto» (sin dirección todavía; igual en el pie). Fuera del menú la miniatura del REEL: enseña Multiverse y Zernio (hay que volver a montarlo con Kuanta y Arkdev).
  · **4 · marca blanca:** Multiverse Computing → **Kuanta**; Zernio/Amarra → **Arkdev** (slugs y rutas `/proyectos/kuanta`, `/proyectos/arkdev`; caso de Kuanta sin nombres de sus productos). Medios regrabados de las webs reales con la marca cambiada interceptando sus respuestas (`../savvia-web/tools/r126/blanca.cjs`, `grabar.cjs`, `obra.py`): `public/media/obra/{kuanta,arkdev}/`, `proyectos/{kuanta,arkdev}.webp`, `servicios/arkdev-hero.webp`, logotipos `logos/{kuanta,arkdev}.svg`; productos renombrados (Kompakt, Sigma, Sentinel, Kairos 438B), fundadores y datos que la identificaban cambiados. Destacados: sin iframe (captura), el dominio de la pantalla de carga es su caso en savvia.studio. `Proyectos.astro`: el tinte no rompe si falta una captura. Medios viejos sin borrar.
  · **5 · `obra/Pieza.astro` + `proyectos/index.astro`:** el navegador al 88 %, arrancando bajo el nombre y saliéndose por abajo; SUBE desde abajo al entrar en pantalla; el teléfono, igual. Orden: filas de 2 (por defecto), de 3 o libre (`?orden=tres|libre`).
  · **6 · `/manifiesto` (agente; `src/pages/manifiesto.astro`, `src/data/manifiesto.ts`):** referencia mymind.com/manifesto (`tools/ref126/mm-*`): el roble de la estación de emblema, «Manifiesto.» en Family enorme, cada principio en su pantalla, las palabras se entintan al leer, subrayado de savia en la frase clave, la savia baja por el carril izquierdo con una gota a la altura de lectura y se posa en el cierre. Texto de Andoni con «receta propia» en vez de «partitura propia». Párrafos en Areal (Family de prueba sin tildes).
  · **7 · `/lab` (agente; `src/pages/lab.astro`, `src/components/lab/Mesa.astro`, `src/data/lab.ts`, `public/media/lab/` 4,6 MB):** una mesa de papel milimetrado con reglas y mira con coordenadas; 11 experimentos reales (EXP-001…011, de las dos ramas) como fichas con clip en bucle, código, rondas, fecha y sello de estado; se arrastran, se ordenan y se desordenan, lupa al pulsar; móvil en columna; vídeos solo a la vista.
- **Medido:** `astro check` 0 · `tools/verify.cjs` en /, /proyectos, /proyectos/kuanta, /proyectos/arkdev, /manifiesto y /lab (Chrome y WebKit, 1280 y 390): limpio, 0 ≥ 400, desborde 0 · capturas `../savvia-web/tools/shots/r126-*` (estudio, agentic, proyectos dos/tres, manifiesto, lab, hojas de marca).
- **Pendiente de Andoni:** la dirección del Handbook; en Kuanta siguen los logotipos de sus clientes reales (Telefónica, Bosch…) y en Arkdev los testimonios reales de clientes de Zernio: ¿se quitan?; montar el reel con Kuanta y Arkdev; no publicado ni subido.

### Ronda 127 · 2026-10-07 · Handbook y testimonios inventados en Kuanta y Arkdev (en local, rama `main`)
- **Andoni (textual):** 1 (el handbook) «algo así: https://www.designhandbook.com/en» · 2 «habría que sustituir los testimonios, sobre todo, por otros; los logos me importan menos, porque una inventada también puede tener esos logos» · 3 (Kuanta y Arkdev) «sí».
- **Hecho:**
  · **`/handbook` (agente; `src/pages/handbook.astro`, `src/data/handbook.ts`, `src/components/handbook/{Portada,Indice,Capitulo}.astro`):** el manual de cómo trabajamos en el formato de designhandbook.com (capturas en `../savvia-web/tools/ref127/`): portada oscura con «Handbook.» y las RAÍCES de la estación (el manifiesto es la copa; el handbook, la raíz), lista de ocho capítulos numerados (Qué es savvia · Principios · Cómo trabajamos · La receta · Formas de trabajar · Cómo medimos la calidad · Herramientas · Contacto) y lectura en claro con índice lateral fijo que marca el capítulo y su progreso (la gota de savia por el carril); en móvil, barra abajo que abre el índice. Contenido SOLO de lo que consta (home.ts, manifiesto.ts, DESIGN.md, AGENTS.md); cada bloque lleva su origen en un comentario. `nav.mas` → `/handbook` (menú y pie).
  · **Testimonios (agente; `../savvia-web/tools/r126/testimonios.json`, `blanca.cjs`, `testimonios.py`, `comprueba-testimonios.cjs`):** en Arkdev, los 11 testimonios y los tres casos de clientes reales de Zernio → personas y empresas inventadas (Mateo Varela · lumenkite.app, Plumora, Tavelo, Orvexa…), citas reescritas, fotos como retratos neutros sin rasgos; en Kuanta, «Validated by global leaders» (Telefónica, HP, Luzia, Sopra Steria → Nordvik Telecom, Corvane Systems, Tessly, Brandt Advisory), el aviso del hero, las noticias y los inversores del menú. Se quedan los muros de LOGOTIPOS de clientes (Andoni los permite). Regrabados g1–g4, d1–d2, la portada de Kuanta y las capturas `proyectos/{kuanta,arkdev}.webp`.
  · Kuanta y Arkdev, confirmados como nombres.
- **Medido:** `astro check` 0 · `tools/verify.cjs` en /, /proyectos, /proyectos/kuanta, /proyectos/arkdev, /manifiesto, /lab y /handbook (Chrome y WebKit, 1280 y 390): limpio, 0 ≥ 400, desborde 0 · comprobación por código: 0 nombres de cliente real en los testimonios de las dos webs · hojas `../savvia-web/tools/shots/r127-marca-{kuanta,arkdev}.jpg`, capturas `r127-handbook-*`.
- **Pendiente de Andoni:** confirmar la lista de herramientas del capítulo 07 del handbook; montar el reel con Kuanta y Arkdev; no publicado ni subido.

### Ronda 128 · 2026-10-07 · secundarias en claro: Manifesto tipo clusia, Lab tipo matthewvernon, Handbook en dos niveles; subtítulo y el hover de Eric y Andoni (en local, rama `main`)
- **Andoni (textual):** «importante, las paginas secundarias quiero que vayan todas en light» · «Manifesto algo estilo asi me vale: https://www.clusia.com/about pero sin la sección de las personas del equipo» · «El Handbook tiene que ser mucho mas elaborado… https://www.designhandbook.com/en y luego tenemos cada capitulo en detalle» · «El lab como esto: https://www.matthewvernon.co/» · «el subtitulo de la home cambia a especialistas en orquestar el desarrollo agentico» · «en Eric y Andoni hay que recuperar lo de hacer hover pero indicarlo de alguna manera sutil que no parezca AI slop».
- **Hecho:**
  · **Home:** subtítulo «Especialistas en orquestar el desarrollo agéntico.». `Estudio.astro`: vuelven las notas al pasar por cada uno; la pista es el propio pie de foto: los dos nombres son botones con un «+» fino que gira a × al abrir (sin aviso parpadeante). En móvil, un toque abre (guardas `abiertaEn` contra el foco + clic y el cierre del paseo al hacer scroll) y la nota ya no queda tapada por la sección siguiente.
  · **/manifiesto (agente):** en claro, composición de clusia/about sin equipo: titular enorme, párrafos con aire y las tres ideas del manifiesto musical en columnas.
  · **/lab (agente):** en claro, un lienzo que se recorre arrastrando o con la rueda (matthewvernon.co): «laboratorio.md» fijo en el centro, los experimentos como ventanas de archivo arrastrables, lupa y selector de fondo (Rosa niebla · Salvia · Coral). Al pulsar uno se abre en grande.
  · **/handbook + /handbook/<slug> (agente):** portada en claro (titular sobre línea de suelo con las raíces debajo, «Empieza por aquí» con tres capítulos, lista de los ocho en filas grandes con imagen al pasar, «De dónde sale este manual») y una página por capítulo (cabecera centrada, índice fijo con gota y progreso, píldora en móvil, secciones numeradas, anterior/siguiente). Contenido solo de lo que consta; cada bloque lleva su origen en `handbook.ts`. Imagen nueva `public/media/handbook/verificacion.webp` (capturas reales de la home en los dos motores).
- **Medido:** `astro check` 0 errores · `tools/verify.cjs` en /, /proyectos, /proyectos/kuanta, /manifiesto, /lab, /handbook, /handbook/la-receta y /handbook/contacto (Chrome y WebKit, 1280 y 390): consola limpia, 0 ≥ 400, desborde 0 · `tools/r126/estudio-hover.cjs` (Chrome y WebKit 1280; toque a 390) · capturas `../savvia-web/tools/shots/r128-*`.
- **Pendiente de Andoni:** si se queda el fondo Coral del Lab (choca con «Naranja = acción + una pieza»); las frases y el rol de Eric y Andoni (siguen FALTA); la lista de herramientas del capítulo 07; la ficha de la ronda 76 del handbook cita a Eric con palabras resumidas, no literales; si barra y pie van también en claro en las secundarias; el reel con Kuanta y Arkdev; no publicado ni subido.

### Ronda 129 · 2026-10-07 · Eric y Andoni con llamadas y aficiones, Lab en bucle infinito, Manifiesto en papel con el roble gofrado, Duramen (el handbook) y Portfolio en filas de 2 y 3 (en local, rama `main`)
- **Andoni (textual, resumido):** 1 «el nombre salga como lo de sentarse… cada uno hará un gesto característico que te pasaré… y saldrán sus hobbies como cayendo de su nombre» · 2 «Lab: el usuario elige el color de fondo como en la referencia; loop infinito; al moverte se distorsionan los proyectos como si cogieras velocidad; logo y menú en color-dodge; savvia lab, una card de cristal; unir los proyectos con raíces que salen de la card» · 3 «Manifesto escrito en papel: titular centrado sin ilustraciones, de fondo el árbol como relieve en el papel que se mueve con el scroll, y el manifiesto con el efecto del vídeo» (texto que rodea un objeto fijo, renglón a renglón) · 4 «el handbook igual: titular centrado, al pasar el ratón salen proyectos; un nombre original relacionado con savvia; al bajar, un texto centrado; luego capítulos y footer» · 5 «portfolio: solo filas de 2 y 3; la card más pequeña y que los proyectos salgan de abajo».
- **Hecho (cinco agentes en paralelo, revisados):**
  · `Estudio.astro`: cada nombre es una LLAMADA (punto en el pecho que late, línea a 45°, nombre en mono; todo el botón); al pasar/enfocar/tocar, el otro se retira y sus AFICIONES caen del nombre (sin rebote; posadas casi rectas por «Rechazado»). Datos `estudio.personas[].hobbies` (FALTA) y `gesto: []` (gancho para los fotogramas del gesto, 12 fps).
  · `/lab` (`lab/Mesa.astro` reescrita): selector de fondo en tira (paleta de savvia, se recuerda); mundo que se repite en bucle (arrastre con inercia, rueda, dedo, flechas); distorsión por velocidad escalonada (skew hasta 9° y estiramiento); barra en color-dodge con placas oscuras bajo logo y menú en fondos claros; «savvia lab» en cristal fijo; raíces orgánicas desde la card a los 11 experimentos. «Contacto ↓» para llegar al pie (la rueda mueve el lienzo).
  · `/manifiesto` (reescrito; `manifiesto/relieve.ts`, `envolver.ts`, `public/media/manifiesto/roble-relieve.webp`): papel con fibras; «Manifiesto.» centrado; el roble del hero GOFRADO en seco (WebGL, mapa de alturas, la luz gira con el scroll); tres capítulos (Cap. uno · I · Voz propia…) cuyos renglones se recolocan con el scroll para rodear la silueta; listas y cierre. Móvil y movimiento reducido: flujo normal sobre el relieve.
  · `/handbook` → **«Duramen»** (el corazón del tronco; alternativas: Albura, Anillos). Portada solo con el titular centrado; estela de capturas de proyectos tras el cursor (máx. 7; en táctil, sola); al bajar, texto centrado que se entinta; capítulos; pie. Menú: «Duramen».
  · `/proyectos`: fuera el orden «libre»; cards 3:2; navegador recto al 86 %, cortado por el borde de abajo, que SUBE desde abajo al entrar (1,1 s, escalonado); sin JS, en su sitio.
- **Medido:** `astro check` 0 errores · `tools/verify.cjs` en /, /proyectos, /proyectos/kuanta, /manifiesto, /lab, /handbook y /handbook/principios (Chrome y WebKit, 1280 y 390): limpio, 0 ≥ 400, desborde 0 · /proyectos también sobre build · lab arrastrando con CPU ×4: 53–55 fps · manifiesto con CPU ×4: ~54 fps (2 fotogramas lentos al llegar al pie) · capturas `../savvia-web/tools/shots/r129-*`.
- **Pendiente de Andoni:** aficiones y fotogramas del gesto de cada uno; etiquetas de capítulo y listas del manifiesto (de Nilo); «Manifiesto» o «Manifesto»; recolocar los experimentos del Lab para un lienzo más denso; el «Contacto ↓» del Lab; no publicado ni subido.

### Ronda 130 · 2026-10-07 · Lab en «diferencia», Portfolio afinado, Manifiesto que se abre, Duramen en las guías y el menú con el reel de vuelta (en local, rama `main`)
- **Andoni (textual, resumido):** 1 «el logo y el menú del lab sin card: el efecto que muestra el contrario del fondo» · 2 «lo de salir de abajo solo en todos los proyectos; paginación más minimalista; cards con menos altura; que el titular de cada proyecto no quede tan alto» · 3 «Manifiesto más abajo y sin punto; textura más sutil; el árbol relieve estático; los textos de cada capítulo en el centro y al pasar el ratón se abren» · 4 «Duramen sin punto; segunda sección con más aire y CTA más sutil; capítulos sin eyebrow ni raya oscura; dentro de cada capítulo aprovechar las guías (la foto entre dos líneas con cruces, estilo hero)» · 5 «el menú al abrirse, más rico (recuperar reel)».
- **Hecho (agentes en paralelo, revisados):** · `/lab`: barra en blanco con `mix-blend-mode: difference`, fuera las placas. · `/proyectos`: variante `pz-sube` solo en «Todos los proyectos» (16:9 / 16:10, nombre `text-lead` a 32 px y alineado con el navegador); destacados vuelven al tratamiento de la ronda 68; paginación «01 02» en mono + «← Anterior · Siguiente →». · `/manifiesto`: «Manifiesto» en el tercio bajo, fibras al 0,24, relieve quieto (luz fija arriba a la izquierda), párrafos centrados de 34ch que se ABREN alrededor del cursor palabra a palabra (`manifiesto/abrir.ts`; fuera `envolver.ts`). · `/handbook`: «Duramen», intro con 192/256 px de aire y CTA de texto, capítulos sin rótulo ni raya oscura (también anterior/siguiente), cabecera de capítulo de carril a carril con filas de carriles y cruces, columna de texto de la col. 5 al carril. · `Nav.astro`: hora de Donostia, cuenta junto a cada enlace (9 proyectos · 11 experimentos · 3 principios), «Más», la miniatura del REEL rehecho con Kuanta y Arkdev (HyperFrames, `../savvia-web/tools/r130/`; sin nombres antiguos, comprobado en hoja de contactos) y el último proyecto (Kuanta).
- **Medido:** `astro check` 0 errores · `tools/verify.cjs` en /, /proyectos, /manifiesto, /lab, /handbook y /handbook/la-receta (Chrome y WebKit, 1280 y 390): limpio, 0 ≥ 400, desborde 0 · manifiesto con el ratón encima, CPU ×4: 60 fps · capturas `../savvia-web/tools/shots/r130-*`.
- **Pendiente de Andoni:** aficiones y gesto de Eric y Andoni; «último proyecto» es un dato fijo (Kuanta); en el Lab sobre Coral el menú queda más flojo (efecto de diferencia); no publicado ni subido.

### Ronda 131 · 2026-10-07 · menú solo con el reel, Manifiesto con el árbol en el papel y «la imprenta», Portfolio todo en escritorio (en local, rama `main`)
- **Andoni (textual):** «menú superior simplemente añadimos el reel, el resto va fuera» · «manifiesto no quiero el titular debajo del árbol, lo quiero encima y el árbol un poco más pequeño. El árbol no se mueve con el scroll. Y el ratón no mueve el texto. Si podemos hacer alguna animación chula al pasar de capítulo a capítulo es bienvenida» · «En portfolio, en todos los proyectos todos tienen que ser en desktop».
- **Hecho:** · `Nav.astro`: fuera hora, cuentas y «último proyecto» (y sus campos en `home.ts › nav`); queda el menú de antes + el reel. · `/manifiesto`: «Manifiesto» arriba y el roble gofrado debajo (−22,6 %: 614×304 a 1280), en el flujo del papel (no fijo, sin movimiento; se repinta solo si cambia el ancho); fuera `abrir.ts`; entre capítulos, «LA IMPRENTA»: el numeral baja con su sombra, golpea el papel y queda impreso con el canto hundido, después entran rótulos y párrafos (una vez por capítulo; movimiento reducido o sin JS, ya impreso). · `/proyectos`: la rejilla nunca usa teléfono; Remerge grabado en escritorio (`public/media/obra/remerge/escritorio.{mp4,jpg}`, 1440×810, sin avisos de cookies; campo `escritorio` en `proyectos.ts`). Destacados y caso de Remerge, con su teléfono.
- **Medido:** `astro check` 0 · `tools/verify.cjs` en /, /proyectos, /proyectos?p=2, /manifiesto, /lab y /handbook (Chrome y WebKit, 1280 y 390): limpio, desborde 0 · manifiesto con CPU ×4: 56 fps (2 fotogramas lentos) · capturas `../savvia-web/tools/shots/r131-*`.
- **Pendiente de Andoni:** aficiones y gesto de Eric y Andoni; no publicado ni subido.

### Ronda 132 · 2026-10-08 · invierno en claro, Eric y Andoni realistas, Servicios por pasos, Handbook tipo docs y el Lab con tres piezas (en local, rama `main`)
- **Andoni (textual):** 1 «El invierno me gustaría que se viera en versión clara ya que sería como la nieve y el árbol sin hojas» · 2 «Eric y yo en la versión musical teníamos unos monigotes que se veían más realistas… actualizar en todos los sitios» · 3 «servicios: que saliera cada servicio y al lado una card marcándose con un check los puntos que cubre, uno detrás de otro» · 4 «El handbook lo llamaría handbook y el contenido una mezcla entre lo que tenemos y docs.attio.com/docs/standard-objects» · 5 «en el lab solo estas 3 cosas: gravitas-hq.vercel.app · apogee-invader.vercel.app · el artifact ada71981…; un vídeo de cada uno».
- **Hecho:** · INVIERNO (`global.css`, `estacion.ts`, `Base.astro`, `estela.ts`, `Hero`, `Nav`, `Proyectos`, `Pie`, `Cargador`, `Dolores`, `tinta.ts`): `--noche` = nieve #ECEFF3, tinta Cacao, `--noche-honda` para los velos sobre la foto; inversión de `--color-niebla`/`--color-cacao` en hero, carga, salvapantallas y `surface-dark`; el motor hunde el árbol solo un 6 % sobre claro (ramas oscuras sobre nieve); fuera el haz en invierno; transición de 2,4 s con la tinta a mitad. Contraste 13,5 / 5,4 / 7,9:1. · EQUIPO: tiras v03 y `juntos-v03.webp` de la rama musical en `Estudio.astro` (llamadas re-medidas); caras y `juntos.webp` sustituidas en su sitio (FAQ, demo, pie, handbook); las anteriores en `tools/retirados/equipo-r131/`. · SERVICIOS: escena fija (300 lvh) con la forma a la izquierda y una tarjeta con los 16 puntos que se marcan con checks dibujados; relevo 1 → 2 → 3; móvil apilado. `home.ts › servicios.grupos`. · HANDBOOK (de nuevo «Handbook»): portada con rejilla de tarjetas con glifos; capítulos tipo docs (barra lateral con los ocho, migas, «En esta página» con progreso, tablas de documentación, avisos, tarjetas, matriz pieza × forma); cajón «Índice» en móvil. · LAB: solo Gravitas, Think Clearly y Skale (dos copias de cada una por vuelta, mundo 2200×1420), vídeos grabados de la web real (`public/media/lab/{gravitas,apogee,skale}.mp4`, 0,65–2,6 MB) y «Abrir en su web ↗».
- **Medido:** `astro check` 0 · `tools/verify.cjs` en /, /?estacion=invierno, /proyectos, /lab, /handbook, /handbook/la-receta y /manifiesto (Chrome y WebKit, 1280 y 390): limpio, desborde 0 · Servicios con CPU ×4: 57 fps · capturas `../savvia-web/tools/shots/r132-*`.
- **Pendiente de Andoni:** aficiones y gesto; el rótulo «Qué incluye»; la columna «Tipo» del handbook (de Nilo); el título de capítulo alineado a la izquierda; la punta de la zapatilla de Andoni no se difumina al mirar a Eric; la escena sentado en invierno; no publicado ni subido.

### Ronda 133 · 2026-10-08 · Servicios a elegir con cursor que marca, caras sobre claro, invierno desnudo, el relieve que se siente y pasar página en el Handbook (en local, rama `main`)
- **Andoni (textual, resumido):** 1 «que puedas seleccionar cuál quieres y que la card cambie los checks; un cursor que los va marcando con sonidito de click; los checks se rellenan animadamente» · 2 «las caras en círculo con fondo muy oscuro: modificar ese fondo» · 3 «en invierno menos hojas aún, más tronco y ramas» · 4 «en manifiesto, al pasar el ratón por el árbol con relieve, como si pasases la mano y pudieras sentirlo» · 5 «en el handbook, al cambiar de página que parezca que pasas de página, como un libro» · 6 los CTAs (falta la captura de Andoni).
- **Hecho:** · `Servicios.astro`: sin escena fija; selector de las tres formas (aria-pressed, flechas) + tarjeta; un CURSOR SVG recorre los puntos, pulsa con `clic()` (0,032) y el aro se llena de tinta desde la punta y se dibuja el check; desmarca rápido lo que sobra; arranca al verse. · Caras: `cara-{eric,andoni}.webp` rehechas desde los recortes transparentes sobre Rosa niebla (las anteriores en `tools/r133/`); fondo de los círculos en `Preguntas` y `Pie` a niebla. · Invierno: `arbol-invierno.webp` regenerada sin follaje (`tools/r133-invierno-desnudo.py`, del 44 % al 14 % de tinta; original en `tools/retirados/`) y en `estela.ts`, con raleo 1, sin deshacer en puntos y semitono −75 %. · `/manifiesto`: luz rasante que sale de la mano (radio ~180 px), relieve que se marca bajo la palma, inercia 0,12 y relajación en 0,8 s; sin bucle en reposo. · Handbook: `PasarPagina.astro` — transición nativa entre documentos solo en el handbook: la hoja se dobla por un pliegue que cruza (adelante por la derecha, atrás por la izquierda), dorso y sombras por WAAPI, `papel()` muy bajo; `transicion.ts` deja pasar esos enlaces si hay soporte (si no, la gota de siempre).
- **Medido:** `astro check` 0 · `tools/verify.cjs` en /, /?estacion=invierno, /manifiesto, /handbook, /handbook/principios, /proyectos y /lab (Chrome y WebKit, 1280 y 390): limpio, desborde 0 · manifiesto con la mano, CPU ×4: 60 fps · capturas `../savvia-web/tools/shots/r133-*`.
- **Pendiente de Andoni:** la captura de los CTAs primario y secundario; ¿alguna hoja seca visible en invierno?; en móvil, ¿bajar sola a la tarjeta de Servicios al elegir?; no publicado ni subido.

### Ronda 134 · 2026-10-08 · CTAs de la referencia en toda la web, caras de las FAQ sobre Salvia, Servicios en las guías y el Handbook que se lee a gusto con modo lectura (en local, rama `main`)
- **Andoni (textual):** 1 «CTAs de este estilo, aplica a todo» (captura: píldora llena, mayúsculas espaciadas, flecha fina; secundario solo texto y flecha, apagado en gris) · 2 «las caras en FAQs, un fondo de color pero no tan oscuro como teníamos» · 3 «en servicios aprovechar las guías: la card y los servicios entre líneas que unen las guías, con las + en los extremos» · 4 «el handbook tiene demasiado ruido entre los 2 menús laterales… que dé gusto leerlo; y un modo focus».
- **Hecho:** · CTA (`global.css` + `src/components/Cta.astro`; fuera `cta.ts` y la gota): `.btn-primary` píldora Coral llena con texto Cacao, Areal 400 en mayúsculas (0,07em), flecha fina larga `.btn-flecha` que avanza al pasar; `.btn-secondary` solo texto + flecha, subrayado que crece; `.apagado`; `.btn-sm`. Aplicado en la ficha sentado, el caso (`Ver la web` primario, `← Proyectos`), la paginación de /proyectos, el Lab, la carga, la píldora del pie y «Empezar a leer» del Handbook (secundario). Regla: un primario por sección. · FAQ: recortes transparentes (`cara-*-transparente.webp`) sobre Salvia #96BFE6. · Servicios: filas de `data-carril-fila` arriba y abajo (Carriles dibuja líneas y cruces), divisor vertical con cruces, tarjeta sin caja. · Handbook: columna de 43rem centrada (66ch, 18→19 px, 1,65), sin filetes entre apartados, bloques sin bordes fuertes; índice izquierdo al 62 % con solo el capítulo actual abierto; riel derecho fino al 38 %; MODO LECTURA (botón «Modo lectura · F», Esc, `savvia:hb-lectura`) que deja solo el texto a 21 px.
- **Medido:** `astro check` 0 · `tools/verify.cjs` en /, /proyectos, /proyectos/kuanta, /lab, /manifiesto, /handbook, /handbook/la-receta y /?estacion=invierno (Chrome y WebKit, 1280 y 390): limpio, desborde 0 · cruces de Servicios sobre los carriles (±1 px) · capturas `../savvia-web/tools/shots/r134-*`.
- **Pendiente de Andoni:** ¿un CTA primario en la home?; en las páginas secundarias la barra (logo y menú) no tiene fondo y se monta sobre el texto al bajar; no publicado ni subido.

### Ronda 135 · 2026-10-08 · la flecha de la casa, CTAs con barrido, anterior/siguiente en recuadro, webs reales en el monitor, la carga siempre y la 404 «Bajo tierra» (en local, rama `main`)
- **Andoni (textual):** 1 «una flecha especial como en el ejemplo; que al hacer hover se anime; en primarios el cambio de color animado smooth» · 2 «los cambios de capítulo del handbook en un recuadro, como antes; el hover muy smooth» · 3 «unificar el lenguaje de CTA y flechas en todos lados» · 4 «multiverse, zernio y neety tienen que tener su página real en la vista en detalle» · «recupera la animación de carga siempre» · «haz una pantalla de 404 original que pegue con savvia».
- **Hecho:** · `src/lib/flecha.ts` (nuevo): astil fino con tres cabezas (punta, eco y la grande con alas), 24×16, trazo 1,25; direcciones der/izq/abajo/arriba/fuera; al pasar sale por delante y entra una copia por detrás (0,5 s, una regla en `global.css`). Primario: baño de Coral claro que entra desde la izquierda (0,6 s, solo transform). Aplicada en carga, pie, paginación, caso («Siguiente proyecto» en Coral), handbook (tarjetas, bloques, índice, «Volver arriba»), testimonios y envío de las FAQ. · Handbook: anterior/siguiente vuelven en dos tarjetas con hover de 0,6 s. · Monitor sentado: Kuanta → multiverse-home.vercel.app y Arkdev → zernio.treseiscero.app en iframe (sin x-frame-options); el rótulo de carga dice savvia.studio (`dominio`); Neety sigue con captura (x-frame-options SAMEORIGIN en todas sus direcciones). · La carga sale en cada visita (`Base.astro`; `?carga=0` la salta; las pruebas automatizadas con la clave, también). · `src/pages/404.astro` «Bajo tierra»: línea de suelo con cruces, las raíces de la estación pintadas con el motor creciendo hacia abajo, una gota que cae de la raíz y no encuentra suelo cada 7 s, «Esta página no ha echado raíces.» y dos CTAs.
- **Medido:** `astro check` 0 · `tools/verify.cjs` en /, /proyectos, /proyectos/kuanta, /lab, /manifiesto, /handbook, /handbook/la-receta y /?estacion=invierno (Chrome y WebKit, 1280 y 390): limpio, desborde 0 · 404: el único «bad» es el propio 404 · capturas `../savvia-web/tools/shots/r135-*`.
- **Pendiente de Andoni:** Neety necesita quitar `x-frame-options` para salir en vivo; Zernio enseña su barra de pruebas «HERO · A·Código / B·Esquema»; la flecha en diagonal se lee algo menos limpia; raíces de la 404 pequeñas en móvil; no publicado ni subido.

### Ronda 136 · 2026-10-08 · flecha sutil, sin subrayados, CTA líquido, miniaturas reales, la 404 «El corte», reel nuevo con HyperFrames y la foto del capítulo 1 (en local, rama `main`)
- **Andoni (textual):** «no me gustan las flechas, tiene que ser algo mucho más sutil, y al hacer hover en ciertos sitios se subrayan textos: eso no me gusta» · «el cambio de color en los CTAs, como un líquido que se expande desde donde entra el cursor» · «en proyectos destacados las miniaturas que vemos antes de entrar no corresponden a la web» · «la 404 no me gusta, trabajémosla más» · «el reel, algo mejor ahora que tenemos HyperFrames y plantillas» · «en el handbook, Qué es savvia, ponemos la foto que te paso».
- **Hecho:** · `flecha.ts`: «→» fina (trazo 1,15), al pasar un empujón de 2,5 px. · `cta-liquido.ts` + `.btn-primary::before`: mancha de Coral claro que nace en el punto de entrada (canto irregular, 0,7 s) y se recoge hacia la salida; desde el centro con teclado. · Fuera los subrayados al pasar (secundario, `.link:hover`, handbook anterior/siguiente, migas, obras, `.link-hb`, correo, «Siguiente proyecto», nombres del Estudio, «Sentarse» y «Ver» en Proyectos). · Miniaturas de pie (`/media/proyectos/<slug>.webp`) recapturadas de las webs reales (originales en `tools/retirados/proyectos-r136/`). · 404 «EL CORTE» (`src/pages/404.astro`, `src/components/404/Corte.astro`): 404 como duramen de una rodaja de roble (campo de distancia de la fuente Family, WebGL2), el cursor es un nudo que dobla la veta, «toca madera» manda un pulso de savia anillo a anillo; por estación; en reposo no pinta. · Reel r136 (`../savvia-web/tools/r136-reel/`, HyperFrames, 29,4 s, «Distant Miles»): gota que abre Kuanta, tres navegadores 3D, titular, ráfaga de 8 planos, Remerge en móvil, rejilla 3×3 con corte casado, pantalla partida, la mesa por estaciones, cierre con el logotipo; `reel.mp4` 9,2 MB, `reel-mini.mp4` 371 KB; píldora «0:29». · Handbook cap. 1: la foto de Andoni (`public/media/handbook/eric-andoni.webp`).
- **Medido:** `astro check` 0 · `tools/verify.cjs` en /, /proyectos, /lab, /handbook, /handbook/que-es-savvia, /manifiesto y /?estacion=invierno (Chrome y WebKit, 1280 y 390): limpio, desborde 0 · 404: solo el propio estado 404 · reel: −16 LUFS, sin fotogramas negros, sin marcas antiguas · capturas `../savvia-web/tools/shots/r136-*`.
- **Pendiente de Andoni:** de pie, Kuanta y Arkdev enseñan las webs reales (Multiverse, Zernio); la raya fija bajo la página activa / filtro de /proyectos; no publicado ni subido.

### Ronda 137 · 2026-10-08 · CTAs en Cacao con la flecha que se dibuja, tarjetas del handbook que se llenan, la V de la carga sin clic, la 404 «El tiempo encima» y los gestos de Eric y Andoni (en local, rama `main`)
- **Andoni (textual):** 1 «la 404, el 404 en grande y según la estación se le acumula algo encima: invierno nieve, otoño hojas, primavera flores y verano le da el solete» · 2 «los CTAs no en coral: en el color más oscuro y pasan a uno más claro al hacer hover; la flecha se anima, se dibuja» · 3 «las cards para cambiar de capítulo del handbook se rellenan como los CTAs» · 4 «al dibujar la V inicial, que funcione con el hover» · 5 «nueva secuencia de andado y otra al hacer hover: Andoni tira a canasta, Eric hace un revés de tenis».
- **Hecho:** · `.btn-primary`: Cacao #302018 con texto niebla (12,6:1) → Nogal #63402f con el líquido desde la entrada del cursor (6,9:1); en oscuro, filo de tinta al 34 % (`--btn-filo`); foco en `--fg`. `flecha.ts`: tres trazos con `pathLength` que se dibujan al pasar (astil 0,3 s + alas desde 0,22 s). Tarjetas anterior/siguiente del handbook con `data-liquido`. Píldora del pie a Nogal. · `Cargador.astro`: el rastro sigue al ratón sin clic (se seca a 1,6 s, se corta tras 0,45 s quieto); pista «Basta con mover el ratón.» / «Arrastra el dedo.»; revierte la regla de la ronda 83. · 404 «EL TIEMPO ENCIMA» (`src/components/404/Cuatro.astro`; «El corte» queda sin uso): 404 enorme en Family; la nieve cuaja en los hombros de las cifras, las hojas se posan y amontonan, las flores brotan por los cantos que dan al cielo, el sol entra con la sombra de las cifras y motas; máscara de celdas de 2 px de la fuente real y capa acumulada; el bucle se para al posarse. · Estudio: tiras `andoni-anda.webp`/`eric-anda.webp` y pose `juntos-r137.webp` del tablero de Andoni; gestos `andoni-canasta-01…08` y `eric-reves-01…08` en el gancho `gesto` (11 fps, una vez por pasada).
- **Medido:** `astro check` 0 · `tools/verify.cjs` en /, /proyectos, /lab, /handbook, /handbook/la-receta y /?estacion=invierno (Chrome y WebKit, 1280 y 390): limpio, desborde 0 · 404 en las cuatro estaciones: solo el propio 404 · gesto de Andoni comprobado fotograma a fotograma (con-gesto → pose) · capturas `../savvia-web/tools/shots/r137-*`.
- **Pendiente de Andoni:** fotogramas a más resolución (figuras de ~245 px); la flecha grande de «Siguiente proyecto» sigue en Coral; aficiones; no publicado ni subido.

### Ronda 138 · 2026-10-08 · CTAs por estación, rayo de verano, caras casi del fondo, Eric y Andoni con fotogramas grandes, titular del estudio, handbook en lista, Manifiesto, slider de destacados y el reel que construye (en local, rama `main`)
- **Andoni (textual, resumido):** «los CTAs sobre fondo oscuro se tienen que adaptar a las estaciones» · «en la 404 de verano el rayo tiene un corte raro por arriba; más sutil» · «el fondo de nuestras caras en FAQs, más claro aún, casi como el fondo pero que se note» · «más aire abajo al terminar de andar» · «el titular del estudio, con el tamaño del resto» · «los capítulos del handbook como antes, sin iconos y sin cards» · «en el reel, que las webs se construyan y se animen: el desarrollo agéntico dentro de cada web» · «te paso los fotogramas a mayor calidad» · «¿manifesto o manifiesto? la correcta en todos lados» · «destacados de portfolio: cambiar Playground por uno con móvil, y un slider» · aficiones (Andoni: baloncesto, videojuegos, café en casa; Eric: tenis, naturaleza, música).
- **Hecho:** · `global.css`: en lo oscuro `--btn-fondo` = `--arbol` + 40 % negro y `--btn-bano` = + 24 % (otoño cobre, primavera ciruela, verano musgo; invierno Cacao→Nogal); vira con la estación. · 404 verano (`Cuatro.astro`): el haz entra fundido desde arriba y a mitad de intensidad. · FAQ: `--cara-fondo` = niebla 72 % + salvia. · «Manifiesto» en el menú (era la única «Manifesto»). · Estudio: fotogramas del pack 4× (ciclo de andar de 6 + giro; canasta 17 y revés 16), pose final con el fotograma 1 de cada gesto (`juntos-andoni/eric.webp`; la 05 venía rota), escena mayor, paseo que acaba al 70 % con margen `max(48px, 36lvh − relleno)`, titular `text-h1`, aficiones reales. · Handbook: lista de ocho filas, sin glifos ni tarjetas. · /proyectos: Remerge (teléfono) sustituye a Playground en destacados; SLIDER de una fila (alto `clamp(20rem, 58lvh, 38rem)`, un paso por pieza, 01→04, flechas). · Reel r138 (`../savvia-web/tools/r138-reel/`, 36,5 s): cinco webs se construyen en su pantalla (retícula, orden al agente, cajas medidas, cursores Claude/Codex/Diseño con fichas, «✓ publicado») antes de su grabación; píldora «0:36».
- **Medido:** `astro check` 0 · `tools/verify.cjs` en /, /proyectos, /handbook, /lab y /?estacion=invierno (Chrome y WebKit, 1280 y 390): limpio, desborde 0 · reel −16 LUFS, sin negros · capturas `../savvia-web/tools/shots/r138-*`.
- **Pendiente de Andoni:** fotogramas exportados uno a uno (para el ciclo de andar completo); la píldora del «Contáctanos» con el color de estación sin mirar abierta; hueco a la derecha al final del slider; la flecha Coral del handbook y de «Siguiente proyecto»; no publicado ni subido.

### Ronda 139 · 2026-10-08 · isotipo con raíces, slider y paginación mínimos, CTAs más estrechos, 404 con una sola flecha, CTA de otoño más hondo y revisión de los fotogramas (en local, rama `main`)
- **Andoni (textual):** «en portfolio, las flechas del slider más sutiles, y la paginación más moderna y minimalista» · «los CTAs algo más estrechos; en la 404 la flecha solo en el CTA principal» · «actualizar el isotipo en todos lados a este que te paso» (`~/Desktop/savvia-isotipo.svg`, v con dos raíces) · «te paso nuestros frames mejor, revisa que estén bien» (`savvia_frames_production_test.zip`) · «en otoño el CTA, que sea más oscuro».
- **Hecho:** · Isotipo nuevo (`tools/r139/isotipo.cjs`): `savvia-isotipo.svg` (viewBox 10 7 552 657), `savvia-logo.svg` 1170 × 439 (proporción actualizada en Nav, Agentic, Proyectos, LaReceta y la transición), favicon y `apple-touch-icon.png` (`?v=139`); la carga dibuja la v con la gota y luego brotan las dos raíces (99,4 % cubierto) y vuela al sitio exacto en la barra. · /proyectos: flechas del slider sin círculo (al 50 %, 100 % al pasar); contador y paginación con el mismo sistema «← 01 / 04 →» en mono. · `.btn-primary` relleno 22/18 px y hueco 0,6 em; `.btn-sm` 16/12. · 404: «Ver proyectos» sin flecha. · Otoño: `--btn-fondo` árbol + 58 % negro, `--btn-bano` + 40 %. · Fotogramas del pack: REVISADOS Y DESCARTADOS (intermedios con trozos de la figura vecina, agujeros en los vaqueros, halos blancos con píxeles de color y ampliados ×7 desde ~245 px; solo las dos poses finales de la foto son buenas). Hoja en `../savvia-web/tools/shots/r139-frames-revision.jpg`.
- **Medido:** `astro check` 0 · `tools/verify.cjs` en /, /proyectos, /handbook y /?estacion=invierno (Chrome y WebKit, 1280 y 390): limpio, desborde 0.
- **Pendiente de Andoni:** vídeo real en 4K para la caminata y los gestos (o poses generadas una a una); ¿volver mientras tanto a los fotogramas de la ronda 132?; la imagen para compartir lleva el logotipo antiguo; en las páginas claras la barra se monta sobre el texto al bajar; a 16 px el favicon funde el gancho con la raíz; no publicado ni subido.

### Ronda 140 · 2026-10-08 · Eric y Andoni con sus poses reales a resolución completa, el logo que invierte lo que pisa en toda la web y la imagen para compartir nueva (en local, rama `main`)
- **Andoni (textual):** «Sí, haz la imagen para compartir en redes de nuevo» · «Hacemos que el logo tenga ese efecto que cambia de color según el fondo o color que toca, como hemos hecho en lab; eso aplica en toda la web» · «Aquí van los fotogramas» (`savvia-fundadores-fuentes-extraidas.zip`: las poses originales, masters 600×1000 y `reposo-conjunto.png` 1200×1000, sin gestos).
- **Hecho:** · Estudio: tiras `andoni-paso-r140.webp`/`eric-paso-r140.webp` (4 pasos + llegada, de los masters, sin ampliar) y `juntos-r140.webp` (la pose conjunta original); montaje de la ronda 132 (celda = alto × 0,6, final × 1,2, centros 477,253 / 705,270, llegada al 93 %, fundido 96,5–100 %); celda `clamp(16rem, 38vw, 31rem)`; puntos re-medidos; `gesto: []` (los gestos generados de las rondas 137–138, retirados a `tools/retirados/equipo-r139/`). · Nav: la barra entera en `mix-blend-mode: difference` con `--nav-tinta: #fff0e4` (blanco cálido: sobre la noche de otoño da gris neutro, no el azul pálido rechazado en la ronda 65; sobre lo claro, casi negro); fuera `html.sobre-claro`/`sobre-escena`; con el menú abierto, sin mezcla; /lab ya no lleva reglas propias. **Excepción consciente a «Rechazado — la mezcla por diferencia en la barra» (ronda 65), pedida por Andoni.** · `public/og.jpg` rehecha con el logotipo nuevo (`tools/r140-og.cjs`), `?v=140`.
- **Medido:** `astro check` 0 · `tools/verify.cjs` en /, /proyectos, /lab y /?estacion=invierno (Chrome y WebKit, 1280 y 390): limpio, desborde 0 · colores del logo medidos por superficie (tabla en el informe) · capturas `../savvia-web/tools/shots/r140-*`.
- **Pendiente de Andoni:** sobre el cielo de la mesa (tono medio) el logo pierde contraste; el isotipo de la carga llega en Rosa niebla y en la barra queda gris cálido; el paso de 4 poses se ve escalonado; gestos cuando haya vídeo; no publicado ni subido.

### Ronda 141 · 2026-10-08 · la barra vuelve a color sólido (la diferencia, solo en /lab) con detección por luminancia, y Eric y Andoni con 48 poses (en local, rama `main`)
- **Andoni (textual):** «sí, en el marrón se veía azul; me gustaría que se viera con el color claro en el marrón y en el resto de fondos oscuros; solo aplicamos ese efecto en lab; y cerciorarse de que los cambios de color vayan bien siempre» · «aquí están todas las poses» (`savvia-poses-reconstruidas.zip`: 48 poses, 12 por serie, 480×520, figuras de ~330–475 px).
- **Hecho:** · `Nav.astro`: sin mezcla; Rosa niebla y Cacao con `html.sobre-claro`, decidido por la LUMINANCIA REAL bajo el logo (6 puntos, mediana, umbral 0,18; lee colores con alfa/oklab, degradados, pseudo-elementos, imágenes/vídeos/pósters reducidos a 256 px, la captura del monitor en lugar del iframe, la gota líquida `__subeEn`); una muestra cada ≤ 90 ms + repaso cada 700 ms; regla de primer fotograma para páginas claras; `[data-nav]` con `transition: color .3s`. Sobre el cielo de la mesa sale en Cacao (antes, claro: 1,3–2,2:1). `lab.astro`: blanco + `difference` solo ahí. Prueba `../savvia-web/tools/r141-barra.cjs` (contraste < 2,5:1 = fallo) por página, estación y tamaño: de 9/2/2/9 (escritorio) y 20/10/12/10 (móvil) en la home a 0/1/0/0 y 3/2/3/4, el resto 0–1 (piezas entrando, vídeo bajo el logo). · Estudio (`tools/r141-equipo/montar.cjs` → `public/media/equipo/r141/`): paseo de 12 poses (1–9 en ciclo cada 42 px andados, giro 10–12 del 90 al 95,5 %, fundido a la foto real del 96,5 al 100 %), escala y posición ajustadas por solape con la foto (cara ×4); gestos de 12 fotogramas a 11 fps con fundidos de 120 ms desde y hacia la foto, terminan aunque se vaya el puntero; `--ch: clamp(16rem, 34vw, 26rem)` (0,85–1,1× nativo); sonda `__gesto(i, f)`.
- **Medido:** `astro check` 0 · `tools/verify.cjs` en /, /proyectos, /handbook, /lab y /?estacion=invierno (Chrome y WebKit, 1280 y 390): limpio, desborde 0 · capturas `../savvia-web/tools/shots/r141-*`.
- **Pendiente de Andoni:** la barra sobre el cielo de la mesa en Cacao (¿o claro como antes?); el ligero doble de piernas de Andoni en el fundido a la foto; caras algo blandas en las poses; no publicado ni subido.

### Ronda 142 · 2026-10-08 · hover de Eric y Andoni sin dobles, la luz de la esquina, la foto del capítulo 1 · PUBLICADA (rondas 125–142)
- **Andoni (textual):** «el hover en cada uno: que no se reproduzcan los 2 en la intersección; Eric se reproduce cuando dejas de hacer hover también» · «se ve en la esquina inferior un raro de luz» · «la foto del handbook del capítulo 1, que no se le corte la cabeza a Eric» · «después de esto publica en savvia.studio».
- **Hecho:** · `Estudio.astro`: una sola persona activa, decidida por `quienEn(x, y)` en `.juntos` (frontera al 46 % entre los pechos, ±1,5 %; la llamada cuenta como de su persona); solo un cambio de persona abre o cierra; salir no arranca nada; si el primero aún dura, el segundo espera a que se funda. Antes 73/63 muestras con los dos a la vez y 3 arranques al salir (Chrome/WebKit) → 0 y 0 (`../savvia-web/tools/r142-equipo-hover.cjs`). · `Pie.astro`: el haz `.luz-pie` subía por encima de las preguntas porque `--arriba` se quedaba con su último valor al volver del pie; ahora se limita al alto de la sección anterior y vale 0 fuera de la vista. · Handbook cap. 1: la foto con `object-position: 50% 8%`. · `.gitignore`: el enlace `node_modules` y las fuentes pesadas de los fotogramas (`tools/r138-equipo/`, `tools/r14x-equipo/fuente/`, `*.npy`) quedan fuera.
- **Medido:** `astro check` 0 · `astro build` 23 páginas · `tools/verify.cjs` (ver la publicación).
- **PUBLICADA (08/10) en https://savvia.studio:** commits `ce60bee` (rondas 125–142) y el arreglo de la textura del Manifiesto (el `url(#f)` dentro del data URI se rompía en la build y pedía `/%23f` → `public/media/manifiesto/fibras.svg`). Medido EN VIVO: `tools/verify.cjs` en /, /proyectos, /manifiesto, /lab, /handbook y /handbook/que-es-savvia (Chrome y WebKit, 1280 y 390): limpio, 0 ≥ 400, desborde 0 · la 404 responde 404 · `og.jpg?v=140` 200 · /musica sigue en 200. Sigue `noindex`.

### Ronda 143 · 2026-10-08 · la v de la carga sin el mordisco del gancho · PUBLICADA
- **Andoni (textual):** «en la animación de carga la v a la izquierda tiene un pequeño desperfecto, antes de que salga el brote».
- **Causa:** la plumada de la gota (trazo de 56 con punta redonda) destapaba también la base de la raíz izquierda bajo el gancho: aparecía una mancha suelta con una rendija oscura (en el diseño la raíz y el gancho están separados por una línea).
- **Hecho (`Cargador.astro`):** la v (`ISO_V`) y las raíces (`ISO_R`) en dos trazos con máscaras distintas: la plumada solo destapa la v; las raíces, solo sus trazos (la izquierda arranca en 186·290 con trazo de 52 y la de arriba con 40: cubren el 100 % de su forma).
- **Medido:** fotogramas a DPR 3 (`../savvia-web/tools/shots/r143-isov-zoom-despues.jpg`): gancho limpio hasta el brote · `astro check` 0 · `tools/verify.cjs` en / limpio · `tools/r137/carga-hover.cjs` (Chrome, WebKit, dedo) sin errores.

### Ronda 144 · 2026-10-09 · el feedback de Eric (vídeo del 8/10) + las decisiones de Andoni (en local)
- **Fuente:** vídeo de Eric (https://screen.studio/share/BPQmHaY6, 20 min), transcrito en local y cruzado con fotogramas → `docs/feedback-eric-8oct.md` (35 puntos con minuto).
- **Andoni (textual):** «1. Logotipo tocamos nosotros, de momento vuelve a un estado anterior · 2. Carga volvemos al círculo · 3. [lo de pulso] se refiere a la ilustración animada del
  problema 1, enriquecerla · 4. un acento para cada estación; y montar un brandbook como este [x.com/marcelkargul, kargul.studio] · 5. los logos de Más proyectos, que todos tengan siempre
  el mismo tamaño · 6. los CTAs, todos con el formato de la vista en detalle: la barra de cambiar de proyecto, como cristal, todos ese estilo; y las flechas como las de ahí en todos lados ·
  7. el portfolio: organizar la información para que parezca ordenado, es lo más importante».
- **Hecho:**
  · **Logotipo:** vuelve el de naturaleza (commit f413aed): `savvia-logo.svg` 1184 × 439, `savvia-isotipo.svg` 370 × 439 (sin raíces), favicon y apple-touch `?v=144`; proporción en barra, Agentic, Proyectos, receta.
  · **Carga (`Cargador.astro`):** «Dibuja un círculo.» (giro ≥ 342°, radio ≥ 18 px, redondo) en vez de la V; la gota dibuja el isotipo de naturaleza (su eje de la ronda 83) y vuela a la barra.
  · **Portfolio · caso (`proyectos/[slug].astro`, antes en `tools/r144/slug.r143.astro.txt`):** retícula en TERCIOS: todo bloque ocupa 1/3, 2/3 o el ancho; textos en «título 1/3 + texto 2/3»
    (El reto · Color · Tipografía · La web, sección a sección · apartados · Por dentro); filas de medios de 1, 2 o 3 con la misma proporción; ficha en dos columnas con valores a tamaño de interfaz;
    fuera el punto coral de la frase; nombre algo más pequeño.
  · **Portfolio · listado (`proyectos/index.astro`, antes en `tools/r144/index.r143.astro.txt`):** titular más pequeño; el slider de destacados termina en el último (cada pieza con su parada, sin hueco
    final) con la barra de cristal «‹ 01/04 Nombre ›»; «Todos los proyectos» con buscador de verdad y «Filtros» (CTA de cristal con recuento) en la misma línea; filtros de Servicio, Sector, PAÍS y
    TECNOLOGÍA (los de Webflow) como etiquetas; rejilla de 3 (9 por página); paginación en barra de cristal.
  · **CTAs y flechas (global.css, `lib/flecha.ts`; antes en `tools/r144/`):** `.btn-primary` = píldora de CRISTAL (velo de la noche al 58 %, desenfoque 22 px, filo claro, sombra), Areal 500 sin
    mayúsculas; al pasar, la niebla la llena como líquido y el texto pasa a Cacao. La flecha de la casa es un CHEVRÓN «›» (trazo 1,6). Nueva `.barra-cristal` (.paso + .cual) para sliders, páginas y testimonios.
  · **Acento por estación (global.css):** `--color-coral` = primavera #FF7FAE (cerezo) · verano #A6D96A (hoja nueva; Eric) · otoño #FF616B · invierno #D42C40 (acebo).
  · **Brandbook (`src/pages/brandbook.astro`, en el menú bajo Handbook):** índice lateral fijo + columna: logotipo, color, las estaciones, tipografía, voz, componentes, textura y movimiento, aplicaciones.
  · **Problema 1 (`TarjetaPaso.astro`):** onda de voz de 34 barras que se tiñe de savia cuando contesta el cliente; las respuestas se escriben con su idea clave subrayada; «brief.md · 3 claves guardadas».
  · **Más proyectos:** logotipos a la misma altura (1,75 rem); testimonio con la barra de cristal ‹ 01/03 › y el retrato y la cita a la vez (1,6 s, la cita espera al retrato).
  · **Eric:** invierno sin hervor ni destellos y sin la trama de puntos del recuadro · icono de estación a trazo fino · tic de Servicios 1,4 · Neety en savvia agentic con su degradado y grano ·
    etiquetas de los lados a 13 px · Eric y Andoni aparecen directamente (sin paseo) y Andoni salta en el tiro · aficiones de Eric «Deporte · Naturaleza · Música» · Manifiesto en tres párrafos seguidos.
- **Medido:** `astro check` 0 · `tools/verify.cjs` en /, /proyectos, /proyectos/neety, /proyectos/remerge, /manifiesto, /brandbook, /handbook, /lab (Chrome y WebKit, 1280 y 390): consola limpia, 0 ≥ 400,
  desborde 0 · `tools/r144/circulo.cjs` (Chrome y WebKit) · `tools/r144/listado.cjs` (slider 01→04 sin saltos; filtro España → Invopop e Isotrol) · capturas en /tmp/r144-*.
- **Pendiente:** el logotipo nuevo (lo hacen Andoni y Eric) · Eric: el pase con el pie (hacen falta fotogramas nuevos; sigue el revés) · el reel (recortarlo a los 3 primeros y otro titular: re-render
  en HyperFrames) · el subtítulo del hero ya está en Areal 400 (no hay peso menor en el archivo) · las ~40 webs del portfolio (faltan sus medios) · no publicado.

### Ronda 144 (2.ª) · 2026-10-09 · sonido más sutil, Contáctanos de cristal, barra única de búsqueda, casos con aire, isotipo único y brandbook ampliado (en local)
- **Andoni (textual):** «1. al hacer hover, sonido mucho más sutil · 2. en proyectos destacados, el ambiente bastante más bajo por defecto · 3. lo que sale al pasar por Contáctanos,
  con efecto cristal, sin color sólido · 4. buscador y filtros más integrados con el fondo, en la misma barra · 5. los testimonios del caso, mucho más pequeños y sin cambio de
  color; si tienen vídeo, lo indicamos · 6. el siguiente proyecto, con las cards del handbook, anterior y siguiente · 7. los casos, como athleticsnyc.com/work/salesforce: toda
  la info con mucho aire · 8. los botones del slider de testimonios, a la derecha de los nombres, pegados a la guía derecha y mimetizados · 9. brandbook: el isotipo de la
  carga es distinto al resto; la construcción del logotipo con sus curvas; el color por estaciones y que el brandbook pase por ellas; todos los componentes; toda la textura y el movimiento».
- **Hecho:** tecla al pasar 0,022 → 0,008 · ambiente de Proyectos 0,09 → 0,035 · `.cta-pastilla` (pie) en cristal (velo de la noche al 42 % + desenfoque 22 px, sin relleno de Nogal,
  texto 500 sin mayúsculas) · `/proyectos`: buscador y Filtros en UNA barra con filete y separador · casos (`[slug].astro`, antes en `tools/r144/slug.r144a.astro.txt`): la referencia
  medida (texto a un solo tamaño 18–21 px, encabezado pequeño + hueco + párrafo en media retícula alternando, medios a lo ancho, 96–160 px entre bloques, sin filetes); el nombre con
  la idea en gris debajo; la cita pequeña en el papel (y botón «Ver el testimonio en vídeo» si `cita.video`); anterior/siguiente con las tarjetas del handbook · testimonio de la home:
  barra sin velo, filete de las reglas, a la derecha del nombre · ISOTIPO ÚNICO: `savvia-isotipo.svg` = el primer trazo del logotipo (viewBox 6,39 6,44 469,69 × 425,38; el de la ronda
  83, en `tools/r144/savvia-isotipo.r83.svg`); la carga lo dibuja con su eje medido por esqueleto (skeletonize) y lo encaja en su sitio exacto del logotipo · BRANDBOOK: construcción
  (contorno, 142 anclas, 228 manejadores, línea base, altura de x, ascendentes; se dibuja al llegar) · cuatro paneles de estación a sangre con su roble y su paleta (noche, noche
  honda, roble, savia, tinta): al pasar, la página entera cambia de estación (`fijarEstacion`) y vuelve a la de hoy · componentes (botones, barra de cristal, buscador y filtros,
  tarjetas anterior/siguiente, píldora de estado, check, botón del menú) · textura y movimiento (grano, semitono, carriles, curva expo, palabras que suben, enfoque, gota entre
  secciones, papel rasgado, líquido, la gota de la carga, la onda de voz, las estaciones).
- **Medido:** `astro check` 0 · `tools/verify.cjs` en /, /proyectos, /proyectos/kuanta, /proyectos/cubbo, /brandbook (Chrome y WebKit, 1280 y 390): limpio, 0 ≥ 400, desborde 0 · brandbook:
  primavera #ff7fae → verano #a6d96a → otoño #ff616b → invierno #d42c40 al pasar, y vuelta a otoño al salir · `tools/r144/circulo.cjs`: la carga dibuja la v del logotipo y encaja.

### Ronda 144 (3.ª) · 2026-10-09 · estaciones vivas en el brandbook, acento glaciar, casos en tres columnas, tooltips y la hoja con nervios · PUBLICADA
- **Andoni (textual):** «1. en brandbook, color y estaciones, que los colores cambien con la estación; otro acento para invierno que pegue mejor que el rojo · 2. testimonios de la
  home: los botones debajo del nombre y solo las flechas, sin número ni card · 3. case studies: arriba hay demasiada información; la parte de la derecha, más sutil o reducida; los
  controles de cambiar de proyecto atados a las guías de izquierda y derecha, que nazcan de ahí y se junten en el medio; todo en 3 columnas: el titular de las explicaciones siempre a
  la izquierda del todo y los textos jugando en esas columnas con bastante aire · 4. al pasar por los iconos de estación no sale el tooltip; la hoja de otoño, con más detalle» ·
  «después de esto publica, que quiero enseñárselo a Eric».
- **Hecho:** acento de invierno = azul glaciar #4F8AD6 (antes acebo #D42C40) · brandbook: UNA escena fija durante cuatro pantallas: al bajar avanza la estación y cambian fondo,
  roble (la primavera, virada a cerezo), paleta (las muestras leen los colores de la página) y valores; la página entera la sigue y vuelve a la de hoy al salir · testimonio de la
  home: dos flechas solas bajo el nombre · casos (`[slug].astro`, antes en `tools/r144/slug.r144b.astro.txt`): arriba solo nombre + idea + entradilla y una línea pequeña con
  servicios, sector y lugar (herramientas y cifras bajan a «Por dentro»); retícula en TRES columnas: el titular de cada bloque en la primera (y se queda pegado al bajar), los
  textos en la segunda, la tercera o las dos, en escalera; «El proyecto» con el contexto; anterior/siguiente = una franja a lo ancho del contenido partida en dos, cada mitad nace
  de su guía y se encuentran en un filete central · tooltips: el icono de la barra, píldora clara «otoño · cambiar» bajo el icono; en el abanico de Proyectos, el icono que se mira
  sube por encima de sus vecinos · la hoja de otoño con nervio central y cuatro laterales (barra y abanico; `formas-estacion.ts › NERVIOS_HOJA`).
- **Medido:** `astro check` 0 · build OK · `tools/verify.cjs` en /, /proyectos, /proyectos/kuanta, /proyectos/remerge, /brandbook, /manifiesto, /handbook, /lab (Chrome y WebKit, 1280 y 390):
  limpio, 0 ≥ 400, desborde 0 · brandbook: primavera → verano → otoño → invierno (#4f8ad6) al bajar.

### Ronda 144 (4.ª) · 2026-10-09 · la hoja, sencilla, y sin rótulos al pasar · PUBLICADA
- **Andoni (textual):** «el icono de otoño nuevo no me gusta, más simplificado; y cuando hagas hover en estos iconos no quiero que salga nada de info».
- **Hecho:** fuera los nervios de la hoja (barra y abanico; vuelve la hoja lisa de la ronda 67) · fuera el rótulo al pasar en el icono de la barra y en los del abanico de Proyectos
  (estaciones y sonido); el nombre sigue en `aria-label`.
- **Medido:** `astro check` 0 · al pasar: `::after` de la barra sin contenido y rótulos del abanico sin pintar (captura).

### Ronda 145 · 2026-10-09 · fuera el isotipo: el logotipo es «savvia» en Family · PUBLICADA
- **Andoni (textual):** «quita el isotipo y pon solo savvia con la tipo de titulares».
- **Hecho:** `public/savvia-palabra.svg` = «savvia» en Family 400 (apretado −0,02 em) pasado a contornos con fontTools (viewBox 15 −689 2444 × 707); sustituye a `savvia-logo.svg` en la
  barra (28/32 px de alto), la transición entre páginas, la marca de savvia agentic, la pantalla de carga de Proyectos y el ticket de la receta · favicon y apple-touch = la «s» de
  Family en Rosa niebla sobre Cacao (`?v=145`; el anterior, en `tools/r144/apple-touch-icon.r144.png`) · la carga ya no dibuja la v: el círculo se recoge en la gota, que cae
  (`Cargador.astro › SIN_ISOTIPO`) · brandbook: el logotipo es la palabra (sin isotipo; favicon, tamaño mínimo y dentro de una frase) y la construcción se dibuja sobre sus curvas
  (cuadráticas: 170 anclas, 118 manejadores; base, altura de x 462 y ascendentes).
- **Medido:** `astro check` 0 · build OK · `tools/verify.cjs` en /, /proyectos, /proyectos/kuanta, /brandbook (Chrome y WebKit, 1280 y 390): limpio · la carga (círculo → gota → hero) en Chrome y WebKit.
- **Pendiente:** la imagen para compartir (`og.jpg`) aún lleva el logotipo con isotipo.

### Ronda 146 · 2026-10-09 · fuera la parrilla de puntos del hero · PUBLICADA
- **Andoni (textual):** «quita la parrilla de detrás del árbol del hero, me refiero a los puntos».
- **Hecho:** `Hero.astro › .marco` sin la trama de puntos (rondas 16–145) en todas las estaciones; quedan los lados a trazos, las cruces de los carriles, la hora y «desde 2020».
- **Medido:** `astro check` 0 · fondo del marco `none` · `tools/verify.cjs` en / (Chrome y WebKit, 1280 y 390) limpio.

### Ronda 147 · 2026-10-09 · «savvia» del menú más pequeño; el hero sin líneas horizontales ni cruces · PUBLICADA
- **Andoni (textual):** «savvia del menú ponlo más pequeño, y luego del hero también quita las líneas horizontales y las cruces».
- **Hecho:** logotipo de la barra 28/32 → 22/24 px de alto · el hero sin filas de carriles: `data-sin-fila` en la sección, fuera `data-carril-fila` del marco y de las raíces (la
  línea con cruces bajo el árbol); quedan los carriles verticales.
- **Medido:** `astro check` 0 · `tools/verify.cjs` en / (Chrome y WebKit, 1280 y 390) limpio · captura del hero sin líneas ni cruces.

### Ronda 148 · 2026-10-09 · vuelve la línea horizontal del hero (sin cruces) y «savvia» más apretado · PUBLICADA
- **Andoni (textual):** «recupera solo la raya horizontal y el kerning de savvia en el menú, algo menos».
- **Hecho:** `Carriles.astro` admite `data-carril-fila="sin-cruces"` (solo la línea); el marco del hero y las raíces la usan: vuelven sus dos líneas horizontales, sin cruces ·
  `savvia-palabra.svg` regenerado con apretado −0,045 em (antes −0,02; viewBox 15 −689 2319 × 707; proporción en barra, transición, Agentic, Proyectos, receta y brandbook).
- **Medido:** `astro check` 0 · `tools/verify.cjs` en / (Chrome y WebKit, 1280 y 390) limpio · capturas del logotipo y del hero.

### Ronda 149 · 2026-10-09 · la línea del hero, 40 px más arriba; verticales continuas · PUBLICADA
- **Andoni (textual):** «pon la línea horizontal más arriba 40 px y que las líneas verticales sean continuas, que no haya ningún dashed».
- **Hecho:** `Carriles.astro` admite `data-carril-desfase`; la línea del marco del hero, −40 px · fuera los lados a trazos del marco (`border-inline` dashed): solo quedan los carriles continuos.
- **Medido:** `astro check` 0 · `tools/verify.cjs` en / (Chrome y WebKit, 1280 y 390) limpio · captura: la línea 40 px más arriba y las verticales continuas.

### Ronda 150 · 2026-10-09 · el brandbook sin paleta común: cada estación, la suya · PUBLICADA
- **Andoni (textual):** «los colores en el brandbook: que no haya una paleta común, sino que cada estación tenga la suya propia».
- **Hecho:** fuera las seis muestras comunes (Cacao, Nogal, Rosa niebla, Salvia, Cobalto, Cereza); el texto lo dice («no hay una paleta común»); tras la escena de estaciones, las
  cuatro paletas una junto a otra (noche, noche honda, roble, savia y tinta) · el índice lateral pasa a fijo y se aparta mientras pasan la escena y el pie (antes subía y se montaba
  sobre el logotipo al acabar su bloque).
- **Medido:** `astro check` 0 · `tools/verify.cjs` en /brandbook (Chrome y WebKit, 1280 y 390) limpio · índice visible (opacidad 1) en logotipo, construcción, tipografía y componentes.

### Ronda 151 · 2026-10-09 · los colores sueltos entran en cada estación; el resumen de paletas, en grande · PUBLICADA
- **Andoni (textual):** «hay ciertos colores que teníamos en la web que quedan en el aire: incluirlos en cada paleta y darles su tonalidad para cada estación» · «el resumen de cada
  estación con su paleta, más visual y no tan pequeño».
- **Hecho:** `global.css`: papel (Rosa niebla), madera (Nogal), cielo (Salvia, fondo de Servicios), detalle (Cobalto) y fruto (Cereza) cambian con la estación, con un viraje sutil
  (primavera rosada · verano cálido y cielo vivo · otoño los de siempre · invierno fríos); la web los usa ya (Servicios, superficies claras, la receta…) · brandbook: cada paleta tiene
  diez colores (cinco que cambian y cinco que viran), en la escena y en el resumen; la tinta de las estaciones oscuras es su papel · el resumen: cuatro tarjetas grandes sobre su
  noche, con las diez franjas altas (las cinco principales más anchas; al pasar, la franja se abre) y nombre y valor en vertical.
- **Medido:** `astro check` 0 · `tools/verify.cjs` en /, /proyectos, /proyectos/kuanta, /brandbook, /manifiesto (Chrome y WebKit, 1280 y 390) limpio · Servicios en verano (#8EC4E6) e invierno (#A9BFD6).

### Ronda 152 · 2026-10-09 · fondos sin textura, paletas propias por estación, empiezas sentado, iconografía Phosphor, sin mono, retratos y salvapantallas con el estilo del roble, reel de construcción, Manifiesto natural (en local)
- **Andoni (textual, resumido):** «quitar la textura de los fondos» · «pulir los colores de cada estación: que cada una tenga colores propios, todos y cada uno» · «la typo, Timeless (timeless.co/type), en todos lados; no quiero mono» · «iconografía de estaciones más elegante y siempre en fill; una iconografía para toda la web» · «proyectos destacados: empiezas sentado viendo los proyectos en grande; con el scroll te levantas; después ya puedes sentarte clicando; Neety no se puede scrollear en detalle» · «ancla a servicios en el menú» · «el estilo del árbol en todas las ilustraciones» · «salvapantallas: el árbol nace desde abajo y se nota la estación (hojas, nieve…)» · «reel: solo lo que construye la web + animaciones concretas (la ruleta de iconos de Zernio); la gota inicial como la de la carga; al final savvia con la typo» · «Escuchando: sin respuestas, solo el check» · «Monad en versión light» · «Servicios, 80 px más de aire abajo» · «agentic: se coge un color sólido y cae un degradado» · «portfolio: flechas de los destacados como las de testimonios, abajo a la derecha» · «case studies: menos aire, tamaños y orden consistentes, más chicha e imágenes que enseñen los entresijos» · «Manifiesto: sin textura, más natural, no tanto papel» · «el círculo de la carga, más fácil».
- **Hecho:**
  · **Textura:** fuera `grano.png` de todos los fondos (html, superficies, transición, carga, Proyectos, pie, receta, entreacto, brandbook). Queda solo dentro del hero de Neety en savvia agentic (es SU fondo).
  · **Estaciones (`global.css`, `Base.astro`, `estacion.ts`, `estela.ts`, brandbook):** once tintas por estación, ninguna común (también `--color-cacao`, la tinta oscura): primavera ciruela/cerezo/lila · verano bosque/lima/mar (papel verde pálido, sin crema) · otoño la casa con ámbar y granada · invierno nieve/pizarra/acebo. Contrastes en el comentario del token.
  · **Tipografía:** BLOQUEADO Timeless: es de pago («Get access» en timeless.co); hacen falta los archivos de Serif y Sans. Mientras, `--font-mono` = la sans (fuera la mono en toda la web; no se cargan Areal Mono ni Plex Mono).
  · **Iconografía (`src/lib/iconos.ts`, @phosphor-icons/core 2.1.1, MIT):** estaciones rellenas (hoja · copo macizo «bold» · flor · sol) en la barra (relevo girando y enfocando, sin morfismo) y en el (+) de Proyectos; interfaz regular (más, ×, carets) y estados rellenos (sonido, play/pausa, cámara). Sección «Iconografía» en el brandbook.
  · **Proyectos destacados (`Proyectos.astro`):** pista de 300 lvh: 0–0,2 SENTADO (encuadre de sentarse, monitor nítido, titular arriba a la izquierda, ficha con «Ver caso de estudio» y las flechas de los testimonios, «Desliza para levantarte»); 0,2–0,65 te levantas (zoom exponencial atado al scroll); después, de pie, la silla invita a sentarte clicando. Fuera la entrada del titular-pantalla. Neety sentado enseña su página ENTERA (`neety-largo.webp`, 1440 × 12 144) y se recorre. En móvil, el rótulo de la silla en dos líneas (se salía).
  · **Retratos de los testimonios (`Anteriores.astro`):** los pinta el motor del roble (líneas → pintura rasgada desde abajo, semitono, hervor); el relevo, en lienzo nuevo, y el viejo suelta su contexto.
  · **Salvapantallas (`Entreacto.astro`):** el roble sube desde el pie de la pantalla mientras se pinta; encima, el tiempo de la estación (hojas, nieve azulada sobre la nieve, pétalos, motas y haz de verano) que se posa en el suelo.
  · **Reel (agente; proyecto en `../savvia-web/tools/r152-reel/`):** 30 s: gota de agua como la de la carga → construcción de Kuanta, Arkdev, Playground, Neety, Remerge + tres firmas (ruleta de canales de Arkdev, ilustraciones isométricas de Kuanta, notas del tablón de Playground) → «savvia» en la tipografía de titulares. `reel.mp4` 8,7 MB, `reel-mini.mp4` 206 KB; menú «0:30».
  · **Manifiesto (agente):** sin papel: el roble de la estación (motor) con sus raíces, tres párrafos que se pintan al llegar con el canto rasgado y la frase clave subrayada de savia. `relieve.ts` borrado.
  · **Portfolio (agente):** las flechas de los destacados son las de los testimonios de la home, abajo a la derecha (número y nombre, solo para lectores de pantalla).
  · **Casos de estudio (agente, `[slug].astro` reescrito, `proyectos.ts`):** cinco estilos de texto (`.t-ojo · .t-enc · .t-h · .t-lead · .t-texto`); orden: entradilla y ficha · portada · El proyecto · El reto · Cómo la construimos (pasos) · Los detalles (vídeo de cerca de cada pieza con su explicación) · apartados · El sistema · La web, sección a sección · Por dentro · cita · anterior/siguiente. Entre bloques 64–104 px (antes 96–160): Neety 13 116 → 7 980 px. 70 vídeos nuevos `x-*.mp4` (16 MB) grabados en la web real o cortados del archivo de treseiscero; fuera los recortes d1/d2 y los recorridos g1–g4. Datos corregidos con los registros (Kuanta, Arkdev, Playground, Isotrol, BOP).
  · **Pequeños:** «Servicios» en el menú (`/#servicios`) · Servicios +80 px abajo · Monad en verde claro (nombre en tinta oscura) · «Escuchando»: cuatro preguntas con su check, sin respuestas · agentic: la muestra que se coge es el «Degradado del hero» (antes «Base Cálida» lisa) · carga: el círculo vale con 270°, 12 px de radio y forma libre; el rastro dura 2,4 s.
- **Medido:** `astro check` 0 errores · `tools/verify.cjs` en /, /brandbook, /manifiesto, /proyectos, /proyectos/neety, /kuanta, /remerge, /invopop (Chrome y WebKit, 1280 y 390): limpio, 0 ≥ 400, desborde 0 · empezar sentado: `--asi` 1 → 0 al levantarse, cambio de proyecto con las flechas (Chrome 1280 y 390, WebKit) · retratos pintados por el motor en Chrome y WebKit · salvapantallas en las cuatro estaciones.
- **2.ª parte (Andoni):** «te adjunto las typos: Sans para textos de lectura y Grotesk para detalles; luego te pasaré la serifa» · «Kuanta ya lo cambiaré yo» · «BOP: tenemos permiso».
  · **Timeless (`astro.config.mjs`, `src/assets/fonts/timeless/`, licencia y enlaces del configurador en `tools/fuentes-timeless/`):** Timeless Free Font License 1.2: uso web y comercial libre; prohibido redistribuirla o subirla a un repositorio público (el nuestro es privado). `--font-sans` = Timeless Sans (300 · 420 · 500 · 537, precargada); `--font-mono` y `.detail` = Timeless Grotesk Light (todo lo que era mono: rótulos, metadatos, cifras). Titulares, Family hasta la serifa. Areal ya no se carga. Copy de la receta, el handbook y el brandbook (tipografía) con los nombres nuevos.
  · **Proyectos:** al llegar de un salto a la sección (sin más scroll), la web del monitor se estrena igual (antes se quedaba en blanco).
  · **Medido:** `astro check` 0 · `tools/verify.cjs` en /, /proyectos, /proyectos/neety, /proyectos/kuanta, /manifiesto, /brandbook, /handbook, /lab (Chrome y WebKit, 1280 y 390): limpio, 0 ≥ 400, desborde 0, Timeless Sans y Grotesk cargan.
- **Pendiente de Andoni:** la serifa de Timeless (titulares); Eric y Andoni (secuencias de fotogramas) aún sin el estilo del roble; Kuanta lo renombra Andoni; en el Manifiesto, el canto rasgado sobre el texto a medio pintar se lee como un corte vertical. No publicado.

### Ronda 153 · 2026-10-09 · subtítulo fino, entrar-sentarse-levantarse, blancos fijos y Servicios temático, casos con imágenes y conclusión, Manifiesto = la savia, Iconoir, favicon gota, sonido flotante, Timeless Text (en local)
- **Andoni (textual):** «el subtítulo, menos gordo» · «la entrada a destacados como antes; que puedas hacer scroll en la pantalla» → «empiezas sentado pero entrando a esa pantalla como ahora; si sigues, te levantas; scroll en los proyectos sin que influya en tu scroll» · «las partes claras siempre iguales entre estaciones, un blanco sin nada de crema; el azul de Servicios no convence: una paleta temática por estación» · «case studies: detalles con imágenes como casabien (Hannun) y una conclusión; colores y typos con tamaños y usos» · «el manifiesto es lo que fluye por dentro del árbol; mucho más aire y una letra estilo pluma» · «librerías de iconos» → «me gusta iconoir.com» · «testimonios: quitar el dithering animado» · «la gota de carga como favicon, redonda, sin empezar a caer» (probada como isotipo y retirada: «solo en favicon») · «el botón de sonido, siempre a mano» → «flotante, abajo a la derecha, más pequeño y sutil; y quitamos Agentation» · «aquí va la serifa para probar» (Timeless Text).
- **Hecho:**
  · **Subtítulos** (`--text-lead`, `--text-sub`): Timeless Sans Light (300).
  · **Proyectos destacados:** vuelve la entrada del titular-pantalla y se queda SENTADO: A 0–0,34 la cámara sale de la pantalla hasta el encuadre de sentado · B 0,34–0,52 sentado y nítido, «desliza dentro del monitor · fuera, para levantarte» · C 0,52–0,82 te levantas · D de pie. En B y D, un movimiento real del ratón sobre el monitor monta la web real (Neety: su página entera) y la rueda la recorre sin mover la página (medido: 0 px de página con 5 golpes de rueda; Chrome, WebKit, 390). Con el cursor quieto, la página no se queda atrapada. La vista de asiento con titular y ficha de la ronda 152 (1.ª), en el scratchpad.
  · **Color:** papel/tinta clara `#F5F5F7` en las cuatro estaciones; cielo de Servicios: pétalo de cerezo `#F4C7D5` · prado `#CFE6A4` · hoja seca `#ECBF8F` · hielo `#CADCEE` (brandbook al día).
  · **Casos (agente):** «Los detalles» en mosaico de imágenes (12 · a sangre · 6+6 · 7+5 · 5+7 · 4+4+4, alturas iguales, webs sobre placa de su color, pies mínimos); «El sistema» con barra de uso de cada color medida en las grabaciones, contraste WCAG, escala real (px, interlineado, peso) medida en la web, botón real y ejemplo aplicado recortado de su web; «Conclusión» de dos frases. Herramientas en `tools/r153/`.
  · **Manifiesto (agente):** la savia baja por dentro de la raíz, escribe una «T» capitular de pluma ancha trazo a trazo y sigue por un canal junto al texto que alimenta cada párrafo al leerlo (sin canto rasgado); aire `clamp(12rem, 6rem + 36lvh, 30rem)` arriba. `src/components/manifiesto/{capitular,savia}.ts`.
  · **Iconografía:** Iconoir 7.12.1 (MIT) en `src/lib/iconos.ts`: interfaz en trazo, estados en sólido y estaciones rellenas a partir de su dibujo (la hoja con el nervio calado por evenodd; el copo, trazo 2,1); fuera los clipPath de id fijo. Comparativa de 9 librerías en `tools/shots/r152-iconos.png`.
  · **Testimonios:** el retrato se pinta con el motor y queda quieto (sin hervor).
  · **Favicon:** la gota redonda de la carga (agua translúcida, canto, luz, brillo) sobre Cacao; `apple-touch-icon` igual; `?v=153`. El anterior, en `tools/retirados/`.
  · **Sonido y estación:** fuera de la barra; píldora de cristal fija abajo a la derecha (14 px, tinta al 72 %); un solo interruptor para clics, savvia agentic y el ambiente de Proyectos (evento `savvia:son`, sincronizado con el del abanico).
  · **Agentation:** fuera (Base.astro).
  · **El (+) flotante (`Mando.astro`, en Nav):** Andoni: «el (+) de la maqueta de destacados, flotante: al abrirlo, estación y sonido; en destacados lo quitamos». Fijo abajo a la derecha (también sentado): el abanico de la ronda 19 (gotas con filtro gooey, cristal) en un cuarto de círculo de 118 px hacia arriba y a la izquierda: primavera · verano · otoño · invierno · sonido. Fuera de la escena de Proyectos el (+), su rótulo y el botón de sonido; fuera también la píldora de la barra. El ambiente de Proyectos suena salvo '0' (un solo interruptor, como los clics).
  · **Timeless Text** probada en los titulares y retirada («volvemos a la tipografía de titulares de antes»): Family 400.
  · **Testimonios:** «recuperar que se pinten como antes»: vuelve el carboncillo que se dibuja (rondas 68–72); el motor del roble queda sin usar.
  · **Colores por estación, simplificados** («repetidos, nombres que no corresponden, menos colores»): cada estación, sus colores con nombre propio — primavera Ciruela · Flor de cerezo · Cereza viva · Pétalo; verano Bosque · Hoja · Lima · Prado; otoño Cacao · Cobre · Coral · Hoja seca; invierno Nieve (el blanco) · Roble desnudo · Glaciar · Hielo · Pizarra. La tinta sobre claro es el propio fondo (en invierno, Pizarra); el blanco #F5F5F7, común. Madera, detalle y fruto se derivan (`color-mix`) y dejan de ser colores sueltos. Brandbook: la escena con esos colores y sus nombres; fuera el resumen de las cuatro paletas.
  · **Iconografía en el brandbook:** catálogo de 60 iconos de Iconoir por grupos (navegación, contacto y tiempo, acciones, oficio, medios, naturaleza).
- **Medido:** `astro check` 0 · `tools/verify.cjs` en /, /proyectos, /proyectos/neety, /proyectos/invopop, /manifiesto, /brandbook (Chrome y WebKit, 1280 y 390): limpio, 0 ≥ 400, desborde 0.
- **Pendiente de Andoni:** elegir Timeless Text o Family; en los casos, BOP/Cubbo/Remerge/Isotrol medidos en su web de hoy (no la entregada) e Invopop sin escala; Eric y Andoni sin el estilo del roble; no publicado.
  · **Flecha líquida** (`lib/flecha.ts` + `.fl-gota`): al pasar, una gota nace en el vértice y cada ala fluye desde ella con una gotita en la punta que se funde con la punta redonda.
  · **Isotipo de Andoni** (`public/savvia-isotipo-gota.svg`, el anillo-gota): a prueba en la barra delante de «savvia» (`.logo-iso`, versión engrosada para tamaños pequeños `savvia-isotipo-gota-peq.svg`) y como favicon dentro de un círculo marrón (engrosado, `?v=156`). LA CARGA lo dibuja: tras el círculo, la gota recorre el eje del anillo (medido por radios desde el centro) con la plumada, se descuelga de su bolita y cae al árbol mientras el isotipo vuela a su sitio en la barra (`SIN_ISOTIPO = false`). Comprobado en Chrome y WebKit.
  · **Ajustes del isotipo** (Andoni: «conservando la silueta, se ha perdido forma» · «el favicon en oscuro sobre claro y que el círculo ocupe todo lo que pueda»): el engrosado ya no es un trazo alrededor de todo el dibujo sino un trazo uniforme por el EJE del anillo (las partes finas ganan; el goterón y la bolita conservan su silueta): 20 en la barra, 26 en el favicon. Favicon: círculo claro #F5F5F7 a sangre y el isotipo en Cacao tan grande como cabe; `?v=159`.
  · **Círculo de la carga** («demasiado fácil»): 315° de vuelta, radio ≥ 20 px, bastante redondo, y cada paso con poco giro y en el mismo sentido (fuera zigzags y garabatos). Medido: arranca con un círculo de 100 px, un óvalo a mano de 330° y un círculo lento de 60 px; no con un arco de 234° o 300°, un zigzag, un garabato ni un círculo de 15 px.
  · **Isotipo único (24 px de Andoni)** («usamos el de 24 px o más en todos lados, así no hay discrepancias»): `public/savvia-isotipo-gota.svg` es ya esa versión (viewBox 3 3 58 58; la detallada, en `tools/retirados/`) y la usan la barra, la carga (eje medido de nuevo, plumada 13) y el icono de iPhone. Favicon: ese isotipo en Cacao en modo claro y en el blanco #F5F5F7 en modo oscuro (`?v=164`). La carga, comprobada en Chrome y WebKit.
  · **Brandbook · logotipo e isotipo** («el logo nuevo con todos los colores, su construcción, la construcción del isotipo; al final, explicar el isotipo»): Logotipo = isotipo + «savvia» (Family); en Cacao y en blanco, y en el fondo y el bloque claro de cada estación; el isotipo solo, el favicon (modo claro y oscuro) y el tamaño mínimo; reglas (un solo dibujo, aire, sí/no). Construcción: la palabra (anclas y manejadores, como antes) + «El isotipo»: retícula de 8, círculo de 360°, eje del trazo, grosores (grueso al bajar, fino al subir), apertura y remate en gota; se dibuja al llegar. Debajo, el texto de Andoni sobre su significado, tal cual.
  · **Proporción áurea del logotipo** («para el tamaño del isotipo, la regla del golden ratio en todos lados»): anillo = altura de x de «savvia» × φ; separación anillo–palabra = anillo ÷ φ²; centro del anillo en el centro de la altura de x. En la barra (`--h` = alto de la palabra) y en los logotipos del brandbook (en em); la carga se encaja en esa caja. Regla escrita en el brandbook. Texto del isotipo: «nuestra etapa como treseiscero» (Andoni: «treseiscero, con nombre, sin números»).
  · **Brandbook · el isotipo en galería** («la construcción del isotipo más de este estilo: casabien · Taqta, con imágenes»): retícula editorial de piezas a sangre (6 columnas, 6 px): el diagrama de construcción en oscuro + el texto · la secuencia REAL de la carga (5 fotogramas de la propia web, `public/media/brandbook/carga-*.webp`) · la frase · el trazo (grueso al bajar, fino al subir) y el remate (la gota, en primer plano) · el roble de otoño con el isotipo · aplicaciones (pestaña, icono, tarjeta) · el cierre.

### Ronda 154 · 2026-10-09 · carátula de los casos con el degradado y la web saliendo desde abajo, detalles nítidos, degradado de Neety (en local)
- **Andoni (textual):** «en case studies, la primera carátula con el gradiente y saliendo desde abajo el proyecto como en todos los proyectos, pero más grande; los detalles en buena calidad y no clips cortados» · «en Neety mejorar el gradiente, se ve un poco sucio».
- **Hecho (agente):** `obra/Pieza.astro` variante `grande` (12 columnas, `clamp(26rem, 78lvh, 54rem)`, navegador centrado que sube al llegar; Remerge en teléfono) como carátula de cada caso (`cubierta.mp4/.jpg` a 1920 px; campo `cubierta` en proyectos.ts) · «Los detalles» auditados uno a uno y regrabados a 2× o recortados del archivo (sin barra fija, sin medio scroll, ida y vuelta en lo atado al scroll; lo que no se mueve, en foto a 2400 px): de 49 a 43 piezas, ninguna > 2,5 MB (tools/r154/, hojas en tools/r154/shots/) · Neety con su paleta real (lavanda #EEE8F7 · Azul bebé #A7C5F9 · Naranja Core #FE8238) y manchas mezcladas en oklab (también en la home, Anteriores).
- **Medido:** `astro check` 0 · `verify.cjs` en los 9 casos (Chrome y WebKit, 1280 y 390): limpio.
- **Pendiente de Andoni:** pies reescritos por el agente para cuadrar con las imágenes nuevas (Neety x-ruido; Kuanta x-plano, x-pila, c-casos; Playground x-historia, x-compatible; Cubbo c-panel; Remerge x-home, c-equipo, c-premios; Invopop c-ficha, x-consola, x-impuestos; BOP c-cta; Isotrol x-bluence, c-beneficios); Invopop, como mucho a 1674 px (el archivo); no publicado.
- **A media ronda (Andoni):** «el vector construido, sin esas líneas rectas entre medias: que sea un círculo que se modifica a mano hasta la forma final» → fuera la retícula, las líneas de llamada, las cotas, la apertura y los rótulos del diagrama. Ahora es una ANIMACIÓN: un círculo cerrado trazado a mano (el radio respira un poco) que una pluma Coral va abriendo en el sentido del trazo (las vueltas de fuera y de dentro del contorno se reparten el mismo círculo, así que al empezar está cerrado): engorda al bajar, se afina al subir y remata en la gota (3,6 s). Al verse y otra vez al pasar el ratón; con movimiento reducido, la forma final. Medido: `astro check` 0 · `verify.cjs` en /brandbook (Chrome y WebKit, 1280 y 390) limpio.
- **A media ronda (Andoni):** «la construcción del isotipo como el típico esqueleto de vector: empezamos de un círculo perfecto y se va moviendo punto a punto hasta convertirse en el logo» → el contorno del isotipo ajustado a 30 curvas de Bézier (`tools/r154/isotipo-bezier.cjs` → `src/data/isotipo-bezier.json`, tramos repartidos y manejadores cortos). Arranca como un CÍRCULO PERFECTO (anillo: contorno de fuera y de dentro, manejadores tangentes de longitud exacta 4/3·tan(Δ/4)·r) con anclas (cuadrados) y manejadores a la vista; un cursor coge cada ancla, la mueve con sus manejadores a su sitio y pasa a la siguiente (8,4 s); al acabar se rellena y el esqueleto se retira. Al verse y, como mucho cada 9 s, al pasar el ratón. Movimiento reducido: la forma final.
- **A media ronda (Andoni):** «en primavera el árbol del brandbook tiene que ser como en el hero, y en el resto de estaciones también» → los cuatro robles de la escena de estaciones los pinta el MOTOR del hero con sus mismas opciones (primavera teñida de cerezo, invierno sin hojas ni hervor, fondo = la noche de la estación); fuera el viraje con `hue-rotate`. `estacion.ts › NOCHE` actualizado a la paleta de la ronda 152 (también hunde bien el árbol del hero en su fondo).
- **A media ronda (Andoni):** «mover la v de la izquierda un poco más a la izquierda, en todos lados» · «la ia también un poco a la derecha» → `public/savvia-palabra.svg` reespaciado (`tools/r154/separar-v.cjs`): «sa» −26, primera v −52, «ia» +28 (unidades de la fuente); viewBox `-11 -689 2373 707`, proporción 2373/707 en todas las máscaras y `?v=156`; la palabra del pie (texto en Family) con el mismo ajuste en em. El anterior, en `tools/retirados/savvia-palabra.r153.svg`.
- **A media ronda (Andoni):** «la captura del roble la quiero cambiar por imágenes reales de naturaleza que tengan relación con el isotipo» → elegidas por Andoni: el brote de helecho enroscado (Soc Nang Dương, Pexels, 37248160), los anillos de un tronco (Wal_, Pexels, 37308882) y una gota colgando de una hoja (la pasó él). «En todas, el isotipo encima»: en blanco, junto al brote, en el centro de los anillos y sobre el fondo de la gota. Brote a todo el ancho (21/9); anillos (4/3) y gota (2/3) en la misma fila; en móvil, una por fila. `public/media/brandbook/foto-{helecho,anillos,gota}.webp` (59 · 340 · 51 KB). Licencia Pexels (uso comercial libre; el crédito va en el pie de cada foto).
- **A media ronda (Andoni):** «en el lab añade esto: savvia-pulso.vercel.app» → EXP-004 «Pulso» en `src/data/lab.ts`: grabado de su web con una canción puesta (Lobby Time, por su campo de archivo; `tools/r154/grabar-pulso.cjs`) → `public/media/lab/pulso.mp4` (14 s, 1280 × 800, 30 fps, mudo, 760 KB) + `.jpg`. Con cuatro experimentos (ocho copias) el mundo crece de 2200 × 1420 a 2600 × 1640 y las dos copias de Pulso van en los huecos más amplios (calculados con el bucle del mundo y los tamaños reales de las piezas). Medido recorriendo el lienzo con la rueda: 0 solapes a 1280 y a 390.

### Ronda 155 · 2026-10-09 · brandbook: iconografía, movimiento de naturaleza, aplicaciones en escenas, fotos a la misma altura (en local)
- **Andoni (textual):** «Iconografía tenemos que ponerlo más bonito y aplicaciones también. Luego en las fotos, si podemos poner de una manera que no se vea a quién damos crédito, mejor. Y las fotos tienen que tener la misma altura. El isotipo hacer que se vea bien en todas las fotos y a poder ser centrado» · «En la parte de movimiento en brandbook, quitamos textura y solo ponemos movimientos que tengan que ver con naturaleza. Los que sean sonido fuera. Hay que ser consistentes» · «en la de madera/anillos no se lee bien el texto de abajo».
- **Hecho:** · FOTOS: las tres en una fila, a la misma altura (cada una 2 de 6 columnas, `object-fit: cover`); el isotipo CENTRADO en todas (30 % del alto) sobre un velo oscuro radial muy blando y con sombra; degradado oscuro abajo para que el pie se lea (también sobre la madera); créditos fuera de la vista (quedan en un comentario del código: Soc Nang Dương y Wal_, Pexels; la gota, de Andoni). · ICONOGRAFÍA: las cuatro estaciones en fichas de su color (fondo de la estación, icono relleno en su savia, nombre y meses); la construcción de un icono en la rejilla de 24 con sus guías (cuadrado, círculo y zona viva de 20 px); la interfaz en celdas (trazo/sólido) y el catálogo como pliego de muestras con filetes y realce al pasar. · MOVIMIENTO (antes «Textura y movimiento»; también en el índice): fuera el semitono, los carriles, los titulares por máscara, el párrafo que enfoca, la onda de la voz y la regla de sonido; quedan solo movimientos de naturaleza: la gota, la gota entre secciones, el roble que se pinta, las raíces que crecen, la savia desde el cursor, el tiempo (una hoja que cae y se posa), las estaciones (sus cuatro iconos en su color), brotar (un tallo que sube y abre dos hojas) y la caída (curva expo); nueva regla «Todo crece desde un origen». · APLICACIONES en escenas: las dos tarjetas de visita una sobre otra sobre papel (anverso con el logotipo con el isotipo en proporción áurea), un chat con la vista previa del enlace, y una ventana de navegador con la pestaña y el favicon que asoma desde abajo. · IMAGEN PARA COMPARTIR regenerada con el logotipo actual (`tools/r155/og.cjs`, sin el (+) flotante; `og.jpg?v=155`; la anterior en `tools/retirados/og.r140.jpg`).
- **Medido:** `astro check` 0 · `verify.cjs` en /brandbook y / (Chrome y WebKit, 1280 y 390): limpio, desborde 0.
- **A media ronda (Andoni):** «en el navegador de aplicaciones no se ve el favicon y las pestañas se ven raras, no tienen la x para cerrar, el texto está muy pegado a la esquina» → pestañas como las de un navegador de verdad: favicon (el isotipo en Cacao), título con puntos suspensivos, × para cerrar, aire a los lados, separador entre pestañas inactivas y el «+» de pestaña nueva; en móvil solo la activa.
- **A media ronda (Andoni):** «en el footer savvia tiene como un cuadrado encima, eso va fuera» → era mío: al reespaciar la palabra del pie envolví «ia» en `<span class="ia">`, y `.ia` es la clase GLOBAL del píxel de la IA (ronda 5): pintaba su cuadrado. Renombrada a `.tras-v`. Regla: antes de estrenar una clase, `grep` (ya estaba en los guardarraíles).

### Ronda 155 · manifiesto · el brote de la bellota, raíces que llevan al texto y la capitular caligráfica (en local)
- **Andoni (textual):** «El manifesto tenemos que cambiarlo. Fuera la raíz que va al texto y la letra grande tiene que ser de este estilo que te paso en la captura. Y no quiero usar el árbol del hero... tenemos que usar otra cosa. Te paso imagen. Ponemos el brote y las raíces que no se vean de primeras y cuando haces scroll esas raíces te llevan al texto del manifesto. Hay que darle el estilo dithering de todo.» · (a media ronda) «el manifesto está horrendo, el brote tiene que verse mucho más pequeño y centrado. Y tiene que coincidir con el 100 % de visual height abajo solamente el brote. Solo se ve el brote y una vez empiezas a hacer scroll ya se ve la raíz que apunta al texto centrado. Te paso todas las estaciones» · «la T del texto del manifiesto solo tiene que afectar a la primera línea, como el ejemplo que te pasé».
- **Hecho (`src/pages/manifiesto.astro`, reescrita):** fuera el roble del hero, la savia/canal y la T de pluma ancha (`capitular.ts`, `savia.ts` y la página anterior, en `tools/retirados/manifiesto-r153/`).
  · **Láminas:** las cuatro de Andoni (`tools/r155/brote-<estación>.webp`) → `tools/r155/partir.cjs`: normalizadas a 1000 × 1500 (el cuello de la bellota en el mismo píxel), en ESPEJO (la raíz principal cae hacia la izquierda, hacia el comienzo del texto), sin el velo casi invisible que traían (alfa ≤ 16: el semitono del motor lo convertía en puntos) y partidas por el cuello → `public/media/manifiesto/brote-*.webp` (1000 × 310, ~30 KB) y `raices-*.webp` (1000 × 1190, ~280 KB). Sin halo blanco.
  · **Primer pantallazo:** SOLO el brote, pequeño (`clamp(7rem, 19lvh, 11rem)`; móvil 16 lvh) y centrado, con la bellota en el borde de abajo (100 lvh). Cae una gota y se dibuja y pinta con el motor del hero (`estela.ts`: semitono, hervor, canto rasgado). El h1 «Manifiesto», solo para lectores de pantalla.
  · **Raíces:** otro lienzo del motor que cuelga del cuello; no asoman al cargar y crecen con el scroll (`crecer(g)`, desde la bellota): en 0 no hay nada y la punta llega cuando la capitular está al 60 % de la pantalla (ida y vuelta). El JS las ENCAJA entre la bellota y la capitular: alto = distancia, ancho a escala e inclinación `skewX` (tope 21°; medida 17° a 1280, 12° a 390) para que la punta visible acabe en el arranque del travesaño de la T.
  · **Capitular:** la T en **Pinyon Script** (Google Fonts, **SIL OFL 1.1**; API de fuentes de Astro, `--font-capitular`, cargada solo en /manifiesto con `<Font>` en la página). Elegida entre 24 caligráficas (`tools/r155/shots/fuentes.png`): es la copperplate más cercana a la V de la referencia (contraste de pluma fina, lazo abajo, rasgo que se enrosca). Como la referencia: grande (4,2 em), en la PRIMERA línea, sobre su línea base (`line-height: 0`, no empuja el renglón), sobresale por arriba y su travesaño cubre «u web»; las demás líneas sin sangría. Espera al 12 %; cuando la raíz llega, se entinta (un destello de savia y la tinta del texto). Excepción expresa a «cursivas»: solo la capitular. Columna centrada de 30ch.
  · **Estaciones:** la lámina de la estación de la web; al cambiar (`savvia:estacion`), la nueva se descubre con el canto rasgado desde la bellota y la vieja suelta su contexto.
  · **Trampas cazadas:** (1) filas de puntos de lado a lado sobre el claro: en WebGL 2 el motor usa mipmaps y el destello del hervor lee dentro de una rama del shader → nivel de mip indefinido. Los lienzos del manifiesto abren antes un contexto WebGL 1 (sin mipmaps). (2) WebKit subía a veces la `<img>` webp como «texImage2D: bad image data» (recuadro negro con semitono, en las estaciones que no eran la del respaldo): la lámina se pasa al motor ya descodificada y copiada en un lienzo 2D. Ninguna de las dos toca `estela.ts`.
- **Medido:** `astro check` 0 errores · `verify.cjs` en /manifiesto?carga=0 (Chrome y WebKit, 1280 y 390): consola limpia, 0 ≥ 400, desborde 0, Pinyon Script carga · capturas (`tools/r155/capturas.cjs`, Chrome y WebKit, 1280 y 390): arriba g = 0 (solo brote), al bajar 0,21 → 0,44 → 0,67 y la T se entinta en su sitio · cuatro estaciones (`tools/r155/estaciones.cjs`, Chrome y WebKit) · cambio en caliente otoño → invierno (`cambio.cjs`): un lienzo por capa al acabar · movimiento reducido: todo crecido y la T a plena tinta.
- **Pendiente de Andoni:** si el titular «Manifiesto» debe verse en algún sitio (hoy solo para lectores de pantalla, por «solo se ve el brote»); la inclinación de las raíces (17° en escritorio para llegar desde el centro a la columna); no publicado.
- **Ojo (fallo del agente):** al limpiar `tools/r155/` borré `tools/r155/og.cjs`, que era de otra tarea (la imagen para compartir del brandbook). Reconstruido a partir de `tools/r140-og.cjs` + «sin el (+) flotante»; revisarlo antes de reutilizarlo. `public/og.jpg` no se ha tocado.
- **A media ronda (Andoni):** «arriba del brote centrado tiene que poner Manifiesto y tenemos que dejar unos 160 px desde las raíces hasta el comienzo del texto» · «y por debajo también, hasta la línea, 160 px» → «Manifiesto» visible (Family, `text-h1`), centrado y 32 px por encima del brote; la punta de la raíz principal acaba 160 px por encima de la cima de la capitular (`AIRE` en el encaje y `--aire` en el relleno del texto); bajo la firma, 160 px hasta la línea del pie (medido: 160 en Chrome y WebKit, 1280 y 390). `verify.cjs` en /manifiesto limpio.
- **A media ronda (Andoni):** «Manifiesto tiene que estar centrado verticalmente en el hero y más grande» · «otros 80 px desde las raíces hasta el texto» · «por debajo del texto hasta la línea horizontal, 240 px» → título centrado en el primer pantallazo (medido: su centro = el de la pantalla) a `clamp(3.5rem, 2rem + 7vw, 8.5rem)`; raíz → capitular 240 px; firma → línea del pie 240 px (medido en Chrome y WebKit, 1280 y 390).
- **A media ronda (Andoni, con captura):** «sigues sin ponerme espacio por debajo» · «la T mayúscula, siempre en oscuro» → la «línea horizontal» era la fila de carriles con la que empieza el cierre, pegada al último párrafo: el texto lleva ahora 240 px debajo (medido: 240 en Chrome y WebKit, 1280 y 390; el cierre vuelve a su relleno de siempre). La capitular, en la tinta del texto desde el principio: fuera el 12 % de espera y el destello de savia.
- **A media ronda (Andoni):** «en otoño tenemos que darle más tonalidades otoñales, en primavera lo mismo, y en invierno igual; la de verano está bien» → `tools/r155/tonos.cjs` recolorea las HOJAS del brote (no la bellota ni las raíces) con siete tonos por estación repartidos en manchas suaves, conservando el sombreado de la acuarela y con algo más de viveza (el motor apaga el color al pintarlo): otoño granate · cobre · naranja · oro · oliva; primavera verdes tiernos y lima con rosas de cerezo; invierno marrones secos, ocre, azul escarcha y blanco. Bases sin tocar en `tools/r155/base/`. Verano, como estaba.
- **PUBLICADA (09/10) en https://savvia.studio** (Andoni: «sube a GitHub y publica»): rondas 152–155 en un commit, `1ea0bfd` → Vercel. Las capturas de revisión de las rondas (`tools/r1*/shots/`) quedan fuera del repositorio. Medido EN VIVO: `verify.cjs` en /, /manifiesto, /brandbook, /lab, /proyectos y /proyectos/neety (Chrome y WebKit, 1280 y 390) limpio, 0 ≥ 400, desborde 0; `og.jpg?v=155` 200. Sigue `noindex, nofollow`.

### Ronda 156 · 2026-10-12 · vuelve Agentation, apartado del (+) (en local, Eric)
- **Eric (textual):** «ponme agentation» · «y cuidado que no se solape con el + que hay ahora».
- **Hecho (`Base.astro`):** restaurado el bloque de las rondas 38 y 83 (Andoni lo había quitado en la 153): en LOCAL va siempre; publicada, `?feedback=1` se recuerda en ese navegador hasta `?feedback=0`; solo escritorio. Su barra nacía en la esquina inferior derecha (337×44 a 20 px) encima del (+) flotante de `Mando.astro` (44×44 a 32 px): una regla inyectada la aparta a la izquierda (`right: 92px; bottom: 32px`, selector `[class*="styles-module__toolbar"]`, versión fija 3.0.2).
- **Medido** (Chrome real, 1280×720, `?carga=0`): antes, barra y (+) solapados; después, barra en x 851–1188 y el (+) en 1204–1248, sin solape, también tras pulsar sus botones; consola limpia · `astro check` 0 errores. No publicado ni subido.
- **A media ronda (Eric, Agentation sobre `#servicios`): «me gusta el azul que está en invierno. no sé si lo podemos aplicar aquí. ahí tendremos que ver el
  sistema de diseño».** Hoy Servicios (`surface-warm`) lee `--color-salvia`, el «bloque claro» de cada estación desde la ronda 152 (2.ª), por decisión de
  Andoni («el azul de Servicios no me convence: una paleta temática por estación»): pétalo · prado · hoja seca · Hielo #CADCEE. El azul que gusta es el Hielo
  de invierno. **Hecho, PRUEBA bloque-azul por parámetro, sin tocar el sistema:** `?bloque=hielo` = el Hielo de invierno en Servicios en las cuatro
  estaciones; `?bloque=cielo` = un azul de cielo PROPIO de cada estación (abril #D4E3F2 · mar de agosto #C2DDEE · noviembre #CCD8E3 · enero #CADCEE), que
  mantiene la regla de Andoni y da a Eric el azul. El color vive solo en `#servicios` (Base.astro pone `html[data-bloque]`; global.css); las caras de las FAQ
  y el brandbook no cambian. Contraste tinta de la estación / azul: 9,6–10,4 en los ocho casos. Para quitarla: buscar «PRUEBA bloque-azul».
  **Medido** (Chrome real, 1440×900, `?carga=0`): sin parámetro Servicios 236·191·143 (hoja seca); con `?bloque=hielo` 202·220·238 y texto 59·35·27; consola
  limpia · `astro check` 0 errores. **SIN medir en vivo** `?bloque=cielo` y las otras estaciones: a mitad de la comprobación el servidor pasó a 500 porque OTRA
  SESIÓN estaba sustituyendo `Mando.astro` por `Radio.astro` en `Nav.astro` (no es de esta prueba). **Por acordar entre los dos:** va contra la ronda 152 de
  Andoni; si se queda alguna variante, pasa al sistema (brandbook › «bloque» de cada estación) y se quita el parámetro.
- **A media ronda (Eric, Agentation sobre «¿Adónde quieres llegar?»): «el a dónde tiene que estar separado y tenemos que adjuntar una batería de
  preguntas más extensa, así en animación, no solo 4» · «puedes meterte en mi Drive y leer lo que hay en Savvia - Andoni x Eric x José Luis» · (al
  verlo) «la animación tiene que ser como la de antes, me gustaba más; solo que cuando sale la segunda o tercera tanda, que sean preguntas
  diferentes. Ojo, alguna pregunta parece que se corta».** Leídos los seis documentos de la carpeta (los dos Keynote no se leen por Drive): las dos
  fases de investigación, la Narrativa del 2 de septiembre, los Mensajes clave de José Luis, la sesión del 21 y el feedback del 23. **Hecho:**
  `home.ts › recorrido.briefing` = 16 preguntas REALES del briefing en cuatro tandas de cuatro (quién eres · qué ha pasado · cómo trabajáis · qué
  viene después), cada una con su origen en el comentario; «¿A dónde quieres llegar?» separado. `TarjetaPaso.astro` (demo 01): la lista apilada de
  cuatro de siempre, pero cada vuelta de 9 s enseña la tanda siguiente (brief.md · 4 → 8 → 12 → 16 respuestas guardadas) y vuelve a empezar. Un solo
  RELOJ en CSS: `@property --t` (segundos) animado en `.reloj` y heredado; cada pregunta deriva con `calc()` y `clamp()` su llegada (`--j` tanda, `--k`
  fila; salida suave con `pow()`), su check y su apagado; las cuatro tandas comparten las mismas filas de una rejilla. Sin `animation-delay` (con
  retraso e `infinite` cada pieza iba a su ciclo y con 16 no cuadraban). Las preguntas se PARTEN en dos líneas (`text-wrap: balance`), nunca se
  recortan. Probada antes y descartada por Eric: una cinta de 15 preguntas que se desplazaba hacia arriba. **Medido** (Chrome real desde el
  scratchpad con playwright-core, 1280×800 y 390×844, DPR 2; `verify.cjs` no corre en este Mac): tanda 1 → 2 → 4 con sus cuatro preguntas y checks,
  el brief a 1 a los 7,2 s de cada tanda, 0 preguntas recortadas en los dos anchos (en móvil, cuatro a dos líneas), consola limpia · `astro check`
  0 errores. **SIN medir:** WebKit. No publicado ni subido (sigue el lote de la ronda 156 sin commit).
  **Después (Eric): «un pelín más rápida, como estaba al comienzo» · «las preguntas, que salgan de forma aleatoria».** Tanda de 8,2 s (antes 9): llegada
  a 0,5 + k × 1,05 s en 0,45 s (curva pow 4, como la expo de antes), check 0,75 s después, brief a 5,4 s. Un `<script>` en `TarjetaPaso.astro`
  BARAJA las 16 preguntas entre las cuatro tandas al cargar (Fisher-Yates), antes de que la demo despierte; las tandas de `home.ts` quedan como
  orden de referencia. Medido (Chrome real, 1280): dos visitas con órdenes distintos y las 16 únicas; 4 checks y brief a 1 a los 6 s; consola limpia.

- **A media ronda (Eric): «quiero que el sonido sea guay con música» · «el botón de música tiene que ir arriba a la derecha cerca de la hoja y menú, no sticky» ·
  «que el tercer icono parezca de música».** Eric pegó el resumen del reproductor de su otro proyecto (SoundControl: fundidos, emisoras como filtro, volumen
  igualado, siempre apagada al llegar) como listón. **Hecho (`Radio.astro`, reescrita; la píldora flotante de la 1.ª versión, en `tools/retirados/Radio.r156a-pildora.astro.txt`):**
  la radio vive en la BARRA, entre el logotipo y la hoja de estación, con la misma caja que la hoja (nota doble de Iconoir apagada; encendida, TRES barras de
  ecualizador en fila que bailan con la música REAL —AnalyserNode sobre los dos `<audio>`, solo tras un gesto; sin él, respiran por CSS— y la pausa al pasar).
  Al pasar el ratón o enfocar cuelga un PANEL de cristal oscuro: emisoras Todas · Lo-fi · Instrumental (se recuerda), la lista de piezas con la que suena
  marcada (con sus barritas en Coral), «siguiente» y «Suena …»; Esc lo cierra; en táctil el toque enciende y apaga. MOTOR: dos `<audio>` que se relevan con
  FUNDIDOS por rAF (entra en 700 ms, se apaga en 700; al cambiar de pieza o emisora la que se va baja en 260 ms mientras la nueva entra: cruce sin silencio),
  contador de turno (un play() tardío no pisa al siguiente), entra a mitad de una pieza al azar y encadena sin repetir la última; en una visita nueva arranca
  callada; en la misma sesión sigue al cambiar de página (si el navegador no deja sin gesto, se apaga sola a 1,5 s y al primer gesto lo intenta otra vez).
  VOLUMEN IGUALADO: las doce piezas recodificadas desde los originales de 320 kbps con `loudnorm` en dos pasadas a −18 LUFS / −1,5 dBTP (antes iban de −8,8 a
  −17,7 LUFS: nueve decibelios entre una y otra), MP3 96 kbps 44,1 kHz (`norm.sh` en el scratchpad; 1,5–2,8 MB por pieza). Iconos nuevos en `lib/iconos.ts`:
  `music-note` (la doble) y `skip-next`. `Nav.astro`: `<Radio />` dentro de `.acciones-nav`; con el menú abierto el botón va en Cacao como la hoja.
  **Medido** (Chrome 1280 y 390 táctil, WebKit 1280; dev en :3935; `tools/verify.cjs` no corre en este Mac, pruebas en el scratchpad): botón a 44 px de la hoja;
  panel al pasar y cerrado con Esc; encender → suena a mitad de pieza, vol 0,5, analizador conectado; Lo-fi → 7 piezas; pieza elegida suena y queda marcada;
  siguiente; apagar → vol 0,18/0,13 a 350 ms y en pausa a 1 s; tras cambiar de página sigue sonando en Chrome y en WebKit se apaga sola (sin gesto); 0 errores
  de consola (WebKit: solo el aviso de precarga de la fuente, que ya estaba); `astro check` 0 errores. Resuelve el «Ojo» de la ronda 157: ya no hay botón
  flotante abajo que choque con la barra ‹ 01/04 ›.
  **Después (Eric, con captura): «igual que el sonido, el icono sea más onda que una corchea» · «la canción activa abajo no está bien alineada» · «el scroll de
  canciones delimitado por una nubecita» · «el sonido del mockup de naturaleza, cuando hagas scroll ahí, tiene que respetarse: se quita la música y empieza el
  sonido de naturaleza».** Hecho: el icono es LA ONDA, cinco barras en fila (apagada, una onda quieta 0,4 · 0,7 · 1 · 0,7 · 0,4 que se abre un poco al pasar;
  encendida, bailan con la música: graves en el centro, agudos fuera; fuera la nota de Iconoir, `music-note` queda importado sin uso); «Suena …» alineado con
  los nombres de la lista; la lista con máscara que desvanece arriba y abajo (12 → 24 px) y sin barra de scroll; LA MESA MANDA: `sonido-estudio.ts` ya no se
  calla con la radio, avisa con `savvia:mesa` cuando su ambiente suena (sección a la vista y sonido permitido) y la radio se funde a 0 en 700 ms y se pausa en
  la pieza (texto «X sigue al salir de la mesa», barras calmadas); al salir, sigue por donde iba con su fundido. Medido (Chrome, WebKit y 390 táctil): al
  bajar a #proyectos cede → vol 0, en pausa; de vuelta arriba vol 0,5 sonando; 0 errores. **Ojo:** `public/sonido.md` (la guía del otro proyecto) está en `public/` sin seguimiento: se serviría en
  /sonido.md; no es de la web. **Pendiente de Andoni:** si la radio en la barra le vale (él puso el mando abajo a la derecha en la 153); no publicado ni subido.

### Ronda 157 · 2026-10-12 · Proyectos destacados: la fase «sentado por scroll» con el selector y la web que se coge con un clic (en local, Eric)
- **Eric (Agentation, sobre `.marco-monitor`, 1710×985):** «está perfecto que del titular pase a esto. Pero esto ya tiene que ser el slider igual que cuando estás sentado.
  Tú, cuando estás sentado, haces clic dentro del monitor y scrolleas la web dentro del monitor. Pues aquí igual. Solo que si haces clic fuera o scrolleas fuera sigues
  scrolleando a las siguientes secciones. Veo bien que luego se haga zoom out y que haya opción de volver a sentarte con el clic ese, y ahí ya sí es un sentado con esc».
- **Hecho (`Proyectos.astro`, solo la fase B de la ronda 152; C, D y el sentado de verdad no cambian):** en B salen el SELECTOR de proyecto de la vista sentado
  (‹ 01/04 Nombre ›, sin el cristal del esc: `.escenario.asiento .arriba` oculto) y la FICHA de cristal con «Ver caso de estudio» (entra a los 0,2 s); la rotación
  automática de capturas se para en B. La web se coge con un CLIC dentro del monitor (`pointerdown` en el escenario que cae en el rectángulo de la pantalla →
  `explorar(true)`: web real o página entera, la rueda la recorre sin mover la página) y se suelta con un clic fuera; la rueda fuera mueve la página, sale de B y
  la suelta sola. Mover el ratón sobre el monitor ya no la coge en B (sigue haciéndolo de pie, en D): solo cambia el cursor a mano (`.asiento.mira`). El selector y
  la ficha no sueltan la web; al cambiar de proyecto con la web cogida, el nuevo se monta vivo. La píldora dice «clic en el monitor para navegar · fuera, para
  levantarte» (táctil: «toca el monitor…») y se va al coger la web. `pointerleave` del escenario solo cuenta con ratón: con el dedo el navegador lo dispara al
  levantarlo y soltaba la web recién tocada. Al levantarse con esc, el selector se queda si la fase es B.
- **Medido** (Chrome real sin ventana, GL por software; `tools/verify.cjs` no corre en este Mac y la vista previa de Ship Studio se apagó a mitad; pruebas en el
  scratchpad): 1280×720 y 1710×985, dos pasadas limpias cada una: en B selector visible y esc oculto, ficha a 1, píldora encendida; mover sin clic → solo la mano;
  clic dentro → `explora`, iframe montado, píldora fuera; 5 golpes de rueda dentro → 0 px de página; flecha → Playground con la web cogida; clic fuera → suelta;
  rueda fuera → sale de B (selector oculto, fase D); silla → sentado con esc; de vuelta a B tras el esc, selector otra vez; consola limpia. 390×844 táctil: toque
  dentro → cogida, toque fuera → suelta, desborde 0. Una primera pasada a 1710 dio una vez el selector oculto tras la flecha: no se ha vuelto a reproducir en
  tres pasadas más. `astro check` 0 errores en este archivo (los errores de `Nav.astro › Radio.astro` y `handbook.ts › pie.lugar` son de OTRA SESIÓN abierta a la
  vez sobre el repositorio; el servidor estuvo en 500 un rato por eso).
- **Ojo (visto en la captura de 390):** la barra ‹ 01/04 › centrada abajo choca con el botón flotante «Lo-fi» de la otra sesión (y antes con el (+)); pasa igual en
  el sentado de verdad. Por decidir dónde va el mando en móvil.
- **Pendiente:** `astro build` no se ha pasado (el repositorio tiene a medias los cambios de la otra sesión); no publicado ni subido.

### Ronda 158 · 2026-10-12 · el copo más fino y la flor de cerezo en el icono de estación (en local, Eric)
- **Eric (Agentation, sobre `.estacion-ic`):** «el icono de copo de nieve que sea un poco más finito. El de primavera tenemos que cambiarlo, que sea una flor más
  bonita y fina».
- **Hecho (`src/lib/iconos.ts`):** el copo de Iconoir baja de trazo 2,1 a 1,7. La FLOR deja de ser la de Iconoir (ocho pétalos que a 20 px eran una mancha): un
  dibujo propio en la rejilla de 24, cinco pétalos de CEREZO (la primavera de savvia) estrechos en la base, anchos hacia la punta y con su muesca, el centro calado
  (evenodd), rellena como todas las estaciones. Generada con un script (pétalo paramétrico girado cinco veces; candidatas comparadas a 20/32/96 px sobre oscuro y
  claro). Afecta a la barra, al (+) flotante y a las fichas de estación del brandbook; el catálogo de Iconoir del brandbook sigue enseñando su `flower` a trazo.
- **Medido:** `astro check` 0 errores · vista previa (Ship Studio, 1280): copo e invierno y flor en primavera en la barra, consola limpia. **SIN medir:** WebKit, móvil
  y el abanico del (+). No publicado ni subido.
- **A media ronda (Eric, Agentation sobre la web de Arkdev en el monitor, 1710×985): «cuando estoy en este estado de slider de primeras y hago click en la
  pantalla la web no me desliza».** Causa medida: de pie las cuatro `.web` están apiladas (son las capturas que rotan) y las que no se ven, a opacidad 0
  con `.cargando`, quedaban ENCIMA de la activa: el clic sí cogía la web (`explora`, iframe montado), pero la rueda caía en una transparente
  (`elementFromPoint` = `DIV.web.cargando`). **Hecho (`Proyectos.astro`):** de pie, `.web:not(.on)` sin `pointer-events`. Vale también para la fase D.
  **Medido** (Chrome sin ventana, 1710×985, fase B, clic en el monitor y 5 golpes de rueda): Kuanta 0 → 1000 · Playground 0 → 600 · Neety 0 → 1000 ·
  Arkdev 0 → 1620 px dentro, y 0 px de página en los cuatro; antes 0 → 0. El clic fuera la suelta; sin errores · `astro check` 0 errores. **SIN medir:**
  WebKit (el Playwright de Ship Studio no arranca su WebKit). No publicado ni subido.
- **A media ronda (Eric): «en las preguntas de la segunda sección, "¿Dónde vive hoy tu web?" no me gusta».** Sustituida en la tanda 3 (`home.ts › recorrido.briefing`)
  por «¿Cómo llegan hoy tus clientes a ti?» (del lado del negocio, sin repetir «¿Qué os cuesta cambiar hoy?» ni «¿Quién mantendrá la web?»). No publicado ni subido.
- **A media ronda (Eric, Agentation sobre `.demo > .onda`): «esta onda puede ser algo más minimalista».** `TarjetaPaso.astro`: de 34 barras de 2 px pegadas a 15
  trazos de 1,5 px con 6 px de aire, centrados, 24 px de alto (antes 36) y al 28 % de tinta (antes 38 %); el teñido de savia cuando contesta el cliente, igual.
  No medido a ojo en la vista previa (comprobado el marcado servido). No publicado ni subido.
  **Después (Eric): «igual la onda quitamos».** Fuera la onda (marcado y estilos `.onda`, `ola`, `turno`); la demo 01 queda con la píldora «Escuchando…» y las preguntas.
  **Después (Eric): «ajusta la animación para que siempre haya preguntas entrando y saliendo».** Las preguntas ya no van por tandas que se apagan juntas:
  van en CINTA (`TarjetaPaso.astro › .reloj`). La pregunta g = tanda × 4 + fila llega a los g · 1,3 s y se va 4 × 1,3 s después, justo cuando entra la
  siguiente de su fila (`mod()` sobre el reloj; vuelta de 20,8 s). Siempre hay cuatro a la vista y cada 1,3 s una sale (sube y se desenfoca) mientras otra
  entra. El rótulo «brief.md · N respuestas» se releva igual: cambia cuando se marca la última de cada tanda. Las preguntas se siguen barajando en cada visita.
  **Medido** (Chrome sin ventana, 1280×800, 14 muestras en 10 s): siempre 4 preguntas + brief visibles y una transición cada ~1,3 s; sin errores. **SIN medir:** WebKit.
- **A media ronda (Eric, Agentation sobre `.estacion-ic`): «esta flor parece un molino de viento, hazla un poco más real 🌸».** `iconos.ts › flower:fill`
  redibujada: cinco pétalos de cerezo ANCHOS y redondeados (casi se tocan) con la muesca en corazón y la base corta (los de antes, estrechos en la base y
  anchos en la punta, giraban como aspas), y en el centro un botón con cinco estambres entre pétalos. Revisada a 20, 32 y 128 px y en la barra (vista previa,
  primavera) · `astro check` 0 errores. No publicado ni subido.

### Ronda 159 · 2026-10-12 · árbol más grande y contenido más ancho en pantallas grandes (en local, Eric)
- **Eric (textual, con captura a 2000 px):** «en pantallas más grandes el árbol tiene que ocupar más y el max-width aumentarlo un poco más con un tope claro.
  El árbol y sus raíces crecen, cuidado».
- **Hecho (`global.css`):** token `--contenido` = `clamp(75rem, 75rem + (100vw − 90rem) × 0,5, 90rem)`: 1200 px hasta una ventana de 1440, crece con ella y
  topa en **1440 px** (a partir de 1920). Lo usan `wrap`, los carriles (`Carriles.astro`), el marco y las esquinas del hero, el borde de /proyectos y el índice
  del brandbook. `--roble-h` en escritorio: el tope pasa de 30 rem fijo a `clamp(30rem, 30rem + (100vw − 90rem) × 0,4, 38rem)` (sigue limitado por el alto
  de la pantalla); `--roble-w` nunca más ancho que `--contenido`. Las raíces comparten `--roble-w`: crecen a la par.
- **Medido** (Chrome sin ventana, árbol · raíces · marco): 1280×720 640 · 640 · 1184 (igual que antes) · 1440×900 1029 · 1029 · 1200 (igual) · 1710×985
  1212 · 1212 · 1335 · 2000×1150 1314 · 1314 · 1440 · 2560×1440 1314 · 1314 · 1440 (tope) · 390×844 sin cambios; desborde 0, consola limpia; captura a 2000:
  raíces alineadas con el tronco y pintadas · `astro check` 0 · `spacing-lint` en escala. **SIN medir:** WebKit (el Playwright de Ship Studio no trae su
  WebKit). No publicado ni subido.

### Ronda 159 · 2026-10-12 · la barra de scroll de savvia en el monitor (en local, Eric)
- **Eric (textual, con captura de la barra nativa del iframe):** «que la barra de scroll cuando estás deslizando la web sea algo nuestro por encima, una más grande y larga, para que se note que estás haciendo scroll sobre la pantalla».
- **Hecho (`Proyectos.astro › [data-desliza]`):** un pulgar de savia (Coral, filo claro y sombra) largo (24–55 % del alto) sobre un carril oscuro translúcido en el borde derecho de la pantalla, en cqh (crece al sentarse); sale mientras la web se mueve y se apaga a 0,9 s. La captura larga (Neety) se mide en su contenedor. Un IFRAME de otro dominio no deja leer su scroll: la barra sale solo si la web lo cuenta con `postMessage({ tipo: 'savvia-scroll', p, vista }, '*')`; entonces el iframe va 20 px más ancho y su barra nativa cae fuera del recorte. Kuanta, Playground y Arkdev siguen con la nativa hasta que se les añada ese aviso.
- **Medido** (Chrome sin ventana, 1280×720, sentado en Neety, rueda dentro): barra encendida (p 0,11, alto 0,24) y apagada a 1,3 s; sin errores · `astro check` 0 errores. **SIN medir:** WebKit, móvil. No publicado ni subido.
- **A media ronda (Eric, con captura a ~4600 px): «¿este sería el resultado esperado?»** No: todo topado y el hero de una pantalla de alto dejaba el titular en
  un vacío. Descartado el alto máximo del hero («el hero funciona mientras no se vean las raíces»). **Hecho, A PRUEBA («vamos a hacer la 2 a ver qué tal
  queda»):** ESCALADO PROPORCIONAL por encima de 2560 px: `html { font-size: clamp(100%, 0.625vw, 200%) }` (`global.css`): 16 px a 2560, tope 32 px a
  5120; por debajo no cambia; el suelo es el 100 % del visitante. Todo lo que va en rem (titulares, aires, `--contenido`, roble, raíces) crece a la par.
  Pasados a rem los px fijos que se quedaban pequeños: la rejilla del menú (`Nav.astro`: puntos, hueco y desplazamientos del hover) y las barras de la
  radio (`Radio.astro`). Para quitarlo: borrar esa regla de `html`. **Medido** (Chrome sin ventana): 1440 y 2560 iguales que antes (rem 16, h1 72); 3840×2160
  rem 24, h1 108, árbol 1971; 4600×2650 rem 28,75, árbol 2361 × 1092, marco 2588; 5120×2880 rem 32, h1 144, árbol 2628; desborde 0 y consola limpia en
  todos; capturas de hero, raíces, Proyectos, Más proyectos y preguntas a 4600: escalan bien. **Pendiente:** la lámina del roble (1260 px) se amplía ×2 a
  5120 y se ve más blanda; los filtros SVG (gooey) y los trazos de 1 px no escalan; WebKit sin medir.
- **Después (Eric): «algo más pequeña, que salga cuando hagas clic directamente; de altura más pequeña también; para todos los ejemplos».** Barra más estrecha (1,5 cqh, mín. 4 px) y pulgar más corto (12–26 % del alto); ya no sale solo al deslizar: está a la vista mientras la web se puede recorrer (cogida con el clic de pie, o sentado) y sigue al scroll; se va al soltarla o al levantarte. Medido (Chrome, sentado en Neety): encendida sin deslizar (p 0), p 0,171 tras deslizar, apagada al levantarse; sin errores · `astro check` 0. Las tres webs en iframe siguen necesitando el aviso `savvia-scroll` en su propio código.
- **A media ronda (Eric, con su hero en producción y en local: «cuidado cuidado»):** en su portátil (~1710×985) el árbol ya había crecido (480 → 561 px de
  alto, comiéndose el aire bajo el titular, que subía) y los carriles se abrían (1200 → 1335): el crecimiento arrancaba en 1440 px. **Hecho:** `--contenido` y
  el tope del roble crecen solo por encima de **1920 px** (contenido al tope de 1440 con 2400; roble a 38 rem con 2240); el escalado proporcional, por encima
  de 2560. **Medido contra producción** (Chrome, posición y tamaño de h1, árbol y marco): IDÉNTICO a savvia.studio a 1280×720, 1440×900, 1512×860, 1710×985 y
  1920×1080; solo cambia a 2560×1440 (árbol 1314 × 608, marco 1440).
- **Después (Eric: «barra fija mientras tanto»):** las tres webs en iframe (Kuanta, Playground, Arkdev) enseñan también nuestra barra y su nativa queda siempre fuera del recorte (iframe 20 px más ancho); como no se puede leer su scroll, el pulgar se queda QUIETO arriba (avisa de que se puede deslizar, no de por dónde vas) hasta que cada web mande el aviso `savvia-scroll`. Medido (Chrome, sentado en Kuanta): barra encendida, sin la nativa, sin errores · `astro check` 0.
- **Después (Eric: «meteremos el aviso»):** añadido el aviso `savvia-scroll` (solo actúa dentro de un iframe; un mensaje por fotograma como mucho, también al cargar) en el código LOCAL de Kuanta (`~/ShipStudio/andonimart-multiverse-home/site/src.html`, compilado con `site/build.py`) y de Arkdev (`~/ShipStudio/zernio/app/layout.tsx`). Medido en Kuanta (servida en local dentro de un iframe de otro origen, Chrome): 153 avisos al deslizar, p de 0 a 0,18 (Lenis mueve la ventana: vale). Arkdev: `typecheck` limpio, sin probar en navegador. NINGUNA de las dos está publicada: hasta que se publiquen, savvia sigue con la barra quieta en ellas. Playground, sin cambios (su código no está en este Mac).
- **A media ronda (Eric):** «el icono de ondas, un poco más pequeño, de altura sobre todo» → barras de `.m-ondas` al 62 % de la caja (antes 82 %), hueco 2,25 px.
  «a veces clico en una canción y a la primera no suena; me hace scroll a la que está sonando sin cambiar» → dos causas en `Radio.astro`: (1) al pulsar,
  el foco del botón volvía a disparar `abrir(true)`, que centraba la lista en la pieza que sonaba entre el pulsar y el soltar, y el clic caía fuera; ahora
  solo se centra al abrirse el panel. (2) `play()` esperaba a los metadatos: con la pieza lenta, el navegador ya no lo contaba como gesto; ahora se pide
  dentro del clic. Medido (Chrome, 1710×985, bajar la lista y pulsar tres piezas): antes 0 de 3 cambiaban, ahora 3 de 3; con el mp3 tardando 2,5 s suena al
  primer clic. **SIN medir:** WebKit (no está instalado aquí). No publicado ni subido.
- **Después (Eric, con captura): «el aviso, más minimalista y acorde con el diseño: está enorme».** La píldora de «clic para navegar» pasa a ser pequeña y de cristal como la del esc (velo de la noche al 52 %, filo claro, desenfoque, letra 2,4 cqh ≈ 10 px, ratón de 1 px de trazo) y el texto se acorta: «clic para navegar» / «toca para navegar» (B) y «desliza dentro» (D). Medido a 1280: 96 × 22 px (antes ~1100 × 130 en la captura).
- **Después (Eric): «en la pantalla de Multiverse veo una línea blanca con respecto al marco».** Medido a DPR 2: la primera fila de la pantalla salía a 144 de brillo (la web, a 40). Eran tres cosas en el borde fraccionario de la pantalla: el fondo #fbfbfa del visor (la «pestaña en blanco» de cuando se tecleaba la dirección), el fondo blanco del iframe y la costura entre el filo del bisel y el visor. Ahora el visor va en el negro del bisel (#121213) con su propio filo de 2 px, el iframe sin fondo y el filo de `.pantalla` a 3 px. Primera fila: 144 → 51; columna izquierda: 54 → 24.
- **A media ronda (Eric): «de una página a otra la radio se tiene que mantener en la misma canción y minuto».** `Radio.astro` guarda en la sesión
  (`savvia:radio-pos`: pieza, segundo y hora) cada segundo y al salir de la página; la siguiente la retoma ahí sumando lo que duró el viaje (tope 30 s).
  Antes cada página arrancaba otra pieza al azar a mitad. Si el navegador no deja sonar sin gesto, el primer clic la retoma en el mismo punto. Apagar borra
  la posición. Medido (Chrome, / → /proyectos → /manifiesto): misma pieza y el tiempo sigue (6,1 → 8,9 → 11,6 s), también con la reproducción automática
  bloqueada (tras el primer clic). **SIN medir:** WebKit. No publicado ni subido.

### Ronda 160 · 2026-10-12 · «clic para navegar» pegado al cursor y la pantalla que se enciende al cogerla; fuera la barra de scroll propia (en local, Eric)
- **Eric (Agentation sobre el iframe del monitor, 1710×985):** «ese clic para navegar puede estar más presente, como al pasar sobre la pantalla; y que si haces clic, a la pantalla, los bordes, se le aplique algo de color. Así no hace falta el tema del scroll sobre el scroll».
- **Hecho (`Proyectos.astro`):** con ratón, en la fase B, «clic para navegar» (píldora de cristal con un punto de savia, 12 px) va PEGADO AL CURSOR mientras está sobre el monitor y la web no está cogida; vive en el `<body>` (dentro del escenario escalado `fixed` no vale) y se va al salir, al hacer scroll de página o al coger la web. Al coger la web (clic de pie, o de pie en D al moverse sobre ella), la pantalla se enciende con un filo de savia por dentro (`.visor::after`, inset, `max(2px, 0.8cqh)`); se apaga al soltarla. La píldora fija de abajo queda solo para táctil. FUERA la barra de scroll propia de la ronda 159 (marcado, script, estilos y el `postMessage`); el iframe sigue 20 px más ancho para que no se vea su barra nativa. Deshecho el aviso `savvia-scroll` que se había añadido en local a Kuanta (`andonimart-multiverse-home`, `git checkout`) y a Arkdev (`zernio/app/layout.tsx`): ya no hace falta.
- **Medido** (Chrome sin ventana, 1440×900, fase B en Kuanta): al pasar, la etiqueta sale junto al cursor (en el body, opacidad 1) y la píldora fija no; al hacer clic, `.explora` y filo Coral visible (captura), etiqueta fuera; clic fuera, suelta; sin errores · `astro check` 0. **SIN medir:** WebKit, móvil.
- **A media ronda (Eric): «se para un segundo al cambiar de pantalla, ¿se puede solucionar?»** Sin ClientRouter el hueco de la recarga no se evita
  (opción descartada por ahora: obliga a adaptar todos los scripts; por acordar con Andoni). Se disimula: `transicion.ts` avisa con `savvia:salir` y la
  música baja a 0 mientras la gota cubre la pantalla (0,5 s); la página nueva la retoma en su punto con un fundido de 0,45 s (`SIGUE`); al volver con
  «atrás» (bfcache), también. Medido (Chrome, /proyectos → /): vol 0,5 → 0 en 570 ms al salir; al llegar 0,04 → 0,5 en ~400 ms, misma pieza.
- **Después (Eric): «diseñar un poco el ratón que te acompaña» · «el borde al hacer clic, muy grande: algo sutil sobre el recuadro exterior, no el interior» · «que el clic también sirva en el recuadro exterior».** El acompañante: el cursor se oculta sobre el monitor y lo sustituye un PUNTO de savia (8 px) clavado a él; un ARO de cristal (40 px, filo Rosa niebla, desenfoque leve) le sigue con retraso (lerp 0,22) y a su lado el rótulo «clic para navegar» (11 px); al pulsar, el aro se cierra sobre el punto, se llena de savia y se abre al irse. El filo interior se va: al coger la web, un filo de savia de 1,5 px FUERA de la pantalla, sobre el marco (`outline` de `.pantalla`, que su `overflow` no recorta, con un desplazamiento de 4 px). El clic en el marco cuenta como en la pantalla (`enMonitor` con un 4 % del ancho de margen). Medido (Chrome, fase B en Kuanta): acompañante en el body al pasar; clic 6 px fuera de la pantalla → la coge; filo visible; sin errores · `astro check` 0.
- **Después (Eric): «el recuadro de fuera tiene que casar con el del ordenador, con sus redondeados: mejor una luz difuminada, como si estuviese detrás de la pantalla» · «el puntito que te acompaña es AI slop de manual; el círculo no convence: algo que siga al ratón normal» · «me gusta cómo se tiñe, pero hay que ver el color para cada estación».** Fuera el filo de `outline`. La luz es la sombra exterior de `.halo-monitor`, una caja con el rectángulo y el redondeo del monitor (los del marco de sentado): una box-shadow exterior no se pinta bajo su caja, así que el monitor queda limpio y la luz solo asoma alrededor, como desde detrás. Color por estación (`--halo`): otoño la savia (#FF616B, 55/22 %); primavera #FF4F95 (75/30 %: el rosa de la savia se perdía en el cielo rosa); verano #D4F56A (80/34 %); invierno #7FB4FF (85/38 %: el glaciar se perdía en la nieve azulada). El acompañante: fuera el punto y el aro; la flecha normal (mano sobre el monitor) y, abajo a su derecha, una píldora de cristal con un ratón dibujado de botón izquierdo en savia y «clic para navegar», que la sigue con retraso. Capturas de las cuatro estaciones en el scratchpad de la sesión · `astro check` 0.
- **A media ronda (Eric): «ya estoy haciendo el cambio en staging de neety.treseiscero.app/home para que se pueda mostrar con animaciones».** Staging manda ya
  `content-security-policy: frame-ancestors 'self' https://savvia.studio https://*.savvia.studio http://localhost:*` (neety.com, sin cambios) → fuera `embed: false`
  de Neety en `home.ts`: sentado y al cogerla de pie va la web real en el iframe (Eric lo vio funcionando). **«El lateral no está bien ajustado»:** el iframe
  iba siempre 20 px más ancho (ronda 159) y en Mac, con la barra superpuesta, recortaba 20 px por la derecha de TODAS las webs. Ahora se ensancha lo que mide
  la barra en ese navegador (`BARRA`, medida con un div con `overflow: scroll`): 0 en Mac, ~15 en Windows. Medido (Chrome sin ventana): iframe a 1440 px, sin
  errores · `astro check` 0. No publicado ni subido.
- **A media ronda (Eric): «que la pantalla del ordenador sea como si tuviese más altura, como la veo en mi MacBook Air»** → la web del monitor se pinta a
  1710 px (antes 1440; móvil 1024) y se reduce (`Proyectos.astro › BASE`): cabe la sección de Neety entera. Medido: iframe de Neety a 1710 × 930. **«Y las
  capturas de thumbnail a esa proporción»** → `tools/r160/capturar.cjs`: las cuatro miniaturas de los destacados a 1710 × 930 (antes 1440 × 900; las viejas en
  `tools/retirados/proyectos-r159/`), sin la barra de pruebas «HERO · A·Código / B·Esquema» de Zernio. Kuanta y Arkdev siguen con su web real (como en la 136).

### Ronda 161 · 2026-10-12 · la carga, solo la primera vez (en local, Eric)
- **Eric (textual):** «haz que el loading solo aparezca una vez. la primera vez».
- **Hecho (`Base.astro`):** vuelve la regla de la ronda 69 (la 135 la había puesto en cada visita): si este navegador ya la terminó o la saltó (`localStorage` «savvia:carga», lo guarda `Cargador.astro › acabar`), no sale. `?carga=1` la sigue forzando para revisarla; `?carga=0` la salta.
- **Medido:** `astro check` 0 errores. No publicado ni subido.

### Ronda 161 · 2026-10-12 · Proyectos destacados: el clic en la fase de sentado por scroll te sienta, y esa fase dura el doble (en local, Eric)
- **Andoni (Telegram, 15:45):** «al final si no pasas el ratón por la pantalla y haces clic es como que te lo pierdes» · «guiar de alguna manera que te incite a
  clicar: como para ver los proyectos clicas y te lleva a estar sentado». **Eric:** «la pantalla de carga, una vez has clicado, que no aparezca la URL de staging ni nada».
- **Hecho (`Proyectos.astro`):** en la fase B TODA la escena invita (mano y la píldora «clic para sentarte» pegada al cursor en cualquier punto, menos sobre el
  selector y la ficha; táctil: «toca para sentarte»). El clic (o el toque: `click`, que no salta al arrastrar) te SIENTA con el viaje de cámara: web real, esc y ×
  (antes la barra del esc no salía si te sentabas desde B: `[data-estudio]:not(.sentado)` en la regla que la oculta). Al levantarte vuelve el encuadre del scroll.
  Fuera el «coger la web» en B (la ronda 157); de pie (D) sigue igual. B dura el doble: pista 350 → 395 lvh (85 entrar · 90 sentado · 75 levantarse · 45 de pie;
  `FA/FB/FC`). La pantalla de carga al sentarse ya no enseña la dirección: solo «savvia» y la línea.
- **Medido** (Chrome sin ventana, 1440×900 y 390×844 táctil): B a 0,30 y 0,58 del recorrido; píldora junto al cursor en la esquina de la escena; clic → sentado
  con esc y ×; Esc → B con su encuadre; toque en móvil → sentado; desborde 0, sin errores · `astro check` 0 errores. **SIN medir:** WebKit. No publicado ni subido.

### Ronda 162 · 2026-10-12 · «Más proyectos»: el nombre del cliente baja al pie de la tarjeta (en local, Eric)
- **Eric (Agentation sobre `.pieza > .lamina`, 1710×985):** «lo que no me convence es el título del cliente arriba a la izquierda… no sé si por tamaño o porque puede estar en el footer de la card».
- **Hecho (`Anteriores.astro`):** en las nueve piezas de proyecto el nombre sale de la imagen y va al PIE: nombre en Family a 20–26 px (antes `text-h3` sobre la imagen) y, a la derecha, dominio · sector en `--fg2` (si no cabe, baja debajo). Fuera el velo oscuro de arriba de las escenas (solo estaba para leer el nombre). La pieza de entrada que rota (Kuanta, Arkdev…) conserva su nombre encima: su relevo vive ahí.
- **Medido** (Chrome real, 1710×985 y 390×844): sin errores, desborde 0 · `astro check` 0 errores. **SIN medir:** WebKit. No publicado ni subido.

### Ronda 162 · 2026-10-12 · la construcción del reel antes de cada miniatura de Proyectos destacados (en local, Eric)
- **Eric (textual):** «por cada uno de ellos, antes del thumbnail, mostrar la animación del reel que tenemos de cada uno: "el agente" y "nosotros" vamos
  pintando el thumbnail» → elegido: rehacerla en la web (el reel tiene las webs ladeadas en 3D y el proyecto de HyperFrames está en el Mac de Andoni) y
  cada vez que entra un proyecto.
- **Hecho:** `src/scripts/construir.ts` (nuevo): en la pantalla del monitor, el fondo de la web y la retícula de 12; dos cursores, «el agente» (savia) y
  «nosotros» (oscuro), se reparten las cajas de la maqueta (medidas a ojo sobre cada miniatura, `PLANOS`: cabecera, líneas de titular, botones en savia,
  visual) y cada caja se traza desde su esquina; al final la miniatura se PINTA encima con `rasgo-circulo.png` desde la última caja (~4,8 s en total).
  `Proyectos.astro`: capa `[data-construye]` (z 3, bajo la pantalla de carga), `construirActiva()` al estrenar y en cada cambio de pie (rotación y flechas
  en B); se corta al sentarse y al coger la web. Rotación de pie 7 → 10 s.
- **Medido** (Chrome sin ventana, 1440×900): fase D (Kuanta) y fase B tras la flecha (Playground) capturadas a 0,6–6,2 s; al sentarse la capa se apaga; sin
  errores · `astro check` 0. **SIN medir:** WebKit, móvil. Las miniaturas de Kuanta y Arkdev siguen enseñando Multiverse y Zernio. No publicado ni subido.
- **Después (Eric): «que dure un poco menos y que solo aparezca una vez, en el primer proyecto que aparezca».** Solo al estrenar la escena (el primer
  proyecto); los cambios siguientes ya no la repiten; rotación de pie de vuelta a 7 s. Más corta: ~3,7 s con la miniatura pintada (antes ~5,6 con Kuanta).
  Medido (Chrome, 1440×900): arranca al llegar, se apaga a los 3,7 s, tras la flecha no vuelve; sin errores · `astro check` 0.

### Ronda 163 · 2026-10-12 · sentado, la luz de detrás del monitor (en local, Eric)
- **Eric (textual):** «cuando estamos sentado, recuperemos el fade blur que teníamos detrás de la pantalla para indicar que el ordenador está "encendido"».
- **Hecho (`Proyectos.astro › .halo-monitor`):** el resplandor de la ronda 160 (color de la estación) se enciende sentado (antes `display: none`), 1,2 s
  después, cuando la cámara se posa. La escena va ×k sentado: el desenfoque y la extensión de la sombra se dividen por `--k` para medir lo mismo en pantalla.
- **Medido** (Chrome, 1440×900): sentado desde la fase B y desde la silla, la luz asoma alrededor del monitor; sin errores · `astro check` 0. No publicado ni subido.
- **A media ronda (Eric): «el haz clic para sentarte tiene que tener diseño, como de una silla; el ratón ese lo quitamos».** La píldora que sigue al cursor
  lleva una SILLA de escritorio (dibujo propio en la rejilla de 24: respaldo, asiento, columna y base) dentro de un círculo de savia, que se endereza
  (−8° → 0) al aparecer; el texto en Timeless Sans 500 a 12,5 px (antes Grotesk 11). Fuera el ratón dibujado. Captura a DPR 2.
- **A media ronda (Eric): «en la construcción, en vez de nosotros, Andoni y Eric; y más smooth».** Tres cursores (el agente en savia, Andoni en claro,
  Eric en gris); cada uno recorre SUS cajas en cola (llegar 340 ms · trazar 300 · respiro 30), movidos con `transform` en px y una curva de ida y vuelta
  (antes `left/top` con animaciones que se pisaban). ~4,6 s hasta apagarse.
- **A media ronda (Eric): «que el ratón se convierta en eso que acabamos de diseñar, para que el usuario se dé cuenta; que se transforme tipo liquid».**
  En la fase B la flecha del sistema se oculta (`cursor: none`) y la píldora de la silla ES el cursor (el centro del círculo en la punta, sin retraso):
  nace como una gota de savia con la silla a 0,35 y ladeada, se hincha con rebote y se estira hasta la píldora (`clip-path` con curva elástica); al salir
  se recoge en la gota. Capturas a 40 · 160 · 320 · 800 ms.

### Ronda 164 · 2026-10-12 · el marco del monitor no cambia al sentarse (en local, Eric)
- **Eric (textual):** «al sentarme parece que el marco del ordenador cambia un poco; ¿puede ser por el background negro?».
- **Causa (medida, capturas a DPR 2 en el mismo encuadre de pie y sentado):** sentado se encendía `.marco-monitor`, el marco en CSS de la ronda 14
  (#060606 con filo gris de 1 px) por encima del bisel de la foto: se perdía el filo metálico cálido y quedaba un borde doble. Se puso cuando la lámina
  era de 1920 px; sentado ya se carga la de 5120 (ronda 39). **Hecho:** sentado no se enciende (la regla, comentada en `Proyectos.astro`). Comparadas otra
  vez: el bisel es el mismo en las dos. `astro check` 0. No publicado ni subido.
- **Después (Eric): «que el fade de atrás salga 1 segundo antes, al hacer clic en sentarte».** La luz arranca a los 0,2 s del clic (antes 1,2 s).

### Ronda 165 · 2026-10-12 · sin pausa extra en el scroll; «clic para sentarte» desde que empieza la construcción (en local, Eric)
- **Eric (textual):** «igual no hace falta que haya sticky en el scroll (si no estás sentado); que el botón de clic para sentarte empiece desde que la
  animación de desarrollo agéntico empiece».
- **Hecho (`Proyectos.astro`):** vuelve la pista de la ronda 152 (350 lvh, B de 45 lvh; fuera los 90 de la ronda 161). `invita()` = de pie, ya estrenada y
  no en D: el cursor-silla y el clic que te sienta valen desde el estreno (cuando arranca la construcción) y durante B y C; en D, la silla y el
  monitor como siempre. Sentarse en plena construcción la corta.
- **Medido** (Chrome, 1440×900): pista 3150 px; en el estreno, construcción en marcha y cursor-silla → clic → sentado; en C, cursor-silla; en D, no;
  sin errores · `astro check` 0. No publicado ni subido.
- **A media ronda (Eric, captura: «si me siento en mitad de la animación pasa esto»: sentado con el titular-pantalla encima del monitor y la ficha cortada).**
  Causa: al volver a subir, `estrenado` ya era true y el clic valía también en plena entrada (A), con el titular a pantalla completa. Ahora en A solo
  vale con el titular ya ido (a ≥ 0,97; `aE`), el cursor-silla se apaga si deja de valer aunque no cambie la fase, y sentado el titular-pantalla nunca se
  ve. Medido (Chrome): bajar hasta D, volver a A (0,15) y clic → no se sienta; en C → sentado limpio, con la ficha entera.
- **A media ronda (Eric, captura de BOP): «aquí hay que arreglar eso».** La barra del navegador (cristal de 12 px, ronda 156) flotaba ENCIMA de la cabecera de la web y la dirección se pisaba con su menú. Ahora la web empieza bajo la barra (`.mockup:has(.cromo) .vid { margin-top: 12px }`), en todas las piezas con navegador. Medido (Chrome, 1710 y 390): barra limpia sobre la cabecera, sin errores, desborde 0.

### Ronda 166 · 2026-10-12 · el salvapantallas: logotipo y hora (en local, Eric)
- **Eric (textual):** «en la pantalla de reposo, arriba que aparezca el logo savvia y debajo la hora y ya».
- **Hecho (`Entreacto.astro`):** arriba, el logotipo (la palabra «savvia», la misma máscara que la barra, 28 px de alto) y debajo solo la hora; fuera la estación
  y «Mueve el ratón / Toca para volver».
- **Medido:** `astro check` 0 errores · vista previa con `?reposo=3`: el bloque lleva el logotipo y «16:27». **SIN medir a ojo:** la captura sin ventana se queda a
  mitad del fundido. No publicado ni subido.
- **Ronda 166 (probada y descartada el mismo día):** la entrada por TIEMPO, sin fijar la sección (al estar al 60 % a la vista, el zoom se reproducía solo en
  2,2 s). Eric: «no, así no; quiero que se haga zoom in y out como antes, eso seguro». Vuelve el zoom atado al scroll de la ronda 165 (pista de 350 lvh).
  NO VOLVER: el zoom de Proyectos destacados desatado del scroll.

### Ronda 167 · 2026-10-12 · sin pausa en el monitor; la silla invita durante todo el zoom, también sin mover el ratón (en local, Eric)
- **Eric (textual):** «el tema es el sticky de la pantalla: que no haya; pero que a la vez incitemos a hacer clic para sentarte en toda esa transición y que eso
  te lleve al zoom a la pantalla, sticky total» · «cuando haces scroll sin mover el ratón no aparece el clic para sentarte; que aparezca aunque no muevas el ratón».
- **Hecho (`Proyectos.astro`):** sin la fase B: pista de 305 lvh (100 pegados + 85 entrar + 75 levantarse + 45 de pie); el zoom de entrada enlaza con el de
  salida y el cursor-silla invita desde el estreno hasta quedar de pie (A tras el titular · C); el clic te sienta. En táctil, «toca para sentarte» mientras se
  aleja. `invitarQuieto()`: en cada fotograma de la entrada se mira dónde estaba el puntero (o el centro del monitor si nunca se ha movido) y la silla sale ahí;
  fuera el `scroll → seguir(null)` que la apagaba. Selector y ficha (solo de la fase B) ya no salen de pie.
- **Medido** (Chrome, 1440×900, rueda sin mover el ratón): silla del 0,46 al 0,72 del recorrido, con el puntero quieto y sin haberlo movido nunca; de pie
  (D) se apaga; clic → sentado; sin errores · `astro check` 0. **SIN medir:** WebKit, táctil. No publicado ni subido.

### Ronda 168 · 2026-10-12 · sentarse desde cualquier punto del zoom, con el mismo viaje de cámara (en local, Eric)
- **Eric (textual):** «que estés donde estés se haga ese zoom in smooth que tenemos ya cuando haces clic sobre el botón de la silla».
- **Causa:** en pleno zoom del scroll la escena lleva `.entrando` (`transition: none`, para seguir al scroll): al sentarse saltaba al encuadre de golpe.
  **Hecho:** al sentarse se quita `.entrando` y `.escena.dolly.entrando` conserva la transición de 1,5 s (también al levantarse y volver al zoom del scroll).
- **Medido** (Chrome, sentado desde el 0,66 del recorrido): escala 1,21 → 1,27 → 1,42 → 1,88 → 2,05 → 2,15 en 1,6 s; al levantarse, igual al revés; sin
  errores · `astro check` 0. No publicado ni subido.

### Ronda 169 · 2026-10-12 · de pie, solo el primer proyecto (en local, Eric)
- **Eric (textual):** «es mejor que se quede solo el proyecto Multiverse hasta que te sientes, en vez de que vayan pasando: la animación de agente, Andoni y Eric
  termina, pasa al siguiente y no termina de verse el hero».
- **Hecho:** fuera la rotación de pie cada 7 s (ronda 67). De pie se queda el primero (Kuanta); los demás, sentado, con las flechas. Medido: 20 s de pie, siempre
  el mismo; sin errores · `astro check` 0. No publicado ni subido.

### Ronda 170 · 2026-10-12 · sin tramo fijado al final, de pie (en local, Eric)
- **Eric (textual):** «al final del scroll, cuando está la silla, también hay sticky del scroll: eso lo quitamos».
- **Hecho:** pista de 260 lvh (100 pegados + 85 entrar + 75 levantarse); la cámara acaba de alejarse justo cuando la pista se suelta y la sección sigue con
  el scroll normal (la llamada de la silla, a la vista mientras sale). Medido (Chrome, rueda): silla-cursor del 0,53 al 0,95 y de pie a partir de 1;
  sentarse en pleno zoom sigue siendo suave (1,87 → 2,15); sin errores · `astro check` 0. No publicado ni subido.

### Ronda 171 · 2026-10-12 · el cursor-silla en toda la sección; fuera el botón fijo de la silla; nada encima al sentarse (en local, Eric)
- **Eric (textual):** «el botón estático de siéntate igual ya no tiene sentido; que toda esa sección tenga el ratón personalizado y que siempre se muestre aunque
  no hagas hovering» · (capturas) «si haces clic en sentarte en ese estado, la ola de la siguiente sección se ve incluso sentado» · «se ve una banda blanca».
- **Hecho (`Proyectos.astro`, `global.css`):** `invita()` también en D (de pie): el cursor-silla en toda la sección, del estreno a que se va. Sin hover (puntero
  fuera de la escena o nunca movido), la píldora se ANCLA en el centro del monitor mientras se vea; con el puntero encima, va en él (`invitarQuieto`, también al
  hacer scroll en D). La llamada fija «Siéntate a ver los proyectos» ya no se ve: queda para el teclado (se ve al enfocarla). En táctil, «toca para sentarte»
  en C y D. Sentado (y durante el viaje de vuelta, `html.estudio-sentado`), la sección sube a z 58 por encima de las siguientes y la gota `.sube` se oculta:
  el escenario fijo vivía en el contexto de apilamiento de su sección y la sección siguiente (su ola y su fondo claro) le pasaban por encima.
- **Medido** (Chrome, 1440×900): de pie con la sección saliendo, cursor-silla y clic → sentado a pantalla completa, sin ola ni banda (captura); silla anclada al
  monitor con el puntero fuera; sentarse en pleno zoom sigue suave; sin errores · `astro check` 0. **SIN medir:** WebKit, táctil. No publicado ni subido.
- **Arreglo (Eric, captura: «sigo viendo» la sección siguiente al sentarse con la sección casi fuera):** la regla que sube la sección (`z-index: 58`) estaba en el
  bloque `<style is:global>` con `:global(...)`, que ahí no es válido: el navegador la descartaba entera. Sin `:global`, aplica (medido: `proyectos` con
  `position: relative; z-index: 58`; captura a pantalla completa).

### Ronda 172 · 2026-10-12 · sentado, el aviso de deslizar dentro de la pantalla (en local, Eric)
- **Eric (Agentation sobre el monitor, 1710×985):** «aquí un pequeño aviso en algún lado de que puedes hacer scroll sobre la pantalla; solo la primera vez hasta que
  hagas scroll».
- **Hecho (`Proyectos.astro`):** `.aviso-desliza`, píldora de cristal al pie de la pantalla (unidades de la pantalla) con una rueda cuya gota de savia baja, y
  «desliza para recorrer la web» (táctil: «desliza con el dedo…»). Sale al sentarse, cuando la cámara se posa (1,6 s). La capa `.capta-desliza` recoge el primer
  gesto (rueda, dedo o clic; el iframe es de otro dominio y no se puede saber si se ha deslizado dentro): el aviso se va y se recuerda en el navegador
  (`savvia:deslizado`). Ese primer gesto no mueve la web: a partir del segundo, normal.
- **Medido** (Chrome): sentado → aviso; rueda sobre la pantalla → fuera y `savvia:deslizado = 1`; levantarse y volver a sentarse → no sale; sin errores ·
  `astro check` 0. No publicado ni subido.

### Ronda 173 · 2026-10-12 · los dolores sin el óleo de Donostia (PRUEBA, en local, Eric)
- **Eric (Agentation sobre `.parada > .lado > .rama > .listo`, 1710×985):** «vamos a probar que ahí esté solo las animaciones ilustradas sin la foto de atrás».
- **Hecho (`Dolores.astro`, PRUEBA sin-oleo):** por defecto, sin el óleo de la estación bajo cada demo (`.sin-oleo .rama { display: none }`; ni lámina ni lienzo WebGL:
  tres contextos menos). `?oleo=1` lo devuelve. Para quitar la prueba: buscar «PRUEBA sin-oleo».
- **Medido:** vista previa (1280): la sección con `sin-oleo`, la demo sola sobre la noche; consola limpia. No publicado ni subido.

### Ronda 172 · 2026-10-12 · sentarse con la sección siguiente ya asomando (en local, Eric)
- **Eric (captura):** «sigo con problemas: si doy clic a sentarme cuando ya ha aparecido parte de la sección siguiente…».
- **Hecho (`Proyectos.astro › invita`):** probado primero recolocar la página al sentarse; Eric prefirió otra cosa: «si ya aparece la siguiente sección,
  que el ratón no te deje sentarte». Con la pista soltándose (su borde de abajo dentro de la ventana) no hay cursor-silla ni clic que siente.
- **Medido** (Chrome sin ventana, 1440×900): con la ola de la sección siguiente al 30 % de la pantalla, sin silla y el clic no sienta; dentro de la pista
  (alejándose), el clic sienta; sin errores · `astro check` 0. **SIN medir:** WebKit, móvil. No publicado ni subido.

### Ronda 173 · 2026-10-12 · sentarse también desde el titular de Proyectos (en local, Eric)
- **Eric (captura del titular-pantalla):** «aquí también deberíamos poder sentarnos, haciendo zoom out hasta el sentado».
- **Hecho (`Proyectos.astro`):** el cursor-silla y el clic valen en toda la pista pegada (`invita` = pegada y sin soltarse), también en A con el titular a
  pantalla completa y antes del estreno (fuera la condición `aE ≥ 0,97` de la ronda 165, que existía porque el titular quedaba encima: ahora sentado se FUNDE
  en 0,45 s mientras la cámara se aleja con el dolly de siempre hasta el encuadre de sentado).
- **Medido** (Chrome sin ventana, 1440×900, pista a 150 px): silla sobre el titular → clic → el titular se funde, la cámara se aleja al monitor (capturas a
  0,3 y 1,8 s), sentado con la web montada; Esc vuelve al titular; sin errores · `astro check` 0. **SIN medir:** WebKit, móvil. No publicado ni subido.
- **A media ronda (Eric):** «el Escape, cuando has entrado en sentado, que siempre sea el zoom out del escritorio a todo el ancho» → al levantarte (Esc o ×),
  la página va al final de la pista (la mesa entera, de pie) antes del viaje de cámara, te hayas sentado desde el titular o desde donde sea. Medido
  (Chrome): sentado desde el titular → Esc → pista con su borde al pie de la ventana (899,97 / 900) y la mesa entera. Al volver, el foco cae en el botón
  «Siéntate a ver los proyectos» y se ve su anillo de foco (ya pasaba antes).
- **PUBLICADA (12/10) en https://savvia.studio** (Eric: «subimos todo a producción»): commit `1ed1a64` (rondas 156–174 + `.github/workflows`). Primer push de Eric
  que se publica solo: la Action «Publicar en Vercel» llama al Deploy Hook (el secreto `VERCEL_DEPLOY_HOOK` ya estaba puesto) y Vercel lo sirvió a los ~3 min.
  Medido EN VIVO (Chrome, 1280): /, /proyectos y /manifiesto sin errores, 0 respuestas ≥ 400, desborde 0. Sigue `noindex`.

### Ronda 175 · 2026-10-12 · el paso 2 de los problemas, con el lenguaje de los otros dos (en local, Nilo)
- **Andoni (textual):** «coge de muestra lo último que ha hecho Eric en GitHub y vamos a cambiar el paso 2 de los problemas, algo que tenga más el estilo de los otros pasos».
- **Diagnóstico (capturas de las tres, `tools/r175/ver.cjs`):** la 01 (briefing, la de Eric) y la 03 (receta + landing) son piezas de INTERFAZ: píldora, filas en cristal tenue, texto pequeño, checks y pie en Coral. La 02 eran dos manchas que se fundían con dos ratones: otro idioma.
- **Hecho (`TarjetaPaso.astro`, demo 02; la anterior en `tools/retirados/TarjetaPaso.r174-fusion.txt`):** píldora «Generando skills…» (chispa + las barritas de la 01) y cuatro filas como las preguntas de la 01. En cada fila llega lo que pides tú (etiqueta «Tú», en claro) y lo que ponemos nosotros («savvia», en Coral), se acercan, se funden y queda su archivo `skills/<nombre>/SKILL.md` con el check; al final, el pie «skills/ · 4 skills únicas de tu marca». Un solo reloj (`--t`, como la 01): fila k a los 0,4 + k·2 s, pie a los 8,3, apagado a los 12, vuelta de 12,5 s. La idea de la fusión («con tu dirección y nuestro criterio») se conserva, dicha con interfaz. Con movimiento reducido: las cuatro hechas y el pie.
  · Copy en `home.ts › recorrido.skills` (de Nilo, PENDIENTE de visto bueno): dirección de arte («Que no parezca una plantilla» + «Una idea fuerte por página») · color («Nada de degradados morados» + «Un solo acento por bloque») · movimiento («Que se mueva sin marear» + «Animar solo lo que explica») · componentes («Que mi equipo pueda tocarla» + «Piezas con nombre y reglas»).
- **Medido:** `astro check` 0 errores · `tools/r175/reloj.cjs` (Chrome y WebKit): las cuatro filas entran a los ~1, 3, 5 y 7 s y la vuelta se repite · capturas en Chrome 1280, WebKit 1280 y Chrome 390 · `tools/verify.cjs` en / (Chrome y WebKit, 1280 y 390): consola limpia, 0 ≥ 400, desborde 0 · `spacing-lint` en escala. No publicado ni subido.
- **A media ronda (Andoni):** «no tan parecido al paso 1; algo más como lo que teníamos antes pero enriquecido: antes transmitíamos muy bien esa idea de tú + nosotros» · «en los anteriores pasos siempre hay algo en pantalla y en este no; además, al ser más rectangulares, las raíces llegan mejor a los otros pasos».
- **Hecho (2.ª y 3.ª; la de filas, en `tools/retirados/TarjetaPaso.r175-filas.txt`):** vuelve la FUSIÓN con los dos ratones, enriquecida y dentro de una MESA rectangular (un panel como los de los otros pasos: cristal tenue, cabecera «skills/ · tú + savvia»), a todo el ancho de la demo: la raíz llega a su canto. Cada forma lleva lo suyo, fuera del filtro gooey: la de savvia (Coral) «Nuestro criterio» con tres reglas; la tuya (en claro; antes Cobalto) «Tu dirección» con tres muestras. Los dos ratones (etiquetas en oscuro, para leerse sobre las dos) las juntan; al fundirse, la forma única es una SKILL con nombre («SKILL.md · Diseño ✓» → Movimiento → Desarrollo; un reloj `--t` de 6 s por skill). Debajo, SIEMPRE a la vista, las tres fichas: apagadas hasta que se hacen; hecha, se enciende con un filo de savia; al acabar la vuelta se apagan juntas. Textos de la skill en unidades de la mesa (`cqw`: en móvil la forma es más pequeña). Fuera «decidido juntos ✓». `home.ts › recorrido.skills` = Diseño · Movimiento · Desarrollo.
- **Medido:** `astro check` 0 errores · capturas en Chrome 1280 y 390 y WebKit 1280 y 390 (las tres paradas juntas: mismo ancho y misma familia) · `tools/verify.cjs` en / (Chrome y WebKit, 1280 y 390): consola limpia, 0 ≥ 400, desborde 0 · `spacing-lint` en escala. Entre vuelta y vuelta, dentro de la mesa quedan ~0,5 s sin formas (la mesa y las fichas siguen). No publicado ni subido.

### Ronda 176 · 2026-10-12 · cada skill, su dibujo al fundirse (en local, Nilo)
- **Andoni (textual):** «me gusta; ahora, ¿podemos hacer que cada skill que se genera represente algo diferente al unirse?».
- **Hecho (`TarjetaPaso.astro`, demo 02):** dentro de la forma fundida, entre «SKILL.md ✓» y el nombre, cada skill dibuja lo suyo nada más unirse (`--p`, 1,1 s): **Diseño**, una «Aa» en la tipografía de titulares y tres muestras de color que llegan una tras otra · **Movimiento**, una curva de salida suave que se traza con una bola que la recorre (los puntos de la curva se generan al compilar con la misma fórmula que mueve la bola) · **Desarrollo**, cuatro líneas de código con sangría que se escriben. Tamaños en `cqw` de la mesa. `home.ts › recorrido.skills[].i`.
- **Medido:** `astro check` 0 errores · capturas de las tres skills a medio dibujar y terminadas (Chrome 1280, WebKit 390) · `tools/verify.cjs` en / (Chrome y WebKit, 1280 y 390): limpio, desborde 0. No publicado ni subido.

### Ronda 177 · 2026-10-12 · la fusión llega de un sitio distinto en cada skill (en local, Nilo)
- **Andoni (textual):** «y cada paso la animación de juntarse cambia, para que no se haga repetitivo».
- **Hecho (`TarjetaPaso.astro`, demo 02):** las dos formas (y sus rótulos y ratones) viven ya en el centro de la mesa y cada vuelta parten de un sitio distinto (`--sx`/`--sy` en `.taller`, según la vuelta del reloj `--t`): **Diseño**, en diagonal (savvia arriba a la izquierda, tú abajo a la derecha, como siempre) · **Movimiento**, de lado a lado, en horizontal · **Desarrollo**, en la otra diagonal (savvia arriba a la derecha, tú abajo a la izquierda). La tuya, siempre desde el lado opuesto a la nuestra.
- **Medido:** `astro check` 0 errores · capturas de las tres salidas y sus fusiones (Chrome 1280, WebKit 390) · `tools/verify.cjs` en / (Chrome y WebKit, 1280 y 390): limpio, desborde 0. No publicado ni subido.

### Ronda 175 · 2026-10-12 · fuera el ambiente de naturaleza (la música se queda y baja al sentarte) y levantarse más claro (en local, Eric)
- **Eric (textual):** «quitaría los sonidos de naturaleza y dejaría en esa parte la música, y cuando te sientas se baja» · «JL dijo que una vez sentado no sabía levantarse».
- **Hecho:** `sonido-estudio.ts`: el ambiente grabado ya no suena (`AMBIENTE = false`; ya no se avisa `savvia:mesa`, la radio no cede); `foco()` avisa con
  `savvia:foco` y la radio (`Radio.astro`) baja de 0,5 a 0,14 en 0,9 s al sentarte y vuelve al levantarte. Quedan los efectos de sentarse/levantarse.
  `Proyectos.astro`: la × sola pasa a ser un botón con texto «× Levantarse [esc]» (en táctil, sin la tecla); y sentado, un clic o la rueda FUERA del
  monitor (mesa, paisaje) te levanta, con cursor de alejar (`zoom-out`); espera 1,6 s tras sentarte para que la inercia no te levante sin querer.
- **Medido** (Chrome sin ventana, 1440×900): radio 0,50 en la mesa → 0,14 sentado → 0,50 levantado; rueda fuera, clic fuera y el botón levantan; cursor
  `zoom-out` fuera del monitor; sin errores · `astro check` 0 errores. **SIN medir:** WebKit, táctil. No publicado ni subido.

### Ronda 176 · 2026-10-12 · el mapa del sitio en el brandbook (en local, Eric)
- **Eric (textual):** «vamos a poner un sitemap en brandbook».
- **Hecho (`brandbook.astro`, sección 10 «Sitemap», `#mapa`, también en el índice):** una raíz (savvia.studio) y siete ramas: Inicio (sus secciones con
  su ancla), Portfolio (los casos), Handbook (los capítulos), Lab, Manifiesto, Brandbook (sus secciones) y la 404. Cada página es una tarjeta enlazada (ruta,
  nombre, nota) y lo que cuelga, una lista con su línea. Casos y capítulos salen de `proyectos.ts` y `handbook.ts` (crecen solos); las secciones de la home, a
  mano en el orden de `index.astro`. Por debajo de 1280 px, cuatro columnas sin las líneas de la raíz; en móvil, una.
- **Medido:** `astro check` 0 errores · vista previa a 1440 y 375: sin errores de consola, sin desborde visible. No publicado ni subido.

### Ronda 177 · 2026-10-12 · fuera el salvapantallas (en local, Eric)
- **Eric (textual):** «la pantalla de reposo no sé si tiene sentido, quitémosla».
- **Hecho:** `Entreacto.astro` (rondas 125–166) fuera de `index.astro` y movido a `tools/retirados/Entreacto.r176.astro.txt`; fuera `.reposo` de la regla de
  invierno de `global.css`. `?reposo=` ya no hace nada.
- **Medido:** `astro check` 0 errores · vista previa de la home sin errores de consola. No publicado ni subido.

## Rechazado — añadidos de la ronda 177 (NO VOLVER)
- El SALVAPANTALLAS (pantalla de reposo tras 60 s sin tocar nada).

### Ronda 177 · 2026-10-12 · brandbook y handbook se unifican en «Sistema» (en local, Eric)
- **Eric y Andoni (Telegram, 17:14):** Eric: «¿cuál es la diferencia entre brandbook y handbook? Igual podemos unificarlo todo como "Sistema", porque en
  brandbook estoy incluyendo, como en Neety, cosas de dev» · Andoni: «brandbook es nuestra marca y handbook tenemos que trasladar cómo hacemos los
  proyectos; se pueden unificar». Eric: «sí, móntalo así» (Marca · Método · Desarrollo).
- **Hecho:** `/sistema` (puerta con tres tarjetas, `src/pages/sistema/index.astro`) · `/sistema/marca` (el brandbook sin componentes ni sitemap) ·
  `/sistema/metodo` y `/sistema/metodo/<capítulo>` (el handbook, renombrado «Método»: `handbook.ts › nombre/titulo/sub`, títulos y «Fin del método»;
  el paso de página sigue, con las rutas nuevas en `PasarPagina.astro` y `transicion.ts`) · `/sistema/dev` (componentes y sitemap). Marca y Desarrollo
  son el MISMO componente (`src/components/sistema/Libro.astro`, el antiguo `brandbook.astro`) con `parte="marca" | "dev"`: cada página pinta su parte
  y su índice. El sitemap, con Sistema y Método. Menú y pie: «Más» → «Sistema». Redirecciones 301 en `astro.config.mjs › redirects`: `/brandbook`,
  `/handbook` y `/handbook/<capítulo>` (en build, páginas con meta refresh). Los componentes del método siguen en `src/components/handbook/`.
- **Medido:** `astro check` 0 errores · `astro build` OK · `spacing-lint` en escala · en local las ocho rutas responden (200 las nuevas, 301 las viejas) ·
  vista previa de /sistema, /sistema/dev y /sistema/metodo/principios a 1440: consola limpia. **SIN medir:** `tools/verify.cjs`, WebKit, móvil. No publicado ni subido.

### Ronda 178 · 2026-10-12 · la 404 de verano se llena de hierba (en local, Eric)
- **Eric (textual):** «de la página 404 en verano, tiene que crecer hierba de 404, como en verano que crece mucha».
- **Hecho (`404/Cuatro.astro`):** además del sol, HIERBA alta: brota por todos los cantos de las cifras que miran arriba (también dentro del 0) y, más alta y
  espesa (hasta el 36 % del alto de la cifra), a ras del suelo por todo el ancho, en matas y perdiéndose hacia los lados; ~2.000 briznas de nueve verdes con
  alguna espiga. Crece en ola de izquierda a derecha (~7 s), se mece con la brisa y un poco con el ratón, y el haz la dora (va en la misma capa que las cifras).
  Movimiento reducido: crecida y quieta.
- **Medido:** `astro check` 0 errores · Chrome sin ventana, 1440×800 y 390×844: 1.980 briznas, crecida a los 12 s por todo el ancho; en consola solo el estado
  404 de la propia página. **SIN medir:** WebKit. No publicado ni subido.

### Ronda 178 · 2026-10-12 · el monitor de la home, en Componentes (en local, Eric)
- **Eric (textual):** «en componente puedes incluir cómo está hecho el mockup de pantalla en la home».
- **Hecho (`sistema/Libro.astro`, Componentes de /sistema/dev):** «El monitor de Proyectos destacados»: MONTADO (la lámina de otoño con la pantalla, la luz y la caja
  medida a trazos con sus porcentajes, ampliado ×2,2 alrededor del monitor; las mismas medidas que `Proyectos.astro`) y DESPIECE en 3D (lámina · luz · pantalla · web,
  se separan más al pasar el ratón) + las cuatro capas explicadas (tamaños de la lámina, la sombra exterior que asoma, la caja medida con su filo y `cqh`, la web a
  1710 px reducida con `scale`, captura de pie e iframe sentado) y la escala neta 1 al sentarse.
- **Medido:** `astro check` 0 errores · Chrome sin ventana a 1440 y 390 (DPR 2): sin errores de consola, desborde 0, la web cae justo en la pantalla de la lámina.
  **SIN medir:** WebKit. No publicado ni subido.

### Ronda 178 · 2026-10-12 · las raíces de invierno sin semitono (en local, Eric)
- **Eric (textual, con captura):** «en invierno las raíces tienen ahí dithering o algo que no tiene la parte de arriba; quítaselo a las raíces».
- **Causa:** el árbol de invierno ralea (raleo 1) y eso apaga el semitono de los cantos y el deshacerse hacia fuera (ronda 133); las raíces usan
  `ESTACIONES_SIN_RALEO`, así que seguían con la trama de puntos a 45° y además con el hervor.
- **Hecho:** `estela.ts` gana la opción `nitido` (uniform `ni`): sin semitono en los cantos y sin deshacerse hacia fuera. `Raices.astro`: en invierno,
  `nitido` y sin `soplo` (como el árbol desde la ronda 144). Las otras estaciones, igual. Lo que queda de motas en los bordes es de la propia lámina.
- **Medido** (Chrome con WebGL por software, 1440×900 DPR 2, `?estacion=invierno`): antes la retícula de puntos bajo la línea de suelo; después, fuera; sin
  errores · `astro check` 0. **SIN medir:** WebKit, móvil. No publicado ni subido.
- **A media ronda (Eric):** «también cómo hemos hecho los 3D, y skills usadas · tecnología usada, stack» → tres secciones nuevas en /sistema/dev (y en su índice):
  **Stack** (Astro, Tailwind, TypeScript, fuentes, WebGL/Canvas/SVG, movimiento sin librerías, Web Audio, Iconoir, publicación y verificación) · **Cómo se hacen las
  piezas** (roble del hero, mesa, Eric y Andoni en 3D, webs grabadas, reel, flora, isotipo, sonidos: origen y script de cada una) · **Herramientas y skills** (Claude
  Code con subagentes, HyperFrames, web-perf-forensics, Artifacts, Agentation, Ship Studio, Playwright, sharp/ffmpeg/Python, Blender). Todo sacado del registro y del
  código. Medido: `astro check` 0 · `spacing-lint` en escala · Chrome 1440 y 390 sin errores ni desborde.

### Ronda 179 · 2026-10-12 · el recorrido de los dolores: dos pruebas descartadas (en local, Eric)
- **Eric (textual):** «no me convence la raíz, la veo un poco juguete comparado con lo demás».
- **Probado y descartado el mismo día:** (1) el trazo SVG con semitono (filtro de trama): «siguen siendo líneas bastante juguete»; (2) RAÍCES PINTADAS con
  el motor del árbol (la lámina de raíces del Manifiesto, un tramo por dolor bajando por el centro): «abruma mucho y no invita a leer». Vuelve la raíz vectorial
  de la ronda 51 mientras se decide.
- **Hecho (Eric: «dale» a la gota sola):** fuera la raíz, las raicillas y el hilo (`.raiz/.savia/.raicillas` ocultos; el código del trazo sigue para
  medir). Solo la GOTA de savia: cae RECTA sobre el centro de cada demo desde `min(520 px, 60 % de la pantalla)` por encima, con gravedad (p²) y estirada
  con la velocidad, llevada por el scroll (frente al 62 %); al tocarla salpica y la demo despierta. Fuera de una caída no se ve. La gota sale de la
  máscara del texto (si no, se borraba en los últimos 20 px). Después (Eric: «mejor transparente, como la del loading»): la gota de AGUA de la carga
  (cuerpo translúcido, canto, luz transmitida y brillo, los mismos degradados que `gota.ts › caerRealista agua`), casi redonda, y salpicadura clara; en
  invierno, sobre la nieve, un canto fino de pizarra.
- **Después (Eric: «la gota, ¿de dónde cae? del vacío no tiene sentido narrativo» → elegida la A):** UNA sola gota, la del árbol. Se forma bajo una
  raicilla de las raíces del hero (la punta más baja sobre la mitad izquierda de la primera demo, leída en el alfa de `/media/hero/raices-<estación>.webp`
  y exigiendo 12 px de tinta seguida hacia arriba: las rayas horizontales del semitono no valen), cuelga y engorda (90 px de scroll), se suelta y cae a
  la primera demo, que despierta. Solo cuando las raíces ya están pintadas (`Raices.astro` marca `.crecidas`). Las demos 2 y 3 despiertan solas al
  llegar su borde al frente. La primera demo va al lado de dentro de su celda (`justify-items: start`) para quedar bajo las raíces. Medido (Chrome
  1280, 1440, 1710, 390 e invierno): cae y despierta en todos; consola limpia.
- **Después (Eric: «que sean 3» → sin zigzag):** las tres demos en la MISMA columna (fuera la alternancia `derecha` de la ronda 51), al lado de dentro
  de su celda. CADENA de cuatro gotas a la misma x: raíz → demo 1 → demo 2 → demo 3 → Proyectos; cada una cuelga del borde de abajo de la demo
  anterior cuando esta ya está viva, se suelta y cae; la última se apaga al salir de la sección. Medido (Chrome 1280, 1440, 390): las cuatro caen y las
  tres demos despiertan en orden.
- **Probado y descartado (Eric: «step 1 → step 2 con sticky»):** el texto fijo a la izquierda con las demos pasando («está raro»: van
  desacompasados) y una ESCENA FIJA que capturaba el scroll («no hagamos captura de scroll, mucha gente lo odia»). Queda el scroll libre: cada texto
  al lado de su demo y aparece cuando la gota la riega. **NO VOLVER:** fijar los dolores (sticky o escena) para hacer pasos.
- **Si bajas deprisa:** la gota de la raíz no puede colgar de raíces a medio pintar. Al llegar a ella, los dolores piden a las raíces que acaben ya
  (`savvia:raices-ya`: 0,7 s desde donde iban) y, si ya has pasado la demo cuando terminan (`savvia:raices-crecidas`), la gota cae sola por tiempo
  (`caerRealista`, agua) y la despierta. Medido (Chrome 1440, scroll rápido): la demo 1 despierta tras la gota; consola limpia. No publicado ni subido. Medido (Chrome 1440): cae en las tres en orden y las tres despiertan; consola limpia ·
  `astro check` 0. **SIN medir:** WebKit, móvil. No publicado ni subido.
- **NO VOLVER:** raíces de lámina grandes detrás de los textos de los dolores.

### Ronda 180 · 2026-10-12 · Sistema completo como la librería de Neety; el Método, aparte (en local, Eric)
- **Eric (textual):** «en casa del herrero, cuchillo de palo. Nuestro sistema tiene que ser como el de Neety de completo. Por otro lado irá el handbook. Así que veo
  bien tener Sistema, donde detallamos todo de diseño y desarrollo, y luego por otro lado el handbook o método».
- **Hecho:** · `/sistema` es UNA página (`src/pages/sistema/index.astro` → `sistema/Libro.astro`, sin la prop `parte`) en tres grupos con índice lateral agrupado
  (se desplaza solo hasta el apartado que se lee): EMPEZAR (`sistema/Guia.astro`, bloque «empezar»: cómo usar el sistema, sitemap, recibir el proyecto, trabajar
  con Claude, cambiar contenido, añadir una sección, añadir una página, pedir cambios) · DISEÑO (logotipo, construcción, color y estaciones, tipografía, NUEVOS
  «Espaciado y retícula» y «Radios y sombras», voz, iconografía, movimiento, aplicaciones) · DESARROLLO (stack, componentes, NUEVO «Catálogo de secciones»
  —`sistema/Catalogo.astro`, 23 miniaturas reales en `public/media/sistema/catalogo/`, `tools/r180/miniaturas.cjs`—, piezas, herramientas y NUEVO «Mantenimiento
  técnico», bloque «mantenimiento» de Guia). Fuera la puerta de tres tarjetas (ronda 177). · El MÉTODO (antes handbook) sale del Sistema: `/metodo` y
  `/metodo/<capítulo>` (páginas en `src/pages/metodo/`; enlaces, paso de página y transición al día); en el menú, «Sistema» y «Método». Redirecciones:
  /brandbook y /sistema/marca → /sistema · /sistema/dev → /sistema#stack · /handbook(/x) y /sistema/metodo(/x) → /metodo(/x). · Datos viejos del libro
  corregidos (CTA en Timeless Sans, apretado −0,045 em, subtítulos en Light 300 + fila de `text-sub`, la radio es HoliznaCC0, verify.cjs con ruta del Mac de Andoni).
- **Medido:** `astro check` 0 errores · `spacing-lint` en escala · /sistema, /metodo y /metodo/principios 200; redirecciones 301 · Chrome 1440 y 390: consola limpia,
  desborde 0. **SIN medir:** WebKit, `astro build`. No publicado ni subido.
- **Pendiente:** «Método» o «Handbook» como nombre; `tools/verify.cjs` solo corre en el Mac de Andoni (ruta fija); en la miniatura de «Más proyectos» el nombre de la
  pieza que rota sale pisado con el anterior (con movimiento reducido): por mirar.
- **Después (Eric: «ahora está muy básico; me gusta el zigzag, pero en vez de raíz un CAMINO, el que sigues cuando estás savviando (en contacto con la
  naturaleza); otoño lleno de hojas · invierno de nieve · primavera de flores · verano de hierba»; referencias: senderos de bosque):** fuera la gota y
  su cadena; vuelve el zigzag de la ronda 51. EL CAMINO (`canvas.camino`, 2D, se pinta una vez por medida y estación; DPR ≤ 1,5 y ≤ 14 Mpx): sobre el
  mismo trazado ondulado de antes (de arriba al centro, donde acaban las raíces del hero, por cada demo), un sendero de 68 px (36 en móvil) que
  respira de ancho: TIERRA en manchas blandas y encima lo de la estación (otoño hojas anchas con su nervio; invierno nieve plana con sombra azulada;
  primavera florecillas de cinco pétalos y hierba tierna en los bordes; verano briznas hacia fuera, el centro pisado). Pasa por DEBAJO del texto y de
  las demos con un fundido blando (destination-out con sombra desplazada; la sombra va en píxeles del lienzo). Se descubre con el scroll (`--frente`,
  máscara con canto de 140 px) y al llegar a una demo, despierta. Medido (Chrome 1440 en las cuatro estaciones y 390): consola limpia, demos en orden.
  **SIN medir:** WebKit. No publicado ni subido.
- **Después (Eric: «queda muy tosco, serpenteante; quizá unas hojas cayendo y posándose, nada más»):** fuera el camino. LO QUE CAE (`canvas.caen`, fijo a
  la pantalla y recortado a la sección; solo corre a la vista): 14 piezas (8 en móvil) que caen despacio con vaivén, las del pie (`Pie.astro`: hoja con
  nervio): otoño hojas · invierno copos · primavera pétalos de cerezo · verano hojas verdes. Las que cruzan el borde de arriba de una demo se TUMBAN en
  él (10 por demo como mucho, se apagan en unos 45 s) y viajan con ella; las demás se pierden por abajo. Las demos despiertan al llegar el frente
  (trazado invisible de siempre). Sin movimiento reducido. Medido (Chrome 1440, cuatro estaciones, 25 s): caen y se posan, consola limpia.
- **NO VOLVER (ronda 179):** recorridos dibujados entre los dolores (raíz vectorial, raíz tramada, raíces de lámina, camino pintado): «juguete»,
  «abruma», «tosco». Tampoco la gota de origen inventado.
- **Final (Eric: «quita las hojas, no me convence; vuelve con la raíz que tenemos en prod»):** `Dolores.astro` vuelve a la versión publicada (`1ed1a64`:
  raíz vectorial, gota de savia y zigzag) conservando la letra del problema de las rondas 175 y 181; `Raices.astro`, sin lo añadido para la gota (se
  quedan las rondas 178 y 180). La última prueba (hojas que caen), guardada en el scratchpad de la sesión. Nada de la ronda 179 queda en la web.

### Ronda 181 · 2026-10-13 · la tierra bajo el hero (en local, Eric)
- **Eric (textual):** «simular de aquí abajo el background algo más oscuro, como si fuese tierra que rodea a las raíces».
- **Hecho:** token `--tierra` (global.css) = la noche de la estación con un 30 % de negro (`color-mix` en srgb; invierno 7 %: tierra helada). Empieza en seco en la
  línea de suelo (fondo de `Raices.astro`) y baja por los Dolores fundiéndose en la noche (degradado en `.dolores`, 0 → 60 lvh). Las raíces se hunden en la tierra
  (`t.fondo(tierra(n))`), no en la noche. Probado y descartado el mismo día: un grano/patrón de semitono encima («no es bonito, queda demasiado»).
  Después («que ocupe menos ancho y menos alto» · «un poco más alto»): una MANCHA en elipse centrada en la línea de suelo (`--tierra-mancha`: 0,62 ×
  `--roble-w` de radio por 1,75 × el alto de las raíces), que sigue en `.dolores` con el mismo centro (sin costura); fuera la franja a todo el ancho.
- **Medido:** `astro check` 0 errores · Chrome sin ventana 1440×900 DPR 2 en otoño, invierno y verano: sin errores, sin escalón en la costura. **SIN medir:** WebKit, móvil.
  No publicado ni subido.
- **Además:** resuelto el conflicto de `AGENTS.md` del `stash pop` (rondas 175–177 de Andoni + las de Eric, conservadas las dos); el `stash@{0}` (autostash) sigue guardado.
- **A media ronda (Eric, captura): «que la rama se integre bien con la ilustración animada; queda un gap».** El hueco de la máscara de la raíz en cada demo
  era la caja de la tarjeta + 20 px (la demo de «Escuchando» deja ~40 px vacíos arriba y abajo). Ahora es la unión de lo que se VE (`.demo > *`) + 6 px, con
  canto blando (`#hilo-blando-<id>`, desenfoque 8): la raíz llega hasta la píldora y sale bajo el pie. Medido: captura en invierno, 1440, sin errores.
- **A media ronda (Eric):** «esa curva, más bonita y que no se pegue al rectángulo» → la raíz entra por el centro de la pieza de arriba de cada demo y sale por el
  de la de abajo (antes, por el centro de la caja: caía en el canto de la píldora); S más abierta (`m` 0,5 → 0,38 del alto del tramo). «Las dos primeras curvas son
  preciosas; las de luego, parecidas» → la raíz apenas se afina (pierde un 22 % en todo el recorrido; antes acababa en 2,2 px). «Quitaría el punto de la rama»
  → fuera la gota de la punta (`.gota { display: none }`; la salpicadura al llegar a cada demo sigue). «Los rectángulos que salen hay que quitarlos» → en
  «Escuchando…» las cajas de las cuatro filas son fijas (`.caja-fila`) y solo se releva el texto con su check (antes la caja entera se desenfocaba al salir).
  Medido: captura de toda la sección (Chrome 1440, invierno), `astro check` 0 errores.
- **A media ronda (Eric):** «que la tonalidad sea igual que la de las raíces de debajo del hero» → la raíz y las raicillas llevan el tono MEDIDO en las raíces
  pintadas de cada estación (mediana de sus píxeles en Chrome: otoño #82584b · invierno #9d918d · primavera #874b59 · verano #6d5a50; raicillas, el 20 % más
  oscuro), con fundido de 2,4 s al cambiar de estación; el hilo de savia Coral sigue por dentro. «El rectángulo de fuera de la ilustración hay que quitarlo» →
  era el filo `box-shadow` que `dibujar.ts` (modo árbol) pone a la copia a líneas; nueva opción `sinMarco`, usada en las demos de los dolores.
- **A media ronda (Eric):** «no solo el tono: que tenga el mismo aspecto, que parezca salida del árbol» → probada y descartada la textura de la lámina con canto
  rasgado y halo de semitono («parece un pegote, hay que vectorizarlo bien»). Queda VECTOR: la raíz en su tono oscuro (sombra) y encima tres FIBRAS que se
  trenzan despacio (senos con fase propia, más finas en los cruces): dos en el tono medio y una veta clara, los tres tonos medidos en las raíces del hero por
  estación (`--raiz-osc · --raiz · --raiz-claro`). El hilo de savia, más discreto (1,2 px al 55 %). Medido: captura en otoño (Chrome 1440), `astro check` 0 errores.
- **A media ronda (Eric):** «la raíz tiene que salir desde la raíz de arriba y casar con sus colores» → nace en la PUNTA de la raíz principal pintada
  (último punto de `Raices.astro › data-eje`, medido en pantalla), fina como ella y engordando en los primeros 160 px; `.hilo` sube a z 2 (por encima de las
  raíces del hero, z 1) y la máscara de texto empieza 2000 px más arriba. Colores medidos otra vez solo en la pintura pura (sin el semitono, que los apagaba),
  el tercio más saturado: otoño #8c5342 · #9b6452 · #a97a67; invierno #4c3c34 · #705f58 · #9c8d85; primavera #904d5d · #a25d6d · #b97483; verano #74673d ·
  #81774a · #928a5e. Medido: captura de la unión en otoño (Chrome 1440), `astro check` 0 errores.
- **A media ronda (Eric):** «que salga de más arriba todavía, la primera curva más fina; que donde entre sea donde sale» → arranca a media altura del eje de
  la raíz pintada (punto 3 de `data-eje`, dentro de la masa de raíces) y engorda despacio (llega al grosor entero a ~440 px); en cada demo sale por la misma x
  por la que entra. «El centro de la raíz, más finito, más minimalista» → el hilo de savia a 0,7 px.
- **A media ronda (Eric):** «que salga de ahí, pero que las raíces del propio árbol estén por encima» → `.raices` sin z-index (no crea contexto), la tierra en su
  `::before` (z −1) y la lámina (`.caja`) a z 3: la raíz de los Dolores (z 2) pasa por debajo de la acuarela y por encima de la tierra.
- **A media ronda (Eric):** «la primera parte que se solapa, con blur, más orgánica» → el arranque tiene una copia desenfocada (blur 3,5) que manda al nacer y se
  apaga en ~280 px mientras entra la raíz nítida (dos máscaras con degradado vertical, `raiz-nitida/borrosa`). «En esa curva el tronco central, más fino» →
  grosor máximo de la raíz 9 → 6,5 px (móvil 6 → 4,5).
- **A media ronda (Eric):** «el blur del comienzo, mejor rollo backdrop filter, que salga del fondo marrón» → sin brillo: la copia desenfocada (blur 5) va
  tenue (pico 45 %) y la raíz nítida entra más tarde (de +140 a +320 px del arranque): nace fundida en la tierra y se va definiendo.
- **A media ronda (Eric):** «con scroll muy rápido aparece la raíz antes de que se generen las raíces del árbol» → `Raices.astro` avisa al terminar de pintarse
  (`savvia:raices-listas`, `window.__raicesListas`; también sin WebGL, con movimiento reducido o si ya quedaron arriba) y la raíz de los Dolores no pasa de 0
  hasta entonces; luego crece hasta donde toca a 1600 px/s (las demos despiertan al llegar ella, no antes). Medido: con 8 golpes de rueda nada más cargar,
  raíz a 0 a los 0,3 s y crecida a los 5 s, sin errores. «Que empiece totalmente vertical y luego gire» → 150 px rectos hacia abajo antes de la primera
  curva y el ondeo no entra hasta pasados; el hilo de savia va dentro del fundido del arranque (antes se veía nítido desde el principio).
- **A media ronda (Eric):** «lo del backdrop/blur queda raro: quitamos» → fuera el desenfoque del arranque (copia borrosa, máscaras y degradados). «Que la raíz
  vertical case con la raíz central del árbol» → el tramo recto nace en la x de la PUNTA de la raíz central (último punto de `data-eje`), a media altura de
  la masa de raíces, y baja recto hasta asomar bajo ella. Medido: captura en otoño (Chrome 1440), `astro check` 0 errores.
- **A media ronda (Eric):** «en esa zona que no se vea la línea, que se vea cuando terminen las raíces del árbol» → máscara `raiz-fuera`: invisible dentro de la
  masa pintada y fundido de 40 px en su punta. «La segunda sección a veces no carga hasta muy tarde» (la raíz esperaba los 3,6 s de las raíces del árbol) →
  si las raíces quedan en la mitad de arriba de la pantalla, terminan ×5 más deprisa; la raíz de los Dolores recupera a 3000 px/s. Medido: bajando hasta los
  Dolores nada más cargar, raíces listas a los 0,95 s (antes ~4 s).
- **A media ronda (Eric):** «al entrar en la ilustración, la línea más vertical: que gire más arriba y antes, más curva; y al salir igual» → cada demo se entra y
  se sale por 50 px rectos en vertical; la curva de enlace con tiradores más largos (m 0,38 → 0,5; a 0,62 hacía codos) y el ondeo se calma cerca de las entradas
  y salidas (`calma`). Medido: captura de toda la sección en otoño (Chrome 1440), `astro check` 0 errores.
  · **Corrección (Eric: «me has cambiado todos los giros; solo quería cambiar cómo llegaba a la segunda ilustración»):** vuelven todas las curvas de antes
    (m 0,38, sin tramos rectos) y SOLO la llegada a la segunda demo lleva el tramo recto de 50 px, m 0,5 y el ondeo calmado (`tramo(…, km)`, `k === 1`).
- **A media ronda (Eric):** «la llegada a la 2, incluso menos de 90º, unos 80º» → llega por un tramo recto de 60 px inclinado 10º y la curva de enlace termina
  con esa inclinación (`tramo(…, km 0,5, inclina)`); «perfecto». «Y la salida de la ilustración 2 igual, quizás 70º» → sale recta 60 px con 20º hacia la
  tercera y la curva siguiente arranca con esa inclinación (`inclinaA`). Las demás curvas, sin tocar.
  · **Corrección (Eric):** la llegada buena era la intermedia, SIN el tramo recto (la curva llega sola con m 0,5 e `inclina` de 10º: unos 60–70º en pantalla).
  · **Salida de la 2 (Eric: «que replique una curva similar»):** sin tramo recto; la curva hacia la tercera arranca con m 0,5 e inclinación de 10º (espejo de la llegada).
- **A media ronda (Eric):** «la primera curva más ligera, no tan pronunciada; me gusta que salga recta pero tiene que girar antes» → tramo recto 150 → 110 px
  (acaba justo bajo la punta pintada), la curva hacia la primera demo con m 0,5 e inclinación de 14º al arrancar, y el ondeo entra más suave (de 110 a 370 px).
- **A media ronda (Eric):** «la salida de la ilustración 2, un poco más larga, que la visión total sea una curva parecida a la entrada» → ese tramo con m 0,66
  (antes 0,5). Ojo: es el mismo tramo que llega a la tercera, así que esa llegada también entra algo más vertical.
- **A media ronda (Eric):** «en verano la rama, un poco más marrón y no tan verde» → verano #6e5235 · #7d6044 · #94785a (raicillas #5e4630); antes oliva.
- **A media ronda (Eric):** «en primavera el toque rosa, algo más oscuro» → #7a3f4e · #8a4c5c · #a0626f (raicillas #6a3a47).
- **PUBLICADA (13/10) en https://savvia.studio** (Eric: «publicamos todo»): commit `a5624f3` (rondas 175–181) → la Action «Publicar en Vercel» (éxito). Antes:
  `astro check` 0 · build OK (24 páginas) · `spacing-lint` en escala. Medido EN VIVO (Chrome, 1440 y 390): /, /sistema, /metodo y /proyectos sin errores de
  consola, 0 respuestas ≥ 400, desborde 0. **SIN medir en vivo:** WebKit (`tools/verify.cjs` lleva la ruta del Mac de Andoni). Sigue `noindex`.

### Ronda 182 · 2026-10-13 · el paso 2: cada skill se une a su manera (en local, Nilo)
- **Andoni (textual):** «quiero que cada paso tenga su propia animación, que no se repita siempre lo de fusionarse: cada una, su propia identidad».
- **Hecho (`TarjetaPaso.astro`, demo 02):** fuera los keyframes de fusión (rondas 10–177): la posición, el tamaño y el color de las dos formas (y de sus rótulos y ratones) salen del reloj `--t` con `calc()` (`--u` el segundo dentro de la vuelta, `--q` cuánto se han acercado), y cada skill tiene su gesto: **Diseño · SE MEZCLAN** (llegan en diagonal y se funden como dos tintas, la fusión gooey de siempre) · **Movimiento · ORBITAN** (giran una alrededor de la otra en espiral, una vuelta entera cada vez más cerca, con `sin()`/`cos()`, hasta ser una) · **Desarrollo · ENCAJAN** (sin tinta: dos mitades de una pieza de canto limpio, la nuestra arriba y la tuya abajo, que entran de lado a lado en cinco pasos secos y cierran una pieza; la capa gooey se apaga esa vuelta; cada mitad lleva solo su rótulo). La tuya vira a savia al unirse en las tres.
- **Medido:** `astro check` 0 errores · capturas de las tres uniones a medio camino y cerradas (`tools/r182/ver.cjs`; Chrome 1280, WebKit 1280 y 390) · `tools/verify.cjs` en / (Chrome y WebKit, 1280 y 390): limpio, desborde 0. No publicado ni subido.

### Ronda 183 · 2026-10-13 · Desarrollo se apila (fuera las mitades) y cada ficha gana su check (en local, Nilo)
- **Andoni (textual):** «el de desarrollo se ve un poco raro, y me gustaría que cada vez que se haga uno le salga el check al paso».
- **Hecho (`TarjetaPaso.astro`, demo 02):** Desarrollo ya no son dos mitades a pasos secos: son dos PIEZAS enteras de canto limpio (sin tinta), con su rótulo y su detalle como en las otras, que entran de lado a lado, la nuestra se MONTA sobre la tuya como una capa sobre otra (un instante, con sombra) y cierran de un golpe (`--p1`/`--p2`). La capa de piezas lleva `isolation` (su z-index tapaba rótulos, ratones y la skill). FICHAS: al hacerse su skill, además de encenderse con el filo de savia, a cada una le sale su ✓ en Coral; anchos según el nombre y letra en `cqw` para que quepan en móvil.
- **Medido:** `astro check` 0 errores · capturas de Desarrollo (llegar, montadas, cerradas, skill) y de las fichas con check (Chrome 1280, WebKit 390) · `tools/verify.cjs` en / (Chrome y WebKit, 1280 y 390): limpio, desborde 0. No publicado ni subido.

### Ronda 184 · 2026-10-13 · Desarrollo hace MERGE, línea a línea (en local, Nilo)
- **Andoni (textual):** «cómo se junta el desarrollo sigue sin gustarme, tiene que ser algo más relacionado con desarrollo».
- **Hecho (`TarjetaPaso.astro`, demo 02):** fuera las dos piezas que se apilaban (ronda 183). Cada pieza es ahora un archivo de seis LÍNEAS (seis franjas de su cuadrado, de canto limpio; 12 elementos `.pz` con `--k`): llegan enteras, con su rótulo, y línea a línea, de arriba abajo (0,2 s entre una y otra), las dos cruzan al centro y se INTERCALAN: una nuestra (Coral), una tuya (clara), como al fusionar dos ramas. Queda un archivo a rayas que vira entero a savia y se abre en la skill (cuyo dibujo ya eran líneas de código). Rótulos y ratones cruzan con las líneas de en medio; los rótulos se sueltan en cuanto salen las primeras.
- **Medido:** `astro check` 0 errores · capturas del merge en seis instantes (Chrome 1280) y en WebKit 390 · `tools/verify.cjs` en / (Chrome y WebKit, 1280 y 390): limpio, desborde 0. No publicado ni subido.
- **PUBLICADA (13/10) en https://savvia.studio** (Andoni: «dale a publicar»): rondas 182–184, commit `7517cd0`; esta vez Vercel recogió el push solo (ayer no lo hizo). Medido EN VIVO: `tools/verify.cjs` (Chrome y WebKit, 1280 y 390) limpio, 0 ≥ 400, desborde 0; las líneas del merge servidas y la demo sin errores.

### Ronda 185 · 2026-10-13 · la radio, sin silencio entre piezas (en local, Eric)
- **Eric (textual):** «ha terminado una canción y ha habido un silencio de 3 segundos».
- **Causa (medida con `silencedetect` a −40 dB):** diez de las doce piezas acaban con 0,4–8 s de silencio en el propio archivo (Everything You Ever Dreamed, 7,9 s;
  Keeping Cool, 4,6; First Snow, 4,6) y cinco empiezan con 0,4–1,4 s; además la siguiente solo se pedía al `ended` (con `preload = 'none'`: descarga + fundido de 0,7 s).
- **Hecho (`Radio.astro`):** cada pieza lleva `ini`/`fin` (dónde empieza y acaba su música). 2,5 s antes de `fin` arranca la siguiente (desde su `ini`) y las dos se
  CRUZAN 2,5 s (`CRUCE`); `ended` queda de respaldo.
- **Medido** (Chrome, Night Driving saltada al final): a los 125,3 s entra 2 Hour Delay (vol 0,26 → 0,5) mientras la otra baja (0,24 → 0) y se pausa en 128,1, antes
  de su silencio; sin errores · `astro check` 0 errores. **SIN medir:** WebKit. No publicado ni subido.

### Ronda 186 · 2026-10-13 · la sección 2 como MANIFIESTO que se entinta letra a letra (PRUEBA, en local, Eric)
- **Eric (textual, con dos referencias: un texto en serif que se entinta con el scroll y la librería de Neety de savvia agentic):** «replantear la segunda
  sección; y si no, revertimos: un manifiesto en el que leas bien los tres problemas y así presentamos savvia agentic; luego la ilustración animada, y luego
  proyectos destacados» · «el texto, de los archivos de Drive compartidos con JL» · «sin subrayar» · «la animación, letra por letra».
- **Hecho:** `Problemas.astro` (nuevo) sustituye a `Dolores.astro` en la home (guardado, sin borrar; `import` comentado). Orden: hero › raíces › manifiesto ›
  savvia agentic (`LaPartitura`, sube antes de Proyectos) › Proyectos destacados (ahora con `data-sube`: viene de lo claro) › Más proyectos › Servicios › …
  Texto: el manifiesto de «Sesión Narrativa Home Page | Savvia 21 Sept» (Drive con José Luis), reescrito con Eric en cuatro frases cortas («La IA es la base; el criterio sigue siendo nuestro.» · «Hacemos tu web como un traje a medida, mano a mano contigo.» · «Y te entregamos la receta.» · «savvia agentic: tu web conectada con la IA, con todo su sistema de diseño montado.»)
  y «Savvia Agentic» en minúscula. Family a `text-h2`, columna de 14 em centrada; cada letra arranca al 20 % y se entinta en orden de lectura atada al scroll
  (franja blanda de 14 letras; de que el texto asoma al 80 % a que su final llega a media pantalla). Sin subrayado. Lleva la mancha de tierra de las raíces.
  Sitemap del Sistema al día. **Para revertir:** volver a `<Dolores id="recorrido-a2" tarjetas />` delante de `<Proyectos />` y `LaPartitura` tras Servicios.
- **Medido:** `astro check` 0 errores · Chrome 1280 y 390: entintado a mitad capturado, consola limpia, desborde 0. **SIN medir:** WebKit. No publicado ni subido.
