// Búsqueda local de la pregunta libre entre las fichas escritas (respaldo de /api/preguntar). Por idioma: palabras vacías y raíz.
import { EN } from './i18n';

export const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ ]/g, ' ');
const VACIAS_ES = 'el la los las un una unos unas de del al a en y o que con por para mi tu su me te se es son como cuando donde cual cuales hay web pagina sitio si no mas muy ya lo le les nos vosotros';
const VACIAS_EN = 'the a an is are was were be been do does did you your yours i me my we us our it its of to in on at for and or but with about can could would should will shall may might how what when which there this that these those not no yes if so as by from any some than then them they their he she his her am have has had get got just very more most also too into out up down over please website web site page pages want like need tell';
const VACIAS = new Set((EN ? VACIAS_EN : VACIAS_ES).split(' '));
// en inglés se comparan raíces sencillas (plurales, -ing, -ed); en castellano, la palabra tal cual
const raiz = (w: string) => (EN && w.length > 3 ? w.replace(/(ing|ed|es|s)$/, '') : w);

export const palabrasDe = (q: string) => norm(q).split(/\s+/).filter((w) => w.length > (EN ? 1 : 2) && !VACIAS.has(w));

// índice de la ficha que mejor encaja (exacta = 2 puntos; misma raíz = 1), o -1
export const mejorFicha = (q: string, fichas: { claves: string[] | Set<string> }[]): number => {
  const ws = palabrasDe(q).map(raiz);
  let mejor = -1, pts = 0;
  fichas.forEach((f, i) => {
    const cl = new Set([...f.claves].map(raiz));
    const p = ws.reduce((s, w) => s + (cl.has(w) ? 2 : [...cl].some((c) => c.length >= 5 && w.length >= 5 && c.slice(0, 4) === w.slice(0, 4)) ? 1 : 0), 0);
    if (p > pts) { pts = p; mejor = i; }
  });
  return mejor;
};
