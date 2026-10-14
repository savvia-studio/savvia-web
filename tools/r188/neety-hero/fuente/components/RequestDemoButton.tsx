"use client";

import PillCta from "./PillCta";
import { ROUTES } from "@/lib/i18n";
import { useLang } from "@/lib/i18n-client";

type Props = {
  /** Destino. Sin href (o con "#", herencia de cuando la página no existía) apunta al
      flujo «Solicita una demo» del idioma actual (ROUTES.solicitarDemo). */
  href?: string;
  children?: string;
  className?: string;
  onClick?: () => void;
  /** Full-width pill (used in the mobile menu CTA). */
  block?: boolean;
  /** Tamaño grande también en móvil (CTA del footer). */
  big?: boolean;
};

/** CTA "Solicitar demo" — la variante primary de {@link PillCta}. */
export default function RequestDemoButton({
  href,
  children = "Solicitar demo",
  className,
  onClick,
  block,
  big,
}: Props) {
  const lang = useLang();
  const target = !href || href === "#" ? ROUTES.solicitarDemo[lang] : href;
  return (
    <PillCta
      href={target}
      onClick={onClick}
      block={block}
      big={big}
      className={className}
      variant="primary"
    >
      {children}
    </PillCta>
  );
}
