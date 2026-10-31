"use client";

import React, { useRef, useEffect } from "react";

interface MarqueeProps {
  id?: string;
  duration?: number;
  className?: string;
  children: React.ReactNode;
}

export function Marquee({
  id,
  duration = 60,
  className = "",
  children,
}: MarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clone = marqueeRef.current?.querySelector<HTMLElement>(
      '.set[aria-hidden="true"]'
    );
    if (clone) {
      const focusables = clone.querySelectorAll<HTMLElement>(
        "a, button, input, textarea, select, [tabindex]"
      );
      focusables.forEach((el) => {
        el.setAttribute("tabindex", "-1");
      });
    }
  }, [children]);

  return (
    <div
      ref={marqueeRef}
      className={`marquee ${className}`}
      style={{ "--dur": `${duration}s` } as React.CSSProperties}
    >
      <div className="track" id={id}>
        <div className="set">{children}</div>
        <div className="set" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
