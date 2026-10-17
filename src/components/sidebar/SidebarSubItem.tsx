'use client';

import React from 'react';
import Link from 'next/link';
import { NavChild } from '@/lib/nav-data';

interface SidebarSubItemProps {
  child: NavChild;
  isActive: boolean;
  onNavigate?: () => void;
}

export default function SidebarSubItem({
  child,
  isActive,
  onNavigate,
}: SidebarSubItemProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onNavigate?.();

    // If it's a hash link on the same page, do smooth scroll
    if (child.href.includes('#')) {
      const [path, hash] = child.href.split('#');
      if (typeof window !== 'undefined' && window.location.pathname === path && hash) {
        const el = document.getElementById(hash);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          window.history.pushState(null, '', `#${hash}`);
          window.dispatchEvent(new HashChangeEvent('hashchange'));
        }
      }
    }
  };

  return (
    <li role="none" className="relative">
      <Link
        href={child.href}
        role="treeitem"
        aria-selected={isActive}
        title={child.title}
        onClick={handleClick}
        className={`group flex items-center gap-2 py-1.5 px-3 rounded-lg text-xs leading-snug transition-all duration-200 ease-out select-none focus:outline-none focus-visible:ring-1 focus-visible:ring-accent ${
          isActive
            ? 'text-accent font-semibold bg-accent-soft/70'
            : 'text-muted hover:text-ink hover:bg-subtle'
        }`}
      >
        {/* Subtle active left dot indicator */}
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-200 ${
            isActive ? 'bg-accent scale-110 shadow-[0_0_6px_var(--accent)]' : 'bg-transparent group-hover:bg-faint/40'
          }`}
          aria-hidden="true"
        />

        {/* Truncated label with accessible title tooltip */}
        <span className="truncate min-w-0 flex-1">{child.title}</span>
      </Link>
    </li>
  );
}
