import type { ReactNode } from 'react'
import { Flow } from './Flow'

/**
 * A section.
 *
 * Number, title, and the content starts. No kicker line, no centred header, no
 * rule fading off to the right. The number is there because the page is a
 * sequence and a reader should be able to tell where they are.
 *
 * The title is set considerably larger than a section heading normally is,
 * because these are the five words somebody skimming will actually read, and it
 * takes the pointer-tracked fill so the headings answer when touched.
 */
export function Stage({
  id,
  n,
  title,
  aside,
  children,
}: {
  id: string
  n: string
  title: string
  aside?: ReactNode
  children: ReactNode
}) {
  return (
    <section id={id} className="stage">
      <div className="shell">
        <div className="cut mb-[clamp(30px,4vw,58px)] flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <div className="flex items-baseline gap-5">
            <span className="stage-no">{n}</span>
            <h2 className="t-h1">
              <Flow>{title}</Flow>
            </h2>
          </div>
          {aside && <div className="max-w-[44ch] text-[15px] leading-relaxed text-[var(--grey-1)]">{aside}</div>}
        </div>
        {children}
      </div>
    </section>
  )
}
