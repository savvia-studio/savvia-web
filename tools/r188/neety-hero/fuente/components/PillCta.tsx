import type React from "react";
import styles from "./PillCta.module.css";
import { TransitionLink } from "./PageTransition";

type Props = {
  href?: string;
  children?: string;
  className?: string;
  onClick?: (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ) => void;
  /** Con `type` se renderiza un <button> (submit de formularios: el «Siguiente» de
      /solicitar-demo) con la misma animación; `href` se ignora. */
  type?: "button" | "submit";
  disabled?: boolean;
  /** Sin punto ni flecha: solo el label que rueda («Siguiente» del formulario de demo). */
  noDot?: boolean;
  /** Full-width pill (used in the mobile menu CTA). */
  block?: boolean;
  /** Tamaño grande (py-3 px-6, text-base) también en móvil — CTA del footer. */
  big?: boolean;
  /** primary = relleno plum (Solicitar demo); outline = borde plum (Saber más). */
  variant?: "primary" | "outline";
  /** Pastilla compacta por debajo de md (cards estrechas a 2 columnas). */
  compact?: boolean;
  /** Punto anclado al borde derecho de la pastilla (label centrado en el resto). Para
      grupos de botones apilados a mismo ancho: los puntos quedan alineados entre sí. */
  spread?: boolean;
  /** p.ej. "_blank" para enlaces externos (añade rel noopener automáticamente). */
  target?: string;
};

/**
 * Pill CTA compartido. Hover: el label rueda hacia arriba mientras una copia idéntica entra
 * desde abajo, y el punto de la derecha sale mientras entra una flecha en su lugar. El estilo
 * (relleno vs borde, colores) lo decide `variant`; la animación es la misma para ambos.
 */
export default function PillCta({
  href = "#",
  children = "Solicitar demo",
  className,
  onClick,
  block,
  big,
  variant = "primary",
  compact,
  spread,
  target,
  type,
  disabled,
  noDot,
}: Props) {
  const cls = `${styles.btn}${variant === "outline" ? ` ${styles.outline}` : ""}${
    block ? ` ${styles.block}` : ""
  }${big ? ` ${styles.big}` : ""}${compact ? ` ${styles.compact}` : ""}${
    spread ? ` ${styles.spread}` : ""
  }${className ? ` ${className}` : ""}`;
  const inner = (
    <>
      <span className={styles.bg} aria-hidden />
      <span className={styles.inner} data-text={children}>
        <span className={styles.text}>{children}</span>
        {!noDot && (
          <span className={styles.dotWrap} aria-hidden>
            <span className={styles.dot} />
            <svg className={styles.arrow} viewBox="0 0 16 16" fill="none">
              <path
                d="M2.5 8h10M8.5 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        )}
      </span>
    </>
  );
  if (type) {
    return (
      <button type={type} disabled={disabled} onClick={onClick} className={cls}>
        {inner}
      </button>
    );
  }
  return (
    /* TransitionLink: cortina de transición para hrefs internos ("/…"); con "#",
       mailto o externos se comporta como un <a> normal. */
    <TransitionLink
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      onClick={onClick}
      className={cls}
    >
      {inner}
    </TransitionLink>
  );
}
