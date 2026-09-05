import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PartSheet } from '@/components/PartSheet'
import { parts, partBySlug } from '@/content/parts'

export function generateStaticParams() {
  return parts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const part = partBySlug(slug)
  if (!part) return {}
  return {
    title: `${part.id} · ${part.name}`,
    description: part.thesis,
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const part = partBySlug(slug)
  if (!part) notFound()
  return <PartSheet part={part} />
}
