"use client";

import { useState } from "react";
import { FaIcon } from "@/components/fa-icon";
import { Tooltip } from "@/components/tooltip";
import {
  faPaperclip,
  faUserSecret,
  faMicrophone,
  faWaveformLines,
  faArrowUp,
} from "@fortawesome/pro-regular-svg-icons";

const PLACEHOLDER = "Try: 'Create a math quiz on fractions for 5th grade'";
const VOICE_MODE_LABEL = "You text in voice mode";

export function HomeInputBar() {
  const [value, setValue] = useState("");
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const isTyping = value.length > 0;
  const showSend = isTyping && !isVoiceMode;
  const displayValue = isVoiceMode ? VOICE_MODE_LABEL : value;

  function handleVoiceClick() {
    if (isVoiceMode) return;
    setIsVoiceMode(true);
    setValue("");
  }

  function handleEndVoice() {
    setIsVoiceMode(false);
  }

  function handleSend() {
    if (!value.trim()) return;
    setValue("");
  }

  const iconButtonClass =
    "flex h-6 w-6 shrink-0 items-center justify-center rounded-[6px] transition-colors duration-150 hover:bg-black/8 active:bg-black/12";
  const filledButtonClass =
    "flex h-6 w-6 shrink-0 items-center justify-center rounded-[6px] transition-all duration-150 hover:opacity-90 active:scale-95";
  const iconMutedStyle = { color: "var(--foreground-muted)" };

  return (
    <div
      className="flex w-full flex-col gap-4 rounded-xl bg-white p-4"
      style={{ boxShadow: "var(--input-bar-shadow)" }}
    >
      <div className="h-4 min-w-0">
        <input
          type="text"
          value={displayValue}
          onChange={(e) => !isVoiceMode && setValue(e.target.value)}
          placeholder={isVoiceMode ? undefined : PLACEHOLDER}
          readOnly={isVoiceMode}
          className="h-4 min-w-0 w-full bg-transparent text-sm leading-4 outline-none placeholder:font-normal"
          style={{
            color: isVoiceMode ? "var(--foreground-muted)" : "var(--foreground-secondary)",
            caretColor: "var(--input-caret)",
          }}
        />
      </div>
      <div className="flex h-6 items-center justify-between">
        <div className="flex items-center gap-1">
          <Tooltip content="Add files, context and more" side="bottom">
            <button
              type="button"
              className={iconButtonClass}
              style={iconMutedStyle}
              aria-label="Attach"
            >
              <FaIcon icon={faPaperclip} className="h-4 w-4" />
            </button>
          </Tooltip>
          <Tooltip content="Agent mode" side="bottom">
            <button
              type="button"
              className={iconButtonClass}
              style={iconMutedStyle}
              aria-label="Private"
            >
              <FaIcon icon={faUserSecret} className="h-4 w-4" />
            </button>
          </Tooltip>
        </div>
        {!isVoiceMode ? (
          <div className="flex items-center gap-1">
            <Tooltip content="Dictation" side="bottom">
              <button
                type="button"
                className={iconButtonClass}
                style={iconMutedStyle}
                aria-label="Voice input"
                onClick={handleVoiceClick}
              >
                <FaIcon icon={faMicrophone} className="h-4 w-4" />
              </button>
            </Tooltip>
            {showSend ? (
              <button
                type="button"
                onClick={handleSend}
                className={filledButtonClass}
                style={{ backgroundColor: "var(--foreground)", color: "white" }}
                aria-label="Send"
              >
                <FaIcon icon={faArrowUp} className="h-4 w-4" />
              </button>
            ) : (
              <Tooltip content="Conversation mode" side="bottom">
                <button
                  type="button"
                  className={filledButtonClass}
                  style={{ backgroundColor: "var(--foreground)", color: "white" }}
                  aria-label="Voice"
                >
                  <FaIcon icon={faWaveformLines} className="h-4 w-4" />
                </button>
              </Tooltip>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <button
              type="button"
              className={iconButtonClass}
              style={{ color: "#16a34a" }}
              aria-label="Voice active"
            >
              <FaIcon icon={faMicrophone} className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleEndVoice}
              className="h-6 rounded-[6px] px-3 text-sm font-medium flex items-center transition-all duration-150 hover:opacity-90 active:scale-95"
              style={{ backgroundColor: "#16a34a", color: "white" }}
            >
              End
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
