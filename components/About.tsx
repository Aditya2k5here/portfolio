import { education, profile } from '@/content/profile'
import { counts } from '@/content/projects'
import { Stage } from './Stage'

/**
 * About.
 *
 * Rewritten to one voice. The previous version had four registers stacked on
 * top of each other: an aphorism, a list of imperatives, an expository
 * paragraph and a joke, each formatted differently, which is why it read as
 * assembled rather than written.
 *
 * It now runs lead, body, close, facts. The lead is the claim, the three body
 * paragraphs all answer "and then what", the close is two short lines in the
 * same key, and the facts are set in the mono face used for every other piece
 * of metadata on the site. No picture: from here to Contact the page is type.
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
      <div className="cut grid gap-x-[clamp(32px,5vw,88px)] gap-y-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        {/* the claim */}
        <p className="max-w-[24ch] text-[clamp(21px,2.5vw,31px)] font-medium leading-[1.28] tracking-[-0.028em]">
          Slightly obsessed with structured implementation details. Dangerously
          comfortable with &ldquo;let&rsquo;s build it and see.&rdquo;
        </p>

        {/* and then what */}
        <div className="flex max-w-[56ch] flex-col gap-5 text-[16px] leading-[1.72] text-[var(--grey-1)]">
          <p>
            I like understanding how things work, which usually means taking them apart
            first. Compilers, collectors, gateways, verifiers. The layer underneath the
            thing everyone else is looking at.
          </p>
          <p>
            The questions worth the time only show up once something is running. When
            compiling is worth what it costs. What gets dropped when there is not enough
            capacity for everyone. What a model should do when it is not sure.
          </p>
          <p>
            Then I measure it, and I keep the number either way. Several of the results
            on this page argued with me, and they are still here.
          </p>
        </div>
      </div>

      {/* the close: two lines, one key */}
      <p className="cut mt-[clamp(30px,4vw,52px)] max-w-[42ch] text-[clamp(17px,1.9vw,21px)] leading-[1.5] text-[var(--paper)]">
        Fuelled by an ADHD brain, growing up alongside AI.
        <br />
        <span className="text-[var(--grey-1)]">
          The degree is still loading. The side quests are already running.
        </span>
      </p>

      {/* the facts, in the face every other fact on this site is set in */}
      <dl className="cut m mt-[clamp(28px,4vw,48px)] flex flex-wrap gap-x-8 gap-y-3 border-t border-[var(--edge)] pt-6 text-[12px] text-[var(--grey-2)]">
        <div>
          <dt className="sr-only">Degree</dt>
          <dd className="m-0 text-[var(--paper)]">{education.current.degree}</dd>
        </div>
        <div>
          <dt className="sr-only">Institution</dt>
          <dd className="m-0">{education.current.institution}</dd>
        </div>
        <div>
          <dt className="sr-only">Standing</dt>
          <dd className="m-0">{education.current.standing}, no backlogs</dd>
        </div>
        <div>
          <dt className="sr-only">Based</dt>
          <dd className="m-0">{profile.location}</dd>
        </div>
        <div>
          <dt className="sr-only">Graduating</dt>
          <dd className="m-0">Graduating {profile.graduating}</dd>
        </div>
      </dl>

      <ul className="cut seq mt-[clamp(28px,4vw,48px)] grid grid-cols-2 border-t border-[var(--edge)] sm:grid-cols-4">
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
