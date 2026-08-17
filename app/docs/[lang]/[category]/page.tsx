import { notFound } from 'next/navigation'
import { Breadcrumb } from '@/components/Breadcrumb'
import { CommandCard } from '@/components/CommandCard'
import { getLanguage, getCategory } from '@/lib/data'


export default async function CategoryPage({ params }: PageProps<'/docs/[lang]/[category]'>) {
  const { lang, category } = await params

  const language = getLanguage(lang)
  const cat = getCategory(lang, category)

  if (!language || !cat) notFound()

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: language.name, href: `/docs/${lang}/${language.categories[0]?.id}` },
          { label: cat.name },
        ]}
      />

      {/* Header */}
      <div className="mt-5 mb-8">
        <div className="flex items-center gap-3 mb-3">
          {cat.icon && (
            <span className="text-2xl leading-none">{cat.icon}</span>
          )}
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            {cat.name}
          </h1>
        </div>
        <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
          {cat.description}
        </p>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-xs font-medium text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full">
            {cat.commands.length} คำสั่ง
          </span>
          <span className="text-xs font-medium text-brand dark:text-brand-light bg-brand/8 dark:bg-brand-dark/12 px-2.5 py-1 rounded-full">
            {language.name}
          </span>
        </div>
      </div>

      {/* Command grid */}
      <div className="grid gap-3 sm:grid-cols-2">
        {cat.commands.map(cmd => (
          <CommandCard
            key={cmd.id}
            command={cmd}
            langId={lang}
            categoryId={category}
          />
        ))}
      </div>
    </div>
  )
}
