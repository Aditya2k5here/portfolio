'use client'

import { useState } from 'react'
import { publication, certifications, achievements } from '@/content/credentials'
import { languages, profile } from '@/content/profile'
import { Stage } from './Stage'

/**
 * The things somebody else signed off on.
 *
 * This is the section a recruiter scans for proof that an outside party has
 * vouched for something, so the peer-reviewed chapter leads at the size it
 * deserves and everything else stays closed until asked.
 *
 * Where the actual document is on this machine, the arrow opens it. Where it is
 * not, the row says so rather than linking somewhere hopeful. Four of the five
 * certificates are in that second state today, and that is a more useful thing
 * for the page to admit than to paper over.
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
      <article className="cut border-t border-[var(--edge)] pt-[clamp(24px,3vw,40px)]">
        <div className="grid gap-x-[clamp(28px,4vw,64px)] gap-y-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="chip chip--sig">Peer reviewed</span>
              <span className="chip">{publication.year}</span>
            </div>

            <h3 className="t-h2 mt-5 max-w-[22ch] text-[clamp(23px,3.1vw,38px)]">
              {publication.title}
            </h3>

            <p className="m mt-4 text-[12.5px] text-[var(--grey-1)]">
              {publication.venue}
            </p>
          </div>

          <div className="min-w-0">
            <p className="max-w-[48ch] text-[15.5px] leading-relaxed text-[var(--grey-1)]">
              {publication.note}
            </p>

            <button
              type="button"
              onClick={() => setPaper(!paper)}
              aria-expanded={paper}
              aria-controls="paper-record"
              className="mt-6 inline-flex items-center gap-3 text-[14.5px] font-medium transition-colors hover:text-[var(--sig-lit)]"
            >
              <span className="sign" data-on={paper ? '1' : '0'} aria-hidden />
              {paper ? 'Close the record' : 'See the record'}
            </button>

            <div className="drawer" data-on={paper ? '1' : '0'} id="paper-record">
              <div>
                <div className="pt-6" inert={!paper}>
                  <dl className="flex flex-col">
                    <Line k="Venue" v={publication.venue} />
                    <Line k="Year" v={publication.year} />
                    <Line k="Type" v={publication.type} />
                    <Line k="Subject" v={publication.subject} />
                    <Line k="Author" v={profile.name} />
                  </dl>

                  <p className="t-small mt-5 max-w-[50ch]">{publication.body}</p>

                  {publication.file ? (
                    <a
                      className="btn btn--sig mt-6"
                      href={publication.file}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Open the chapter
                      <span aria-hidden>&#8599;</span>
                    </a>
                  ) : (
                    <p className="tag mt-6 normal-case tracking-normal">
                      The published chapter is not hosted here. Ask and I will send it.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      <div className="mt-[clamp(34px,4.5vw,64px)] grid gap-[clamp(28px,4vw,60px)] lg:grid-cols-2">
        {/* ------------------------------- competitive and organisational -- */}
        <div className="cut">
          <h3 className="t-h3 text-[clamp(20px,2.2vw,27px)]">Competitive &amp; organisational</h3>
          <p className="t-small mb-5 mt-1">Won some, ran some.</p>

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
          <h3 className="t-h3 text-[clamp(20px,2.2vw,27px)]">Certifications</h3>
          <p className="t-small mb-5 mt-1">Four. The arrow opens each one.</p>

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
                    className="discl group flex w-full items-start justify-between gap-5 py-4"
                  >
                    <span className="min-w-0">
                      <span
                        className={`block text-[16px] font-medium leading-snug transition-colors ${
                          on ? 'text-[var(--sig-lit)]' : 'group-hover:text-[var(--sig-lit)]'
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
                      className="mt-1.5 shrink-0 text-[15px] text-[var(--grey-2)] transition-transform duration-500"
                      style={{ transform: on ? 'rotate(90deg)' : 'none' }}
                    >
                      &rarr;
                    </span>
                  </button>

                  <div className="drawer" data-on={on ? '1' : '0'}>
                    <div>
                      <div className="pb-5" inert={!on}>
                        {c.note && <p className="t-small max-w-[46ch]">{c.note}</p>}
                        {c.file ? (
                          <a
                            className="btn mt-3"
                            href={c.file}
                            target="_blank"
                            rel="noreferrer noopener"
                          >
                            Open the certificate
                            <span aria-hidden>&#8599;</span>
                          </a>
                        ) : (
                          <p className="tag normal-case tracking-normal">
                            Certificate not hosted here. Available on request.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>

          <div className="mt-8">
            <p className="tag mb-3">Languages</p>
            <ul className="flex flex-wrap gap-1.5">
              {languages.map((l) => (
                <li key={l} className="chip">
                  {l}
                </li>
              ))}
            </ul>
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
      <dd className="m m-0 max-w-[34ch] text-right text-[12.5px] leading-snug text-[var(--paper)]">
        {v}
      </dd>
    </div>
  )
}
