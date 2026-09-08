import Image from 'next/image'
import { profile } from '@/content/profile'
import { cv } from '@/content/credentials'
import { Stage } from './Stage'
import { Flow } from './Flow'

/**
 * Contact.
 *
 * The last page of the thing, so it is an invitation rather than a footer. The
 * statement carries it, the three actions sit directly under it, and the raw
 * details are a quiet table below that for whoever wants to copy one.
 *
 * The photograph is the only one below the hero: head, shoulders and upper
 * torso, small, at the end. The red comes back on one word, the same system as
 * the hero at a tenth of the volume.
 */

const ROWS = [
  { k: 'Email', v: profile.email, href: `mailto:${profile.email}`, icon: 'mail' },
  { k: 'Phone', v: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}`, icon: 'phone' },
  { k: 'GitHub', v: profile.githubHandle, href: profile.github, icon: 'code' },
  { k: 'LinkedIn', v: profile.linkedinHandle, href: profile.linkedin, icon: 'in' },
  { k: 'LeetCode', v: 'aditya-srinivas3', href: profile.leetcode, icon: 'code' },
  { k: 'CV', v: 'Résumé, PDF', href: cv, icon: 'doc' },
] as const

const FACTS = [
  { k: 'Based in', v: 'Bangalore, India' },
  { k: 'Graduating', v: 'May 2027' },
  { k: 'Standing', v: 'Semester VII, no backlogs' },
]

export function Contact() {
  return (
    <Stage id="contact" n="07" title="Contact">
      <div className="cut grid gap-x-[clamp(28px,4vw,80px)] gap-y-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        {/* ---------------------------------------------- the invitation -- */}
        <div className="min-w-0">
          <p className="t-h2 max-w-[15ch] text-[clamp(30px,4.8vw,58px)] leading-[1.04]">
            Got something <Flow className="font-medium">interesting</Flow>?
            <br />
            <span className="text-[var(--sig-lit)]">I&rsquo;m listening.</span>
          </p>

          <p className="t-body mt-7 max-w-[46ch]">
            Final-year B.E. ISE student at Atria Institute of Technology, graduating
            May 2027. Open to software, AI, ML, data, analytics, quality assurance and
            business analyst roles, and to good problems worth getting stuck into.
          </p>

          <div className="mt-8 flex flex-wrap gap-2.5">
            <a className="btn btn--sig" href={`mailto:${profile.email}`}>
              Say hello
              <span aria-hidden>&rarr;</span>
            </a>
            <a className="btn" href={cv} target="_blank" rel="noreferrer noopener">
              <Icon name="doc" />
              View résumé
            </a>
            <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer noopener">
              <Icon name="in" />
              Connect on LinkedIn
            </a>
          </div>

          <ul className="seq mt-11 border-t border-[var(--edge)]">
            {ROWS.map((r, i) => (
              <li
                key={r.k}
                style={{ '--i': i } as React.CSSProperties}
                className="group border-b border-[var(--edge)] transition-colors hover:border-[var(--sig-edge)]"
              >
                <a
                  href={r.href}
                  className="flex min-h-[54px] items-center gap-4 py-3"
                  {...(r.href.startsWith('http') || r.href.startsWith('/docs')
                    ? { target: '_blank', rel: 'noreferrer noopener' }
                    : {})}
                >
                  <span className="text-[var(--grey-3)] transition-colors group-hover:text-[var(--sig-lit)]">
                    <Icon name={r.icon} />
                  </span>
                  <span className="tag w-[86px] shrink-0">{r.k}</span>
                  <span className="m min-w-0 flex-1 truncate text-[13.5px] text-[var(--grey-1)] transition-colors group-hover:text-[var(--paper)]">
                    {r.v}
                  </span>
                  <span
                    aria-hidden
                    className="shrink-0 text-[13px] text-[var(--grey-3)] transition-colors group-hover:text-[var(--sig-lit)]"
                  >
                    &#8599;
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <p className="tag mt-5 flex items-center gap-3 normal-case tracking-normal">
            <span aria-hidden className="block h-px w-8 bg-[var(--edge-3)]" />
            Or just drop a message anyway. I usually reply.
          </p>
        </div>

        {/* ------------------------------------------------ the signature -- */}
        <div className="flex min-w-0 flex-col gap-8">
          <figure className="relative m-0">
            <div className="relative mx-auto w-[190px] overflow-hidden sm:w-[230px] lg:mx-0">
              <span className="rim" aria-hidden />
              <Image
                src="/cut/aditya-bust.webp"
                alt={`${profile.name}, ${profile.location}`}
                width={606}
                height={487}
                sizes="230px"
                className="cutout relative h-auto w-full"
              />
            </div>
          </figure>

          <blockquote className="m-0 border-l-2 border-[var(--sig)] pl-5">
            <p className="text-[17px] leading-[1.5] text-[var(--paper)]">
              Still curious.
              <br />
              Still building.
            </p>
            <footer className="m mt-2.5 text-[11px] text-[var(--grey-3)]">
              &mdash; {profile.name}
            </footer>
          </blockquote>

          <dl className="grid grid-cols-1 gap-px bg-[var(--edge)] sm:grid-cols-3 lg:grid-cols-1">
            {FACTS.map((f) => (
              <div key={f.k} className="bg-[var(--void)] px-4 py-3.5">
                <dt className="tag">{f.k}</dt>
                <dd className="m m-0 mt-1.5 text-[13px] leading-snug text-[var(--paper)]">{f.v}</dd>
              </div>
            ))}
          </dl>

          <p className="tag max-w-[34ch] leading-relaxed">
            Open to internships, full-time roles and interesting collaborations.
          </p>
        </div>
      </div>
    </Stage>
  )
}

/**
 * Four glyphs, drawn rather than pulled in. An icon package for this many
 * shapes would weigh more than the rest of the section.
 */
function Icon({ name }: { name: string }) {
  const common = {
    width: 15,
    height: 15,
    viewBox: '0 0 16 16',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.4,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }
  switch (name) {
    case 'mail':
      return (
        <svg {...common}>
          <rect x="1.5" y="3" width="13" height="10" rx="1.5" />
          <path d="M2 4.5l6 4 6-4" />
        </svg>
      )
    case 'phone':
      return (
        <svg {...common}>
          <path d="M3 2.5h3l1.2 3-1.6 1.2a9 9 0 0 0 3.7 3.7L10.5 8.8l3 1.2v3a1 1 0 0 1-1.1 1A11.5 11.5 0 0 1 2 3.6 1 1 0 0 1 3 2.5z" />
        </svg>
      )
    case 'in':
      return (
        <svg {...common}>
          <rect x="1.5" y="1.5" width="13" height="13" rx="2" />
          <path d="M4.6 6.8v4.6M4.6 4.6v.1M8 11.4V6.8M8 8.6c0-1.9 3.4-2 3.4 0v2.8" />
        </svg>
      )
    case 'doc':
      return (
        <svg {...common}>
          <path d="M4 1.5h5l3 3v10H4z" />
          <path d="M9 1.5v3h3M6 8h4M6 10.5h4" />
        </svg>
      )
    default:
      return (
        <svg {...common}>
          <path d="M5.5 5L2.5 8l3 3M10.5 5l3 3-3 3" />
        </svg>
      )
  }
}
