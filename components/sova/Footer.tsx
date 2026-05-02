'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin } from 'lucide-react'
import { useLang } from '@/lib/i18n'

export function Footer() {
  const { t } = useLang()

  const navLinks = [
    { href: '/', label: t.currentIssue },
    { href: '/archive', label: t.archive },
    { href: '/announcements', label: t.announcements },
    { href: '/about', label: t.about },
    { href: '/publication', label: t.publication },
  ]

  return (
    <footer className="bg-[#0f172a] text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image
                src="/sova-logo.png"
                alt="SOVA Science Journal"
                width={100}
                height={40}
                className="h-10 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-sm text-[#94a3b8] leading-relaxed">
              {t.footerDesc}
            </p>
            {/* Partner badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              {['ISSN', 'Open Access', 'Google Scholar'].map((badge) => (
                <span
                  key={badge}
                  className="px-2.5 py-1 bg-[#1e293b] border border-[#334155] text-[#94a3b8] text-xs rounded-md"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-[#94a3b8] mb-4">
              {t.navigation}
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#cbd5e1] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="/svidetelystvo.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#cbd5e1] hover:text-white transition-colors"
                >
                  {t.certificate}
                </a>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-[#94a3b8] mb-4">
              {t.contacts}
            </h3>
            <div className="space-y-3">
              <p className="text-sm text-[#cbd5e1]">
                <span className="text-[#94a3b8]">{t.publisher}</span> ТОО «ANS creative group»
              </p>
              <div className="flex items-start gap-2 text-sm text-[#cbd5e1]">
                <MapPin className="w-4 h-4 text-[#1a56db] mt-0.5 shrink-0" />
                <span>г. Алматы, мкр. Мамыр-1, 29</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#cbd5e1]">
                <Mail className="w-4 h-4 text-[#1a56db] shrink-0" />
                <a
                  href="mailto:academy.insight2026@gmail.com"
                  className="hover:text-white transition-colors break-all"
                >
                  academy.insight2026@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#cbd5e1]">
                <Phone className="w-4 h-4 text-[#1a56db] shrink-0" />
                <a href="tel:+77067282607" className="hover:text-white transition-colors">
                  +7 706 728 2607
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#1e293b] mt-10 pt-6 text-center text-xs text-[#64748b]">
          {t.rights}
        </div>
      </div>
    </footer>
  )
}
