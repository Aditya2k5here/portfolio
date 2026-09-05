import type { Part } from './types'

export const dc03: Part = {
  id: 'DC-03',
  slug: 'derma-care',
  name: 'Derma-Care',
  order: 3,
  status: 'built',
  // Not public yet: no git repository initialised. Do not print a link that 404s.
  evidence: ['none'],
  thesis: 'The hard part of a model is deciding what it does when it isn’t sure.',
  problem:
    'Multi-class skin lesion classification over a HAM10000-derived set, served behind an API, on a dataset with brutal class imbalance.',
  result:
    'A classifier behind FastAPI that declines to answer below a confidence floor and falls back to a heuristic rather than failing, on a training split rebalanced against a 57:1 class skew.',
  stack: ['PyTorch', 'torchvision', 'MobileNetV2', 'FastAPI', 'Next.js'],
  indexFact: '57:1 class imbalance; 0.35 confidence floor',

  decisions: [
    {
      choice: 'Class weighting — mel, bcc, akiec ×1.5; nv ×0.6',
      because: 'a missed melanoma and a false alarm are not the same error',
    },
    {
      choice: 'A 0.35 confidence floor below which the system returns unknown',
      because: 'a model that declines to answer is more useful than one that guesses',
    },
    {
      choice: 'Colour-based heuristic fallback when no model is loaded',
      because: 'the service degrades instead of 500-ing',
    },
  ],

  notBuilt: [
    {
      rejected: 'An answer below 0.35 confidence',
      because: 'returns unknown; a model that declines to answer is more useful than one that guesses',
    },
    {
      rejected: 'Equal class weights',
      because: 'a missed melanoma and a false alarm are not the same error',
    },
    {
      rejected: 'A 500 when no model is loaded',
      because: 'colour-based heuristic fallback; the service degrades instead',
    },
    {
      rejected: 'A performance claim on this page',
      because: 'evaluation has not been run against a held-out split',
    },
  ],

  measurements: [
    { label: 'Training images', value: '21,462' },
    { label: 'Classes', value: '7' },
    { label: 'Confidence floor', value: '0.35' },
    { label: 'Largest : smallest class', value: '57 : 1' },
    { label: 'Accuracy / Precision / Recall / F1', value: null },
    { label: 'Confusion matrix', value: null, absent: 'NOT GENERATED' },
  ],

  limitations: [
    'No held-out evaluation yet.',
    'Training split is oversampled (21,462 against HAM10000’s 10,015 raw images).',
    'Not a medical device and not clinically validated.',
  ],

  links: [],
  plates: [],
}

/** Class distribution, rendered as a horizontal bar table. */
export const dc03Classes: { label: string; count: number }[] = [
  { label: 'nv', count: 11380 },
  { label: 'mel', count: 3798 },
  { label: 'bcc', count: 2740 },
  { label: 'bkl', count: 2247 },
  { label: 'akiec', count: 869 },
  { label: 'vasc', count: 229 },
  { label: 'df', count: 199 },
]

export const dc03MetricsNote =
  'Evaluation has not yet been run against a held-out split. No performance claim is made on this page.'
