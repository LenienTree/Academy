export function FaqSection() {
  return (
    <section className="sec" id="faq">
      <div className="wrap">
        <div className="sec-head reveal">
          <p className="eyebrow">Before you register</p>
          <h2 className="h2">FAQ</h2>
        </div>

        <div className="faq">
          <details>
            <summary>What is Lenienttree Academy?</summary>
            <p>
              A practical learning and talent development ecosystem. It connects
              people with skills, real-world experience, industry access and
              pathways toward careers or entrepreneurship.
            </p>
          </details>
          <details>
            <summary>Are these recorded courses?</summary>
            <p>
              No. Lenienttree is not a conventional school. Knowledge is
              delivered live, through webinars and offline events led by company
              founders, business owners and the Lenienttree team.
            </p>
          </details>
          <details>
            <summary>How does FullStack+AI work, and what does it cost?</summary>
            <p>
              It is 17 days of theory followed by 13 days of project building. The
              full program is ₹8,500.
            </p>
          </details>
          <details>
            <summary>Who is it for?</summary>
            <p>
              Final-year students and graduates, developers and creators who want
              practical experience, and aspiring founders. Founders and industry
              professionals can also join as mentors and speakers.
            </p>
          </details>
          <details>
            <summary>Does my college name matter?</summary>
            <p>
              No. We value skills, ability and potential over college names,
              qualifications and conventional labels. What you can do matters
              most.
            </p>
          </details>
          <details>
            <summary>What is the Prototype Track?</summary>
            <p>
              A pathway for students and graduates who want to build something of
              their own. Selected participants get focused guidance to develop
              and validate ideas, build the skills they need, and explore funding
              and company creation.
            </p>
          </details>
          <details>
            <summary>Can I get free access to webinars?</summary>
            <p>
              Students who perform well in hackathons or cohorts can receive free
              access to webinars. Paid participants can progress toward deeper,
              fully offline mentorship.
            </p>
          </details>
        </div>
      </div>
    </section>
  );
}
