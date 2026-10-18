// Idioma en el navegador (los <script> de Astro no ven el frontmatter): lo manda <html lang>. t('castellano', 'English').
export const EN = document.documentElement.lang === 'en';
export const t = <T>(es: T, en: T): T => (EN ? en : es);
export const ruta = (href: string): string => (EN && href.startsWith('/') && !href.startsWith('//') && !/^\/en(\/|$|#|\?)/.test(href) ? '/en' + href : href);
