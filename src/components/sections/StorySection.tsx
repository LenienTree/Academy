"use client";

import { useRef } from "react";
import { useGSAP, ScrollTrigger } from "@/lib/gsap";
import { STORY_STEPS } from "@/data/academyData";

interface StageConfig {
  at: number;
  label: string;
  side: 1 | -1;
  defaultX: number;
  defaultY: number;
}

const STAGES: StageConfig[] = [
  { at: 0.22, label: "Live", side: 1, defaultX: 185, defaultY: 470 },
  { at: 0.5, label: "Three programs", side: -1, defaultX: 165, defaultY: 345 },
  { at: 0.76, label: "Quality", side: 1, defaultX: 185, defaultY: 230 },
  { at: 0.97, label: "Pathway", side: -1, defaultX: 196, defaultY: 128 },
];

export function StorySection() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stemRef = useRef<SVGPathElement>(null);
  const nodesGRef = useRef<SVGGElement>(null);
  const crownRef = useRef<SVGGElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const ticksRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const stem = stemRef.current;
      const nodesG = nodesGRef.current;
      const crown = crownRef.current;
      const track = trackRef.current;
      if (!stem || !nodesG || !crown || !track) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // Clean existing nodes if any before adding to avoid duplication
      nodesG.innerHTML = "";

      let total = 460;
      try {
        if (typeof stem.getTotalLength === "function") {
          const l = stem.getTotalLength();
          if (l > 0) total = l;
        }
      } catch {
        total = 460;
      }

      const SVGNS = "http://www.w3.org/2000/svg";

      const plantParts = STAGES.map((st) => {
        let pt = { x: st.defaultX, y: st.defaultY };
        try {
          if (typeof stem.getPointAtLength === "function") {
            const p = stem.getPointAtLength(total * st.at);
            if (p && !isNaN(p.x) && !isNaN(p.y)) {
              pt = p;
            }
          }
        } catch {
          // Fallback coordinate
        }

        const ang = st.side > 0 ? -24 : 24;

        // Create leaf group
        const lw = document.createElementNS(SVGNS, "g");
        lw.innerHTML = `<g class="leaf" transform="translate(${pt.x.toFixed(1)} ${pt.y.toFixed(1)}) scale(${st.side} 1) rotate(${ang})"><path class="blade" d="M0 0C22 -38 66 -50 104 -40C94 -4 52 24 0 0Z"/><path class="vein" d="M6 -2C34 -16 66 -26 92 -34"/></g>`;
        const leafElement = lw.firstChild as SVGGElement;

        // Create node circle and label group
        const g = document.createElementNS(SVGNS, "g");
        g.setAttribute("class", "node");
        g.innerHTML = `<circle cx="${pt.x.toFixed(1)}" cy="${pt.y.toFixed(1)}" r="8"/><text x="${(pt.x + (st.side > 0 ? -20 : 20)).toFixed(1)}" y="${(pt.y + 4).toFixed(1)}" text-anchor="${st.side > 0 ? "end" : "start"}">${st.label}</text>`;

        nodesG.appendChild(g);
        nodesG.insertBefore(leafElement, nodesG.firstChild);

        return {
          at: st.at,
          node: g,
          leaf: leafElement,
        };
      });

      const stepEls = stepsRef.current?.querySelectorAll<HTMLElement>(".story-step");
      const tickEls = ticksRef.current?.querySelectorAll<HTMLElement>("i");

      const updateStory = (p: number) => {
        const isStill = document.body.classList.contains("still");
        if (isStill) return;

        const idx = Math.min(3, Math.max(0, Math.floor(p * 4)));

        stepEls?.forEach((s, i) => s.classList.toggle("on", i === idx));
        tickEls?.forEach((t, i) => t.classList.toggle("on", i === idx));

        const f = Math.min(1, 0.1 + 0.9 * p);
        stem.style.strokeDashoffset = String(1 - f);

        plantParts.forEach((pp) => {
          const on = f >= pp.at;
          pp.node.classList.toggle("on", on);
          pp.leaf.classList.toggle("on", on);
        });

        crown.classList.toggle("on", f >= 0.985);
      };

      if (prefersReduced) {
        updateStory(1);
        return;
      }

      // Initialize initial state at top
      updateStory(0);

      // 1. Native Bounding Rect scroll calculation (100% reliable on mobile touch & deceleration)
      let ticking = false;
      const onScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            const r = track.getBoundingClientRect();
            const span = r.height - window.innerHeight;
            const p = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0;
            updateStory(p);
            ticking = false;
          });
          ticking = true;
        }
      };

      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
      window.addEventListener("orientationchange", onScroll, { passive: true });

      // Run initial frame
      onScroll();

      // 2. GSAP ScrollTrigger for desktop scrub sync
      const st = ScrollTrigger.create({
        trigger: track,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          updateStory(self.progress);
        },
      });

      return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        window.removeEventListener("orientationchange", onScroll);
        st.kill();
      };
    },
    { scope: containerRef }
  );

  return (
    <section
      className="ink"
      id="story"
      aria-label="What is Lenienttree"
      ref={containerRef}
    >
      <div className="story-track" id="storyTrack" ref={trackRef}>
        <div className="stage wrap">
          <div>
            <div className="steps" id="steps" ref={stepsRef}>
              {STORY_STEPS.map((step, i) => {
                const mainTitle = step.italicWord
                  ? step.title.replace(step.italicWord, "").trim()
                  : step.title;
                return (
                  <div
                    key={`step-${i}`}
                    className={`story-step ${i === 0 ? "on" : ""}`}
                  >
                    <p className="eyebrow">{step.eyebrow}</p>
                    <h2>
                      {mainTitle} {step.italicWord && <em>{step.italicWord}</em>}
                    </h2>
                    <ol className="pts">
                      {step.points.map((pt, pti) => (
                        <li key={pti}>{pt}</li>
                      ))}
                    </ol>
                  </div>
                );
              })}
            </div>
            <div className="ticks" id="ticks" ref={ticksRef} aria-hidden="true">
              <i className="on" />
              <i />
              <i />
              <i />
            </div>
          </div>

          <div className="plant" aria-hidden="true">
            <svg
              viewBox="0 0 400 600"
              id="plant"
              preserveAspectRatio="xMidYMax meet"
              aria-hidden="true"
            >
              <rect
                x="40"
                y="566"
                width="320"
                height="2"
                fill="#F5EFE3"
                opacity=".3"
              />
              <path
                ref={stemRef}
                id="stem"
                pathLength={1}
                d="M200 566 C200 478 150 436 178 346 C206 256 160 206 196 124"
              />
              <g id="nodes" ref={nodesGRef} />
              <g id="crown" ref={crownRef}>
                <rect x="164" y="56" width="64" height="64" />
                <use href="#L" x="184" y="64" width="24" height="48" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
