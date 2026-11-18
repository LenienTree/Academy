'use client';

import React, { useState } from 'react';
import { FULLSTACK_AI_SYLLABUS } from '@/lib/register/schedule';

export interface CourseScheduleOverviewProps {
  className?: string;
  showBorder?: boolean;
}

export function CourseScheduleOverview({
  className = '',
  showBorder = true,
}: CourseScheduleOverviewProps = {}) {
  const syllabus = FULLSTACK_AI_SYLLABUS;
  const [openIds, setOpenIds] = useState<string[]>(['stage-1']);

  const toggleStage = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className={`py-8 ${showBorder ? 'border-y border-[#19181D]/20' : ''} ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-8 lg:gap-12 items-start">
        {/* Left Column: Sticky Title, Journey Metrics & Stack */}
        <div className="lg:sticky lg:top-24 space-y-5">
          <div>
            <p className="text-[11px] font-sans font-semibold uppercase tracking-[0.18em] text-[#5D5B62]">
              {syllabus.eyebrow}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#19181D] leading-[1.05] mt-2">
              {syllabus.heading}
            </h2>
            <p className="font-sans text-sm text-[#5D5B62] leading-relaxed mt-3">
              {syllabus.subtitle}
            </p>
          </div>

          {/* Journey Key Metrics */}
          <div className="grid grid-cols-3 gap-2 pt-2">
            {syllabus.highlights.map((h, i) => (
              <div
                key={i}
                className="p-3 bg-[#EBDBCD] border border-[#19181D]/25"
              >
                <span className="block text-[10px] font-sans uppercase tracking-wider text-[#5D5B62]">
                  {h.label}
                </span>
                <strong className="font-serif text-sm md:text-base text-[#19181D] mt-0.5 block">
                  {h.value}
                </strong>
              </div>
            ))}
          </div>

          {/* Tech Stack Tags */}
          <div className="space-y-2 pt-1">
            <span className="block text-[10px] font-sans font-bold uppercase tracking-widest text-[#5D5B62]">
              The Stack You Build With
            </span>
            <div className="flex flex-wrap gap-1.5">
              {syllabus.stack.map((tool) => (
                <span
                  key={tool}
                  className="px-2.5 py-1 bg-[#F5EFE3] border border-[#19181D]/30 text-[11px] font-mono text-[#19181D]"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Numbered Accordion Boxes */}
        <div className="space-y-4">
          {syllabus.stages.map((stage) => {
            const isOpen = openIds.includes(stage.id);

            return (
              <div
                key={stage.id}
                className="border border-[#19181D] bg-[#F5EFE3] transition-colors"
              >
                {/* Accordion Header */}
                <button
                  type="button"
                  onClick={() => toggleStage(stage.id)}
                  className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 text-left hover:bg-[#EBDBCD]/35 transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    {/* Tangerine Numbered Square */}
                    <span className="w-8 h-8 flex-none bg-[#FE6500] text-[#19181D] font-serif italic text-lg flex items-center justify-center">
                      {stage.stepNumber}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl text-[#19181D] leading-snug">
                      {stage.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-4 flex-none">
                    <span className="hidden sm:inline-block text-[11px] font-sans font-semibold uppercase tracking-[0.14em] text-[#5D5B62]">
                      {stage.dayRangeLabel}
                    </span>
                    <span className="text-xl font-sans text-[#19181D] w-5 text-center select-none">
                      {isOpen ? '−' : '+'}
                    </span>
                  </div>
                </button>

                {/* Accordion Body */}
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 space-y-5">
                    <div className="sm:hidden text-[11px] font-sans font-semibold uppercase tracking-[0.14em] text-[#FE6500]">
                      {stage.dayRangeLabel}
                    </div>

                    {/* High-level Stage Bullets with Tangerine Square Markers */}
                    <ul className="space-y-2.5 pl-1 sm:pl-12">
                      {stage.summaryPoints.map((pt, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm font-sans text-[#19181D]"
                        >
                          <span className="w-2 h-2 bg-[#FE6500] mt-1.5 flex-none" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Day-by-Day Syllabus Breakdown */}
                    <div className="pl-0 sm:pl-12 pt-2">
                      <div className="border-t border-[#19181D]/15 divide-y divide-[#19181D]/15">
                        {stage.days.map((d) => (
                          <div key={d.day} className="py-3.5 space-y-1.5">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div className="flex items-center gap-2.5">
                                <span className="px-2 py-0.5 bg-[#19181D] text-[#F5EFE3] font-mono text-[11px] font-semibold">
                                  DAY {d.day}
                                </span>
                                <h4 className="font-serif text-lg text-[#19181D]">
                                  {d.title}
                                </h4>
                              </div>
                              {d.isExam && (
                                <span className="px-2 py-0.5 bg-[#FE6500] text-[#19181D] text-[10px] font-sans font-bold uppercase tracking-wider">
                                  Weekly Exam
                                </span>
                              )}
                            </div>

                            <ul className="pl-4 list-disc text-xs font-sans text-[#5D5B62] space-y-1">
                              {d.topics.map((t, idx) => (
                                <li key={idx}>{t}</li>
                              ))}
                            </ul>

                            <p className="text-xs font-sans text-[#19181D] bg-[#EBDBCD]/60 px-3 py-1.5 border-l-2 border-[#FE6500]">
                              <strong className="font-semibold">Lab:</strong> {d.lab}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
