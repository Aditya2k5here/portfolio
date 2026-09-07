import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="shell flex min-h-[70svh] flex-col justify-center py-24">
      <p className="m text-[11px] uppercase tracking-[0.1em] text-[var(--grey-3)]">Error 404</p>
      <h1 className="t-h1 mt-6">Nothing at this address.</h1>
      <p className="t-body mt-5 max-w-[46ch]">
        A missing route, not a design statement.
      </p>
      <Link href="/" className="btn btn--sig mt-9 self-start">
        Back to the start
      </Link>
    </main>
  )
}
