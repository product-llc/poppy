import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import Link from "next/link";
import { FaIcon } from "@/components/fa-icon";
import { Tooltip } from "@/components/tooltip";


interface SidebarNavItemProps {
  iconRegular: IconDefinition;
  iconSolid: IconDefinition;
  label: string;
  active?: boolean;
  href?: string;
  onClick?: () => void;
}

export function SidebarNavItem({
  iconRegular,
  iconSolid,
  label,
  active = false,
  href = "#",
  onClick,
}: SidebarNavItemProps) {
  const className =
    "flex h-10 w-10 items-center justify-center rounded-lg text-white transition-[background-color,opacity] duration-200 hover:bg-white/10 hover:opacity-100";
  const style = active ? { backgroundColor: "var(--active-nav-bg)" } : undefined;
  const icon = (
    <FaIcon
      icon={active ? iconSolid : iconRegular}
      className={`h-4 w-4 text-white ${active ? "opacity-100" : "opacity-80"}`}
    />
  );
  return (
    <Tooltip content={label} side="right" sideOffset={4} triggerClassName="w-10 h-10">
      {onClick ? (
        <button type="button" className={className} style={style} onClick={onClick}>
          {icon}
        </button>
      ) : (
        <Link href={href} className={className} style={style}>
          {icon}
        </Link>
      )}
    </Tooltip>
  );
}
