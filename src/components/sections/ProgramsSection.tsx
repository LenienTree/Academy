import Link from "next/link";
import Image from "next/image";
import { PROGRAMS } from "@/data/academyData";

export function ProgramsSection() {
  const pathwayPrograms = PROGRAMS.filter((p) => p.key !== "full-stack-ai");

  return (
    <section className="sec deep" id="programs">
      <div className="wrap">
        <div className="sec-head reveal">
          <p className="eyebrow">The pathway</p>
          <h2 className="h2">Three ways in.</h2>
          <p className="lede">
            Open a program to see what is inside and choose your plan.
          </p>
        </div>

        <div className="pgrid" id="pgrid">
          {pathwayPrograms.map((program) => {
            const isComingSoon = program.key !== "live-classes";
            return (
              <Link
                key={program.key}
                className="pcard reveal"
                href={`/programs/${program.key}`}
              >
                <div className="pimg" aria-hidden="true">
                  {program.img ? (
                    <Image
                      src={program.img}
                      alt={program.title}
                      width={640}
                      height={704}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    program.svgMarkup && (
                      <div dangerouslySetInnerHTML={{ __html: program.svgMarkup }} />
                    )
                  )}
                </div>
                <div className="flex items-center justify-between gap-2">
                  <h3>{program.title}</h3>
                  {isComingSoon && (
                    <span className="flex-none px-2 py-0.5 bg-[var(--ink)]/10 text-[var(--ink)] text-[10px] font-sans font-bold uppercase tracking-wider rounded">
                      Coming Soon
                    </span>
                  )}
                </div>
                <p>{program.description}</p>
                <span className="more">
                  {isComingSoon ? "Coming Soon →" : "See plans →"}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
