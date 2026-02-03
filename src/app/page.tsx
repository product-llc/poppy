import { Logo } from "@/components/logo";
import { SidebarNavItem } from "@/components/sidebar-nav-item";
import {
  faCirclePlus,
  faMagnifyingGlass,
  faHouse,
  faComment,
  faFileLines,
  faBell,
} from "@fortawesome/pro-solid-svg-icons";
import {
  faCirclePlus as faCirclePlusRegular,
  faMagnifyingGlass as faMagnifyingGlassRegular,
  faHouse as faHouseRegular,
  faComment as faCommentRegular,
  faFileLines as faFileLinesRegular,
  faBell as faBellRegular,
} from "@fortawesome/pro-regular-svg-icons";

const SIDEBAR_BG = "#044834";
const MAIN_BG = "#fff6eb";
const STATUS_GREEN = "#91d524";

const navTop = [
  { iconRegular: faCirclePlusRegular, iconSolid: faCirclePlus, label: "Add" },
  { iconRegular: faMagnifyingGlassRegular, iconSolid: faMagnifyingGlass, label: "Search" },
];
const navMain = [
  { iconRegular: faHouseRegular, iconSolid: faHouse, label: "Home", active: true },
  { iconRegular: faCommentRegular, iconSolid: faComment, label: "Messages" },
  { iconRegular: faFileLinesRegular, iconSolid: faFileLines, label: "Files" },
  { iconRegular: faBellRegular, iconSolid: faBell, label: "Notifications" },
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
            <SidebarNavItem
              key={item.label}
              iconRegular={item.iconRegular}
              iconSolid={item.iconSolid}
              label={item.label}
              active={item.active}
            />
          ))}
        </div>
        <div className="flex flex-col gap-0">
          {navMain.map((item) => (
            <SidebarNavItem
              key={item.label}
              iconRegular={item.iconRegular}
              iconSolid={item.iconSolid}
              label={item.label}
              active={item.active}
            />
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
