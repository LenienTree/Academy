import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROGRAMS, TIERS, REGISTRATION_URL, TBA } from "@/data/academyData";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return [
    { slug: "live-classes" },
    { slug: "offline-internship" },
    { slug: "career-accelerator" },
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

  const otherPrograms = PROGRAMS.filter((p) => p.key !== slug);

  return (
    <main id="view" className="outline-none">
      <div className="wrap">
        <Link className="back" href="/#programs">
          ← All programs
        </Link>

        {/* Hero */}
        <section className="vhero">
          <div>
            <p className="eyebrow">Lenienttree Academy · Program</p>
            <h1>{program.title}</h1>
            <p className="lede">{program.lead}</p>
            <div className="cta-row">
              <a className="btn" href="#plans">
                Choose your plan
              </a>
              <Link className="btn line" href="/#programs">
                Other programs
              </Link>
            </div>
          </div>
          <div
            className="vimg"
            aria-hidden="true"
            dangerouslySetInnerHTML={{ __html: program.svgMarkup }}
          />
        </section>

        {/* Program details facts */}
        <section className="vsec">
          <div className="vsec-grid">
            <h2>Program details</h2>
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

        {/* Plans and Tiers */}
        <section className="vsec" id="plans">
          <div className="plans-head">
            <p className="eyebrow">Plans</p>
            <h2 className="h2">Choose your plan.</h2>
            <p className="lede">
              Three levels for {program.title}. Each one includes everything in
              the one before it.
            </p>
          </div>

          <div className="tiers">
            {TIERS.map((tier) => (
              <article
                key={tier.name}
                className={`tier ${tier.top ? "top" : ""}`}
              >
                <span className="tag">{tier.tag}</span>
                <h3>{tier.name}</h3>
                <p className="fee">
                  Fee
                  <b className="tba">To be added</b>
                </p>
                <ul>
                  {tier.inherit && (
                    <li className="inh">Everything in {tier.inherit}</li>
                  )}
                  {tier.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
                <a
                  className={`btn ${tier.top ? "" : "line"}`}
                  href={REGISTRATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Choose {tier.name} →
                </a>
              </article>
            ))}
          </div>
          <p className="plan-note">
            Fees and dates will be shown here once confirmed.
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
