'use client';

import React, { useState } from 'react';

interface SafePreviewImageProps {
  src?: string | null;
  alt: string;
  className?: string;
  seedText?: string;
  type?: 'avatar' | 'event' | 'head';
}

export function SafePreviewImage({
  src,
  alt,
  className = '',
  seedText = '',
  type = 'avatar',
}: SafePreviewImageProps) {
  const [hasError, setHasError] = useState(false);

  // Generate deterministic colors based on string
  const hash = (seedText || alt || 'user')
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const bgColors = ['#EBDBCD', '#FE6500', '#19181D', '#EBDBCD'];
  const skinTones = ['#F1C9A5', '#D8A27A', '#B97B54', '#8D5A3B'];
  const hairColors = ['#19181D', '#3A2A22', '#5D5B62', '#7A4A2B'];

  const bg = bgColors[hash % bgColors.length];
  const skin = skinTones[hash % skinTones.length];
  const hair = hairColors[hash % hairColors.length];
  const isDarkBg = bg === '#19181D';
  const initial = (seedText || alt || 'L').charAt(0).toUpperCase();

  // If valid image provided and no load failure, render it
  if (src && !hasError && src.trim() !== '') {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className={className}
        onError={() => setHasError(true)}
      />
    );
  }

  // Fallback: Default Event Cover Poster
  if (type === 'event') {
    return (
      <div className={`w-full h-full bg-[#19181D] flex flex-col items-center justify-center p-4 relative overflow-hidden ${className}`}>
        <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-[#FE6500] opacity-30 rounded-full" />
        <span className="w-10 h-10 bg-[#FE6500] text-[#19181D] font-bold text-lg flex items-center justify-center mb-1">
          L
        </span>
        <span className="font-serif text-sm text-[#F5EFE3] text-center line-clamp-1">{alt || 'Academy Event'}</span>
        <span className="text-[10px] font-sans uppercase tracking-widest text-[#FE6500] mt-0.5">Lenienttree</span>
      </div>
    );
  }

  // Fallback: Default Person Avatar / State Head Portrait
  return (
    <div className={`w-full h-full relative overflow-hidden flex items-center justify-center ${className}`} style={{ backgroundColor: bg }}>
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {/* Shoulders */}
        <path
          d="M15 100 C15 75 35 68 50 68 C65 68 85 75 85 100 Z"
          fill={isDarkBg ? '#FE6500' : '#19181D'}
        />
        {/* Neck */}
        <rect x="44" y="58" width="12" height="14" fill={skin} />
        {/* Head */}
        <ellipse cx="50" cy="46" rx="16" ry="19" fill={skin} />
        {/* Hair */}
        <path
          d="M34 42 C32 25 41 20 50 20 C60 20 68 25 66 42 C63 34 58 31 50 31 C41 31 36 34 34 42 Z"
          fill={hair}
        />
        {/* Eyes */}
        <circle cx="44" cy="46" r="1.6" fill="#19181D" />
        <circle cx="56" cy="46" r="1.6" fill="#19181D" />
        {/* Smile */}
        <path
          d="M45 53 Q50 57 55 53"
          fill="none"
          stroke="#19181D"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
      {/* Monogram Overlay Badge */}
      <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-[#19181D] text-[#F5EFE3] text-[9px] font-sans font-bold flex items-center justify-center border border-[#F5EFE3]/40">
        {initial}
      </span>
    </div>
  );
}

