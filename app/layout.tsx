import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { LangProvider } from '@/lib/i18n'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'SOVA: Science, Openness, Vision and Advancement',
  description:
    'Международный научный журнал «SOVA» — мультидисциплинарный рецензируемый журнал с открытым доступом. Основан в 2026 году, выходит ежемесячно.',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className="bg-background">
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  )
}
