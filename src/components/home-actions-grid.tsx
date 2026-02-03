"use client";

import { FaIcon } from "@/components/fa-icon";
import {
  faFileLines,
  faAt,
  faCircleQuestion,
  faSquareCheck,
  faGears,
  faListCheck,
} from "@fortawesome/pro-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

const ACTION_ICONS: Record<string, IconDefinition> = {
  fileLines: faFileLines,
  at: faAt,
  circleQuestion: faCircleQuestion,
  squareCheck: faSquareCheck,
  gears: faGears,
  listCheck: faListCheck,
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
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {actions.map((action) => (
        <button
          key={action.label}
          type="button"
          className="group flex items-center gap-3 rounded-2xl border bg-white/80 px-4 py-3.5 text-left shadow-[0_25px_80px_rgba(15,11,7,0.08)] transition hover:-translate-y-0.5"
          style={{ borderColor: "var(--border)" }}
        >
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[#044834]"
            style={{ backgroundColor: "rgba(4,72,52,0.1)" }}
            aria-hidden
          >
            <FaIcon icon={ACTION_ICONS[action.iconKey]} className="h-4 w-4" />
          </span>
          <span className="text-sm font-semibold" style={{ color: "var(--foreground-secondary)" }}>
            {action.label}
          </span>
        </button>
      ))}
    </div>
  );
}
