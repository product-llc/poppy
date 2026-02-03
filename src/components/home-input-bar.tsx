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

const STRIP_COLOR = "#d1d5db";

function VoiceWaveformStrip({ active }: { active: boolean }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number>(0);
  const streamRef = useRef<MediaStream | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const timeDataRef = useRef<Uint8Array | null>(null);
  const stripBufferRef = useRef<number[]>([]);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    if (!active) return;
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;

    function initStrip(width: number) {
      stripBufferRef.current = Array(width).fill(0);
    }

    resizeObserverRef.current = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry || cancelled) return;
      const w = Math.floor(entry.contentRect.width);
      const h = Math.floor(entry.contentRect.height);
      const canvas = canvasRef.current;
      if (!canvas || w <= 0 || h <= 0) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      initStrip(w);
    });
    resizeObserverRef.current.observe(container);

    const canvas = canvasRef.current;
    if (canvas && container) {
      const w = Math.floor(container.clientWidth);
      const h = Math.floor(container.clientHeight);
      if (w > 0 && h > 0) {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
        initStrip(w);
      }
    }

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        const ctx = new AudioContext();
        ctxRef.current = ctx;
        const source = ctx.createMediaStreamSource(stream);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 256;
        analyser.smoothingTimeConstant = 0.75;
        source.connect(analyser);
        analyserRef.current = analyser;
        timeDataRef.current = new Uint8Array(analyser.fftSize);

        function tick() {
          const canvas = canvasRef.current;
          const analyser = analyserRef.current;
          const timeData = timeDataRef.current;
          if (!canvas || !analyser || !timeData || cancelled) return;

          analyser.getByteTimeDomainData(timeData as Uint8Array<ArrayBuffer>);
          let sum = 0;
          for (let i = 0; i < timeData.length; i++) {
            const v = (timeData[i]! - 128) / 128;
            sum += Math.abs(v);
          }
          const raw = sum / timeData.length;
          const level = Math.min(1, Math.pow(raw * 5, 0.6));

          const w = Math.floor(canvas.width / (window.devicePixelRatio || 1));
          if (w <= 0) {
            rafRef.current = requestAnimationFrame(tick);
            return;
          }
          const buffer = stripBufferRef.current;
          if (buffer.length !== w) initStrip(w);
          buffer.shift();
          buffer.push(level);

          const dpr = window.devicePixelRatio || 1;
          const ctx2d = canvas.getContext("2d");
          if (!ctx2d) return;
          ctx2d.scale(dpr, dpr);
          ctx2d.clearRect(0, 0, w, canvas.height / dpr);
          const h = canvas.height / dpr;
          const maxAmp = h * 0.9;

          ctx2d.fillStyle = STRIP_COLOR;
          const barSpacing = 8;
          const barWidth = 4;
          const minBarH = 2;
          const smoothRadius = 2;
          for (let x = 0; x < buffer.length; x += barSpacing) {
            let sum = 0;
            let count = 0;
            for (let i = -smoothRadius; i <= smoothRadius; i++) {
              const idx = x + i;
              if (idx >= 0 && idx < buffer.length) {
                sum += buffer[idx] ?? 0;
                count++;
              }
            }
            const level = count > 0 ? sum / count : 0;
            const amp = Math.min(1, level * 2.2) * maxAmp;
            const barH = Math.max(minBarH, amp);
            const top = h - barH;
            ctx2d.fillRect(x, top, barWidth, barH);
          }
          ctx2d.setTransform(1, 0, 0, 1, 0, 0);

          rafRef.current = requestAnimationFrame(tick);
        }
        rafRef.current = requestAnimationFrame(tick);
      })
      .catch(() => initStrip(container.clientWidth || 200));

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafRef.current);
      resizeObserverRef.current?.disconnect();
      resizeObserverRef.current = null;
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
      ctxRef.current?.close();
      ctxRef.current = null;
      analyserRef.current = null;
      timeDataRef.current = null;
      stripBufferRef.current = [];
    };
  }, [active]);

  if (!active) return null;

  return (
    <div ref={containerRef} className="flex-1 min-w-0 h-6 flex items-center px-3">
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
        style={{ maxHeight: 24 }}
        aria-hidden
      />
    </div>
  );
}

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

interface HomeInputBarProps {
  onSend?: (message: string) => void | Promise<void>;
  disabled?: boolean;
}

export function HomeInputBar({ onSend, disabled = false }: HomeInputBarProps) {
  const [value, setValue] = useState("");
  const [interim, setInterim] = useState("");
  const [isDictating, setIsDictating] = useState(false);
  const [dictationSupported, setDictationSupported] = useState(true);
  const recognitionRef = useRef<DictationRecognition | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

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
      setTimeout(() => {
        const el = inputRef.current;
        if (!el) return;
        el.focus();
        const len = el.value.length;
        el.setSelectionRange(len, len);
      }, 0);
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
    setTimeout(() => {
      const el = inputRef.current;
      if (!el) return;
      el.focus();
      const len = el.value.length;
      el.setSelectionRange(len, len);
    }, 0);
  }

  async function handleSend() {
    const trimmed = value.trim();
    if (!trimmed) return;
    setValue("");
    await onSend?.(trimmed);
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
      <div className="min-w-0">
        <input
          ref={inputRef}
          type="text"
          value={displayValue}
          onChange={(e) => !isDictating && setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              void handleSend();
            }
          }}
          placeholder={isDictating ? undefined : PLACEHOLDER}
          readOnly={isDictating}
          className="min-w-0 w-full bg-transparent text-base leading-normal outline-none placeholder:font-normal py-1"
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
                disabled={disabled}
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
          <>
            <VoiceWaveformStrip active={true} />
            <button
              type="button"
              onClick={handleEndDictation}
              className="h-6 shrink-0 rounded-[6px] px-3 text-base font-medium flex items-center transition-all duration-150 hover:opacity-90 active:scale-95"
              style={{ backgroundColor: "#000", color: "white" }}
            >
              End
            </button>
          </>
        )}
      </div>
    </div>
  );
}
