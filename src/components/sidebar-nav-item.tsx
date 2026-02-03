import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FaIcon } from "@/components/fa-icon";
import { Tooltip } from "@/components/tooltip";

const ACTIVE_BG = "rgba(233, 251, 197, 0.1)";

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
  const style = active ? { backgroundColor: ACTIVE_BG } : undefined;
  const icon = (
    <FaIcon
      icon={active ? iconSolid : iconRegular}
      className={`h-4 w-4 ${active ? "opacity-100" : "opacity-80"}`}
    />
  );
  return (
    <Tooltip content={label} side="right" sideOffset={4} triggerClassName="w-10 h-10">
      {onClick ? (
        <button type="button" className={className} style={style} onClick={onClick}>
          {icon}
        </button>
      ) : (
        <a href={href} className={className} style={style}>
          {icon}
        </a>
      )}
    </Tooltip>
  );
}
