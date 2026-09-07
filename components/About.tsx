import { education } from '@/content/profile'
import { counts } from '@/content/projects'
import { Stage } from './Stage'

/**
 * About.
 *
 * Everything the hero used to say, said properly and one scroll later. No
 * picture. From here to the last section the page is type, rules and space,
 * which is the only way the four figures at the bottom of this block land as
 * facts rather than as more decoration.
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
      <div className="cut grid gap-x-[clamp(32px,5vw,80px)] gap-y-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div className="min-w-0">
          <p className="text-[clamp(19px,2.2vw,27px)] font-medium leading-[1.34] tracking-[-0.02em]">
            Slightly obsessed with structured implementation details. Dangerously
            comfortable with &ldquo;let&rsquo;s build it and see.&rdquo;
          </p>

          <p className="mt-7 max-w-[54ch] text-[16px] leading-[1.7] text-[var(--grey-1)]">
            Dig deep. Understand how things work. Take notes. Question assumptions.
            Break things to figure them out. Then build something ridiculous because
            apparently wondering{' '}
            <span className="text-[var(--paper)]">&ldquo;what if?&rdquo;</span> was not
            enough.
          </p>

          <p className="mt-5 max-w-[54ch] text-[16px] leading-[1.7] text-[var(--paper)]">
            Fuelled by an ADHD brain, growing up alongside AI.
          </p>
        </div>

        <div className="min-w-0">
          <p className="max-w-[46ch] text-[16px] leading-[1.7] text-[var(--grey-1)]">
            Most of what I build sits under the thing everyone else is looking at.
            Schedulers, collectors, verifiers, gateways. I like the questions that only
            show up once something is running: when is compiling worth the cost, what
            gets dropped when there is not enough capacity for everyone, and what a
            model should do when it is not sure.
          </p>

          <p className="mt-5 max-w-[46ch] text-[16px] leading-[1.7] text-[var(--grey-1)]">
            The habit I care about most is measuring after, not before. Several of the
            results on this page argued with me. They are still here.
          </p>

          <p className="mt-7 text-[15px] leading-[1.7]">
            {education.current.degree}
            <br />
            <span className="text-[var(--grey-1)]">{education.current.institution}</span>
            <br />
            <span className="m text-[12px] text-[var(--grey-2)]">
              {education.current.standing} · No backlogs · Bangalore
            </span>
          </p>

          <p className="mt-5 max-w-[42ch] text-[15px] leading-[1.7] text-[var(--paper)]">
            The degree is still loading. The side quests are already running.
          </p>
        </div>
      </div>

      <ul className="cut seq mt-[clamp(34px,5vw,64px)] grid grid-cols-2 border-t border-[var(--edge)] sm:grid-cols-4">
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
