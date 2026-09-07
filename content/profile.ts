/**
 * Every fact about Aditya, in one place.
 *
 * Sourced from D:\Resumes\Aditya_S_Resume_MASTER.docx (2 September 2026), which
 * is the document of record. Nothing here is written anywhere else in the app.
 *
 * Rule: if a claim is not in the master resume or in a project's own README and
 * results files, it does not go on the site.
 */

export const profile = {
  name: 'Aditya S',
  location: 'Bangalore, India',
  phone: '+91 99724 52243',
  email: 'adityasrinivasofficial@gmail.com',
  github: 'https://github.com/Aditya2k5here',
  githubHandle: 'Aditya2k5here',
  linkedin: 'https://linkedin.com/in/aditya-srinivas3',
  linkedinHandle: 'aditya-srinivas3',
  leetcode: 'https://leetcode.com/u/aditya-srinivas3',

  /* The one line. Backend and systems first; ML is a component he operates. */
  headline: 'Backend and systems engineer',
  strap: 'Schedulers, collectors, verifiers, gateways. The layer underneath, and what it actually does.',

  graduating: 'May 2027',
} as const

/**
 * The whole schooling, oldest first.
 *
 * Rendered as a skyline: each stage is a building, and the buildings get taller
 * as they get more recent, so the degree is the tower and LKG is the low block
 * beside it. The height carries the timeline; the labels carry the facts.
 */
export const education = {
  current: {
    degree: 'B.E. in Information Science & Engineering',
    institution: 'Atria Institute of Technology (VTU)',
    place: 'Bangalore',
    period: '2023 – 2027',
    standing: 'Semester VII',
    expected: 'Graduating May 2027',
    cgpa: '8.22 / 10.0',
    cgpaNote: 'through Semester VI · no backlogs',
  },

  /** Ordered oldest to newest. `weight` drives the building height, 1–4. */
  timeline: [
    {
      stage: 'LKG – Class V',
      school: 'New Horizon Public School',
      place: 'Indiranagar, Bangalore · ICSE',
      result: null,
      weight: 1,
    },
    {
      stage: 'Class VI – X',
      school: 'Navkis Educational Centre',
      place: 'Gokula, Bangalore',
      result: '90.0%',
      resultLabel: 'Class X, CBSE',
      weight: 2,
    },
    {
      stage: 'Class XI – XII',
      school: 'Chetana PU College',
      place: 'Deeksha Vedantu, Yelahanka, Bangalore',
      result: '86.16%',
      resultLabel: 'PUC, 2023',
      weight: 3,
    },
    {
      stage: 'B.E. Information Science',
      school: 'Atria Institute of Technology',
      place: 'Bangalore · VTU',
      result: '8.22',
      resultLabel: 'CGPA / 10, through Sem VI',
      weight: 4,
    },
  ],

  semesters: [
    { n: 'I', sgpa: 7.9 },
    { n: 'II', sgpa: 8.7 },
    { n: 'III', sgpa: 8.1 },
    { n: 'IV', sgpa: 7.89 },
    { n: 'V', sgpa: 8.09 },
    { n: 'VI', sgpa: 8.67 },
  ],

  coursework: [
    'Data Structures and Algorithms',
    'Operating Systems',
    'Computer Networks',
    'DBMS',
    'Software Engineering',
    'Object Oriented Programming',
  ],
} as const

export const publication = {
  title: 'Digital Heritage Preservation Technologies for Monasteries of Sikkim',
  venue: 'Advancement in Image Processing and Pattern Recognition',
  year: '2026',
  note: 'AI and VR system for monastery digitisation and virtual tourism.',
} as const

export const experience = [
  {
    role: 'Business Strategy Intern',
    org: 'Veniteck Solutions',
    place: 'Bangalore, India',
    period: 'May – Aug 2026',
    /* Two ventures, two continents, four months. Kept here rather than in the
       work index because none of it is engineering and pretending otherwise
       would be the easiest thing on this site to catch me out on. */
    lede: 'Two international ventures, taken from an open brief to something an investor could actually read.',
    bullets: [
      'DrvMee, an on-demand driver service for Australia, aimed at people who own a car they cannot always drive. Took it from a one-paragraph brief to a pre-seed package: market sizing, operating model, unit economics, a financial model, a product blueprint written as a PRD, a founder roadmap and an investor deck.',
      'OPMS, an agri-tech operations platform entering Papua New Guinea, where the regulatory and connectivity assumptions are genuinely not the ones you would default to. Ran the competitive analysis and regulatory context mapping, and wrote the business requirements through two full revisions.',
      'Everything ran asynchronously across time zones, so every finding had to survive without me in the room to explain it. That constraint did more for my writing than any style guide.',
    ],
    /* The line worth keeping. */
    note: 'The work that mattered was not the sizing. It was writing down what we were deliberately not building, so a scope argument three weeks later took ten minutes instead of an afternoon.',
    artefacts: ['Investor deck', 'Financial model', 'PRD', 'Founder roadmap', 'BRD v1 and v2', 'Competitive analysis'],
    caveat: 'Strategy and requirements, not engineering. I did not build either product, neither had launched when I left, and the deliverables contain client material so they are not published here.',
  },
] as const

export const achievements = [
  {
    title: '1st Place, Cicada Agentic AI Hackathon',
    detail: 'Designed, built and deployed a working agentic AI system inside the event window.',
  },
  { title: 'Winner, Machine Learning Expo and Generative AI Expo', detail: '' },
  {
    title: 'Smart India Hackathon 2025, National round',
    detail: 'SIH25061. Led system architecture and technical documentation for a government-issued problem statement.',
  },
  {
    title: 'Event Organiser, IEEE Student Chapter',
    detail: '5+ technical events, 100+ attendees.',
  },
] as const

export const certifications = [
  { name: 'Machine Learning and Deep Learning Specialization', issuer: 'Stanford Online / DeepLearning.AI' },
  { name: 'Software Engineering, Cloud Computing and Cyber Security', issuer: 'Infosys Springboard' },
  { name: 'Full Stack Development', issuer: 'SimpliLearn' },
  { name: 'Java', issuer: 'IIT Bombay' },
] as const

/** Five. Listed in order of fluency as stated on the resume. */
export const languages = [
  'English',
  'Hindi',
  'Kannada',
  'Malayalam',
  'Tamil',
] as const

/**
 * Skills, grouped the way an engineer would group them rather than as one
 * undifferentiated cloud. The master resume carries a much longer inventory
 * split per role variant; this is the union, de-duplicated.
 */
export const skills = [
  { group: 'Languages', items: ['Python', 'Go', 'TypeScript', 'JavaScript', 'Java', 'SQL', 'C'] },
  {
    group: 'Systems',
    items: [
      'Garbage collection',
      'Bytecode VMs',
      'JIT compilation (x86-64)',
      'Concurrency control',
      'Load shedding',
      'Deterministic simulation',
      'Formal verification',
    ],
  },
  {
    group: 'Backend',
    items: ['FastAPI', 'Node.js', 'Express', 'asyncio', 'WebSockets', 'REST API design', 'Server-side validation'],
  },
  {
    group: 'Data',
    items: ['PostgreSQL', 'MySQL', 'SQLite', 'MongoDB', 'Schema design', 'Indexing', 'Query optimisation', 'Migrations'],
  },
  {
    group: 'ML',
    items: ['PyTorch', 'scikit-learn', 'YOLOv5', 'Feature Pyramid Networks', 'OpenCV', 'Class-imbalance handling', 'Transfer learning'],
  },
  {
    group: 'LLM',
    items: ['LangChain', 'Multi-provider routing (Groq / Gemini / OpenAI)', 'Agentic workflows', 'Prompt engineering'],
  },
  {
    group: 'Frontend',
    items: ['React 19', 'Next.js 16', 'Tailwind CSS', 'Accessible UI', 'HTML5', 'CSS3'],
  },
  {
    group: 'Quality',
    items: ['axe-core auditing', 'Core Web Vitals', 'Headless browser automation', 'WCAG contrast', 'Test design', 'Root cause analysis'],
  },
  {
    group: 'Analysis',
    items: ['Market sizing', 'Unit economics', 'Competitive analysis', 'Tableau', 'Power BI', 'Excel modelling'],
  },
  { group: 'Tools', items: ['Git', 'Linux', 'Docker-free deploys', 'Postman', 'Jupyter', 'Lighthouse', 'VS Code'] },
] as const

/**
 * The personal side, in his own words, tightened. Not embellished. These are
 * the things he actually said, written properly.
 */
export const personal = {
  opening:
    'I got into fitness properly a couple of years ago, and losing the weight taught me the only thing that has ever reliably worked for me: show up on the days it is boring.',
  paragraphs: [
    'That habit is most of why the projects on this site exist. None of them were finished in a burst. They were finished on ordinary evenings when the interesting part was already over and what remained was the measuring, the writing up, and the parts that did not work.',
    'Away from a screen I ride. I like long routes with no particular destination, and I take a camera because I notice things, light, structure, a good frame. That eye leaks into the work; I care what an interface looks like for the same reason I care what a README reads like.',
    'I am comfortable in a room. I can explain a technical trade-off to someone who does not share my vocabulary, argue a position without needing to win, and change my mind out loud. Most of what I build is decided in conversation before any of it is written.',
  ],
} as const
