import { profile, education } from '@/content/profile'
import { counts } from '@/content/projects'
import { Desk } from './Desk'

/**
 * The opening.
 *
 * The name is the largest thing on the screen because that is what a name is
 * for, and the scene sits beside it rather than a portrait, because a cut-out
 * photograph on a dark page is the single most recognisable move in this genre
 * and he is not a stock image.
 *
 * The introduction is his, near enough word for word. It was better than
 * anything written for him, and the only thing done to it was setting the first
 * three lines as three lines instead of a paragraph.
 */
export function Opening() {
  const figures = [
    { v: '8.22', k: 'CGPA / 10' },
    { v: String(counts.publicRepos), k: 'public repos' },
    { v: String(counts.systems), k: 'systems projects' },
    { v: '2027', k: 'graduating' },
  ]

  return (
    <header id="top" className="relative">
      <div className="shell relative pt-[clamp(20px,5vh,52px)] pb-[clamp(40px,7vh,80px)]">
        <div className="relative grid items-center gap-x-12 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,430px)]">
          {/* ---------------- the name and the introduction ---------------- */}
          <div className="relative z-20 min-w-0">
            <p className="m text-[11px] uppercase tracking-[0.1em] text-[var(--grey-3)]">
              {profile.location} / graduating {profile.graduating}
            </p>

            <h1 className="mt-5">
              <span className="t-h1 block text-[var(--grey-1)]">Aditya</span>
              <span className="t-mega -ml-[0.045em] block">Srinivas</span>
            </h1>

            <div className="mt-8 max-w-[50ch]">
              <p className="text-[clamp(19px,2.1vw,26px)] font-medium leading-[1.3] tracking-[-0.02em]">
                Curious by default.
              </p>
              <p className="mt-2 text-[clamp(16px,1.5vw,19px)] leading-[1.45] text-[var(--grey-1)]">
                Slightly obsessed with structured implementation details.
                <br />
                Dangerously comfortable with &ldquo;let&rsquo;s build it and see.&rdquo;
              </p>

              <p className="mt-6 text-[15.5px] leading-[1.7] text-[var(--grey-1)]">
                Dig deep. Understand how things work. Take notes. Question assumptions.
                Break things to figure them out. Then build something ridiculous because
                apparently wondering <span className="text-[var(--paper)]">&ldquo;what if?&rdquo;</span>{' '}
                wasn&rsquo;t enough.
              </p>

              <p className="mt-5 text-[15.5px] leading-[1.7] text-[var(--paper)]">
                Fuelled by an ADHD brain, growing up alongside AI.
              </p>

              <p className="m mt-6 text-[12px] tracking-[0.04em] text-[var(--grey-2)]">
                Fourth year <span className="text-[var(--grey-3)]">·</span> Bangalore{' '}
                <span className="text-[var(--grey-3)]">·</span> Graduating 2027
              </p>
            </div>

            <div className="mt-9 flex flex-wrap gap-2.5">
              <a className="btn btn--sig" href="#work">
                See the work
              </a>
              <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer noopener">
                LinkedIn
              </a>
              <a className="btn" href={profile.github} target="_blank" rel="noreferrer noopener">
                GitHub
              </a>
              <a className="btn" href="#contact">
                Contact
              </a>
            </div>
          </div>

          {/* ---------------- one in the morning ---------------- */}
          <div className="scene relative z-10 mx-auto w-full max-w-[430px] lg:mx-0">
            <Desk className="h-auto w-full" />
          </div>
        </div>

        {/* ---------------- the figures ---------------- */}
        <ul className="seq relative z-20 mt-[clamp(28px,5vh,56px)] grid grid-cols-2 border-t border-[var(--edge)] sm:grid-cols-4">
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

        {/* ---------------- where he actually is ---------------- */}
        <div className="mt-7 grid gap-x-12 gap-y-5 md:grid-cols-2">
          <p className="text-[15px] leading-[1.7]">
            {education.current.degree}
            <br />
            <span className="text-[var(--grey-1)]">{education.current.institution}</span>
            <br />
            <span className="m text-[12px] text-[var(--grey-2)]">
              {education.current.standing} · No backlogs
            </span>
          </p>

          <p className="max-w-[42ch] text-[15px] leading-[1.7] text-[var(--grey-1)]">
            A few semesters, several side projects, zero backlogs.
            <br />
            <span className="text-[var(--paper)]">
              The degree is still loading. The side quests are already running.
            </span>
          </p>
        </div>
      </div>
    </header>
  )
}
