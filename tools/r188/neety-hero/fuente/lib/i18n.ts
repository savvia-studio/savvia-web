/**
 * i18n de la web (desde 2026-08-27). Dos idiomas, dos árboles de rutas:
 *
 *   es → raíz            /plataforma, /casos-de-uso/<slug>, /blog…
 *   en → prefijo /en     /en/platform, /en/use-cases/<slug>, /en/blog…
 *
 * Cada árbol es un route group de Next con su PROPIO layout raíz (app/(es) y
 * app/(en)/en) — así el <html lang> y las meta salen bien en el export estático,
 * sin middleware de Next (que el export no admite). Cambiar de idioma es una carga
 * completa de página (los root layouts no comparten árbol de React): lo hace el
 * LanguageSwitcher del footer con window.location.
 *
 * El COPY vive junto a cada sección en objetos `{ es: …, en: … }` (helper `copy`),
 * y las secciones reciben `lang` por props desde la página (server) o lo leen de
 * `useLang()` (client, lib/i18n-client.tsx). Los datos de casos de uso y eventos
 * (components/<área>/data.ts) exponen `getX(lang)`; el blog y el equipo salen de Sanity
 * por idioma (documento `post` con campo `language`). Ver docs/decisiones.md
 * 2026-08-27 · i18n.
 *
 * Este módulo NO lleva "use client": lo importan páginas y componentes de servidor.
 */

import type { Metadata } from "next";

export type Lang = "es" | "en";

export const LANGS: readonly Lang[] = ["es", "en"] as const;
export const DEFAULT_LANG: Lang = "es";

export const isLang = (x: unknown): x is Lang => x === "es" || x === "en";

/** Nombre de cada idioma EN SU PROPIO idioma (etiqueta del selector). */
export const LANG_LABEL: Record<Lang, string> = { es: "Español", en: "English" };

/** Locale BCP-47 para Intl y para og:locale. */
export const LOCALE: Record<Lang, string> = { es: "es-ES", en: "en-US" };
export const OG_LOCALE: Record<Lang, string> = { es: "es_ES", en: "en_US" };

/**
 * Declara el copy de una sección en los dos idiomas con la MISMA forma: el tipo
 * se infiere del español y TypeScript exige que el inglés tenga las mismas claves.
 *
 *   const COPY = copy({ es: { title: "Hola" }, en: { title: "Hello" } });
 *   const t = COPY[lang];
 */
export function copy<T>(dict: { es: T; en: T }): Record<Lang, T> {
  return dict;
}

/* ── Rutas ─────────────────────────────────────────────────────────────────── */

/** Prefijo de URL del idioma ("" para español). */
export const langPrefix = (lang: Lang) => (lang === "en" ? "/en" : "");

/**
 * Rutas estáticas por idioma (los slugs traducidos también). Para las dinámicas,
 * el slug por idioma vive en los datos (casos de uso, eventos) o en Sanity (blog).
 */
export const ROUTES = {
  home: { es: "/", en: "/en" },
  /** Home completa aparcada mientras dura el coming soon (noindex). */
  homeDraft: { es: "/home", en: "/en/home" },
  plataforma: { es: "/plataforma", en: "/en/platform" },
  casosDeUso: { es: "/casos-de-uso", en: "/en/use-cases" },
  sobre: { es: "/sobre-neety", en: "/en/about-neety" },
  manifesto: { es: "/manifesto", en: "/en/manifesto" },
  blog: { es: "/blog", en: "/en/blog" },
  eventos: { es: "/eventos", en: "/en/events" },
  /** Academia: centro de aprendizaje (vídeos, guías, plantillas, glosario). */
  academia: { es: "/academia", en: "/en/academy" },
  precios: { es: "/precios", en: "/en/pricing" },
  contacto: { es: "/contacto", en: "/en/contact" },
  /** Flujo multipaso «Solicita una demo» (intro + datos + empresa + agenda + confirmación). */
  solicitarDemo: { es: "/solicitar-demo", en: "/en/request-demo" },
  /** Librería / sistema de diseño (oculta, noindex; bilingüe desde 2026-09-08). */
  library: { es: "/library", en: "/en/library" },
  /** Páginas legales (textos del despacho, nov/dic 2025). Indexables y presentes en
      PRODUCCIÓN aunque el resto de la web siga en coming soon (Google/Stripe piden URL). */
  avisoLegal: { es: "/aviso-legal", en: "/en/legal-notice" },
  privacidad: { es: "/politica-de-privacidad", en: "/en/privacy-policy" },
  cookies: { es: "/politica-de-cookies", en: "/en/cookie-policy" },
  terminos: { es: "/terminos-y-condiciones", en: "/en/terms-and-conditions" },
} as const satisfies Record<string, Record<Lang, string>>;

export type RouteKey = keyof typeof ROUTES;

/** Ruta estática en un idioma; con `slug` cuelga una ficha: `route("blog", "en", "x")`. */
export function route(key: RouteKey, lang: Lang, slug?: string): string {
  const base = ROUTES[key][lang];
  return slug ? `${base}/${slug}` : base;
}

/** Idioma al que pertenece un pathname (`/en/...` → en; todo lo demás → es). */
export function langFromPath(pathname: string): Lang {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "es";
}

/**
 * `alternates.languages` de la metadata de Next para una página con las dos
 * versiones: pinta los <link rel="alternate" hreflang> (SEO) y es lo que lee el
 * LanguageSwitcher para saltar a la versión equivalente de la página actual.
 * `x-default` = español (idioma raíz del dominio).
 */
export function alternates(paths: Record<Lang, string>, current: Lang) {
  return {
    canonical: paths[current],
    languages: { es: paths.es, en: paths.en, "x-default": paths.es },
  };
}

/** Cookie que recuerda la elección explícita del visitante (la lee functions/_middleware.ts). */
export const LANG_COOKIE = "neety-lang";

/* ── SEO: metadata compartida y Open Graph por página ──────────────────────── */

/** Dominio canónico (metadataBase, og:url, JSON-LD). Staging sirve el mismo build. */
export const SITE_URL = "https://neety.com";

/** Título y descripción de la web (root layout, home y fallback del resto). */
export const SITE_META = copy({
  es: {
    title: "Neety — Detecta a quién vender, cuándo hacerlo y qué acción tomar",
    description:
      "Neety te dice qué cuentas importan hoy, por qué y qué debería hacer tu equipo con ellas.",
  },
  en: {
    title: "Neety — Know who to sell to, when, and what to do next",
    description:
      "Neety tells you which accounts matter today, why, and what your team should do about them.",
  },
});

export type OgImage = { url: string; width?: number; height?: number; alt?: string };

/** og:image por defecto: app/opengraph-image.jpg (Next la sirve en /opengraph-image.jpg).
    Hay que declararla a mano: en cuanto una página define su `openGraph`, Next deja de
    heredar la imagen por convención de archivo del root layout (comprobado en el export). */
const DEFAULT_OG_IMAGE: Record<Lang, OgImage> = {
  es: { url: "/opengraph-image.jpg", width: 1200, height: 765, alt: SITE_META.es.title },
  en: { url: "/opengraph-image.jpg", width: 1200, height: 765, alt: SITE_META.en.title },
};

/**
 * Completa la metadata de una página con sus propios `openGraph` y `twitter`.
 *
 * Next NO mezcla el `title`/`description` de la página con el `openGraph` del root
 * layout: sin esto, al compartir /plataforma en LinkedIn o WhatsApp salía el titular
 * y el enlace de la home (detectado 2026-09-11). Aquí og:title/description/url se
 * derivan de lo que la página ya declara (title, description y el canonical de
 * `alternates()`); sin `image` va la de marca (`app/opengraph-image.jpg`). Con `publishedTime`
 * el og:type pasa a `article` (fichas de blog).
 *
 *   return withOpenGraph({ title, description, alternates: alternates(ROUTES.x, lang) }, lang);
 */
export function withOpenGraph(
  meta: Metadata,
  lang: Lang,
  opts: { image?: OgImage; publishedTime?: string; authors?: string[] } = {},
): Metadata {
  const title = typeof meta.title === "string" ? meta.title : SITE_META[lang].title;
  const description = meta.description ?? SITE_META[lang].description;
  const canonical = meta.alternates?.canonical;
  const url = typeof canonical === "string" ? canonical : undefined;
  const { publishedTime, authors } = opts;
  const image = opts.image ?? DEFAULT_OG_IMAGE[lang];
  return {
    ...meta,
    openGraph: {
      siteName: "Neety",
      locale: OG_LOCALE[lang],
      url,
      title,
      description,
      images: [image],
      ...(publishedTime ? { type: "article", publishedTime, authors } : { type: "website" }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
}
