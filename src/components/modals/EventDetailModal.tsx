"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { EventItem } from "@/types/academy";
import { TBA, REGISTRATION_URL } from "@/data/academyData";

interface EventDetailModalProps {
  event: EventItem | null;
  onClose: () => void;
}

export function EventDetailModal({ event, onClose }: EventDetailModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!event) return;

    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab" && containerRef.current) {
        const focusables = containerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length > 0) {
          const first = focusables[0];
          const last = focusables[focusables.length - 1];

          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [event]);

  if (!event) return null;

  return (
    <div
      className="evf"
      id="evf"
      role="dialog"
      aria-modal="true"
      aria-labelledby="evfTitle"
      ref={containerRef}
    >
      <button
        className="evf-x"
        type="button"
        onClick={onClose}
        aria-label="Close event details"
        ref={closeButtonRef}
      >
        &times;
      </button>

      <div className="evf-in">
        <div className="evf-img">
          <Image
            src={event.img}
            alt={event.t}
            width={800}
            height={600}
            priority
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "100svh",
              objectFit: "contain",
            }}
          />
        </div>

        <div className="evf-body">
          <p className="eyebrow">Lenienttree event</p>
          <h2 id="evfTitle">{event.t}</h2>

          <dl className="facts" id="evfFacts">
            <div className="frow">
              <dt>Venue</dt>
              <dd className={event.venue === TBA ? "tba" : ""}>
                {event.venue}
              </dd>
            </div>
            <div className="frow">
              <dt>Date</dt>
              <dd className={event.date === TBA ? "tba" : ""}>
                {event.date}
              </dd>
            </div>
          </dl>

          <p className="evf-about" id="evfAbout">
            {event.about}
          </p>

          <div className="cta-row">
            <a
              className="btn"
              href={REGISTRATION_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Join the next event &rarr;
            </a>
            <button className="btn line" type="button" onClick={onClose}>
              Back to events
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

