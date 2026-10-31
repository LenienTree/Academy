"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export function Header() {
  const progRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        scrollHeight > 0
          ? Math.min(1, Math.max(0, window.scrollY / scrollHeight))
          : 0;
      if (progRef.current) {
        progRef.current.style.transform = `scaleX(${progress})`;
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateProgress();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="top" id="top">
      <div className="wrap bar">
        <nav className="nav nl" aria-label="Main sections">
          <Link href="/#story">About</Link>
          <Link href="/#events">Events</Link>

        </nav>

        <Link
          href="/"
          className="lockup"
          aria-label="Lenienttree Academy, back to top"
        >
          <span className="tile">
            <svg viewBox="0 0 100 100" aria-hidden="true">
              <use
                href="#L"
                x="33"
                y="17"
                width="34"
                height="66"
                fill="#ffffff"
              />
            </svg>
          </span>
          <span className="wm">
            <b>Lenienttree</b>
            <i>ACADEMY</i>
          </span>
        </Link>

        <div className="nr">
          <nav className="nav" aria-label="More sections">
            <Link href="/#programs">Program</Link>
            <Link href="/#room">Experts</Link>
          </nav>
          <a
            className="btn reg"
            href="https://www.lenienttree.com/academy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Register
          </a>
        </div>
      </div>

      <nav className="nav-m" aria-label="Sections">
        <Link href="/#story">About</Link>
        <Link href="/#events">Events</Link>
        <Link href="/#programs">Program</Link>
        <Link href="/#room">Experts</Link>
      </nav>

      <div className="prog" aria-hidden="true">
        <span
          id="prog"
          ref={progRef}
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </header>
  );
}
