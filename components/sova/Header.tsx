'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useLang, type Lang } from '@/lib/i18n'
import { cn } from '@/lib/utils'

const languages: Lang[] = ['KAZ', 'RUS', 'ENG']

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const { lang, setLang, t } = useLang()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { href: '/', label: t.currentIssue },
    { href: '/archive', label: t.archive },
    { href: '/announcements', label: t.announcements },
    { href: '/about', label: t.about },
    { href: '/publication', label: t.publication },
  ]

  return (
    <header
      className={cn(
        'sticky top-0 z-50 bg-white transition-shadow duration-200',
        scrolled ? 'shadow-md' : 'border-b border-border'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo — larger */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/sova-logo.png"
              alt="SOVA Science Journal"
              width={160}
              height={64}
              className="h-14 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3 py-2 text-sm font-medium rounded-md transition-colors',
                  pathname === link.href
                    ? 'text-[#1a56db] bg-[#f0f4ff]'
                    : 'text-[#334155] hover:text-[#1a56db] hover:bg-[#f0f4ff]'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Language switcher */}
          <div className="hidden lg:flex items-center border border-border rounded-md overflow-hidden text-xs font-medium">
            {languages.map((l, i) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={cn(
                  'px-2.5 py-1.5 transition-colors',
                  lang === l
                    ? 'bg-[#1a56db] text-white'
                    : 'text-[#64748b] hover:bg-[#f0f4ff]',
                  i < languages.length - 1 ? 'border-r border-border' : ''
                )}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Mobile burger */}
          <button
            className="lg:hidden p-2 rounded-md text-[#334155] hover:bg-[#f0f4ff]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Открыть меню"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-white px-4 pb-4 pt-2 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'block px-3 py-2 rounded-md text-sm font-medium transition-colors',
                pathname === link.href
                  ? 'text-[#1a56db] bg-[#f0f4ff]'
                  : 'text-[#334155] hover:text-[#1a56db] hover:bg-[#f0f4ff]'
              )}
            >
              {link.label}
            </Link>
          ))}
          {/* Language switcher mobile */}
          <div className="flex items-center gap-1 pt-2">
            {languages.map((l) => (
              <button
                key={l}
                onClick={() => { setLang(l); setMobileOpen(false) }}
                className={cn(
                  'flex-1 py-1.5 text-xs font-medium rounded-md border transition-colors',
                  lang === l
                    ? 'bg-[#1a56db] text-white border-[#1a56db]'
                    : 'text-[#64748b] border-border hover:bg-[#f0f4ff]'
                )}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
