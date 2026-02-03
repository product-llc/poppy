"use client";

import { useRouter } from "next/navigation";
import { FaIcon } from "@/components/fa-icon";
import { useChat } from "@/lib/chat-context";
import {
  faShareFromSquare,
  faFileLines,
  faEllipsisVertical,
} from "@fortawesome/pro-regular-svg-icons";

interface ChatPanelHeaderProps {
  title: string;
}

export function ChatPanelHeader({ title }: ChatPanelHeaderProps) {
  const router = useRouter();
  const { createChat } = useChat();

  function handleNewChat() {
    createChat();
    router.push("/chat");
  }

  return (
    <header
      className="flex shrink-0 items-center justify-between gap-2 border-b py-3"
      style={{
        borderColor: "var(--border)",
        color: "var(--foreground)",
      }}
    >
      <h1 className="min-w-0 truncate text-sm font-semibold" title={title}>
        {title}
      </h1>
      <div className="flex shrink-0 items-center gap-1">
        <button
          type="button"
          className="flex h-7 w-7 items-center justify-center rounded transition-colors hover:bg-black/10"
          style={{ color: "var(--foreground-muted)" }}
          aria-label="Share"
        >
          <FaIcon icon={faShareFromSquare} className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          className="flex h-7 w-7 items-center justify-center rounded transition-colors hover:bg-black/10"
          style={{ color: "var(--foreground-muted)" }}
          aria-label="New chat"
          onClick={handleNewChat}
        >
          <FaIcon icon={faFileLines} className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          className="flex h-7 w-7 items-center justify-center rounded transition-colors hover:bg-black/10"
          style={{ color: "var(--foreground-muted)" }}
          aria-label="More options"
        >
          <FaIcon icon={faEllipsisVertical} className="h-3.5 w-3.5" />
        </button>
      </div>
    </header>
  );
}
