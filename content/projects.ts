/**
 * The work, in the order it should be read.
 *
 * Every number is copied from that project's own results file, or from a run
 * done on this machine with the date recorded. Nothing is rounded up, nothing
 * is inferred, and the results that went the wrong way are kept. They are in
 * the repositories either way, and they are the more interesting half.
 *
 * A note on the names. Five of these used to be one-word abstract nouns that
 * arrived at the same time and read as a set. Three were renamed to plainer,
 * more specific things, and the repository URLs still point at the old paths
 * until those repositories are renamed on GitHub.
 */

export type Status = 'shipped' | 'complete' | 'built' | 'local' | 'in-progress' | 'published'

export type Metric = {
  label: string
  value: string
  /** Shown smaller, under the value. */
  note?: string
  /** Draws the eye. At most one or two per project. */
  emphasis?: boolean
}

export type Project = {
  id: string
  slug: string
  name: string
  /** One line, spoken not written. This is what shows in the closed index. */
  tagline: string
  track: 'Systems' | 'Applied ML' | 'Product' | 'Web'
  year: string
  status: Status
  role?: string
  /** Where the work was shared, so a reader can tell what was mine. */
  team?: { name: string; role: string }[]
  /** Marked out in the index. One project only. */
  star?: boolean
  /**
   * Built / Explored / Designed / Planned. Used where a project spans several
   * maturity levels and blurring them would overclaim.
   */
  evidenceGrades?: { grade: 'Built' | 'Explored' | 'Designed' | 'Planned'; items: string }[]
  stack: string[]
  repo?: string
  live?: string
  /** A real screenshot, where one says more than a metrics table would. */
  shot?: { src: string; alt: string; caption: string }
  /** Two or three paragraphs. The actual explanation. */
  body: string[]
  /** The pull quote. One sentence that could only come from this project. */
  insight: string
  metrics: Metric[]
  /** Where it goes next. Honest about what is not finished, framed forward. */
  next: string[]
  featured?: boolean
}

export const projects: Project[] = [
  /* ------------------------------------------------------------------ 01 */
  {
    id: 'dermacare',
    slug: 'dermora-ai',
    name: 'Dermora AI',
    tagline: 'A skin lesion classifier that knows when to stay quiet.',
    track: 'Applied ML',
    year: '2026',
    status: 'in-progress',
    role: 'Started as DermaCare. Now Dermora AI, with a paper in preparation.',
    stack: ['PyTorch', 'MobileNetV2', 'FastAPI', 'Next.js', 'HAM10000', 'ISIC 2019'],
    repo: 'https://github.com/Aditya2k5here/skin-lesion-classifier',
    featured: true,
    body: [
      'MobileNetV2 over 28,010 dermatoscopic images across seven classes, served through FastAPI. Below 0.15 confidence or above 1.85 entropy it abstains rather than guessing.',
      'Auditing my own evaluation found the split leaking: ISIC 2019 contains all of HAM10000, so 3,110 validation images were also in training. Rebuilt clean, 62.7% balanced accuracy is a number I can defend. It continues as Dermora AI.',
    ],
    insight:
      'Finding the leak in my own validation set was worth more than any accuracy figure I could have reported without it.',
    metrics: [
      { label: 'Images across 7 classes', value: '28,010', note: 'HAM10000 and ISIC 2019', emphasis: true },
      { label: 'Contaminated pairs found and removed', value: '3,110', note: '47.5% of the original split', emphasis: true },
      { label: 'Balanced accuracy, clean split', value: '62.7%', note: 'the baseline everything now builds on' },
      { label: 'Abstention thresholds', value: '0.15 / 1.85', note: 'confidence and entropy' },
      { label: 'Held-out images evaluated', value: '3,225' },
    ],
    next: [
      'Dermora AI is the continuation, with a paper in preparation.',
      'Melanoma recall is the next target. It sits at 46.1% on the clean split, which is the honest starting line.',
      'Restoring the abstention gate in the served path, now the temperature divisor is understood.',
    ],
  },

  /* ------------------------------------------------------------------ 02 */
  {
    id: 'hotpath',
    slug: 'hotpath',
    name: 'Hotpath',
    tagline: 'A regex engine that writes x86-64 at runtime, and knows when not to.',
    track: 'Systems',
    year: '2026',
    status: 'complete',
    stack: ['Python', 'x86-64', 'Subset construction', 'JIT', 'Register allocation'],
    repo: 'https://github.com/Aditya2k5here/hotpath',
    featured: true,
    body: [
      'Three tiers: a backtracking interpreter, an interpreted DFA, and generated machine code. Compiling costs 0.5 to 3ms before it buys a single faster match, so the question is when, not how.',
      'Twelve workloads replayed against a hindsight oracle. The adaptive policy costs 1.38× the optimum; the call counter most production JITs ship costs 45.06×. Written with no third-party dependencies.',
    ],
    insight:
      'The heuristic that most production JIT compilers actually ship costs 45 times the optimum on this benchmark. The win is not a better predictor. It is a cheaper way of being wrong.',
    metrics: [
      { label: 'Adaptive policy, worst case over 12 workloads', value: '1.38×', note: 'against a hindsight oracle', emphasis: true },
      { label: 'Compile everything on sight', value: '12.80×' },
      { label: 'Call counter, the common heuristic', value: '45.06×' },
      { label: 'Pure backtracking', value: '132.73×' },
      { label: 'Codegen cost per pattern', value: '0.2–1.3 ms', note: 'plus 0.3–2 ms subset construction' },
    ],
    next: [
      'Next: the same policy on ARM, and under a different allocator.',
      'The adaptive guard earns its keep once cold patterns appear.',
    ],
  },

  /* ------------------------------------------------------------------ 03 */
  {
    id: 'terrahawk',
    slug: 'terrahawk',
    name: 'TerraHawk',
    tagline: 'India has a credit bureau. It has no equivalent for the ground.',
    track: 'Product',
    year: '2026',
    status: 'in-progress',
    star: true,
    role: 'Co-founder. Strategy, go to market, customer discovery, product direction.',
    team: [
      { name: 'Jerrish', role: 'Revenue, partnerships, execution' },
      { name: 'Harshavardhan', role: 'Computer vision, model development' },
      { name: 'Aditya', role: 'Strategy, GTM, product direction, requirements' },
    ],
    stack: ['Product strategy', 'Requirements', 'Unit economics', 'Geospatial verification', 'Customer discovery'],
    featured: true,
    body: [
      'Claim a credit history and a bureau checks it in seconds. Claim that 50,000 saplings went into a hillside and nothing does. Insurance, carbon and agricultural lending all move on assertions nobody can verify at scale.',
      'A certified agent is dispatched, and what comes back is a Truth Ticket: GPS polygon, timestamped imagery, an attestation tied to a verified agent, the methodology, a quality score, and a hash over the package. Crop insurance first, because that buyer has budget today.',
      'My lane is the product and the go to market, and the question it turns on: where the automation threshold sits. Harshavardhan owns the vision work, Jerrish owns revenue.',
    ],
    insight:
      'The hardest thing to accept was that a model output is evidence, not a verdict. 48,712 detected trees against a claim of 50,000 is not proof of a lie. It is occlusion, or canopy overlap, or the wrong season, until something else corroborates it.',
    metrics: [
      { label: 'My lane', value: 'Strategy, GTM, product', note: 'not the computer vision' },
      { label: 'Truth Ticket components specified', value: '6', note: 'each with its own tamper-evidence mechanism' },
      { label: 'Beachhead defined', value: 'Crop insurance', note: 'budget exists today, no regulatory unlock needed' },
      { label: 'Stage', value: 'Pre-incubation', note: 'three founders' },
    ],
    evidenceGrades: [
      { grade: 'Built', items: 'Detector codebase, custom architecture, training loop, evaluation suite, dataset audit, experiment sweeps. Team work, led by the CTO.' },
      { grade: 'Explored', items: 'YOLO-style detection, feature pyramid necks, decoupled heads, IoU / GIoU / DIoU / CIoU localisation losses.' },
      { grade: 'Designed', items: 'The Truth Ticket record, evidence fusion across sources, the confidence and uncertainty layer, risk-based triage, chain of custody.' },
      { grade: 'Planned', items: 'Verification APIs, institutional integrations, anomaly signatures, the standard itself.' },
    ],
    next: [
      'The architecture and pipeline exist. Assembling the dataset is the next milestone.',
      'The confidence threshold is reasoned, and waiting on a pilot to validate it.',
      'Truth Ticket scoring is designed and specified, ready to build.',
      'Three founders, pre-incubation, with the first pilot as the goal.',
    ],
  },

  /* ------------------------------------------------------------------ 04 */
  {
    id: 'riches-garden',
    slug: 'riches-garden',
    name: 'Riches Garden',
    tagline: 'A live festival site, and the features I talked the committee out of.',
    track: 'Web',
    year: '2026',
    status: 'shipped',
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'axe-core', 'Playwright'],
    live: 'https://riches-garden-ganeshothsava.vercel.app/',
    featured: true,
    body: [
      'They run on a form and a sheet, about thirty names a year, and would inherit whatever I left behind. The database, the dashboard and the auth were the first three things removed.',
      'Nine content files hold every fact, so next year is a four-line edit. Five audit gates run before release: links, axe-core, contrast sampled from rendered pixels, tap targets across seven viewports, page weight. Subsetting the Kannada webfont took it from 89kB to 14kB.',
    ],
    insight:
      'One of my own audit gates was lying to me. The contrast check read declared CSS colours, but the text sat over a background image, so it was scoring a ratio that never reached anyone’s screen. It samples rendered pixels now.',
    metrics: [
      { label: 'Kannada webfont payload', value: '89 kB → 14 kB', note: 'subset to the 33 glyphs in use', emphasis: true },
      { label: 'Databases', value: '0', note: 'deliberately' },
      { label: 'Third-party scripts', value: '0' },
      { label: 'Pre-release audit gates', value: '5' },
      { label: 'Viewports checked for contrast and tap targets', value: '7' },
    ],
    next: [
      'The engineering lives in the build and the content model, which is the right place for it here.',
      'Committee photographs are of real residents and their children and are deliberately withheld. The children’s programme route is excluded in robots.ts for the same reason.',
      'The repository is private, so there is no code to read. Everything above is checkable against the running site.',
    ],
  },

  /* ------------------------------------------------------------------ 05 */
  {
    id: 'mirror',
    slug: 'ai-lifestyle-mirror',
    name: 'AI Lifestyle Mirror',
    tagline: 'A mirror that wakes when you walk up to it.',
    track: 'Applied ML',
    year: '2026',
    status: 'local',
    stack: ['Python', 'asyncio', 'WebSockets', 'SQLite', 'OpenCV', 'MediaPipe', 'Groq', 'Gemini', 'OpenAI'],
    repo: 'https://github.com/Aditya2k5here/smart-mirror',
    featured: true,
    shot: {
      src: '/shots/mirror.webp',
      alt: 'The mirror running: clock, weather, calendar, briefing, reminders, training mode and the current track',
      caption: 'Running on the bench. Everything on this screen is live.',
    },
    body: [
      'Time, weather, the day’s calendar, a briefing, whatever is playing, and a training mode that counts reps off the camera. Vision, speech and memory run concurrently behind one orchestration layer.',
      'Smoothness came from doing less. Face detection runs every frame; recognition almost never changes, so it does not. Language calls route across three providers by latency and cost, with failover and timeouts written before the happy path.',
    ],
    insight:
      'Every subsystem that felt like it needed to run every frame turned out to be something nobody could perceive changing that fast.',
    metrics: [],
    next: [
      'Needs a webcam, so the screenshot and a recorded demo are how it travels.',
      'Next: a benchmark harness, so the smoothness is measured rather than observed.',
    ],
  },

  /* ------------------------------------------------------------------ 06 */
  {
    id: 'halflife-gc',
    slug: 'halflife-gc',
    name: 'Halflife-GC',
    tagline: 'A garbage collector that guesses how long an object will live, before it exists.',
    track: 'Systems',
    year: '2026',
    status: 'complete',
    stack: ['Python', 'Bytecode VM', 'Generational GC', 'Learned predictor'],
    repo: 'https://github.com/Aditya2k5here/halflife-gc',
    featured: true,
    body: [
      'A small language, a bytecode VM, four collectors, and a lifetime predictor running inside the allocator on every single allocation.',
      'On the particles workload it does 0.02% of the GC work a stock generational collector does. On doc_pipeline it does 190%, and that row is in the published table too.',
    ],
    insight:
      'On one of five workloads the learned predictor is worse than no prediction at all. That row is in the published table, because a result you only report when it flatters you is not a result.',
    metrics: [
      { label: 'GC work on particles', value: '0.02%', note: 'of a stock generational collector', emphasis: true },
      { label: 'GC work on doc_pipeline', value: '190%', note: 'the predictor made it worse', emphasis: true },
      { label: 'Collectors implemented', value: '4', note: 'plus a perfect-knowledge oracle' },
      { label: 'Model AUC, graph_bfs', value: '1.000' },
      { label: 'Model AUC, binarytrees', value: '0.559', note: 'barely better than a coin' },
    ],
    next: [
      'Next: timing it on real hardware rather than counting simulated cost.',
      'Five benchmarks proved the effect. Widening the set is what characterises it.',
    ],
  },

  /* ------------------------------------------------------------------ 07 */
  {
    id: 'raftfuzz',
    slug: 'raftfuzz',
    name: 'RaftFuzz',
    tagline: 'Finds the exact schedule that breaks consensus, then shrinks it until a person can read it.',
    track: 'Systems',
    year: '2026',
    status: 'complete',
    stack: ['Python', 'Raft', 'Deterministic simulation', 'Delta debugging'],
    repo: 'https://github.com/Aditya2k5here/counterexample',
    featured: true,
    body: [
      'Nothing touches the clock, threads, sockets or random. Every nondeterministic choice is drawn from a list of small integers, so a run is a pure function of that list and any failure reproduces exactly, on any machine.',
      'Failures then shrink mechanically by deleting spans and re-running. Zero false positives across 3,000 adversarial schedules against correct code.',
    ],
    insight:
      'Three thousand adversarial schedules against the unmodified implementation reported zero violations. Any number other than zero there would have made every result underneath it meaningless.',
    metrics: [
      { label: 'False positives against correct code', value: '0', note: 'over 3,000 adversarial schedules', emphasis: true },
      { label: 'Seeded Raft defects in the benchmark', value: '8' },
      { label: 'Found in a median of one trial', value: '2 defects', note: 'commit_index_unclamped, no_log_up_to_date_check' },
      { label: 'Never found at any budget', value: '1 defect', note: 'no_persist_voted_for, 1,000 trials' },
      { label: 'Search strategies compared', value: '3', note: 'random, coverage-guided, bandit' },
    ],
    next: [
      'Next: pointing it at an implementation nobody has salted with known bugs.',
      'One of the eight resisted every strategy, which is a lead on where the search is blind.',
    ],
  },

  /* ------------------------------------------------------------------ 08 */
  {
    id: 'nnverify',
    slug: 'nnverify',
    name: 'NNVerify',
    tagline: 'A neural network verifier that is never allowed to answer “I don’t know”.',
    track: 'Applied ML',
    year: '2026',
    status: 'complete',
    stack: ['Python', 'NumPy', 'Abstract interpretation', 'Branch and bound'],
    repo: 'https://github.com/Aditya2k5here/envelope',
    featured: true,
    body: [
      'Give it a network, an input and a radius and it returns one of two things: a proof that no perturbation inside that radius changes the prediction, or the perturbation that does, confirmed by running the network on it.',
      'Cheap bound propagation settles the easy cases; where it cannot, it splits on an unstable ReLU and recurses. 600 queries, zero unknowns, zero soundness failures.',
    ],
    insight:
      'At the radius where the standard relaxation verifies zero inputs, the complete search still proves thirteen. The distance between "cannot prove" and "not true" is the entire project.',
    metrics: [
      { label: 'Queries decided', value: '600 / 600', note: '10 radii × 60 inputs, zero unknown', emphasis: true },
      { label: 'Soundness failures', value: '0' },
      { label: 'Verified at ε = 0.12', value: '13 / 60', note: 'DeepPoly alone verifies 0' },
      { label: 'Branches at ε = 0.14', value: '5,010' },
      { label: 'Network under test', value: '64-24-24-10', note: '48 ReLUs, 97.3% test accuracy' },
    ],
    next: [
      'Next: pushing the network size completeness stays affordable on.',
      'L-infinity today. Rotation and occlusion are the interesting extensions.',
    ],
  },

  /* ------------------------------------------------------------------ 09 */
  {
    id: 'loadshed',
    slug: 'loadshed',
    name: 'LoadShed',
    tagline: 'An API gateway that decides what to fail when there is not enough capacity for everyone.',
    track: 'Systems',
    year: '2026',
    status: 'complete',
    stack: ['Go', 'Adaptive concurrency', 'Load shedding', 'Priority queueing', 'Circuit breaking'],
    repo: 'https://github.com/Aditya2k5here/ballast',
    featured: true,
    body: [
      'Four stages between client and upstream: capacity, deadline, priority, upstream health. Requests carry a priority and a deadline, and the gateway is allowed to refuse them.',
      'At twelve times capacity a limit set too high serves 3 of 735 critical requests. With adaptive control, 735 of 735. Ten internal Go packages.',
    ],
    insight:
      'Adaptive concurrency did not beat a well-tuned fixed limit. It is insurance against the limit being wrong, which is a smaller and much less exciting claim than the one usually made for it.',
    metrics: [
      { label: 'Critical served at 12× overload, limit set too high', value: '3 / 735', emphasis: true },
      { label: 'Critical served at 12× overload, adaptive', value: '735 / 735', emphasis: true },
      { label: 'Critical p99 at 12×, adaptive', value: '207 ms' },
      { label: 'Critical p99 at 12×, well-tuned fixed', value: '180 ms', note: 'the fixed limit wins on latency' },
      { label: 'Measured from', value: 'intended send time', note: 'not dispatch, so coordinated omission is handled' },
    ],
    next: [
      'Next: other traffic shapes and service-time distributions.',
      'The finding worth keeping is that adaptive control buys insurance rather than throughput, which is worth knowing before you spend it.',
    ],
  },

  /* ------------------------------------------------------------------ 10 */
  {
    id: 'sikkim',
    slug: 'digital-heritage',
    name: 'Digital Heritage Preservation',
    tagline: 'A survey of how Buddhist monasteries are being digitised. First author of five.',
    track: 'Applied ML',
    year: '2026',
    status: 'published',
    role: 'First author of five. Published 4 April 2026.',
    stack: ['Survey', 'Image processing', 'VR', 'Cultural heritage'],
    live: 'https://doi.org/10.5281/zenodo.19413268',
    body: [
      'More than 65 publications reviewed across over 100 monasteries, sorted into three layers: immersive visualisation, intelligent interaction, and engagement.',
      'The useful half of a survey is what does not work yet, and it is the same everywhere: bandwidth at remote sites, multilingual accuracy in AI cultural systems, and no funding model that survives the pilot.',
    ],
    insight:
      'Reviewing sixty-five papers taught me more about how to report a limitation than writing any one of my own results did.',
    metrics: [
      { label: 'Publications surveyed', value: '65+', emphasis: true },
      { label: 'Position', value: 'First author', note: 'of five' },
      { label: 'Venue', value: 'Advancement in Image Processing and Pattern Recognition' },
      { label: 'DOI', value: '10.5281/zenodo.19413268' },
    ],
    next: [
      'A survey: it maps the field and proposes a way of organising it.',
      'The three-layer framework is the part worth building on next.',
    ],
  },
]

export const bySlug = (s: string) => projects.find((p) => p.slug === s)

export const counts = {
  projects: projects.length,
  systems: projects.filter((p) => p.track === 'Systems').length,
  publicRepos: projects.filter((p) => p.repo).length,
}
