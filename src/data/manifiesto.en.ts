// El manifiesto en inglés (traducción de manifiesto.ts; mismas claves). [[…]] = la frase que la savia subraya.
import type { manifiesto as ManifiestoEs } from './manifiesto';

export const manifiesto: typeof ManifiestoEs = {
  titulo: 'Manifesto',
  firma: 'Eric and Andoni',
  principios: [
    {
      num: '01',
      lema: 'Your own voice.',
      texto:
        'Your website should sound like you and be [[true to your brand]]. It should tell what makes your project special. That is why, before we build anything, we sit down with you, side by side, to understand what you need.',
    },
    {
      num: '02',
      lema: 'You set the pace of your business.',
      texto:
        'Agentic development lets us explore and iterate with agility, and judgement guides every decision. We come from hand-crafted pixel-perfect work and today we work with AI every day. But it is not the one holding the baton: AI is the foundation, [[the judgement is still ours]]. That is how we avoid AI slop and arrive at something tailor-made.',
    },
    {
      num: '03',
      texto:
        'As a result of this process you take away a [[recipe of your own]]: a library of skills designed so your project can scale with AI without losing its voice.',
    },
  ],
  cierre: 'That is savvia agentic: your website, orchestrated with AI and judgement.',
  capitulos: [
    {
      num: 'I',
      cap: 'Chapter one',
      etiqueta: 'Your own voice',
      parrafos: [
        'Your website should sound like you and be [[true to your brand]]. It should tell what makes your project special.',
        'That is why, before we build anything, we sit down with you, side by side, to understand what you need.',
      ],
    },
    {
      num: 'II',
      cap: 'Chapter two',
      etiqueta: 'The pace',
      parrafos: [
        'You set the pace of your business. Agentic development lets us explore and iterate with agility, and judgement guides every decision. We come from hand-crafted pixel-perfect work and today we work with AI every day.',
        'But it is not the one holding the baton: AI is the foundation, [[the judgement is still ours]]. That is how we avoid AI slop and arrive at something tailor-made.',
      ],
    },
    {
      num: 'III',
      cap: 'Chapter three',
      etiqueta: 'The recipe',
      parrafos: [
        'As a result of this process you take away a [[recipe of your own]]:',
        'a library of skills designed so your project can scale with AI without losing its voice.',
      ],
    },
  ],
  listas: [
    { titulo: 'The method', items: ['Understand', 'Decide', 'Document', 'Deliver'] },
    { titulo: 'End to end', items: ['Digital design', 'Agentic development', 'The recipe: savvia.md', 'Training for your team'] },
  ],
};
