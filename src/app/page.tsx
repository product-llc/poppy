import { FaIcon } from "@/components/fa-icon";
import { Logo } from "@/components/logo";
import {
  faHouse,
  faChartSimple,
  faCompass,
  faMessage,
  faGear,
  faCircleQuestion,
} from "@fortawesome/pro-solid-svg-icons";

const SIDEBAR_BG = "#044834";
const MAIN_BG = "#fff6eb";
const ACTIVE_BG = "rgba(233, 251, 197, 0.1)";
const STATUS_GREEN = "#91d524";

const navTop = [
  { icon: faChartSimple, label: "Dashboard" },
  { icon: faCompass, label: "Explore" },
];
const navMain = [
  { icon: faHouse, label: "Home", active: true },
  { icon: faMessage, label: "Messages" },
  { icon: faGear, label: "Settings" },
  { icon: faCircleQuestion, label: "Help" },
];

function Sidebar() {
  return (
    <aside
      className="flex w-16 shrink-0 flex-col items-center gap-4 py-3"
      style={{ backgroundColor: SIDEBAR_BG, minHeight: "100vh" }}
    >
      <div className="flex h-10 w-10 items-center justify-center">
        <Logo width={32} height={32} className="opacity-80" />
      </div>
      <nav className="flex flex-1 flex-col gap-4">
        <div className="flex flex-col gap-0">
          {navTop.map((item) => (
            <a
              key={item.label}
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-lg text-white/80 transition-opacity hover:opacity-100"
              title={item.label}
            >
              <FaIcon icon={item.icon} className="h-4 w-4" />
            </a>
          ))}
        </div>
        <div className="flex flex-col gap-0">
          {navMain.map((item) => (
            <a
              key={item.label}
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-lg text-white transition-opacity hover:opacity-100"
              style={item.active ? { backgroundColor: ACTIVE_BG } : undefined}
              title={item.label}
            >
              <FaIcon
                icon={item.icon}
                className={`h-4 w-4 ${item.active ? "opacity-100" : "opacity-80"}`}
              />
            </a>
          ))}
        </div>
      </nav>
      <div className="relative h-10 w-10 shrink-0">
        <div
          className="h-10 w-10 overflow-hidden rounded-full"
          style={{ backgroundColor: "#d9d9d9" }}
        >
          <div className="h-full w-full bg-[#d9d9d9]" />
        </div>
        <span
          className="absolute bottom-0 right-0 h-1.5 w-1.5 rounded-full border-2 border-[#044834]"
          style={{ backgroundColor: STATUS_GREEN }}
        />
      </div>
    </aside>
  );
}

export default function Home() {
  return (
    <div
      className="flex min-h-screen w-full"
      style={{ backgroundColor: "#fff" }}
    >
      <Sidebar />
      <main
        className="flex flex-1 flex-col gap-8"
        style={{ backgroundColor: MAIN_BG, minHeight: "100vh" }}
      />
    </div>
  );
}
