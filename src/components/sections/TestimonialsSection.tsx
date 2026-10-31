"use client";

import React from "react";
import Image from "next/image";
import { TESTIMONIALS, INSVG } from "@/data/academyData";
import { AvatarGraphic } from "@/components/common/ProceduralGraphics";
import { Marquee } from "@/components/ui/Marquee";
import { useModal } from "@/context/ModalContext";

export function TestimonialsSection() {
  const { openTestimonialModal } = useModal();

  return (
    <section className="sec" id="voices">
      <div className="wrap sec-head reveal">
        <p className="eyebrow">Testimonials</p>
        <h2 className="h2">What students say</h2>
        <p className="lede">Tap a face to read their words.</p>
      </div>

      <Marquee id="t-testi" duration={56}>
        {TESTIMONIALS.map((t, i) => (
          <div key={`testi-${i}`} className="tcard">
            <button
              className="timg"
              type="button"
              data-i={i}
              aria-label={`Read ${t.name}’s review`}
              onClick={(e) => openTestimonialModal(t, e.currentTarget)}
            >
              {t.img ? (
                <Image
                  src={t.img}
                  alt={t.name}
                  width={424}
                  height={444}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <AvatarGraphic seed={t.avatarSeed || i + 1} />
              )}
              <span className="tread">Read</span>
            </button>
            <div className="tmeta">
              <div className="tinfo">
                <span className="tname">{t.name}</span>
                <span className="trole">{t.course}</span>
                <span className="trole">{t.college}</span>
              </div>
              {t.li && (
                <a
                  className="inlink"
                  href={t.li}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${t.name} on LinkedIn`}
                  dangerouslySetInnerHTML={{ __html: INSVG }}
                />
              )}
            </div>
          </div>
        ))}
      </Marquee>
    </section>
  );
}
