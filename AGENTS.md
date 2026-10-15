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

## Rechazado — añadidos de la ronda 48 (NO VOLVER)
- Testimonios en VÍDEO de la web anterior: todos nombran el estudio anterior de viva voz. Solo texto, salvo vídeos nuevos grabados para savvia.

## Rechazado — añadidos de la ronda 58 (NO VOLVER)
- La VENTANA del pie (rondas 54–57: contraventanas, luz filtrada, siluetas, «still eric&andoni»): «quitamos la ventana; algo parecido, más sintetizado con el diseño».

## Rechazado — añadidos de la ronda 65 (NO VOLVER)
- El FORMULARIO de contacto del pie (rondas 32–59) y la LUZ del punto final (58–59): «Contáctanos» es un botón (cal.com).
- Proyectos destacados con ficha, dial y estación propia por proyecto: de pie, la escena solo invita a sentarse y a cambiar de estación.
- Las demos de proceso al pasar por Servicios (rondas 53–54) y los nombres «Web a medida · Cambios con IA · Equipos con IA».
- La flora y las voces que rotaban en «Más proyectos».
- El logotipo de la ronda 50 (el trazo que salía de la «a»): solo letras.
- La mezcla por diferencia en la barra.

## Rechazado — añadidos de la ronda 66 (NO VOLVER)
- El navegador (barra de Safari) sobre la web del monitor en los destacados, y poder recorrerla sin sentarse.
- Etiquetas de servicios separadas por forma: son compartidas y se tachan.
- La franja oscura de testimonios en «Más proyectos» (sin cambio de color) y los cuatro a la vez: uno que rota, con retrato.
- El roble único recoloreado por el motor: cada estación tiene su lámina.

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

## Rechazado — añadidos de la ronda 177 (NO VOLVER)
- El SALVAPANTALLAS (pantalla de reposo tras 60 s sin tocar nada).

## Guardarraíles
- `npx astro check` y `npx astro build` en verde antes de dar nada por hecho. Verificar con `node tools/verify.cjs <url>`
  (Chrome real + WebKit, 1280×720 y 390×844: consola limpia, 0 respuestas ≥ 400, desborde 0).
- Lo que deba correr en el primer frame va en `<script is:inline>` en el head. Alturas de pantalla en `lvh`/`dvh`, nunca `vh`.
- Antes de estrenar una clase o un selector global: `grep`. (En Astro los estilos de componente van acotados: usarlos.)
- No se hace commit, push ni deploy sin que Andoni lo pida (el 22/09 pidió publicar: ver receta arriba). `noindex` puesto hasta tener licencias y visto bueno.


## Registro de rondas
El historial completo (rondas 1–204 en adelante: peticiones textuales, lo hecho, lo medido y lo pendiente) vive en
`docs/registro-rondas.md`. NO se carga solo: leerlo (con grep) cuando haga falta saber por qué algo es como es.
**Cada ronda nueva se anota al FINAL de `docs/registro-rondas.md`, no aquí.** Aquí solo va lo que queda fijo
(sistema, rechazado, guardarraíles), en pocas líneas.
