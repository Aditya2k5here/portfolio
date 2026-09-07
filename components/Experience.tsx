import { experience } from '@/content/profile'
import { Stage } from './Stage'

/**
 * Experience, and the inventory.
 *
 * One internship, written out properly rather than padded into three. It sits
 * here instead of in the work index because none of it is engineering, and
 * filing strategy work next to a JIT compiler would be the easiest thing on
 * this site to catch him out on.
 */
export function Experience() {
  return (
    <Stage
      id="experience"
      n="06"
      title="Experience"
      aside={<>Four months of writing things down until other people could act on them.</>}
    >
      <ul className="cut flex flex-col">
        {experience.map((e) => (
          <li key={e.org} className="border-t border-[var(--edge)] pt-8">
            <div className="grid gap-x-10 gap-y-5 lg:grid-cols-[168px_minmax(0,1fr)]">
              <p className="tag pt-1.5">{e.period}</p>

              <div className="min-w-0">
                <h3 className="t-h3 text-[clamp(20px,2.3vw,28px)]">
                  {e.role}
                  <span className="text-[var(--grey-1)]"> · {e.org}</span>
                </h3>
                <p className="m mt-1.5 text-[12px] text-[var(--grey-3)]">{e.place}</p>

                <p className="mt-5 max-w-[52ch] text-[17px] leading-relaxed text-[var(--paper)]">
                  {e.lede}
                </p>

                <ul className="mt-6 flex flex-col gap-3">
                  {e.bullets.map((b) => (
                    <li
                      key={b.slice(0, 24)}
                      className="relative max-w-[62ch] pl-5 text-[15px] leading-relaxed text-[var(--grey-1)]"
                    >
                      <span
                        aria-hidden
                        className="absolute left-0 top-[0.72em] h-px w-2.5 bg-[var(--sig)]"
                      />
                      {b}
                    </li>
                  ))}
                </ul>

                <p className="mt-6 max-w-[54ch] border-l-2 border-[var(--sig)] pl-5 text-[16px] leading-relaxed text-[var(--paper)]">
                  {e.note}
                </p>

                <div className="mt-7">
                  <p className="tag mb-3">What came out of it</p>
                  <ul className="flex flex-wrap gap-1.5">
                    {e.artefacts.map((a) => (
                      <li key={a} className="chip">
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="t-small mt-6 max-w-[62ch] border-l border-[var(--edge-2)] pl-3.5">
                  {e.caveat}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>

    </Stage>
  )
}
