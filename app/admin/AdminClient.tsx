'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import {
  BookOpen, Newspaper, Bell, Plus, Trash2, LogOut,
  ChevronDown, ChevronUp, Download,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import type { Article, Issue, Announcement } from '@/lib/types'

type Tab = 'issues' | 'articles' | 'announcements'

interface AdminClientProps {
  initialArticles: Article[]
  initialIssues: Issue[]
  initialAnnouncements: Announcement[]
}

export default function AdminClient({ initialArticles, initialIssues, initialAnnouncements }: AdminClientProps) {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('issues')
  const [articles, setArticles] = useState(initialArticles)
  const [issues, setIssues] = useState(initialIssues)
  const [announcements, setAnnouncements] = useState(initialAnnouncements)
  const [isPending, startTransition] = useTransition()

  const supabase = createClient()

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/')
  }

  // ---------- ISSUES ----------
  const [issueForm, setIssueForm] = useState({ volume: '', number: '', year: '', published_at: '' })
  const [issueOpen, setIssueOpen] = useState(false)

  async function addIssue(e: React.FormEvent) {
    e.preventDefault()
    const { data, error } = await supabase.from('issues').insert({
      volume: Number(issueForm.volume),
      number: Number(issueForm.number),
      year: Number(issueForm.year),
      published_at: issueForm.published_at || null,
      full_pdf_url: null,
    }).select().single<Issue>()
    if (!error && data) {
      setIssues((prev) => [data, ...prev])
      setIssueForm({ volume: '', number: '', year: '', published_at: '' })
      setIssueOpen(false)
      startTransition(() => router.refresh())
    }
  }

  // Open all article PDFs for an issue in separate tabs
  function downloadIssuePdfs(issueId: string) {
    const issueArticles = articles.filter((a) => a.issue_id === issueId && a.pdf_url)
    if (issueArticles.length === 0) {
      alert('У этого выпуска нет статей с PDF.')
      return
    }
    issueArticles.forEach((a) => {
      window.open(a.pdf_url!, '_blank')
    })
  }

  async function deleteIssue(id: string) {
    if (!confirm('Удалить выпуск? Все связанные статьи будут удалены.')) return
    await supabase.from('issues').delete().eq('id', id)
    setIssues((prev) => prev.filter((i) => i.id !== id))
    setArticles((prev) => prev.filter((a) => a.issue_id !== id))
    startTransition(() => router.refresh())
  }

  // ---------- ARTICLES ----------
  const [articleForm, setArticleForm] = useState({
    title: '', authors: '', pages: '', category: '', language: 'Русский', issue_id: '', pdf_url: '', abstract: '',
  })
  const [articleOpen, setArticleOpen] = useState(false)
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [pdfUploading, setPdfUploading] = useState(false)
  const [uploadingArticleId, setUploadingArticleId] = useState<string | null>(null)

  async function uploadPdfToExistingArticle(articleId: string, file: File) {
    setUploadingArticleId(articleId)
    console.log('[v0] Uploading PDF for existing article:', articleId, file.name)
    const fd = new FormData()
    fd.append('file', file)
    fd.append('folder', 'articles')
    const res = await fetch('/api/upload-pdf', { method: 'POST', body: fd })
    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}))
      console.log('[v0] PDF upload failed:', errJson)
      alert('Ошибка загрузки PDF: ' + (errJson.error ?? res.statusText))
      setUploadingArticleId(null)
      return
    }
    const { url } = await res.json()
    console.log('[v0] PDF url received:', url, '— saving to article', articleId)
    const { error } = await supabase.from('articles').update({ pdf_url: url }).eq('id', articleId)
    if (error) {
      console.log('[v0] Failed to save pdf_url to DB:', error.message)
      alert('Ошибка сохранения PDF URL: ' + error.message)
    } else {
      console.log('[v0] pdf_url saved successfully for article', articleId)
      setArticles((prev) => prev.map((a) => a.id === articleId ? { ...a, pdf_url: url } : a))
      startTransition(() => router.refresh())
    }
    setUploadingArticleId(null)
  }

  async function uploadPdf(file: File): Promise<string | null> {
    setPdfUploading(true)
    console.log('[v0] Starting PDF upload:', file.name, file.size, 'bytes')
    const fd = new FormData()
    fd.append('file', file)
    fd.append('folder', 'articles')
    const res = await fetch('/api/upload-pdf', { method: 'POST', body: fd })
    setPdfUploading(false)
    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}))
      console.log('[v0] PDF upload failed:', res.status, errJson)
      alert('Ошибка загрузки PDF: ' + (errJson.error ?? res.statusText))
      return null
    }
    const json = await res.json()
    console.log('[v0] PDF upload success, url:', json.url)
    return json.url ?? null
  }

  async function addArticle(e: React.FormEvent) {
    e.preventDefault()
    let pdfUrl = articleForm.pdf_url || null
    if (pdfFile) {
      pdfUrl = await uploadPdf(pdfFile)
      if (!pdfUrl) return // stop if upload failed
    }
    console.log('[v0] Saving article with pdf_url:', pdfUrl)
    const { data, error } = await supabase.from('articles').insert({
      title: articleForm.title,
      authors: articleForm.authors,
      pages: articleForm.pages || null,
      category: articleForm.category || null,
      language: articleForm.language,
      issue_id: articleForm.issue_id || null,
      pdf_url: pdfUrl,
      abstract: articleForm.abstract || null,
    }).select().single<Article>()
    if (error) {
      console.log('[v0] Insert article error:', error.message)
      alert('Ошибка сохранения статьи: ' + error.message)
      return
    }
    if (data) {
      console.log('[v0] Article saved, id:', data.id, 'pdf_url:', data.pdf_url)
      setArticles((prev) => [data, ...prev])
      setArticleForm({ title: '', authors: '', pages: '', category: '', language: 'Русский', issue_id: '', pdf_url: '', abstract: '' })
      setPdfFile(null)
      setArticleOpen(false)
      startTransition(() => router.refresh())
    }
  }

  async function deleteArticle(id: string) {
    if (!confirm('Удалить статью?')) return
    await supabase.from('articles').delete().eq('id', id)
    setArticles((prev) => prev.filter((a) => a.id !== id))
    startTransition(() => router.refresh())
  }

  // ---------- ANNOUNCEMENTS ----------
  const [annForm, setAnnForm] = useState({ title: '', body: '', published_at: '' })
  const [annOpen, setAnnOpen] = useState(false)

  async function addAnnouncement(e: React.FormEvent) {
    e.preventDefault()
    const { data, error } = await supabase.from('announcements').insert({
      title: annForm.title,
      body: annForm.body,
      published_at: annForm.published_at || new Date().toISOString().split('T')[0],
    }).select().single<Announcement>()
    if (!error && data) {
      setAnnouncements((prev) => [data, ...prev])
      setAnnForm({ title: '', body: '', published_at: '' })
      setAnnOpen(false)
      startTransition(() => router.refresh())
    }
  }

  async function deleteAnnouncement(id: string) {
    if (!confirm('Удалить объявление?')) return
    await supabase.from('announcements').delete().eq('id', id)
    setAnnouncements((prev) => prev.filter((a) => a.id !== id))
    startTransition(() => router.refresh())
  }

  const navItems: { id: Tab; icon: React.ElementType; label: string; count: number }[] = [
    { id: 'issues', icon: BookOpen, label: 'Выпуски', count: issues.length },
    { id: 'articles', icon: Newspaper, label: 'Статьи', count: articles.length },
    { id: 'announcements', icon: Bell, label: 'Объявления', count: announcements.length },
  ]

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#f8fafc]">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-60 bg-white border-r border-border flex-col shrink-0">
        <div className="p-5 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#1a56db] flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-bold text-[#0f172a] text-sm leading-none">SOVA</p>
              <p className="text-[10px] text-[#64748b]">Панель управления</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(({ id, icon: Icon, label, count }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                tab === id
                  ? 'bg-[#f0f4ff] text-[#1a56db]'
                  : 'text-[#334155] hover:bg-[#f8fafc] hover:text-[#1a56db]'
              }`}
            >
              <span className="flex items-center gap-2">
                <Icon className="w-4 h-4" />
                {label}
              </span>
              {count > 0 && (
                <span className="text-xs bg-[#dbeafe] text-[#1a56db] px-1.5 py-0.5 rounded-full">
                  {count}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-border">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#ef4444] hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Выйти
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden bg-white border-b border-border px-4 py-3 flex items-center justify-between">
        <p className="font-bold text-[#0f172a] text-sm">SOVA — Панель управления</p>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-xs text-[#ef4444] hover:text-red-700 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          Выйти
        </button>
      </div>

      {/* Main */}
      <main className="flex-1 overflow-auto p-4 md:p-8 pb-24 md:pb-8">
        {/* ISSUES */}
        {tab === 'issues' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-[#0f172a]">Выпуски</h1>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleLogout}
                  className="md:hidden flex items-center gap-1.5 text-sm text-[#ef4444] hover:text-red-700 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors border border-[#fca5a5]"
                >
                  <LogOut className="w-4 h-4" />
                  Выйти
                </button>
                <button
                  onClick={() => setIssueOpen(!issueOpen)}
                  className="flex items-center gap-2 bg-[#1a56db] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#1e40af] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Добавить выпуск
                  {issueOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {issueOpen && (
              <form onSubmit={addIssue} className="bg-white border border-border rounded-xl p-5 mb-6 grid grid-cols-2 gap-4">
                <FormField label="Том" required>
                  <input type="number" value={issueForm.volume} onChange={e => setIssueForm(f => ({ ...f, volume: e.target.value }))} className={inputCls} placeholder="1" required />
                </FormField>
                <FormField label="Номер" required>
                  <input type="number" value={issueForm.number} onChange={e => setIssueForm(f => ({ ...f, number: e.target.value }))} className={inputCls} placeholder="1" required />
                </FormField>
                <FormField label="Год" required>
                  <input type="number" value={issueForm.year} onChange={e => setIssueForm(f => ({ ...f, year: e.target.value }))} className={inputCls} placeholder="2025" required />
                </FormField>
                <FormField label="Дата публикации">
                  <input type="date" value={issueForm.published_at} onChange={e => setIssueForm(f => ({ ...f, published_at: e.target.value }))} className={inputCls} />
                </FormField>
                <div className="col-span-2 flex justify-end">
                  <button type="submit" disabled={isPending} className="bg-[#1a56db] text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-[#1e40af] disabled:opacity-50 transition-colors">
                    Сохранить выпуск
                  </button>
                </div>
              </form>
            )}

            <div className="bg-white border border-border rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-[#f8fafc] border-b border-border">
                  <tr>
                    <th className="text-left px-5 py-3 text-[#64748b] font-medium">Том / №</th>
                    <th className="text-left px-5 py-3 text-[#64748b] font-medium">Год</th>
                    <th className="text-left px-5 py-3 text-[#64748b] font-medium">Дата</th>
                    <th className="text-left px-5 py-3 text-[#64748b] font-medium">Статей</th>
                    <th className="px-5 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {issues.map((issue) => (
                    <tr key={issue.id} className="hover:bg-[#f8fafc]">
                      <td className="px-5 py-3 font-medium text-[#0f172a]">Том {issue.volume}, №{issue.number}</td>
                      <td className="px-5 py-3 text-[#334155]">{issue.year}</td>
                      <td className="px-5 py-3 text-[#64748b]">
                        {issue.published_at ? new Date(issue.published_at).toLocaleDateString('ru-RU') : '—'}
                      </td>
                      <td className="px-5 py-3 text-[#64748b]">
                        {articles.filter((a) => a.issue_id === issue.id).length}
                      </td>
                      <td className="px-5 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => downloadIssuePdfs(issue.id)}
                            title="Скачать PDF статей выпуска"
                            className="text-[#1a56db] hover:text-[#1e40af] p-1"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                          <button onClick={() => deleteIssue(issue.id)} className="text-[#ef4444] hover:text-red-700 p-1">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {issues.length === 0 && (
                    <tr><td colSpan={5} className="px-5 py-8 text-center text-[#94a3b8]">Выпуски не добавлены</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ARTICLES */}
        {tab === 'articles' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-[#0f172a]">Статьи</h1>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleLogout}
                  className="md:hidden flex items-center gap-1.5 text-sm text-[#ef4444] hover:text-red-700 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors border border-[#fca5a5]"
                >
                  <LogOut className="w-4 h-4" />
                  Выйти
                </button>
                <button
                  onClick={() => setArticleOpen(!articleOpen)}
                  className="flex items-center gap-2 bg-[#1a56db] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#1e40af] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Добавить статью
                  {articleOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {articleOpen && (
              <form onSubmit={addArticle} className="bg-white border border-border rounded-xl p-5 mb-6 grid grid-cols-2 gap-4">
                <FormField label="Название" className="col-span-2" required>
                  <input value={articleForm.title} onChange={e => setArticleForm(f => ({ ...f, title: e.target.value }))} className={inputCls} placeholder="Название статьи" required />
                </FormField>
                <FormField label="Авторы" className="col-span-2" required>
                  <input value={articleForm.authors} onChange={e => setArticleForm(f => ({ ...f, authors: e.target.value }))} className={inputCls} placeholder="Иванов А.А., Петров Б.Б." required />
                </FormField>
                <FormField label="Страницы">
                  <input value={articleForm.pages} onChange={e => setArticleForm(f => ({ ...f, pages: e.target.value }))} className={inputCls} placeholder="1–12" />
                </FormField>
                <FormField label="Категория">
                  <select value={articleForm.category} onChange={e => setArticleForm(f => ({ ...f, category: e.target.value }))} className={inputCls}>
                    <option value="">— выберите —</option>
                    <option>Физика</option>
                    <option>Химия</option>
                    <option>Биология</option>
                    <option>Математика</option>
                    <option>Информатика</option>
                    <option>История</option>
                    <option>Экономика</option>
                    <option>Педагогика</option>
                    <option>Медицина</option>
                    <option>Право</option>
                    <option>Философия</option>
                    <option>Социология</option>
                    <option>Сельскохозяйственные науки</option>
                    <option>Инжиниринг и технологии</option>
                    <option>Гуманитарные науки</option>
                  </select>
                </FormField>
                <FormField label="Язык">
                  <select value={articleForm.language} onChange={e => setArticleForm(f => ({ ...f, language: e.target.value }))} className={inputCls}>
                    <option>Русский</option>
                    <option>Казахский</option>
                    <option>Английский</option>
                  </select>
                </FormField>
                <FormField label="Выпуск">
                  <select value={articleForm.issue_id} onChange={e => setArticleForm(f => ({ ...f, issue_id: e.target.value }))} className={inputCls}>
                    <option value="">— не выбрано —</option>
                    {issues.map((i) => (
                      <option key={i.id} value={i.id}>Том {i.volume}, №{i.number} ({i.year})</option>
                    ))}
                  </select>
                </FormField>
                <FormField label="PDF файл" className="col-span-2">
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={e => setPdfFile(e.target.files?.[0] ?? null)}
                    className={inputCls}
                  />
                  {pdfFile && (
                    <p className="text-xs text-[#64748b] mt-1">Выбран: {pdfFile.name}</p>
                  )}
                  {articleForm.pdf_url && !pdfFile && (
                    <p className="text-xs text-[#059669] mt-1 flex items-center gap-1">
                      Текущий PDF:&nbsp;
                      <a href={articleForm.pdf_url} target="_blank" rel="noreferrer" className="underline truncate max-w-xs">
                        {articleForm.pdf_url}
                      </a>
                    </p>
                  )}
                </FormField>
                <FormField label="Аннотация" className="col-span-2">
                  <textarea value={articleForm.abstract} onChange={e => setArticleForm(f => ({ ...f, abstract: e.target.value }))} className={inputCls} rows={3} placeholder="Краткое содержание статьи..." />
                </FormField>
                <div className="col-span-2 flex justify-end">
                  <button type="submit" disabled={isPending || pdfUploading} className="bg-[#1a56db] text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-[#1e40af] disabled:opacity-50 transition-colors">
                    {pdfUploading ? 'Загрузка PDF...' : 'Сохранить статью'}
                  </button>
                </div>
              </form>
            )}

            {/* Mobile cards */}
            <div className="md:hidden space-y-3">
              {articles.map((article) => {
                const issue = issues.find((i) => i.id === article.issue_id)
                return (
                  <div key={article.id} className="bg-white border border-border rounded-xl p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#0f172a] line-clamp-2 leading-snug">{article.title}</p>
                        <p className="text-xs text-[#64748b] mt-1">{article.authors}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {article.category && (
                            <span className="text-xs bg-[#f0f4ff] text-[#1a56db] px-2 py-0.5 rounded-full">{article.category}</span>
                          )}
                          {issue && (
                            <span className="text-xs bg-[#f8fafc] text-[#64748b] px-2 py-0.5 rounded-full border border-border">
                              Т.{issue.volume} №{issue.number}
                            </span>
                          )}
                        </div>
                      </div>
                      <button onClick={() => deleteArticle(article.id)} className="text-[#ef4444] hover:text-red-700 p-1 shrink-0">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )
              })}
              {articles.length === 0 && (
                <div className="bg-white border border-border rounded-xl px-5 py-8 text-center text-[#94a3b8] text-sm">Статьи не добавлены</div>
              )}
            </div>

            {/* Desktop table */}
            <div className="hidden md:block bg-white border border-border rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-[#f8fafc] border-b border-border">
                  <tr>
                    <th className="text-left px-5 py-3 text-[#64748b] font-medium">Название</th>
                    <th className="text-left px-5 py-3 text-[#64748b] font-medium">Авторы</th>
                    <th className="text-left px-5 py-3 text-[#64748b] font-medium">Категория</th>
                    <th className="text-left px-5 py-3 text-[#64748b] font-medium">Выпуск</th>
                    <th className="text-left px-5 py-3 text-[#64748b] font-medium">PDF</th>
                    <th className="px-5 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {articles.map((article) => {
                    const issue = issues.find((i) => i.id === article.issue_id)
                    return (
                      <tr key={article.id} className="hover:bg-[#f8fafc]">
                        <td className="px-5 py-3 text-[#0f172a] max-w-xs">
                          <p className="line-clamp-2 leading-snug">{article.title}</p>
                        </td>
                        <td className="px-5 py-3 text-[#64748b] whitespace-nowrap">{article.authors}</td>
                        <td className="px-5 py-3 text-[#64748b]">{article.category ?? '—'}</td>
                        <td className="px-5 py-3 text-[#64748b] whitespace-nowrap">
                          {issue ? `Т.${issue.volume} №${issue.number}` : '—'}
                        </td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            {article.pdf_url ? (
                              <a
                                href={article.pdf_url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 text-xs text-[#1a56db] hover:underline"
                              >
                                <Download className="w-3.5 h-3.5" />
                                PDF
                              </a>
                            ) : (
                              <span className="text-xs text-[#94a3b8]">нет</span>
                            )}
                            <label className="cursor-pointer">
                              <input
                                type="file"
                                accept="application/pdf"
                                className="hidden"
                                disabled={uploadingArticleId === article.id}
                                onChange={e => {
                                  const f = e.target.files?.[0]
                                  if (f) uploadPdfToExistingArticle(article.id, f)
                                  e.target.value = ''
                                }}
                              />
                              <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded border transition-colors ${
                                uploadingArticleId === article.id
                                  ? 'text-[#94a3b8] border-[#e2e8f0] cursor-not-allowed'
                                  : 'text-[#475569] border-[#cbd5e1] hover:border-[#1a56db] hover:text-[#1a56db] cursor-pointer'
                              }`}>
                                {uploadingArticleId === article.id ? 'Загрузка...' : article.pdf_url ? 'Заменить' : 'Загрузить'}
                              </span>
                            </label>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-right">
                          <button onClick={() => deleteArticle(article.id)} className="text-[#ef4444] hover:text-red-700 p-1">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                  {articles.length === 0 && (
                    <tr><td colSpan={6} className="px-5 py-8 text-center text-[#94a3b8]">Статьи не добавлены</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ANNOUNCEMENTS */}
        {tab === 'announcements' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-[#0f172a]">Объявления</h1>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleLogout}
                  className="md:hidden flex items-center gap-1.5 text-sm text-[#ef4444] hover:text-red-700 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors border border-[#fca5a5]"
                >
                  <LogOut className="w-4 h-4" />
                  Выйти
                </button>
                <button
                  onClick={() => setAnnOpen(!annOpen)}
                  className="flex items-center gap-2 bg-[#1a56db] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#1e40af] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Добавить объявление
                  {annOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {annOpen && (
              <form onSubmit={addAnnouncement} className="bg-white border border-border rounded-xl p-5 mb-6 space-y-4">
                <FormField label="Заголовок" required>
                  <input value={annForm.title} onChange={e => setAnnForm(f => ({ ...f, title: e.target.value }))} className={inputCls} placeholder="Заголовок объявления" required />
                </FormField>
                <FormField label="Текст" required>
                  <textarea value={annForm.body} onChange={e => setAnnForm(f => ({ ...f, body: e.target.value }))} className={inputCls} rows={4} placeholder="Содержание объявления..." required />
                </FormField>
                <FormField label="Дата публик��ции">
                  <input type="date" value={annForm.published_at} onChange={e => setAnnForm(f => ({ ...f, published_at: e.target.value }))} className={inputCls} />
                </FormField>
                <div className="flex justify-end">
                  <button type="submit" disabled={isPending} className="bg-[#1a56db] text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-[#1e40af] disabled:opacity-50 transition-colors">
                    Опубликовать
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-4">
              {announcements.map((ann) => (
                <div key={ann.id} className="bg-white border border-border rounded-xl p-5 flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-[#94a3b8] mb-1">
                      {ann.published_at ? new Date(ann.published_at).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}
                    </p>
                    <h3 className="font-semibold text-[#0f172a] mb-1">{ann.title}</h3>
                    <p className="text-sm text-[#475569] line-clamp-2">{ann.body}</p>
                  </div>
                  <button onClick={() => deleteAnnouncement(ann.id)} className="text-[#ef4444] hover:text-red-700 p-1 shrink-0">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {announcements.length === 0 && (
                <p className="text-center text-[#94a3b8] py-12">Объявлений нет</p>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Mobile bottom navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border flex z-50">
        {navItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex-1 flex flex-col items-center gap-1 py-2 text-[10px] font-medium transition-colors ${
              tab === id ? 'text-[#1a56db]' : 'text-[#94a3b8]'
            }`}
          >
            <Icon className="w-5 h-5" />
            {label}
          </button>
        ))}
      </nav>
    </div>
  )
}

// Helpers
const inputCls = 'w-full px-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#1a56db] focus:border-transparent'

function FormField({
  label, children, required, className,
}: {
  label: string; children: React.ReactNode; required?: boolean; className?: string
}) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-[#334155] mb-1.5">
        {label}{required && <span className="text-[#ef4444] ml-0.5">*</span>}
      </label>
      {children}
    </div>
  )
}
