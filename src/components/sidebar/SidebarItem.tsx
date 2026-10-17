'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavItem } from '@/lib/nav-data';
import SidebarSubItem from './SidebarSubItem';

interface SidebarItemProps {
  item: NavItem;
  isActive: boolean;
  isExpanded: boolean;
  currentPathname?: string;
  activeHash: string;
  isMounted: boolean;
  onToggleExpand: () => void;
  onNavigate?: () => void;
}

export default function SidebarItem({
  item,
  isActive,
  isExpanded,
  currentPathname = '',
  activeHash,
  isMounted,
  onToggleExpand,
  onNavigate,
}: SidebarItemProps) {
  const hasChildren = Boolean(item.children && item.children.length > 0);
  const subMenuId = `submenu-${item.href.replace(/[^a-zA-Z0-9_-]/g, '-')}`;

  const handleLinkClick = () => {
    onNavigate?.();
    if (hasChildren && !isExpanded) {
      onToggleExpand();
    }
  };

  const handleChevronClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleExpand();
  };

  return (
    <li role="none" className="relative select-none">
      <div
        className={`group flex items-center justify-between gap-1.5 px-3 py-2 rounded-xl text-[13.5px] leading-snug transition-all duration-200 ease-out ${
          isActive
            ? 'bg-accent-soft text-accent font-semibold shadow-xs'
            : 'text-muted hover:text-ink hover:bg-subtle'
        }`}
      >
        {/* Main Item Link */}
        <Link
          href={item.href}
          role="treeitem"
          aria-selected={isActive}
          aria-expanded={hasChildren ? isExpanded : undefined}
          aria-controls={hasChildren ? subMenuId : undefined}
          title={item.title}
          onClick={handleLinkClick}
          className="flex items-center gap-2.5 min-w-0 flex-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-md py-0.5"
        >
          {/* Active indicator dot */}
          <span
            className={`w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-200 ${
              isActive
                ? 'bg-accent scale-125 shadow-[0_0_6px_var(--accent)]'
                : 'bg-transparent group-hover:bg-faint/30'
            }`}
            aria-hidden="true"
          />
          <span className="truncate">{item.title}</span>
        </Link>

        {/* Small Accordion Chevron for Level 2 items with children */}
        {hasChildren && (
          <button
            type="button"
            onClick={handleChevronClick}
            aria-label={isExpanded ? `พับเมนู ${item.title}` : `ขยายเมนู ${item.title}`}
            aria-expanded={isExpanded}
            aria-controls={subMenuId}
            className="p-1 -mr-1 rounded-md text-faint hover:text-ink hover:bg-hairline/40 transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
          >
            <ChevronRight
              className={`w-3.5 h-3.5 transition-transform duration-200 ease-out ${
                isExpanded ? 'rotate-90 text-accent' : 'rotate-0'
              }`}
            />
          </button>
        )}
      </div>

      {/* Level 3 Children Accordion */}
      {hasChildren && (
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.ul
              id={subMenuId}
              role="group"
              aria-label={`หัวข้อย่อยของ ${item.title}`}
              initial={isMounted ? { height: 0, opacity: 0 } : false}
              animate={{ height: 'auto', opacity: 1 }}
              exit={isMounted ? { height: 0, opacity: 0 } : undefined}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="mt-1 space-y-0.5 overflow-hidden ml-4 pl-3.5 border-l border-hairline"
            >
              {item.children!.map((child) => {
                const childHash = child.href.includes('#')
                  ? child.href.split('#')[1]
                  : '';
                const isSubActive = childHash
                  ? isActive &&
                    (activeHash === childHash ||
                      (!activeHash && child === item.children![0]))
                  : currentPathname === child.href;

                return (
                  <SidebarSubItem
                    key={child.href}
                    child={child}
                    isActive={Boolean(isSubActive)}
                    onNavigate={onNavigate}
                  />
                );
              })}
            </motion.ul>
          )}
        </AnimatePresence>
      )}
    </li>
  );
}
