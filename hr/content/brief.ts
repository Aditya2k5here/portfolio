/**
 * The HR cut.
 *
 * Same facts as Version 1, selected and shortened. Nothing here is a new claim:
 * every line is a compression of something already written and verified in
 * content/projects.ts, and every number is the same number.
 *
 * The selection rule is what a recruiter can act on in a minute. Six projects,
 * not ten, ordered so the two that are hardest to fake come second and fourth.
 */

/** Where the long version lives. Root, on the assumption Version 2 deploys under /hr. */
export const FULL_SITE = '/'

export type Brief = {
  id: string
  name: string
  /** One line. Must fit on a phone without wrapping past two. */
  line: string
  track: string
  /** The single figure worth reading out loud. */
  figure: string
  figureNote: string
  stack: string[]
  repo?: string
  live?: string
  /** Two or three sentences, shown only on open. */
  more: string
}

export const briefs: Brief[] = [
  {
    id: 'dermacare',
    name: 'DermaCare',
    line: 'A skin lesion classifier, and the audit that proved it should not be trusted yet.',
    track: 'Applied ML',
    figure: '47.5%',
    figureNote: 'of the validation set was also in training',
    stack: ['PyTorch', 'MobileNetV2', 'FastAPI'],
    repo: 'https://github.com/Aditya2k5here/skin-lesion-classifier',
    more: 'ISIC 2019 contains all 10,015 HAM10000 images, and the preparation script loads both archives into one list before shuffling, so 3,110 of 6,548 validation images were the same image as one in training. Rebuilding the split clean takes accuracy from 62.6% to 55.7% and melanoma recall to 46.1%. Separately, the inference path divides logits by 0.2 before the softmax, which pushes calibration error from 0.083 to 0.311 and stops the abstention gate firing at all.',
  },
  {
    id: 'hotpath',
    name: 'hotpath',
    line: 'A regex engine that writes x86-64 machine code at runtime, and an argument about when that is worth doing.',
    track: 'Systems',
    figure: '1.38×',
    figureNote: 'worst case against a hindsight oracle',
    stack: ['Python', 'x86-64', 'JIT'],
    repo: 'https://github.com/Aditya2k5here/hotpath',
    more: 'Three tiers: a backtracking interpreter, an interpreted DFA, and generated machine code. Twelve workloads replayed against every tiering policy and against an oracle that sees the whole trace in advance. The adaptive policy costs 1.38× the optimum; the call counter that ships in most real JITs costs 45.06×. Written with no third-party dependency.',
  },
  {
    id: 'terrahawk',
    name: 'TerraHawk',
    line: 'India has a credit bureau. It has no equivalent for the ground. Building one.',
    track: 'Product · co-founder',
    figure: '3',
    figureNote: 'founders, pre-incubation',
    stack: ['Strategy', 'GTM', 'Requirements'],
    more: 'Verification infrastructure for physical claims. A claim is made, a certified field agent is dispatched, and what comes back is a Truth Ticket: GPS polygon, timestamped imagery, an attestation tied to a verified agent, the methodology, a quality score and a hash over the package. My lane is product and go to market, not the computer vision. No trained model and no pilot yet, and the site says so.',
  },
  {
    id: 'loadshed',
    name: 'loadshed',
    line: 'An API gateway that decides which requests to fail when there is not enough capacity for all of them.',
    track: 'Systems',
    figure: '735 / 735',
    figureNote: 'critical requests served at 12× overload',
    stack: ['Go', 'Load shedding', 'Adaptive concurrency'],
    repo: 'https://github.com/Aditya2k5here/ballast',
    more: 'Four stages between client and upstream: capacity, deadline, priority, health. At twelve times capacity a limit set too high serves 3 of 735 critical requests; with adaptive control, 735 of 735. A correctly tuned fixed limit also serves 735 of 735 at a better p99, so the honest finding is that adaptive concurrency is insurance, not an optimisation. Ten internal Go packages.',
  },
  {
    id: 'halflife-gc',
    name: 'halflife-gc',
    line: 'A garbage collector that guesses how long an object will live, before the object exists.',
    track: 'Systems',
    figure: '0.02%',
    figureNote: 'of a stock collector’s GC work on the best workload',
    stack: ['Python', 'Bytecode VM', 'GC'],
    repo: 'https://github.com/Aditya2k5here/halflife-gc',
    more: 'A small language, a bytecode VM, four collectors, and a lifetime predictor running inside the allocator on every allocation. On the particles workload it does 0.02% of the work a stock generational collector does. On doc_pipeline it does 190%, which is worse than doing nothing, and that row is in the published table too.',
  },
  {
    id: 'riches-garden',
    name: 'Riches Garden',
    line: 'A live festival site for a residents’ committee, and the features I talked them out of.',
    track: 'Web · shipped',
    figure: '89 → 14 kB',
    figureNote: 'Kannada webfont, subset to the 33 glyphs in use',
    stack: ['Next.js', 'TypeScript', 'axe-core'],
    live: 'https://riches-garden-ganeshothsava.vercel.app/',
    more: 'No database, no dashboard, no auth: the committee runs on a form and a sheet, and would have inherited whatever I left behind. Nine content files hold every fact, so rolling to next year is a four-line edit. Five audit gates run before every release: link integrity, axe-core, contrast sampled from rendered pixels, tap targets across seven viewports, and page weight.',
  },
]

/** The four the HR cut leaves out, named rather than hidden. */
export const alsoBuilt = ['raftfuzz', 'nnverify', 'AI Lifestyle Mirror', 'Digital Heritage Preservation']

/** Short skills, the ones a screen reads for. Counts are from the file sweep. */
export const quickSkills = [
  { k: 'Languages', v: 'Python · Go · TypeScript · JavaScript' },
  { k: 'Systems', v: 'JIT · GC · Load shedding · Deterministic simulation' },
  { k: 'AI and ML', v: 'PyTorch · OpenCV · MediaPipe · Formal verification' },
  { k: 'Backend', v: 'FastAPI · asyncio · WebSockets · REST' },
  { k: 'Front end', v: 'Next.js · React · Tailwind' },
  { k: 'Quality', v: 'axe-core · Playwright · GitHub Actions' },
]
