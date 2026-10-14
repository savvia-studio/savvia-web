/**
 * Accesos a la plataforma (feedback 31-ago, URLs que pasó el cliente):
 * «Login nuevo» = app.neety.com, «Login clásico» = app.neety.io.
 * Los usan Navbar y MobileMenu (cliente) y Footer (servidor) — por eso vive en un
 * módulo propio y no en nav-data.ts, que arrastra los iconos Phosphor (solo cliente).
 * El coming soon lleva su propia pareja de logins (sin /auth/sign-in), aparte.
 */
export const LOGIN_URLS = {
  nuevo: "https://app.neety.com/auth/sign-in",
  clasico: "https://app.neety.io/auth/sign-in",
} as const;
