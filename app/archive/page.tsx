import { Header } from '@/components/sova/Header'
import { Footer } from '@/components/sova/Footer'
import { createClient } from '@/lib/supabase/server'
import type { Article, Issue } from '@/lib/types'
import ArchiveClient from './ArchiveClient'

export const dynamic = 'force-dynamic'

export default async function ArchivePage() {
  const supabase = await createClient()

  const { data: articles } = await supabase
    .from('articles')
    .select('*, issues(*)')
    .order('created_at', { ascending: false })
    .returns<Article[]>()

  const { data: issues } = await supabase
    .from('issues')
    .select('*')
    .order('year', { ascending: false })
    .order('number', { ascending: false })
    .returns<Issue[]>()

  const years = [...new Set((issues ?? []).map((i) => String(i.year)))]
  const categories = [...new Set((articles ?? []).map((a) => a.category).filter(Boolean))] as string[]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <ArchiveClient articles={articles ?? []} years={years} categories={categories} />
      <Footer />
    </div>
  )
}
