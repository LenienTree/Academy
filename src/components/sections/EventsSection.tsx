"use client";

import React from "react";
import Image from "next/image";
import { EVENTS, TBA } from "@/data/academyData";
import { Marquee } from "@/components/ui/Marquee";
import { useModal } from "@/context/ModalContext";
import type { EventItem as DbEventItem } from "@/types/database";
import type { EventItem } from "@/types/academy";

interface EventsSectionProps {
  events?: (DbEventItem | EventItem)[];
}

export function EventsSection({ events }: EventsSectionProps = {}) {
  const { openEventModal } = useModal();

  const items: EventItem[] =
    events && events.length > 0
      ? events.map((e, idx) => {
          if ("is_published" in e) {
            return {
              id: e.id,
              t: e.title,
              title: e.title,
              venue: e.venue,
              date: e.date,
              about: e.about,
              details: e.about,
              img: e.image_url || "/assets/events/campus-event-1.jpg",
              sceneSeed: idx + 1,
            };
          }
          return e;
        })
      : EVENTS;

  return (
    <section className="sec deep" id="events">
      <div className="wrap sec-head reveal">
        <p className="eyebrow">On the ground</p>
        <h2 className="h2">Our Events</h2>
        <p className="lede">
          Hackathons, ideathons, webinars and offline programs, run with real
          people in real rooms.
        </p>
      </div>

      <Marquee id="t-events" duration={64}>
        {items.map((event, i) => (
          <button
            key={`event-${event.id ?? i}`}
            className="ecard"
            type="button"
            data-i={i}
            aria-label={`View details for ${event.t}`}
            onClick={(e) => openEventModal(event, e.currentTarget)}
          >
            <span className="eimg">
              <Image
                src={event.img}
                alt={event.t}
                width={360}
                height={240}
                loading="lazy"
                unoptimized={event.img.startsWith("http")}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <span className="tread">View</span>
            </span>
            <span className="etitle">{event.t}</span>
            <span className="esub">
              {event.venue !== TBA ? event.venue : "Tap for details"}
            </span>
          </button>
        ))}
      </Marquee>

      <div className="wrap center-btn">
        <a
          className="btn"
          href="https://www.lenienttree.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Explore →
        </a>
      </div>
    </section>
  );
}
