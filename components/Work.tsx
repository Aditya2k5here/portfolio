'use client'

import { useState } from 'react'
import { projects, type Project } from '@/content/projects'
import { Stage } from './Stage'
import { Flow } from './Flow'
import { LogBars, BaselineBars, ServedBars, EnvelopeChart } from './Charts'
import {
  hotpathPolicies,
  hotpathMeta,
  gcWork,
  gcMeta,
  ballastServed,
  ballastMeta,
  envelopeRows,
  envelopeMeta,
  dermaRecall,
  dermaMeta,
} from '@/content/charts'

const STATUS: Record<Project['status'], string> = {
  shipped: 'Live',
  complete: 'Complete',
  built: 'Built',
  local: 'Local only',
  'in-progress': 'Building',
  published: 'Published',
}

/** Projects whose results are worth plotting rather than listing. */
function chartFor(id: string) {
  switch (id) {
    case 'dermacare':
      return <BaselineBars data={dermaRecall} {...dermaMeta} />
    case 'hotpath':
      return <LogBars data={hotpathPolicies} {...hotpathMeta} />
    case 'halflife-gc':
      return <BaselineBars data={gcWork} {...gcMeta} />
    case 'loadshed':
      return <ServedBars data={ballastServed} {...ballastMeta} />
    case 'nnverify':
      return <EnvelopeChart rows={envelopeRows} {...envelopeMeta} />
    default:
      return null
  }
}

/**
 * The work, as an index that opens.
 *
 * Ten projects written out in full is four screens of scrolling that nobody
 * does, and the tenth project may as well not exist. So the whole catalogue is
 * a list of names first: every project is on screen at once, and the detail is
 * something you ask for rather than something you scroll past.
 *
 * One row open at a time, deliberately. Two open drawers and the list stops
 * being a list.
 */
export function Work() {
  /* Everything starts closed. Opening one by default cost 2,660px above the
     second project on a phone, which is the exact problem the index was built
     to solve. */
  const [open, setOpen] = useState<string | null>(null)

  return (
    <Stage
      id="work"
      n="02"
      title="Work"
      aside={
        <>
          Every number comes out of that project&rsquo;s own results file, including the
          ones that argued with me.{' '}
          <span className="text-[var(--paper)]">Click a name to open it.</span>
        </>
      }
    >
      <ol className="cut border-t border-[var(--edge)]">
        {projects.map((p, i) => (
          <Row
            key={p.id}
            project={p}
            index={i}
            open={open === p.id}
            onToggle={() => setOpen(open === p.id ? null : p.id)}
          />
        ))}
      </ol>

      <p className="tag mt-8">
        {projects.length} projects · {projects.filter((p) => p.repo).length} with public code
      </p>
    </Stage>
  )
}

function Row({
  project: p,
  index,
  open,
  onToggle,
}: {
  project: Project
  index: number
  open: boolean
  onToggle: () => void
}) {
  const chart = chartFor(p.id)
  const head = p.metrics.find((m) => m.emphasis) ?? p.metrics[0]
  const rest = p.metrics.filter((m) => m !== head)
  const href = p.live ?? p.repo

  return (
    <li className="border-b border-[var(--edge)]">
      <h3>
        <button
          type="button"
          className="rowbtn group"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`p-${p.id}`}
        >
          <span className="flex items-start gap-4 sm:gap-7">
            <span className="m mt-[0.55em] hidden w-6 shrink-0 text-[12px] text-[var(--grey-3)] sm:block">
              {String(index + 1).padStart(2, '0')}
            </span>

            <span className="min-w-0 flex-1">
              {/* Name and metadata share a line on wide screens. Stacking them
                  cost 40px a row, and forty times ten is half a screen of
                  nothing on the way to the tenth project. */}
              <span className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                <span className="row-name">
                  <Flow>{p.name}</Flow>
                  {p.star && (
                    <span
                      aria-label="the one I am building now"
                      title="the one I am building now"
                      className="ml-3 align-super text-[0.3em] text-[var(--sig-lit)]"
                    >
                      ★
                    </span>
                  )}
                </span>

                <span className="flex shrink-0 flex-wrap items-center gap-2">
                  <span className="chip">{p.track}</span>
                  <span className={p.status === 'in-progress' ? 'chip chip--sig' : 'chip'}>
                    {STATUS[p.status]}
                  </span>
                  <span className="m text-[11px] text-[var(--grey-3)]">{p.year}</span>
                </span>
              </span>

              <span className="mt-2.5 block max-w-[62ch] text-[15px] leading-relaxed text-[var(--grey-1)]">
                {p.tagline}
              </span>
            </span>

            <span className="caret mt-[0.4em]" data-on={open ? '1' : '0'} aria-hidden>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M6.5 1v11M1 6.5h11" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </span>
          </span>
        </button>
      </h3>

      <div className="drawer" data-on={open ? '1' : '0'} id={`p-${p.id}`}>
        <div>
          <div
            className="grid gap-x-12 gap-y-9 pb-[clamp(28px,4vw,54px)] lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]"
            /* Collapsed drawers stay in the DOM, so they have to be taken out
               of the tab order or a keyboard user falls into ten invisible
               sub-pages between one project and the next. */
            inert={!open}
          >
            {/* ---------------- the argument ---------------- */}
            <div className="min-w-0">
              {p.role && (
                <p className="tag mb-5 normal-case tracking-normal text-[var(--grey-1)]">{p.role}</p>
              )}

              <div className="flex flex-col gap-4">
                {p.body.map((para) => (
                  <p key={para.slice(0, 32)} className="max-w-[58ch] text-[15.5px] leading-[1.68] text-[var(--grey-1)]">
                    {para}
                  </p>
                ))}
              </div>

              <p className="mt-7 max-w-[52ch] border-l-2 border-[var(--sig)] pl-5 text-[16.5px] leading-relaxed text-[var(--paper)]">
                {p.insight}
              </p>

              {p.team && (
                <div className="mt-8">
                  <p className="tag mb-3">Who did what</p>
                  <ul className="flex flex-col gap-px bg-[var(--edge)]">
                    {p.team.map((t) => (
                      <li
                        key={t.name}
                        className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 bg-[var(--void)] px-4 py-3"
                      >
                        <span className="text-[14px] font-medium">{t.name}</span>
                        <span className="t-small">{t.role}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <ul className="mt-7 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <li key={s} className="chip">
                    {s}
                  </li>
                ))}
              </ul>

              {href && (
                <div className="mt-7 flex flex-wrap gap-2.5">
                  <a
                    className="btn btn--sig"
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {p.live ? 'Open the site' : 'Read the code'}
                    <span aria-hidden>↗</span>
                  </a>
                </div>
              )}
            </div>

            {/* ---------------- the evidence ---------------- */}
            <div className="min-w-0">
              {chart ?? (
                <div className="panel p-[clamp(18px,2.2vw,26px)]">
                  {head && (
                    <>
                      <p
                        className={`m text-[clamp(26px,3.4vw,40px)] leading-none ${
                          head.value.startsWith('Not') ? 'text-[var(--c-4)]' : ''
                        }`}
                      >
                        {head.value}
                      </p>
                      <p className="t-small mt-2.5 max-w-[38ch]">{head.label}</p>
                      {head.note && (
                        <p className="tag mt-1.5 normal-case tracking-normal">{head.note}</p>
                      )}
                    </>
                  )}

                  {rest.length > 0 && (
                    <dl className="mt-6 flex flex-col">
                      {rest.map((m) => (
                        <div
                          key={m.label}
                          className="flex items-baseline justify-between gap-6 border-t border-[var(--edge)] py-2.5"
                        >
                          <dt className="t-small">{m.label}</dt>
                          <dd
                            className={`m m-0 shrink-0 text-[13px] ${
                              m.value.startsWith('Not') ? 'text-[var(--c-4)]' : 'text-[var(--paper)]'
                            }`}
                          >
                            {m.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </div>
              )}

              {/* Where a chart carried the headline, the rest of the numbers
                  still need somewhere to live. */}
              {chart && rest.length > 0 && (
                <dl className="mt-4 flex flex-col">
                  {[head, ...rest].filter(Boolean).map((m) => (
                    <div
                      key={m!.label}
                      className="flex items-baseline justify-between gap-6 border-b border-[var(--edge)] py-2.5"
                    >
                      <dt className="t-small">{m!.label}</dt>
                      <dd className="m m-0 shrink-0 text-[13px] text-[var(--paper)]">{m!.value}</dd>
                    </div>
                  ))}
                </dl>
              )}

              {p.evidenceGrades && (
                <ul className="mt-4 flex flex-col gap-px bg-[var(--edge)]">
                  {p.evidenceGrades.map((g) => (
                    <li key={g.grade} className="bg-[var(--void)] px-4 py-3">
                      <p className="m text-[11px] uppercase tracking-[0.08em] text-[var(--sig-lit)]">
                        {g.grade}
                      </p>
                      <p className="t-small mt-1">{g.items}</p>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-6">
                <p className="tag mb-3">What it does not do</p>
                <ul className="flex flex-col gap-2.5">
                  {p.limits.map((l) => (
                    <li
                      key={l.slice(0, 24)}
                      className="t-small max-w-[54ch] border-l border-[var(--edge-2)] pl-3.5"
                    >
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}
