import { notFound } from 'next/navigation'
import { Sidebar } from '@/components/Sidebar'
import { SearchBar } from '@/components/SearchBar'
import { ThemeToggle } from '@/components/ThemeToggle'
import { MobileMenu } from '@/components/MobileMenu'
import { languages, searchIndex, getLanguage } from '@/lib/data'
import Link from 'next/link'

export default async function DocsLayout({
  children,
  params,
}: LayoutProps<'/docs/[lang]/[category]'>) {
  const { lang } = await params

  const currentLang = getLanguage(lang)
  if (!currentLang) notFound()

  const { category } = await params

  return (
    <div className="flex flex-col min-h-screen">
      {/* ===== Top Header ===== */}
      <header className="sticky top-0 z-30 h-14 flex items-center border-b border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-950/90 backdrop-blur-md">
        <div className="flex items-center w-full px-4 gap-4">
          <MobileMenu languages={languages} currentLang={lang} currentCategory={category} />
          {/* Logo */}
          <Link
            href="/docs/javascript/array"
            className="flex items-center gap-2 flex-shrink-0 font-semibold text-gray-900 dark:text-gray-100 hover:opacity-80 transition-opacity"
          >
            <span className="w-7 h-7 rounded-lg bg-brand dark:bg-brand-dark flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              S
            </span>
            <span className="hidden sm:block text-sm">Scripture</span>
          </Link>

          {/* Divider */}
          <div className="hidden sm:block w-px h-5 bg-gray-200 dark:bg-gray-800" />

          {/* Language quick nav */}
          <nav className="hidden sm:flex items-center gap-1" aria-label="Language navigation">
            {languages.map(l => (
              <Link
                key={l.id}
                href={`/docs/${l.id}/${l.categories[0]?.id}`}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-100
                  ${l.id === lang
                    ? 'text-brand dark:text-brand-light bg-brand/8 dark:bg-brand-dark/12'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
              >
                {l.image ? (
                  <img src={l.image} alt={l.name} className="w-5 h-5 object-contain" />
                ) : (
                  <span className="text-base leading-none w-5 text-center">{l.icon}</span>
                )}
                <span>{l.name}</span>
              </Link>
            ))}
          </nav>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Search bar */}
          <SearchBar searchIndex={searchIndex} />

          {/* Theme toggle */}
          <ThemeToggle />
        </div>
      </header>

      {/* ===== Body: Sidebar + Content ===== */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar (desktop only) */}
        <div className="hidden lg:block">
          <Sidebar
            languages={languages}
            currentLang={lang}
            currentCategory={category}
          />
        </div>

        {/* Main content */}
        <main className="flex-1 min-w-0 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
