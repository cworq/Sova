import { Header } from '@/components/sova/Header'
import { Footer } from '@/components/sova/Footer'
import { HomeClient } from '@/components/sova/HomeClient'
import { createClient } from '@/lib/supabase/server'
import type { Article, Issue } from '@/lib/types'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const supabase = await createClient()

  const { data: latestIssue } = await supabase
    .from('issues')
    .select('*')
    .order('year', { ascending: false })
    .order('number', { ascending: false })
    .limit(1)
    .returns<Issue[]>()
    .then(({ data, error }) => ({ data: data?.[0] ?? null, error }))

  const { data: articles } = latestIssue
    ? await supabase
        .from('articles')
        .select('*')
        .eq('issue_id', latestIssue.id)
        .order('created_at', { ascending: true })
        .returns<Article[]>()
    : { data: [] }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <HomeClient latestIssue={latestIssue} articles={articles ?? []} />
      <Footer />
    </div>
  )
}
