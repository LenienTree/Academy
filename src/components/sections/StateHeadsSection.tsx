import Image from "next/image";
import { STATE_HEADS } from "@/data/academyData";

export function StateHeadsSection() {
  return (
    <section className="sec ink" id="states">
      <div className="wrap">
        <div className="sec-head reveal">
          <p className="eyebrow">Across India</p>
          <h2 className="h2">Our state heads</h2>
          <p className="lede">
            The people who bring Lenienttree to colleges in their states.
          </p>
          <p className="swipe" aria-hidden="true">
            Swipe to meet all 11 &rarr;
          </p>
        </div>
        <div className="heads" id="heads">
          {STATE_HEADS.map((head) => (
            <figure className="head" key={head.id}>
              <Image
                src={`/assets/heads/${head.id}.webp`}
                alt={`${head.name}, ${head.role}, ${head.state}`}
                width={275}
                height={373}
                loading="lazy"
                style={{ width: "100%", height: "auto" }}
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
