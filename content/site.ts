import type { FieldNote } from './parts/types'

export const site = {
  name: 'Aditya S',
  /** Never the word "portfolio". */
  category: 'An as-built record',
  statement: 'I build things that have to work.',
  /** The thesis sentence appears once on the whole site. This is the strapline beneath it. */
  disciplines: 'BACKEND · SYSTEMS · ML IN PRODUCTION',
  location: 'Bangalore, India',
  email: 'adityasrinivashere2k5@gmail.com',
  github: 'https://github.com/Aditya2k5here',
  githubLabel: 'github.com/Aditya2k5here',
  linkedin: 'https://linkedin.com/in/aditya-srinivas3',
  linkedinLabel: 'linkedin.com/in/aditya-srinivas3',
  /**
   * Set `resumeFile` once the PDF is in /public. Until then the site prints a stamp
   * instead of a link, because a link that 404s is the thing this record argues against.
   * Filename should stay dated, e.g. '/aditya-s-resume-2026-08.pdf'.
   */
  resumeFile: null as string | null,
  resumeLabel: 'Resume (PDF)',
  contactStatement: 'IF YOU’RE BUILDING SOMETHING DIFFICULT, TALK TO ME.',
}

export const nav = [
  { num: '01', label: 'Work', href: '/' },
  { num: '02', label: 'Field notes', href: '/notes/' },
  { num: '03', label: 'About', href: '/about/' },
  { num: '04', label: 'Contact', href: '/contact/' },
]

/** Capped at 6. A note without a citation does not ship. */
export const fieldNotes: FieldNote[] = [
  { text: 'A database is not automatically an architecture improvement.', cites: 'RG-01' },
  { text: 'A font can look correct and still be technically broken.', cites: 'RG-01' },
  { text: 'Smooth systems are not systems doing more work.', cites: 'SM-02' },
  { text: 'The hard part of a model is deciding what it does when it isn’t sure.', cites: 'DC-03' },
  { text: 'You can specify a system carefully and still not have built it.', cites: 'TH-04' },
]

export const about = {
  /** Serif, verbatim. */
  opening:
    'I like building systems. Sometimes that means writing software. Sometimes it means working out that the software should not exist.',
  paragraphs: [
    'B.E. Information Science Engineering at Atria Institute of Technology (VTU), Bangalore, graduating 2027.',
    'The work is backend and real-time systems: event loops, concurrency, scheduling, the parts of a service that decide what happens when something downstream is slow or gone.',
    'ML is a component I operate rather than a field I claim. A model is a subsystem with a latency budget, a failure mode and a confidence threshold, and most of the engineering is in what it does when it is not sure.',
    'A strategy internship at Veniteck Solutions (May–August 2026), which is why I ask what a system is for before asking how to build it.',
  ],
  research: {
    title: 'Digital Heritage Preservation Technologies for Monasteries of Sikkim',
    note: 'Published paper.',
  },
  portrait: {
    src: '/plates/portrait.webp',
    alt: 'Aditya S, duotone portrait.',
    caption: 'Plate 01 · Portrait',
  },
}

/** Budget vs actual. If a budget is missed, print the miss. */
export type BudgetRow = { metric: string; budget: string; actual: string | null; note?: string }

export const budget: BudgetRow[] = [
  {
    metric: 'JS shipped',
    budget: '< 40 KB',
    actual: '180 KB',
    note: 'MISSED, 4.5×. Next.js App Router ships a React runtime that cannot be reduced to 40 KB; that budget needs a different framework, not a smaller page. My own code is under 3 KB of it.',
  },
  {
    metric: 'Fonts',
    budget: '< 90 KB',
    actual: '132 KB',
    note: 'MISSED. 4 files: Archivo variable is 88 KB of it, the price of the width axis the headings run on.',
  },
  { metric: 'Largest image', budget: '< 180 KB', actual: '79 KB', note: 'plate-terrahawk.webp' },
  { metric: 'Third-party requests', budget: '0', actual: '0' },
  {
    metric: 'LCP, 4G mid-tier Android',
    budget: '< 1.2 s',
    actual: null,
    note: 'not measured on a real device yet — throttled desktop numbers are not the claim',
  },
]

/** What this site itself did not build. The colophon is subject to its own rule. */
export const siteNotBuilt: { rejected: string; because: string }[] = [
  { rejected: 'A CMS', because: 'one author, four parts, and content is typed TypeScript' },
  { rejected: 'MDX for case studies', because: 'one case study, already structured data — a parser for a single document is the thing this site argues against' },
  { rejected: 'Analytics', because: 'I would not have changed anything based on it' },
  { rejected: 'A dark-mode toggle', because: 'the system preference is already the answer' },
  { rejected: 'A contact form', because: 'an address is a contact form with fewer failure modes' },
  { rejected: 'A server', because: 'static export; there is nothing here that needs to run' },
]

/** Contrast measured from the token values, both themes. AA body text needs 4.5:1. */
export const contrast: { pair: string; light: string; dark: string }[] = [
  { pair: 'ink on paper', light: '14.30:1', dark: '14.69:1' },
  { pair: 'graphite on paper', light: '4.61:1', dark: '5.69:1' },
  { pair: 'vermillion on paper', light: '4.56:1', dark: '5.35:1' },
  { pair: 'indigo on paper', light: '8.14:1', dark: '7.79:1' },
]
