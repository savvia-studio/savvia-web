// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://savvia.studio',
  devToolbar: { enabled: false },
  fonts: [
    {
      // RONDA 152 · Andoni: «la typo, Timeless: Sans para textos de lectura y Grotesk para detalles; luego la serifa». Timeless Free Font License 1.2
      // (tools/fuentes-timeless/LICENSE.pdf): uso web y comercial libre; NO redistribuir ni subir a un repositorio público (el nuestro es privado).
      // Cortes del configurador de timeless.co (enlaces en tools/fuentes-timeless/README-*.txt). Pesos de la Sans: 300 · 420 (regular) · 500 · 537.
      name: 'Timeless Sans',
      cssVariable: '--font-timeless-sans',
      provider: fontProviders.local(),
      fallbacks: ['system-ui', 'sans-serif'],
      options: {
        variants: [
          { src: ['./src/assets/fonts/timeless/TimelessSans-Light.woff2'], weight: 300, style: 'normal' },
          { src: ['./src/assets/fonts/timeless/TimelessSans-Regular.woff2'], weight: 420, style: 'normal' },
          { src: ['./src/assets/fonts/timeless/TimelessSans-Medium.woff2'], weight: 500, style: 'normal' },
          { src: ['./src/assets/fonts/timeless/TimelessSans-W537.woff2'], weight: 537, style: 'normal' },
        ],
      },
    },
    {
      // RONDA 152 · «aquí va la serifa para probar»: Timeless Text (400 · 500) para los titulares, a prueba (?titular=family vuelve a Family)
      name: 'Timeless Text',
      cssVariable: '--font-timeless-text',
      provider: fontProviders.local(),
      fallbacks: ['Georgia', 'serif'],
      options: {
        variants: [
          { src: ['./src/assets/fonts/timeless/TimelessText-Regular.woff2'], weight: 400, style: 'normal' },
          { src: ['./src/assets/fonts/timeless/TimelessText-Medium.woff2'], weight: 500, style: 'normal' },
        ],
      },
    },
    {
      name: 'Timeless Grotesk',
      cssVariable: '--font-timeless-grotesk',
      provider: fontProviders.local(),
      fallbacks: ['system-ui', 'sans-serif'],
      options: { variants: [{ src: ['./src/assets/fonts/timeless/TimelessGrotesk-Light.woff2'], weight: 300, style: 'normal' }] },
    },
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
      // RONDA 155 · la CAPITULAR del Manifiesto (Andoni: «la letra grande de este estilo», una mayúscula caligráfica tipo copperplate). Pinyon Script,
      // OFL (Google Fonts). Solo la capitular la usa y solo se carga en /manifiesto (<Font> en la propia página). Excepción expresa a «sin cursivas».
      name: 'Pinyon Script',
      cssVariable: '--font-capitular',
      provider: fontProviders.google(),
      weights: [400],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['cursive'],
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
