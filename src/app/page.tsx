import Image from "next/image";
import { Logo } from "@/components/logo";

export default function HomePage() {
  const now = new Date();
  const { dateLabel, timeLabel } = getDateParts(now);
  const greeting = `${getGreeting(now)}, Alex`;

  return (
    <div className="flex flex-1 justify-center px-6 py-10 sm:px-12">
      <div className="flex w-full max-w-5xl flex-col gap-16">
        <section className="flex flex-col gap-8">
          <HeaderSection
            greeting={greeting}
            date={`${dateLabel} · ${timeLabel}`}
            weather="Clear skies over Oakland · 58°F with a light ocean breeze"
          />
          <HeroPanel />
          <ActionsGrid actions={ACTION_SHORTCUTS} />
          <SuggestionCard />
        </section>
        <ScheduleSection />
      </div>
    </div>
  );
}

function HeaderSection({ greeting, date, weather }: HeaderSectionProps) {
  return (
    <div className="flex flex-col gap-4">
      <div
        className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.35em]"
        style={{ color: "var(--foreground-secondary)" }}
      >
        <span>{greeting}</span>
        <Logo width={28} height={28} className="opacity-80" />
      </div>
      <p className="text-4xl font-semibold leading-tight" style={{ color: "var(--foreground)" }}>
        {date}
      </p>
      <p className="text-base" style={{ color: "var(--foreground-muted)" }}>
        {weather}
      </p>
    </div>
  );
}

function HeroPanel() {
  return (
    <div className="relative h-[300px] overflow-hidden rounded-3xl border bg-[#f8eedd]" style={{ borderColor: "rgba(15,11,7,0.06)" }}>
      <Image
        src="/window.svg"
        alt="Sunlit studio window"
        fill
        priority
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 640px"
      />
      <div className="absolute inset-0 bg-linear-to-br from-[#151211]/80 via-[#2b261f]/40 to-transparent" />
      <div className="relative z-10 flex h-full flex-col justify-between p-8 text-white">
        <div className="text-2xl font-semibold leading-snug">
          Everything ready for your focus block. Documents, agenda, and briefs are staged.
        </div>
        <div className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.3em]">
          <span>Morning Brief</span>
          <span className="h-px flex-1 bg-white/40" aria-hidden />
          <span className="text-lg">↗</span>
        </div>
      </div>
    </div>
  );
}

function ActionsGrid({ actions }: ActionsGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {actions.map((action) => (
        <button
          key={action.label}
          type="button"
          className="group flex items-center gap-4 rounded-2xl border bg-white/80 px-5 py-4 text-left shadow-[0_25px_80px_rgba(15,11,7,0.08)] transition hover:-translate-y-0.5"
          style={{ borderColor: "var(--border)" }}
        >
          <span
            className="flex h-10 w-10 items-center justify-center rounded-xl text-lg font-semibold"
            style={{ background: action.accent, color: action.accentFg }}
            aria-hidden
          >
            {action.icon}
          </span>
          <span className="flex flex-1 flex-col">
            <span className="text-sm font-semibold" style={{ color: "var(--foreground-secondary)" }}>
              {action.label}
            </span>
            <span className="text-xs" style={{ color: "var(--foreground-muted)" }}>
              {action.detail}
            </span>
          </span>
          <span className="text-base text-[rgba(20,17,14,0.4)] transition group-hover:translate-x-1" aria-hidden>
            ↗
          </span>
        </button>
      ))}
    </div>
  );
}

function SuggestionCard() {
  return (
    <div className="flex flex-col gap-4 rounded-3xl bg-white px-6 py-5 shadow-[0_25px_80px_rgba(15,11,7,0.08)]">
      <p className="text-sm leading-relaxed" style={{ color: "var(--foreground-secondary)" }}>
        Ask Poppy to summarize yesterday&apos;s launches or draft a welcome note for the new vendor intake.
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex flex-1 items-center gap-3 text-xs font-medium uppercase tracking-[0.4em]" style={{ color: "var(--foreground-muted)" }}>
          <span className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#f5ede4]" aria-hidden>
              •
            </span>
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#f5ede4]" aria-hidden>
              ◦
            </span>
          </span>
          <span>Hold space to talk</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold"
            style={{ borderColor: "var(--border)", color: "var(--foreground-secondary)" }}
            aria-label="Start voice capture"
          >
            ⌘
          </button>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border bg-foreground-secondary text-white"
            style={{ borderColor: "var(--foreground-secondary)" }}
            aria-label="Open composer"
          >
            ↑
          </button>
        </div>
      </div>
    </div>
  );
}

function ScheduleSection() {
  return (
    <section className="flex flex-col gap-8 rounded-3xl bg-white/90 p-8 shadow-[0_25px_80px_rgba(15,11,7,0.08)]">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold" style={{ color: "var(--foreground)" }}>
          Today&apos;s schedule
        </h2>
        <button
          type="button"
          className="flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm font-semibold"
          style={{ borderColor: "var(--border)", color: "var(--foreground-secondary)" }}
        >
          Full schedule
          <span aria-hidden>↗</span>
        </button>
      </div>
      <div className="grid gap-10 md:grid-cols-[auto,1fr]">
        <div className="flex flex-col gap-6 text-sm" style={{ color: "var(--foreground-secondary)" }}>
          {SCHEDULE_TIMES.map((entry) => (
            <div key={entry.time} className="flex items-baseline gap-1">
              <span className="text-lg font-semibold">{entry.hour}</span>
              <span className="text-xs uppercase tracking-[0.25em]">{entry.period}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          {SCHEDULE_ENTRIES.map((event) => (
            <div
              key={event.title}
              className="rounded-2xl p-6 text-white"
              style={{ background: event.background }}
            >
              <p className="text-sm uppercase tracking-[0.35em] opacity-80">{event.category}</p>
              <p className="text-xl font-semibold">{event.title}</p>
              <p className="text-sm opacity-80">{event.range}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function getGreeting(date: Date) {
  const hour = date.getHours();
  if (hour < 12) return "Morning";
  if (hour < 17) return "Afternoon";
  return "Evening";
}

function getDateParts(date: Date) {
  const dateLabel = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(date);
  const timeLabel = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
  return { dateLabel, timeLabel };
}

const ACTION_SHORTCUTS: ActionShortcut[] = [
  { label: "Design review prep", detail: "Reference sprint 14 notes", icon: "✷", accent: "#f6efe6", accentFg: "#2b251f" },
  { label: "North star brief", detail: "Share draft with partners", icon: "◇", accent: "#f0f5f9", accentFg: "#1a3a4c" },
  { label: "Ops handoff deck", detail: "Attach updated rollout plan", icon: "⌁", accent: "#f9eef5", accentFg: "#4a1a3c" },
  { label: "Outbound recap", detail: "Log 5 follow ups", icon: "↳", accent: "#eef8f3", accentFg: "#174030" },
  { label: "Finance packet", detail: "Highlight contract deltas", icon: "≡", accent: "#f7f2e9", accentFg: "#352a1b" },
  { label: "Share daily note", detail: "Send to leadership loop", icon: "✦", accent: "#f1f4fd", accentFg: "#1a1f4a" },
];

const SCHEDULE_TIMES = [
  { time: "08 AM", hour: "8", period: "AM" },
  { time: "09 AM", hour: "9", period: "AM" },
  { time: "10 AM", hour: "10", period: "AM" },
  { time: "11 AM", hour: "11", period: "AM" },
  { time: "12 PM", hour: "12", period: "PM" },
  { time: "01 PM", hour: "1", period: "PM" },
  { time: "02 PM", hour: "2", period: "PM" },
  { time: "03 PM", hour: "3", period: "PM" },
];

const SCHEDULE_ENTRIES: ScheduleEntry[] = [
  {
    title: "Platform partner sync",
    range: "09:00 AM — 09:45 AM",
    category: "Live",
    background: "linear-gradient(135deg,#0f6ab3,#0099c8)",
  },
  {
    title: "Studio walkthrough",
    range: "01:30 PM — 02:15 PM",
    category: "Field",
    background: "linear-gradient(135deg,#0f7b5f,#2ab07a)",
  },
];

interface HeaderSectionProps {
  greeting: string;
  date: string;
  weather: string;
}

interface ActionShortcut {
  label: string;
  detail: string;
  icon: string;
  accent: string;
  accentFg: string;
}

interface ActionsGridProps {
  actions: ActionShortcut[];
}

interface ScheduleEntry {
  title: string;
  range: string;
  category: string;
  background: string;
}
