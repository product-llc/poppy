"use client";

import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaIcon } from "@/components/fa-icon";
import { useChat } from "@/lib/chat-context";
import {
  faComment,
  faFolder,
  faChevronDown,
  faChevronUp,
  faCheckDouble,
  faShapes,
  faSnooze,
} from "@fortawesome/pro-regular-svg-icons";
import { faCirclePlus } from "@fortawesome/pro-solid-svg-icons";
import { useState } from "react";

const CHAT_TITLE_MAX = 36;

interface CollapsedSectionProps {
  icon: IconDefinition;
  label: string;
}

function CollapsedSection({ icon, label }: CollapsedSectionProps) {
  return (
    <div className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm text-white/80">
      <FaIcon icon={icon} className="h-3.5 w-3.5 shrink-0 opacity-80" />
      <span className="min-w-0 flex-1 truncate font-medium">{label}</span>
      <FaIcon icon={faChevronUp} className="h-3 w-3 shrink-0 opacity-70" />
    </div>
  );
}

export function SidebarChats() {
  const pathname = usePathname();
  const { chats, activeChatId, setActiveChatId, createChat } = useChat();
  const [chatsExpanded, setChatsExpanded] = useState(true);

  const isChatPage = pathname === "/chat";

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex shrink-0 items-center justify-between gap-2 border-b border-white/10 px-3 py-3">
        <span className="text-sm font-semibold text-white">Chats</span>
        <div className="flex items-center gap-1">
          <span className="flex h-7 w-7 items-center justify-center rounded text-white/70 transition hover:bg-white/10 hover:text-white">
            <FaIcon icon={faFolder} className="h-3.5 w-3.5" />
          </span>
          <Link
            href="/chat"
            className="flex h-7 w-7 items-center justify-center rounded text-white/80 transition hover:bg-white/10 hover:text-white"
            aria-label="New chat"
            onClick={() => createChat()}
          >
            <FaIcon icon={faCirclePlus} className="h-4 w-4" />
          </Link>
        </div>
      </div>
      <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-2 py-3">
        <button
          type="button"
          className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-white/90 transition hover:bg-white/10"
          onClick={() => setChatsExpanded((e) => !e)}
        >
          <FaIcon icon={faFolder} className="h-3.5 w-3.5 shrink-0 opacity-85" />
          <span className="min-w-0 flex-1 truncate font-medium">Uncategorized</span>
          <FaIcon
            icon={chatsExpanded ? faChevronDown : faChevronUp}
            className="h-3 w-3 shrink-0 opacity-80"
          />
        </button>
        {chatsExpanded && (
          <div className="flex flex-col gap-0.5 pb-1 pl-0.5">
            {chats.length === 0 ? (
              <p className="px-2 py-2 text-xs text-white/50">No chats yet</p>
            ) : (
              chats.map((chat) => {
                const active = activeChatId === chat.id && isChatPage;
                const title =
                  chat.title.length > CHAT_TITLE_MAX
                    ? chat.title.slice(0, CHAT_TITLE_MAX) + "…"
                    : chat.title;
                return (
                  <Link
                    key={chat.id}
                    href="/chat"
                    onClick={() => setActiveChatId(chat.id)}
                    className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-white/90 transition hover:bg-white/10"
                    style={
                      active
                        ? { backgroundColor: "var(--sidebar-chat-active-bg)" }
                        : undefined
                    }
                  >
                    <span className="min-w-0 truncate">{title}</span>
                  </Link>
                );
              })
            )}
          </div>
        )}
        <div className="mt-2 flex flex-col gap-0.5 border-t border-white/10 pt-2">
          <CollapsedSection icon={faComment} label="Roleplay" />
          <CollapsedSection icon={faCheckDouble} label="Quizzes" />
          <CollapsedSection icon={faShapes} label="Content adaptations" />
          <CollapsedSection icon={faSnooze} label="Tasks" />
          <CollapsedSection icon={faFolder} label="Custom group a" />
        </div>
      </nav>
    </div>
  );
}
