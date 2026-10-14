"use client";

/**
 * Idioma actual para componentes CLIENTE (Navbar, MobileMenu, LanguageSwitcher…).
 * Lo provee el layout raíz de cada árbol (app/(es)/layout.tsx → "es",
 * app/(en)/en/layout.tsx → "en"). Los componentes de servidor no pueden leer
 * contexto: reciben `lang` por props desde la página. Ver lib/i18n.ts.
 */
import { createContext, useContext, type ReactNode } from "react";
import { DEFAULT_LANG, type Lang } from "./i18n";

const LangContext = createContext<Lang>(DEFAULT_LANG);

/**
 * Card destacada del desplegable «Recursos» (Navbar y MobileMenu). La elige el
 * equipo en Sanity (`blogSettings.navFeatured` → un evento); RootShell la lee en
 * build y la baja por contexto porque la nav es cliente. `null` = usar la card por
 * defecto de components/nav-data.ts.
 */
export type NavFeatured = { image: string; title: string; desc: string; href: string };
const NavFeaturedContext = createContext<NavFeatured | null>(null);

export function LangProvider({
  lang,
  navFeatured = null,
  children,
}: {
  lang: Lang;
  navFeatured?: NavFeatured | null;
  children: ReactNode;
}) {
  return (
    <LangContext.Provider value={lang}>
      <NavFeaturedContext.Provider value={navFeatured}>{children}</NavFeaturedContext.Provider>
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
export const useNavFeatured = () => useContext(NavFeaturedContext);
