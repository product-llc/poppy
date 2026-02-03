import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FaIcon } from "@/components/fa-icon";

const ACTIVE_BG = "rgba(233, 251, 197, 0.1)";

interface SidebarNavItemProps {
  iconRegular: IconDefinition;
  iconSolid: IconDefinition;
  label: string;
  active?: boolean;
  href?: string;
}

export function SidebarNavItem({
  iconRegular,
  iconSolid,
  label,
  active = false,
  href = "#",
}: SidebarNavItemProps) {
  return (
    <a
      href={href}
      className="flex h-10 w-10 items-center justify-center rounded-lg text-white transition-[background-color,opacity] duration-200 hover:bg-white/10 hover:opacity-100"
      style={active ? { backgroundColor: ACTIVE_BG } : undefined}
      title={label}
    >
      <FaIcon
        icon={active ? iconSolid : iconRegular}
        className={`h-4 w-4 ${active ? "opacity-100" : "opacity-80"}`}
      />
    </a>
  );
}
