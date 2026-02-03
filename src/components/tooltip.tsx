"use client";

import { createPortal } from "react-dom";
import { useRef, useState, useCallback, useEffect } from "react";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  side?: "right" | "left" | "top" | "bottom";
  sideOffset?: number;
  triggerClassName?: string;
}

const TOOLTIP_BG = "#1c1c20";

export function Tooltip({
  content,
  children,
  side = "right",
  sideOffset = 4,
  triggerClassName,
}: TooltipProps) {
  const triggerRef = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ left: 0, top: 0, transform: "translateY(-50%)" });

  const updatePosition = useCallback(() => {
    const el = triggerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const gap = sideOffset;
    let left = 0;
    let top = rect.top + rect.height / 2;
    let transform = "translateY(-50%)";
    if (side === "right") {
      left = rect.right + gap;
    } else if (side === "left") {
      left = rect.left - gap;
      transform = "translate(-100%, -50%)";
    } else if (side === "top") {
      left = rect.left + rect.width / 2;
      top = rect.top - gap;
      transform = "translate(-50%, -100%)";
    } else {
      left = rect.left + rect.width / 2;
      top = rect.bottom + gap;
      transform = "translateX(-50%)";
    }
    setCoords({ left, top, transform });
  }, [side, sideOffset]);

  const show = useCallback(() => {
    setVisible(true);
    updatePosition();
  }, [updatePosition]);

  const hide = useCallback(() => setVisible(false), []);

  useEffect(() => {
    if (!visible) return;
    updatePosition();
    const onScroll = () => updatePosition();
    window.addEventListener("scroll", onScroll, true);
    return () => window.removeEventListener("scroll", onScroll, true);
  }, [visible, updatePosition]);

  const tooltipEl =
    typeof document !== "undefined" &&
    visible &&
    createPortal(
      <span
        className="fixed z-50 whitespace-nowrap rounded-lg px-2 py-1 text-sm text-white opacity-100 transition-opacity duration-150 pointer-events-none"
        style={{
          backgroundColor: TOOLTIP_BG,
          left: coords.left,
          top: coords.top,
          transform: coords.transform,
        }}
        role="tooltip"
      >
        {content}
      </span>,
      document.body
    );

  return (
    <>
      <span
        ref={triggerRef}
        className={`inline-flex shrink-0 ${triggerClassName ?? ""}`}
        onMouseEnter={show}
        onMouseLeave={hide}
      >
        {children}
      </span>
      {tooltipEl}
    </>
  );
}
