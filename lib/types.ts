export interface Issue {
  id: string
  volume: number
  number: number
  year: number
  published_at: string | null
  full_pdf_url: string | null
  cover_url: string | null
  created_at: string
}

export interface Article {
  id: string
  title: string
  authors: string
  pages: string | null
  category: string | null
  language: string
  issue_id: string | null
  pdf_url: string | null
  abstract: string | null
  views: number
  downloads: number
  created_at: string
  issues?: Issue
}

export interface Announcement {
  id: string
  title: string
  body: string
  published_at: string
  created_at: string
}
