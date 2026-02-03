import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { HomeChatSection } from "@/components/home-chat-section";

export default function HomePage() {
  const now = new Date();
  const dateParts = {
    weekday: new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(now),
    month: new Intl.DateTimeFormat("en-US", { month: "long" }).format(now),
    day: new Intl.DateTimeFormat("en-US", { day: "numeric" }).format(now),
  };

  return (
    <div className="flex flex-1 justify-center px-6 py-10 sm:px-12">
      <div className="flex w-full max-w-5xl flex-col gap-12">
        <section className="flex flex-col gap-8">
          <HeaderSection
            dateParts={dateParts}
            weather="Areas of low clouds to start, otherwise, sunny 73º / 60º"
          />
          <HeroPanel />
          <HomeChatSection />
        </section>
        <ScheduleSection />
      </div>
    </div>
  );
}

const LOGO_SIZE = 32;
const LOGO_GAP = 8;

function HeaderSection({ dateParts, weather }: HeaderSectionProps) {
  return (
    <div
      className="relative"
      style={{
        marginLeft: -(LOGO_SIZE + LOGO_GAP),
        paddingLeft: LOGO_SIZE + LOGO_GAP,
      }}
    >
      <Logo
        width={LOGO_SIZE}
        height={LOGO_SIZE}
        variant="black"
        className="absolute left-0 top-0"
      />
      <div className="flex flex-col gap-2">
        <h1
          className="text-[32px] font-normal leading-8"
          style={{ color: "var(--foreground)" }}
        >
          Hi, Tina!
        </h1>
        <p
          className="text-[32px] leading-8"
          style={{ color: "var(--foreground)" }}
        >
          Today is {dateParts.weekday}, <span className="font-bold">{dateParts.month} {dateParts.day}</span>
        </p>
        <p
          className="text-[24px] font-normal leading-6"
          style={{ color: "var(--foreground-muted)" }}
        >
          {weather}
        </p>
      </div>
    </div>
  );
}

function HeroPanel() {
  return (
    <div
      className="relative aspect-[21/9] overflow-hidden rounded-3xl border bg-[#f8eedd]"
      style={{ borderColor: "rgba(15,11,7,0.06)" }}
    >
      <Image
        src="/poppies.png"
        alt="Poppy field under partly cloudy sky"
        fill
        priority
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 960px"
      />
    </div>
  );
}

function ScheduleSection() {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl font-semibold" style={{ color: "var(--foreground)" }}>
          Up next
        </h2>
        <Link
          href="/"
          className="text-base font-semibold transition hover:opacity-80"
          style={{ color: "var(--foreground-secondary)" }}
        >
          Full schedule &gt;
        </Link>
      </div>
      <div className="flex gap-6">
        <div
          className="flex shrink-0 flex-col gap-4 text-base"
          style={{ color: "var(--foreground-muted)" }}
        >
          <span className="font-medium">7 AM</span>
          <span className="font-medium">8 AM</span>
        </div>
        <div className="min-h-16 flex-1">
          <div
            className="rounded-xl px-4 py-3 text-white"
            style={{
              background: "linear-gradient(135deg,#0f6ab3,#0099c8)",
              minHeight: "3.5rem",
            }}
          >
            <p className="text-base font-semibold">Morning Prep & Arrival</p>
          </div>
        </div>
      </div>
    </section>
  );
}

interface HeaderSectionProps {
  dateParts: { weekday: string; month: string; day: string };
  weather: string;
}
