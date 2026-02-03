"use client";

import { useState, useRef, useEffect } from "react";
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

interface DictationRecognitionResult {
  readonly length: number;
  readonly isFinal: boolean;
  0: { readonly transcript: string };
}

interface DictationRecognitionEvent {
  readonly resultIndex: number;
  readonly results: { readonly length: number; [i: number]: DictationRecognitionResult };
}

interface DictationRecognition {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: DictationRecognitionEvent) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  start(): void;
  stop(): void;
}

function getSpeechRecognition(): (new () => DictationRecognition) | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { SpeechRecognition?: new () => DictationRecognition; webkitSpeechRecognition?: new () => DictationRecognition };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export function HomeInputBar() {
  const [value, setValue] = useState("");
  const [interim, setInterim] = useState("");
  const [isDictating, setIsDictating] = useState(false);
  const [dictationSupported, setDictationSupported] = useState(true);
  const recognitionRef = useRef<DictationRecognition | null>(null);

  const isTyping = value.length > 0 || interim.length > 0;
  const showSend = isTyping && !isDictating;
  const displayValue = isDictating ? [value, interim].filter(Boolean).join(" ") : value;

  useEffect(() => {
    queueMicrotask(() => setDictationSupported(!!getSpeechRecognition()));
  }, []);

  useEffect(() => {
    if (!isDictating || !dictationSupported) return;
    const Klass = getSpeechRecognition();
    if (!Klass) return;
    const recognition = new Klass();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = typeof navigator !== "undefined" ? navigator.language : "en-US";
    recognition.onresult = (event: DictationRecognitionEvent) => {
      let nextInterim = "";
      setValue((prev) => {
        let next = prev;
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            next = next ? `${next} ${transcript}` : transcript;
          } else {
            nextInterim = transcript;
          }
        }
        return next;
      });
      setInterim(nextInterim);
    };
    recognition.onerror = (event: { error: string }) => {
      if (event.error === "no-speech" || event.error === "aborted") return;
      recognition.stop();
      setIsDictating(false);
      setInterim("");
    };
    recognitionRef.current = recognition;
    recognition.start();
    return () => {
      try {
        recognition.stop();
      } catch {
        // already stopped
      }
      recognitionRef.current = null;
      setInterim("");
    };
  }, [isDictating, dictationSupported]);

  function handleDictationClick() {
    if (isDictating) return;
    if (!dictationSupported) return;
    setInterim("");
    setIsDictating(true);
  }

  function handleEndDictation() {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // no-op
      }
      recognitionRef.current = null;
    }
    setIsDictating(false);
    setInterim("");
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
          onChange={(e) => !isDictating && setValue(e.target.value)}
          placeholder={isDictating ? undefined : PLACEHOLDER}
          readOnly={isDictating}
          className="h-4 min-w-0 w-full bg-transparent text-sm leading-4 outline-none placeholder:font-normal"
          style={{
            color: isDictating ? "var(--foreground-muted)" : "var(--foreground-secondary)",
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
        {!isDictating ? (
          <div className="flex items-center gap-1">
            <Tooltip content="Dictation" side="bottom">
              <button
                type="button"
                className={iconButtonClass}
                style={iconMutedStyle}
                aria-label="Dictation"
                onClick={handleDictationClick}
                disabled={!dictationSupported}
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
              aria-label="Dictation active"
            >
              <FaIcon icon={faMicrophone} className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleEndDictation}
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
