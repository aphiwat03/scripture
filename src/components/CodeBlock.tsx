'use client';

import React, { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

// Lightweight tokenizer for clean Apple Xcode / Developer Docs syntax highlighting
function highlightLine(line: string): React.ReactNode[] {
  // Full-line comment
  if (line.trimStart().startsWith('//') || line.trimStart().startsWith('#')) {
    return [
      <span key="comment" className="text-[#7f8c98] italic">
        {line}
      </span>,
    ];
  }

  // Split inline comment if present (outside quotes)
  const commentIndex = line.indexOf(' //');
  if (commentIndex !== -1) {
    const codePart = line.slice(0, commentIndex);
    const commentPart = line.slice(commentIndex);
    return [
      ...tokenizeCodeSegment(codePart, 'code'),
      <span key="inline-comment" className="text-[#7f8c98] italic">
        {commentPart}
      </span>,
    ];
  }

  return tokenizeCodeSegment(line, 'line');
}

function tokenizeCodeSegment(text: string, prefix: string): React.ReactNode[] {
  const tokenRegex =
    /('[^']*'|"[^"]*"|`[^`]*`|\b(?:import|export|from|default|async|await|function|return|const|let|var|interface|type|extends|implements|class|new|if|else|try|catch|throw|true|false|null|undefined)\b|\b(?:Promise|React|Metadata|NextRequest|NextResponse|Readonly)\b|@[A-Za-z0-9_]+|\b\d+\b)/g;

  const parts = text.split(tokenRegex);
  return parts.map((part, idx) => {
    if (!part) return null;
    const key = `${prefix}-${idx}`;

    // Strings
    if (
      (part.startsWith("'") && part.endsWith("'")) ||
      (part.startsWith('"') && part.endsWith('"')) ||
      (part.startsWith('`') && part.endsWith('`'))
    ) {
      return (
        <span key={key} className="text-[#ff8170]">
          {part}
        </span>
      );
    }

    // Keywords
    if (
      /^(import|export|from|default|async|await|function|return|const|let|var|interface|type|extends|implements|class|new|if|else|try|catch|throw)$/.test(
        part
      )
    ) {
      return (
        <span key={key} className="text-[#ff7ab2] font-medium">
          {part}
        </span>
      );
    }

    // Booleans / primitives
    if (/^(true|false|null|undefined|\d+)$/.test(part)) {
      return (
        <span key={key} className="text-[#d9c97c]">
          {part}
        </span>
      );
    }

    // Types / Globals / Decorators
    if (
      /^(Promise|React|Metadata|NextRequest|NextResponse|Readonly)$/.test(part) ||
      part.startsWith('@')
    ) {
      return (
        <span key={key} className="text-[#6bdfff]">
          {part}
        </span>
      );
    }

    return <span key={key}>{part}</span>;
  });
}

export default function CodeBlock({
  code,
  language = 'tsx',
  filename,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const trimmedCode = code.trim();
  const lines = trimmedCode.split('\n');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(trimmedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback ignored
    }
  };

  return (
    <div className="my-6 rounded-[20px] overflow-hidden border border-hairline bg-code text-[#f5f5f7] shadow-[0_8px_30px_-6px_rgba(0,0,0,0.22)]">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.04] border-b border-white/[0.08]">
        <div className="flex items-center gap-2.5 min-w-0">
          <Terminal className="w-3.5 h-3.5 text-[#86868b] shrink-0" />
          {filename ? (
            <span className="text-xs font-mono text-[#d2d2d7] truncate">
              {filename}
            </span>
          ) : (
            <span className="text-xs font-mono uppercase tracking-wider text-[#86868b]">
              {language}
            </span>
          )}
          {filename && (
            <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-white/[0.06] text-[#86868b]">
              {language}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleCopy}
          aria-label="คัดลอกโค้ด"
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-[#a1a1a6] hover:text-white hover:bg-white/[0.08] transition duration-200 ease-out cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#30d158]" />
              <span className="text-[#30d158]">คัดลอกแล้ว</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Lines */}
      <div className="p-4 sm:p-5 overflow-x-auto">
        <pre className="font-mono text-[13px] leading-[1.65] text-[#e8e8ed]">
          <code>
            {lines.map((line, i) => (
              <div key={i} className="table-row">
                <span className="table-cell pr-4 select-none text-right text-[11px] text-[#6e6e73] w-7">
                  {i + 1}
                </span>
                <span className="table-cell whitespace-pre">
                  {highlightLine(line)}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
