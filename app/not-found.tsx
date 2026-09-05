import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col justify-center py-20">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-graphite">Error 404</p>
      <h1 className="t-display mt-6 text-[clamp(38px,9vw,120px)]">Not on this record</h1>
      <hr className="mt-8 h-px w-full border-0 bg-vermillion" />
      <p className="measure mt-6 leading-[1.65]">
        There is no page at this address. That is a missing route, not a design statement.
      </p>
      <p className="mt-7 font-mono text-[11px] uppercase tracking-[0.16em]">
        <Link href="/" className="text-graphite hover:text-ink">
          ← Back to the index
        </Link>
      </p>
    </section>
  )
}
