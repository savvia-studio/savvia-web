// RONDA 152 · Andoni: «una iconografía para usar siempre la misma en toda la web; las estaciones, siempre en fill» → (2.ª) «me gusta esta librería:
// iconoir.com». LA ICONOGRAFÍA DE LA CASA: Iconoir (MIT, iconoir 7.12.1), rejilla de 24, trazo 1,5 con puntas redondas. Reglas:
//   · interfaz (más, cerrar, flechas, check, vídeo)            → `regular` (trazo)
//   · estados encendidos (sonido, reproducir, pausa)           → `solid` de Iconoir
//   · ESTACIONES → siempre rellenas. Iconoir no trae hoja, flor, copo ni sol en `solid`: se rellenan aquí sus mismos dibujos (la licencia MIT lo
//     permite): hoja, flor y sol con relleno; el copo, que es solo líneas, con el trazo a 2,1.
// La flecha de la casa (lib/flecha.ts) es su nav-arrow dibujado a trazo para poder animarlo.
// Uso: Astro → <Fragment set:html={icono('leaf', 'fill')} /> · JS → el mismo string. Hereda el color (currentColor).
import flowerR from 'iconoir/icons/regular/flower.svg?raw';
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

// las estaciones, rellenas a partir del dibujo de Iconoir
const relleno = (s: string) => s.replace(/<path /g, '<path fill="currentColor" ');
const grueso = (s: string) => s.replace(/stroke-width="1\.5"/, 'stroke-width="2.1"');

const SVG: Record<string, string> = {
  // la hoja rellena conserva su NERVIO: el cuerpo, relleno, lleva calado el nervio (evenodd) y el rabillo sigue a trazo
  'leaf:fill': `<svg viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" fill-rule="evenodd" d="M19.1297 4.24224L19.7243 10.4167C20.0984 14.3026 17.1849 17.7626 13.2989 18.1367C9.486 18.5039 6.03191 15.7168 5.66477 11.9039C5.29763 8.09099 8.09098 4.70237 11.9039 4.33523L18.475 3.70251C18.8048 3.67074 19.098 3.91239 19.1297 4.24224Z M9.56 15.78L16.06 7.98L15.14 7.22L8.64 15.02Z"/><path d="M19.1297 4.24224L19.7243 10.4167C20.0984 14.3026 17.1849 17.7626 13.2989 18.1367C9.486 18.5039 6.03191 15.7168 5.66477 11.9039C5.29763 8.09099 8.09098 4.70237 11.9039 4.33523L18.475 3.70251C18.8048 3.67074 19.098 3.91239 19.1297 4.24224Z" stroke="currentColor" stroke-linejoin="round"/><path d="M7 21C7 21 7.3 18.3 9.1 15.4" stroke="currentColor" stroke-linecap="round"/></svg>`, 'flower:fill': relleno(flowerR), 'snowflake:fill': grueso(snowR), 'sun:fill': relleno(sunR),
  'speaker-high:fill': soundS, 'speaker-slash:fill': soundOffS, 'play:fill': playS, 'pause:fill': pauseS,
  'video-camera:fill': videoR, 'arrow-up:fill': arrowUpR,
  'plus:regular': plusR, 'x:regular': xR, 'caret-up:regular': upR, 'caret-down:regular': downR,
  'caret-left:regular': leftR, 'caret-right:regular': rightR, 'check:regular': checkR,
};

export type NombreIcono = 'leaf' | 'snowflake' | 'flower' | 'sun' | 'speaker-high' | 'speaker-slash' | 'play' | 'pause' | 'video-camera' | 'arrow-up' | 'plus' | 'x' | 'caret-up' | 'caret-down' | 'caret-left' | 'caret-right' | 'check';

/** El <svg> de Iconoir con su clase (`ico`), sin el tamaño fijo (lo pone el CSS) y aria-hidden. */
export function icono(nombre: NombreIcono, peso: 'fill' | 'regular' = 'regular', clase = ''): string {
  const s = SVG[`${nombre}:${peso}`] ?? SVG[`${nombre}:${peso === 'fill' ? 'regular' : 'fill'}`];
  if (!s) throw new Error(`Icono sin importar: ${nombre} (${peso})`);
  // los sólidos de Iconoir traen un clipPath con id fijo (`clip0_…`): repetido en la página, alguno dejaba de verse (el altavoz silenciado) → fuera
  return s.replace(/\s(width|height)="24"/g, '').replace(/\sclip-path="url\(#[^)]*\)"/g, '').replace(/<defs>[\s\S]*?<\/defs>/g, '').replace('<svg ', `<svg class="${['ico', clase].filter(Boolean).join(' ')}" aria-hidden="true" focusable="false" `);
}

/** Los iconos de las cuatro estaciones (orden de estacion.ts: otoño, invierno, primavera, verano), siempre rellenos. */
export const ICONO_ESTACION = { otono: 'leaf', invierno: 'snowflake', primavera: 'flower', verano: 'sun' } as const;
