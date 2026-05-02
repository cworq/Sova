'use client'

import { FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLang } from '@/lib/i18n'
import type { Article } from '@/lib/types'

interface ArticleCardProps {
  article: Article
  showAbstract?: boolean
}

const CATEGORY_COLORS: Record<string, string> = {
  'Информатика': 'bg-blue-100 text-blue-700',
  'Химия': 'bg-green-100 text-green-700',
  'Биология': 'bg-emerald-100 text-emerald-700',
  'Физика': 'bg-purple-100 text-purple-700',
  'Сельскохозяйственные науки': 'bg-amber-100 text-amber-700',
}

export function ArticleCard({ article, showAbstract = false }: ArticleCardProps) {
  const { t } = useLang()
  const categoryClass = article.category
    ? (CATEGORY_COLORS[article.category] ?? 'bg-[#f0f4ff] text-[#1a56db]')
    : 'bg-[#f0f4ff] text-[#1a56db]'

  function handleDownload() {
    if (!article.pdf_url) return
    window.open(article.pdf_url, '_blank')
  }

  return (
    <div className="sova-card p-5 flex flex-col gap-3">
      {/* Category badge + language */}
      <div className="flex items-start justify-between gap-2">
        {article.category && (
          <span className={`inline-flex self-start text-xs font-medium px-2.5 py-0.5 rounded-full ${categoryClass}`}>
            {article.category}
          </span>
        )}
        <span className="text-xs text-[#94a3b8] shrink-0">
          {article.language === 'Английский' ? 'EN' : article.language === 'Казахский' ? 'KAZ' : 'RU'}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-semibold text-[#0f172a] leading-snug text-sm sm:text-base line-clamp-3">
        {article.title}
      </h3>

      {/* Authors + pages */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#64748b]">
        <span>{article.authors}</span>
        {article.pages && (
          <>
            <span className="text-[#cbd5e1]">|</span>
            <span>С. {article.pages}</span>
          </>
        )}
      </div>

      {showAbstract && article.abstract && (
        <p className="text-sm text-[#475569] leading-relaxed line-clamp-3">{article.abstract}</p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-end mt-auto pt-1">
        {article.pdf_url ? (
          <Button
            size="sm"
            variant="outline"
            onClick={handleDownload}
            className="text-[#1a56db] border-[#1a56db] hover:bg-[#f0f4ff] text-xs h-8 gap-1.5"
          >
            <FileText className="w-3.5 h-3.5" />
            PDF
          </Button>
        ) : (
          <span className="text-xs text-[#94a3b8]">{t.pdfSoon}</span>
        )}
      </div>
    </div>
  )
}
