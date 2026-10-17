'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavGroup } from '@/lib/nav-data';
import SidebarItem from './SidebarItem';

interface SidebarGroupProps {
  group: NavGroup;
  isExpanded: boolean;
  expandedItems: Record<string, boolean>;
  currentPathname: string;
  activeHash: string;
  isMounted: boolean;
  onToggleGroup: () => void;
  onToggleItem: (href: string) => void;
  onNavigate?: () => void;
}

export default function SidebarGroup({
  group,
  isExpanded,
  expandedItems,
  currentPathname,
  activeHash,
  isMounted,
  onToggleGroup,
  onToggleItem,
  onNavigate,
}: SidebarGroupProps) {
  const groupId = `group-${group.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

  return (
    <div role="none" className="select-none">
      {/* Level 1 Group Header Button */}
      <button
        type="button"
        onClick={onToggleGroup}
        aria-expanded={isExpanded}
        aria-controls={groupId}
        className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-muted hover:text-ink hover:bg-subtle/70 transition duration-200 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
      >
        <span className="flex items-center gap-2 truncate">
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ backgroundColor: group.color }}
            aria-hidden="true"
          />
          <span className="truncate">{group.title}</span>
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-faint transition-transform duration-200 ease-out shrink-0 ${
            isExpanded ? 'rotate-0' : '-rotate-90'
          }`}
        />
      </button>

      {/* Level 2 Items List Accordion */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.ul
            id={groupId}
            role="group"
            aria-label={group.title}
            initial={isMounted ? { height: 0, opacity: 0 } : false}
            animate={{ height: 'auto', opacity: 1 }}
            exit={isMounted ? { height: 0, opacity: 0 } : undefined}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="mt-1 space-y-0.5 overflow-hidden ml-2 pl-2 border-l border-hairline/60"
          >
            {group.items.map((item) => {
              const isItemActive =
                currentPathname === item.href ||
                Boolean(
                  item.children?.some(
                    (c) => !c.href.includes('#') && c.href === currentPathname
                  )
                );
              const isItemExpanded = Boolean(expandedItems[item.href]);

              return (
                <SidebarItem
                  key={item.href}
                  item={item}
                  isActive={isItemActive}
                  isExpanded={isItemExpanded}
                  currentPathname={currentPathname}
                  activeHash={activeHash}
                  isMounted={isMounted}
                  onToggleExpand={() => onToggleItem(item.href)}
                  onNavigate={onNavigate}
                />
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
