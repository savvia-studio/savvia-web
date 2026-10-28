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
  // RONDA 297: the new manifesto (see manifiesto.ts).
  entrada: 'savvia exists to orchestrate the design and development of your website with AI.',
  capitulos: [
    {
      num: 'I',
      parrafos: [
        'Your product has moved forward, and so has your team. Yet your website still tells the story of three years ago.',
        'It is out of step with your brand. It is hard to maintain and the design breaks with every change. And if you rebuilt it with AI, it may look like AI slop.',
      ],
    },
    { num: 'II', parrafos: ['Your website should sound like you.'] },
    {
      num: 'III',
      parrafos: [
        'We start from within, like sap. We listen to understand what your project needs.',
        'Sap carries everything the tree has lived through. savvia, everything learned with every client since 2020.',
        'With your vision and our judgement, we create guidelines unique to you.',
      ],
    },
    {
      num: 'IV',
      parrafos: [
        'And we hand you your website connected to AI, ready to use: a repository linked to your Claude or ChatGPT subscription, from which you can keep evolving it without losing anything we have built together.',
      ],
    },
    {
      num: 'V',
      parrafos: [
        'That only works with guardrails. Every decision on design, motion or components is captured in the system, the source of truth for your website.',
        'In practice, it is a set of .md files that solve the unknowns of bringing your visual identity to a website.',
      ],
    },
    { num: 'VI', parrafos: ['savvia is nourishment and energy. savvia is judgement.'] },
  ],
  listas: [
    { titulo: 'The method', items: ['Understand', 'Decide', 'Document', 'Deliver'] },
    { titulo: 'End to end', items: ['Digital design', 'Agentic development', 'The recipe: savvia.md', 'Training for your team'] },
  ],
};
