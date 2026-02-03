"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "@/components/logo";
import { useChat } from "@/lib/chat-context";
import { SidebarNavItem } from "@/components/sidebar-nav-item";
import { SidebarChats } from "@/components/sidebar-chats";
import { AvatarMenu } from "@/components/avatar-menu";
import { SearchModal } from "@/components/search-modal";
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

const navTop = [
  {
    iconRegular: faCirclePlusRegular,
    iconSolid: faCirclePlus,
    label: "New chat",
    href: "/chat",
    onClickNewChat: true,
  },
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
  const router = useRouter();
  const { createChat } = useChat();

  return (
    <>
      <div
        className="flex h-screen w-full overflow-hidden"
        style={{ backgroundColor: "var(--main-bg)" }}
      >
        <aside
          className="flex h-full shrink-0 overflow-hidden"
          style={{ backgroundColor: "var(--sidebar-bg)" }}
        >
          <div className="flex w-16 shrink-0 flex-col items-center gap-4 py-3">
            <Link href="/" className="flex h-10 w-10 items-center justify-center">
              <Logo width={32} height={32} className="opacity-80" />
            </Link>
            <nav className="flex flex-1 flex-col gap-1">
              {navTop.map((item) => (
                <SidebarNavItem
                  key={item.label}
                  iconRegular={item.iconRegular}
                  iconSolid={item.iconSolid}
                  label={item.label}
                  href={"href" in item && !("onClickNewChat" in item && item.onClickNewChat) ? item.href : undefined}
                  onClick={
                    item.label === "Search"
                      ? () => setSearchOpen(true)
                      : "onClickNewChat" in item && item.onClickNewChat
                        ? () => {
                            createChat();
                            router.push("/chat");
                          }
                        : undefined
                  }
                />
              ))}
              <div className="my-1 border-t border-white/10" />
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
            </nav>
            <AvatarMenu avatarSrc="/avatar.png" />
          </div>
          {pathname === "/chat" && (
            <div
              className="flex w-52 min-w-0 flex-1 flex-col border-l border-white/10"
              style={{ backgroundColor: "var(--sidebar-panel-bg)" }}
            >
              <SidebarChats />
            </div>
          )}
        </aside>
        <main
          className="flex min-h-0 flex-1 flex-col gap-8 overflow-auto"
          style={{ backgroundColor: "var(--main-bg)" }}
        >
          {children}
        </main>
      </div>
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
