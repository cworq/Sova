'use client'

import {
  FlaskConical,
  Cpu,
  HeartPulse,
  Sprout,
  Users,
  BookOpen,
  Globe,
  Award,
  CheckCircle,
} from 'lucide-react'
import { Header } from '@/components/sova/Header'
import { Footer } from '@/components/sova/Footer'
import { useLang } from '@/lib/i18n'

const indexing = [
  { label: 'Google Scholar', icon: Globe },
  { label: 'Open Access', icon: CheckCircle },
  { label: 'ISSN', icon: Award },
]

const langBadges = [
  { code: 'KZ', label: 'Казахский / Қазақша' },
  { code: 'RU', label: 'Русский' },
  { code: 'EN', label: 'English' },
]

export default function AboutPage() {
  const { lang, t } = useLang()

  const thematic = [
    {
      icon: FlaskConical,
      title: lang === 'ENG' ? 'Natural Sciences' : lang === 'KAZ' ? 'Жаратылыстану ғылымдары' : 'Естественные науки',
      desc: lang === 'ENG' ? 'Physics, chemistry, biology, mathematics and earth sciences' : lang === 'KAZ' ? 'Физика, химия, биология, математика және жер туралы ғылымдар' : 'Физика, химия, биология, математика и науки о Земле',
    },
    {
      icon: Cpu,
      title: lang === 'ENG' ? 'Engineering & Technology' : lang === 'KAZ' ? 'Инженерия және технологиялар' : 'Инжиниринг и технологии',
      desc: lang === 'ENG' ? 'Technical sciences, IT, innovative developments' : lang === 'KAZ' ? 'Техникалық ғылымдар, АТ, инновациялық әзірлемелер' : 'Технические науки, IT, инновационные разработки',
    },
    {
      icon: HeartPulse,
      title: lang === 'ENG' ? 'Medicine & Healthcare' : lang === 'KAZ' ? 'Медицина және денсаулық сақтау' : 'Медицина и здравоохранение',
      desc: lang === 'ENG' ? 'Clinical medicine, pharmacology, public health' : lang === 'KAZ' ? 'Клиникалық медицина, фармакология, қоғамдық денсаулық' : 'Клиническая медицина, фармакология, общественное здоровье',
    },
    {
      icon: Sprout,
      title: lang === 'ENG' ? 'Agricultural & Veterinary Sciences' : lang === 'KAZ' ? 'Ауылшаруашылық және ветеринариялық ғылымдар' : 'Сельскохозяйственные и ветеринарные науки',
      desc: lang === 'ENG' ? 'Agronomy, animal husbandry, veterinary science' : lang === 'KAZ' ? 'Агрономия, мал шаруашылығы, ветеринария' : 'Агрономия, животноводство, ветеринария',
    },
    {
      icon: Users,
      title: lang === 'ENG' ? 'Social Sciences' : lang === 'KAZ' ? 'Әлеуметтік ғылымдар' : 'Социальные науки',
      desc: lang === 'ENG' ? 'Economics, law, political science, sociology, pedagogy' : lang === 'KAZ' ? 'Экономика, құқық, саясаттану, социология, педагогика' : 'Экономика, право, политология, социология, педагогика',
    },
    {
      icon: BookOpen,
      title: lang === 'ENG' ? 'Humanities & Arts' : lang === 'KAZ' ? 'Гуманитарлық ғылымдар және өнер' : 'Гуманитарные науки и искусство',
      desc: lang === 'ENG' ? 'History, philology, cultural studies, philosophy, art history' : lang === 'KAZ' ? 'Тарих, филология, мәдениеттану, философия, өнертану' : 'История, филология, культурология, философия, искусствознание',
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-[#f0f4ff] border-b border-border py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#1a56db] mb-3">{t.aboutJournal}</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#0f172a] text-balance mb-5">
              SOVA: Science, Openness, Vision and Advancement
            </h1>
            <p className="text-[#475569] leading-relaxed max-w-3xl mx-auto">
              {t.journalDesc}
            </p>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">
          {/* Mission */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#0f172a]">{t.missionTitle}</h2>
              <p className="text-[#475569] leading-relaxed">{t.missionText1}</p>
              <p className="text-[#475569] leading-relaxed">{t.missionText2}</p>
              <p className="text-[#475569] leading-relaxed">{t.missionText3}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '2026', label: t.founded },
                { value: t.monthly, label: t.periodicity },
                { value: t.threeLanguages, label: t.publishLangs },
                { value: t.openAccess, label: t.accessLabel },
              ].map((stat) => (
                <div key={stat.label} className="sova-card p-5 text-center overflow-hidden">
                  <p className="text-xl sm:text-2xl font-bold text-[#1a56db] break-words leading-tight">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-[#64748b] mt-1 break-words">{stat.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Thematic areas */}
          <section>
            <h2 className="text-2xl font-bold text-[#0f172a] mb-6">{t.thematic}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {thematic.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="sova-card p-6 flex flex-col gap-3">
                  <div className="w-11 h-11 rounded-lg bg-[#f0f4ff] flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#1a56db]" />
                  </div>
                  <h3 className="font-semibold text-[#0f172a]">{title}</h3>
                  <p className="text-sm text-[#64748b] leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Languages */}
          <section>
            <h2 className="text-2xl font-bold text-[#0f172a] mb-4">{t.langSection}</h2>
            <div className="flex flex-wrap gap-3">
              {langBadges.map(({ code, label }) => (
                <div
                  key={code}
                  className="flex items-center gap-3 px-4 py-3 bg-white border border-border rounded-lg shadow-sm"
                >
                  <span className="w-9 h-9 rounded-full bg-[#1a56db] text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {code}
                  </span>
                  <span className="font-medium text-[#334155]">{label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Indexing */}
          <section>
            <h2 className="text-2xl font-bold text-[#0f172a] mb-4">{t.indexing}</h2>
            <div className="flex flex-wrap gap-4">
              {indexing.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 px-4 py-2.5 bg-[#f0f4ff] border border-[#dbeafe] rounded-lg text-[#1a56db] font-medium text-sm"
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </div>
              ))}
            </div>
          </section>

          {/* Open Access Policy */}
          <section>
            <h2 className="text-2xl font-bold text-[#0f172a] mb-4">{t.openAccessPolicyTitle}</h2>
            <div className="sova-card p-6 space-y-3">
              <p className="text-[#475569] leading-relaxed">{t.openAccessPolicyText1}</p>
              <p className="text-[#475569] leading-relaxed">{t.openAccessPolicyText2}</p>
              <p className="text-[#475569] leading-relaxed">{t.openAccessPolicyText3}</p>
            </div>
          </section>

          {/* Privacy Statement */}
          <section>
            <h2 className="text-2xl font-bold text-[#0f172a] mb-4">{t.privacyStatementTitle}</h2>
            <div className="sova-card p-6">
              <p className="text-[#475569] leading-relaxed">{t.privacyStatementText}</p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
