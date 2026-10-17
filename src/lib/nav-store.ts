import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NAV_GROUPS } from './nav-data';

interface NavState {
  expandedGroups: Record<string, boolean>;
  expandedItems: Record<string, boolean>;

  toggleGroup: (groupTitle: string) => void;
  setGroupExpanded: (groupTitle: string, isExpanded: boolean) => void;

  toggleItem: (itemHref: string) => void;
  setItemExpanded: (itemHref: string, isExpanded: boolean) => void;

  // Automatically collapses non-active sections and expands only the active group and item
  ensureActiveRouteExpanded: (pathname: string) => void;
}

// Initial state: Only the default active category (FRONTEND) and active topic (Next.js 16) are expanded
const getDefaultInitialGroups = () => {
  const initial: Record<string, boolean> = {};
  NAV_GROUPS.forEach((group) => {
    initial[group.title] = group.title === 'FRONTEND';
  });
  return initial;
};

const getDefaultInitialItems = () => {
  const initial: Record<string, boolean> = {};
  NAV_GROUPS.forEach((group) => {
    group.items.forEach((item) => {
      initial[item.href] = item.href === '/docs/nextjs';
    });
  });
  return initial;
};

export const useNavStore = create<NavState>()(
  persist(
    (set, get) => ({
      expandedGroups: getDefaultInitialGroups(),
      expandedItems: getDefaultInitialItems(),

      // Accordion toggle: opening one group closes all other groups
      toggleGroup: (groupTitle: string) => {
        set((state) => {
          const isCurrentlyExpanded = Boolean(state.expandedGroups[groupTitle]);
          const nextGroups: Record<string, boolean> = {};
          NAV_GROUPS.forEach((g) => {
            nextGroups[g.title] = g.title === groupTitle ? !isCurrentlyExpanded : false;
          });
          return { expandedGroups: nextGroups };
        });
      },

      setGroupExpanded: (groupTitle: string, isExpanded: boolean) => {
        set((state) => ({
          expandedGroups: {
            ...state.expandedGroups,
            [groupTitle]: isExpanded,
          },
        }));
      },

      // Accordion toggle: opening one item closes other items
      toggleItem: (itemHref: string) => {
        set((state) => {
          const isCurrentlyExpanded = Boolean(state.expandedItems[itemHref]);
          const nextItems: Record<string, boolean> = {};
          NAV_GROUPS.forEach((g) => {
            g.items.forEach((it) => {
              nextItems[it.href] = it.href === itemHref ? !isCurrentlyExpanded : false;
            });
          });
          return { expandedItems: nextItems };
        });
      },

      setItemExpanded: (itemHref: string, isExpanded: boolean) => {
        set((state) => ({
          expandedItems: {
            ...state.expandedItems,
            [itemHref]: isExpanded,
          },
        }));
      },

      // When viewing an active topic, close all other categories and topics outside this active path
      ensureActiveRouteExpanded: (pathname: string) => {
        let targetGroupTitle: string | null = null;
        let targetItemHref: string | null = null;

        for (const group of NAV_GROUPS) {
          for (const item of group.items) {
            const isExactItem = item.href === pathname;
            const isChildItem = item.children?.some(
              (c) => c.href === pathname || pathname.startsWith(c.href)
            );
            const isSubPath = pathname === item.href || pathname.startsWith(item.href + '/');

            if (isExactItem || isChildItem || isSubPath) {
              targetGroupTitle = group.title;
              targetItemHref = item.href;
              break;
            }
          }
          if (targetGroupTitle) break;
        }

        if (targetGroupTitle && targetItemHref) {
          const currentGroups = get().expandedGroups;
          const currentItems = get().expandedItems;

          const isGroupAlreadyTargetOnly =
            Boolean(currentGroups[targetGroupTitle]) &&
            NAV_GROUPS.every((g) =>
              g.title === targetGroupTitle ? Boolean(currentGroups[g.title]) : !currentGroups[g.title]
            );

          const isItemAlreadyTargetOnly =
            Boolean(currentItems[targetItemHref]) &&
            NAV_GROUPS.every((g) =>
              g.items.every((it) =>
                it.href === targetItemHref ? Boolean(currentItems[it.href]) : !currentItems[it.href]
              )
            );

          if (isGroupAlreadyTargetOnly && isItemAlreadyTargetOnly) {
            return;
          }

          const nextGroups: Record<string, boolean> = {};
          NAV_GROUPS.forEach((g) => {
            nextGroups[g.title] = g.title === targetGroupTitle;
          });

          const nextItems: Record<string, boolean> = {};
          NAV_GROUPS.forEach((g) => {
            g.items.forEach((it) => {
              nextItems[it.href] = it.href === targetItemHref;
            });
          });

          set({
            expandedGroups: nextGroups,
            expandedItems: nextItems,
          });
        }
      },
    }),
    {
      name: 'scripture-nav-state-v2',
    }
  )
);
