'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { profile, education, languages } from '@/content/profile'
import { cv } from '@/content/credentials'
import { Stage } from './Stage'
import { Flow } from './Flow'

/**
 * Contact.
 *
 * The last section carries the only photograph below the hero, and it is
 * deliberately small: a signature in the corner rather than a second portrait
 * spread. By this point in the page you have read the work, so a face is a
 * courtesy, not an argument.
 *
 * The red comes back here, in the smallest form the site has: the pointer fill
 * on one word. Same system as the hero, a tenth of the volume.
 */

const ROWS = [
  { k: 'Email', v: profile.email, href: `mailto:${profile.email}`, primary: true },
  { k: 'Phone', v: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` },
  { k: 'GitHub', v: profile.githubHandle, href: profile.github },
  { k: 'LinkedIn', v: profile.linkedinHandle, href: profile.linkedin },
  { k: 'LeetCode', v: 'aditya-srinivas3', href: profile.leetcode },
  { k: 'CV', v: 'PDF, one page', href: cv },
]

export function Contact() {
  return (
    <Stage id="contact" n="07" title="Contact">
      <div className="grid gap-x-[clamp(28px,4vw,72px)] gap-y-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="min-w-0">
          <p className="t-h2 text-[clamp(27px,4.2vw,52px)] leading-[1.08]">
            If you are building something
            <br />
            <Flow className="font-medium">interesting</Flow>, I would like to hear about it.
          </p>

          <p className="t-body mt-7 max-w-[44ch]">
            Graduating {profile.graduating}. Open to software, ML, data and quality roles,
            and to internships before then. I read everything and reply properly, including
            a no.
          </p>

          <ul className="cut seq mt-10 flex flex-col">
            {ROWS.map((r, i) => (
              <li
                key={r.k}
                style={{ '--i': i } as React.CSSProperties}
                className="group border-t border-[var(--edge)] transition-colors hover:border-[var(--sig-edge)]"
              >
                <a
                  href={r.href}
                  className="flex min-h-[58px] items-center justify-between gap-6 py-3.5"
                  {...(r.href.startsWith('http') || r.href.startsWith('/docs')
                    ? { target: '_blank', rel: 'noreferrer noopener' }
                    : {})}
                >
                  <span className="tag">{r.k}</span>
                  <span
                    className={`m text-right text-[clamp(13px,1.4vw,16px)] transition-colors group-hover:text-[var(--sig-lit)] ${
                      r.primary ? 'text-[var(--paper)]' : 'text-[var(--grey-1)]'
                    }`}
                  >
                    {r.v}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <a className="btn btn--sig mt-9" href={`mailto:${profile.email}`}>
            Say hello
            <span aria-hidden>&rarr;</span>
          </a>
        </div>

        {/* ---- the practicalities, and the signature ---- */}
        <div className="min-w-0">
          <dl className="flex flex-col">
            <Row k="Local time" v={<Clock />} />
            <Row k="Based" v={profile.location} />
            <Row
              k="Graduating"
              v={`${education.current.expected.replace('Graduating ', '')} · ${education.current.institution.split(' (')[0]}`}
            />
            <Row k="Standing" v={`${education.current.standing} · CGPA ${education.current.cgpa}`} />
            <Row k="Open to" v="Software · ML · Data · QA · Internships" />
            <Row k="Speaks" v={languages.join(', ')} />
          </dl>

          {/* The one image below the hero. Small on purpose. */}
          <figure className="relative m-0 mt-10 flex items-end gap-5">
            <div className="relative w-[150px] shrink-0 sm:w-[176px]">
              <span className="rim" aria-hidden />
              {/* Head, shoulders and upper torso. The full-length cutout read
                  as a stock photograph pinned to the corner of the page. */}
              <Image
                src="/cut/aditya-bust.webp"
                alt={`${profile.name}, ${profile.location}`}
                width={606}
                height={487}
                sizes="176px"
                className="cutout relative h-auto w-full"
              />
            </div>
            <figcaption className="pb-2">
              <p className="text-[15px] font-medium leading-snug">{profile.name}</p>
              <p className="m mt-1 text-[11px] leading-relaxed text-[var(--grey-3)]">
                Bangalore, India
                <br />
                Still building something.
              </p>
            </figcaption>
          </figure>
        </div>
      </div>
    </Stage>
  )
}

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-5 border-b border-[var(--edge)] py-3.5">
      <dt className="tag shrink-0">{k}</dt>
      <dd className="m m-0 text-right text-[13px] leading-snug text-[var(--paper)]">{v}</dd>
    </div>
  )
}

/**
 * Live IST clock.
 *
 * Renders a stable placeholder on the server and fills in after mount, so the
 * markup the server produced and the markup React expects always agree. A clock
 * that differs between the two is the classic hydration mismatch.
 */
function Clock() {
  const [now, setNow] = useState<string | null>(null)

  useEffect(() => {
    const tick = () =>
      setNow(
        new Intl.DateTimeFormat('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Asia/Kolkata',
        }).format(new Date()),
      )
    tick()
    const id = setInterval(tick, 30_000)
    return () => clearInterval(id)
  }, [])

  return (
    <span suppressHydrationWarning>
      {now ?? '--:--'} <span className="text-[var(--grey-3)]">IST · UTC+5:30</span>
    </span>
  )
}
