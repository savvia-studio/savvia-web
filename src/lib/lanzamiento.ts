// LANZAMIENTO (oct 2026) · Eric y Andoni: «salimos con la Home, el Manifiesto y el caso de Neety; el resto, “próximamente” o fuera».
// Una sola lista manda: los casos que se publican. Para abrir otro, añadir su slug aquí (el resto del recorte se deshace solo).
// Las demás páginas (portfolio, lab, sistema, método) redirigen a la home; sus enlaces del menú salen apagados («pronto»).
// 26/10 · Eric: «que vuelva el menú entero» (salir con todo): RECORTE = false abre todas las páginas y casos; true vuelve al recorte.
export const RECORTE = false;
// 28/10 · Andoni: «el Método, que no se pueda abrir esa página de ninguna manera» (aún no salimos con él): /metodo vuelve a la home y sus capítulos
// no se generan (404). Para abrirlo, true (el menú y el pie lo siguen marcando «próximamente» hasta darle href en home.ts › nav.mas).
export const METODO_ABIERTO = false;
export const CASOS_PUBLICOS = ['neety'];
export const esPublico = (slug: string) => !RECORTE || CASOS_PUBLICOS.includes(slug);
// 26/10 · Eric: en el portfolio, la tarjeta lleva a su CASO solo si el caso es definitivo («todavía no lo es ninguno»); si no, abre el visor (como en la home).
// Para estrenar un caso en el portfolio, añadir aquí su slug.
export const CASOS_LISTOS: string[] = [];
