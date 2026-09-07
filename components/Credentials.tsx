'use client'

import { useState } from 'react'
import { publication, certifications, achievements, languages, profile } from '@/content/profile'
import { Stage } from './Stage'
import { Flow } from './Flow'

/**
 * The things somebody else signed off on.
 *
 * A recruiter scans this section for one thing: proof that an outside party has
 * vouched for something. So the peer-reviewed paper leads, at the size it
 * deserves, and everything is closed until asked. The arrow opens the record
 * rather than linking away, because a link out of a portfolio at this point in
 * the page is a link that does not come back.
 */
export function Credentials() {
  const [paper, setPaper] = useState(false)
  const [cert, setCert] = useState<string | null>(null)

  return (
    <Stage
      id="credentials"
      n="04"
      title="Credentials"
      aside={<>The parts of this page that are somebody else&rsquo;s word, not mine.</>}
    >
      {/* ---------------------------------------------------- the paper ---- */}
      <article className="plate cut p-[clamp(22px,3vw,40px)]">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="chip chip--sig">Peer reviewed</span>
          <span className="chip">Published {publication.year}</span>
        </div>

        <h3 className="t-h2 mt-6 max-w-[22ch] text-[clamp(24px,3.2vw,40px)]">
          {publication.title}
        </h3>

        <p className="m mt-5 text-[12.5px] leading-relaxed text-[var(--grey-1)]">
          {publication.venue}, {publication.year}
        </p>

        <p className="mt-4 max-w-[54ch] text-[15px] leading-relaxed text-[var(--grey-1)]">
          {publication.note}
        </p>

        <button
          type="button"
          onClick={() => setPaper(!paper)}
          aria-expanded={paper}
          aria-controls="paper-record"
          className="mt-7 inline-flex items-center gap-3 text-[14px] font-medium text-[var(--paper)] transition-colors hover:text-[var(--sig-lit)]"
        >
          <span className="caret" data-on={paper ? '1' : '0'} aria-hidden>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M6.5 1v11M1 6.5h11" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </span>
          {paper ? 'Close the record' : 'See the record'}
        </button>

        <div className="drawer" data-on={paper ? '1' : '0'} id="paper-record">
          <div>
            <div className="sheet mt-7 p-[clamp(20px,2.6vw,34px)]">
              <p className="tag">Publication record</p>
              <dl className="mt-5 flex flex-col">
                <Line k="Title" v={publication.title} />
                <Line k="Venue" v={publication.venue} />
                <Line k="Year" v={publication.year} />
                <Line k="Type" v="Peer-reviewed chapter" />
                <Line k="Subject" v="Image processing and pattern recognition" />
                <Line k="Author" v={profile.name} />
              </dl>
              <p className="t-small mt-6 max-w-[52ch]">
                An AI and VR system for digitising the monasteries of Sikkim and presenting
                them as virtual tourism. The murals and thangkas inside them are degrading
                faster than anyone is recording them, in a state where getting a
                conservation team up the hill is a logistics problem before it is a
                technical one.
              </p>
            </div>
          </div>
        </div>
      </article>

      <div className="mt-[clamp(30px,4vw,56px)] grid gap-[clamp(26px,3.5vw,52px)] lg:grid-cols-2">
        {/* ------------------------------- competitive and organisational -- */}
        <div className="cut">
          <h3 className="t-h3 mb-1 text-[clamp(20px,2.2vw,28px)]">
            <Flow>Competitive &amp; organisational</Flow>
          </h3>
          <p className="t-small mb-5">Won some, ran some.</p>

          <ul className="seq flex flex-col">
            {achievements.map((a, i) => (
              <li
                key={a.title}
                style={{ '--i': i } as React.CSSProperties}
                className="group border-t border-[var(--edge)] py-4 transition-colors hover:border-[var(--sig-edge)]"
              >
                <p className="text-[16.5px] font-medium leading-snug transition-colors group-hover:text-[var(--sig-lit)]">
                  {a.title}
                </p>
                {a.detail && (
                  <p className="mt-1.5 text-[14px] leading-relaxed text-[var(--grey-1)]">
                    {a.detail}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* ------------------------------------------------ certifications -- */}
        <div className="cut">
          <h3 className="t-h3 mb-1 text-[clamp(20px,2.2vw,28px)]">
            <Flow>Certifications</Flow>
          </h3>
          <p className="t-small mb-5">Four, and the arrow opens each one.</p>

          <ul className="seq flex flex-col">
            {certifications.map((c, i) => {
              const on = cert === c.name
              return (
                <li
                  key={c.name}
                  style={{ '--i': i } as React.CSSProperties}
                  className="border-t border-[var(--edge)]"
                >
                  <button
                    type="button"
                    onClick={() => setCert(on ? null : c.name)}
                    aria-expanded={on}
                    className="flex w-full items-start justify-between gap-5 py-4 text-left"
                  >
                    <span className="min-w-0">
                      <span
                        className={`block text-[16px] font-medium leading-snug transition-colors ${
                          on ? 'text-[var(--sig-lit)]' : ''
                        }`}
                      >
                        {c.name}
                      </span>
                      <span className="m mt-1.5 block text-[12px] text-[var(--grey-3)]">
                        {c.issuer}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className="mt-1 shrink-0 text-[15px] text-[var(--grey-2)] transition-transform duration-400"
                      style={{ transform: on ? 'rotate(90deg)' : 'none' }}
                    >
                      →
                    </span>
                  </button>

                  <div className="drawer" data-on={on ? '1' : '0'}>
                    <div>
                      <div className="sheet mb-4 p-5">
                        <dl className="flex flex-col">
                          <Line k="Programme" v={c.name} />
                          <Line k="Issued by" v={c.issuer} />
                          <Line k="Held by" v={profile.name} />
                        </dl>
                        <p className="tag mt-4 normal-case tracking-normal">
                          Certificate available on request.
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>

          {/* ---- languages ---- */}
          <div className="mt-9">
            <p className="tag mb-3">Languages</p>
            <ul className="flex flex-wrap gap-2">
              {languages.map((l) => (
                <li key={l} className="chip">
                  {l}
                </li>
              ))}
            </ul>
            <p className="m mt-3 text-[11px] text-[var(--grey-3)]">
              Five. More useful than it sounds, in a city this mixed.
            </p>
          </div>
        </div>
      </div>
    </Stage>
  )
}

function Line({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-[var(--edge)] py-2.5 last:border-0">
      <dt className="tag shrink-0">{k}</dt>
      <dd className="m m-0 max-w-[38ch] text-right text-[12.5px] leading-snug text-[var(--paper)]">
        {v}
      </dd>
    </div>
  )
}
