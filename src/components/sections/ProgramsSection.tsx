import Link from "next/link";
import { PROGRAMS } from "@/data/academyData";

export function ProgramsSection() {
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
          {PROGRAMS.map((program) => (
            <Link
              key={program.key}
              className="pcard reveal"
              href={`/programs/${program.key}`}
            >
              <div
                className="pimg"
                aria-hidden="true"
                dangerouslySetInnerHTML={{ __html: program.svgMarkup }}
              />
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
