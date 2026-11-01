"use client";

import React, { useState } from "react";
import Image from "next/image";
import { TESTIMONIALS, INSVG } from "@/data/academyData";
import { AvatarGraphic } from "@/components/common/ProceduralGraphics";
import { Marquee } from "@/components/ui/Marquee";
import { useModal } from "@/context/ModalContext";
import type { TestimonialItem as DbTestimonialItem } from "@/types/database";
import type { TestimonialItem } from "@/types/academy";

interface TestimonialsSectionProps {
  testimonials?: (DbTestimonialItem | TestimonialItem)[];
}

function TestimonialAvatar({
  src,
  name,
  seed,
}: {
  src?: string;
  name: string;
  seed: number;
}) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return <AvatarGraphic seed={seed} />;
  }

  return (
    <Image
      src={src}
      alt={name}
      width={424}
      height={444}
      loading="lazy"
      unoptimized={src.startsWith("http")}
      onError={() => setHasError(true)}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
  );
}

export function TestimonialsSection({
  testimonials,
}: TestimonialsSectionProps = {}) {
  const { openTestimonialModal } = useModal();

  const items: TestimonialItem[] =
    testimonials && testimonials.length > 0
      ? testimonials.map((t, idx) => {
          if ("role_course" in t) {
            return {
              id: t.id,
              name: t.name,
              course: t.role_course,
              role: t.role_course,
              college: t.college,
              q: t.quote,
              quote: t.quote,
              img: t.image_url || undefined,
              li: t.linkedin_url || undefined,
              stars: t.stars,
              avatarSeed: idx + 1,
            };
          }
          return {
            ...t,
            avatarSeed: t.avatarSeed || idx + 1,
          };
        })
      : TESTIMONIALS;

  return (
    <section className="sec" id="voices">
      <div className="wrap sec-head reveal">
        <p className="eyebrow">Testimonials</p>
        <h2 className="h2">What students say</h2>
        <p className="lede">Tap a face to read their words.</p>
      </div>

      <Marquee id="t-testi" duration={56}>
        {items.map((t, i) => (
          <div key={`testi-${t.id ?? i}`} className="tcard">
            <button
              className="timg"
              type="button"
              data-i={i}
              aria-label={`Read ${t.name}’s review`}
              onClick={(e) => openTestimonialModal(t, e.currentTarget)}
            >
              <TestimonialAvatar
                src={t.img}
                name={t.name}
                seed={t.avatarSeed || i + 1}
              />
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
