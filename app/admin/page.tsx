import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { Article, Issue, Announcement } from '@/lib/types'
import AdminClient from './AdminClient'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user || user.user_metadata?.is_admin !== true) {
    redirect('/admin/login')
  }

  const [{ data: articles }, { data: issues }, { data: announcements }] = await Promise.all([
    supabase.from('articles').select('*, issues(*)').order('created_at', { ascending: false }).returns<Article[]>(),
    supabase.from('issues').select('*').order('year', { ascending: false }).order('number', { ascending: false }).returns<Issue[]>(),
    supabase.from('announcements').select('*').order('published_at', { ascending: false }).returns<Announcement[]>(),
  ])

  return (
    <AdminClient
      initialArticles={articles ?? []}
      initialIssues={issues ?? []}
      initialAnnouncements={announcements ?? []}
    />
  )
}
