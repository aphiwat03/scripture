import React from 'react';
import { getSearchIndex } from '@/lib/mdx';
import DocsLayoutShell from '@/components/DocsLayoutShell';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchIndex = getSearchIndex();

  return (
    <DocsLayoutShell searchIndex={searchIndex}>
      {children}
    </DocsLayoutShell>
  );
}
