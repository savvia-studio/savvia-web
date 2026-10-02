// Marca de IA en el copy: «[[IA]]» → <span class="ia">IA</span>.
// El texto sale de src/data (nuestro); aun así se escapa antes de insertar la marca.
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
export const rich = (s: string) => esc(s).replace(/\[\[(.+?)\]\]/g, '<span class="ia">$1</span>');
export const plain = (s: string) => s.replace(/\[\[(.+?)\]\]/g, '$1');
// RONDA 83 · «utilizar nuestro isotipo en algunas palabras que contengan V, pero con sentido»: «{{v}}» en el copy → la v se dibuja con el ISOTIPO de
// savvia (la letra sigue ahí para lectores de pantalla y para copiar; se pinta transparente y encima va el isotipo).
// RONDA 85 · «el isotipo solo lo usamos en v que sean de TITULARES y con sentido»: fuera de «voz» y «Evita»; queda «Vivaldi» (pedido: como V mayúscula).
export const isoV = (s: string) => rich(s).replace(/\{\{([vV])\}\}/g, '<span class="v-iso">$1</span>');
export const sinIso = (s: string) => s.replace(/\{\{([vV])\}\}/g, '$1');
