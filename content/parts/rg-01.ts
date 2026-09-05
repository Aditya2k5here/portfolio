import type { Part } from './types'

export const rg01: Part = {
  id: 'RG-01',
  slug: 'riches-garden',
  name: 'Riches Garden Ganeshothsava',
  order: 1,
  status: 'shipped',
  evidence: ['live', 'repo', 'screens'],
  thesis: '21 years. One site. Zero databases.',
  problem:
    'A residents’ festival committee in Ramamurthy Nagar, Bengaluru, needed a site for the 21st year of their Ganeshothsava (18–20 September 2026).',
  result:
    'A static site holding every fact about the festival in nine content files, deployed to a CDN, with nothing left running for the committee to maintain.',
  stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Motion'],
  indexFact: 'Kannada webfonts subset 89 KB → 14 KB',

  decisions: [
    {
      choice: 'Content/design separation as an architectural rule',
      because:
        'nine files under content/ hold every fact; nothing about the festival is written inside a component; rolling to next year is a documented four-line edit',
    },
    {
      choice: 'Kannada fonts subset to the 33 characters in use',
      because:
        'but keeping every combining mark, because the shaper decomposes vowel signs before applying substitutions and subsetting on visible text alone silently breaks conjunct clusters — it looks correct until you diff it against the original',
    },
    {
      choice: 'Five audit scripts driving the Chrome already on the machine',
      because:
        'qa (links, anchors, assets, routes, dates, console errors), audit:a11y (axe-core, heading order, landmarks), audit:contrast (measured from rendered pixels), audit:responsive (overflow, tap targets, QR size at 7 widths), audit:perf (transfer weight, Core Web Vitals)',
    },
    {
      choice: "CSP script-src allows 'unsafe-inline'",
      because:
        'a per-request nonce forces dynamic rendering and gives up static CDN delivery; acceptable with no user input and no dangerouslySetInnerHTML anywhere, with a written trigger to move to a nonce if a form is ever added',
    },
    {
      choice: '/programme/children excluded in robots.ts',
      because: 'it carries children’s names',
    },
  ],

  notBuilt: [
    {
      rejected: 'Postgres + Prisma',
      because:
        'the committee already ran on a Google Form feeding the sheet they pick the running order in',
    },
    { rejected: 'Admin dashboard', because: 'same' },
    { rejected: 'Auth', because: 'nobody to authenticate' },
    { rejected: 'REST API for registrations', because: 'thirty names a year' },
    {
      rejected: 'A server to keep running',
      because: 'they would have to maintain it after I graduate',
    },
  ],

  measurements: [
    { label: 'Noto Sans Kannada, subset', from: '89 KB', value: '14 KB' },
    { label: 'Noto Serif Kannada, subset', from: '119 KB', value: '17 KB' },
    { label: 'Databases', value: '0' },
    { label: 'Third-party scripts', value: '0' },
    { label: 'Content files holding every fact', value: '9' },
  ],

  limitations: [
    'Static site for a small local audience. No load testing.',
    'The engineering is in the build and the content model, not in runtime scale.',
    'Committee photographs are of real residents and children and are withheld from this case study.',
  ],

  links: [
    { label: 'Repository', href: 'https://github.com/Aditya2k5here/riches-garden-ganeshothsava' },
  ],

  plates: [],

  caseStudy: {
    standfirst:
      'The committee had a working process. The interesting engineering was deciding not to replace it.',
    sections: [
      {
        heading: 'The system that already existed',
        body: [
          'Before any of this, the festival ran on a Google Form. Residents entered their names for the cultural programme, the responses landed in a sheet, and the committee sorted that sheet by hand into a running order on the evening before each night.',
          'The obvious brief was to replace that. Registrations table, admin dashboard, an interface for ordering the programme, authentication so only committee members could touch it. That is the version of this project that would have looked most like software engineering.',
          'It is also the version that would have been abandoned. The committee is a group of residents who run this for three days a year. The form is a tool they already understand and already trust, and it costs them nothing to operate. Replacing it would have meant handing them a system whose failure modes only I understood, and then graduating.',
        ],
        aside: 'A database is not automatically an architecture improvement.',
      },
      {
        heading: 'Where the work went instead',
        body: [
          'With storage off the table, the remaining problem is that every fact about the festival has to live somewhere, be correct, and be changeable by someone who is not me next September.',
          'So the rule became architectural rather than stylistic: nothing about the festival may be written inside a component. Nine files under content/ hold the dates, the programme, the committee, the contact details, the contribution information, the stage plan and the two languages. Components take that data and lay it out. They do not know what a Ganeshothsava is.',
          'The payoff is that rolling the site to the 22nd year is a documented four-line edit, not a hunt through JSX for hardcoded strings. That property is the deliverable. The visual design is downstream of it.',
        ],
      },
      {
        heading: 'The font problem, which is the actual hard part',
        body: [
          'The site is bilingual, and Kannada webfonts are heavy. Noto Sans Kannada and Noto Serif Kannada together are over 200 KB before anything else loads, on a site whose audience is opening it on mid-tier Android over mobile data.',
          'Subsetting is the standard fix: ship only the glyphs the page actually uses. The naive version of this — collect the visible characters, subset to those — produces a font that renders correctly in every spot check and is silently broken.',
          'Kannada is an abugida. Vowel signs and consonant conjuncts are composed by the shaper at layout time: it decomposes what you typed, then applies substitution and positioning rules from the font’s own tables to assemble the cluster you actually see. Those rules reference glyphs that never appear as characters in your source text. Subset on visible characters alone and you strip the components the shaper needs, so conjunct clusters quietly fall back to a default form.',
          'The fix is to subset to the 33 characters in use while keeping every combining mark and the layout tables intact. The result is 14 KB and 17 KB, down from 89 KB and 119 KB, and it survives a diff against the original rendering rather than merely looking plausible.',
        ],
        aside: 'A font can look correct and still be technically broken.',
      },
      {
        heading: 'Checking it, without adding anything to check it with',
        body: [
          'Five audit scripts drive the Chrome already installed on the machine. qa walks links, anchors, assets, routes, dates and console errors. audit:a11y runs axe-core plus heading order and landmark checks. audit:contrast measures from rendered pixels rather than from the token values, because the token values are what you intended and the pixels are what shipped. audit:responsive checks overflow, tap targets and QR legibility at seven widths. audit:perf reads transfer weight and Core Web Vitals.',
          'None of that is a service. It is scripts against a browser that was already there, which is the same decision as the database, applied to tooling.',
        ],
      },
      {
        heading: 'What I accepted, and wrote down',
        body: [
          'The Content-Security-Policy allows unsafe-inline for script-src. A per-request nonce is the correct answer in general, but it forces dynamic rendering and gives up static CDN delivery — which is the property the whole project is built on.',
          'That trade is acceptable only under specific conditions: no user input anywhere on the site, and no dangerouslySetInnerHTML. Both hold today. So the decision is recorded with a written trigger: if a form is ever added, move to a nonce. A trade-off you have written down with its expiry condition is an engineering decision. The same trade-off undocumented is a vulnerability you have not noticed yet.',
          'Separately, /programme/children is excluded in robots.ts, because that page carries children’s names.',
        ],
      },
    ],
  },
}
