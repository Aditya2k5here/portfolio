import { profile } from '@/content/profile'
import { cv } from '@/content/credentials'
import { Stage } from './Stage'

/**
 * Contact.
 *
 * A closing invitation, not a footer. The statement carries the page, one line
 * says what he is open to, and everything else is a single ruled table of ways
 * to reach him: icon, label, the actual value, and an arrow. Nothing is hidden
 * behind a button that only reveals an address.
 *
 * The three facts sit underneath as a quiet strip rather than a sidebar, so the
 * page keeps one column of attention instead of two.
 *
 * Sized to land inside one screen. The separate "Say hello" button went for
 * that: the email row directly above it is the same action, and it was costing
 * roughly the height the section was over by.
 */

const ROWS = [
  { k: 'Email', v: profile.email, href: `mailto:${profile.email}`, icon: 'mail' },
  { k: 'LinkedIn', v: `linkedin.com/in/${profile.linkedinHandle}`, href: profile.linkedin, icon: 'in' },
  { k: 'GitHub', v: `github.com/${profile.githubHandle}`, href: profile.github, icon: 'git' },
  { k: 'LeetCode', v: 'leetcode.com/u/aditya-srinivas3', href: profile.leetcode, icon: 'code' },
  { k: 'Phone', v: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}`, icon: 'phone' },
  { k: 'Resume', v: 'View / Download', href: cv, icon: 'doc' },
] as const

const FACTS = [
  { k: 'Based in', v: 'Bangalore, India', icon: 'pin' },
  { k: 'Graduating', v: 'May 2027', icon: 'cap' },
  { k: 'Open to', v: 'SWE · AI · ML · Data · Analytics · QA · BA', icon: 'case' },
]

export function Contact() {
  return (
    <Stage id="contact" n="07" title="Contact">
      <div className="cut mx-auto max-w-[920px]">
        <p className="t-h2 max-w-[13ch] text-[clamp(30px,5.4vw,62px)] leading-[1.02] tracking-[-0.04em]">
          Got something interesting?
          <br />
          <span className="text-[var(--sig-lit)]">Let&rsquo;s talk.</span>
        </p>

        <p className="t-body mt-5 max-w-[48ch]">
          Open to internships, full-time roles, interesting collaborations, or just a good
          technical conversation.
        </p>

        <ul className="mt-8 border-t border-[var(--edge)]">
          {ROWS.map((r, i) => (
            <li
              key={r.k}
              style={{ '--i': i } as React.CSSProperties}
              className="group border-b border-[var(--edge)] transition-colors hover:border-[var(--sig-edge)]"
            >
              <a
                href={r.href}
                className="grid grid-cols-[22px_minmax(0,88px)_minmax(0,1fr)_18px] items-center gap-x-4 py-3 sm:gap-x-6 sm:py-3.5"
                {...(r.href.startsWith('http') || r.href.startsWith('/docs')
                  ? { target: '_blank', rel: 'noreferrer noopener' }
                  : {})}
              >
                <span className="text-[var(--sig)] transition-colors group-hover:text-[var(--sig-lit)]">
                  <Icon name={r.icon} />
                </span>
                <span className="tag">{r.k}</span>
                <span className="min-w-0 truncate text-[15px] text-[var(--paper)] transition-colors group-hover:text-[var(--sig-lit)]">
                  {r.v}
                </span>
                <span
                  aria-hidden
                  className="text-[15px] text-[var(--sig)] transition-transform duration-300 group-hover:translate-x-1"
                >
                  &rarr;
                </span>
              </a>
            </li>
          ))}
        </ul>

        <dl className="mt-7 grid gap-px border-b border-[var(--edge)] bg-[var(--edge)] pb-px sm:grid-cols-3">
          {FACTS.map((f) => (
            <div key={f.k} className="flex items-start gap-3 bg-[var(--void)] py-4 pr-5">
              <span className="mt-0.5 text-[var(--sig)]">
                <Icon name={f.icon} />
              </span>
              <div className="min-w-0">
                <dt className="tag">{f.k}</dt>
                <dd className="m m-0 mt-1.5 text-[13px] leading-snug text-[var(--paper)]">{f.v}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </Stage>
  )
}

/**
 * Drawn rather than pulled in. An icon package for eight shapes would weigh
 * more than the section it sits in.
 */
function Icon({ name }: { name: string }) {
  const c = {
    width: 17,
    height: 17,
    viewBox: '0 0 18 18',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }
  switch (name) {
    case 'mail':
      return (
        <svg {...c}>
          <rect x="1.8" y="3.6" width="14.4" height="10.8" rx="1.6" />
          <path d="M2.4 4.8L9 9.9l6.6-5.1" />
        </svg>
      )
    case 'in':
      return (
        <svg {...c}>
          <rect x="1.8" y="1.8" width="14.4" height="14.4" rx="2.2" />
          <path d="M5.4 7.6v5.2M5.4 5.2v.1M9 12.8V7.6M9 9.6c0-2.1 3.8-2.2 3.8 0v3.2" />
        </svg>
      )
    case 'git':
      return (
        <svg {...c}>
          <path d="M11 15.6v-2.4a2.2 2.2 0 0 0-.7-1.8c2.2-.2 4.2-1.1 4.2-4.6a3.6 3.6 0 0 0-1-2.5 3.3 3.3 0 0 0-.1-2.5s-.8-.2-2.6 1a8.9 8.9 0 0 0-4.6 0C4.4 1.6 3.6 1.8 3.6 1.8a3.3 3.3 0 0 0-.1 2.5 3.6 3.6 0 0 0-1 2.5c0 3.5 2 4.4 4.2 4.6a2.2 2.2 0 0 0-.7 1.7v2.5" />
        </svg>
      )
    case 'code':
      return (
        <svg {...c}>
          <path d="M6.2 5.6L2.6 9l3.6 3.4M11.8 5.6L15.4 9l-3.6 3.4" />
        </svg>
      )
    case 'phone':
      return (
        <svg {...c}>
          <path d="M3.4 2.8h3.4l1.4 3.4-1.8 1.4a10 10 0 0 0 4.2 4.2l1.4-1.8 3.4 1.4v3.4a1.2 1.2 0 0 1-1.3 1.2A13 13 0 0 1 2.2 4.1a1.2 1.2 0 0 1 1.2-1.3z" />
        </svg>
      )
    case 'doc':
      return (
        <svg {...c}>
          <path d="M4.4 1.8h5.6l3.6 3.6v10.8H4.4z" />
          <path d="M10 1.8v3.6h3.6M6.8 9h4.4M6.8 11.8h4.4" />
        </svg>
      )
    case 'pin':
      return (
        <svg {...c}>
          <path d="M9 16s5.2-4.6 5.2-8.4A5.2 5.2 0 0 0 3.8 7.6C3.8 11.4 9 16 9 16z" />
          <circle cx="9" cy="7.4" r="1.9" />
        </svg>
      )
    case 'cap':
      return (
        <svg {...c}>
          <path d="M9 3.2L16.4 6.8 9 10.4 1.6 6.8z" />
          <path d="M4.6 8.4v3.8c0 1.2 2 2.2 4.4 2.2s4.4-1 4.4-2.2V8.4" />
        </svg>
      )
    default:
      return (
        <svg {...c}>
          <rect x="1.8" y="5.2" width="14.4" height="10" rx="1.6" />
          <path d="M6.4 5.2V3.8a1.4 1.4 0 0 1 1.4-1.4h2.4a1.4 1.4 0 0 1 1.4 1.4v1.4" />
        </svg>
      )
  }
}
