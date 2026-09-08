import { counts } from '@/content/projects'
import { Stage } from './Stage'

/**
 * About.
 *
 * Two columns, one voice. The left carries the claim and the closing line, the
 * right answers it. Both halves are his words, tightened only where two
 * sentences were saying the same thing.
 *
 * No picture: from here to Contact the page is type, rules and space.
 */
export function About() {
  const figures = [
    { v: '8.22', k: 'CGPA / 10' },
    { v: String(counts.publicRepos), k: 'public repos' },
    { v: String(counts.systems), k: 'systems projects' },
    { v: '2027', k: 'graduating' },
  ]

  return (
    <Stage id="about" n="01" title="About">
      <div className="cut grid gap-x-[clamp(32px,5vw,88px)] gap-y-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="min-w-0">
          <p className="max-w-[26ch] text-[clamp(21px,2.5vw,31px)] font-medium leading-[1.28] tracking-[-0.028em]">
            Slightly obsessed with structured implementation details. Dangerously
            comfortable with &ldquo;let&rsquo;s build it and see.&rdquo;
          </p>

          <p className="m mt-8 text-[12.5px] leading-relaxed text-[var(--grey-2)]">
            Final-year B.E. ISE student at Atria Institute of Technology, Bengaluru.
          </p>
        </div>

        <div className="flex max-w-[48ch] flex-col gap-5 text-[16px] leading-[1.72] text-[var(--grey-1)]">
          <p>
            I like understanding what sits underneath the obvious. Systems, models,
            products, the strange little mechanisms that make everything work.
          </p>
          <p className="text-[var(--paper)]">
            I build to understand, then measure what actually happened.
          </p>
        </div>
      </div>

      <p className="cut mt-[clamp(28px,4vw,48px)] border-t border-[var(--edge)] pt-7 text-[clamp(17px,1.9vw,22px)] leading-[1.4] text-[var(--paper)]">
        Degree still loading. <span className="text-[var(--grey-1)]">Curiosity already running in production.</span>
      </p>

      <ul className="cut seq mt-[clamp(24px,3.5vw,40px)] grid grid-cols-2 border-t border-[var(--edge)] sm:grid-cols-4">
        {figures.map((f, i) => (
          <li
            key={f.k}
            style={{ '--i': i } as React.CSSProperties}
            className="border-b border-[var(--edge)] py-5 sm:border-b-0 sm:border-r sm:pr-6 sm:last:border-r-0 sm:[&:not(:first-child)]:pl-6"
          >
            <p className="m text-[clamp(24px,3vw,36px)] leading-none">{f.v}</p>
            <p className="tag mt-2">{f.k}</p>
          </li>
        ))}
      </ul>
    </Stage>
  )
}
