"use client";

import { FaIcon } from "@/components/fa-icon";
import { faPaperclip, faUser, faMicrophone, faWaveformLines } from "@fortawesome/pro-solid-svg-icons";

export function HomeInputBar() {
  return (
    <div
      className="flex items-center gap-3 rounded-2xl border bg-white px-4 py-3.5 shadow-[0_25px_80px_rgba(15,11,7,0.08)]"
      style={{ borderColor: "var(--border)" }}
    >
      <button
        type="button"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition hover:bg-black/5"
        style={{ color: "var(--foreground-muted)" }}
        aria-label="Attach"
      >
        <FaIcon icon={faPaperclip} className="h-4 w-4" />
      </button>
      <button
        type="button"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition hover:bg-black/5"
        style={{ color: "var(--foreground-muted)" }}
        aria-label="Person"
      >
        <FaIcon icon={faUser} className="h-4 w-4" />
      </button>
      <input
        type="text"
        placeholder="Try: 'Create a math quiz on fractions for 5th grade'"
        className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:font-normal"
        style={{ color: "var(--foreground-secondary)" }}
      />
      <button
        type="button"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition hover:bg-black/5"
        style={{ color: "var(--foreground-muted)" }}
        aria-label="Voice input"
      >
        <FaIcon icon={faMicrophone} className="h-4 w-4" />
      </button>
      <button
        type="button"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition hover:bg-black/5"
        style={{ color: "var(--foreground-muted)" }}
        aria-label="Audio"
      >
        <FaIcon icon={faWaveformLines} className="h-4 w-4" />
      </button>
    </div>
  );
}
