/**
 * Chart data.
 *
 * Every figure below is transcribed from the results file of the project it
 * belongs to. Nothing is smoothed, rounded for looks, or filled in. Where a
 * result went against the hypothesis it stays in, because those rows are the
 * reason these charts are worth drawing at all.
 *
 * Sources:
 *   hotpath      results/summary.md, README "The result"
 *   halflife-gc  results/summary.md, "GC work relative to a stock collector"
 *   loadshed     README "Latency and success against offered load"
 *   nnverify     README "Results"
 *   dermacare    a run on this machine, 7 September 2026, not a file in the repo
 *
 * The last three project names were changed after the repositories were
 * created, so the GitHub URLs still use the old paths until those are renamed.
 */

export type Bar = { label: string; value: number; note?: string; tone?: 'sig' | 'good' | 'bad' | 'mute' }

/* ---------------------------------------------------------------- hotpath */

/**
 * Cost as a multiple of a hindsight oracle that knows the whole trace in
 * advance. 1.00 is unbeatable. Log scale, because the spread is 100:1 and a
 * linear axis would render four of the five bars as slivers.
 */
export const hotpathPolicies: Bar[] = [
  { label: 'guarded / adaptive', value: 1.38, note: 'K = 0.5', tone: 'sig' },
  { label: 'always-jit', value: 12.8, note: 'compile everything' },
  { label: 'always-dfa', value: 12.84 },
  { label: 'calls(2,4)', value: 45.06, note: 'the counter most JITs ship', tone: 'bad' },
  { label: 'never', value: 132.73, note: 'pure backtracking' },
]

export const hotpathMeta = {
  title: 'Cost against a hindsight oracle',
  sub: 'Twelve workloads, worst case. Lower is better; 1.00× is optimal.',
  axis: '× optimum',
  source: 'hotpath / results/summary.md',
}

/* ------------------------------------------------------------ halflife-gc */

/**
 * GC work as a percentage of a stock generational collector. Under 100 is a
 * win. doc_pipeline is 190, which means the learned predictor did worse than
 * doing nothing at all.
 */
export const gcWork: Bar[] = [
  { label: 'particles', value: 0.02, note: 'effectively all the headroom', tone: 'good' },
  { label: 'binarytrees', value: 31 },
  { label: 'lru_cache', value: 31 },
  { label: 'graph_bfs', value: 94 },
  { label: 'doc_pipeline', value: 190, note: 'worse than no prediction', tone: 'bad' },
]

export const gcMeta = {
  title: 'Learned predictor vs a stock generational collector',
  sub: '100% is the stock collector. Below is a win, above is a loss.',
  axis: '% of stock GC work',
  baseline: 100,
  source: 'halflife-gc / results/summary.md',
}

/* ---------------------------------------------------------------- ballast */

/**
 * Critical requests served at twelve times capacity. The story is entirely in
 * the third row: a limit set too high serves three of seven hundred and
 * thirty-five.
 */
export const ballastServed: Bar[] = [
  { label: 'fixed-16', value: 735, note: 'well tuned', tone: 'good' },
  { label: 'gradient', value: 735, note: 'adaptive', tone: 'sig' },
  { label: 'fixed-64', value: 731 },
  { label: 'fixed-256', value: 3, note: 'limit set too high', tone: 'bad' },
]

export const ballastMeta = {
  title: 'Critical requests served at 12× capacity',
  sub: 'Out of 735 offered. Deadlines measured from intended send time.',
  axis: 'served / 735',
  total: 735,
  source: 'loadshed / results/scenario-*.json',
}

/* --------------------------------------------------------------- envelope */

/**
 * Verification outcomes across ten perturbation radii, sixty inputs each. The
 * column that matters is `unknown`, which is zero at every radius.
 */
export type EnvRow = { eps: number; verified: number; falsified: number; unknown: number; deepPoly: number }

export const envelopeRows: EnvRow[] = [
  { eps: 0.01, verified: 57, falsified: 3, unknown: 0, deepPoly: 57 },
  { eps: 0.02, verified: 54, falsified: 6, unknown: 0, deepPoly: 54 },
  { eps: 0.04, verified: 51, falsified: 9, unknown: 0, deepPoly: 46 },
  { eps: 0.06, verified: 42, falsified: 18, unknown: 0, deepPoly: 36 },
  { eps: 0.08, verified: 32, falsified: 28, unknown: 0, deepPoly: 15 },
  { eps: 0.1, verified: 20, falsified: 40, unknown: 0, deepPoly: 4 },
  { eps: 0.12, verified: 13, falsified: 47, unknown: 0, deepPoly: 0 },
  { eps: 0.14, verified: 5, falsified: 55, unknown: 0, deepPoly: 0 },
  { eps: 0.18, verified: 0, falsified: 60, unknown: 0, deepPoly: 0 },
]

export const envelopeMeta = {
  title: 'Verification outcomes by perturbation radius',
  sub: 'Sixty inputs per radius. The gap is what completeness buys over the relaxation alone.',
  source: 'nnverify / results/sweep.json',
}

/* -------------------------------------------------------------- dermacare */

/**
 * Per-class recall on the decontaminated validation split, 3,225 images.
 *
 * Measured on 7 September 2026 by loading the shipped best_model.pth and
 * running it over every validation image with the same transform the inference
 * path uses. Recall rather than accuracy, because on a set where one class is
 * 43% of the data an accuracy figure is mostly a report on how common moles are.
 *
 * Melanoma is the row that matters and it is the fourth worst.
 */
export const dermaRecall: Bar[] = [
  { label: 'Dermatofibroma', value: 94.4, note: '36 images' },
  { label: 'Vascular lesion', value: 71.4, note: '21 images' },
  { label: 'Actinic keratoses', value: 64.2, note: '176 images' },
  { label: 'Basal cell carcinoma', value: 64.2, note: '573 images' },
  { label: 'Melanocytic nevus', value: 58.3, note: '1,388 images, the benign mole' },
  { label: 'Melanoma', value: 46.1, note: '692 images. The row to improve.', tone: 'sig' },
  { label: 'Benign keratosis', value: 40.4, note: '339 images' },
]

export const dermaMeta = {
  baseline: 62.7,
  baselineLabel: 'mean',
  axis: 'recall, per class',
  title: 'Per-class recall on a clean split',
  sub: 'Balanced accuracy 62.7% across seven classes, measured after rebuilding the split so no image or lesion appears on both sides. Melanoma at 46.1% is the row the next version is aimed at.',
  source: '3,225 held-out images, September 2026',
}
