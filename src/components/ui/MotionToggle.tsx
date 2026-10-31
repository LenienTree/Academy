"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  if (typeof window === "undefined" || !window.matchMedia) {
    return () => {};
  }
  try {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    } else if ("addListener" in mql) {
      // Legacy Safari / mobile WebKit support
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (mql as any).addListener(callback);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return () => (mql as any).removeListener(callback);
    }
  } catch {
    // Fallback if matchMedia throws
  }
  return () => {};
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined" || !window.matchMedia) {
    return false;
  }
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

function getServerSnapshot() {
  return false;
}

export function MotionToggle() {
  const prefersReduced = useSyncExternalStore(
    subscribe,
    getReducedMotionSnapshot,
    getServerSnapshot
  );

  const [manualPause, setManualPause] = useState<boolean | null>(null);

  const isPaused = manualPause !== null ? manualPause : prefersReduced;

  useEffect(() => {
    document.body.classList.toggle("still", isPaused);

    // Notify listeners across the application
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("motionToggle", { detail: { isPaused } })
      );
    }

    const vid = document.getElementById("heroVid") as HTMLVideoElement | null;
    if (vid) {
      if (isPaused) {
        vid.pause();
      } else {
        vid.play().catch(() => {});
      }
    }
  }, [isPaused]);

  const toggleMotion = () => {
    const next = !isPaused;
    setManualPause(next);
    document.body.classList.toggle("still", next);

    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("motionToggle", { detail: { isPaused: next } })
      );
    }

    const vid = document.getElementById("heroVid") as HTMLVideoElement | null;
    if (vid) {
      if (next) {
        vid.pause();
      } else {
        vid.play().catch(() => {});
      }
    }
  };

  return (
    <button
      className="motion-toggle fixed right-4 bottom-[calc(16px+env(safe-area-inset-bottom,0px))] z-[9999] bg-cream border-[1.5px] border-ink text-ink font-ui font-semibold text-[12px] leading-none px-3.5 py-2.5 min-h-[40px] cursor-pointer hover:bg-ink hover:text-cream transition-colors active:scale-95"
      id="motion"
      type="button"
      aria-pressed={isPaused}
      onClick={toggleMotion}
      onTouchEnd={(e) => {
        e.preventDefault();
        toggleMotion();
      }}
    >
      {isPaused ? "Play motion" : "Pause motion"}
    </button>
  );
}
