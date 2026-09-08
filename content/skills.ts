/**
 * Skills.
 *
 * Drawn from the repositories, the five role variants in
 * D:\Resumes\Aditya_S_Resume_MASTER.docx, and the Veniteck internship. Nothing
 * here is unsupported by at least one of those three.
 *
 * Two tiers per group. `lead` is what somebody scanning for a role needs to
 * see without doing anything, ordered so the first item is the one they would
 * ask about. `more` is everything real that would turn the section into a
 * keyword wall if it were all on screen at once.
 *
 * Groups are ordered for the roles he is actually applying to: engineering,
 * then AI and ML, then data and analytics, then quality, then product.
 */

export type SkillGroup = {
  group: string
  /** One line. What this group is for, not what is in it. */
  note: string
  lead: string[]
  more: string[]
}

export const skills: SkillGroup[] = [
  {
    group: 'Engineering',
    note: 'The languages I reach for, and the habits around them.',
    lead: ['Python', 'Go', 'TypeScript', 'JavaScript', 'SQL', 'Java'],
    more: [
      'Git',
      'Linux',
      'GitHub Actions',
      'REST API design',
      'System design',
      'Data structures and algorithms',
      'Object-oriented programming',
      'Operating systems',
      'Computer networks',
    ],
  },
  {
    group: 'Backend and systems',
    note: 'Services, and the layer underneath them.',
    lead: ['FastAPI', 'Node.js', 'asyncio', 'WebSockets', 'Concurrency control', 'Server-side validation'],
    more: [
      'Express',
      'JIT compilation',
      'x86-64 code generation',
      'Garbage collection',
      'Bytecode VMs',
      'Load shedding',
      'Adaptive concurrency',
      'Circuit breaking',
      'Deterministic simulation',
    ],
  },
  {
    group: 'AI and machine learning',
    note: 'Models as components with failure modes, not as magic.',
    lead: ['PyTorch', 'scikit-learn', 'TensorFlow', 'Keras', 'OpenCV', 'Transfer learning'],
    more: [
      'YOLOv5',
      'MediaPipe',
      'Feature Pyramid Networks',
      'CNNs',
      'Classification and regression',
      'Clustering',
      'Class-imbalance handling',
      'Hyperparameter tuning',
      'Formal verification',
    ],
  },
  {
    group: 'Language models',
    note: 'Routing, failover, and knowing when not to trust the answer.',
    lead: ['LangChain', 'Groq', 'Gemini', 'OpenAI', 'Prompt engineering'],
    more: ['Multi-provider routing', 'Agentic workflows', 'Failover and timeouts', 'Latency telemetry'],
  },
  {
    group: 'Data and analytics',
    note: 'Getting it out, and getting it right.',
    lead: ['SQL', 'pandas', 'NumPy', 'Power BI', 'Tableau', 'Excel modelling'],
    more: [
      'PostgreSQL',
      'MySQL',
      'MongoDB',
      'SQLite',
      'Schema design',
      'Indexing',
      'Query optimisation',
      'Exploratory data analysis',
      'Feature engineering',
      'Cohort and trend analysis',
      'Matplotlib',
    ],
  },
  {
    group: 'Quality',
    note: 'I write the thing that tries to break it.',
    lead: ['Test design', 'axe-core auditing', 'Playwright', 'Root cause analysis', 'Dataset auditing'],
    more: [
      'Headless browser automation',
      'WCAG contrast',
      'Core Web Vitals',
      'Held-out evaluation design',
      'Seeded defect benchmarks',
      'Balanced accuracy, precision, recall, F1',
      'Confusion matrices',
      'Cross-validation',
    ],
  },
  {
    group: 'Product and analysis',
    note: 'Four months of turning open briefs into things people could act on.',
    lead: ['Requirements (PRD, BRD)', 'Market sizing', 'Unit economics', 'Competitive analysis'],
    more: [
      'Regulatory context mapping',
      'Operating models',
      'Scope and non-goals',
      'Acceptance criteria',
      'Prioritisation',
      'Workflow design',
      'Stakeholder documentation',
    ],
  },
  {
    group: 'Front end',
    note: 'Enough to ship the whole thing myself.',
    lead: ['React', 'Next.js', 'Tailwind CSS', 'Accessible UI', 'HTML5', 'CSS3'],
    more: ['Responsive design', 'SVG and CSS animation', 'Webfont subsetting', 'Motion'],
  },
]
