// RONDA 126 · EL MANIFIESTO (texto de Andoni, fiel; «partitura propia» → «receta propia»: en esta versión la savvia es la receta).
// Marcado: [[…]] = la frase que la savia subraya al leerla (una por bloque, como mucho). Nada de cursivas.

export type Principio = {
  num: string;
  lema?: string; // el lema en Family, enorme
  texto: string;
};

export const manifiesto = {
  titulo: 'Manifiesto',
  firma: 'savvia', // ronda 296 (Eric): «pon savvia en vez de Eric y Andoni» (antes «Eric y Andoni»; ronda 156: sin «Donostia»)
  principios: [
    {
      num: '01',
      lema: 'Voz propia.',
      texto:
        'Tu web debería sonar a ti y ser [[fiel a tu marca]]. Debería contar lo que hace especial tu proyecto. Por eso, antes de construir, nos sentamos contigo mano a mano para entender qué necesitas.',
    },
    {
      num: '02',
      lema: 'Tú marcas el ritmo de tu negocio.',
      texto:
        'El desarrollo agéntico nos permite explorar e iterar con agilidad y el criterio guía cada decisión. Venimos del pixel-perfect artesanal y hoy trabajamos con IA cada día. Sin embargo, la batuta no la lleva ella: la IA es la base, [[el criterio sigue siendo nuestro]]. Así evitamos el AI slop y llegamos a algo hecho a medida.',
    },
    {
      num: '03',
      texto:
        'Como resultado de este proceso te llevas una [[receta propia]]: una librería de skills diseñada para que tu proyecto escale con IA sin perder su voz.',
    },
  ] as Principio[],
  cierre: 'Eso es savvia agentic: tu web, orquestada con IA y criterio.',
  // RONDA 296 (Eric): «la analogía de la savia del árbol con savvia: compartimos valores». Tres capítulos (va por dentro · se adapta · es sabia);
  // la entrada lleva la capitular; «savia» = la del árbol, «savvia» = nosotros. Eric: «los subrayados no me gustan nada» y los lemas como heading
  // tampoco: prosa seguida, sin [[…]]; `etiqueta` queda como nombre del capítulo (no se pinta).
  // RONDA 297 (Eric, 28/10): manifiesto nuevo tras la revisión de José Luis («abrir con fuerza, cerrar con fuerza»): qué es savvia · los
  // problemas · cómo empezamos (la savia) · qué entregamos · los guardarraíles · cierre. Cada `capitulo` es un párrafo.
  entrada: 'savvia existe para orquestar el diseño y desarrollo de tu web con IA.',
  capitulos: [
    {
      num: 'I',
      parrafos: [
        'Tu producto ha avanzado y tu equipo también. Sin embargo, tu web sigue contando la versión de hace tres años.',
        'No se alinea con tu marca. Cuesta mantenerla y el diseño se rompe en cada cambio. Y si la rehiciste con IA, quizá se vea como AI slop.',
      ],
    },
    { num: 'II', parrafos: ['Tu web debería sonar a ti.'] },
    {
      num: 'III',
      parrafos: [
        'Nosotros empezamos por dentro, como la savia. Te escuchamos para entender lo que tu proyecto necesita.',
        'La savia lleva dentro todo lo que el árbol ha vivido. savvia, lo aprendido con cada cliente desde 2020.',
        'Con tu visión y nuestro criterio creamos unas directrices únicas.',
      ],
    },
    {
      num: 'IV',
      parrafos: [
        'Y te entregamos tu web conectada con la IA, lista para usar: un repositorio enlazado a tu suscripción de Claude o ChatGPT, desde donde podrás seguir evolucionándola sin perder nada de lo que hemos trabajado juntos.',
      ],
    },
    {
      num: 'V',
      parrafos: [
        'Eso solo funciona con guardarraíles. Cada decisión de diseño, de movimiento o de componente queda recogida en el sistema, que es la fuente de verdad de tu web.',
        'En la práctica, es un conjunto de archivos .md que resuelven las incógnitas de llevar tu identidad visual a una web.',
      ],
    },
    { num: 'VI', parrafos: ['savvia es alimento y energía. savvia es criterio.'] },
  ],
  listas: [
    { titulo: 'El método', items: ['Entender', 'Decidir', 'Documentar', 'Entregar'] },
    { titulo: 'De principio a fin', items: ['Diseño digital', 'Desarrollo agéntico', 'La receta: savvia.md', 'Formación a tu equipo'] },
  ],
};
