"use client";

import { useEffect, useRef } from "react";
import { HomeInputBar } from "@/components/home-input-bar";
import { ChatPanelHeader } from "@/components/chat-panel-header";
import { Logo } from "@/components/logo";
import { useChat } from "@/lib/chat-context";

export default function ChatPage() {
  const { activeChatId, getChat, addMessage } = useChat();
  const fetchedRef = useRef<Set<string>>(new Set());
  const chat = activeChatId ? getChat(activeChatId) : null;

  useEffect(() => {
    if (!chat?.messages.length) return;
    const last = chat.messages[chat.messages.length - 1];
    if (last?.role !== "user") return;
    if (fetchedRef.current.has(chat.id)) return;
    fetchedRef.current.add(chat.id);

    const messages = chat.messages.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.reply != null) {
          addMessage(chat.id, "assistant", data.reply);
        }
      })
      .catch(() => {
        fetchedRef.current.delete(chat.id);
      });
  }, [chat?.id, chat?.messages, addMessage]);

  async function handleSend(message: string) {
    if (!activeChatId) return;
    addMessage(activeChatId, "user", message);
    const messages = [...(chat?.messages ?? []), { role: "user" as const, content: message }];
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
    });
    const data = await res.json();
    if (data.reply != null) {
      addMessage(activeChatId, "assistant", data.reply);
    }
  }

  if (!activeChatId) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-10">
        <p
          className="text-center text-lg"
          style={{ color: "var(--foreground-muted)" }}
        >
          Select a chat from the sidebar or start from home.
        </p>
      </div>
    );
  }

  if (!chat) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-10">
        <p
          className="text-center text-lg"
          style={{ color: "var(--foreground-muted)" }}
        >
          Select a chat from the sidebar or start from home.
        </p>
      </div>
    );
  }

  const isLoading =
    chat.messages.length > 0 &&
    chat.messages[chat.messages.length - 1]?.role === "user";

  return (
    <div className="flex flex-1 flex-col gap-6 px-3 pt-0 pb-6">
      <ChatPanelHeader title={chat.title} />
      <div className="flex flex-1 flex-col gap-6 min-h-0">
        {chat.messages.length === 0 ? (
          <p
            className="flex items-center gap-2 text-base"
            style={{ color: "var(--foreground-muted)" }}
          >
            <Logo width={20} height={20} variant="black" spin className="shrink-0" />
            <span>Thinking<span className="inline-flex">
              <span className="animate-[thinking-dot_1.4s_ease-in-out_infinite]" style={{ animationDelay: "0ms" }}>.</span>
              <span className="animate-[thinking-dot_1.4s_ease-in-out_infinite]" style={{ animationDelay: "160ms" }}>.</span>
              <span className="animate-[thinking-dot_1.4s_ease-in-out_infinite]" style={{ animationDelay: "320ms" }}>.</span>
            </span></span>
          </p>
        ) : (
          <div
            className="flex flex-col gap-6 rounded-xl bg-white p-6"
            style={{ boxShadow: "var(--input-bar-shadow)" }}
          >
            {chat.messages.map((m, i) => (
              <div
                key={i}
                className="flex flex-col gap-1"
                style={{
                  color:
                    m.role === "user"
                      ? "var(--foreground-secondary)"
                      : "var(--foreground)",
                }}
              >
                <span className="text-xs font-medium opacity-70">
                  {m.role === "user" ? "You" : "Poppy"}
                </span>
                <p className="whitespace-pre-wrap text-base leading-normal">
                  {m.content}
                </p>
              </div>
            ))}
            {isLoading && (
              <p
                className="flex items-center gap-2 text-sm"
                style={{ color: "var(--foreground-muted)" }}
              >
                <Logo width={18} height={18} variant="black" spin className="shrink-0" />
                <span>Thinking<span className="inline-flex">
                  <span className="animate-[thinking-dot_1.4s_ease-in-out_infinite]" style={{ animationDelay: "0ms" }}>.</span>
                  <span className="animate-[thinking-dot_1.4s_ease-in-out_infinite]" style={{ animationDelay: "160ms" }}>.</span>
                  <span className="animate-[thinking-dot_1.4s_ease-in-out_infinite]" style={{ animationDelay: "320ms" }}>.</span>
                </span></span>
              </p>
            )}
          </div>
        )}
      </div>
      <div className="shrink-0">
        <HomeInputBar
          onSend={handleSend}
          disabled={isLoading === true}
        />
      </div>
    </div>
  );
}
