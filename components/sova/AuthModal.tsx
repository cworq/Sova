'use client'

import { useState } from 'react'
import { X, Mail, Lock, User, Briefcase } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AuthModalProps {
  open: boolean
  onClose: () => void
  defaultTab?: 'login' | 'register'
}

export function AuthModal({ open, onClose, defaultTab = 'login' }: AuthModalProps) {
  const [tab, setTab] = useState<'login' | 'register'>(defaultTab)

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#64748b] hover:text-[#0f172a] transition-colors"
          aria-label="Закрыть"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tabs */}
        <div className="flex border-b border-border">
          <button
            onClick={() => setTab('login')}
            className={`flex-1 py-4 text-sm font-semibold transition-colors ${
              tab === 'login'
                ? 'text-[#1a56db] border-b-2 border-[#1a56db]'
                : 'text-[#64748b] hover:text-[#334155]'
            }`}
          >
            Вход
          </button>
          <button
            onClick={() => setTab('register')}
            className={`flex-1 py-4 text-sm font-semibold transition-colors ${
              tab === 'register'
                ? 'text-[#1a56db] border-b-2 border-[#1a56db]'
                : 'text-[#64748b] hover:text-[#334155]'
            }`}
          >
            Регистрация
          </button>
        </div>

        <div className="p-6 space-y-4">
          {tab === 'login' ? (
            <>
              <div>
                <label className="block text-sm font-medium text-[#334155] mb-1.5">Электронная почта</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
                  <input
                    type="email"
                    placeholder="example@mail.com"
                    className="w-full pl-9 pr-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1a56db] focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#334155] mb-1.5">Пароль</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1a56db] focus:border-transparent"
                  />
                </div>
              </div>
              <Button className="w-full bg-[#1a56db] hover:bg-[#1e40af] text-white">
                Войти
              </Button>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-[#334155] mb-1.5">ФИО</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
                  <input
                    type="text"
                    placeholder="Иванов Иван Иванович"
                    className="w-full pl-9 pr-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1a56db] focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#334155] mb-1.5">Электронная почта</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
                  <input
                    type="email"
                    placeholder="example@mail.com"
                    className="w-full pl-9 pr-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1a56db] focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#334155] mb-1.5">Место работы / учёбы</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
                  <input
                    type="text"
                    placeholder="Название организации"
                    className="w-full pl-9 pr-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1a56db] focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#334155] mb-1.5">Пароль</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1a56db] focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#334155] mb-1.5">Подтверждение пароля</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1a56db] focus:border-transparent"
                  />
                </div>
              </div>
              <Button className="w-full bg-[#1a56db] hover:bg-[#1e40af] text-white">
                Зарегистрироваться
              </Button>
              <p className="text-xs text-center text-[#64748b]">
                После входа вы сможете загрузить статью
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
