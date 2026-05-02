'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Download, Globe, BookOpen, Award } from 'lucide-react'
import { useLang } from '@/lib/i18n'
import { ArticleCard } from './ArticleCard'
import type { Article, Issue } from '@/lib/types'

interface HomeClientProps {
  latestIssue: Issue | null
  articles: Article[]
}

const badgeIcons = [Globe, BookOpen, Award]
const badgeKeys = ['Open Access', 'Google Scholar', 'ISSN 0000-0000'] as const

export function HomeClient({ latestIssue, articles }: HomeClientProps) {
  const { t } = useLang()

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#f0f4ff] to-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            {/* Cover image */}
            <div className="shrink-0">
              <div className="w-52 sm:w-64 shadow-2xl rounded-lg overflow-hidden border border-border bg-white flex items-center justify-center p-4">
                <Image
                  src="/sova-logo.png"
                  alt="Логотип журнала SOVA"
                  width={256}
                  height={256}
                  className="w-full object-contain"
                  loading="eager"
                  priority
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-5 text-center lg:text-left">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#1a56db] mb-2">
                  {t.intlJournal}
                </p>
                <h1 className="text-3xl sm:text-4xl font-bold text-[#0f172a] text-balance leading-tight">
                  SOVA: Science, Openness,<br className="hidden sm:block" /> Vision and Advancement
                </h1>
              </div>
              <p className="text-[#475569] leading-relaxed max-w-2xl">
                {t.journalDesc}
              </p>
              <p className="text-sm font-mono text-[#64748b]">{t.issn}</p>

              {/* Badges */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 pt-1">
                {badgeKeys.map((label, i) => {
                  const Icon = badgeIcons[i]
                  return (
                    <span
                      key={label}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#dbeafe] text-[#1a56db] text-xs font-medium rounded-full shadow-sm"
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {label}
                    </span>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Issue Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {latestIssue ? (
          <>
            {/* Section header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-bold text-[#0f172a]">{t.currentIssueSec}</h2>
                <p className="text-[#64748b] mt-1">
                  {t.vol} {latestIssue.volume}, {t.num}{latestIssue.number}, {latestIssue.year}
                  {latestIssue.published_at && (
                    <> · {new Date(latestIssue.published_at).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}</>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded overflow-hidden border border-border shadow-sm shrink-0 bg-white flex items-center justify-center p-1">
                  <Image
                    src="/sova-logo.png"
                    alt="Логотип журнала SOVA"
                    width={48}
                    height={48}
                    className="w-full h-full object-contain"
                  />
                </div>
                {latestIssue.full_pdf_url && (
                  <a
                    href={latestIssue.full_pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#1a56db] hover:bg-[#1e40af] text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    {t.downloadIssue}
                  </a>
                )}
              </div>
            </div>

            {/* Article grid */}
            {articles && articles.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {articles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <p className="text-center text-[#94a3b8] py-12">{t.noArticles}</p>
            )}

            <div className="mt-8 text-center">
              <Link href="/archive" className="text-[#1a56db] text-sm font-medium hover:underline">
                {t.allArchive}
              </Link>
            </div>
          </>
        ) : (
          <p className="text-center text-[#94a3b8] py-16">{t.noIssues}</p>
        )}
      </section>
    </main>
  )
}
