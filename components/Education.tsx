'use client'

import { useState } from 'react'
import { education } from '@/content/profile'
import { Stage } from './Stage'

/**
 * Education as a skyline you interrogate.
 *
 * Four buildings, taller as they get more recent, so height carries the
 * timeline. At rest each one shows only its years and a silhouette. Hover or
 * focus a building and it lights, its windows come on, and the school, the
 * place and the result slide up from the base.
 *
 * The point is that nothing is printed on the facade until you ask. A row of
 * cards with all the text already showing is a table wearing a costume.
 */

const H = [
  'h-[clamp(150px,20vw,260px)]',
  'h-[clamp(200px,26vw,330px)]',
  'h-[clamp(250px,32vw,400px)]',
  'h-[clamp(310px,40vw,480px)]',
]

/** Deterministic window pattern, so server and client render identically. */
function panes(weight: number, cols = 4) {
  const rows = weight * 4 + 4
  return Array.from({ length: rows * cols }, (_, i) =>
    (i * 7 + weight * 3) % 5 === 0 || (i * 3 + weight) % 11 === 0 ? 1 : 0,
  )
}

export function Education() {
  const [open, setOpen] = useState<number | null>(3)

  return (
    <Stage
      id="education"
      n="05"
      title="Education"
      aside={
        <>
          A suspiciously long journey through classrooms, exams, and increasingly
          questionable side projects.{' '}
          <span className="text-[var(--paper)]">Hover to see where it went.</span>
        </>
      }
    >
      <div className="cut">
        <div className="grid grid-cols-2 items-end gap-2 border-b border-[var(--edge-2)] sm:grid-cols-4 sm:gap-3">
          {education.timeline.map((s, i) => {
            const on = open === i
            const now = i === education.timeline.length - 1
            const cells = panes(s.weight)

            return (
              <button
                key={s.stage}
                type="button"
                onMouseEnter={() => setOpen(i)}
                onFocus={() => setOpen(i)}
                onClick={() => setOpen(i)}
                aria-expanded={on}
                className={`group relative flex flex-col justify-end overflow-hidden border border-b-0 text-left ${H[i]}`}
                style={{
                  /* Inline, not arbitrary Tailwind classes. The state-dependent
                     variants were not being generated reliably, which left the
                     lit building and the expanded building out of sync. */
                  borderColor: on ? 'var(--sig-edge)' : 'var(--edge)',
                  background: on ? 'var(--panel-2)' : 'var(--ink)',
                  transition: 'border-color 300ms ease, background 300ms ease',
                }}
              >
                {/* windows */}
                <span
                  aria-hidden
                  className="absolute inset-x-2.5 top-2.5 grid grid-cols-4 gap-[3px]"
                >
                  {cells.map((lit, c) => (
                    <i
                      key={c}
                      className="aspect-square transition-colors duration-500"
                      style={{
                        background: lit
                          ? on
                            ? 'var(--sig)'
                            : 'var(--edge-3)'
                          : 'var(--edge)',
                        transitionDelay: `${(c % 9) * 22}ms`,
                      }}
                    />
                  ))}
                </span>

                {/* base plate: years always, detail on reveal */}
                <span className="relative z-10 block bg-gradient-to-t from-[var(--ink)] via-[var(--ink)] to-transparent px-3 pb-3 pt-8">
                  <span className="m block text-[10px] tracking-[0.06em] text-[var(--grey-3)]">
                    {s.stage}
                  </span>

                  <span
                    className={`grid transition-all duration-400 ${
                      on ? 'mt-2 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <span className="overflow-hidden">
                      <span className="block text-[13px] font-medium leading-tight">
                        {s.school}
                      </span>
                      <span className="m mt-1 block text-[10px] leading-snug text-[var(--grey-2)]">
                        {s.place}
                      </span>
                      {s.result && (
                        <span
                          className={`m mt-2 block text-[17px] leading-none ${
                            now ? 'text-[var(--sig-lit)]' : 'text-[var(--paper)]'
                          }`}
                        >
                          {s.result}
                          <span className="tag mt-1 block">{s.resultLabel}</span>
                        </span>
                      )}
                    </span>
                  </span>
                </span>
              </button>
            )
          })}
        </div>

        {/* semester strip */}
        <div className="mt-9 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="scroll-x">
            <ul className="flex min-w-[440px] gap-px bg-[var(--edge)]">
              {education.semesters.map((s) => (
                <li key={s.n} className="flex-1 bg-[var(--ink)] px-3 py-3">
                  <p className="m text-[15px]">{s.sgpa.toFixed(2)}</p>
                  <p className="tag mt-1">sem {s.n}</p>
                </li>
              ))}
              <li className="flex-1 bg-[var(--panel-2)] px-3 py-3">
                <p className="m text-[15px] text-[var(--sig-lit)]">8.22</p>
                <p className="tag mt-1 text-[var(--sig-lit)]">cgpa</p>
              </li>
            </ul>
          </div>

          <div>
            <p className="t-small">
              {education.current.cgpaNote}. {education.current.standing},{' '}
              {education.current.expected.replace('Graduating', 'graduating')}.
            </p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {education.coursework.map((c) => (
                <li key={c} className="chip">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Stage>
  )
}
