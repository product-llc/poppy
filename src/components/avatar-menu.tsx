"use client";

import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faEnvelope,
  faGear,
  faLanguage,
  faCircleQuestion,
  faArrowUp,
  faBook,
  faRightFromBracket,
} from "@fortawesome/pro-solid-svg-icons";
import { useRef, useState, useCallback, useEffect } from "react";
import { FaIcon } from "@/components/fa-icon";
import { UserAvatar } from "@/components/user-avatar";
import { Tooltip } from "@/components/tooltip";

interface MenuItem {
  label: string;
  icon?: IconDefinition;
  disabled?: boolean;
  onClick?: () => void;
  href?: string;
}

const MENU_ITEMS: (MenuItem | "divider")[] = [
  { label: "tina@school.com", icon: faEnvelope, disabled: true },
  "divider",
  { label: "Settings", icon: faGear },
  { label: "Language", icon: faLanguage },
  { label: "Get help", icon: faCircleQuestion },
  "divider",
  { label: "Upgrade plan", icon: faArrowUp },
  { label: "Learn more", icon: faBook },
  "divider",
  { label: "Log out", icon: faRightFromBracket },
];

interface AvatarMenuProps {
  avatarSrc?: string | null;
}

export function AvatarMenu({ avatarSrc }: AvatarMenuProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const toggle = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen((prev) => !prev);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current?.contains(e.target as Node)) return;
      close();
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, close]);

  return (
    <div ref={containerRef} className="relative flex shrink-0">
      <Tooltip content="My profile" side="right" sideOffset={4} triggerClassName="flex">
        <button
          type="button"
          onClick={toggle}
          className="flex shrink-0 cursor-pointer border-none bg-transparent p-0"
          aria-haspopup="menu"
          aria-expanded={open}
        >
          <UserAvatar src={avatarSrc} size={40} showStatus />
        </button>
      </Tooltip>
      {open && (
        <div
          data-avatar-menu
          className="absolute bottom-full left-0 z-50 mb-2 min-w-[220px] overflow-hidden rounded-lg bg-white p-2 text-sm shadow-lg"
          role="menu"
        >
          {MENU_ITEMS.map((item, i) =>
            item === "divider" ? (
              <div key={i} className="my-2 border-t border-[var(--border)]" />
            ) : (
              <button
                key={i}
                type="button"
                role="menuitem"
                disabled={item.disabled}
                onClick={item.disabled ? undefined : close}
                className={`group flex w-full items-center gap-3 rounded-lg px-4 py-2 text-left transition-colors hover:bg-[#F5F5F4] hover:text-gray-900 disabled:cursor-default ${
                  item.disabled ? "text-[var(--foreground-muted)]" : "text-[var(--foreground)]"
                }`}
              >
                {item.icon && (
                  <FaIcon
                    icon={item.icon}
                    className="w-4 shrink-0 text-[var(--foreground-muted)] group-hover:text-gray-900"
                    size="sm"
                  />
                )}
                {item.label}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}
