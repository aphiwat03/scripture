'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { SearchResult } from '@/lib/data/types'

interface SearchBarProps {
  searchIndex: SearchResult[]
}

export function SearchBar({ searchIndex }: SearchBarProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [selected, setSelected] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Keyboard shortcut Ctrl+K / Cmd+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(v => !v)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  // Focus input when modal opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
      setQuery('')
      setResults([])
      setSelected(0)
    }
  }, [open])

  // Real-time search
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      setSelected(0)
      return
    }
    const q = query.toLowerCase()
    const filtered = searchIndex.filter(item =>
      item.commandName.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.categoryName.toLowerCase().includes(q) ||
      item.langName.toLowerCase().includes(q)
    ).slice(0, 8)
    setResults(filtered)
    setSelected(0)
  }, [query, searchIndex])

  const navigate = useCallback((result: SearchResult) => {
    router.push(result.url)
    setOpen(false)
    setQuery('')
  }, [router])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelected(s => Math.min(s + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelected(s => Math.max(s - 1, 0))
    } else if (e.key === 'Enter' && results[selected]) {
      navigate(results[selected])
    }
  }

  return (
    <>
      {/* Search trigger button */}
      <button
        id="search-trigger"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700
          text-sm text-gray-400 dark:text-gray-500
          hover:border-gray-300 dark:hover:border-gray-600
          hover:bg-gray-50 dark:hover:bg-gray-800/50
          transition-all duration-150 min-w-[160px] lg:min-w-[220px]"
      >
        <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <span className="flex-1 text-left">ค้นหา...</span>
        <kbd className="hidden lg:flex items-center gap-0.5 text-xs text-gray-400 dark:text-gray-600 font-mono">
          <span className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-1 py-0.5">⌘</span>
          <span className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-1 py-0.5">K</span>
        </kbd>
      </button>

      {/* Modal overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4"
          onClick={() => setOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

          {/* Search panel */}
          <div
            className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl
              border border-gray-200 dark:border-gray-700 overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Input */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-100 dark:border-gray-800">
              <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={inputRef}
                id="search-input"
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="ค้นหา method, คำสั่ง, หรือคำอธิบาย..."
                className="flex-1 bg-transparent text-sm text-gray-900 dark:text-gray-100
                  placeholder-gray-400 dark:placeholder-gray-500
                  focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              <kbd className="flex-shrink-0 text-xs text-gray-400 dark:text-gray-600 font-mono
                bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-1.5 py-0.5">
                ESC
              </kbd>
            </div>

            {/* Results */}
            {results.length > 0 ? (
              <ul className="py-2 max-h-80 overflow-y-auto">
                {results.map((result, idx) => (
                  <li key={result.url}>
                    <button
                      id={`search-result-${idx}`}
                      onClick={() => navigate(result)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors duration-75
                        ${idx === selected
                          ? 'bg-brand/8 dark:bg-brand-dark/12 text-brand dark:text-brand-light'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/60'
                        }`}
                    >
                      {/* Icon */}
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0
                        ${idx === selected ? 'bg-brand/15 dark:bg-brand-dark/20' : 'bg-gray-100 dark:bg-gray-800'}`}>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <code className="text-sm font-mono font-semibold truncate">{result.commandName}</code>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
                          <span>{result.langName}</span>
                          <span>›</span>
                          <span>{result.categoryName}</span>
                        </div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            ) : query ? (
              <div className="py-12 text-center text-sm text-gray-400 dark:text-gray-500">
                ไม่พบผลลัพธ์สำหรับ <span className="text-gray-600 dark:text-gray-300">"{query}"</span>
              </div>
            ) : (
              <div className="py-8 text-center text-sm text-gray-400 dark:text-gray-500">
                พิมพ์เพื่อค้นหา method หรือ คำสั่ง
              </div>
            )}

            {/* Footer hint */}
            {results.length > 0 && (
              <div className="flex items-center gap-3 px-4 py-2.5 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-400 dark:text-gray-500">
                <span className="flex items-center gap-1">
                  <kbd className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-1">↵</kbd>
                  เลือก
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-1">↑↓</kbd>
                  นำทาง
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
