export type Status = 'shipped' | 'built' | 'local' | 'design' | 'research' | 'archived'
export type Evidence = 'live' | 'repo' | 'demo' | 'screens' | 'paper' | 'none'

export type Measurement = {
  label: string
  /** '89 KB' — presence enables the count animation. */
  from?: string
  /** null MUST render the NOT MEASURED stamp, never a blank. */
  value: string | null
  note?: string
  /** Overrides the default NOT MEASURED wording, e.g. 'NOT GENERATED'. */
  absent?: string
}

export type Decision = { choice: string; because: string }

/** A rejected alternative. `because` is required — the validator throws without it. */
export type Removal = { rejected: string; because: string }

export type Plate = { src: string; alt: string; caption: string }

export type Part = {
  /** 'RG-01' */
  id: string
  slug: string
  name: string
  /** Narrative order, not chronological. */
  order: number
  status: Status
  /** ['none'] is legal and is printed. */
  evidence: Evidence[]
  /** The serif line. One sentence, <= 120 chars. */
  thesis: string
  problem: string
  result?: string
  stack: string[]
  decisions: Decision[]
  /** What was deliberately not built. This is the NOT BUILT view. */
  notBuilt: Removal[]
  measurements: Measurement[]
  /** REQUIRED, min length 1. */
  limitations: string[]
  links: { label: string; href: string }[]
  plates: Plate[]
  /** One measured fact for the index row. */
  indexFact: string
  /** Long-form case study. Absent = index row and sheet only. */
  caseStudy?: CaseStudy
}

export type CaseStudySection = {
  heading: string
  /** Paragraphs of prose. */
  body: string[]
  /** Optional pull-quote in the serif face. Rationed sitewide. */
  aside?: string
}

export type CaseStudy = {
  standfirst: string
  sections: CaseStudySection[]
}

export type FieldNote = {
  text: string
  /** A note without a citation does not ship. */
  cites: string
}
