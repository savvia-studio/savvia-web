# Savvia — Guía de diseño

> Texto de Andoni, 21/09/2026, tal cual. **Es la fuente de verdad visual de esta web.** Los tokens de
> `src/styles/global.css` salen de aquí; si algo no coincide, manda este documento.
> Al final, «Aplicación en esta web»: lo que Nilo ha medido y decidido al aplicarla (eso sí se puede discutir).

Usa esta guía al crear páginas, interfaces y aplicaciones de Savvia. La marca combina **calidez de hogar, criterio, elegancia y una personalidad enérgica y juguetona**.

Los colores y las familias tipográficas están elegidos. Las medidas de tipografía y espaciado son la base propuesta para mantener coherencia.

## 1. Colores

| Color | HEX | Uso principal |
|---|---|---|
| **Cacao** | `#302018` | Texto principal, fondos oscuros y logotipo. |
| **Nogal** | `#63402F` | Texto secundario sobre Rosa niebla y superficies de apoyo. |
| **Naranja vivo** | `#FF681F` | Acciones principales, símbolo y piezas expresivas. |
| **Rosa arcilla** | `#E5AC9E` | Bloques cálidos, tarjetas y texto sobre Cacao. |
| **Rosa niebla** | `#EADDE7` | Fondo claro principal para lectura, formularios y contenido extenso. |
| **Iris** | `#5848D9` | Detalles puntuales, enlaces, indicadores y pequeños gestos gráficos. |

Conserva estos valores exactos. No introduzcas colores nuevos sin consultarlo.

### Jerarquía y aplicación

- **Página clara:** fondo Rosa niebla, texto Cacao y texto secundario Nogal.
- **Sección oscura:** fondo Cacao, texto Rosa niebla o Rosa arcilla.
- **Bloque cálido:** fondo Rosa arcilla y texto Cacao.
- **Pieza expresiva:** fondo Naranja y texto Cacao.
- **Detalle frío:** Iris en pequeñas superficies o elementos.

El Naranja es el acento principal. En páginas de lectura puede ocupar aproximadamente un **5–15 %**. Iris aparece puntualmente, alrededor de un **5 % como máximo**. Son orientaciones, no cuotas obligatorias.

No es necesario utilizar los seis colores en cada pantalla.

### Contraste

| Texto / fondo | Contraste aproximado |
|---|---:|
| Cacao / Rosa niebla | 11,89:1 |
| Nogal / Rosa niebla | 6,94:1 |
| Cacao / Naranja | 5,39:1 |
| Rosa niebla / Iris | 4,78:1 |

Estas parejas superan 4,5:1 usando colores sólidos. Comprueba de nuevo el contraste si cambias opacidad o fondo.

No uses Naranja para texto pequeño sobre Rosa niebla. No comuniques estados únicamente mediante color.

## 2. Tipografía

La combinación de marca es **Family + Manrope + IBM Plex Mono**. Cada familia tiene una función definida.

### Family — voz editorial

Usa **Family Roman, peso 400**, para titulares, mensajes de marca y citas destacadas.

- Mantén el peso 400: construye la jerarquía con tamaño, espacio y composición.
- Alineación izquierda como opción principal.
- Usa mayúsculas y minúsculas naturales.
- Evita titulares largos completamente en mayúsculas.
- No fuerces saltos de línea que funcionen únicamente en escritorio.

### Manrope — lectura e interfaz

Usa **Manrope** para párrafos, navegación, botones, formularios y textos explicativos.

- **400:** párrafos y contenido habitual.
- **500:** navegación, etiquetas y énfasis moderado.
- **600:** botones y énfasis breve.
- Evita párrafos completos en negrita.

### IBM Plex Mono — detalles y precisión

Usa **IBM Plex Mono, peso 400**, para numeraciones, fechas, categorías, códigos, metadatos y pequeñas anotaciones.

- Su presencia debe ser discreta.
- Reserva su uso para información breve y estructurada.
- No usar en párrafos largos ni como tipografía general de interfaz.
- Usa mayúsculas solo en etiquetas cortas.
- Su carácter técnico debe convivir con la calidez de la paleta y la expresividad de Family.

Si falta alguna fuente, indícalo antes de sustituirla. No presentes una aproximación como la tipografía original.

### Escala tipográfica propuesta

Medidas en píxeles; interlineado expresado como multiplicador.

| Uso | Fuente | Escritorio | Móvil | Interlineado |
|---|---|---:|---:|---:|
| Titular principal | Family 400 | 72 | 44 | 1,05 |
| Título de sección | Family 400 | 48 | 34 | 1,12 |
| Título de bloque | Family 400 | 32 | 26 | 1,18 |
| Entradilla | Manrope 400 | 22 | 20 | 1,5 |
| Texto de lectura | Manrope 400 | 18 | 17 | 1,6 |
| Texto auxiliar | Manrope 400 | 14 | 14 | 1,5 |
| Botones y navegación | Manrope 500–600 | 16 | 16 | 1,25 |
| Detalles y metadatos | IBM Plex Mono 400 | 12–14 | 12–14 | 1,4 |

Adapta los tamaños de forma fluida entre móvil y escritorio. Los campos de formulario deben mantener un mínimo de **16 px**.

### Composición del texto

- Limita los párrafos de lectura a **60–68 caracteres por línea** aproximadamente.
- Mantén el espaciado entre letras normal en texto de lectura.
- En titulares grandes de Family, permite un ajuste sutil de hasta **−0,02 em**, comprobando la fuente real.
- En etiquetas cortas de IBM Plex Mono en mayúsculas, usa **0,04 em** como punto de partida.
- En fechas, cifras y códigos, conserva el espaciado normal de IBM Plex Mono.
- No justifiques párrafos.
- Evita centrar bloques largos de texto.
- No reduzcas la tipografía para resolver un problema de espacio: ajusta la composición.

## 3. Voz y contenido

Escribe en un español cercano, claro y seguro.

- Usa frases concretas y verbos activos.
- Explica qué hacemos y qué aporta al proyecto.
- Dirígete de tú al lector.
- Reserva el juego verbal para titulares y pequeños detalles.
- Mantén botones, formularios y mensajes de ayuda directos.
- Evita promesas grandilocuentes, tecnicismos innecesarios y frases genéricas sobre innovación.

Ejemplos de tono:

- **Titular:** “Tu marca, en su sitio.”
- **Descripción:** “Diseño, desarrollo e IA con criterio.”
- **Acción:** “Cuéntanos tu proyecto.”
- **Ayuda de formulario:** “Cuéntanos qué tienes en mente.”

Estos ejemplos orientan el tono; no deben repetirse en todas las secciones.

## 4. Sistema de espaciado

Usa una escala basada en **4 px**:

**4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128**

El espacio debe comunicar relaciones: elementos relacionados quedan próximos; cambios de tema reciben más separación.

| Relación | Escritorio | Móvil |
|---|---:|---:|
| Etiqueta → titular | 16 | 12 |
| Titular → descripción | 24 | 16 |
| Entre párrafos | 16–24 | 16 |
| Texto → llamada a la acción | 32 | 24 |
| Entre elementos de una lista | 12 | 12 |
| Entre tarjetas | 24–32 | 16–24 |
| Relleno interior de tarjeta | 32 | 24 |
| Relleno vertical de sección | 96–128 | 56–64 |

Usa **56 px** como excepción prevista para secciones móviles compactas. Evita inventar valores intermedios distintos en cada componente.

### Contenedores y márgenes

- Ancho máximo del contenido general: **1200 px**.
- Márgenes laterales mínimos: **48 px en escritorio, 32 px en tableta y 20 px en móvil**.
- Centra el contenedor en pantallas amplias.
- El contenido de lectura conserva su ancho limitado aunque el contenedor sea mayor.
- Los fondos pueden ocupar todo el ancho; el contenido interior mantiene las alineaciones.
- Reutiliza los mismos ejes de alineación entre navegación, títulos, texto y pie.

## 5. Componentes

### Botones

**Principal**
- Fondo Naranja y texto Cacao.
- Manrope 600, 16 px.
- Altura mínima de 48 px.
- Relleno horizontal de 24 px.
- Separación entre texto e icono: 12 px.

**Secundario**
- Sobre fondo claro: texto y borde Cacao, sin relleno.
- Conserva el mismo tamaño y espaciado del principal.

Mantén una acción visualmente dominante por bloque. Iris no debe convertirse en un segundo color habitual de botones.

### Enlaces

- En texto sobre Rosa niebla, usa Iris con subrayado.
- Proporciona estados de foco visibles para navegación con teclado.
- No dependas únicamente de un cambio de color para indicar interacción.

### Etiquetas y metadatos

- Usa IBM Plex Mono 400 en categorías, fechas, numeraciones y anotaciones.
- Mantén una separación de 8–12 px entre elementos relacionados.
- Sobre Rosa niebla, usa Cacao o Nogal.
- Reserva Iris para destacar un detalle concreto.
- Evita convertir todas las etiquetas en pastillas con fondo.

### Tarjetas y superficies

- Usa el color, el espacio o un borde sutil para organizar el contenido.
- Como punto de partida, usa radios discretos de **8 px**.
- Evita convertir todos los bloques en tarjetas.
- Reserva las formas orgánicas para el símbolo y los gestos gráficos de marca.
- No añadas sombras ni efectos decorativos por defecto.
- Los bordes pueden usar Cacao con opacidad reducida. No apliques esa reducción automáticamente a los textos.

### Formularios

- Etiquetas visibles encima de cada campo, en Manrope.
- Separación etiqueta → campo: 8 px.
- Separación entre campos: 24 px.
- Texto de ayuda próximo al campo: 8 px.
- No sustituyas la etiqueta por el placeholder.
- Acompaña errores y estados con texto o iconos.
- Si hacen falta colores semánticos adicionales, propónlos como una ampliación funcional.

## 6. Límites de la dirección visual

- No sustituir Rosa niebla por beige, crema, marfil o blanco roto.
- No introducir verde como color de marca.
- No apagar el Naranja hasta convertirlo en terracota.
- No convertir Iris en el color dominante.
- No usar todos los colores con la misma importancia.
- No añadir degradados, brillos ni variaciones cromáticas arbitrarias.
- No sustituir las tipografías silenciosamente.
- No añadir símbolos, deformar el logotipo ni redibujar el isotipo sin indicación.
- No llenar los espacios vacíos con decoración innecesaria.

El resultado debe sentirse **acogedor, cuidado y contemporáneo**, con una estructura clara y pequeños momentos de juego.

---

## Aplicación en esta web (Nilo, 21/09/2026)

### Tokens (Tailwind v4, `src/styles/global.css`)
- Colores: `cacao · nogal · naranja · arcilla · niebla · iris` (`bg-niebla`, `text-nogal`, `border-cacao/15`…).
- Espaciado: escala de Tailwind (4 px) usada SOLO en los pasos de la guía → `1 2 3 4 6 8 12 16 24 32`, más `14` (56 px) en secciones
  móviles. Cualquier otro paso es un error de revisión. Sustituye a la escala Fibonacci de la ronda 1.
- Tipo: `text-h1` 44→72 · `text-h2` 34→48 · `text-h3` 26→32 · `text-lead` 20 · `text-sub` 18 · `text-body` 17→18 · `text-aux` 14 · `text-ui` 16 ·
  `text-detail` 13, fluidos entre 390 y 1200 px, con el interlineado de la tabla. **Ronda 19 (Andoni):** el subtítulo del hero va a 20 px fijos
  (`text-lead`, antes 20→22) y los subtítulos de las secciones a 18 px (`text-sub`, nuevo).
- Contenedor `wrap`: 1200 px de contenido + márgenes 20 / 32 / 48. Sección `section-y`: 56→128. Retícula `grid-12` (4 columnas en móvil),
  medianil 16 / 24. Radio `rounded-lg` = 8 px.

### Contrastes medidos para las parejas que la guía no lista
| Texto / fondo | Ratio | Veredicto |
|---|---:|---|
| Cacao / Rosa arcilla | 7,97 | vale para todo |
| Nogal / Rosa arcilla | 4,65 | vale, justo: solo texto ≥ 14 px, nunca con opacidad |
| Rosa arcilla / Cacao | 7,97 | vale para todo |
| Iris / Rosa arcilla | 3,21 | **NO**: en bloques cálidos los enlaces van en Cacao subrayado |
| Iris / Cacao | 2,49 | **NO**: en secciones oscuras los enlaces van en Rosa niebla o arcilla subrayado |
| Naranja / Rosa niebla | 2,21 | **NO** para texto (la guía ya lo dice); sí como superficie o filete |
| Naranja / Cacao | 5,39 | vale: titulares o detalles naranja sobre Cacao |

### Reparto de color en la home — WEB OSCURA con detalles en claro (pedido por Andoni, 21/09)
- **Base: Cacao** (la «sección oscura» de la guía, extendida a toda la página). Texto Rosa niebla, secundario Rosa arcilla (7,97:1),
  filetes Rosa niebla al 18 %. **Nogal no se usa nunca sobre Cacao.**
- **Detalles en claro, dos y no más:** «¿Qué es la Savvia?» sobre **Rosa niebla** (la ventana de la página: ahí vive el documento) y el
  **pie en Rosa arcilla** (cierre cálido). Los retratos pendientes también van en arcilla.
- **Naranja = la Savvia.** Acción principal + UNA pieza: el documento `savvia.md` (y el filete del paso 03, que lo anuncia). Sobre Cacao
  el Naranja sí vale como texto (5,39:1), pero se reserva igual.
- **Iris = la IA, en detalles MUY sutiles** (Andoni, 21/09: «el azul lo usaremos en detalles muy sutiles»). La palabra no cambia de color
  ni lleva fondo: la acompaña **un píxel Iris** (0,12 em, mín. 4 px) en el hueco que la «A» deja arriba a la derecha (clase `.ia`; en el copy,
  `[[IA]]`). Es decorativo —no lleva información— y por eso puede vivir sobre Cacao aunque Iris/Cacao sea 2,49:1. Hoy hay dos: el titular y
  «la IA entiende». **Descartado:** el bloque Iris bajo la palabra (demasiado presente). Los enlaces no van en Iris: subrayados, en el color
  del texto (si Iris también fuese «enlace», dejaría de significar «IA»).
- **Ampliación funcional propuesta:** sobre Rosa arcilla el botón principal va en **Cacao con texto Rosa niebla** (Naranja sobre arcilla
  es 1,48:1: el botón no se despega del fondo). Al pasar el cursor vuelve al Naranja.
- **Cómo está hecho:** superficies `surface-dark / surface-light / surface-warm` en `global.css`; los componentes usan `fg · fg2 · rule ·
  link · mark` y no nombran colores. Pasar una sección de oscuro a claro es cambiar una clase.

### Dudas abiertas con la guía
- **«Etiqueta → titular»** presupone etiquetas sobre titulares; en la ronda 66 de la web anterior se quitaron todas («quitamos todos los
  eyebrows»). Hoy no hay ninguna. Si vuelven, que sea decisión explícita.
- **Logotipo y símbolo:** la guía habla de un símbolo naranja y de formas orgánicas que no tengo. El «savvia» del menú es texto en Family
  y el favicon son las dos v antiguas recoloreadas: **provisionales** hasta recibir los archivos.
  **Resuelto el favicon (ronda 156, 12/10/2026):** ver «El favicon» abajo.
- **Family** sigue siendo la versión de prueba (sin acentos ni ñ ¿ ¡): esos glifos caen a Georgia. Avisado, no sustituido en silencio.
- «Enérgica y juguetona» convive con una regla dura de la web anterior: tres veces cayó algo «por restar seriedad». El juego va en
  pequeños momentos y en el verbo, no en el tono general.

### Ronda 9 (21/09/2026) — ampliaciones pedidas por Andoni
- **Relleno vertical de sección: 80 → 192 px** (la guía decía 96–128 / 56–64). «Hay que dar más aire a cada sección.»
- **Un degradado, uno solo:** el suelo del hero (lomas con bruma y grano de aerógrafo, en Rosa arcilla), por la referencia «Tranquility». El resto de la
  web sigue sin degradados, brillos ni sombras por defecto (el velo Cacao bajo la interfaz de Proyectos es legibilidad, no decoración).
- **Naturaleza en una tinta:** el roble del hero va en Rosa arcilla sobre Cacao (densidad = luz). No es un color nuevo.
- **Radios mayores en dos piezas con referencia propia:** tarjeta del menú 24 px y carnés de los pasos 16 px. El resto, 8.
- **Carnés de los pasos:** un color por paso — Rosa niebla · Rosa arcilla · Naranja (el 03: el Naranja es la Savvia) · Nogal (texto Rosa niebla 6,94:1,
  secundario Rosa arcilla). Iris no entra.

### Ronda 10 (21/09/2026)
- **El hero vuelve a fondo plano** y el roble va en su color real sobre una línea Rosa niebla. El degradado de la ronda 9 y la «una tinta» quedan retirados:
  la web no tiene ningún degradado decorativo (los velos Cacao de Proyectos son legibilidad).
- **Logotipo:** `public/savvia-logo.svg`, en blanco sobre Cacao (la mezcla por diferencia lo oscurece sobre lo claro).
- **Tarjetas de los pasos:** superficie = Cacao + 7 % Rosa niebla; escenario de la demo = Cacao + 34 % negro. Son tonos del Cacao, no colores nuevos. Radio 20 / 12.
- **Cromo del navegador** dentro del monitor: grises neutros (#ececec) y semáforo de macOS. Es una REPRESENTACIÓN de un objeto real, no color de marca.

### Ronda 11 (21/09/2026)
- **Texto secundario sobre Cacao:** Rosa niebla al 60 %, peso regular (antes Rosa arcilla). Contraste ≈ 5,4:1.
- **Textura:** grano fino en todas las superficies (`public/media/grano.png`), muy sutil. No es «textura de papel» ni lleva modos de mezcla.
- **Cambio de color entre secciones:** siempre con la transición líquida (`data-sube`).
- **Cristal:** material de la interfaz SOBRE la escena de Proyectos (desenfoque 22 px + Cacao al 58 % + filo Rosa niebla al 16 %), radio 16–20. No se usa en el resto de la web.
- **El roble:** render propio (Blender) con tramado ordenado. Sus verdes y marrones son los del objeto, no colores de marca.

### Ronda 12 (21/09/2026)
- **El roble es tipografía:** palabras del vocabulario en Family, pequeñas (9–13 px). Verdes = los del molde 3D (son del objeto, no de marca); otoño = Naranja y Rosa arcilla.
- **Separadores:** nunca una línea recta entre secciones: `Separador.astro` (rama que ondula). Las líneas finas DENTRO de un componente (filas de una lista) sí valen.
- **Cristal:** queda solo en la barra de iconos de Proyectos y en los dos mandos de la vista sentado. Los laterales van sin tarjeta.
- **Sección 3:** la pieza Naranja es el SISTEMA (antes, el documento).

### Ronda 39 (23/09/2026) — pedido por Andoni
- **Tipografía a prueba:** **ABC Areal** (Dinamo, variable 400–700) sustituye a Manrope en lectura e interfaz y **ABC Areal Mono** a IBM Plex Mono en
  los detalles. Family sigue en titulares. Licencia de Dinamo en `tools/fuentes-areal/` (es de pago por tamaño del cliente: confirmar que cubre web).
  Para comparar con la pareja anterior: `?tipo=antes`. Cubre tildes, ñ, ¿ ¡; los signos ↳ y ✓ caen a la fuente del sistema.
- **El fondo oscuro cambia con la estación** («otoño sería el que casa con el actual»). Es el Cacao girado en OKLCH con su MISMA luminosidad, así
  que los contrastes no se mueven. No son colores de marca: son la «noche» de cada estación (`--noche`, `html[data-estacion]`).

| Estación | Fondo | Rosa niebla | Rosa arcilla | Naranja |
|---|---|---:|---:|---:|
| Otoño | Cacao #302018 | 11,89 | 7,97 | 5,39 |
| Invierno | Pizarra #1B242D | 11,96 | 8,02 | 5,42 |
| Primavera | Musgo #212717 | 11,70 | 7,85 | 5,30 |
| Verano | Monte #14271B | 11,97 | 8,03 | 5,43 |

  Carga la estación de HOY; la cambian el clic en el árbol del hero y los botones de estación de Proyectos. Cacao sigue siendo el texto sobre lo claro.
- **Producto: savvia agentic** (la web a medida + su savvia + los agentes que la hacen crecer). Marca = logotipo + «agentic» en mono + el píxel Iris
  (la IA). Vive en el cierre de Servicios, en la cabecera del plato de La savvia y en una pregunta frecuente. `savvia.md` sigue siendo el documento.
- **Etiquetas de Servicios:** píldoras en Rosa niebla, Naranja, Rosa arcilla y Nogal (texto Cacao; Rosa niebla sobre Nogal). Iris no entra: nunca es fondo.

### Ronda 40 (23/09/2026) — paleta de estaciones de Andoni (sustituye a la de la ronda 39)
Solo cambian el **fondo oscuro** (hero, dolores, proyectos destacados y pie) y el **color del árbol** (en la ilustración valen variaciones de ese tono
para luces, sombras y texturas). El **Naranja** sigue siendo el acento todo el año: el color del árbol no lo sustituye en botones ni activos.

| Estación | Fondo oscuro | Color del árbol | Rosa niebla | Secundario 60 % | Rosa arcilla | Naranja |
|---|---|---|---:|---:|---:|---:|
| Primavera · mar–may | Cacao rosado #382A2D | Rosa flor #C76B83 | 10,41 | 4,78 | 6,98 | 4,72 |
| Verano · jun–ago | Bosque oscuro #1F352A | Verde hoja #67834D | 9,99 | 4,65 | 6,70 | 4,53 |
| Otoño · sep–nov | Cacao tostado #3B231B | Cobre naranja #C65C2D | 11,09 | 4,98 | 7,44 | 5,03 |
| Invierno · dic–feb | Cacao ceniza #2A2932 | Azul grisáceo #6E7B91 | 10,94 | 4,95 | 7,34 | 4,96 |

- Tokens: `--noche` y `--arbol` en `html[data-estacion]`. El árbol, las raíces y el paisaje del pie pintan la hoja en `--arbol` (sombra, tono y luz).
- **Después de Proyectos destacados la web es clara**, alternando Rosa niebla y Rosa arcilla: Nuestros proyectos (niebla) · Servicios (arcilla) · La savvia
  (niebla) · Estudio (arcilla) · Preguntas (niebla). El **pie vuelve a oscuro** (la paleta lo nombra entre las superficies oscuras).
- Cacao #302018 sigue siendo el texto sobre lo claro.

## Paleta 2 (a prueba, 24/09/2026 · ronda 50)
Guía nueva de Andoni. Base: **Cacao `#302018`** (texto principal, logo, fondos de marca) y **Rosa niebla `#EADDE7`** (fondos de lectura, texto sobre
oscuro). **Nogal `#63402F`**: texto secundario sobre claro. **Coral `#F65340`**: acento principal (botones y llamadas a la acción; sustituye al Naranja
`#FF681F`, y con él la savia: gotas, hilos, filos). **Cobalto `#3456D3`** y **Cereza `#B52C4C`**: portadas de proyectos y bloques editoriales.
~~Cítrico `#E9D64B`~~: FUERA (ronda 50, Andoni: «el cítrico va fuera, no me convence»). Fuera de la paleta también: Rosa arcilla e Iris.
- Un solo acento protagonista por bloque; no hace falta usar todos en cada pantalla; los colores editoriales no son categorías de servicio.
- Botón principal: Coral con texto Cacao (4,63:1). Sobre Coral, texto Cacao; sobre Cobalto y Cereza, Rosa niebla (4,68 y 4,66).
- Nada de texto pequeño Coral sobre claro (Coral/niebla 2,57). Coral sobre Cobalto no se despega (1,82): ahí el botón va en Cacao.
- Estaciones: sin cambios (la tabla de la ronda 40 coincide con la guía). Coral sobre la noche de verano, 3,89: solo piezas grandes.
- **Aplicación (ronda 50):** Servicios = el bloque COBALTO (`surface-warm`); la pieza del plato y `savvia.md` en La savvia = CORAL (el papel del antiguo
  Naranja); indicadores sobre oscuro (`--mark`) en Coral; el píxel de la IA, en Cobalto. Cereza, sin uso por ahora («ya veremos dónde»). Los degradados de
  cada cliente en «Más proyectos» NO se tocan. Tipografías: las de hoy (Family + ABC Areal + ABC Areal Mono), no las que nombra la guía.


### El favicon (ronda 156, 12/10/2026 · Eric)
- **Sin isotipo.** «Si no hacemos isotipo en el favicon, tiene que estar solo el background principal, y ese background se cambia con la estación;
  igual sí que podemos poner el árbol en pequeño.»
- **Uno por estación:** el fondo es la noche de la estación (otoño `#3b231b` · invierno `#f5f5f7` · primavera `#3a2932` · verano `#1b3125`) con el roble
  de esa estación (la lámina del hero, `public/media/hero/arbol-<estación>.webp`) en pequeño, el pie abajo. `public/favicon-<estación>.png` (64 px,
  esquinas al 22 %) y `public/apple-touch-icon-<estación>.png` (180 px, a sangre). Se generan con `tools/r156-favicon.cjs`: si cambia un roble, se relanza.
- **Cambia con la web:** el `<head>` (Base.astro) pone el de la estación antes del primer pintado y, con `savvia:estacion`, funde el viejo con el nuevo
  en un lienzo de 64 px (1,2 s, 12 pasos) y deja el PNG nuevo. Movimiento reducido: cambio directo. Safari no repinta favicons en caliente.
- **Caché:** los PNG van con `?v=157`; al regenerarlos, subir la versión en Base.astro y en el brandbook.
- Documentado también en el brandbook › Logotipo › «El favicon».
