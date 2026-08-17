import Link from 'next/link'
import { Command } from '@/lib/data/types'

interface CommandCardProps {
  command: Command
  langId: string
  categoryId: string
}

export function CommandCard({ command, langId, categoryId }: CommandCardProps) {
  return (
    <Link
      href={`/docs/${langId}/${categoryId}/${command.id}`}
      id={`cmd-card-${command.id}`}
      className="group block p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/40
        hover:border-brand/40 dark:hover:border-brand-dark/40
        hover:bg-brand/[0.02] dark:hover:bg-brand-dark/[0.03]
        hover:shadow-sm
        transition-all duration-150"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <code className="text-sm font-mono font-semibold text-brand dark:text-brand-light group-hover:underline underline-offset-2">
          {command.name}
        </code>
        <svg
          className="w-4 h-4 text-gray-300 dark:text-gray-700 group-hover:text-brand dark:group-hover:text-brand-light flex-shrink-0 mt-0.5 transition-colors duration-150"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2">
        {command.description}
      </p>
    </Link>
  )
}
