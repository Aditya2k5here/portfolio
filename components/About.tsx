import { profile } from '@/content/profile'
import { counts } from '@/content/projects'
import { Stage } from './Stage'

/**
 * About.
 *
 * Cut to about a third of what was here. The three paragraphs it replaces
 * explained compilers, collectors, gateways, verifiers, compile costs, capacity
 * and model uncertainty, which is the work restating itself before you have
 * reached the work. The Work section is one scroll down and does it better.
 *
 * Two lines he wrote stay as they are. Everything else is short enough to read
 * without deciding to.
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
      <div className="cut grid gap-x-[clamp(32px,5vw,88px)] gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <p className="max-w-[26ch] text-[clamp(21px,2.5vw,31px)] font-medium leading-[1.28] tracking-[-0.028em]">
          Slightly obsessed with structured implementation details. Dangerously
          comfortable with &ldquo;let&rsquo;s build it and see.&rdquo;
        </p>

        <div className="flex max-w-[48ch] flex-col gap-5 text-[16px] leading-[1.72] text-[var(--grey-1)]">
          <p>
            Final-year B.E. ISE student at Atria Institute of Technology. Most of what
            I build sits a layer under the thing everyone else is looking at, and most
            of what I learn comes from measuring it afterwards.
          </p>
          <p className="text-[var(--paper)]">
            Some of the numbers on this page went against me. Those are the ones worth
            keeping.
          </p>
        </div>
      </div>

      <dl className="cut m mt-[clamp(30px,4vw,52px)] flex flex-wrap gap-x-8 gap-y-3 border-t border-[var(--edge)] pt-6 text-[12px] text-[var(--grey-2)]">
        <div>
          <dt className="sr-only">Based</dt>
          <dd className="m-0 text-[var(--paper)]">{profile.location}</dd>
        </div>
        <div>
          <dt className="sr-only">Graduating</dt>
          <dd className="m-0">Graduating {profile.graduating}</dd>
        </div>
        <div>
          <dt className="sr-only">Standing</dt>
          <dd className="m-0">Semester VII, no backlogs</dd>
        </div>
        <div>
          <dt className="sr-only">Open to</dt>
          <dd className="m-0">Software · ML · Data · QA</dd>
        </div>
      </dl>

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
