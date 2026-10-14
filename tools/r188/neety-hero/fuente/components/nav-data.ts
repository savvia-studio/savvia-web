/**
 * Contenido de la navegación (Navbar, MobileMenu) en los dos idiomas. Se separa de
 * Navbar.tsx para que el copy quede en un sitio y los componentes solo pinten.
 * Los hrefs se calculan por idioma con lib/i18n.ts (rutas estáticas) y
 * casos-de-uso/slugs.ts (slugs traducidos). "#" = página aún sin destino real.
 */
import {
  GlobeHemisphereEast,
  Subtitles,
  Target,
  ChartBar,
  Chats,
  Broadcast,
  Bookmarks,
  GraduationCap,
  Calendar,
  Users,
  Scroll,
  Envelope,
  type Icon,
  type IconWeight,
} from "@phosphor-icons/react";
import { ROUTES, copy, type Lang } from "@/lib/i18n";
import { useCaseHref } from "./casos-de-uso/slugs";

export type Card = { icon: Icon; title: string; desc: string; href: string };
export type Featured = { image: string; title: string; desc: string; href: string };
export type Dropdown =
  | { kind: "grid"; columns: Card[][]; iconWeight?: IconWeight }
  | { kind: "featured"; items: Card[]; featured: Featured; iconWeight?: IconWeight }
  | { kind: "list"; items: Card[]; iconWeight?: IconWeight };
export type NavItem = { label: string; href?: string; dropdown?: Dropdown };

/* Casos de uso — Figma node 14510:3074 "usecases_open" (grid 2×3).
   Recursos    — Figma node 14510:3382 "Nav_bar-open" (lista de 3 + card destacada).
   Compañía    — Figma node 14510:3680 "Nav_bar-open" (lista simple de 3, sin destacada). */
const COPY = copy({
  es: {
    plataforma: "Plataforma",
    casos: "Casos de uso",
    recursos: "Recursos",
    compania: "Compañía",
    precios: "Precios",
    login: "Log in",
    demo: "Solicitar demo",
    logoAria: "Neety — inicio",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    menu: "Menú",
    back: "Atrás",
    usecases: [
      [
        { title: "Internacionalización B2B", desc: "Encuentra cuentas en nuevos mercados." },
        { title: "Preparar ferias B2B", desc: "Prepara reuniones con más contexto." },
        { title: "Priorizar cuentas comerciales", desc: "Enfoca ventas donde hay potencial." },
      ],
      [
        { title: "Detectar intención comercial", desc: "Detecta cuentas que empiezan a moverse." },
        { title: "Reactivar oportunidades dormidas", desc: "Recupera conversaciones en el momento adecuado." },
        { title: "Marketing ventas B2B", desc: "Convierte señales en acciones comerciales." },
      ],
    ],
    resources: [
      { title: "Blog", desc: "Ideas y tendencias sobre venta B2B." },
      { title: "Academia", desc: "Guías y playbooks para vender mejor." },
      { title: "Eventos", desc: "Webinars, ferias y sesiones con Neety." },
    ],
    featured: {
      title: "Webinar · Venta B2B con señales reales",
      desc: "Cómo detectar empresas con intención, priorizar cuentas y activar mejores oportunidades.",
    },
    company: [
      { title: "Sobre Neety", desc: "Conoce nuestra visión, equipo y forma de entender la venta B2B." },
      { title: "Manifesto", desc: "Nuestra visión sobre cómo Neety puede ayudar a los equipos comerciales." },
      { title: "Contacto", desc: "Habla con nosotros para resolver dudas o valorar cómo podemos ayudarte." },
    ],
  },
  en: {
    plataforma: "Platform",
    casos: "Use cases",
    recursos: "Resources",
    compania: "Company",
    precios: "Pricing",
    login: "Log in",
    demo: "Request a demo",
    logoAria: "Neety — home",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    menu: "Menu",
    back: "Back",
    usecases: [
      [
        { title: "B2B internationalization", desc: "Find accounts in new markets." },
        { title: "Preparing B2B trade fairs", desc: "Walk into meetings with more context." },
        { title: "Prioritizing sales accounts", desc: "Focus sales where the potential is." },
      ],
      [
        { title: "Detecting buying intent", desc: "Spot accounts that are starting to move." },
        { title: "Reactivating dormant opportunities", desc: "Pick conversations back up at the right moment." },
        { title: "B2B marketing & sales", desc: "Turn signals into sales actions." },
      ],
    ],
    resources: [
      { title: "Blog", desc: "Ideas and trends in B2B sales." },
      { title: "Academy", desc: "Guides and playbooks to sell better." },
      { title: "Events", desc: "Webinars, trade fairs and sessions with Neety." },
    ],
    featured: {
      title: "Webinar · B2B sales with real signals",
      desc: "How to detect companies with intent, prioritize accounts and activate better opportunities.",
    },
    company: [
      { title: "About Neety", desc: "Get to know our vision, our team and how we understand B2B sales." },
      { title: "Manifesto", desc: "Our view on how Neety can help sales teams." },
      { title: "Contact", desc: "Talk to us to clear up questions or see how we can help." },
    ],
  },
});

const USECASE_ICONS: [Icon, Icon, Icon][] = [
  [GlobeHemisphereEast, Subtitles, Target],
  [ChartBar, Chats, Broadcast],
];
const USECASE_KEYS = [
  ["internacionalizacion", "ferias", "priorizacion"],
  ["intencion", "reactivacion", "marketing"],
] as const;

export function navCopy(lang: Lang) {
  return COPY[lang];
}

/**
 * @param featured Card destacada de «Recursos» elegida en Sanity (useNavFeatured()).
 *   Sin ella, la card por defecto del frame enlazando al listado de eventos.
 */
export function navItems(lang: Lang, featured?: Featured | null): NavItem[] {
  const t = COPY[lang];
  const usecases: Card[][] = t.usecases.map((col, c) =>
    col.map((card, r) => ({
      ...card,
      icon: USECASE_ICONS[c][r],
      href: useCaseHref(USECASE_KEYS[c][r], lang),
    })),
  );
  const resources: Card[] = [
    { ...t.resources[0], icon: Bookmarks, href: ROUTES.blog[lang] },
    { ...t.resources[1], icon: GraduationCap, href: ROUTES.academia[lang] },
    { ...t.resources[2], icon: Calendar, href: ROUTES.eventos[lang] },
  ];
  const company: Card[] = [
    { ...t.company[0], icon: Users, href: ROUTES.sobre[lang] },
    { ...t.company[1], icon: Scroll, href: ROUTES.manifesto[lang] },
    { ...t.company[2], icon: Envelope, href: ROUTES.contacto[lang] },
  ];
  return [
    { label: t.plataforma, href: ROUTES.plataforma[lang] },
    { label: t.casos, dropdown: { kind: "grid", columns: usecases } },
    {
      label: t.recursos,
      dropdown: {
        kind: "featured",
        iconWeight: "fill",
        items: resources,
        featured: featured ?? {
          ...t.featured,
          image: "/assets/nav-recursos-webinar.jpg",
          href: ROUTES.eventos[lang],
        },
      },
    },
    { label: t.compania, dropdown: { kind: "list", iconWeight: "fill", items: company } },
    { label: t.precios, href: ROUTES.precios[lang] },
  ];
}

export const navDropdowns = (lang: Lang, featured?: Featured | null) =>
  navItems(lang, featured).filter((i): i is NavItem & { dropdown: Dropdown } => Boolean(i.dropdown));
