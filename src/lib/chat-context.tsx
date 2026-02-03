"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Chat, ChatMessage } from "./chat-types";
import { CHATS_STORAGE_KEY } from "./chat-types";

function loadChats(): Chat[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CHATS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Chat[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveChats(chats: Chat[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CHATS_STORAGE_KEY, JSON.stringify(chats));
  } catch {
    // ignore
  }
}

interface ChatContextValue {
  chats: Chat[];
  activeChatId: string | null;
  setActiveChatId: (id: string | null) => void;
  createChat: (firstMessage?: string) => string;
  getChat: (id: string) => Chat | undefined;
  addMessage: (chatId: string, role: "user" | "assistant", content: string) => void;
  updateChatTitle: (chatId: string, title: string) => void;
}

const ChatContext = createContext<ChatContextValue | null>(null);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatIdState] = useState<string | null>(null);

  useEffect(() => {
    setChats(loadChats());
  }, []);

  const setActiveChatId = useCallback((id: string | null) => {
    setActiveChatIdState(id);
  }, []);

  const createChat = useCallback(
    (firstMessage?: string): string => {
      const id = crypto.randomUUID();
      const title = firstMessage
        ? firstMessage.slice(0, 48).trim() + (firstMessage.length > 48 ? "…" : "")
        : "New chat";
      const messages: ChatMessage[] = firstMessage
        ? [{ role: "user", content: firstMessage }]
        : [];
      const chat: Chat = {
        id,
        title,
        messages,
        createdAt: Date.now(),
      };
      setChats((prev) => {
        const next = [chat, ...prev];
        saveChats(next);
        return next;
      });
      setActiveChatIdState(id);
      return id;
    },
    []
  );

  const getChat = useCallback(
    (id: string): Chat | undefined => {
      return chats.find((c) => c.id === id);
    },
    [chats]
  );

  const addMessage = useCallback(
    (chatId: string, role: "user" | "assistant", content: string) => {
      setChats((prev) => {
        const next = prev.map((c) =>
          c.id === chatId
            ? { ...c, messages: [...c.messages, { role, content }] }
            : c
        );
        saveChats(next);
        return next;
      });
    },
    []
  );

  const updateChatTitle = useCallback(
    (chatId: string, title: string) => {
      setChats((prev) => {
        const next = prev.map((c) =>
          c.id === chatId ? { ...c, title } : c
        );
        saveChats(next);
        return next;
      });
    },
    []
  );

  const value = useMemo<ChatContextValue>(
    () => ({
      chats,
      activeChatId,
      setActiveChatId,
      createChat,
      getChat,
      addMessage,
      updateChatTitle,
    }),
    [
      chats,
      activeChatId,
      setActiveChatId,
      createChat,
      getChat,
      addMessage,
      updateChatTitle,
    ]
  );

  return (
    <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
  );
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used within ChatProvider");
  return ctx;
}
