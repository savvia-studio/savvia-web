// El correo no abre el programa de correo: se COPIA, para pegarlo donde cada uno lea el suyo (Gmail, Outlook…).
// Cualquier enlace con `data-copiar="<dirección>"` copia al hacer clic y avisa un momento con su propio texto.
// Sin JS, o si el navegador no deja copiar, el enlace sigue siendo un `mailto:` normal.
const AVISO = document.documentElement.lang?.startsWith('en') ? 'Email copied' : 'Email copiado';

document.addEventListener('click', async (e) => {
  const a = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[data-copiar]');
  if (!a) return;
  const direccion = a.dataset.copiar;
  if (!direccion) return;
  e.preventDefault();
  try {
    await navigator.clipboard.writeText(direccion);
  } catch {
    location.href = a.href; // sin portapapeles: el mailto de siempre
    return;
  }
  if (a.dataset.copiado) return;
  const texto = a.textContent;
  a.dataset.copiado = '1';
  a.textContent = AVISO;
  a.setAttribute('aria-live', 'polite');
  setTimeout(() => { a.textContent = texto; delete a.dataset.copiado; }, 1800);
});
