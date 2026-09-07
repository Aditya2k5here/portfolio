import { Nav } from '@/components/Nav'
import { Opening } from '@/components/Opening'
import { About } from '@/components/About'
import { Work } from '@/components/Work'
import { Skills } from '@/components/Skills'
import { Credentials } from '@/components/Credentials'
import { Education } from '@/components/Education'
import { Experience } from '@/components/Experience'
import { Contact } from '@/components/Contact'
import { profile } from '@/content/profile'

export const dynamic = 'force-static'

export default function Page() {
  return (
    <>
      <Nav />
      <Opening />
      <main>
        <About />
        <Work />
        <Skills />
        <Credentials />
        <Education />
        <Experience />
        <Contact />
      </main>

      <footer className="stage py-10">
        <div className="shell flex flex-wrap items-center justify-between gap-4">
          <p className="tag normal-case tracking-normal">
            Built by hand. No template underneath it.
          </p>
          <p className="tag">
            {profile.name} · Bangalore · {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </>
  )
}
