'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  ArrowUpRight,
} from 'lucide-react';
import { FlatDocMeta } from '@/lib/nav-data';
import { TocHeading } from '@/lib/mdx';

export interface DocPageMeta {
  title: string;
  category: string;
  categoryLabel?: string;
  parentTitle?: string;
  version?: string;
  summary?: string;
  href?: string;
}

interface DocsPageContentProps {
  currentSlug: string;
  meta: DocPageMeta;
  headings: TocHeading[];
  prevDoc: FlatDocMeta | null;
  nextDoc: FlatDocMeta | null;
  hasFullContent: boolean;
  children: React.ReactNode;
}

export default function DocsPageContent({
  currentSlug,
  meta,
  headings,
  prevDoc,
  nextDoc,
  hasFullContent,
  children,
}: DocsPageContentProps) {
  // Active TOC heading state
  const [activeHeadingId, setActiveHeadingId] = useState<string>(
    headings[0]?.id || ''
  );

  // Scroll spy for "On this page" right TOC
  useEffect(() => {
    if (headings.length === 0) return;
    setActiveHeadingId(headings[0].id);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveHeadingId(entry.target.id);
            break;
          }
        }
      },
      {
        rootMargin: '-88px 0px -70% 0px',
        threshold: 0.1,
      }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings, currentSlug]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_240px]">
      {/* Center Main Content (~70-75ch reading width) */}
      <main className="min-w-0 px-4 sm:px-8 lg:px-12 py-10 sm:py-12">
        <article className="max-w-[72ch] mx-auto">
          {/* Topic Header */}
          <header className="pb-8 mb-8 border-b border-hairline">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-accent mb-3">
              <span>{meta.category || meta.categoryLabel}</span>
              {meta.parentTitle && (
                <>
                  <span className="text-faint">›</span>
                  <span className="text-muted">{meta.parentTitle}</span>
                </>
              )}
              {meta.version && (
                <>
                  <span className="text-faint">•</span>
                  <span className="px-2 py-0.5 rounded-full bg-accent-soft text-accent font-mono text-[11px]">
                    {meta.version}
                  </span>
                </>
              )}
            </div>

            <h1 className="text-3xl sm:text-[40px] font-bold tracking-[-0.028em] text-ink leading-[1.18]">
              {meta.title}
            </h1>

            {meta.summary && (
              <p className="mt-4 text-base sm:text-[17px] text-muted leading-[1.68]">
                {meta.summary}
              </p>
            )}
          </header>

          {/* Body Content or Queued Topic Notice */}
          {hasFullContent ? (
            <div className="prose-scripture">{children}</div>
          ) : (
            <div className="my-10 apple-card p-6 sm:p-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-soft text-accent text-xs font-medium mb-4">
                <Clock className="w-3.5 h-3.5" />
                <span>รอเพิ่มเนื้อหาในลำดับถัดไป</span>
              </div>
              <h2 className="text-xl font-bold tracking-tight text-ink mb-2">
                หัวข้อ &ldquo;{meta.title}&rdquo; อยู่ในคิวการเขียน
              </h2>
              <p className="text-sm text-muted leading-[1.7] mb-6">
                ขณะนี้ระบบโครงสร้างเว็บ <strong>Scripture</strong> (Layout, Sidebar 4 หมวด, Apple Theme, ระบบ MDX และ Search) พร้อมหัวข้อตัวอย่าง{' '}
                <strong>Next.js 16 (App Router)</strong> พร้อมให้ตรวจสอบแล้ว เมื่อตรวจสอบโครงสร้างเรียบร้อย จะทยอยเพิ่มเนื้อหาหมวดนี้ตามลำดับครับ
              </p>
              <Link
                href="/docs/nextjs"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-accent hover:bg-accent-hover text-white text-xs font-semibold transition duration-200 ease-out"
              >
                <span>เปิดอ่านหัวข้อตัวอย่าง: Next.js 16 (App Router)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}

          {/* Previous / Next Footer Navigation */}
          <footer
            aria-label="เปลี่ยนหน้าบทเรียน"
            className="mt-16 pt-8 border-t border-hairline grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {prevDoc ? (
              <Link
                href={prevDoc.href}
                className="group apple-card p-4 sm:p-5 flex flex-col items-start justify-between hover:border-accent/50 transition duration-200 ease-out"
              >
                <span className="inline-flex items-center gap-1 text-xs text-muted group-hover:text-accent transition">
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </span>
                <span className="mt-1.5 font-semibold text-sm sm:text-base text-ink group-hover:text-accent transition">
                  {prevDoc.title}
                </span>
                <span className="text-[11px] text-faint mt-0.5">
                  {prevDoc.parentTitle ? `${prevDoc.category} › ${prevDoc.parentTitle}` : prevDoc.category}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {nextDoc ? (
              <Link
                href={nextDoc.href}
                className="group apple-card p-4 sm:p-5 flex flex-col items-end justify-between hover:border-accent/50 transition duration-200 ease-out text-right"
              >
                <span className="inline-flex items-center gap-1 text-xs text-muted group-hover:text-accent transition">
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
                <span className="mt-1.5 font-semibold text-sm sm:text-base text-ink group-hover:text-accent transition">
                  {nextDoc.title}
                </span>
                <span className="text-[11px] text-faint mt-0.5">
                  {nextDoc.parentTitle ? `${nextDoc.category} › ${nextDoc.parentTitle}` : nextDoc.category}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </footer>
        </article>
      </main>

      {/* Right Column: "On this page" TOC */}
      <aside className="hidden xl:block sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto py-10 px-6">
        {headings.length > 0 && (
          <div className="border-l border-hairline pl-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-ink mb-3">
              On this page
            </div>
            <ul className="space-y-2 text-[12.5px] leading-snug">
              {headings.map((h, idx) => {
                const isActive = activeHeadingId === h.id;
                return (
                  <li
                    key={`${h.id}-${idx}`}
                    className={h.level === 3 ? 'pl-3' : ''}
                  >
                    <a
                      href={`#${h.id}`}
                      onClick={() => setActiveHeadingId(h.id)}
                      className={`block transition duration-200 ease-out ${
                        isActive
                          ? 'text-accent font-medium'
                          : 'text-muted hover:text-ink'
                      }`}
                    >
                      {h.text}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </aside>
    </div>
  );
}
