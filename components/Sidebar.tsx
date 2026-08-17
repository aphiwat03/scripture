'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Language } from '@/lib/data/types'

interface SidebarProps {
  languages: Language[]
  currentLang: string
  currentCategory: string
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 flex-shrink-0 ${open ? 'rotate-90' : ''}`}
      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  )
}

export function Sidebar({ languages, currentLang, currentCategory }: SidebarProps) {
  const pathname = usePathname()

  // เก็บ state ว่า language ไหนเปิดอยู่
  const [openLangs, setOpenLangs] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {}
    languages.forEach(lang => {
      initial[lang.id] = lang.id === currentLang
    })
    return initial
  })

  const toggleLang = (langId: string) => {
    setOpenLangs(prev => ({ ...prev, [langId]: !prev[langId] }))
  }

  return (
    <aside
      id="docs-sidebar"
      className="w-64 flex-shrink-0 h-[calc(100vh-3.5rem)] sticky top-14 overflow-y-auto
        border-r border-gray-200 dark:border-gray-800
        bg-white dark:bg-gray-950
        scrollbar-thin"
    >
      <div className="py-6 px-3 space-y-6">
        {[
          { id: 'language', label: 'LANGUAGES' },
          { id: 'framework', label: 'FRAMEWORKS' },
          { id: 'tool', label: 'TOOLS' }
        ].map(group => {
          const groupLangs = languages.filter(l => l.type === group.id)
          if (groupLangs.length === 0) return null

          return (
            <div key={group.id} className="space-y-1">
              <h3 className="px-3 mb-2 text-xs font-bold text-gray-400 dark:text-gray-500 tracking-wider">
                {group.label}
              </h3>
              {groupLangs.map(lang => {
                const isLangOpen = openLangs[lang.id] ?? false
                const isActiveLang = lang.id === currentLang

                return (
                  <div key={lang.id} className="mb-1">
                    {/* Language header */}
                    <button
                      id={`sidebar-lang-${lang.id}`}
                      onClick={() => toggleLang(lang.id)}
                      className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-sm font-semibold
                        transition-colors duration-100 group
                        ${isActiveLang
                          ? 'text-gray-900 dark:text-gray-100'
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-900'
                        }`}
                    >
                      <span className="flex items-center gap-2">
                        {lang.image ? (
                          <img src={lang.image} alt={lang.name} className="w-5 h-5 object-contain" />
                        ) : (
                          <span className="text-base leading-none w-5 text-center">{lang.icon}</span>
                        )}
                        <span>{lang.name}</span>
                      </span>
                      <ChevronIcon open={isLangOpen} />
                    </button>

                    {/* Categories */}
                    {isLangOpen && (
                      <div className="mt-1 ml-2 space-y-0.5">
                        {lang.categories.map(cat => {
                          const href = `/docs/${lang.id}/${cat.id}`
                          const isActive = pathname.startsWith(href)

                          return (
                            <Link
                              key={cat.id}
                              href={href}
                              id={`sidebar-cat-${lang.id}-${cat.id}`}
                              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors duration-100
                                ${isActive
                                  ? 'bg-brand/10 dark:bg-brand-dark/15 text-brand dark:text-brand-light font-medium'
                                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-900'
                                }`}
                            >
                              {cat.icon && <span className="text-sm leading-none opacity-75">{cat.icon}</span>}
                              <span>{cat.name}</span>
                            </Link>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </aside>
  )
}


