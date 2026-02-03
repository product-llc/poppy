"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/logo";
import { SidebarNavItem } from "@/components/sidebar-nav-item";
import { SearchModal } from "@/components/search-modal";
import { UserAvatar } from "@/components/user-avatar";
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

const navTop = [
  { iconRegular: faCirclePlusRegular, iconSolid: faCirclePlus, label: "New chat", href: "/chat" },
  { iconRegular: faMagnifyingGlassRegular, iconSolid: faMagnifyingGlass, label: "Search" },
];
const navMain = [
  { iconRegular: faHouseRegular, iconSolid: faHouse, label: "Home", href: "/" },
  { iconRegular: faCommentRegular, iconSolid: faComment, label: "Chat", href: "/chat" },
  { iconRegular: faFileLinesRegular, iconSolid: faFileLines, label: "Files", href: "/files" },
  { iconRegular: faBellRegular, iconSolid: faBell, label: "Notifications", href: "/notifications" },
];

export function HomeShell({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <div
        className="flex min-h-screen w-full"
        style={{ backgroundColor: "#fff" }}
      >
        <aside
          className="flex w-16 shrink-0 flex-col items-center gap-4 py-3"
          style={{ backgroundColor: SIDEBAR_BG, minHeight: "100vh" }}
        >
          <Link href="/" className="flex h-10 w-10 items-center justify-center">
            <Logo width={32} height={32} className="opacity-80" />
          </Link>
          <nav className="flex flex-1 flex-col gap-4">
            <div className="flex flex-col gap-1">
              {navTop.map((item) => (
                <SidebarNavItem
                  key={item.label}
                  iconRegular={item.iconRegular}
                  iconSolid={item.iconSolid}
                  label={item.label}
                  href={"href" in item ? item.href : undefined}
                  onClick={item.label === "Search" ? () => setSearchOpen(true) : undefined}
                />
              ))}
            </div>
            <div className="flex flex-col gap-1">
              {navMain.map((item) => (
                <SidebarNavItem
                  key={item.label}
                  iconRegular={item.iconRegular}
                  iconSolid={item.iconSolid}
                  label={item.label}
                  href={item.href}
                  active={pathname === item.href}
                />
              ))}
            </div>
          </nav>
          <UserAvatar src="/avatar.png" size={40} showStatus />
        </aside>
        <main
          className="flex flex-1 flex-col gap-8"
          style={{ backgroundColor: MAIN_BG, minHeight: "100vh" }}
        >
          {children}
        </main>
      </div>
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
