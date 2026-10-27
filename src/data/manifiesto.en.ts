// El manifiesto en inglés (traducción de manifiesto.ts; mismas claves). [[…]] = la frase que la savia subraya.
import type { manifiesto as ManifiestoEs } from './manifiesto';

export const manifiesto: typeof ManifiestoEs = {
  titulo: 'Manifesto',
  firma: 'savvia',
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
  entrada: 'The sap of a tree and savvia share the same values.',
  capitulos: [
    {
      num: 'I',
      cap: 'Chapter one',
      etiqueta: 'It runs within.',
      parrafos: [
        'Sap runs within: it nourishes, and that is why the tree blossoms. We begin by listening, side by side with you.',
        'We get to know you, you get to know us and we make you part of the process. Much of the result lives in that bond.',
      ],
    },
    {
      num: 'II',
      cap: 'Chapter two',
      etiqueta: 'It adapts.',
      parrafos: [
        'Sap reaches every branch with what that branch needs.',
        'So do we: we adapt to your project, to its size and to its moment, and whenever we can, we give a little more.',
      ],
    },
    {
      num: 'III',
      cap: 'Chapter three',
      etiqueta: 'It is wise.',
      parrafos: [
        'Sap carries everything the tree has lived through. We carry what we have learned with every client.',
        'With AI, that judgement reaches further.',
      ],
    },
  ],
  listas: [
    { titulo: 'The method', items: ['Understand', 'Decide', 'Document', 'Deliver'] },
    { titulo: 'End to end', items: ['Digital design', 'Agentic development', 'The recipe: savvia.md', 'Training for your team'] },
  ],
};
