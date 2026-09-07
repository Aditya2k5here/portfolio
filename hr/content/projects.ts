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
  /** Two or three paragraphs. The actual explanation. */
  body: string[]
  /** The pull quote. One sentence that could only come from this project. */
  insight: string
  metrics: Metric[]
  /** Required. What it does not do, or where the result went against him. */
  limits: string[]
  featured?: boolean
}

export const projects: Project[] = [
  /* ------------------------------------------------------------------ 01 */
  {
    id: 'dermacare',
    slug: 'dermacare',
    name: 'DermaCare',
    tagline: 'A skin lesion classifier, and the two hours that proved it should not be trusted yet.',
    track: 'Applied ML',
    year: '2026',
    status: 'built',
    stack: ['PyTorch', 'MobileNetV2', 'FastAPI', 'Next.js', 'HAM10000', 'ISIC 2019'],
    featured: true,
    body: [
      'MobileNetV2, ImageNet weights, a new head, seven lesion classes, 28,010 dermatoscopic images pooled from HAM10000 and ISIC 2019. Class-weighted loss and a weighted sampler, because a third of the set is one kind of mole and a model can score well on that set by learning almost nothing. Served through FastAPI behind a Next.js front end, with an abstention gate that declines to answer below 0.15 confidence or above 1.85 entropy.',
      'That gate was the part I was proudest of, so it is the part I went after. On 7 September 2026 I loaded the shipped checkpoint and ran it over every validation image. Balanced accuracy 62.7%. Melanoma recall 46.1%: of 692 melanomas it missed 373, and 244 of those it called outright benign. Then I read the inference path again and found the logits being divided by 0.2 before the softmax. That multiplies every logit by five, so mean confidence reads 0.94 instead of 0.71, calibration error goes from 0.083 to 0.311, and the entropy gate fires zero times in 6,548 images. The safety feature was already switched off by a cosmetic line four functions away.',
      'The split was worse. ISIC 2019 contains all 10,015 HAM10000 images, and the preparation script loads both archives into one list and shuffles it, so 3,110 validation images, 47.5% of the set, are the same image as one in training. Rebuilding the split so that no image and no lesion appears on both sides takes accuracy from 62.6% to 55.7%. Every number quoted here is from the rebuilt split.',
    ],
    insight:
      'Two hours with the checkpoint turned an 80% claim into a 55.7% one. Both numbers came from the same weights; one of them came from a validation set that was half a copy of the training set.',
    metrics: [
      { label: 'Melanoma recall on a clean split', value: '46.1%', note: '244 of 692 melanomas called benign', emphasis: true },
      { label: 'Validation images that were also in training', value: '3,110', note: '47.5% of the split, before the rebuild', emphasis: true },
      { label: 'Balanced accuracy, clean split', value: '62.7%', note: 'accuracy 55.7% across 3,225 images' },
      { label: 'Times the abstention gate fired as shipped', value: '0', note: 'of 6,548. The temperature divisor suppresses it.' },
      { label: 'Calibration error, T = 0.2 against T = 1.0', value: '0.311 / 0.083' },
    ],
    limits: [
      'Not a medical device, not clinically validated, and at this recall it would be dangerous as one. It is a study in evaluation, not a diagnostic tool.',
      'The contaminated split is still what is in the repository. The clean evaluation is a script I ran over it, not a fix to the data pipeline, and both belong in the same sentence.',
      'CPU inference, 243 seconds for 6,548 images. No latency work has been done.',
    ],
  },

  /* ------------------------------------------------------------------ 02 */
  {
    id: 'hotpath',
    slug: 'hotpath',
    name: 'hotpath',
    tagline: 'A regex engine that writes x86-64 machine code at runtime, and an argument about when that is worth doing.',
    track: 'Systems',
    year: '2026',
    status: 'complete',
    stack: ['Python', 'x86-64', 'Subset construction', 'JIT', 'Register allocation'],
    repo: 'https://github.com/Aditya2k5here/hotpath',
    featured: true,
    body: [
      'Compiling a pattern is not free. Subset construction costs 0.3 to 2 ms, code generation another 0.2 to 1.3 ms, and none of it buys a byte of faster matching until the pattern runs often enough to pay the bill. So the engine has three tiers, a backtracking interpreter, an interpreted DFA, and generated machine code, and the interesting question is not how to compile. It is when.',
      'Twelve workloads were replayed against every tiering policy and against a hindsight oracle that sees the whole trace in advance and picks the perfect moment to build each tier. Cost is a multiple of that optimum, so a flawless policy scores 1.00×. The adaptive policy lands at 1.38× worst case. Compiling everything on sight lands at 12.80×. The call counter that ships in most real JITs lands at 45.06×.',
      'The reason the winner wins is the part worth reading. It does not have a better cost model, and the write-up quantifies exactly how mediocre its model is. It wins because it is cheap to be wrong with.',
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
    limits: [
      'One machine, one instruction set. Nothing here says the same policy wins on ARM or under a different allocator.',
      'Take the single-use patterns out of the mix and compiling everything becomes optimal, at which point the adaptive policy costs 25% for nothing.',
    ],
  },

  /* ------------------------------------------------------------------ 03 */
  {
    id: 'terrahawk',
    slug: 'terrahawk',
    name: 'TerraHawk',
    tagline: 'India has a credit bureau. It has no equivalent for the ground. We are building one.',
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
      'Claim a credit history in India and a bureau can check it in seconds. Claim a bank balance, same. Now claim that a hailstorm flattened four hectares of your field, or that 50,000 saplings went into that hillside and four in five are still alive. There is no bureau for that. Insurance payouts, carbon credits, agricultural loans and compliance filings all move on assertions about physical reality that nobody can independently verify at scale, and the money knows it.',
      'TerraHawk is the missing layer. Someone makes a claim, a certified field agent is dispatched, and what comes back is not a photo album: it is a Truth Ticket. A GPS polygon and survey number, timestamped drone imagery, a ground attestation tied to a verified agent identity, the methodology it was assessed against, a platform quality score, and a hash over the whole package. One auditable record an insurer or a lender can act on. The output was specified before anything else, because a verification business is only worth as much as the thing it hands over.',
      'The sequence is deliberate. Crop insurance verification first, since that buyer has budget today and needs no regulatory unlock. The agent network the insurance work funds is the part a competitor cannot copy in a year. Carbon and compliance come last, when the network already exists and is credentialed. Insurance is not the destination, it is what pays for the road.',
      'My lane is the product and the business, not the model. I run customer discovery, write the requirements, hold the scope boundaries, and own the question the whole thing turns on: where the automation threshold sits. Cheap evidence screens everything; expensive evidence gets spent only where risk or disagreement justifies it. That single line decides operating cost, auditability, and whether a regulated buyer will accept the output at all. Harshavardhan owns the vision work. Jerrish owns revenue.',
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
    limits: [
      'No trained model and no accuracy to report. The architecture and the pipeline exist. The dataset does not.',
      'No pilot has run. The confidence threshold the whole product rests on is reasoned, not validated against how a real assessor behaves.',
      'The scoring methodology inside the Truth Ticket is designed, not implemented, and I will not call it built.',
      'Three people, pre-incubation, no paying customer. The business case is argued, not proven.',
    ],
  },

  /* ------------------------------------------------------------------ 04 */
  {
    id: 'riches-garden',
    slug: 'riches-garden',
    name: 'Riches Garden',
    tagline: 'A festival site for a residents’ committee, and the features I talked them out of.',
    track: 'Web',
    year: '2026',
    status: 'shipped',
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'axe-core'],
    repo: 'https://github.com/Aditya2k5here/riches-garden-ganeshothsava',
    featured: true,
    body: [
      'A residents’ committee in Ramamurthy Nagar runs a three-day Ganeshothsava and wanted a site for its 21st year. The obvious build is a registrations table, an admin dashboard and a login. I asked how they run it now. A Google Form into a sheet they sort by hand, about thirty names a year, managed by people who are not engineers and who would inherit whatever I left behind the moment I graduate. So the database, the dashboard and the auth were the first three things I removed.',
      'What replaced them is a content model. Nine files hold every fact about the festival and no component contains a fact of its own, which makes next year a documented four-line edit that a committee member can make without me. The engineering that would have gone into a CRUD layer went into five audit gates that run before every release instead: link and asset integrity with console errors captured, axe-core with heading order and landmarks, contrast and tap targets across seven viewports, and page weight against Core Web Vitals.',
      'The Kannada type is the part I would tell you about at a table. Subsetting to the 33 glyphs actually used cut the webfont from 89 kB to 14 kB, and quietly broke conjunct clusters, because the shaper decomposes vowel signs before substitution and needs glyphs that never appear as characters in the source text. No error, no warning. Just plausible-looking wrong shapes that you only catch by diffing renders.',
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
    limits: [
      'A static site for a few hundred neighbours. No load testing, and the engineering is in the build and the content model rather than in runtime scale.',
      'Committee photographs are of real residents and their children and are deliberately withheld. The children’s programme route is excluded in robots.ts for the same reason.',
    ],
  },

  /* ------------------------------------------------------------------ 05 */
  {
    id: 'mirror',
    slug: 'ai-lifestyle-mirror',
    name: 'AI Lifestyle Mirror',
    tagline: 'Six subsystems on one laptop, each sampled at the rate a person can actually perceive.',
    track: 'Applied ML',
    year: '2026',
    status: 'local',
    stack: ['Python', 'asyncio', 'WebSockets', 'SQLite', 'OpenCV', 'Groq', 'Gemini', 'OpenAI'],
    featured: true,
    body: [
      'A mirror surface that wakes when you walk up to it and shows the time, the weather, the news, and what your posture is doing while you stand there. Vision, voice, memory and four REST integrations run at once behind a single orchestration layer: an event bus, a state manager, a WebSocket broadcaster, and a cache that marks entries stale rather than serving them quietly.',
      'The rule that made it smooth was doing less. Face detection is cheap and runs every frame. Recognition is expensive and almost never changes, so it does not. Emotion changes slowly. Posture, gesture and exercise tracking run off the main loop entirely. The broadcast is capped, because the eyes on the other side of the glass cannot use more than a few updates a second and spending frames on updates nobody perceives is how a camera loop starts stuttering.',
      'Language calls go through a three-provider router ordered by latency and cost, behind 8 and 10 second timeouts, with per-provider latency logged to a diagnostics endpoint. The failure paths were written before the happy path: automatic failover, a cache that admits when it is stale, and a finally block that returns the state machine to idle after a crash instead of leaving a mirror frozen on someone’s face.',
    ],
    insight:
      'Every subsystem that felt like it needed to run every frame turned out to be something nobody could perceive changing that fast. The smoothness came from deleting work, not from optimising it.',
    metrics: [
      { label: 'Concurrent subsystems', value: '6' },
      { label: 'Language providers in the failover chain', value: '3', note: 'ordered by latency and cost' },
      { label: 'Provider timeouts', value: '8 s / 10 s' },
      { label: 'Sustained frame rate', value: 'Not measured', note: 'no benchmark harness yet' },
      { label: 'Frame to broadcast latency, p95', value: 'Not measured' },
    ],
    limits: [
      'One machine, one user, and it needs a webcam, so it cannot be deployed. A recorded demo is the only evidence that can exist.',
      'No benchmark harness and no tests on the concurrent paths. The smoothness claim is observed, not measured, and it is written that way on purpose.',
    ],
  },

  /* ------------------------------------------------------------------ 06 */
  {
    id: 'halflife-gc',
    slug: 'halflife-gc',
    name: 'halflife-gc',
    tagline: 'A garbage collector that guesses how long an object will live, before the object exists.',
    track: 'Systems',
    year: '2026',
    status: 'complete',
    stack: ['Python', 'Bytecode VM', 'Generational GC', 'Learned predictor'],
    repo: 'https://github.com/Aditya2k5here/halflife-gc',
    featured: true,
    body: [
      'Every generational collector makes one hardcoded bet: most objects die young. It is a good bet and the allocator has no way to tell a throwaway string from the root of a cache that will outlive the process. Both go in the nursery, both get scanned, and whichever survives is copied out byte by byte. For the second one that copy was always waste.',
      'So this builds the thing that would know. A small language, a bytecode VM, four collectors, and a lifetime predictor sitting inside the allocator, answering one question on every single allocation: will this still be alive when the nursery next fills?',
      'On the particles workload it does 0.02% of the GC work a stock generational collector does, which is essentially all of the headroom there was. On doc_pipeline it does 190%. Worse than doing nothing, and worse than the naive strategy of pretenuring everything. Both rows are in the same table.',
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
    limits: [
      'A simulated VM, not a production runtime. Costs are counted, not timed on real hardware.',
      'Five benchmark programs. Enough to show the effect exists, nowhere near enough to characterise it.',
    ],
  },

  /* ------------------------------------------------------------------ 07 */
  {
    id: 'raftfuzz',
    slug: 'raftfuzz',
    name: 'raftfuzz',
    tagline: 'Finds the exact sequence of delays, crashes and partitions that breaks a consensus algorithm, then shrinks it until a person can read it.',
    track: 'Systems',
    year: '2026',
    status: 'complete',
    stack: ['Python', 'Raft', 'Deterministic simulation', 'Delta debugging'],
    repo: 'https://github.com/Aditya2k5here/counterexample',
    featured: true,
    body: [
      'Distributed systems bugs are usually not bugs in the code. They are bugs in the ordering. The implementation is correct for every schedule you happened to run and wrong for one you did not, and the day you finally hit it you get a stack trace, a timestamp, and "happens maybe once in a few thousand runs".',
      'This deletes the nondeterminism instead of chasing it. Nothing touches the clock, threads, sockets or the random module. Every nondeterministic decision, message delay, drop, election timer, whether to kill a node right now, even how many nodes there are, is drawn from a choice sequence: a plain list of small integers.',
      'That one decision buys three things. A run becomes a pure function of a list of integers, so a failure reproduces exactly, on any machine, forever. Failures shrink mechanically by deleting spans of integers and re-running. And the shrinking has a direction, because zero means nothing unusual happened.',
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
    limits: [
      'One consensus implementation and eight seeded defects. A search that finds bugs somebody planted is not the same as a search that finds real ones.',
      'One defect resisted every strategy at a thousand trials. It is reported as not found rather than left out of the table.',
    ],
  },

  /* ------------------------------------------------------------------ 08 */
  {
    id: 'nnverify',
    slug: 'nnverify',
    name: 'nnverify',
    tagline: 'A neural network verifier that is never allowed to answer "I don’t know".',
    track: 'Applied ML',
    year: '2026',
    status: 'complete',
    stack: ['Python', 'NumPy', 'Abstract interpretation', 'Branch and bound'],
    repo: 'https://github.com/Aditya2k5here/envelope',
    featured: true,
    body: [
      'Give it a network, an input and a radius and it returns exactly one of two things: a proof that no perturbation inside that radius changes the prediction, or the perturbation that does, confirmed by running the network on it. Not "probably robust". Not "unknown".',
      'Cheap bound propagation settles the easy cases. Where it cannot, the verifier splits on an unstable ReLU and recurses, so completeness comes from branch and bound rather than from a looser abstraction that would let it shrug. Every proof is then audited by sampling thousands of random points inside the region it claims to have covered.',
      'Across ten radii and sixty inputs, 600 queries, it returned zero unknowns and zero soundness failures. At the radius where the standard DeepPoly relaxation verifies nothing at all, the complete search still proves 13 of 60, and pays 3,618 branches for them.',
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
    limits: [
      'A small fully-connected network on scikit-learn digits. This is the scale at which completeness is affordable, not the scale anyone deploys.',
      'L∞ perturbations only. It says nothing about rotation, occlusion, or any change a person would call semantic.',
    ],
  },

  /* ------------------------------------------------------------------ 09 */
  {
    id: 'loadshed',
    slug: 'loadshed',
    name: 'loadshed',
    tagline: 'An API gateway that decides which requests to fail when there is not enough capacity for all of them.',
    track: 'Systems',
    year: '2026',
    status: 'complete',
    stack: ['Go', 'Adaptive concurrency', 'Load shedding', 'Priority queueing', 'Circuit breaking'],
    repo: 'https://github.com/Aditya2k5here/ballast',
    featured: true,
    body: [
      'Four stages sit between a client and an upstream, each answering a different question. Is there capacity. Does this request still have enough time left to be worth serving. Does it matter more than what is already queued. Is the upstream healthy enough to try. Requests carry a priority and a deadline, and the gateway is allowed to say no.',
      'The experiment is the honest part. Adaptive concurrency control did not beat a well-tuned fixed limit. It matched it. What it did was turn a badly tuned limit from a catastrophe into a non-event.',
      'At twelve times capacity, a limit set too high serves 3 of 735 critical requests. With adaptive control, 735 of 735. A correctly tuned fixed limit also serves 735 of 735, at a slightly better p99. So adaptive concurrency is insurance, not an optimisation, and the results section keeps the runs where it wins nothing.',
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
    limits: [
      'One machine, one synthetic backend, one traffic shape. A different service-time distribution could reorder these results.',
      'The headline finding is negative. Adaptive control is worth having for the failure mode, not for the throughput.',
    ],
  },

  /* ------------------------------------------------------------------ 10 */
  {
    id: 'sikkim',
    slug: 'digital-heritage',
    name: 'Digital Heritage Preservation',
    tagline: 'An AI and VR system for digitising the monasteries of Sikkim. Peer reviewed and published.',
    track: 'Applied ML',
    year: '2026',
    status: 'published',
    stack: ['AI', 'VR', 'Image processing'],
    body: [
      'Scoped and built an AI and VR system for digitising monasteries in Sikkim and presenting them as virtual tourism, published in Advancement in Image Processing and Pattern Recognition in 2026.',
      'The monasteries are the point. They hold murals and thangkas that are degrading faster than they are being recorded, in a state where getting a conservation team up the hill is a logistics problem before it is a technical one.',
    ],
    insight:
      'The review process asked harder questions about the evaluation than I had asked myself, which is roughly what it is for.',
    metrics: [
      { label: 'Venue', value: 'Advancement in Image Processing and Pattern Recognition' },
      { label: 'Year', value: '2026' },
    ],
    limits: [
      'An earlier draft of my resume quoted a 4K at 90 FPS VR benchmark for this. I cannot substantiate it, so it is gone.',
    ],
  },
]

export const bySlug = (s: string) => projects.find((p) => p.slug === s)

export const counts = {
  projects: projects.length,
  systems: projects.filter((p) => p.track === 'Systems').length,
  publicRepos: projects.filter((p) => p.repo).length,
}
