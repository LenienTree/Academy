"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { TestimonialItem } from "@/types/academy";
import { AvatarGraphic } from "@/components/common/ProceduralGraphics";
import { INSVG } from "@/data/academyData";

interface TestimonialModalProps {
  testimonial: TestimonialItem | null;
  onClose: () => void;
}

export function TestimonialModal({
  testimonial,
  onClose,
}: TestimonialModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!testimonial) return;

    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab" && cardRef.current) {
        const focusables = cardRef.current.querySelectorAll<HTMLElement>(
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
  }, [testimonial]);

  if (!testimonial) return null;

  return (
    <div
      className="pop"
      id="pop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="popName"
    >
      <div className="scrim" onClick={onClose} aria-hidden="true" />
      <div className="pop-card" ref={cardRef}>
        <button
          className="pop-x"
          type="button"
          onClick={onClose}
          aria-label="Close review"
          ref={closeButtonRef}
        >
          &times;
        </button>
        <div className="pop-img" id="popImg">
          {testimonial.img ? (
            <Image
              src={testimonial.img}
              alt={testimonial.name}
              width={424}
              height={444}
              unoptimized={testimonial.img.startsWith("http")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "50% 18%",
              }}
            />
          ) : (
            <AvatarGraphic seed={testimonial.avatarSeed || 1} />
          )}
        </div>
        <div className="pop-body">
          {!testimonial.img && (
            <span className="pop-note" id="popNote">
              Sample text · replace with the student&apos;s own words
            </span>
          )}
          {/* Dynamic Star Rating */}
          <div
            className="stars text-tangerine text-lg tracking-widest font-sans"
            role="img"
            aria-label={`${Math.min(5, Math.max(1, testimonial.stars ?? 5))} out of 5 stars`}
          >
            {'★'.repeat(Math.min(5, Math.max(1, testimonial.stars ?? 5)))}
            {'☆'.repeat(5 - Math.min(5, Math.max(1, testimonial.stars ?? 5)))}
          </div>
          <blockquote id="popQuote">
            “{testimonial.q || testimonial.quote}”
          </blockquote>
          <div className="who">
            <div>
              <b id="popName">{testimonial.name}</b>
              <span id="popRole">{testimonial.course || testimonial.role}</span>
              {testimonial.college && (
                <span id="popCol">{testimonial.college}</span>
              )}
            </div>
            {testimonial.li && (
              <a
                className="inlink"
                href={testimonial.li}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${testimonial.name} on LinkedIn`}
                dangerouslySetInnerHTML={{ __html: INSVG }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
