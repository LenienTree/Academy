"use client";

import { useState, useRef } from "react";
import { ROOM } from "@/data/academyData";
import { RoomCard } from "@/components/ui/RoomCard";
import { useGSAP, gsap } from "@/lib/gsap";

export function BeInTheRoomSection() {
  const [liftedCardId, setLiftedCardId] = useState<string | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  const toggleLift = (cardId: string) => {
    setLiftedCardId((current) => (current === cardId ? null : cardId));
  };

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const cols = containerRef.current?.querySelectorAll(".rlist");
        if (!cols) return;

        cols.forEach((col, i) => {
          gsap.fromTo(
            col,
            { y: i % 2 === 1 ? 24 : -24 },
            {
              y: i % 2 === 1 ? -24 : 24,
              ease: "none",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        });
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <section className="sec" id="room" ref={containerRef}>
      <div className="wrap">
        <div className="sec-head reveal">
          <p className="eyebrow">The room</p>
          <h2 className="h2">Be in the Room</h2>
          <p className="lede">
            Founders, academics and engineers, in the same room as you. Touch a
            card to lift it.
          </p>
        </div>

        <div className="room" id="roomGrid">
          {ROOM.map((col, ci) => (
            <div className="rcol" key={col.h || col.heading}>
              <h3>{col.h || col.heading}</h3>
              <div className="rlist" data-col={ci}>
                {(col.p || col.people).map((person, pi) => {
                  const cardId = `${ci}-${pi}`;
                  const isLifted = liftedCardId === cardId;

                  return (
                    <RoomCard
                      key={cardId}
                      person={person}
                      isLifted={isLifted}
                      onToggleLift={() => toggleLift(cardId)}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
