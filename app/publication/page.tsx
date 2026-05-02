'use client'

import {
  Mail,
  FileText,
  Clock,
  CreditCard,
  BookMarked,
  FileBadge,
  Newspaper,
  Award,
} from 'lucide-react'
import { Header } from '@/components/sova/Header'
import { Footer } from '@/components/sova/Footer'
import { useLang } from '@/lib/i18n'

const STEP_ICONS = [Mail, FileText, Clock, CreditCard, BookMarked]
const RECEIVE_ICONS = [Newspaper, FileBadge, Award]

export default function PublicationPage() {
  const { t } = useLang()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-[#f0f4ff] border-b border-border py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#1a56db] mb-3">
              {t.publicationHeroSub}
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#0f172a] text-balance mb-4">
              {t.publicationHeroTitle}
            </h1>
            <p className="text-[#475569] leading-relaxed max-w-2xl mx-auto">
              {t.publicationHeroDesc}
            </p>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">
          {/* Plagiarism & Peer Review */}
          <section>
            <h2 className="text-2xl font-bold text-[#0f172a] mb-6">{t.plagiarismTitle}</h2>
            <div className="sova-card p-6 space-y-5">
              <div>
                <h3 className="font-semibold text-[#0f172a] mb-2">{t.plagiarismSectionTitle}</h3>
                <p className="text-sm text-[#475569] leading-relaxed">{t.plagiarismText}</p>
              </div>
              <div className="border-t border-border pt-5">
                <h3 className="font-semibold text-[#0f172a] mb-2">{t.peerReviewTitle}</h3>
                <p className="text-sm text-[#475569] leading-relaxed">{t.peerReviewText}</p>
              </div>
            </div>
          </section>

          {/* Steps timeline */}
          <section>
            <h2 className="text-2xl font-bold text-[#0f172a] mb-8">{t.howToPublish}</h2>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[1.85rem] top-0 bottom-0 w-0.5 bg-[#dbeafe] hidden sm:block" />
              <div className="space-y-6">
                {t.steps.map((step, i) => {
                  const Icon = STEP_ICONS[i]
                  return (
                    <div key={i} className="flex gap-5 items-start">
                      <div className="relative shrink-0">
                        <div className="w-[3.75rem] h-[3.75rem] rounded-full bg-[#1a56db] flex items-center justify-center shadow-md z-10 relative">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="absolute -top-1.5 -right-1 bg-white border-2 border-[#1a56db] text-[#1a56db] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center leading-none">
                          {i + 1}
                        </span>
                      </div>
                      <div className="sova-card p-5 flex-1">
                        <h3 className="font-semibold text-[#0f172a] mb-1.5">{step.title}</h3>
                        <p className="text-sm text-[#475569] leading-relaxed">{step.desc}</p>
                        {i === 0 && (
                          <a
                            href="mailto:academy.insight2026@gmail.com"
                            className="inline-block mt-2 text-sm font-medium text-[#1a56db] hover:underline"
                          >
                            academy.insight2026@gmail.com
                          </a>
                        )}
                        {i === 3 && (
                          <p className="mt-2 text-sm font-semibold text-[#1a56db]">{t.feeAmount}</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>



          {/* Author receives */}
          <section>
            <h2 className="text-2xl font-bold text-[#0f172a] mb-6">{t.afterPublication}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {t.authorReceives.map(({ title, desc }, i) => {
                const Icon = RECEIVE_ICONS[i]
                return (
                  <div key={title} className="sova-card p-6 text-center flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#f0f4ff] flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#1a56db]" />
                    </div>
                    <h3 className="font-semibold text-[#0f172a]">{title}</h3>
                    <p className="text-sm text-[#64748b] leading-relaxed">{desc}</p>
                  </div>
                )
              })}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
