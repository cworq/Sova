import { Header } from '@/components/sova/Header'
import { Footer } from '@/components/sova/Footer'
import { createClient } from '@/lib/supabase/server'
import type { Announcement } from '@/lib/types'
import AnnouncementsClient from './AnnouncementsClient'

export const dynamic = 'force-dynamic'

export default async function AnnouncementsPage() {
  const supabase = await createClient()
  const { data: announcements } = await supabase
    .from('announcements')
    .select('*')
    .order('published_at', { ascending: false })
    .returns<Announcement[]>()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <AnnouncementsClient announcements={announcements ?? []} />
      <Footer />
    </div>
  )
}
