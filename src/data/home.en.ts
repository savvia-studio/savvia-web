import listaPreguntas from './preguntas.en.json';
import { estudio as estudioEs } from './home';
// English copy of home.ts: same exports, same shape. Internal links carry /en (Lab, Sistema and Método have no English version).
// Strings matched by components (servicios tags/grupos, agentes, receta marks by line index) are translated identically on both sides.

export const nav = {
  links: [
    { label: 'Services', href: '/en/#servicios' },
    { label: 'Portfolio', href: '/en/proyectos' },
    { label: 'Lab', href: '/lab' },
    { label: 'Manifesto', href: '/en/manifiesto' },
  ] as { label: string; href?: string }[],
  reel: { label: 'Reel', duracion: '1:28' },
  mas: { titulo: 'More', links: [{ label: 'Storybook', href: '/storybook' }, { label: 'Method' /* ronda 307, 25.ª: coming soon */ }] as { label: string; href?: string }[] },
};

export const hero = {
  h1: 'We elevate your website with AI.',
  h2: 'Specialists in orchestrating agentic development.',
  vocabulario: ['orchestrate', 'judgement', 'elevate', 'agentic development', 'custom', 'end to end', 'documented', 'source of truth', 'clarity', 'versatility', 'with you', 'Eric and Andoni', 'savvia', 'the sap', 'your website', 'design', 'with judgement'],
  vocabularioRaiz: ['root', 'briefing', 'understand', 'what you sell', 'to whom', 'decisions', 'savvia', 'source of truth', 'documented', 'judgement', 'the sap', 'from the root'],
};

export const producto = {
  nombre: 'savvia agentic',
  frase: 'Your website, its recipe and the agents that keep it up to date.',
};

export const recorrido = {
  pregunta: 'Sound familiar?',
  skills: [{ t: 'Design', i: 'diseno' }, { t: 'Motion', i: 'movimiento' }, { t: 'Development', i: 'desarrollo' }],
  briefing: [
    ['What do you sell?', 'To whom?', 'What makes what you do special?', 'Who else does what you do?'],
    ['What has changed since your last website?', 'What no longer says who you are?', 'What should be clear on arrival?', 'Which websites do you admire? Which not?'],
    ['Who decides in your team?', 'How do your clients find you today?', 'What is hard for you to change today?', 'How often do you publish? In which languages?'],
    ['Who will maintain the website? Which teams?', 'What will you want to change often?', 'What dates are you aiming for?', 'Where do you want the new website to take you?'],
  ],
  pasos: [
    {
      corto: 'Out of step with your brand',
      dolor: "If your website doesn't align with your brand…",
      t: 'We spend time side by side',
      d: 'with you, understanding what your project needs.',
    },
    {
      corto: 'AI slop',
      dolor: 'If what you make looks like AI slop…',
      t: 'With your direction and our judgement',
      d: 'we generate unique design and web development skills.',
    },
    {
      corto: 'Hard to maintain',
      dolor: 'If your design consistency breaks with every change…',
      t: 'savvia: the agent that guides your website.',
      d: 'A system that connects your website to AI.',
    },
  ],
};

export const problemas = {
  aria: 'Why savvia agentic',
  parrafos: [
    'AI is the base. The judgement is still ours.',
    'We make your website like a tailored suit, side by side with you.',
    'We cook slowly, pixel by pixel, and hand you the recipe…',
    '[[savvia agentic]]: your website, connected to AI.',
  ],
};

export const laSavvia = {
  pregunta: 'What is the savvia?',
  titulo: 'The savvia is the recipe for your website.',
  intro: "It isn't a document that gets filed away in a drawer: it's a system. Each ingredient decides one part of the website, and everyone reads them the same way: you, your team and the [[AI]].",
  ingredientes: [
    { id: 'color', n: 'Colour', v: 'Cocoa, Mist pink, Walnut, Coral, Cobalt, Cherry', d: 'Six colours, each with its role. Coral is the action; each block, a single accent.' },
    { id: 'tipo', n: 'Typography', v: 'Family, Timeless Sans, Timeless Grotesk', d: 'Three voices: the editorial one, the reading one and the one for details.' },
    { id: 'espacio', n: 'Spacing', v: '4, 8, 12, 16, 24, 32, 48, 64, 96, 128', d: 'A single scale. No gap is decided by eye.' },
    { id: 'piezas', n: 'Components', v: 'Button, link, card, detail', d: 'The pieces any new page is built with.' },
    { id: 'voz', n: 'Voice', v: 'orchestrate, judgement, custom, with you', d: 'What we say and what we don’t. The words belong to the system too.' },
    { id: 'no', n: 'Rejected', v: 'Italics, landscapes in the hero, an effect as the star', d: 'Every decision that fell, and why. So we never go back.' },
  ],
  puntos: [
    { t: 'Where everything is understood.', d: 'What it is, who it is for and why it is that way.' },
    { t: 'Where every decision lives.', d: 'Design and development. Also the ones we discarded, and why.' },
    { t: 'A system you read and the [[AI]] understands.', d: 'savvia.md' },
  ],
  cierre: 'Everything documented so anyone knows how to change and update the website.',
  doc: {
    archivo: 'savvia.md',
    lineas: [
      { k: 'h', v: '# savvia, web' },
      { k: 'h', v: '## Colour' },
      { k: 'p', v: 'Cocoa #302018, the base of the page' },
      { k: 'p', v: 'Coral #F65340, buttons and calls to action' },
      { k: 'p', v: 'Cobalt, Cherry, one accent per block' },
      { k: 'h', v: '## Typography' },
      { k: 'p', v: 'Family 400, Timeless Sans, Timeless Grotesk' },
      { k: 'h', v: '## Rejected' },
      { k: 'p', v: 'Italics. Landscape backgrounds in the hero.' },
      { k: 'p', v: 'An effect as the star of the page.' },
    ],
  },
  falta: 'Today it shows the savvia of this website. Does any client allow us to show theirs?',
};

export const receta = {
  titulo: 'savvia agentic.',
  arnes: 'The design and development foundations of your website, in a library any AI knows how to read.\n\nThat way you and your team can change whatever you like while respecting the decisions we made together.',
  nota: "Neety's real recipe: the one their team uses every day to change their website with AI.",
  enlace: { label: 'See the whole recipe', href: 'https://neety.treseiscero.app/library' },
  tiras: [
    {
      paso: 'your brand',
      t: 'DESIGN.md',
      raya: '=-=-=-=-=-=-=-=-=-=-=-=',
      lineas: ['# Neety, the recipe', '> the website is generated', '  from its own code', '', '## colour', 'Core Orange    #FE8238', 'Baby blue      #A7C5F9', 'Aubergine      #431B44', 'Plum           #2A0E2C', 'Warm base      #F8F7EC', '', '## typography', 'headlines  Bricolage', 'body       Switzer', 'H1  112 / 64 px, 120%', '', '## spacing', 'xtiny 4 … xxhuge 160', 'section 96, 128, 224 px'],
      marcas: [[5, 'circulo'], [12, 'subraya']],
      digital: { tipo: 'tabla', txt: 'app/globals.css, @theme', filas: [['Core Orange', '#FE8238', 'bg-naranja'], ['Aubergine', '#431B44', 'text-plum'], ['Warm base', '#F8F7EC', 'bg-base']], colores: ['#FE8238', '#431B44', '#F8F7EC'] },
    },
    {
      paso: 'the harness',
      t: 'guardrails',
      raya: '·x·x·x·x·x·x·x·x·x·x·x·',
      lineas: ['no new colours', '   or fonts', '', 'no different hero:', '   reuse one', '', 'no invented buttons', '', 'one change per request', '', 'no publishing without', '   checking the preview'],
      marcas: [[0, 'subraya'], [6, 'visto'], [8, 'visto'], [10, 'visto']],
      digital: { tipo: 'bloqueo', txt: '#FF2E9A is not in the recipe', fin: 'use the Core Orange token', cab: 'CLAUDE.md, the harness' },
    },
    {
      paso: 'your team asks',
      t: 'what their team asks',
      raya: "`'. .'`'. .'`'. .'`'. .'`",
      lineas: ['"Add a testimonials', 'section to the home,', 'between How it works', 'and Integrations: three', 'quotes with name, role', 'and company, in the', 'white card style."'],
      marcas: [[6, 'subraya']],
      digital: { tipo: 'agente', txt: 'agent, reading the recipe', pasos: ['reads CLAUDE.md', 'reuses the white card', 'adds it in ES and EN', 'checks it in the preview'], fin: 'section ready ✓' },
    },
    {
      paso: 'written down',
      t: 'decisions',
      raya: '·_·~·_·~·_·~·_·~·_·~·_·',
      lineas: ['the left border', '   always with the logo', '', 'new images', '   in AVIF', '', 'bilingual from', '   day one'],
      marcas: [[0, 'visto'], [3, 'visto'], [6, 'visto']],
      digital: { tipo: 'diff', txt: 'docs/decisions.md', pasos: ['+ left border with the logo', '+ new images in AVIF', '+ bilingual from day 1'], fin: '+3' },
    },
    {
      paso: 'the bill',
      t: 'receipt',
      raya: '.......................',
      lineas: ['Custom website ... done', 'Every decision . written', 'Your AI .. with harness', 'Your team ... in charge', '', '   thanks for coming'],
      marcas: [[2, 'circulo']],
      digital: { tipo: 'boton', txt: "Show me Neety's library", href: 'https://neety.treseiscero.app/library' },
    },
  ] as { paso: string; t: string; raya: string; lineas: string[]; marcas: [number, string][]; digital: { tipo: string; txt: string; fin?: string; cab?: string; href?: string; colores?: string[]; filas?: string[][]; pasos?: string[] } }[],
};

export const proyectos = {
  pregunta: 'What has this lot done?',
  titulo: 'savvia', // round 292: the screen title is the reel's title card; was «Featured projects built with agentic development.»
  nuevos: [
    {
      slug: 'neety',
      paleta: ['#F5F7F9', '#9C787C', '#CEB7B5', '#CCD5E5'],
      n: 'Neety',
      cat: 'B2B sales',
      d: 'Detects who to sell to and when. The website shows the signals feed before explaining it.',
      url: 'https://neety.treseiscero.app/home',
      estacion: 'otono',
      hechos: [
        ['Work', 'Home, agentic design and development'],
        ['A number', '9 sections'],
      ],
    },
    {
      slug: 'quantus',
      paleta: ['#15181C', '#F01438', '#3A3E44', '#C0C3C5'],
      n: 'Quantus',
      cat: 'AI and quantum computing',
      d: 'A sphere of points that compresses into its logo: the product, explained without a single word.',
      url: 'https://quantus-demo.vercel.app/',
      dominio: 'quantus-demo.vercel.app',
      estacion: 'invierno',
      hechos: [
        ['Work', 'Home, agentic design and development'],
        ['Typeface', 'Schibsted Grotesk'],
        ['A number', '24 documented rounds'],
      ],
    },
    {
      slug: 'playground',
      paleta: ['#FFFFFF', '#21127A', '#3D7A96', '#5C2E6E'],
      n: 'Playground IEP',
      cat: 'Special education',
      d: 'Science-based AI for special education, told with stickers you can pick up.',
      url: 'https://playgroundiep.treseiscero.app/home-v3', dominio: 'playgroundiep.com', // ronda 230: la home v2 · 26/10: la v3 (Andoni, con Claude)
      estacion: 'primavera',
      hechos: [
        ['Work', 'Home, agentic design and development'],
        ['A number', '24 rounds, 4 versions of the home'],
      ],
    },
    {
      slug: 'patchbay',
      paleta: ['#F8F4EE', '#603B32', '#998A82', '#251A17'],
      n: 'Patchbay',
      cat: 'API for developers',
      d: 'A social and messaging API for 23 channels, presented as a harbour where each one docks.',
      url: 'https://patchbay-web.vercel.app/',
      dominio: 'patchbay-web.vercel.app',
      estacion: 'verano',
      hechos: [
        ['Work', 'Home, agentic design and development'],
        ['A number', '23 channels, 11 sections'],
      ],
    },
  ],
  faltaNuevos: 'Confirm the four projects, their lines and which season each one carries.',
  titulo2: 'More projects.',
  antes: ['Invopop', 'Business Online Payroll', 'Cubbo', 'Remerge', 'Isotrol'],
  intro2: 'Custom websites, end to end, for teams that live off their website. And what the people who use them every day have to say.',
  anteriores: [
    { n: 'Wisable', slug: 'wisable', dominio: 'wisable.com', sector: 'M&A', logo: '', color: ['#0b0f2e', '#1b2150', '#e6f24a'] },
    { n: 'Home of Ambrose', slug: 'home-of-ambrose', dominio: 'homeofambrose.com', sector: 'Real estate', logo: '', color: ['#f6e5d5', '#c25631', '#e9a23b'] },
    { n: 'Kymatio', slug: 'kymatio', dominio: 'kymatio.com', sector: 'Cybersecurity', logo: '', color: ['#0b1f17', '#123a2c', '#2fbf8a'] },
    { n: 'Cubbo', slug: 'cubbo', dominio: 'cubbo.com', sector: 'Logistics', logo: 'cubbo', color: ['#1b40d6', '#4963e2', '#8095ff'] },
    { n: 'Transcend', slug: 'transcend-network', dominio: 'transcend-network.com', sector: 'Founders community', logo: '', color: ['#fff6ee', '#ff6b1a', '#3f7bff'] },
    { n: 'Monad', slug: 'monad', dominio: 'monad.com', sector: 'Data infrastructure', logo: '', color: ['#e4efe0', '#b8d8b1', '#fff4d6'] },
    { n: 'Neety', slug: 'neety-com', dominio: 'neety.com', sector: 'B2B sales', logo: '', color: ['#eee8f7', '#a7c5f9', '#fe8238'] },
    { n: 'THX', slug: 'thx', dominio: 'thx.vision', sector: 'Consulting', logo: '', color: ['#3f86bd', '#7fb3dc', '#bbdaf2'] },
  ],
  celdas: [
    [
      { tipo: 'cita', q: 'I never had to chase them: they came to me with solutions. They understood who we are from day one.', n: 'Ignasi Vegas', r: 'Co-founder and CEO, Cubbo' },
      { tipo: 'marca', rotulo: "We've worked with", logo: '/media/logos/cuadricula/remerge.webp', n: 'Remerge', escala: 1.3 },
      { tipo: 'cita', q: 'A reliable, committed team, with talent, professionalism and an impeccable workflow.', n: 'Félix Gonzalo', r: 'Sr. Webflow Developer / Tech Lead, Edgar Allan' },
      { tipo: 'marca', rotulo: "We've worked with", logo: '/media/logos/cuadricula/thx.webp', n: 'THX' },
      { tipo: 'cita', q: 'A complex project, with several languages and an extensive content migration, handled with solid precision.', n: 'Guilherme Escobar', r: 'Global Marketing Director, Remerge' },
      { tipo: 'marca', rotulo: "We've collaborated with", logo: '/media/logos/cuadricula/universidad-de-mondragon.webp', n: 'Mondragon University', escala: 1.6 },
      { tipo: 'cita', q: 'Talk to Eric and Andoni when you need to redesign your website. A great job and a great process of documentation, design, development and delivery. Quality, closeness and speed.', n: 'José Luis Antúnez', r: 'Our mentor in strategy and narrative' },
      { tipo: 'marca', rotulo: "We've worked with", logo: '/media/logos/cuadricula/naterra.webp', n: 'Naterra', escala: 1.25 },
    ],
    [
      { tipo: 'marca', rotulo: "We've worked with", logo: '/media/logos/cuadricula/cubbo.webp', n: 'Cubbo', escala: 1.35 },
      { tipo: 'cita', q: 'Eric and Andoni reply in minutes and deploy in hours. They exceeded our expectations.', n: 'Juan Moliner', r: 'Co-founder, Invopop' },
      { tipo: 'marca', rotulo: 'We actively collaborate with', logo: '/media/logos/cuadricula/farco-studio.webp', n: 'Farco Studio', escala: 1.05 },
      { tipo: 'cita', q: 'They communicated with me constantly throughout the process and together we built something beautiful.', n: 'Sean Klamm', r: 'CEO, Playground IEP' },
      { tipo: 'marca', rotulo: "We've worked with", logo: '/media/logos/cuadricula/surepayroll.webp', n: 'SurePayroll', escala: 1.35 },
      { tipo: 'cita', q: "We've been working together at SurePayroll for a year and the results have been very good: they've helped us grow the relationship with the client.", n: 'Brian Farrell', r: 'Founder and Director, Farco Studio' },
      { tipo: 'marca', rotulo: "We've worked with", logo: '/media/logos/cuadricula/profounders-capital.webp', n: 'PROFounders Capital', escala: 1.4 },
      { tipo: 'cita', q: 'I value their flexibility, their attention to detail and how they adapt to deadlines and changes. We will certainly work together again.', n: 'Danny Saltaren', r: 'Discovered us and gave us a push in our early days' },
      { tipo: 'marca', rotulo: "We've worked with", logo: '/media/logos/cuadricula/junipero.webp', n: 'Junipero', escala: 1.25 },
      { tipo: 'cita', q: 'Close, human and genuinely able to understand your project. More than a supplier, they are part of your team.', n: 'Unai Arambarri', r: 'Founder and CEO, Neety' },
      { tipo: 'marca', rotulo: "We've worked with", logo: '/media/logos/cuadricula/neety.webp', n: 'Neety', escala: 1.3 },
    ],
    [
      { tipo: 'cita', q: 'They knew how to convey what our technology does. The best team I have seen in design and in dealing with the client.', n: 'Nuria Pastor', r: 'CEO, Vitalera' },
      { tipo: 'marca', rotulo: "We've worked with", logo: '/media/logos/cuadricula/codely.webp', n: 'Codely', escala: 1.2 },
      { tipo: 'cita', q: 'They thought of everything, were always available and made it really easy for me with short Loom videos. Six stars out of five.', n: 'Thomas Hauer', r: 'Founder, THX' },
      { tipo: 'marca', rotulo: "We've worked with", logo: '/media/logos/cuadricula/transcend-network.webp', n: 'Transcend Network', escala: 1.25 },
      { tipo: 'cita', q: 'A key collaborator in digitalising our tool: we finished on time and with the quality we were after.', n: 'Ainara Martínez Rivera', r: 'Research Coordinator, Mondragon University' },
      { tipo: 'marca', rotulo: "We've worked with", logo: '/media/logos/cuadricula/impact-bridge.webp', n: 'Impact Bridge', escala: 1.2 },
      { tipo: 'cita', q: 'It has been a pleasure to work with them. Their dedication, speed and proactivity make it very easy. I recommend them without hesitation.', n: 'Alberto Arenaza', r: 'Opened the door to international projects for us' },
      { tipo: 'marca', rotulo: "We've worked with", logo: '/media/logos/cuadricula/valuat.webp', n: 'Valuat', escala: 1.15 },
      { tipo: 'marca', rotulo: "We've worked with", logo: '/media/logos/cuadricula/wisable.webp', n: 'Wisable', escala: 1.15 },
    ],
    [
      { tipo: 'marca', rotulo: "We've worked with", logo: '/media/logos/cuadricula/invopop.webp', n: 'Invopop', escala: 1.25 },
      { tipo: 'cita', q: 'A joy to work with: top-level professionalism, a team that contributes and multiplies the result.', n: 'Fernando Mateus', r: 'CEO and Founder, Kymatio' },
      { tipo: 'marca', rotulo: "We've worked with", logo: '/media/logos/cuadricula/monad.webp', n: 'Monad', escala: 1.25 },
      { tipo: 'cita', q: 'We shared a sketch and by the next iteration it was already designed and ready to develop. Very productive and with very few meetings.', n: 'Javi Ferrer', r: 'Co-founder, Codely' },
      { tipo: 'marca', rotulo: "We've worked with", logo: '/media/logos/cuadricula/bluence.webp', n: 'Bluence', escala: 1.15 },
      { tipo: 'cita', q: 'Working with them makes everything easier: plenty of resources, plenty of detail and always willing to improve the result.', n: 'Alejandro Sánchez', r: 'Head of Design, mendesaltaren' },
    ],
    [
      { tipo: 'cita', q: 'They captured exactly what we wanted to convey, and did it fast and professionally.', n: 'Carlos Hernández', r: 'Founder and CEO, Kalma' },
      { tipo: 'marca', rotulo: "We've collaborated with", logo: '/media/logos/cuadricula/minimum.webp', n: 'Minimum', escala: 1.05 },
      { tipo: 'cita', q: 'They captured our essence perfectly and exceeded every expectation in record time.', n: 'Santos J. Díaz Pastor', r: 'Investment Associate, Impact Bridge Asset Management SGIIC' },
      { tipo: 'cita', q: 'Very satisfied with their work and their commitment from start to finish. We will keep collaborating on future projects.', n: 'Emilio Rodríguez', r: 'Managing Partner, Lyra' },
      { tipo: 'marca', rotulo: "We've worked with", logo: '/media/logos/cuadricula/lyra.webp', n: 'Lyra', escala: 1.1 },
      { tipo: 'cita', q: "Working with Eric and Andoni was easy, fast and high quality. Excellent communication and clear prices.", n: 'JJ Velaz', r: 'Our business mentor from the start' },
    ],
    [
      { tipo: 'marca', rotulo: "We've worked with", logo: '/media/logos/cuadricula/isotrol.webp', n: 'Isotrol', escala: 1.15 },
      { tipo: 'cita', q: 'Fluid communication throughout the development, a lot of craft and support as partners at the highest level.', n: 'Olalla Castro', r: 'Founder and CEO, Eleven Lab' },
      { tipo: 'marca', rotulo: "We've worked with", logo: '/media/logos/cuadricula/routal.webp', n: 'Routal', escala: 1.05 },
      { tipo: 'cita', q: 'Their professional, friendly way of working made the whole process smooth and enjoyable. Ten out of ten.', n: 'Manu Cabrera', r: 'Founder, Kabila' },
      { tipo: 'marca', rotulo: "We've worked with", logo: '/media/logos/cuadricula/kymatio.webp', n: 'Kymatio', escala: 1.15 },
      { tipo: 'marca', rotulo: "We've worked with", logo: '/media/logos/cuadricula/kalma.webp', n: 'Kalma', escala: 1.1 },
      { tipo: 'cita', q: 'I would highlight how quickly they understood the mission of the project, the precise execution of our ideas and their agility in adding nuance.', n: 'Edu Riera', r: 'Founder, Zrive' },
    ],
  ] as { tipo: 'cita' | 'marca' | 'cifra'; q?: string; n?: string; r?: string; rotulo?: string; logo?: string; texto?: string; v?: string; l?: string; escala?: number }[][],

  testimonios: [
    { n: 'José Luis Antúnez', r: 'Our mentor in strategy and narrative', retrato: '/media/testimonios/jl-antunez.webp', q: 'Talk to Eric and Andoni when you need to redesign your website. A great job and a great process of documentation, design, development and delivery. Quality, closeness and speed.' },
    { n: 'Alberto Arenaza', r: 'Opened the door to international projects for us', retrato: '/media/testimonios/alberto.webp', q: 'It has been a pleasure to work with them. Their dedication, speed and proactivity make it very easy. I recommend them without hesitation.' },
    { n: 'JJ Velaz', r: 'Our business mentor from the start', retrato: '/media/testimonios/juanjo-velaz.webp', q: "Working with Eric and Andoni was easy, fast and high quality. I tell them what I need and I know they'll sort it without back and forth. Excellent communication and clear prices." },
    { n: 'Danny Saltaren', r: 'Discovered us and gave us a push in our early days', retrato: '/media/testimonios/danny.webp', q: 'I value their flexibility, their attention to detail and how they adapt to deadlines and changes to improve the experience and the final result. We will certainly work together again.' },
  ],

  enlace: { label: 'All projects', href: '/en/proyectos' },
};

export const servicios = {
  pregunta: 'How do we work with you?',
  titulo: 'We work with you in three ways.',
  sub: 'Depending on what you need.',
  grupos: [
    { n: 'Strategy', items: ['Website narrative', 'Content architecture', 'Website audit'] },
    { n: 'Design and motion', items: ['Digital design', 'Design system', 'Animated illustrations', '3D animations', 'GSAP interactions'] },
    { n: 'Development', items: ['Agentic development', 'CMS integrations', 'Multilingual', 'Webflow to AI migrations', 'Technical SEO', 'Accessibility and performance'] },
    { n: 'Afterwards', items: ['The recipe: savvia.md', 'Team training'] },
  ],
  lista: [
    {
      corto: 'End-to-end',
      cab: 'What the end-to-end includes:',
      d: 'From the first conversation to the published website: we think it through, design it and build it with you, and hand it over ready for your team to grow it with AI.',
      tags: ['Website narrative', 'Content architecture', 'Digital design', 'Design system', 'Animated illustrations', '3D animations', 'GSAP interactions', 'Agentic development', 'CMS integrations', 'Multilingual', 'Webflow to AI migrations', 'Technical SEO', 'Accessibility and performance', 'Website audit', 'The recipe: savvia.md', 'Team training'],
    },
    {
      corto: 'Collaboration',
      cab: 'What the collaboration includes:',
      d: 'We join your team or your agency where it needs us most: design, motion or development.',
      tags: ['Digital design', 'Design system', 'Animated illustrations', '3D animations', 'GSAP interactions', 'Agentic development', 'CMS integrations', 'Multilingual'],
    },
    {
      corto: 'Consulting',
      cab: 'What the consulting includes:',
      d: 'We help you decide what your website needs, advise you on motion, agentic development and CMS, and organise it so your team can change it with AI without leaving your brand.',
      tags: ['Website narrative', 'Content architecture', 'Website audit', 'Animated illustrations', '3D animations', 'GSAP interactions', 'Agentic development', 'CMS integrations', 'Webflow to AI migrations', 'Team training'],
    },
  ],
};

export const voces = [
  { rota: true, de: 'isotrol', n: 'Inés López-Pita', r: 'Marketing Director, Isotrol', q: 'The service, the execution, the deadlines and the delivery are excellent, but what really stands out is your knowledge and your ability to improve our initial vision.', video: '', poster: '', ar: 16 / 9 },
  { rota: true, de: 'invopop', n: 'Juan Moliner', r: 'Co-founder, Invopop', q: 'From day one they plugged into our tools. They reply in minutes and push to production in hours instead of days. They exceeded our expectations and we will work with them again.', video: '', poster: '', ar: 16 / 9 },
  { rota: true, de: '', n: 'Javi Ferrer', r: 'Co-founder, Codely', q: 'The project was a success thanks to the incredible work of Andoni and Eric. We shared a sketch and, by the next iteration, Andoni had it ready in Figma for Eric to develop in Webflow. An excellent collaboration, highly recommended!', video: '', poster: '', ar: 16 / 9 },
  { rota: true, de: '', n: 'Thomas Hauer', r: 'Founder, THX', q: "A designer recommended them to build my website and I'm delighted I took the advice, both for the quality of their work and for how they collaborated with me. They thought of everything, were always available and made it easy for me with short, personalised videos. Six stars out of five.", video: '', poster: '', ar: 16 / 9 },
  { rota: true, de: '', n: 'Claudia Bethencourt', r: 'Brand Shaper, Claudia BE', q: 'Methodical, reliable, and they dived straight into developing all our ideas. Impeccable work, praised even by other developers.', video: '', poster: '', ar: 16 / 9 },
  { rota: false, de: '', n: 'Danny Saltaren', r: 'Founder, Minimum Run', q: 'I value their flexibility, their attention to detail and how they adapt to deadlines and changes to improve the experience and the final result. We will work together again.', video: '', poster: '', ar: 16 / 9 },
  { rota: false, de: '', n: 'Félix Gonzalo', r: 'Webflow Developer, Monad', q: 'Eric and Andoni stand out for their talent, their professionalism and an impeccable workflow. A reliable, committed team that I wholeheartedly recommend.', video: '', poster: '', ar: 16 / 9 },
];

export const estudio = {
  pregunta: "Who's behind this?",
  titulo: 'The web studio that orchestrates AI.',
  texto: "We're Andoni and Eric. Both of us in every decision.\nBoth of us from the first conversation to the last.",
  personas: estudioEs.personas.map((p) => ({
    ...p,
    falta: 'A 2 to 3 line bio and role.',
    hobbies: p.n === 'Andoni' ? ['Basketball', 'Video games', 'Coffee at home'] : ['Sport', 'Nature', 'Music'],
  })),
};

export const preguntas = {
  pregunta: 'Questions?',
  titulo: 'Ask us anything.',
  firma: 'Eric and Andoni',
  nota: 'We usually reply the same day.',
  lista: listaPreguntas as { q: string; a: string; claves: string[]; chip: boolean }[],

  libre: {
    etiqueta: 'Got another?',
    ayuda: "Tell us what you'd like to know about us. If we already have an answer, we'll show you ours. If not, an AI will answer with what we know about savvia, and you can ask us to confirm it whenever you like. Please don't write personal data.",
    boton: 'Ask',
    sinRespuesta: "We haven't written that one yet. Send it to us and we'll answer ourselves, usually the same day.",
  },
};

export const pie = {
  tagline: 'The sap behind your website.', // 28/10: «of your web» no suena natural; el logotipo sigue en el lugar de «sap»
  pitch: 'The studio that orchestrates AI, with judgement.',
  contactar: 'Contact us', // ronda 228: vuelve la palabra entre las montañas
  agenda: 'Click to book a call with us',
  pista: 'Tap to book a call', // ronda 268: la ayuda de móvil, sobre «Contáctanos»
  correo: 'hola@savvia.studio',
  correoTexto: 'Contact via email',
  cal: '',
  desde: 'since 2020',
};

export const partitura = {
  carpeta: ["Neety's", 'library'],
  entra: ['Strategy', 'Positioning', 'Voice', 'Identity', 'Art direction', 'Components', 'Guides', 'Tokens', 'Assets', 'Examples'],
  sale: ['Copy changes', 'Editing illustrations', 'Creating landing pages for Ads', 'Uploading blog posts to the CMS', 'Adding languages', 'Publishing a client case', 'Updating prices', 'Tweaking SEO and metadata', 'Running A/B tests', 'Reviewing accessibility'],
  agentes: [['Claude', 'coral'], ['Codex', 'cobalto'], ['savvia', 'cereza'], ['Your team', 'nogal']] as [string, string][],
  resumen: [['brand/colour.md', '8 colours'], ['brand/typography.md', '2 families'], ['brand/voice.md', '3 rules'], ['system/spacing.md', '12 steps'], ['system/tokens.css', '@theme'], ['components/', '5 pieces']] as [string, string][],
  nota: "A representation of Neety's real library: the one their team, and their AI, read every day to change their website.",
  enlace: { label: 'See the library', href: 'https://neety.treseiscero.app/library' },
  libreria: {
    ruta: 'neety / library',
    titulo: "Neety's library",
    peticion: "Let's build the home hero with the signals feed. In our style.",
    quien: 'Your team',
    estado: ['Reading the library…', 'Published on', 'Ready to publish'],
    publicar: 'Publish',
    indice: [
      ['Introduction', ['How to use this library', 'Site map']],
      ['Working with Claude', ['Receiving the project', 'Connecting with Claude', 'Changing content', 'Editing the blog and the team (Sanity)', 'Reusing components', 'Adding new sections', 'Adding a new page', 'Good practice']],
      ['Foundations', ['Colour', 'Typography', 'Spacing', 'Radii and shadows', 'Progressive gradient']],
      ['Components', ['Buttons', 'Brand and favicon', 'Website components']],
      ['Maintenance', ['Technical maintenance']],
    ] as [string, string[]][],
    paginas: {
      color: { eyebrow: 'Foundations', titulo: 'Colour', texto: 'Defined in app/globals.css (@theme block). Editing there is the only way to change the palette; Tailwind generates the utilities.', etiqueta: 'Brand palette', rampas: 'Opacity ramps' },
      tipo: { eyebrow: 'Foundations', titulo: 'Typography', texto: 'Headlines in Bricolage Grotesque (font-display), body in Switzer (font-sans).', etiqueta: 'Headlines: 120 % line height' },
      botones: { eyebrow: 'Base components', titulo: 'Buttons (CTA)', texto: 'The real CTA of the website is components/PillCta.tsx: a pill whose label rolls upwards on hover.' },
      esp: { eyebrow: 'Foundations', titulo: 'Spacing', texto: 'Scale of spacing tokens. The bar shows the desktop value; the label shows desktop / mobile.' },
      comp: { eyebrow: 'Product', titulo: 'Website components', texto: 'All the real components of the website, in tabs by page. Each card carries its real thumbnail and its path.' },
    } as Record<string, { eyebrow: string; titulo: string; texto: string; etiqueta?: string; rampas?: string }>,
    botonesTarjetas: [['Primary: "Request a demo"', 'primary', 'Request a demo'], ['Outline: "Learn more"', 'outline', 'Learn more'], ['Primary, big: footer CTA', 'primary', 'Request a demo'], ['Primary, block: mobile menu', 'block', 'Request a demo']] as [string, string, string][],
    tabsComponentes: ['Common', 'Home', 'Platform', 'Use cases', 'Blog', 'Article', 'Events', 'Academy'],
    fichas: [{ id: 'logo', titulo: 'Logo', chips: ['Logotype', 'Logo', 'components/Logo.tsx'], texto: "Neety's wordmark as inline SVG. Props: className (size) and fill (colour)." }, { id: 'punto', titulo: 'Pulsing dot', chips: ['Pulsing dot', 'PulsingDot', 'components/PulsingDot.tsx'], texto: 'Brand dot whose halo breathes with GSAP. It heads the eyebrow of almost every section.' }],
    picks: [
      { ag: 2, sec: 'color', src: 'base', slot: 'fondo', label: 'Grainy gradient', chip: 'Grainy gradient' },
      { ag: 0, sec: 'tipo', src: 'h1xl', slot: 'h1', label: 'H1, XL', chip: 'Bricolage, H1 XL' },
      { ag: 1, sec: 'botones', src: 'cta', slot: 'ctas', label: 'Request a demo', chip: '<PillCta variant="primary" />' },
      { ag: 2, sec: 'esp', src: 'large', slot: 'esp', label: 'large, 48', chip: 'spacing, large 48' },
      { ag: 3, sec: 'comp', src: 'logo', slot: 'logo', label: 'Logo', chip: '<Logo />' },
      { ag: 1, sec: 'comp', src: 'punto', slot: 'punto', label: 'Pulsing dot', chip: '<PulsingDot />' },
    ] as { ag: number; sec: string; src: string; slot: string; label: string; chip: string }[],
    color: [['Core Orange', '#FE8238'], ['Baby Blue', '#A7C5F9'], ['Aubergine', '#431B44'], ['Plum', '#2A0E2C'], ['Light Mint', '#EBFFF6'], ['Warm Base', '#F8F7EC'], ['Tech Grey', '#F5F7F9'], ['Grainy gradient', 'grad']] as [string, string][],
    tipografia: [['Bricolage Grotesque', 'headlines, H1 XL 112 / 64, 120 %'], ['Switzer', 'body, regular 16, 150 %']] as [string, string][],
    espaciado: [['xtiny', 4], ['tiny', 8], ['xxsmall', 16], ['xsmall', 20], ['small', 24], ['medium', 32], ['large', 48], ['xlarge', 64], ['xxlarge', 80], ['huge', 96], ['xhuge', 112], ['xxhuge', 160]] as [string, number][],
    gradiente: { clase: '.rail-gradient-x', paradas: ['#F8F7EC', '#FE8238', '#431B44', '#A7C5F9', '#FFFFFF'], nota: 'cream → orange → aubergine → blue → white' },
    botones: { ruta: 'components/PillCta.tsx', primario: 'Request a demo', contorno: 'Learn more' },
    componentes: ['Logo', 'PulsingDot', 'PillCta', 'TagPill', 'RollingNumber'],
    hero: {
      nav: ['Platform', 'Use cases', 'Resources', 'Company', 'Pricing'],
      eyebrow: ['Detect.', 'Prioritise.', 'Act.'],
      h1: 'Detect who to sell to, when to do it and',
      h1b: 'what action to take.',
      ctas: ['Request a demo', 'See how it works'],
      sub: 'This is not another tool for sending more messages. Neety tells you which accounts matter today, why, and what your team should do about them.',
      tarjeta: { titulo: 'Neety found companies that fit', filas: [['Betsaide', 94], ['Arania', 91], ['Fagor Automation', 88]] as [string, number][] },
    },
  },
};
