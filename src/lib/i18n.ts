// Dos idiomas: castellano (/, el de siempre) e inglés (/en/). El idioma de la página sale de la dirección (Astro.currentLocale).
export type Lang = 'es' | 'en';
export const langDe = (loc?: string): Lang => (loc === 'en' ? 'en' : 'es');
export const OTRO: Record<Lang, Lang> = { es: 'en', en: 'es' };
// Dirección de una página en un idioma: ruta('en', '/proyectos') → '/en/proyectos'; ruta('en', '/#servicios') → '/en/#servicios'.
// Lo que no es una página nuestra (mailto:, https:, activos) no se toca.
export const ruta = (lang: Lang, href: string): string => {
  if (!href.startsWith('/') || href.startsWith('//') || /^\/(en(\/|$|#|\?)|media\/|_astro\/|api\/)/.test(href) || /\.\w{2,5}($|[?#])/.test(href)) return href;
  return lang === 'en' ? '/en' + href : href;
};
// La dirección equivalente en el otro idioma (para el selector y los hreflang).
export const enOtroIdioma = (pathname: string, a: Lang): string => {
  const sin = pathname.replace(/^\/en(?=\/|$)/, '') || '/';
  return a === 'en' ? (sin === '/' ? '/en/' : '/en' + sin) : sin;
};
