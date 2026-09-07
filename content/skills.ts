/**
 * Skills, derived from the repositories rather than from memory.
 *
 * Counted on 8 September 2026 by walking E:\PROJECTS with node_modules,
 * virtualenvs, .git, __pycache__, datasets and .next excluded:
 *
 *   Python      358 files   hotpath, halflife-gc, counterexample, nnverify,
 *                           TerraHawk, DermaCare, smart-mirror
 *   Go           19 files   loadshed, across 10 internal packages
 *   TypeScript   44 files   Riches Garden, DermaCare front end, this site
 *   JavaScript   22 files   the audit tooling, all .mjs
 *
 * Anything that did not survive that count came off the list. Java and C were
 * on the old inventory with no source file behind either. SQL was listed with
 * no .sql file anywhere; SQLite survives because there is a service that uses
 * it. Jupyter went because there is not one notebook. Docker and Postman went
 * for the same reason.
 *
 * Every group says where its evidence is, because a list of technologies with
 * nothing behind it is the cheapest thing on a portfolio to write.
 */

export type SkillGroup = {
  group: string
  /** Where the proof is. Rendered, not decorative. */
  source: string
  items: string[]
  /** Opened by default. One group only. */
  open?: boolean
}

export const skills: SkillGroup[] = [
  {
    group: 'Languages',
    source: 'File counts across nine repositories',
    open: true,
    items: [
      'Python · 358 files',
      'Go · 19 files',
      'TypeScript · 44 files',
      'JavaScript · 22 files',
    ],
  },
  {
    group: 'Systems',
    source: 'hotpath, halflife-gc, raftfuzz, loadshed. Three of the four have no third-party dependency at all.',
    items: [
      'JIT compilation',
      'x86-64 code generation',
      'Register allocation',
      'Subset construction / DFA',
      'Bytecode VM design',
      'Generational garbage collection',
      'Pretenuring',
      'Deterministic simulation',
      'Delta debugging',
      'Adaptive concurrency',
      'Load shedding',
      'Circuit breaking',
      'Priority queueing',
    ],
  },
  {
    group: 'AI and ML',
    source: 'DermaCare (torch 2.0.1), TerraHawk (torch 2.5.1+cu124), nnverify, smart-mirror',
    items: [
      'PyTorch',
      'torchvision',
      'Transfer learning · MobileNetV2',
      'Class-imbalance handling',
      'Weighted sampling and weighted loss',
      'Albumentations',
      'OpenCV',
      'MediaPipe',
      'DeepFace',
      'face_recognition',
      'Feature pyramid networks',
      'Abstract interpretation',
      'Branch and bound',
    ],
  },
  {
    group: 'Language models',
    source: 'smart-mirror: a three-provider router with failover, 70 call sites across the vision, voice and memory modules',
    items: [
      'Groq',
      'Google Gemini',
      'OpenAI',
      'Multi-provider routing',
      'Failover and timeouts',
      'Latency telemetry',
    ],
  },
  {
    group: 'Backend',
    source: 'DermaCare (FastAPI), smart-mirror (asyncio, WebSockets, four REST integrations)',
    items: [
      'FastAPI',
      'Uvicorn',
      'Pydantic',
      'asyncio',
      'WebSockets',
      'REST API design',
      'Event bus',
      'State machines',
      'Cache staleness handling',
      'OAuth integrations',
    ],
  },
  {
    group: 'Front end',
    source: 'Riches Garden, the DermaCare front end, and this site',
    items: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Motion',
      'SVG and CSS animation',
      'Webfont subsetting',
      'Accessible markup',
    ],
  },
  {
    group: 'Quality',
    source: 'Riches Garden ships five audit scripts that run before release; all five systems repos run GitHub Actions',
    items: [
      'axe-core auditing',
      'Contrast measured from rendered pixels',
      'Responsive auditing',
      'Core Web Vitals',
      'Playwright',
      'GitHub Actions CI',
      'Seeded defect benchmarks',
      'Dataset and split auditing',
    ],
  },
  {
    group: 'Data',
    source: 'smart-mirror memory service, nnverify, the DermaCare evaluation',
    items: ['SQLite', 'NumPy', 'SciPy', 'Matplotlib', 'Schema design', 'Held-out evaluation design'],
  },
  {
    group: 'Analysis',
    source: 'Veniteck Solutions, May to August 2026. Client deliverables, not published here.',
    items: [
      'Market sizing',
      'Unit economics',
      'Competitive analysis',
      'Regulatory context mapping',
      'PRD and BRD authoring',
      'Financial modelling',
    ],
  },
]
