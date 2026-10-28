// Idioma en el navegador (los <script> de Astro no ven el frontmatter): lo manda <html lang>. t('castellano', 'English').
export const EN = document.documentElement.lang === 'en';
export const t = <T>(es: T, en: T): T => (EN ? en : es);
// las páginas que solo existen en castellano no llevan /en (ver lib/i18n.ts › SOLO_ES)
export const ruta = (href: string): string => (EN && href.startsWith('/') && !href.startsWith('//') && !/^\/en(\/|$|#|\?)/.test(href) && !/^\/(sistema|metodo)(\/|$|#|\?)/.test(href) ? '/en' + href : href);
