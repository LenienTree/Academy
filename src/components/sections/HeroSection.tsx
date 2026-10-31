"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { REGISTRATION_URL } from "@/data/academyData";

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const checkMotion = () => {
      const isStill = document.body.classList.contains("still");
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (isStill || prefersReduced) {
        video.pause();
      } else {
        video.play().catch(() => {
          // Autoplay policy fallback
        });
      }
    };

    // Initial evaluation
    checkMotion();

    // Observe body class changes (e.g. from MotionToggle)
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === "attributes" && m.attributeName === "class") {
          checkMotion();
        }
      }
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Listen to prefers-reduced-motion media query
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMql = () => checkMotion();
    mql.addEventListener("change", handleMql);

    return () => {
      observer.disconnect();
      mql.removeEventListener("change", handleMql);
    };
  }, []);

  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div>
          <p className="eyebrow">FullStack + AI · Live program</p>
          <h1 style={{ textWrap: "balance" }}>
            Learn it live.
            <br />
            Build it <em>real.</em>
          </h1>
          <p className="sub text-ink60 mt-4">
            Practical knowledge from founders and industry mentors. Seventeen days
            of theory, thirteen days of building.
          </p>
          <div className="cta-row">
            <a
              className="btn reg"
              href={REGISTRATION_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Join FullStack+AI
            </a>
            <Link className="btn line" href="/#story">
              See the pathway →
            </Link>
          </div>
          <p className="scrollhint">
            <i aria-hidden="true" />
            Scroll. The sprout grows with you.
          </p>
        </div>

        <div className="vid">
          <div className="vid-frame">
            <video
              ref={videoRef}
              id="heroVid"
              src="/assets/hero.mp4"
              poster="/assets/hero-poster.jpg"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-label="Video: the Lenienttree launch event at Rajagiri, Kochi"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
