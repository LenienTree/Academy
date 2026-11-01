import Image from "next/image";
import { STATE_HEADS } from "@/data/academyData";
import type { StateHeadItem as DbStateHeadItem } from "@/types/database";
import type { StateHead } from "@/types/academy";

interface StateHeadsSectionProps {
  stateHeads?: (DbStateHeadItem | StateHead)[];
}

export function StateHeadsSection({ stateHeads }: StateHeadsSectionProps = {}) {
  const items =
    stateHeads && stateHeads.length > 0
      ? stateHeads.map((head, idx) => {
          if ("sort_order" in head) {
            return {
              id: head.id,
              name: head.name,
              role: head.title,
              state: head.state,
              image: head.image_url || `/assets/heads/${String(idx + 1).padStart(2, "0")}.webp`,
            };
          }
          return {
            id: head.id,
            name: head.name,
            role: head.role,
            state: head.state,
            image: `/assets/heads/${head.id}.webp`,
          };
        })
      : STATE_HEADS.map((head) => ({
          id: head.id,
          name: head.name,
          role: head.role,
          state: head.state,
          image: `/assets/heads/${head.id}.webp`,
        }));

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
          {items.map((head) => (
            <figure className="head" key={head.id}>
              <Image
                src={head.image}
                alt={`${head.name}, ${head.role}, ${head.state}`}
                width={275}
                height={373}
                loading="lazy"
                unoptimized={head.image.startsWith("http")}
                style={{ width: "100%", height: "auto" }}
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
