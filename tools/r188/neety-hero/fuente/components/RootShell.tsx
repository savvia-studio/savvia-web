import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, Roboto_Mono } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import AgentationToolbar from "@/components/AgentationToolbar";
import Loader from "@/components/Loader";
import { PageTransitionProvider } from "@/components/PageTransition";
import { LangProvider, type NavFeatured } from "@/lib/i18n-client";
import { getNavFeatured } from "@/components/eventos/data";
import JsonLd, { ORGANIZATION } from "@/components/JsonLd";
import { ROUTES, SITE_META, SITE_URL, alternates, withOpenGraph, type Lang } from "@/lib/i18n";

/* Layout raíz COMPARTIDO por los dos árboles de idioma (app/(es)/layout.tsx y
   app/(en)/en/layout.tsx): fuentes, GTM, loader, transición de página y toolbar de
   agentation. Cada árbol es un root layout distinto de Next (route groups) para que
   el <html lang> sea el correcto en el export estático; lo único que cambia entre
   ambos es `lang`. Ver lib/i18n.ts. */

// Switzer isn't on Google Fonts. Self-hosted (woff2 from Fontshare) via next/font so it
// loads from our origin with no render-blocking cross-origin @import.
const switzer = localFont({
  src: [
    { path: "../app/fonts/switzer-400.woff2", weight: "400", style: "normal" },
    { path: "../app/fonts/switzer-500.woff2", weight: "500", style: "normal" },
    { path: "../app/fonts/switzer-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-switzer",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bricolage",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-roboto-mono",
  display: "swap",
});

/* Favicon y og:image van por convención de archivos de App Router: app/favicon.ico,
   app/icon.png, app/apple-icon.png y app/opengraph-image.jpg (+ .alt.txt). */
export function rootMetadata(lang: Lang): Metadata {
  const t = SITE_META[lang];
  return withOpenGraph(
    {
      // Dominio canónico desde el lanzamiento en la cuenta del cliente (2026-08-11).
      // El staging neety.treseiscero.app sirve el mismo build: sus og:url/canonical apuntan
      // aquí a propósito, para que Google no lo trate como duplicado.
      metadataBase: new URL(SITE_URL),
      title: t.title,
      description: t.description,
      alternates: alternates(ROUTES.home, lang),
    },
    lang,
  );
}

/* Card destacada de «Recursos» (nav): la elige el equipo en Sanity. Se lee aquí (el
   layout es servidor; la nav es cliente y la recibe por contexto). Si el CMS no
   responde, la nav usa su card por defecto en vez de tumbar todas las páginas. */
async function navFeatured(lang: Lang): Promise<NavFeatured | null> {
  try {
    return await getNavFeatured(lang);
  } catch (e) {
    console.warn("[nav] destacado de Recursos no disponible:", e instanceof Error ? e.message : e);
    return null;
  }
}

export default async function RootShell({
  lang,
  children,
}: Readonly<{ lang: Lang; children: React.ReactNode }>) {
  const featured = await navFeatured(lang);
  return (
    <html
      lang={lang}
      className={`${switzer.variable} ${bricolage.variable} ${inter.variable} ${robotoMono.variable}`}
      // El gate del loader añade .intro-seen al <html> antes de hidratar (script inline
      // de abajo): sin esto React avisa de mismatch de className en cada página.
      suppressHydrationWarning
    >
      <body>
        {/* Preconnect a GTM: gtm.js se pide tras la hidratación (afterInteractive, abajo)
            y abrir la conexión (DNS+TCP+TLS) por adelantado ahorra ~350ms medidos con
            Lighthouse (31-ago). React 19 iza este <link> al <head>. */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        {/* Google Tag Manager (GTM-5WB7KCLM, enviado por Unai 2026-08-07). El <Script>
            afterInteractive de más abajo carga gtm.js tras la hidratación (patrón oficial de
            Next para GTM); este noscript es el fallback sin JS. OJO al migrar a la cuenta de
            Cloudflare del cliente: si allí Zaraz también inyecta GTM, quitar uno de los dos
            para no duplicar hits. */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5WB7KCLM"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* Gate del loader: se ejecuta durante el parseo, ANTES de pintar el <Loader/> de
            abajo. En visitas repetidas añade `.intro-seen` (CSS oculta el loader sin flash). */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(sessionStorage.getItem('neety-intro-seen'))document.documentElement.classList.add('intro-seen')}catch(e){}",
          }}
        />
        {/* Sin JS no hay loader (el hero se ve directo). */}
        <noscript>
          <style>{`.loader{display:none!important}`}</style>
        </noscript>
        <Loader />
        <JsonLd data={{ "@context": "https://schema.org", ...ORGANIZATION }} />
        <LangProvider lang={lang} navFeatured={featured}>
          <PageTransitionProvider>{children}</PageTransitionProvider>
        </LangProvider>
        {/* Toolbar de agentation: en dev siempre; en deploys solo si el build se hace
            con NEXT_PUBLIC_AGENTATION=1 (deploy.sh solo la activa en staging con
            NEETY_AGENTATION=1 desde el 12-oct; nunca en prod).
            Sus anotaciones sincronizan contra el MCP local (localhost:4747) de quien mira. */}
        {(process.env.NODE_ENV === "development" ||
          process.env.NEXT_PUBLIC_AGENTATION === "1") && <AgentationToolbar />}
        {/* Google Tag Manager — snippet estándar tal cual lo pasó el cliente. */}
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5WB7KCLM');`,
          }}
        />
      </body>
    </html>
  );
}
