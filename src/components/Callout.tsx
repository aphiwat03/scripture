import React from 'react';
import { Lightbulb, Info, TriangleAlert } from 'lucide-react';

export type CalloutType = 'tip' | 'note' | 'warning';

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const CALLOUT_CONFIG: Record<
  CalloutType,
  {
    defaultTitle: string;
    icon: React.ComponentType<{ className?: string }>;
    borderClass: string;
    bgClass: string;
    iconClass: string;
  }
> = {
  tip: {
    defaultTitle: 'Tip',
    icon: Lightbulb,
    borderClass: 'border-l-[3px] border-l-accent',
    bgClass: 'bg-accent-soft',
    iconClass: 'text-accent',
  },
  note: {
    defaultTitle: 'Note',
    icon: Info,
    borderClass: 'border-l-[3px] border-l-accent',
    bgClass: 'bg-subtle',
    iconClass: 'text-accent',
  },
  warning: {
    defaultTitle: 'Warning',
    icon: TriangleAlert,
    borderClass: 'border-l-[3px] border-l-amber-500 dark:border-l-amber-400',
    bgClass: 'bg-amber-500/[0.06] dark:bg-amber-400/[0.08]',
    iconClass: 'text-amber-600 dark:text-amber-400',
  },
};

export default function Callout({
  type = 'note',
  title,
  children,
}: CalloutProps) {
  const cfg = CALLOUT_CONFIG[type] || CALLOUT_CONFIG.note;
  const Icon = cfg.icon;

  return (
    <aside
      aria-label={title || cfg.defaultTitle}
      className={`my-6 rounded-2xl border border-hairline ${cfg.borderClass} ${cfg.bgClass} p-4 sm:p-5 transition-colors`}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 shrink-0">
          <Icon className={`w-4 h-4 ${cfg.iconClass}`} />
        </div>
        <div className="min-w-0 flex-1 text-sm leading-[1.7] text-ink">
          <div className="font-semibold tracking-tight mb-1 text-ink">
            {title || cfg.defaultTitle}
          </div>
          <div className="text-muted space-y-2">{children}</div>
        </div>
      </div>
    </aside>
  );
}
