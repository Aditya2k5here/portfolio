import type { Part } from './types'

export const th04: Part = {
  id: 'TH-04',
  slug: 'terrahawk',
  name: 'TerraHawk',
  order: 4,
  status: 'design',
  evidence: ['none'],
  thesis:
    'A design exploration into how physical-world claims could become auditable digital evidence.',
  problem:
    'Billions flow into environmental projects — afforestation, restoration, ESG compliance — and there is no standard way to verify that any of it happened. Evidence arrives fragmented: drone imagery, GPS polygons, satellite pulls, field photographs, documents. Manual verification does not scale; fully automated verification is not trustworthy enough to underwrite.',
  /** Nothing was built. This part has no stack. */
  stack: [],
  indexFact: 'Specification only — no implementation',

  decisions: [
    {
      choice: 'A single output: the Truth Ticket',
      because:
        'it carries the claim, the evidence, the chain of custody, the model’s confidence, the operator’s identity, an integrity hash and the auditor’s notes, in one tamper-evident package',
    },
    {
      choice: 'High-confidence cases clear automatically; ambiguous ones escalate to a human',
      because:
        'manual verification does not scale and fully automated verification is not trustworthy enough to underwrite',
    },
  ],

  notBuilt: [
    {
      rejected: 'The entire implementation',
      because: 'specification and design decisions only — no code, no pilot, no tests',
    },
    {
      rejected: 'Fully automated verification',
      because: 'not trustworthy enough to underwrite',
    },
    { rejected: 'Manual verification', because: 'does not scale' },
    {
      rejected: 'A validated confidence threshold',
      because: 'placement is asserted, not proven',
    },
  ],

  measurements: [
    { label: 'Lines of code', value: '0' },
    { label: 'Truth Ticket fields specified', value: '12' },
    { label: 'Pilots run', value: '0' },
    { label: 'Threshold validation', value: null, absent: 'NOT VALIDATED' },
  ],

  limitations: [
    'Concept stage. No code. No pilot.',
    'Confidence-threshold placement is asserted, not validated.',
    'Three-person team; business case unproven.',
  ],

  links: [],

  plates: [
    {
      src: '/plates/plate-terrahawk.webp',
      alt: 'Aditya at a laptop with the TerraHawk business proposal open beside a code editor, on a rooftop at dusk.',
      caption: 'The specification being written. There is no implementation to photograph.',
    },
  ],
}

/** Truth Ticket fields, for the parts-list diagram. */
export const truthTicketFields: string[] = [
  'GPS polygon',
  'Timestamp & metadata',
  'Drone imagery',
  'Satellite comparison',
  'Field photographs',
  'Chain of custody',
  'Processing history',
  'AI confidence score',
  'Operator identity',
  'File integrity hash',
  'Auditor review notes',
  'Final verification status',
]

/** Verbatim. Do not paraphrase — this is the only copy that describes TerraHawk. */
export const th04Copy: string[] = [
  'Billions flow into environmental projects — afforestation, restoration, ESG compliance — and there is no standard way to verify that any of it happened. Evidence arrives fragmented: drone imagery, GPS polygons, satellite pulls, field photographs, documents. Manual verification does not scale; fully automated verification is not trustworthy enough to underwrite.',
  'TerraHawk specifies a single output — a Truth Ticket — that carries the claim, the evidence, the chain of custody, the model’s confidence, the operator’s identity, an integrity hash and the auditor’s notes, in one tamper-evident package. High-confidence cases clear automatically; ambiguous ones escalate to a human.',
]

export const th04Disclaimer =
  'This is a specification and a set of design decisions. There is no implementation, and none of it has been built or tested.'
