// RONDA 127–128 · EL HANDBOOK. Andoni: «algo así https://www.designhandbook.com/en» (ronda 127) y, en la 128, «tiene que ser mucho más elaborado: por un
// lado para navegarlo (designhandbook.com/en) y luego cada capítulo en detalle (designhandbook.com/en/our-studio-mendesaltaren)» · «las páginas
// secundarias, todas en light».
// Dos niveles: /handbook (portada para navegar) y /handbook/<slug> (cada capítulo, con secciones numeradas, ejemplos e imágenes reales).
// REGLA: solo hechos que ya existen. Cada bloque dice de dónde sale (`// de: …`): home.ts · manifiesto.ts · proyectos.ts · DESIGN.md · global.css ·
// AGENTS.md (registro de rondas, guardarraíles, «Rechazado — NO VOLVER», diccionario). Lo que no consta no se escribe (o lleva «NILO:» para revisar).
// Copy: «savvia» siempre en minúscula · sin cursivas · se habla a quien lee (tú); «nosotros» solo para describir el estudio.
// Family (titulares) es la versión de PRUEBA, sin tildes: los títulos llevan sus tildes igual (caen a Georgia hasta comprar la licencia).
import { estudio, producto, receta, partitura, servicios, preguntas, pie, nav, recorrido, laSavvia, proyectos as proyectosHome } from './home';
import { manifiesto } from './manifiesto';
import { proyectos } from './proyectos';

export type Imagen = { src: string; alt: string; pie: string; ancho: number; alto: number; recorte?: string; fondo?: string; encaje?: 'contain' };
export type Ronda = { n: string; fecha: string; quien: string; dijo: string; causa?: string; hecho: string; medido: string };
export type Bloque =
  | { tipo: 'lead'; texto: string }
  | { tipo: 'p'; texto: string }
  | { tipo: 'h3'; texto: string }
  | { tipo: 'pasos'; items: { k: string; t: string; d: string }[] }
  | { tipo: 'lista'; items: { k?: string; t: string; d?: string }[] }
  | { tipo: 'chips'; items: string[] }
  | { tipo: 'cita'; texto: string; de: string }
  // RONDA 132 · la tabla de documentación (referencia: docs.attio.com, «Attribute · Type · Writable? · Notes»): N columnas; `mono` = índices de
  // columna que van en mono como un valor (el «slug» de Attio); `muestra` = índice de la columna que lleva delante una muestra de su color (hex).
  | { tipo: 'tabla'; cols: string[]; filas: string[][]; mono?: number[]; muestra?: number; nota?: string }
  // RONDA 132 · avisos (los «callouts» de la referencia): nota = contexto · importante = una regla de la casa
  | { tipo: 'aviso'; nivel: 'nota' | 'importante'; titulo?: string; texto: string }
  // RONDA 132 · rejilla de tarjetas que llevan a otros apartados o capítulos (las «cards» de la referencia)
  | { tipo: 'tarjetas'; items: { t: string; d: string; href: string; k?: string }[] }
  // RONDA 132 · la comparativa de las tres formas de trabajar: pieza × forma (home.ts › servicios)
  | { tipo: 'matriz' }
  | { tipo: 'arbol'; raiz: string; grupos: [string, string[]][] }
  | { tipo: 'imagen'; img: Imagen; ancho?: 'entero' | 'columna' }
  | { tipo: 'galeria'; items: Imagen[] }
  | { tipo: 'obra'; slugs: string[] } // proyectos reales (proyectos.ts): su portada en vídeo, nombre y resumen
  | { tipo: 'testimonios' } // home.ts › proyectos.testimonios (citas reales con retrato)
  | { tipo: 'rondas'; items: Ronda[] }
  | { tipo: 'rechazados'; items: { t: string; dijo: string; ronda: string }[] }
  | { tipo: 'muestras'; items: { n: string; hex: string; uso: string }[] }
  | { tipo: 'tipos'; items: { n: string; css: string; uso: string; muestra: string }[] }
  | { tipo: 'contraste'; items: { fg: string; bg: string; par: string; ratio: string; ok: boolean; uso: string }[] }
  | { tipo: 'peticion'; quien: string; texto: string; pasos: string[]; fin: string }
  | { tipo: 'forma'; i: number }
  | { tipo: 'contacto' }
  | { tipo: 'enlace'; label: string; href: string };

export type Seccion = { id: string; titulo: string; bloques: Bloque[] };
export type Portada =
  | { tipo: 'imagen'; img: Imagen }
  | { tipo: 'arbol' } // el roble de la estación de la web (las láminas del hero)
  | { tipo: 'pasos' } // composición tipográfica con los cuatro pasos
  | { tipo: 'etiquetas' } // las etiquetas de los servicios
  | { tipo: 'caras' }; // Eric y Andoni
export type Capitulo = { slug: string; num: string; titulo: string; frase: string; entrada: string; portada: Portada; secciones: Seccion[] };

const sinMarcas = (t: string) => t.replace(/\[\[|\]\]/g, '');
const respuesta = (q: RegExp) => preguntas.lista.find((p) => q.test(p.q))!.a;

export const handbook = {
  // RONDA 132 · vuelve a llamarse HANDBOOK (Andoni: «El handbook lo llamaría handbook»). En la 129 se llamó «Duramen».
  // RONDA 177 · el handbook pasa a ser el MÉTODO dentro de «Sistema» (/metodo): «handbook tenemos que trasladar cómo hacemos los proyectos»
  nombre: 'Método',
  titulo: 'Método',
  sub: 'Cómo hacemos los proyectos',
  firma: 'Eric y Andoni', // ronda 156 (Eric): sin «Donostia»
  // de: la idea de la referencia (designhandbook.com/en: un párrafo centrado que explica el manual), con nuestras palabras y nuestros hechos.
  // El origen («De dónde sale este manual», ronda 128) queda dentro del segundo párrafo.
  intro: [
    'Este es el método de savvia: el manual donde contamos qué creemos, cómo trabajamos y qué te llevas al terminar.',
    'Sale de lo que hacemos cada día: la guía de diseño, el registro de cada ronda, lo que descartamos y la receta que entregamos. Por eso crece con cada proyecto.',
    'Ocho capítulos, en el orden en que los vivirías con nosotros.',
  ],
  empezar: 'Empezar a leer',
  pista: 'Pasa el ratón: salen webs que hemos hecho',
  // la estela de la portada: webs reales (public/media/obra → public/media/handbook/estela, 520 px; Remerge, en móvil)
  estela: [
    ['quantus-portada', 'Quantus'], ['patchbay-portada', 'Patchbay'], ['playground-portada', 'Playground IEP'], ['neety-portada', 'Neety'],
    ['invopop-portada', 'Invopop'], ['cubbo-portada', 'Cubbo'], ['remerge-portada', 'Remerge'], ['isotrol-portada', 'Isotrol'],
    ['quantus-g2', 'Quantus'], ['business-online-payroll-portada', 'Business Online Payroll'], ['playground-g2', 'Playground IEP'],
    ['patchbay-g3', 'Patchbay'], ['neety-g1', 'Neety'], ['cubbo-g2', 'Cubbo'], ['invopop-g2', 'Invopop'],
  ] as [string, string][],
};

// las fotos que ya existen en public/media (y una nueva, real: la verificación de hoy)
const IMG = {
  juntos: { src: '/media/equipo/juntos.webp', alt: 'Andoni, con camiseta gris, y Eric, con camisa vaquera, de pie y sonriendo.', pie: 'Andoni y Eric.', ancho: 272, alto: 487 },
  neety: { src: '/media/servicios/manual-neety.webp', alt: 'La librería de Neety: portada «El sistema de diseño de Neety, y cómo mantener la web», índice lateral y la sección «Cómo usar esta librería».', pie: 'La librería de Neety, tal como la usa su equipo.', ancho: 960, alto: 1650, recorte: '50% 0%', fondo: '#f8f7ec' },
  recibir: { src: '/media/servicios/manual-recibir.webp', alt: 'Página «Recibir el proyecto» de la librería de Neety.', pie: 'Recibir el proyecto.', ancho: 760, alto: 570, fondo: '#f8f7ec' },
  cambiar: { src: '/media/servicios/manual-cambiar.webp', alt: 'Página «Cambiar contenido» de la librería de Neety, con peticiones de ejemplo para cambiar textos.', pie: 'Cambiar contenido.', ancho: 760, alto: 570, fondo: '#f8f7ec' },
  secciones: { src: '/media/servicios/manual-secciones.webp', alt: 'Página «Añadir secciones nuevas» de la librería de Neety.', pie: 'Añadir secciones nuevas.', ancho: 760, alto: 570, fondo: '#f8f7ec' },
  practicas: { src: '/media/servicios/manual-practicas.webp', alt: 'Página «Buenas prácticas» de la librería de Neety.', pie: 'Buenas prácticas.', ancho: 760, alto: 570, fondo: '#f8f7ec' },
  // de: tools/r128/verificacion.cjs (capturada el 07/10/2026 en Chrome y WebKit, a 1280×720 y 390×844)
  verificacion: { src: '/media/handbook/verificacion.webp', alt: 'La home de savvia capturada en Chrome y en WebKit, a 1280 × 720 y a 390 × 844.', pie: 'La home de savvia en Chrome y WebKit, escritorio y móvil. Capturada el 07/10/2026 con la misma prueba que pasa cada página.', ancho: 1531, alto: 405, encaje: 'contain', fondo: '#eadde7' },
  roble3d: { src: '/media/roble3d-arbol.webp', alt: 'Un roble renderizado en 3D, con la copa verde oliva y el tronco en S.', pie: 'El roble que modelamos en Blender para la web (ronda 11). Acabó siendo el molde de la forma, no la figura.', ancho: 1500, alto: 1209 },
} satisfies Record<string, Imagen>;

const neetyCaso = proyectos.find((p) => p.slug === 'neety')!;

export const capitulos: Capitulo[] = [
  // ───────────────────────────────────────────── 01
  {
    slug: 'que-es-savvia',
    num: '01',
    titulo: 'Qué es savvia',
    frase: 'Un estudio web de dos que orquesta la IA con criterio.',
    // de: home.ts › estudio.titulo + manifiesto 02 («la IA es la base, el criterio sigue siendo nuestro»)
    entrada: 'savvia es el estudio web de Eric y Andoni. Diseñamos y desarrollamos webs a medida con desarrollo agéntico: la IA es la base y el criterio sigue siendo nuestro.',
    portada: { tipo: 'imagen', img: { src: '/media/handbook/eric-andoni.webp', alt: 'Andoni, con camiseta gris, y Eric, con camisa vaquera, de pie y sonriendo delante de una pared blanca.', pie: 'Andoni y Eric.', ancho: 1672, alto: 941, recorte: '50% 8%' } }, // ronda 136: la foto de Andoni
    secciones: [
      {
        id: 'el-estudio',
        titulo: 'El estudio',
        bloques: [
          { tipo: 'p', texto: estudio.texto }, // de: home.ts › estudio.texto
          { tipo: 'p', texto: 'Venimos del pixel-perfect artesanal y hoy trabajamos con IA cada día.' }, // de: manifiesto 02
          { tipo: 'cita', texto: respuesta(/la hace la IA/), de: 'Preguntas frecuentes · «¿La web la hace la IA?»' }, // de: home.ts › preguntas
        ],
      },
      {
        id: 'para-quien',
        titulo: 'Para quién',
        bloques: [
          { tipo: 'p', texto: 'Para equipos que viven de su web y sienten que se ha quedado atrás. Casi siempre por una de estas tres razones:' },
          // de: home.ts › recorrido.pasos (los tres dolores de la home, con su respuesta)
          { tipo: 'lista', items: recorrido.pasos.map((p, i) => ({ k: String(i + 1).padStart(2, '0'), t: p.dolor.replace('…', '.'), d: `${p.t} ${p.d}` })) },
        ],
      },
      {
        id: 'savvia-agentic',
        titulo: 'savvia agentic',
        bloques: [
          // de: home.ts › producto.frase + manifiesto (cierre)
          { tipo: 'p', texto: `Así llamamos a nuestra forma de trabajar: ${producto.frase.charAt(0).toLowerCase()}${producto.frase.slice(1)}` },
          { tipo: 'cita', texto: manifiesto.cierre, de: 'Manifiesto' },
          { tipo: 'h3', texto: 'Por dónde seguir' },
          // RONDA 132 · tarjetas a otros capítulos (las frases son las de cada capítulo, más abajo)
          {
            tipo: 'tarjetas',
            items: [
              { k: '02', t: 'Principios', d: 'Voz propia, tu ritmo y una receta que te quedas.', href: '/metodo/principios' },
              { k: '03', t: 'Cómo trabajamos', d: 'Entender, decidir, documentar y entregar. Contigo dentro.', href: '/metodo/como-trabajamos' },
              { k: '04', t: 'La receta', d: 'Tu marca escrita para que la lean tu equipo y cualquier agente.', href: '/metodo/la-receta' },
              { k: '05', t: 'Formas de trabajar', d: 'Tres formas de trabajar contigo, según lo que necesites.', href: '/metodo/formas-de-trabajar' },
            ],
          },
        ],
      },
      {
        id: 'el-trabajo',
        titulo: 'El trabajo',
        bloques: [
          // de: home.ts › proyectos.titulo y proyectos.ts (los cuatro destacados, con su vídeo real)
          { tipo: 'p', texto: 'No presumimos de años ni de número de clientes: preferimos enseñarte lo hecho. Estos son los proyectos destacados con desarrollo agéntico.' },
          { tipo: 'obra', slugs: ['quantus', 'patchbay', 'playground', 'neety'] },
          { tipo: 'enlace', label: 'Ver el portfolio', href: '/proyectos' },
        ],
      },
      {
        id: 'lo-que-dicen',
        titulo: 'Lo que dicen',
        bloques: [
          { tipo: 'p', texto: 'Citas reales de quienes han trabajado con nosotros, traducidas cuando venían en inglés.' }, // de: home.ts › proyectos.testimonios
          { tipo: 'testimonios' },
        ],
      },
    ],
  },
  // ───────────────────────────────────────────── 02
  {
    slug: 'principios',
    num: '02',
    titulo: 'Principios',
    frase: 'Voz propia, tu ritmo y una receta que te quedas.',
    entrada: 'Tres ideas guían cada decisión. Son las de nuestro manifiesto, y este capítulo cuenta qué significan en el día a día.',
    portada: { tipo: 'arbol' },
    secciones: [
      // de: manifiesto.ts (texto de Andoni, fiel); el tercero no lleva lema en el manifiesto: se nombra con su frase subrayada («receta propia»)
      ...manifiesto.principios.map((p, i): Seccion => ({
        id: ['voz-propia', 'tu-ritmo', 'receta-propia'][i],
        titulo: (p.lema ?? 'Receta propia.').replace(/\.$/, ''),
        bloques: [
          { tipo: 'lead', texto: sinMarcas(p.texto) },
          ...((i === 0
            ? // de: AGENTS.md › «Rechazado» de la ronda 53 («sin romperla» → «es muy despectivo»): la voz se decide palabra a palabra
              [
                { tipo: 'p', texto: 'En la práctica: tu marca manda sobre nuestro gusto. Si una frase no suena a ti, se cambia.' },
                { tipo: 'rechazados', items: [{ t: 'Decir lo que hace la IA en negativo: una web que tu equipo cambia «sin romperla».', dijo: 'sin romperla no me gusta, es muy despectivo', ronda: 'Ronda 53' }] },
              ]
            : i === 1
              ? // de: home.ts › preguntas («¿Cuánto tarda?») y AGENTS.md (cada ronda empieza por la frase de quien la pide)
                [
                  { tipo: 'p', texto: 'En la práctica: trabajamos a tu ritmo, por rondas cortas. Tú dices qué ves; nosotros lo interpretamos, lo cambiamos y lo medimos.' },
                  { tipo: 'cita', texto: respuesta(/tarda/), de: 'Preguntas frecuentes · «¿Cuánto tarda?»' },
                ]
              : // de: home.ts › preguntas («¿Voy a depender de vosotros?»)
                [
                  { tipo: 'p', texto: 'En la práctica: al terminar no dependes de nosotros.' },
                  { tipo: 'cita', texto: respuesta(/depender/), de: 'Preguntas frecuentes · «¿Voy a depender de vosotros?»' },
                ]) as Bloque[]),
        ],
      })),
      {
        id: 'como-hablamos',
        titulo: 'Cómo hablamos',
        bloques: [
          // de: AGENTS.md › Diccionario («Se dice», «No se presume», la marca en minúscula) y DESIGN.md › Voz y contenido; la cita, ronda 5
          { tipo: 'p', texto: 'Hablamos claro y de tú, con frases concretas y verbos activos. Estas son las palabras que nos definen:' },
          { tipo: 'chips', items: ['orquestar', 'criterio', 'elevar', 'desarrollo agéntico', 'a medida', 'de principio a fin', 'documentado', 'fuente de verdad', 'claridad', 'versatilidad', 'contigo'] },
          { tipo: 'aviso', nivel: 'importante', titulo: 'La marca, siempre en minúscula', texto: 'Se escribe así: savvia, también al principio de una frase. Y no presumimos de años ni de número de clientes.' },
          { tipo: 'cita', texto: 'No queremos tener que justificarnos diciendo esas cosas.', de: 'Andoni, ronda 5' },
          { tipo: 'enlace', label: 'Leer el manifiesto', href: '/manifiesto' },
        ],
      },
    ],
  },
  // ───────────────────────────────────────────── 03
  {
    slug: 'como-trabajamos',
    num: '03',
    titulo: 'Cómo trabajamos',
    frase: 'Entender, decidir, documentar y entregar. Contigo dentro.',
    entrada: 'Cuatro pasos, siempre en el mismo orden, y tú dentro de cada uno. Por debajo, un registro de cada ronda para que nada se pierda entre conversaciones.',
    portada: { tipo: 'pasos' },
    secciones: [
      {
        id: 'cuatro-pasos',
        titulo: 'Los cuatro pasos',
        bloques: [
          // de: los cuatro pasos del método que la web ya usa (pestañas de las rondas 8–41) con copy de home.ts › recorrido.pasos, laSavvia y preguntas
          {
            tipo: 'pasos',
            items: [
              { k: '01', t: 'Entender', d: 'Pasamos tiempo mano a mano contigo entendiendo lo que necesita tu proyecto: qué haces, para quién y qué ha dejado de contar tu web.' },
              { k: '02', t: 'Decidir', d: 'Con tu dirección y nuestro criterio ponemos caminos sobre la mesa y elegimos juntos el que encaja.' },
              { k: '03', t: 'Documentar', d: 'Cada decisión queda escrita en la receta de tu web: color, tipografía, espaciado, componentes, voz y lo descartado.' },
              { k: '04', t: 'Entregar', d: 'Ves algo real en los primeros días, no una presentación al cabo de un mes. Las entregas son tempranas y frecuentes.' },
            ],
          },
          { tipo: 'p', texto: respuesta(/cuesta/) }, // de: home.ts › preguntas («¿Cuánto cuesta?»)
        ],
      },
      {
        id: 'primero-la-estructura',
        titulo: 'Primero la estructura',
        bloques: [
          // de: AGENTS.md › «Orden de trabajo (acordado)»
          { tipo: 'p', texto: 'Una web se construye por capas, y no empezamos por el efecto. Este es el orden que seguimos en cada proyecto:' },
          {
            tipo: 'lista',
            items: [
              { k: '1', t: 'Estructura y textos.', d: 'Qué se cuenta y en qué orden.' },
              { k: '2', t: 'Color y tipografía.', d: 'El sistema, antes que las piezas.' },
              { k: '3', t: 'La página entera, maquetada y leída.', d: 'Todavía sin animación.' },
              { k: '4', t: 'Una sola firma.', d: 'Un gesto memorable, no diez efectos.' },
            ],
          },
          { tipo: 'aviso', nivel: 'importante', titulo: 'Regla de la casa', texto: 'Un mecanismo visual no es un concepto.' },
        ],
      },
      {
        id: 'por-rondas',
        titulo: 'Por rondas',
        bloques: [
          // de: AGENTS.md › «Registro de rondas»: cada ronda guarda la frase textual, la interpretación, lo hecho, lo medido y lo pendiente
          { tipo: 'p', texto: 'Trabajamos por rondas. En cada una anotamos tu frase tal cual la dijiste, cómo la interpretamos, qué cambiamos, lo que medimos y lo que queda pendiente.' },
          { tipo: 'p', texto: 'Así se ve una ronda en el registro. Son rondas reales de esta web:' },
          {
            tipo: 'rondas',
            items: [
              // de: AGENTS.md › Ronda 30 (22/09/2026), punto 3
              { n: 'Ronda 30', fecha: '22/09/2026', quien: 'Andoni', dijo: 'es la card que no cubre todo, es la única que no se ve redondeada', causa: 'La escena del móvil iba ampliada a 1,35: la lámina solo cubría el 76 % del alto de su tarjeta cuadrada.', hecho: 'Ampliación a 1,9.', medido: 'La mesa, a 719 × 405 sobre una tarjeta de 379 × 379: la cubre entera, con la pantalla del móvil centrada.' },
              // de: AGENTS.md › Ronda 59 (25/09/2026), a media ronda
              { n: 'Ronda 59', fecha: '25/09/2026', quien: 'Andoni', dijo: 'la (x) en la vista focus a veces abre el nav bar: que no ocurra nunca', causa: 'La × estaba donde el botón del menú y el bloqueo duraba solo 1,6 s: un segundo clic caía en el menú.', hecho: 'El botón del menú queda bloqueado hasta que el ratón sale de su zona.', medido: 'La × y tres clics más en el mismo sitio, a 0,3 · 1,7 · 3 s, dos veces seguidas: el menú no se abre nunca (Chrome y WebKit).' },
            ],
          },
        ],
      },
      {
        id: 'lo-descartado',
        titulo: 'Lo descartado también se guarda',
        bloques: [
          // de: AGENTS.md › «Rechazado — NO VOLVER» («que nunca se poda») y las rondas 5, 7, 10, 11 y 13
          { tipo: 'p', texto: 'Lo que descartamos va a una lista que no se borra nunca, con el porqué y con la frase que lo tumbó. Sirve para no volver a caer en lo mismo, ni nosotros ni la IA.' },
          {
            tipo: 'rechazados',
            items: [
              { t: 'Cursivas, en cualquier sitio.', dijo: 'No usemos italic nunca, es muy IA', ronda: 'Ronda 7' },
              { t: 'Un degradado de paisaje en el hero. Cayó cinco veces.', dijo: 'quitamos los gradientes estilo paisaje, quiero fondo plano', ronda: 'Ronda 10' },
              { t: 'La lámina del roble generada por imagen.', dijo: 'tenemos que dejar de usar esa imagen, no me gusta nada', ronda: 'Ronda 11' },
              { t: 'Hierba de verdes saturados en fila.', dijo: 'parece un pegote', ronda: 'Ronda 13' },
              { t: 'Frases de credenciales: años de oficio, número de clientes.', dijo: 'no queremos tener que justificarnos diciendo esas cosas', ronda: 'Ronda 5' },
            ],
          },
        ],
      },
    ],
  },
  // ───────────────────────────────────────────── 04
  {
    slug: 'la-receta',
    num: '04',
    titulo: 'La receta',
    frase: 'Tu marca escrita para que la lean tu equipo y cualquier agente.',
    entrada: receta.arnes, // de: home.ts › receta.arnes
    portada: { tipo: 'imagen', img: IMG.neety },
    secciones: [
      {
        id: 'que-es',
        titulo: 'Qué es',
        bloques: [
          // de: home.ts › preguntas («¿Voy a depender de vosotros?») + manifiesto 03
          { tipo: 'p', texto: 'Al terminar te quedas con el código y con tu receta: una librería de skills diseñada para que tu proyecto escale con IA sin perder su voz. Con ella, cualquiera, persona o agente, sabe cambiar tu web.' },
          // RONDA 132 · los ingredientes como una tabla de documentación (Nombre · Tipo · Qué decide). de: home.ts › laSavvia.ingredientes (nombre y qué
          // decide) y los valores de esta web (DESIGN.md, global.css: los mismos que «La receta de esta web», más abajo). La columna Tipo solo clasifica.
          { tipo: 'h3', texto: 'Sus ingredientes' },
          {
            tipo: 'tabla',
            cols: ['Ingrediente', 'Tipo', 'En esta web', 'Qué decide'],
            mono: [1],
            filas: laSavvia.ingredientes.map((g) => [
              g.n,
              ({ color: 'tokens', tipo: 'familias', espacio: 'escala', piezas: 'componentes', voz: 'palabras', no: 'lista' } as Record<string, string>)[g.id],
              g.id === 'color' ? 'Cacao · Rosa niebla · Nogal · Coral · Salvia' : g.v,
              g.d,
            ]),
          },
          { tipo: 'h3', texto: 'Qué lleva dentro la librería' },
          { tipo: 'chips', items: partitura.entra }, // de: home.ts › partitura.entra
          {
            tipo: 'tarjetas',
            items: [
              { t: 'La receta de esta web', d: 'Color, tipografía y espacio de savvia, con sus valores exactos.', href: '#la-de-esta-web' },
              { t: 'Un ejemplo real: Neety', d: 'La librería que usa su equipo para cambiar su web con Claude.', href: '#ejemplo-neety' },
              { t: 'El arnés', d: 'Lo que la receta no deja hacer, para que la IA no se salga.', href: '#el-arnes' },
              { t: 'Qué hace tu equipo con ella', d: 'Una petición real y los pasos que sigue el agente.', href: '#tu-equipo' },
            ],
          },
        ],
      },
      {
        id: 'la-de-esta-web',
        titulo: 'La receta de esta web',
        bloques: [
          // de: DESIGN.md y src/styles/global.css (valores exactos de esta web)
          { tipo: 'p', texto: 'Esta misma web tiene la suya. Cada color tiene un papel y cada tipografía, una función:' },
          {
            tipo: 'tabla',
            cols: ['Color', 'Valor', 'Papel'],
            mono: [1],
            muestra: 1,
            filas: [
              ['Cacao', '#302018', 'Texto sobre claro'],
              ['Noche de otoño', '#3B231B', 'Fondo oscuro'],
              ['Rosa niebla', '#EADDE7', 'Fondo de lectura'],
              ['Nogal', '#63402F', 'Texto secundario'],
              ['Coral', '#FF616B', 'La acción y la savia'],
              ['Salvia', '#96BFE6', 'El bloque de servicios'],
            ],
          },
          {
            tipo: 'tipos',
            items: [
              { n: 'Family', css: 'var(--font-display)', uso: 'Titulares · 400', muestra: 'Elevamos tu web' },
              { n: 'Timeless Sans', css: 'var(--font-sans)', uso: 'Lectura e interfaz', muestra: 'Frases claras y cortas.' },
              { n: 'Timeless Grotesk', css: 'var(--font-mono)', uso: 'Números y detalles', muestra: '01 · 04 · 2026' },
            ],
          },
          { tipo: 'p', texto: 'El espacio sale de una sola escala de 4 px: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128. Ningún hueco se decide a ojo.' },
        ],
      },
      {
        id: 'ejemplo-neety',
        titulo: 'Un ejemplo real: Neety',
        bloques: [
          // de: la librería real de Neety (capturas en public/media/servicios/manual-*.webp, ronda 54), home.ts › partitura.libreria y proyectos.ts › neety
          { tipo: 'p', texto: 'La librería de Neety se genera desde el propio código de su web, así que nunca queda desactualizada. Tiene dos partes: los fundamentos, con su identidad en tokens y componentes, y una guía viva para que su equipo cambie la web con Claude. El porqué de cada decisión vive en docs/decisiones.md.' },
          { tipo: 'galeria', items: [IMG.recibir, IMG.cambiar, IMG.secciones, IMG.practicas] },
          { tipo: 'arbol', raiz: partitura.libreria.ruta, grupos: partitura.libreria.indice },
          { tipo: 'h3', texto: 'Su color y sus tipografías' },
          { tipo: 'muestras', items: (neetyCaso.paleta ?? []).map((c) => ({ n: c.n, hex: c.hex, uso: '' })) },
          { tipo: 'tipos', items: (neetyCaso.tipos ?? []).map((t) => ({ n: t.n, css: /Bricolage/.test(t.n) ? 'var(--font-bricolage)' : 'var(--font-switzer)', uso: t.uso, muestra: /Bricolage/.test(t.n) ? 'Detecta a quién vender' : 'Prioriza. Actúa.' })) },
          { tipo: 'enlace', label: partitura.enlace.label, href: partitura.enlace.href },
        ],
      },
      {
        id: 'el-arnes',
        titulo: 'El arnés',
        bloques: [
          // de: home.ts › receta.tiras[1] (guardarraíles reales de la receta de Neety) y su `digital` (el bloqueo de un color que no está)
          { tipo: 'p', texto: 'La receta también dice lo que no se hace. Es lo que hace que la IA te lleve a donde quieres ir, y no a otro sitio:' },
          { tipo: 'lista', items: [{ t: 'Ni colores ni fuentes nuevas.' }, { t: 'Ni un hero distinto: se reutiliza uno.' }, { t: 'Ni botones inventados.' }, { t: 'Un cambio por petición.' }, { t: 'Nada se publica sin mirarlo antes en la vista previa.' }] },
          { tipo: 'aviso', nivel: 'nota', titulo: 'Así funciona', texto: 'Si alguien pide un color que no está en la receta, el agente no lo inventa: propone el que sí está.' },
        ],
      },
      {
        id: 'tu-equipo',
        titulo: 'Qué hace tu equipo con ella',
        bloques: [
          { tipo: 'chips', items: partitura.sale }, // de: home.ts › partitura.sale (ronda 126)
          // de: home.ts › receta.tiras[2] (una petición real del equipo de Neety y los pasos del agente)
          { tipo: 'peticion', quien: 'El equipo de Neety pide', texto: 'Añade una sección de testimonios en la home, entre Cómo funciona e Integraciones: tres citas con nombre, cargo y empresa, con el estilo de tarjeta blanca.', pasos: ['Lee la receta', 'Reutiliza la tarjeta blanca', 'La añade en español e inglés', 'La revisa en la vista previa'], fin: 'Sección lista' },
          { tipo: 'cita', texto: respuesta(/equipo puede/), de: 'Preguntas frecuentes · «¿Mi equipo puede tocarla?»' },
        ],
      },
    ],
  },
  // ───────────────────────────────────────────── 05
  {
    slug: 'formas-de-trabajar',
    num: '05',
    titulo: 'Formas de trabajar',
    frase: `${servicios.titulo.replace(/\.$/, '')}, según lo que necesites.`,
    // de: home.ts › servicios (las tres formas comparten las mismas etiquetas; End-to-end las incluye todas)
    entrada: `${servicios.titulo} ${servicios.sub} Las tres comparten las mismas piezas: cambia cuánto hacemos nosotros y cuánto tu equipo.`,
    portada: { tipo: 'etiquetas' },
    secciones: [
      // RONDA 132 · primero la vista general (tarjetas + la comparativa pieza × forma), luego cada forma en detalle
      {
        id: 'las-tres',
        titulo: 'Las tres formas',
        bloques: [
          {
            tipo: 'tarjetas',
            items: servicios.lista.map((s, i) => ({ k: `${s.tags.length} de ${servicios.lista[0].tags.length}`, t: s.corto, d: s.d, href: `#${['end-to-end', 'colaboracion', 'consultoria'][i]}` })),
          },
          { tipo: 'h3', texto: 'Qué incluye cada una' },
          { tipo: 'matriz' },
        ],
      },
      ...servicios.lista.map((s, i): Seccion => ({ id: ['end-to-end', 'colaboracion', 'consultoria'][i], titulo: s.corto, bloques: [{ tipo: 'forma', i }] })),
      {
        id: 'si-ya-tienes-web',
        titulo: 'Si ya tienes web',
        bloques: [
          { tipo: 'cita', texto: respuesta(/Webflow/), de: 'Preguntas frecuentes · «¿Y si mi web está en Webflow o WordPress?»' }, // de: home.ts › preguntas
          { tipo: 'enlace', label: 'Cuéntanos qué necesitas', href: '/metodo/contacto' },
        ],
      },
    ],
  },
  // ───────────────────────────────────────────── 06
  {
    slug: 'calidad',
    num: '06',
    titulo: 'Cómo medimos la calidad',
    frase: 'Nada está terminado hasta que se ha medido.',
    entrada: 'Nada está terminado hasta que se ha medido. Este capítulo cuenta qué comprobamos antes de enseñarte algo, con ejemplos reales del registro.',
    portada: { tipo: 'imagen', img: IMG.verificacion },
    secciones: [
      {
        id: 'la-lista',
        titulo: 'La lista',
        bloques: [
          // de: AGENTS.md › Guardarraíles (astro check y build · Chrome real y WebKit, 1280×720 y 390×844, consola limpia, 0 respuestas ≥ 400, desborde 0 ·
          // spacing-lint) + DESIGN.md (contrastes) + el registro (movimiento reducido; fotogramas medidos con la CPU frenada)
          {
            // RONDA 132 · Comprobación · Umbral · Cómo se mide (los umbrales, de AGENTS.md › Guardarraíles y DESIGN.md › «superan 4,5:1»)
            tipo: 'tabla',
            cols: ['Comprobación', 'Umbral', 'Cómo se mide'],
            mono: [1],
            filas: [
              ['Navegadores', 'Chrome y WebKit', 'Navegadores reales, no simulados, conducidos por una prueba automática.'],
              ['Pantallas', '1280 × 720 · 390 × 844', 'La misma prueba en escritorio y en móvil.'],
              ['Consola', '0 errores', 'Se lee la consola en cada carga: ni un error ni un aviso.'],
              ['Red', '0 respuestas ≥ 400', 'Se registra cada petición de la página.'],
              ['Maquetación', '0 px de desborde', 'Se compara el ancho de la página con el de la ventana.'],
              ['Movimiento reducido', 'Usable entera', 'Se carga con el movimiento reducido activado.'],
              ['Contraste', '≥ 4,5 : 1', 'Pareja a pareja, con colores sólidos.'],
              ['Espaciado', 'Escala de 4 px', 'Una herramienta revisa que ningún hueco se salga de la escala.'],
              ['Rendimiento', 'Fotogramas y ms', 'Fotogramas lentos y tareas largas, también con el procesador frenado.'],
              ['Código', '0 errores', 'Comprobación de tipos y compilación, en verde.'],
            ],
          },
        ],
      },
      {
        id: 'contraste',
        titulo: 'Contraste medido',
        bloques: [
          // de: DESIGN.md (tablas de contraste, Paleta 2) y global.css (comentarios de surface-warm y de la estación de otoño)
          { tipo: 'p', texto: 'Cada pareja de texto y fondo se mide con colores sólidos.' },
          { tipo: 'aviso', nivel: 'importante', titulo: 'Por debajo de 4,5 : 1, no es texto', texto: 'Si una pareja no llega, no se usa para texto, aunque quede bonita.' },
          {
            tipo: 'contraste',
            items: [
              { fg: '#302018', bg: '#EADDE7', par: 'Cacao sobre Rosa niebla', ratio: '11,89 : 1', ok: true, uso: 'Texto de lectura' },
              { fg: '#EADDE7', bg: '#3B231B', par: 'Rosa niebla sobre la noche', ratio: '11,09 : 1', ok: true, uso: 'Texto sobre oscuro' },
              { fg: '#302018', bg: '#96BFE6', par: 'Cacao sobre Salvia', ratio: '7,1 : 1', ok: true, uso: 'Servicios' },
              { fg: '#302018', bg: '#FF616B', par: 'Cacao sobre Coral', ratio: '4,63 : 1', ok: true, uso: 'Botón principal' },
              { fg: '#FF616B', bg: '#EADDE7', par: 'Coral sobre Rosa niebla', ratio: '2,57 : 1', ok: false, uso: 'Nunca para texto' },
            ],
          },
        ],
      },
      {
        id: 'antes-y-despues',
        titulo: 'Medido antes y después',
        bloques: [
          // de: AGENTS.md › reglas duras («reproducir y medir antes de arreglar», «aislar apagando una cosa cada vez»)
          { tipo: 'p', texto: 'Cuando algo falla, primero se reproduce y se mide. Después se arregla, apagando una cosa cada vez. Y lo arreglado se vuelve a medir. Tres ejemplos del registro:' },
          {
            tipo: 'rondas',
            items: [
              // de: AGENTS.md › Rondas 26 y 27 (22/09/2026)
              { n: 'Ronda 27', fecha: '22/09/2026', quien: 'Andoni', dijo: 'Las FAQ al abrirse siguen haciendo que la línea superior de esa sección se vaya', causa: 'El primer arreglo, en la ronda 26, no bastó. La causa real: al cambiar el alto de la página, las líneas de la retícula se recreaban y volvían a dibujarse desde cero.', hecho: 'Las líneas recolocadas ya nacen quietas.', medido: 'Al abrir una pregunta, la línea mide 1280 px en todo momento. Antes, 950 a medio trazo.' },
              // de: AGENTS.md › Ronda 82 (30/09/2026)
              { n: 'Ronda 82', fecha: '30/09/2026', quien: 'Andoni', dijo: 'cuando cambian los proyectos parece que hay un minibug con el titular anterior que se vuelve a ver', causa: 'Las palabras del nombre anterior volvían a su sitio con una transición y cruzaban la máscara.', hecho: 'El regreso es instantáneo; solo se animan la entrada y la salida.', medido: 'Sonda por fotograma durante 14 s: de 21 fotogramas con el nombre anterior a la vista, a 0.' },
              // de: AGENTS.md › Ronda 76 (30/09/2026), «Rendimiento»; la frase de Eric es del resumen de su vídeo de revisión
              { n: 'Ronda 76', fecha: '30/09/2026', quien: 'Eric', dijo: 'la web va a trompicones', causa: 'Tres causas medidas: lienzos que se rehacían al volver a su sección, un retrato que se recalculaba píxel a píxel y láminas pintadas a más densidad de la necesaria.', hecho: 'Cada causa, arreglada y medida por separado.', medido: 'Bajando por la home con el procesador frenado, la tarea más larga pasa de 645 ms a 226 ms. Subiendo, de 4 tareas largas a 0.' },
            ],
          },
        ],
      },
      {
        id: 'hecho-y-pendiente',
        titulo: 'Hecho y pendiente, por separado',
        bloques: [
          // de: AGENTS.md › «No se hace commit, push ni deploy sin que Andoni lo pida», el «Pendiente» y el «SIN medir» de cada ronda
          { tipo: 'p', texto: 'Cada ronda separa lo que está hecho de lo que espera tu visto bueno. Y si algo no se ha podido medir, se escribe así: sin medir.' },
          { tipo: 'aviso', nivel: 'nota', texto: 'Nada se publica por inercia: se publica cuando lo decides.' },
        ],
      },
    ],
  },
  // ───────────────────────────────────────────── 07
  {
    slug: 'herramientas',
    num: '07',
    titulo: 'Herramientas',
    frase: 'La herramienta se elige por tu problema, no al revés.',
    entrada: respuesta(/Webflow/), // de: home.ts › preguntas
    portada: { tipo: 'imagen', img: IMG.roble3d },
    secciones: [
      {
        id: 'con-que',
        titulo: 'Con qué trabajamos',
        bloques: [
          // SOLO las que constan (NILO: revisar que la lista os vale tal cual):
          //   Figma (testimonio de Codely, home.ts › voces) · Astro y Tailwind (esta web) · Webflow y WordPress (servicios: migraciones) · Sanity y Supabase
          //   (servicios: CMS) · GSAP y Lottie (servicios) · Blender (el roble 3D y los altavoces, rondas 11 y 87) · Claude y Codex (home.ts › partitura.agentes) ·
          //   GitHub y Vercel (publicación, AGENTS.md) · Chrome y Safari automatizados (AGENTS.md › Guardarraíles)
          {
            tipo: 'tabla',
            cols: ['Para', 'Con'],
            filas: [
              ['Diseñar', 'Figma'],
              ['Construir', 'Astro y Tailwind; Webflow y WordPress cuando te sirven'],
              ['Contenido', 'Sanity y Supabase'],
              ['Movimiento', 'GSAP, Lottie y 3D con Blender'],
              ['Agentes', 'Claude y Codex'],
              ['Publicar', 'GitHub y Vercel'],
              ['Verificar', 'Chrome y Safari reales, automatizados'],
            ],
          },
        ],
      },
      {
        id: 'el-roble',
        titulo: 'Un ejemplo: el roble',
        bloques: [
          // de: AGENTS.md › Rondas 11–13 (el roble en Blender → molde → la acuarela de Andoni)
          { tipo: 'p', texto: 'Para el árbol de esta web probamos varias herramientas. Primero lo modelamos en 3D con Blender. Ese render sirvió después de molde para otras pruebas. Al final se quedó la acuarela de Andoni, animada en el navegador.' },
          { tipo: 'aviso', nivel: 'importante', texto: 'La herramienta no decidió el resultado. Lo decidió lo que necesitaba la web.' },
        ],
      },
    ],
  },
  // ───────────────────────────────────────────── 08
  {
    slug: 'contacto',
    num: '08',
    titulo: 'Contacto',
    frase: 'Cuéntanos qué necesita tu web.',
    entrada: 'Cuéntanos qué necesita tu web. Te contestamos nosotros, Eric y Andoni.', // de: home.ts › pie, preguntas.nota
    portada: { tipo: 'caras' },
    // El enlace de cal.com (pie.cal) aún no existe: el contacto va al correo.
    secciones: [{ id: 'escribenos', titulo: 'Escríbenos', bloques: [{ tipo: 'contacto' }] }],
  },
];

export const contacto = { correo: pie.correo, texto: pie.correoTexto, nota: preguntas.nota, paginas: nav.links };
export const testimonios = proyectosHome.testimonios;
export const juntos = IMG.juntos;

// tiempo de lectura (palabras / 200), calculado del propio texto del capítulo
const palabras = (v: unknown): string => (typeof v === 'string' ? (v.startsWith('/') || v.startsWith('#') || v.startsWith('var(') ? '' : v) : Array.isArray(v) ? v.map(palabras).join(' ') : v && typeof v === 'object' ? Object.entries(v).filter(([k]) => !['src', 'tipo', 'id', 'css', 'fg', 'bg', 'recorte', 'fondo'].includes(k)).map(([, x]) => palabras(x)).join(' ') : '');
export const minutos = (c: Capitulo) => Math.max(1, Math.round(palabras([c.entrada, c.secciones]).split(/\s+/).filter(Boolean).length / 200));
