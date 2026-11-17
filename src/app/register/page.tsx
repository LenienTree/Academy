import React from 'react';
import Link from 'next/link';
import { COURSE_CATALOG, formatInr } from '@/lib/register/courses';

export default function CourseSelectionPage() {
  return (
    <div className="min-h-screen bg-[#F5EFE3] text-[#19181D]">
      {/* Header */}
      <header className="border-b border-[#19181D]/15 bg-[#F5EFE3] sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="w-8 h-8 bg-[#FE6500] text-white font-bold flex items-center justify-center">
              L
            </span>
            <span className="font-serif text-xl tracking-tight">Lenienttree Academy</span>
          </Link>
          <Link
            href="/"
            className="text-xs font-sans font-semibold uppercase tracking-wider text-[#5D5B62] hover:text-[#19181D]"
          >
            &larr; Back to Academy
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12 md:py-16 space-y-10">
        <div>
          <p className="text-xs font-sans font-semibold uppercase tracking-[0.18em] text-[#FE6500]">
            Step 01 &middot; Choose Your Course
          </p>
          <h1 className="font-serif text-4xl md:text-6xl leading-[1.02] tracking-tight mt-2">
            Select a program to enroll.
          </h1>
          <p className="font-sans text-base md:text-lg text-[#5D5B62] max-w-2xl mt-3">
            Live cohorts are currently open for FullStack + AI. Offline Internships and Career Accelerator cohorts will open soon.
          </p>
        </div>

        {/* Course Cards */}
        <div className="space-y-6">
          {COURSE_CATALOG.map((course) => (
            <article
              key={course.slug}
              className={`p-6 md:p-8 border-[1.5px] transition-all ${
                course.is_available
                  ? 'bg-[#EBDBCD] border-[#19181D] shadow-[6px_6px_0px_#19181D]'
                  : 'bg-[#EBDBCD]/45 border-[#19181D]/20 opacity-80'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-3 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span
                      className={`px-2.5 py-1 text-[10px] font-sans font-bold uppercase tracking-wider ${
                        course.is_available
                          ? 'bg-[#FE6500] text-[#19181D]'
                          : 'bg-[#19181D]/15 text-[#19181D]'
                      }`}
                    >
                      {course.is_available ? 'Enrollment Open' : 'Coming Soon'}
                    </span>
                    <span className="text-xs font-mono text-[#5D5B62]">
                      {course.duration_label} &middot; {course.schedule_summary}
                    </span>
                  </div>

                  <h2 className="font-serif text-3xl md:text-4xl text-[#19181D]">
                    {course.title}
                  </h2>

                  <p className="font-sans text-sm md:text-base text-[#5D5B62] leading-relaxed">
                    {course.subtitle}
                  </p>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs font-sans text-[#19181D]">
                    {course.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#FE6500] font-bold">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Column */}
                <div className="flex flex-col items-start lg:items-end justify-between gap-4 border-t lg:border-t-0 lg:border-l border-[#19181D]/15 pt-4 lg:pt-0 lg:pl-8 min-w-[220px]">
                  {course.is_available ? (
                    <>
                      <div className="lg:text-right">
                        <span className="block text-[11px] font-sans uppercase tracking-wider text-[#5D5B62]">
                          Starting from
                        </span>
                        <span className="font-serif text-3xl text-[#19181D]">
                          {formatInr(course.starting_price_inr)}
                        </span>
                        <span className="block text-[11px] font-sans text-[#5D5B62]">
                          Split payment plan available
                        </span>
                      </div>
                      <Link
                        href={`/register/course/${course.slug}`}
                        className="w-full lg:w-auto text-center px-6 py-3.5 bg-[#FE6500] text-[#19181D] font-sans font-semibold text-sm border border-[#19181D] shadow-[3px_3px_0px_#19181D] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-transform"
                      >
                        Select Course &rarr;
                      </Link>
                    </>
                  ) : (
                    <div className="lg:text-right space-y-2">
                      <span className="inline-block px-4 py-2.5 bg-[#19181D]/10 text-[#5D5B62] font-sans font-semibold text-xs uppercase tracking-wider border border-[#19181D]/20 cursor-not-allowed">
                        Coming Soon
                      </span>
                      <p className="text-[11px] font-mono text-[#5D5B62]">
                        {course.coming_soon_label}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
