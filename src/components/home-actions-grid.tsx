"use client";

import { FaIcon } from "@/components/fa-icon";
import {
  faBook,
  faAt,
  faMessages,
  faCheckDouble,
  faShapes,
  faSnooze,
} from "@fortawesome/pro-regular-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

const ACTION_ICONS: Record<string, IconDefinition> = {
  book: faBook,
  at: faAt,
  messages: faMessages,
  checkDouble: faCheckDouble,
  shapes: faShapes,
  snooze: faSnooze,
};

export interface HomeAction {
  label: string;
  iconKey: keyof typeof ACTION_ICONS;
}

interface HomeActionsGridProps {
  actions: HomeAction[];
}

export function HomeActionsGrid({ actions }: HomeActionsGridProps) {
  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {actions.map((action) => (
        <button
          key={action.label}
          type="button"
          className="group flex h-12 items-center gap-2 rounded-xl border border-black/10 bg-orange-50 px-4 py-4 text-left transition-colors hover:bg-orange-100 dark:border-white/10 dark:bg-orange-950/30 dark:hover:bg-orange-900/40"
        >
          <FaIcon
            icon={ACTION_ICONS[action.iconKey]}
            className="h-4 w-4 shrink-0 text-[#78716c] dark:text-stone-400"
            aria-hidden
          />
          <span className="text-sm font-normal text-[#292524] dark:text-stone-200">
            {action.label}
          </span>
        </button>
      ))}
    </div>
  );
}
