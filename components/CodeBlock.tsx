'use client'

import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useTheme } from 'next-themes'

interface CodeBlockProps {
  code: string
  language?: string
  title?: string
  output?: string
}

export function CodeBlock({ code, language = 'javascript', title, output }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
    }
  }

  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 text-sm">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50 dark:bg-gray-900/60 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-400/70" />
            <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
            <span className="w-3 h-3 rounded-full bg-green-400/70" />
          </div>
          {title && (
            <span className="text-xs text-gray-500 dark:text-gray-400 font-mono ml-1">{title}</span>
          )}
        </div>
        <button
          id={`copy-btn-${title?.replace(/\s/g, '-') ?? 'code'}`}
          onClick={handleCopy}
          aria-label="Copy code"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium
            text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100
            hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-150"
        >
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-green-500">คัดลอกแล้ว!</span>
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>คัดลอก</span>
            </>
          )}
        </button>
      </div>

      {/* Code area */}
      <div className="overflow-x-auto">
        <SyntaxHighlighter
          language={language}
          style={isDark ? oneDark : oneLight}
          customStyle={{
            margin: 0,
            padding: '1rem 1.25rem',
            background: isDark ? '#0d0d0d' : '#fafafa',
            fontSize: '0.8125rem',
            lineHeight: '1.7',
            borderRadius: 0,
          }}
          codeTagProps={{
            style: { fontFamily: 'var(--font-geist-mono), ui-monospace, monospace' }
          }}
        >
          {code.trim()}
        </SyntaxHighlighter>
      </div>

      {/* Output section */}
      {output && (
        <div className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/40">
          <div className="px-4 py-1.5 flex items-center gap-2 border-b border-gray-100 dark:border-gray-800/50">
            <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide">Output</span>
          </div>
          <pre className="px-4 py-3 text-xs font-mono text-emerald-600 dark:text-emerald-400 overflow-x-auto leading-relaxed">
            {output}
          </pre>
        </div>
      )}
    </div>
  )
}
