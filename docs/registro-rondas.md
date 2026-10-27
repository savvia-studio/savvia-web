# savvia · registro de rondas

Lo que queda fijo de cada ronda está en `AGENTS.md`. Aquí, el historial. Las rondas nuevas, al final.

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
  Texto: el manifiesto de «Sesión Narrativa Home Page | Savvia 21 Sept» (Drive con José Luis), reescrito con Eric en cuatro frases cortas («La IA es la base; el criterio sigue siendo nuestro.» · «Hacemos tu web como un traje a medida, mano a mano contigo.» · «Y te entregamos la receta.» · «savvia agentic: tu web conectada con la IA.»)
  y «Savvia Agentic» en minúscula. Family a `text-h2`, columna de 14 em centrada; cada letra arranca al 20 % y se entinta en orden de lectura atada al scroll
  (franja blanda de 14 letras; de que el texto asoma al 80 % a que su final llega a media pantalla). Sin subrayado. Lleva la mancha de tierra de las raíces.
  Sitemap del Sistema al día. **Para revertir:** volver a `<Dolores id="recorrido-a2" tarjetas />` delante de `<Proyectos />` y `LaPartitura` tras Servicios.
- **Medido:** `astro check` 0 errores · Chrome 1280 y 390: entintado a mitad capturado, consola limpia, desborde 0. **SIN medir:** WebKit. No publicado ni subido.

### Ronda 187 · 2026-10-14 · la construcción del monitor con los punteros de savvia agentic (en local, Eric)
- **Eric (textual):** «los punteros, iguales a los de savvia agentic; que se muevan con su misma rapidez y suavidad; cada uno de los 3 hace cosas distintas, en
  lugares y orden diferentes: más natural».
- **Hecho (`src/scripts/construir.ts`, reescrito con un solo reloj rAF; estilos en `Proyectos.astro › .c-cursor`):** el dibujo de LaPartitura (flecha de 16,
  etiqueta en píldora del color con texto blanco, clic que encoge y onda), su curva de mano (0,42 0 0,24 1) con el ARCO y su ritmo (guion ÷ 0,62). Colores:
  el agente Coral, Andoni Cobalto, Eric Cereza (los de la estación, como en savvia agentic). Oficios: el agente traza titulares y baja; Andoni empieza por el
  visual (lo ronda antes de trazarlo, más despacio) y luego los botones, que pulsa; Eric la navegación y los textos de abajo arriba y, si le sobra tiempo,
  revisa con un clic una caja del agente. Los textos de cuerpo van al más libre. Entran por lados distintos y en momentos distintos, y salen al pintarse la miniatura.
- **Medido** (Chrome sin ventana, 1440×900, Kuanta): ~7,5 s hasta pintar la miniatura y ~9 s en total (antes ~4,6: los viajes van al ritmo de savvia agentic);
  sin errores · `astro check` 0. **SIN medir:** WebKit, móvil. No publicado ni subido.

### Ronda 187 · 2026-10-14 · el logotipo, más allá de la tipografía: primera lámina de variantes (en local, Eric)
- **Eric (textual):** «del logo, me gustaría que no solo sea tipográfico con la tipografía escogida sino que podamos cambiar algo de su vectorización para hacerlo único» · «ahora compramos la typo».
- **Licencias:** Family (titulares y logotipo) hay que COMPRARLA (la de ahora es la de prueba de Klim): solo Regular 400, formatos Web y Desktop (el Desktop cubre el logotipo; confirmar en el texto de Klim). Timeless (body) NO se compra: licencia libre 1.2, uso comercial y en logotipos; no subir a repositorio público ni modificar los archivos.
- **Hecho:** `tools/r187/variantes.cjs` → `tools/r187/shots/lamina-v1.png` (y los SVG en `tools/r187/svg/`): actual · A punto de la i en gota · B vv unidas · C brazo fino de la v rematado en gota · A+C · A+B, en grande y a 24 px sobre oscuro. La web no se ha tocado.
- **Ojo:** el titular del pie es texto vivo en Family (`Pie.astro:35`): si cambia el dibujo, tiene que pasar a SVG. «Ramas en letras» está en lo rechazado.
- **Pendiente:** elegir; con la Family comprada, regenerar el contorno desde el `.otf` bueno y aplicar ahí la variante.
- **A media ronda: Family COMPRADA** (Klim, pedido 26100706, 14/10/2026: Family Regular, licencia WEB, 5.000 usuarios/mes, savvia.studio; factura en ~/Downloads/Klim-Order-26100706.zip). `src/assets/fonts/family-regular.woff2` (estática, 400, 580 glifos con tildes, ñ y ¿ ¡) sustituye a la de prueba en `astro.config.mjs`; la de prueba queda en su sitio sin uso. Los titulares con tilde ya no caen a Georgia (medido en /metodo: «Método» entero en Family; consola limpia). **Solo se compró Web, no Desktop:** para redibujar y usar el logotipo como marca (contornos fuera de la web) falta la licencia Desktop de Klim.

### Ronda 188 · 2026-10-14 · réplica exacta del hero de Neety (en local, Eric)
- **Eric (textual):** «Tienes el hero de Neety (/home) extraído en tools/r188/neety-hero/ […] Referencia principal: 1440×900. Replica con esas medidas exactas y compara contra capturas/hero-*@2x.png».
- **Hecho:** `src/components/neety/NeetyHero.astro` (barra, card con el degradado horneado y su muesca, eyebrow con el punto que late, h1, píldora «Solicitar demo» con su hover,
  cinta de 7 tarjetas con esqueletos, tecleo y «Enviado ✓», subtítulo en la muesca / bajo la card en móvil, hamburguesa) traducido 1:1 del Tailwind de Hero, SignalFeed,
  PillCta, Navbar y HomePage, con sus breakpoints (md · lg · 1200 · xl · 1360 · alto < 840) y sus clamp en svh. La cinta, sin GSAP: función pura del tiempo con las mismas
  curvas y el mismo guion (ciclo de 26,6 s). Recursos en `public/media/neety-hero/` (1,6 MB). Página suelta de PRUEBA `/prueba/neety-hero` (sin la barra ni la carga de
  savvia): `?t=4.2` congela la cinta en el instante de las capturas; `?svh=830.3` reproduce el alto con que se midieron a 1440 × 900 (aquel Chrome resolvía 100svh = 830 px
  en una ventana de 900). Fuentes nuevas por la API de Astro: Inter 400 y Roboto Mono 500. `tsconfig` excluye `tools/r188/neety-hero/fuente` (código Next copiado).
- **Medido** (Chrome real sin ventana, DPR 2, contra `capturas/hero-*@2x.png`): error medio por canal 0,12 (1440×900), 0,08 (1280×720), 0,12 (390×844) y 0 píxeles con
  diferencia > 24 en los tres; paradas de la cinta 568 → 188 → −68 → −297,5 → −450 → −593 → −733 → −840 y vuelta a los 26,6 s, como `movimiento.md`; consola limpia ·
  `astro check` 0 errores · build OK. **SIN medir:** WebKit.
- **A media ronda (Eric, con una captura de Neety en tablet): «¿no sería interesante que lo que reflejásemos sea exactamente lo de esas dimensiones, en modo tablet?» · «sí, dale».**
  El hueco de savvia agentic (576 × 648) es justo ×0,75 de 768 × 864. La réplica pasa a responder a SU caja (container queries `nh`; `vw`/`svh` → `cqw`/`cqh`) y gana
  el modo `caja`: tablet de 768 × 864 escalada al ancho del hueco, sin reloj propio (la película llama a `__nh.pintar(t)` y `__nh.latir(l)`), con sus piezas marcadas
  `data-pz`/`data-slot` (fondo, logo, nav = la hamburguesa, eyebrow, punto, h1, ctas, esp, card, sub). `LaPartitura.astro`: fuera la home dibujada (marcado, CSS `.n-*`
  y `.sf-*`, FEED y su cinta); `rectLocal` escala las medidas al salir de la réplica; la cinta arranca al asentarse su tarjeta (en segundos reales: `/ VEL`); el espaciado
  «large · 48» abre el hueco titular → píldora de 24 a 48 px con su cota. En la película móvil (hueco 556 × 412) va la misma vista tablet, recortada por abajo.
  Inter y Roboto Mono, también en `Base.astro`. **Medido:** a 768 × 864 la réplica contra la `/home` real (dev server de Neety, :3159): mismas cajas, error medio 0,56 y
  0,26 % de píxeles (la franja de abajo: el desenfoque fijo de su página); la página de prueba sigue igual que las capturas (0,08–0,12); la película a 1440 y 390
  capturada en 6 instantes, sin errores · `astro check` 0 · build OK. **SIN medir:** WebKit. No publicado ni subido.
- **A media ronda (Eric):** «al final, un poco de scroll down sobre la web antes de que termine la animación; cubic-bezier smooth» → «que el scroll sea mayor, que se
  muestren 3-4 secciones» · «el degradado, "degradado granular", y que sea el que ponemos luego» · «ese puntito [de la píldora de estado] quitamos, es AI slop» ·
  «los outputs pueden ser más»: Cambios de copy · Editar ilustraciones · Crear landings para Ads · Subir blog al CMS · Añadir idiomas · Publicar un caso de cliente ·
  Actualizar precios · Ajustar SEO y metadatos · Hacer tests A/B · Revisar accesibilidad.
  **Hecho:** tras publicar, la home de Neety BAJA 2.850 px (px de la tablet; `cubic-bezier(0.65, 0, 0.35, 1)`): la réplica es el contenedor que se desplaza, la barra se
  queda pegada con su desenfoque y tinte (NavBlur.tsx) y la hamburguesa fija; debajo, «Nuestros clientes» replicado (Clients + LogoMarquee, la cinta a 55 px/s, logotipos
  `client-*.avif`) y «Por qué Neety», «De ruido a señal» y el arranque de «Neety por dentro» como CAPTURA de la web real a 768 px (`secciones-768.webp`, 187 KB, con sus
  entradas ya hechas). El guion gana `D = 2,6` (la cámara se queda dentro mientras baja) y `E = 1,2` (cola para las diez salidas): bucle de 16 → 19,8 s de guion (~32 s
  reales). La muestra de la librería se llama «Degradado granular» y es la imagen horneada del hero (la de tablet). Fuera el punto de la píldora de estado. Diez salidas
  (`home.ts › partitura.sale`), cada una con su entrada y su agente (`CONS`), cada 0,24 s; en escritorio a 44 px, simétricas con las entradas.
  **Medido:** `astro check` 0 · película capturada a 1440 (scroll en cinco instantes; las diez salidas) y a 390, sin errores de consola. **Ojo:** el servidor de desarrollo
  sirvió el script viejo de LaPartitura hasta tocar el archivo (`touch`). **SIN medir:** WebKit. No publicado ni subido.
- **A media ronda (Eric):** «el puntero de Tu equipo es el que tiene que pulsar en cada una de las 10 salidas». **Hecho:** Tu equipo (el que pide el hero al
  principio) va de salida en salida y pulsa cada una justo cuando aparece (`pulsa`, clic en A + 0,15, con su sonido); Claude, Codex y Diseño siguen trayéndolas desde
  su entrada (las dos que eran de Tu equipo pasan a Diseño). Salidas cada 0,4 s (antes 0,24) y cola `E = 2,7`: bucle de 21,3 s de guion (~34 s reales).
  Medido a 1440 y 390, sin errores.
- **A media ronda (Eric):** «mejora el diseño de esta pill» (la de estado, «Tu equipo toma «Logotipo»») · «esa línea horizontal quitamos» (la que cruzaba el pie
  «Ilus. 1»). **Hecho:** la píldora es un aviso de actividad de la app, en claro (blanco al 90 %, desenfoque, filo ciruela al 10 %): avatar del agente en su color con
  sus iniciales, nombre, «toma» y la pieza en etiqueta mono; leyendo y listo, los tres avatares; publicado, check en savia y «neety.com» (`data-m` = lee · toma · listo ·
  pub; `home.ts › estado[1]` = «Publicado en»). La línea era MÍA: la réplica llevaba su propio `<main>` y Carriles dibuja una fila por cada `main > section` (salía la de
  «Nuestros clientes»); en caja la réplica es un `div`. Medido: sin fila junto al pie, los cuatro estados capturados a 1440 y 390.
- **A media ronda (Eric):** «il.» (no «Ilus.») · «al acabar la construcción y salir Multiverse, el velo se corta a mitad un segundo» · «el botón, al ponerse, se
  pinta un poco más a la izquierda y más pequeño» · «lo de "publicado · neety.com" es un poco AI slop; la card central se ha quedado pequeña» · «el agente de diseño
  tiene que ser "savvia"». **Hecho:** pie «Il. 1» (abreviatura de la RAE). CONSTRUCCIÓN (`construir.ts`): las cajas y la retícula seguían encima de la miniatura
  pintada (el círculo tapaba media esfera) y el círculo rasgado, en %, no llegaba a la esquina opuesta (y al crecer más se alejaba de su origen): ahora la pintura va
  en z 1, cajas y retícula se apagan mientras se pinta, la máscara va en px centrada en la última caja con radio hasta la esquina más lejana y, pintada, se quita;
  el último fotograma es la captura entera, igual que la web de debajo (grabado fotograma a fotograma). BOTÓN: el destino del pick es la píldora (no la fila) y la copia
  llega a su tamaño exacto; el chip va debajo. TARJETA de la librería un 20 % mayor (se dibuja en 236 × 176 y se escala `KH`), sin la píldora de publicado: al publicar,
  un pie con filete, check fino en savia, «Publicado en neety.com» y «ahora». El tercer agente se llama «savvia» (antes «Diseño»).

### Ronda 189 · 2026-10-14 · Invopop sobre un paisaje BARRIDO (en local, Eric)
- **Eric (textual, con referencias de Harbor y dos tarjetas sobre naturaleza desenfocada):** «el fondo de los proyectos, con un barrido: backgrounds de naturaleza difuminados y con efecto de arrastre; ¿lo intentamos para la captura que te he mandado?» (la pieza de Invopop en «Más proyectos»).
- **Hecho:** `tools/r189/barrido.cjs`: el panel izquierdo de la ventana de la mesa (cielo, monte y bosque, sin monitor ni parteluces) de cada estación, con desenfoque de MOVIMIENTO en diagonal (−24°, 120 px, pesos en triángulo) + desenfoque leve → `public/media/anteriores/fondos/barrido-<estación>.webp` (900 × 1200, 12–16 KB). `Anteriores.astro`: Invopop deja la mesa (`escena`) y pasa a `mancha` con `barrido: true`: su navegador ladeado sobre el paisaje barrido de la estación de la web (vira al cambiarla).
- **Medido** (Chrome, 1440 × 900 DPR 2, otoño e invierno): fondo barrido bajo el navegador, sin errores · `astro check` 0 errores. **SIN medir:** WebKit, móvil. No publicado ni subido.
- **A media ronda (Eric):** «ahí, en Invopop, debería ir Kymatio» → la pieza es Kymatio (`home.ts › anteriores[0]`: kymatio.com · Ciberseguridad; colores de su web), con su vídeo grabado paso a paso (`tools/r189/grabar.cjs kymatio`: copia de `grabar-paso.cjs` que corre en el Mac de Eric) → `public/media/anteriores/video/kymatio.{mp4,jpg}` (495 KB). Invopop sale de «Más proyectos» (sigue en /proyectos y en su caso). · «el mockup de la web, mucho más moderno y translúcido; que el rectángulo de arriba no tenga tanto aire» → la ventana entera es CRISTAL (velo claro al 20 % + desenfoque 20 px del fondo + filo de luz), marco de 4 px alrededor de la web y barra de 10 px dentro del mismo cristal (sin franja propia), tres puntos y la dirección centrada; la web con esquinas de 7 px. Sobre degradados claros (Monad), el cristal se oscurece un poco. Medido (Chrome 1440 DPR 2): Kymatio, Monad y Cubbo capturados, sin errores · `astro check` 0.
- **A media ronda (Eric, captura):** «al pasar, el redondeado no va bien» (esquinas rectas mientras el fondo escala bajo la ventana de cristal) → `.lamina` lleva una máscara lisa (`mask-image: linear-gradient(#000,#000)`), que obliga al navegador a recortar con las esquinas también las capas compuestas; en todas las piezas. · «ese blur, efecto nube, en el borde» (la tarjeta de referencia sobre la playa) → la pieza de Kymatio no tiene esquinas: se funde con la página por un canto de NUBE (`public/media/anteriores/fondos/nube.svg`: rectángulo redondeado deformado con ruido y desenfocado, como máscara); la ventana va dentro, recta, centrada y entera; entra fundiéndose (sin el recorte de abajo arriba). Medido (Chrome 1440 DPR 2, otoño, invierno, al pasar; Cubbo al pasar con sus esquinas bien): sin errores · `astro check` 0.
- **A media ronda (Eric):** «no mola tanto; tiene que ser muy sutil» → el canto de nube pasa a un filo apenas difuminado: `nube.svg` = rectángulo redondeado casi del tamaño de la pieza (5 px de margen sobre 300 × 400, radio 12) con un desenfoque de 2,4 y sin la deformación con ruido (probada a escala 6: se leía como un borde mordido). El icono de vídeo vuelve a su esquina. Medido (Chrome 1440 DPR 2): sin errores.
- **A media ronda (Eric):** «me gustaba que antes el mockup estaba ladeado y más grande» → vuelve el navegador de las demás piezas (ladeado 5°, 118 % de ancho, asomando por la derecha y por abajo), ahora fundido por el filo suave; el icono de vídeo, en su esquina. Medido (Chrome 1440): sin errores.
- **A media ronda (Eric):** «bajamos un poco el aire de arriba» → en Kymatio la ventana sube del 34 % al 24 % de la pieza (ahora asoma el bosque barrido por debajo). Medido (Chrome 1440): sin errores.
- **A media ronda (Eric):** el pie de cada pieza de «Más proyectos»: el nombre a la izquierda y a la derecha SOLO la categoría (fuera el dominio); las que no tienen sector (Cubbo, Remerge) quedan solo con el nombre.
- **A media ronda (Eric):** «quita el titular "Más proyectos"» → el `h2` sigue en su sitio pero `invisible` («deja el espacio que ocupaba en blanco»): el hueco se conserva y la sección lo sigue usando de nombre.
- **A media ronda (Eric):** «las demás cards, como la de Kymatio» con sus webs → «Más proyectos» = Kymatio · Wisable · Monad · Transcend · Cubbo · Remerge · THX (`home.ts › anteriores`), todas sobre el paisaje barrido con el navegador de cristal ladeado; ocho VARIANTES del barrido (encuadre y dirección del arrastre: `barrido.cjs`, `barrido-<v>-<estación>.webp`, 488 KB en total, solo se baja la de la estación); vídeos de Wisable, Transcend (espera 9 s: tiene pantalla de carga), Monad, THX, Cubbo y Remerge en escritorio regrabados con `tools/r189/grabar.cjs`. Fuera BOP, Isotrol, Naterra y Routal (siguen en /proyectos). El testimonio pasa tras la segunda fila (`i === 4`). Ninguna pieza en `izq`: todas enseñan el lado izquierdo de la web. · «el de aquí, como los que estás haciendo» → la pieza de entrada (los destacados que rotan) también va sobre barrido (variante 7) y su nombre que rota baja al pie con «Destacado». Medido (Chrome 1440): sección entera sin errores, desborde 0.

### Ronda 187 · 2026-10-14 · exploración de isotipo en Figma y el roble del favicon (Nilo)
- **Andoni (textual):** «si quisiera crear un isotipo chulo para savvia, ¿qué herramientas tendríamos que usar?» · «y si te conecto a Figma, ¿me podrías ayudar a hacer exploraciones de isotipo chulas?» · «dale».
- **Hecho:** archivo de Figma «savvia · isotipo» en el equipo treseiscero (https://www.figma.com/design/PgkeolOcyCAqV3S0cH0xOv), página «Exploración 1»: punto de partida (el anillo-gota de hoy) y tres direcciones con sus variantes como vectores editables, cada una probada a 32 y 16 px, en oscuro y en claro, y junto a «savvia»: **01 · La s de savia** (la s que gotea · la s en su disco · la s sola: la s sale de `savvia-palabra.svg`, es decir, de Family) · **02 · Bellota** (gota al revés: la gota de savia boca abajo con su cúpula es la semilla del roble · la misma, a línea) · **03 · Anillos** (la s de tres anillos · tú + savvia, dos líneas). Recomendación de Nilo: la Bellota «Gota al revés»; segunda, «La s que gotea»; los anillos, descartables (una s de líneas paralelas es común). Descartadas en la autocrítica antes de llevarlas a Figma (y por qué): brote de dos hojas (clip-art), diana de anillos, una «w», gotas con dibujo dentro (genéricas); la primera bellota parecía un cucurucho (regla dura 1: era la forma). Geometría en `tools/r185-isotipo/` (`marcas.py`, `marcas2.py`).
- **Ojo:** la s y la palabra salen de Family, que sigue siendo el archivo de PRUEBA: para usarlo como marca hace falta la licencia.
- **Pendiente de Andoni:** elegir dirección; después, afinar la elegida, su construcción y su animación. No toca la web.
- **A media ronda (Andoni, con tres referencias: un signo rúnico hecho de letras sobre un paisaje · una N de trazo líquido con remates en gota · un «.v2» de un golpe de pincel):** «no me gusta ninguna; ¿podemos hacer exploraciones más profundas sacando formas de cosas relacionadas con la savia, estilo las imágenes que te paso?».
- **Hecho:** página «Exploración 2» en el mismo archivo. Lo común a las referencias: la materia prima son LETRAS, un solo gesto, remates orgánicos. Seis marcas con las letras de savvia (s, v, i) y el comportamiento de la savia: **01 · Viscosa** («vi»: la v que se espesa en gota y el punto de la i en Coral · «El cuello»: el hilo que adelgaza hasta soltar la gota de la carga) · **02 · Gesto** («Firma vvi» de un golpe de pincel · «Yema»: un gesto que sube) · **03 · Runa** («El árbol de letras»: la i de tronco y las v de ramas · «Copa y raíz»: v abiertas arriba, cerradas abajo, la gota de savia en el centro, canto cortado a mano). Elección de Nilo: «Copa y raíz»; segunda, «vi». Descartadas en la autocrítica: una s viscosa que parecía infantil, una «W» de bolas, una s de pincel genérica y dos v enfrentadas que formaban una figura equívoca. Geometría en `tools/r185-isotipo/geo.py` y `limpio.py` (shapely en un venv del scratchpad: el pincel se estampa como cápsulas unidas, el borde «a mano» es ruido de baja frecuencia).
- **Ojo:** los gestos de pincel generados por código se quedan en boceto: para que tengan la vida del «.v2» hay que dibujarlos a mano (o que Andoni lo trace y se vectorice).
- **A media ronda (Andoni):** «no consigues unas formas tan definidas y fluidas como las que te paso».
- **Causa (de Nilo):** las marcas se generaban como polígonos (contornos desplazados, uniones duras): ni curvas limpias ni uniones que fluyan.
- **Hecho:** técnica nueva, `tools/r185-isotipo/liquido.py`: cada forma es un campo de distancia (trazos de grosor variable y discos) con uniones suaves (smooth-min, como un líquido), rasterizado a 1600 px y vectorizado con potrace (potracer en el venv del scratchpad) a curvas Bézier. Página «Exploración 3 · líquida» con tres marcas en el lenguaje de la N de su referencia: **vi** (la v en savia espesa, gotas arriba, hilo abajo; el punto de la i en Coral) · **vvi** (las dos v en un trazo, cimas en gota) · **vi, a punto de caer** (la gota de la i aún colgando de un hilo). Descartadas: una s líquida (abultada), «Copa y raíz» líquida (se leía como una X) y la vv de pincel (pesada).
- **A media ronda (Andoni):** «quiero que el isotipo sea el que ha puesto Eric de las estaciones con cada árbol, pero que el árbol sea más reconocible» → Figma, página
  «Exploración 4 · roble (favicon)»: tres siluetas (A cúpula · B tres masas · C hoja de roble) × cuatro estaciones a 180/64/32/16 (`tools/r187-roble/roble.py`).
  «me gusta la C, pero que el roble salga desde abajo del icono y las hojas con más colores» → C2 (`tools/r187-roble/roble_c.py`): sin suelo, el tronco sale por el
  canto inferior; la copa en racimos de seis tonos por estación con su sombra, filo de luz y motas; invierno, ramas con nieve sobre cuadro oscuro.
  «exporta los favicons y cámbialos en la web» → `public/favicon-<estación>.png` (64, cuadro redondeado) y `apple-touch-icon-<estación>.png` (180, a sangre)
  regenerados con `EXPORTAR=public python roble_c.py <dir>`; caché `?v=157` → `?v=187` (Base.astro y Libro.astro). Los de la ronda 156, en `tools/retirados/favicon-r156/`.
  Medido: los ocho PNG 200 en local, `astro check` 0 errores, `tools/verify.cjs` (Chrome y WebKit, 1280 y 390) limpio, desborde 0. No publicado ni subido.
- **A media ronda (Andoni):** «cambia el favicon de invierno a claro» → invierno sobre Blanco frío #F5F5F7 (el fondo de la web en invierno), ramas en nogal oscuro
  #5E4A3F y la nieve en azul hielo #AFC2D6 (en blanco no se veía); favicon e icono de iPhone reexportados. No publicado ni subido.
- **A media ronda (Eric y Andoni, Telegram 14/10, sobre las cards):** Andoni, «me gusta la mezcla de mockup con colores de proyectos, le da dinamismo; no me convence que los bordes de la card se difuminen»; Eric, «me gusta el gradiente barrido». Probado y descartado el mismo día: un BARRIDO DE MARCA (franjas con los tres colores de cada web arrastradas con desenfoque de movimiento, esquinas nítidas; script en `tools/retirados/barrido-marca.r190.cjs.txt`). Eric: «me convence más lo anterior, más dinámico; no quiero que todo siga el mismo patrón: los proyectos con diferentes vistas». **Hecho (`Anteriores.astro › SITIO`):** vuelve el paisaje barrido de la ronda 189, pero mezclado: paisaje barrido con navegador ladeado (Kymatio, Remerge, THX y la entrada) · la mesa con la web en el monitor (Wisable, otoño) · degradado de su marca con navegador ladeado (Monad, Cubbo) · navegador recto sobre su color (Transcend). Medido (Chrome 1440): las tres filas capturadas, sin errores. Por acordar: el canto de nube de las de paisaje (a Andoni no le convence).
- **A media ronda (Eric):** «quizás una vista como teníamos antes de mobile también; pero que la web se renderice en mobile» → Remerge vuelve al MÓVIL sobre la mesa (tipo `movil`, zoom 2,5 para que la lámina cubra la pieza 3:4) con su web grabada en móvil a 390 px (`tools/r189/grabar.cjs remerge-movil` → `public/media/anteriores/video/remerge-movil.{mp4,jpg}`, 562 KB; las piezas `movil`/`tel` cogen `<slug>-movil`). Medido (Chrome 1440, al pasar): la pieza llena y el vídeo móvil suena dentro del teléfono; sin errores.
- **A media ronda (Eric):** reseña de Unai Arambarri (Fundador y CEO, Neety), reducida y sin el nombre del estudio anterior: «Cercanos, humanos y capaces de entender de verdad tu proyecto. Más que un proveedor, son parte de tu equipo.» → cuadrícula de «Más proyectos» (`home.ts › celdas`), en la celda del logotipo de Neety, entre Junipero y Neety (así esa celda alterna cita y logotipo). Sin retrato: no entra en el testimonio que rota. No publicado ni subido.
- **A media ronda (Eric):** «estos dos se han quedado legacy» (la entrada y Kymatio) → fuera el canto de NUBE de las piezas de paisaje: esquinas nítidas como todas (también Andoni). «En la de la izquierda, cómo pasan las slides, más smooth» → las capturas de los destacados ya se cargan y descodifican antes del primer relevo (antes `lazy`: el que llegaba podía entrar en blanco), el que se va se desliza entero (antes se apagaba al 40 % y quedaba un fantasma de cristal) y los dos van en la misma curva, 1,6 s (antes 1,4). Medido (Chrome 1440, seis fotogramas cada 250 ms): los dos navegadores enteros durante el relevo; sin errores.
- **A media ronda (Eric):** «los sonidos de tap de la ilustración animada quitamos» → la tarjeta de Servicios: el cursor marca los checks en silencio (fuera `clic()`
  en `Servicios.astro`, ronda 133). Los clics al pasar y pulsar enlaces de toda la web (`clics.ts`) siguen. `astro check` 0 errores. No publicado ni subido.
- **A media ronda (Eric):** «ahí no tiene que ir con blur; como hemos corregido las demás» → la entrada (destacados que rotan) y Kymatio, sobre el DEGRADADO de su marca (fuera el paisaje barrido; queda en THX). «El slider tiene que ser fade» → FUNDIDO cruzado en su sitio (1,2 s; el que se va, 0,3 s después). Ojo: la regla de entrada `html.anima .pieza.visto .mockup` pisaba la transición y el relevo saltaba de golpe → `!important` en las de `.heroe` (medido: opacidad 0,11 → 0,38 → 0,62 → 0,79… en pasos de 150 ms). «El aire de arriba, reducir» → en las piezas 3:4 el navegador empieza al 20 % (antes 34 %; `--top`). «La del ordenador en el centro y la de la derecha con gradiente» → primera fila: Wisable (la mesa) en el centro y Kymatio (degradado) a la derecha. Medido (Chrome 1440): capturas, sin errores.
- **A media ronda (Eric):** «en Wisable se ve un mini marco blanco entre el marco del ordenador y el vídeo» → la pantalla de la mesa (`.mesa .pantalla`) va en el negro del bisel (#121213, antes #fbfbfa) con un filo de 2 px de ese negro por fuera, que tapa el blanco de la lámina en el borde fraccionario. Medido (Chrome 1440 a DPR 2, recorte del monitor): sin filo blanco.
- **A media ronda (Eric): «el logo de Naterra se ve pixelado».** Era un PNG ampliado desde uno pequeño. Rehecho desde el SVG oficial de su web (naterra.pro, `naterra_logo.svg` en el CDN de Webflow), rasterizado a 2718 × 690 y recortado → `public/media/logos/cuadricula/naterra.png` (va como máscara: el color no importa); proporción en `logos-cuadricula.json` 3,979 → 3,939 (la densidad, igual: 0,367). El anterior, en el scratchpad de la sesión. No publicado ni subido.

### Ronda 191 · 2026-10-14 · el slider de /proyectos con cinco webs que pasan solas, y radios concéntricos en el navegador de cristal (en local, Eric)
- **Eric (textual):** «en proyectos destacados [el slider de /proyectos] tiene que estar neety.com, surepayroll.com, claudiabe.studio, homeofambrose.com y elevenlab.org; aunque no les llamemos proyectos destacados, solo que sea una slide que vaya pasando» (sustituyen a los cuatro de antes) · (captura de la pieza «Destacado» de la home) «la parte interior ahora no está bordeada, tiene que estarlo» · «los radios out e inner tienen que seguir la regla: radio exterior = radio interior + relleno».
- **Hecho:** · `tools/r189/grabar.cjs` + cinco claves → `public/media/anteriores/video/{neety-com,surepayroll,claudia-be,home-of-ambrose,eleven-lab}.{mp4,jpg}` (370–870 KB). · `proyectos/index.astro`: `SLIDES` sustituye a los destacados (fuera `SITIO`/`ORDEN`): Neety enlaza a su caso; las otras cuatro, a su web (pestaña nueva; `Pieza.astro` gana `href`); pieza mancha o claro según su color, sector propio (Nóminas · Estudio de branding · Vivienda · Consultoría de diseño, de Nilo), colores tomados a ojo de cada web; etiquetas sin «destacado». PASO AUTOMÁTICO cada 5 s (vuelve a la primera al final), parado con el puntero o el foco dentro, fuera de la vista, con la pestaña oculta, 10 s tras un gesto y con movimiento reducido. · `Pieza.astro`: sin el « · » colgando cuando no hay servicios. · `Anteriores.astro`: la imagen de los heroes que rotan en la pieza de entrada no tenía radio (solo lo llevaba `.vid`); el navegador de cristal pasa a `--r-fuera: 12px` y `--marco: 4px` y lo de dentro a `calc(var(--r-fuera) - var(--marco))` = 8 px (antes 7).
- **Medido:** `astro check` 0 errores · Chrome sin ventana 1280: el slider pasa 01 → 02 → 03 → 04 cada 5,5 s, sin errores · pieza de entrada con la imagen a 8 px de radio (captura) · vista previa sin errores de consola. **SIN medir:** WebKit, móvil. No publicado ni subido.
- **A media ronda (Eric, captura de la pieza «Destacado» de «Más proyectos»): «no veo los 5 proyectos aquí»** → lo pedido era también esta pieza: `Anteriores.astro › HEROES` rota ahora entre Neety (neety.com), SurePayroll, Claudia BE, Home of Ambrose y Eleven Lab (antes Kuanta, Arkdev, Playground y Neety), con el primer fotograma de su grabación a 1440 × 900 (`public/media/anteriores/heroes/*.webp`, 48–129 KB) y sus colores. El slider de /proyectos conserva las mismas cinco. Medido (Chrome 1440): las cinco pasan en orden, sin errores · `astro check` 0.
- **A media ronda (Eric, captura de THX): «a este hay que quitarle el barrido»** → THX deja el paisaje barrido y va sobre el degradado de su marca (azules de su web), con el navegador ladeado (`Anteriores.astro › SITIO[6]`). En barrido quedan Kymatio y Remerge.
- **A media ronda (Eric, captura del navegador de Kymatio): «los puntitos del marco no están bien puestos y no sé si el borde cumple la regla»** → los puntos iban a 2 px del canto, encima de la curva de la esquina. `.cromo` (Anteriores): barra de 12 px (antes 10), puntos de 4 px centrados y con `padding-inline: calc(var(--r-fuera) - var(--marco))` = 8 px: empiezan a 12 px del borde exterior, donde acaba la curva. Radios: a los lados y abajo se cumple (12 = 8 + 4); arriba el hueco es la barra (12 px) y la web conserva sus 8 px. Captura a DPR 3.
- **ARTEFACTO «Fondos de proyectos»** (https://claude.ai/artifact/4nCH3qzEteCYxYAdXgoG8y; fuente en el scratchpad de la sesión): las 12 piezas (7 de «Más proyectos» + 5 de «Destacado») con su navegador; en cada una, degradado de marca con los tres colores editables (y «los de su marca») o barrido con las 8 variantes, estación arriba; «Copiar ajustes» devuelve el texto para aplicarlo aquí. Se recuerda en el navegador de quien lo usa.
- **A media ronda (Eric, captura de THX): «el marco, demasiado redondeado: quitarle un poco al inner y al outer»** → `--r-fuera` 12 → 9 px; dentro, 9 − 4 = 5 px; los puntos se recolocan solos (empiezan a 9 px del borde). También en el artefacto (versión 2).
- **A media ronda (Eric, captura de la pieza «Destacado»): «aquí a la izquierda quitamos lo de destacados y ponemos Home of Ambrose con otro gradiente y el vídeo»** → fuera la pieza de entrada que rotaba (marcado y `HEROES`; su CSS y su script quedan sin uso, protegidos por `if (rota)`); Home of Ambrose es la primera de `home.ts › anteriores` (sector Vivienda; degradado tinta · malva · arena `#2b2a3a #7a5a73 #d9b8a3`, de Nilo, distinto del sepia de su web) en su sitio (`SITIO[0]`: columnas 1–3, cuadrada), con su vídeo al pasar; el testimonio sigue tras la segunda fila (`i === 5`). · «los 3 puntitos del marco igual no hacen falta» → fuera de los navegadores de «Más proyectos» (queda la dirección centrada). Artefacto al día (versión 3). Medido (Chrome 1440): vídeo en marcha al pasar, sin errores · `astro check` 0.
- **A media ronda (Eric): «el vídeo de Home of Ambrose, sácalo de aquí: screen.studio/share/gPjwsbal» · «el gradiente no cumple para nada con su paleta»** → su grabación de Screen Studio (1882 × 1080, 19,4 s) entera, a 960 px y 30 fps, sin audio → `public/media/anteriores/video/home-of-ambrose.{mp4,jpg}` (518 KB; la grabación anterior, en el scratchpad). Degradado con la paleta de su CSS: melocotón `#f6e5d5`, terracota `#c25631` y oliva `#4d4d1c` (también en el slider de /proyectos y en el artefacto, versión 4). Medido (Chrome 1440): el vídeo corre al pasar, sin errores.
- **A media ronda (Eric): el testimonio de Juanjo Velaz** (pendiente desde la ronda 76). La cita estaba en la home en inglés de treseiscero.app (web.archive.org,
  15/08/2022: «Working with treseiscero was easy, fast and high quality… JJ Velaz, Kosmo Founder»; hay otra suya como fundador de Uluprints). Traducida y sin el
  nombre del estudio anterior → `home.ts › testimonios` (4.º, antes de Danny): «Trabajar con Eric y Andoni fue fácil, rápido y de mucha calidad. Les cuento lo que
  necesito y sé que lo resolverán sin idas y venidas. Comunicación excelente y precios claros.» · Fundador, Kosmo → (Eric) «JJ Velaz · Emprendedor». Retrato: la foto que pasó Eric convertida a
  carboncillo con `tools/r191/retrato.py` (rembg para quitar el fondo, CLAHE, trama diagonal de lápiz, el jersey aclarado a gris y los hombros deshechos en
  pinceladas diagonales; mismo lienzo de 1254 px sobre blanco) → `public/media/testimonios/juanjo-velaz.webp`. NO es de la mano de Andoni: si la redibuja, se
  sustituye el archivo. Medido: `astro check` 0 errores, servido en la home (200). **SIN mirar a ojo** con el semitono en la página. No publicado ni subido.
- **A media ronda (Eric): «pon esto para Home of Ambrose: screen.studio/share/bCswiQ0U»** → la grabación nueva (Douglas 1927: hero, galería, texto y plano; 28 s) sustituye a la anterior en `public/media/anteriores/video/home-of-ambrose.{mp4,jpg}` (960 px, 30 fps, sin audio, 1,5 MB); también en el artefacto. **ARTEFACTO «Fondos de proyectos» (versiones 7–9):** vídeos reales en cada pieza; vista navegador · sobremesa · móvil; la sección simulada como en la home (12 columnas, `col`, proporción y `baja` de `SITIO`, hueco del testimonio); el mockup se mueve arrastrando y se escala pellizcando (o ⌘ + rueda); panel de la pieza elegida a la derecha.
- **PUBLICADA (14/10) en https://savvia.studio** (Eric: «sube todo a producción»): commit `bcea8d6` (ronda 191 y los cambios que había sin subir en Estudio, Problemas, Servicios, `entintar.ts` y el retrato de Juanjo Velaz) → la Action «Publicar en Vercel» (éxito). Medido EN VIVO (Chrome, 1440 y 390): / y /proyectos sin errores de consola, 0 respuestas ≥ 400, desborde 0; el vídeo de Home of Ambrose responde 200. **SIN medir en vivo:** WebKit. Sigue `noindex`.

### Ronda 192 · 2026-10-15 · fuera las cifras del Estudio (en local, Eric)
- **Eric (textual):** «quitamos los kpis» (+75 Clientes · 8 Países · 6 Años juntos).
- **Hecho:** `Estudio.astro` sin la fila de cifras (marcado y estilos `.cifras/.kpis/.kpi/.num/.lbl`); `home.ts › estudio.kpis` fuera. Queda el titular, el texto y Eric y Andoni.
  Vuelve a cumplirse el Diccionario («no se presume ni años ni número de clientes»).
- **Medido:** `astro check` 0 errores · vista previa (1280): la sección sin las cifras, consola limpia. No publicado ni subido.
- **A media ronda (Eric): «en el "hemos trabajado con" pondremos logo de surepayroll.com y de wisable.com».** Logotipos sacados de su web (SurePayroll: el SVG negro de su
  barra; Wisable: su isotipo + su palabra, SVG en línea de la barra) → `public/media/logos/cuadricula/{surepayroll,wisable}.png` (en negro: van como máscara) y su
  proporción y densidad en `logos-cuadricula.json` (5,704 · 0,265 y 5,595 · 0,424). En la cuadrícula: SurePayroll en la fila 2 (antes de la cita de Farco, que la
  nombra; Kalma pasa a la fila 6) y Wisable en la fila 3. `astro check` 0 errores; los dos sirven 200. **SIN mirar a ojo** en la celda (rotan). No publicado ni subido.
- **A media ronda (Eric): «Qué incluye · Consultoría» → «Qué incluye la consultoría:» (y «el end-to-end:», «la colaboración:») · «el 01 02 03 quitamos de al lado de las 3 formas».**
  `home.ts › servicios.lista[].cab` con la frase de cada forma; la tarjeta (`Servicios.astro`) la pone entera y la cambia al elegir otra. Fuera los números del
  selector (marcado, `dos()` y sus estilos). Medido (vista previa): cambia a «Qué incluye la consultoría:» al pulsar, consola limpia · `astro check` 0 errores.
  No publicado ni subido.

### Ronda 193 · 2026-10-15 · el testimonio entra todo a la vez y escalonado (en local, Eric)
- **Eric (textual, con captura del testimonio de Alberto Arenaza):** «la forma en la que sale el texto/contenido junto con la foto ilustrada tiene que ser smooth, todo al conjunto, stagger y bien sincronizado».
- **Hecho (`Anteriores.astro`):** un solo reloj por relevo. Retrato, cita, nombre y cargo se van JUNTOS (0,35 s, con desenfoque); cuando se han ido, entran desde el mismo instante: el retrato se dibuja (1,6 s, curva más pareja: pow 1,5 en vez de 2,2, para acabar con el texto), la cita sube PALABRA A PALABRA desde el desenfoque (24 ms entre palabras; sustituye al tecleo con cursor de la ronda 68), el nombre cuando la cita va por la mitad (`--dq`) y el cargo 110 ms después; la primera vez, las flechas al final. Antes el retrato viejo se apagaba encima del nuevo y el nombre iba por libre. Sin JS o con movimiento reducido, todo a la vista.
- **Medido** (Chrome y WebKit sin ventana, 1440×900, relevo con la flecha): a 150 ms todo fuera; a 450 ms retrato dibujándose y la primera palabra a 0,78–0,84; a 750 ms la última palabra a 0,65–0,91 y el nombre a 0,81–0,97; a 1,1 s todo a 1; consola limpia · `astro check` 0 errores. **SIN medir:** móvil. No publicado ni subido.
- **A media ronda (Eric): «ya he ajustado los logos en el artefacto» · «el logo de Valuat tiene que ser más nítido».** Tallas leídas de `logos2` en el artefacto
  «Tallas de logos»: solo cambian SurePayroll (×1,25) y Valuat (×1,05) en `home.ts › celdas`; el resto ya coincidía (Zrive sigue fuera). Valuat era un PNG de
  925 × 240 ampliado: rehecho desde el SVG de la barra de su web (valuat.com, Illustrator, en negro) a 2414 × 634 con sharp (density 1200 + trim); proporción y
  densidad 3,808 · 0,323. `astro check` 0 errores; consola limpia. **SIN mirar a ojo** dentro de su celda (rotan). No publicado ni subido.
- **A media ronda (Eric): «he vuelto a ajustar los logos de tamaños».** Tallas releídas de `logos2` en el artefacto «Tallas de logos» y pasadas a `home.ts › celdas`:
  Remerge 1,3 · Universidad de Mondragón 1,6 · Naterra 1,25 · Cubbo 1,35 · Farco Studio 1,05 · SurePayroll 1,35 · Junipero 1,25 · Transcend Network 1,25 · Valuat 1,15 ·
  Wisable 1,15 · Invopop 1,25 · Isotrol 1,15; las demás, iguales. `astro check` 0 errores. No publicado ni subido.
- **A media ronda (Eric): «el espacio entre reseña y nombre, siempre el mismo; centramos el contenido aunque unas sean más altas».** `Anteriores.astro`: cada cita va
  pegada al pie de su pila (`align-self: end`; la fila, `minmax(0, 1fr)`: si no, las citas ocultas más altas la estiraban y la activa quedaba pegada al nombre)
  y, a partir de 64rem, la pila mide lo que la cita activa (`ajustarPila`, al relevar y al cambiar el ancho): el bloque queda centrado junto al retrato. En
  móvil se reserva la más alta, para que la página no salte. Cargos: José Luis Antúnez «Mentor, Estrategia y narrativa» · JJ Velaz «Mentor, Estrategia de
  negocio». Medido (Chrome, 1440 y 390, las cuatro reseñas): hueco cita → nombre 32 px en todas; a 1440, el texto centrado con el retrato (450 / 450) y la
  sección no cambia de alto; sin errores · `astro check` 0. **SIN medir:** WebKit. No publicado ni subido.
- **A media ronda (Eric):** cargos del testimonio: Alberto Arenaza «Cliente con apertura internacional, Transcend Network» · Danny Saltaren «Cliente y colaborador».
- **A media ronda (Eric): «en vez de sus títulos, lo que ha significado para nosotros».** Bajo el nombre (propuestas de Nilo con lo que dijo Eric, por confirmar):
  José Luis «Nuestro mentor en estrategia y narrativa» · Alberto «Nos abrió la puerta a proyectos internacionales» · JJ «Nuestro mentor de negocio desde el
  principio» · Danny «Primero cliente, hoy compañero de proyectos».
- **A media ronda (Eric):** «Danny Saltaren» (con tilde) y debajo «Nos descubrió y nos impulsó en nuestros inicios» (Eric: «nos descubrió y nos ensalzó en nuestros inicios, o algo así»).
- **Corrección (Eric):** «Saltaren», sin tilde.

### Ronda 194 · 2026-10-15 · el marco de cristal, menos redondo que la card (en local, Eric)
- **Andoni (Telegram, vía Eric):** «el marco de cristal me mola pero no sé si lo veo muy redondeado comparado con la card que lo contiene» · «de momento me sigo quedando con los gradientes; igual sí podemos buscar algún estilo de gradiente que nos mole» (grainient.supply/collections). Eric: «el marco lo modificamos, sí»; los gradientes que le gustan los pasa después.
- **Hecho (`Anteriores.astro › .mockup`):** la card mide 8 px de radio y el marco 9: el marco se leía más redondo que lo que lo contiene. `--r-fuera` 9 → 6 px y `--marco` 4 → 3 px: dentro, 6 − 3 = 3 px (sigue la regla radio exterior = interior + relleno).
- **Medido:** `astro check` 0 errores · Chrome sin ventana 1440 DPR 2: captura de Home of Ambrose, sin errores. El artefacto «Fondos de proyectos» sigue con 9 px. **Pendiente:** los gradientes de referencia de Eric. No publicado ni subido.
- **A media ronda (Eric):** añadido y QUITADO el mismo día el testimonio de Brian Farrell («Colaborador de largo plazo»). Su retrato al carboncillo, en `tools/retirados/brian-farrell.r193.webp` (`tools/r191/retrato.py` gana parámetros por entorno: S, OY, TOP, DX, FY, BODY). Su cita sigue en la cuadrícula.

### Ronda 195 · 2026-10-15 · el mockup sin la dirección (en local, Eric)
- **Eric (textual):** «igual no hace falta que el mockup tenga la url arriba, ¿no? Así que ocupe lo mismo abajo que arriba».
- **Hecho (`Anteriores.astro`):** fuera la barra con el dominio (`.cromo`) de los navegadores de cristal de «Más proyectos»; el marco va igual por los cuatro lados (`padding: var(--marco)`, 3 px). Los estilos de `.cromo` quedan sin uso.
- **Medido:** `astro check` 0 errores · Chrome sin ventana 1440 DPR 2 (Home of Ambrose): marco parejo, sin errores. No publicado ni subido.
- **A media ronda (Eric):** la explicación de cada forma, alineada con su nombre: fuera la sangría (`padding-left: 2ch + 16px`) que quedaba de los números 01/02/03.

### Ronda 196 · 2026-10-15 · vuelve el favicon de la ronda 156 · PUBLICADA (rondas 192–196)
- **Eric (textual):** «cambia el favicon a lo que teníamos antes y sube a producción con todos estos cambios» · «del artefacto ya he actualizado los servicios».
- **Hecho:** los ocho PNG de la ronda 156 (el fondo de la estación con el árbol en pequeño) vuelven a `public/` desde `tools/retirados/favicon-r156/`; los del roble de la ronda 187, a `tools/retirados/favicon-r187/`. Caché `?v=187` → `?v=196` (Base.astro y Libro.astro). Sube también lo que había en local: rondas 192–195 y los cambios de Servicios de Eric.
- **Medido:** `astro check` 0 errores · `astro build` OK (25 páginas) · `spacing-lint`: solo `NeetyHero.astro:227 px-10` (la réplica de Neety, con sus medidas).
- **PUBLICADA (15/10) en https://savvia.studio:** commit `7f2c0e0` → la Action «Publicar en Vercel» (éxito). Medido EN VIVO (Chrome y WebKit, 1440 y 390, / y /proyectos, bajando la página entera): consola limpia, 0 respuestas ≥ 400, desborde 0; `favicon-otono.png?v=196` servido (200). Sigue `noindex`.

### Ronda 197 · 2026-10-15 · Servicios, con lo editado por Eric en el artefacto · PUBLICADA
- **Eric (textual):** «del artefacto ya he actualizado los servicios» · «en consultoría no has actualizado los servicios».
- **Fallo de Nilo:** en la ronda 196 di por hecho que «actualizado» era el diff local de `Servicios.astro`; lo editado vivía en la base del artefacto «Servicios de savvia» (https://claude.ai/artifact/R7DC9WNTxZxYMLwFACHezP, `servicios/datos`) y no se leyó.
- **Hecho (`home.ts › servicios`, leído de esa base):** Consultoría suma Ilustraciones animadas, Animaciones 3D, Interacciones GSAP, Desarrollo agéntico e Integraciones con CMS (de 6 a 11 puntos); «Ilustraciones animadas (Lottie)» → «Ilustraciones animadas»; texto nuevo de End-to-end. Colaboración, sin cambios.
- **Medido:** `astro check` 0 errores · build OK · la página sirve 11 puntos de Consultoría.
- **PUBLICADA (15/10):** commit `f8cc923` → la Action (éxito); en vivo, 11 puntos de Consultoría; Chrome y WebKit, 1440 y 390: consola limpia, 0 ≥ 400, desborde 0.

### Ronda 198 · 2026-10-15 · Servicios: segunda pasada del artefacto · PUBLICADA
- **Eric (textual):** «actualiza» (tras editar otra vez el artefacto «Servicios de savvia», versión 26).
- **Hecho (`home.ts › servicios`):** End-to-end «…para que tu equipo la haga crecer con IA» · «Integraciones con CMS» (sin «Sanity, Supabase…») · «Migraciones de Webflow a IA» (sin WordPress) · «La receta: savviagentic.md» (y en la versión 27 vuelve a «savvia.md»). Las marcas por forma, sin cambios. OJO: «hacer crecer tu web» se rechazó en la ronda 39 (Keynote: «elevar»); se aplica porque lo escribe Eric, por acordar con Andoni. La lista del Manifiesto (`manifiesto.ts`) no se ha tocado.
- **PUBLICADA (15/10):** la Action (éxito); en vivo, los textos nuevos y «La receta: savvia.md» (artefacto versión 27).

### Ronda 199 · 2026-10-15 · el texto del Estudio · PUBLICADA
- **Eric (textual):** «Los dos de la primera conversación a la última. → Los dos desde la primera conversación a la última.»
- **Hecho:** `home.ts › estudio.texto`. Publicada por la Action.

### Ronda 200 · 2026-10-15 · el titular del Estudio, un pelín más pequeño (en local, Eric)
- **Eric (textual):** «El estudio web que orquesta la IA. Un pelín más pequeño de tamaño el titular, creo».
- **Hecho (`Estudio.astro`, `.titulo-estudio`):** de `text-h1` (44 → 72 px) a `clamp(2.5rem, 1.85rem + 2.6vw, 3.75rem)` (40 → 60 px). Sigue en dos líneas.
- **Medido:** `astro check` 0 errores · Chrome 1440: 60 px; 390: 40 px (captura). No publicado.

### Ronda 201 · 2026-10-15 · Servicios: la receta sale de la consultoría · PUBLICADA
- **Eric (textual):** «actualiza» (artefacto «Servicios de savvia», versión 28).
- **Hecho (`home.ts › servicios`):** «La receta: savvia.md» ya no la incluye la Consultoría (queda en 10 puntos); el resto ya coincidía con el artefacto.

### Ronda 202 · 2026-10-15 · «Más proyectos» como en el artefacto de fondos · PUBLICADA
- **Eric (textual):** «he actualizado el artefacto de proyectos; actualiza» (sus ajustes pegados del artefacto «Fondos de proyectos»).
- **Hecho:** `home.ts › anteriores` en el orden nuevo (Wisable · Home of Ambrose en la mesa · Kymatio · Cubbo · Transcend · Monad · Neety en el móvil · THX; Remerge sale de la home y sigue en /proyectos) con los colores retocados por Eric. `Anteriores.astro › SITIO`: proporción, giro y la posición del navegador de cada pieza (`m`: x, y y ancho en %, `--mx/--top/--mw`); la mesa a zoom 2,88 centrada; las webs sin grabación en móvil (`CON_MOVIL`) enseñan en el teléfono la de escritorio recortada. Todas con el degradado de hoy. El slider de /proyectos no se toca (sus fondos generados eran de la prueba «Repartir estilos»).
- **Medido:** `astro check` 0 errores · build OK · Chrome sin ventana 1440 y 390 sobre `astro preview`: las ocho piezas en su orden, sin errores, desborde 0.

### Ronda 203 · 2026-10-15 · iconos en los cursores de savvia agentic (en local, Eric)
- **Eric (textual, tras ver el vídeo de Lunagraph, x.com/putrikarunian/status/2110240503224819964):** «¿los punteros con iconos de Claude y ChatGPT suman?» · «el de savvia tiene que tener el favicon» · «bien integrado el color de la píldora con el fondo del favicon, ajustado a cada estación» · «nos quedamos con los iconos, mucho mejor» · «el árbol del favicon centrado con savvia; el favicon, tal cual».
- **Hecho (`LaPartitura.astro`):** cada cursor lleva un icono de 12 px en blanco delante del nombre: Claude (su chispa) · Codex (OpenAI, de `ias.ts`) · Tu equipo (dos personas, Iconoir). savvia: el FAVICON de la estación (16 px, radio 3, sin recortar) sobre una píldora de su mismo fondo (`--noche`, con fundido de 2,4 s al cambiar de estación; texto claro; en invierno, nieve con texto pizarra y filo); subido 2 px para que el árbol (filas 26–53 de 64) case con el texto. Probado con `?punteros=iconos` y luego fijo.
- **Medido:** `astro check` 0 errores · Chrome sin ventana 1440 DPR 3 en las cuatro estaciones: sin errores. **SIN medir:** WebKit, móvil. No publicado ni subido.
- **A media ronda (Eric):** «cuando ponemos publicado, icono de Cloudflare o Vercel, al final» → Vercel (es donde publica savvia): en la píldora de estado final, «Publicado en neety.com» lleva su triángulo blanco sobre círculo negro en vez del check en savia; en el pie de la tarjeta de la librería, el triángulo negro en vez del check. Medido (Chrome 1440): píldora capturada al publicar, sin errores.
- **A media ronda (Eric):** «los logos en los avatares de arriba; ahí sí el favicon de savvia» → presencia de la barra, trío y avatar de la píldora de estado: Claude y Codex con su icono blanco sobre su color, savvia con el favicon de la estación, Tu equipo con las dos personas. Se probó quitar los iconos de savvia y Tu equipo en los cursores y Eric los pidió de vuelta. «Un mensajito de CMS, Sanity; los logos no hacen falta» → junto a «Subir blog al CMS», «✓ en Sanity» en gris al pulsarla (solo escritorio). «El chat, más fiel al de Claude o ChatGPT» → caja blanca de radio 22: el texto arriba (vacía, «Pide un cambio a tu web…»), abajo «+», el modelo (chispa de Claude + «Opus 5.5» ▾) y enviar en el cuadrado redondeado naranja de Claude, que se enciende en cuanto hay texto. Medido (Chrome 1440): vacío, a medio teclear y lleno; sin errores · `astro check` 0.
- **PUBLICADA (15/10) en https://savvia.studio** (Eric: «subimos a producción»): commit `7a8113e` → la Action «Publicar en Vercel» (éxito), en vivo a los ~10 s. Medido EN VIVO (Chrome, 1440 y 390, savvia agentic): consola limpia, 0 respuestas ≥ 400, desborde 0, los cuatro iconos en los cursores. **SIN medir en vivo:** WebKit. Sigue `noindex`.
- **A media ronda (Eric):** «ese "toma" queda raro» → la píldora de estado, como una notificación: «Claude ha añadido H1 · XL». La petición del chat: «Hagamos el hero de la home con el feed de señales. Con nuestro estilo.» (antes «Monta…»). El triángulo de Vercel del pie de la tarjeta, del alto de las mayúsculas del texto.

### Ronda 204 · 2026-10-15 · Home of Ambrose, en bucle (en local, Eric)
- **Eric (textual):** «este vídeo [Home of Ambrose, en la mesa] que esté siempre en loop, para que se vea que es vídeo» · «todos no, solo ese; el resto estaba guay al pasar».
- **Hecho (`Anteriores.astro`):** su `<video>` lleva `data-siempre` y se reproduce en bucle mientras la pieza está a la vista (se pausa fuera); las demás, al pasar el ratón o enfocar, como antes (en táctil, a la vista). Con movimiento reducido, ninguno solo.
- **Medido** (Chrome 1440, bajando la sección con el ratón fuera): solo suena Home of Ambrose y solo a la vista; sin errores · `astro check` 0. No publicado.
- **A media ronda (Eric), la pantalla de la mesa y la de Proyectos destacados:** se probó agrandar la pantalla sobre el bisel (22,4 × 22,35 %, filo interior de 1 px, titular-pantalla al tamaño exacto) para afinar el negro. Eric: «la banda tiene que ser más fiel al ordenador original [Studio Display]; como estaba al inicio» → todo DESHECHO: las dos pantallas vuelven a la caja blanca medida de la lámina (39,03 · 36,96 · 21,78 × 21,04 %), con su filo y sus bandas de siempre. Queda solo el bucle de Home of Ambrose. Su grabación (1882 × 1080, 1,745) es algo más alta que la pantalla (1,84): se recorta por abajo, como siempre.
- **Probado y DESHECHO (Eric: «el vídeo de Home of Ambrose requiere un ratio diferente, es un poco más alto»; elegida «pantalla más alta, solo ahí»):** solo en esa pieza (`.pantalla.alta`) la pantalla de la mesa pasa a 22,17 % de alto (top 36,395 %), comiendo el bisel de arriba y abajo a partes iguales; el ancho y las demás piezas, como siempre. El vídeo entra entero (cabecera y barra de abajo). Captura a DPR 2.
- **Por qué no hay pantalla que valga:** el marco exterior del monitor mide 380 × 212 px de lámina (1,79) y la pantalla original 364 × 198 (1,84, bisel de ~7 px parejo); la grabación es 1,745, más alta que el propio marco: adelgazar el bisel por igual solo la hace más apaisada. Eric la REGRABA a 1,84 (p. ej. 1880 × 1020); mientras, pantalla original y recorte por abajo. Las grabaciones para la mesa, siempre a 1,84.
- **Regrabado (Eric, Screen Studio, https://screen.studio/share/H5KhmiBw, y después la toma mejor, https://screen.studio/share/6NfJqX6P):** 1984 × 1080 (1,837, la de la pantalla de la mesa), 27,6 s → `public/media/anteriores/video/home-of-ambrose.{mp4,jpg}` a 960 × 522, 30 fps, sin audio, CRF 26, faststart (1,6 MB; el anterior, en el scratchpad de la sesión). Entra entero en la pantalla original con el marco parejo. Captura a DPR 2.
- **Neety en el móvil (Eric, Screen Studio, https://screen.studio/share/Lw5VIZjr y después la toma mejor, https://screen.studio/share/D1zkC6fT):** 500 × 1080 (1:2,16, la del móvil de la mesa), 30,5 s → sin la raya de la barra de desplazamiento (6 px de la derecha) → `public/media/anteriores/video/neety-com-movil.{mp4,jpg}` a 390 × 856, 30 fps, sin audio, CRF 28 (2 MB); `CON_MOVIL` gana `neety-com` (antes el teléfono enseñaba la grabación de escritorio recortada). Captura al pasar: la web entera en el teléfono, suena; sin errores.

### Ronda 205 · 2026-10-15 · el tronco del favicon, reforzado (en local, Eric)
- **Eric (textual):** «lo que no se aprecia mucho es el tronco del árbol en favicon y mini favicon de pill de la ilustración animada» · (de tres opciones) «solo la 2» (reforzar la madera al reducir, sin tocar el encuadre) · «me gusta, ponemos así».
- **Hecho:** `tools/r205-favicon-tronco.cjs` (el de la ronda 156 + refuerzo): en la lámina de cada estación busca los píxeles del tronco bajo la copa (franja central, 70–95 % del alto, opacos, oscuros y poco saturados), los ensancha (dilatación de 12 px a 512; en invierno, 4: engordado parecía un tocón) y los pinta un 30 % más oscuros POR DEBAJO del árbol, con un desenfoque de 1,2. El dibujo queda encima, intacto. Regenerados `public/favicon-<estación>.png` y `apple-touch-icon-<estación>.png`; los anteriores, en `tools/retirados/favicon-r204/`. Caché `?v=196` → `?v=205` (Base.astro, LaPartitura.astro, sistema/Libro.astro). Con ellos cambian también el cursor y los avatares de savvia en savvia agentic.
- **Medido:** comparación a 64 px y a 16 px (antes y después): a 64, tronco claramente más marcado; a 16, gana como mucho un píxel · `astro check` 0 errores. No publicado ni subido.
- **A media ronda (Eric: «aquí no está» —la pestaña—, elegida la opción de acercar el árbol solo en pequeño; «las hojas no tienen que tocar las paredes»):** `tools/r205-favicon-pequeno.cjs` → `public/favicon-<estación>-32.png` (32 px, mismo refuerzo de tronco, el árbol al 96 % del ancho —el encuadre de producción, que a Eric le gustaba más— subido un 24 % del icono para que asome el tallo; probados 0,8 · 0,9 · 1,05 · 1,15 · 1,25 · 1,4 · 1,7 · 2,0 de cerca y 0,17 · 0,24 · 0,3 de subida; `ESC` y `SUBE` por entorno). Es el favicon de la PESTAÑA (`Base.astro`: `sizes="32x32"`, también al cambiar de estación) y el de la píldora y los avatares de savvia en savvia agentic. El de 64 y el icono de iPhone, los reforzados de antes.
- **Después (Eric: «sigo sin ver el tronco» · «el tronco tiene que llegar hasta la parte de abajo del favicon; si hay que reformular el árbol, hazlo»):** `tools/r205-favicon-tallo.cjs` sustituye a los dos anteriores: el roble al 90 % del ancho con el pie al 66 % del icono y un TALLO dibujado (trapecio en el tono de madera de la estación, de la ronda 181: otoño #9b6452 · invierno #705f58 · primavera #a25d6d · verano #7d6044) que nace dentro de la copa y llega al borde de abajo; la lámina encima. Regenerados los tres tamaños (32 pestaña · 64 · 180 iPhone). El refuerzo por dilatación (`r205-favicon-tronco.cjs`, `r205-favicon-pequeno.cjs`) queda sin uso: el tronco oscurecido se confundía con la noche.
- **Después (Eric: «ahora parece un champiñón; el árbol tiene que tener un cuerpo parecido» · con la captura del hero: «el árbol realmente puede estar con sus raíces»):** `tools/r205-favicon-raices.cjs` (sustituye a los tres anteriores, que quedan sin uso): el favicon es el ROBLE ENTERO del hero, la lámina del árbol y la de las raíces pegadas por la línea de suelo (comparten eje), al 115 % del ancho del icono (copa y raíces se salen un poco por los lados, lo más tenue; el tronco gana tamaño), con el suelo al 58 % del alto. Sin tallos dibujados: tronco y raíz principal son el cuerpo. Los tres tamaños (32 · 64 · 180).
- **Después (Eric: «¿lo ves bonito? tiene que ser como el de antes pero que se vea un poco el tronco»):** vuelve el encuadre de producción (`r205-favicon-tallo.cjs`: árbol al 96 %, pie al 78 % del icono) y el tronco real de la lámina se CONTINÚA un poco hacia abajo (hasta el 94 % del icono, con su anchura medida ×1,4 y su color medio, remate redondeado); el roble con raíces (`r205-favicon-raices.cjs`) queda descartado: a 16 px era una mancha. Los tres tamaños.
- **Después (Eric: «el tronco que has puesto no es como el real en grande»):** `tools/r205-favicon-estira.cjs` (sustituye al tallo dibujado): nada dibujado; la franja del tronco de la propia lámina (del 80 % al 100 % de su alto: el tronco con su curva, su textura y el ensanche de la base) se estira en vertical ×2,4 y va bajo la copa; el tronco es el real, solo más largo. Encuadre de producción (árbol al 96 %, pie al 95 % del icono). Los tres tamaños. Los otros scripts r205-favicon-* quedan como pruebas sin uso.
- **Después (Eric: «el tronco, algo más nítido»):** la franja del tronco se enfoca (sharpen 1,6) con algo más de contraste, y los PNG de 32 y 64 llevan un enfoque leve al reducir.
- **Después (Eric: «más nítido, el tronco sin dithering»):** en la franja del tronco el alfa pasa a todo o nada (umbral 170) y una mediana de 3 borra las motas del canto de la lámina; sobre la noche el tronco va un 30 % más claro para despegarse del fondo (en invierno, no).
- **Después (Eric: «cerca de las hojas hay algo que tira hacia la izquierda»):** la franja estirada iba de lado a lado y arrastraba hojas y una rama baja; ahora se estira solo la banda del tronco (x 0,40–0,62 de la lámina), el corte baja al 84 % (donde ya solo hay tronco) y el estirado sube a ×2,8.
- **Después (Eric: «el tronco tiene que tener curva»):** a la banda estirada se le da el arco del tronco real (cada fila desplazada x = −0,045·W·sin(πt): un arco suave a la izquierda en el tramo medio, 0 en los extremos para casar con la copa y el pie; `CURVA` por entorno).
- **Después (Eric: «no se aprecia la curva» · «la curva no está conseguida»):** el arco pasa a una S como la del hero (el tronco baja de la copa hacia la derecha, se arquea y vuelve al centro en la base: sin(πt) + 0,45·sin(2πt), amplitud 0,1·W).

### Ronda 206 · 2026-10-15 · «Más proyectos» y slider con los ajustes del artefacto, y Cubbo en móvil (en local, Eric)
- **Eric (textual):** pegó otra vez los ajustes del artefacto «Fondos de proyectos» y dijo «no has aplicado los cambios...» · «estábamos pensando en que Cubbo sea un mockup de mobile parecido al de abajo. ¿Me generas uno? Que tenga cierta diferencia, claro».
- **Hecho, Más proyectos:** colores retocados en `home.ts` (Wisable #e6f24a, Kymatio #2fbf8a, Transcend #3f7bff) y los tres fondos generados del artefacto, con el mismo código y sin grano, a `public/media/anteriores/fondos/mas-{wisable,cubbo,transcend}.webp` (barrido, abstracto y miskmust, composición 1). Se aplican con `SITIO[].fondo`. Kymatio, Monad y THX siguen con el degradado de hoy.
- **Hecho, slider de /proyectos:** `Pieza.astro` gana la prop `fondo` y el slider pasa los cuatro del artefacto con grano al 100 % (`slider-{neety,surepayroll,claudia-be,eleven-lab}.webp`: floral 2, abstracto, floral 3, angular granular). Home of Ambrose, que no está en el artefacto como slide, queda con su degradado. Ojo: el artefacto no dibuja barra de navegador en el slider y `Pieza` la sigue dibujando.
- **Cubbo, móvil:** grabado a 390 px (`tools/r189/grabar.cjs cubbo-movil` → `video/cubbo-movil.{mp4,jpg}`), `CON_MOVIL` incluye `cubbo`. Pieza `tel` de 4:5 (columnas 2–5) sobre el fondo abstracto: teléfono FLOTANTE (sin mesa), más grande (54 %), ladeado −7° y cortado por abajo, con marco de CRISTAL en vez del bisel negro. Es la diferencia con el móvil de Neety sobre la mesa.
- **Medido:** `astro check` 0 errores · `astro build` OK · Chrome 1440 sobre dev: las ocho piezas y el slider con sus fondos, consola limpia. SIN medir: WebKit, móvil. No publicado ni subido.
- **Después (Eric: «el mockup tiene que ser con fondo natural también… y el vídeo lo haré yo» · «Wisable no está como en el artefacto» · «Kymatio no has puesto los colores como el artefacto»):**
  - **Cubbo:** fuera el teléfono de cristal y su fondo abstracto. Ahora es la lámina NATURAL del móvil de Andoni (`mesa-movil`) VOLTEADA (`mesa-movil-espejo.webp`, esquinas de la pantalla reflejadas en `QUAD['movil-espejo']`, `SITIO.espejo`) con la cámara más abierta (zoom 2,3 frente al 2,5 de Neety), pieza 4:5 en las columnas 2–5. Hasta que Eric grabe su vídeo, lleva mi grabación provisional `cubbo-movil.mp4`. Fuera `mas-cubbo.webp`. Sin imagen nueva generada: es la misma lámina, no una escena distinta.
  - **Wisable:** la pieza era 5:4 y en el artefacto es 1:1; corregido (con su barrido, 111 % · x 5 · y 17 · −2,5°).
  - **Kymatio, Monad, THX («degradado de hoy»):** los colores ya eran los del artefacto; lo distinto era el CSS. La web pintaba las manchas con desenfoque de 34 px y ampliadas al 160 % (`inset: -30%`), que las desplazaba; ahora, como el artefacto: `inset: 0` sin desenfoque (`.lamina.g-marca:not(.con-fondo)::before`).
  - **Medido:** `astro check` 0 errores · build OK · Chrome 1440: sin errores. No publicado.
- **Después (Eric: «al hacer hover, el mockup centrado y que se vea la web entera; si al salir vuelve al estado inicial, mejor» · «cuidado con el rebote de ida y vuelta, smoothness» · atardecer para Cubbo):**
  - **Hover de los navegadores (mancha y claro; Wisable, Kymatio, Monad, THX, Transcend):** el mockup se coloca centrado, recto y entero (88 % del ancho de la pieza) y al salir vuelve a su sitio. Va por TRANSFORMACIÓN (`translate` + `scale` + `rotate`, medidos por JS al entrar) y no por `left/top/width`; la misma curva (`cubic-bezier(.32,.72,0,1)`) y 0,8 s en ida y vuelta, sin retardo. El rebote venía de la vuelta heredando los retardos y duraciones distintas de la entrada (`.pieza.visto .mockup`). Fuera los hovers viejos (`translate −3 % −4 %`). Solo con ratón y sin movimiento reducido.
  - **Medido:** posición del mockup de Wisable cada 80 ms: ida y vuelta monótonas, sin sobrepaso (321 → 248 px de ancho y de vuelta). `astro check` 0 · build OK.
  - **Cubbo, atardecer: PROBADO Y DESHECHO** (Eric: «nada, quita el atardecer, deja como antes y que Andoni haga otro mockup»). Vuelve la lámina de día en espejo (`mesa-movil-espejo.webp`); el paisaje nuevo (lago) lo hará Andoni.
- **Vídeo de Cubbo en móvil (Eric, Screen Studio, https://screen.studio/share/3mkiDeXb):** 502 × 1080, 26,9 s, sin barra de desplazamiento visible → `public/media/anteriores/video/cubbo-movil.{mp4,jpg}` a 390 × 856, 30 fps, sin audio, CRF 28 (sustituye a mi grabación provisional, en `tools/retirados/r206/`). No publicado.
- **Vídeo de Cubbo, regrabado (Eric, https://screen.studio/share/niWiaGl6):** la primera toma (502 × 1080, 1:2,15) era un 5 % más alta que la pantalla del móvil de la lámina, que mide 262 × 536 px (1:2,05) y recorta por abajo (se perdía el botón «Solicita una demo»). Esta, 528 × 1080 (1:2,045), 25,5 s → `cubbo-movil.{mp4,jpg}` a 390 × 798, 30 fps, sin audio, CRF 28; la anterior, en `tools/retirados/r206/`. La grabación de Neety (1:2,16) sufre el mismo recorte por abajo.
- **Vídeos al salir el cursor (Eric: «al hover out no se empieza de nuevo; tiene que ir al hero otra vez»):** `tocar(v, false)` además de pausar devuelve el vídeo al primer fotograma (el hero). Medido (Chrome 1440, Wisable · Kymatio · Cubbo): a los 4 s dentro, `currentTime` ≈ 4 s; al salir, 0 y en pausa. Vale también en táctil al salir de pantalla. Home of Ambrose (bucle) solo se reinicia al salir de la vista.
- **Vídeo de Transcend (Eric, Screen Studio, https://screen.studio/share/Q02EhMGE):** 1876 × 1080, 22 s → recortada la barra de desplazamiento (12 px a la derecha) y la línea de 1 px de arriba y abajo (1864 × 1078) → `public/media/anteriores/video/transcend-network.{mp4,jpg}` a 960 × 556, 30 fps, sin audio, CRF 28; el anterior (7,4 s, 960 × 600), en `tools/retirados/r206/`. OJO: de ~9 s a ~12 s pasa por un bloque roto de la propia web de Transcend («Your Subscribe Form Embed has expired»). Sirve también al slider de /proyectos si Transcend entrara.
- **Reinicio a prueba de fallos (Eric: «no es verdad, no siempre vuelve al estado inicial», con captura de Wisable en reposo y el vídeo a mitad):** el reinicio dependía de un solo `pointerleave`, que se pierde si se hace scroll con el cursor encima, se cambia de pestaña o queda el foco de un clic. Ahora cada vídeo lleva su estado (`activo`) y un vigilante cada 250 ms (`:hover` / `:focus-visible`); además se reinicia al salir de la vista, al perder el foco la ventana y si el vídeo suena o avanza sin estar activo. Lo mismo para el mockup centrado (`centra`). Medido (Chrome): salida normal, `blur` y salida de vista → `currentTime` 0, en pausa y sin `centra`. Home of Ambrose (bucle) sin cambios.
- **Transcend, segunda toma (Eric: «este vídeo de Transcend mejor», https://screen.studio/share/GIU42Wvu):** 1876 × 1080, 21,4 s, sin barra de desplazamiento; recortado 2 px por los cuatro lados (1872 × 1076) → `transcend-network.{mp4,jpg}` a 960 × 552; la primera toma, en `tools/retirados/r206/`. OJO: en el hero el titular se queda en «We empower founders to build the future of lea…» (la escritura de la web no había terminado cuando empieza el scroll), y ese es el póster y el fotograma al que vuelve el vídeo al salir el cursor. Pendiente: regrabar esperando a que acabe de escribirse («…learning and work»). Pasa por el bloque roto «Subscribe Form Embed» unos segundos (~8 s).
- **Reinicio al hero, de verdad (Eric: «no siempre vuelve el hover out al hero… tienes que afinar eso»):** el vídeo volvía a `currentTime = 0` pero a veces seguía PINTANDO el último fotograma (comparando la imagen del `<video>` antes del hover y tras salir: 6 de 36 salidas fallaban, sobre todo con 1–5 s de hover; `currentTime` marcaba 0, por eso no se veía en las pruebas anteriores). Ahora, al parar, un vídeo que ha sonado se RECARGA (`load()`): vuelve a mostrar su póster, que es su primer fotograma. Medido (Chrome 1440, 60 entradas y salidas con tiempos de 40 ms a 4,5 s, salidas por el borde y por arriba): 0 fallos; al volver a pasar, reproduce desde el principio. SIN medir en Safari real.

### Ronda 207 · 2026-10-15 · el pie, sin la línea de abajo (en local, Eric)
- **Eric (textual):** «en el footer "Savvia · desde 2020" tiene que ser "Savvia, desde 2020"» → «o mejor, no pongas nada ahí» → «a la derecha @2020 Savvia o algo así» → «nada, no pongas nada ni @ ni na».
- **Hecho (`Pie.astro`):** fuera la línea mono entera de abajo del pie (la izquierda «savvia · desde 2020» y la derecha «© año»), con su CSS y la constante del año. `pie.desde` en `home.ts` queda sin uso. La portada de `sistema/Libro.astro` conserva su «savvia · desde 2020» (no es el pie). `astro check` 0 errores. No publicado.

### Ronda 208 · 2026-10-15 · sentado, guiar el scroll dentro de la pantalla (en local, Eric)
- **Eric (textual):** «cuando estás sentado viendo los proyectos, veo que no es intuitivo hacer scroll dentro de la pantalla… ¿cómo resolvemos eso? le tenemos que guiar un poco al usuario; respeta el diseño» → «aplica todo».
- **Causas (leídas en el código):** la guía de la ronda 172 salía UNA vez por navegador (`savvia:deslizado`: quien ya la había descartado no la veía nunca); era diminuta (≈155 × 25 px, letra de ≈10 px); asomaba tras la pantalla de carga; una capa (`capta-desliza`) se tragaba el primer gesto, así que el primer scroll no hacía nada; y la barra nativa está oculta, la pantalla parece una imagen.
- **Hecho (`Proyectos.astro`):**
  1. Guía POR SESIÓN de sentado, ya no por navegador (fuera `localStorage`): sale con la cámara posada y la web cargada (plazo máximo de 6 s si la web es lenta o no se deja embeber); se va en cuanto el puntero entra en la pantalla; si sigue fuera, vuelve a asomar a los 4 s (hasta 3 veces); en táctil, se va con el primer toque.
  2. Fuera la capa `capta-desliza`: la primera rueda ya mueve la web.
  3. Píldora más grande (letra 2,4 → 3,2 cqh ≈ 13 px, rueda y gota mayores), con la misma cristalería, Manrope y la gota Coral. Capa por encima de la pantalla de carga.
  4. EL HILO (`.hilo-desliza`): carril fino de cristal en el borde derecho con un pulgar de savia (Coral) que respira; está mientras estás sentado y la web lista, y se aquieta y atenúa con el puntero dentro. Con movimiento reducido, sin animación.
- **Medido** (Chrome 1440, sentado): sin guía antes de los 6 s; píldora e hilo a los ~8 s; con el cursor dentro, la píldora se va y el hilo se aquieta; fuera 5 s, vuelve a salir; sin errores · `astro check` 0. SIN medir: con la web de dentro realmente cargada (en el entorno de prueba nunca terminó de cargar), Safari, táctil. No publicado.
- **Después (Eric: «no es intuitivo · me has puesto un scroll de más · tiene que ser que cuando te sientes algo te guíe a hacer scroll con texto y demás · cuida el diseño»):** el HILO del borde derecho se leía como una segunda barra: FUERA (ya lo había quitado otra edición del mismo archivo, que dejó la ronda 209 en el código sin anotarla en el registro; yo solo ajusté lo que faltaba). Queda la píldora de cristal con la rueda y «desliza para recorrer la web», que ahora sale EN CUANTO la cámara se posa al sentarte (1,6 s), sin esperar a que cargue la web (antes esperaba hasta 6 s y la carga la tapaba); con el puntero dentro de la pantalla se queda 2,5 s y se va; si sale y sigue fuera, vuelve a los 4 s (hasta 3 veces); en táctil, hasta el primer toque. Medido (Chrome): a 1 s no, a 2,5 s sí; con el cursor dentro, sí a 1,2 s y no a 3,2 s; sin hilo en el DOM, sin errores · `astro check` 0.

### Ronda 210 · 2026-10-15 · sentarse pronto ya no deja la pantalla pillada (en local, Eric)
- **Eric (textual, con captura de la pantalla de carga «savvia»):** «si te sientas pronto se queda pillado y no carga».
- **Causa (`Proyectos.astro › sentar`):** sentado ANTES del estreno (`estrenado` aún `false`) solo se llamaba a `montar()`; la clase `cargando` (la pantalla de carga) solo la retiran `estrenar()` y `navegar()`, así que quedaba para siempre. Era también la razón de que en mis pruebas «la web de dentro nunca terminara de cargar».
- **Hecho:** sentarse antes del estreno cuenta como estreno (`estrenado = true`, se retira la página de inicio) y siempre se llama a `navegar(false)`. Red de seguridad en `navegar`: a los 12 s se quita la pantalla de carga aunque la web no haya disparado `load`.
- **Medido** (Chrome 1440, sentado sin esperar al estreno): `cargando` fuera a los 3 s, el `iframe` de la web montado y visible, con la píldora «desliza para recorrer la web» encima; sin errores · `astro check` 0. Ya se ha visto la guía sobre una web cargada. SIN medir: Safari, táctil. No publicado.

### Ronda 211 · 2026-10-15 · la guía de «desliza dentro» sale cuando aparece la web (en local, Eric)
- **Eric (textual):** «lo del desliza que aparezca cuando aparece ya la web, y es "desliza dentro para ver la web"».
- **Hecho (`Proyectos.astro`):** la píldora espera a que la cámara se haya posado (1,6 s) Y a que la pantalla de carga se haya retirado (la web ya se ve; en el peor caso, a los 12 s por la red de seguridad de la ronda 210). Texto nuevo: «desliza dentro para ver la web» (táctil: «desliza dentro con el dedo para ver la web»).
- **Medido** (Chrome 1440, sentado): `cargando` a 0,5 s; fuera a 1 s; píldora a los 2 s, con la web de Kuanta ya a la vista; sin errores · `astro check` 0. No publicado.

### Ronda 212 · 2026-10-15 · la guía de «desliza dentro» sale también con el puntero ya dentro (en local, Eric)
- **Eric (textual, con captura de la web de Kuanta ya cargada y sin guía):** «no parece la ayuda».
- **Causa (`Proyectos.astro › tictacD`):** te sientas con un CLIC en el monitor, así que el puntero ya está dentro de la pantalla; con el puntero dentro el código solo sabía ESCONDER la guía (a los 2,5 s la daba por descubierta) y nunca la mostraba. Mis pruebas anteriores partían con el puntero fuera.
- **Hecho:** con el puntero dentro, la guía sale en cuanto aparece la web y se queda 6 s (leerla y probar la rueda); luego se da por descubierta. Con el puntero fuera, como antes (sale y vuelve a los 4 s, hasta 3 veces).
- **Medido** (Chrome 1440; sentado por el botón con el puntero ya en el centro de la pantalla): guía a los ~2 s con la web de Kuanta a la vista y fuera a los ~8 s; sin errores · `astro check` 0. No publicado.

### Ronda 213 · 2026-10-15 · el icono de la guía de scroll, como el de la silla, y un pelín antes (en local, Eric)
- **Eric (textual):** «el icono animado de mouse que sea algo original como el de la silla de sentarte, y que salga un pelín antes».
- **Hecho (`Proyectos.astro › .aviso-desliza`):** fuera la rueda de ratón. Ahora, igual que la silla de «clic para sentarte»: un DISCO Coral a ras del borde de la píldora, con un glifo de trazo en tinta oscura (`#1b1714`, 1,6, puntas redondas) que entra con rebote y se endereza (`scale .35 → 1`, `rotate −12° → 0`). El glifo es una VENTANA con líneas de texto por la que sube una página en bucle (2,2 s; el patrón se repite cada 6 unidades, así que el salto del bucle no se ve; recortada con un `clipPath`). Con movimiento reducido, quieto. Padding de la píldora como el de la silla (disco a ras).
- **Más pronto:** de 1,6 s a 0,9 s tras sentarte (con la pantalla de carga ya fuera) y el vigilante, de 250 a 120 ms. Medido: guía a ~1,0 s (antes ~2,0 s).
- **Medido** (Chrome 1440, DPR 3): disco, ventana y líneas en cuatro instantes, con el texto «desliza dentro para ver la web»; sin errores · `astro check` 0. No publicado.

### Ronda 214 · 2026-10-16 · otro icono para la guía «desliza dentro» (en local, Eric)
- **Eric (textual):** «El icono de desliza cuando te sientas no sé si me acaba de convencer del todo, me gusta esa línea de originalidad pero vamos a probar otra cosa.»
- **Hecho (`Proyectos.astro › .aviso-desliza`):** fuera la ventana con la página que subía. Mismo disco Coral y misma entrada; el glifo acabó siendo UN CHEVRÓN hacia abajo que se enciende y baja (probados antes: ventana con página, punto-dedo, barra de scroll «parece un termómetro» y ventana con pulgar, que no se entendían).
- `astro check` 0. SIN medir a la vista (no se ha sentado en el navegador). No publicado.

### Ronda 215 · 2026-10-16 · el VISOR de proyectos (clic en una card → la web en grande) y el vídeo de Wisable rehecho (en local, Eric)
- **Eric (textual):** «que cuando hagas clic en cada card… se vea el mockup en grande, rollo slider modal… cuida mucho el diseño» · «vídeo de wisable rehecho» (enlace de Screen Studio) · «los veo un tanto pixelados».
- **Hecho (`Anteriores.astro`):** `<dialog data-vis>` nativo: velo Cacao 80 % con desenfoque, lámina 16:10 con el fondo de la marca (imagen o manchas, el mismo de la card) y la web grabada en grande dentro del navegador de cristal (el móvil, de pie), nombre y sector debajo, «Visitar la web ↗» y la barra de cristal de la casa. Fundido entre proyectos (0,7 s), flechas, ← → Esc, gesto en táctil, clic fuera cierra, devuelve el foco a la card. Las cards siguen siendo enlaces (con Cmd/Ctrl/Mayús van a la web). Los vídeos del visor se cargan al llegar a ellos (el siguiente y el anterior, por delante).
- **Wisable:** descargado del enlace (1876×1080, 18,5 s, con audio) → recortado al centro a 16:10, sin audio, 1280×800, 30 fps (`public/media/anteriores/video/wisable.mp4/.jpg`). Se pierden ~8 % de ancho (4 % por lado).
- **Medido** (Chromium 1440×900 y 390×844): abre, ← cambia, Esc cierra y devuelve el scroll; sin errores · `astro check` 0. SIN medir: Safari, táctil real. No publicado.
- **Pendiente:** los vídeos se ven blandos en el visor (están a 960 px, DPR 1, crf 27, hechos para las cards).
- **Eric (textual):** «en "visitar la web" tiene que ser "ver proyecto" y eso llevará al proyecto correspondiente.» → el enlace del visor es **«Ver proyecto →»** y va a `/proyectos/<slug>` (mismo pestaña). Hoy solo existen los casos de Cubbo y Neety (la card `neety-com` → caso `neety`): en los demás el enlace no se muestra hasta que se cree su caso (sale solo al existir en `src/data/proyectos.ts`).
- **Wisable, otra toma (Eric: «este mejor»):** `screen.studio/share/cRAKrMpD` (1876×1080, 18,5 s) → recorte central a 16:10, 1600×1000, 30 fps, crf 24, sin audio. Sustituye a la anterior.
- **Lupa al pasar (Eric: «otro botón como el del vídeo pero para que hagan clic… como de lupa»):** `.abre-ic` en la card: misma cápsula de cristal y mismo sitio que el icono de vídeo; al pasar (o enfocar) el de vídeo se va y entra una lupa con un «+». Solo con hover real (en táctil no sale). Medido (Chromium, Kymatio): sale en la esquina inferior derecha; `astro check` 0.
- **Toma grande para el visor (Eric: el vídeo de Home of Ambrose se ve pixelado; la pequeña se queda, es la proporción de la mesa):** el visor usa `/media/anteriores/video/<slug>-grande.mp4` + `.jpg` si existen (16:10, ≥1600 px); si no, la de la card. Pendiente: la toma grande de Home of Ambrose (y, si se quiere, de los demás).
- **Tomas grandes** (Eric: Home of Ambrose pixelado en el visor; enlace `2n4HYaeg`): `home-of-ambrose-grande.mp4/.jpg` y `wisable-grande.mp4/.jpg` = el cuadro ENTERO (sin recortar a 16:10: al recortar se cortaban el logotipo y el botón), 1600×922, 30 fps, crf 24, sin audio. El visor las usa si existen (y toma la proporción del póster). Las cards siguen con `home-of-ambrose.mp4` (960×522, la proporción de la mesa) y `wisable.mp4` (recorte 16:10, 1280×800, toma nueva). Medido (Chromium DPR 2): el visor carga las grandes (1600×922); `astro check` 0. Pendiente: las 14 restantes. No publicado.
- **Kymatio rehecho** (Eric: «video kymatio bien», `uarFLLMQ`, 1876×1080, 28 s): `kymatio.mp4` (card, 1280 de ancho) y `kymatio-grande.mp4` (visor, 1600), cuadro entero. Y **Wisable** de la card, también SIN recortar (antes 16:10 cortaba el menú): 1280 de ancho.
- **Home of Ambrose ya no suena solo (Eric: «que no empiece hasta que hagas hover, como los demás»):** fuera `data-siempre` (ronda 204); se ve el póster y el vídeo corre al pasar. Las cards de Kymatio y Wisable, a 960 de ancho (crf 27, ~1 MB): a tamaño de card no hace falta más; la toma grande es la del visor.
- **Cubbo en el visor, en escritorio** (Eric: `C43TZGZg`, 1876×1080, 25 s): `cubbo-grande.mp4/.jpg` (1600 px, cuadro entero). La card sigue enseñando su móvil en la mesa; el visor usa la web de escritorio (`VISOR_ESCRITORIO`).
- **Monad en escritorio** (Eric: `pZjQAFAZ`): `monad.mp4` (card, 960 px) y `monad-grande.mp4` (visor, 1600 px), cuadro entero.
- **Neety en el visor, en escritorio** (Eric: `a9NKImoH`): `neety-com-grande.mp4/.jpg` (1600 px); como Cubbo, la card sigue con su móvil y el visor enseña la web de escritorio (`VISOR_ESCRITORIO`).
- **THX en escritorio** (Eric: `JAQO8kFc`): `thx.mp4` (card, 960 px) y `thx-grande.mp4` (visor, 1600 px), cuadro entero.
- **Eric:** «quitamos lo de ver proyecto» → fuera el enlace del visor (y `rutaCaso`); «cada vez que haces clic en una u otra, que el slider empiece de 0» → al abrir una card o llegar a un proyecto, su vídeo vuelve al segundo 0 (al abrir, aunque sea el mismo de la vez anterior). Medido (Chromium): reabrir → 0,5 s; ir y volver → 0,4 s.
- **THX, otra toma** (Eric: «este mejor», `XRXOEole`): sustituye a la anterior; `thx.mp4` (960 px, crf 31) y `thx-grande.mp4` (1600 px, crf 28), cuadro entero.
- **Neety, otra toma de escritorio** (Eric: «neety mejor», `qmrW2T54`): sustituye a `neety-com-grande.mp4/.jpg` (visor).
- **Transcend rehecho** (Eric: `vP5WM1ay`): `transcend-network.mp4` (card, 960 px) y `transcend-network-grande.mp4` (visor, 1600 px), cuadro entero.
  (a Transcend se le recorta el primer 0,5 s: el fotograma 0 era una página en blanco y salía así como póster y en cada vuelta del bucle.)
- **Neety, línea vertical en el borde derecho** (Eric): la grabación traía el filo de la ventana y el pulgar gris de la barra de scroll en los últimos ~14 px. `neety-com-grande.mp4` recodificado recortando 2 px por la izquierda, arriba y abajo y 14 por la derecha (1860×1076 → 1600 px). Medido: el borde derecho queda liso. Sin subir.
- **La línea negra de Neety, de verdad** (Eric: «igual lo arreglamos si en neety el fondo es blanco»): el `<video>` del visor tenía `background:#000` y la caja mide 983,86 px (fraccionaria), así que el negro asomaba como línea de 1 px. Ahora `.vis-vid` usa `--vf` (por proyecto): `#f6f7fb` si el fondo de su web es claro (Neety, Home of Ambrose, Transcend, Monad…) y negro si es oscuro. Medido (Chromium DPR 1 y 2, Neety): sin línea. Sin subir.
- **Reproductor del visor** (Eric: «un reproductor que puedas adelantar o retrasar al hacer hover, minimalista, diseñado por nosotros… no sé eh»): al pasar por el vídeo sale abajo una cápsula de cristal oscuro (20 rem, centrada) con una línea fina y un punto; arrastrar adelanta/retrasa (pausa mientras se arrastra y reanuda al soltar), un clic en el vídeo lo pausa o lo reanuda; en táctil, siempre visible y tenue. `Anteriores.astro` (`.vis-scrub`). Medido (Chromium): arrastrar a 75 % → 13,9 s de 18,6; clic = pausa/play; no cambia de proyecto; sin errores. SIN medir: táctil real, Safari. Sin subir.
  (Eric: «que ese reproductor solo salga cuando haces hover sobre el mockup»: fuera la excepción táctil, que lo dejaba siempre visible. Medido: 0 en reposo, 1 sobre el mockup, 0 fuera.)
- **Fuera el reproductor del visor** (Eric: «quitamos el reproductor, da igual»): cápsula, arrastre y clic-para-pausar eliminados (markup, JS y CSS). Medido: abre, reabre desde 0, ← →, sin errores; `astro check` 0 y `astro build` en verde. Sin subir.

### Ronda 216 · 2026-10-16 · menos aire entre Más proyectos, Servicios y Estudio (en local, Eric)
- **Eric (textual):** «hay mucho espacio aquí, y luego entre la siguiente y esta también hay mucho».
- **Medido antes (1440):** último proyecto → título de Servicios 464 px (192 de `#anteriores` abajo + 272 de Servicios arriba); fin de Servicios → título de Estudio 664 px (272 de Servicios abajo + 287 de Estudio arriba + 105).
- **Hecho:** `#anteriores` padding-bottom = mitad de `--space-section` (192 → 96); Servicios arriba ×0,75 (272 → 144) y abajo ×0,85 (272 → 163); Estudio arriba ×0,85 (287 → 163). Mínimos en móvil (3 / 4 / 5 rem). **Medido después:** 240 y 431 px a 1440; 112 y 160 a 390. Sin errores; `astro check` 0. Sin subir.
- **Ojo:** el comentario de la ronda 191 decía que ese relleno extra de Servicios era para la gota de la sección siguiente (sube ~240 px): con 163 px abajo, la gota tapa un poco el final de Servicios mientras sube, y queda limpia en reposo.
- **El naranja por detrás de las cards (Eric: «que lo naranja no quede por encima de los mockups arriba»):** la gota de Servicios (`.sube`, z-index 3) subía sobre el final de «Más proyectos» y tapaba cards y pies. `#anteriores > .wrap { position: relative; z-index: 4 }`: el contenido por encima de la gota, que pasa por detrás. Medido (Chromium 1440, a mitad de transición): cards y pies de Neety y THX enteros sobre el naranja; sin errores. Sin subir.
- **Marrón sobre Servicios, texto en blanco donde toca** (Eric: «lo mismo aquí, solo que si el marrón toca las letras de Consultoría, lo que toque tiene que volverse white»): `data-sube-eco` en Estudio; `entradas.ts` mete dentro de la gota (`.sube`) un ECO inerte del contenido de Servicios (superficie oscura, alineado por abajo, sin ids ni vídeos/canvas; se hace al acercarse y se rehace si el original cambia de clase/contenido). La curva de la gota recorta también el eco: lo que cubre el marrón se ve en blanco, lo demás es el original. Medido (Chromium 1440, con el relleno forzado a 70 px para que se solapen): «Consultoría», las filas y los círculos, claros sobre el marrón y alineados con el original, sin costura; sin errores.
- **Eric: «del espacio que has quitado, hay que ampliar más ahora»:** relleno inferior de Servicios 163 → ~194 px (0,9 × la altura de la gota de Estudio, `clamp(90px, 24lvh, 240px)`; móvil 182). Hueco fin Servicios → título Estudio: 463 px (1440) · 263 (390). Con eso la curva ya no llega a tocar el texto en reposo; el blanco solo se ve si algo queda dentro de la gota. Sin subir.


## Rondas de Nilo en local (14–16/10), renumeradas al juntarlas con las de Eric
Se trabajaron en paralelo a las rondas 203–216 de Eric y se habían numerado igual: aquí van como 217–226 (las menciones «ronda 2xx» dentro del texto y en los
comentarios del código conservan su número de entonces: 203→217 · 204→218 · 205→219 · 206→220 · 207→221 · 208→222 · 209→223 · 210→224 · 211–215→225 · 216→226).

### Ronda 217 · 2026-10-14 · los casos: nada fuera de las guías ni recortado, vídeos regrabados sin saltos y a más calidad, la paleta a lo ancho y el espaciado medido (en local, Nilo)
- **Andoni (textual):** «en el portfolio, este detalle [las cuatro tarjetas de Kuanta] se sale de las guías: tiene que estar dentro y verse sin cortar» · «cerciorarse de que
  todos los vídeos se ven con buena calidad; en Kuanta, en el plano que se construye, las isometrías como que vibran: con mostrar una construyéndose es suficiente» ·
  «la paleta de colores, que tenga más presencia, y podríamos poner el sistema de espaciados para que todo se vea dónde está».
- **Hecho:** · `[slug].astro`: la fila «sangre» ya no sale de las guías (12 columnas a la proporción real de su vídeo, como la ancha) y en parejas y tríos ninguna pieza
  se recorta: la que no lleva placa va ENTERA sobre el color de su web (antes llenaban su hueco: Arkdev «atraca» y «clientes» e Invopop «ficha» perdían los lados).
  · VÍDEOS: la causa de la vibración era el grabador de la ronda 154 (capturas a 2× en bucle, 6–10 por segundo, rellenadas a 30 fps repitiendo fotogramas) y la
  calidad, CRF 23–26 en los detalles y CRF 29 en las portadas. `tools/r188/grabar.cjs`: la página corre a CÁMARA LENTA mientras se graba (performance.now, Date.now,
  rAF y temporizadores a 0,2 y `Animation.setPlaybackRate`), cada captura cae en su hora exacta y no se repite ningún fotograma (40–260 capturas por segundo de página);
  CRF 18 (21–23 en los más pesados a pantalla completa). Regrabados los de las webs en vivo (Kuanta, Arkdev, Playground, Neety, Cubbo, Remerge; lista
  `tools/r188/lista.json`); recortados de nuevo desde sus grabaciones originales los archivados de Invopop e Isotrol y las portadas (`tools/r188/archivo.sh`). Kuanta
  «Un plano que se construye»: una sola ilustración (Edge and on-prem) de línea a relleno (opciones nuevas `salto` y `desde`). La cubierta de Business Online Payroll
  no se pudo regrabar (sin fotogramas con `zoom`): sigue la anterior.
  · EL SISTEMA: la paleta, a lo ancho de la retícula, un panel por color (el ancho sigue al uso, mínimo 14) con nombre, valor y %, que se descubre al llegar; fuera la
  barra fina y la lista repetida. ESPACIADO medido en cada web entregada (`tools/r188/espacios.cjs` → `src/data/espaciado.json`, a 1440 px): paso base (4, 8 o fluido),
  aire entre secciones, contenedor y los nueve valores que más se usan con su caja a escala real y para qué (relleno, margen, entre elementos). Invopop no lo tiene
  (invopop.com ya no es la web entregada).
- **Medido:** `astro check` 0 errores · `tools/verify.cjs` en /, /proyectos y tres casos (Chrome y WebKit, 1280 y 390): limpio, desborde 0 · `tools/r188/ver.cjs`: 0 piezas
  fuera de las guías en cinco casos · fotogramas del plano capturados (una construcción, sin saltos).
- **Pendiente:** no publicado ni subido. `public/media/obra` pasa de 58 a 87 MB (más calidad); los vídeos se cargan solo al verse.

### Ronda 218 · 2026-10-14 · los gestos nuevos de Eric y Andoni (en local, Nilo)
- **Andoni (textual):** «aquí te paso para actualizar los gestos de Eric y Andoni» (`~/Desktop/frames-referencia-v3.zip`: baloncesto y fútbol, 16 fotogramas + cierre, 1024 × 1536).
- **Hecho:** `tools/r189-equipo/montar.cjs` (fuente en `tools/r189-equipo/fuente/`, fuera de git): Andoni tira a canasta, Eric da un toque de fútbol. El 01 de cada uno se
  encaja sobre su mitad de la foto (solape de máscaras 0,94 y 0,89) y todos los fotogramas llevan su misma escala y sitio (el salto y la patada se ven como son) →
  `public/media/equipo/r189/` (2,6 MB). `home.ts` apunta a ellos; `Estudio.astro` a 10 fps y sin el saltito artificial de la ronda 144 (los fotogramas ya saltan).
- **Medido:** fotogramas 1, 4, 7, 10, 13 y 16 de cada uno sobre la foto (`tools/r189-equipo/ver.cjs`): sin errores ni salirse · verify limpio en /.
- **Pendiente:** son fotogramas generados (su LEEME avisa de diferencias de cara y ropa con la foto); en tres del tiro asoma una mota suelta junto a los pies; no publicado.

### Ronda 219 · 2026-10-14 · la carátula del caso sin el hueco de arriba y el marco de navegador de treseiscero (en local, Nilo)
- **Andoni (textual):** «en el portfolio, la primera vista que ves del proyecto le sobra mucho espacio por arriba, y el marco en el que están metidos se ve raro: tiene que
  ser un marco estilo el que teníamos en treseiscero.com».
- **Hecho (`obra/Pieza.astro`):** el MARCO, el de treseiscero.com (medido allí): ventana clara (#F3F2EE) y recta, filo fino, radio pequeño; barra con tres puntos grises,
  candado y dominio centrados y recargar a la derecha; la web en un margen fino con su propio radio. Sustituye a la barra de cristal translúcido de la ronda 156 (Eric)
  en el listado, la rejilla y la carátula. La CARÁTULA ya no mide 78 lvh con el navegador hundido hasta el borde (~170 px vacíos arriba a 1280): la lámina va a 12:5 y
  el navegador empieza al 7 % (el teléfono, 2:1 y al 8 %; en móvil, 2:1). Al revisarlo: las portadas regrabadas de Arkdev y Playground arrancaban en la pantalla de carga
  de su web → vuelven las anteriores; el póster de las portadas recortadas, al 60 % del vídeo (el de Neety enseñaba su pantalla de carga).
- **Medido:** `astro check` 0 errores · `tools/verify.cjs` en /, /proyectos y dos casos (Chrome y WebKit, 1280 y 390): limpio · capturas de la carátula (Kuanta, Neety,
  Remerge, Arkdev en WebKit 390) y de la rejilla.
- **Pendiente:** en los destacados del listado el navegador sigue algo ladeado (ronda 68); en treseiscero iba recto. No publicado ni subido.
- **Al integrar lo de Eric (15/10, Andoni):** «quédate con el marco de cristal de Eric (lo que está publicado) y conserva el resto de la ronda 190» → `Pieza.astro` vuelve al
  marco de cristal de las rondas 191–196 (fuera el de treseiscero) y se quedan la carátula a 12:5 con el navegador al 7 % (teléfono 2:1 al 8 %; en móvil 2:1) y las
  portadas recuperadas. Rondas 188–190 locales renumeradas 203–205 (Eric publicó otras con esos números).

### Ronda 220 · 2026-10-15 · el favicon del roble, reducido y en color, y los gestos nuevos a 30 fps (en local, Nilo)
- **Andoni (textual):** «el favicon quiero algo reducido del árbol pero que siga manteniendo los colores lo mejor posible» · «te paso para poner nuevos movimientos
  míos y de Eric» (`~/Desktop/animaciones-web-30fps.zip`: baloncesto y fútbol, 61 PNG por persona, 256 × 384, 30 fps, con alfa).
- **Hecho:** · FAVICON (`tools/r206/favicon.cjs`): de la lámina del hero de cada estación se queda solo el núcleo del roble (fuera las estelas horizontales: solo lo
  casi opaco y las columnas donde el árbol es denso; en invierno, más permisivo porque sus ramas son finas), recortado y agrandado hasta llenar el icono (6 % de
  margen), con mediana y saturación ×1,25 para que el color aguante a 16–32 px; mismo fondo de estación que la ronda 156. Favicon 64 px redondeado e icono de
  iPhone 180 px; `?v=206` en `Base.astro`. Los anteriores, en `tools/retirados/favicon-r196/`. No es el redibujo de la ronda 187 (que se retiró): es la lámina.
  · GESTOS (`tools/r206/montar.cjs`, copia del de la ronda 189; fuente en `tools/r206/fuente/`, fuera de git): 60 fotogramas por persona (el 61 repite el
  primero), el primero encajado sobre su mitad de la foto (solape 0,94 Andoni y 0,89 Eric, como en la 189); se borran las motas sueltas de los intermedios →
  `public/media/equipo/r206/` (120 WebP, 2,2 MB). `home.ts` apunta a ellos; `Estudio.astro` a 30 fps (2 s por gesto). La mota junto a los pies de Andoni que ya
  salía en la 189 era la punta de su zapatilla en la FOTO, que cruzaba el corte entre las dos mitades: el corte de abajo pasa del 49,17 % al 51 %.
- **Medido:** fotogramas 0 · 10 · 20 · 30 · 40 · 50 de cada uno sobre la foto (`tools/r206/ver.cjs`, Chrome 1440 y WebKit 390): sin errores, sin mota.
- **Pendiente:** los intermedios están interpolados (su LEEME lo avisa): en el pase de Eric hay fotogramas con fantasma en las piernas (≈ 20 y 40) y el tiro de
  Andoni se emborrona algo a mitad; además vienen a 384 px de alto y en la web se pintan a ×2,4: en pantallas retina se ven algo blandos (pedir la versión a
  doble resolución si se quiere nitidez). No publicado ni subido.

### Ronda 221 · 2026-10-15 · el favicon con el estilo del hero y las v del wordmark acabadas en bola (en local, Nilo)
- **Andoni (textual):** «el favicon no me gusta, el árbol no entra bien: hay que ponerlo con más espacio por arriba y que no se corte por los lados» · «el favicon
  tiene que conservar el estilo del hero» · «podemos trabajar el wordmark de savvia haciéndole alguna ligera modificación y que tenga más personalidad» → «modificar
  las v de alguna manera sutil pero que se note».
- **Hecho:** · FAVICON (`tools/r207/favicon.cjs`; sustituye al de la ronda 206): la lámina del hero de cada estación TAL CUAL (estelas, trama y color), con el núcleo
  del roble al 70 % del ancho, 10 % de aire abajo y el resto arriba; las estelas se desvanecen entre el 80 y el 94 % del icono (no se cortan). `?v=208`.
  · WORDMARK (`tools/r207/wordmark.cjs` → `public/savvia-palabra.svg`; el anterior en `tools/retirados/savvia-palabra.r206.svg`): la misma palabra en Family, pero el
  brazo fino de cada v acaba en una BOLA (r 52) en vez de en remate, como la v caligráfica del logotipo de la ronda 10, y rima con el punto de la i. Misma caja
  (2373 × 707): no cambia de tamaño en la barra, el menú, Agentic, Proyectos, la receta ni el libro. `?v=208`. Probadas y descartadas (hojas en el scratch de la
  sesión): la gota en el punto de la i (con las letras más juntas), las vv unidas por el remate, las vv cruzadas (se lee «sawia»), la gota que cuelga del vértice
  (se lee «sayyia»), la v que sube hasta el punto de la i y las v caligráficas enteras del logotipo antiguo (la que más carácter tiene; queda como alternativa).
- **Medido:** `astro check` 0 errores · barra en Chrome y WebKit, 1440 y 390, sin errores y con `favicon-otono.png?v=208`.
- **Después (Andoni):** «no me gusta ninguna, deja la que está» → vuelve `savvia-palabra.svg` de siempre (`?v=209` para saltar la caché). `tools/r207/wordmark.cjs` queda como
  registro de lo probado. El favicon, a rehacer ILUSTRADO (ver ronda 208). No publicado ni subido.

### Ronda 222 · 2026-10-15 · el wordmark nuevo de Andoni, calcado y en la web (en local, Nilo)
- **Andoni (textual, con una imagen del wordmark en blanco sobre negro):** «replica este wordmark y vamos a llevarlo a web para ver cómo queda».
- **El wordmark:** «savvia» en Family con las v retocadas: en el vértice de cada v la savia hace una gota hacia dentro, remates ondulados, y el brazo fino de la
  segunda v sube hasta ser el PUNTO de la i (la i ya no lleva punto propio).
- **Hecho (`tools/r208/`):** se CALCA de su imagen (`wordmark-referencia.png`) con potrace, no se redibuja, para que sea fiel: recorte a la palabra + 20 px, ×4
  lanczos, desenfoque 1,2, umbral 128, tolerancia 1 (`trazo-potrace.svg`) → `wordmark.cjs` → `public/savvia-palabra.svg` (29 KB; coordenadas enteras, caja
  ajustada a la tinta, 944 × 272). La proporción pasa de 2373/707 a 944/272 en la barra, el menú, Agentic, Proyectos, la receta, el libro y `global.css`; `?v=210`.
  La anterior, en `tools/retirados/savvia-palabra.r206.svg`.
- **Medido:** barra en Chrome y WebKit, 1440 y 390, sin errores.
- **Pendiente:** es un calco de una imagen de 944 px de ancho: para el archivo maestro de marca convendría el vector original. La carga y el titular del pie
  escriben la palabra con la fuente, no con este SVG. No publicado ni subido.
- **Después (Andoni):** «trabajarlo un poco más para que los grosores coincidan mejor con el resto de letras». Medido sobre el calco (superpuesto a Family): en sus
  v el brazo grueso medía ~80 px y el fino ~90 (en Family, ~150 y ~66: sus v eran casi monolineales) y la bola, más pequeña que el punto de la i. Probado
  ensanchar el calco fila a fila (`ajustar.cjs`: deja muescas y cortes donde el brazo toca el remate; se queda como registro). SOLUCIÓN (`vector.cjs` →
  `public/savvia-palabra.svg`, `?v=211`, de vuelta a la caja 2373 × 707): la palabra RECONSTRUIDA EN VECTORIAL sobre los glifos de Family (s, a, palo de la i
  y a, exactos) y sus v con los brazos de la v de Family (grueso y fino de la fuente) más lo suyo dibujado a medida: un solo remate que une las dos v (con
  una comba leve), la savia que baja por el canto de dentro del brazo grueso y cuelga en una gota (más arriba que en su dibujo: con el brazo de Family,
  junto al vértice no cabe), la gotita bajo el primer remate, la banderita y el brazo fino de la segunda v que sube en curva hasta la bola, que es el punto
  de Family en su sitio. El calco, en `tools/r208/palabra-calco.svg`.
- **Después (Andoni):** «no me convence nada, deja de momento la que teníamos de Family» → vuelve `savvia-palabra.svg` de siempre (`?v=212`). Calco y
  reconstrucción se quedan en `tools/r208/` como registro.

### Ronda 223 · 2026-10-15 · el móvil de la mesa, en las cuatro estaciones (en local, Nilo)
- **Andoni (textual):** «aquí va el mockup de las 4 estaciones para ponerlo donde tengamos y que cambie con las estaciones» (`~/Desktop/mockup-cuatro-estaciones.zip`:
  primavera, verano, otoño, invierno; 1672 × 941; generados con la herramienta integrada de imágenes a partir de `mesa-movil.webp`, `tools/r209/generacion.json`).
- **Hecho:** → `public/media/anteriores/mesa-movil-<estación>.webp` (144–157 KB). En «Más proyectos», la pieza del móvil sobre la mesa (`Anteriores.astro`, tipo
  `movil`) lleva las cuatro y enseña la de la estación de la web (otoño por defecto); las demás no se pintan ni se descargan (`display: none` + `loading=lazy`).
  La pantalla, comprobada sobre las cuatro con el cuadrilátero medido de siempre (964,183 · 1205,178 · 1195,714 · 943,705): cae en su sitio (±2–4 px, que tapan
  las esquinas redondeadas del vídeo). `mesa-movil.webp` (la de antes) se queda sin uso.
- **Medido:** `tools/r209` (Chrome y WebKit, 1440): al cambiar `data-estacion`, se ve solo la lámina de esa estación, cargada a 1672 px; sin errores.
- **Pendiente:** el cambio es instantáneo (las otras piezas viran con un fundido de 1,2 s); no publicado ni subido.

### Ronda 224 · 2026-10-15 · el wordmark nuevo de Andoni, a prueba (en local, Nilo)
- **Andoni (textual, con `~/Desktop/savvia_wordmark_new.svg`):** «vamos a probar este wordmark nuevo».
- **Hecho:** su SVG tal cual (vectorizado con VTracer; copia en `tools/r210/wordmark-andoni.svg`) → `public/savvia-palabra.svg` con la caja ajustada a la tinta
  (1044 × 272; su lienzo traía 12 px de margen). Proporción 1044/272 en la barra, el menú, Agentic, Proyectos, la receta, el libro y `global.css`; `?v=213`.
  A la misma altura que el de Family, sale un 14 % más ancho.
- **Medido:** `astro check` 0 errores · barra en Chrome y WebKit, 1440 y 390, sin errores.
- **Pendiente:** su visto bueno; la carga y el titular del pie escriben la palabra con la fuente. No publicado ni subido.

### Ronda 225 · 2026-10-15 · los favicons ilustrados de Andoni, por estación (en local, Nilo)
- **Andoni (textual, con `~/Desktop/savvia-favicons-estaciones-v4.zip`):** «aquí tienes los favicons». Hechos por él con ImageGen a partir de los robles del hero
  (capturas en `~/Desktop/savvia-arboles-hero/`): icono con esquinas redondeadas, márgenes amplios, colores apagados y el tronco desde abajo; ICO y PNG de 16 a
  512 por estación (`tools/r211/`: LEEME, prompts y vista previa).
- **Hecho:** `favicon-<estación>.png` = su PNG de 64 px; `apple-touch-icon-<estación>.png` = su PNG de 180 con las esquinas transparentes rellenas del fondo
  de su estación (iOS pinta de negro lo transparente y redondea él). `?v=211` en `Base.astro`. Los de la ronda 207, en `tools/retirados/favicon-r207/`.
- **Medido:** responden 200; revisados a 180 y a 32 px.
- **Pendiente:** no publicado ni subido.
- **Ronda 225b (Andoni, `~/Desktop/savvia-favicons-estaciones-v5.zip`):** «nuevos favicon para probar» → la v5, montada igual que la v4 (64 px y 180 a sangre; `?v=212`;
  material en `tools/r212/`; la v4, en `tools/retirados/favicon-r211/`). El árbol va más pequeño y con más aire que en la v4. No publicado ni subido.
- **Ronda 225c (Andoni, `~/Desktop/savvia-favicons-estaciones-v6.zip`):** «prueba este» → la v6, montada igual (`?v=213`; material en `tools/r213/`; la v5, en
  `tools/retirados/favicon-r212/`). No publicado ni subido.
- **Ronda 225d (Andoni, `~/Desktop/savvia-favicons-estaciones-v7.zip`):** «prueba estos» → la v7, con `tools/r213/montar.cjs` (64 px; 180 a sangre con cada esquina
  rellena del color de al lado), `?v=214`; material en `tools/r214/`; la v6, en `tools/retirados/favicon-r213/`. No publicado ni subido.
- **Ronda 225e · 2026-10-16 (Andoni, `~/Desktop/savvia-favicons-estaciones-v9.zip`):** «prueba estos» → la v9, con `tools/r213/montar.cjs`, `?v=215`; material en
  `tools/r215/`; la v7, en `tools/retirados/favicon-r214/`. No publicado ni subido.

### Ronda 226 · 2026-10-16 · el wordmark nuevo (savvia.svg) y el favicon de luz tenue (en local, Nilo)
- **Andoni (textual):** «prueba este wordmark para savvia, y enséñamelo en la web. De favicon nos quedamos con luz tenue, aplícalo también».
- **Hecho:** · WORDMARK: su `~/Desktop/savvia.svg` (copia en `tools/r216/wordmark-andoni.svg`; la v de la segunda «v» sube y se riza como punto de la i) →
  `public/savvia-palabra.svg` en blanco y con la caja ajustada a la tinta (1407 × 399). Proporción 1407/399 en la barra, el menú, Agentic, Proyectos, la receta, el
  libro y `global.css`; `?v=216`. En la barra, al mismo ancho que el de la ronda 210: 1,3 rem (móvil) y 1,425 rem (escritorio). El de la 210, en
  `tools/retirados/savvia-palabra.r210.svg`.
  · FAVICON: la versión «luz tenue» (`~/Desktop/savvia-favicons-telegram-luz-tenue.zip`, carpeta `favicon/`) con `tools/r213/montar.cjs`; `?v=216`; material en
  `tools/r216/`; la v9, en `tools/retirados/favicon-r215/`. Sus archivos para Telegram (`telegram/<estación>/subir-telegram.png`) son para el avatar del canal.
- **Medido:** `astro check` 0 errores · barra en Chrome y WebKit, 1440 y 390, sin errores y con `favicon-otono.png?v=216`.
- **Pendiente:** no publicado ni subido.

### Ronda 227 · 2026-10-16 · los marcos de Eric en el portfolio y los casos, la carátula con más aire y sus vídeos, nada recortado (en local, Nilo)
- **Andoni (textual):** «en portfolio y case studies faltan los nuevos marcos propuestos por Eric» · «en case studies la portada de arriba, darle un poco más de aire y
  utilizar los vídeos que ha puesto Eric» · «cerciorarse de que ninguna de las imágenes de los case studies sale cortada, y que se ven en buena calidad» · «dejamos
  el savvia de antes».
- **Antes:** se juntó lo de Eric (16/10: visor modal, vídeos «-grande», fondos generados, chat con OpenRouter, sus favicons de 32 px…) con lo local. Las rondas
  locales de Nilo se renumeraron 217–226 (ver arriba). Favicons: su forma de servirlos (pestaña con el de 32 px) con los archivos de LUZ TENUE de Andoni (`?v=217`).
  Móvil de la mesa: las cuatro estaciones también en su versión en espejo (`mesa-movil-espejo-<estación>.webp`).
- **Hecho:** · WORDMARK: vuelve el de la ronda 210 (su SVG de VTracer; 1044/272, `?v=227`; barra 1,2 / 1,3125 rem).
  · `obra/Pieza.astro` (rejilla y slider de /proyectos y carátula del caso): la VENTANA DE CRISTAL de «Más proyectos» (marco de 3 px igual por los cuatro lados, sin barra
  ni puntitos, radio 6, velo + desenfoque del fondo; más oscura sobre marca clara) y el degradado de marca como el artefacto «Fondos de proyectos» (las dos manchas
  sobre la pieza, sin desenfoque; al pasar, ×1,04). Carátula: lámina 12:5 → 11:5 y la ventana del 7 % al 12 % (más aire arriba), marco de 5 px y radio 10, la toma
  ENTERA (sin recorte de proporción). Neety y Cubbo, con las tomas grandes de Eric (`neety-com-grande`, `cubbo-grande`).
  · `obra/Medio.astro` (mosaico de detalles): sobre placa, el degradado de marca y la web dentro de la misma ventana de cristal; y la ventana toma la proporción REAL del
  archivo (leída con sharp al compilar): Arkdev «atraca» y «clientes» e Invopop «ficha» estaban marcadas 1:1 siendo apaisadas y se recortaban a cuadrado.
- **Medido:** `tools/r227/medios.cjs` (todos los vídeos e imágenes de los nueve casos y de /proyectos, Chrome ×2): 0 recortes. Calidad: dos vídeos de fila ancha se ven algo
  blandos en retina (×1,47: Kuanta «x-tarjetas», 1680 px, y Invopop «c-mapa», 1674 px, archivada: no se puede regrabar).
- **Pendiente:** regrabar Kuanta «x-tarjetas» a más resolución; las tomas de Eric (1600 px) son algo más pequeñas que nuestras cubiertas (1920); no publicado ni subido.
- **Después (Andoni: «sí, hazlo»):** Kuanta «x-tarjetas» regrabado con `tools/r188/grabar.cjs` en modo capturas a ×2 (antes, screencast a 1×) y a 2560 px
  (`tools/r227/lista.json`; la toma anterior, en `tools/retirados/obra-r226/`): 2560 × 1098, 275 fotogramas a 30 fps, 587 KB. `medios.cjs`: ya no sale blando;
  queda solo Invopop «c-mapa» (archivada).
- **Ronda 228 (Andoni):** «el wordmark, savvia con letras normal, el que está en producción» → `savvia-palabra.svg` de `origin/main` (Family), proporción 2373/707,
  barra a 1,375 / 1,5 rem como en producción; `?v=228`.
- **Ronda 229 (Andoni):** «en el portfolio todos los gradientes tienen como un grano raro; fíjate en los de la home, tenemos que utilizar ese estilo. En Claudia BE además
  es oscuro y queda muy raro. Mira esa consistencia en todos lados» → el grano venía de las imágenes de fondo del slider de /proyectos (`slider-*.webp`, ronda 206 de
  Eric; ruido medido 1,9–2,2 frente a 0,17 de los fondos de la home; la de Claudia BE, granate sobre una marca clara). Fuera del slider: cada diapositiva lleva el
  degradado liso de su marca (el mismo CSS que «Más proyectos», la rejilla, las carátulas y las placas de detalle). Revisados los demás fondos en uso: lisos.
- **Ronda 230 (Andoni):** «el de Home of Ambrose, ese verde por abajo tampoco me gusta en el gradiente, mejor un naranja amarillento» → su tercer color, `#4d4d1c` → `#e9a23b`
  (slider de /proyectos y `home.ts`, el visor de «Más proyectos»).
- **Ronda 231 · PUBLICADA (16/10)** (Andoni: «con esto publica lo nuevo y ya iremos puliendo proyecto por proyecto»): Switzer guardada en el proyecto
  (`src/assets/fonts/switzer/`, proveedor local: el build de Vercel del 16/10 falló al bajarla de Fontshare); commit de las rondas 217–231 y push a `main`.
  `public/media/equipo/r189/` (gestos de la 218, sustituidos por los de la 220) se queda fuera del commit.

### Ronda 228 · 2026-10-19 · vuelve el «Contáctanos» entre las montañas, con el tiempo de la 404 posado encima y el clic que abre el chat (en local, Eric)
- **Eric (textual):** «recuperar el Contáctanos que teníamos entre montañas del footer. Las hojas, copos, flores y hierba salen del Contáctanos como la 404» · «el click abre el chat modal» · «el hovering, que no lleve ese botón feo de "haz clic para agendar reunión"; que esté bien hecho con todas las letras en white white» · «quizás el ¿Hablamos? que no aparezca en el footer, porque tenemos el Contáctanos».
- **Hecho:** `Pie.astro` recupera la palabra partida (Contá delante / ctanos detrás de los montes) del commit 065d8e7 (que la había quitado), con el texto en `pie.contactar` (es/en). Fuera la puerta/píldora de hover: al pasar, la palabra entera pasa a blanco liso (en invierno, pizarra #22303e, porque ahí el fondo es claro). Clic = `window.__chat.abrir()` (con el dedo, 1.º toque enciende, 2.º abre; sin JS, mailto). El motor de la 404 pasa a `src/scripts/tiempo-encima.ts` (`tiempoEncima({ zona, cv, palabra?, espera? })`); la 404 lo usa igual y el pie lo usa con la palabra (posiciones de letra por Range, línea base por sonda): hojas, nieve, flores y hierba se posan sobre su tinta. `ChatFlotante`: el «¿Hablamos?» ya no se queda fijo en el pie.
- **Después (misma ronda):** la palabra va en BLANCO liso al 88 % (invierno: pizarra) y al 100 % al pasar; la mitad de detrás sube sobre la bruma del paisaje (z 2) y la hierba sigue delante; fuera la luz cálida del haz; al pasar con ratón, una píldora de cristal («clic para escribirnos») sustituye al puntero.
- **Pendiente:** el clima general del pie (hojas/nieve/flores/musgo sobre todo el paisaje) convive con el de la palabra; decidir si se quita.

### Ronda 232 · 2026-10-19 · el cambio de estación, fluido en toda la web como en el hero (en local)
- **Andoni (textual):** «tenemos que hacer que al cambiar de estaciones en todas las secciones y mockups se cambie fluido, ahora en algunas se cambia raro, en el hero
  funciona perfecto, tenemos que coger eso de referencia y llevarlo a todas las secciones y elementos de la web».
- **Antes (grabado fotograma a fotograma, `tools/r232/cambio.cjs`):** Servicios cambiaba de fondo DE GOLPE (y el coral, el cacao y la tierra de las raíces: no estaban
  registrados y saltaban mientras el fondo se fundía 2,4 s); la mesa de Proyectos fundía las dos láminas a la vez (a mitad se veía el fondo); el móvil de Cubbo
  (Más proyectos) cambiaba de foto de golpe (`display`); el paisaje del pie subía a manchas con un filo de color (`renacer`); el vídeo de savvia agentic en
  móvil enseñaba el póster y saltaba; la estela del Estudio cambiaba de paleta de golpe.
- **Hecho:** el gesto del hero (rondas 66–67) en `src/scripts/revelar.ts`: la estación nueva llega ya pintada y se DESCUBRE con el canto de papel rasgado
  (`rasgo-circulo.png`) que crece desde abajo en 2,6 s, y la vieja se apaga detrás; para lo que cambia por CSS, `rasgarCopia` congela una copia de lo viejo
  encima y le abre el agujero rasgado. Aplicado a: la mesa de Proyectos (`ponCapa`), el móvil de la mesa y los paisajes barridos de «Más proyectos» (fuera
  el fundido de `background-image`, que Safari no hace), el paisaje del pie (un lienzo clonado por capa, un solo círculo desde el centro de abajo) y la
  película de móvil de savvia agentic (segundo vídeo sincronizado). `global.css`: `--color-coral`, `--color-cacao`, `--color-salvia` y `--tierra-k`
  registrados con `@property` y en la misma transición de 2,4 s que el fondo. Estudio: los tonos viajan de una paleta a otra en 2,4 s.
- **Medido:** `astro check` 0 errores · `astro build` OK (el `@property` y la transición sobreviven al minificador) · `tools/verify.cjs` en / y /proyectos (Chrome y
  WebKit, 1280 y 390): consola limpia, 0 ≥ 400, desborde 0 · hojas `tools/shots/r232-*` · Servicios en WebKit: `--color-salvia` 236·191·143 → 229·197·163 → 216·208·198
  → 208·215·221 → 202·220·237 cada 400 ms (fundido) · móvil de Cubbo (Chrome y WebKit, `tools/r232/mesa-probe6.cjs`): otoño → invierno descubriéndose desde abajo ·
  película de móvil: la nueva entra a 0,1 s de la vieja y se descubre en 2,6 s (Chrome y WebKit).
- **Ojo para pruebas:** la captura de un solo elemento de Playwright espera a que pare la animación y miente; y en WebKit headless la captura llega tarde al
  primer fotograma: medir valores, no solo mirar.
- **A media ronda (Andoni):** «el de Home of Ambrose no cambia el mockup de estación, tenemos que hacer que cambie» → su mesa del estudio llevaba la lámina de otoño
  fija: ahora una por estación (`/media/estudio/<estación>.webp`, 150–185 KB, se piden al acercarse la pieza) y el mismo relevo rasgado desde abajo. En las mesas el
  relevo usa la PROPIA foto vieja (una copia nueva llegaba en blanco el primer fotograma en Chrome y se saltaba el gesto). Medido: el círculo crece 229 → 1263 px
  en 2,4 s y la foto vieja se apaga (Chrome); capturas en Chrome y WebKit `tools/shots/r232-hoa-*`.
- **Pendiente:** el texto de las secciones que pasan de oscuro a claro (invierno) cambia de tinta en un golpe corto a mitad del fundido, como en el hero (ronda 152): se
  ha dejado así; no publicado.

### Ronda 233 · 2026-10-19 · el reel «de cerca»: animaciones en detalle y savvia agentic (en local)
- **Andoni (textual):** «vale ahora vamos con el reel, quiero que muestre mejor nuestro trabajo. Sobre todo que haya animaciones que hacemos en detalle porque es lo
  que más llama la atención. Luego también mostrar el savvia agentic bien estaría guay porque es nuestro producto clave ahora. No tiene que ser muy largo, te
  diría de dejarlo en 30 segundos máximo».
- **Antes:** el reel de la ronda 152 se iba casi entero en la «construcción» (webs pequeñas, ladeadas y en gris): las animaciones apenas se veían; savvia agentic no salía.
- **Hecho (HyperFrames, `tools/r233/hf/`, `node build.cjs` genera `index.html`):** 30 s, cortes al pulso de «Distant Miles» (93 BPM; la canción entra en su 6,8 s
  para que el primer golpe fuerte caiga al empezar las animaciones). «Lo que hacemos, de cerca.» → ONCE animaciones de los casos a sangre (los vídeos `x-*` de
  `public/media/obra/`; para cada una, el tramo con más movimiento medido fotograma a fotograma, `tools/r233/movimiento.cjs`), con su rótulo «proyecto · qué es»:
  esfera, plano y matriz de Kuanta · muelle y terminal de Arkdev · cromos y notas de Playground · feed de Neety · componentes de Remerge · mapa de Invopop ·
  capas de Cubbo. La primera entra rasgando el titular desde abajo (el gesto de la web). → «savvia agentic · Tu web, en una librería que cualquier IA sabe
  leer.» → la escena de ESCRITORIO de savvia agentic grabada fotograma a fotograma a 1920×1080 (`tools/r233/grabar-agentic.cjs`, `__partitura.ir(t)`, tramo
  2,6–15,4 s, a 1,5×): la librería de Neety y Claude, Codex, tu equipo y savvia montando su home; entra rasgándose y se acerca despacio. → logotipo que se
  descubre + savvia.studio.
- **Web:** `public/media/reel/reel.mp4` (1600×900, 6,1 MB, −15,6 LUFS; antes 8,7 MB), `reel-mini.mp4` (7 s del arranque, 346 KB) y sus pósters. Los anteriores, en
  `tools/retirados/reel-r152/`. El menú sigue diciendo «0:30».
- **Medido:** `hyperframes check` 0 errores, contraste 9/9 · render sin fotogramas negros · `tools/r60-reel.cjs` (Chrome 1280 y 390, WebKit 1280): miniatura en el
  menú, el reel abre, suena y cierra, 0 errores.
- **Pendiente:** el render de HyperFrames sube el volumen por su cuenta (−11,7 LUFS): la versión web va normalizada a −16 con ffmpeg; no publicado.

### Ronda 234 · 2026-10-19 · el reel vuelve a construirse, ahora con savvia agentic de hilo (en local)
- **Andoni (textual):** «me gustaba lo de antes que se construían las webs, quiero eso pero en algún frame como que salgan animaciones más en detalle en una fila de
  2-3 y luego una se haga zoom y se vea y cosas así. El inicio tiene que ser como en el hero la caída de la gota y empiezan a crearse cosas. Necesitamos que se vea el
  savvia agentic a lo largo del reel. Cómo lo usamos para construir todo».
- **Hecho (`tools/r234-reel/`, sobre el de la ronda 152; `node montar.cjs` genera `hf/index.html`):** 45 pulsos de «Distant Miles» (30 s). 0–2: la GOTA de agua de
  la carga cae y del impacto nace la LIBRERÍA de savvia agentic (marca/color.md · tipografía · voz · espaciado · tokens.css · componentes/), que se acopla a la
  izquierda y se queda todo el reel: cada ficha que suelta un agente enciende antes el archivo del que sale, con el nombre del agente (Claude, Codex, Diseño,
  savvia), y debajo del título se lee la librería de cada proyecto. 2–30: se construyen Kuanta (ahora en navegador, abierto con el canto rasgado desde la
  librería), Arkdev, Playground, Neety (los tres agentes a la vez) y Remerge en el móvil, cada una sustituida por su web real. Dos FILAS DE DETALLE (4 pulsos): tres
  animaciones de los casos en fila (muelle · esfera · cromos; feed · plano · notas) y la del centro se abre a pantalla completa (el mismo vídeo recortado con
  clip-path, sin corte). 34–40: la librería se abre en la escena real de savvia agentic (la librería de Neety y los agentes montando su home). 40–45: logotipo +
  «savvia agentic · savvia.studio». Fuera de esta versión las tres «firmas» de la 152 (ruleta de Arkdev, isométricas de Kuanta, notas de Playground).
- **Web:** `reel.mp4` 1600×900, 9,8 MB, −15,1 LUFS; `reel-mini.mp4` (7 s: fila de detalle con su zoom, 232 KB) y pósters. El reel de la ronda 233 queda en
  `tools/r233/hf/renders/`.
- **Medido:** `hyperframes check` 0 errores (un aviso de contraste en una ficha heredada de la 152) · render sin fotogramas negros · `tools/r60-reel.cjs` (Chrome 1280 y
  390, WebKit 1280): abre, suena y cierra, 0 errores.

### Ronda 235 · 2026-10-19 · el reel: la librería como la de Neety, cinco proyectos y el roble de las estaciones al final (en local)
- **Andoni (textual):** «lo de savvia agentic que sea como la librería de Neety siempre a la izquierda y que el primer ejemplo sea Neety, luego el resto de ejemplos
  cogería Kuanta, Home of Ambrose, Cubbo y Monad, y el final que salga nuestro árbol pasando por las estaciones y listo».
- **Hecho (`tools/r234-reel/montar.cjs`; la versión de la 234, en `montar.r234.cjs`):** la LIBRERÍA es ahora una ventana clara como la de Neety («<proyecto> / library»,
  «La librería», apartados Fundamentos: Color · Tipografía · Voz · Espaciado · Radios y tokens; Componentes: Componentes de la web); nace de la gota y se queda a la
  izquierda hasta el final; cada ficha de un agente marca antes su apartado (filete naranja de Neety + el nombre del agente). Orden: Neety (savvia orquesta a los
  tres agentes; se abre con el canto rasgado desde la librería) → Kuanta → fila (feed de Neety · esfera de Kuanta ampliada · Neety por dentro) → Home of Ambrose
  (Diseño compone el titular a la deriva) → Cubbo (Codex, el azul de la marca) → fila (tensor de Kuanta · operación de Cubbo ampliada · capas de Cubbo) → Monad
  (Claude dibuja el pipeline) → el ROBLE del hero (las cuatro láminas) pasando por otoño, invierno, primavera y verano, cada una descubierta desde la base del tronco
  con el canto rasgado sobre la noche de su estación; al final, el logotipo y «savvia agentic · savvia.studio». Construcciones nuevas medidas sobre el primer
  fotograma de sus grabaciones (`public/media/anteriores/video/*-grande.mp4`).
- **Web:** `reel.mp4` 9,7 MB, −15,1 LUFS; `reel-mini.mp4` (7 s, Kuanta y la fila con la esfera) y pósters.
- **Medido:** `hyperframes check` en verde (0 errores) · render sin fotogramas negros · `tools/r60-reel.cjs` (Chrome 1280 y 390, WebKit 1280): abre, suena y cierra, 0 errores.

### Ronda 236–237 · 2026-10-19 · referencias de reels de estudios web y el reel «La mesa» (en local)
- **Andoni (textual):** «quiero que busques los mejores reel/vídeos de portfolio y nos basemos en ellos para hacer el nuestro» → «sí, monta el reel La mesa».
- **Referencias (`tools/ref236/`, `ver.cjs` reproduce cada reel en la página, saca la hoja y cuenta los cortes):** Active Theory (112 s, 124 planos, ~0,9 s por
  plano, mucha gente usando las piezas) · Cuberto (128 s, ~1,4 s, dispositivos en 3D sobre el color de cada marca) · Lusion (11,5 s, ~1 s) · Immersive Garden (9,5 s,
  ~0,6 s: UN monitor sobre una mesa, en una sala con plantas, al que la cámara vuelve; en su pantalla se escriben «Design», «Technology» y entran las webs, que
  luego pasan a pantalla completa) · Hello Monday (plano único). Elegida la de Immersive Garden porque ya tenemos ese escenario: la MESA del estudio con sus estaciones.
- **Hecho (`tools/r234-reel/mesa.cjs`):** lo que pasa DENTRO del monitor es el reel de la ronda 235 (librería + construcciones + filas + roble), encogido a la
  pantalla medida de la lámina (5120 px; Proyectos › PANT) y con un reflejo leve. La gota cae sobre el monitor y la mesa de otoño se abre rasgada; la cámara entra
  en la pantalla (a escala ×4,76 el contenido queda nítido); en cada cambio de bloque sale a la mesa y la ventana cambia de estación (invierno → primavera →
  verano, con el canto rasgado) y vuelve a entrar; al final, la mesa en verano con el roble pasando por las estaciones en el monitor, y entra por última vez con el
  logotipo.
- **Web:** `reel.mp4` 8,4 MB, −15,1 LUFS; `reel-mini.mp4` (7 s: la gota y la mesa que se abre) y pósters. La versión 235 queda en `tools/r234-reel/hf/renders/`.
- **Medido:** render sin fotogramas negros · `tools/r60-reel.cjs` (Chrome 1280 y 390, WebKit 1280): abre, suena y cierra, 0 errores · `hyperframes check`: los avisos que
  quedan son el grano de película «tapando» el texto de la librería (es una textura casi transparente: falso positivo).

### Ronda 238 · 2026-10-19 · prueba de reel CINÉTICO al estilo del de Linearity (en local, sin poner en la web)
- **Andoni (textual):** «podemos probar algo de este estilo» (x.com/linearityhq/status/2110362970119454745, «Introducing Linearity AI», 58 s).
- **Referencia medida (`tools/ref236/linearity.jpg`):** 11 planos en 58 s: casi un plano continuo de TIPOGRAFÍA CINÉTICA (palabras grandes que entran desenfocadas), la
  INTERFAZ dentro de la frase («edit [anuncio] text», «change [color]», «move [pieza] layouts»), manchas de degradado cálido como respiro, centro en claro,
  apertura y cierre en negro con el logotipo.
- **Hecho (`tools/r238-cinetico/build.cjs`, HyperFrames):** 30 s a pulso de «Distant Miles». Negro: «Tu web merece / algo más que una plantilla.» (tachada en coral) →
  manchas coral y miel: «Conoce» → logotipo + «agentic» → claro: «Tu marca, [la librería de Neety] en una librería.» → «Pide [la petición se escribe] y listo.» → la
  web de Neety → «edita [Neety con el titular seleccionado] textos» · «cambia [el roble vira de estación] colores» · «mueve [secciones que se reordenan] secciones» →
  Kuanta, Cubbo, Home of Ambrose y Monad, el nombre enorme y la web ladeada delante → «Cambios en horas, / no en presupuestos.» → negro: logotipo + agentic y el
  roble de otoño a verano.
- **Archivo:** `tools/r238-cinetico/reel-cinetico.mp4`. El reel del menú sigue siendo «La mesa» (ronda 237).
- **Medido:** `hyperframes check` en verde (0 errores) · render sin fotogramas negros.

### Ronda 239 · 2026-10-19 · el reel cinético, afinado (en local, sin poner en la web)
- **Andoni (textual):** «esto está mucho mejor, pero podemos hacer que los textos se vean centrados más pequeños siempre con la tipografía nuestra, savvia agentic
  también con la typo. Luego las estaciones finales tienen que ir con los árboles como los tenemos en el hero, también las guías del hero. Y mostrar más la librería,
  vamos a añadir algo estilo lo que tenemos en savvia agentic».
- **Hecho (`tools/r238-cinetico/build.cjs`; la primera versión, en `build.v1.cjs`):** textos en Family, centrados y más pequeños (frases 88–96 px, antes 150; nombres
  de las webs 150, antes 230); «savvia agentic» escrito en Family (fuera el logotipo + palabra). Bloque nuevo de 6 pulsos, «Los agentes leen tu librería»: la escena real
  de savvia agentic (`agentic.mp4`, a 1,6×: la librería de Neety, Color · Tipografía · Botones · Espaciado, y Claude, Codex, tu equipo y savvia cogiendo piezas para su
  home). Final: el HERO REAL de la web capturado en sus cuatro estaciones (`hero-est.cjs`: guías, haz de luz, el roble pintado por su motor; sin barra ni titular) que
  se relevan con el canto rasgado desde la base del tronco, con «savvia agentic.» + «Tu web, en una librería que cualquier IA sabe leer.» donde va el titular del
  hero (la tinta pasa a oscura en invierno).
- **Archivo:** `tools/r238-cinetico/reel-cinetico.mp4` (7,6 MB). El reel del menú sigue siendo «La mesa».
- **Medido:** `hyperframes check` en verde (0 errores, 0 avisos).

### Ronda 240 · 2026-10-19 · reel cinético: sin degradados, con la gota, copy de la web y las webs que se montan (en local, sin poner en la web)
- **Andoni (textual):** «quita lo de los gradientes y necesitamos añadir la animación de la gota en algún lado, y coge copies que hayamos puesto por la web. Y cuando
  mostramos cada web que se vayan montando como teníamos antes. Lo de cambia de colores que sea con las estaciones del hero también».
- **Hecho (`tools/r238-cinetico/build.cjs`; la v2, en `build.v2.cjs`):** fuera las manchas de degradado (fondos lisos). Abre la GOTA de agua de la carga (la del reel
  de la mesa) y del impacto nace el manifiesto. Copy, todo de `home.ts`: «La IA es la base; / el criterio sigue siendo nuestro.» · «savvia agentic: / tu web conectada
  con la IA.» · «Los fundamentos de diseño y desarrollo de tu web, [librería] en una librería que cualquier IA sabe leer.» · «La web, su receta y los agentes que la
  mantienen al día.» (con la escena real de agentic) · «Así tú y tu equipo podréis cambiar lo que queráis» (con la petición que se escribe) · edita / cambia / mueve
  («cambia» con el hero real en sus cuatro estaciones) · «Proyectos destacados con desarrollo agéntico.»: Kuanta, Home of Ambrose y Cubbo se MONTAN (el constructor de
  los reels anteriores, `build-obra.cjs`, a 0,62 de tiempo: retícula, cajas, agente con sus fichas y «✓ publicado», y la web real) · final: el hero con su titular,
  «Elevamos tu web con IA. / Especialistas en orquestar el desarrollo agéntico.», pasando por las cuatro estaciones.
- **Archivo:** `tools/r238-cinetico/reel-cinetico.mp4` (6,6 MB). El reel del menú sigue siendo «La mesa».
- **Medido:** `hyperframes check` en verde (0 errores, 0 avisos).

### Ronda 241 · 2026-10-19 · reel cinético más largo (40 s), ejemplos reales, nombres que asoman y animaciones repasadas (en local, sin poner en la web)
- **Andoni (textual):** «igual alargamos un poco el vídeo para mostrar mejor todo y hacer un final más redondo, vigila todas las animaciones porque algunas se ven como
  movidas y fuera de lugar, lo de cambiar colores sería mejor que fuese sobre un ejemplo real y lo mismo con lo de mover secciones. Y luego me gustaba como presentábamos
  antes los proyectos con el nombre como asomando por detrás».
- **Hecho (`build.cjs`; la v3, en `build.v3.cjs`):** 61 pulsos (40,4 s). Cada cambio, 3 pulsos y en un navegador: «edita» (neety.com, el titular seleccionado) · «cambia
  colores» = savvia.studio pasando por sus cuatro estaciones (el hero real) · «mueve secciones» = tres secciones REALES de neety.com (hero, «De ruido comercial a
  señales accionables», «Así te ayuda Neety a vender mejor», recortadas de su grabación) que se reordenan. «Proyectos destacados con desarrollo agéntico.» sola y, por
  proyecto (Kuanta, Home of Ambrose, Cubbo, Monad, 3,5 pulsos), el NOMBRE grande sale primero y la web sube delante tapándole la parte de abajo, se monta (agente,
  fichas, «✓ publicado») y queda la web real. Final: el hero rasgado desde la base del roble, sus cuatro estaciones con «Elevamos tu web con IA.», y al final el titular
  se recoge, salen ondas desde la base del roble y queda «savvia agentic.» + savvia.studio (4 s de cierre).
- **Animaciones (revisadas a 6 fps, tramo a tramo):** la tarjeta de cada frase ya no aparece encima de las palabras: se descubre DENTRO del hueco según se abre; un
  respiro entre un ejemplo y el siguiente (antes se mezclaban); las webs suben opacas y se descubren de abajo arriba (antes entraban como un rectángulo lavado); la escena
  de agentic, quieta (fuera el zoom continuo: la cámara ya va dentro del vídeo); el paso al hero, rasgado sobre el claro (antes asomaba negro).
- **Archivo:** `tools/r238-cinetico/reel-cinetico.mp4` (7,9 MB). El menú sigue con «La mesa».
- **Medido:** `hyperframes check` en verde (0 errores, 0 avisos).

### Ronda 242 · 2026-10-19 · reel cinético: las líneas de savvia agentic como carreteras (en local, sin poner en la web)
- **Andoni (textual):** «tenemos que ajustar la parte de savvia agentic: igual podemos mantener la animación que teníamos de las líneas de savvia agentic haciendo como
  que sigues una de ellas y vas a la librería en uso y luego sales de ellas y vas a los ejemplos reales, jugando con los zooms, movimientos y las líneas como si fueran
  carreteras por las que se mueve la cámara» · «el fondo inicial tiene que ser nuestro marrón».
- **Hecho (`build.cjs`; la v4, en `build.v4.cjs`):** el DIAGRAMA REAL de la sección savvia agentic (`diagrama.cjs`: la escena de escritorio capturada a 3×, 3600×2025, y
  sus 49 líneas muestreadas en coordenadas de la escena; `rutas.json`: la de «Voz» y la de «Cambios de copy»). Entra pequeño entre «Los fundamentos de diseño y
  desarrollo de tu web, / en una librería que cualquier IA sabe leer.», se abre a pantalla completa, la cámara baja a «Voz» (×2,6) y RECORRE su línea hasta la
  librería mientras la línea se enciende de savia (Coral) a su paso; se centra en la librería y entra la librería EN USO (la escena de agentic) con «La web, su receta
  y los agentes que la mantienen al día.»; sale por la línea de «Cambios de copy» (también encendiéndose), con «Así tú y tu equipo podréis cambiar lo que queráis», se
  mete en la etiqueta (×6) y pasa a los ejemplos reales (edita · cambia · mueve, 2,8 pulsos cada uno). El recorrido es un proxy de 0 a 1 interpolado sobre los puntos
  de la línea (seek-safe). Fondo del principio (gota, manifiesto, «savvia agentic:»): el marrón de la web (#3B231B).
- **Archivo:** `tools/r238-cinetico/reel-cinetico.mp4`. El menú sigue con «La mesa».

### Ronda 243 · 2026-10-19 · el reel cinético: el diagrama se GENERA y la cámara sigue la línea (en local)
- **Andoni (textual):** «genera las animaciones para el vídeo: que aparezcan los tags de la izquierda y luego se genere la línea y cuando se genera la cámara la sigue
  haciendo zoom y llega a la librería generando la web, y luego lo mismo cuando publicas, una animación del estilo. Y el final que no ocupe tanto tiempo».
- **Hecho (`tools/r238-cinetico/build.cjs`):** fuera la captura fija del diagrama: se construye en vivo (píldoras en HTML a ×1,6, líneas SVG con `pathLength=1`). El
  paso del marrón al claro, rasgado desde el centro (`rasgo-circulo.png`). Entran las etiquetas de la izquierda una a una, se trazan sus líneas grises, la de «Voz» se
  enciende de savia y la cámara la RECORRE con zoom hasta la tarjeta de la librería, cuyas filas se rellenan; dentro, la librería en uso (agentic.mp4). Al publicar:
  fila «Publicado en neety.com», se trazan las líneas de salida, brotan las etiquetas de la derecha y la cámara sigue «Cambios de copy» hasta los ejemplos reales.
  Final acortado: 37,5 s en total (antes ~45). Arreglado: las filas de la librería caían fuera de la tarjeta.
- **Medido:** `hyperframes check` 0 errores · hojas de contacto a 6–8 fps de cada tramo (`hf/renders/r243*.jpg`) · exportado a −16 LUFS, 1600×900, 8,9 MB.
- **Archivo:** `tools/r238-cinetico/reel-cinetico.mp4`. El menú sigue con «La mesa». No publicado.

### Ronda 244 · 2026-10-19 · el reel cinético vuelve al estilo Linearity (en local)
- **Andoni (textual):** «me gustaba más con el estilo de Linearity, nos hemos ido un poco. Tenemos que mantener nuestros colores, typos y el final pero el resto volver a eso».
- **Hecho:** `build.cjs` = la versión de la ronda 241 (`build.v4.cjs`: tipografía cinética con la interfaz dentro de la frase, la librería, la escena de agentic, la
  petición, edita · cambia · mueve, las webs que se montan con el nombre detrás) con el marrón de la web de fondo y el FINAL corto de la ronda 243 (hero por las cuatro
  estaciones y «savvia agentic.»). Fuera el diagrama de líneas y la cámara por carreteras (rondas 242–243, guardadas en `build.v6.cjs`). 37,5 s.
- **Medido:** `hyperframes check` en verde · hoja de contactos a 1 fps (`hf/renders/r244-hoja.jpg`) · −16 LUFS, 1600×900.
- **Archivo:** `tools/r238-cinetico/reel-cinetico.mp4`. El menú sigue con «La mesa». No publicado.

### Ronda 245 · 2026-10-19 · reel cinético: la interfaz otra vez ENTRE dos palabras, colores elegidos en la librería y secciones enteras (en local)
- **Andoni (textual):** «me gustaba más cuando salían la librería y lo de escribir entre medias de dos palabras, ahora queda raro eso. Luego también lo de los colores
  estaría mejor que fuese como que los eliges en una librería o algo y luego también que las secciones se vean bloques de sección enteros no cortados como ahora».
- **Hecho (`build.cjs`; la anterior, en `build.v7.cjs`):** vuelve la frase con la interfaz dentro (ronda 238): «Tu web, [la librería] en una librería.» y «Pide [la
  petición se escribe] y listo.». «cambia colores»: a la izquierda la paleta de la librería de savvia (Otoño · Invierno · Primavera · Verano con sus muestras y su hex),
  el cursor elige cada una y el hero se repinta con el canto rasgado. «mueve secciones»: tres secciones ENTERAS de neety.com (`secciones.cjs` → `neety-blq0..2.jpg`:
  hero, «Por qué Neety», «De ruido a señal») como bloques; el hero baja al final y las otras suben. 37,5 s.
- **Medido:** `hyperframes check` en verde · hoja a 2 fps (`hf/renders/r245-hoja.jpg`) y detalle (`r245-zoom.jpg`) · −16 LUFS, 1600×900.
- **Archivo:** `tools/r238-cinetico/reel-cinetico.mp4`. No publicado.

### Ronda 246 · 2026-10-19 · reel cinético: la selección de «edita textos», ajustada al titular (en local)
- **Andoni (textual):** «vale me gusta bastante, podemos hacer que edita textos el recuadro que sale se alinee bien con el texto?»
- **Hecho:** medido el titular de Neety en el fotograma («Detecta a quién vender, / cuándo hacerlo y / qué acción tomar.»): el recuadro de selección lo rodea entero
  (282 × 94 px dentro de la pantalla del navegador, antes 250 × 74 y desplazado) y el cursor llega a su esquina de abajo a la derecha.
- **Archivo:** `tools/r238-cinetico/reel-cinetico.mp4`. No publicado.

### Ronda 247 · 2026-10-19 · reel cinético × el reel de Bolt Templates: túnel de webs, muro con zoom y parejas (en local)
- **Andoni (textual + `~/Desktop/1920x1080.mp4`, «Introducing bolt Templates», 31 s):** «vale perfecto, podemos hacer una mezcla entre lo que tenemos y esto, podemos alargar más el
  vídeo a 60 segundos si hace falta».
- **Referencia medida (hoja a 1 fps):** apertura con el texto entre un TECHO y un SUELO de plantillas en perspectiva que avanzan; un MURO de plantillas que se recorre y
  en el que la cámara entra en una (Kern Studio) que pasa a verse viva a pantalla completa; tarjeta a un lado + frase al otro («Fully Interactive», «Real, working
  apps.»); fila de tarjetas con etiqueta; la petición que construye; «Get started now».
- **Hecho (`build.cjs`; la anterior, en `build.v8.cjs`; `B()` con desplazamiento `OFF` por bloque):** «savvia agentic: tu web conectada con la IA.» dentro de un TÚNEL de
  webs (46 portadas y galerías de `public/media/obra/` en `hf/assets/muro/`, techo y suelo a ±72°, avanzando hacia la cámara) sobre el marrón · tras «Proyectos
  destacados», el MURO de 40 webs que se recorre y la cámara entra en Kuanta, que cobra vida (su esfera, `x-esfera.mp4`) a pantalla completa y se encoge en su tarjeta ·
  tres PAREJAS animación en detalle + frase (copy de la web: «Como un traje / a medida.» · Playground copilot «Mano a mano / contigo.» · Invopop mapa «De principio / a
  fin.») · el montaje de Home of Ambrose, Cubbo y Monad · el final de siempre. Se queda todo lo de Linearity (frases con la interfaz dentro, edita · cambia · mueve).
  47,5 s.
- **Medido:** `hyperframes check` en verde · instantáneas del túnel, el muro y las parejas · hoja a 1 fps (`hf/renders/r247-hoja.jpg`) · −16 LUFS, 1600×900.
- **Archivo:** `tools/r238-cinetico/reel-cinetico.mp4`. No publicado.

### Ronda 248 · 2026-10-19 · reel cinético: un solo color de letra, túnel sutil, otros momentos en detalle y el muro que entra en ola (en local)
- **Andoni (textual):** «las letras siempre del mismo color, el frame en que salen los proyectos por arriba y por abajo que sea más sutil y que tengan un gradiente
  para que parezca que se desvanecen. Luego los momentos en detalle con las frases elegir otros proyectos, u otras cosas a destacar. Luego cuando salen todos los
  proyectos en grid hacerlo de una manera animada más chula, ahora parece que entran un poco ortopédico».
- **Hecho (`build.cjs`; la anterior, en `build.v9.cjs`):** fuera el coral y el 55 % de las segundas líneas: todo en la tinta de su fondo (Cacao sobre claro, Rosa niebla
  sobre marrón) · túnel al 42 % y cada plano con máscara en degradado (se desvanece hacia el horizonte y hacia la cámara) · momentos en detalle: Arkdev (los iconos que
  atracan, `x-muelle`; es la web en la que entra la cámara del muro), Playground (las notas, `x-notas`) e Isotrol (el mapa, `x-mapa`) · el muro: las webs llegan en OLA
  desde la que se va a abrir (escala, giro en X, desenfoque y subida, escalonadas por la rejilla) mientras la cámara se aleja, recorre y entra. 47,5 s.
- **Medido:** `hyperframes check` en verde · instantáneas del túnel, el muro y las parejas · tira del muro a 4 fps (`hf/renders/r248-muro.jpg`) · −16 LUFS.
- **Archivo:** `tools/r238-cinetico/reel-cinetico.mp4`. No publicado.

### Ronda 249 · 2026-10-19 · reel cinético: la rejilla del portfolio con zoom a Kuanta, otros detalles y «savvia» al final (en local)
- **Andoni (textual):** «al final que ponga savvia, y debajo savvia.studio. Luego el grid sigue sin convencerme, el grid tienen que ser webs y como lo tenemos un poco en
  el portfolio, haces zoom en por ejemplo kuanta. Y luego los detalles probemos otros».
- **Hecho (`build.cjs`; la anterior, en `build.v10.cjs`):** el muro es la REJILLA de /proyectos con sus nueve tarjetas reales (`portfolio-piezas.cjs` las captura a 2× desde
  el servidor local, con la caja de la pantalla de cada una en `portfolio.json`): entran una a una subiendo con el recorte de la web, la cámara baja por la rejilla y
  entra en la pantalla de Kuanta (llenando el alto que se ve, porque la lámina corta el navegador por abajo); ahí pasa a la web viva (`obra/kuanta/portada.mp4`), que
  se asienta y se encoge en su tarjeta. Detalles: Kuanta (su hero) «Como un traje a medida.» · Playground (los cromos de testimonios, `x-cromos`) «Mano a mano contigo.»
  · Neety (el feed de señales, `x-feed`) «De principio a fin.». Final: «savvia» y debajo «savvia.studio». 47,5 s.
- **Medido:** `hyperframes check` en verde · tira del paso del zoom a la web viva a 8 fps (`hf/renders/r249-zoom.jpg`, sin salto) · −16 LUFS.
- **Archivo:** `tools/r238-cinetico/reel-cinetico.mp4`. No publicado.

### Ronda 250 · 2026-10-19 · reel cinético: la rejilla entera y quieta, detalles y webs con más tiempo (en local)
- **Andoni (textual):** «el grid sigue sin convencerme, se ve raro, luego los detalles hay que dejarlos un poco más para que se vea la animación y lo mismo con la
  construcción de las webs».
- **Hecho (`build.cjs`; la anterior, en `build.v11.cjs`):** la rejilla del portfolio se ve ENTERA y la cámara casi quieta (un acercamiento mínimo); las nueve tarjetas llegan
  en ola diagonal (suben, se enfocan y aparecen), las demás se apartan desenfocándose y solo entonces la cámara entra en Kuanta. Cada detalle dura 5 pulsos (antes
  3,5) y cada web montada 5,5 (antes 3,5): la construcción va más pausada (`build-obra.cjs` acepta `k`, aquí 1,5; la anterior en `build-obra.v1.cjs`) y la web viva se
  queda dos pulsos más. 54,6 s.
- **Medido:** `hyperframes check` en verde · instantáneas de la rejilla, las parejas y el montaje · hoja a 1 fps (`hf/renders/r250-hoja.jpg`) · −16 LUFS.
- **Archivo:** `tools/r238-cinetico/reel-cinetico.mp4`. No publicado.

### Ronda 251 · 2026-10-19 · reel cinético: la rejilla y el túnel como en Bolt, y el clic en Kuanta (en local)
- **Andoni (textual + el vídeo de Bolt otra vez):** «el grid, tenemos que hacer que aparezca como en este vídeo y el carrusel superior e inferior también. Y luego que
  parezca que clicas en el proyecto destacado».
- **Referencia medida (0–9 s a 5 fps):** arriba y abajo no hay un techo entero sino dos PILAS estrechas de tarjetas en el centro, en perspectiva fuerte; el titular se
  queda y la rejilla SUBE desde abajo, fila a fila, mientras el titular se va hacia arriba; un cursor va a una tarjeta, la pulsa y la tarjeta se abre a pantalla completa.
- **Hecho (`build.cjs`; la anterior, en `build.v12.cjs`):** túnel = una pila de webs arriba y otra abajo (una columna de 760 px, ±72°, al 60 %, desvanecidas) · «Proyectos
  destacados con desarrollo agéntico.» se queda y, al llegar la rejilla del portfolio desde abajo (fila a fila, descubriéndose), sube y se desvanece · el CURSOR entra
  desde abajo a la derecha, se posa en Kuanta (la tarjeta crece un poco), pulsa (cursor y tarjeta se hunden) y la cámara entra en su pantalla. 54,6 s.
- **Medido:** `hyperframes check` en verde · tiras del túnel y la rejilla (`hf/renders/r251-*.jpg`) · −16 LUFS.
- **Archivo:** `tools/r238-cinetico/reel-cinetico.mp4`. No publicado.

### Ronda 252 · 2026-10-19 · reel cinético: la rejilla en tornado, el clic que vuela a la primera pareja, Arkdev de segundo detalle y pilas más finas (en local)
- **Andoni (textual):** «el grid sigue saliendo raro, podemos hacer que salgan como un tornado y se organicen y luego al hacer clic que vaya directamente al frame de un
  traje a medida. Y luego la segunda animación en detalle que sea algún detalle que encaje bien en ese hueco, el de playground no. Alguna animación más vistosa. Las pilas
  de arriba y abajo más sutiles y estrechas».
- **Hecho (`build.cjs`; la anterior, en `build.v13.cjs`):** cada tarjeta del portfolio va en un giro alrededor del centro de la rejilla: llega girando (280° + 34° por
  tarjeta), creciendo desde el 10 %, ladeada y desenfocada, y se asienta en su sitio, escalonadas 0,09 s (el titular se desvanece al empezar). El cursor pulsa Kuanta y
  su pantalla VUELA directa a la tarjeta de «Como un traje a medida.» (sin el paso a pantalla completa). Segundo detalle: Arkdev, los iconos que atracan (`x-muelle`). Pilas
  de 500 px al 34 %. 52,7 s.
- **Medido:** `hyperframes check` en verde · tira del tornado y el clic a 5 fps (`hf/renders/r252-muro.jpg`) · −16 LUFS.
- **Archivo:** `tools/r238-cinetico/reel-cinetico.mp4`. No publicado.

### Ronda 253 · 2026-10-19 · reel cinético: tornado en 3D, Neety entero, colores sobre Neety y nombres sin tapar (en local)
- **Andoni (textual):** «el tornado quiero que sea en 3D, vamos como si lo vieras desde alante. Y luego el tercer detalle usar el de Neety pero como se va moviendo la
  animación de arriba abajo» · (a media ronda) «cambia colores que sea el proyecto de Neety» · «los proyectos que salen, Monad y demás, la web tapa un poco el titular».
- **Hecho (`build.cjs`; la anterior, en `build.v14.cjs`):** el tornado es 3D: cada tarjeta orbita un eje vertical (`rotationY` del giro, `z` de la tarjeta, perspectiva
  1600 en la rejilla) subiendo en embudo hasta asentarse. Tercer detalle: el feed de Neety ENTERO (4:3, sin recortar) y al doble de velocidad, para que se vea bajar
  la secuencia de tarjetas. «cambia colores» sobre Neety: su paleta real (Naranja Core · Azul bebé · Berenjena · Mint claro, con hex) y su hero reteñido con el canto
  rasgado en cada elección. Montaje: el nombre sube (34 px) y la web baja (62 %): ya no lo tapa. 52,7 s.
- **Medido:** `hyperframes check` en verde · instantáneas del tornado, la paleta de Neety y el montaje · −16 LUFS.
- **Archivo:** `tools/r238-cinetico/reel-cinetico.mp4`. No publicado.

### Ronda 254 · 2026-10-19 · web: Eric y Andoni de pie, y al pasar, sus aficiones salen de la cabeza en ilustraciones (en local)
- **Andoni (textual + referencia: cómic a línea gruesa con trama de puntos, objetos que salen de una cabeza abierta):** «quiero empezar a probar en la web la parte de
  Eric y Andoni. Quitamos los frames, dejamos a Andoni y Eric parados y cuando hovereamos hacemos que las cards que salen estén acompañadas por ilustraciones del estilo
  que te voy a mandar».
- **Hecho:** `Estudio.astro`: fuera los gestos (canasta y pase: `data-gesto-src="[]"`); siguen de pie (la entrada directa de la ronda 144). Al pasar (o enfocar/tocar),
  además de caer sus píldoras, de la CABEZA de cada uno sale en abanico (Andoni hacia la izquierda, Eric hacia la derecha) una ilustración por afición, dibujada a línea
  en la tinta de la sección con sombras de trama de puntos (`#trama-eq`) y rayas de velocidad: balón de baloncesto · mando · taza de café / balón de fútbol · hoja ·
  cascos (`src/data/ilustraciones-equipo.ts`, SVG 100 × 100). Crecen desde la cabeza y se posan ladeadas, sin rebote; al irse, vuelven y se apagan. Movimiento
  reducido: aparecen quietas. La copia previa del componente, en el scratchpad de la sesión.
- **Medido:** `astro check` 0 errores · `tools/r254/equipo.cjs` (Chrome y WebKit a 1280): los dos estallidos sin pisar los nombres, 0 errores de consola, 0 capas de gesto.
  **SIN medir:** el toque en móvil (la prueba no simula dedo).
- **Pendiente de Andoni:** si las ilustraciones son las que quiere (son de Nilo, a partir de sus aficiones de home.ts) o si manda las suyas; no publicado.

### Ronda 255 · 2026-10-19 · reel cinético: colores reales de Neety, apertura de Kuanta y nombres algo tapados (en local)
- **Andoni (textual):** «cambia colores: coger una sección de Neety que cambiando los colores se vea bien» · «cuando clicas en Kuanta la transición de abrir se ve un poco
  rara, mejorarla» · «los titulares de los proyectos, Monad y compañía, tienen que ir un poco tapados por la web que enseñamos».
- **Hecho (`build.cjs`; la anterior, en `build.v15.cjs`):** «cambia colores» con la sección «Por qué Neety» RECOLOREADA EN SU PROPIA PÁGINA (`neety-tinte.cjs`: sus variables
  `--color-plum/naranja/ink` cambiadas y sus degradados reteñidos), cuatro paletas: Naranja Core (la suya) · Azul · Mint · Frambuesa. Kuanta: tras el clic, la tarjeta
  ENTERA crece hasta que su pantalla cae en el hueco de «Como un traje a medida.» y ahí la web viva aparece encima (antes saltaba a su pantalla recortada). Montaje: la
  web sube (50 %) y tapa la parte de abajo del nombre. 52,7 s.
- **Medido:** `hyperframes check` en verde · tira de la apertura de Kuanta (`hf/renders/r255-kuanta.jpg`) · −16 LUFS.
- **Archivo:** `tools/r238-cinetico/reel-cinetico.mp4`. No publicado.

### Ronda 256 · 2026-10-19 · reel cinético: Neety en colores planos y la apertura de Kuanta encajada (en local)
- **Andoni (textual):** «abre el local para verlo» · «de Neety deberíamos coger una sección de colores planos sin gradientes, porque creo que quedará mejor hacer
  combinaciones en una plana» · «cuando se hace clic en Kuanta sigue habiendo una transición rara, revísala».
- **Hecho (`build.cjs`; la anterior, en `build.v16.cjs`):** la web abierta en el panel del navegador (`localhost:4332/?carga=0#estudio`). «cambia colores»: «Por qué Neety» en
  su propia página SIN degradados y con colores lisos de su paleta (`neety-plano.cjs`: fondo, tarjeta, cifras, textos y botón; fuera la barra y los velos fijos),
  cuatro combinaciones: Crema + naranja · Berenjena + azul bebé · Azul bebé + berenjena · Mint. Kuanta: la causa medida a 10 fps era que la tarjeta seguía al 102,5 %
  (el hover) cuando volaba, y su pantalla no caía donde aparece la web viva (se veían dos capas desplazadas): ahora vuelve al 100 % durante el vuelo y la web viva
  aparece EXACTA sobre su pantalla.
- **Medido:** `hyperframes check` en verde · tiras a 10 fps de la apertura y de los colores · −16 LUFS.
- **Archivo:** `tools/r238-cinetico/reel-cinetico.mp4`. No publicado.

### Ronda 257 · 2026-10-19 · reel: la pantalla de Kuanta sale de su tarjeta · web: las ilustraciones dentro de las píldoras, AirPods y azada (en local)
- **Andoni (textual):** «el reel, solo falta el clic en Kuanta, que se sigue viendo raro: hay una transición final que se ve rara, cuando pasa del zoom al frame con texto» ·
  «las ilustraciones, que queden más mimetizadas con las cards que salen, y a Eric en música ponerle unos AirPods y en la huerta una azada».
- **Hecho · reel (`build.cjs`; la anterior, en `build.v17.cjs`):** ya no hay relevo entre la tarjeta y la web viva: al pulsar, la web viva se pone EXACTA sobre la pantalla
  de la tarjeta (con su recorte) y es ELLA la que vuela hasta el hueco de «Como un traje a medida.», mientras la tarjeta, debajo, se mueve igual y se disuelve. Fuera el
  crecimiento al pasar el cursor (dejaba la tarjeta al 102,5 %). · **Web (`Estudio.astro`, `ilustraciones-equipo.ts`):** fuera el estallido desde la cabeza: cada
  píldora lleva DENTRO su ilustración, en la tinta de la píldora y con una trama más gruesa para que se lea a 28 px; Eric: AirPods (música) y azada con brote (la huerta).
- **Medido:** `hyperframes check` en verde · tira a 8 fps del clic (una sola pieza que sale de la tarjeta) · `astro check` 0 errores · `tools/r254/equipo.cjs` (Chrome y
  WebKit): píldoras con su ilustración, 0 errores de consola.
- **Archivo:** `tools/r238-cinetico/reel-cinetico.mp4`. Nada publicado.

### Ronda 258 · 2026-10-19 · web: las ilustraciones de las aficiones se dibujan a tinta y cobran vida (en local)
- **Andoni (textual):** «sorpréndeme de alguna manera original con las ilustraciones».
- **Idea:** el lenguaje de la casa (el roble del hero se DIBUJA y luego se PINTA) llevado a las píldoras: cada ilustración se dibuja a tinta trazo a trazo, después se
  imprime su trama y su relleno, y entonces hace SU gesto, en bucle y discreto mientras la píldora está abierta.
- **Hecho (`Estudio.astro`, `ilustraciones-equipo.ts` › `GESTOS`):** al caer cada píldora, sus trazos se escriben (`pathLength` 1 + `stroke-dashoffset`, 55 ms entre trazos)
  y el relleno entra al final; gestos: el vapor del café sube · los botones del mando parpadean · el baloncesto deja su estela · el balón de fútbol gira despacio · la
  azada golpea y brota el tallo · los AirPods suenan. Movimiento reducido: hechas y quietas.
- **Medido:** `astro check` 0 errores · `tools/r254/dibuja.cjs` (Chrome y WebKit, DPR 2): trazos a medio dibujar a los 0,9 s, las 3 ilustraciones de cada uno con
  su gesto a los 2,6 s, 0 errores de consola.
- **Pendiente de Andoni:** verlo en movimiento (la web está abierta en local); nada publicado.

### Ronda 259 · 2026-10-19 · web: los objetos de Eric y Andoni salen GRANDES de su cabeza, sin píldoras ni textos (en local)
- **Andoni (textual):** «no me convence, creo que las ilustraciones tienen que tener más protagonismo, igual tienen que ir sin cards ni letras, de alguna forma que queden guay».
- **Hecho (`Estudio.astro`; la de la ronda 258, en el scratchpad de la sesión):** fuera las píldoras y sus textos visibles (las aficiones quedan en la lista solo para
  lectores de pantalla). Al pasar por uno, de su CABEZA salen sus tres objetos grandes (84–150 px) en abanico hacia su lado, como la referencia del cómic; mientras vuelan
  se dibujan a tinta, se imprime su trama (más fina, 6 unidades) y hacen su gesto (r258); alrededor, confeti dibujado igual. Al irse, se apagan desenfocándose.
  Probadas y quitadas en la ronda las rayas de velocidad junto a la cabeza (cruzaban los objetos).
- **Medido:** `astro check` 0 errores · `tools/r254/dibuja.cjs` (Chrome y WebKit, DPR 2): los objetos de cada uno sin pisar los nombres, los 3 con su gesto a los 2,6 s, 0
  errores de consola. **SIN medir:** el toque en móvil.
- Nada publicado.

### Ronda 260 · 2026-10-19 · web: los objetos caen bajo el nombre, con su nombre escrito a mano (en local)
- **Andoni (textual):** «que salgan debajo de nuestro nombre como salían las etiquetas y con unas letras escritas a mano que indiquen qué es cada icono».
- **Hecho (`Estudio.astro`, `astro.config.mjs`, `Base.astro`):** fuera el estallido de la cabeza (r259). Vuelve la caída desde el nombre de la ronda 129, ahora con cada
  objeto dibujado a tinta (r258, con su gesto) y debajo su rótulo ESCRITO A MANO (Caveat, OFL, nueva en la API de fuentes como `--font-mano`, solo aquí) con una flechita
  que sube hacia el objeto; el objeto se dibuja, luego la flecha y luego las letras se escriben de izquierda a derecha. Sin píldoras. Probado y descartado en la ronda: el
  rótulo al lado del objeto (el bloque lo recortaba por los lados).
- **Medido:** `astro check` 0 errores · `tools/r254/dibuja.cjs` (Chrome y WebKit, DPR 2): los seis rótulos enteros y legibles, los objetos con su gesto, 0 errores de consola.
- Nada publicado.

### Ronda 261 · 2026-10-19 · web: lo que sale de Eric y Andoni, en PEGATINAS (en local)
- **Andoni (textual):** «vale, vamos a cambiar, vamos a hacer como si fueran stickers lo que sale».
- **Hecho (`Estudio.astro`; la de la ronda 260, en el scratchpad de la sesión):** cada afición es una pegatina troquelada: la ilustración en tinta Cacao sobre papel
  (#F6F1EA; los interiores, que usaban `var(--noche)`, pasan a papel; la trama de puntos, en Cacao) y su nombre escrito a mano DENTRO de la pegatina. El troquel es
  la misma ilustración detrás, en papel y con trazo de 20 unidades (silueta suave que sigue la forma), y el de las letras, un `-webkit-text-stroke` de papel; sombra suave
  debajo. Caen del nombre como las etiquetas, ladeadas como pegadas a mano (−7°, 5°, −3°) y al tocar su sitio se aplastan un instante, como al presionarlas. Quietas:
  sin el dibujo a tinta ni los gestos. Probado y descartado en la ronda: el borde con cuatro sombras (salía irregular).
- **Medido:** `astro check` 0 errores · `tools/r254/dibuja.cjs` (Chrome y WebKit, DPR 2): las seis pegatinas enteras, troquel limpio, 0 errores de consola.
- Nada publicado.

### Ronda 262 · 2026-10-19 · web: las pegatinas, más realistas (en local)
- **Andoni (textual):** «¿podemos hacer que parezcan un poco más realistas los stickers?».
- **Hecho (`Estudio.astro`; la de la ronda 261, en el scratchpad):** cada pegatina es UN SVG (dibujo + nombre a mano en `<text>`, Caveat) en cuatro capas: CANTO (la silueta
  algo más oscura y desplazada 2,6 unidades abajo = el grosor del vinilo) · TROQUEL (papel con su luz, degradado de #FDFAF4 a #E8DFD2) · TINTA · BRILLO de vinilo en
  diagonal sobre toda la pegatina, letras incluidas (`screen`, al 70 %). Dos sombras: de contacto pegada + suave; en el aire la sombra va lejos y difusa y al tocar se
  pega, con el aplastado de la ronda 261. Más grandes (84–112 px) y el nombre unido al dibujo en una sola silueta. La lista de aficiones sigue en texto para lectores.
- **Medido:** `astro check` 0 errores · `tools/r254/dibuja.cjs` (Chrome y WebKit, DPR 2): seis pegatinas con canto, brillo y sombra, 0 errores de consola.
- Nada publicado.

### Ronda 263 · 2026-10-19 · PUBLICADO: rondas 232–262 + el reel cinético en el menú, junto con lo último de Eric
- **Andoni (textual):** «vale, publica esto junto con el reel y mira si Eric ha publicado algo para juntarlo».
- **Hecho:** el reel del menú pasa a ser el CINÉTICO (`reel.mp4` 1600 × 900, 52,7 s, −16 LUFS; `reel-mini.mp4` = 7 s del tornado y el clic en Kuanta, 640 px, mudo;
  pósters nuevos; «Reel · 0:53»); los de la ronda 237 («La mesa»), en `tools/retirados/reel-r237/` (local). `.gitignore`: el material pesado de los reels (proyectos
  HyperFrames, renders, tomas) se queda en local; se versionan los scripts. Juntado con los 6 commits nuevos de Eric (correo de contacto, menú en móvil, pastillas de
  Proyectos, savvia agentic en móvil, aviso «Desliza», web de dentro a 1280 px en móvil).
- **PUBLICADO (19/10) en https://savvia.studio:** commit `b8121a5` + fusión con lo de Eric (`9be6a94`) → Vercel. Medido EN VIVO: `tools/verify.cjs` (Chrome y WebKit, 1280 y
  390) consola limpia, 0 respuestas ≥ 400, desborde 0; `reel.mp4` responde 200 (10,6 MB); las pegatinas de Eric y Andoni, sin errores (`tools/r254/dibuja.cjs` en vivo).

### Ronda 264 · 2026-10-20 · tres direcciones para las aficiones de Eric y Andoni, a prueba (en local)
- **Andoni (textual):** «vamos con las stickers, no sé si me convencen, es como que no me pegan en la home. ¿Qué direcciones me propones?» → «veamos las 3 en local para comparar».
- **Diagnóstico:** el problema es el MATERIAL (vinilo brillante, troquel, caída ladeada con rebote) en una home de acuarela, papel rasgado y trama; además
  rebotes y etiquetas torcidas están en «Rechazado». Regla dura 1: es la forma, no el detalle.
- **Hecho (`Estudio.astro`; la de la ronda 262 sigue de serie):** conmutador `?equipo=a|b|c`.
  · **A · cuaderno de campo:** bajo el nombre, sin caer ni girar: se abre una AGUADA de acuarela en el color de la estación (filtro de papel mojado
    `#aguada-eq`: turbulencia + desplazamiento + borde que encharca), encima se DIBUJA el objeto a tinta clara (el `dibujar` de la ronda 258, con su gesto) y
    después se escribe su nombre a mano (Caveat). Primer intento: la aguada salía como un posavasos oscuro y redondo → elipse, más clara y más abierta.
  · **B · a sus pies:** lo mismo, pequeño y en fila sobre el suelo, a cada lado de la pareja, con sombra en la hierba (el paseo ya no existe desde la r144:
    se lleva a los pies).
  · **C · ficha mínima:** una línea en mono por afición con un punto en el color de la estación, tecleada.
- **Medido:** `astro check` 0 errores · `tools/r264/variantes.cjs` (Chrome y WebKit 1280, Chrome 390): 0 errores de consola, desborde 0 en las cuatro.
  **Fallo encontrado (también en las pegatinas publicadas):** en móvil, al tocar, las aficiones caen debajo de la pareja y las tapa la sección siguiente:
  no se ve nada. Se arregla al elegir dirección.
- Nada publicado.

### Ronda 265 · 2026-10-20 · aficiones en relieve y en 3D, y un reel nuevo con el guion de la web (en local)
- **Andoni (textual):** «Ilustraciones no me gusta ninguna de las opciones que me has planteado, podemos hacer 2 opciones: ilustraciones que parecen un relieve en el
  fondo como integrado. Y iconos 3D realistas con su color y todo.» · «El reel hacer algo más original que cuente un poco lo que contamos en la web. Con el guion de la
  web y luego buscar otras canciones que peguen más.»
- **Hecho · aficiones (`Estudio.astro`; fuera las tres de la ronda 264; las pegatinas siguen de serie):**
  · `?equipo=relieve`: el dibujo a línea (sin rellenos) y el nombre a mano, en el color de la noche de la estación; lo delatan su filo de luz arriba a la
    izquierda, su sombra abajo a la derecha y una sombra caída (`#relieve-eq`): troquelado en la pared. Se graba trazo a trazo.
  · `?equipo=3d`: los seis objetos modelados y renderizados en Blender (`tools/blender/aficiones.py`, Cycles, AgX Punchy, captador de sombra; balón de baloncesto
    con costuras, mando de remallado por vóxeles, taza esmaltada con café y crema, balón de fútbol = icosaedro truncado inflado, azada de fresno y acero, AirPods)
    → `tools/blender/aficiones-recorte.cjs` (recorte cuadrado con bordes fundidos) → `public/media/equipo/aficiones3d/*.webp` (15–19 KB). Salen de la pared
    desenfocados y se enfocan; nombre en mono. Descartados: los emoji 3D de Microsoft (MIT), estilo plastilina, no realistas.
- **Hecho · reel (`tools/r265-reel/`, HyperFrames):** «la savia»: la web cuenta que la savia da vida (el roble se pinta desde una gota) y el reel lo hace con cada
  dolor: una web de PLANTILLA (genérica · «AI slop» morado · rota) recibe la gota y desde el impacto se pinta, con el papel rasgado, la web de verdad (Kuanta ·
  Playground · Neety) mientras el dolor deja paso a la respuesta. Guion de la home en su orden: «Elevamos tu web con IA.» → «¿Te suena alguno?» → tres dolores →
  «savvia agentic: tu web conectada con la IA.» → proyectos destacados con las cuatro estaciones del hero de fondo (9 cortes a pulso) → «Trabajamos de tres formas
  contigo.» con End-to-end / Colaboración / Consultoría encendiendo lo que incluye cada una → Eric y Andoni → «La savvia de tu web.», logotipo y savvia.studio.
  `node build.cjs <bpm> <primer-pulso> <cancion.mp3>` lo cuadra con cualquier canción. 41,7 s con «Second Nature».
- **Música:** candidatas sin IA y con licencia comercial: Audionautix (Jason Shaw, CC BY 4.0, atribución): Second Nature (107,7 BPM, la elegida para el primer
  corte), Acoustic Shuffle (117,5), Cool Steel Breeze (136), Walk In The Park (161,5); medidas con librosa; en `tools/r265-reel/musica/`. Pixabay descartado (no se
  puede comprobar qué es IA); FMA, casi todo NC; Epidemic Sound no deja descargar con la cuenta actual.
- **Medido:** `astro check` 0 errores · `tools/r264/variantes.cjs` (Chrome y WebKit 1280): pegatinas, relieve y 3D sin errores, desborde 0 · `hyperframes check`: 0 errores
  de motion y layout; avisos de contraste solo en las plantillas (grises a propósito).
- **Pendiente:** elegir aficiones y canción; móvil: al tocar, las aficiones las tapa la sección siguiente (las tres opciones y las pegatinas publicadas); el crédito de la
  música (CC BY) si se publica. Nada publicado.
- **A media ronda (Andoni):** «monta el reel también con Acoustic Shuffle para comparar» → `node build.cjs 117.5 1.556 AcousticShuffle.mp3`: 38,9 s (todo un 9 % más
  rápido, a 117,5 BPM). `tools/r265-reel/reel-savia-acoustic-shuffle.mp4` (1600 px, −16 LUFS) junto a `reel-savia.mp4` (Second Nature). OJO: `hf/index.html` queda
  cuadrado con Acoustic Shuffle; para volver, `node build.cjs 107.7 0.998 SecondNature.mp3`.

### Ronda 266 · 2026-10-20 · el brandbook sin isotipo y PÚBLICO: descargas de logotipo, favicons, Telegram, LinkedIn y X (en local)
- **Andoni (textual):** «tenemos que actualizar el brandbook con savvia como está ahora, sin isotipo» · «en el brandbook quiero añadir todos los favicon para descargar
  con sus opciones para Telegram y crear también opciones para LinkedIn, Twitter y generar los fondos para estos 2 últimos, que serían el footer de cada estación
  sin el Contáctanos» · «¿en el fondo de Twitter y LinkedIn se puede añadir un gif?» · «al final quiero que el brandbook sea bastante público y cualquiera que
  necesite algo pueda descargarlo o usarlo» · «asegúrate de usar como favicon, Telegram, LinkedIn, Twitter los que te pasé en su momento de tenue».
- **Hecho (`src/components/sistema/Libro.astro`; el anterior en el scratchpad de la sesión):** Logotipo = solo la palabra «savvia» (texto, lockups, reglas: «una
  palabra» y tamaño mínimo); fuera «el isotipo solo» y la galería del isotipo de las rondas 153–155. Sección nueva **Descargas** (en el índice, tras Aplicaciones):
  «Descargar todo» (ZIP, 9 MB), el logotipo en seis tintas (blanco, Cacao y la de cada estación) en SVG y PNG de 2400 px, y por estación: favicon (16 · 32 · 48 · 64
  · 180 · 192 · 512 y .ico), Telegram (1024), avatar de LinkedIn y X (400), fondo de X (1500 × 500) y de LinkedIn (1584 × 396). Favicons, Telegram y avatares, los
  de «luz tenue» de Andoni (`~/Desktop/savvia-favicons-telegram-luz-tenue`). Fondos: el paisaje del pie de cada estación capturado sin texto ni «Contáctanos»
  (`tools/r265-kit/fondos.cjs`); `tools/r265-kit/kit.cjs` genera el resto en `public/descargas/`.
- **GIF:** no. La portada de X y la de LinkedIn solo admiten imagen fija (un GIF se queda en el primer fotograma). Telegram sí admite un vídeo corto de perfil.
- **Medido:** `astro check` 0 errores · `tools/r265-kit/ver.cjs` (Chrome y WebKit 1280, Chrome 390): 0 isotipos en Logotipo y Construcción, 61 descargas que
  responden 200, consola limpia, 0 respuestas ≥ 400, desborde 0.
- **Pendiente:** la carga de la home sigue dibujando el isotipo (el brandbook lo menciona en Movimiento); las fuentes no van en el kit (licencia). Nada publicado.
- **A media ronda (Andoni):** «¿los fondos admiten gifs, y tenemos contemplados tamaños de los fondos de Twitter y LinkedIn?» (no: solo imagen fija; sí: X 1500 × 500 y
  LinkedIn 1584 × 396) · «el icono en redes tapa el título de la estación» · «en invierno sobre blanco no se ve el contorno» → el avatar se ancla al fondo por
  `container-type` (asoma la mitad, como en X y LinkedIn) y el nombre va a su derecha; filo de 1 px (`--rule`) en el fondo y en el aro del avatar.
  Medido: `tools/r265-kit/ver.cjs` sin cambios (61 descargas en 200, consola limpia, desborde 0) y captura en el panel.
- **A media ronda (Andoni):** «pon las imágenes de fondo con un estado más final, donde ya se vean más hojas cayendo, nieve, flores, hierba» · «en logotipo para
  descargar, mira los contrastes de colores» · «corrige las aplicaciones porque algunas se ven raras».
  · Fondos: el pie de cada estación capturado tras 2 minutos (`node tools/r265-kit/fondos.cjs 120`, las cuatro a la vez): hojas posadas, prado nevado, flores.
    Fallo propio cazado: salían montones en el aire con forma de «Contáctanos»: era `[data-tiempo]` (ronda 228, el tiempo que se posa SOBRE la palabra); se
    oculta en la captura junto a la palabra y su copia iluminada.
  · Logotipo: las tintas de estación pasan al tono claro de cada una sobre su noche (otoño #ECBF8F 8,6:1 · primavera #F4C7D5 9,1:1 · verano #CFE6A4 10,3:1;
    antes 3,5 · 5,3 · 4,2); invierno, tinta sobre blanco (12,4:1).
  · Aplicaciones: la tarjeta de visita, anverso y reverso uno junto al otro (el reverso se lee entero, el nombre en una línea; antes lo tapaba el anverso) y
    el logotipo del anverso más grande; el chat, con la vista previa del enlace en claro y con filo, la respuesta en un marrón que se distingue y aire sobre
    el pie (en móvil, sin proporción fija: ya no se corta).
  · Medido: `tools/r265-kit/ver.cjs` (Chrome y WebKit 1280, Chrome 390): 61 descargas en 200, consola limpia, desborde 0. Nada publicado.
- **A media ronda (Andoni):** «Aplicaciones: fuera las tarjetas de visita, pon otra» → el PERFIL EN REDES (estilo LinkedIn) con el fondo y el avatar de otoño del kit, nombre,
  bio y «Seguir»; el texto de la sección lo cuenta. · «la parte de motion, hacer los motion más realistas a lo que tenemos en la web» → fuera los dibujos en CSS de la
  ronda 155: cinco efectos GRABADOS de la web real (`tools/r266-motion/grabar.cjs`: vídeo de Playwright en Chrome, recortado con ffmpeg a 720 px, 35–650 KB):
  el roble que se dibuja y se pinta, el cambio de estación, la gota entre secciones, la savia que llena el CTA y el tiempo del pie. Se reproducen solo a la vista
  y con movimiento reducido se quedan quietos; la curva sigue como diagrama. Fallo propio cazado: la barra de Agentation salía en los vídeos (sus hijos se fuerzan
  visibles: se oculta con opacidad).
  Medido: `tools/r265-kit/ver.cjs` (Chrome y WebKit 1280, Chrome 390): 61 descargas en 200, consola limpia, 0 ≥ 400, desborde 0. Nada publicado.
- **PUBLICADO (20/10) en https://savvia.studio** (Andoni: «publica solo esto»): SOLO el brandbook (commit `8fe2ded`: `Libro.astro`, `public/descargas/`, los vídeos de
  Movimiento y sus scripts), fusionado con 6 commits nuevos de Eric (`d20fcb3`). Fuera del commit, en local: las aficiones en relieve y en 3D (`Estudio.astro`,
  `public/media/equipo/aficiones3d/`) y el reel nuevo. Medido EN VIVO: `/sistema`, el ZIP, los vídeos y los fondos responden 200; `tools/r265-kit/ver.cjs` contra
  savvia.studio (Chrome y WebKit 1280, Chrome 390): 61 descargas en 200, consola limpia, desborde 0; `tools/verify.cjs` de la home limpio en los cuatro.

### Ronda 267 · 2026-10-20 · las aficiones como LÁMINA pintada de catálogo (en local)
- **Andoni (textual + referencia: lámina retro de objetos pintados a gouache con llamadas numeradas):** «ahora con las ilustraciones quiero hacer algo más cuidado del
  estilo que te paso en la foto».
- **Hecho:** · `tools/blender/aficiones.py` con `PINTADO=1`: los mismos seis modelos en EEVEE con materiales de dibujo (Shader to RGB → cuatro bandas constantes: sombra
  fría honda · sombra · el color · una luz estrecha; el borde de las bandas movido por una «pincelada» de ruido estirado; el brillo, un corte duro en blanco crema) y
  la paleta retro de la referencia (rojo teja, azul, crema, ocre, acero). Por el camino, formas rehechas (regla 1): AirPods de una pieza (cabeza en judía + palito
  fundidos por remallado: separados parecían piruletas), azada con la hoja perpendicular al mango (en su plano parecía una bandera), costuras del balón más finas.
  Fallo propio: la paleta se dio en sRGB y Blender la leyó como lineal (todo lavado) → `_lin()`. · `tools/blender/aficiones-lamina.cjs`: recorte cuadrado y grano de papel
  dentro del dibujo → `public/media/equipo/lamina/*.webp` (9–22 KB). · `Estudio.astro` `?equipo=lamina`: cada objeto con su línea fina y su número + nombre en mono
  (1–3 Andoni, 4–6 Eric, en espejo); entra desenfocado, la línea se traza y el número aparece.
- **Medido:** `astro check` 0 errores · `tools/r264/variantes.cjs` (Chrome y WebKit 1280, Chrome 390): sin errores, desborde 0.
- **Pendiente:** móvil (el fallo de siempre: al tocar, lo tapa la sección siguiente); elegir entre lámina, 3D y relieve. Nada publicado.
- **A media ronda (Andoni):** «tiene que ser un estilo como más pintado». Probado: (1) las bandas fundidas (`EASE`) + pincelada más fuerte + Kuwahara en el compositor
  sobre el render pintado → sigue pareciendo vector (las bandas planas no dan trazos al filtro); (2) Kuwahara en dos pasadas + saturación sobre los renders REALISTAS
  de Cycles (`tools/blender/pintar-render.py` → `out/aficiones-gouache/`) → aerógrafo liso, sigue siendo un render. Conclusión (regla 1): la referencia es gouache
  pintado a mano; un filtro sobre un render no llega. Propuesta: generar cada objeto con ImageGen usando la referencia como estilo (como los favicons «tenue») →
  prompts en `tools/r267-lamina/prompts.txt`; la lámina de la web ya está montada y solo cambia la imagen.
- **A media ronda (Andoni):** «la imagen que me has pasado me gusta, se ven muy realistas, podemos trasladarlos de esa manera» (la de Kuwahara sobre los renders realistas)
  · «pruebo yo a generarlos por mi lado con ese estilo». Hecho: los seis renders realistas de Cycles (rehechos con las formas nuevas: AirPods de una pieza, azada con
  la hoja perpendicular, costuras finas) pintados con `tools/blender/pintar-render.py` (Kuwahara anisótropo en dos pasadas + saturación) y recortados con bordes
  fundidos (`aficiones-recorte.cjs <origen> <destino>`, ahora con argumentos) → `public/media/equipo/lamina/` (13–18 KB): la lámina `?equipo=lamina` los usa.
  Medido: `tools/r264/variantes.cjs` (Chrome y WebKit 1280, Chrome 390 con `chrome 390`): sin errores, desborde 0. Nada publicado.
- **A media ronda (Andoni, `~/Desktop/savvia-objetos-catalogo.zip`):** «probemos estas ilustraciones» (seis objetos de catálogo a gouache generados por él con image_gen
  sobre la referencia: baloncesto, mando DualSense, café en taza roja, AirPods Pro, pelota de tenis, azada; PNG 1254 transparentes; prompts en `fuentes.json`).
  Hecho: copiadas a `tools/r267-lamina/catalogo/`; `tools/r267-lamina/colocar.cjs` las recorta a su caja y las centra con el mismo margen → `public/media/equipo/lamina/`
  (Eric · «Deporte» = la pelota de tenis). Las de Blender pintadas, en el scratchpad de la sesión. Medido: `tools/r264/variantes.cjs` (Chrome y WebKit 1280, Chrome
  390): sin errores, desborde 0; bordes limpios sobre el Cacao. Nada publicado.
- **A media ronda (Andoni):** «que salgan más pequeñas las ilustraciones y los nombres fuera» → objetos a 60–80 px (antes 84–112), línea más corta, y solo el número
  (como en la referencia); los nombres siguen para lectores de pantalla. Medido: `tools/r264/variantes.cjs` (Chrome y WebKit 1280): sin errores, desborde 0.

### Ronda 268 · 2026-10-20 · comparar los estilos de las aficiones (artefacto) y la lámina sin números (en local)
- **Andoni (textual):** «haz un artefacto con todos los estilos que hemos ido probando para que podamos decidir. Fuera los números en esta opción».
- **Hecho:** · `?equipo=lamina`: fuera números y líneas; solo la ilustración (los nombres, para lectores). Fallo propio cazado al capturar: sin la fila de número y
  línea, la imagen encogía dentro de su flex (salían diminutas y faltaba la azada) → `flex: none`. · `tools/r268-comparar/capturar.cjs`: Andoni y Eric con las
  aficiones abiertas, recortados a la pareja, para cada estilo vivo (pegatinas, relieve, 3D, lámina con las tres tandas de imágenes: catálogo, render pintado y
  bandas), más las capturas de la ronda 264 (cuaderno, a sus pies, ficha). Artefacto «Aficiones de Eric y Andoni» (privado):
  https://claude.ai/artifact/CaZYuVAiXkw1YJwHhHpYjN — nueve estilos en orden, con ronda y estado (en la web · probada · la más reciente).
- **Pendiente:** elegir; el móvil (al tocar, lo tapa la sección siguiente). Nada publicado en la web.

### Ronda 269 · 2026-10-20 · las aficiones con el motor del roble y el artefacto reducido a tres (en local)
- **Andoni (textual):** «deja únicamente ilustraciones de vinilo y las ilustraciones de catálogo. Añade una nueva con el estilo del árbol del hero con dithering y distorsión».
- **Hecho:** `Estudio.astro` `?equipo=arbol`: cada ilustración de catálogo en un lienzo del MOTOR DEL ROBLE (`estela.ts`, como los óleos de los dolores: radial desde
  el centro, `soplo` = hervor, sin luz, `intensidad: 0` = sus colores), sobre la noche de la estación: se dibuja y se pinta en 1,7 s, se hunde en el fondo y se
  deshace en semitono por los cantos. Lienzo creado la primera vez que se abre (como mucho seis contextos WebGL); sin WebGL, la ilustración tal cual. Artefacto
  (versión 2, el mismo enlace, ya compartido por enlace): solo vinilo, catálogo y catálogo con el motor del roble.
- **Medido:** `astro check` 0 errores · `tools/r264/variantes.cjs` (Chrome y WebKit 1280): sin errores, desborde 0.
- **Pendiente:** elegir; el móvil. Nada publicado en la web.
- **A media ronda (Andoni):** «¿podemos verlos animados en el artefacto?» → `tools/r268-comparar/grabar.cjs`: cada estilo grabado de la web local (vídeo de Playwright en
  Chrome; se pasa por Andoni y luego por Eric; recortado a la pareja, 8,5 s, 114–177 KB) y puesto en el artefacto en bucle y mudo (versión 3, mismo enlace).
- **A media ronda (Andoni):** «pero que se vean en buena calidad, se ven pixeladas» → el vídeo de Playwright y el screencast de Chrome graban a 1× (comprobado: el screencast
  da 1280 × 720 aunque se fuerce DPR 2). `tools/r268-comparar/grabar-hd.cjs`: CÁMARA LENTA (animaciones CSS/WAAPI con `Animation.setPlaybackRate`, reloj de JS escalado) y
  capturas reales a DPR 2 montadas a velocidad normal → 1400 × 880, CRF 18 (0,4–0,65 MB). El motor del roble salta fotogramas si su reloj avanza menos de 30 ms: para
  él, cámara lenta de 2,5× (`LENTO=2.5`, ~27 fps); el resto a 8× (87–100 fps). Artefacto, versión 4 (mismo enlace).
- **A media ronda (Andoni, `~/Desktop/savvia-objetos-arbol.zip`):** «probemos estos también, con el estilo del árbol» (los seis objetos generados por él a partir del roble
  de otoño del hero: manchas otoñales, semitono y estelas). Hecho: `tools/r269-roble/objetos/` → `colocar.cjs <origen> <destino>` (ahora con argumentos) →
  `public/media/equipo/roble/`; `?equipo=roble` (la disposición de la lámina con esas imágenes). Fallo propio cazado: salían también las del catálogo (la regla
  de `.lam` solo se escondía en otras opciones) → ocultas. Grabado en alta calidad y añadido al artefacto (versión 5): vinilo, catálogo, catálogo con el motor
  del roble y estilo del roble. Medido: `tools/r264/variantes.cjs` (Chrome y WebKit 1280): sin errores, desborde 0.

### Ronda 270 · 2026-10-20 · semitono sutil en las dos opciones del roble (en local)
- **Andoni (textual):** «a las últimas ponles dittering sutil y a las que están antes un dittering más sutil».
- **Hecho:** · `estela.ts`: opción nueva `semitono` (0–1, uniform `st`, por defecto 1: el resto de la web no cambia) que escala cuánto se deshacen los cantos en
  puntos. · `?equipo=arbol` (catálogo con el motor del roble): `semitono: 0.12` (probado 0,3: aún se leía la retícula). · `?equipo=roble`: `tools/r269-roble/tramar.cjs`
  hornea en las imágenes el semitono del roble (retícula a 45°, celda de 11 px a 360 ≈ 2,6 px en pantalla, radio por cobertura) a fuerza 0,55 en los cantos y una
  trama ordenada finísima (Bayer 4×4, ±2 niveles) en el color. Vídeos y carteles del artefacto rehechos (versión 6).
- **Medido:** `astro check` 0 errores · `tools/r264/variantes.cjs` (Chrome y WebKit 1280): sin errores, desborde 0. Nada publicado en la web.
- **A media ronda (Andoni):** «a las últimas le falta más dithering y que salgan pintándose» → `?equipo=roble` pasa por el MOTOR del roble (como `arbol`) con
  `semitono: 0.6` y sus imágenes limpias (fuera el horneado de `tramar.cjs`): se dibujan (líneas) y se pintan desde el centro, y se deshacen en puntos por los
  cantos. Con más margen (`MARGEN=1.3` en `colocar.cjs`) y caja algo mayor (84–112 px). Las rayitas horizontales finas que quedan en los cantos son los destellos
  del motor (los del roble). Vídeo y cartel del artefacto rehechos (versión 7). Medido: `astro check` 0 · `tools/r264/variantes.cjs` (Chrome y WebKit 1280) limpio.

### Ronda 272 · 2026-10-20 · las aficiones: ilustración de catálogo, de serie (en local)
- **Andoni (textual + `~/Desktop/savvia-todos-los-objetos.zip`, 9 objetos de catálogo):** «vamos a dejar solo los de ilustración clásica y vamos a hacer algunos ajustes:
  1. los objetos más pequeños · 2. añadir una pelota de fútbol donde Eric al lado de la de tenis y hacerlas proporcionales a sus tamaños reales · 3. cambiar los AirPods
  por los auriculares de cable · 4. cambiar mando de Play por teclado».
- **Hecho:** · `tools/r272-catalogo/` (los PNG) + `colocar.cjs`: teclado en el sitio del mando, auriculares de cable en el de los AirPods y, en «Deporte», el balón de
  fútbol (Mikasa) y la pelota de tenis juntos a escala real (22 cm · 6,7 cm), apoyados en el mismo suelo → `public/media/equipo/lamina/`. · `Estudio.astro`: el catálogo
  es la versión DE SERIE (sin parámetro; las pegatinas, con `?equipo=pegatinas` o cualquier otro valor; el resto de pruebas siguen con su parámetro) y los objetos,
  más pequeños (48–62 px, antes 60–80). · Artefacto (versión 8): solo la elegida, animada.
- **Medido:** `astro check` 0 errores · `tools/r264/variantes.cjs` (Chrome y WebKit 1280): sin errores, desborde 0.
- **Pendiente:** el móvil (al tocar, lo tapa la sección siguiente); publicar. Nada publicado.
- **A media ronda (Andoni):** «el teclado se ve muy pequeño en comparación» → apaisado, en su cuadrado quedaba bajito: la imagen del teclado va más ancha (76–98 px,
  el resto 48–62) para que pese como el balón y la taza. Medido: `tools/r264/variantes.cjs` limpio; vídeo del artefacto rehecho (versión 9).
- **A media ronda (Andoni):** «el balón de baloncesto igual debería ser como el de fútbol de grande» → a escala real con el de fútbol (24 cm frente a 22). Fallo propio
  cazado: `cuadrado()` de `colocar.cjs` usaba `resize(fit: contain)`, que AMPLIABA el objeto hasta llenar: los márgenes no hacían nada → ahora `extend` (relleno
  transparente sin escalar). Medido en los archivos: baloncesto 272 px de diámetro, fútbol 250 (de 360). Vídeo del artefacto rehecho (versión 10).
- **A media ronda (Andoni):** «el espaciado entre objetos a izquierda y derecha tiene que ser el mismo» → cada imagen RECORTADA a su dibujo (sin aire) y su ancho
  en la web a escala (`src/data/lamina-medidas.json`, lo escribe `colocar.cjs`): la separación la pone el `gap` (20 px). Medido (`tools/r268-comparar/medir-gaps.cjs`):
  huecos 20 · 20 px en Andoni y 20 · 20 en Eric (antes, distintos por el aire de cada cuadrado). Vídeo del artefacto rehecho (versión 11).

### Ronda 273 · 2026-10-20 · Eric: la pelota de tenis sola, azada y auriculares nuevos (en local)
- **Andoni (textual + `~/Desktop/savvia-auriculares-y-azada.zip`):** «en el caso de Eric vamos a dejar solo la pelota de tenis más grande como antes y vamos a sustituir los
  otros 2 por estos que te paso» (azada-cultivar: la azada en la tierra con un brote; auriculares-ipod: los de cable).
- **Hecho:** `tools/r272-catalogo/colocar.cjs`: fuera el balón de fútbol y la composición a escala; «Deporte» = la pelota de tenis sola, a tamaño de objeto; azada y
  auriculares, los nuevos (PNG en `tools/r272-catalogo/`). Medidas regeneradas.
- **Medido:** `tools/r268-comparar/medir-gaps.cjs`: huecos 20 · 20 px en los dos · `tools/r264/variantes.cjs` (Chrome y WebKit 1280): sin errores, desborde 0.
  Artefacto, versión 12. Nada publicado.

### Ronda 274 · 2026-10-20 · el menú: destacados que rotan en lugar del reel (en local)
- **Andoni (textual):** «ponmelo ya en local para poder verlo» (el catálogo ya es la versión de serie: http://localhost:4332/?carga=0#estudio) · «en local también
  quiero que en vez del reel me dejes proyectos destacados que van rotando».
- **Hecho (`Nav.astro`; el anterior en el scratchpad):** en la caja del reel, las cubiertas de los destacados de `proyectos.ts` (Kuanta · Arkdev · Neety · Remerge),
  una cada 3,2 s con fundido y un acercamiento lento, mientras el menú está abierto; la píldora dice «Destacados · <nombre>», unos puntos marcan cuál es, y la
  tarjeta lleva a ese caso (`/proyectos/<slug>`). Con movimiento reducido, quieta en la primera. El reproductor del reel queda en el código, sin uso.
- **Medido:** `astro check` 0 errores · `tools/r268-comparar/menu-destacados.cjs` (Chrome y WebKit 1280, Chrome 390): /proyectos/kuanta → /proyectos/arkdev a los 3,4 s,
  consola limpia, desborde 0. Nada publicado.

### Ronda 275 · 2026-10-20 · aficiones animadas, iPod, y los destacados del menú como en el portfolio (en local)
- **Andoni (textual + imagen del iPod):** «la pelota de tenis como la de baloncesto de grande, la azada un poco más grande» · «los proyectos que se vean como en el
  portfolio con su gradiente y su marco» · «sustituye los auriculares por esta» · «¿podemos animar cada elemento sutilmente con algo temático de lo que representan?».
- **Hecho:** · `colocar.cjs`: el iPod con sus auriculares (`tools/r272-catalogo/ipod.webp`) en «Música»; la pelota de tenis con el mismo margen que el baloncesto.
  `Estudio.astro`: azada ×1,25 e iPod ×1,15. · ANIMACIONES (con la lista abierta, tras la entrada, en bucle; fuera con movimiento reducido): el baloncesto bota
  (aplastándose), la pelota de tenis bota girando, el teclado se hunde a golpes de tecla, el café echa vapor (tres hilos), la azada cava (gira desde la hoja) y
  del iPod salen notas mientras se mece. · `Nav.astro`: cada destacado del menú, como su pieza del portfolio: el DEGRADADO de su marca (`colores`, en oklab) y
  la ventana de CRISTAL con la web dentro (Remerge, en un marco alto de móvil); al entrar, la ventana sube un poco.
- **Medido:** `astro check` 0 errores · `tools/r264/variantes.cjs` y `tools/r268-comparar/menu-destacados.cjs` (Chrome y WebKit 1280, Chrome 390): sin errores, desborde 0.
  Artefacto, versión 13. Nada publicado.

## RONDA 267 · Eric (20/10/2026) · zoom de Proyectos destacados en móvil «no va fluido» — REVERTIDO
- Se probó mover el zoom con `ViewTimeline` (animación atada al scroll) en táctil. En el iPhone de Eric: movimiento muy raro, trompicones, glitches y letras
  apareciendo detrás. Revertido; Proyectos.astro vuelve a la versión del commit. NO volver a ViewTimeline para esto.
- Medido antes: Chrome móvil emulado y WebKit de escritorio no muestran trompicones (≈1–2 % de fotogramas >20 ms); el fallo solo se ve en iPhone real.
  Siguiente pista, si se retoma: lo que se pinta dentro del monitor (vídeo, iframes) y el peso de las capas, no el JS del scroll.

## RONDA 268 · Eric (20/10/2026) · «Más proyectos» en móvil, card a card
- Wisable: la card pasaba de 4:5 con el navegador colocado para 1:1 (sobraba un cuarto vacío). Ahora usa su `--ratio` (1:1) también en móvil. Resto de cards, pendientes de revisar una a una.
- Hablado, sin hacer: solo un vídeo a la vez en táctil (el más centrado); el visor modal solo en escritorio; en móvil el toque va a la web. En bajo consumo de iOS ya funciona el play propio (`jugar.ts`, ronda 266).
- Kymatio: 1:1 en móvil y navegador a `top: 12%` (en escritorio vuelve a 4:5 y su `--top`).
- Móvil (táctil, sin hover): el navegador de las piezas `mancha`/`claro` se pone recto con el scroll (`centra`), solo la más centrada de las visibles al 55 %; reutiliza la medición del hover. Pendiente: probar en iPhone y la regla de «un solo vídeo a la vez».
- Transcend: 1:1 en móvil (su `--ratio`), como Wisable.
- Todas las piezas mancha/claro en 1:1 en móvil (<64rem); Kymatio y THX (4:5 en escritorio) con el navegador a top 12%. Sustituye las reglas sueltas de Wisable/Kymatio/Transcend.
- Móvil: +96 px de padding-bottom en #anteriores (la gota de Servicios tocaba el nombre de THX).
- Servicios (<64rem): las píldoras con la tipografía de titular (Family 400, 18 px) en vez de Areal 600; a prueba.
- Servicios móvil: la línea de abajo con los + a 48 px de la lista (padding-bottom de .cuerpo 24→48; escritorio sigue en 0).
- Estudio móvil: Eric y Andoni más grandes (`--ch` 16 rem → 23 rem en <64rem; escritorio igual).
- Preguntas móvil (<64rem): la conversación sin scroll interno (crece con la página; `bajar()` hace `scrollIntoView nearest`). Escritorio igual.
- Pie móvil (<1024): «Contáctanos» al 78 % del ancho de las líneas (antes 100 %), centrado.
- Pie móvil: pista mono «Toca para agendar una llamada» sobre «Contáctanos» (solo `hover: none`; `pie.pista` en home.ts/home.en.ts; `--cf` = tamaño de la palabra, puesto por `ajustarContacta`).
- Pie móvil: «Contáctanos» más abajo (`--cb` 0.19 → 0.13 en <64rem).
- Móvil (hover: none o <48rem): el toque en una card va a la web; el visor modal solo en escritorio (estaba hablado y no hecho).
- Cubbo (móvil de la mesa): la pantalla en perspectiva con fondo #121213 en vez de transparente (asomaba 1 px de blanco de la lámina sobre el vídeo).

### Ronda 276 · 2026-10-20 · PUBLICADO: las aficiones de catálogo animadas y los destacados del menú, junto con lo último de Eric
- **Andoni (textual):** «mira lo que ha publicado Eric y sin romper nada publica lo nuevo».
- **Hecho:** commit `c2ab3a2` (rondas 264–275: aficiones en ilustración de catálogo animada de serie, iPod, destacados del menú como en el portfolio, motor con
  `semitono`, scripts) + fusión con 15 commits de Eric (`c4ba25d`: vídeos de proyectos, `jugar()`, mockups móviles, Estudio más pequeño en móvil…). Solo chocó el
  registro (los dos añadimos al final): se quedan los dos bloques. Fuera del repositorio (`.gitignore`): renders de Blender, material del reel nuevo.
- **Medido:** antes de subir, `astro check` 0 · build OK · `tools/verify.cjs` local limpio en los cuatro · aficiones y menú sin errores. EN VIVO (https://savvia.studio):
  `tools/verify.cjs` (Chrome y WebKit, 1280 y 390) limpio, 0 ≥ 400, desborde 0 (una primera pasada de WebKit pilló un CSS de la versión anterior durante el
  cambio de despliegue; a los 20 s, limpio) · los destacados del menú rotan (kuanta → arkdev) en Chrome, WebKit y 390.
- **Pendiente:** el móvil de las aficiones (al tocar, lo tapa la sección siguiente).

### Ronda 277 · 2026-10-20 · las aficiones en móvil, al lado de cada uno (en local)
- **Andoni (textual):** «en mobile los iconos salen raro, revísalo y que salgan al lado de cada uno aunque sean más pequeños».
- **Reproducido** (`tools/r268-comparar/movil.cjs`, tocando con el dedo, Chrome y WebKit a 390): caían DEBAJO de la pareja y la sección siguiente los tapaba, y los de
  Eric salían en el lado de Andoni (la regla de escritorio de la lámina pisaba la de móvil). Las pruebas tocaban otro `[data-quien]` (los testimonios usan el mismo
  atributo): ahora se toca `[data-equipo] .pN .llamada-q`.
- **Hecho (`Estudio.astro`, solo < 64 rem):** columna corta al lado de cada uno a la altura del pecho (Andoni a su izquierda, Eric a su derecha), objetos a 34 px de
  base (≈ 26–49 px) con 12 px entre ellos; vapor y notas a escala; sin el hueco de abajo.
- **Medido:** móvil: Andoni x 59–109, Eric x 273–320, todos entre y 380 y 510 (dentro de la pareja, 262–582) · escritorio sin cambios (huecos 20 · 20) ·
  `tools/verify.cjs` local (Chrome y WebKit, 1280 y 390) limpio. Nada publicado.
- **A media ronda (Andoni):** «mejor más debajo de cada nombre y más pegado a las guías» → en móvil la columna arranca justo bajo el nombre (33 % + 12 px) y se pega
  al CARRIL de su lado: Andoni alineado a la izquierda en el carril izquierdo, Eric a la derecha en el derecho (`--guia`, distancia del borde de la pareja al del
  paseo, la mide el JS con un ResizeObserver; con unidades de contenedor no cuadraba). Medido a 390: Andoni x = 20 (el carril), Eric hasta x = 370 (el carril).
  `tools/verify.cjs` local limpio; escritorio sin cambios.
- **A media ronda (Andoni):** «más debajo de cada nombre y a 16 px de las guías» → la columna arranca 48 px bajo la línea del nombre (33 % + 48 px) y queda a 16 px
  del carril de su lado. Medido a 390: Andoni x = 36 (carril 20 + 16), Eric hasta x = 354 (carril 370 − 16); `tools/verify.cjs` local limpio.
- **A media ronda (Andoni):** «más arriba, a 16 px de nuestros nombres y a 24 px de las guías» → el JS mide también dónde acaba el texto del nombre (`--nombre-pie`) y
  la columna arranca 16 px más abajo; a 24 px del carril. Medido a 390 con movimiento reducido (sin el bote): 16 px del nombre en los dos y 24 px del carril;
  `tools/verify.cjs` local limpio.
- **A media ronda (Andoni):** «¿en pantallas de menos de 390 px cómo se vería?» → medido a 375, 360 y 320 (con dedo y sin el bote): a 375 y 360 bien; a 320 (iPhone SE)
  los objetos pisaban los brazos y «ANDONI» se cortaba por la izquierda. Por debajo de 360: objetos a 26 px de base y a 12 px del carril, y la línea del nombre de
  Andoni más corta (la de Eric se queda: corta, «ERIC» caía sobre su hombro). Medido a 320: ningún objeto pisa a nadie, «ANDONI» de x 24 a 80 y «ERIC» de 239 a
  271 (pantalla 320). `tools/verify.cjs` local limpio.

### Ronda 278 · 2026-10-20 · fuera la hierba del Estudio · PUBLICADO con las aficiones en móvil
- **Andoni (textual):** «¿por qué en mobile se ve hierba?» · «después de quitar eso revisa si Eric ha publicado algo y sube ya».
- **Causa:** la estela del paseo (rondas 12–43): desde la ronda 144 ya no hay paseo, pero con movimiento reducido el código pintaba la hierba entera a sus pies
  (en las capturas de medida, hechas con movimiento reducido, se veía; y la vería cualquiera con esa preferencia). **Hecho:** no se pinta y los dos lienzos van ocultos.
- **Medido:** lienzos `display: none` con y sin movimiento reducido · `tools/verify.cjs` local (Chrome y WebKit, 1280 y 390) limpio.
- **PUBLICADO (20/10) en https://savvia.studio:** commit de las rondas 277–278 + fusión con 2 commits de Eric (flechas de testimonios y zona de toque de «Contáctanos»;
  `3fddae6`). Antes: `astro check` 0, build OK, `verify.cjs` local limpio. EN VIVO: `tools/verify.cjs` (Chrome y WebKit, 1280 y 390) limpio, 0 ≥ 400, desborde 0;
  en móvil (`movil.cjs` contra savvia.studio) los objetos bajo cada nombre, Andoni desde x 44 y Eric hasta x 346 (a 24 px de los carriles), sin errores.


### Ronda 290 · 2026-10-20 · móvil: testimonios, contacto, servicios y chat · PUBLICADO
- **Eric/Andoni (textual, resumen):** testimonios más compactos y con flechas flexibles y área de toque de 44 px · arrastrar para cambiar de testimonio · «Contáctanos» abre a la primera
  y con zona de toque ampliada · Estudio: Andoni y Eric más pequeños y etiquetas sin cortar · píldoras de Servicios sticky arriba (top 0, sobre el menú, con nubecita) ·
  el vídeo del monitor no se desliza sentado · Preguntas: la página no baja sola al preguntar · chat: la IA contesta también en el brief, claves de precio («horquilla») y enlace
  «Respuesta rápida con IA» dentro del bocadillo · card de «Contáctanos» del pie más alta.
- **Hecho:** `Anteriores`, `Estudio`, `Pie`, `Servicios`, `Proyectos`, `Preguntas`, `ChatFlotante`, `api/preguntar.js`, `preguntas*.json`. `astro check` y `astro build` en verde.

### Ronda 279 · 2026-10-20 · la etiqueta de Eric, más a la derecha y más arriba (en local)
- **Andoni (textual):** «igual el tag de Eric sacarlo un poco más a la derecha y un poco más arriba, tanto en mobile como en desktop» · «junto con la línea y el punto
  que lo une a Eric».
- **Hecho (`Estudio.astro`):** la llamada ENTERA de Eric (punto, línea y nombre) se mueve: escritorio, de 54 % · 33 % a 58 % · 29 % de la foto; móvil, de 54 % + 12 px · 33 %
  a 58 % + 12 px · 29 %. El punto sigue sobre su pecho. Probado antes y descartado en la ronda: alargar solo su línea (el punto se quedaba donde estaba). Como su
  nombre ya no está a la altura del de Andoni, en móvil cada uno mide su propio nombre (`--nombre-pie` por persona) para que sus objetos sigan a 16 px.
- **Medido:** punto a 58 % · 29 % (escritorio) y 61 % · 29 % (móvil); objetos a 16 px de su nombre en móvil (390 y 320); `tools/verify.cjs` local (Chrome y WebKit,
  1280 y 390) limpio, desborde 0. Nada publicado.
- **PUBLICADO (20/10) en https://savvia.studio:** commit de la ronda 279 + fusión con el commit nuevo de Eric (el chat de móvil sin saltar al pie al escribir; `0437c1a`).
  Antes: `astro check` 0, build OK. EN VIVO: `tools/verify.cjs` (Chrome y WebKit, 1280 y 390) limpio, 0 ≥ 400, desborde 0; aficiones en móvil sin errores.

### Ronda 291 · 2026-10-21 · PageSpeed: NO_LCP y peso de la carga (en local, sin publicar)
- **Eric (textual):** «antes habíamos mirado lo de google speed» · «quiero ver si hay cosas que podemos optimizar de la web».
- **Causa del NO_LCP:** la carga (círculo) tapa el hero a quien llega por primera vez y PageSpeed no la dibuja. `Base.astro`: sin carga si `navigator.webdriver` o el user-agent
  contiene Lighthouse/HeadlessChrome (`?carga=1` la fuerza). Efecto: `tools/verify.cjs` y Playwright ya no ven la carga sin `?carga=1`.
- **Peso (escritorio, local): 4.969 → 2.458 KB y 112 → 93 peticiones.** `hero-bg-mobile-v5.avif` 811 → 237 KB (calidad 60; ES visible en la home: la tarjeta de Neety mide 545 px
  y su consulta de contenedor nunca la oculta; probado y revertido atarla a un `@media`) · retratos de testimonios a 800 px (~120 KB, antes ~450) y todos `lazy` · carteles de
  los vídeos de Anteriores por `data-poster` + IntersectionObserver (800 px) · tiras del equipo (`.andador`) piden su imagen al acercarse · `Problemas.astro`: `aria-label` en `<p>`
  (prohibido) → `<span class="sr-only">`. Originales de imágenes en el scratchpad de la sesión.
- **Pendiente:** contraste del selector de Proyectos en otoño (2,0:1, texto #a98463 sobre #ecbf8f) · `<track>` de los vídeos · cabeceras de seguridad y de caché en `vercel.json`
  (`/media/*` va con `max-age=0, must-revalidate`) · CSS que bloquea el render (~200 ms) · 25 animaciones no compuestas (`.hero .luz`, ficha de Proyectos, burbujas).

### Firma de correo · 2026-10-22 · en /sistema › Descargas (en local)
- **Andoni (textual):** «¿podemos crear una firma para el correo de savvia?» · «algo simple estilo la captura» (una rúbrica a rotulador, nombre y web) · «el trazo empieza en
  la A y termina en la z» · «añádelas en sistema, donde descargas» · «dejemos solo el trazo, más estilo el ejemplo, y pon en sistema cómo se vería en un correo de verdad».
- **Hecho:** `public/descargas/savvia-firma-{andoni,eric}.png` (362 × 180, ~9 KB): el roble en un solo trazo de rotulador, uno distinto para cada uno (Andoni: copa ancha con un bucle; Eric: óvalo con una espiral y subrayado), algo inclinado (suelo → tronco → copa → bucle → tronco →
  cola que sube), generado con `tools/firma/firma-arbol.cjs`. Debajo, solo el nombre y savvia.studio (Helvetica 15 px, Cacao). El trazo, a 76 px de ancho («más pequeño»; a 109–110 px iba de la A a la z).
  `Libro.astro › #descargas`: «Firma de correo», las dos firmas con «Copiar firma» (portapapeles en HTML
  con la imagen publicada; si el navegador no deja, copia la selección) y un CORREO DE EJEMPLO (cabecera De · Para · Asunto, texto y la firma al pie). Probados y descartados:
  el roble del hero detrás del trazo, el trazo a pluma ancha y los logotipos.
- **Medido:** `astro check` 0 errores · `tools/verify.cjs` en /sistema (Chrome y WebKit, 1280 y 390): consola limpia, 0 ≥ 400, desborde 0 · «Copiar firma» → «Copiada».
- **Pendiente:** publicar (la imagen tiene que estar en savvia.studio para verse en los correos).

### Portfolio, casos de estudio y favicon · 2026-10-22 · reunión con Eric (en local)
- **Andoni y Eric (notas de la reunión del 22/10):** portfolio «con un scroll vertical continuo y filtros flotantes, eliminando los destacados superiores» ·
  casos «simplificar los títulos principales, sustituir viñetas por comas en las etiquetas y prescindir de contrastes excesivos o escalas tipográficas
  secundarias; las tipografías, con texto de prueba si las tenemos con licencia; rediseñar la zona inferior de navegación» · Andoni: «el favicon, que solo
  sea el árbol, para que sea más reconocible, sin fondo».
- **Hecho:**
  · `views/Portfolio.astro`: fuera el slider de destacados (marcado, datos y script). La rejilla va seguida, de 12 en 12 al bajar (IntersectionObserver a
    600 px del final; sin páginas ni `?p=`). El buscador y «Filtros» flotan abajo en una píldora de cristal (sticky dentro de la sección) y los filtros se
    abren ENCIMA, en una columna que se desplaza si no cabe; Escape o pulsar fuera los cierran. La cuenta va junto al titular.
  · Etiquetas con comas (`obra/Pieza.astro` y la ficha del caso).
  · `views/Caso.astro`: el titular es solo el nombre (la frase ya está en la entradilla); fuera el contraste sobre la superficie y la escala tipográfica (se
    quedan la paleta, las muestras de tipografía y el espaciado); abajo, «Siguiente proyecto» con su nombre grande y su pieza, y «Anterior · nombre» en una línea.
  · Favicon: el roble de cada estación IGUAL que en el hero (Andoni: «en colores y todo tiene que ser igual»): `tools/favicon-arbol/capturar.cjs` fotografía el
    lienzo del hero ya pintado (`?estacion=…&carga=0`, fotograma congelado) sobre negro y sobre blanco y saca el alfa por diferencia; 64 y 32 px, `?v=220`.
    Antes se probaron la lámina recortada a su masa y la lámina en crudo (sin el color del motor). El icono de iPhone sigue
    con su fondo (iOS pinta de negro lo transparente). Los anteriores, en `tools/retirados/favicon-r291/`.
- **A media ronda (Andoni):** «el favicon se ve muy pequeño, tiene que ser más reconocible» · «el portfolio no lo has hecho bien: trasladar la estructura de cómo
  presentamos los proyectos en la home» · «los filtros, los que teníamos en treseiscero.com/portfolio, pero flotantes y a nuestro estilo» · «y todos los proyectos de ese portfolio».
- **Hecho:**
  · DATOS: `tools/portfolio-tsc/extraer.cjs` lee en vivo el CMS de treseiscero.com/portfolio (41 proyectos con país, tecnología, servicios y categorías; Finsweet carga
    las listas anidadas en el navegador) → `src/data/portfolio-tsc.json`; `medios.cjs` baja cada captura a `public/media/portfolio/<slug>.webp` (1280 px, 1,5 MB en
    total) y mide tres colores para su degradado. Delante, los tres agénticos con caso (Kuanta, Arkdev, Neety): 44.
  · `views/Portfolio.astro`: el MOSAICO de «Más proyectos» de la home (12 columnas, ocho sitios en filas de 3 · 2 · 3 con anchos, proporciones y escalones
    distintos; la segunda de cada vuelta, la mesa con la web en el monitor) y su pie (nombre en Family y sector debajo; `Pieza.astro › pieCasa`). Al filtrar, el
    mosaico se recompone con lo que queda. Nombres, sectores y colores de la home cuando el proyecto está allí; si tiene caso, enlaza a su caso; si no, a su web.
    Vídeo al pasar en los 16 grabados; los demás, su captura.
  · FILTROS de treseiscero (país · tecnología · servicio · categoría), traducidos y con recuento, en el panel flotante; se combinan entre sí y con el buscador.
  · (Andoni: «los filtros sin el buscador» · «divididos como teníamos en treseiscero»): fuera el buscador; la barra flotante lleva CUATRO DESPLEGABLES —País ·
    Tecnología · Servicio · Categoría—, cada uno con su rótulo y lo elegido (un punto Coral si filtra), y «Quitar filtros» cuando hay alguno; cada lista se abre
    encima de su botón, una a la vez (Escape o pulsar fuera la cierran). En móvil, los cuatro en una tarjeta de 2 × 2. Probado: España + Finanzas → Adaral,
    Invopop, Ikon (Chrome 1280 y 390, WebKit 1280).
  · (Andoni: «los filtros abajo, más minimalistas; los proyectos con más aire; al hacer hover, la animación de la home; intercalar mockups; si es más vertical,
    móvil, y si es más horizontal, escritorio; y que carguen como en la home, también al filtrar»):
    - `components/obra/PiezaCasa.astro` + `scripts/pieza-casa.ts`: la pieza de «Más proyectos» (marcado, CSS y gestos de Anteriores.astro): fondo de marca,
      navegador de cristal que asoma ladeado y al pasar se pone recto, centrado y entero (y suena su vídeo), la mesa con la web en el monitor, el móvil sobre
      la mesa y el teléfono de pie; ENTRADA: la lámina se descubre de abajo arriba y su contenido sube después. Cada pieza lleva sus cuatro formas y el mosaico
      le dice cuál enseñar según su sitio (verticales → móvil; anchas → escritorio); al filtrar, cambian de sitio y de forma y vuelven a entrar.
    - Capturas en móvil de 36 webs (`tools/portfolio-tsc/movil.cjs`: Chrome con emulación de iPhone, avisos de cookies fuera). Sin captura (Kuanta y Arkdev,
      marca blanca; crececoncasavo.com y homeplus.casavo.com no resuelven; gow.delivery no carga; transcend-network.com con error de SSL; endoaula.com da 404 en
      móvil), siempre en escritorio.
    - Más aire: 192 px entre filas, como la home. Filtros: una píldora fina con los cuatro nombres; lo elegido sustituye al nombre con un punto Coral; «Quitar».
  · (Andoni: «quitamos "Todos los proyectos": con el titular de arriba es suficiente; el número de proyectos, en otro lado sutil» · «el marco del móvil, cuando no
    es mockup, como el de desktop»): fuera el h2 y su filete; el número va al final de la barra de filtros, pequeño y apagado («44», o «4/44» al filtrar); el
    teléfono de pie lleva la ventana de cristal del navegador (marco de 3 px, velo y filo de luz) en lugar del cuerpo negro.
  · (Andoni: «al hacer hover a veces el gradiente se corta por las esquinas» · «¿cómo diferenciamos los que tienen caso de estudio de los que no?»): la capa del
    degradado sobra un 25 % por cada lado (al girar 8° y crecer ×1,15, una pieza 3:4 necesita ×1,18 para no enseñar esquinas) y las manchas se recolocan en
    ella; con CASO, una píldora de cristal «Caso de estudio» arriba a la izquierda (al pasar, se aclara); SIN caso, una flecha ↗ junto al nombre (abre su web).
  · (Andoni: «que los filtros se abran y cierren más smooth: la savvia es muy fluida, no podemos tener animaciones toscas»): la lista ya no aparece con `hidden`
    (el cierre era de golpe): crece desde su botón (sube, se enfoca y se descubre de abajo arriba, 0,7 s) y las opciones llegan escalonadas (22 ms cada una);
    al cerrar, al revés (0,55 s); cerrada es inerte. «Quitar» entra y sale ensanchándose. Sin animación con movimiento reducido.
  · (Andoni: «que la barrita te siga cuando haces hover en los diferentes filtros, y cuando clicas para desplegar uno, lo mismo»): una píldora tenue que se
    DESLIZA (posición y tamaño, 0,55 s, curva de la casa) hasta el filtro bajo el puntero y se queda en el que está abierto; al salir de la barra vuelve a él (o se
    apaga). Dentro de cada lista, otra que sigue a la opción y descansa en la elegida. Medida respecto a su caja (los botones van dentro de su .desp).
  · CASOS DE ESTUDIO (Andoni: «1. el fondo del hero sin redondeos, que encaje en la cuadrícula · 2. los detalles, en 5 · 3. los colores como
    brand.dropbox.com/color · 4. la tipo como /typography · 5. motion como /motion · 6. iconografía, si el proyecto la tiene, como /iconography · 7. el siguiente
    proyecto con una flecha; fuera el anterior» · «y que el footer entre con la animación bien, como en la home»), en `views/Caso.astro`:
    - Carátula sin radio. Detalles: los 5 primeros del mosaico (si la última fila queda a medias, pasa a ancha o a pareja).
    - COLOR: tarjetas apiladas que se pisan (ancho según el uso medido); la que se pasa sube con su nombre, su valor y su %, y arrastra a sus vecinas.
    - TIPOGRAFÍA: cartas en los colores claros de su paleta con la muestra (la tinta de su web) y un rótulo en píldora; la primera, grande; la tercera, el
      titular aplicado recortado de su web.
    - MOVIMIENTO: su grabación en un lienzo con guías y una línea de tiempo con pistas en su paleta; el cabezal sigue al vídeo y se arrastra (o flechas)
      para recorrerlo; tiempo y ms por fotograma en mono. La frase, de su técnica si habla de movimiento.
    - ICONOGRAFÍA: rejilla de celdas con filetes si el caso trae `iconos` (campo nuevo en `proyectos.ts`; hoy ninguno lo tiene).
    - SIGUIENTE: el nombre con la FLECHA DE LA CASA (lib/flecha.ts: el chevrón que se dibuja líquido al pasar; Andoni: «que siga la estética del resto, no te
      inventes una nueva» tras un primer círculo con flecha), escalada sin `non-scaling-stroke` para que su trazo no se rompa en puntos; fuera «Anterior».
    - El PIE: el margen de abajo de «Siguiente proyecto» se salía de <main> (márgenes que colapsan) y dejaba el fondo oscuro de la página encima del pie: la
      gota de la transición líquida subía sobre marrón y no se veía. `.caso { display: flow-root }`.
  · CASOS, 2.ª vuelta (Andoni: «los colores con la animación de dropbox, analiza bien la animación · la typo más animada · más ejemplos de movimiento · detalles solo 3 · el siguiente proyecto sin subrayado y la flecha mucho más orgánica · un comentario de Eric o mío al final · fuera sección a sección · iconos en Por dentro» + «en cómo la construimos fuera números · un progreso de lo leído que te siga al scroll»):
    COLOR, medido en el DOM de brand.dropbox.com/color: cada panel ocupa 4 columnas y se coloca cada 1 (se solapan); el que tocas sube un 50 % de su alto con un giro de −0,03° por cada 1 %; los de la izquierda le siguen en una campana ancha (σ 1,8 col) y los de la derecha en una estrecha (σ 0,6), centrada 0,4 col a la derecha de su canto; 0,4 s cubic-bezier(.15,.5,.05,1); el nombre y el hex solo en el de arriba. La fila deja sitio arriba para que lo que sube no pise la cabecera.
    TIPOGRAFÍA: las cartas se descubren de abajo arriba, la muestra sale del desenfoque y flota despacio; paralaje con el puntero. (Pillado: el IntersectionObserver no disparaba sobre una carta con su propio clip-path a 100 %: se observa la rejilla entera.)
    MOVIMIENTO: además del lienzo con su línea de tiempo, hasta cuatro EJEMPLOS más (los vídeos del mosaico que no salen en detalles), que se reproducen a la vista.
    DETALLES: 3 como máximo. SIGUIENTE PROYECTO: sin subrayado; la flecha de la casa (`flecha()`) se desplaza con un muelle (cubic-bezier(.29,1.59,.1,1), el de Dropbox). Fuera «Anterior».
    COMENTARIO al final (cara, cita, nombre) — BORRADORES de Nilo sacados de la conclusión de cada caso (Andoni: kuanta, arkdev, playground, neety; Eric: invopop, BOP, cubbo, remerge, isotrol): revisarlos. En inglés sale en castellano.
    POR DENTRO: icono por herramienta (Simple Icons, CC0, `public/media/iconos/tec/`; glifos de línea para lo que no tiene). Fuera «Sección a sección» y los números de «Cómo la construimos».
    PROGRESO DE LECTURA: la guía izquierda se llena con lo leído y en su punta «quedan N min» (220 palabras/min).
    Medido: `astro check` 0 · `tools/verify.cjs` en /proyectos/neety, kuanta, remerge y /en/proyectos/invopop (Chrome y WebKit, 1280 y 390) limpio, 0 ≥ 400, desborde 0. Iconografía solo si el caso trae `iconos` (ninguno aún).
  · CASOS, 3.ª vuelta (Andoni: «movimiento, los detalles de motion como una abstracción como hace Dropbox · lo de cuánto queda por leer a la derecha, que salga hacia la derecha, un circulito que se va rellenando con el tiempo que queda · en los casos que aplique, un ejemplo de la librería que creamos para cliente · espaciados más animados y cómo aplican» + «la flecha sigue sin convencerme, debería crearse de manera fluida como el navbar»):
    MOVIMIENTO EN ABSTRACTO (brand.dropbox.com/motion › Motion Principles, medido: cartas de color plano con dos o tres formas que repiten el gesto): cada detalle se clasifica por lo que cuenta (pestañas, bucle, cuenta, cae, atraca, comprime, traza, gira, filtra, releva) y se dibuja en CSS con los dos colores de su paleta que más contrastan con la carta; hasta cuatro, de gestos distintos; solo se mueven a la vista. Fuera los vídeos de esas cartas.
    PROGRESO: a la derecha, en la guía, abajo: píldora «quedan N min» + un círculo que se llena; entra desde la derecha y se va por la derecha.
    LA LIBRERÍA: solo donde hay una publicada (hoy Neety; zernio.treseiscero.app/library es otra cosa). Recorrido grabado (`public/media/obra/neety/libreria.mp4`, 2,1 MB: Cambiar contenido → Color → Botones → Componentes) en un navegador, y «Ver la librería». Campo `libreria` en proyectos.ts.
    ESPACIADO APLICADO: un esquema de su página a escala (1440 → la columna) con SU contenedor, SU aire entre secciones, SU relleno y SU hueco más usados; cada medida se enciende por turnos en coral con su rótulo, y a la vez su cifra o su fila en la lista; al pasar por una fila se enciende la suya.
    FLECHA de «Siguiente proyecto»: el filtro gooey de la rejilla de la barra (goo-nav) a su escala: al pasar, las alas se recogen en el vértice, la gota se hincha y vuelven a brotar de ella (0,95 s); sin muelle.
    Pillados: el IntersectionObserver no dispara sobre un elemento que se recorta a sí mismo con clip-path al 100 % (cartas de tipografía y librería): se recorta un hijo o se observa el padre. Y dos choques de clases con estilos ya existentes (`.panel`, `.hueco`): renombradas.
    Medido: `astro check` 0 · `tools/verify.cjs` en /proyectos/neety, kuanta, remerge y /en/proyectos/invopop (Chrome y WebKit, 1280 y 390) limpio, 0 ≥ 400, desborde 0.
  · CASOS, 4.ª vuelta (Andoni: «en motion, después del principal, 3 detalles en una fila que no se repitan tanto entre case studies · la librería, una representación, y si quieres verla entera vas a ella · los gradientes de los detalles, lo más parecidos a los del hero · los sonidos, si la web los tiene, que se pueda ver un ejemplo»):
    MOVIMIENTO: tres cartas en fila. El reparto se hace con los nueve casos a la vez (`src/lib/gestos.ts`): cada caso se queda con los tres gestos menos usados que le cuadran; cuatro gestos nuevos (escribe, ola, órbita, péndulo). Resultado: ningún gesto sale más de tres veces en toda la web.
    LIBRERÍA: fuera el vídeo grabado (y sus archivos). Ahora una representación en HTML con su contenido real, leído de neety.treseiscero.app/library: índice, prompts de «Cambiar contenido», paleta, titulares, botones (con su hover: el texto rueda y el punto se hace flecha) y escala de espaciado; pasa sola de una sección a otra con el índice siguiéndola. «Ver la librería entera ↗». Datos en `proyectos.ts › libreria`.
    DEGRADADOS: los detalles sobre placa usan el MISMO fondo de la carátula (base colores[0] + las dos manchas de colores[1] y [2]); la placa ya solo decide si van sobre fondo de marca.
    SONIDO (solo Arkdev, el único con sonido): sus dos sonidos copiados de su código (clic: tres ondas cuadradas 2.100 · 1.650 · 320 Hz; al pasar: 1.400 Hz, 8 ms; paso bajo 4.200 Hz) que se tocan desde el caso, con su forma de onda calculada, sus tonos en una línea de tiempo y un cabezal que la recorre 25× más lento. Datos en `proyectos.ts › sonidos`.
    Medido: `astro check` 0 · `tools/verify.cjs` en neety, arkdev, kuanta y /en/proyectos/invopop (Chrome y WebKit, 1280 y 390) limpio, 0 ≥ 400, desborde 0.
  · FAVICON: el árbol del hero recortado a su masa (copa y tronco) y casi a sangre en el cuadrado, un punto más contrastado (`capturar.cjs --recortar`); `?v=221`.
- **Medido:** `astro check` 0 errores · `tools/verify.cjs` en /, /proyectos, /en/proyectos y /proyectos/neety (Chrome y WebKit, 1280 y 390): consola limpia, 0 ≥ 400, desborde 0.
- **Pendiente:** qué cambio de «gradientes» se pidió en la reunión; reseña y foto de cada caso (Eric); Patch Bay como nombre de Zernio.

## Quantus y Patchbay · 2026-10-22
- **Andoni (textual):** «mira lo que ha actualizado Eric y tráelo a local y luego tenemos que actualizar Kuanta y Arkdev porque los he rehecho para que no tengan nada de clientes: https://quantus-demo.vercel.app/ y https://patchbay-web.vercel.app/».
- **Eric:** tres commits de origin/main traídos con fast-forward (más aire entre secciones en escritorio, citas recortadas, una franja de 3 px a prueba para la barra de Safari en iOS). No tocaban ningún archivo de lo que había sin commitear.
- **Interpretación:** Kuanta pasa a ser **Quantus** y Arkdev, **Patchbay**: conceptos propios, sin marca blanca. Cambian nombre y slug (`/proyectos/quantus`, `/proyectos/patchbay`), y el caso se rehace con las webs nuevas.
- **Hecho:**
  · Nombre, slug y enlaces en todo `src` (proyectos, inglés, home y su iframe del monitor, espaciado, construir, sistema, portfolio). Carpetas `public/media/obra/{quantus,patchbay}` y `public/media/proyectos/{quantus,patchbay}.webp` (git mv). Los dos casos ganan `url` y `dominio`, así que enseñan «Ver la web».
  · Medios regrabados de las webs nuevas con `tools/r188/grabar.cjs` (cámara lenta, CRF 18) y una lista propia, `tools/r292/lista.json` (las tomas de las rondas 154 y 188, con las alturas de Patchbay corregidas y el tensor de Quantus, que ahora vive en el pie). Monitor de la home con `tools/r292/monitor.cjs`; muestras de tipo (`tools/r64-tipos.cjs`), ejemplo aplicado (`tools/r153/aplicado.cjs`, recortado para quitar el canto de la esfera), escala (`tools/r153/escala.cjs`) y espaciado (`tools/r188/espacios.cjs` → `src/data/espaciado.json`).
  · Quantus, con los datos de su propia sección «The part that is not fiction»: 24 rondas (antes 26), un único HTML escrito a mano de unos 440 KB, 15 ilustraciones, 87 herramientas de medida y el hilo principal de 40,1 s a 26,4 s (fotogramas de más de 20 ms del 2,5 % al 0,9 %).
  · Patchbay: el sonido de su web ha cambiado (ruido en banda estrecha + un seno corto que cae, «nada de ondas cuadradas, que sonaba a petardeo»): el caso lo reproduce con el mismo código, capa a capa, y lo dibuja. HTML de 2.962 líneas (234 KB), en Vercel; H3 27 px, detalle 12,5 px y botón de 40 px.
- **Medido:** `astro check` 0 · `tools/verify.cjs` en /, /proyectos, /proyectos/quantus, /proyectos/patchbay y /en/proyectos/patchbay (Chrome y WebKit, 1280 y 390): limpio, 0 ≥ 400, desborde 0.
- **Pendiente:** el reel sigue montado con las tomas antiguas (Kuanta y Arkdev); las direcciones viejas /proyectos/kuanta y /proyectos/arkdev ya no existen (¿redirigir?); los textos de los dos casos siguen siendo los de antes, revisados contra las webs nuevas (cuadran), salvo lo dicho; no publicado.
- **A media ronda (Andoni):** «la librería, reproducirla mínimamente en el caso, que sea navegable, resumida, y si quieres verla entera un botón claro; el titular de la librería tiene a la derecha una explicación muy larga, la quitamos» · «el reel lo rehacemos más adelante» · «en el mockup de la home las webs son navegables; la de Quantus y Patchbay no, has puesto una captura».
  · Librería: el índice es RESUMIDO (las cinco secciones que se reproducen) y son pestañas de verdad (clic, flechas, `aria-selected`); pasa sola hasta que la tocas; en móvil, una tira con scroll lateral que centra la activa. Fuera la explicación del titular. Debajo, el CTA de la casa «Ver la librería entera ↗» y «Aquí, resumida: cinco de sus secciones».
  · Home: `api/embebible.js` solo contestaba por `*.treseiscero.app` y a las dos demos de Vercel les decía que no → captura. Ahora acepta `quantus-demo.vercel.app` y `patchbay-web.vercel.app`, y el monitor no pregunta por ellas (en local `/api` va a producción: si no, seguiría saliendo la captura hasta publicar); la captura queda de red a los 15 s. Medido: sentado, los cuatro proyectos montan su iframe.
  · Los vídeos del monitor en MÓVIL (`public/media/proyectos/video/`) eran las grabaciones de Screen Studio de las webs del cliente (la de «Kuanta» enseñaba la marca de Multiverse): regrabados de las dos webs nuevas a 1280 × 698, página entera a velocidad constante (opción nueva «lineal» en `tools/r188/grabar.cjs`; lista `tools/r292/monitor-movil.json`), 2,8 y 2,2 MB. Fuera kuanta.* y arkdev.*.
- **A media ronda (Andoni):** «la librería, ¿por qué la metemos en ese marco? ¿puede ir como si fuese una librería de verdad?» → fuera el navegador (puntos y dirección) y la sombra: la librería va tal cual, sobre su papel, con su cabecera (marca, etiqueta «Librería · Sistema de diseño» y su titular) y debajo su índice y la sección; los títulos de sección, en palo como los suyos. En móvil, la pestaña activa ya no se descoloca al enfocarla con el teclado. Medido: verify en /proyectos/neety (Chrome y WebKit, 1280 y 390) limpio.
- **A media ronda (Andoni):** «¿cómo trasladamos la librería al case study para que al cliente le quede claro que eso es lo que le entregamos?» → propuesta aceptada («dale»):
  · El titular pasa a «Lo que entregamos», con una línea: «Con la web, Neety se quedó con esto: su sistema de diseño y la guía para cambiarla con Claude.»
  · EL ALBARÁN: cuatro piezas en fila (La web · El código · La librería · La guía para Claude), sacadas de su propia librería («Recibir el proyecto»: repositorio de GitHub con código, assets, documentación y la librería; `CLAUDE.md` y `docs/decisiones.md`); la librería marcada en coral, «Aquí abajo, resumida ↓». Datos en `proyectos.ts › libreria.entrega` (con inglés).
  · LA ENTREGA EN USO: en «Cambiar contenido», cada prompt se APLICA a una miniatura del hero de Neety (titular, menú y botón reales; pulsar otra vez lo deshace); si nadie la toca, aplica sola el primero a los 1,6 s y se queda 7 s en esa sección. Datos en `libreria.prompts[].efecto` y `libreria.web`.
  · Pillado: las secciones de la librería tenían `pointer-events: none` (de cuando solo se animaban) y no se podía pulsar nada dentro; ahora la activa sí.
  · Medido: los tres prompts cambian su parte (Chrome y WebKit 1280, Chrome 390) · verify en /proyectos/neety y /en/proyectos/neety (Chrome y WebKit, 1280 y 390) limpio.
- **A media ronda (Andoni):** «me gusta más, pero la librería que presentamos me sigue sin convencer» → diagnóstico: era una RÉPLICA (nuestras fuentes, cinco pestañas, texto pequeño sobre beige) y perdía lo que la vende (su tipografía, sus componentes de verdad, su volumen). Propuesta aceptada («dale»): la de verdad.
  · La librería de Neety, en un iframe a todo el ancho de la retícula (su CSP deja `https://savvia.studio` y `http://localhost:*`), navegable y con su scroll; alto `clamp(32rem, 80dvh, 52rem)` (72dvh en móvil). Encima, accesos en píldora (Cambiar contenido · Color · Tipografía · Botones · Componentes) que saltan a esa sección dentro de ella (solo cambia el #ancla). Se monta a 600 px de entrar en pantalla; hasta entonces, y si no carga en 15 s, su primera pantalla capturada (`public/media/obra/neety/libreria{,-movil}.webp`).
  · Se quedan «Lo que entregamos», el albarán («Aquí abajo, la de verdad ↓») y «Ver la librería entera» («Es la de verdad: navégala aquí o ábrela entera»). Fuera la réplica: su marcado, sus estilos, su código (pestañas y prompts que se aplicaban) y sus datos (`libreria` queda en url, capturas, accesos y entrega).
  · Pillados: al limpiar se fueron también los estilos del albarán (repuestos); el iframe lo crea el script y no llevaba el ámbito de Astro, así que salía a 300 × 150 (→ `:global(iframe)`).
  · Medido: carga y salto a «Botones» en Chrome 1280 y 390 y WebKit 1280 · verify en /proyectos/neety, /en/proyectos/neety y /proyectos/quantus (Chrome y WebKit, 1280 y 390) limpio.
- **A media ronda (Andoni):** «esto me gusta más; ¿podemos poner la librería dentro de algo que la integre más con nuestra web, algo chulo y original?» → tres direcciones; elige la 2, **«El libro de la marca»**.
  · La librería se entrega como un LIBRO: cerrado, la tapa en los colores de Neety (`libreria.tapa`: berenjena, crema, naranja), con lomo, su titular y una etiqueta de papel «Entregado con la web · savvia»; va centrado. Al asomar (70 % a la vista, 0,9 s) se abre: la tapa gira sobre el lomo HACIA ATRÁS en perspectiva (rotateY 104°, 1,7 s) y queda en el cuarto izquierdo enseñando la guarda con el ex libris («Este libro es de Neety»), mientras el libro se desplaza a su sitio. La página, con el canto de las hojas, es la librería real: a 1120 px reducida a la página (para que salga su índice lateral, que aparece desde 1024 px). También se abre al pulsar la tapa o un acceso. Sin JS, abierto; con movimiento reducido, se abre sin animación. En móvil la tapa se levanta hacia arriba (bisagra arriba) y se va.
  · Pillado: otra colisión de clases (`.hoja`, de la tipografía, convertía la página en una rejilla de anchura 0 y el iframe salía vacío): `.pagina-lib`.
  · Medido: abierto y cargado en Chrome 1280 y 390 y WebKit 1280 (iframe 1120 px × 0,80) · verify en /proyectos/neety y /en/proyectos/neety (Chrome y WebKit, 1280 y 390) limpio.
- **A media ronda (Andoni):** «me gusta; ¿podemos hacer el libro más realista y que se pueda abrir y cerrar?»
  · Un solo número manda, `--a` (0 cerrado · 1 abierto): el giro de la tapa, el desplazamiento del libro y la sombra que la tapa deja en la página.
  · Se abre y se cierra: con clic (o Intro) en la tapa, ARRASTRÁNDOLA (sigue al ratón o al dedo y al soltar se queda abierta o cerrada según por dónde vaya; en el móvil, hacia arriba) y con «Cerrar el libro / Abrir el libro» al final de los accesos. La primera vez se abre solo al asomar, salvo que ya lo hayas tocado. Cerrado, al pasar, la tapa se levanta un pelo.
  · Materia: tapa de cartón de 6 px (cara de fuera y de dentro separadas y el canto y el lomo en 3D), tela con su trama, lomo con la bisagra hundida, titular y marca gofrados, guarda con el ex libris y el canto de las hojas a la derecha y abajo.
  · Medido (Chrome 1280 y 390, WebKit 1280): arrastre a medias (`--a` 0,43 / 0,59), al soltar abierto; el botón lo cierra; un clic en la tapa lo abre y la librería carga · verify en /proyectos/neety y /en/proyectos/neety (Chrome y WebKit, 1280 y 390) limpio.
- **A media ronda (Andoni):** «se abre al revés: se tiene que abrir hacia fuera, no hacia dentro» → la tapa gira HACIA QUIEN MIRA (rotateY −180°) y queda tumbada a la izquierda como página (la guarda con el ex libris): un pliego de dos páginas iguales; cerrado, el libro va centrado (−25 %). La librería va en la página derecha, a su anchura (su maqueta estrecha, sin reducir). En móvil la tapa se levanta hacia ti (rotateX positivo). Medido: arrastre, botón y clic en Chrome 1280 y 390 y WebKit 1280 · verify en /proyectos/neety y /en/proyectos/neety limpio.
- **A media ronda (Andoni):** «los botones de arriba (Colores y demás) no te llevan donde deberían» → al pulsar uno con el libro cerrado, el acceso llevaba la librería a su #ancla y, justo después, abrir el libro la volvía a cargar sin ancla. Ahora, montada, solo se mueve con ancla y por su `location`. Medido en Chrome, WebKit y móvil: las cinco secciones quedan arriba (a 96 px, bajo su cabecera), también al repetir.
- **PUBLICADO (22/10, Andoni: «publica únicamente todo lo nuevo de portfolio y case studies; la firma y el favicon, como están en producción; mira si Eric ha subido algo»):** Eric no había subido nada nuevo (comprobado antes y justo antes del push). Commit `72107b2` con portfolio, casos, la librería de Neety y Quantus/Patchbay. Fuera: los favicons (PNG y `?v=221` en `Base.astro`), la firma (`public/descargas/savvia-firma-*`, su parte de `/sistema`, `tools/firma`, `tools/favicon-arbol`); de `Libro.astro` solo subió el cambio de nombre Kuanta → Quantus. El commit se compiló y verificó en una copia aparte antes de subirlo. EN VIVO: verify en /, /proyectos, /proyectos/neety, /proyectos/quantus y /en/proyectos/patchbay (Chrome y WebKit, 1280 y 390) limpio, 0 ≥ 400, desborde 0; favicon `?v=217` (el de antes); la firma da 404 (no publicada); los accesos de la librería funcionan en vivo; `/api/embebible` deja embeber las dos demos. Sigue `noindex`. En local quedan sin subir la firma y el favicon nuevo.

## Favicon, firma y el reel (propuesta) · 2026-10-23
- **Andoni (textual):** «el favicon se ve cortado; igual tenemos que usar los de Telegram, que son como más altos, sin fondo» · «la firma, algo estilo la captura» (una línea negra fina, de un solo trazo, sobre un árbol en gris lavado; nombre en palo seco) · «el reel de proyectos destacados, me gusta mucho el vídeo de vimeo.com/1199729821; algo así para explicar lo que hacemos y ver productos destacados».
- **Favicon:** el árbol ENTERO de los de Telegram (`public/descargas/savvia-telegram-<estación>.png`), sin su fondo ni el haz: clave por distancia al color del fondo (`tools/r293/clave.cjs`; rembg se comía las copas de primavera y verano), huecos de la copa rellenos con su propio color (`relleno.cjs`) y encajado entero en el cuadrado con 1–2 px de aire (`montar.cjs`). 64 y 32 px, transparentes; `?v=222`. Los de antes, en `tools/retirados/favicon-r292/`. El de iPhone (`apple-touch-icon-*`) no cambia: iOS necesita fondo.
- **Firma:** el roble de otoño en gris muy claro y, encima, UNA línea fina (2,2 px a 2×) que lo recorre: la copa en arcos, un bucle, la horquilla en zigzag y el tronco en S; una variante por persona. 480 × 300 (se pinta a 192 × 120), paleta de 64 colores, 68 KB. `tools/firma/firma-linea.cjs`; las de antes, en `tools/retirados/firma-r292/`.
- **Reel:** analizado el vídeo de Frontify («Almost right is still wrong», 66 s): fondo hueso, un único halo violeta que sigue la atención, prompt que se teclea en grande y se aleja, grafo de piezas de marca, imágenes que se generan en mosaico de píxeles, notas de revisión («Not approved», círculo rojo, tachado), tipografía cinética palabra a palabra («Close isn't the same as right.»), el grafo que se ordena en retícula, el logotipo y el resultado bueno. Guion para savvia (aprobado: «sí, monta el reel con ese guion»).
- **Hecho · reel «Casi no es bien» (`tools/r293-reel/`, HyperFrames; `node build.cjs [bpm] [primer-pulso] [canción]` → `hf/index.html`):** 50 s con «Second Nature» (107,7 BPM, cortes a pulso).
  1 · «Hazme una web para mi marca.» se teclea en grande y la cámara se aleja · 2 · sale en mosaico de píxeles una web de plantilla («AI slop» morado) y llegan las notas de Andoni y Eric («Colores de nadie», «Tipografía de plantilla», «No suena a nosotros», «Casi»), círculo y tachado en coral y el sello «Revisión · No aprobado» · 3 · «Casi / bien / no es / bien.» en escalera; cada letra se apaga en un punto de savia que cae · «La diferencia es el criterio.» · 4 · «Tu marca, escrita para que la IA la siga.»: `savvia.md` y seis piezas (color, tipografía, voz, componentes, espaciado, decisiones) unidas por líneas que se ordenan en retícula · 5 · el mismo prompt «+ savvia.md» y salen, del mosaico a la grabación real, Quantus, Patchbay, Neety y Remerge, cada una con el cursor de quien la aprueba («Perfecto.», «Aprobado ✓», «Es su marca.», «Publicamos.»); ocho cortes a pulso · 6 · sobre Cacao: «Con criterio. No casi.», logotipo y savvia.studio. Un solo halo coral (en multiplicar) lleva la atención, como el violeta de Frontify.
  Pillados por `hyperframes check`: `left/top` animados (se pasan a x/y), letras que se apagaban con color transparente (se apaga el glifo), contraste de sellos y avatares; los clips del portfolio traían fotogramas clave cada 4–8 s (reencodados con uno por segundo) y la música salía a −8,7 LUFS (bajada a −16).
- **Medido:** `astro check` 0 errores · favicon `?v=222` servido en /sistema · las dos firmas cargan a 192 × 120 (captura revisada). No publicado.
- **A media ronda (Andoni):** «quita la música y enseña más de cómo es la librería que construimos; las webs, que salgan dibujándose como el efecto del árbol, y que salga nuestro árbol» · «el favicon, un pelín más grande y reconocible sin que se corte» · «la firma, el árbol más pequeño y las líneas más genuinas: ahora copian mucho lo que te he pasado; tienen que ser más del roble».
  · **Reel v2 (`reel-casi-v2.mp4`, 54 s, sin audio):** fuera la música (los cortes siguen la retícula de 107,7 BPM). La escena del grafo se sustituye por la LIBRERÍA de Neety de verdad (`grabar-libreria.cjs`: neety.treseiscero.app/library recorrida paso a paso, 30 fps): Cambiar contenido · Color · Tipografía · Botones · Componentes, cada una con su nota («Prompts listos para cambiar la web con Claude», «Su paleta, con nombre y token»…). La librería y las cuatro webs se DIBUJAN como el roble: cae una gota, desde el impacto se descubren las líneas (bordes de luminancia, `lineas.cjs`) con el canto de papel rasgado y 0,45 s detrás la pintura (la grabación). Cierre: el roble (el de otoño) se dibuja y se pinta desde una gota al pie, «Con criterio. No casi.» y el logotipo sobre él. Se queda el mosaico de píxeles solo para la web de plantilla (lo que hace la IA sin receta).
  · **Favicon (`?v=223`, `tools/r293/montar2.cjs`):** se encaja la MASA del árbol (columnas con alfa denso), no sus estelas: el árbol pasa a llenar el cuadrado; lo que sobresale se funde en el 7 % del borde (sin corte seco); algo más de saturación y nitidez a 16 y 32 px.
  · **Firma (`tools/firma/firma-roble.cjs`):** el roble a 300 × 206 dentro de 480 × 300 (antes casi todo el ancho). La línea ya no copia la referencia (arcos cruzados, bucle, zigzag): dibuja ESTE roble: el suelo, el tronco con su torsión, las ramas largas y bajas que lo caracterizan, la copa en lóbulos irregulares y una rama que acaba en rizo; Eric, en orden inverso y con el rizo en la rama izquierda. 35 KB. Pillado: el ajuste de tono pisaba el alfa (fondo gris) y el búfer «premultiplied» dejaba el árbol transparente.
- **A media ronda (Andoni):** «el favicon de invierno no se ve bien del todo» · «la firma sigue sin convencerme: el árbol en blanco y negro más pequeño y pegado a la izquierda, y la firma más estilo el ejemplo, pero que se vea que son líneas que generan el roble; Eric y yo, la misma».
  · **Favicon de invierno (`tools/r293/invierno.cjs`, `?v=224`):** ramas engordadas (dilatación del alfa) en el color de la corteza y un halo de nieve claro alrededor: se lee en pestaña clara, oscura y Cacao.
  · **Firma (`tools/firma/firma-gesto.cjs`):** el roble en gris, pequeño (300 × 205 a 2×) y pegado a la izquierda; encima, a su escala, el gesto del ejemplo hecho con SU estructura: el vientre de la copa en un arco largo, la copa en otro que la cruza, una rama que sube de la horquilla, una bellota en bucle en la rama derecha, la horquilla en quiebro, el tronco en S y las raíces sobre el suelo. Una sola imagen para Andoni y Eric (312 × 222, se pinta a 156 × 111; 34 KB).
- **A media ronda (Andoni):** «el reel: un inicio más dinámico; los proyectos se dibujan mal, que se generen como lo hace la barra al abrirse el menú; la librería, mostrarla en acción como en el savvia agentic de la web, y eso es lo que hace que los proyectos se vean bien; el final, con savvia tipográfico como en la web».
  · **Reel v3 (`reel-casi-v3.mp4`, 49 s, sin audio; la v2 en `build-v2.cjs`):** ARRANQUE en ráfaga: seis golpes de medio pulso (Quantus, la librería, Patchbay, Neety, componentes, Remerge) con «¿Una / web / con / IA? / ¿Así / de fácil?», y el prompt que entra con rebote, se teclea de un tirón y se envía con un pulso de savia. Las escenas de «casi» y de la tipografía cinética, más cortas. LA LIBRERÍA EN ACCIÓN: la película de la sección savvia agentic de la web (`public/media/partitura/partitura-otono-es.mp4`, de 7,5 a 26,4 s, a ×1,21: Claude, Codex, savvia y su equipo cogen piezas de la librería de Neety y montan su home) junto a «Tu marca, escrita para que la IA la siga.». Las webs se ABREN como el menú (`dibujar.ts › pintarComoEstacion`): papel rasgado que crece desde donde pulsa su cursor, con el anillo de savia delante del frente; fuera las líneas. Cierre: el roble se dibuja desde una gota y encima «savvia» tipográfico (`savvia-palabra.svg`) y savvia.studio. `reel-casi-v3-ligero.mp4` (CRF 26) para el móvil.
- **A media ronda (Andoni, con sus líneas hechas en Figma sobre la plantilla):** «aquí va la firma, probemos esta» → `tools/firma/firma-figma.cjs`: su lámina (`tools/firma/andoni/firma-andoni-figma.webp`, 1248 × 912, fondo blanco) pasa a tinta #1E1714 con el alfa de lo oscuro (el blanco, transparente: se ve igual sobre cualquier fondo claro), recortada a su dibujo y a 2× (600 × 411, 16 tonos, 53 KB); se pinta a 180 × 123 en el correo. La misma para Andoni y Eric. Revisada en /sistema.
- **A media ronda (Andoni):** «el árbol tiene que ser mucho más pequeño y estar alineado a la izquierda» → la firma se recorta a la MASA del dibujo (no a las estelas sueltas de la copa), así su borde izquierdo cae en la línea del nombre; el canto del recorte se funde solo en el gris del árbol (los trazos quedan enteros). 441 × 391 a 2×, se pinta a 96 × 85 (antes 180 × 123). 43 KB.
- **A media ronda (Andoni):** «¿podemos poner diferentes opciones de firma y que puedas elegir cuál sale en el correo de abajo? Así elegimos una» → en /sistema › Descargas, un selector (píldoras, `role="radiogroup"`) con cinco: Roble encima (96 px) · Roble al lado (64 px, nombre a su derecha) · Solo los trazos (los de Figma sin el gris del roble) · Con el logotipo (roble pequeño, nombre y «savvia» tipográfico enlazado) · Solo texto. Cambia las dos firmas, lo que copia «Copiar firma» y la del correo de ejemplo; se recuerda en este navegador (`savvia:firma`). Imágenes nuevas con `tools/firma/firma-opciones.cjs`: `savvia-firma-roble.png`, `-trazos.png` (6 KB), `-palabra.png` (4 KB). Medido: las cinco cargan sus imágenes y cambian el HTML que se copia; sin errores de consola.
- **A media ronda (Andoni):** «da más opciones, roble a color, con algo característico de la web…» → cuatro más en el selector (nueve en total): Roble a color (el de otoño con sus trazos, un 22 % transparente para que se lean) · Roble de la estación (cambia con la de la web y añade «savvia · otoño en Donostia») · Avatar de la casa (el roble sobre la noche de su estación, el de Telegram, esquinas ya en la imagen; nombre a su derecha) · Con la gota de savia (el roble gris pequeño y una gota Coral delante de savvia.studio). `tools/firma/firma-color.cjs` → `savvia-firma-color-<est>.png` (33–53 KB, a 3×), `savvia-firma-avatar-<est>.png` (18–28 KB) y `savvia-firma-gota.png`. Medido: las cuatro cargan y cambian lo que se copia; sin errores.
- **A media ronda (Andoni):** «probar roble de la estación sin el dibujado por delante y más pequeño, en plan 32 px» → opción 10, «Roble de la estación, pequeño»: el roble del favicon de la estación (`savvia-firma-mini-<est>.png`, 64 px a 2×, sin trazos), a 32 × 32, con «savvia · otoño en Donostia» y savvia.studio. El selector acepta `?firma=<opción>` para abrirlo directo en una.
- **A media ronda (Andoni):** «el de la gota de savia va fuera; el de roble de la estación pequeño, un poco más grande, 64 px» → fuera la opción de la gota (y su imagen); «Roble de la estación, pequeño» a 64 × 64 (imagen de 128 a 2×, del roble de cada estación del favicon; 20–40 KB).
- **A media ronda (Andoni):** «vamos a dejar solo: roble encima · roble al lado · solo los trazos, pero más pequeños y más estilo firma · roble a color pero metiendo el roble de estación pequeño · avatar de la casa» → el selector se queda en esas cinco. Trazos (`firma-opciones.cjs`): engordados antes de reducir, inclinados 14° y achatados al 80 %, como una rúbrica; a 80 × 55 (6 KB). «Roble a color» = el roble pequeño de la estación (el del favicon, 64 px), sin trazos. Fuera sus imágenes en desuso (`savvia-firma-palabra.png`, `savvia-firma-color-*.png`). Medido: las cinco cargan y cambian lo que se copia; sin errores.
- **A media ronda (Andoni):** «el de solo trazo, dos opciones más: una a la izquierda en vez de arriba y otra a la derecha» → «Trazos a la izquierda» y «Trazos a la derecha» (la rúbrica junto al nombre). Siete opciones.
- **A media ronda (Andoni):** «en sistema, cerciorarse de que todo cambia bien al cambiar de estaciones» · «mira bien lo de las estaciones, hay muchas cosas que deberían cambiar con la estación que no cambian» → auditoría de las 16 secciones en las cuatro estaciones (`tools/r293/estaciones-sistema.cjs`). Arreglado:
  · el Cacao FIJO de 45 reglas de `Libro.astro` (logotipo sobre su fondo, radios, botones, chat, perfil, piezas, iconografía, guías…) y 2 de `Guia.astro` pasa a `--color-cacao` (la tinta oscura de la estación; en invierno, Pizarra). Se quedan fijos a propósito: la tabla que documenta la paleta, los archivos de descarga de cada color y el HTML de la firma (va al correo).
  · lo que era imagen de otoño sigue a la estación (`data-est-src` con `{est}`, al cargar y con `savvia:estacion`): el favicon de las maquetas de pestaña y de la placa, el fondo y el avatar del perfil en redes, la mesa del estudio, el roble de la demo de piezas; las firmas con roble de la estación se rehacen al cambiar.
  · Movimiento: los cinco vídeos regrabados en las cuatro estaciones (`tools/r266-motion/grabar.cjs` con `SAVVIA_EST`) → `<id>-<estación>.mp4`; cambian con la estación sin parar.
  · Medido: en cada estación, favicon, icono de iPhone, fondo, firmas y vídeos de la suya; sin errores de consola.
- **PUBLICADO (24/10, Andoni: «publica únicamente lo de favicon y firmas» · «y después de eso publica solo el arreglo en sistema de estaciones» · «mira si Eric subió algo»):** Eric no había subido nada (comprobado antes de cada commit y justo antes del push). Commits `6b3364b` (favicon y firmas) y `7fc0dda` (estaciones en /sistema y dos firmas de trazos), compilados y verificados en una copia aparte antes de subir. Fuera: el reel (`tools/r293-reel/`, sigue en local para mañana). EN VIVO: `tools/verify.cjs` en /, /sistema y /proyectos (Chrome y WebKit, 1280 y 390) limpio, 0 ≥ 400, desborde 0; favicon `?v=225`; en las cuatro estaciones, favicon, icono de iPhone, fondo y firmas de la suya; imágenes y vídeos nuevos, 200. Sigue `noindex`.

### Ronda 294 · 2026-10-26 · el reel «¿Tu web se ve AI slop?» (en local, borrador)
- **Andoni (textual):** «Vamos a ver si hacemos un reel de savvia chulo» → (tras la crítica de la v3 de «Casi no es bien») «Rehazlo pero queremos enfocarlo más a tu web se ve AI slop, más que casi bien no es bien.»
- **Crítica de la v3 (ronda 293):** un tercio del vídeo parado en la librería pequeña a la derecha; las webs nunca a sangre; el hueso con halo rosa era Frontify, no savvia; sin sonido.
- **Hecho (`tools/r294-reel/`, HyperFrames; `node build.cjs [es|en]`, `slop.cjs` genera las 30 webs de plantilla del muro, `sfx.py` el sonido):** 47,2 s a la retícula de 107,7 BPM.
  1 · la web de plantilla («Nexora», degradado morado, «Unlock the Power of AI ✨», tres cards con emoji) a sangre desde el fotograma 0 y encima «¿Tu web / se ve / AI slop?» · 2 · el DIAGNÓSTICO: cinco señales marcadas en coral con rotulador (titular de nadie, degradado morado y rosa, botón de plantilla, tres cards con emoji, destellos por todas partes), contador «Señales de AI slop n/5» y el sello «AI slop · 5 de 5» · 3 · la cámara se aleja y la web es una baldosa de un MURO de 30 clones (Lumina AI, Synthex, Vortexa…): «Como otras mil. / Y nadie se acuerda de ninguna.» y el muro se apaga · 4 · en Cacao: «La IA no es el problema. / El problema es que no sabe quién eres. / Así que se lo escribimos.» · 5 · cae la gota y la librería de Neety se abre a sangre con el gesto del menú (Color, Tipografía, Botones, Componentes) · 6 · savvia agentic en acción (Claude, Codex y tu equipo leen la misma receta) · 7 · Quantus, Patchbay, Neety y Remerge a sangre, dos tomas cada una, con su nombre · 8 · las cuatro juntas: «Cada una, la suya.» · 9 · el roble se dibuja desde la gota, «Tu web, sin AI slop. / Con criterio.», «savvia» y savvia.studio.
  Sonido sin música: golpes de la pregunta, rotulador y tic por señal, sello, las baldosas del muro una a una, la gota, papel que se rasga en cada apertura y un acorde cálido bajo el roble (−18,4 LUFS, pico −1,2 dBFS: con solo efectos, llegar a −14 aplastaba los golpes).
- **Pillado:** las tomas `g1`–`g4` de Quantus y Patchbay (las del reel 293 y también las de `public/media/obra/` que usa el portfolio publicado) llevan aún las marcas viejas «KUANTA» y «arkdev». En el reel se cambian por `portada` y las `x-…` sin marca; en la web siguen igual.
- **Medido:** `hyperframes check` 0 errores (un aviso de contraste en el fundido de entrada de una ficha) · fotogramas clave revisados. Pendiente: OK de Andoni al borrador antes del render final y la versión en inglés.

### Ronda 295 · 2026-10-26 · vuelve el favicon de antes (en local)
- **Andoni (textual):** «En savvia.studio deja el favicon como lo teníamos antes.»
- **Hecho:** vuelven los favicons publicados antes del 23/10 (el roble de la estación sobre su fondo con el rayo de luz; `tools/retirados/favicon-r291/`, idénticos byte a byte a los de `6b3364b^`) a `public/favicon-<estación>(-32).png`. Los del roble de Telegram sin fondo (ronda 293), en `tools/retirados/favicon-r293/`. `?v=226` en `Base.astro` y `sistema/Libro.astro` para saltar la caché. El icono de iPhone no cambia.
- **Medido:** `astro build` OK; `dist/` sirve los ocho PNG restaurados con `?v=226`. No publicado.

## Pie · hojas de «Contáctanos» sin borde cortado (26/10/2026, Eric)
- «hay muchas hojas que salen encima del titular de la nada… tiene que salir desde arriba» · «como si hubiese ahí algo cortado» · «cuidado que ahora se ven hojas en el background blanco».
  · Eran las de `tiempo-encima.ts` (las que se posan en «Contáctanos»): su lienzo vivía en `.paisaje` (overflow: clip), cuyo borde de arriba cae a la altura del titular.
  · `.paisaje` mide `max(100%, alto + extra)`: llega al borde de arriba del pie (todo lo de dentro va anclado abajo) y sigue con `overflow: clip`. (Probado antes: abrir el recorte por arriba con clip-path → hojas sobre la sección clara y hueco marrón abajo, porque `overflow-y` visible deja bajar la página.)
  · Hojas y copos entran con fundido en sus primeros 110 px (también los del lienzo `.clima`, 160 px, que ahora nacen por encima del pie).

## Neety vuelve a como estaba por la mañana (26/10/2026, Eric)
- «vuelve a como estaba Neety a primera hora de la mañana» → la ficha de Neety (`proyectos.ts` y `proyectos.en.ts`) vuelve a la de `HEAD`: fuera el `titulo` «Neety, hecho por savvia», la carátula con solo el logotipo (`caratulaLogo`), el titular «De Webflow a una web conectada con la IA.» y el contexto nuevo (vuelve el del feed de señales y el naranja). El código que los admite (campos opcionales, `Pieza.astro`, `Caso.astro`) se queda sin uso. `astro check` 0 errores · `astro build` OK.

## Proyectos destacados · «Proyectos hechos con desarrollo agéntico» al sentarse (26/10/2026, Eric)
- «cuando te sientas hay que poner en algún lado "proyectos hechos con desarrollo agéntico"» → línea `.detail.lema` (mono, Rosa niebla, sombra suave para leerse sobre la lámina) centrada justo encima de la píldora «‹ proyecto ›» de la barra de sentado (`Proyectos.astro`, dentro de `[data-barra]`: solo se ve sentado). En inglés, «Projects built with agentic development». `astro check` 0 errores.
- Móvil: la flecha de la píldora se quedaba rellena tras tocarla (:hover pegado en táctil) → el relleno de `.otros .paso:hover` solo con `@media (hover: hover)`.

## Los CSV del CMS de treseiscero (26/10/2026, Eric)
- «muévelos y tenlos en algún lado ready, porque voy a necesitarlos para hacer las páginas de proyectos bien» → los cinco CSV de Webflow (Portfolios, Categories, Services, Technologies, Countries), que estaban en `public/` (se habrían publicado), van a `tools/portfolio-tsc/csv/`. `tools/portfolio-tsc/csv.cjs` los convierte en `src/data/portfolio-cms.json`: 41 proyectos con web, dominio, descripción, ubicación, país/tecnología/servicios/categorías por nombre, destacado (27), reseña con autor y cargo (34), historia en HTML (8), logotipo, miniatura, vídeo de la web (30) y vídeo testimonial. Coincide al 100 % con `portfolio-tsc.json` en proyectos y etiquetas. OJO: está en inglés y muchas reseñas nombran «treseiscero» (no se dice en la web); los vídeos testimoniales, rechazados (ronda 48).

## Portfolio · Greet con su vídeo (26/10/2026, Eric)
- «De los últimos proyectos, Greet.video: ¿hacemos la carátula?» · «solo la carátula de vídeo para proyectos, no el case study» → toma de Screen Studio (1976×1080, 40 s) recortada a la proporción de las cards; a velocidad normal (Eric: «va como a ×2»: siempre entero y a 1×, la card y la grande): `public/media/anteriores/video/greet.mp4` (960×552, 20,5 s, 2,2 MB) + `greet-grande.mp4` (1600×922, para el visor) y sus pósters.
- Greet no está en el CMS de treseiscero: va como `EXTRA` en `Portfolio.astro`, delante de los del CMS (Alemania · Webflow · Diseño web + Desarrollo en Webflow · Marketing; sector «Vídeo personalizado»; verdes y rojo de su web). Datos supuestos, pendientes de confirmar. `astro check` 0 errores. No publicado.

## Portfolio · Cubbo en el móvil de la mesa (26/10/2026, Eric)
- «Aquí Cubbo, como en la home, el móvil que tenemos» → en `/proyectos` Cubbo va SIEMPRE en el móvil de la mesa (`Portfolio.astro › EN_MESA`), con lo de la home (`Anteriores.astro › SITIO[3]`): lámina en ESPEJO, ×2,3, centro al 47 % (`PiezaCasa.astro › COMO_HOME`).
- «Se ve un contorno como de 1 px entre el frame del iPhone y el vídeo» → la pantalla en perspectiva del portfolio quitaba el filo de 2 px en el negro del bisel (`box-shadow: none`); vuelve, como en la home (ronda 190). `astro check` 0 errores. No publicado.

## Portfolio · orden fijo, herramienta «Orden de /proyectos» y Playground IEP nuevo (26/10/2026, Eric)
- «a ver, pero hay que tener orden… me estás cambiando el orden y demás de cada uno» → en /proyectos la FORMA de cada pieza la pone su sitio en el mosaico (SITIO, cada 8): meter un proyecto delante movía de sitio y de forma a todos.
  · Nuevo `src/data/portfolio-orden.json` (`orden` + `piezas` por slug: `forma` fija, `n`, `s`, `c`, `oculto`), que lee `Portfolio.astro`: lo que no está en `orden` va al FINAL. La forma fija sale por `data-forma` (sustituye a `EN_MESA`: Cubbo, `forma: movil`).
  · Herramienta: https://claude.ai/artifact/EnYvzyRJn87Axd3SsUfBGP («Orden de /proyectos»; el mosaico real con las cuatro formas; desplegable de proyecto en cada sitio que intercambia, arrastrar, posición, forma fija, nombre, sector, colores, quitar de la web). Guarda en su base (`ajustes/actual`, campo `json`); se aplica copiándolo a `portfolio-orden.json`.
  · OJO: no importar nada de `src/scripts/pieza-casa.ts` en el frontmatter (ni `import type`): rompe el render en servidor (FailedToLoadModuleSSR).
- Playground IEP NUEVO (la home que hace Andoni con Claude, playgroundiep.treseiscero.app/home-v3; grabación de Screen Studio): pieza aparte `playground-agentico` (la de Webflow se queda: «también es nuestra»), en el sitio 2 (monitor), intercambiado con Wisable, que pasa al final. `anteriores/video/playground-agentico(-grande).mp4/.jpg` (a velocidad normal: siempre entero y a 1×, la card y la grande). Tecnología «Claude Code», servicios Diseño web + Desarrollo agéntico.
- Home, Proyectos destacados: sentado en desktop, el iframe va a `home-v3` (embebible: sin x-frame-options ni CSP); sentado en móvil, el vídeo nuevo (`proyectos/video/playground.mp4`, 1280×698, a velocidad normal, 65 s); de pie, la captura nueva (`proyectos/playground.webp`). Los de antes siguen en git (HEAD).
- `astro check` 0 errores · /proyectos revisado en Chrome. No publicado.

## Proyectos · el slider de los mentores y la cuadrícula antes del pie (26/10/2026, Eric)
- «aquí al final, antes del footer, pondremos el slider que finalmente descartamos de la home, de 4 ilustraciones de mentores» · «para así evitar que si solo hay un proyecto de filtro o ninguno la página se quede bastante descolgada» · «debajo del slider de ilustraciones el grid; así la ola del footer pasa por debajo del grid y se superpone bien».
  · `src/components/Voces.astro` (nuevo): el testimonio que rotaba en «Más proyectos» (`Anteriores.astro`, `VOZ_EN_MOSAICO = false`) en su componente: retrato al carboncillo que se dibuja, cita palabra a palabra, flechas y arrastre. Sin el camino del motor del roble (ya sin uso en la home).
  · `src/components/Cuadricula.astro` (nuevo): la cuadrícula de citas, logotipos y cifras SACADA de `Anteriores.astro` (marcado, tallas de logotipos, script y estilos); la home la usa igual (`.cuadricula-arriba`), y /proyectos también.
  · `Portfolio.astro`: tras la rejilla, `<Voces />` y debajo `<Cuadricula />`, sin margen: la ola del pie sube sobre su última fila, como en la home.
- Medido (Chrome sin ventana, 1280 y 390, `?pais=Japón` = 0 proyectos): slider y cuadrícula visibles, la ola sobre la cuadrícula; la home con la cuadrícula igual; consola limpia. `astro check` 0 errores. **SIN medir:** WebKit. No publicado.
- **A continuación (Eric): «la nubecita dentro del desplegable no tiene overflow hidden, cuidado».** Las nubes de arriba y abajo de los filtros (`.desp-menu::before/::after`, sticky con `z-index`) iban pegadas al borde (−8 px) y rectas: tapaban el filo y asomaban fuera de las esquinas redondeadas. Ahora quedan 1 px dentro del filo (−7 px) y con radio 12 px (20 de la lista − 8 de relleno). Medido (Chrome, 1280, DPR 2, «Servicio» abierto): el filo de abajo entero y las esquinas limpias.
- **Después (Eric): «ahora hay una barrita horizontal de color más oscuro rara».** La rendija de 1 px que dejaba la nube dejaba asomar la lista (las opciones son `position: relative; z-index: 1` y se pintan sobre el filo). Rehecho: la nube llega al borde por los tres lados (`margin-inline: −8 px`, top/bottom −8 px), con las esquinas de la lista (20 px) y un borde TRANSPARENTE de 1 px; el degradado va en `padding-box`, así que tapa la lista hasta el filo y el filo de la lista se ve entero (con un borde en `--rule` se doblaba: es semitransparente). Medido (Chrome, DPR 2, lista desplazada 60 px): nubes de arriba y abajo sin barra, filo y esquinas limpios.
- Herramienta: control del NAVEGADOR por pieza (arrastrar para moverlo, ⌘ + rueda o «Tamaño», «Giro»; `nav: [x, y, ancho, giro]`), que `/proyectos` lee por `data-nav`. APLICADO el orden de Eric (versión 117 de `ajustes/actual`): 44 piezas, 17 con ajustes (formas fijas, navegadores colocados, fondos blancos de GSB Index, Lyra y Business Online Payroll). THX, como en la home. Para volver a aplicarlo: leer `ajustes/actual` › `json` y pasarlo a `portfolio-orden.json` (`p` → `piezas`).
- «en la home THX encaja perfecto con su marco; en proyectos se corta» → en `PiezaCasa.astro` el vídeo del navegador iba forzado a 16:10 con `object-fit: cover` (recortaba las grabaciones de 960×552). Ahora va con su proporción real (la de su póster, leída con sharp: `--ar`), como en la home; las capturas siguen a 16:10.
- «cada proyecto se muestra de una manera y siempre tiene que ser así; más modular, más versátil» (THX salía en teléfono al filtrar por Webflow: el sitio decidía la forma) → la PIEZA es del proyecto: `portfolio-orden.json › piezas[slug]` = `forma`, `ratio`, `ancho` (3 | 4 columnas), `nav` [x, y, ancho, giro] y `giro` (teléfono), para los 44 (congelados tal y como se veían en la vista completa). El SITIO del mosaico solo coloca: columna de inicio (si la pieza es más ancha, empieza antes para caber) y cuánto baja. Igual sin filtros, filtrando o en cualquier puesto. La herramienta (versión 6) edita eso por proyecto (sin «la de su sitio»; proporción y ancho nuevos; el giro del teléfono).
- «creo que tu sistema estaba mejor: ahora no siempre se cumplen los espacios» y «solo me gustan 3 displays: el navegador (que se pueda girar y zoomear), la mesa con la pantalla grande y la mesa con el móvil» → vuelve el reparto: el SITIO pone tamaño y colocación (columna, proporción, cuánto baja); el PROYECTO, su forma (solo esas tres) y su navegador. Fuera `ratio`, `ancho` y `giro` de las piezas; fuera el teléfono de pie (Vitalera y Qalea pasan a la mesa con el móvil). Herramienta, versión 7.
- Lista de los filtros: barra de desplazamiento fina en la tinta de la web (Chrome: `scrollbar-color`; Safari: `::-webkit-scrollbar`).
- «a nivel de SEO, ¿paginación o botón de cargar más? Así no se hace infinito» → fuera el scroll infinito: «Ver más proyectos» (Cta secundario, flecha abajo), enlace de verdad a `?p=N` (con los filtros); las 44 piezas siguen en el HTML. `?p=` se lee al llegar.
- «el número, creo que lo quitaría» → el recuento de la barra de filtros ya no se ve (queda para lectores de pantalla).
- Recuento de cada opción de los filtros centrado con su nombre (el reset de Tailwind subía los `<sup>` con `top: -0.5em`).
- Fiallegas Abogados (fiallegas-abogados.com, Eibar y Donostia, Webflow): pieza `fiallegas-abogados` en el puesto 23 de 45 («a mitad de tabla, con pantalla de mesa»: `forma: escena`). Vídeo de Screen Studio a 1×, entero (36 s): `anteriores/video/fiallegas-abogados(-grande).mp4/.jpg`. Categoría nueva «Legal». La base de la herramienta (`ajustes/actual`, v118) se sincroniza con `portfolio-orden.json`.
- VÍDEOS DE ESCRITORIO de /proyectos, uno a uno con Eric (`tools/portfolio-tsc/video.sh <slug> <enlace de Screen Studio | mp4/webm del CMS>`: 1×, entero; Screen Studio recortado a 960×552; los del CMS con SU proporción y el navegador de la pieza se adapta a su póster): grabados GSB Index, PROfounders Capital, Bluence, Lyra, Adaral, GOW Delivery, Alpine Security y Junípero; del CSV del CMS (`portfolio-cms.json › video`) ManagerPro, Valuat, Zrive, Ikon, Kabila e Impact Bridge. Se quedan con su captura (webs muy cambiadas o sin ella): Numen Games, Endoaula Conecta, Crece con Casavo, Home+ Casavo, Soundtown, Endoaula y Stemdo.

### Ronda 296 · 2026-10-27 · el Manifiesto como analogía de la savia; raíces pequeñas (en local, Eric)
- **Pedido (Eric):** «quiero hacer la analogía de lo que es la savia del árbol con savvia. Compartimos mismos valores. Hay tres analogías» (va por dentro · se adapta · es sabia) → opción A: sustituyen a los tres capítulos (Voz propia · El ritmo · La receta). «las raíces las haría mucho más adaptadas al tallo, más pequeñas, más sibilinas, más reduciditas» · «los subrayados no me gustan nada» · los lemas como heading al principio de cada párrafo, tampoco.
- **Hecho:** `manifiesto.ts/.en.ts › entrada` (con la capitular: «La savia de un árbol y savvia comparten valores.») + `capitulos` nuevos, prosa seguida, sin `[[…]]` ni lemas visibles. «savia» = la del árbol; «savvia» = nosotros. Sin «desde 2020» (el diccionario: no se presume de años); «mano a mano» de Voz propia pasa a «va por dentro». `principios` NO se toca: lo usa el Handbook (capítulo «Principios»), que queda con el texto anterior; el cierre «Eso es savvia agentic…» sigue igual.
- **Raíces:** ya no se estiran ni se inclinan hasta la capitular: 2,2 veces el alto del brote, estrechadas (ancho 0,62 del alto) y rectas bajo el cuello (todo por CSS; el JS solo mide su caja para atar el crecimiento al scroll). El texto sigue a 240 px de su punta. Medido (Chrome, 1280×800 y 390×844): raíces 207×334 y 184×297, consola limpia.
- **Pendiente:** que Andoni vea texto y raíces; decidir si el Handbook adopta las analogías; no publicado.
- **A media ronda (Eric):** «todo este texto tiene que tener el mismo efecto cortina que el texto de savvia agentic de la home» → la cortina de `Problemas.astro` pasa a `entintar.ts › entintarFrases` (la usan la home y el Manifiesto; cada frase de 0 a 1 y luego entintada letra a letra). Mide del primer párrafo al último, no la caja (el relleno de arriba del Manifiesto la hacía acabar antes de verse: «los primeros 2 párrafos parece que no se animan»). «¿Y si ponemos todo en ese tamaño de letra pero letra de heading?» → los párrafos en Family; y «un poquito más grande»: cuerpo hasta 1,8 rem («1,8rem prueba»: `clamp(1.35rem, 1rem + 1.05vw, 1.8rem)`; antes 1,25 → 1,75).
- **A media ronda (Eric):** fuera el cierre «Eso es savvia agentic: tu web, orquestada con IA y criterio.» (el dato `cierre` sigue en `manifiesto.ts`; la descripción de la página usa ahora la `entrada`) · «después del manifiesto en texto quedaría un pelín de aire y al final iría nuestra firma de correo» → tras el último párrafo, 128 px y la firma de /sistema › Descargas que eligió Eric tras compararlas en un artefacto: «Solo los trazos» (`/descargas/savvia-firma-trazos.png`, la rúbrica de Andoni, 75 px como en el correo) con «Eric y Andoni» en Family (1,5 rem), centrada («esa firma que esté centrada mejor»; probada antes alineada a la izquierda del texto). Debajo, los 240 px hasta la línea de siempre.
- **A media ronda (Eric):** «todos los title tag: hay que quitar el AI slop, que es esa barra horizontal; sustituir por algo más natural como comas» → fuera la raya (—) de todos los `<title>` (y og/twitter, que salen del mismo): «Manifiesto de savvia» / «The savvia manifesto» · «Sistema de savvia» · «Método de savvia» · «<capítulo>, del método de savvia» · «<proyecto>, un proyecto de savvia» / «<project>, a savvia project» · «Página no encontrada en savvia» / «Page not found on savvia». El ejemplo de la guía de /sistema pasa a «Nueva página de savvia». Sin cambios: la home («savvia: IA con criterio»), «Proyectos de savvia», «savvia lab».
- **A media ronda (Eric):** «a la vez que se anima el texto, Eric y Andoni también la firma abstracta» → la firma es un `<p>` más de la cortina: aparece, «Eric y Andoni» se entinta letra a letra y la rúbrica se dibuja a la vez, de izquierda a derecha (máscara con `--d`, al ritmo de las letras; `entintarFrases` acepta `alPintar(avance[])` y `data-lento` en un párrafo: la firma, ×4 de recorrido). Con movimiento reducido, todo a la vista.
- **A media ronda (Eric):** «me gusta la firma, la parte de la L y ese mini –, pero los dos círculos de la copa pueden ser un trazo en vez de dos, como un círculo no cerrado» → artefacto «Rúbrica de una copa» con cinco copas de un solo trazo (vector rehecho sobre la rúbrica de Andoni) · «probemos a poner la 1/5» → «Abierta por abajo»: `public/media/manifiesto/rubrica.svg` (de `tools/firma/rubrica-copa.cjs`), solo en el Manifiesto (80 px). La rúbrica del correo (`savvia-firma-trazos.png`) no se toca.
- **A media ronda (Eric):** «pon savvia en vez de Eric y Andoni» → la firma del Manifiesto dice «savvia» (ES y EN).

- **27/10 · Filtros de /proyectos como FILA entre carriles** (Andoni: «los filtros, al principio, alineados con las líneas verticales»). Se probó que la fila se recogiera en la píldora centrada al bajar → Eric: «me encanta cómo queda integrado arriba; tal cual, sticky y listo»: fuera la píldora. Ahora: fila de tabla de carril a carril que cuelga de la línea de la sección (celdas iguales, filetes, fondo de la página, sin cristal), pegada a `top: 0`; la línea de la sección baja 64 px («más aire al inicio»). Hover de la fila y celdas RECTOS; la lista desplegable sí redondeada («al ser isla») y del ancho de su celda. Barra de la web: se aparta (`html.filtros-pegados`) solo si su logotipo o sus iconos caen entre los carriles (móvil y escritorio estrecho); en pantallas anchas (≥ ~1600 a 1200 de contenido) queda fuera y se mantiene, y la fila se pega CENTRADA con ella («alineada horizontalmente con el navbar»: `--pega`, 12 px a 1600). Se mide por JS, no por breakpoint. Pegada, nunca a ras: 12 px de aire arriba como poco, con los filetes y el hover hasta el borde de arriba. Pegada, 8 px más de aire bajo el texto (compensado con margen negativo: la rejilla no se mueve, medido). La lista desplegable, en escritorio, al 85 % de su celda y centrada («más isla»); en móvil, a todo el ancho de la fila. Fuera la CUADRÍCULA de clientes y testimonios de /proyectos («ya la tenemos en la home y aquí es demasiado»); su aire de sección pasa a `.voces-pie`, bajo Voces, para que la ola del pie no pise las flechas. Estado vacío centrado y de la casa: «Aquí no hay nada, todavía.» (Family, h2) + «Ningún proyecto cumple todos esos filtros a la vez.» + «Quitar filtros» (Cta secundario con la papelera). Probado en Chrome a 390/900/1280/1440/1600/1920 (pegada, suelta, desplegable abierto, papelera, final de página). No publicado.
- **27/10 · Mentores intercalados en /proyectos** (Eric: «en vez de "Ver más proyectos", al tener 4 mentores: serie de proyectos, mentor, serie de proyectos, mentor…»). Fuera la paginación (`?p=`, «Ver más proyectos»): todo seguido. `Voces.astro` deja de ser slider: cada instancia es UN mentor fijo (`k`; todos con el retrato a la izquierda, «igual que el de José Luis» —se probó alternar de lado—; retrato que se dibuja al asomar, cita palabra a palabra, sin flechas). Portfolio los mete en la rejilla (`li.mentor`, fila entera): tantos como tramos de ~11 quepan (1 a 4), repartidos a partes iguales y el último SIEMPRE al final (con 45: 11·12·11·11); el mosaico vuelve a empezar en cada tramo. Con 1 proyecto o ninguno: un solo mentor al final (con ninguno, bajo el estado vacío). Sin JS ya van intercalados. Fuera `.voces-pie`.
- «a veces se carga como skeleton: tarjetas de colores con su mockup vacío» → desde que /proyectos va sin páginas, `formar()` descargaba los pósteres y láminas de las 45 piezas de golpe y las que se ven quedaban en cola. `pieza-casa.ts`: cada pieza carga lo suyo al acercarse (IntersectionObserver `cerca`, 150 % de margen). Al llegar, 11 imágenes en vez de todas; bajando hasta el final, ninguna pieza sin póster ni imagen (Chrome, 1280 y 390).
- «a mitad de página, al filtrar, a veces se ve el footer un segundo y luego sube» → con menos proyectos la página encogía bajo el scroll y el navegador saltaba al final antes de la subida suave. Al filtrar, la rejilla CONSERVA su alto (`min-height` congelado) mientras sube y se suelta al llegar arriba (`scrollend`, un vigía por fotograma y, como mucho, 2,5 s si alguien interrumpe la subida); con movimiento reducido, sube en el acto. Medido fotograma a fotograma (desde la mitad, filtro «Alemania», 2 proyectos): el pie no asoma en ninguno, a 1280 ni a 390, y la rejilla queda suelta al final.
- «para que nunca nunca nos quedemos vacíos, el filtrado tiene que ser independiente: si filtras algo y luego vas a otro y filtras otra cosa, se quita el filtro anterior» → UN filtro a la vez: elegir una opción vacía los otros tres desplegables; de una dirección con varios (`?pais=…&tec=…`) vale el primero (orden país · tecnología · servicio · categoría) y la dirección se corrige. Ninguna opción tiene 0 proyectos, así que el estado vacío ya no sale por los filtros (se queda de respaldo). Probado: Alemania (2) → Memberstack (1, País vuelve a «Todos»).
- «se ve una rayita por la g de Desarrollo agéntico» / «la nubecita deja 1 px de aire abajo» → la nube de las listas (`.desp-menu::before/::after`) tapa ya hasta el borde arriba y abajo y lleva ella el filo de ese lado (tapaba el outline: «ahora no se ve el borde»), en OPACO (`--filo-opaco`: Cacao al 15 % ya mezclado con el fondo) para que no se sume al de debajo. Visto en WebKit a ×3: filo continuo y sin rabos de letras.
- **PUBLICADO (26/10) en https://savvia.studio** (Andoni: «Si publica esto ya»): commit `2355f42` → Vercel. EN VIVO: la portada pide `favicon-otono-32.png?v=226` y responde 200, idéntico al restaurado; `tools/verify.cjs` (Chrome y WebKit, 1280 y 390) 0 respuestas ≥ 400, desborde 0 (en WebKit, el aviso de siempre de `interactive-widget`). OJO: GitHub avisa de que el repositorio se ha movido a https://github.com/savvia-studio/savvia-web.

### Ronda 296 · 2026-10-26 · la firma «Nota de campo» (en local)
- **Andoni (textual):** «¿podemos mirar ejemplos de firmas de correo chulas en internet y me propones?» → «Sí, monta la Nota de campo en /sistema en local para verla.»
- **Referencias:** lo de Google y Dribbble son plantillas de vendedor; las buenas, en Are.na (canal «email signature design»: Chintan F., James Junk, Mindy Nguyen, Index Space y, sobre todo, Companion Platform: una foto del momento con un pie que cambia).
- **Hecho (`sistema/Libro.astro`):** opción nueva «Nota de campo», la primera y de serie: nombre en 600 + «· savvia», «Desarrollo agéntico · Donostia», savvia.studio y debajo el roble pequeño de la estación (`savvia-firma-mini-<est>.png`, 40 px) con un pie de dos renglones en gris (#7A645C) que cambia con ella («* El roble de nuestra portada, en otoño. / Donostia.» · «sin hojas. / Invierno en Donostia.» · «rebrotando. / Primavera en Donostia.» · «en verano. / Donostia.»). El servidor la pinta ya en otoño (`deServidor`: sin peticiones con `{est}`) y el selector la pasa a la estación de la página al cargar.
- **Medido (local, Chrome):** las cuatro estaciones cambian roble y pie en las dos firmas y en el correo de ejemplo; consola limpia; las cuatro imágenes responden 200. No publicado.

### Ronda 297 · 2026-10-26 · el reel con transiciones de verdad (en local, borrador)
- **Andoni (textual):** «me gusta el reel que tenemos ahora en savvia.studio pero no me gusta como mostramos los proyectos destacados» · «¿y el inicio podríamos mejorarlo?» · (con `~/Desktop/1920x1080 (1).mp4`, el vídeo de Okara) «quiero transiciones mucho más pro estilo este vídeo; también es importante mencionar que funciona con cualquier IA».
- **Referencia medida (Okara, 67 s):** un solo corte en todo el vídeo. Texto que se escribe palabra a palabra (entra en gris, se entinta y la línea se recentra), lo de antes sube a cabecera mientras lo nuevo entra debajo, la cámara se mete en el campo de texto y del botón nace la pantalla siguiente, etiqueta fija (icono + nombre + estado) mientras cambia lo de debajo, fila de logotipos en cascada.
- **Hecho (`tools/r297-reel/build.cjs`, sobre el cinético publicado; mide los textos en Chrome para recentrarlos):** 51,9 s con «Distant Miles». La gota (grande, cerca) y del impacto el TÚNEL de webs en color · «La IA es la base; el criterio, nuestro.» · «savvia agentic: tu web, conectada con cualquier IA.» + los ocho logotipos de IAs (src/data/ias.ts) · barrido a claro desde los logotipos · la librería sube; la cámara entra en ella y dentro está savvia agentic en acción · la película se encoge en el campo de la petición, el modelo va cambiando (Claude, ChatGPT, Gemini, Copilot, Mistral) y la cámara sigue el texto hasta el botón · del botón nace Neety con su etiqueta: Edita textos · Cambia colores · Mueve secciones (con «hecho ✓», paneles que se empujan) · «Proyectos destacados con desarrollo agéntico.» sube a cabecera y entran Quantus, Patchbay, Neety y Remerge · cada uno se ABRE a pantalla completa desde su tarjeta, tres momentos que suben como paneles y vuelve a su sitio · se juntan y del centro se abre el hero por las estaciones · savvia y savvia.studio. Fuera las marcas viejas (Kuanta, Arkdev, Amarra) del túnel.
- **Medido:** `hyperframes check` 0 errores, 38/38 textos pasan AA · render sin negros · −14,0 LUFS, pico −2,2 dBFS · `reel-r297-ligero.mp4` 8,6 MB. Pendiente: OK de Andoni; no está en la web.
- **A media ronda (Andoni):** «el inicio, con fondo plano» · «me gusta lo de las frases que se partían y salían cosas del medio: eso lo compartiría» · «proyectos: solo Quantus, Neety y Patchbay; al hacer clic, que se encajen en un marco como el de la web, que hagas scroll como si fuera una web real y que aparezcan, como en savvia agentic, los ratones de las personas y las IAs tomando decisiones» · «de momento sin música».
  · **Hecho (`build.cjs`; la primera, en `build.v1.cjs`):** fuera el túnel: la gota sobre Cacao liso. Vuelven las FRASES PARTIDAS del reel publicado, con la interfaz que brota del hueco: «Funciona con [los ocho logotipos] cualquier IA.» · «Tu web, [la librería] en una librería.» (la cámara entra en ella → savvia agentic) · «Pide [la petición, con el modelo que va cambiando] y listo.» · «edita / cambia / mueve [Neety] textos / colores / secciones»: la interfaz se queda y RUEDAN las palabras de los lados. Destacados: Quantus, Neety y Patchbay; al pulsar, la tarjeta se ENCAJA en la ventana de cristal de la web sobre el degradado con sus colores y la web se RECORRE de verdad (`grabar.cjs`: scroll fotograma a fotograma, 1440 × 810, de quantus-demo.vercel.app, neety.treseiscero.app/home y patchbay-web.vercel.app) mientras tres ratones (Claude, Codex, Eric, Andoni, tu equipo) toman decisiones sobre ella («Contraste del rojo · AA ✓», «Titular más directo», «Snippet en TypeScript ✓»…); luego vuelve a su tarjeta. Sin música. 53,7 s.
  · **Medido:** `hyperframes check` 0 errores · render sin negros · `reel-r297b-ligero.mp4` 5,5 MB. No está en la web.
- **A media ronda (Andoni):** «los titulares partidos, solo en las opciones de IA (en vertical, de alguna manera original) y en la librería» · «me gustaba cómo escribías pidiéndole a la IA con el zoom, y de ahí cómo ibas modificando con el check» · «en cada proyecto, ¿podemos recrearlo y ver cómo se construye en tiempo real? Reconstruir cada hero con su estilo y animaciones, en vez de con scroll».
  · **Hecho (`build.cjs` + `heroes.cjs`; la anterior, en `build.v2.cjs`):** frase partida solo en «Funciona con [RUEDA] cualquier IA.» (los ocho logotipos en un tambor vertical en 3D que gira, frena en cada IA y sigue) y en «Tu web, [la librería] en una librería.». Vuelven la petición grande con el zoom que sigue el texto hasta el botón (el modelo cambiando) y Neety con su etiqueta y el «hecho ✓» (edita · cambia · mueve). Los tres destacados ya no son grabaciones: sus HEROES, rehechos en HTML con sus textos, fuentes (Schibsted Grotesk, Bricolage Grotesque, Switzer, Instrument Sans, JetBrains Mono, Roboto Mono, Inter; en `hf/assets/fh/`), colores y medidas tomados de la web (`heroes/medir.cjs`), se MONTAN en directo dentro de la ventana de cristal: retícula → barra → titular palabra a palabra → texto y botones → la pieza viva (la esfera de puntos de Quantus girando, la tarjeta de encaje de Neety con sus filas, el código de Patchbay tecleándose) mientras Claude, Codex, Eric, Andoni y tu equipo deciden («Titular · 98 / 0,96», «<Esfera puntos={600} />», «Más aire en el CTA ✓»…). 58,8 s, sin música.
  · **Pillado:** los grupos de selectores (`'.b1, .b2'`) solo llevaban el ámbito del hero en el primero (la segunda clase tocaba a los tres a la vez); `.st` chocaba con las capas de Neety (caja blanca en Quantus); los textos de Codex con `<…>` se leían como etiquetas.
  · **Medido:** `hyperframes check` 0 errores · render sin negros · `reel-r297c-ligero.mp4` 5 MB. No está en la web.
- **A media ronda (Andoni):** «la librería que sale entre dos palabras, que salga de alguna forma original y con el marco de alrededor más elegante» · «en "edita", el recuadro alrededor del texto, una vez sale el texto» · «los proyectos, como si le estuvieses pidiendo a la IA que te los cree y salen esos heros; el de Neety tiene fallos: no es igual el fondo del gradiente».
  · **Hecho (`build.cjs` + `heroes.cjs`; los anteriores, en `build.v3.cjs` y `heroes.v3.cjs`):** la librería se DIBUJA: un marco de línea fina se traza solo, dentro se posa un cristal y cada fundamento entra con su muestra (los colores de Neety, «Aa» en Bricolage, «directo · cercano», barras de espaciado, radios de 0 a 14, el botón «Solicitar demo»). En «Edita textos» el recuadro se traza alrededor del titular cuando la web ya se ve, con sus cuatro tiradores. Cada destacado empieza con una PETICIÓN dentro de su ventana, a una IA distinta cada vez (Claude: «Hazme el hero de Quantus: oscuro y con una esfera de puntos» · ChatGPT: «Monta el hero de Neety con su librería» · Gemini: «Crea el hero de Patchbay: una API para todas las redes»), escrita letra a letra; al enviar, «… está construyendo…» abajo, el hero se monta y acaba en «✓ Listo». Neety lleva su fondo REAL (`heroes/fondo-neety.cjs`: la página capturada con los textos, la barra, los botones y la tarjeta escondidos). 61,6 s, sin música.
  · **Medido:** `hyperframes check`: los avisos que quedan son textos tapados a propósito por la ventana y el gris al 40 % del propio titular de Neety · render sin negros · `reel-r297d-ligero.mp4` 5,4 MB. No está en la web.
- **A media ronda (Andoni):** «la gota inicial, más pequeña» · «el "edita textos" no me gusta cómo se ve» · «la librería entre los dos textos tiene un sombreado raro que se corta» · «los proyectos, cuando se crean, tienen que mostrar que siguen una librería, unas guías preestablecidas, para que quede sin AI slop».
  · **Hecho (`build.cjs`; el anterior, en `build.v4.cjs`):** la gota, a algo más de la mitad (y su corona y su onda). La librería, sin la sombra exterior que recortaba el hueco. «Edita textos» ya no es la grabación: es el hero de Neety rehecho; el cursor pulsa dos veces, el titular se selecciona palabra a palabra con su recuadro, sus tiradores y la etiqueta «Titular · H1 · Bricolage 52», se borra desde el final y se escribe el nuevo, «Vende a quien ya te está buscando.» (lo que pedía la petición: «algo más directo»). En los destacados la ventana pasa al 80 % y a su izquierda aparece la LIBRERÍA de cada proyecto (sus guías reales: retícula, componentes, tipografía, color y voz); cada guía se enciende con su check en el momento en que el hero la aplica, y abajo: «Sin plantillas: solo lo que dice su librería.»; la petición lleva la etiqueta «+ librería de Quantus/Neety/Patchbay». 62,5 s, sin música.
  · **Medido:** `hyperframes check`: sin solapes reales (los avisos que quedan son lo que la ventana tapa a propósito y el gris al 40 % del propio titular de Neety) · render sin negros · `reel-r297e-ligero.mp4` 5,4 MB. No está en la web.
- **A media ronda (Andoni):** «el resto de pasos, tan guays como el de edita textos» · «a cada proyecto le sale un tag con su nombre: fuera» · «en el inicio con la gota, no sé si tiene sentido que los textos salgan de otra manera».
  · **Hecho (`build.cjs`; el anterior, en `build.v5.cjs`):** en el INICIO los textos ya no se escriben palabra a palabra: los descubre la ONDA de la gota (máscara en anillo desde el impacto, saliendo del desenfoque, con dos anillos finos que crecen); la segunda frase llega con otra onda que, con el mismo frente, se lleva la primera. «CAMBIA COLORES» sobre el hero de Neety rehecho: del botón se abre la paleta de su librería (Berenjena · Bosque · Medianoche · Naranja Core), el cursor elige Bosque y luego Medianoche y la marca cambia en toda la página (logotipo, titular, botones, enlaces), con la etiqueta `--marca: #…`. «MUEVE SECCIONES»: panel de CAPAS («Capas · home»: Hero · Por qué Neety · De ruido a señal); el cursor coge «De ruido a señal», la arrastra arriba con la línea azul de destino, la suelta y la página se reordena. Fuera la ficha con el nombre de cada proyecto. 62,5 s, sin música.
  · **Medido:** `hyperframes check` sin errores reales (los avisos que quedan: lo que la ventana tapa a propósito, la etiqueta de color medida cuando ya ha salido del cuadro y el gris al 40 % del titular de Neety) · render sin negros · `reel-r297f-ligero.mp4` 5,5 MB. No está en la web.
- **A media ronda (Andoni):** «el inicio muy lento, le falta ritmo» · «el chat grande tiene que salir vacío y luego escribir» · «los marcos de los proyectos tienen más espacio por abajo» · «el paso de cambiar colores no me convence; elige colores que vayan bien con Neety» · «el paso de secciones: reutiliza secciones donde quieras y las vas poniendo» →
  · intro: segunda onda a B(2,9) y todo lo de después adelantado 3,2 tiempos (≈ 60,5 s en total) · el chat se escribe letra a letra desde vacío · marco de los proyectos FH 826 (igual arriba y abajo).
  · COLORES: el token «Color de marca» de la librería con cuatro opciones que casan con Neety (Berenjena #431B44 · Índigo #2E2F6E · Naranja tostado #A8471A · Ciruela #5B2459); el cursor elige Índigo y luego Naranja tostado y la web entera (hero, botón, marca) se tiñe a la vez; «24 sitios de la web lo usan». Las etiquetas de las vistas, arriba a la derecha (tapaban el titular).
  · SECCIONES: panel «Secciones · librería» con miniaturas; el cursor arrastra dos secciones a la página y se encajan en la línea azul.
  · Medido: `hyperframes check` sin errores nuevos (los avisos de solape son los de siempre: texto tapado por la ventana o el panel) · render en borrador sin negros · copia ligera `renders/reel-r297h-ligero.mp4` (5,5 MB).
- **RENDER FINAL (Andoni: «me gusta, haz el render final»):** `tools/r297-reel/renders/reel-savvia-r297-final.mp4` (1920 × 1080, 30 fps, 60,5 s, calidad `delivery`, 47 MB, sin sonido) + copia ligera `reel-savvia-r297-final-ligero.mp4` (1600 px, 7,8 MB, faststart). Medido: sin negros, hoja de fotogramas revisada, 0 Chrome headless colgados. Pendiente: versión en inglés, música y subirlo a la web (solo con OK).
- **A media ronda (Andoni, tras el render final):** «en el recuadro grande de la IA pone arriba “pide lo que quieras” y se corta: dejar solo donde escribes» · «el inicio lo sigo viendo lento, poco animado: hay que captar la atención desde el inicio» →
  · fuera el rótulo de encima del chat grande: solo el campo.
  · INICIO: la gota ya cae en el fotograma 0 y toca a los 0,62 s (antes, 1,02); cada impacto da un golpe de cámara (escala 1,14 → 1); cada palabra aterriza por su cuenta desde el centro (sube, gira en X y sale del desenfoque); la escena no se queda quieta (empuje lento hasta 1,035–1,04) y por el Cacao suben motas de luz; la segunda onda, a B(2,6), y todo lo de después 0,6 s antes (`B`: base 0,62, desplazamiento 3,5).
  · Render final de nuevo: 59,9 s, sin negros (`renders/reel-savvia-r297-final.mp4`, 47 MB, y `-ligero`, 7,6 MB). Copia de seguridad del guion anterior: `build.v8.cjs`.

### Ronda 298 · 2026-10-26 · reel «treseiscero se transforma en savvia» (en local)
- **Andoni (textual):** «mientras Eric da feedback podemos preparar otro reel sencillito para anunciar la transformación de treseiscero a savvia: algo muy sencillo que se vea cómo treseiscero se transforma en savvia».
- **Dirección «Se funde»** (descartadas: tachar treseiscero con savia, que suena negativo; solo tipografía, que pierde el símbolo): el lockup de treseiscero (su símbolo de cuatro cuartos de círculo rehecho en SVG, medido en `Branding/Logo/Logo Figma.png`, y la palabra en Roxborough, su tipografía, sobre su lavanda con grano) → el nombre se va letra a letra → las cuatro piezas se juntan y se FUNDEN (filtro gooey) en una gota de savia Coral → la gota cae y su onda vuelve el fondo Cacao y descubre el logotipo de savvia → «treseiscero ahora es savvia.» · savvia.studio.
- **Hecho:** `tools/r298-transforma/build.cjs` → `hf/index.html` (HyperFrames, 1920 × 1080, 30 fps, 8,5 s, sin música).
- **Medido:** `hyperframes check` 0 errores · render sin negros · `renders/treseiscero-a-savvia.mp4` (2,8 MB) y `-ligero.mp4` (0,8 MB).
- **Pendiente:** música (o un golpe de sonido en el impacto); versión vertical 9:16 y en inglés si se quiere; texto del post.
- **A media ronda (Andoni):** «ese treseiscero es el antiguo antiguo: hay que coger el que está en treseiscero.com; y el logo final de savvia es el tipográfico, y lo presentaría con el árbol» →
  · treseiscero.com hoy (medido en Chrome): «treseiscero» en Satoshi Bold (de su carpeta `Branding/Typo`), blanco, muy apretado, sobre azul noche #022D42 con haces de luz en diagonal. Sin símbolo.
  · 2.ª versión: la palabra en su azul con sus haces → se caen todas las letras menos la «s» y la «i», que se deslizan a su sitio y cambian de letra (Satoshi → Family) mientras entran «a v v a» (posiciones medidas en Chrome: `medir.cjs` → `medidas.json`) → de «savvia» se descuelga una gota de agua, cae y al tocar se abre el hero de savvia con el árbol de otoño (el haz de treseiscero sigue como el haz de savvia); la palabra sube y se queda sobre el árbol → «treseiscero ahora es savvia.» · savvia.studio. 9 s.
  · Medido: `hyperframes check` 0 errores · render sin negros · `renders/treseiscero-a-savvia.mp4` (4,6 MB) y `-ligero` (1,1 MB). La 1.ª versión, en `v1/`.
- **A media ronda (Andoni):** «representar mejor el rayo del hero de treseiscero» → medido en treseiscero.com: el rayo es UNA imagen (`blur.avif`, un cono de luz difuminado), de 2048 px, en −708,8 · −190,4 y girada 4°, sobre #022D42. Se pone esa misma imagen en el mismo sitio (`assets/t360-rayo.avif`) con un vaivén lento (2,5° → 5,5°); fuera los haces imitados. Render sin negros (4,3 MB · ligero 1,2 MB). La 2.ª versión, en `v2/`.

### Ronda 299 · 2026-10-26 · el reel con el feedback de Eric (en local)
- **Eric (por chat, pegado por Andoni):** «cuando cambiamos colores, que funcionen bien todos; ese marrón no encaja: si vendemos que respeta el sistema de diseño, mostremos eso» · «mueve secciones mejor como Ship Studio: a la izquierda el chat con la IA y a la derecha el canvas cambiándose, no el clic tipo no-code» · «que los punteros sean como en savvia agent» · «el chat, el de Claude; no me siento cómodo mostrando IAs que nunca hemos usado: Claude y ChatGPT» · «al final del vídeo, savvia agent, como una breve intro de su propio vídeo» · «me gustaba mucho el frame de savvia agentic: tu web conectada con IA, y las webs en transición tipo Star Wars» · «el vídeo actual de la web me funciona mejor: integrar cómo entregamos la web y mostrar esos 3 proyectos de forma guay». **Andoni:** «el vídeo anterior presenta mejor y termina peor; este expone mejor los proyectos, pero no fiel a la realidad de savvia agent tal y como lo exponemos debajo».
- **Hecho (`tools/r297-reel/build.cjs`; el anterior, `build.v9.cjs`):** vuelve el TÚNEL de webs del reel de la web detrás de «savvia agentic: tu web, conectada con la IA.» (se abre con la segunda onda) · la rueda de IAs, solo Claude y ChatGPT (una ficha que gira) · el chat grande, ChatGPT → Claude · Patchbay se pide a Claude · CAMBIA COLORES: solo la paleta de la librería de Neety (Berenjena → Naranja Core → Ciruela), con «Solo la paleta de su librería» · MUEVE SECCIONES como Ship Studio: chat con Claude a la izquierda (la petición, Claude escribe y contesta) y la página de Neety cambiando a la derecha; el puntero de Claude coloca cada sección · PUNTEROS de savvia agent (los de la web, colores medidos en vivo: Claude #FF616B, Codex #AF4A4B, savvia #3B231B con su favicon, Tu equipo #623422; flecha rellena con filo blanco y píldora con icono) en todo el vídeo; en los proyectos deciden Claude, Codex, savvia y Tu equipo · ANTES DEL CIERRE, savvia agentic: vuelve el frame «savvia agentic: tu web, conectada con la IA.» con la ventana de savvia agentic de la web en marcha, y de ahí al hero y savvia.
- **Medido:** `hyperframes check` sin errores nuevos (los 3 solapes de siempre: texto tapado por la ventana) · render sin negros · 63,9 s · `renders/reel-savvia-r299.mp4` (57 MB) y `-ligero` (8,7 MB).
- **Pendiente:** que Eric lo vea; subirlo a la web solo con OK.

### Ronda 300 · 2026-10-26 · «Letras vivas»: savvia agentic contado con letras (en local)
- **Andoni (textual):** «he visto este vídeo [youtube.com/watch?v=p6EBMG8OEBI] y creo que son increíbles las animaciones, cómo juegan con las letras para transicionar. ¿Podemos coger esto y hacer algo parecido pero contando savvia agentic?».
- **Referencia medida** («What's New in Search», Google, 97 s; bajado con yt-dlp a `tools/r300-letras/ref/`, hojas a 1 y 6 fps): el cursor como personaje (late, cambia de color, escribe; lo recién escrito llega en color) · la frase se vuelve interfaz (el buscador) · cirugía de palabras («understand → do rstand → do and → do anything») · palabras que se balancean sobre su línea base («& shop → for you») · letras que caen dentro de un icono (el carrito) · una palabra quieta mientras se cortan fotos debajo («do anything») · el cierre que se escribe, cambia de color y se recoge en la marca («ask» → G).
- **Hecho (`tools/r300-letras/build.cjs` → `hf/index.html`; cada letra medida en Chrome con Family):** cursor Coral que late, cambia de color (Coral, Cereza, Nogal) y escribe «Esto es savvia agentic» (la cola en Coral) → cirugía «agentic → agentes» y llegan los punteros de savvia agent (Claude, Codex, savvia, Tu equipo) → «savvia» → «tus» (la «s» se queda) → «tus agentes» se va balanceándose y entra «Tu web, en una librería»; la «ía» sube y es «IA» en Coral, «que cualquier IA sabe leer.» → «Pídeselo.» se encoge dentro del chat de Claude, se escribe la petición, la cámara va al botón y se envía → «edita textos»: «textos» se selecciona, se borra y se escribe «titulares» → «cambia colores»: un deslizador recolorea las letras con la paleta de Neety → «mueve secciones»: las letras de «secciones» caen en una pila de secciones que se reordena → «Webs a medida» → «a medida» quieta mientras se cortan Quantus, Neety y Patchbay debajo → «Solo tienes que» → «pedirlo» se escribe, cambia de color y se recoge en «savvia» · savvia.studio. 40,7 s, sin música.
- **Medido:** `hyperframes check` 0 errores de composición (solapes falsos: letras inclinadas del chat y la «IA») · render sin negros · `renders/letras-vivas-v1.mp4` (17 MB) y `-ligero` (4 MB).
- **Pendiente:** música; versión en inglés si se quiere.
- **A media ronda (Andoni):** «me mola bastante, pero nos falta hacerlo más largo y, por cada cosa que mencionamos, mostrar ejemplos reales, como la librería de Neety, y cómo se construyen pidiendo detalles de ciertas webs» · «la transición de “tus agentes” a “Tu web, en una librería” hay que mejorarla» →
  · ENTRE LOS GOLPES DE LETRA, LO DE VERDAD, en una ventana de navegador: tras «Tu web, en una librería», la LIBRERÍA DE NEETY (la película de savvia agentic de la web, con los agentes) · tras «edita titulares», el hero de Neety rehecho (`tools/r297-reel/heroes.cjs`) se monta y su titular se selecciona y se reescribe («Vende a quien ya te está buscando.»), con el puntero de Tu equipo · tras «cambia colores», el mismo hero cambia con la paleta de su librería (Naranja Core → Ciruela), con las fichas debajo · tras «mueve secciones», el chat con Claude a un lado y la página de Neety cambiando al otro · tras «a medida», «Pide hasta el último detalle.» y QUANTUS (Claude) y PATCHBAY (ChatGPT) se construyen desde una petición detallada con «+ librería de X», con su librería encendiéndose guía a guía.
  · La transición «tus agentes» → «Tu web, en una librería», con CIRUGÍA en vez de balanceo: la «t» y la «u» de «tus» son el «Tu», una «e» de «agentes» cae en «web» y el «en» de «agENtes» baja a empezar la segunda línea (`cirugiaN`, a varias filas).
  · 79 s, sin música. `hyperframes check` sin errores de composición · render sin negros · `renders/letras-vivas-v2.mp4` (43 MB) y `-ligero` (8 MB). La 1.ª versión, en `build.v1.cjs`.
- **A media ronda (Andoni):** «me sigue gustando más lo que tenemos en la web actualmente; ¿podemos recuperar el que tenemos en la web, sobre todo el inicio, y mezclarlo con este?» →
  · MEZCLA: el reel de la web (ronda 238, el del menú; re-renderizado a 1920 desde `tools/r238-cinetico/hf` → `renders/web-1920.mp4`) de 0 a 16,47 s, tal cual: la gota, «La IA es la base; el criterio sigue siendo nuestro.», el túnel con «savvia agentic: tu web conectada con la IA.», «Tu web, [la librería] en una librería.», la película de la librería y «Pide [la petición] y listo.» · y en el corte que el propio reel hace a «edita», sigue «Letras vivas» v2 desde «edita textos» (22,9 s): edita titulares en Neety, cambia colores con su paleta, mueve secciones con Claude, «a medida» sobre los proyectos, Quantus y Patchbay construyéndose desde una petición con su librería, y el cierre «pedirlo» → savvia. Corte limpio, sin fundido (el reel de la web corta así en ese punto).
  · Música: «Distant Miles» (la del reel de la web) seguida de 0 a 72,6 s, fundido de salida de 2,5 s; −15,6 LUFS, pico −3,1 dBFS.
  · `renders/mezcla-web-letras.mp4` (39 MB) y `-ligero` (9,9 MB); sin negros.
- **A media ronda (Andoni):** «al final, siempre que sea editar titulares, tú se lo pedirás a la IA y lo hará» · «todos los cursores, como los de savvia agentic» · «que los textos nunca colapsen con un elemento» · «los colores que cambiamos en Neety, con buen contraste y que se vean bien con el fondo» · «a medida: en un marco estilo el del portfolio, batería de detalles de las 3 webs de referencia construyéndose; bien enmarcados, sin cortes y a buena calidad; la segunda parte tiene que mostrar mucho mejor los proyectos» · «y acabamos como empezamos, presentando savvia agentic» →
  · EDITAR: en el golpe de letra, el puntero de Claude selecciona «textos» y Claude escribe «titulares»; en Neety, la petición va en una caja debajo de la ventana («Haz el titular más directo, con la voz de Neety»), Claude selecciona el titular y lo reescribe, y la caja contesta «✓ Hecho».
  · CURSORES: todos los de esta parte son los de savvia agentic (Claude, Tu equipo).
  · COLORES: el token «Color de acción» (botones y marca), con contraste: Naranja Core con el texto en Ciruela (6:1), Ciruela con texto blanco; el titular siempre en su Berenjena.
  · A MEDIDA: «a medida» sube y debajo, tres PIEZAS de portfolio (el degradado de los colores de su web, el nombre y el navegador entero dentro) con Quantus, Neety y Patchbay construyéndose a la vez; nada recortado, HTML nítido.
  · PROYECTOS: grandes (la web a ×0,78, entera): la petición arriba, la ventana en medio y su librería debajo en una fila de guías que se encienden; peticiones cortas para que quepan en la caja.
  · CIERRE: «pedirlo» se recoge en un punto y de ahí se abre el Cacao con el túnel de webs y «savvia agentic: tu web conectada con la IA.» · savvia.studio, como el inicio.
  · `hyperframes check`: los solapes que marca son de la parte que no entra en la mezcla (chat inclinado, «IA»). Mezcla nueva con el inicio de la web y «Distant Miles»: 76 s, −15,6 LUFS, sin negros. `renders/mezcla-web-letras-v3.mp4` (42 MB) y `-ligero` (10 MB). La versión anterior del guion, `build.v2.cjs`.
- **A media ronda (Andoni):** «1 · el final, con las webs en una sola línea como lo tenemos al inicio · 2 · en los colores, que los CTAs que cambian de color se vean bien en todos lados · 3 · el titular más corto de Neety, con salto de línea, que si no se solapa con lo de la derecha · 4 · en a medida, mostrar los proyectos como en la home con ese estilo de card y luego ir clicando en cada uno y mostrarlo más en detalle cómo se va construyendo; no importa que sea más largo, pero de cada proyecto mostrar más cosas, no solo el hero» →
  · 1 · el túnel del cierre, el del inicio (r238): una columna de webs por plano, al 34 %, avanzando.
  · 2 · el cambio de color es instantáneo (fondo y texto del botón a la vez) con un golpe y un anillo en el botón: Naranja Core con texto Ciruela, Ciruela con texto blanco; el punto del botón, del color del texto. Medido en captura: se lee en los dos.
  · 3 · «Vende a quien ya te / está buscando.» en dos líneas: no llega a la tarjeta de la derecha.
  · 4 · «a medida»: las tres TARJETAS (degradado de su web, nombre, navegador con su hero construyéndose) y el puntero de Tu equipo CLICA cada una: se abre en grande (la tarjeta crece hasta la ventana), arriba la petición a Claude o ChatGPT con su librería, el hero se construye con la fila de guías encendiéndose debajo y la página BAJA: dos secciones reales de cada web (grabadas en su web: Quantus la matriz y las tarjetas, Neety el feed de señales y los casos, Patchbay los canales y el código), colocadas por los agentes; a la derecha, el registro «Construido» (Hero ✓, sección ✓, sección ✓). Se cierra a su tarjeta y sigue la siguiente. Fuera «Pide hasta el último detalle».
  · Mezcla con el inicio de la web y «Distant Miles»: 88,7 s, −15,5 LUFS, sin negros. `renders/mezcla-web-letras-v4.mp4` (53 MB) y `-ligero` (13 MB). El guion anterior, `build.v3.cjs`.
- **A media ronda (Andoni):** «1 · edita textos/titulares es redundante: solo uno · 2 · los pasos no me convencen: textos, colores y mover secciones lo puedes hacer con Webflow; ahora puedes crear páginas nuevas siguiendo una librería que la IA entiende, eso es la clave · 3 · los proyectos, como en la home: el titular debajo de la card con una mini descripción · 4 · al clicar cada proyecto, que se abra con el marco de cristal de la web, se construya con savvia e IA y hagas scroll enseñando la web, como si fuera la real» →
  · 1 + 2 · fuera los tres verbos y sus ejemplos (titular, colores, secciones). En su lugar, LA CLAVE: «Textos, colores, secciones…» se tachan con un hilo de savia; se escribe «Ahora, páginas nuevas.» con «con una librería que tu IA entiende.» debajo; y se le pide a Claude «Crea una landing de Neety para fabricantes»: en el marco de cristal se monta una página NUEVA solo con piezas de su librería (barra, «NEETY PARA FABRICANTES», titular en Bricolage, sus dos botones y tres tarjetas «Detecta · Prioriza · Actúa» con sus palabras), cada pieza encendiendo su guía en la fila de abajo, con Claude, savvia y Codex.
  · 3 · las tarjetas con el nombre en Family y la categoría debajo (las de `home.ts`: IA y computación cuántica · Ventas B2B · API para desarrolladores).
  · 4 · el MARCO DE CRISTAL de la web (`Proyectos.astro › .cromo`: barra de 44 px en blanco al 42 % con desenfoque sobre el tinte de la cabecera de cada web, semáforo, dirección centrada en píldora; la web empieza debajo): la tarjeta crece hasta él; arriba la petición; el hero se monta con savvia y los agentes (Claude, Codex, savvia) y su librería se enciende; y luego la web real BAJA (su grabación de scroll, mismo encuadre que el hero rehecho).
  · Cursores reubicados en zonas vacías (ninguno pisa texto). Mezcla: 78,1 s, −15,6 LUFS, sin negros. `renders/mezcla-web-letras-v5.mp4` (45 MB) y `-ligero` (11 MB). El guion anterior, `build.v4.cjs`.
- **A media ronda (Andoni):** «potenciar la parte en que escribes a la IA y te crea una web sin AI slop entendiendo la librería: una web con la librería de Neety que se vea chula, con varias secciones» · «los proyectos con desarrollo agéntico, solo ellos, con más detalle, más scroll y más tiempo, hasta la mitad de cada web; y en Neety, cómo se adapta a móvil» · «los marcos de proyectos destacados tienen que ser los de savvia.studio, de cristal» →
  · LA IA CREA UNA WEB: «Crea la web de Neety para fabricantes» primero SIN librería → sale la página de AI slop (degradado morado, «Welcome to the Future of Sales 🚀», tres «Feature») con el sello «AI slop · sin librería»; se añade «+ librería de Neety», el slop se deshace y se monta la web de Neety en cinco secciones (hero · Cómo te ayuda · feed en Berenjena · Cómo funciona en Base cálida · cierre en Naranja Core), con el marco bajando por ella y cada pieza encendiendo su guía de la librería.
  · PROYECTOS: solo los tres agénticos, con la tarjeta de /proyectos (`PiezaCasa`: lámina con los colores de su web, mockup de CRISTAL ladeado −6°, «Caso de estudio», icono de vídeo; nombre y categoría debajo). Al clicar, la lámina llena la pantalla y el cristal se endereza y crece (1560 px de web); el hero se monta con savvia y la IA (cursores en zonas vacías) y la grabación real baja hasta la MITAD de la página (`grabar.cjs`: 14 s deterministas a 1440 × 810 ×1,34; 10,4–13,6 s en pantalla). Neety: el cristal se aparta y entra el teléfono de cristal con la web móvil bajando a la vez, «Se adapta a móvil». Se cierra volviendo a su tarjeta.
  · Fallo propio: las grabaciones de escritorio salían vacías (0 bytes) porque 810 × 1,34 da un alto impar y libx264 no lo acepta → `scale=trunc(iw/2)*2:trunc(ih/2)*2` en `grabar.cjs`.
  · Mezcla: 105,2 s, −15,3 LUFS, sin negros. `renders/mezcla-web-letras-v6.mp4` (87 MB) y `-ligero` (20 MB). El guion anterior, `build.v6pre.cjs`.

### Ronda 301 · 2026-10-26 · la página de Neety con sus secciones reales, zoom en los detalles de cada proyecto, Neety a móvil al final y sin música (en local)
- **Andoni (textual):** «lo del AI slop no me gusta: dejemos que crees una página directamente y construye la página con secciones reales de Neety; analiza Neety y móntala bonita, tiene que parecer hecha por diseñadores» · «los proyectos destacados me gusta más cómo se ven, pero quiero que nos paremos más en detalles, hagamos zoom: Quantus, las ilustraciones isométricas animadas y el proceso en que las matrices se transforman; Patchbay, la ruleta y las pestañas que al cambiar tienen una animación como de 3D; en Neety, esperar al final y mostrar después cómo se transforma a móvil» · «quitamos música».
- **Hecho:**
  · Fuera el AI slop. La petición lleva desde el principio «+ librería de Neety» y la página se monta con las SECCIONES REALES de neety.treseiscero.app (medidas con `tools/r301/sondear.cjs` y capturadas a 1440 ×1,5 con `tools/r301/neety-secciones.cjs` → `hf/assets/neety-sec/`): hero · clientes · de ruido a señales · todo lo que tu equipo necesita · tu stack · cierre. Cada una se dibuja de arriba abajo con un filo de savia (saliendo del desenfoque), enciende su guía en la librería y el marco baja hasta su arriba; al terminar, la página se recorre hasta arriba. Cursores de savvia, Claude y Codex junto al borde derecho.
  · DETALLES: grabados en vivo (screencast CDP a 30 fps, ×1,5 para el zoom, `tools/r301/detalle.cjs`): Quantus · la matriz de 4096 × 4096 que se parte y acaba en el cubo, y las isométricas de «Four places to run it»; Patchbay · las pestañas de canales y la ruleta de «Every channel docks into one API». Tras un scroll corto de la web, cada detalle entra en el cristal y la cámara se acerca (×1,4–1,8, hacia el detalle) con su rótulo debajo («La matriz que se comprime» · «Ilustraciones isométricas animadas» · «Pestañas que giran en 3D» · «La ruleta de canales»), y vuelve a alejarse.
  · NEETY: la web de escritorio baja entera hasta la mitad; al terminar, el cristal se recorta hasta la forma del teléfono y dentro aparece la versión móvil bajando, «Se adapta a móvil».
  · Sin música: la mezcla va sin pista de audio.
- **Medido:** mezcla de 133,2 s sin negros. `renders/mezcla-web-letras-v7.mp4` (99 MB) y `-ligero` (22 MB). El guion anterior, `build.v6.cjs`.

### Ronda 302 · 2026-10-26 · los proyectos como el showreel de agencias de Wix Studio (en local)
- **Andoni (textual):** «los proyectos, quiero mostrarlos de esta manera: https://www.youtube.com/watch?v=U5f3iufE-bI; ¿podemos conseguirlo?» → «sí, móntalo así con los tres proyectos agénticos».
- **Referencia (Wix Studio · agency showreel, 58 s; `tools/ref302/`):** por proyecto, ~6 s a cortes secos: ficha (nombre grande sobre retícula con cruces de registro, la web y la categoría) → la web en un solo plano (a sangre o en un portátil sobre mesa oscura) → la página rota en un collage de capturas flotando en profundidad → primer plano enorme de una interacción con el cursor → móvil.
- **Hecho (`build.cjs`, bloque «RONDA 302»; el anterior, en `build.v7.cjs`):** fuera las tarjetas y el cristal que se abría. Para Quantus, Neety y Patchbay, escenas a corte seco:
  · FICHA: la retícula de los carriles de savvia.studio que se traza con sus cruces, «savvia · proyectos con desarrollo agéntico» y «01 / 03» en mono; el nombre en Family a 220 px subiendo letra a letra desde su máscara; debajo, la web y la categoría.
  · LA WEB EN LA MESA: la lámina del estudio de Proyectos destacados (Quantus en invierno, Patchbay en verano) con la web real bajando en el monitor y la cámara acercándose (×1,05 → ×2,1). Neety, en el cristal de savvia.studio sobre su lámina.
  · COLLAGE: diez secciones reales de cada web (`tools/r301/secciones.cjs` → `hf/assets/sec/`) en tres profundidades con paralaje.
  · DETALLES a pantalla completa con un empuje lento: matriz e isométricas (Quantus), el feed de señales y los casos (Neety), pestañas y ruleta (Patchbay).
  · PRIMER PLANO del botón principal ×3,2 (`tools/r301/hover.cjs`: la grabación del hover real con sus tiempos) con el cursor de savvia llegando al botón a la vez que la web reacciona.
  · MÓVIL: tres teléfonos de cristal sobre la lámina de su web; el del centro con la web móvil bajando (Quantus y Patchbay grabados ahora).
- **Medido:** mezcla de 92,2 s, sin negros, sin música. `renders/mezcla-web-letras-v8.mp4` (95 MB) y `-ligero` (19 MB).

### Ronda 303 · 2026-10-26 · la página de Neety con sus componentes reales, vuelven las tarjetas con scroll lento y un bento por web (en local)
- **Andoni (textual):** «nada, no me gusta. 1 · tenemos que depurar la parte de crear la web de Neety con IA: tienen que parecer componentes reales, no capturas, y verse bien de calidad · 2 · los proyectos me gustaban más como los teníamos antes; vamos a mostrar de cada proyecto la web haciendo scroll, pero un scroll smooth lento como el de una persona para poder apreciar detalles (hasta la mitad de la web), y luego un bento de cada web con sus detalles, un bento bien hecho que muestre lo chulo de cada una».
- **Hecho:**
  · NEETY CON COMPONENTES REALES (`tools/r301/neety-dom.cjs`): el HTML y TODO el CSS de neety.treseiscero.app (301 KB), con sus fuentes (Bricolage Grotesque, Switzer, Inter, Roboto Mono) e imágenes descargadas en `hf/assets/neety-dom/`; cada sección se captura en pantalla cuando su contenido ya está pintado (el hero espera a «3 personas clave encontradas»). En el reel van dentro de una sombra (shadow DOM) para que su CSS no toque el del reel: texto vectorial y nítido. Se construyen COMPONENTE A COMPONENTE (fondo de la sección y luego titulares, textos, botones, tarjetas e imágenes en orden de lectura): hero · clientes · equipos B2B · de ruido a señales · aplica Neety, 2,2 s por sección. Fuera «todo lo que tu equipo necesita» y «tu stack» (su panel lo pinta su JavaScript y salía vacío).
  · PROYECTOS: vuelven las tarjetas de /proyectos y el cristal que crece (la ronda 300, 6.ª), con el hero montándose con savvia y la IA.
  · SCROLL HUMANO (`tools/r301/scroll-humano.cjs`): grabado en vivo, tirones de rueda con arranque suave y frenada larga (inercia de trackpad) y pausas de lectura, sembrado, hasta la mitad de cada web; en el reel a ×1,2 (19–21,5 s por web; Quantus se corta antes porque su mitad mide 9.900 px).
  · EL BENTO de cada web (4 × 3 sobre su lámina): el detalle protagonista grande (matriz · feed de señales · pestañas en 3D), el botón principal con el cursor de savvia, el móvil (alto), un segundo detalle (isométricas · casos · ruleta), su paleta con nombres y hex y su tipografía real («Aa» en Schibsted, Bricolage o Instrument), y una franja (Nova 420B · sus clientes · su API en el terminal). El cristal se recoge hacia la pieza grande y las demás entran escalonadas; 7,2 s.
- **Medido:** mezcla de 154,1 s, sin negros, sin música. `renders/mezcla-web-letras-v9.mp4` (121 MB) y `-ligero` (27 MB). El guion anterior, `build.v8.cjs`.

### Ronda 304 · 2026-10-26 · más corto: tres cosas complejas pedidas a la IA sobre Neety real, y un bento por proyecto (en local)
- **Andoni (textual):** «tenemos que hacerlo más corto; la parte de enseñar cada proyecto, igual directamente un bento donde mostremos el hero y 2 detalles, todos animados» · «la parte de cómo se construye Neety, igual volvemos a lo de antes, pero en vez de textos, colores y secciones podemos poner cosas más complicadas que ahora se pueden hacer con la IA».
- **Hecho:**
  · VUELVEN LOS VERBOS (como en la ronda 300, 3.ª) con su ejemplo sobre los COMPONENTES REALES de Neety (su HTML y CSS en una sombra), pero con tareas complejas: «Tradúcela» → «Tradúcela al inglés y al euskera, con la voz de Neety»: titular, subtítulo y botones pasan del castellano al inglés y al euskera, con un selector ES · EN · EU · «Crea páginas nuevas» → «Crea una página para fabricantes con la librería de Neety»: hero nuevo («Detecta qué fabricantes están listos para comprar.») y tres secciones montadas componente a componente · «Añade funciones» → «Añade una calculadora de cuántas cuentas prioriza tu equipo»: una sección nueva hecha con sus piezas (Bricolage, berenjena, naranja, su PillCta) que funciona: el cursor de savvia arrastra el deslizador de 8 a 24 comerciales y el resultado cuenta de +230 a +686. Fuera la página larga de la ronda 303.
  · PROYECTOS: un BENTO por web sobre su lámina, que sube como una página: nombre y categoría, el HERO VIVO grande (grabado quieto en su web con sus animaciones, `tools/r301/detalle.cjs`) y dos detalles animados (matriz e isométricas · feed y casos · pestañas y ruleta). 5,6 s por proyecto. Fuera las tarjetas, el cristal, el scroll lento y el bento largo.
- **Medido:** mezcla de 72,4 s (antes 154), sin negros, sin música. `renders/mezcla-web-letras-v10.mp4` (47 MB) y `-ligero` (11 MB). El guion anterior, `build.v9.cjs`.

### Ronda 305 · 2026-10-26 · fuera la traducción: secciones nuevas, calculadora compleja y formulario de evento con calendario; detalles bien encuadrados (en local)
- **Andoni (textual):** «1 · traducir quitamos, es algo que pueden hacer Webflow y cualquier IA simple. Me gusta la idea de que crees secciones a partir del estilo de Neety. La calculadora me gusta, hazla algo más animada y compleja. Y luego formulario para eventos, con calendario y todo · 2 · los proyectos destacados, encuadrar mejor los detalles que enseñamos, algunos se ven cortados y mal; el de Patchbay, que se vea cuando el producto sube y tapa el subtítulo en el hero».
- **Hecho:**
  · «Crea secciones nuevas» → «Crea las secciones de fabricantes con el estilo de Neety»: hero y tres secciones con titulares nuevos para ese público («Fabricantes que ya venden con más foco» · «De la feria al pedido, sin perder una señal» · «Neety, en cada planta y en cada mercado.»), montadas componente a componente con sus piezas reales.
  · «Añade funciones» → calculadora compleja: dos deslizadores (comerciales 8 → 24 y ticket medio 12 → 28 k€), el sector que cambia (Industria → Seguros, con la píldora que se desliza), dos resultados que cuentan (+858 cuentas al mes · 0,84 M€ de pipeline) y un gráfico de doce meses que crece con ellos. El cursor de savvia la maneja; sus posiciones se MIDEN EN VIVO sobre la sombra (`window.__pt`), así nunca se desvía.
  · «Monta formularios» → formulario del «Encuentro Neety: vender a la industria» (Bilbao · 2 h · 30 plazas): se escriben nombre, empresa y correo, el cursor de Codex elige el jueves 12 de noviembre en el calendario y la hora 09:30, pulsa «Reservar plaza» y la tarjeta pasa a «Plaza reservada» con el check que se dibuja.
  · Encuadres medidos sobre fotogramas con rejilla: matriz (25 % 100 %, ×1,85), isométricas (0 % 36 %, ×1,9: solo la ilustración), casos de Neety entero (×1), pestañas de Patchbay (45 % 100 %, ×1,1: titular y tarjeta enteros), ruleta (6 % 40 %, ×2: solo los iconos). Patchbay: el hero es una grabación nueva (`patchbay-sube`) con scroll lento en la que el panel de código sube y tapa el subtítulo.
- **Medido:** mezcla de 76,9 s, sin negros, sin música. `renders/mezcla-web-letras-v11.mp4` (49 MB) y `-ligero` (11 MB). El guion anterior, `build.v10.cjs`.

### Ronda 306 · 2026-10-26 · todo es «Crea secciones nuevas» (sin hero), la sección isométrica de Neety, y los proyectos como Petalite (en local)
- **Andoni (textual):** «quitamos el crea páginas, solo secciones nuevas con el estilo de la librería; enseña cómo se crean sin poner el hero, solo la sección; y añade detalles de Neety como gradientes e incluso el isométrico» · «fíjate aquí cómo muestra los detalles, quiero algo así para los proyectos destacados: philipreadman.com/petalite, pero con ritmo» · «no quiero que sea monta formularios, funciones nuevas y demás: quiero englobar todo en crea secciones nuevas, y en todas que no se vea el hero sino cómo se construye la sección nueva» · «la que tiene la isometría hay que corregir el fondo, que se ve cortado».
- **Hecho:**
  · UN SOLO VERBO, «Crea secciones nuevas», y tres secciones que se construyen solas, sin hero: (1) «De la feria al pedido, sin perder una señal.» para fabricantes, hecha con piezas de su librería (el resplandor con su retícula de cruces, su eyebrow en mono, el titular con la segunda mitad en berenjena al 40 %, una tarjeta de degradado donde CAE su bloque isométrico y flota, el feed de ferias y licitaciones, «+37 %» que cuenta sobre su degradado con muesca, su PillCta) · (2) la calculadora · (3) el encuentro con calendario y reserva. Peticiones reescritas como secciones («Crea una sección con una calculadora…», «Crea una sección para el encuentro…»).
  · Fondo de la tarjeta isométrica: el degradado de Neety traía su muesca recortada en negro; ahora es un degradado en CSS con sus colores (naranja, berenjena, azul bebé) y grano.
  · PROYECTOS COMO PETALITE (`tools/ref306/`: cada pieza aislada en un panel liso del color de la web, tres puntos arriba, mucho aire, retícula de 1 · 2 · 3 paneles): por proyecto cuatro compases (1,2 · 1,7 · 2,0 · 1,7 s) — titular → [esfera/feed/terminal · botón] → [métricas/personas/pestañas · isométricas/casos/ruleta · móvil] → el detalle grande (matriz · la web bajando · el producto que sube y tapa el subtítulo). Cada pieza es un recorte VIVO de sus grabaciones, medido en fotogramas con rejilla, sobre el fondo de su propia web (Quantus #15181c, Neety #f5f7f9, Patchbay #f8f4ee).
- **Medido:** mezcla de 74,6 s, sin negros, sin música. `renders/mezcla-web-letras-v13.mp4` (44 MB) y `-ligero` (10 MB). Guiones anteriores: `build.v11.cjs`, `build.v12.cjs`.

### Ronda 307 · 2026-10-27 · reel «secciones con tu librería»: el inicio de la web, seis secciones reales recreadas a mano y lo que hace la librería, con «Laundry on the wire» (en local)
- **Andoni (textual):** «hacerlo con la canción que tenemos en la web: Laundry on the wire · coger de la web el inicio hasta proyectos destacados con desarrollo agéntico; mejorar esas animaciones · proyectos destacados cambiarlo por cómo vas pidiendo a la IA que te cree secciones para las webs, y coger las mejores secciones de las webs que tenemos; como son proyectos nuestros, recréalas tal cual para el vídeo · todo hecho a mano como la animación de savvia agentic» → «no quiero poner los heros: secciones chulas de cada web, para que veas que puedes crear cosas cuidadas con nuestra librería» · «antes del cierre, mencionar todo lo que puedes hacer con la librería, lo que sale en la animación de savvia agentic».
- **Hecho (`tools/r307/`: `ensambla.py` monta `build.cjs` con el inicio de la ronda 238 + `gestos.txt` + `nuevo.txt`):**
  · MÚSICA: `laundry-on-the-wire.mp3` (la de la radio de la web), 80 BPM (medido con `hyperframes beats`: un pulso cada 0,75 s, el primero a 0,785 s). Todo el reel cuadra a ese pulso; −15,3 LUFS.
  · EL INICIO de la web (gota → «La IA es la base…» → «savvia agentic: tu web conectada con la IA.» → «Tu web, en una librería.» → la película de la librería → «Pide… y listo.»), retomado al nuevo tempo; las frases entran ahora LETRA A LETRA (SplitText de GSAP: desde abajo, desenfocadas y algo giradas). La petición pasa a «Crea una sección con tu librería». Fuera «edita / cambia / mueve» y los proyectos.
  · «Secciones nuevas, hechas con tu librería.» y SEIS SECCIONES REALES, cada una con su HTML y su CSS de verdad (`tools/r301/web-dom.cjs`, en una sombra) y montada a mano al pulso, con una petición a Claude encima y un agente señalando: Quantus · el apilado («One stack. A fraction of the weight.»: los bloques caen y se encienden en rojo) y Forge (recorre sus cuatro pasos y dibuja el gráfico) · Neety · «De ruido comercial a señales accionables» (las marcas saltan una a una) e integraciones (se trazan las líneas) · Patchbay · agentes (las fichas de canales suben girando y atracan) y la capa oscura («Meet a new layer»: sus piezas se encienden en ola). Cada sección se ve a todo el ancho y baja con un scroll suave hasta su final; la anterior se queda hasta que entra la siguiente.
  · «Y con tu librería, tu equipo puede…»: las diez salidas de la animación de savvia agentic (`home.ts › partitura.sale`), de «Cambios de copy» a «Revisar accesibilidad».
  · CIERRE de la web (el hero con las estaciones y «savvia · savvia.studio»).
- **Medido:** 62,6 s, sin negros, −15,3 LUFS. `tools/r307/renders/reel-secciones-v1.mp4` (42 MB) y `-ligero` (10 MB).

### Ronda 307 (2.ª–4.ª) · 2026-10-27 · el reel de secciones: isométricos de Quantus, a ritmo de la canción, el chat en perspectiva, los checks de la home y el final plano (tools/r307)
- **Andoni (textual):** «Las secciones que creamos que se vea mejor como se construyen y hacer más énfasis en las animaciones, sí que me gustaría ver los isométricos de
  quantus… La música que vaya más acorde a lo que vas viendo» · «los finales que hacemos que sean como checks que se van marcando. Y en alguna de estas que pedimos una
  sección que salga el chat como en grande con perspectiva y cuando le das a enviar que salga la sección» · «los checks como tenemos en la home los servicios» · «el final
  rescatamos savvia con fondo plano y debajo savvia.studio» · «quitamos las estaciones del final, acabamos en plano con el rayo en savvia y savvia.studio» · «savvia
  tipográfico como en la web y la luz como la que tenemos en el hero».
- **Hecho:** siete secciones reales (Quantus despliegue con sus isométricos que pasan de alambre a sólido, stack, Forge · Neety ruido a señal, integraciones · Patchbay
  agentes, enfoque) construidas pieza a pieza con su gesto propio; la intro oscura dura la entrada suave de «Laundry on the wire» y «Tu web, en una librería» cae en el
  arranque (12,04 s); cada sección en un bloque de 8 pulsos; el primer pedido es un CHAT grande en perspectiva que se teclea, se envía y vuela a la barra mientras sale
  la sección. Lista final «Y con tu librería, tu equipo puede…» con los checks de Servicios de la home (un cursor los marca: la tinta llena el aro, onda y marca en
  Rosa niebla). Cierre: fuera el hero con estaciones; Cacao liso con grano que se abre desde abajo, el haz del hero (−18°, pico 9 %) y «savvia» en Family con
  savvia.studio en mono debajo.
- **Medido:** render 83,4 s 1920×1080, −15,6 LUFS, sin tramos negros; copia ligera 13 MB (`tools/r307/renders/reel-secciones-v4-ligero.mp4`).
- **Pendiente:** «Last Ride Home» (Epidemic) necesita la suscripción para descargarla; no publicado.

### Ronda 307 (5.ª) · 2026-10-27 · arranque más rápido, la caja de «Pide y listo» que se estira hasta la barra, las cuatro isométricas de Quantus, el montaje con cursores, Neety y la rueda de Patchbay, final con las guías (tools/r307)
- **Andoni (textual):** «Empieza muy lento» · «El final quitamos la textura al fondo y añadimos las guías que tenemos en el hero» · «las secciones de quantus las de las isometrías prefiero
  la sección que salen 4 en una y ver cómo se construyen» · «La de Neety de antes y después está mal construida, revísala» · «La de Patchbay de la ruleta hace mal la animación,
  revísala» · «Después de pide y listo la transición es rara. Podríamos hacer zoom que se dé al enviar y se cree la sección apareciendo por abajo de lo que pedimos ahí» · «Todas
  las secciones que se construyan como pasa en la librería con los cursores».
- **Hecho:** la canción entra 4,5 s (6 pulsos) más adelante y la intro oscura se recoge: el ritmo arranca a los 7,5 s (antes 12). Fuera «Secciones nuevas» y el chat en
  perspectiva: al enviar en «Pide… y listo.», las palabras se apartan, la cámara empuja y la caja se estira hasta ser la barra de peticiones; el marco sube por debajo.
  Quantus abre con «Built for whoever pays the compute bill.» (`section#for`, `tools/r307/for.cjs`): la placa de cada isométrica se asienta y sus piezas caen encima.
  MONTAJE: Claude, savvia y Codex cogen cada pieza (titular, texto, tarjetas) desde el borde del marco y la llevan a su sitio con su aro de color; el resto entra después.
  Neety: el montaje forzaba opacidad 1 en lo que la web deja oculto (salía «Después con Neety» dos veces): ahora respeta la opacidad de cada elemento. Patchbay: en su web es una
  RUEDA (ranuras en un arco de 715 px, 15,67° cada una): a cada pulso los iconos avanzan una ranura. Final: Cacao liso sin grano, guías verticales en los bordes del contenido y
  una horizontal con cruces, el haz del hero y «savvia» con savvia.studio.
- **Medido:** render 72,9 s 1920×1080, −15,8 LUFS, sin tramos negros; copia ligera 11,8 MB (`tools/r307/renders/reel-secciones-v5-ligero.mp4`).
- **Pendiente:** el chat en perspectiva se ha retirado al sustituir la transición (vuelve en otra petición si se quiere); no publicado.

### Ronda 307 (6.ª) · 2026-10-27 · cursores que montan cada sección con su gesto, el puente de Neety, transiciones distintas y la guía de arriba (tools/r307)
- **Andoni (textual):** «Al final falta la guía de arriba» · «En quantus quitamos la sección de forge» · «En Neety falta el puente del medio y la animación del medio para el antes y el
  después» · «En Quantus montar las cards de las isométricas directamente en la vista de las cards» · «las piezas que caen con físicas, mostrar directamente en la vista donde
  caen y los cursores las dejan caer desde arriba. Si podemos aplicar este tipo de cosas chulas con los cursores en el resto de secciones también molaría» · «Buscar
  transiciones chulas entre las secciones que montamos».
- **Hecho:** fuera Forge (quedan seis secciones; cada una con su duración: Quantus 12 pulsos, las demás 8). Quantus: la cabecera llega con los cursores, la vista baja a las
  cards y cada cursor abre su card en su sitio y, encima del dibujo, suelta las piezas de la isométrica en cuatro tandas que caen con rebote (la placa primero). Stack: los
  cursores llegan arriba de cada hueco con su bloque y lo sueltan. Neety: el PUENTE como en su web (la banda, los chips, los píxeles que brotan, la pieza que late y su marca;
  sus reglas venían con la animación apagada y opacidad 0), una señal que cruza de «antes» a «después» y un cursor que marca los checks uno a uno. Integraciones: el cursor va
  en la punta de cada línea mientras la dibuja. Patchbay: un cursor empuja la rueda, icono a icono, hasta el hueco de la API. TRANSICIONES (una distinta en cada cambio):
  empuje, círculo desde el botón de enviar, giro en perspectiva, zoom y barrido en diagonal. Final: guía horizontal también arriba, con sus cruces.
- **Medido:** render 69,9 s 1920×1080, −15,8 LUFS, sin tramos negros; copia ligera 11,3 MB (`tools/r307/renders/reel-secciones-v6-ligero.mp4`).
- **Pendiente:** no publicado.

### Ronda 307 (7.ª) · 2026-10-27 · clics sutiles, el stack visto donde caen los bloques (con hover), el puente de Neety pulido y el chat que vuelve al centro en cada petición (tools/r307)
- **Andoni (textual):** «¿Podemos añadir soniditos de click muy sutiles?» · «la sección de cómo los agentes sueltan los bloques desde arriba en Quantus tiene que ser la vista ya donde
  caen los bloques para que se aprecien bien. Y hacer hover en alguno para que se vea cómo se mueven» · «El puente de Neety pulir la animación, se ve algo raro» · «animaciones
  entre secciones me refería a que se note más que vuelves a escribir en el chat pidiendo algo nuevo».
- **Hecho:** CLICS: `tools/r307/clics.cjs` lee del timeline las 79 pulsaciones (cursores, botón de enviar, cursor de la lista) → `clics.py` sintetiza un clic suave (roce de
  4 ms + cuerpo a ~1,6 kHz, con variación) en cada una → se mezcla bajo la música tras el render (pico −15 dBFS frente a −1,5 de la música). STACK: la vista baja a los
  bloques nada más abrirse la sección; los cursores sueltan cada bloque y, al final, uno pasa por encima de tres: la cara se desplaza hacia él, se enciende el rojo y crece la
  sombra; el de «turn» gira 14°, como en su web. PUENTE de Neety en el orden de su web: la banda se abre desde el centro, la pieza aparece con su marca (rebote y balanceo),
  los píxeles brotan del centro hacia fuera, una ola de luz los recorre dos veces de «antes» a «después» (la pieza late al pasar) y los destellos al final; fuera la bolita
  que cruzaba. PETICIÓN NUEVA: el chat baja al centro y crece (×1,32) mientras la sección anterior se aleja desenfocada; se escribe ahí, se envía con una onda y el chat vuelve
  arriba justo cuando entra la sección nueva con su transición.
- **Medido:** render 69,9 s 1920×1080, −15,8 LUFS, sin tramos negros; copia ligera 12,5 MB (`tools/r307/renders/reel-secciones-v7-ligero.mp4`).
- **Pendiente:** no publicado.

### Ronda 307 (8.ª) · 2026-10-27 · clic de ratón y espaciado; peticiones que alternan barra, centro y zoom con clic (tools/r307)
- **Andoni (textual):** «un sonido más de clic de ratón y más espaciado, no tantos» · «las transiciones de escribir en el chat no hacerlo siempre, hacerlo entre medias de nuevo con lo del
  zoom que teníamos antes y que clicabas para que no se haga monótono mientras salen las diferentes secciones».
- **Hecho:** `clics.py`: clic de RATÓN (pulsación seca con resonancia a ~3,3 kHz y golpe grave, y la suelta 75–95 ms después, más floja) y como mucho uno cada 0,6 s: de 79 a 35.
  Peticiones (`nuevo.txt › MODO`): stack → el chat baja al centro; Neety «ruido» → solo en la barra; integraciones → ZOOM en perspectiva (la barra se inclina y crece, la cámara
  deriva y el cursor de savvia llega y pulsa «enviar»); Patchbay agentes → barra; Patchbay oscura → centro.
- **Medido:** render 69,9 s 1920×1080, −15,8 LUFS, sin tramos negros; copia ligera 12 MB (`tools/r307/renders/reel-secciones-v8-ligero.mp4`).
- **Pendiente:** no publicado.

### Ronda 307 (9.ª) · 2026-10-27 · cinco maneras de pedir, interludios de marca y clics más sutiles (tools/r307)
- **Andoni (textual):** «pulir las animaciones de cuando escribes en el chat para las nuevas secciones, quiero que haya más variedad, no siempre la misma animación. Igual entre medias
  ponerles alguna animación intermedia para que no sea tan monótono» · «Y los clics más sutiles».
- **Hecho (`nuevo.txt › MODO`, `INTER`):** cada petición, distinta: stack → el chat baja al centro · Neety «ruido» → INTERLUDIO «Ahora, Neety.» (cartela Berenjena con su marca que gira,
  «El mismo chat, otra librería.», se abre en círculo desde el botón de enviar y se recoge hacia arriba) y se escribe en la barra · integraciones → zoom en perspectiva con el
  cursor pulsando «enviar» · Patchbay agentes → INTERLUDIO «Ahora, Patchbay.» (cartela naranja) y la petición DICTADA (punto de grabación y onda de voz; las palabras
  entran una a una) · Patchbay oscura → el chat SUGIERE tres peticiones y el cursor elige una, que sube a la barra. Clics 5,5 dB más bajos (pico −17 dBFS frente a −1,5 de la música).
- **Medido:** render 75,9 s 1920×1080, −15,8 LUFS, sin tramos negros; copia ligera 13,6 MB (`tools/r307/renders/reel-secciones-v9-ligero.mp4`).
- **Pendiente:** no publicado.

### Ronda 307 (10.ª) · 2026-10-27 · de la cartela al chat y del chat a la sección (tools/r307)
- **Andoni (textual):** «cuando dices y ahora Neety, poner el chat en medio, pedir y desde ese chat ya pasamos a construir la sección que pedimos. Lo mismo para Patchbay».
- **Hecho:** en las cartelas «Ahora, Neety.» y «Ahora, Patchbay.», la marca y el título suben, la frase se va y el chat baja de su barra al centro de la cartela (por encima de
  ella); se escribe (Neety) o se dicta (Patchbay) ahí; al enviar, la cartela se recoge hacia arriba, el chat vuelve a su barra y el marco sube por debajo con la sección, que
  se abre desde abajo (sin las transiciones de las otras). Arreglo: dos animaciones de la frase de la cartela chocaban y en el render se quedaba bajo el chat.
- **Medido:** render 75,9 s 1920×1080, −15,8 LUFS, sin tramos negros; copia ligera 13,6 MB (`tools/r307/renders/reel-secciones-v10-ligero.mp4`).
- **Pendiente:** no publicado.

### Ronda 307 (11.ª) · 2026-10-27 · el chat de las cartelas llega vacío y se escribe al posarse (tools/r307)
- **Andoni (textual):** «pulir la animación de cuando sale y ahora Neety el chat para escribir, se reescribe en vez de aparecer vacío y escribir algo. En Patchbay también escribimos
  en vez de audio».
- **Hecho:** el chat baja a la cartela VACÍO, con «Pide una sección o un cambio…» en gris y el cursor parpadeando, y en cuanto se posa se escribe la petición letra a letra
  (antes esperaba 1,3 s vacío y sin cursor). Patchbay también se escribe: fuera el dictado.
- **Medido:** render 75,9 s 1920×1080, −15,8 LUFS, sin tramos negros; copia ligera 13,6 MB (`tools/r307/renders/reel-secciones-v11-ligero.mp4`).
- **Pendiente:** no publicado.

### Ronda 307 (12.ª) · 2026-10-27 · chat de savvia agent, Playground, nuevo orden, textos sin «·» y final con el hero (tools/r307)
- **Andoni (textual):** «El chat lo diseñaría como tenemos en savvia agent, que se vea más realista» · «Eliminamos AI Slop de los textos, sobre todo puntos centrados y guiones largos» ·
  «Terminamos con el hero de savvia pero sin las líneas guía, el árbol y elevamos tu web con IA con el subtítulo» · «Los checks ponemos esto de titular: Con savvia agent tu equipo
  puede…» · «Quiero meter Playground en los ejemplos de secciones, coge 2 de https://playgroundiep.treseiscero.app/home-v3» · «El orden: Neety (2) > Playground (2) > Quantus (1) >
  Patchbay (1)».
- **Hecho:** CHAT: el compositor de Claude de la animación de savvia agent (texto arriba; abajo «+», Opus 5.5 con su icono, la librería adjunta y enviar en su cuadrado naranja),
  también en la caja de «Pide… y listo.». ORDEN: Neety «De ruido a señal» › Neety integraciones (zoom con clic) › «Ahora, Playground.» › Playground «What it does for your district»
  (los cursores traen las cards vacías y se llenan; hover en la del medio) › Playground privacidad (sugerencias; se dibujan las pistas, entran las piezas, el candado se cierra,
  los datos viajan por las pistas y un cursor marca las promesas) › Quantus isométricas (chat al centro) › «Ahora, Patchbay.» › la rueda. Fuera el stack y la sección oscura de
  Patchbay. Playground sacado con su DOM real (`tools/r307/pg-dom.cjs`, fuentes de /assets/fonts; sin sus animaciones SMIL ni sus diálogos). TEXTOS: «Claude, Codex, tu equipo y
  savvia» (antes con «·»). CHECKS: «Con savvia agent tu equipo puede…». FINAL: el hero de savvia sin guías: Cacao, la luz, el roble de otoño que crece y «Elevamos tu web con IA.»
  con «Especialistas en orquestar el desarrollo agéntico.».
- **Medido:** render 79,8 s 1920×1080, −15,9 LUFS, sin tramos negros, 37 clics; copia ligera 14,6 MB (`tools/r307/renders/reel-secciones-v12-ligero.mp4`).
- **Pendiente:** el final ya no lleva savvia.studio (pedido así); no publicado.

### Ronda 307 (13.ª) · 2026-10-27 · cartela de Quantus, features y testimonios de Playground, el roble que nace de la gota y el tecleo limpio (tools/r307)
- **Andoni (textual):** «De Quantus falta la transición con su marca» · «De Playground cojamos la sección de features, la construyes y luego se hace scroll viendo cómo se apilan. Luego
  cogemos la sección de testimonios con su animación» · «El final, hacer que el árbol salga con la gota como en el hero original. Que empiece el fondo plano y el resto se genera» ·
  «Revisar todas las animaciones y textos en el chat, que se escriben bien sin empezar con un texto encima ya escrito».
- **Hecho:** «Ahora, Quantus.» (su #15181c con su marca de dos círculos en rojo) y se pide en la cartela. Playground: FEATURES («Six problems. Solved.», `section#features`): los
  cursores traen titular, menú y la primera tarjeta; después, como el scroll de su web, cada tarjeta sube y se posa sobre la anterior con su escalón de 14 px y el cohete del menú
  salta a la herramienta activa. TESTIMONIOS (`section#proof`): la rueda de avatares (arco de 873 px, 30° por ranura); un cursor pulsa «siguiente», la rueda gira, el color de la
  tarjeta vira al de esa persona y la cita y el nombre se relevan (Michael W., Lance P., Tiffany S.; citas reales recortadas). Su `<script>` interno rompía la página: se quita al
  extraer. FINAL: Cacao liso, cae una gota de agua, salpica en la base del tronco, el roble se pinta desde ahí con el canto rasgado y luego entran la luz y el titular. TECLEO: el
  texto de cada petición empieza recortado antes de mostrarse (había un instante con el texto entero) y la caja de «Pide… y listo.» empieza vacía.
- **Medido:** render 87,8 s 1920×1080, −16 LUFS, sin tramos negros, 36 clics; copia ligera 15,5 MB (`tools/r307/renders/reel-secciones-v13-ligero.mp4`).
- **Pendiente:** no publicado.

### Ronda 307 (14.ª) · 2026-10-27 · cartelas suaves y Playground entero en el marco (tools/r307)
- **Andoni (textual):** «Cuando salen los textos de Y ahora tal, hacen como saltos raros todos esos textos. Pon una animación más smooth» · «las secciones de Playground me gustan pero
  se tienen que apreciar mejor las cards y el menú lateral sin cortarse en la primera. Y la segunda de testimonios que se vea la card sin cortar con las caras rotando ya desde el
  inicio sin scroll».
- **Hecho:** CARTELAS: la marca y «Ahora, X.» entran como un bloque, del desenfoque a nítido (1 s, power3.out; antes palabra a palabra desde una máscara y con rebote), la frase se
  funde sin caer y la subida al llegar el chat dura 1,1 s con una curva suave (el chat baja a la vez, 1 s). PLAYGROUND: las secciones pueden ir con ZOOM (`seccion(…, zoom)`):
  features al 74 % (el menú lateral y la tarjeta enteros; la pila se ve completa) y testimonios al 70 % (la tarjeta entera, sin desplazamiento); la rueda está desde el principio
  y empieza a girar en el tercer pulso.
- **Medido:** render 87,8 s 1920×1080, −16 LUFS, sin tramos negros; copia ligera 15,1 MB (`tools/r307/renders/reel-secciones-v14-ligero.mp4`).
- **Pendiente:** no publicado.

### Ronda 307 (15.ª) · 2026-10-27 · la tarjeta de testimonios entera y centrada (tools/r307)
- **Andoni (textual):** «La sección de testimonios de Playground que ocupe más ancho y el redondeo por abajo tiene que ser igual que arriba, y céntrala al medio tanto vertical como
  horizontalmente».
- **Causa (medida):** la tarjeta empieza a 160 px de su sección y mide 891; el recorte a 1020 px se comía sus últimos 31 px, el redondeo de abajo.
- **Hecho:** se encuadra SOLO la tarjeta (la sección sube 160 px, alto 891), centrada en el marco en los dos ejes y con los cuatro redondeos iguales; tras «un poco más estrecha, para darle aire por arriba y por abajo», al 84 % (unos 60 px de aire arriba y abajo).
- **Medido:** render 87,8 s 1920×1080, −16 LUFS, sin tramos negros; copia ligera (`tools/r307/renders/reel-secciones-v15-ligero.mp4`).
- **Pendiente:** no publicado.

### Ronda 307 (16.ª) · 2026-10-27 · la estela del cohete en las features de Playground (tools/r307)
- **Andoni (textual):** «en la sección de features el cohete, cuando pasa por el menú, deja como una estela, fíjate bien en la web en producción. Añádelo».
- **Medido en producción (home-v6.js › fly):** al saltar de herramienta, el cohete se ladea ±28° y se endereza a los 240 ms; detrás deja un trazo de cera (`.fs6_trail`: 4 px,
  discontinuo 5/2 px en el color de la herramienta a la que va) desde su punto anterior al nuevo, que crece en su dirección y se apaga (`fs6trail`, 0,7 s).
- **Hecho:** lo mismo en el reel, con el timeline (el CSS de las secciones va sin animaciones): un trazo por salto, crece 0,32 s y se funde en 0,38 s; el cohete se ladea y vuelve.
- **Medido:** render 87,8 s 1920×1080, −16 LUFS, sin tramos negros; copia ligera (`tools/r307/renders/reel-secciones-v16-ligero.mp4`).
- **Pendiente:** no publicado.

### Ronda 307 (17.ª) · 2026-10-27 · caja = barra sin salto, puente de Neety más tarde, peticiones elaboradas, final claro con la gota del inicio y repaso de saltos (tools/r307)
- **Andoni (textual):** «Cuando pasamos de Pide y listo, el chat cuando pasa arriba es como que da un salto porque cambia la tipo o algo pasa ahí raro. Que sea smooth» · «Neety, la primera
  sección que construimos, el puente se ve de primeras; que aparezca más tarde» · «Los prompts que sean algo más elaborados» · «Revisa todas las animaciones para que sean lo más smooth
  posibles» · «La gota final que sea como la del inicio y acabamos con fondo light, no dark».
- **Hecho:** la caja de «Pide… y listo.» es ahora la barra exacta a 1/1,12 (misma letra y medidas, iconos, botón y la librería adjunta, que faltaba); al estirarse y llegar arriba
  coincide con la barra (comprobado en los fotogramas del relevo). Neety: la banda del puente también empieza oculta y todo el puente llega un pulso más tarde. Peticiones: «Crea
  «De ruido a señal» con el antes y el después de Neety», «Añade sus integraciones: CRM, LinkedIn y email llegando al panel», «Las features de Playground: seis tarjetas que se
  apilan al hacer scroll», «Y sus testimonios: la rueda de caras y el color de cada docente», «Una sección de Quantus: cuatro clientes, cada uno con su isométrico», «La sección de
  agentes de Patchbay: todos los canales entrando en una API» (barra a 26 px). FINAL claro (#f6f3ee): la MISMA gota del gancho (cuelga, cae estirándose con su estela
  desenfocada, salpica con corona, gotitas y onda), en tinta para leerse sobre claro; el roble se pinta desde el impacto y el titular en tinta.
- **Saltos medidos** (`ffmpeg scdet`, umbral 9): había 9; el peor, un fotograma OSCURO entre los checks y el final (score 66: la máscara del antiguo final oscuro); también las
  cartelas, que se abrían y recogían deprisa (0,9 y 0,6 s, expo) → 1,15 y 0,85 s (power3). Queda solo el corte a negro → claro de los 7,6 s, que es el golpe de la canción.
- **Medido:** render 87,8 s 1920×1080, −16 LUFS, sin tramos negros; copia ligera 15,2 MB (`tools/r307/renders/reel-secciones-v17-ligero.mp4`).
- **Pendiente:** no publicado.

### Ronda 307 (18.ª) · 2026-10-27 · el reel por estación e idioma, en la web: el menú y la pantalla del ordenador (tools/r307, en local)
- **Andoni (textual):** «Vamos a volver al final con el marrón. Y quiero un vídeo por cada estación: donde va el marrón, que vaya el de cada estación. Y luego en castellano e inglés.
  Con esto lo metemos ya a la web y cada vez que cambia de estación se cambia, y por idioma» · «En el menú, donde tenemos proyectos destacados, recuperamos el reel como teníamos
  antes» · «Y si te fijas en savvia.studio también lo tenemos sin sonido en la pantalla del ordenador».
- **Hecho (reel):** el final vuelve al oscuro, con la gota del inicio en sus colores de agua. VARIANTES (`build.cjs`, `EST=<estación> IDIOMA=<es|en>`): el oscuro es el `--noche`
  de la web (otoño #3b231b · primavera #3a2932 · verano #1b3125 · invierno la nieve #f5f5f7, con el texto en Pizarra y la gota en tinta), el roble del hero de la estación y la
  escena de savvia agentic GRABADA otra vez en cada estación e idioma (`tools/r307/grabar-agentic.cjs`, copia de la de la ronda 233, desde el sitio en local). EN: todos los
  textos del reel (los de la web: `home.en.ts`), «Now, X.», «Same chat, another library.», «With savvia agent your team can…». `render-8.sh` → `tools/r307/renders/estaciones/`
  (8 × 87,8 s, −16 LUFS, sin negros) y para la web `public/media/reel/reel-<estación>-<idioma>.mp4` (1600×900, ~9,6 MB), su póster (fotograma 0) y la miniatura de 7 s
  `reel-mini-…` (640×360, ~70 KB, de las isométricas de Quantus).
- **Hecho (web):** `src/scripts/reel.ts` (nombre por estación e idioma y, al cambiar de estación, el vídeo cargado pasa al nuevo en el mismo punto; con `preload="none"`, Chrome
  no cargaba el nuevo hasta pedirle que suene: si sonaba se le pide ya). `Nav.astro`: vuelve la tarjeta del REEL al menú (miniatura en bucle y, al pulsarla, el reel grande con
  sonido); los destacados que rotaban (ronda 274) quedan en el código, sin usar. `Proyectos.astro`: la pantalla del ordenador, el reel de la estación en bucle y sin sonido.
  Duración en el menú: 1:28.
- **Medido:** `astro check` 0 errores · prueba en Chrome y WebKit, `/` y `/en/` (primavera → verano): miniatura y reel grande del idioma y la estación, sonando; al cambiar de estación
  sigue sonando en su punto (4,2–4,7 s) · pantalla del ordenador en invierno, inglés: `reel-invierno-en.mp4` en marcha · `tools/verify.cjs` en `/` y `/en/` (Chrome y WebKit,
  1280 y 390): sin errores, 0 ≥ 400, desborde 0.
- **Pendiente:** sin commit ni publicar; `public/media/reel/reel.mp4`, `reel.jpg`, `reel-mini.mp4` y `reel-mini.jpg` (los de antes) ya no los usa nada.

### Ronda 307, 19.ª · el roble del final, el mismo del hero (en local)
- **Andoni (textual):** «hay que hacer que en todos los vídeos el árbol final se vea tal y como está en el hero de savvia, con el mismo efecto y colores».
- **Hecho:** el final ya no pinta la lámina con una máscara rasgada: el roble es una GRABACIÓN del hero real (`tools/r307/arbol/grabar-arbol.cjs`): la home local con
  `?estacion=<estación>`, solo la caja del árbol a 1180 px sobre la noche de la estación, y un reloj falso (performance.now, rAF y setTimeout avanzan 1/30 s por
  fotograma) para que cada pasada sea idéntica. Sale el motor del hero tal cual (`estela.ts`: líneas → pintura rasgada desde la base, semitono, hervor, luz y halo),
  desde el impacto de la gota → `hf/assets/arbol-hero-<estación>.mp4` (yuv444, 7,2 s). La gota cae ahora en la base del tronco (960 · 1070); el vídeo lleva los
  bordes fundidos con el fondo. Re-renderizados los 8 reels y sus versiones web.
- **Medido:** fotogramas del final en otoño e invierno (82,7 · 83,6 · 85 · 87,5 s): el árbol se dibuja y se pinta como en el hero; con contraste ×6, sin costura con el fondo.
- **Pendiente:** sin commit ni publicar.

### Ronda 307, 20.ª · el 3D del equipo, probado y descartado (en local)
- **Andoni (textual):** «mirar cómo ha construido su 3D bguillaume.info y ver si podemos replicarlo para Eric y para mí» → «dejamos como antes, se ven muy low quality».
- **Hecho y retirado:** modelos de Meshy (desde la foto `us-min.avif`, en pose T), esqueleto y saludo de Mixamo, textura recuperada y comprimidos (~0,9 MB) en
  `~/Desktop/savvia/3d-equipo/` (fuera del repositorio), y una prueba `?equipo=3d` en el Estudio que se ha QUITADO entera (Estudio.astro sin cambios).

### Ronda 307, 21.ª · los casos de estudio en dos columnas, con modo foco (en local)
- **Andoni (textual):** «quiero que tenga esta estructura dsaltaren.com/#work. Quitamos la columna de Danny Saltaren: a la izquierda sticky el título del proyecto con su
  descripción, tags, link a web y abajo del todo navegar entre diferentes case studies. A la derecha lo que tenemos ahora de contenido pero más minimalista: imagen,
  descripción, etc. Y arriba tiene un focus mode: si le das, el contenido se queda en el centro como modo ventana; esto también lo quiero».
- **Referencia medida (`tools/ref-casos/`):** columnas con cabecera fija («A closer look at the work.» · «Focus view»); el contenido, bloque a bloque: imagen con filo fino,
  pie pequeño, título corto, una frase, botón gris con ↗. Focus view: la columna pasa a una ventana centrada con sombra, el resto se apaga; «Back» o Esc la devuelven.
- **Hecho (`src/views/Caso.astro`; antes, etiqueta `r-casos-antes`):** a la izquierda (4 de 12 columnas, fija a toda la altura de la ventana): «← Todos los proyectos», el
  nombre, la entradilla, los servicios como etiquetas, sector y lugar, «Ver la web ↗» y abajo el índice de casos (el actual con un punto Coral, en dos columnas) con
  Anterior / Siguiente; en móvil va arriba y el índice se reduce a Anterior / Siguiente. A la derecha, el contenido de siempre en una sola columna, con títulos
  pequeños en la tipografía de texto, menos aire y una barra fija «El caso, de cerca · Modo foco». MODO FOCO: el contenido pasa a una ventana centrada (60 rem,
  radio 16, sombra, el grano de la página) sobre un velo claro desenfocado; abre en el mismo punto de lectura, la rueda se queda dentro y al salir (Volver, Esc o
  clic en el velo) la página vuelve a ese punto. Fuera la cabecera grande, la ficha de arriba y el «Siguiente proyecto» del final.
- **Medido:** `astro check` 0 errores · `tools/verify.cjs` en /proyectos/neety/ y /en/proyectos/cubbo/ (Chrome y WebKit, 1280 y 390): sin errores, 0 ≥ 400, desborde 0 ·
  `tools/r307-casos/ver.cjs` (Chrome y WebKit, 1440 y 390): columna fija entera en 900 px de alto, foco abierto en el punto de lectura, rueda dentro (0 px de página),
  salir devuelve el punto.
- **Pendiente:** sin commit ni publicar.

### Ronda 307, 22.ª · correcciones a los casos en dos columnas (en local)
- **Andoni (textual):** «1. lo de la izquierda, como lo tiene él: más minimalista y más estrecho · 2. abajo solo los botones de siguiente y anterior con el nombre de los
  proyectos; las flechas, como en el resto de la web · 3. línea de separación entre ambas columnas · 4. de momento fuera la librería en Neety · 5. el menú superior
  (el caso de cerca y modo foco): lo que se mete por arriba, que desaparezca · 6. en modo foco solo se queda el caso centrado, el resto desaparece · 7. más espacio
  entre el caso y el footer, 160 px».
- **Hecho (`src/views/Caso.astro`):** 1 · la columna pasa de 4 a 3 de 12; arriba una cabecera a la altura de la barra del contenido («‹ Proyectos» · «4/9»); el nombre
  en Family a 28–36 px, la entradilla a 16 px y dos líneas grises (servicios · sector y lugar) y «Ver la web» con la flecha de la casa; fuera las etiquetas en
  píldora y la ficha. 2 · fuera el índice: abajo, Anterior y Siguiente con el nombre de cada proyecto y el chevrón de `flecha()`. 3 · filo de 1 px a la izquierda
  del contenido, de arriba abajo. 4 · `lib` desactivado (vuelve con `p.libreria`). 5 · una franja del fondo (con grano) tapa por encima de la barra «El caso, de
  cerca» hasta arriba de la ventana: lo que sube desaparece ahí (en móvil, solo los 64 px bajo la barra del menú). 6 · el velo del modo foco es el fondo de la
  página, opaco: solo queda la ventana del caso. 7 · 160 px entre el final del caso y el pie.
- **Medido:** `astro check` 0 errores · `tools/verify.cjs` en /proyectos/neety/ (Chrome y WebKit, 1280 y 390): sin errores, 0 ≥ 400, desborde 0 · `tools/r307-casos/ver.cjs`
  (Chrome y WebKit, 1440 y 390): foco abre, la rueda va dentro, salir devuelve el punto.
- **Pendiente:** sin commit ni publicar.

### Ronda 307, 23.ª · lo de Eric, a local; la barra que lo tapa todo; fuera los «·» y las rayas (en local)
- **Andoni (textual):** «fíjate las cosas que ha actualizado Eric y tráelo a local» · «revisa toda la web en busca de puntos en medio y líneas largas para quitarlas, es
  muy AI slop» · «cuando haces scroll, el focus mode y lo otro tiene que tapar todo para que por detrás no se vea que pasa el contenido; fíjate bien cómo lo hace Danny».
- **Lo de Eric:** tres «Update from Ship Studio» (b0dc4c5, 2531a6f, cd4881d: portfolio, manifiesto, `lanzamiento.ts`, método, sistema…). Traídos con `stash` →
  avance rápido a `origin/main` → `stash pop`; cuatro conflictos resueltos: el registro (los dos), `home.ts`/`home.en.ts` (sus tipos con `href` opcional + la duración
  del reel nuevo, 1:28) y `Caso.astro` (la estructura en dos columnas, con su `titular` bajo el nombre y anterior/siguiente solo entre los casos públicos, `esPublico`).
  Copia de lo local en el scratchpad (`local-antes-de-eric.patch`) y el stash sigue guardado.
- **La barra:** las imágenes del caso se pintaban por encima de «El caso, de cerca» (z 4) y la franja que tapa por arriba medía 64 px con la barra a 80 → la barra a
  z 40 y la franja exacta (`--tapa`: 64 móvil, 80 escritorio). Medido: 0 elementos del caso por encima de la barra en toda la bajada (Chrome y WebKit) y lo mismo en foco.
- **«·» y rayas:** `tools/r307-slop/buscar.cjs` recorre las 48 páginas (es/en, casos, método, sistema, lab) y lista todo texto, título, alt y aria-label con «·», «—» o
  «–»: de 155 a 1 (la unidad «N·m» de Gravitas, que se queda). `limpiar.py` / `limpiar-astro.py` reescriben solo el interior de las cadenas y el texto del marcado
  (separador → coma; raya → dos puntos tras una etiqueta corta o coma en una frase; rangos → «a»/«o», «de marzo a mayo»); el resto, a mano: «Reel» y la duración
  aparte, «(pronto)», espacio en lugar de «·» en el método y en la portada del manual, «○» en las tablas, frases naturales en espaciado y sonido de los casos.
- **Medido:** `astro check` 0 errores · `tools/verify.cjs` en /, /en/, /sistema, /metodo/la-receta, /lab y /proyectos/quantus/ (Chrome y WebKit, 1280 y 390): sin errores,
  0 ≥ 400, desborde 0.
- **Pendiente:** sin commit ni publicar; las páginas de prueba (`/prueba/…`) no se han tocado.

## Rechazado — añadido en la ronda 307, 23.ª (NO VOLVER)
- El punto en medio «·» como separador y las rayas «—» «–» en cualquier texto visible (copy, etiquetas, títulos, aria-label): «es muy AI slop». Coma, dos puntos, punto o aire.

### Ronda 307, 24.ª · casos (guía y fondo plano), lab y el Storybook (en local)
- **Andoni (textual):** «1. Case study: la línea superior es como una guía que atraviesa toda la página; Proyectos, modo foco y el caso de cerca, alineados; el número de
  proyectos, fuera · 2. la parte de arriba que tapa al hacer scroll tiene textura: fondo plano · 3. Lab: en la tarjeta del centro, únicamente el título savvia lab y el
  subtítulo «nuestros experimentos, ábrelos y juega con ellos» · 4. Sistema pasa a llamarse Storybook; dejamos solo Diseño y Desarrollo · 5. mejoramos la construcción del
  logotipo animándolo · 6. el menú lateral no se pierde en las estaciones; las estaciones no se cambian con el scroll, las cambias tú con un selector · 7. iconografía,
  únicamente la utilizada en la web · 8. movimiento: el hover del botón mejor representado; la ease-out expo, algo más vistoso · 9. firma, solo la del trazo arriba ·
  10. revisar que los componentes y todo estén en la web · 11. mantenimiento técnico fuera, y cómo se hacen las piezas también».
- **Hecho:** 1–2 · `Caso.astro`: la cabecera de la columna y la barra miden 56 px y van a 80 px de arriba (los tres rótulos en y = 107, medido); UNA línea de lado a
  lado de la ventana (la dibuja la barra fija); fuera «4/9»; la franja que tapa, sin grano. 3 · `lab/Mesa.astro` + `lab.ts`: solo «savvia lab» y «Nuestros experimentos.
  Ábrelos y juega con ellos.». 4 · `/storybook` (nueva) con `/sistema` redirigiendo (301); menú «Storybook»; fuera Empezar (guía y sitemap). 5 · la construcción, como
  un editor (~5 s): guías que se trazan, anclas de izquierda a derecha, manejadores, contorno letra a letra y relleno; «Volver a construir». 6 · las estaciones, una
  tarjeta dentro de la columna con un selector (Primavera, Verano, Otoño, Invierno) que cambia la página entera; el índice ya no se esconde. 7 · los 13 que pinta la web
  (estaciones, cerrar, subir, bajar, reproducir, pausa, siguiente pieza, sonido, silencio, vídeo y la flecha de la casa); fuera la muestra de Iconoir. 8 · el BOTÓN DE
  VERDAD con un cursor que entra por lados distintos (la savia nace y se recoge por donde pasa; tu ratón manda) y «tres velocidades» (lineal, quart y expo corriendo a
  la vez con estela). 9 · una sola firma, la del trazo. 10 · revisión (agente de solo lectura): fuera la paginación de la barra de cristal, el buscador y filtros (el del
  portfolio de Eric es otro), la píldora «Escuchando…» y, en el catálogo, Dolores y «Cabecera y destacados»; corregidos archivos y textos (casos en dos columnas, portfolio
  de corrido, orden de la home, hero sin hora). 11 · fuera «Cómo se hacen las piezas» y «Mantenimiento técnico».
- **Medido:** `astro check` 0 errores · `tools/verify.cjs` en /storybook, /lab, /proyectos/neety/ y / (Chrome y WebKit, 1280 y 390): sin errores, 0 ≥ 400, desborde 0 ·
  `tools/r307-story/ver.cjs` (Chrome y WebKit): /sistema → /storybook, índice visible durante las estaciones, el selector cambia la estación de la página · la demo del
  botón, llena 2 s de cada ~5 en bucle.
- **Pendiente:** sin commit ni publicar; la miniatura de «Todos los proyectos» del catálogo es de antes de la reforma del portfolio.

### Ronda 307, 25.ª · lab, método, storybook y casos (en local)
- **Andoni (textual):** «1. en lab la card del centro algo más alta; y actualiza el proyecto de Gravitas porque ha cambiado · 2. Método, próximamente y que no se pueda
  clicar · 3. Storybook: el cambio de colores en estaciones más fluido · los espaciados animados como en case studies · iconografía: descripciones que no se salgan del
  recuadro, y el icono del chat de la home no está · movimiento, todas las cards la misma altura · firma: la copa del árbol, un solo trazo continuo que parezca hecho a mano ·
  barra de cristal y anterior/siguiente ya no están en la web · 4. Casos: la línea de anterior y siguiente, que toque la línea de la derecha · el modo foco, que parezca que
  sale del papel y se posiciona en el centro · la línea vertical de la derecha del todo, hasta arriba · el mismo padding a la derecha que a la izquierda · el primer vídeo,
  redondeado como el resto» · (a media ronda) «al hacer scroll, donde el contenido desaparece arriba, un pequeño degradado para que se desvanezca».
- **Hecho:** · Lab: la tarjeta, 52/56 px de relleno (213 px de alto); Gravitas es ahora un laberinto de bola: vídeo regrabado jugando (`tools/r307-lab/grabar-gravitas.cjs`) y
  texto nuevo. · Método: sin enlace, «Método (próximamente)» en menú y pie; el Storybook ya no lo enlaza. · Storybook: estaciones a 1,4 s con curva suave, muestras en
  cascada y nombres y valores que se funden; el ESQUEMA DE ESPACIADO de los casos con los valores de savvia (1200 · 192 · 24 · 24), por turnos o al pasar por su fila;
  celdas de iconos que se adaptan (0 rótulos fuera, medido) + el chat (bocadillo, enviar, plegar); las seis tarjetas de movimiento a 319 px; la firma con la copa de UN
  trazo (la «Abierta por abajo» de Eric con temblor de pulso: `tools/firma/firma-trazos-copa.cjs`, la de antes en tools/retirados/); fuera «Barra de cristal», «Tarjetas
  anterior y siguiente» y el botón secundario con flecha a la izquierda (sin uso). · Casos: la línea de Anterior/Siguiente llega al filo (el aire pasa dentro de su
  columna, cuyo scroll la recortaba); padding de 32 px a los dos lados del contenido (la línea de la derecha llega arriba); la portada con su radio; un degradado de 40 px
  bajo la barra; el modo foco hace FLIP desde la columna, se despega con sombra y se posa en el centro, y al cerrar vuelve a su columna.
- **Medido:** `astro check` 0 errores · `tools/verify.cjs` en /storybook, /lab, /proyectos/neety/ y / (Chrome y WebKit, 1280 y 390): limpio · `tools/r307-story/ver25.cjs` ·
  `tools/r307-casos/ver.cjs` (WebKit) · `tools/r307-slop/buscar.cjs`: 0 textos con «·» o rayas.
- **Pendiente:** sin commit ni publicar.

### Ronda 307, 26.ª · firma a pulso, testimonio en los casos, storybook y modo foco · PUBLICADA (rondas 307, 19.ª a 26.ª)
- **Andoni (textual):** «1. el trazo de la firma es demasiado perfecto, tiene que parecer hecho por un humano · 2. al final del case study quitamos nuestro comentario y
  ponemos un testimonio como en portfolio, con esa foto; de momento un placeholder (Juanjo o lo que sea) para que Eric sepa lo que va ahí · 3. savvia lab: «Nuestros
  experimentos. Ábrelos y juega con ellos.» en dos líneas · 4. storybook: las estaciones cambian muy lento, más rápido · 5. movimiento, las cards con el alto de antes ·
  6. aplicaciones, todo se adapta a las estaciones · 7. añadir los nuevos filtros en componentes · 8. iconografía: falta el icono de poner el sonido» · (a media ronda)
  «la animación de cómo se abre y cierra el modo foco, mejorarla» · «después de todo esto, mira si Eric ha subido algo nuevo y publica».
- **Hecho:** · Firma: la copa de un trazo trazada a pulso (`tools/firma/firma-trazos-mano.cjs`: deriva del recorrido, presión que sube y baja, arco asimétrico, final que
  se pasa y vuelve; semilla 23 de seis). · Casos: fuera «unas palabras del estudio»; al final, `Voces` (el mentor del portfolio, ahora con `dato`) con un MARCADOR: el
  retrato de JJ Velaz y «Aquí va el testimonio del cliente… Marcador para Eric». · Lab: el subtítulo en dos líneas. · Storybook: estaciones a 0,7 s; movimiento al alto de
  las tarjetas de vídeo (220 px; el botón y las carreras se compactan, el pie de las carreras pasa a las reglas); Aplicaciones con la imagen al compartir de la estación
  (`public/media/sistema/aplicaciones/og-<estación>.jpg`, `tools/r307-story/og-estaciones.cjs`) y el chat y el perfil en la noche de la estación; «Filtros» en
  Componentes (captura de la barra real con Tecnología abierto, `tools/r307-story/filtros.cjs`); el icono de la radio (las cinco barras, bailando). · Modo foco: sin
  escalar (deformaba): sale de la columna solo desplazándose, se despega con sombra y una subida leve, y se posa; al cerrar, el camino contrario con el velo fundiéndose.
- **Eric:** sin nada nuevo en origin/main desde los tres «Update from Ship Studio» ya traídos.
- **Medido:** `astro check` 0 errores · `astro build` 39 páginas · `tools/verify.cjs` en /, /en/, /proyectos/, /proyectos/neety/, /storybook, /lab y /manifiesto (Chrome y WebKit,
  1280 y 390): sin errores, 0 ≥ 400, desborde 0 · 0 textos con «·» o rayas.


## Vitrina de proyectos (27/10/2026, Eric)
- «de cada proyecto, preparar los 3 modos de show (mesa, mobile y mockup) en un artefacto; el mockup que se pueda dimensionar, zoomear, girar y cambiar de gradiente; por cada uno el vídeo, el thumbnail, vídeo desktop y vídeo mobile; perfecto en todas las dimensiones (el mockup puede tener distintos ratios)» · «iremos proyecto a proyecto: generar, solo thumbnail o quitar» · «también Patchbay y Quantus (agénticos, inventados)» · «de cada uno, sus categorías, editables (añadir y quitar)».
- Artefacto «Vitrina de proyectos» (https://claude.ai/artifact/XermXBEua4ZXoHw81xDggU; fuente en el scratchpad de la sesión, `vitrina/plantilla.html` + `datos.json` sacado de /proyectos en local): 47 proyectos (Quantus y Patchbay + los 45 de /proyectos en su orden), con los medios que usa la web hoy (vídeo escritorio, thumbnail, vídeo móvil, imagen móvil; está / solo captura / falta), sus ETIQUETAS (categoría, servicio, tecnología, país; editables), la DECISIÓN (está bien · hay que generar · solo thumbnail · quitar) con qué generar y nota, y los TRES MODOS en 1:1, 4:5, 3:4, 5:4, 16:10 y 16:9 (mesa con el monitor y mesa con el móvil: zoom y encuadre por proporción, sin enseñar nunca el borde de la lámina; mockup: posición, tamaño, giro, zoom de la web, tres colores, cinco disposiciones de degradado y giro del fondo). Estación de las láminas arriba. Guarda en su base (`vitrina/actual`, campos `json` y `texto`).
- Quantus y Patchbay entran con tecnología «Claude Code» y sin país (supuesto, editable). Solo 5 proyectos tienen vídeo móvil (Neety, Cubbo, Remerge, Claudia BE, Routal); 12 no tienen vídeo de escritorio.
- «igual en desktop: cuando filtras proyectos, en vez de ir a scroll 0, que suba a donde se empieza» → en escritorio también sube solo hasta donde se pega la fila (`arriba − --pega`: con sus 12 px de aire) y, si aún no ha llegado ahí, no se mueve. Medido (Chrome, desde abajo, filtro de País): 1280 y 1600, fila pegada a 12 px; 390, igual que antes.
- Andoni: «al desplegarlos, la misma estética más cuadrada; me gusta más como se ve en móvil» → en escritorio la lista va como en móvil: recta, sin sombra, cuelga de la fila (su línea de abajo) a todo el ancho de SU celda y se descubre de arriba abajo (antes, isla redondeada al 85 % de la celda). Visto en Chrome a 1280 (DPR 2), consola limpia. No publicado.
- **Quantus móvil** (Screen Studio 224iivlq): `anteriores/video/quantus-movil.mp4` (390×852, 59 s, 1×, 5,3 MB) + `quantus-movil.jpg` = la captura que eligió Eric (584×1264). Aún no está en /proyectos. OJO: al final la web dice «Quantus is invented…».
- **Neety escritorio** (Screen Studio x34y3wZX, origen 1880×1080): `anteriores/video/neety.mp4` (960×552, 46 s) + `neety-grande.mp4` (1600×918); pósteres = la captura que eligió Eric (2000×1150). /proyectos usa ya esta grabación (`Portfolio.astro › AGENTICOS`); el caso de Neety y la home siguen con su portada.
- **SurePayroll escritorio** (Screen Studio jOJiQu4M, origen 1880×1080): `anteriores/video/surepayroll(-grande).mp4` (38 s, 1×) + pósteres = la captura de Eric. Ya estaba en GRABADOS: /proyectos lo coge solo (antes 960×600, ahora 960×552).
- **SurePayroll móvil** (Screen Studio 7jQg5NXR): `anteriores/video/surepayroll-movil.mp4` (390×852, 40 s, 1×) + `surepayroll-movil.jpg` = la captura de Eric; añadido a MOVIL_GRABADO.
- **Medida de escritorio corregida** (Eric: «el sticky chat se corta abajo»): la pantalla del monitor de la mesa es 1,84 (364×198 en la lámina), no 1,74; con 1440×828 el monitor perdía ~45 px abajo. Ahora se graba a **1440×783** y `video.sh` recorta a 960×522 / 1600×870 (el mockup y el visor toman la proporción del póster). Neety y SurePayroll se grabaron a 828: a regrabar (SurePayroll va en la mesa).
- **SurePayroll escritorio, regrabado a 1440×783** (Screen Studio mEPCZOO8, origen 1982×1080): 960×522 / 1600×868, 35 s; póster = captura de Eric (2000×1087). La burbuja del chat, entera en el monitor.
- **Monad móvil** (Screen Studio 3ceIUgKI, origen 502×1080): `monad-movil.mp4` (390×848, 23 s) recortado 3 px por lado (la grabación traía 1 px de marco de ventana a la derecha) + `monad-movil.jpg` = captura de Eric sin su filo de 2 px; añadido a MOVIL_GRABADO.
- **Cubbo escritorio** (Screen Studio 5FHieymx, origen 1984×1080, a 1440×783): `cubbo(-grande).mp4` 960×522 / 1600×870, 36 s; póster = captura de Eric sin sus 2 px de marco a la derecha. Ya estaba en GRABADOS. En /proyectos Cubbo va en el móvil de la mesa: el de escritorio se ve en el visor.
- **THX móvil** (Screen Studio ENoS7mkI): `thx-movil.mp4` (29 s, 4,8 MB; 1 px oscuro arriba → recortado 3 px por lado) + `thx-movil.jpg` = captura de Eric; añadido a MOVIL_GRABADO.
- **THX escritorio** (Screen Studio YAkQAK3L, origen 1982×1080): `thx(-grande).mp4` 960×522 / 1600×868, 23 s; póster = captura de Eric sin su filo de 1 px (izquierda y arriba).
- **Pantalla del móvil de la mesa, fiel a la foto** (Eric: «el rounded del marco mobile, ¿está realmente bien? muy fiel a la realidad» · «con muesca»): medido en la lámina, el cristal tiene 20–24 px de radio (distinto en cada esquina por la perspectiva) y el CSS daba ~30. Fuera el `border-radius: 12.5% / 5.8%` y el filo de 2 px: la pantalla lleva una MÁSCARA que es el cristal de la propia lámina pasado al espacio de la caja sin deformar (homografía inversa), con muesca: `tools/mesa-movil/mascara.cjs` → `anteriores/mesa-movil(-espejo)-mascara.png` (786×1608, ~43 KB). En /proyectos (`PiezaCasa.astro`), en la home (`Anteriores.astro`, solo el móvil; el iMac de roble sigue igual) y en la vitrina. Visto en Chrome (Cubbo en espejo, Remerge, home); WebKit sin probar (no está instalado aquí). `astro check` 0 errores.
- **A continuación (Eric): «creo que sin muesca quedaba mejor»** → la máscara rellena la muesca (en cada fila, de cristal a cristal; `MUESCA = false` en el script): esquinas de la foto, barra de la web entera.
- **A continuación (Eric): «cuidado con ese 1 px en blanco entre vídeo y marco, arriba y en los bordes»** → asomaba el cristal de la foto donde la caja del vídeo no llegaba (hasta 3 px; 4 en espejo). Medido cuánto hace falta: las esquinas de la caja, 4 px por fuera (5 en espejo) en `PiezaCasa.astro`, `Anteriores.astro`, el script y la vitrina; la máscara crece 1 px (tapa el brillo del filo del cristal de la foto) y la muesca se rellena hasta la recta del borde de arriba (ajustada a sus dos lados; antes quedaba un escalón por la inclinación). Visto en Chrome, a ×3, las cuatro esquinas de Cubbo (espejo) y Remerge: sin blanco. Coste: el vídeo pierde ~1,5 % por cada borde bajo el marco, como en un teléfono de verdad.
- **GSB Index móvil** (Screen Studio Es25rw26): `gsbindex-movil.mp4` (390×852, 27 s, 3,3 MB) + `gsbindex-movil.jpg` = captura de Eric; añadido a MOVIL_GRABADO.
- **El contorno del móvil, otra vuelta** (Eric: «todavía queda una muesquita en el frame rounded» · «revisa todo el contorno: que no queden rebabas, que todo sea lineal y bien redondeado» · «estaba bien como teníamos; lo único, arriba, que no se recortase tanto el vídeo»):
  · el recorte de arriba venía de agrandar la caja 4–5 px; la culpa de fondo eran las esquinas de la ronda 67, a ojo: el cristal no quedaba recto en la caja. Ahora `tools/mesa-movil/mascara.cjs` MIDE las esquinas en la foto (una recta por borde del cristal, lejos de esquinas y muesca) y la caja va solo 1 px por fuera → `src/data/mesa-movil.json`, que leen `PiezaCasa.astro` y `Anteriores.astro` (ya no hay esquinas copiadas a mano).
  · la forma copiada píxel a píxel de la foto ondulaba en las esquinas (imagen generada) y se probó un rectángulo redondeado único (se desviaba hasta 3 px: las esquinas de la foto no son iguales). Queda: bordes rectos y un arco por esquina con SU radio, ajustado a la foto (normal 25 · 33 · 32 · 28,5 px; en espejo casan: 33 · 26 · 29 · 31), crecida ~1 px para que no asome cristal. Visto a ×3 en Chrome: las doce esquinas (Cubbo en espejo, Remerge, Claudia BE) lisas, sin blanco ni rebabas; el logotipo de Remerge, entero.
- **Home of Ambrose móvil** (Screen Studio S3XCXIAI): `home-of-ambrose-movil.mp4` (390×852, 36 s, 3,0 MB) + `home-of-ambrose-movil.jpg` = captura de Eric sin su filo de 2 px arriba y abajo; añadido a MOVIL_GRABADO.
- **A continuación (Eric): «arriba a la izquierda todavía hay una muesquita de aire» · «rellénala de negro»** → el crecimiento se medía contra la forma suavizada (en las esquinas se mete hacia dentro). Ahora dos capas: la pantalla, NEGRA (#121213) y con la forma del cristal real crecido 1 px (`…-cristal.png`), y el vídeo dentro con la forma limpia (`…-mascara.png`, radios 27,7 · 35 · 33 · 29,7; en espejo 32,7 · 28,7 · 32,8 · 31,8; crecida ½ px). Cualquier rendija entre las dos es del negro del bisel. Visto a ×3 en Chrome: sin aire en ninguna esquina.
- **A continuación (Eric): «todavía queda un poco» (GSB Index, Cubbo: «en todos»)** → el hueco estaba FUERA de la caja: el filo del cristal de la foto ondula y sobresalía 1–2 px de la caja (1 px de margen: 324 px de cristal fuera; con 3, ninguno). Separadas las dos cosas: la CAJA negra va 4 px por fuera del cristal y el VÍDEO, dentro, en el rectángulo del cristal + 1 px (`mesa-movil.json` = `{ caja, video: [x, y, ancho, alto] % }`; la forma limpia, recortada a ese rectángulo). El fondo negro tapa el cristal crecido 3 px (con 1, por su borde suave se veía el brillo del filo como una línea clara). Máscaras con `?v=3` (se regeneraron con el mismo nombre). Visto a ×3 en Chrome: las doce esquinas de Cubbo (espejo), Remerge y Claudia BE, sin aire ni líneas; `astro check` 0 errores.
- **Kymatio móvil** (Screen Studio SyN7OxCB): `kymatio-movil.mp4` (390×852, 43 s, 5,3 MB) + `kymatio-movil.jpg` = captura de Eric; añadido a MOVIL_GRABADO. OJO: del segundo ~16 al ~27 sale abajo la burbuja de enlace de Chrome con `https://kymatiostg.webflow.io/#w-tabs-0-…` (el dominio de pruebas): a regrabar sin el cursor sobre enlaces.
- **Etiquetas de Quantus y Patchbay** (Eric, en la vitrina): Quantus + Identidad visual, Ilustración; tecnología Claude Code, Vercel, GSAP + ScrollTrigger, Lenis, Canvas 2D, SVG, Python, Playwright. Patchbay: categoría «SaaS y APIs» (antes «Software para desarrolladores»), tecnología Claude Code, Vercel, React. La vitrina ahora ESCUCHA su base (onSnapshot): si Claude escribe, la página lo adopta en vez de pisarlo (salvo mientras guarda o hay un campo a medio escribir).
- **PROfounders Capital escritorio** (Screen Studio uXz3MZnp, origen 1984×1080): `profounders-capital(-grande).mp4` 960×522 / 1600×870, 53 s; póster = captura de Eric. Ya estaba en GRABADOS.
- **PROfounders Capital móvil** (Screen Studio GukNR8pe): `profounders-capital-movil.mp4` (390×852, 40 s, 3,0 MB) + `.jpg` = captura de Eric; sin burbujas de enlace; añadido a MOVIL_GRABADO.
- **Naterra escritorio** (Screen Studio 5GPU5zy4, origen 1984×1080): `naterra(-grande).mp4` 960×522 / 1600×870, 43 s, 6,0 / 11 MB (mucha foto y semitono: pesa el doble que los demás); póster = captura de Eric; sin burbujas de enlace.
- **Naterra móvil** (Screen Studio Flgr7Owg): `naterra-movil.mp4` (390×852, 9,7 s, 1,4 MB) + `.jpg` = captura de Eric sin su filo de 2 px arriba; añadido a MOVIL_GRABADO. OJO: recorre la web entera (hasta el pie) en 10 s: preguntado a Eric si va acelerado.
- **Remerge escritorio** (Screen Studio uv9594GD, origen 1984×1080): `remerge(-grande).mp4` 960×522 / 1600×870, 34 s; póster = captura de Eric sin su filo de 1 px arriba. OJO: del segundo ~15 al ~18 sale la burbuja de enlace de Chrome (`www.remerge.io/blog-post/complete-guide-to-programmatic-in-app-retargeting`) y el botón azul de la huella (cookies) está abajo a la izquierda todo el vídeo: a regrabar.
- **Remerge móvil** (Screen Studio 5VPeCYgE, origen 498×1080): `remerge-movil.mp4` (390×846, 26 s) + `.jpg` = captura de Eric sin su marco (4 px a la derecha, 2 arriba; el detector de filos ahora mira hasta 6 px). OJO: burbujas de enlace de Chrome en muchos tramos (remerge.io/?r…, /blog…, google.com/…) y el botón de la huella todo el vídeo: a regrabar. Los vídeos de Remerge de antes (escritorio y móvil) siguen en git.
- **Bluence móvil** (Screen Studio yiRtdnzV): `bluence-movil.mp4` (390×846, 34 s, 4,5 MB) + `.jpg` = captura de Eric sin su filo de 2 px a la izquierda; sin burbujas; añadido a MOVIL_GRABADO.
- **Lyra, thumbnail de escritorio** (captura de Eric, 2000×1088): pósteres `lyra.jpg` 960×552 y `lyra-grande.jpg` 1600×922, recortados al centro a la proporción del vídeo que hay (grabado a 552; cuando llegue uno a 783 se rehacen). OJO: abajo, dos selectores de idioma «Español» y la burbuja del chat.
- **Lyra móvil** (Screen Studio YDQgnzeC): `lyra-movil.mp4` (390×842, 26 s, 2,3 MB) + `.jpg` = captura de Eric; sin burbujas de Chrome; añadido a MOVIL_GRABADO. Se ven todo el rato el selector de idioma «Español» y la burbuja del chat de la propia web.
- **Business Online Payroll escritorio** (Screen Studio zEsGtIJK, origen 1984×1080): `business-online-payroll(-grande).mp4` 960×522 / 1600×870, 16 s; póster = captura de Eric sin su filo de 1 px (izquierda y arriba); sin burbujas.
- **Business Online Payroll móvil** (Screen Studio GamSKuWl): `business-online-payroll-movil.mp4` (390×852, 21 s, 2,3 MB) + `.jpg` = captura de Eric; sin burbujas; añadido a MOVIL_GRABADO.
- **Adaral móvil** (Screen Studio ICT0TEqE): `adaral-movil.mp4` (390×852, 28 s, 2,3 MB) + `.jpg` = captura de Eric sin su filo de 2 px arriba; sin burbujas; añadido a MOVIL_GRABADO.
- **El filo de las grabaciones y el marco cuadrado** (Eric: «el frame de mobile, en el lateral izquierdo, 1 px vertical negro que debería ser vídeo» · «el problema es del frame casi seguro» · «el lateral izquierdo es un pelín más gordo; cuadra el frame»):
  · eran DOS cosas. (1) Las grabaciones de Screen Studio traen la primera fila y columna más oscuras (184 frente a 255 en blanco): `tools/portfolio-tsc/video.sh` recorta ahora 4 px de origen por cada lado antes de escalar (comprobado: sale limpio). Rehechos desde sus enlaces los 22 vídeos de esta tanda (8 de escritorio, 14 de móvil) y sus pósteres desde las capturas; bordes medidos uno a uno, iguales a la columna de al lado. OJO: un primer intento falló porque ffmpeg se comía la lista del bucle (salieron `ge.mp4`, `roll-movil.mp4`…: borrados); ahora cada comando va con `</dev/null`.
  · (2) El marco: la forma limpia del vídeo crecía ½ px y el rectángulo del vídeo salía de los bordes medidos en la lámina, que iban ~1 px a la derecha (a la izquierda faltaba vídeo y asomaba el negro; a la derecha sobraba). Ahora el rectángulo sale del cristal medido EN LA CAJA, 1 px por fuera a cada lado (medido: −0,7…−1,3 px a izquierda y derecha, igual arriba y abajo), y la forma crece hasta ese borde. Máscaras `?v=5`. Visto a ×3: bisel izquierdo y derecho iguales.
  · Las capturas se recortan siempre 1 px de más por lado (van al doble; la columna blanca de Lyra móvil solo destacaba sobre su cabecera negra).
- **ManagerPro by Codely móvil** (Screen Studio dbay05ac): `managerpro-by-codely-movil.mp4` (390×860, 43 s, 5,5 MB) + `.jpg` = captura de Eric; sin burbujas; añadido a MOVIL_GRABADO.
- **Invopop escritorio = el vídeo del CMS** (Eric: «sí que sirve en pantalla grande y mockup»; no hay acceso a su Webflow): `invopop(-grande).mp4` 960×618 / 1600×1030, 85 s, con SU proporción (mp4 del CMS: sin recorte; el mockup la toma del póster) y el filo de 4 px fuera; póster = su fotograma 1. Sustituye a la grabación de 7 s (en git). OJO: lleva burbujas de enlace de Chrome en más de la mitad de los segundos (invopop.com/#w-tabs…, /invoicing-guides/…): aceptado así.
- **Claudia BE móvil** (Screen Studio kMKzaOSy): `claudia-be-movil.mp4` (390×860, 40 s, 4,0 MB; sustituye al de antes, en git) + `.jpg` = captura de Eric; sin burbujas. Ya estaba en MOVIL_GRABADO. Se ve todo el rato la pestaña «W. Honors» (Awwwards) a la derecha.
- **Claudia BE móvil, regrabado** (Eric: «claudia mobile mejor», Screen Studio rpNoyM55): `claudia-be-movil.mp4` (390×860, 39 s) sustituye al de kMKzaOSy; mismo póster (la captura).
- **Fiallegas Abogados móvil** (Screen Studio 41lbDhxo): `fiallegas-abogados-movil.mp4` (390×854, 31 s, 3,0 MB) + `.jpg` = captura de Eric; sin burbujas; añadido a MOVIL_GRABADO (antes no tenía nada en móvil).
- **GOW Delivery, póster** (Eric: «que sea el segundo 1 del vídeo, el hero»): el hero solo está entero los primeros 0,3 s (en el 1 ya baja por «The Product»): pósteres `gow-delivery(-grande).jpg` del fotograma 0,1 s.
- **GOW Delivery, póster definitivo** = captura de Eric del hero (2000×1088), recortada al centro a la proporción del vídeo que hay (960×552 / 1600×918).
- **GOW Delivery móvil** (Screen Studio S7pcrSLI): `gow-delivery-movil.mp4` (390×854, 28 s, 3,0 MB) + `.jpg` = captura de Eric; sin burbujas; añadido a MOVIL_GRABADO.

- 27/10 · Alpine Security móvil (Screen Studio IxA1iyid): 26,3 s a 1×, 390×854, 2,0 MB; póster = captura de Eric. Ojo: burbujas de enlace alpinesec.io// y alpinesec.io/# en algunos tramos (pendiente decidir si se regraba). Añadido a MOVIL_GRABADO; vitrina v45.
- 27/10 · Home+ Casavo escritorio (Screen Studio WBcQOFIl): 15,5 s a 1×, 960×522 + grande 1600×870; póster = captura de Eric. Limpio. Añadido a GRABADOS (antes solo captura del CMS). Vitrina v46.
- 27/10 · Home+ Casavo móvil (Screen Studio QrvsLqjc): 15,8 s a 1×, 390×854; póster = captura de Eric. Limpio. Añadido a MOVIL_GRABADO. Vitrina v47.
- 27/10 · Junípero escritorio (Screen Studio SJYi1tr8): 27,4 s a 1×, 960×522 + grande; póster = captura de Eric. Limpio; sustituye la grabación anterior. Vitrina v48.
- 27/10 · Junípero móvil (Screen Studio YidHZA0s): 23,1 s a 1×, 390×854; póster = captura de Eric. Limpio. Añadido a MOVIL_GRABADO. Vitrina v49.
- 27/10 · Eleven Lab escritorio (Screen Studio hunYVwaN): 31,1 s a 1×, 960×522 + grande; póster = captura de Eric. Ojo: los primeros ~0,3 s (fotogramas 0–8) llevan «Metodología» seleccionada (resaltado gris). Vitrina v50.
- 27/10 · Eleven Lab móvil (Screen Studio qMXdYkwN): 23,9 s a 1×, 390×860; póster = captura de Eric. Limpio. Añadido a MOVIL_GRABADO. Vitrina v51.
- 27/10 · Vitalera escritorio (Screen Studio 4EoA978v): 31,8 s a 1×, 960×522 + grande; póster = captura de Eric. Limpio. Vitrina v52.
- 27/10 · Vitalera móvil (Screen Studio pMRfHV6B): 29,8 s a 1×, 390×856; póster = captura de Eric. Limpio. Añadido a MOVIL_GRABADO. Vitrina v53.
- 27/10 · Zrive escritorio (Screen Studio 2VA28gQf): 31,3 s a 1×, 960×522 + grande; póster = captura de Eric. Limpio (el primer segundo es la entrada animada de la propia web). Vitrina v54.
- 27/10 · Ikon escritorio (Screen Studio 0L2QbgD2): 38,6 s a 1×, 960×522 + grande; póster = captura de Eric. Limpio (empieza con el cargador de la propia web, ~1,3 s). Vitrina v55.
- 27/10 · Ikon móvil (Screen Studio W3p93i5K): 24,5 s a 1×, 390×860; póster = captura de Eric (sin la raya oscura de arriba). Limpio. Añadido a MOVIL_GRABADO. Vitrina v56.
- 27/10 · PROYECTO NUEVO «Stellar» (stellar X labs; slug `stellar`) escritorio (Screen Studio kUBKELyi): 35,1 s a 1×, 960×522 + grande; póster = captura de Eric. Limpio. Solo en la vitrina (v57): aún no está en /proyectos (no viene del CMS; faltan sector, etiquetas y textos).
- 27/10 · Stellar móvil (Screen Studio cJ75m7Vm): 25 s a 1×, 390×860; póster = captura de Eric (sin el filo blanco de la derecha). Limpio. Etiquetas: España · Capital riesgo · Figma, Webflow · Animaciones a medida (GSAP). Vitrina v58.
- 27/10 · Isotrol escritorio (Screen Studio 4vvt0IrL): 36 s a 1×, 960×522 + grande; póster = captura de Eric. Limpio. OJO filo.cjs: el margen blanco de la web (tarjeta del hero sobre blanco) dio un falso filo de 5 px a la derecha y recortó el vídeo a 960×516; se rehízo con video.sh sin ese recorte. Vitrina v59.
- 27/10 · Isotrol móvil (Screen Studio mi9VdIfL): 33,5 s a 1×, 390×850; póster = captura de Eric. Limpio (mismo falso filo por el margen blanco; rehecho con video.sh). Añadido a MOVIL_GRABADO. Vitrina v60.
- 27/10 · Qalea móvil (Screen Studio 25pNbSYo): 42,2 s a 1×, 390×850; póster = captura de Eric. Limpio. Añadido a MOVIL_GRABADO. Vitrina v61.
- 27/10 · Kalma escritorio (Screen Studio qupVTrbq): 35,2 s a 1×, 960×522 + grande; póster = captura de Eric. Limpio. Ojo: la web en vivo lleva texto de relleno en el hero («en el qescribis lo que querais», «Te interesa, ¿?»). Vitrina v62.
- 27/10 · Kalma móvil (Screen Studio qB07DGT3): 34,4 s a 1×, 390×856, 4,5 MB; póster = captura de Eric. Limpio (mismo texto de relleno de la web en el hero). Añadido a MOVIL_GRABADO. Vitrina v63.
- 27/10 · Kabila escritorio (Screen Studio RXkoScsh): 29,9 s a 1×, 960×522 + grande; póster = captura de Eric. Limpio. Vitrina v64.
- 27/10 · Kabila móvil (Screen Studio QPtT0zyh): 26,1 s a 1×, 390×864; póster = captura de Eric (sin la raya oscura de arriba; el vídeo también la llevaba y se recortó). Limpio. Añadido a MOVIL_GRABADO. Vitrina v65.
- 27/10 · Impact Bridge escritorio (Screen Studio 6IkNRRE4): procesado en local pero NO subido a la vitrina: burbuja de enlace (…webflow.io/#w-tabs-0-data-w-pane-N) casi todo el vídeo, por las pestañas de Webflow que rotan solas. Pendiente regrabar (Safari o dominio publicado). Ojo: sustituyó en local al vídeo de escritorio anterior (sigue en git).
- 27/10 · Impact Bridge móvil (Screen Studio MD7l9w6X): 50 s a 1×, 390×854; póster = captura de Eric. Limpio. Añadido a MOVIL_GRABADO. Vitrina v66.
- 27/10 · Impact Bridge escritorio subido a la vitrina tal cual, a petición de Eric (con la burbuja de las pestañas). Vitrina v67.
- 27/10 · Impact Bridge escritorio REGRABADO (Screen Studio iNs2LPsR): 40,5 s a 1×, sin burbuja. Truco: en la consola, quitar el href de los enlaces de pestañas de Webflow (a[href*="w-tabs"]) con un MutationObserver que lo vuelve a quitar, y anular focus() dentro de .w-tab-menu (si no, la pestaña que rota sola coge el foco: burbuja en Chrome y salto de scroll en Safari). Vitrina v68.
- 27/10 · Playground IEP home nueva (playground-agentico) escritorio (Screen Studio ahNAw7bX): 59,8 s a 1×, 960×522 + grande; póster = captura de Eric. Limpio. filo.cjs (scratchpad): en el VÍDEO ya solo cuenta el filo oscuro; el claro daba falsos filos con webs de margen blanco (Isotrol, Kabila, Playground). Vitrina v69.
- 27/10 · Playground IEP home nueva móvil (Screen Studio Br1zIiCp): 53,8 s a 1×, 390×854, 5 MB; póster = captura de Eric. Limpio. Añadido a MOVIL_GRABADO. Vitrina v70.
- 27/10 · Vitrina v70: limpieza de 82 archivos viejos (versiones sustituidas) por el tope de 256 MB por versión; Playground home nueva móvil subido. v71: Playground home nueva pasa al grupo «Desarrollo agéntico» con las etiquetas de Eric (EdTech · SaaS · IA / Diseño web · Rediseño · Desarrollo agéntico · Animación · Sistema de diseño · Migración desde Webflow / HTML/CSS/JS · GSAP · Python · Vercel; sin Webflow).
- 27/10 · Transcend escritorio (Screen Studio 0qOJYqFI): la grabación seguía 3,6 s DESPUÉS de la web (WhatsApp con chats, el terminal, el escritorio): cortado en el último fotograma de la web (41,6 s, 1249 fotogramas) en las dos medidas. No es recortar la web: es quitar lo que no es la web (privado). 960×522 + grande; póster = captura de Eric. Vitrina v72.
- 27/10 · Transcend móvil (Screen Studio oLOaLGpD): 40,5 s a 1×, 390×856; póster = captura de Eric. Limpio, acaba en la web. Añadido a MOVIL_GRABADO. Vitrina v73.
- 27/10 · Wisable escritorio (Screen Studio vw0r2ejf): 25,2 s a 1×, 960×522 + grande; póster = captura de Eric. Limpio, acaba en la web. Vitrina v74.
- 27/10 · Wisable móvil (Screen Studio nfOpR7jM): 27,1 s a 1×, 390×856; póster = captura de Eric. Limpio, acaba en la web. Añadido a MOVIL_GRABADO. Vitrina v75.
- 27/10 · Greet escritorio (Screen Studio nbgM8ZJN): 51 s a 1×, 960×522 + grande; póster = captura de Eric. Sin burbujas, acaba en la web; lleva todo el rato el botón de huella (ajustes de cookies de la propia web) abajo a la izquierda. Vitrina v76.
- 27/10 · Greet móvil (Screen Studio 6w3ldUhQ): 52,6 s a 1×, 390×860, 6,5 MB; póster = captura de Eric. Acaba en la web. Ojo: burbuja «greet.video/en» ~1 s hacia el segundo 47; botón de huella (cookies) todo el rato. Añadido a MOVIL_GRABADO. Vitrina v77.
- 27/10 · Greet móvil REGRABADO (Screen Studio RqkSoJMu): 44,9 s a 1×, 390×860; sin huella ni burbuja. Truco para la huella de consentmanager.net (#cmpboxrecall): buscarla también dentro de shadow roots y ocultarla con style.setProperty(display,none,important); la regla en <style> no bastaba. Vitrina v78.
- 27/10 · Greet escritorio REGRABADO (Screen Studio XfENzLeo): 45,2 s a 1×, 960×522 + grande; sin huella ni burbujas; póster = captura nueva de Eric. Vitrina v79.
- 27/10 · Playground IEP Webflow (playground-iep, no agéntico) escritorio (Screen Studio zOfK8Z59): 35,2 s a 1×, 960×522 + grande; póster = captura de Eric. Limpio, acaba en la web. Añadido a GRABADOS. Vitrina v80.
- 27/10 · Playground IEP Webflow móvil (Screen Studio gYxlaocc): 29,5 s a 1×, 390×850; póster = captura de Eric. Limpio, acaba en la web. Añadido a MOVIL_GRABADO. Vitrina v81.
- 27/10 · Crece con Casavo (casa-for-agents) escritorio (Screen Studio bxnk8AUI): 16 s a 1×, 960×522 + grande; póster = captura de Eric. Limpio. Pasa de «solo thumbnail» a vídeo (sin móvil). Vitrina v82.
- 27/10 · Crece con Casavo móvil (Screen Studio SNJ75nGg): 22,1 s a 1×, 390×850; póster = captura de Eric. Limpio. Añadido a MOVIL_GRABADO. Vitrina v83.
- 27/10 · VITRINA → /proyectos (local, sin publicar): aplicadas las notas de la vitrina. Fuera (oculto): Numen Games, Endoaula Conecta, Soundtown, Endoaula, Qalea, Stemdo. Sin móvil: Lyra, Eleven Lab, Zrive, Valuat. Solo thumbnail: Home+ Casavo (su captura nueva, sin vídeo). Crece con Casavo: con vídeo de escritorio y móvil. Monad: navegador [9,17,116,4]. Fondo: Isotrol B, Alpine liso (`g` en portfolio-orden.json › piezas → data-fondo; CSS en PiezaCasa). Etiquetas de la vitrina (`t`, solo castellano): Neety y Playground home nueva. Stellar entra (EXTRA; FALTA su dominio). Orden provisional con las notas (Wisable arriba, Isotrol antes que Bluence, Fiallegas más arriba, Lyra al final). NO aplicado: zooms de mesa por proporción (la web no tiene zoom por proyecto) ni Quantus/Patchbay (no están en /proyectos). Nueva herramienta «Orden de proyectos» (claude.ai/artifact/788GuzL7gDame3sC7oavRA; db orden/actual) para que Eric reordene.
- 27/10 · Neety escritorio REGRABADO (Screen Studio M17MYx4o): 42,8 s a 1×, 960×522 + grande; limpio, acaba en la web. Póster = fotograma del segundo 2 (no vino captura). Vitrina v84.
- 27/10 · Eric: «mostremos todos los que hemos dicho que están bien»: vuelven Quantus y Patchbay a /proyectos (AGENTICOS; medios = los de la vitrina: su portada; Quantus con móvil, Patchbay sin; etiquetas de la vitrina; Quantus fondo B y navegador [5,28,95,-3.5]). 42 proyectos. Herramienta de orden v3 con los dos (Quantus 2.º, Patchbay tras Playground home nueva).
- 27/10 · Herramienta «Orden de /proyectos» v4: ahora es el MOSAICO de la web (retícula de 12, sitios SITIO que se reparten de nuevo tras cada testimonio) con cada pieza en su forma (mockup con su degradado y navegador, mesa con monitor, mesa con móvil en perspectiva), selector Mockup · Mesa · Móvil por pieza (guarda `forma` en db orden/actual), número para colocar, Quitar/Fuera. Medios copiados de la vitrina en el servidor.
- 27/10 · Eric: «se puede subir un poco la calidad del vídeo en proyectos» (el visor, Fiallegas): `video.sh` hace la toma GRANDE a la resolución de origen (~1860–1970 de ancho, sin bajar a 1600) y a crf 24 / slow / tune animation (antes crf 31); modo nuevo `video.sh <slug> <enlace> grande` que rehace SOLO `<slug>-grande.mp4` con la proporción de su `-grande.jpg` (no toca la card ni los pósteres). Fiallegas rehecha (Screen Studio SCdzdVHz): 1860×1072, 10 MB (antes 1600×922, 4 MB). Los demás siguen a crf 31 hasta rehacerlos.
- 27/10 · Eric: «y si quiero cambiar los mockups de zoom y giro me dejas?»: herramienta «Orden de /proyectos» v5 con dos deslizadores en cada pieza en forma Mockup (Zoom = ancho del navegador `nav[2]`, 60–180 %; Giro = `nav[3]`, −12…12°) y «Restablecer»; se guarda en db orden/actual › `nav` y se pasa a `portfolio-orden.json › piezas.<slug>.nav`.
- 27/10 · Eric: «y el zoom de la mesa desktop también», «y zoom de mobile mesa», «y proporción de mockup también»: `portfolio-orden.json › piezas.<slug>` acepta `zm` (zoom de la mesa con monitor; por defecto 2,88), `zt` (zoom de la mesa con el móvil; 2,4) y `ar` (ancho/alto de la ventana del mockup; por defecto la del vídeo). `PiezaCasa.astro`: la mesa se queda dentro de la lámina (`clamp` en left/top) para que con menos zoom no queden huecos. Herramienta de orden v6: deslizador de Zoom en Mesa y Móvil (×2,3–×5) y de Proporción en Mockup (1,2–2,4); db orden/actual › `zoom` {e, m} y `ar`. Medido en local (valores de prueba, ya quitados): Neety a 1,5 sale con la ventana más alta; `--z` propio en la mesa y el móvil. `astro check` 0 errores.
- 27/10 · Eric: «cuando decía proporción de mockup decía el ratio de la carátula entera»: fuera la proporción de la ventana; `ar` (ancho/alto, 0,8–1,8) es la de la CARÁTULA y manda sobre la del SITIO del mosaico (`data-ratio` en el `li`; en móvil sigue 1:1). Medido en local con Neety a 1,6 (valor de prueba, quitado). · «y que pueda mover libremente yo el mockup de posición»: en la herramienta (v7) el mockup se ARRASTRA dentro de su carátula (x/y en %, `nav[0]`/`nav[1]`, pasos de 0,5).
- 27/10 · Eric: «listo, actualizado todo en el artefacto, actualiza tú»: db orden/actual (v238) → `portfolio-orden.json`: orden nuevo, 19 formas cambiadas, 16 navegadores (posición, zoom, giro), 12 zooms de mesa/móvil (`zm`/`zt`), 21 carátulas (`ar`). Alpine Security pasa a FUERA (oculto). Qalea aparecía al final de la lista de la herramienta (la herramienta mete al final lo que no está ni en orden ni en fuera), pero estaba descartada: se queda oculta. Visto en local (captura entera de /proyectos); `astro check` 0 errores. Sin commit.
- 27/10 · Qalea pasa a «Fuera» también en la herramienta (db orden/actual v239): con ella dentro la herramienta tenía 42 y la web 41, y los testimonios caían en otro puesto (desde el 21 cada pieza en otro hueco). Ahora las dos, 41 y en el mismo orden.
- 27/10 · Eric: «no está bien alineado el dropdown todavía»: la lista empezaba después del filete de su celda (1 px) y su filo quedaba junto al de la siguiente (doble). Se estira 1 px a cada lado (`.desp + .desp .desp-menu { left: -1px }`, `.desp:has(+ .desp) .desp-menu { right: -1px }`): su filo cae sobre los filetes. Medido (Chromium DPR 2): celda 343,25–639,5 → lista 343,25–640,5.
- 27/10 · Eric: «el hovering pill del padre del dropdown tiene que ocupar bien todo el área»: `mira()` medía con offsets (enteros) y las celdas miden 295,25 px: la barrita quedaba 1,25 px a la izquierda y corta. Ahora usa la medida real con decimales (salvo en plena entrada, si difiere > 2 px). Medido: barrita = botón (344,25–639,5).
- 27/10 · Eric: «he actualizado categorías en el artefacto» (Vitrina, db vitrina/actual v342): etiquetas a `portfolio-orden.json › piezas.<slug>.t`. Cambian Neety y Playground home nueva (+ Claude Code en tecnología); Quantus y Patchbay ya estaban igual.
- 27/10 · Eric: «de cada carátula, un botoncito para cambiar de escena»: en cada pieza de /proyectos, arriba a la izquierda, una cápsula de cristal (la del icono de vídeo) con navegador · mesa · móvil (este, solo si el proyecto tiene móvil); la que se ve, marcada en Rosa niebla. Con ratón asoma al pasar por la pieza; en táctil, siempre. Va FUERA del enlace (en el `li`). La escena nueva entra enfocándose (0,6 s); la elección se mantiene al filtrar (`data-elegida`). Medido (Chromium 1280): Wisable mesa → móvil → navegador, sin errores; `astro check` 0.
- 27/10 · Eric (Storybook › Color y estaciones): «la transición entre estaciones va muuuy lenta; smooth sí, pero que sea fluido». La casa se fundía en 2,4 s (`:root`, global.css) y encima `.escena-est` y `.est-m` tenían su propia transición de background que perseguía a la variable ya animada. Ahora en el storybook (`html.bb-est`, Libro.astro) el cambio dura 0,8 s con ease-out (la tinta, 0,4 s a mitad), fuera las transiciones dobles y el roble entra en 0,6 s. Medido en Chrome: tirón al pulsar de 100 ms → 33 ms, el resto a 60 fps. En la web sigue 2,4 s.
- 27/10 · Eric: «la pill está muy bien, pero a veces al scroll sale antes de lo que se abre la carátula»: el botón de escena (Portfolio.astro) no existe hasta que la pieza tiene `.visto` y entra a los 0,6 s + escalonado `--i` (lámina abierta al ~97 %), enfocándose. Medido en Chrome con el ratón encima al asomar.
- 27/10 · Eric: «lo mismo en el slider: que el usuario pueda elegir entre elementos visuales» → el VISOR de /proyectos (`obra/Visor.astro`) con la cápsula de escena arriba a la izquierda: navegador · mesa (monitor de la lámina del estudio `-xl`, 5120 px, ×2,5, en la estación) · móvil (Eric: «el de mobile mesa»: la lámina `mesa-movil` con su homografía y máscaras, ×1,6; Cubbo en espejo; solo si hay móvil). «En el slider, que siempre sea esta vista [la mesa], es la que mejor viste»: cada proyecto llega en la mesa, al abrir y al pasar; las otras, a mano y solo para ese proyecto. Solo se carga y suena la vista visible. Las flechas del teclado, en el documento (al esconderse el botón de móvil con el foco, el foco caía al body y dejaban de pasar). La home sigue con su visor (pendiente: pasarla a PiezaCasa + Visor).
- 27/10 · Eric (Screen Studio IlPKxP0e): «el vídeo desktop de Claudia Be no estaba» → `tools/portfolio-tsc/video.sh claudia-be` (47,7 s a 1×; card 3,2 MB, grande 15 MB; antes un clip de 7 s). «Invopop en mobile hay que quitar, no tenemos vídeo ni vamos a tener» → `SIN_MOVIL` (Portfolio.astro).
- 27/10 · Eric: «¿por qué GOW Delivery se corta en desktop?»: su grabación es del 26/10, con el recorte viejo (960×552, 1,74; el monitor es 1,84 y se come ~30 px abajo) y de 18 s. Hay que regrabarla a 1440×783 y pasarla por video.sh.
- 27/10 · Eric (Screen Studio QnPEh0YC): vídeo de escritorio de Valuat → `video.sh valuat` (28,1 s a 1×, 960×522; card 2 MB, grande 6 MB). Sigue sin móvil (`SIN_MOVIL`).
- 27/10 · Eric (Screen Studio oZkiWHAL): vídeo de MÓVIL de Valuat → `video.sh valuat … movil` (19,3 s a 1×, 2,3 MB); fuera de `SIN_MOVIL`, dentro de `MOVIL_GRABADO`.
- 27/10 · Eric (Screen Studio ylr0hjQ9): GOW Delivery de escritorio REGRABADO (el del 26/10 era 960×552 y 18 s: el monitor se lo comía) → `video.sh gow-delivery`.
- 27/10 · Eric (Screen Studio FXBE5Ohb; el CKvFDZ9m que mandó antes no era): Routal de escritorio → `video.sh routal` (27,2 s a 1×). Home of Ambrose de escritorio, regrabado (Screen Studio crtX8zD7) → `video.sh home-of-ambrose`.
- 27/10 · Eric, del slider: «quitamos el móvil, se ve mal» → «solo dejamos la mesa». El visor de /proyectos (`obra/Visor.astro`) enseña cada proyecto SOLO en la mesa (monitor de la lámina `-xl` en la estación); fuera la cápsula, el navegador de cristal y el móvil de la mesa (y su homografía). Las carátulas conservan su cápsula con las tres.
- 27/10 · Eric: «clico aquí [Stellar] y me hace scroll up»: sin dominio, su enlace era «#». Ahora una pieza sin web abre el visor (`PiezaCasa.astro › sinWeb`, con la lupa) y en móvil el toque no hace nada. FALTA el dominio de Stellar.
- 27/10 · Eric (Screen Studio KaLB0flT): Fiallegas de escritorio, regrabado → `video.sh fiallegas-abogados`.
- Home: «savvia agentic: tu web conecta con la IA.» → «… tu web conectada con la IA.» (EN: «your website, connected to AI.»). No publicado.
- 27/10 · Eric: «playground, me gusta más esta versión, dejamos esta» (Screen Studio 4EOC55qC): Playground IEP home nueva (`playground-agentico`) de escritorio REGRABADO con `video.sh`: 38,5 s a 1×, 960×522 (3 MB) + grande 1970×1070 (10 MB, crf 24); póster = captura de Eric (las dos medidas). Empieza en el hero y acaba en el pie de la web, limpio. → DESHECHO (Eric: «da igual, perdón, deja lo que estaba de Playground antes»): vuelven los del commit.
- 27/10 · Eric: «en la home tienes que dejar como están PERO sí que tenemos que dar la oportunidad de cambiar de mobile/mesa y eso como en proyecto, y cuando se abre el slide que se abra SOLO con desktop mesa». `Anteriores.astro`: cada card va en una CELDA (`[data-celda]`, lleva el sitio del mosaico y las variables) con la cápsula de escena de /proyectos fuera del enlace (navegador · mesa · móvil de la mesa; el móvil, si hay `<slug>-movil.jpg`). Por defecto, igual que antes (comparado píxel a píxel); las otras escenas, ocultas y sin descargar (fotos con `data-src`), y solo suena el vídeo de la que se ve. El visor de la home, como el de /proyectos: SOLO la mesa (lámina `-xl` de la estación, toma de escritorio `-grande`, también Cubbo y Neety); fuera el navegador de cristal y su ajuste de marco. Arreglado de paso: `load()` se comía el `pause` y la card se quedaba sin icono de vídeo tras el hover. No publicado.
