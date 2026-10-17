'use client';

import React, { useEffect, useState, useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';
import { NAV_GROUPS } from '@/lib/nav-data';
import { useNavStore } from '@/lib/nav-store';
import SidebarGroup from './SidebarGroup';

interface SidebarProps {
  onNavigate?: () => void;
  className?: string;
}

const emptySubscribe = () => () => {};

const subscribeHash = (callback: () => void) => {
  window.addEventListener('hashchange', callback);
  return () => window.removeEventListener('hashchange', callback);
};

const getHashSnapshot = () =>
  typeof window !== 'undefined' ? window.location.hash.replace('#', '') : '';
const getServerHashSnapshot = () => '';

export default function Sidebar({ onNavigate, className = '' }: SidebarProps) {
  const pathname = usePathname();
  const isMounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const urlHash = useSyncExternalStore(subscribeHash, getHashSnapshot, getServerHashSnapshot);
  const [scrolledHash, setScrolledHash] = useState<{ path: string; hash: string } | null>(null);

  const activeHash =
    (scrolledHash && scrolledHash.path === pathname ? scrolledHash.hash : '') ||
    urlHash;

  const {
    expandedGroups,
    expandedItems,
    toggleGroup,
    toggleItem,
    ensureActiveRouteExpanded,
  } = useNavStore();

  // Whenever pathname changes, expand the relevant group & item automatically
  useEffect(() => {
    if (pathname) {
      ensureActiveRouteExpanded(pathname);
    }
  }, [pathname, ensureActiveRouteExpanded]);

  // Level 3 Scroll-Spy via IntersectionObserver
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleHashChange = () => {
      setScrolledHash(null);
    };
    window.addEventListener('hashchange', handleHashChange);

    // Observe all headings with IDs on the current page
    const headings = document.querySelectorAll('h2[id], h3[id]');
    if (headings.length === 0) {
      return () => {
        window.removeEventListener('hashchange', handleHashChange);
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setScrolledHash({ path: pathname, hash: entry.target.id });
            break;
          }
        }
      },
      {
        rootMargin: '-80px 0px -65% 0px',
        threshold: 0.1,
      }
    );

    headings.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      observer.disconnect();
    };
  }, [pathname]);

  return (
    <nav
      role="tree"
      aria-label="Documentation Tree Navigation"
      className={`space-y-4 py-5 px-3.5 ${className}`}
    >
      {NAV_GROUPS.map((group) => {
        const isGroupExpanded = isMounted
          ? Boolean(expandedGroups[group.title])
          : group.title === 'FRONTEND';

        return (
          <SidebarGroup
            key={group.title}
            group={group}
            isExpanded={isGroupExpanded}
            expandedItems={isMounted ? expandedItems : { '/docs/nextjs': true }}
            currentPathname={pathname}
            activeHash={activeHash}
            isMounted={isMounted}
            onToggleGroup={() => toggleGroup(group.title)}
            onToggleItem={(href) => toggleItem(href)}
            onNavigate={onNavigate}
          />
        );
      })}
    </nav>
  );
}
