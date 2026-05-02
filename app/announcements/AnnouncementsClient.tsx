'use client'

import { CalendarDays, Bell } from 'lucide-react'
import { useLang } from '@/lib/i18n'
import type { Announcement } from '@/lib/types'

interface Props {
  announcements: Announcement[]
}

export default function AnnouncementsClient({ announcements }: Props) {
  const { t, lang } = useLang()

  const locale = lang === 'ENG' ? 'en-US' : lang === 'KAZ' ? 'kk-KZ' : 'ru-RU'

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="bg-[#f0f4ff] border-b border-border py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-[#1a56db] flex items-center justify-center">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#1a56db]">
              {t.announcementsSubtitle}
            </p>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0f172a] text-balance">
            {t.announcementsTitle}
          </h1>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-5">
        {announcements && announcements.length > 0 ? (
          announcements.map((ann) => {
            const date = ann.published_at
              ? new Date(ann.published_at).toLocaleDateString(locale, {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })
              : ''
            const yearLabel = ann.published_at
              ? new Date(ann.published_at).getFullYear()
              : ''
            return (
              <article
                key={ann.id}
                className="sova-card p-6 hover:border-[#1a56db]/30 transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-[#f0f4ff] border border-[#dbeafe] text-[#1a56db]">
                    <CalendarDays className="w-5 h-5 mb-0.5" />
                    <span className="text-[9px] font-semibold leading-none text-center">{yearLabel}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-[#94a3b8] mb-1.5 flex items-center gap-1.5">
                      <CalendarDays className="w-3 h-3" />
                      {date}
                    </p>
                    <h2 className="font-semibold text-[#0f172a] text-base sm:text-lg mb-2 leading-snug">
                      {ann.title}
                    </h2>
                    <p className="text-sm text-[#475569] leading-relaxed">{ann.body}</p>
                  </div>
                </div>
              </article>
            )
          })
        ) : (
          <p className="text-center text-[#94a3b8] py-12">{t.noAnnouncements}</p>
        )}
      </div>
    </main>
  )
}
