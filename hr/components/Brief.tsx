'use client'

import { useState } from 'react'
import { briefs } from '@/content/brief'

/**
 * The project list, HR cut.
 *
 * Closed, every project is a name, a line and the one figure worth reading out
 * loud. That is the whole design constraint: a recruiter should get the shape
 * of six projects without opening anything, and should never be asked to read
 * a paragraph to find out whether the next one is relevant.
 *
 * Opening one is a bonus, not a requirement, so the closed state carries the
 * number rather than hiding it behind the disclosure.
 */
export function Brief() {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <ul className="border-t border-[var(--edge)]">
      {briefs.map((b) => {
        const on = open === b.id
        return (
          <li key={b.id} className="border-b border-[var(--edge)]">
            <h3>
              <button
                type="button"
                className="discl group py-5"
                onClick={() => setOpen(on ? null : b.id)}
                aria-expanded={on}
                aria-controls={`b-${b.id}`}
              >
                <span className="flex items-start justify-between gap-5">
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span
                        className={`text-[clamp(20px,4.4vw,26px)] font-medium tracking-[-0.03em] transition-colors ${
                          on ? 'accent' : 'group-hover:accent'
                        }`}
                      >
                        {b.name}
                      </span>
                      <span className="tag">{b.track}</span>
                    </span>

                    <span className="mt-1.5 block max-w-[54ch] text-[15px] leading-[1.5] text-[var(--grey-1)]">
                      {b.line}
                    </span>

                    <span className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="m text-[17px] leading-none accent">{b.figure}</span>
                      <span className="t-small">{b.figureNote}</span>
                    </span>
                  </span>

                  <span
                    className="sign mt-2 text-[var(--grey-2)] group-hover:accent"
                    data-on={on ? '1' : '0'}
                    aria-hidden
                  />
                </span>
              </button>
            </h3>

            <div className="drawer" data-on={on ? '1' : '0'} id={`b-${b.id}`}>
              <div>
                <div className="pb-6" inert={!on}>
                  <p className="max-w-[64ch] text-[15px] leading-[1.65] text-[var(--grey-1)]">
                    {b.more}
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {b.stack.map((s) => (
                      <li key={s} className="chip">
                        {s}
                      </li>
                    ))}
                  </ul>

                  {b.repo && (
                    <a
                      className="btn mt-4"
                      href={b.repo}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Read the code
                      <span aria-hidden>&#8599;</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
