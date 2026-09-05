import type { Status, Evidence } from '@/content/parts/types'

/**
 * Status is never conveyed by colour alone — the stamp always carries the word.
 * Only `shipped` uses survey red. Everything else is indigo or graphite.
 */
const STATUS_TONE: Record<Status, string> = {
  shipped: 'text-vermillion',
  built: 'text-indigo',
  local: 'text-indigo',
  design: 'text-graphite',
  research: 'text-indigo',
  archived: 'text-graphite',
}

const STATUS_WORD: Record<Status, string> = {
  shipped: 'Shipped',
  built: 'Built',
  local: 'Local',
  design: 'Design',
  research: 'Research',
  archived: 'Archived',
}

export function StatusStamp({ status, animate }: { status: Status; animate?: boolean }) {
  return (
    <span
      className={`inline-block whitespace-nowrap border border-current px-2 py-[3px] font-mono text-[10px] font-semibold uppercase tracking-[0.16em] ${STATUS_TONE[status]}${
        animate ? ' m-stamp' : ''
      }`}
    >
      {STATUS_WORD[status]}
    </span>
  )
}

/**
 * Where a measurement does not exist, the site prints a stamp rather than a gap.
 * This is the rail rule: no blanks anywhere.
 */
export function AbsentStamp({ word = 'Not measured' }: { word?: string }) {
  return (
    <span className="inline-block whitespace-nowrap border border-graphite px-2 py-[2px] font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-graphite">
      {word}
    </span>
  )
}

const EVIDENCE_WORD: Record<Evidence, string> = {
  live: 'Live',
  repo: 'Repo',
  demo: 'Demo',
  screens: 'Screens',
  paper: 'Paper',
  none: 'No evidence',
}

export function EvidenceChips({ evidence }: { evidence: Evidence[] }) {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-1.5" aria-label="Evidence">
      {evidence.map((e) => (
        <li
          key={e}
          className={`border-b border-rule pb-px font-mono text-[10px] uppercase tracking-[0.14em] ${
            e === 'none' ? 'text-graphite' : 'text-indigo'
          }`}
        >
          {EVIDENCE_WORD[e]}
        </li>
      ))}
    </ul>
  )
}
