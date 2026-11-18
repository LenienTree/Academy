import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PROGRAMS, TIERS, REGISTRATION_URL, TBA } from "@/data/academyData";
import { CourseScheduleOverview } from "@/components/common/CourseScheduleOverview";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return [
    { slug: "live-classes" },
    { slug: "offline-internship" },
    { slug: "career-accelerator" },
    { slug: "full-stack-ai" },
  ];
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = PROGRAMS.find((p) => p.key === slug);

  if (!program) {
    return {
      title: "Program Not Found | Lenienttree Academy",
    };
  }

  return {
    title: `${program.title} | Lenienttree Academy`,
    description: program.lead,
  };
}

export default async function ProgramPage({ params }: PageProps) {
  const { slug } = await params;
  const program = PROGRAMS.find((p) => p.key === slug);

  if (!program) {
    notFound();
  }

  const isLiveClasses = slug === "live-classes" || slug === "full-stack-ai";
  const otherPrograms = PROGRAMS.filter((p) => p.key !== slug && p.key !== "full-stack-ai");

  return (
    <main id="view" className="outline-none">
      <div className="wrap">
        <Link className="back" href="/#programs">
          ← All programs
        </Link>

        {/* Hero */}
        <section className="vhero">
          <div>
            <p className="eyebrow flex items-center gap-2">
              <span>Lenienttree Academy · Program</span>
              {!isLiveClasses && (
                <span className="px-2 py-0.5 bg-[var(--ink)]/10 text-[var(--ink)] text-[10px] font-sans font-bold uppercase tracking-wider rounded">
                  Coming Soon
                </span>
              )}
            </p>
            <h1>{program.title}</h1>
            <p className="lede">{program.lead}</p>
            <div className="cta-row">
              {isLiveClasses ? (
                <>
                  <a className="btn" href="#plans">
                    Choose your plan
                  </a>
                  <a className="btn line" href="#syllabus">
                    View Syllabus ↓
                  </a>
                </>
              ) : (
                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  className="btn opacity-50 cursor-not-allowed pointer-events-none select-none"
                >
                  Coming Soon
                </button>
              )}
              <Link className="btn line" href="/#programs">
                Other programs
              </Link>
            </div>
          </div>
          <div className="vimg" aria-hidden="true">
            {program.img ? (
              <Image
                src={program.img}
                alt={program.title}
                width={920}
                height={920}
                className="w-full h-full object-cover"
                priority
              />
            ) : (
              program.svgMarkup && (
                <div dangerouslySetInnerHTML={{ __html: program.svgMarkup }} />
              )
            )}
          </div>
        </section>

        {/* Program details facts */}
        <section className="vsec">
          <div className="vsec-grid">
            <div>
              <h2>Program details</h2>
              {program.courseImg && (
                <div className="mt-6 aspect-square max-w-[260px] overflow-hidden border border-[var(--ink)]">
                  <Image
                    src={program.courseImg}
                    alt="FullStack + AI Course Poster"
                    width={520}
                    height={520}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
            <dl className="facts">
              {program.facts.map((f, i) => (
                <div className="frow" key={i}>
                  <dt>{f.label}</dt>
                  <dd className={f.value === TBA ? "tba" : undefined}>
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Live Classes Full Curriculum & Schedule Overview */}
        {isLiveClasses && (
          <section className="vsec" id="syllabus">
            <CourseScheduleOverview showBorder={false} />
          </section>
        )}

        {/* Plans and Tiers */}
        <section className="vsec" id="plans">
          <div className="plans-head">
            <p className="eyebrow">Plans</p>
            <h2 className="h2">Choose your plan.</h2>
            <p className="lede">
              {isLiveClasses
                ? `Three levels for ${program.title}. Each one includes everything in the one before it.`
                : `Three levels for ${program.title}. Admissions opening soon.`}
            </p>
          </div>

          <div className="tiers">
            {TIERS.map((tier) => (
              <article
                key={tier.name}
                className={`tier ${tier.top ? "top" : ""}`}
              >
                <span className="tag">
                  {isLiveClasses ? tier.tag : "Coming Soon"}
                </span>
                <h3>{tier.name}</h3>
                <p className="fee">
                  Fee
                  <b className="tba">
                    {isLiveClasses ? "To be added" : "Coming soon"}
                  </b>
                </p>
                <ul>
                  {tier.inherit && (
                    <li className="inh">Everything in {tier.inherit}</li>
                  )}
                  {tier.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
                {isLiveClasses ? (
                  <Link
                    className={`btn ${tier.top ? "" : "line"}`}
                    href={`/register/course/fullstack-ai?tier=${tier.name.toLowerCase()}`}
                  >
                    Choose {tier.name} →
                  </Link>
                ) : (
                  <button
                    type="button"
                    disabled
                    aria-disabled="true"
                    className={`btn ${tier.top ? "" : "line"} opacity-50 cursor-not-allowed pointer-events-none select-none`}
                  >
                    Coming Soon
                  </button>
                )}
              </article>
            ))}
          </div>
          <p className="plan-note">
            {isLiveClasses
              ? "Fees and dates will be shown here once confirmed."
              : "Admissions for this program will open soon. Stay tuned for dates and curriculum details."}
          </p>
        </section>

        {/* Other programs cross-navigation */}
        <section className="vsec vend">
          <div className="plans-head">
            <p className="eyebrow">Keep exploring</p>
            <h2 className="h2">Other programs</h2>
          </div>
          <div className="others">
            {otherPrograms.map((other) => (
              <Link
                key={other.key}
                className="other"
                href={`/programs/${other.key}`}
              >
                <span>{other.title}</span>
                <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
