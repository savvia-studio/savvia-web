// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://savvia.studio',
  devToolbar: { enabled: false },
  fonts: [
    {
      // Titulares. OJO: es la versión de PRUEBA de Klim (sin acentos, ñ, ¿ ¡).
      // Al comprar la licencia: sustituir el archivo y quitar "TRIAL" del nombre.
      name: 'Family',
      cssVariable: '--font-family-display',
      provider: fontProviders.local(),
      fallbacks: ['Georgia', 'serif'],
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/family-TRIAL-vf-roman.woff2'],
            weight: '300 900',
            style: 'normal',
          },
        ],
      },
    },
    {
      // RONDA 39 · «quiero probar como sans la Areal que te paso, también la probamos como mono» (ABC Areal, Dinamo; licencia en
      // tools/fuentes-areal/). Variable: peso 400–700. Sustituye a Manrope en lectura e interfaz. Manrope y Plex siguen declaradas para
      // comparar con ?tipo=antes (el navegador solo descarga la familia que se usa).
      name: 'ABC Areal',
      cssVariable: '--font-areal',
      provider: fontProviders.local(),
      fallbacks: ['system-ui', 'sans-serif'],
      options: {
        variants: [{ src: ['./src/assets/fonts/abc-areal-variable.woff2'], weight: '400 700', style: 'normal' }],
      },
    },
    {
      name: 'ABC Areal Mono',
      cssVariable: '--font-areal-mono',
      provider: fontProviders.local(),
      fallbacks: ['ui-monospace', 'monospace'],
      options: {
        variants: [
          { src: ['./src/assets/fonts/abc-areal-mono-regular.woff2'], weight: 400, style: 'normal' },
          { src: ['./src/assets/fonts/abc-areal-mono-medium.woff2'], weight: 500, style: 'normal' },
        ],
      },
    },
    {
      // Textos (hasta la ronda 38)
      name: 'Manrope',
      cssVariable: '--font-manrope',
      provider: fontProviders.google(),
      weights: [400, 500, 600],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
    {
      // Detalles (ronda 17: IBM Plex Mono sustituye a Geist Mono)
      name: 'IBM Plex Mono',
      cssVariable: '--font-plex-mono',
      provider: fontProviders.google(),
      weights: [400, 500],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['ui-monospace', 'monospace'],
    },
    {
      // RONDA 83 · la ENTRADA de concierto de la partitura sigue la identidad de NEETY (su librería: titulares en Bricolage Grotesque). Solo se descarga
      // donde se usa (la entrada). OFL (Google Fonts).
      name: 'Bricolage Grotesque',
      cssVariable: '--font-bricolage',
      provider: fontProviders.google(),
      weights: [500, 700, 800],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
    {
      // RONDA 92 · el texto de NEETY en la partitura (su librería: cuerpo en Switzer, de Fontshare; licencia ITF Free Font, uso comercial libre).
      // Solo se descarga donde se usa (el ensayo de su web dentro de la partitura)
      name: 'Switzer',
      cssVariable: '--font-switzer',
      provider: fontProviders.fontshare(),
      weights: [400, 500],
      styles: ['normal'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
