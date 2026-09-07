'use client'

import { useState } from 'react'
import { skills } from '@/content/skills'
import { Stage } from './Stage'

/**
 * Skills, as categories you open.
 *
 * The old version was seventy pills in a wall, which is the least readable and
 * least credible way to present this. Here each category is one line until you
 * ask, and every line carries the repository the claim came from, because a
 * technology list with nothing behind it is the cheapest paragraph on any
 * portfolio to write.
 *
 * The list itself was rebuilt from a file count rather than from memory. Java,
 * C, SQL, Jupyter, Docker and Postman were all on the previous inventory and
 * none of them had a single file behind it, so they are gone.
 */
export function Skills() {
  const [open, setOpen] = useState<string | null>(
    skills.find((g) => g.open)?.group ?? null,
  )

  return (
    <Stage
      id="skills"
      n="03"
      title="Skills"
      aside={
        <>
          Counted out of the repositories, not remembered.{' '}
          <span className="text-[var(--paper)]">Each one says where the proof is.</span>
        </>
      }
    >
      <ul className="cut border-t border-[var(--edge)]">
        {skills.map((g) => {
          const on = open === g.group
          return (
            <li key={g.group} className="border-b border-[var(--edge)]">
              <h3>
                <button
                  type="button"
                  className="discl group py-[clamp(14px,1.7vw,20px)]"
                  onClick={() => setOpen(on ? null : g.group)}
                  aria-expanded={on}
                  aria-controls={`sk-${g.group.replace(/\s+/g, '-')}`}
                >
                  <span className="flex items-baseline justify-between gap-6">
                    <span
                      className={`subhead transition-colors ${
                        on ? '!text-[var(--sig-lit)]' : 'group-hover:!text-[var(--sig-lit)]'
                      }`}
                    >
                      {g.group}
                    </span>
                    <span className="flex shrink-0 items-center gap-5">
                      <span className="m text-[11px] text-[var(--grey-3)]">
                        {g.items.length}
                      </span>
                      <span
                        className="sign text-[var(--grey-2)] group-hover:text-[var(--sig-lit)]"
                        data-on={on ? '1' : '0'}
                        aria-hidden
                      />
                    </span>
                  </span>
                </button>
              </h3>

              <div
                className="drawer"
                data-on={on ? '1' : '0'}
                id={`sk-${g.group.replace(/\s+/g, '-')}`}
              >
                <div>
                  <div className="pb-7" inert={!on}>
                    <ul className="flex flex-wrap gap-1.5">
                      {g.items.map((s) => (
                        <li key={s} className="chip">
                          {s}
                        </li>
                      ))}
                    </ul>
                    <p className="tag mt-4 max-w-[74ch] normal-case tracking-normal leading-relaxed">
                      {g.source}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </Stage>
  )
}
