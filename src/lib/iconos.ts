// RONDA 152 · Andoni: «una iconografía para usar siempre la misma en toda la web; las estaciones, siempre en fill» → (2.ª) «me gusta esta librería:
// iconoir.com». LA ICONOGRAFÍA DE LA CASA: Iconoir (MIT, iconoir 7.12.1), rejilla de 24, trazo 1,5 con puntas redondas. Reglas:
//   · interfaz (más, cerrar, flechas, check, vídeo)            → `regular` (trazo)
//   · estados encendidos (sonido, reproducir, pausa)           → `solid` de Iconoir
//   · ESTACIONES → siempre rellenas. Iconoir no trae hoja, flor, copo ni sol en `solid`: se rellenan aquí sus mismos dibujos (la licencia MIT lo
//     permite): hoja y sol con relleno; el copo, que es solo líneas, con el trazo a 1,7 (RONDA 156 · Eric: «un poco más finito»; antes 2,1).
//   · LA FLOR es propia (RONDA 156 · Eric: «una flor más bonita y fina»): cinco pétalos de CEREZO (la primavera de savvia), estrechos en la base,
//     anchos hacia la punta y con su muesca, y el centro calado (evenodd). Generada en 24×24 con el mismo trazo redondo de la casa.
//     RONDA 158 · Eric: «parece un molino de viento, más real 🌸» → pétalos ANCHOS y redondeados (casi se tocan), con su muesca en corazón,
//     base corta, y en el centro un botón con cinco estambres entre pétalos.
// La flecha de la casa (lib/flecha.ts) es su nav-arrow dibujado a trazo para poder animarlo.
// Uso: Astro → <Fragment set:html={icono('leaf', 'fill')} /> · JS → el mismo string. Hereda el color (currentColor).
import snowR from 'iconoir/icons/regular/snow-flake.svg?raw';
import sunR from 'iconoir/icons/regular/sun-light.svg?raw';
import soundS from 'iconoir/icons/solid/sound-high.svg?raw';
import soundOffS from 'iconoir/icons/solid/sound-off.svg?raw';
import playS from 'iconoir/icons/solid/play.svg?raw';
import pauseS from 'iconoir/icons/solid/pause.svg?raw';
import videoR from 'iconoir/icons/regular/video-camera.svg?raw';
import arrowUpR from 'iconoir/icons/regular/arrow-up.svg?raw';
import plusR from 'iconoir/icons/regular/plus.svg?raw';
import xR from 'iconoir/icons/regular/xmark.svg?raw';
import upR from 'iconoir/icons/regular/nav-arrow-up.svg?raw';
import downR from 'iconoir/icons/regular/nav-arrow-down.svg?raw';
import leftR from 'iconoir/icons/regular/nav-arrow-left.svg?raw';
import rightR from 'iconoir/icons/regular/nav-arrow-right.svg?raw';
import checkR from 'iconoir/icons/regular/check.svg?raw';
import noteR from 'iconoir/icons/regular/music-double-note.svg?raw'; // RONDA 156 · la radio (Radio.astro): la nota doble (la simple parecía una «d»)
import noteS from 'iconoir/icons/solid/music-note.svg?raw';
import skipS from 'iconoir/icons/solid/skip-next.svg?raw';

// las estaciones, rellenas a partir del dibujo de Iconoir

const relleno = (s: string) => s.replace(/<path /g, '<path fill="currentColor" ');
const grueso = (s: string) => s.replace(/stroke-width="1\.5"/, 'stroke-width="1.7"');
const SVG: Record<string, string> = {
  // la hoja rellena conserva su NERVIO: el cuerpo, relleno, lleva calado el nervio (evenodd) y el rabillo sigue a trazo
  'leaf:fill': `<svg viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" fill-rule="evenodd" d="M19.1297 4.24224L19.7243 10.4167C20.0984 14.3026 17.1849 17.7626 13.2989 18.1367C9.486 18.5039 6.03191 15.7168 5.66477 11.9039C5.29763 8.09099 8.09098 4.70237 11.9039 4.33523L18.475 3.70251C18.8048 3.67074 19.098 3.91239 19.1297 4.24224Z M9.56 15.78L16.06 7.98L15.14 7.22L8.64 15.02Z"/><path d="M19.1297 4.24224L19.7243 10.4167C20.0984 14.3026 17.1849 17.7626 13.2989 18.1367C9.486 18.5039 6.03191 15.7168 5.66477 11.9039C5.29763 8.09099 8.09098 4.70237 11.9039 4.33523L18.475 3.70251C18.8048 3.67074 19.098 3.91239 19.1297 4.24224Z" stroke="currentColor" stroke-linejoin="round"/><path d="M7 21C7 21 7.3 18.3 9.1 15.4" stroke="currentColor" stroke-linecap="round"/></svg>`, 'flower:fill': `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M11.15 9.7 C9.4 8.4 7.7 6.4 7.9 4.1 C8.1 2.1 9.4 0.7 10.8 1.2 C11.5 1.4 11.7 1.8 12 2.25 C12.3 1.8 12.5 1.4 13.2 1.2 C14.6 0.7 15.9 2.1 16.1 4.1 C16.3 6.4 14.6 8.4 12.85 9.7Z M13.92 10.48 C14.62 8.41 16 6.18 18.25 5.66 C20.21 5.23 21.94 6.04 21.9 7.52 C21.93 8.25 21.61 8.56 21.27 8.99 C21.79 9.13 22.24 9.2 22.64 9.8 C23.55 10.98 22.62 12.65 20.78 13.46 C18.65 14.36 16.23 13.36 14.45 12.1Z M14.04 13.36 C16.22 13.38 18.77 14 19.96 15.98 C20.97 17.72 20.75 19.61 19.32 20.03 C18.64 20.28 18.24 20.08 17.73 19.89 C17.75 20.43 17.83 20.87 17.38 21.44 C16.54 22.67 14.66 22.3 13.33 20.8 C11.81 19.06 12.01 16.44 12.66 14.36Z M11.34 14.36 C11.99 16.44 12.19 19.06 10.67 20.8 C9.34 22.3 7.46 22.67 6.62 21.44 C6.17 20.87 6.25 20.43 6.27 19.89 C5.76 20.08 5.36 20.28 4.68 20.03 C3.25 19.61 3.03 17.72 4.04 15.98 C5.23 14 7.78 13.38 9.96 13.36Z M9.55 12.1 C7.77 13.36 5.35 14.36 3.22 13.46 C1.38 12.65 0.45 10.98 1.36 9.8 C1.76 9.2 2.21 9.13 2.73 8.99 C2.39 8.56 2.07 8.25 2.1 7.52 C2.06 6.04 3.79 5.23 5.75 5.66 C8 6.18 9.38 8.41 10.08 10.48Z M13.3 12a1.3 1.3 0 1 0 -2.6 0a1.3 1.3 0 1 0 2.6 0Z M14.15 9.61a0.42 0.42 0 1 0 -0.84 0a0.42 0.42 0 1 0 0.84 0Z M15.23 12.91a0.42 0.42 0 1 0 -0.84 0a0.42 0.42 0 1 0 0.84 0Z M12.42 14.95a0.42 0.42 0 1 0 -0.84 0a0.42 0.42 0 1 0 0.84 0Z M9.61 12.91a0.42 0.42 0 1 0 -0.84 0a0.42 0.42 0 1 0 0.84 0Z M10.69 9.61a0.42 0.42 0 1 0 -0.84 0a0.42 0.42 0 1 0 0.84 0Z"/></svg>`, 'snowflake:fill': grueso(snowR), 'sun:fill': relleno(sunR),
  'speaker-high:fill': soundS, 'speaker-slash:fill': soundOffS, 'play:fill': playS, 'pause:fill': pauseS,
  'video-camera:fill': videoR, 'arrow-up:fill': arrowUpR,
  'plus:regular': plusR, 'x:regular': xR, 'caret-up:regular': upR, 'caret-down:regular': downR,
  'caret-left:regular': leftR, 'caret-right:regular': rightR, 'check:regular': checkR,
  'music-note:regular': noteR, 'music-note:fill': noteS, 'skip-next:fill': skipS,
};

export type NombreIcono = 'leaf' | 'snowflake' | 'flower' | 'sun' | 'speaker-high' | 'speaker-slash' | 'play' | 'pause' | 'video-camera' | 'arrow-up' | 'plus' | 'x' | 'caret-up' | 'caret-down' | 'caret-left' | 'caret-right' | 'check' | 'music-note' | 'skip-next';

/** El <svg> de Iconoir con su clase (`ico`), sin el tamaño fijo (lo pone el CSS) y aria-hidden. */
export function icono(nombre: NombreIcono, peso: 'fill' | 'regular' = 'regular', clase = ''): string {
  const s = SVG[`${nombre}:${peso}`] ?? SVG[`${nombre}:${peso === 'fill' ? 'regular' : 'fill'}`];
  if (!s) throw new Error(`Icono sin importar: ${nombre} (${peso})`);
  // los sólidos de Iconoir traen un clipPath con id fijo (`clip0_…`): repetido en la página, alguno dejaba de verse (el altavoz silenciado) → fuera
  return s.replace(/\s(width|height)="24"/g, '').replace(/\sclip-path="url\(#[^)]*\)"/g, '').replace(/<defs>[\s\S]*?<\/defs>/g, '').replace('<svg ', `<svg class="${['ico', clase].filter(Boolean).join(' ')}" aria-hidden="true" focusable="false" `);
}

/** Los iconos de las cuatro estaciones (orden de estacion.ts: otoño, invierno, primavera, verano), siempre rellenos. */
export const ICONO_ESTACION = { otono: 'leaf', invierno: 'snowflake', primavera: 'flower', verano: 'sun' } as const;
