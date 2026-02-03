"use client";

import { useId } from "react";

const AVATAR_SIZE = 40;
const AVATAR_GRAY = "#d9d9d9";
const STATUS_GREEN = "#91d524";
const STATUS_BORDER = "#044834";
const STATUS_SIZE = 6;

interface UserAvatarProps {
  src?: string | null;
  size?: number;
  showStatus?: boolean;
  className?: string;
}

export function UserAvatar({
  src,
  size = AVATAR_SIZE,
  showStatus = true,
  className = "",
}: UserAvatarProps) {
  const scale = size / AVATAR_SIZE;
  const statusSize = STATUS_SIZE * scale;
  const statusX = 31 * scale;
  const statusY = 3 * scale;
  const radius = (AVATAR_SIZE / 2) * scale;
  const center = radius;
  const clipId = useId();

  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
        aria-hidden
      >
        <defs>
          <clipPath id={clipId}>
            <circle cx={center} cy={center} r={radius} />
          </clipPath>
        </defs>
        <g clipPath={`url(#${clipId})`}>
          {src ? (
            <image
              href={src}
              x={0}
              y={0}
              width={size}
              height={size}
              preserveAspectRatio="xMidYMid slice"
            />
          ) : (
            <rect
              width={size}
              height={size}
              fill={AVATAR_GRAY}
            />
          )}
        </g>
        {showStatus && (
          <>
            <circle
              cx={statusX + statusSize / 2}
              cy={statusY + statusSize / 2}
              r={statusSize / 2 + 2}
              fill={STATUS_BORDER}
            />
            <circle
              cx={statusX + statusSize / 2}
              cy={statusY + statusSize / 2}
              r={statusSize / 2}
              fill={STATUS_GREEN}
            />
          </>
        )}
      </svg>
    </div>
  );
}
