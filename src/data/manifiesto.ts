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
  entrada: 'La savia de un árbol y savvia comparten valores.',
  capitulos: [
    {
      num: 'I',
      cap: 'Cap. uno',
      etiqueta: 'Va por dentro.',
      parrafos: [
        'La savia va por dentro: nutre, y por eso el árbol florece. Nosotros empezamos escuchando, mano a mano contigo.',
        'Te conocemos, nos conoces y te hacemos parte del proceso. En ese vínculo está buena parte del resultado.',
      ],
    },
    {
      num: 'II',
      cap: 'Cap. dos',
      etiqueta: 'Se adapta.',
      parrafos: [
        'La savia llega a cada rama con lo que esa rama necesita.',
        'Nosotros también: nos adaptamos a tu proyecto, a su tamaño y a su momento, y siempre que podemos damos un poco más.',
      ],
    },
    {
      num: 'III',
      cap: 'Cap. tres',
      etiqueta: 'Es sabia.',
      parrafos: [
        'La savia lleva dentro todo lo que el árbol ha vivido. Nosotros, lo aprendido con cada cliente.',
        'Con la IA, ese criterio llega más lejos.',
      ],
    },
  ],
  listas: [
    { titulo: 'El método', items: ['Entender', 'Decidir', 'Documentar', 'Entregar'] },
    { titulo: 'De principio a fin', items: ['Diseño digital', 'Desarrollo agéntico', 'La receta: savvia.md', 'Formación a tu equipo'] },
  ],
};
