'use client'

import { useState, useMemo } from 'react'
import { Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { ArticleCard } from '@/components/sova/ArticleCard'
import { useLang } from '@/lib/i18n'
import type { Article } from '@/lib/types'

const PAGE_SIZE = 6

interface ArchiveClientProps {
  articles: Article[]
  years: string[]
  categories: string[]
}

export default function ArchiveClient({ articles, years, categories }: ArchiveClientProps) {
  const { t } = useLang()

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('__all__')
  const [language, setLanguage] = useState('__all__')
  const [year, setYear] = useState('__all__')
  const [page, setPage] = useState(1)

  const allCategories = categories
  const allYears = years

  const LANG_OPTIONS = [
    { value: '__all__', label: t.allLangs },
    { value: 'Русский', label: t.langRu },
    { value: 'Казахский', label: t.langKaz },
    { value: 'Английский', label: t.langEn },
  ]

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      const matchSearch =
        search === '' ||
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.authors.toLowerCase().includes(search.toLowerCase())
      const matchCat = category === '__all__' || a.category === category
      const matchLang = language === '__all__' || a.language === language
      const matchYear =
        year === '__all__' ||
        (a.issues && String((a.issues as any).year) === year)
      return matchSearch && matchCat && matchLang && matchYear
    })
  }, [articles, search, category, language, year])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleFilterChange = (setter: (v: string) => void, value: string) => {
    setter(value)
    setPage(1)
  }

  const count = filtered.length

  return (
    <main className="flex-1">
      {/* Page header */}
      <div className="bg-[#f0f4ff] border-b border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-[#0f172a] mb-4">{t.archiveTitle}</h1>
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94a3b8]" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1) }}
              placeholder={t.searchPlaceholder}
              className="w-full pl-12 pr-4 py-3 border border-border rounded-xl text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1a56db] focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Filters */}
        <div className="space-y-3">
          {/* Category chips */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleFilterChange(setCategory, '__all__')}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                category === '__all__'
                  ? 'bg-[#1a56db] text-white'
                  : 'bg-white border border-border text-[#475569] hover:bg-[#f0f4ff] hover:text-[#1a56db] hover:border-[#1a56db]'
              }`}
            >
              {t.allDirections}
            </button>
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilterChange(setCategory, cat)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  category === cat
                    ? 'bg-[#1a56db] text-white'
                    : 'bg-white border border-border text-[#475569] hover:bg-[#f0f4ff] hover:text-[#1a56db] hover:border-[#1a56db]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Year & Language row */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <label className="text-sm text-[#64748b] whitespace-nowrap">{t.yearLabel}</label>
              <select
                value={year}
                onChange={(e) => handleFilterChange(setYear, e.target.value)}
                className="text-sm border border-border rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#1a56db]"
              >
                <option value="__all__">{t.allYears}</option>
                {allYears.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm text-[#64748b] whitespace-nowrap">{t.langLabel}</label>
              <div className="flex border border-border rounded-lg overflow-hidden bg-white">
                {LANG_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleFilterChange(setLanguage, opt.value)}
                    className={`px-3 py-1.5 text-sm transition-colors ${
                      language === opt.value
                        ? 'bg-[#1a56db] text-white'
                        : 'text-[#475569] hover:bg-[#f0f4ff]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <span className="text-sm text-[#94a3b8] ml-auto whitespace-nowrap">
              {t.foundArticles(count)}
            </span>
          </div>
        </div>

        {/* Results */}
        {paginated.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {paginated.map((article) => (
              <ArticleCard key={article.id} article={article} showAbstract />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-[#94a3b8] text-lg">{t.notFound}</p>
            <p className="text-[#cbd5e1] text-sm mt-1">{t.tryOther}</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-4">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 rounded-lg border border-border text-[#475569] hover:bg-[#f0f4ff] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Prev"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                  p === page
                    ? 'bg-[#1a56db] text-white'
                    : 'border border-border text-[#475569] hover:bg-[#f0f4ff]'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2 rounded-lg border border-border text-[#475569] hover:bg-[#f0f4ff] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
