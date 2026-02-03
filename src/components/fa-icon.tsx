"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition, IconProp } from "@fortawesome/fontawesome-svg-core";

interface FaIconProps {
  icon: IconDefinition | IconProp;
  className?: string;
  size?: "xs" | "sm" | "lg" | "xl" | "2x" | "3x" | "4x" | "5x";
}

export function FaIcon({ icon, className, size }: FaIconProps) {
  return (
    <FontAwesomeIcon
      icon={icon}
      className={className}
      size={size}
    />
  );
}
