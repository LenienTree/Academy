"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SPEAKERS, JUDGES } from "@/data/academyData";
import { AvatarGraphic } from "@/components/common/ProceduralGraphics";
import { Marquee } from "@/components/ui/Marquee";
import type {
  SpeakerItem as DbSpeakerItem,
  JudgeItem as DbJudgeItem,
} from "@/types/database";
import type { SpeakerItem, JudgeItem } from "@/types/academy";

interface SpeakersJudgesSectionProps {
  speakers?: (DbSpeakerItem | SpeakerItem)[];
  judges?: (DbJudgeItem | JudgeItem)[];
}

function PersonAvatar({
  src,
  name,
  seed,
}: {
  src?: string | null;
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
      width={240}
      height={240}
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

export function SpeakersJudgesSection({
  speakers,
  judges,
}: SpeakersJudgesSectionProps = {}) {
  const speakerList =
    speakers && speakers.length > 0
      ? speakers.map((s, idx) => ({
          id: "id" in s ? String(s.id) : `speaker-${idx}`,
          name: s.name,
          role: "role_company" in s ? s.role_company : (s as SpeakerItem).role,
          image_url: "image_url" in s ? s.image_url : null,
          avatarSeed:
            "avatarSeed" in s && typeof s.avatarSeed === "number"
              ? s.avatarSeed
              : 20 + (idx % 6),
        }))
      : SPEAKERS.map((s, idx) => ({
          id: `speaker-${idx}`,
          name: s.name,
          role: s.role,
          image_url: null,
          avatarSeed: s.avatarSeed ?? (20 + (idx % 6)),
        }));

  const judgeList =
    judges && judges.length > 0
      ? judges.map((j, idx) => ({
          id: "id" in j ? String(j.id) : `judge-${idx}`,
          name: j.name,
          role: "role_company" in j ? j.role_company : (j as JudgeItem).role,
          image_url: "image_url" in j ? j.image_url : null,
          avatarSeed:
            "avatarSeed" in j && typeof j.avatarSeed === "number"
              ? j.avatarSeed
              : 40 + (idx % 6),
        }))
      : JUDGES.map((j, idx) => ({
          id: `judge-${idx}`,
          name: j.name,
          role: j.role,
          image_url: null,
          avatarSeed: j.avatarSeed ?? (40 + (idx % 6)),
        }));

  return (
    <>
      <section className="sec deep" id="speakers">
        <div className="wrap sec-head reveal">
          <p className="eyebrow">On stage</p>
          <h2 className="h2">Our previous speakers</h2>
        </div>
        <Marquee id="t-speakers" duration={52}>
          {speakerList.map((s) => (
            <article className="pcard2" key={s.id}>
              <div className="pimg2">
                <PersonAvatar
                  src={s.image_url}
                  name={s.name}
                  seed={s.avatarSeed}
                />
              </div>
              <b>{s.name}</b>
              <span>{s.role}</span>
            </article>
          ))}
        </Marquee>
      </section>

      <section className="sec" id="judges">
        <div className="wrap sec-head reveal">
          <p className="eyebrow">On the panel</p>
          <h2 className="h2">Our previous judges</h2>
        </div>
        <Marquee id="t-judges" duration={60}>
          {judgeList.map((j) => (
            <article className="pcard2" key={j.id}>
              <div className="pimg2">
                <PersonAvatar
                  src={j.image_url}
                  name={j.name}
                  seed={j.avatarSeed}
                />
              </div>
              <b>{j.name}</b>
              <span>{j.role}</span>
            </article>
          ))}
        </Marquee>
      </section>
    </>
  );
}
