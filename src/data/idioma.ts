// Un solo punto de entrada para el copy según el idioma: const { hero } = home(lang)
import * as homeEs from './home';
import * as homeEn from './home.en';
import { manifiesto as manifiestoEs } from './manifiesto';
import { manifiesto as manifiestoEn } from './manifiesto.en';
import preguntasEs from './preguntas.json';
import preguntasEn from './preguntas.en.json';
import { proyectos, type Proyecto } from './proyectos';
import { proyectosEn, SERVICIOS_EN } from './proyectos.en';
import type { Lang } from '../lib/i18n';

export const home = (lang: Lang): typeof homeEs => (lang === 'en' ? homeEn : homeEs);
export const manifiestoDe = (lang: Lang) => (lang === 'en' ? manifiestoEn : manifiestoEs);
export const fichasDe = (lang: Lang) => (lang === 'en' ? preguntasEn : preguntasEs);
// Los proyectos en el idioma de la página (los campos sin traducción caen al castellano). `servicio`: el nombre de un servicio en ese idioma.
export const proyectosDe = (lang: Lang): Proyecto[] => (lang === 'en' ? proyectos.map((p) => ({ ...p, ...(proyectosEn[p.slug] ?? {}) })) : proyectos);
export const proyectoDe = (lang: Lang, slug: string) => proyectosDe(lang).find((p) => p.slug === slug);
export const servicio = (lang: Lang, s: string) => (lang === 'en' ? SERVICIOS_EN[s] ?? s : s);
