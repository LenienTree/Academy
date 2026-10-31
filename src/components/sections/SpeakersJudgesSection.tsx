import { SPEAKERS, JUDGES } from "@/data/academyData";
import { AvatarGraphic } from "@/components/common/ProceduralGraphics";
import { Marquee } from "@/components/ui/Marquee";

export function SpeakersJudgesSection() {
  return (
    <>
      <section className="sec deep" id="speakers">
        <div className="wrap sec-head reveal">
          <p className="eyebrow">On stage</p>
          <h2 className="h2">Our previous speakers</h2>
        </div>
        <Marquee id="t-speakers" duration={52}>
          {SPEAKERS.map((s, i) => (
            <article className="pcard2" key={`speaker-${i}`}>
              <div className="pimg2">
                <AvatarGraphic seed={s.avatarSeed} />
              </div>
              <b>{s.name}</b>
              <span>{s.role}</span>
            </article>
          ))}
        </Marquee>
      </section>

      <section className="sec" id="judges">
        <div className="wrap sec-head reveal">
          <p className="eyebrow">On the panel</p>
          <h2 className="h2">Our previous judges</h2>
        </div>
        <Marquee id="t-judges" duration={60}>
          {JUDGES.map((j, i) => (
            <article className="pcard2" key={`judge-${i}`}>
              <div className="pimg2">
                <AvatarGraphic seed={j.avatarSeed} />
              </div>
              <b>{j.name}</b>
              <span>{j.role}</span>
            </article>
          ))}
        </Marquee>
      </section>
    </>
  );
}
