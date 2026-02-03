"use client";

import { useRouter } from "next/navigation";
import { HomeActionsGrid } from "@/components/home-actions-grid";
import { HomeInputBar } from "@/components/home-input-bar";
import { useChat } from "@/lib/chat-context";

const ACTION_SHORTCUTS = [
  { label: "Plan a lesson", iconKey: "book" as const },
  { label: "Write to parents", iconKey: "at" as const },
  { label: "Roleplay a situation", iconKey: "messages" as const },
  { label: "Create a quiz", iconKey: "checkDouble" as const },
  { label: "Adapt content", iconKey: "shapes" as const },
  { label: "Manage tasks", iconKey: "snooze" as const },
];

export function HomeChatSection() {
  const router = useRouter();
  const { createChat } = useChat();

  function handleSend(message: string) {
    createChat(message);
    router.push("/chat");
  }

  return (
    <div className="flex flex-col gap-2">
      <HomeActionsGrid actions={ACTION_SHORTCUTS} />
      <HomeInputBar onSend={handleSend} />
    </div>
  );
}
