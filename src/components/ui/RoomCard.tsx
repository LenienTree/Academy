"use client";

import React from "react";
import Image from "next/image";
import { RoomPerson } from "@/types/academy";
import { AvatarGraphic } from "@/components/common/ProceduralGraphics";

interface RoomCardProps {
  person: RoomPerson;
  isLifted: boolean;
  onToggleLift: () => void;
}

export function RoomCard({ person, isLifted, onToggleLift }: RoomCardProps) {
  return (
    <figure
      className={`rcard ${isLifted ? "lift" : ""}`}
      tabIndex={0}
      role="button"
      aria-pressed={isLifted}
      aria-label={`${person.name}, ${person.role}. Touch or press Enter to lift.`}
      onClick={onToggleLift}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggleLift();
        }
      }}
    >
      <div className="rimg">
        {person.img ? (
          <Image
            src={person.img}
            alt={`${person.name}, ${person.role}`}
            width={320}
            height={240}
            loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <AvatarGraphic seed={person.avatarSeed || 60} />
        )}
      </div>
      <figcaption>
        <b>{person.name}</b>
        <span>{person.role}</span>
      </figcaption>
    </figure>
  );
}

export const MentorCard = RoomCard;

