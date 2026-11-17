import Link from "next/link";
import { REGISTRATION_URL } from "@/data/academyData";

export function ClosingCtaSection() {
  return (
    <section className="ink closing">
      <div className="wrap">
        <p className="eyebrow">FullStack + AI · Seats are limited</p>
        <h2 style={{ marginBlock: "18px 30px" }}>
          Skills first.
          <br />
          <em>Labels later.</em>
        </h2>
        <div className="cta-row">
          <Link
            className="btn reg"
            href={REGISTRATION_URL}
          >
            Join FullStack+AI
          </Link>
        </div>
      </div>
    </section>
  );
}
