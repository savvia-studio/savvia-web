// Copy de la home. Fuente: estructura (Google Doc) + Narrativa – Savvia (Keynote), ronda 82.
// Lo marcado `falta` son datos de Andoni y Eric que NO se inventan.
// [[…]] = detalle de IA: una marca Iris MUY sutil junto a la palabra. Hoy, dos en toda la página.
// NO se presume de experiencia (años, nº de clientes): el trabajo la demuestra. «Desde 2020» solo como detalle en el pie.

export const nav = {
  links: [
    { label: 'Proyectos', href: '/proyectos' },
    { label: 'Servicios', href: '/#servicios' },
    { label: 'La savvia', href: '/#la-savvia' },
    { label: 'Estudio', href: '/#estudio' },
    { label: 'Hablemos', href: '/#contacto' },
  ],
  // Segundo grupo de la tarjeta del menú (pequeño, bajo el filete). El correo se añade solo desde `pie.correo`.
  mas: { titulo: 'Más', links: [{ label: 'Carta fundacional', href: '/carta' }] },
};

export const hero = {
  // RONDA 40 · «el titular principal no tiene que ser crecer tu web, podemos mirar del documento keynote». Del Keynote («Narrativa – Savvia»):
  // el elevator pitch habla a quien «está cambiando y su web ya no le representa», y el mensaje clave de beneficio es «mejor web en menos tiempo y
  // a menor coste». El titular responde al primero; el subtítulo es el segundo, con el cómo (criterio + IA).
  // RONDA 53 · «el H1 es muy amplio y no dice nada: más específico, que el cliente diga hostia, esto pueden hacer por mí». Lo concreto del Keynote: web
  // a medida (no un lavado de cara) + tu equipo la cambia con IA (formación + todo documentado) + el ARNÉS (la receta hace que la IA no se salga de tu marca).
  // RONDA 83 · giro a la MÚSICA («en savvia orquestamos: todo nace de ese verbo»). H1 de Andoni; el H2 no repite «orquestar»
  h1: 'Orquestamos tu web con desarrollo agéntico.', // antes (r77): «Elevamos tu web con IA.» · // ronda 65 (Andoni); ronda 77: vuelve tras probar «Orquestamos…» en la 76 Antes (r53): «Una web a medida que tu equipo cambia con IA, fiel a tu marca.»
  h2: 'Cada agente en su parte. Tu web, a una sola voz.', // ronda 83 · antes (r65): «Especializados en orquestar el diseño y desarrollo agéntico.»
  // Las palabras con las que está hecho el ROBLE del hero (copa) y sus RAÍCES. Salen del diccionario de la marca (AGENTS.md › Se dice).
  vocabulario: ['orquestar', 'criterio', 'elevar', 'desarrollo agéntico', 'a medida', 'de principio a fin', 'documentado', 'fuente de verdad', 'claridad', 'versatilidad', 'contigo', 'Eric y Andoni', 'Donostia', 'savvia', 'la savia', 'tu web', 'diseño', 'con criterio'],
  vocabularioRaiz: ['raíz', 'briefing', 'entender', 'qué vendes', 'a quién', 'decisiones', 'savvia', 'fuente de verdad', 'documentado', 'criterio', 'la savia', 'desde la raíz'],
};

// RONDA 39 · «buscar alguna forma de introducir un nombre para productizar savvia, savvia agentic o algo así». Nombre elegido: savvia agentic
// (el sistema: la web a medida + su savvia + los agentes que la cuidan). «savvia.md» sigue siendo el documento que se entrega.
export const producto = {
  nombre: 'savvia agentic',
  frase: 'La web, su receta y los agentes que la mantienen al día.',
};

// RONDA 89 · LA SEGUNDA SECCIÓN, en manifiesto (Andoni: «un texto centrado pero alineado a la izquierda donde te explicamos qué ofrece savvia, más estilo
// manifiesto; la V inicial es nuestro isotipo, como las capitulares de los libros antiguos»). Texto de Andoni tal cual; «Savvia Agentic» → «savvia agentic»
// (la marca, siempre en minúscula). `lema` = la frase que abre cada párrafo (a plena tinta); en el último, la frase de cierre va marcada con `cierre`.
export const manifiesto = {
  aria: 'Manifiesto de savvia',
  parrafos: [
    { lema: 'Voz propia.', texto: 'Tu web debería sonar a ti y ser fiel a tu marca. Debería contar lo que hace especial tu proyecto. Por eso, antes de construir, nos sentamos contigo mano a mano para entender qué necesitas.' },
    { lema: 'Tú marcas el ritmo de tu negocio.', texto: 'El desarrollo agéntico nos permite explorar e iterar con agilidad y el criterio guía cada decisión. Venimos del pixel-perfect artesanal y hoy trabajamos con IA cada día. Sin embargo, la batuta no la lleva ella: la IA es la base, el criterio sigue siendo nuestro. Así evitamos el AI slop y llegamos a algo hecho a medida.' },
    { lema: '', texto: 'Como resultado de este proceso te llevas una partitura propia: una librería de skills diseñada para que tu proyecto escale con IA sin perder su voz.', cierre: 'Eso es savvia agentic: tu web, orquestada con IA y criterio.' },
  ] as { lema: string; texto: string; cierre?: string }[],
};

export const recorrido = {
  // RONDA 39 · «la segunda sección tenemos que enfocarla más a los pains del usuario, y no hacer que sea un slider: un recorrido que funciona
  // con el scroll, de manera que el usuario pasa por todos los pains». Cada parada: el DOLOR (lo que siente quien entra) y la RESPUESTA,
  // con la demo que ya gustaba de cada paso. Siempre en segunda persona (ronda 39, punto 8: «el yo solo lo proyectamos en equipo»).
  pregunta: '¿Te suena alguno?',
  // RONDA 53 · más cerca del Keynote: los cuatro problemas de su diapositiva «Web anclada en paradigma anterior» (ya no te representa · genérica e
  // impersonal · difícil de gestionar y mal documentada · infraestructura vieja y cara + equipo que no domina la IA) y, en el tercero, el ARNÉS.
  // RONDA 65 · copy de Andoni: tres dolores (el 3 y el 4 de antes se funden: la demo de la receta y la de la landing van juntas)
  pasos: [
    {
      corto: 'No se alinea con tu marca',
      dolor: 'Tu web no se alinea con tu marca.',
      t: 'Afinamos contigo.', // ronda 83 · matiz musical; antes «Mano a mano.»
      d: 'Pasamos tiempo contigo entendiendo lo que necesita tu proyecto.',
    },
    {
      corto: 'Evita el AI Slop',
      dolor: 'Evita el AI Slop.', // ronda 83 (Andoni); antes «Se ve como AI slop puro.»
      t: 'Una obra, no una plantilla.', // ronda 83; antes «Creatividad a medida.»
      d: 'Con tu dirección y nuestro criterio generamos skills únicas.',
    },
    {
      corto: 'Difícil de mantener',
      dolor: 'Es difícil de mantener.',
      t: 'La partitura de tu web.', // ronda 83 (Andoni); antes «savvia agentic: el arnés de tu web.»
      d: 'Tu librería: la IA la lee y toca tu web sin salirse de la melodía.',
    },
  ],
};

export const laSavvia = {
  pregunta: '¿Qué es la savvia?',
  // RONDA 12 (Andoni): «ponemos savvia es la receta de tu web. Y en vez de un documento, ponemos un sistema.»
  titulo: 'La savvia es la partitura de tu web.', // ronda 83
  intro: 'No es un documento que se guarda en un cajón: es un sistema. Cada ingrediente decide una parte de la web, y todos se leen igual: tú, tu equipo y la [[IA]].',
  // Los INGREDIENTES del sistema. Todos los valores son REALES: son los de la Savvia de esta misma web (DESIGN.md + AGENTS.md).
  ingredientes: [
    { id: 'color', n: 'Color', v: 'Cacao · Rosa niebla · Nogal · Coral · Cobalto · Cereza', d: 'Seis colores, cada uno con su papel. El Coral es la acción; cada bloque, un solo acento.' },
    { id: 'tipo', n: 'Tipografía', v: 'Family · ABC Areal · ABC Areal Mono', d: 'Tres voces: la editorial, la de lectura y la de los detalles.' },
    { id: 'espacio', n: 'Espaciado', v: '4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128', d: 'Una sola escala. Ningún hueco se decide a ojo.' },
    { id: 'piezas', n: 'Componentes', v: 'Botón · enlace · tarjeta · detalle', d: 'Las piezas con las que se monta cualquier página nueva.' },
    { id: 'voz', n: 'Voz', v: 'orquestar · criterio · a medida · contigo', d: 'Lo que se dice y lo que no. También las palabras son del sistema.' },
    { id: 'no', n: 'Lo descartado', v: 'Cursivas · paisajes en el hero · un efecto de protagonista', d: 'Cada decisión que cayó, y por qué. Para no volver.' },
  ],
  puntos: [
    { t: 'Donde se entiende todo.', d: 'Qué es, para quién y por qué es así.' },
    { t: 'Donde queda cada decisión.', d: 'De diseño y de desarrollo. También las que descartamos, y por qué.' },
    { t: 'Un sistema que tú lees y la [[IA]] entiende.', d: 'savvia.md' },
  ],
  cierre: 'Todo documentado para que cualquiera sepa cambiar y actualizar la web.',
  // Extracto REAL: es la Savvia de esta misma web (DESIGN.md + AGENTS.md). Nada inventado.
  doc: {
    archivo: 'savvia.md',
    lineas: [
      { k: 'h', v: '# savvia · web' },
      { k: 'h', v: '## Color' },
      { k: 'p', v: 'Cacao #302018 · la base de la página' },
      { k: 'p', v: 'Coral #F65340 · botones y llamadas a la acción' },
      { k: 'p', v: 'Cobalto · Cereza · un acento por bloque' },
      { k: 'h', v: '## Tipografía' },
      { k: 'p', v: 'Family 400 · ABC Areal · ABC Areal Mono' },
      { k: 'h', v: '## Rechazado' },
      { k: 'p', v: 'Cursivas. Fondos de paisaje en el hero.' },
      { k: 'p', v: 'Un efecto como protagonista de la página.' },
    ],
  },
  falta: 'Hoy enseña la savvia de esta web. ¿Algún cliente autoriza enseñar la suya?',
};

// RONDA 53 · LA RECETA DE PAPEL. Andoni: «la sección de savvia la receta de tu web quiero hacer una receta de papel estilo poetry.camera, pero que tenga
// relación con savvia. Al final el papel sale del árbol. Para nosotros la receta es esto que entregamos al cliente: neety.treseiscero.app/library» ·
// «también quiero introducir el concepto del ARNÉS de la IA: la receta de savvia te ayuda a que la IA te lleve a donde tú quieres llegar y no a otro sitio».
// Cada tira es un trozo REAL de la receta que se entregó a Neety (su library): fundamentos, guardarraíles, una petición de su equipo, decisiones.
// RONDA 89 · «savvia, la partitura de tu web: algo muy parecido al vídeo que te paso (og.mp4) pero que tenga relación con la música». El vídeo: una carpeta en el
// centro («Agentic Brand System»), a la izquierda lo que entra, a la derecha lo que sale, hilos finos que convergen, y cursores de agentes con su etiqueta que
// tocan cada pieza. Aquí: la PARTITURA en el centro; los hilos son CUERDAS (al tocarlas vibran y suenan) y lo que viaja por ellas son NOTAS que se escriben
// en la partitura y salen hacia lo que se publica.
export const partitura = {
  carpeta: ['La partitura', 'de tu web'],
  entra: ['Estrategia', 'Posicionamiento', 'Voz', 'Identidad', 'Dirección de arte', 'Componentes', 'Guías', 'Tokens', 'Recursos', 'Ejemplos'],
  sale: ['Webs', 'Landings', 'Productos', 'Campañas', 'Emails', 'Redes sociales'],
  agentes: [['Claude', 'coral'], ['Codex', 'cobalto'], ['Diseño', 'cereza'], ['Tu equipo', 'nogal']] as [string, string][],
  // RONDA 91 · la cámara ENTRA en la partitura y dentro está la librería. RONDA 92 · «tiene que tener más nuestro estilo, sin parecerse tanto a la referencia, y la
  // web que creamos que sea la de Neety, no algo random»: dentro, la partitura ABIERTA de Neety (cuaderno a dos páginas). A la izquierda, sus PARTES: lo que hay de
  // verdad en su librería (neety.treseiscero.app/library, leída el 01-oct-2026: color, tipografía, espaciado, gradiente progresivo, botones y componentes, con sus
  // nombres y valores tal cual, «Azúl bebe» incluido). A la derecha, el ENSAYO: el hero real de su home (neety.treseiscero.app/home), pieza a pieza.
  libreria: {
    ruta: 'neety · librería',
    titulo: 'La partitura de Neety',
    tempo: 'Allegro con criterio',
    autor: 'dir. savvia',
    partes: ['Color', 'Tipografía', 'Espaciado', 'Gradiente', 'Botones', 'Componentes'],
    color: [['Naranja Core', '#FE8238'], ['Azúl bebe', '#A7C5F9'], ['Berenjena', '#431B44'], ['Ciruela', '#2A0E2C'], ['Mint claro', '#EBFFF6'], ['Base Cálida', '#F8F7EC'], ['Gris Tecnológico', '#F5F7F9'], ['Blanco', '#FFFFFF']] as [string, string][],
    tipografia: [['Bricolage Grotesque', 'titulares · H1 XL 112 / 64 · 120 %'], ['Switzer', 'cuerpo · regular 16 · 150 %']] as [string, string][],
    espaciado: [['xtiny', 4], ['tiny', 8], ['xxsmall', 16], ['xsmall', 20], ['small', 24], ['medium', 32], ['large', 48], ['xlarge', 64], ['xxlarge', 80], ['huge', 96], ['xhuge', 112], ['xxhuge', 160]] as [string, number][],
    seccion: 'sección 96 · 128 · 224',
    gradiente: { clase: '.rail-gradient-x', paradas: ['#F8F7EC', '#FE8238', '#431B44', '#A7C5F9', '#FFFFFF'], nota: 'crema → naranja → berenjena → azul → blanco' },
    botones: { ruta: 'components/PillCta.tsx', primario: 'Solicitar demo', contorno: 'Saber más' },
    componentes: ['Logo', 'PulsingDot', 'PillCta', 'TagPill', 'RollingNumber'],
    ensayo: 'ensayo · neety.com/home',
    hero: {
      nav: ['Plataforma', 'Casos de uso', 'Recursos', 'Compañía', 'Precios'],
      eyebrow: ['Detecta.', 'Prioriza.', 'Actúa.'],
      h1: 'Detecta a quién vender, cuándo hacerlo y',
      h1b: 'qué acción tomar.',
      ctas: ['Solicitar demo', 'Ver cómo funciona'],
      sub: 'No es otra herramienta para enviar más mensajes. Neety te dice qué cuentas importan hoy, por qué y qué debería hacer tu equipo con ellas.',
      tarjeta: { titulo: 'Neety encontró empresas que encajan', filas: [['Betsaide', 94], ['Arania', 91], ['Fagor Automation', 88]] as [string, number][] },
    },
    fin: ['Fine', 'lista para neety.com'],
  },
};

export const receta = {
  titulo: 'La savvia es la partitura de tu web.', // ronda 83
  arnes: 'Cada agente lee su parte, y tu web suena como tú quieres.', // ronda 83; antes «Y el arnés de tu IA: …»
  nota: 'La partitura real de Neety: la que lee su equipo (y su IA) cada día para cambiar su web.', // ronda 83
  // RONDA 83 · «en vez de un ticket, cómo se imprime una ENTRADA a un concierto, con el estilo de Neety (su librería)». La receta es la misma; el papel es
  // una entrada: cartel de Neety, datos de la función, el PROGRAMA en cinco movimientos y la matriz troquelada al final.
  // RONDA 85 · «que parezca una entrada de concierto de verdad, estilo clásico y premium, hecha a medida; y quitamos lo de que se imprime»
  entrada: { presenta: 'savvia presenta', obra: 'Neety', sub: 'La partitura de su web', subtitulo: 'Concierto en cinco movimientos', datos: [['sala', 'neety.com'], ['fila', 'A'], ['asiento', '07'], ['función', 'cada día']], matriz: 'admite 1 · fila A · asiento 07', numero: 'Nº 000207', temporada: 'temporada 2026', sello: 'admitido' },
  enlace: { label: 'Ver la receta entera', href: 'https://neety.treseiscero.app/library' },
  // RONDA 54 · «que caiga en un color claro, los tickets con más personalidad y más humanos; en cada ticket superponer algo digital que enfatice lo que
  // pasa en cada uno; también es un proceso de izquierda a derecha, mostrarlo mejor; el árbol de fondo va fuera». El orden es el del proceso: qué es tu
  // marca → qué no se puede hacer (el arnés) → qué pide tu equipo → qué queda escrito → la cuenta. `marcas`: la tinta a mano sobre una línea (índice →
  // círculo · subraya · tacha · visto). `digital`: la pieza de interfaz que aterriza encima cuando el ticket ya está impreso.
  // RONDA 65 · «mostrar en la receta más un md estilo los design.md de styles.refero.design, pero más resumido; lo que superponemos, con algo más de
  // sustancia; y al final, lo de publicado en neety, un botón que te lleva a la librería de Neety». Todo sale de la librería REAL de Neety
  // (neety.treseiscero.app/library, leída el 29/09): su paleta con sus nombres, sus tipografías y medidas, su escala de espacio, sus reglas y su CLAUDE.md.
  tiras: [
    {
      mov: 'I. Allegro', paso: 'la marca', agente: 'Agente de diseño',
      t: 'DESIGN.md',
      raya: '=-=-=-=-=-=-=-=-=-=-=-=',
      lineas: ['# Neety · la partitura', '> la web se genera de', '  su propio código', '', '## color', 'Naranja Core   #FE8238', 'Azul bebé      #A7C5F9', 'Berenjena      #431B44', 'Ciruela        #2A0E2C', 'Base cálida    #F8F7EC', '', '## tipografía', 'titulares  Bricolage', 'cuerpo     Switzer', 'H1  112 / 64 px · 120%', '', '## espacio', 'xtiny 4 … xxhuge 160', 'sección 96·128·224 px'],
      marcas: [[5, 'circulo'], [12, 'subraya']],
      digital: { tipo: 'tabla', txt: 'app/globals.css · @theme', filas: [['Naranja Core', '#FE8238', 'bg-naranja'], ['Berenjena', '#431B44', 'text-plum'], ['Base cálida', '#F8F7EC', 'bg-base']], colores: ['#FE8238', '#431B44', '#F8F7EC'] },
    },
    {
      mov: 'II. Andante', paso: 'el arnés', agente: 'Agente de código',
      t: 'guardarraíles',
      raya: '·x·x·x·x·x·x·x·x·x·x·x·',
      lineas: ['nada de colores', '   ni fuentes nuevas', '', 'ni un hero distinto:', '   se reutiliza uno', '', 'ni botones inventados', '', 'un cambio por petición', '', 'ni publicar sin', '   mirarla en el preview'],
      marcas: [[0, 'subraya'], [6, 'visto'], [8, 'visto'], [10, 'visto']],
      digital: { tipo: 'bloqueo', txt: '#FF2E9A no está en la receta', fin: 'usa el token Naranja Core', cab: 'CLAUDE.md · el arnés' },
    },
    {
      mov: 'III. Scherzo', paso: 'lo que pide el equipo', agente: 'Agente de contenido',
      t: 'lo que pide su equipo',
      raya: "`'. .'`'. .'`'. .'`'. .'`",
      lineas: ['«Añade una sección de', 'testimonios en la home,', 'entre Cómo funciona', 'e Integraciones: tres', 'citas con nombre, cargo', 'y empresa, con el estilo', 'de tarjeta blanca.»'],
      marcas: [[6, 'subraya']],
      digital: { tipo: 'agente', txt: 'agente · leyendo la receta', pasos: ['lee CLAUDE.md', 'reutiliza la tarjeta blanca', 'la añade en ES y EN', 'la revisa en el preview'], fin: 'sección lista ✓' },
    },
    {
      mov: 'IV. Adagio', paso: 'queda escrito', agente: 'Agente de documentación',
      t: 'decisiones',
      raya: '·_·~·_·~·_·~·_·~·_·~·_·',
      lineas: ['el borde izquierdo', '   siempre con el logo', '', 'imágenes nuevas', '   en AVIF', '', 'bilingüe desde', '   el primer día'],
      marcas: [[0, 'visto'], [3, 'visto'], [6, 'visto']],
      digital: { tipo: 'diff', txt: 'docs/decisiones.md', pasos: ['+ borde izquierdo con el logo', '+ imágenes nuevas en AVIF', '+ bilingüe desde el día 1'], fin: '+3' },
    },
    {
      mov: 'Bis', paso: 'la despedida', agente: 'Tu equipo',
      t: 'hasta la próxima',
      raya: '.......................',
      lineas: ['Web a medida ..... hecha', 'Cada decisión .. escrita', 'Tu IA ...... con arnés', 'Tu equipo ..... al mando', '', '   gracias por venir'], // ronda 80: fuera «Lavado de cara ..... 0 €»
      marcas: [[2, 'circulo']],
      digital: { tipo: 'boton', txt: 'Enséñame la librería de Neety', href: 'https://neety.treseiscero.app/library' }, // ronda 80: un mensaje a la IA
    },
  ] as { mov: string; paso: string; agente: string; t: string; raya: string; lineas: string[]; marcas: [number, string][]; digital: { tipo: string; txt: string; fin?: string; cab?: string; href?: string; colores?: string[]; filas?: string[][]; pasos?: string[] } }[],
};

export const proyectos = {
  pregunta: '¿Qué ha hecho esta gente?',
  // RONDA 44 · «lo que has puesto para finalizar la segunda sección va como titular de los destacados y se mete en el ordenador; el titular, todo en la
  // misma tipografía»: el puente deja de ser una sección y es el titular-pantalla de Proyectos, en Family (sin logotipo ni mono)
  titulo: 'Proyectos destacados con desarrollo agéntico.', // ronda 65 (Andoni); antes «Para eso está savvia agentic.»
  // Los cuatro proyectos hechos con desarrollo agéntico (los de la web anterior, ronda 28). Cada uno trae SU estación:
  // al cambiar de proyecto cambia el paisaje de la ventana y el ambiente sonoro.
  // `d` y `dato` salen de la propia web de cada cliente y del registro de rondas; PENDIENTES de visto bueno.
  nuevos: [
    {
      slug: 'multiverse',
      paleta: ['#15181C', '#F01438', '#3A3E44', '#C0C3C5'], // medida sobre la captura (Multiverse: sus tokens reales). PROVISIONAL: confirmar con el CSS de cada web
      n: 'Multiverse Computing',
      cat: 'IA y computación cuántica',
      d: 'Una esfera de puntos que se comprime hasta ser su logotipo: el producto, explicado sin una palabra.',
      url: 'https://multiverse-home.vercel.app/',
      estacion: 'invierno',
      hechos: [
        ['Trabajo', 'Home · diseño y desarrollo agéntico'],
        ['Tipografía', 'Schibsted Grotesk'],
        ['Un dato', '23 rondas documentadas'],
      ],
    },
    {
      slug: 'playground',
      paleta: ['#FFFFFF', '#21127A', '#3D7A96', '#5C2E6E'], // medida sobre la captura (Multiverse: sus tokens reales). PROVISIONAL: confirmar con el CSS de cada web
      n: 'Playground IEP',
      cat: 'Educación especial',
      d: 'IA con base científica para educación especial, contada con pegatinas que se pueden coger.',
      url: 'https://playground-iep-two.vercel.app/home-v5.html',
      estacion: 'primavera',
      hechos: [
        ['Trabajo', 'Home · diseño y desarrollo agéntico'],
        ['Un dato', '24 rondas · 4 versiones de la home'],
      ],
    },
    {
      slug: 'neety',
      paleta: ['#F5F7F9', '#9C787C', '#CEB7B5', '#CCD5E5'], // medida sobre la captura (Multiverse: sus tokens reales). PROVISIONAL: confirmar con el CSS de cada web
      n: 'Neety',
      cat: 'Ventas B2B',
      d: 'Detecta a quién vender y cuándo. La web enseña el feed de señales antes de explicarlo.',
      url: 'https://neety.treseiscero.app/home',
      embed: false, // RONDA 19: la web real va en un iframe, pero neety.treseiscero.app manda `x-frame-options: SAMEORIGIN` → se enseña la captura hasta que se quite esa cabecera
      estacion: 'otono',
      hechos: [
        ['Trabajo', 'Home · diseño y desarrollo agéntico'],
        ['Un dato', '9 secciones'],
      ],
    },
    {
      slug: 'zernio',
      paleta: ['#F8F4EE', '#603B32', '#998A82', '#251A17'], // medida sobre la captura (Multiverse: sus tokens reales). PROVISIONAL: confirmar con el CSS de cada web
      n: 'Zernio',
      cat: 'API para desarrolladores',
      d: 'Una API de redes y mensajería para 23 canales, presentada como un muelle donde atraca cada uno.',
      url: 'https://zernio.treseiscero.app/',
      estacion: 'verano',
      hechos: [
        ['Trabajo', 'Home · diseño y desarrollo agéntico'],
        ['Un dato', '23 canales · 11 secciones'],
      ],
    },
  ],
  faltaNuevos: 'Confirmar los cuatro proyectos, sus frases y qué estación lleva cada uno.',
  titulo2: 'Más proyectos.', // ronda 46 (antes «Nuestros proyectos.», ronda 39; y antes «Otros trabajos.»)
  antes: ['Invopop', 'Business Online Payroll', 'Cubbo', 'Remerge', 'Isotrol'],
  // RONDA 17 · «Trabajo anterior» como mosaico (referencia: northmail.app, «Channels designed for life's moments»). Datos REALES, de
  // ../savvia_inspo/web/data/casos.json: dominio y sector (donde el sector no consta, no se inventa). Capturas en public/media/anteriores.
  intro2: 'Webs a medida, de principio a fin, para equipos que viven de su web. Y lo que cuentan quienes las usan cada día.',
  // `color`: tres colores de la PROPIA web del cliente, medidos en su captura (fondo · secundario · acento): el degradado de su pieza sale de ahí
  // (ronda 18: «los gradientes de detrás pueden ser relacionados con cada proyecto»). `logo`: su logotipo (de la web anterior de savvia).
  anteriores: [
    { n: 'Invopop', slug: 'invopop', dominio: 'invopop.com', sector: 'Facturación electrónica', logo: 'invopop', color: ['#1a4534', '#2f6a52', '#9dbfae'] },
    { n: 'Business Online Payroll', slug: 'business-online-payroll', dominio: 'businessonlinepayroll.com', sector: 'Nóminas y banca', logo: 'surepayroll', color: ['#101e3b', '#1c3364', '#a4a2a3'] },
    { n: 'Cubbo', slug: 'cubbo', dominio: 'cubbo.com', sector: '', logo: 'cubbo', color: ['#1b40d6', '#4963e2', '#788ae8'] },
    { n: 'Remerge', slug: 'remerge', dominio: 'remerge.io', sector: '', logo: 'remerge', color: ['#eceed9', '#f2ff71', '#ffffff'] },
    { n: 'Isotrol', slug: 'isotrol', dominio: 'isotrol.com', sector: 'Renovables', logo: 'isotrol', color: ['#19171d', '#635850', '#8d8478'] },
    // RONDA 65 · «añadir más proyectos»: cuatro del portfolio de Eric y Andoni (sector y lugar, de sus casos; colores medidos en su web; vídeo, de la grabación real)
    { n: 'Monad', slug: 'monad', dominio: 'monad.com', sector: 'Ciberseguridad', logo: '', color: ['#26352a', '#4d7a52', '#9fd39a'] }, // ronda 76: su verde (antes, el crema de su fondo: se perdía en la página)
    { n: 'Naterra', slug: 'naterra', dominio: 'naterra.pro', sector: 'Vivienda ecológica', logo: '', color: ['#593c28', '#9e6f47', '#caae8d'] },
    { n: 'Routal', slug: 'routal', dominio: 'routal.com', sector: 'Logística', logo: '', color: ['#3d6360', '#557a76', '#9dc7b5'] },
    { n: 'THX', slug: 'thx', dominio: 'thx.vision', sector: 'Consultoría', logo: '', color: ['#3f86bd', '#7fb3dc', '#c9dff0'] }, // ronda 76: Eric, «con este azulito»
  ],
  // RONDA 66 · «las métricas de más proyectos, como la captura que te paso; todas van rotando de manera animada» (la captura: una cuadrícula 3 × 2 de
  // trazo discontinuo con citas cortas, «Collaborated with Minimum» y «Honorable mention · awwwards»). Cada celda releva su contenido. Todo real: citas
  // (extractos de sus casos, traducidos y sin el nombre del estudio anterior), la colaboración con Minimum (ronda 67: fuera las menciones de Awwwards), cifras
  // del portfolio y logotipos de clientes (sacados de su web). `tipo`: cita · marca (rótulo + logotipo) · cifra.
  // RONDA 76 · Eric: «logos más grandes y proporcionales; dos o tres líneas por cita; "Han confiado su web" suena raro; falta Farco; son más de 80; y
  // Awwwards» → Andoni: «Awwwards con su logo (de su web); tenemos 80, el CMS no los tiene todos». Citas más largas (extractos fieles de sus casos).
  celdas: [
    [
      { tipo: 'cita', q: 'Lo que de verdad destaca es su conocimiento y su capacidad de mejorar nuestra idea inicial.', n: 'Inés López-Pita', r: 'Directora de marketing · Isotrol' },
      { tipo: 'cita', q: 'Eric y Andoni responden en minutos y despliegan en horas. Superaron nuestras expectativas.', n: 'Juan Moliner', r: 'Cofundador de Invopop' },
      { tipo: 'cita', q: 'Se comunicaron constantemente conmigo durante todo el proceso y juntos construimos algo precioso.', n: 'Sean Klamm', r: 'CEO de Playground IEP' },
    ],
    [
      { tipo: 'marca', rotulo: 'Colaboramos con', logo: '/media/logos/minimum.svg', n: 'Minimum' },
      { tipo: 'marca', rotulo: 'Hemos hecho la web de', logo: '/media/logos/multiverse.svg', n: 'Multiverse Computing' },
      { tipo: 'marca', rotulo: 'Colaboramos con', logo: '/media/logos/farco.svg', n: 'Farco Studio' },
    ],
    [
      { tipo: 'cita', q: 'Un equipo fiable y comprometido, con talento, profesionalidad y un flujo de trabajo impecable.', n: 'Félix Gonzalo', r: 'Webflow Developer · Monad' },
      { tipo: 'cita', q: 'Nunca tuve que ir detrás de ellos: venían a mí con soluciones. Entendieron desde el primer día quiénes somos.', n: 'Ignasi Vegas', r: 'Cofundador y CEO de Cubbo' },
      { tipo: 'cita', q: 'Un proyecto complejo, con varios idiomas y una migración de contenido extensa, llevado con una precisión sólida.', n: 'Guilherme Escobar', r: 'Marketing global · Remerge' },
    ],
    [
      { tipo: 'cifra', v: '+80', l: 'webs publicadas' },
      { tipo: 'marca', rotulo: 'Hemos hecho la web de', logo: '/media/logos/monad.svg', n: 'Monad' },
      { tipo: 'marca', rotulo: 'Mención de honor', logo: '/media/logos/awwwards.svg', n: 'Awwwards', texto: 'Awwwards' },
    ],
    [
      { tipo: 'cifra', v: '6', l: 'países con clientes' },
      { tipo: 'marca', rotulo: 'Hemos hecho la web de', logo: '/media/anteriores/logos/invopop.svg', n: 'Invopop' },
      { tipo: 'marca', rotulo: 'Hemos hecho la web de', logo: '/media/logos/codely.svg', n: 'Codely' },
    ],
    [
      { tipo: 'cifra', v: '2020', l: 'desde' },
      { tipo: 'marca', rotulo: 'Hemos hecho la web de', logo: '/media/logos/routal.png', n: 'Routal' },
      { tipo: 'marca', rotulo: 'Hemos hecho la web de', logo: '/media/anteriores/logos/cubbo.svg', n: 'Cubbo' },
    ],
  ] as { tipo: 'cita' | 'marca' | 'cifra'; q?: string; n?: string; r?: string; rotulo?: string; logo?: string; texto?: string; v?: string; l?: string }[][],
  // RONDA 66 · «los testimonios destacados, que sean uno como teníamos antes y que vayan rotando; te paso las imágenes (José Luis, Alberto de Transcend
  // y Danny Saltaren); y no hagas cambio de color». Citas reales de sus casos, traducidas del inglés y sin el nombre del estudio anterior.
  testimonios: [
    { n: 'José Luis Antúnez', r: 'Strategy Partner · Routal', retrato: '/media/testimonios/jl-antunez.webp', q: 'Habla con Eric y Andoni cuando necesites rediseñar tu web. Un gran trabajo y un gran proceso de documentación, diseño, desarrollo y entrega. Calidad, cercanía y rapidez.' },
    { n: 'Alberto Arenaza', r: 'Cofundador de Transcend Network', retrato: '/media/testimonios/alberto.webp', q: 'Ha sido un placer trabajar con ellos. Su dedicación, su rapidez y su proactividad lo ponen muy fácil. Los recomiendo sin dudarlo.' },
    { n: 'Danny Saltaren', r: 'Fundador de Minimum', retrato: '/media/testimonios/danny.webp', q: 'Valoro su flexibilidad, su atención al detalle y cómo se adaptan a plazos y cambios para mejorar la experiencia y el resultado final. Sin duda, volveremos a trabajar juntos.' },
  ],

  enlace: { label: 'Todos los proyectos', href: '/proyectos' },
};

export const servicios = {
  pregunta: '¿Cómo trabajamos contigo?',
  // RONDA 65 · copy de Andoni: «Trabajamos de tres formas contigo. En función de lo que necesites. 1. End-to-end. 2. Colaboración. 3. Consultoría», con sus
  // etiquetas («Diseño digital, Ilustraciones animadas Lotties, Animaciones 3D, Interacciones GSAP, Migraciones de Webflow/WordPress a IA, Integraciones con
  // CMS (Sanity, Supabase…), Multilenguaje, Narrativa de la web») y «que esos tags se encajen en cada uno: end-to-end serían todos, colaboración algo menos
  // y consultoría algo menos; también te dejo que los amplíes». Fuera la demo al pasar. Ampliadas por Nilo: sistema de diseño, desarrollo agéntico, la
  // receta (savvia.md), formación, auditoría, arquitectura de contenidos, SEO técnico, accesibilidad y rendimiento (lo que ya se hace en cada web).
  titulo: 'Trabajamos de tres formas contigo.',
  sub: 'En función de lo que necesites.',
  // RONDA 83 · «el "necesites" animarlo para que salgan los diferentes tipos de clientes a los que vamos». La frase rota: «En función de …». Los tipos
  // son PROPUESTA de Nilo (Andoni no los ha concretado): pendientes de su visto bueno.
  // RONDA 91 · «lo que necesites es un papel de ese estilo [el del hero] desde el que salen el resto: startups, SaaS, agencias creativas…»
  clientes: ['Startups', 'SaaS', 'Agencias creativas', 'Marcas que se renuevan', 'Equipos de marketing', 'Estudios que necesitan código'],
  rota: ['lo que necesites.', 'si tu marca está cambiando.', 'si eres una startup que despega.', 'si tu equipo de marketing no da abasto.', 'si ya tienes estudio y te falta código.'],
  lista: [
    {
      corto: 'End-to-end',
      d: 'De la primera conversación a la web publicada: la pensamos, la diseñamos y la construimos contigo, y te la dejamos lista para que tu equipo la lleve con IA.',
      tags: ['Narrativa de la web', 'Arquitectura de contenidos', 'Diseño digital', 'Sistema de diseño', 'Ilustraciones animadas (Lottie)', 'Animaciones 3D', 'Interacciones GSAP', 'Desarrollo agéntico', 'Integraciones con CMS (Sanity, Supabase…)', 'Multilenguaje', 'Migraciones de Webflow y WordPress a IA', 'SEO técnico', 'Accesibilidad y rendimiento', 'Auditoría de tu web', 'La receta: savvia.md', 'Formación a tu equipo'],
    },
    {
      corto: 'Colaboración',
      d: 'Nos sumamos a tu equipo o a tu agencia en la parte que más lo necesite: el diseño, el movimiento o el desarrollo.',
      tags: ['Diseño digital', 'Sistema de diseño', 'Ilustraciones animadas (Lottie)', 'Animaciones 3D', 'Interacciones GSAP', 'Desarrollo agéntico', 'Integraciones con CMS (Sanity, Supabase…)', 'Multilenguaje'],
    },
    {
      corto: 'Consultoría',
      d: 'Te ayudamos a decidir qué necesita tu web y a ordenarla para que tu equipo la cambie con IA sin salirse de tu marca.',
      tags: ['Narrativa de la web', 'Auditoría de tu web', 'Arquitectura de contenidos', 'Migraciones de Webflow y WordPress a IA', 'La receta: savvia.md', 'Formación a tu equipo'],
    },
  ],
};

// Testimonios REALES, extractos fieles de los casos (los mismos de la web anterior). Pendiente: visto bueno de cada cliente.
// RONDA 39 · salen de Servicios y van a «Nuestros proyectos» (Anteriores.astro); `de`: el proyecto del mosaico del que hablan.
// RONDA 40 · «ponemos menos cantidad y que sean animados y vayan rotando»: tres (`rota: true`), en una sola voz que se va relevando.
// RONDA 46 · «si tenemos vídeo del testimonio, poner un iconito como el de los proyectos para verlo en un modal»: `video` (mp4 en
// public/media/voces/) y `poster` (su primer fotograma). Vacío = sin vídeo: el icono no sale. `ar`: ancho / alto del vídeo (los tres son verticales).
// RONDA 48 · «deja testimonios de texto solo: los vídeos dicen treseiscero todos» → sin vídeos (los archivos, en tools/retirados/voces/). Codely y THX se
// quedan como voces de texto; la cita de THX, traducida del inglés y sin el nombre del estudio anterior («no se dice»).
export const voces = [
  { rota: true, de: 'isotrol', n: 'Inés López-Pita', r: 'Marketing Director · Isotrol', q: 'El servicio, la ejecución, los plazos y la entrega son excelentes, pero lo que de verdad destaca es vuestro conocimiento y la capacidad de mejorar nuestra visión inicial.', video: '', poster: '', ar: 16 / 9 },
  { rota: true, de: 'invopop', n: 'Juan Moliner', r: 'Co-founder · Invopop', q: 'Desde el primer día se integraron con nuestras herramientas. Responden en minutos y suben a producción en horas en vez de días. Superaron nuestras expectativas y volveremos a trabajar con ellos.', video: '', poster: '', ar: 16 / 9 },
  { rota: true, de: '', n: 'Javi Ferrer', r: 'Co-fundador · Codely', q: 'El proyecto ha sido un éxito gracias al increíble trabajo de Andoni y Eric. Compartimos un boceto y, para la siguiente iteración, Andoni lo tenía listo en Figma para que Eric lo desarrollara en Webflow. Una colaboración excelente, ¡muy recomendable!', video: '', poster: '', ar: 16 / 9 },
  { rota: true, de: '', n: 'Thomas Hauer', r: 'Founder · THX', q: 'Me los recomendó un diseñador para crear mi web y estoy encantado de haber seguido el consejo, tanto por la calidad de su trabajo como por cómo colaboraron conmigo. Lo pensaron todo, siempre estuvieron disponibles y me lo pusieron fácil con vídeos cortos y personalizados. Seis estrellas de cinco.', video: '', poster: '', ar: 16 / 9 },
  { rota: true, de: '', n: 'Claudia Bethencourt', r: 'Brand Shaper · Claudia BE', q: 'Metódicos, fiables, y se lanzaron de cabeza a desarrollar todas nuestras ideas. Un trabajo impecable, elogiado incluso por otros desarrolladores.', video: '', poster: '', ar: 16 / 9 },
  { rota: false, de: '', n: 'Danny Saltaren', r: 'Founder · Minimum Run', q: 'Valoro su flexibilidad, su atención al detalle y cómo se adaptan a plazos y cambios para mejorar la experiencia y el resultado final. Volveremos a trabajar juntos.', video: '', poster: '', ar: 16 / 9 },
  { rota: false, de: '', n: 'Félix Gonzalo', r: 'Webflow Developer · Monad', q: 'Eric y Andoni destacan por su talento, su profesionalidad y un flujo de trabajo impecable. Un equipo fiable y comprometido que recomiendo de corazón.', video: '', poster: '', ar: 16 / 9 },
];

export const estudio = {
  pregunta: '¿Quiénes están detrás?',
  // RONDA 39 · el claim que salía del hero vive aquí: es la única sección donde se habla en primera persona («el yo, en equipo»)
  titulo: 'El estudio web que orquesta la IA.',
  texto:
    'Somos Eric y Andoni, y estamos los dos en cada web, de la primera conversación a la última línea. Elegimos la herramienta adecuada para cada problema, no al revés.',
  personas: [
    { n: 'Andoni', falta: 'Frase de 2–3 líneas y rol.' },
    { n: 'Eric', falta: 'Frase de 2–3 líneas y rol.' },
  ],
};

// Respuestas PROVISIONALES (Nilo), escritas con lo que dicen la narrativa y el contexto de marca. Andoni y Eric las reescriben.
// `claves`: palabras con las que la pregunta LIBRE del visitante encuentra esta respuesta (sin ningún modelo detrás).
export const preguntas = {
  pregunta: '¿Preguntas?',
  titulo: 'Pregunta. Te contestamos a dúo.', // ronda 83 · el toque musical; antes «Pregunta. Contestamos nosotros.»
  firma: 'Eric y Andoni',
  nota: 'Solemos contestar en el día.',
  // RONDA 39 · reescritas hacia quien pregunta (punto 8): lo que gana o lo que decide el cliente va primero.
  lista: [
    { q: '¿La web la hace la IA?', a: 'No. La deciden personas: tú y dos diseñadores con criterio. La IA ejecuta más rápido lo que se decide, y eso te da más web por el mismo presupuesto.', claves: ['ia', 'inteligencia', 'artificial', 'agentes', 'agente', 'robot', 'automatica', 'chatgpt', 'claude'] },
    { q: '¿Qué es savvia agentic?', a: 'La forma de hacer y cuidar una web: a medida, con su savvia (la receta, en un documento que entiende cualquier IA) y los agentes que la cambian contigo.', claves: ['agentic', 'agentico', 'agentica', 'producto', 'sistema', 'metodo', 'receta', 'savvia'] },
    { q: '¿Cuánto tarda?', a: 'Depende del alcance, pero ves algo real en los primeros días, no una presentación al cabo de un mes. Las entregas son tempranas y frecuentes.', claves: ['tarda', 'tiempo', 'plazo', 'plazos', 'semanas', 'meses', 'rapido', 'fecha'] },
    { q: '¿Cuánto cuesta?', a: 'Lo sabes antes de empezar, con un número cerrado, en cuanto entendemos tu proyecto. El desarrollo agéntico te da más calidad a un coste asumible.', claves: ['cuesta', 'precio', 'precios', 'coste', 'costes', 'presupuesto', 'tarifa', 'caro', 'dinero', 'pagar', 'costar', 'vale', 'cobrais', 'inversion'] },
    { q: '¿Y si mi web está en Webflow o WordPress?', a: 'Si lo que tienes te sirve, se mejora; si te encierra, te proponemos salir y te explicamos por qué. La herramienta se elige por tu problema, no al revés.', claves: ['webflow', 'wordpress', 'framer', 'shopify', 'migrar', 'migracion', 'cms', 'plataforma', 'herramienta', 'tecnologia', 'stack'] },
    { q: '¿Voy a depender de vosotros?', a: 'No. Te quedas con el código y con tu savvia: el documento con cada decisión. Con él, cualquiera, persona o agente, sabe cambiarla.', claves: ['dependo', 'dependencia', 'depender', 'despues', 'terminar', 'mantenimiento', 'mantener', 'propiedad', 'codigo', 'documento', 'documentacion'] },
    { q: '¿Mi equipo puede tocarla?', a: 'Sí, y aprende a hacerlo. Tu equipo se forma en desarrollo agéntico para cambiar la web sin miedo y sin llamar a nadie.', claves: ['equipo', 'tocar', 'editar', 'cambiar', 'actualizar', 'formacion', 'aprender', 'ensenar', 'contenido'] },
  ],
  libre: {
    etiqueta: '¿Tienes otra?',
    ayuda: 'Escríbela. Aquí no contesta ninguna IA: si ya la tenemos respondida te la enseñamos, y si no, nos llega a nosotros.',
    boton: 'Preguntar',
    sinRespuesta: 'Esa no la tenemos escrita todavía. Mándanosla y te contestamos nosotros, normalmente en el día.',
  },
};

export const pie = {
  // RONDA 83 · el pie es el FINAL DE LA OBRA (dirección A): una invitación a tocar juntos. Antes: «La savia de tu web.» (el juego de savia ya no aplica)
  titulo: '¿Tocamos juntos?',
  pitch: 'Cuéntanos qué necesita tu web. Escribimos la partitura, dirigimos a los agentes y te la dejamos afinada.',
  // la atribución de la música de Proyectos destacados (CC BY-SA 4.0: obligatoria; ver tools/fuentes-sonido.md)
  credito: 'Música: Vivaldi, Las cuatro estaciones · John Harrison y Wichita State University Chamber Players (CC BY-SA 4.0)',
  correo: 'hola@savvia.studio',
  cal: '', // ronda 65: «Contáctanos» llevará a un cal.com (falta el enlace); mientras, al correo
  faltaCorreo: '¿hola@savvia.com o @savvia.studio?',
  lugar: 'Donostia',
  desde: 'desde 2020',
};
