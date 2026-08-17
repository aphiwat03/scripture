import { notFound } from 'next/navigation'
import { Breadcrumb } from '@/components/Breadcrumb'
import { CodeBlock } from '@/components/CodeBlock'
import { getLanguage, getCategory, getCommand } from '@/lib/data'
import Link from 'next/link'


export default async function CommandPage({ params }: PageProps<'/docs/[lang]/[category]/[command]'>) {
  const { lang, category, command } = await params

  const language = getLanguage(lang)
  const cat = getCategory(lang, category)
  const cmd = getCommand(lang, category, command)

  if (!language || !cat || !cmd) notFound()

  // หา commands ที่อยู่ติดกัน (prev / next)
  const allCommands = cat.commands
  const currentIndex = allCommands.findIndex(c => c.id === command)
  const prevCmd = allCommands[currentIndex - 1]
  const nextCmd = allCommands[currentIndex + 1]

  // Resolve seeAlso commands
  const seeAlsoCommands = (cmd.seeAlso ?? [])
    .map(id => cat.commands.find(c => c.id === id))
    .filter(Boolean)

  return (
    <article className="max-w-3xl mx-auto px-6 py-10">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: language.name, href: `/docs/${lang}/${language.categories[0]?.id}` },
          { label: cat.name, href: `/docs/${lang}/${category}` },
          { label: cmd.name },
        ]}
      />

      {/* Title */}
      <div className="mt-6 mb-8 prose-docs">
        <h1 className="font-mono">{cmd.name}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
          {cmd.description}
        </p>
      </div>

      {/* Syntax */}
      <section className="mb-8">
        <h2 className="prose-docs">Syntax</h2>
        <div className="mt-3">
          <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
            <pre className="px-5 py-4 text-sm font-mono bg-gray-50 dark:bg-gray-900/60 text-gray-800 dark:text-gray-200 overflow-x-auto leading-relaxed">
              {cmd.syntax}
            </pre>
          </div>
        </div>
      </section>

      {/* Parameters */}
      {cmd.parameters && cmd.parameters.length > 0 && (
        <section className="mb-8">
          <h2 className="prose-docs">Parameters</h2>
          <div className="mt-3 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden divide-y divide-gray-100 dark:divide-gray-800">
            {cmd.parameters.map((param, idx) => (
              <div key={idx} className="px-5 py-4 flex flex-col sm:flex-row sm:items-start gap-2">
                <div className="flex items-center gap-2 flex-shrink-0 sm:w-48">
                  <code className="text-sm font-mono font-semibold text-brand dark:text-brand-light">
                    {param.name}
                  </code>
                  {!param.required && (
                    <span className="text-xs text-gray-400 dark:text-gray-500 border border-gray-200 dark:border-gray-700 rounded px-1.5 py-0.5">
                      optional
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <code className="text-xs font-mono text-gray-400 dark:text-gray-500 block mb-1">
                    {param.type}
                  </code>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{param.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Examples */}
      <section className="mb-8">
        <h2 className="prose-docs">ตัวอย่างการใช้งาน</h2>
        <div className="mt-3 space-y-5">
          {cmd.examples.map((example, idx) => (
            <div key={idx}>
              {example.title && (
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {example.title}
                </p>
              )}
              <CodeBlock
                code={example.code}
                language={example.language ?? 'javascript'}
                title={example.title}
                output={example.output}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Notes */}
      {cmd.notes && (
        <section className="mb-8">
          <h2 className="prose-docs">ข้อควรระวัง / หมายเหตุ</h2>
          <div className="mt-3 rounded-xl border border-amber-200 dark:border-amber-900/40 bg-amber-50 dark:bg-amber-950/20 px-5 py-4">
            <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">{cmd.notes}</p>
          </div>
        </section>
      )}

      {/* See also */}
      {seeAlsoCommands.length > 0 && (
        <section className="mb-8">
          <h2 className="prose-docs">ดูเพิ่มเติม</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {seeAlsoCommands.map(related => (
              <Link
                key={related!.id}
                href={`/docs/${lang}/${category}/${related!.id}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700
                  text-sm font-mono font-medium text-brand dark:text-brand-light
                  hover:bg-brand/5 dark:hover:bg-brand-dark/10 hover:border-brand/30 dark:hover:border-brand-dark/30
                  transition-colors duration-100"
              >
                {related!.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Prev / Next navigation */}
      <div className="border-t border-gray-100 dark:border-gray-800 pt-8 mt-10">
        <div className="flex items-center justify-between gap-4">
          {prevCmd ? (
            <Link
              href={`/docs/${lang}/${category}/${prevCmd.id}`}
              className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800
                hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-900/50
                transition-all duration-150 min-w-0 max-w-[calc(50%-0.5rem)]"
            >
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0 group-hover:text-brand dark:group-hover:text-brand-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <div className="min-w-0">
                <div className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">ก่อนหน้า</div>
                <div className="text-sm font-mono font-medium text-gray-700 dark:text-gray-300 group-hover:text-brand dark:group-hover:text-brand-light truncate">
                  {prevCmd.name}
                </div>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {nextCmd ? (
            <Link
              href={`/docs/${lang}/${category}/${nextCmd.id}`}
              className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800
                hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-900/50
                transition-all duration-150 min-w-0 max-w-[calc(50%-0.5rem)] text-right ml-auto"
            >
              <div className="min-w-0">
                <div className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">ถัดไป</div>
                <div className="text-sm font-mono font-medium text-gray-700 dark:text-gray-300 group-hover:text-brand dark:group-hover:text-brand-light truncate">
                  {nextCmd.name}
                </div>
              </div>
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0 group-hover:text-brand dark:group-hover:text-brand-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </article>
  )
}
