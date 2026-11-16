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
          {pathwayPrograms.map((program) => (
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
              <h3>{program.title}</h3>
              <p>{program.description}</p>
              <span className="more">See plans →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
