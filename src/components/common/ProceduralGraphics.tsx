import React from "react";
import { avatar, scene } from "@/lib/graphics";

interface GraphicProps {
  seed?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function AvatarGraphic({ seed = 1, className, style }: GraphicProps) {
  const svgHtml = avatar(seed);
  return (
    <div
      className={className}
      style={style}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: svgHtml }}
    />
  );
}

export function SceneGraphic({ seed = 1, className, style }: GraphicProps) {
  const svgHtml = scene(seed);
  return (
    <div
      className={className}
      style={style}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: svgHtml }}
    />
  );
}
