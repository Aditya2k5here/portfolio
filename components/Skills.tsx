'use client'

import { useState } from 'react'
import { skills, skillCounts } from '@/content/skills'
import { Stage } from './Stage'

/**
 * Skills, as one grid with a filter over it.
 *
 * The accordion this replaces was nine collapsed rows you had to open one at a
 * time to find out whether the thing you were looking for was there, which is
 * the opposite of what this section is for. Everything is on screen at once
 * now: nine short rows, about forty entries, readable in a glance.
 *
 * The one control is the filter. "With code behind it" dims everything that
 * comes from the resume rather than from a repository, which is a distinction
 * worth being able to see, and one most portfolios quietly avoid making.
 * Dimming rather than removing, so the layout never jumps and you can see what
 * you filtered out.
 */
export function Skills() {
  const [coreOnly, setCoreOnly] = useState(false)

  return (
    <Stage
      id="skills"
      n="03"
      title="Skills"
      aside={
        <>
          Counted out of the repositories and the resume, not remembered.{' '}
          <span className="text-[var(--paper)]">
            {skillCounts.core} of {skillCounts.total} have code behind them.
          </span>
        </>
      }
    >
      <div className="cut">
        <div className="mb-7 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setCoreOnly(false)}
            aria-pressed={!coreOnly}
            className={coreOnly ? 'chip' : 'chip chip--sig'}
          >
            Everything
          </button>
          <button
            type="button"
            onClick={() => setCoreOnly(true)}
            aria-pressed={coreOnly}
            className={coreOnly ? 'chip chip--sig' : 'chip'}
          >
            With code behind it
          </button>
        </div>

        <dl className="grid gap-x-[clamp(24px,3vw,56px)] gap-y-0 sm:grid-cols-2">
          {skills.map((row) => (
            <div
              key={row.group}
              className="grid grid-cols-[minmax(88px,104px)_minmax(0,1fr)] items-baseline gap-x-4 border-t border-[var(--edge)] py-4"
            >
              <dt className="tag pt-1">{row.group}</dt>
              <dd className="m-0 flex flex-wrap gap-x-3 gap-y-1.5">
                {row.items.map((s) => (
                  <span
                    key={s.name}
                    className="text-[14px] leading-snug transition-[color,opacity] duration-300"
                    style={{
                      color: s.core ? 'var(--paper)' : 'var(--grey-1)',
                      opacity: coreOnly && !s.core ? 0.22 : 1,
                    }}
                  >
                    {s.name}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>

        <p className="tag mt-6 max-w-[70ch] normal-case tracking-normal leading-relaxed">
          Python 358 files, TypeScript 44, JavaScript 22, Go 19, across nine
          repositories. The rest is from the resume and the internship, and is dimmed
          above so you can tell which is which.
        </p>
      </div>
    </Stage>
  )
}
