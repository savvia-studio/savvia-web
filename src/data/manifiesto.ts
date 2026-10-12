// RONDA 126 · EL MANIFIESTO (texto de Andoni, fiel; «partitura propia» → «receta propia»: en esta versión la savvia es la receta).
// Marcado: [[…]] = la frase que la savia subraya al leerla (una por bloque, como mucho). Nada de cursivas.

export type Principio = {
  num: string;
  lema?: string; // el lema en Family, enorme
  texto: string;
};

export const manifiesto = {
  titulo: 'Manifiesto',
  firma: 'Eric y Andoni', // ronda 156 (Eric): sin «Donostia»
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
  // RONDA 129 · el manifiesto en papel (referencia: el vídeo de Andoni, «Ch. One · I · Quality»): el MISMO texto de los principios,
  // partido por sus frases en dos párrafos por capítulo (uno a cada lado del roble). Las listas del final salen de lo que ya dice la web:
  // los cuatro pasos del método (home, ronda 41) y cuatro etiquetas de Servicios (home.ts › servicios.tags).
  capitulos: [
    {
      num: 'I',
      cap: 'Cap. uno',
      etiqueta: 'Voz propia',
      parrafos: [
        'Tu web debería sonar a ti y ser [[fiel a tu marca]]. Debería contar lo que hace especial tu proyecto.',
        'Por eso, antes de construir, nos sentamos contigo mano a mano para entender qué necesitas.',
      ],
    },
    {
      num: 'II',
      cap: 'Cap. dos',
      etiqueta: 'El ritmo',
      parrafos: [
        'Tú marcas el ritmo de tu negocio. El desarrollo agéntico nos permite explorar e iterar con agilidad y el criterio guía cada decisión. Venimos del pixel-perfect artesanal y hoy trabajamos con IA cada día.',
        'Sin embargo, la batuta no la lleva ella: la IA es la base, [[el criterio sigue siendo nuestro]]. Así evitamos el AI slop y llegamos a algo hecho a medida.',
      ],
    },
    {
      num: 'III',
      cap: 'Cap. tres',
      etiqueta: 'La receta',
      parrafos: [
        'Como resultado de este proceso te llevas una [[receta propia]]:',
        'una librería de skills diseñada para que tu proyecto escale con IA sin perder su voz.',
      ],
    },
  ],
  listas: [
    { titulo: 'El método', items: ['Entender', 'Decidir', 'Documentar', 'Entregar'] },
    { titulo: 'De principio a fin', items: ['Diseño digital', 'Desarrollo agéntico', 'La receta: savvia.md', 'Formación a tu equipo'] },
  ],
};
