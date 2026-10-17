import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getAllFlatDocs,
  getAdjacentDoc,
} from '@/lib/nav-data';
import {
  getDocPageBySlug,
  renderMdxContent,
} from '@/lib/mdx';
import DocsPageContent from '@/components/DocsPageContent';

export const instant = false;

export function generateStaticParams() {
  return getAllFlatDocs().map((item) => ({
    slug: item.slugArray,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pageData = getDocPageBySlug(slug);
  if (!pageData) {
    return { title: 'Not Found' };
  }

  let title = pageData.meta.title;
  if (pageData.meta.parentTitle) {
    title =
      pageData.meta.parentTitle === 'Security'
        ? `${pageData.meta.title} (${pageData.meta.category} Security)`
        : `${pageData.meta.title} (${pageData.meta.parentTitle})`;
  } else if (pageData.meta.title === 'Security') {
    title = `Security (${pageData.meta.category})`;
  }

  return {
    title,
    description:
      pageData.frontmatter?.summary ||
      `${pageData.meta.title} documentation in Scripture`,
  };
}

async function DocTopicContent({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const pageData = getDocPageBySlug(slug);

  if (!pageData) {
    notFound();
  }

  const slugPath = Array.isArray(slug) ? slug.join('/') : slug;
  const { prev, next } = getAdjacentDoc(slugPath);
  const renderedContent = pageData.exists
    ? renderMdxContent(pageData.rawBody)
    : null;

  return (
    <DocsPageContent
      currentSlug={slugPath}
      meta={pageData.meta}
      headings={pageData.headings}
      prevDoc={prev}
      nextDoc={next}
      hasFullContent={pageData.exists}
    >
      {renderedContent}
    </DocsPageContent>
  );
}

function DocsLoadingSkeleton() {
  return (
    <div className="max-w-4xl mx-auto py-10 px-6 animate-pulse">
      <div className="h-4 w-32 bg-subtle rounded-md mb-4" />
      <div className="h-10 w-3/4 max-w-md bg-subtle rounded-lg mb-8" />
      <div className="space-y-4 pt-4 border-t border-hairline">
        <div className="h-4 bg-subtle rounded-md w-full" />
        <div className="h-4 bg-subtle rounded-md w-11/12" />
        <div className="h-4 bg-subtle rounded-md w-4/5" />
      </div>
    </div>
  );
}

export default function DocTopicPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  return (
    <Suspense fallback={<DocsLoadingSkeleton />}>
      <DocTopicContent params={params} />
    </Suspense>
  );
}
