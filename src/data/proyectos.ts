// RONDA 62 · TODOS LOS PROYECTOS (página /proyectos, referencia: focuslab.agency/work) y su CASO DE ESTUDIO (/proyectos/<slug>, referencia:
// focuslab.agency/work/marketo). Una ficha por proyecto: para añadir los de la web anterior (treseiscero), se copia una ficha.
// RONDA 63 · «los casos tienen que tener bastante más información, que veas cada proyecto al detalle; en las métricas no pondría las rondas,
// cosas relevantes sobre el proyecto»: cada ficha gana el RETO, la web SECCIÓN A SECCIÓN, el SISTEMA (paleta y tipografías reales), cómo se hizo
// el MOVIMIENTO, la parte TÉCNICA, lo que se DESCARTÓ y cifras del proyecto (no del proceso).
// Regla: solo HECHOS que constan. Fuentes: los registros de cada proyecto (~/Desktop/Claude Code/multiverse-home, playground-iep; savvia_inspo/work/
// r31/makingof-B.md para Neety y Zernio), los casos publicados en la web anterior (treseiscero.com/portfolio/<slug>, leídos el 28/09/2026) y lo que
// se ve en cada web. RONDA 64: paletas y tipografías de los cinco proyectos anteriores, MEDIDAS en su web en vivo (tools/r64-marca.cjs). Las citas de clientes en inglés van traducidas. Lo que no consta no se escribe: el campo se queda vacío y la página no lo enseña.
// Medios: public/media/obra/<slug>/ (tools/reel/obra.cjs, desde las grabaciones del reel).

export type Medio = { tipo: 'video' | 'imagen'; src: string; poster?: string; ancho?: 'entero' | 'mitad'; movil?: boolean; pie?: string };
export type Apartado = { titulo: string; texto: string[] };
export type Proyecto = {
  slug: string;
  nombre: string;
  dominio?: string;
  url?: string;
  sector?: string;
  ubicacion?: string;
  destacado?: boolean;
  servicios: string[]; // filtran el listado (ver SERVICIOS)
  stack?: string[];
  resumen: string; // una línea: tarjeta del listado
  entradilla: string; // lead del caso
  contexto: string[]; // dos columnas bajo la entradilla
  reto: string; // el punto de partida
  frase?: string; // la frase grande del caso
  secciones?: { n: string; d: string }[]; // la web, sección a sección
  paleta?: { hex: string; n: string }[]; // el color de SU web
  tipos?: { n: string; uso: string }[]; // sus tipografías
  apartados: Apartado[]; // diseño, movimiento, contenido…
  tecnica?: string[]; // por dentro
  descartado?: string[]; // lo que se probó y cayó
  cifras?: { v: string; t: string }[]; // del PROYECTO (nunca del proceso)
  cita?: { texto: string; autor: string; rol: string; video?: string }; // ronda 144: si el testimonio tiene vídeo, se indica
  con?: string;
  color: string; // fondo de su tarjeta
  colores: [string, string, string]; // fondo · secundario · acento de su web (el degradado de su pieza)
  portada: Medio;
  escritorio?: Medio; // ronda 131: si la portada es móvil, su web en escritorio para la rejilla del portfolio
  galeria: Medio[];
};

export const SERVICIOS = ['Diseño web', 'Desarrollo agéntico', 'Webflow', 'CMS', 'Multidioma', 'Migración', 'Animación'];

const m = (slug: string, n: string, extra: Partial<Medio> = {}): Medio => ({ tipo: 'video', src: `/media/obra/${slug}/${n}.mp4`, poster: `/media/obra/${slug}/${n}.jpg`, ...extra });

export const proyectos: Proyecto[] = [
  {
    slug: 'kuanta', // ronda 126: Multiverse Computing no llegó a publicar la web → marca blanca «Kuanta» (nombre, logotipo y productos cambiados)
    nombre: 'Kuanta',
    sector: 'IA y computación cuántica',
    destacado: true,
    servicios: ['Diseño web', 'Desarrollo agéntico', 'Animación'],
    stack: ['HTML y CSS a medida', 'GSAP + ScrollTrigger', 'Lenis', 'Canvas 2D', 'Vercel'],
    resumen: 'Una esfera de puntos que se comprime hasta ser su logotipo: el producto, explicado sin una palabra.',
    entradilla: 'Kuanta comprime modelos de IA para que corran con mucho menos cálculo y la misma inteligencia. Su home tenía que demostrarlo, no solo decirlo.',
    contexto: [
      'La página presenta todo su catálogo: compresión de modelos, seguridad, orquestación, su modelo más grande y la plataforma para desplegarlos.',
      'Cada idea técnica tiene su imagen: una esfera que se comprime, una matriz que conserva un tercio de sus datos, un modelo que viaja de la nube al dispositivo sin desaparecer.',
    ],
    reto: 'Explicar compresión de modelos a quien firma la factura del cálculo, con evidencia técnica y sin perder a nadie por el camino. Todo en una sola página, oscura, seria y con el rojo de la marca como único acento.',
    frase: 'Menos cálculo, la misma inteligencia.',
    secciones: [
      { n: 'Hero', d: 'La esfera de puntos se comprime con el scroll mientras las lecturas cuentan: del 100 % al 5 % del tamaño, con el 97,4 % de la precisión.' },
      { n: 'Quién usa IA comprimida', d: 'Cuatro casos de uso en piezas isométricas cuyos modelos se comprimen al pasar el cursor.' },
      { n: 'El modelo', d: 'Un ranking de 178 modelos en el que el suyo escala hasta el puesto 13.' },
      { n: 'Cómo funciona la compresión', d: 'Una matriz de 4096 × 4096 de la que el scroll revela el tercio que de verdad lleva información.' },
      { n: 'Un modelo, cuatro sitios', d: 'Una sola ilustración que se transforma entre nube, centro de datos, borde y dispositivo.' },
      { n: 'La suite de IA', d: 'Compresión, seguridad y orquestación en paneles que se abren.' },
      { n: 'La plataforma', d: 'Un panel de cuatro pasos con capacidad, latencia y coste.' },
      { n: 'Una sola pila', d: 'Seis piezas y dos rombos que caen y encajan con física.' },
      { n: 'Sectores', d: 'Diez industrias numeradas, con su icono.' },
      { n: 'Validado en producción', d: 'Testimonios que se abren y se cierran al pulsarlos.' },
      { n: 'Compañía', d: 'Tres ilustraciones de su historia y noticias que rotan.' },
    ],
    paleta: [
      { hex: '#15181C', n: 'Fondo' },
      { hex: '#1B1F24', n: 'Fondo elevado' },
      { hex: '#F8FAFC', n: 'Tinta' },
      { hex: '#F01438', n: 'Rojo de marca' },
    ],
    tipos: [
      { n: 'Schibsted Grotesk', uso: 'Titulares y texto · 400, 500 y 600' },
      { n: 'JetBrains Mono', uso: 'Datos, especificaciones y etiquetas' },
    ],
    apartados: [
      { titulo: 'Ilustración', texto: ['Trece ilustraciones isométricas generadas por código, cada una con su historia y ninguna repetida: placas, cristal, servidores, torres, chips. Se dibujan primero a línea y después se rellenan, como un plano que se construye.'] },
      { titulo: 'Movimiento', texto: ['GSAP y ScrollTrigger con Lenis para un scroll suave. Nada rebota: las piezas caen con gravedad y se asientan, y una «lectura roja» recorre los modelos para señalar lo importante.', 'En el pie, un tensor de 8 × 8 × 8 cubos gira y 210 de ellos se ordenan hasta formar el logotipo, en un ciclo de 12 segundos sin salto.'] },
    ],
    tecnica: [
      'HTML y CSS a medida, montados a partir de parciales con un script de compilación propio',
      'La esfera y el tensor, en Canvas 2D; las ilustraciones, SVG en línea',
      'Rendimiento medido en Chrome y Safari: 0 % de fotogramas lentos en escritorio',
      'Movimiento reducido respetado: sin bucles infinitos, con el logotipo ya formado',
      'Publicada en Vercel con caché inmutable para los recursos',
    ],
    descartado: [
      'Un cubo 3D en CSS para el pie: se sustituyó por el tensor en canvas, más fluido',
      'Los rebotes y el «estirar y encoger»: la marca pedía seriedad',
      'El tema claro: la página es oscura de principio a fin',
    ],
    cifras: [
      { v: '11', t: 'secciones' },
      { v: '13', t: 'ilustraciones isométricas' },
      { v: '512', t: 'cubos en el tensor del pie' },
      { v: '0 %', t: 'fotogramas lentos en escritorio' },
    ],
    color: '#15181c',
    colores: ['#15181c', '#f01438', '#3a3e44'],
    portada: m('kuanta', 'portada'),
    galeria: [m('kuanta', 'g1'), m('kuanta', 'g2', { ancho: 'mitad' }), m('kuanta', 'g3', { ancho: 'mitad' }), m('kuanta', 'g4')],
  },
  {
    slug: 'arkdev', // ronda 126: Zernio en marca blanca (antes «Amarra»)
    nombre: 'Arkdev',
    sector: 'Software para desarrolladores',
    destacado: true,
    servicios: ['Diseño web', 'Desarrollo agéntico', 'Animación'],
    stack: ['HTML y CSS a medida', 'Web Audio', 'Vercel'],
    resumen: 'Una API de redes y mensajería para 23 canales, presentada como un muelle donde atraca cada uno.',
    entradilla: 'Arkdev conecta un producto con 23 canales de redes sociales, mensajería y anuncios a través de una sola API. Ellos se ocupan de las apps de desarrollador, los permisos y las revisiones de cada plataforma.',
    contexto: [
      'La web habla a quien programa y a los agentes de IA que ya integran APIs: el código es protagonista desde el primer pantallazo y el ejemplo se escribe solo.',
      'La idea que la ordena es un muelle: cada canal atraca en la misma API, con las mismas herramientas y la misma forma de datos.',
    ],
    reto: 'Que 23 integraciones distintas se entiendan como una sola cosa, sencilla, y que un desarrollador se vea funcionando en minutos.',
    frase: 'Cada canal atraca en la misma API.',
    secciones: [
      { n: 'Hero', d: 'El titular y un terminal que escribe el ejemplo línea a línea: conectar, publicar y responder.' },
      { n: 'En directo', d: 'Contadores de publicaciones y cuentas conectadas, y los socios oficiales.' },
      { n: 'Plataformas', d: 'Veintitrés pestañas, una por canal, con su ficha técnica.' },
      { n: 'El cambio', d: 'Una sección oscura que cambia el ritmo: vídeo y un mosaico de seis piezas sobre la nueva capa de infraestructura.' },
      { n: 'Agentes: el muelle', d: 'Los 23 canales en un arco que van atracando, uno a uno, en la API.' },
      { n: 'Clientes', d: 'Un caso destacado que rota y nueve reseñas.' },
      { n: 'Cómo empezar', d: 'Tres pasos cronometrados: 30 segundos, 2 minutos y 1 minuto.' },
      { n: 'Precios', d: 'Pago por uso, con una calculadora de 1 a 10.000 cuentas.' },
      { n: 'Preguntas, seguridad y cierre', d: 'Seis preguntas de ingeniería, el bloque de seguridad y la llamada final.' },
    ],
    paleta: [
      { hex: '#F7F4F0', n: 'Papel' },
      { hex: '#17130F', n: 'Tinta' },
      { hex: '#EB3514', n: 'Bermellón (único acento)' },
      { hex: '#57C15F', n: 'Verde «en directo»' },
    ],
    tipos: [
      { n: 'Instrument Sans', uso: 'Titulares · 600' },
      { n: 'JetBrains Mono', uso: 'Código y rótulos' },
    ],
    apartados: [
      { titulo: 'El muelle', texto: ['Veintitrés teselas en un arco que avanza cada 2,4 segundos: la que llega encaja en la cápsula central con un golpe seco, como un amarre. Las pieles alternan blanco, tinta y bermellón.', 'Se puede tocar: arrastras el arco, lo lanzas con inercia y se detiene encajando en el canal más cercano. Al atracar, el canal pasa por «en cola», «publicando» y «publicado».'] },
      { titulo: 'Sonido', texto: ['Clics y atraques sintetizados en el propio navegador, sin archivos de audio, que se pueden apagar y se recuerdan entre visitas.'] },
    ],
    tecnica: [
      'Transformaciones CSS nativas para todo el movimiento, sin librerías de animación',
      'Sonido con Web Audio, sintetizado',
      'Calculadora de precios con un deslizador logarítmico',
      'Tema y sonido recordados en el navegador',
      'Movimiento reducido: el muelle encaja sin inercia',
    ],
    cifras: [
      { v: '23', t: 'canales en una API' },
      { v: '11', t: 'secciones' },
      { v: '2,4 s', t: 'entre atraques' },
      { v: '1', t: 'solo color de acento' },
    ],
    color: '#f8f4ee',
    colores: ['#f8f4ee', '#e8542b', '#998a82'],
    portada: m('arkdev', 'portada'),
    galeria: [m('arkdev', 'g1'), m('arkdev', 'g2', { ancho: 'mitad' }), m('arkdev', 'g3', { ancho: 'mitad' }), m('arkdev', 'g4')],
  },
  {
    slug: 'playground',
    nombre: 'Playground IEP',
    url: 'https://playgroundiep.com',
    dominio: 'playgroundiep.com',
    sector: 'Educación especial',
    ubicacion: 'Chicago, Estados Unidos',
    servicios: ['Diseño web', 'Desarrollo agéntico', 'Webflow', 'CMS', 'Animación'],
    stack: ['Figma', 'Webflow', 'HTML y CSS a medida', 'GSAP', 'Lenis', 'WebGL', 'Vercel'],
    resumen: 'IA con base científica para educación especial, contada con pegatinas que se pueden coger.',
    entradilla: 'Playground IEP es una suite de IA para educación especial en Estados Unidos: ayuda a los equipos a redactar los planes individuales de cada alumno, seguir su progreso y gestionar su carga de casos.',
    contexto: [
      'Primero se hizo su web en Webflow, con CMS y animaciones a medida. Después, la home se rehízo en código propio, sin dependencias externas, para que su equipo pueda crear páginas nuevas con IA.',
      'La nueva home tenía que ser más profesional y más centrada en el producto, sin perder la autenticidad de una marca que habla a profesores: aire entre secciones, un menú al estilo de Apple y animaciones con sentido.',
    ],
    reto: 'Contar 21 herramientas de IA, en un sector donde la confianza lo es todo, sin que la web parezca un catálogo ni pierda el tono cercano que tiene la marca.',
    frase: 'Serio en el fondo, cercano en la forma.',
    secciones: [
      { n: 'Hero', d: 'Titular que cambia de forma, siete pegatinas que se despegan y el producto que entra empujando.' },
      { n: 'La pila', d: 'Cinco tarjetas del producto (casos, redacción, chat, progreso y calendario) que se revelan dentro de un marco fijo.' },
      { n: 'Cómo funciona', d: 'Tres pasos en una pantalla: el documento del alumno se convierte en un borrador con sus fuentes citadas.' },
      { n: 'IEP Copilot', d: 'Scroll horizontal por cuatro trabajos con las 21 herramientas reales, cada trabajo con su color.' },
      { n: 'Seguro por diseño', d: 'Un círculo que inunda la pantalla desde un sello y cuatro compromisos de privacidad.' },
      { n: 'De los profesores', d: 'Citas que rotan y logos que se voltean.' },
      { n: 'Preguntas', d: 'Ocho notas adhesivas de colores que se dan la vuelta al pulsarlas.' },
      { n: 'Precios y pie', d: 'Dos caminos (profesores gratis, colegios) y pegatinas que se pueden arrastrar.' },
    ],
    paleta: [
      { hex: '#4F1CF8', n: 'Azul eléctrico' },
      { hex: '#111D2A', n: 'Noche' },
      { hex: '#479FF8', n: 'Océano' },
      { hex: '#EB539F', n: 'Rosa' },
      { hex: '#FA7500', n: 'Naranja' },
      { hex: '#3FA559', n: 'Verde' },
    ],
    tipos: [
      { n: 'Politetype', uso: 'Titulares · nunca en negrita' },
      { n: 'Inter', uso: 'Lectura e interfaz' },
    ],
    apartados: [
      { titulo: 'Ilustración', texto: ['Trece pegatinas escolares dibujadas para la marca (un cohete de cera, una estrella dorada, una manzana, un lápiz del número 2, un avión de papel, un examen con A+) y cinco dinosaurios propios, con troquel blanco y contorno negro. Las del hero se despegan con un shader.'] },
      { titulo: 'Movimiento', texto: ['GSAP y Lenis. La carga es un cohete de cera que despega en 2,8 segundos; el titular cambia de forma cada 3,2; las notas de las preguntas caen al llegar y giran en 3D al pulsarlas; los testimonios rotan según lo largos que son.'] },
      { titulo: 'Datos que cuadran', texto: ['Todo lo que enseña la web se revisó contra la aplicación real: los alumnos de ejemplo, el calendario y los documentos son los que un profesor vería.'] },
    ],
    tecnica: [
      'HTML y CSS propios con un script de compilación que versiona los recursos',
      'Página de 3,9 MB, optimizada desde 5,9 MB',
      '0 % de fotogramas lentos al hacer scroll en escritorio; 2,8 s hasta ver la web',
      'De 320 a 2560 px de ancho sin desbordes',
      'Movimiento reducido: sin pegatinas, sin carga, estados finales',
      'Una librería con 9 bloques y 6 componentes para crear páginas nuevas',
    ],
    descartado: [
      'Una carga con un hoyo en uno de 5 s: la sustituyó el cohete de cera de 2,8 s',
      'Un logotipo en 3D: se quedó el suyo, con la pegatina del cohete girada 9°',
      'Un mosaico de cuatro tarjetas para el ecosistema: se rehízo en bento',
    ],
    cifras: [
      { v: '21', t: 'herramientas presentadas' },
      { v: '13', t: 'pegatinas dibujadas' },
      { v: '3,9 MB', t: 'de peso (antes 5,9)' },
      { v: '0 %', t: 'fotogramas lentos en escritorio' },
    ],
    cita: {
      texto: 'Eric y Andoni son increíbles. Es divertido trabajar con ellos y su trabajo es increíble. No solo tienen un talento increíble, sino que se preocupan profundamente por la colaboración. Durante todo el proceso se comunicaron constantemente conmigo y juntos construimos algo precioso.',
      autor: 'Sean Klamm',
      rol: 'CEO de Playground IEP',
    },
    color: '#f3f1fb',
    colores: ['#21127a', '#5c2e6e', '#3d7a96'],
    portada: m('playground', 'portada'),
    galeria: [m('playground', 'g1'), m('playground', 'g2', { ancho: 'mitad' }), m('playground', 'g3', { ancho: 'mitad' }), m('playground', 'g4')],
  },
  {
    slug: 'neety',
    nombre: 'Neety',
    sector: 'Ventas B2B',
    destacado: true,
    servicios: ['Diseño web', 'Desarrollo agéntico', 'Animación'],
    stack: ['Next.js', 'Tailwind CSS', 'GSAP + ScrollTrigger', 'Cloudflare'],
    resumen: 'Detecta a quién vender y cuándo. La web enseña el feed de señales antes de explicarlo.',
    entradilla: 'Neety es inteligencia comercial para equipos B2B: detecta a quién vender, cuándo hacerlo y qué acción tomar a partir de señales dispersas.',
    contexto: [
      'El producto se entiende viéndolo: un feed de señales abre la página y las secciones siguientes lo desmontan pieza a pieza, del ruido comercial a la acción.',
      'La marca pedía claridad operativa y elegancia, y una regla que se respetó en toda la web: el naranja, solo para la señal.',
    ],
    reto: 'Que un comercial entienda en segundos qué hace una herramienta de datos, sin diagramas abstractos ni promesas vacías.',
    frase: 'Del ruido comercial a señales accionables.',
    secciones: [
      { n: 'Hero', d: 'El titular y un feed de siete tarjetas de señales que corre en bucle.' },
      { n: 'Clientes', d: 'Los logotipos de quienes ya la usan.' },
      { n: 'Por qué Neety', d: 'Seis cifras del producto que cuentan al entrar.' },
      { n: 'De ruido a señal', d: 'El antes y el después, con píxeles que se ordenan.' },
      { n: 'Neety por dentro', d: 'Tarjetas solapadas con lo que ve el equipo.' },
      { n: 'Cómo funciona', d: 'Un raíl que recorre el proceso paso a paso.' },
      { n: 'Integraciones', d: 'El producto conectado a su pila comercial.' },
      { n: 'Casos de uso', d: 'Cuatro pestañas, una por equipo.' },
      { n: 'Demo', d: 'Qué verás en la demo y la llamada final.' },
    ],
    paleta: [
      { hex: '#431B44', n: 'Ciruela' },
      { hex: '#A7C5F9', n: 'Azul bebé' },
      { hex: '#FE8238', n: 'Naranja (solo la señal)' },
      { hex: '#0BB783', n: 'Menta' },
      { hex: '#F5F7F9', n: 'Superficie' },
    ],
    tipos: [
      { n: 'Bricolage Grotesque', uso: 'Titulares · 500' },
      { n: 'Switzer', uso: 'Interfaz y texto' },
    ],
    apartados: [
      { titulo: 'El feed', texto: ['Siete tarjetas en un bucle de 27 segundos. La del centro está enfocada; las demás pierden opacidad, se desenfocan y encogen según su distancia, como un radar comercial. Una de ellas se escribe sola.'] },
      { titulo: 'De ruido a señal', texto: ['Los píxeles del antes aparecen desordenados y se asientan con un pequeño rebote al convertirse en el después: una lista fría se vuelve una lista priorizada.'] },
    ],
    tecnica: [
      'Next.js con Tailwind CSS',
      'GSAP y ScrollTrigger para el feed y las entradas',
      'La máquina «de ruido a señal», en DOM y CSS, sin WebGL',
      'Servida tras Cloudflare',
    ],
    cifras: [
      { v: '9', t: 'secciones' },
      { v: '7', t: 'tarjetas en el feed' },
      { v: '27 s', t: 'de bucle de señales' },
      { v: '4', t: 'casos de uso' },
    ],
    color: '#f5f7f9',
    colores: ['#f5f7f9', '#ceb7b5', '#ccd5e5'],
    portada: m('neety', 'portada'),
    galeria: [m('neety', 'g1'), m('neety', 'g2', { ancho: 'mitad' }), m('neety', 'g3', { ancho: 'mitad' }), m('neety', 'g4')],
  },
  {
    slug: 'invopop',
    nombre: 'Invopop',
    url: 'https://invopop.com',
    dominio: 'invopop.com',
    sector: 'Facturación electrónica',
    ubicacion: 'Madrid, España',
    servicios: ['Diseño web', 'Webflow', 'CMS', 'Multidioma'],
    stack: ['Figma', 'Webflow', 'Notion', 'WhaleSync'],
    resumen: 'Más de cien fichas por país que el propio equipo actualiza desde Notion.',
    entradilla: 'Invopop hace infraestructura de facturación electrónica para empresas globales. Tiene mucho contenido por país (cobertura, costes locales, casos de cliente) y necesitaba actualizarlo sin pasar cada cambio por la web.',
    contexto: [
      'Se rediseñaron las páginas clave: la cobertura por países, las guías de facturación con mapa interactivo y la cobertura técnica, para que un contenido complejo se lea fácil.',
      'Debajo, un CMS en Webflow de más de cien fichas con referencias cruzadas, alimentado desde Notion: el equipo edita donde ya trabaja y la web se actualiza sola.',
    ],
    reto: 'Mejorar el diseño de páginas y componentes concretos y montar un CMS de más de cien elementos conectado con la base de datos del cliente.',
    frase: 'El equipo edita donde ya trabaja y la web se actualiza sola.',
    paleta: [
      { hex: '#FEFEFC', n: 'Fondo' },
      { hex: '#0B0B10', n: 'Tinta' },
      { hex: '#004235', n: 'Verde Invopop' },
      { hex: '#6B727D', n: 'Gris' },
    ],
    tipos: [
      { n: 'Söhne', uso: 'Titulares y texto' },
      { n: 'Geist Mono', uso: 'Detalles' },
    ],
    apartados: [
      { titulo: 'Diseño', texto: ['Páginas pensadas para navegar datos: países, costes y guías, alineadas con la identidad de Invopop y fáciles de recorrer.'] },
      { titulo: 'El mapa', texto: ['Cada país es una ficha del CMS conectada a Notion y dibujada con su trazado SVG. Se filtra por tipo de cliente (B2B, B2C y B2G) y se anima al pasar.'] },
      { titulo: 'De Notion a Webflow', texto: ['Notion es la base de datos principal. WhaleSync sincroniza cada ficha campo a campo con el CMS de Webflow: casos de éxito, costes locales de facturación y los datos de cada país.'] },
    ],
    tecnica: ['CMS en Webflow con referencias entre colecciones', 'Sincronización Notion → Webflow con WhaleSync', 'Localización de Webflow en inglés y español, con SEO por idioma'],
    cifras: [
      { v: '+100', t: 'fichas de CMS' },
      { v: '2', t: 'idiomas' },
      { v: '3', t: 'tipos de cliente en el mapa' },
    ],
    cita: {
      texto: 'Nos los recomendó un amigo emprendedor y ha sido una gran decisión. Desde el primer día se integraron perfectamente con nuestras herramientas y manejaron la integración de más de cien elementos de CMS con agilidad. Eric y Andoni responden en minutos y despliegan en horas. Superaron nuestras expectativas.',
      autor: 'Juan Moliner',
      rol: 'Cofundador de Invopop',
    },
    color: '#1a4534',
    colores: ['#1a4534', '#2f6a52', '#9dbfae'],
    portada: m('invopop', 'portada'),
    galeria: [m('invopop', 'g1'), m('invopop', 'g2', { ancho: 'mitad' }), m('invopop', 'g3', { ancho: 'mitad' })],
  },
  {
    slug: 'business-online-payroll',
    nombre: 'Business Online Payroll',
    url: 'https://businessonlinepayroll.com',
    dominio: 'businessonlinepayroll.com',
    sector: 'Nóminas y banca',
    ubicacion: 'Rochester, Estados Unidos',
    servicios: ['Webflow', 'CMS', 'Animación'],
    stack: ['Webflow', 'GSAP'],
    resumen: 'Una sola arquitectura de CMS para veintiún bancos, cada uno con su marca.',
    entradilla: 'SurePayroll quería convertir su plataforma Business Online Payroll en una solución de marca blanca para 21 bancos socios, cada uno con sus colores, su logotipo y su contenido.',
    contexto: [
      'El trabajo se hizo dentro del equipo de desarrollo Webflow de Farco Studio: un sistema de CMS que crea el microsite de cada banco sin rehacer nada.',
      'Colecciones por banco para el microsite, el formulario de referidos, las páginas de gracias, los legales, los beneficios y las preguntas de precios, conectadas por referencias.',
    ],
    reto: 'Que veintiún marcas distintas vivan en una sola web sin que ninguna se parezca a otra y sin multiplicar el trabajo por veintiuno.',
    frase: 'Veintiún marcas, una sola arquitectura.',
    paleta: [
      { hex: '#F6F3F2', n: 'Fondo' },
      { hex: '#121516', n: 'Tinta' },
      { hex: '#BB532E', n: 'Terracota' },
      { hex: '#122541', n: 'Azul noche' },
      { hex: '#F0764B', n: 'Coral' },
    ],
    tipos: [
      { n: 'Untitled Sans', uso: 'Titulares 500 · texto 400' },
    ],
    apartados: [
      { titulo: 'El CMS', texto: ['Colecciones para los microsites de cada banco, el formulario de referidos, dos tipos de páginas de agradecimiento, la política de privacidad, las condiciones de uso, los beneficios y las preguntas de precios.', 'El mapa del sitio se construye con referencias y multirreferencias: cada banco tiene su experiencia completa a partir de sus fichas.'] },
      { titulo: 'Marca por banco', texto: ['Los colores principal y secundario de cada banco son variables conectadas a campos del CMS, con una nomenclatura pensada para crecer.'] },
    ],
    tecnica: ['CMS de Webflow con referencias y multirreferencias', 'Colores por banco mediante variables ligadas al CMS', 'Animaciones a medida con GSAP'],
    cifras: [
      { v: '21', t: 'bancos, cada uno con su microsite' },
      { v: '1', t: 'sola arquitectura de CMS' },
    ],
    con: 'Farco Studio, para SurePayroll',
    color: '#101e3b',
    colores: ['#101e3b', '#1c3364', '#a4a2a3'],
    portada: m('business-online-payroll', 'portada'),
    galeria: [m('business-online-payroll', 'g1'), m('business-online-payroll', 'g2', { ancho: 'mitad' }), m('business-online-payroll', 'g3', { ancho: 'mitad' })],
  },
  {
    slug: 'cubbo',
    nombre: 'Cubbo',
    url: 'https://cubbo.com',
    dominio: 'cubbo.com',
    sector: 'Logística',
    ubicacion: 'Ciudad de México, México',
    servicios: ['Diseño web', 'Webflow', 'CMS', 'Multidioma', 'Migración', 'Animación'],
    stack: ['Figma', 'Webflow', 'GSAP', 'Osmo Supply', 'HubSpot', 'Cloudflare'],
    resumen: 'Dos webs, México y Brasil, unidas en una sola y rediseñadas de principio a fin.',
    entradilla: 'Cubbo tenía dos proyectos de Webflow separados: México en producción y Brasil en un subdominio. El objetivo: unirlo todo en uno solo con la localización de Webflow y rediseñar la web entera.',
    contexto: [
      'Se presentaron varios conceptos alineados con la visión de Cubbo, siempre respetando su identidad, y se afinó la dirección con Ignasi hasta el concepto final. Desde ahí, cada página se aprobó casi sin cambios.',
      'Con la home aprobada, el desarrollo empezó en paralelo mientras el diseño cerraba las páginas secundarias.',
    ],
    reto: 'Unir dos webs en dos idiomas sin perder contenido, posicionamiento ni formularios de venta, y rediseñarla por el camino.',
    frase: 'Dos webs en una, sin perder nada por el camino.',
    paleta: [
      { hex: '#FFFFFF', n: 'Fondo' },
      { hex: '#0741DD', n: 'Azul Cubbo' },
      { hex: '#031C63', n: 'Marino' },
      { hex: '#F7F9FC', n: 'Niebla' },
    ],
    tipos: [
      { n: 'Manrope', uso: 'Titulares · 500' },
      { n: 'Inter', uso: 'Texto' },
    ],
    apartados: [
      { titulo: 'Diseño', texto: ['Varios conceptos, uno elegido y páginas aprobadas casi a la primera. El movimiento, con GSAP y componentes de la librería Osmo Supply.'] },
      { titulo: 'Por debajo', texto: ['El CMS se estructuró para migrar cada caso de éxito y cada artículo del blog de México (es-MX) y Brasil (pt-BR), con un plan de redirecciones 301 en Cloudflare y los formularios de ventas conectados a HubSpot, que avisan al equipo en Slack.'] },
    ],
    tecnica: ['Un solo proyecto de Webflow con localización es-MX y pt-BR', 'Migración del CMS: casos de éxito y blog de los dos países', 'Redirecciones 301 con Cloudflare', 'Formularios de ventas en HubSpot con avisos en Slack'],
    cifras: [
      { v: '2 → 1', t: 'webs unificadas' },
      { v: '2', t: 'idiomas: es-MX y pt-BR' },
    ],
    cita: {
      texto: 'Nos encantó trabajar con Andoni y Eric. El resultado superó nuestras expectativas, pero lo mejor fue lo increíblemente proactivos que fueron. Nunca tuve que ir detrás de ellos: venían a mí con soluciones. Desde el primer día entendieron quiénes somos, qué hacemos y qué necesitábamos.',
      autor: 'Ignasi Vegas',
      rol: 'Cofundador y CEO de Cubbo',
    },
    color: '#1b40d6',
    colores: ['#1b40d6', '#4963e2', '#788ae8'],
    portada: m('cubbo', 'portada'),
    galeria: [m('cubbo', 'g1'), m('cubbo', 'g2', { ancho: 'mitad' }), m('cubbo', 'g3', { ancho: 'mitad' })],
  },
  {
    slug: 'remerge',
    nombre: 'Remerge',
    destacado: true, // ronda 138: sustituye a Playground en los destacados del portfolio (la web móvil, en teléfono)
    url: 'https://remerge.io',
    dominio: 'remerge.io',
    sector: 'Publicidad en apps',
    ubicacion: 'Berlín, Alemania',
    servicios: ['Webflow', 'CMS', 'Multidioma', 'Migración'],
    stack: ['Webflow', 'Cursor', 'Webflow MCP'],
    resumen: 'Toda la web, de Craft CMS a Webflow, en cuatro idiomas.',
    entradilla: 'Remerge necesitaba migrar su web entera de Craft CMS a Webflow, en cuatro idiomas: inglés, coreano, japonés y chino.',
    contexto: [
      'Se trabajó desde la web original, inspeccionando el código y reconstruyendo la arquitectura desde cero: de las variables de estilo y el sistema de espaciado a cada componente, pensado para que el equipo de marketing lo reutilice.',
      'En dos meses: más de treinta páginas estáticas y un CMS con dos colecciones principales y más de 350 fichas. Con Cursor y el MCP de Webflow, y aun así revisando a mano casi cada contenido en los cuatro idiomas.',
    ],
    reto: 'Una de esas migraciones donde cada detalle cuenta: cambiar de plataforma sin que nada se mueva de su sitio, en cuatro idiomas y cuatro sistemas de escritura.',
    frase: 'La IA ayuda. La revisión, a mano.',
    paleta: [
      { hex: '#E0E4EF', n: 'Lavanda' },
      { hex: '#EEFF53', n: 'Lima' },
      { hex: '#202020', n: 'Tinta' },
      { hex: '#BBB9A3', n: 'Piedra' },
    ],
    tipos: [
      { n: 'Editorial New', uso: 'Titulares · ultraligera' },
      { n: 'GT America', uso: 'Texto' },
    ],
    apartados: [
      { titulo: 'Reconstrucción', texto: ['Una librería de variables de estilo y un sistema de espaciado, y componentes reutilizables para que marketing construya y escale sin depender de nadie.'] },
      { titulo: 'Validación', texto: ['La IA aceleró la migración, pero hubo que revisar casi cada contenido en los cuatro idiomas para asegurar que todo estaba exactamente donde debía.'] },
    ],
    tecnica: ['De Craft CMS a Webflow, reconstruida desde el código original', 'Localización de Webflow en inglés, coreano, japonés y chino', 'Migración asistida con Cursor y el MCP de Webflow'],
    cifras: [
      { v: '+30', t: 'páginas' },
      { v: '+350', t: 'fichas de CMS' },
      { v: '4', t: 'idiomas' },
      { v: '2', t: 'meses' },
    ],
    cita: {
      texto: 'Trabajar con ellos en nuestra migración web fue una experiencia excelente de principio a fin. Llevaron un proyecto complejo, con varios idiomas, una arquitectura de componentes a medida y una migración de contenido extensa, con una precisión sólida.',
      autor: 'Guilherme Escobar',
      rol: 'Director global de marketing de Remerge',
    },
    color: '#eceed9',
    colores: ['#eceed9', '#f2ff71', '#ffffff'],
    portada: m('remerge', 'portada', { movil: true }),
    escritorio: m('remerge', 'escritorio'),
    galeria: [m('remerge', 'g1', { movil: true, ancho: 'mitad' }), m('remerge', 'g2', { movil: true, ancho: 'mitad' }), m('remerge', 'g3', { movil: true, ancho: 'mitad' })],
  },
  {
    slug: 'isotrol',
    nombre: 'Isotrol',
    url: 'https://isotrol.com',
    dominio: 'isotrol.com',
    sector: 'Renovables',
    ubicacion: 'Sevilla, España',
    servicios: ['Diseño web', 'Webflow', 'CMS', 'Multidioma'],
    stack: ['Figma', 'Webflow', 'Notion'],
    resumen: 'Software para energías renovables, con el mundo entero en un mapa.',
    entradilla: 'Isotrol hace software para gestionar activos de energía renovable en todo el mundo. Su web tenía que estar a la altura de ese alcance.',
    contexto: [
      'Diseño de la web, desarrollo en Webflow, contenido gestionado desde Notion y localización: de la portada con su imagen de marca a las páginas de producto de Bluence y el mapa de su impacto global.',
      'Una web sobria, con fotografía a sangre, cifras que se leen de lejos y el azul de la marca como único acento.',
    ],
    reto: 'Contar una empresa técnica con presencia en todo el mundo de forma clara, y que su equipo pueda mantener el contenido.',
    frase: 'Su impacto, en un mapa.',
    paleta: [
      { hex: '#FFFFFF', n: 'Fondo' },
      { hex: '#090756', n: 'Marino' },
      { hex: '#1A1AFF', n: 'Azul eléctrico' },
      { hex: '#AAAAAA', n: 'Gris' },
    ],
    tipos: [
      { n: 'Aspekta', uso: 'Titulares 300 · texto 400' },
    ],
    apartados: [
      { titulo: 'Diseño', texto: ['Fotografía a sangre en la portada, cifras grandes, el producto Bluence en su propia sección y un mapa del mundo con su impacto.'] },
      { titulo: 'Contenido', texto: ['El CMS de Webflow se alimenta desde Notion y la web se sirve en varios idiomas con la localización de Webflow.'] },
    ],
    tecnica: ['Diseño en Figma y desarrollo en Webflow', 'CMS conectado a Notion', 'Localización de Webflow'],
    cita: {
      texto: 'Estamos encantados de trabajar con vosotros en nuestros proyectos. El servicio, la ejecución, los plazos y la entrega son excelentes, pero lo que de verdad destaca es vuestro conocimiento y vuestra capacidad de mejorar nuestra idea inicial.',
      autor: 'Inés López-Pita',
      rol: 'Directora de marketing de Isotrol',
    },
    color: '#19171d',
    colores: ['#19171d', '#635850', '#8d8478'],
    portada: m('isotrol', 'portada'),
    galeria: [m('isotrol', 'g1'), m('isotrol', 'g2', { ancho: 'mitad' }), m('isotrol', 'g3', { ancho: 'mitad' })],
  },
];

export const deProyecto = (slug: string) => proyectos.find((p) => p.slug === slug);
