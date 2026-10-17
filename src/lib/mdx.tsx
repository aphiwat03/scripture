import fs from 'fs';
import path from 'path';
import React from 'react';
import CodeBlock from '@/components/CodeBlock';
import Callout, { CalloutType } from '@/components/Callout';
import FadeInSection from '@/components/FadeInSection';
import { InteractiveFlowDiagram } from '@/components/diagrams';
import Link from 'next/link';
import { FlatDocMeta, getAllFlatDocs } from '@/lib/nav-data';
import { ExternalLink } from 'lucide-react';

export interface TocHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface ParsedDocPage {
  slugPath: string;
  meta: FlatDocMeta;
  frontmatter: Record<string, string>;
  headings: TocHeading[];
  rawBody: string;
  exists: boolean;
}

export interface SearchDocument {
  slug: string;
  href: string;
  title: string;
  categoryLabel: string;
  summary: string;
  headings: string[];
  keywords: string;
  hasContent: boolean;
}

const CONTENT_DIR = path.join(process.cwd(), 'src', 'content', 'docs');

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[`*~_]/g, '')
    .replace(/[^\w\u0E00-\u0E7F\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function parseFrontmatter(raw: string): {
  frontmatter: Record<string, string>;
  body: string;
} {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { frontmatter: {}, body: raw };
  }
  const fmLines = match[1].split(/\r?\n/);
  const frontmatter: Record<string, string> = {};
  for (const line of fmLines) {
    const colonIdx = line.indexOf(':');
    if (colonIdx !== -1) {
      const key = line.slice(0, colonIdx).trim();
      const val = line
        .slice(colonIdx + 1)
        .trim()
        .replace(/^['"]|['"]$/g, '');
      frontmatter[key] = val;
    }
  }
  return { frontmatter, body: match[2] };
}

export function extractHeadings(mdxBody: string): TocHeading[] {
  const lines = mdxBody.split(/\r?\n/);
  const headings: TocHeading[] = [];
  const seenIds = new Map<string, number>();
  let inCodeBlock = false;

  for (const line of lines) {
    if (line.trimStart().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const h2Match = line.match(/^##\s+(.+)$/);
    if (h2Match) {
      const text = h2Match[1].trim();
      const baseId = slugifyHeading(text);
      const count = seenIds.get(baseId) || 0;
      seenIds.set(baseId, count + 1);
      const id = count === 0 ? baseId : `${baseId}-${count}`;
      headings.push({
        id,
        text,
        level: 2,
      });
      continue;
    }

    const h3Match = line.match(/^###\s+(.+)$/);
    if (h3Match) {
      const text = h3Match[1].trim();
      const baseId = slugifyHeading(text);
      const count = seenIds.get(baseId) || 0;
      seenIds.set(baseId, count + 1);
      const id = count === 0 ? baseId : `${baseId}-${count}`;
      headings.push({
        id,
        text,
        level: 3,
      });
    }
  }

  return headings;
}

export function getDocPageBySlug(slugInput: string | string[]): ParsedDocPage | null {
  const slugPath = Array.isArray(slugInput) ? slugInput.join('/') : slugInput;
  const normalizedPath = slugPath.replace(/^\/+|\/+$/g, '');
  const allDocs = getAllFlatDocs();
  const meta = allDocs.find((item) => item.slugPath === normalizedPath);
  if (!meta) return null;

  const directFile = path.join(CONTENT_DIR, `${normalizedPath}.mdx`);
  const indexFile = path.join(CONTENT_DIR, normalizedPath, 'index.mdx');

  const filePath = fs.existsSync(directFile)
    ? directFile
    : fs.existsSync(indexFile)
    ? indexFile
    : null;

  if (!filePath) {
    return {
      slugPath: normalizedPath,
      meta,
      frontmatter: {},
      headings: [],
      rawBody: '',
      exists: false,
    };
  }

  const rawFile = fs.readFileSync(filePath, 'utf-8');
  const { frontmatter, body } = parseFrontmatter(rawFile);
  const headings = extractHeadings(body);

  return {
    slugPath: normalizedPath,
    meta,
    frontmatter,
    headings,
    rawBody: body,
    exists: true,
  };
}

export function getSearchIndex(): SearchDocument[] {
  const allDocs = getAllFlatDocs();
  return allDocs.map((item) => {
    const directFile = path.join(CONTENT_DIR, `${item.slugPath}.mdx`);
    const indexFile = path.join(CONTENT_DIR, item.slugPath, 'index.mdx');
    const filePath = fs.existsSync(directFile)
      ? directFile
      : fs.existsSync(indexFile)
      ? indexFile
      : null;

    const hasContent = Boolean(filePath);
    let headings: string[] = [];
    let keywords = `${item.title} ${item.category}`;

    if (filePath) {
      const raw = fs.readFileSync(filePath, 'utf-8');
      const { body } = parseFrontmatter(raw);
      headings = extractHeadings(body).map((h) => h.text);
      keywords += ' ' + headings.join(' ');
    }

    return {
      slug: item.slugPath,
      href: item.href,
      title: item.title,
      categoryLabel: item.category,
      summary: item.parentTitle ? `หัวข้อย่อยภายใต้ ${item.parentTitle}` : item.title,
      headings,
      keywords,
      hasContent,
    };
  });
}

// Inline Markdown formatter (bold, inline code, external/internal links)
function renderInlineMarkdown(text: string): React.ReactNode[] {
  const tokenRegex =
    /(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, idx) => {
    if (!part) return null;

    // Inline code
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return (
        <code
          key={idx}
          className="px-1.5 py-0.5 mx-0.5 rounded-md bg-subtle border border-hairline font-mono text-[0.86em] text-ink"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    // Bold
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return (
        <strong key={idx} className="font-semibold text-ink">
          {part.slice(2, -2)}
        </strong>
      );
    }

    // Markdown link [label](url)
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, label, href] = linkMatch;
      const isExternal = href.startsWith('http://') || href.startsWith('https://');
      if (isExternal) {
        return (
          <a
            key={idx}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-accent hover:text-accent-hover underline decoration-accent/30 hover:decoration-accent underline-offset-4 transition duration-200 ease-out font-medium"
          >
            <span>{label}</span>
            <ExternalLink className="w-3 h-3 shrink-0" />
          </a>
        );
      }
      return (
        <Link
          key={idx}
          href={href}
          className="inline-flex items-center gap-1 text-accent hover:text-accent-hover underline decoration-accent/30 hover:decoration-accent underline-offset-4 transition duration-200 ease-out font-medium"
        >
          <span>{label}</span>
        </Link>
      );
    }

    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}

// Render MDX Body into Apple Developer Documentation styled React elements
export function renderMdxContent(mdxBody: string): React.ReactNode {
  const lines = mdxBody.split(/\r?\n/);
  const elements: React.ReactNode[] = [];
  const seenIds = new Map<string, number>();
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Skip blank lines
    if (!trimmed) {
      i++;
      continue;
    }

    // 1. Fenced Code Block: ```lang filename="path"
    if (trimmed.startsWith('```')) {
      const fenceHeader = trimmed.slice(3).trim();
      const langMatch = fenceHeader.match(/^([a-zA-Z0-9_-]+)/);
      const language = langMatch ? langMatch[1] : 'tsx';
      const fileMatch = fenceHeader.match(/filename="([^"]+)"/);
      const filename = fileMatch ? fileMatch[1] : undefined;

      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```

      elements.push(
        <FadeInSection key={`code-${i}`}>
          <CodeBlock
            code={codeLines.join('\n')}
            language={language}
            filename={filename}
          />
        </FadeInSection>
      );
      continue;
    }

    // 2. Custom MDX Component: <InteractiveFlowDiagram ... />
    if (trimmed.startsWith('<InteractiveFlowDiagram')) {
      const variantMatch = trimmed.match(/variant="([^"]+)"/);
      const titleMatch = trimmed.match(/title="([^"]+)"/);
      const subtitleMatch = trimmed.match(/subtitle="([^"]+)"/);
      const variant = (variantMatch?.[1] || 'request') as
        | 'request'
        | 'upload'
        | 'auth'
        | 'lifecycle';

      elements.push(
        <FadeInSection key={`diagram-${i}`}>
          <InteractiveFlowDiagram
            variant={variant}
            title={titleMatch?.[1]}
            subtitle={subtitleMatch?.[1]}
          />
        </FadeInSection>
      );
      i++;
      continue;
    }

    // 3. Custom MDX Component: <Callout type="..." title="..."> ... </Callout>
    if (trimmed.startsWith('<Callout')) {
      const typeMatch = trimmed.match(/type="([^"]+)"/);
      const titleMatch = trimmed.match(/title="([^"]+)"/);
      const calloutType = (typeMatch?.[1] || 'note') as CalloutType;
      const calloutTitle = titleMatch?.[1];

      const innerLines: string[] = [];
      // Handle single-line <Callout ...>text</Callout>
      if (trimmed.includes('</Callout>')) {
        const inner = trimmed
          .replace(/^<Callout[^>]*>/, '')
          .replace(/<\/Callout>$/, '');
        innerLines.push(inner);
        i++;
      } else {
        i++;
        while (i < lines.length && !lines[i].trim().startsWith('</Callout>')) {
          innerLines.push(lines[i]);
          i++;
        }
        i++; // skip </Callout>
      }

      elements.push(
        <FadeInSection key={`callout-${i}`}>
          <Callout type={calloutType} title={calloutTitle}>
            {innerLines
              .filter((l) => l.trim().length > 0)
              .map((l, idx) => (
                <p key={idx}>{renderInlineMarkdown(l.trim())}</p>
              ))}
          </Callout>
        </FadeInSection>
      );
      continue;
    }

    // 4. Heading 2: ## Title
    const h2Match = line.match(/^##\s+(.+)$/);
    if (h2Match) {
      const text = h2Match[1].trim();
      const baseId = slugifyHeading(text);
      const count = seenIds.get(baseId) || 0;
      seenIds.set(baseId, count + 1);
      const id = count === 0 ? baseId : `${baseId}-${count}`;
      elements.push(
        <FadeInSection key={`h2-${i}`}>
          <h2
            id={id}
            className="scroll-mt-24 text-xl sm:text-2xl font-bold tracking-[-0.02em] text-ink mt-12 mb-4 pt-6 border-t border-hairline first:border-t-0 first:mt-4 first:pt-0"
          >
            {renderInlineMarkdown(text)}
          </h2>
        </FadeInSection>
      );
      i++;
      continue;
    }

    // 5. Heading 3: ### Subtitle
    const h3Match = line.match(/^###\s+(.+)$/);
    if (h3Match) {
      const text = h3Match[1].trim();
      const baseId = slugifyHeading(text);
      const count = seenIds.get(baseId) || 0;
      seenIds.set(baseId, count + 1);
      const id = count === 0 ? baseId : `${baseId}-${count}`;
      elements.push(
        <FadeInSection key={`h3-${i}`}>
          <h3
            id={id}
            className="scroll-mt-24 text-base sm:text-lg font-semibold tracking-[-0.015em] text-ink mt-8 mb-3"
          >
            {renderInlineMarkdown(text)}
          </h3>
        </FadeInSection>
      );
      i++;
      continue;
    }

    // 5b. Heading 4: #### Sub-subtitle
    const h4Match = line.match(/^####\s+(.+)$/);
    if (h4Match) {
      const text = h4Match[1].trim();
      const baseId = slugifyHeading(text);
      const count = seenIds.get(baseId) || 0;
      seenIds.set(baseId, count + 1);
      const id = count === 0 ? baseId : `${baseId}-${count}`;
      elements.push(
        <FadeInSection key={`h4-${i}`}>
          <h4
            id={id}
            className="scroll-mt-24 text-sm sm:text-base font-semibold tracking-[-0.01em] text-ink mt-6 mb-2"
          >
            {renderInlineMarkdown(text)}
          </h4>
        </FadeInSection>
      );
      i++;
      continue;
    }

    // 5c. Horizontal Rule: ---
    if (trimmed === '---' || trimmed === '***') {
      elements.push(
        <hr key={`hr-${i}`} className="my-8 border-t border-hairline" />
      );
      i++;
      continue;
    }

    // 6. Markdown Table: | Col 1 | Col 2 |
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      const tableLines: string[] = [];
      while (
        i < lines.length &&
        lines[i].trim().startsWith('|') &&
        lines[i].trim().endsWith('|')
      ) {
        tableLines.push(lines[i].trim());
        i++;
      }

      if (tableLines.length >= 2) {
        const parseRow = (row: string) =>
          row
            .slice(1, -1)
            .split('|')
            .map((cell) => cell.trim());

        const headers = parseRow(tableLines[0]);
        const dataRows = tableLines
          .slice(2) // skip separator row |---|---|
          .map(parseRow);

        elements.push(
          <FadeInSection key={`table-${i}`}>
            <div className="my-6 apple-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-hairline bg-subtle">
                      {headers.map((h, hIdx) => (
                        <th
                          key={hIdx}
                          className="py-3.5 px-4 font-semibold text-xs uppercase tracking-wider text-muted"
                        >
                          {renderInlineMarkdown(h)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-hairline">
                    {dataRows.map((row, rIdx) => (
                      <tr
                        key={rIdx}
                        className="hover:bg-subtle/60 transition-colors"
                      >
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className={`py-3.5 px-4 align-top leading-[1.65] ${
                              cIdx === 0
                                ? 'font-medium text-ink whitespace-nowrap'
                                : 'text-muted'
                            }`}
                          >
                            {renderInlineMarkdown(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </FadeInSection>
        );
      }
      continue;
    }

    // 7. Unordered List: - item
    if (trimmed.startsWith('- ')) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('- ')) {
        listItems.push(lines[i].trim().slice(2));
        i++;
      }
      elements.push(
        <FadeInSection key={`ul-${i}`}>
          <ul className="my-4 space-y-2.5 pl-5 list-disc marker:text-accent text-[15px] sm:text-base text-muted leading-[1.72]">
            {listItems.map((item, idx) => (
              <li key={idx} className="pl-1">
                {renderInlineMarkdown(item)}
              </li>
            ))}
          </ul>
        </FadeInSection>
      );
      continue;
    }

    // 8. Ordered List: 1. item
    if (/^\d+\.\s+/.test(trimmed)) {
      const listItems: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        listItems.push(lines[i].trim().replace(/^\d+\.\s+/, ''));
        i++;
      }
      elements.push(
        <FadeInSection key={`ol-${i}`}>
          <ol className="my-4 space-y-2.5 pl-5 list-decimal marker:text-accent marker:font-semibold text-[15px] sm:text-base text-muted leading-[1.72]">
            {listItems.map((item, idx) => (
              <li key={idx} className="pl-1">
                {renderInlineMarkdown(item)}
              </li>
            ))}
          </ol>
        </FadeInSection>
      );
      continue;
    }

    // 9. Standard Paragraph
    const paragraphLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim().length > 0 &&
      lines[i].trim() !== '---' &&
      lines[i].trim() !== '***' &&
      !lines[i].trim().startsWith('#') &&
      !lines[i].trim().startsWith('```') &&
      !lines[i].trim().startsWith('<Callout') &&
      !lines[i].trim().startsWith('<InteractiveFlowDiagram') &&
      !lines[i].trim().startsWith('|') &&
      !lines[i].trim().startsWith('- ') &&
      !/^\d+\.\s+/.test(lines[i].trim())
    ) {
      paragraphLines.push(lines[i].trim());
      i++;
    }

    if (paragraphLines.length > 0) {
      elements.push(
        <FadeInSection key={`p-${i}`}>
          <p className="my-4 text-[15px] sm:text-[16px] text-muted leading-[1.75]">
            {renderInlineMarkdown(paragraphLines.join(' '))}
          </p>
        </FadeInSection>
      );
    } else {
      i++;
    }
  }

  return elements;
}
