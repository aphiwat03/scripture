'use client';

import React, { useState, useEffect, useMemo, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  BookOpen,
  Search,
  Sun,
  Moon,
  Menu,
  X,
  ChevronRight,
  Command,
  FileText,
} from 'lucide-react';
import { SearchDocument } from '@/lib/mdx';
import { useTheme } from 'next-themes';
import Sidebar from './sidebar/Sidebar';

interface DocsLayoutShellProps {
  searchIndex: SearchDocument[];
  children: React.ReactNode;
}

const emptySubscribe = () => () => {};

export default function DocsLayoutShell({
  searchIndex,
  children,
}: DocsLayoutShellProps) {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();

  // Theme state from next-themes
  const { resolvedTheme, setTheme } = useTheme();
  const isMounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  // Mobile sidebar drawer state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Search modal state
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isDark = isMounted && resolvedTheme === 'dark';

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  // Keyboard shortcut Cmd+K / Ctrl+K for Search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setSearchOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Client-side search filtering
  const filteredSearch = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return searchIndex;
    return searchIndex.filter(
      (doc) =>
        doc.title.toLowerCase().includes(q) ||
        doc.summary.toLowerCase().includes(q) ||
        doc.categoryLabel.toLowerCase().includes(q) ||
        doc.keywords.toLowerCase().includes(q)
    );
  }, [searchQuery, searchIndex]);

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink">
      {/* Sticky Apple Glass Navbar */}
      <header className="sticky top-0 z-40 h-14 apple-glass border-b border-hairline">
        <div className="max-w-[1440px] mx-auto h-full px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2.5 sm:gap-4">
          {/* Left: Mobile Menu Button + Brand */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="เปิดเมนูสารบัญ"
              className="lg:hidden p-2 -ml-1 rounded-xl text-muted hover:text-ink hover:bg-subtle transition duration-200 cursor-pointer shrink-0"
            >
              <Menu className="w-5 h-5" />
            </button>

            <Link
              href="/docs/nextjs"
              className="flex items-center gap-2 sm:gap-2.5 group focus:outline-none min-w-0 shrink-0"
            >
              <div className="w-8 h-8 rounded-[10px] bg-ink text-canvas flex items-center justify-center shadow-xs group-hover:opacity-90 transition shrink-0">
                <BookOpen className="w-4 h-4" />
              </div>
              <div className="flex items-baseline gap-2 min-w-0">
                <span className="font-semibold text-base sm:text-[17px] tracking-[-0.02em] text-ink">
                  Scripture
                </span>
                <span className="hidden md:inline-block text-xs text-muted font-normal truncate">
                  Developer Documentation
                </span>
              </div>
            </Link>
          </div>

          {/* Right: Search Trigger + Theme Toggle */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex items-center justify-between gap-2 sm:gap-3 px-2.5 sm:px-3 py-1.5 rounded-full bg-subtle hover:bg-hairline/60 border border-hairline text-xs text-muted hover:text-ink transition duration-200 ease-out w-32 xs:w-44 sm:w-64 cursor-pointer min-w-0"
            >
              <span className="flex items-center gap-1.5 sm:gap-2 truncate">
                <Search className="w-3.5 h-3.5 text-faint shrink-0" />
                <span className="truncate">ค้นหา...</span>
              </span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-mono text-faint bg-canvas/70 border border-hairline shrink-0">
                <Command className="w-2.5 h-2.5" />K
              </kbd>
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label="สลับโหมดสีมืดและสว่าง"
              title={isDark ? 'สลับเป็นโหมดสว่าง' : 'สลับเป็นโหมดมืด'}
              className="p-2 rounded-full bg-subtle hover:bg-hairline/60 border border-hairline text-muted hover:text-ink transition duration-200 ease-out cursor-pointer shrink-0"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout: Left Persistent Sidebar + Inner Page Content */}
      <div className="max-w-[1440px] w-full mx-auto flex-1 grid grid-cols-1 lg:grid-cols-[272px_minmax(0,1fr)]">
        {/* Desktop Left Sidebar (Remains mounted across all page navigations) */}
        <aside className="hidden lg:block sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto border-r border-hairline apple-glass">
          <Sidebar />
        </aside>

        {/* Dynamic Center Page Content + Right TOC */}
        <div className="min-w-0">
          {children}
        </div>
      </div>

      {/* Mobile Sidebar Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            />
            <motion.div
              initial={prefersReducedMotion ? false : { x: '-100%' }}
              animate={{ x: 0 }}
              exit={prefersReducedMotion ? undefined : { x: '-100%' }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-76 max-w-[85vw] h-full apple-glass bg-elevated border-r border-hairline flex flex-col z-10"
            >
              <div className="h-14 px-4 flex items-center justify-between border-b border-hairline">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-ink text-canvas flex items-center justify-center">
                    <BookOpen className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-semibold text-base tracking-tight">
                    Scripture
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="ปิดเมนู"
                  className="p-1.5 rounded-lg text-muted hover:text-ink hover:bg-subtle cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <Sidebar onNavigate={() => setMobileMenuOpen(false)} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Spotlight Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setSearchOpen(false)}
              className="fixed inset-0 bg-black/45 backdrop-blur-xs"
            />

            <motion.div
              initial={
                prefersReducedMotion ? false : { opacity: 0, scale: 0.97, y: -8 }
              }
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={
                prefersReducedMotion
                  ? undefined
                  : { opacity: 0, scale: 0.97, y: -8 }
              }
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="relative w-full max-w-xl apple-card overflow-hidden z-10 shadow-2xl"
            >
              {/* Search Input Bar */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-hairline">
                <Search className="w-4 h-4 text-accent shrink-0" />
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ค้นหา Tech Stack, ฟีเจอร์ หรือหัวข้อใน Scripture..."
                  className="w-full bg-transparent text-sm text-ink placeholder:text-faint focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="text-xs text-muted hover:text-ink cursor-pointer"
                  >
                    ล้าง
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="px-2 py-0.5 rounded-md bg-subtle border border-hairline text-[11px] font-mono text-muted hover:text-ink cursor-pointer"
                >
                  ESC
                </button>
              </div>

              {/* Search Results */}
              <div className="max-h-96 overflow-y-auto p-2 divide-y divide-hairline/50">
                {filteredSearch.length === 0 ? (
                  <div className="py-10 text-center text-sm text-muted">
                    ไม่พบหัวข้อที่ตรงกับ &ldquo;{searchQuery}&rdquo;
                  </div>
                ) : (
                  filteredSearch.map((doc) => (
                    <button
                      key={doc.slug}
                      type="button"
                      onClick={() => {
                        setSearchOpen(false);
                        router.push(doc.href || `/docs/${doc.slug}`);
                      }}
                      className="w-full text-left p-3 rounded-xl hover:bg-subtle transition duration-150 flex items-start justify-between gap-3 cursor-pointer"
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <FileText className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm text-ink truncate">
                              {doc.title}
                            </span>
                            <span className="text-[11px] px-2 py-0.5 rounded-full bg-subtle text-muted">
                              {doc.categoryLabel}
                            </span>
                          </div>
                          <p className="text-xs text-muted line-clamp-1 mt-0.5">
                            {doc.summary}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-faint shrink-0 mt-1" />
                    </button>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
