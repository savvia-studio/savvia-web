// 29/10 · TEXTOS LEGALES (Eric: «el formato tiene que ser como el de neety, editorial»; «podemos llamar savvia CB a la empresa y email hola@savvia.studio»).
// Base: la política de privacidad de la web anterior (treseiscero CB), puesta al día con lo que hace HOY savvia.studio, leído en el código:
// · el chat de preguntas manda la pregunta a api/preguntar.js → OpenRouter → Anthropic; no se guarda. El freno cuenta preguntas por IP y hora en
//   Upstash (la clave caduca a los 3700 s) o en memoria.
// · alojamiento en Vercel. Sin analítica, sin píxeles, sin cookies. Fuentes en el propio servidor.
// · en el navegador solo hay localStorage / sessionStorage de preferencias (tabla de cookies). Si se estrena una clave nueva, va a la tabla.
// FALTA (no se inventa): el NIF de savvia CB, obligatorio en el aviso legal (LSSI art. 10). Cuando llegue, va en `TITULAR`.
// Formato de los bloques: `**negrita**` y `[texto](destino)` dentro del texto. Regla de copy de la casa: sin «;», «:» ni paréntesis.
import type { Lang } from '../lib/i18n';

export type LegalKey = 'aviso' | 'privacidad' | 'cookies';
export type Bloque =
  | { k: 'lead'; t: string }
  | { k: 'p'; t: string }
  | { k: 'h2'; id: string; t: string }
  | { k: 'ul'; items: string[] }
  | { k: 'datos'; filas: [string, string][] }
  | { k: 'tabla'; cab: string[]; filas: string[][] };
export interface DocLegal { titulo: string; descripcion: string; bloques: Bloque[] }

export const LEGAL_RUTA: Record<LegalKey, string> = { aviso: '/aviso-legal', privacidad: '/privacidad', cookies: '/cookies' };
export const LEGAL_KEYS: LegalKey[] = ['aviso', 'privacidad', 'cookies'];
export const VERSION = '2026-10';

const CORREO = '[hola@savvia.studio](mailto:hola@savvia.studio)';
const DOMICILIO = 'Real Compañía Guipuzcoana de Caracas 12, 1.º D, 20011 Donostia-San Sebastián, Gipuzkoa';

const TITULAR: Record<Lang, [string, string][]> = {
  es: [['Titular', 'savvia CB'], ['Domicilio', `${DOMICILIO}, España`], ['Correo', CORREO], ['Web', 'savvia.studio']],
  en: [['Owner', 'savvia CB'], ['Address', `${DOMICILIO}, Spain`], ['Email', CORREO], ['Website', 'savvia.studio']],
};

const ES: Record<LegalKey, DocLegal> = {
  aviso: {
    titulo: 'Aviso legal',
    descripcion: 'Aviso legal de savvia CB. Quién está detrás de savvia.studio y las condiciones para usar la web.',
    bloques: [
      { k: 'lead', t: 'Aquí están los datos de quien está detrás de savvia.studio y las condiciones para usar la web, como pide la Ley 34/2002 de servicios de la sociedad de la información y de comercio electrónico.' },
      { k: 'h2', id: 'titular', t: 'Quiénes somos' },
      { k: 'p', t: 'savvia es el estudio web de Eric y Andoni. Estos son los datos del titular de savvia.studio.' },
      { k: 'datos', filas: TITULAR.es },
      { k: 'h2', id: 'uso', t: 'Uso de la web' },
      { k: 'p', t: 'Puedes navegar por savvia.studio libremente y sin registrarte. Te pedimos que la uses de buena fe y que no hagas nada que pueda dañarla, saturarla o impedir que otras personas la usen.' },
      { k: 'h2', id: 'propiedad', t: 'Propiedad intelectual' },
      { k: 'p', t: 'El diseño, los textos, las ilustraciones, el código y la marca savvia son nuestros o tenemos permiso para usarlos. No puedes copiarlos, reproducirlos ni distribuirlos sin nuestro permiso por escrito.' },
      { k: 'p', t: 'Los proyectos que enseñamos son de sus clientes, y sus marcas y sus webs también. Los mostramos como muestra de nuestro trabajo, con su permiso.' },
      { k: 'h2', id: 'enlaces', t: 'Webs de clientes y enlaces' },
      { k: 'p', t: 'Algunas secciones enseñan las webs reales de nuestros clientes o enlazan a ellas y a otros servicios. No controlamos su contenido ni sus políticas, y cada web responde de lo suyo.' },
      { k: 'h2', id: 'chat', t: 'Las respuestas del chat' },
      { k: 'p', t: 'Las respuestas escritas del chat de preguntas son nuestras. Cuando no tenemos una, contesta una IA con lo que ya hemos escrito sobre savvia, y te lo decimos. Esas respuestas orientan, pero no son una oferta ni un compromiso. Lo que acordemos contigo lo cerramos siempre por escrito.' },
      { k: 'h2', id: 'responsabilidad', t: 'Responsabilidad' },
      { k: 'p', t: 'Cuidamos que la web funcione y que lo que dice sea correcto, pero no podemos garantizar que esté siempre disponible ni libre de errores. No respondemos de los daños que vengan de un mal uso de la web.' },
      { k: 'h2', id: 'ley', t: 'Ley aplicable' },
      { k: 'p', t: 'Este aviso se rige por la ley española. Para cualquier conflicto, y salvo que la ley diga otra cosa, son competentes los juzgados y tribunales de Donostia-San Sebastián.' },
    ],
  },
  privacidad: {
    titulo: 'Política de privacidad',
    descripcion: 'Política de privacidad de savvia CB. Qué datos tratamos, para qué, cuánto tiempo y cómo ejercer tus derechos.',
    bloques: [
      { k: 'lead', t: 'En savvia tratamos los menos datos posibles. La web no lleva analítica, ni píxeles de publicidad, ni cookies de seguimiento. Aquí te contamos qué datos llegan a tratarse, para qué y qué puedes hacer con ellos.' },
      { k: 'h2', id: 'responsable', t: 'Responsable' },
      { k: 'p', t: 'El responsable de tus datos somos nosotros, savvia CB.' },
      { k: 'datos', filas: TITULAR.es },
      { k: 'p', t: `Para cualquier cosa sobre tus datos, escríbenos a ${CORREO}.` },
      { k: 'h2', id: 'datos', t: 'Qué datos tratamos' },
      { k: 'ul', items: [
        '**Si nos escribes.** Tu nombre, tu correo y lo que nos cuentes.',
        '**Si usas el chat de preguntas.** Solo el texto de tu pregunta. Junto al chat te pedimos que no escribas datos personales.',
        '**Al navegar.** Como en cualquier web, el servidor recibe tu dirección IP y datos técnicos de tu navegador. No los usamos para saber quién eres.',
      ] },
      { k: 'h2', id: 'finalidad', t: 'Para qué los usamos' },
      { k: 'ul', items: [
        'Para contestarte y, si empezamos un proyecto juntos, para llevarlo.',
        'Para responder a tu pregunta en el chat. Si no la tenemos escrita, la contesta una IA solo con lo que ya hemos escrito sobre savvia. No guardamos las preguntas.',
        'Para evitar abusos del chat. Contamos cuántas preguntas llegan desde cada IP en una hora, y la cuenta se borra sola pasada esa hora.',
        'Para que la web funcione y esté segura.',
      ] },
      { k: 'p', t: 'No usamos tus datos para publicidad, no hacemos perfiles y no tomamos decisiones automáticas sobre ti.' },
      { k: 'h2', id: 'base', t: 'Base legal' },
      { k: 'ul', items: [
        '**Tu consentimiento**, cuando nos escribes o usas el chat.',
        '**Las medidas precontractuales y el contrato**, cuando nos pides un presupuesto o trabajamos juntos.',
        '**Nuestro interés legítimo** en proteger la web y el chat de abusos.',
      ] },
      { k: 'h2', id: 'proveedores', t: 'Con quién los compartimos' },
      { k: 'p', t: 'No vendemos ni cedemos tus datos. Para que la web funcione nos apoyamos en estos proveedores, que los tratan solo por encargo nuestro.' },
      { k: 'ul', items: [
        '**Vercel**, que aloja la web.',
        '**OpenRouter y Anthropic**, que hacen llegar la pregunta del chat al modelo de IA y la contestan.',
        '**Upstash**, donde vive la cuenta de preguntas por IP.',
        '**Nuestro proveedor de correo**, donde llegan tus mensajes.',
      ] },
      { k: 'h2', id: 'transferencias', t: 'Transferencias internacionales' },
      { k: 'p', t: 'Vercel, OpenRouter, Anthropic y Upstash tienen sede en Estados Unidos, así que algunos datos pueden salir del Espacio Económico Europeo. Lo hacen con las garantías que pide el RGPD, como el Marco de Privacidad de Datos entre la UE y EE. UU. o las cláusulas contractuales tipo de la Comisión Europea.' },
      { k: 'h2', id: 'plazos', t: 'Cuánto tiempo los guardamos' },
      { k: 'ul', items: [
        '**Tus mensajes**, mientras hablemos y, si trabajamos juntos, el tiempo que obliga la ley.',
        '**Las preguntas del chat**, nada. Se usan para contestarte y se descartan.',
        '**La cuenta por IP**, una hora.',
        '**Los registros técnicos del servidor**, los pocos días que los guarda el alojamiento.',
      ] },
      { k: 'h2', id: 'derechos', t: 'Tus derechos' },
      { k: 'p', t: `Puedes pedirnos ver tus datos, corregirlos, borrarlos, llevártelos, limitar su uso u oponerte a que los tratemos, y retirar tu consentimiento cuando quieras. Basta con escribirnos a ${CORREO}.` },
      { k: 'p', t: 'Si crees que no hemos tratado bien tus datos, puedes reclamar ante la Agencia Española de Protección de Datos, en [aepd.es](https://www.aepd.es).' },
      { k: 'h2', id: 'seguridad', t: 'Seguridad' },
      { k: 'p', t: 'Protegemos los datos que nos das frente a accesos no autorizados, pérdidas o un mal uso, y solo los ven Eric y Andoni.' },
      { k: 'h2', id: 'cambios', t: 'Cambios' },
      { k: 'p', t: 'Si cambia lo que hacemos con los datos, cambiaremos esta página y su fecha.' },
    ],
  },
  cookies: {
    titulo: 'Política de cookies',
    descripcion: 'Política de cookies de savvia CB. La web no usa cookies y solo guarda en tu navegador algunas preferencias.',
    bloques: [
      { k: 'lead', t: 'savvia.studio no usa cookies. No hay analítica, ni publicidad, ni seguimiento, y por eso no te pedimos permiso con ningún aviso.' },
      { k: 'h2', id: 'navegador', t: 'Lo que la web guarda en tu navegador' },
      { k: 'p', t: 'Para recordar algunas preferencias, la web guarda unos pocos datos en el almacenamiento de tu navegador. No salen de tu dispositivo, no nos llegan y no sirven para identificarte. Como solo están para darte lo que pides, no necesitan consentimiento.' },
      { k: 'tabla', cab: ['Qué', 'Para qué', 'Cuánto dura'], filas: [
        ['Animación de entrada', 'Recordar que ya la has visto, para no repetirla', 'Hasta que borres los datos del navegador'],
        ['Estación', 'Mantener la estación que eliges de página en página', 'Hasta que cierres la pestaña'],
        ['Radio', 'Recordar la emisora y si estaba sonando', 'La emisora, hasta que la borres. Lo demás, hasta cerrar la pestaña'],
        ['Chat', 'Contar las preguntas que llevas y no saludarte dos veces', 'Hasta que cierres la pestaña'],
        ['Transiciones', 'Saber de qué página vienes para animar el paso', 'Hasta que cierres la pestaña'],
        ['Sonido', 'Recordar si has apagado el sonido de la web', 'Hasta que borres los datos del navegador'],
        ['Fondo del Lab', 'Recordar el fondo que eliges en el Lab', 'Hasta que borres los datos del navegador'],
      ] },
      { k: 'h2', id: 'clientes', t: 'Las webs de nuestros clientes' },
      { k: 'p', t: 'En Proyectos enseñamos webs reales de clientes dentro de la escena. Esas webs son de sus dueños y siguen sus propias políticas de cookies.' },
      { k: 'h2', id: 'borrar', t: 'Cómo borrarlo' },
      { k: 'p', t: 'Puedes borrar todo esto cuando quieras desde los ajustes de tu navegador, en los datos de sitios web. La web seguirá funcionando igual.' },
      { k: 'h2', id: 'cambios', t: 'Cambios' },
      { k: 'p', t: 'Si un día usamos cookies, lo contaremos aquí y te pediremos permiso antes.' },
    ],
  },
};

const EN: Record<LegalKey, DocLegal> = {
  aviso: {
    titulo: 'Legal notice',
    descripcion: 'Legal notice of savvia CB. Who is behind savvia.studio and the terms for using the website.',
    bloques: [
      { k: 'lead', t: 'These are the details of who is behind savvia.studio and the terms for using the website, as required by Spanish Law 34/2002 on information society services and electronic commerce.' },
      { k: 'h2', id: 'titular', t: 'Who we are' },
      { k: 'p', t: 'savvia is the web studio of Eric and Andoni. These are the details of the owner of savvia.studio.' },
      { k: 'datos', filas: TITULAR.en },
      { k: 'h2', id: 'uso', t: 'Using the website' },
      { k: 'p', t: 'You can browse savvia.studio freely and without signing up. We ask you to use it in good faith and not to do anything that could damage it, overload it or stop other people from using it.' },
      { k: 'h2', id: 'propiedad', t: 'Intellectual property' },
      { k: 'p', t: 'The design, texts, illustrations, code and the savvia brand are ours or we are allowed to use them. You may not copy, reproduce or distribute them without our written permission.' },
      { k: 'p', t: 'The projects we show belong to their clients, and so do their brands and websites. We show them as examples of our work, with their permission.' },
      { k: 'h2', id: 'enlaces', t: 'Client websites and links' },
      { k: 'p', t: 'Some sections show the real websites of our clients or link to them and to other services. We do not control their content or their policies, and each website is responsible for its own.' },
      { k: 'h2', id: 'chat', t: 'Answers in the chat' },
      { k: 'p', t: 'The written answers in the questions chat are ours. When we do not have one, an AI answers with what we have already written about savvia, and we tell you so. Those answers are a guide, not an offer or a commitment. Whatever we agree with you is always settled in writing.' },
      { k: 'h2', id: 'responsabilidad', t: 'Liability' },
      { k: 'p', t: 'We take care that the website works and that what it says is correct, but we cannot guarantee that it is always available or free of errors. We are not liable for damage caused by misuse of the website.' },
      { k: 'h2', id: 'ley', t: 'Applicable law' },
      { k: 'p', t: 'This notice is governed by Spanish law. For any dispute, unless the law says otherwise, the courts of Donostia-San Sebastián have jurisdiction.' },
    ],
  },
  privacidad: {
    titulo: 'Privacy policy',
    descripcion: 'Privacy policy of savvia CB. What data we process, why, for how long and how to exercise your rights.',
    bloques: [
      { k: 'lead', t: 'At savvia we process as little data as possible. The website has no analytics, no advertising pixels and no tracking cookies. Here is what data does get processed, what for and what you can do about it.' },
      { k: 'h2', id: 'responsable', t: 'Controller' },
      { k: 'p', t: 'We are the controller of your data, savvia CB.' },
      { k: 'datos', filas: TITULAR.en },
      { k: 'p', t: `For anything about your data, write to us at ${CORREO}.` },
      { k: 'h2', id: 'datos', t: 'What data we process' },
      { k: 'ul', items: [
        '**If you write to us.** Your name, your email and whatever you tell us.',
        '**If you use the questions chat.** Only the text of your question. Next to the chat we ask you not to include personal data.',
        '**When you browse.** As on any website, the server receives your IP address and technical details of your browser. We do not use them to find out who you are.',
      ] },
      { k: 'h2', id: 'finalidad', t: 'What we use it for' },
      { k: 'ul', items: [
        'To reply to you and, if we start a project together, to run it.',
        'To answer your question in the chat. If we have not written that answer, an AI answers using only what we have already written about savvia. We do not store the questions.',
        'To prevent abuse of the chat. We count how many questions arrive from each IP in an hour, and the count deletes itself once that hour is over.',
        'To keep the website running and secure.',
      ] },
      { k: 'p', t: 'We do not use your data for advertising, we do not build profiles and we do not make automated decisions about you.' },
      { k: 'h2', id: 'base', t: 'Legal basis' },
      { k: 'ul', items: [
        '**Your consent**, when you write to us or use the chat.',
        '**Pre-contractual steps and the contract**, when you ask us for a quote or we work together.',
        '**Our legitimate interest** in protecting the website and the chat from abuse.',
      ] },
      { k: 'h2', id: 'proveedores', t: 'Who we share it with' },
      { k: 'p', t: 'We do not sell or hand over your data. To run the website we rely on these providers, who process data only on our behalf.' },
      { k: 'ul', items: [
        '**Vercel**, which hosts the website.',
        '**OpenRouter and Anthropic**, which pass the chat question to the AI model and answer it.',
        '**Upstash**, where the count of questions per IP is kept.',
        '**Our email provider**, where your messages arrive.',
      ] },
      { k: 'h2', id: 'transferencias', t: 'International transfers' },
      { k: 'p', t: 'Vercel, OpenRouter, Anthropic and Upstash are based in the United States, so some data may leave the European Economic Area. It does so with the safeguards the GDPR requires, such as the EU-US Data Privacy Framework or the European Commission’s standard contractual clauses.' },
      { k: 'h2', id: 'plazos', t: 'How long we keep it' },
      { k: 'ul', items: [
        '**Your messages**, while we are in touch and, if we work together, for as long as the law requires.',
        '**Chat questions**, not at all. They are used to answer you and then discarded.',
        '**The count per IP**, one hour.',
        '**Technical server logs**, the few days the host keeps them.',
      ] },
      { k: 'h2', id: 'derechos', t: 'Your rights' },
      { k: 'p', t: `You can ask us to see your data, correct it, delete it, take it with you, restrict its use or object to us processing it, and you can withdraw your consent at any time. Just write to us at ${CORREO}.` },
      { k: 'p', t: 'If you think we have not handled your data properly, you can complain to the Spanish Data Protection Agency at [aepd.es](https://www.aepd.es).' },
      { k: 'h2', id: 'seguridad', t: 'Security' },
      { k: 'p', t: 'We protect the data you give us against unauthorised access, loss or misuse, and only Eric and Andoni see it.' },
      { k: 'h2', id: 'cambios', t: 'Changes' },
      { k: 'p', t: 'If what we do with data changes, we will update this page and its date.' },
    ],
  },
  cookies: {
    titulo: 'Cookie policy',
    descripcion: 'Cookie policy of savvia CB. The website uses no cookies and only keeps a few preferences in your browser.',
    bloques: [
      { k: 'lead', t: 'savvia.studio does not use cookies. There is no analytics, no advertising and no tracking, which is why we do not ask for your permission with any banner.' },
      { k: 'h2', id: 'navegador', t: 'What the website keeps in your browser' },
      { k: 'p', t: 'To remember a few preferences, the website keeps a small amount of data in your browser’s storage. It never leaves your device, never reaches us and cannot identify you. Since it only exists to give you what you ask for, it needs no consent.' },
      { k: 'tabla', cab: ['What', 'What for', 'How long'], filas: [
        ['Intro animation', 'Remember that you have seen it, so it does not repeat', 'Until you clear your browser data'],
        ['Season', 'Keep the season you pick from page to page', 'Until you close the tab'],
        ['Radio', 'Remember the station and whether it was playing', 'The station, until you clear it. The rest, until you close the tab'],
        ['Chat', 'Count your questions and not greet you twice', 'Until you close the tab'],
        ['Transitions', 'Know which page you came from to animate the change', 'Until you close the tab'],
        ['Sound', 'Remember whether you turned the site sound off', 'Until you clear your browser data'],
        ['Lab background', 'Remember the background you pick in the Lab', 'Until you clear your browser data'],
      ] },
      { k: 'h2', id: 'clientes', t: 'Our clients’ websites' },
      { k: 'p', t: 'In Projects we show our clients’ real websites inside the scene. Those websites belong to their owners and follow their own cookie policies.' },
      { k: 'h2', id: 'borrar', t: 'How to delete it' },
      { k: 'p', t: 'You can delete all of this whenever you like from your browser settings, under site data. The website will keep working just the same.' },
      { k: 'h2', id: 'cambios', t: 'Changes' },
      { k: 'p', t: 'If we ever use cookies, we will say so here and ask for your permission first.' },
    ],
  },
};

export const legalDe = (lang: Lang, key: LegalKey): DocLegal => (lang === 'en' ? EN : ES)[key];

// `**negrita**` y `[texto](destino)` a HTML, sobre el texto ya escapado
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const linea = (s: string) =>
  esc(s)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, t: string, h: string) => `<a class="link" href="${h}"${h.startsWith('http') ? ' target="_blank" rel="noopener"' : ''}>${t}</a>`);
