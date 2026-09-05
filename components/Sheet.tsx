import type { ReactNode } from 'react'

type SheetProps = {
  /** Section numeral, survey red, in the spine. */
  num?: string
  /** Vertical label beside the numeral. */
  label?: string
  /** Measurement rail. */
  margin?: ReactNode
  children: ReactNode
  /** Drop the top rule — for the first sheet on a page. */
  open?: boolean
  /** Let content run past the 66ch measure (tables, indexes, diagrams). */
  wide?: boolean
  id?: string
}

/**
 * The one layout primitive. Every section on this site is a Sheet.
 *
 *   SPINE 74px | CONTENT max 66ch | MARGIN 232px      gutter 36px
 */
export function Sheet({ num, label, margin, children, open, wide, id }: SheetProps) {
  return (
    <section className={`sheet${open ? ' sheet--open' : ''}`} id={id}>
      <div className="sheet__spine" aria-hidden={!num && !label}>
        {num && <span className="sheet__num">{num}</span>}
        {label && <span className="sheet__vert">{label}</span>}
      </div>

      <div className={`sheet__content${wide ? '' : ' measure'}`}>{children}</div>

      <aside className="sheet__margin">{margin}</aside>
    </section>
  )
}

/** A row in the measurement rail: label left, value right, dotted rule between. */
export function RailRow({ k, v, hot }: { k: string; v: ReactNode; hot?: boolean }) {
  return (
    <div className="flex justify-between gap-2.5 border-b border-dotted border-rule py-[3px]">
      <span>{k}</span>
      <span className={`text-right ${hot ? 'text-vermillion' : 'text-ink'}`}>{v}</span>
    </div>
  )
}

/** A heading inside the measurement rail. */
export function RailHead({ children }: { children: ReactNode }) {
  return (
    <b className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-indigo">
      {children}
    </b>
  )
}
