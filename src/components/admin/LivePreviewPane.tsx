'use client';

import React from 'react';
import { useDraft } from '@/context/DraftContext';
import { SafePreviewImage } from './SafePreviewImage';

export function LivePreviewPane() {
  const {
    viewportMode,
    setViewportMode,
    siteConfig,
    events,
    testimonials,
    stateHeads,
    speakers,
    judges,
  } = useDraft();

  const viewportWidths = {
    desktop: 'w-full',
    tablet: 'max-w-[768px]',
    mobile: 'max-w-[375px]',
  };

  return (
    <div className="flex-1 bg-[#19181D]/5 flex flex-col h-[calc(100vh-3.5rem)] overflow-hidden">
      {/* Viewport Control Bar */}
      <div className="h-12 bg-[#19181D] text-[#F5EFE3] px-6 flex items-center justify-between border-b border-[#F5EFE3]/10 flex-none">
        <div className="flex items-center gap-2">
          <span className="text-xs font-sans text-[#F5EFE3]/60 uppercase tracking-widest font-semibold">
            Live Draft Preview
          </span>
          <span className="text-[10px] bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 px-1.5 py-0.5 rounded uppercase font-mono">
            Reactive
          </span>
        </div>

        {/* Breakpoint Switcher */}
        <div className="flex items-center gap-1 bg-[#F5EFE3]/10 p-1 rounded">
          {(['desktop', 'tablet', 'mobile'] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setViewportMode(mode)}
              className={`px-3 py-1 text-xs font-sans capitalize rounded transition-colors ${
                viewportMode === mode
                  ? 'bg-[#FE6500] text-[#19181D] font-semibold'
                  : 'text-[#F5EFE3]/70 hover:text-[#F5EFE3]'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Preview Canvas Scroll Area */}
      <div className="flex-1 overflow-auto p-4 md:p-8 flex justify-center items-start">
        <div
          className={`${viewportWidths[viewportMode]} transition-all duration-300 bg-[#F5EFE3] text-[#19181D] border border-[#19181D]/30 shadow-2xl overflow-hidden min-h-[600px] mb-12`}
        >
          {/* Mock Browser Bar */}
          <div className="h-7 bg-[#EBDBCD] border-b border-[#19181D]/20 px-3 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 inline-block" />
            <span className="text-[10px] font-mono text-[#5D5B62] ml-2 truncate">
              https://lenienttree.com/academy (Draft Preview)
            </span>
          </div>

          <div className="p-6 md:p-10 space-y-14">
            {/* HERO SECTION PREVIEW */}
            <section className="space-y-4">
              <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.18em] text-[#5D5B62]">
                {siteConfig.eyebrow}
              </span>
              <h1 className="font-serif text-3xl md:text-5xl text-[#19181D] leading-[0.98] tracking-tight">
                {siteConfig.title}
              </h1>
              <p className="font-sans text-sm md:text-base text-[#5D5B62] max-w-xl leading-relaxed">
                {siteConfig.sub_text}
              </p>

              <div className="pt-2 flex gap-3">
                <a
                  href={siteConfig.reg_url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 bg-[#FE6500] text-[#19181D] font-sans font-semibold text-xs border border-[#FE6500] shadow-[2px_2px_0px_#19181D]"
                >
                  Join FullStack+AI
                </a>
              </div>

              {/* Hero Video */}
              <div className="relative mt-6 aspect-[9/16] max-h-[420px] w-full max-w-[280px] mx-auto bg-[#19181D] overflow-hidden border-2 border-[#19181D] shadow-[6px_6px_0px_#FE6500]">
                {siteConfig.hero_video_url ? (
                  <video
                    key={siteConfig.hero_video_url}
                    src={siteConfig.hero_video_url}
                    poster={siteConfig.hero_poster_url}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-[#F5EFE3]/50 font-sans">
                    No video configured
                  </div>
                )}
              </div>
            </section>

            {/* TESTIMONIALS SECTION PREVIEW */}
            <section className="pt-8 border-t border-[#19181D]/20 space-y-4">
              <div>
                <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.18em] text-[#5D5B62]">
                  Testimonials
                </span>
                <h2 className="font-serif text-2xl md:text-3xl text-[#19181D] mt-1">
                  What students say ({testimonials.length})
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {testimonials.map((t) => {
                  const count = Math.min(5, Math.max(1, t.stars ?? 5));
                  return (
                    <div key={t.id} className="p-4 bg-[#EBDBCD] border border-[#19181D]/25 flex flex-col justify-between gap-3">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-[#FE6500] tracking-widest font-sans">
                            {'★'.repeat(count)}
                            {'☆'.repeat(5 - count)}
                          </div>
                          {t.linkedin_url && (
                            <span className="w-5 h-5 bg-[#0A66C2] text-white rounded text-[10px] font-bold flex items-center justify-center">
                              in
                            </span>
                          )}
                        </div>
                        <blockquote className="font-serif text-sm italic text-[#19181D] leading-snug">
                          &ldquo;{t.quote}&rdquo;
                        </blockquote>
                      </div>

                      <div className="flex items-center gap-3 pt-2 border-t border-[#19181D]/15">
                        <div className="w-10 h-10 bg-[#19181D] rounded-full overflow-hidden flex-none relative">
                          <SafePreviewImage
                            src={t.image_url}
                            alt={t.name}
                            seedText={t.name}
                            type="avatar"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <b className="block font-serif text-sm truncate">{t.name}</b>
                          <span className="block text-[11px] text-[#5D5B62] font-sans truncate">{t.role_course}</span>
                          <span className="block text-[10px] text-[#5D5B62] font-sans truncate">{t.college}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* EVENTS SECTION PREVIEW */}
            <section className="pt-8 border-t border-[#19181D]/20 space-y-4">
              <div>
                <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.18em] text-[#5D5B62]">
                  On the ground
                </span>
                <h2 className="font-serif text-2xl md:text-3xl text-[#19181D] mt-1">
                  Our Events ({events.length})
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {events.map((e) => (
                  <div key={e.id} className="bg-[#EBDBCD] border border-[#19181D]/25 overflow-hidden">
                    <div className="aspect-[3/2] w-full bg-[#19181D] relative overflow-hidden">
                      <SafePreviewImage
                        src={e.image_url}
                        alt={e.title}
                        seedText={e.title}
                        type="event"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-serif text-lg leading-snug">{e.title}</h3>
                      <p className="text-xs text-[#5D5B62] font-sans mt-1">
                        {e.venue} &middot; {e.date}
                      </p>
                      <p className="text-xs text-[#19181D]/80 font-sans mt-2 line-clamp-2">
                        {e.about}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* STATE HEADS SECTION PREVIEW */}
            <section className="pt-8 border-t border-[#19181D]/20 space-y-4">
              <div>
                <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.18em] text-[#5D5B62]">
                  Across India
                </span>
                <h2 className="font-serif text-2xl md:text-3xl text-[#19181D] mt-1">
                  State Heads ({stateHeads.length})
                </h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {stateHeads.map((sh) => (
                  <div key={sh.id} className="bg-[#EBDBCD] border border-[#19181D]/15 overflow-hidden text-center">
                    <div className="aspect-[275/373] w-full bg-[#19181D] relative overflow-hidden">
                      <SafePreviewImage
                        src={sh.image_url}
                        alt={sh.name}
                        seedText={sh.name}
                        type="head"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-2">
                      <b className="block text-xs font-serif truncate">{sh.name}</b>
                      <span className="block text-[10px] text-[#FE6500] font-sans font-semibold">{sh.state}</span>
                      <span className="block text-[9px] text-[#5D5B62] font-sans">{sh.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Previous Speakers Preview */}
            <section className="pt-8 border-t border-[#19181D]/20">
              <span className="text-xs font-sans font-semibold uppercase tracking-widest text-[#5D5B62]">
                On stage
              </span>
              <h2 className="font-serif text-3xl mb-4">Previous speakers ({speakers.length})</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {speakers.map((s) => (
                  <div key={s.id} className="p-3 bg-[#EBDBCD] border border-[#19181D]/15 flex flex-col items-center text-center">
                    <div className="w-14 h-14 rounded-full overflow-hidden mb-2 bg-[#19181D]">
                      <SafePreviewImage src={s.image_url} alt={s.name} seedText={s.name} type="avatar" className="w-full h-full object-cover" />
                    </div>
                    <b className="font-serif text-sm truncate w-full">{s.name}</b>
                    <span className="text-[11px] text-[#5D5B62] font-sans truncate w-full">{s.role_company}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Previous Judges Preview */}
            <section className="pt-8 border-t border-[#19181D]/20">
              <span className="text-xs font-sans font-semibold uppercase tracking-widest text-[#5D5B62]">
                On the panel
              </span>
              <h2 className="font-serif text-3xl mb-4">Previous judges ({judges.length})</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {judges.map((j) => (
                  <div key={j.id} className="p-3 bg-[#EBDBCD] border border-[#19181D]/15 flex flex-col items-center text-center">
                    <div className="w-14 h-14 rounded-full overflow-hidden mb-2 bg-[#19181D]">
                      <SafePreviewImage src={j.image_url} alt={j.name} seedText={j.name} type="avatar" className="w-full h-full object-cover" />
                    </div>
                    <b className="font-serif text-sm truncate w-full">{j.name}</b>
                    <span className="text-[11px] text-[#5D5B62] font-sans truncate w-full">{j.role_company}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
