// Copy de la home. Fuente: estructura (Google Doc) + Narrativa – Savvia (Keynote), ronda 82.
// Lo marcado `falta` son datos de Andoni y Eric que NO se inventan.
// [[…]] = detalle de IA: una marca Iris MUY sutil junto a la palabra. Hoy, dos en toda la página.
// NO se presume de experiencia (años, nº de clientes): el trabajo la demuestra. «Desde 2020» solo como detalle en el pie.

export const nav = {
  // RONDA 126 · Andoni: «las páginas del menú van a ser Portfolio, Lab y Manifesto. Luego, en pequeño, nuestro correo y handbook»
  // RONDA 131 · Andoni: «menú superior simplemente añadimos el reel, el resto va fuera» (fuera: hora, cuentas y último proyecto)
  links: [
    { label: 'Servicios', href: '/#servicios' }, // ronda 152 · «en el menú ponemos un ancla a servicios»
    { label: 'Portfolio', href: '/proyectos' },
    { label: 'Lab', href: '/lab' },
    { label: 'Manifiesto', href: '/manifiesto' },
  ] as { label: string; href: string }[],
  reel: { label: 'Reel', duracion: '0:30' }, // ronda 130: el reel vuelve, montado con Kuanta y Arkdev (marca blanca)
  // Segundo grupo de la tarjeta del menú (pequeño, bajo el filete): el correo (de `pie.correo`) y el handbook (sin `href` saldría como «pronto»)
  mas: { titulo: 'Más', links: [{ label: 'Sistema', href: '/sistema' }, { label: 'Método', href: '/metodo' }] /* ronda 180: Sistema = diseño + desarrollo; el Método, aparte */ as { label: string; href: string }[] }, // ronda 127: la página del handbook (referencia de Andoni: designhandbook.com)
};

export const hero = {
  // RONDA 40 · «el titular principal no tiene que ser crecer tu web, podemos mirar del documento keynote». Del Keynote («Narrativa – Savvia»):
  // el elevator pitch habla a quien «está cambiando y su web ya no le representa», y el mensaje clave de beneficio es «mejor web en menos tiempo y
  // a menor coste». El titular responde al primero; el subtítulo es el segundo, con el cómo (criterio + IA).
  // RONDA 53 · «el H1 es muy amplio y no dice nada: más específico, que el cliente diga hostia, esto pueden hacer por mí». Lo concreto del Keynote: web
  // a medida (no un lavado de cara) + tu equipo la cambia con IA (formación + todo documentado) + el ARNÉS (la receta hace que la IA no se salga de tu marca).
  // RONDA 83 (Eric, 03/10): «H1: Orquestamos tu web con IA. · Sub: Somos especialistas en desarrollo agéntico.». OJO: Andoni devolvió el H1 a
  // «Elevamos tu web con IA.» en la ronda 77; pendiente de que lo acuerden los dos antes de publicar. Antes (r65): «Especializados en orquestar el
  // diseño y desarrollo agéntico.»; (r53): «Una web a medida que tu equipo cambia con IA, fiel a tu marca.»
  h1: 'Elevamos tu web con IA.', // ronda 125 (Andoni)
  h2: 'Especialistas en orquestar el desarrollo agéntico.', // ronda 128 (Andoni); antes (r125) «…orquestar con desarrollo agéntico.»
  // Las palabras con las que está hecho el ROBLE del hero (copa) y sus RAÍCES. Salen del diccionario de la marca (AGENTS.md › Se dice).
  vocabulario: ['orquestar', 'criterio', 'elevar', 'desarrollo agéntico', 'a medida', 'de principio a fin', 'documentado', 'fuente de verdad', 'claridad', 'versatilidad', 'contigo', 'Eric y Andoni', 'savvia', 'la savia', 'tu web', 'diseño', 'con criterio'],
  vocabularioRaiz: ['raíz', 'briefing', 'entender', 'qué vendes', 'a quién', 'decisiones', 'savvia', 'fuente de verdad', 'documentado', 'criterio', 'la savia', 'desde la raíz'],
};

// RONDA 39 · «buscar alguna forma de introducir un nombre para productizar savvia, savvia agentic o algo así». Nombre elegido: savvia agentic
// (el sistema: la web a medida + su savvia + los agentes que la cuidan). «savvia.md» sigue siendo el documento que se entrega.
export const producto = {
  nombre: 'savvia agentic',
  frase: 'La web, su receta y los agentes que la mantienen al día.',
};

export const recorrido = {
  // RONDA 39 · «la segunda sección tenemos que enfocarla más a los pains del usuario, y no hacer que sea un slider: un recorrido que funciona
  // con el scroll, de manera que el usuario pasa por todos los pains». Cada parada: el DOLOR (lo que siente quien entra) y la RESPUESTA,
  // con la demo que ya gustaba de cada paso. Siempre en segunda persona (ronda 39, punto 8: «el yo solo lo proyectamos en equipo»).
  pregunta: '¿Te suena alguno?',
  // RONDA 156 · Eric (Agentation, sobre «¿A dónde quieres llegar?»): «tenemos que adjuntar una batería de preguntas más extensa, así en animación, no solo 4»
  // · «la animación tiene que ser como la de antes; solo que cuando sale la segunda o tercera tanda, que sean preguntas diferentes».
  // Las preguntas del BRIEFING que hacemos de verdad, sacadas de la carpeta de Drive «Savvia - Andoni x Eric x José Luis»: la Narrativa del 2 de
  // septiembre (el cliente como director creativo, «una persona clara que tome decisiones», «que el mensaje para su usuario quede muy claro», a quién
  // admiramos, la competencia), los Mensajes clave de José Luis (tu producto, tu equipo y tu forma de contarlo han avanzado y la web sigue contando la
  // versión de hace tres años; webs ancladas en tecnologías del pasado, difíciles de mantener; CMS, idiomas) y la sesión del 21 («desde la raíz»).
  // Cuatro TANDAS de cuatro (la demo las enseña de cuatro en cuatro, en orden): quién eres · qué ha pasado · cómo trabajáis · qué viene después.
  // RONDA 175 (2.ª) · la demo del paso 2: tu dirección + nuestro criterio se funden en una skill; estas son las que van saliendo (nombres de Nilo)
  skills: [{ t: 'Diseño', i: 'diseno' }, { t: 'Movimiento', i: 'movimiento' }, { t: 'Desarrollo', i: 'desarrollo' }], // «skills únicas de diseño y desarrollo web»
  briefing: [
    ['¿Qué vendes?', '¿A quién?', '¿Qué hace especial lo que haces?', '¿Quién más hace lo que haces?'],
    ['¿Qué ha cambiado desde tu última web?', '¿Qué ya no cuenta de ti?', '¿Qué debe entenderse al entrar?', '¿Qué webs admiras? ¿Cuáles no?'],
    ['¿Quién decide en tu equipo?', '¿Cómo llegan hoy tus clientes a ti?', '¿Qué os cuesta cambiar hoy?', '¿Cada cuánto publicáis? ¿En qué idiomas?'],
    ['¿Quién mantendrá la web? ¿Qué equipos?', '¿Qué querréis cambiar a menudo?', '¿Qué fechas estimáis?', '¿A dónde quieres llegar con la nueva web?'],
  ],
  // RONDA 53 · más cerca del Keynote: los cuatro problemas de su diapositiva «Web anclada en paradigma anterior» (ya no te representa · genérica e
  // impersonal · difícil de gestionar y mal documentada · infraestructura vieja y cara + equipo que no domina la IA) y, en el tercero, el ARNÉS.
  // RONDA 65 · copy de Andoni: tres dolores (el 3 y el 4 de antes se funden: la demo de la receta y la de la landing van juntas)
  pasos: [
    {
      corto: 'No se alinea con tu marca',
      // ronda 83 · Eric: el dolor abre la frase y la respuesta la sigue (sin punto en el titular: continúa en el texto)
      dolor: 'Si tu web no se alinea con tu marca…',
      t: 'Pasamos tiempo mano a mano',
      d: 'contigo entendiendo lo que necesita tu proyecto.',
    },
    {
      corto: 'AI slop',
      dolor: 'Si lo que haces se ve como AI Slop…',
      t: 'Con tu dirección y nuestro criterio',
      d: 'generamos skills únicas de diseño y desarrollo web.',
    },
    {
      corto: 'Difícil de mantener',
      dolor: 'Si la consistencia del diseño se rompe en cada cambio…',
      t: 'savvia: el agente que guía tu web.',
      d: 'Un sistema que conecta tu página web con la IA.',
    },
  ],
};

// RONDA 186 · Eric: «replantear la segunda sección: un manifiesto que se lea bien con los tres problemas y así presentamos savvia agentic; luego la
// ilustración animada (la librería) y luego proyectos destacados». Referencia: un texto en serif que se entinta palabra a palabra con el scroll. Copy de
// Drive «Savvia - Andoni x Eric x José Luis» › «Sesión Narrativa Home Page | Savvia 21 Sept»: el manifiesto tal cual, salvo «partitura propia» →
// «receta propia» (la metáfora musical cayó en la ronda 117; el /manifiesto ya dice «receta propia») y «Savvia Agentic» en minúscula (ronda 16).
// `[[…]]` = la marca (no se parte entre líneas).
export const problemas = {
  aria: 'Por qué savvia agentic',
  // ronda 186 (Eric: «menos texto, tres párrafos cortos»): el mismo manifiesto, condensado por Nilo con sus propias frases
  parrafos: [
    'La IA es la base; el criterio sigue siendo nuestro.',
    'Hacemos tu web como un traje a medida, mano a mano contigo.',
    'Cocinamos a fuego lento, píxel a píxel, y te entregamos la receta…',
    '[[savvia agentic]]: tu web conectada con la IA.',
  ],
};

export const laSavvia = {
  pregunta: '¿Qué es la savvia?',
  // RONDA 12 (Andoni): «ponemos savvia es la receta de tu web. Y en vez de un documento, ponemos un sistema.»
  titulo: 'La savvia es la receta de tu web.',
  intro: 'No es un documento que se guarda en un cajón: es un sistema. Cada ingrediente decide una parte de la web, y todos se leen igual: tú, tu equipo y la [[IA]].',
  // Los INGREDIENTES del sistema. Todos los valores son REALES: son los de la Savvia de esta misma web (DESIGN.md + AGENTS.md).
  ingredientes: [
    { id: 'color', n: 'Color', v: 'Cacao · Rosa niebla · Nogal · Coral · Cobalto · Cereza', d: 'Seis colores, cada uno con su papel. El Coral es la acción; cada bloque, un solo acento.' },
    { id: 'tipo', n: 'Tipografía', v: 'Family · Timeless Sans · Timeless Grotesk', d: 'Tres voces: la editorial, la de lectura y la de los detalles.' },
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
      { k: 'p', v: 'Family 400 · Timeless Sans · Timeless Grotesk' },
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
export const receta = {
  titulo: 'savvia agentic.', // ronda 125: la sección de la rama musical (LaPartitura); antes «La savvia es la receta de tu web.»
  arnes: 'Los fundamentos de diseño y desarrollo de tu web, en una librería que cualquier IA sabe leer.\n\nAsí tú y tu equipo podréis cambiar lo que queráis respetando las decisiones que tomamos juntos.', // ronda 186 (Eric, frase suya)
  nota: 'La receta real de Neety: la que usa su equipo cada día para cambiar su web con IA.',
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
      paso: 'tu marca',
      t: 'DESIGN.md',
      raya: '=-=-=-=-=-=-=-=-=-=-=-=',
      lineas: ['# Neety · la receta', '> la web se genera de', '  su propio código', '', '## color', 'Naranja Core   #FE8238', 'Azul bebé      #A7C5F9', 'Berenjena      #431B44', 'Ciruela        #2A0E2C', 'Base cálida    #F8F7EC', '', '## tipografía', 'titulares  Bricolage', 'cuerpo     Switzer', 'H1  112 / 64 px · 120%', '', '## espacio', 'xtiny 4 … xxhuge 160', 'sección 96·128·224 px'],
      marcas: [[5, 'circulo'], [12, 'subraya']],
      digital: { tipo: 'tabla', txt: 'app/globals.css · @theme', filas: [['Naranja Core', '#FE8238', 'bg-naranja'], ['Berenjena', '#431B44', 'text-plum'], ['Base cálida', '#F8F7EC', 'bg-base']], colores: ['#FE8238', '#431B44', '#F8F7EC'] },
    },
    {
      paso: 'el arnés',
      t: 'guardarraíles',
      raya: '·x·x·x·x·x·x·x·x·x·x·x·',
      lineas: ['nada de colores', '   ni fuentes nuevas', '', 'ni un hero distinto:', '   se reutiliza uno', '', 'ni botones inventados', '', 'un cambio por petición', '', 'ni publicar sin', '   mirarla en el preview'],
      marcas: [[0, 'subraya'], [6, 'visto'], [8, 'visto'], [10, 'visto']],
      digital: { tipo: 'bloqueo', txt: '#FF2E9A no está en la receta', fin: 'usa el token Naranja Core', cab: 'CLAUDE.md · el arnés' },
    },
    {
      paso: 'tu equipo pide',
      t: 'lo que pide su equipo',
      raya: "`'. .'`'. .'`'. .'`'. .'`",
      lineas: ['«Añade una sección de', 'testimonios en la home,', 'entre Cómo funciona', 'e Integraciones: tres', 'citas con nombre, cargo', 'y empresa, con el estilo', 'de tarjeta blanca.»'],
      marcas: [[6, 'subraya']],
      digital: { tipo: 'agente', txt: 'agente · leyendo la receta', pasos: ['lee CLAUDE.md', 'reutiliza la tarjeta blanca', 'la añade en ES y EN', 'la revisa en el preview'], fin: 'sección lista ✓' },
    },
    {
      paso: 'queda escrito',
      t: 'decisiones',
      raya: '·_·~·_·~·_·~·_·~·_·~·_·',
      lineas: ['el borde izquierdo', '   siempre con el logo', '', 'imágenes nuevas', '   en AVIF', '', 'bilingüe desde', '   el primer día'],
      marcas: [[0, 'visto'], [3, 'visto'], [6, 'visto']],
      digital: { tipo: 'diff', txt: 'docs/decisiones.md', pasos: ['+ borde izquierdo con el logo', '+ imágenes nuevas en AVIF', '+ bilingüe desde el día 1'], fin: '+3' },
    },
    {
      paso: 'la cuenta',
      t: 'ticket',
      raya: '.......................',
      lineas: ['Web a medida ..... hecha', 'Cada decisión .. escrita', 'Tu IA ...... con arnés', 'Tu equipo ..... al mando', '', '   gracias por venir'], // ronda 80: fuera «Lavado de cara ..... 0 €»
      marcas: [[2, 'circulo']],
      digital: { tipo: 'boton', txt: 'Enséñame la librería de Neety', href: 'https://neety.treseiscero.app/library' }, // ronda 80: un mensaje a la IA
    },
  ] as { paso: string; t: string; raya: string; lineas: string[]; marcas: [number, string][]; digital: { tipo: string; txt: string; fin?: string; cab?: string; href?: string; colores?: string[]; filas?: string[][]; pasos?: string[] } }[],
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
      slug: 'kuanta', // ronda 126: Multiverse Computing → marca blanca «Kuanta» (no llegaron a publicar la web): captura con su nombre y logotipo cambiados, sin iframe
      paleta: ['#15181C', '#F01438', '#3A3E44', '#C0C3C5'], // medida sobre la captura. PROVISIONAL: confirmar con el CSS de cada web
      n: 'Kuanta',
      cat: 'IA y computación cuántica',
      d: 'Una esfera de puntos que se comprime hasta ser su logotipo: el producto, explicado sin una palabra.',
      // RONDA 135 · Andoni: «tienen que tener su página real en la vista en detalle; de momento la real»: sentado, el iframe con la web de Multiverse
      // (sin x-frame-options ni CSP frame-ancestors, medido con curl). `dominio`: lo que se rotula en la pantalla de carga (la marca blanca no enseña el suyo).
      url: 'https://multiverse-home.vercel.app/',
      dominio: 'savvia.studio',
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
      // RONDA 160 · Eric quitó `x-frame-options` en staging: neety.treseiscero.app manda `frame-ancestors 'self' https://savvia.studio https://*.savvia.studio
      // http://localhost:*` → la web real va en el iframe (neety.com sigue sin dejarse embeber: no cambiar la url).
      estacion: 'otono',
      hechos: [
        ['Trabajo', 'Home · diseño y desarrollo agéntico'],
        ['Un dato', '9 secciones'],
      ],
    },
    {
      slug: 'arkdev', // ronda 126: Zernio → marca blanca «Arkdev» (antes «Amarra» en sus casos): captura con su nombre y logotipo cambiados, sin iframe
      paleta: ['#F8F4EE', '#603B32', '#998A82', '#251A17'], // medida sobre la captura. PROVISIONAL: confirmar con el CSS de cada web
      n: 'Arkdev',
      cat: 'API para desarrolladores',
      d: 'Una API de redes y mensajería para 23 canales, presentada como un muelle donde atraca cada uno.',
      // RONDA 135 · sentado, la web real de Zernio (sin x-frame-options ni frame-ancestors, medido con curl)
      url: 'https://zernio.treseiscero.app/',
      dominio: 'savvia.studio',
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
    // RONDA 189 · Eric: «las demás cards, como la de Kymatio; te digo las webs»: Kymatio · Wisable · Monad · Transcend · Cubbo · Remerge · THX, todas
    // sobre el paisaje barrido de la estación con su navegador. Vídeos: tools/r189/grabar.cjs <slug> (Remerge, ya en escritorio). Fuera BOP, Isotrol,
    // Naterra y Routal (siguen en /proyectos y en su caso). Sector, de lo que dice cada web.
    // ronda 191 · Eric: Home of Ambrose, primera pieza; «el gradiente no cumple con su paleta» → la de su CSS: melocotón, terracota y oliva
    { n: 'Home of Ambrose', slug: 'home-of-ambrose', dominio: 'homeofambrose.com', sector: 'Vivienda', logo: '', color: ['#f6e5d5', '#c25631', '#4d4d1c'] },
    { n: 'Wisable', slug: 'wisable', dominio: 'wisable.com', sector: 'Venta de empresas', logo: '', color: ['#0b0f2e', '#1b2150', '#e6f24a'] },
    { n: 'Kymatio', slug: 'kymatio', dominio: 'kymatio.com', sector: 'Ciberseguridad', logo: '', color: ['#0b1f17', '#123a2c', '#2fbf8a'] },
    { n: 'Monad', slug: 'monad', dominio: 'monad.com', sector: 'Ciberseguridad', logo: '', color: ['#e4efe0', '#b8d8b1', '#86b98a'] },
    { n: 'Transcend', slug: 'transcend-network', dominio: 'transcend-network.com', sector: 'Comunidad de fundadores', logo: '', color: ['#fff6ee', '#ff6b1a', '#3f7bff'] },
    { n: 'Cubbo', slug: 'cubbo', dominio: 'cubbo.com', sector: 'Logística para ecommerce', logo: 'cubbo', color: ['#1b40d6', '#4963e2', '#788ae8'] },
    { n: 'Remerge', slug: 'remerge', dominio: 'remerge.io', sector: 'Publicidad móvil', logo: 'remerge', color: ['#eceed9', '#f2ff71', '#ffffff'] },
    { n: 'THX', slug: 'thx', dominio: 'thx.vision', sector: 'Consultoría', logo: '', color: ['#3f86bd', '#7fb3dc', '#c9dff0'] },
  ],
  // RONDA 66 · «las métricas de más proyectos, como la captura que te paso; todas van rotando de manera animada» (la captura: una cuadrícula 3 × 2 de
  // trazo discontinuo con citas cortas, «Collaborated with Minimum» y «Honorable mention · awwwards»). Cada celda releva su contenido. Todo real: citas
  // (extractos de sus casos, traducidos y sin el nombre del estudio anterior), la colaboración con Minimum (ronda 67: fuera las menciones de Awwwards), cifras
  // del portfolio y logotipos de clientes (sacados de su web). `tipo`: cita · marca (rótulo + logotipo) · cifra.
  // RONDA 76 · Eric: «logos más grandes y proporcionales; dos o tres líneas por cita; "Han confiado su web" suena raro; falta Farco; son más de 80; y
  // Awwwards» → Andoni: «Awwwards con su logo (de su web); tenemos 80, el CMS no los tiene todos». Citas más largas (extractos fieles de sus casos).
  // RONDA 189 · Eric revisó en una página todas las reviews del CMS de Webflow (artefacto «Reviews y logos»): la cuadrícula queda SOLO con citas
  // (18, versiones cortas en castellano y sin el nombre del estudio anterior); fuera las cifras; los logotipos pasan al muro (`muro`). Persona, cargo con coma.
  // RONDA 189 (2.ª) · Eric: «hay que intercalar reseñas con logos de "hemos trabajado con" o "hemos colaborado con"»: cada celda alterna cita y
  // logotipo (las impares empiezan por logotipo, así siempre hay de los dos a la vista); fuera el muro aparte.
  celdas: [
    [
      { tipo: 'cita', q: 'Nunca tuve que ir detrás de ellos: venían a mí con soluciones. Entendieron desde el primer día quiénes somos.', n: 'Ignasi Vegas', r: 'Cofundador y CEO, Cubbo' },
      { tipo: 'marca', rotulo: 'Hemos trabajado con', logo: '/media/logos/cuadricula/remerge.png', n: 'Remerge', escala: 1.3 },
      { tipo: 'cita', q: 'Un equipo fiable y comprometido, con talento, profesionalidad y un flujo de trabajo impecable.', n: 'Félix Gonzalo', r: 'Sr. Webflow Developer / Tech Lead, Edgar Allan' },
      { tipo: 'marca', rotulo: 'Hemos trabajado con', logo: '/media/logos/cuadricula/thx.png', n: 'THX' },
      { tipo: 'cita', q: 'Un proyecto complejo, con varios idiomas y una migración de contenido extensa, llevado con una precisión sólida.', n: 'Guilherme Escobar', r: 'Global Marketing Director, Remerge' },
      { tipo: 'marca', rotulo: 'Hemos colaborado con', logo: '/media/logos/cuadricula/universidad-de-mondragon.png', n: 'Universidad de Mondragón', escala: 1.6 },
      { tipo: 'marca', rotulo: 'Hemos trabajado con', logo: '/media/logos/cuadricula/naterra.png', n: 'Naterra', escala: 1.25 },
    ],
    [
      { tipo: 'marca', rotulo: 'Hemos trabajado con', logo: '/media/logos/cuadricula/cubbo.png', n: 'Cubbo', escala: 1.35 },
      { tipo: 'cita', q: 'Eric y Andoni responden en minutos y despliegan en horas. Superaron nuestras expectativas.', n: 'Juan Moliner', r: 'Cofundador, Invopop' },
      { tipo: 'marca', rotulo: 'Colaboramos activamente con', logo: '/media/logos/cuadricula/farco-studio.png', n: 'Farco Studio', escala: 1.05 },
      { tipo: 'cita', q: 'Se comunicaron constantemente conmigo durante todo el proceso y juntos construimos algo precioso.', n: 'Sean Klamm', r: 'CEO, Playground IEP' },
      { tipo: 'marca', rotulo: 'Hemos trabajado con', logo: '/media/logos/cuadricula/surepayroll.png', n: 'SurePayroll', escala: 1.35 },
      { tipo: 'cita', q: 'Llevamos un año colaborando en SurePayroll y los resultados han sido muy buenos: nos han ayudado a hacer crecer la relación con el cliente.', n: 'Brian Farrell', r: 'Fundador y director, Farco Studio' },
      { tipo: 'marca', rotulo: 'Hemos trabajado con', logo: '/media/logos/cuadricula/profounders-capital.png', n: 'PROFounders Capital', escala: 1.4 },
      { tipo: 'marca', rotulo: 'Hemos trabajado con', logo: '/media/logos/cuadricula/junipero.png', n: 'Junipero', escala: 1.25 },
      { tipo: 'cita', q: 'Cercanos, humanos y capaces de entender de verdad tu proyecto. Más que un proveedor, son parte de tu equipo.', n: 'Unai Arambarri', r: 'Fundador y CEO, Neety' },
      { tipo: 'marca', rotulo: 'Hemos trabajado con', logo: '/media/logos/cuadricula/neety.png', n: 'Neety', escala: 1.3 },
    ],
    [
      { tipo: 'cita', q: 'Supieron transmitir lo que hace nuestra tecnología. El mejor equipo que he visto en diseño y en trato con el cliente.', n: 'Nuria Pastor', r: 'CEO, Vitalera' },
      { tipo: 'marca', rotulo: 'Hemos trabajado con', logo: '/media/logos/cuadricula/codely.png', n: 'Codely', escala: 1.2 },
      { tipo: 'cita', q: 'Pensaron en todo, siempre estuvieron disponibles y me lo pusieron facilísimo con vídeos cortos en Loom. Seis estrellas de cinco.', n: 'Thomas Hauer', r: 'Fundador, THX' },
      { tipo: 'marca', rotulo: 'Hemos trabajado con', logo: '/media/logos/cuadricula/transcend-network.png', n: 'Transcend Network', escala: 1.25 },
      { tipo: 'cita', q: 'Un colaborador clave en la digitalización de nuestra herramienta: la terminamos a tiempo y con la calidad que buscábamos.', n: 'Ainara Martínez Rivera', r: 'Coordinadora de investigación, Universidad de Mondragón' },
      { tipo: 'marca', rotulo: 'Hemos trabajado con', logo: '/media/logos/cuadricula/impact-bridge.png', n: 'Impact Bridge', escala: 1.2 },
      { tipo: 'marca', rotulo: 'Hemos trabajado con', logo: '/media/logos/cuadricula/valuat.png', n: 'Valuat', escala: 1.15 },
      { tipo: 'marca', rotulo: 'Hemos trabajado con', logo: '/media/logos/cuadricula/wisable.png', n: 'Wisable', escala: 1.15 },
    ],
    [
      { tipo: 'marca', rotulo: 'Hemos trabajado con', logo: '/media/logos/cuadricula/invopop.png', n: 'Invopop', escala: 1.25 },
      { tipo: 'cita', q: 'Una gozada trabajar con ellos: profesionalidad del máximo nivel, un equipo que aporta y multiplica el resultado.', n: 'Fernando Mateus', r: 'CEO y fundador, Kymatio' },
      { tipo: 'marca', rotulo: 'Hemos trabajado con', logo: '/media/logos/cuadricula/monad.png', n: 'Monad', escala: 1.25 },
      { tipo: 'cita', q: 'Compartimos un boceto y en la siguiente iteración ya estaba diseñado y listo para desarrollar. Muy productivo y con muy pocas reuniones.', n: 'Javi Ferrer', r: 'Cofundador, Codely' },
      { tipo: 'marca', rotulo: 'Hemos trabajado con', logo: '/media/logos/cuadricula/bluence.png', n: 'Bluence', escala: 1.15 },
      { tipo: 'cita', q: 'Trabajar con ellos lo hace todo más fácil: muchos recursos, mucho detalle y siempre dispuestos a mejorar el resultado.', n: 'Alejandro Sánchez', r: 'Head of Design, mendesaltaren' },
    ],
    [
      { tipo: 'cita', q: 'Captaron exactamente lo que queríamos transmitir, y lo hicieron rápido y con profesionalidad.', n: 'Carlos Hernández', r: 'Fundador y CEO, Kalma' },
      { tipo: 'marca', rotulo: 'Hemos colaborado con', logo: '/media/logos/cuadricula/minimum.png', n: 'Minimum', escala: 1.05 },
      { tipo: 'cita', q: 'Captaron nuestra esencia a la perfección y superaron todas las expectativas en tiempo récord.', n: 'Santos J. Díaz Pastor', r: 'Asociado de inversión, Impact Bridge Asset Management SGIIC' },
      { tipo: 'cita', q: 'Muy satisfechos con su trabajo y su compromiso de principio a fin. Seguiremos colaborando en futuros proyectos.', n: 'Emilio Rodríguez', r: 'Socio director, Lyra' },
      { tipo: 'marca', rotulo: 'Hemos trabajado con', logo: '/media/logos/cuadricula/lyra.png', n: 'Lyra', escala: 1.1 },
    ],
    [
      { tipo: 'marca', rotulo: 'Hemos trabajado con', logo: '/media/logos/cuadricula/isotrol.png', n: 'Isotrol', escala: 1.15 },
      { tipo: 'cita', q: 'Comunicación fluida durante todo el desarrollo, mucho oficio y un acompañamiento como socios del más alto nivel.', n: 'Olalla Castro', r: 'Fundadora y CEO, Eleven Lab' },
      { tipo: 'marca', rotulo: 'Hemos trabajado con', logo: '/media/logos/cuadricula/routal.png', n: 'Routal', escala: 1.05 },
      { tipo: 'cita', q: 'Su forma de trabajar, profesional y cercana, hizo que todo el proceso fuera fluido y agradable. Un trabajo de diez.', n: 'Manu Cabrera', r: 'Fundador, Kabila' },
      { tipo: 'marca', rotulo: 'Hemos trabajado con', logo: '/media/logos/cuadricula/kymatio.png', n: 'Kymatio', escala: 1.15 },
      { tipo: 'marca', rotulo: 'Hemos trabajado con', logo: '/media/logos/cuadricula/kalma.png', n: 'Kalma', escala: 1.1 },
      { tipo: 'cita', q: 'Destacaría lo rápido que entendieron la misión del proyecto, la ejecución precisa de nuestras ideas y su agilidad para añadir matices.', n: 'Edu Riera', r: 'Fundador, Zrive' },
    ],
  ] as { tipo: 'cita' | 'marca' | 'cifra'; q?: string; n?: string; r?: string; rotulo?: string; logo?: string; texto?: string; v?: string; l?: string; escala?: number }[][],

  // RONDA 66 · «los testimonios destacados, que sean uno como teníamos antes y que vayan rotando; te paso las imágenes (José Luis, Alberto de Transcend
  // y Danny Saltaren); y no hagas cambio de color». Citas reales de sus casos, traducidas del inglés y sin el nombre del estudio anterior.
  testimonios: [
    { n: 'José Luis Antúnez', r: 'Nuestro mentor en estrategia y narrativa', retrato: '/media/testimonios/jl-antunez.webp', q: 'Habla con Eric y Andoni cuando necesites rediseñar tu web. Un gran trabajo y un gran proceso de documentación, diseño, desarrollo y entrega. Calidad, cercanía y rapidez.' },
    { n: 'Alberto Arenaza', r: 'Nos abrió la puerta a proyectos internacionales', retrato: '/media/testimonios/alberto.webp', q: 'Ha sido un placer trabajar con ellos. Su dedicación, su rapidez y su proactividad lo ponen muy fácil. Los recomiendo sin dudarlo.' },
    // RONDA 191 · Juanjo (JJ) Velaz: su cita de la home en inglés de treseiscero.app (2022, en web.archive.org), traducida y sin «treseiscero».
    //   Retrato: su foto pasada a carboncillo con tools/r191/retrato.py (no es de la mano de Andoni).
    { n: 'JJ Velaz', r: 'Nuestro mentor de negocio desde el principio', retrato: '/media/testimonios/juanjo-velaz.webp', q: 'Trabajar con Eric y Andoni fue fácil, rápido y de mucha calidad. Les cuento lo que necesito y sé que lo resolverán sin idas y venidas. Comunicación excelente y precios claros.' },
    { n: 'Danny Saltaren', r: 'Nos descubrió y nos impulsó en nuestros inicios', retrato: '/media/testimonios/danny.webp', q: 'Valoro su flexibilidad, su atención al detalle y cómo se adaptan a plazos y cambios para mejorar la experiencia y el resultado final. Sin duda, volveremos a trabajar juntos.' },
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
  // RONDA 132 · los dieciséis puntos, en sus cuatro grupos (los mismos de la tabla de la ronda 73): la tarjeta de cada forma los marca con un check
  grupos: [
    { n: 'Estrategia', items: ['Narrativa de la web', 'Arquitectura de contenidos', 'Auditoría de tu web'] },
    { n: 'Diseño y movimiento', items: ['Diseño digital', 'Sistema de diseño', 'Ilustraciones animadas (Lottie)', 'Animaciones 3D', 'Interacciones GSAP'] },
    { n: 'Desarrollo', items: ['Desarrollo agéntico', 'Integraciones con CMS (Sanity, Supabase…)', 'Multilenguaje', 'Migraciones de Webflow y WordPress a IA', 'SEO técnico', 'Accesibilidad y rendimiento'] },
    { n: 'Después', items: ['La receta: savvia.md', 'Formación a tu equipo'] },
  ],
  lista: [
    {
      corto: 'End-to-end',
      cab: 'Qué incluye el end-to-end:',
      d: 'De la primera conversación a la web publicada: la pensamos, la diseñamos y la construimos contigo, y te la dejamos lista para que tu equipo la lleve con IA.',
      tags: ['Narrativa de la web', 'Arquitectura de contenidos', 'Diseño digital', 'Sistema de diseño', 'Ilustraciones animadas (Lottie)', 'Animaciones 3D', 'Interacciones GSAP', 'Desarrollo agéntico', 'Integraciones con CMS (Sanity, Supabase…)', 'Multilenguaje', 'Migraciones de Webflow y WordPress a IA', 'SEO técnico', 'Accesibilidad y rendimiento', 'Auditoría de tu web', 'La receta: savvia.md', 'Formación a tu equipo'],
    },
    {
      corto: 'Colaboración',
      cab: 'Qué incluye la colaboración:',
      d: 'Nos sumamos a tu equipo o a tu agencia en la parte que más lo necesite: el diseño, el movimiento o el desarrollo.',
      tags: ['Diseño digital', 'Sistema de diseño', 'Ilustraciones animadas (Lottie)', 'Animaciones 3D', 'Interacciones GSAP', 'Desarrollo agéntico', 'Integraciones con CMS (Sanity, Supabase…)', 'Multilenguaje'],
    },
    {
      corto: 'Consultoría',
      cab: 'Qué incluye la consultoría:',
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
  // RONDA 190 · Eric: «volver a poner narrativa, antes que los 3D nuestros: hablar de nuestro background» y conectarla con el titular. Las dos
  // primeras frases son suyas; la tercera (el puente al titular) es de Nilo. OJO: el Diccionario dice «no se presume ni años ni número de clientes»
  // (Andoni, ronda 5): por acordar entre los dos.
  // Después: «todo un copy entero; más discreto, más elegante». Un solo texto que desemboca en el titular (que pasa a ser una frase de él).
  // RONDA 191 · las tres cifras (+75 clientes · 8 países · 6 años) probadas y QUITADAS el 15/10 (Eric): el texto basta.
  titulo: 'El estudio web que orquesta la IA.',
  // ronda 191 · Eric, su versión: «Somos Andoni y Eric. Los dos en cada decisión…»
  texto: 'Somos Andoni y Eric. Los dos en cada decisión.\nLos dos de la primera conversación a la última.', // el salto de línea, a petición de Eric
  // RONDA 129 · el nombre de cada uno es una llamada (la de «Sentarse») y al pasar caen sus AFICIONES. Son datos de Andoni y Eric: FALTA, no se inventan.
  // `gesto`: fotogramas del gesto característico de cada uno, en el mismo lienzo que la pose final (ronda 140: /media/equipo/juntos-r140.webp, 1200 × 1000, con alfa). Vacío = sin gesto.
  // RONDA 137 · Andoni: «Yo, Andoni, tiro a canasta. Eric hace un revés de tenis.» (storyboard → tools/r137-equipo/montar.py)
  personas: [
    // RONDA 138 · aficiones de Andoni y Eric (textual: «Baloncesto, videojuegos y café en casa» · «tenis, naturaleza y música»); gestos de las tiras a 4×
    // (tools/r138-equipo/montar.py): 17 fotogramas de canasta y 16 de revés, en el lienzo de la pose final (1092 × 840).
    // RONDA 140 · sin gestos por ahora (los fotogramas generados de r137–138 se descartan; están en tools/retirados/equipo-r139/). El gancho sigue en Estudio.astro.
    // RONDA 141 · poses reconstruidas (tools/r141-equipo/montar.cjs → montaje.json): `paseo` = tira de 12 celdas (9 de paso + 3 de giro) con su escala (unidades de la
    // foto por px nativo) y el sitio de la celda a la llegada en la foto de 1200 × 1000; `gesto` = 12 fotogramas recortados con su caja en % de la pose final.
    { n: 'Andoni', falta: 'Frase de 2–3 líneas y rol.', hobbies: ['Baloncesto', 'Videojuegos', 'Café en casa'],
      paseo: {src: '/media/equipo/r141/a-paseo.webp', s: 2.386, celda: 524, alto: 520, izq: -159.013, arriba: -239.287},
      gesto: [{src: '/media/equipo/r141/a-gesto-01.webp', x: 26.719, y: 10.236, w: 23.35, h: 85.695},
      {src: '/media/equipo/r141/a-gesto-02.webp', x: 29.907, y: 13.825, w: 24.297, h: 82.167},
      {src: '/media/equipo/r141/a-gesto-03.webp', x: 30.149, y: 16.58, w: 21.85, h: 79.472},
      {src: '/media/equipo/r141/a-gesto-04.webp', x: 29.726, y: 18.105, w: 24.314, h: 78.008},
      {src: '/media/equipo/r141/a-gesto-05.webp', x: 29.326, y: 4.473, w: 22.218, h: 91.701},
      {src: '/media/equipo/r141/a-gesto-06.webp', x: 29.233, y: 0.392, w: 20.303, h: 95.842},
      {src: '/media/equipo/r141/a-gesto-07.webp', x: 27.948, y: 4.368, w: 24.755, h: 91.927},
      {src: '/media/equipo/r141/a-gesto-08.webp', x: 28.229, y: 5.519, w: 24.176, h: 90.837},
      {src: '/media/equipo/r141/a-gesto-09.webp', x: 29.139, y: 9.658, w: 27.258, h: 86.759},
      {src: '/media/equipo/r141/a-gesto-10.webp', x: 28.65, y: 10.591, w: 21.041, h: 85.887},
      {src: '/media/equipo/r141/a-gesto-11.webp', x: 26.313, y: 9.538, w: 22.46, h: 87},
      {src: '/media/equipo/r141/a-gesto-12.webp', x: 27.111, y: 10.075, w: 23.211, h: 86.524}] },
    { n: 'Eric', falta: 'Frase de 2–3 líneas y rol.', hobbies: ['Deporte', 'Naturaleza', 'Música'], // ronda 144 · Eric: «deporte, naturaleza y música» (antes Tenis)
      paseo: {src: '/media/equipo/r141/e-paseo.webp', s: 2.53, celda: 540, alto: 520, izq: 27.567, arriba: -334.178},
      gesto: [{src: '/media/equipo/r141/e-gesto-01.webp', x: 45.686, y: 4.327, w: 25.485, h: 88.785},
      {src: '/media/equipo/r141/e-gesto-02.webp', x: 45.694, y: 8.08, w: 26.597, h: 85.109},
      {src: '/media/equipo/r141/e-gesto-03.webp', x: 45.805, y: 8.88, w: 33.093, h: 84.386},
      {src: '/media/equipo/r141/e-gesto-04.webp', x: 41.553, y: 8.192, w: 38.384, h: 85.151},
      {src: '/media/equipo/r141/e-gesto-05.webp', x: 39.137, y: 9.749, w: 34.759, h: 83.671},
      {src: '/media/equipo/r141/e-gesto-06.webp', x: 36.782, y: 6.557, w: 45.934, h: 86.94},
      {src: '/media/equipo/r141/e-gesto-07.webp', x: 35.431, y: 5.105, w: 44.611, h: 88.469},
      {src: '/media/equipo/r141/e-gesto-08.webp', x: 35.806, y: 3.393, w: 36.347, h: 90.258},
      {src: '/media/equipo/r141/e-gesto-09.webp', x: 34.344, y: 3.695, w: 38.146, h: 90.033},
      {src: '/media/equipo/r141/e-gesto-10.webp', x: 42.201, y: 6.03, w: 35.093, h: 87.775},
      {src: '/media/equipo/r141/e-gesto-11.webp', x: 45.559, y: 5.581, w: 24.175, h: 88.301},
      {src: '/media/equipo/r141/e-gesto-12.webp', x: 45.887, y: 5.13, w: 26.163, h: 88.828}] },
  ],
};

// Respuestas PROVISIONALES (Nilo), escritas con lo que dicen la narrativa y el contexto de marca. Andoni y Eric las reescriben.
// `claves`: palabras con las que la pregunta LIBRE del visitante encuentra esta respuesta (sin ningún modelo detrás).
export const preguntas = {
  pregunta: '¿Preguntas?',
  titulo: 'Pregunta. Contestamos nosotros.',
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
  tagline: 'La savia de tu web.',
  pitch: 'El estudio que orquesta la IA, con criterio.', // ronda 24: «lo dejamos solo en esto»; ronda 48: sin «tu web» (ya lo dice el titular del pie)
  correo: 'hola@savvia.studio',
  cal: '', // ronda 65: «Contáctanos» llevará a un cal.com (falta el enlace); mientras, al correo
  faltaCorreo: '¿hola@savvia.com o @savvia.studio?',
  desde: 'desde 2020', // ronda 156 (Eric): sin «Donostia» en la web
};

// RONDA 53 · LA RECETA DE PAPEL. Andoni: «la sección de savvia la receta de tu web quiero hacer una receta de papel estilo poetry.camera, pero que tenga
// relación con savvia. Al final el papel sale del árbol. Para nosotros la receta es esto que entregamos al cliente: neety.treseiscero.app/library» ·
// «también quiero introducir el concepto del ARNÉS de la IA: la receta de savvia te ayuda a que la IA te lleve a donde tú quieres llegar y no a otro sitio».
// Cada tira es un trozo REAL de la receta que se entregó a Neety (su library): fundamentos, guardarraíles, una petición de su equipo, decisiones.
// RONDA 89 · «savvia, la partitura de tu web: algo muy parecido al vídeo que te paso (og.mp4) pero que tenga relación con la música». El vídeo: una carpeta en el
// centro («Agentic Brand System»), a la izquierda lo que entra, a la derecha lo que sale, hilos finos que convergen, y cursores de agentes con su etiqueta que
// tocan cada pieza. Aquí: la PARTITURA en el centro; los hilos son CUERDAS (al tocarlas vibran y suenan) y lo que viaja por ellas son NOTAS que se escriben
// en la partitura y salen hacia lo que se publica.
// RONDA 117 · Andoni: «La partitura de tu web: cambiamos el titular a savvia agentic y quiero hacer un vídeo con Dynamic Motion de cómo se usa la librería
// de Neety en tiempo real. La base que tenemos está bien, pero tenemos que quitarle ese aspecto musical, es demasiada metáfora de música». Fuera la
// partitura, los pentagramas, «Allegro», «dir. savvia» y «Fine»: el objeto central es la LIBRERÍA de Neety (neety/library) y la película enseña cómo la
// usa su equipo con IA: una petición, los agentes leen archivos concretos (la línea que leen, resaltada) y la página se monta con esos mismos tokens.
// Los datos son los de su librería real (neety.treseiscero.app/library, leída el 01-oct-2026), sin tocar. Las reglas de voz son de Nilo, sacadas de su
// propio copy («Detecta. Prioriza. Actúa.», «No es otra herramienta…»). El nombre interno `partitura` se queda (lo importa la portada; no se ve).
export const partitura = {
  carpeta: ['La librería', 'de Neety'],
  entra: ['Estrategia', 'Posicionamiento', 'Voz', 'Identidad', 'Dirección de arte', 'Componentes', 'Guías', 'Tokens', 'Recursos', 'Ejemplos'],
  // ronda 188 (Eric): diez salidas, de lo más diario a lo más técnico. Antes (ronda 126): Cambios de copy · Editar ilustraciones · Crear landings de Ads · Trabajar el CMS
  sale: ['Cambios de copy', 'Editar ilustraciones', 'Crear landings para Ads', 'Subir blog al CMS', 'Añadir idiomas', 'Publicar un caso de cliente', 'Actualizar precios', 'Ajustar SEO y metadatos', 'Hacer tests A/B', 'Revisar accesibilidad'],
  agentes: [['Claude', 'coral'], ['Codex', 'cobalto'], ['savvia', 'cereza'], ['Tu equipo', 'nogal']] as [string, string][], // ronda 188 (Eric): el tercer agente es savvia (antes «Diseño»)
  // la tarjeta de fuera: lo que hay en la librería (filas de su árbol y lo que contienen)
  resumen: [['marca/color.md', '8 colores'], ['marca/tipografia.md', '2 familias'], ['marca/voz.md', '3 reglas'], ['sistema/espaciado.md', '12 pasos'], ['sistema/tokens.css', '@theme'], ['componentes/', '5 piezas']] as [string, string][],
  nota: 'Representación de la librería real de Neety: la que lee su equipo, y su IA, cada día para cambiar su web.',
  enlace: { label: 'Ver la librería', href: 'https://neety.treseiscero.app/library' },
  libreria: {
    ruta: 'neety / library',
    titulo: 'La librería de Neety',
    peticion: 'Monta el hero de la home con el feed de señales. Con nuestro estilo.',
    quien: 'Tu equipo',
    estado: ['Leyendo la librería…', 'Publicado en', 'Listo para publicar'],
    publicar: 'Publicar',
    // RONDA 118 · «savvia agentic tiene que mostrar más fielmente cómo es la librería de Neety: como si cogieran elementos de ahí y los pusieran». Dentro, la
    // película enseña la librería REAL (neety.treseiscero.app/library, leída el 05-oct-2026: índice a la izquierda, secciones a la derecha) y los agentes COGEN
    // piezas de ella y las ponen en la home. `indice` = su barra lateral; `paginas` = el encabezado de cada sección; `picks` = qué coge quién (src = el elemento
    // de la librería, slot = dónde cae en la home; ag = índice de `agentes`).
    indice: [
      ['Introducción', ['Cómo usar esta librería', 'Mapa de la web']],
      ['Trabajar con Claude', ['Recibir el proyecto', 'Conectar con Claude', 'Cambiar contenido', 'Editar el blog y el equipo (Sanity)', 'Reutilizar componentes', 'Añadir secciones nuevas', 'Añadir una página nueva', 'Buenas prácticas']],
      ['Fundamentos', ['Color', 'Tipografía', 'Espaciado', 'Radios y sombras', 'Gradiente progresivo']],
      ['Componentes', ['Botones', 'Marca y favicon', 'Componentes de la web']],
      ['Mantenimiento', ['Mantenimiento técnico']],
    ] as [string, string[]][],
    paginas: {
      color: { eyebrow: 'Fundamentos', titulo: 'Color', texto: 'Definidos en app/globals.css (bloque @theme). Editar ahí es la única forma de cambiar la paleta; Tailwind genera las utilidades.', etiqueta: 'Paleta de marca', rampas: 'Rampas de opacidad' },
      tipo: { eyebrow: 'Fundamentos', titulo: 'Tipografía', texto: 'Titulares en Bricolage Grotesque (font-display), cuerpo en Switzer (font-sans).', etiqueta: 'Titulares — 120 % de interlineado' },
      botones: { eyebrow: 'Componentes base', titulo: 'Botones (CTA)', texto: 'El CTA real de la web es components/PillCta.tsx: pastilla donde el label rueda hacia arriba en hover.' },
      esp: { eyebrow: 'Fundamentos', titulo: 'Espaciado', texto: 'Escala de tokens de espaciado. La barra muestra el valor desktop; la etiqueta indica desktop / mobile.' },
      comp: { eyebrow: 'Producto', titulo: 'Componentes de la web', texto: 'Todos los componentes reales de la web, en pestañas por página. Cada tarjeta lleva su miniatura real y su ruta.' },
    } as Record<string, { eyebrow: string; titulo: string; texto: string; etiqueta?: string; rampas?: string }>,
    botonesTarjetas: [['Primary — «Solicitar demo»', 'primary', 'Solicitar demo'], ['Outline — «Saber más»', 'outline', 'Saber más'], ['Primary · big — CTA del footer', 'primary', 'Solicitar demo'], ['Primary · block — menú móvil', 'block', 'Solicitar demo']] as [string, string, string][],
    tabsComponentes: ['Comunes', 'Home', 'Plataforma', 'Casos de uso', 'Blog', 'Artículo', 'Eventos', 'Academia'],
    fichas: [{ id: 'logo', titulo: 'Logotipo', chips: ['Logotipo', 'Logo', 'components/Logo.tsx'], texto: 'Wordmark de Neety en SVG inline. Props: className (tamaño) y fill (color).' }, { id: 'punto', titulo: 'Punto pulsante', chips: ['Punto pulsante', 'PulsingDot', 'components/PulsingDot.tsx'], texto: 'Punto de marca cuyo halo respira con GSAP. Encabeza el eyebrow de casi todas las secciones.' }],
    picks: [
      { ag: 2, sec: 'color', src: 'base', slot: 'fondo', label: 'Degradado granular', chip: 'Degradado granular' }, // ronda 152: lo que se coge es lo que cae (antes, un color liso que caía como degradado)
      { ag: 0, sec: 'tipo', src: 'h1xl', slot: 'h1', label: 'H1 · XL', chip: 'Bricolage · H1 XL' },
      { ag: 1, sec: 'botones', src: 'cta', slot: 'ctas', label: 'Solicitar demo', chip: '<PillCta variant="primary" />' },
      { ag: 2, sec: 'esp', src: 'large', slot: 'esp', label: 'large · 48', chip: 'espaciado · large 48' },
      { ag: 3, sec: 'comp', src: 'logo', slot: 'logo', label: 'Logotipo', chip: '<Logo />' },
      { ag: 1, sec: 'comp', src: 'punto', slot: 'punto', label: 'Punto pulsante', chip: '<PulsingDot />' },
    ] as { ag: number; sec: string; src: string; slot: string; label: string; chip: string }[],
    color: [['Naranja Core', '#FE8238'], ['Azúl bebe', '#A7C5F9'], ['Berenjena', '#431B44'], ['Ciruela', '#2A0E2C'], ['Mint claro', '#EBFFF6'], ['Base Cálida', '#F8F7EC'], ['Gris Tecnológico', '#F5F7F9'], ['Degradado granular', 'grad']] as [string, string][],
    tipografia: [['Bricolage Grotesque', 'titulares · H1 XL 112 / 64 · 120 %'], ['Switzer', 'cuerpo · regular 16 · 150 %']] as [string, string][],
    espaciado: [['xtiny', 4], ['tiny', 8], ['xxsmall', 16], ['xsmall', 20], ['small', 24], ['medium', 32], ['large', 48], ['xlarge', 64], ['xxlarge', 80], ['huge', 96], ['xhuge', 112], ['xxhuge', 160]] as [string, number][],
    gradiente: { clase: '.rail-gradient-x', paradas: ['#F8F7EC', '#FE8238', '#431B44', '#A7C5F9', '#FFFFFF'], nota: 'crema → naranja → berenjena → azul → blanco' },
    botones: { ruta: 'components/PillCta.tsx', primario: 'Solicitar demo', contorno: 'Saber más' },
    componentes: ['Logo', 'PulsingDot', 'PillCta', 'TagPill', 'RollingNumber'],
    hero: {
      nav: ['Plataforma', 'Casos de uso', 'Recursos', 'Compañía', 'Precios'],
      eyebrow: ['Detecta.', 'Prioriza.', 'Actúa.'],
      h1: 'Detecta a quién vender, cuándo hacerlo y',
      h1b: 'qué acción tomar.',
      ctas: ['Solicitar demo', 'Ver cómo funciona'],
      sub: 'No es otra herramienta para enviar más mensajes. Neety te dice qué cuentas importan hoy, por qué y qué debería hacer tu equipo con ellas.',
      tarjeta: { titulo: 'Neety encontró empresas que encajan', filas: [['Betsaide', 94], ['Arania', 91], ['Fagor Automation', 88]] as [string, number][] },
    },
  },
};
