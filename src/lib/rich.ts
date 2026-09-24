// Marca de IA en el copy: «[[IA]]» → <span class="ia">IA</span>.
// El texto sale de src/data (nuestro); aun así se escapa antes de insertar la marca.
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
export const rich = (s: string) => esc(s).replace(/\[\[(.+?)\]\]/g, '<span class="ia">$1</span>');
export const plain = (s: string) => s.replace(/\[\[(.+?)\]\]/g, '$1');
