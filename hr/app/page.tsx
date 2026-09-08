import { profile, education, experience, languages } from '@/content/profile'
import { publication, achievements, cv } from '@/content/credentials'
import { alsoBuilt, quickSkills, FULL_SITE } from '@/content/brief'
import { Brief } from '@/components/Brief'

export const dynamic = 'force-static'

/**
 * Version 2. The same person, for someone with sixty seconds.
 *
 * Built to a stopwatch rather than to a layout. Thirty seconds is the block
 * above the first rule: name, one line, and four things to tap. Sixty is the
 * project list, which carries a real number per project in its closed state so
 * nobody has to open anything. Ninety is everything below it.
 *
 * Same palette, same two typefaces, same red. What is missing is the machinery:
 * no scene, no pointer-tracked type, no scroll reveals, nothing that has to
 * boot before the page is useful. This one gets opened on a phone, on mobile
 * data, from a LinkedIn message.
 */
export default function Page() {
  const job = experience[0]

  return (
    <main className="shell pb-20 pt-[clamp(40px,9vh,72px)]">
      {/* ------------------------------------------------- thirty seconds -- */}
      <header>
        <p className="m text-[11px] uppercase tracking-[0.16em] text-[var(--grey-3)]">
          {profile.location} / graduating {profile.graduating}
        </p>

        <h1 className="mt-5">
          <span className="t-h1 block text-[var(--grey-1)]">Aditya</span>
          <span className="t-mega block">Srinivas</span>
        </h1>

        <p className="t-h2 mt-6 max-w-[30ch]">
          Backend and systems engineer. I build the layer underneath, and then I{' '}
          <span className="accent">measure it</span>.
        </p>

        <p className="t-body mt-4 max-w-[52ch]">
          Final year at Atria Institute of Technology, Bangalore. Compilers, collectors,
          gateways and verifiers, mostly. Several of the results below argued with me and
          are still here.
        </p>

        <div className="mt-7 flex flex-wrap gap-2.5">
          <a className="btn btn--sig" href={`mailto:${profile.email}`}>
            Email me
          </a>
          <a className="btn" href={cv} target="_blank" rel="noreferrer noopener">
            CV
          </a>
          <a className="btn" href={profile.github} target="_blank" rel="noreferrer noopener">
            GitHub
          </a>
          <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer noopener">
            LinkedIn
          </a>
        </div>
      </header>

      {/* ---------------------------------------------------- sixty seconds */}
      <section className="band" aria-labelledby="work-h">
        <div className="mb-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h2 className="t-h1" id="work-h">
            Work
          </h2>
          <p className="t-small max-w-[34ch]">
            Six of ten. Every figure comes from that project&rsquo;s own results file.
          </p>
        </div>

        <Brief />

        <p className="tag mt-5 normal-case tracking-normal leading-relaxed">
          Also built: {alsoBuilt.join(', ')}.
        </p>
        <a className="btn mt-4" href={FULL_SITE}>
          The long version has the write-ups
          <span aria-hidden>&rarr;</span>
        </a>
      </section>

      {/* ----------------------------------------------------- ninety seconds */}
      <section className="band" aria-labelledby="exp-h">
        <h2 className="t-h1 mb-5" id="exp-h">
          Experience
        </h2>

        <div className="flex flex-col gap-1.5 border-t border-[var(--edge)] pt-5">
          <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1">
            <p className="t-h2">
              {job.role} <span className="text-[var(--grey-1)]">· {job.org}</span>
            </p>
            <p className="tag">{job.period}</p>
          </div>
          <p className="t-body mt-2 max-w-[58ch]">{job.lede}</p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {job.artefacts.map((a) => (
              <li key={a} className="chip">
                {a}
              </li>
            ))}
          </ul>
          <p className="t-small mt-3 max-w-[60ch]">{job.caveat}</p>
        </div>
      </section>

      <section className="band" aria-labelledby="edu-h">
        <h2 className="t-h1 mb-5" id="edu-h">
          Education
        </h2>
        <dl className="border-t border-[var(--edge)]">
          <Row k="Degree" v={education.current.degree} />
          <Row k="Institution" v={`${education.current.institution} · Bangalore`} />
          <Row k="Standing" v={`${education.current.standing} · no backlogs`} />
          <Row k="CGPA" v={`${education.current.cgpa} · ${education.current.cgpaNote}`} />
          <Row k="Graduating" v={profile.graduating} />
          <Row k="Class XII" v="86.16% · Chetana PU College, Deeksha Vedantu" />
          <Row k="Class X" v="90.0% · Navkis Educational Centre, CBSE" />
        </dl>
      </section>

      <section className="band" aria-labelledby="cred-h">
        <h2 className="t-h1 mb-5" id="cred-h">
          Credentials
        </h2>

        <div className="border-t border-[var(--edge)] pt-5">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="chip chip--sig">Peer reviewed</span>
            <span className="chip">{publication.year}</span>
          </div>
          <p className="t-h2 mt-4 max-w-[30ch]">{publication.title}</p>
          <p className="m mt-2 text-[12px] text-[var(--grey-2)]">
            {publication.venue} · {publication.position}
          </p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            <a className="btn" href={publication.file} target="_blank" rel="noreferrer noopener">
              Read the paper
              <span aria-hidden>&#8599;</span>
            </a>
            <a className="btn" href={publication.doi} target="_blank" rel="noreferrer noopener">
              DOI
            </a>
          </div>
        </div>

        <ul className="mt-6 flex flex-col">
          {achievements.map((a) => (
            <li key={a.title} className="border-t border-[var(--edge)] py-4">
              <p className="text-[16px] font-medium leading-snug">{a.title}</p>
              {a.detail && <p className="t-small mt-1">{a.detail}</p>}
            </li>
          ))}
        </ul>

        <p className="tag mt-5 normal-case tracking-normal">
          Four course certificates available on request.
        </p>
      </section>

      <section className="band" aria-labelledby="sk-h">
        <h2 className="t-h1 mb-5" id="sk-h">
          Skills
        </h2>
        <dl className="border-t border-[var(--edge)]">
          {quickSkills.map((s) => (
            <Row key={s.k} k={s.k} v={s.v} />
          ))}
          <Row k="Speaks" v={languages.join(', ')} />
        </dl>
        <p className="tag mt-4 normal-case tracking-normal">
          Counted out of the repositories: Python 358 files, Go 19, TypeScript 44,
          JavaScript 22.
        </p>
      </section>

      {/* -------------------------------------------------------- contact -- */}
      <section className="band" aria-labelledby="c-h">
        <h2 className="t-h1" id="c-h">
          Contact
        </h2>
        <p className="t-body mt-3 max-w-[46ch]">
          Open to software, ML, data and quality roles, and to internships before I
          graduate. I read everything and reply properly, including a no.
        </p>

        <ul className="mt-6 border-t border-[var(--edge)]">
          {[
            { k: 'Email', v: profile.email, href: `mailto:${profile.email}` },
            { k: 'Phone', v: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` },
            { k: 'GitHub', v: profile.githubHandle, href: profile.github },
            { k: 'LinkedIn', v: profile.linkedinHandle, href: profile.linkedin },
            { k: 'LeetCode', v: 'aditya-srinivas3', href: profile.leetcode },
            { k: 'CV', v: 'PDF, one page', href: cv },
          ].map((r) => (
            <li key={r.k} className="border-b border-[var(--edge)]">
              <a
                href={r.href}
                className="flex min-h-[56px] items-center justify-between gap-5 py-3"
                {...(r.href.startsWith('http') || r.href.startsWith('/docs')
                  ? { target: '_blank', rel: 'noreferrer noopener' }
                  : {})}
              >
                <span className="tag">{r.k}</span>
                <span className="m text-right text-[14px] text-[var(--paper)]">{r.v}</span>
              </a>
            </li>
          ))}
        </ul>

        <a className="btn btn--sig mt-7 w-full sm:w-auto" href={`mailto:${profile.email}`}>
          Say hello
          <span aria-hidden>&rarr;</span>
        </a>
      </section>

      <footer className="band flex flex-wrap items-center justify-between gap-4">
        <a
          className="tag inline-flex min-h-[44px] items-center normal-case tracking-normal transition-colors hover:text-[var(--paper)]"
          href={FULL_SITE}
        >
          The long version has the charts and the write-ups
        </a>
        <p className="tag">
          {profile.name} · Bangalore · {new Date().getFullYear()}
        </p>
      </footer>
    </main>
  )
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-[var(--edge)] py-3.5">
      <dt className="tag shrink-0">{k}</dt>
      <dd className="m m-0 max-w-[42ch] text-right text-[13px] leading-snug text-[var(--paper)]">
        {v}
      </dd>
    </div>
  )
}
