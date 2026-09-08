/**
 * Skills, curated.
 *
 * Two sources, both his. The repositories, walked on 8 September 2026 with
 * node_modules, virtualenvs, .git, __pycache__, datasets and .next excluded:
 *
 *   Python 358 files · TypeScript 44 · JavaScript 22 · Go 19
 *
 * And D:\Resumes\Aditya_S_Resume_MASTER.docx, which carries the full inventory
 * across his five role variants. Anything here is in at least one of those two.
 * Nothing is here because it looked good on a list.
 *
 * Curated, not dumped. The master inventory runs to well over a hundred
 * entries with the same thing written three ways in three variants; this is
 * roughly forty, deduplicated, and ordered so the first item in each row is
 * the one he would actually be asked about.
 *
 * `core` marks the ones with a repository behind them, which is what the
 * filter uses.
 */

export type Skill = {
  name: string
  /** There is code in this repository set behind it. */
  core?: boolean
}

export type SkillRow = {
  group: string
  items: Skill[]
}

export const skills: SkillRow[] = [
  {
    group: 'Languages',
    items: [
      { name: 'Python', core: true },
      { name: 'TypeScript', core: true },
      { name: 'JavaScript', core: true },
      { name: 'Go', core: true },
      { name: 'SQL' },
      { name: 'Java' },
    ],
  },
  {
    group: 'Systems',
    items: [
      { name: 'JIT compilation', core: true },
      { name: 'x86-64 codegen', core: true },
      { name: 'Garbage collection', core: true },
      { name: 'Bytecode VMs', core: true },
      { name: 'Deterministic simulation', core: true },
      { name: 'Load shedding', core: true },
      { name: 'Adaptive concurrency', core: true },
      { name: 'Formal verification', core: true },
    ],
  },
  {
    group: 'AI and ML',
    items: [
      { name: 'PyTorch', core: true },
      { name: 'scikit-learn', core: true },
      { name: 'OpenCV', core: true },
      { name: 'MediaPipe', core: true },
      { name: 'Transfer learning', core: true },
      { name: 'Class-imbalance handling', core: true },
      { name: 'YOLOv5' },
      { name: 'TensorFlow' },
      { name: 'Keras' },
    ],
  },
  {
    group: 'Language models',
    items: [
      { name: 'Multi-provider routing', core: true },
      { name: 'Groq', core: true },
      { name: 'Gemini', core: true },
      { name: 'OpenAI', core: true },
      { name: 'LangChain' },
      { name: 'Agentic workflows' },
    ],
  },
  {
    group: 'Backend',
    items: [
      { name: 'FastAPI', core: true },
      { name: 'asyncio', core: true },
      { name: 'WebSockets', core: true },
      { name: 'REST API design', core: true },
      { name: 'Node.js' },
      { name: 'Express' },
    ],
  },
  {
    group: 'Data',
    items: [
      { name: 'SQLite', core: true },
      { name: 'NumPy', core: true },
      { name: 'pandas' },
      { name: 'PostgreSQL' },
      { name: 'MongoDB' },
      { name: 'Schema design' },
      { name: 'Query optimisation' },
    ],
  },
  {
    group: 'Front end',
    items: [
      { name: 'Next.js', core: true },
      { name: 'React', core: true },
      { name: 'Tailwind CSS', core: true },
      { name: 'Accessible UI', core: true },
      { name: 'SVG and CSS animation', core: true },
    ],
  },
  {
    group: 'Quality',
    items: [
      { name: 'axe-core auditing', core: true },
      { name: 'Playwright', core: true },
      { name: 'GitHub Actions', core: true },
      { name: 'Dataset auditing', core: true },
      { name: 'Held-out evaluation design', core: true },
      { name: 'Core Web Vitals', core: true },
    ],
  },
  {
    group: 'Analysis',
    items: [
      { name: 'Market sizing' },
      { name: 'Unit economics' },
      { name: 'Competitive analysis' },
      { name: 'PRD and BRD authoring' },
      { name: 'Tableau' },
      { name: 'Power BI' },
    ],
  },
]

export const skillCounts = {
  total: skills.reduce((n, g) => n + g.items.length, 0),
  core: skills.reduce((n, g) => n + g.items.filter((i) => i.core).length, 0),
}
