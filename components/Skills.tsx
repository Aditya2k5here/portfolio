'use client'

import { useState } from 'react'
import { skills } from '@/content/skills'
import { Stage } from './Stage'

/**
 * Skills, in two tiers.
 *
 * The version this replaces read like a repository statistics dashboard: file
 * counts, a ratio of what had code behind it, and a filter that dimmed half
 * the page. Accurate, and the wrong argument to be making in a section a
 * recruiter scans in six seconds.
 *
 * Now every group states what it is for in one line, shows the five or six
 * entries somebody hiring for that role actually looks for, and keeps the rest
 * behind a count. The disclosure is per group, so opening one to check for a
 * specific technology never buries the others.
 */
export function Skills() {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <Stage
      id="skills"
      n="03"
      title="Skills"
      aside={
        <>
          A toolbox for turning ideas into things that actually work.
        </>
      }
    >
      <ul className="cut border-t border-[var(--edge)]">
        {skills.map((g) => {
          const on = open === g.group
          const id = `sk-${g.group.replace(/\s+/g, '-')}`
          return (
            <li key={g.group} className="border-b border-[var(--edge)]">
              <div className="grid gap-x-[clamp(20px,3vw,56px)] gap-y-3 py-[clamp(18px,2.2vw,26px)] lg:grid-cols-[minmax(0,250px)_minmax(0,1fr)]">
                <div className="min-w-0">
                  <h3 className="subhead text-[clamp(18px,1.9vw,23px)]">{g.group}</h3>
                  <p className="t-small mt-1.5 max-w-[34ch]">{g.note}</p>
                </div>

                <div className="min-w-0">
                  <ul className="flex flex-wrap gap-x-3 gap-y-1.5">
                    {g.lead.map((s) => (
                      <li key={s} className="text-[15px] leading-snug text-[var(--paper)]">
                        {s}
                      </li>
                    ))}
                  </ul>

                  <div className="drawer" data-on={on ? '1' : '0'} id={id}>
                    <div>
                      <ul
                        className="flex flex-wrap gap-x-3 gap-y-1.5 pt-2.5"
                        inert={!on}
                      >
                        {g.more.map((s) => (
                          <li key={s} className="text-[15px] leading-snug text-[var(--grey-1)]">
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setOpen(on ? null : g.group)}
                    aria-expanded={on}
                    aria-controls={id}
                    className="mt-1 inline-flex min-h-[44px] items-center gap-2.5 text-[12.5px] text-[var(--grey-2)] transition-colors hover:text-[var(--sig-lit)]"
                  >
                    <span className="sign" data-on={on ? '1' : '0'} aria-hidden />
                    {on ? 'Less' : `${g.more.length} more`}
                  </button>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </Stage>
  )
}
