import LandingExperience from "@/components/home/LandingExperience";
import { connection } from "next/server";
import {
  getSiteConfig,
  getEvents,
  getTestimonials,
  getStateHeads,
  getSpeakers,
  getJudges,
} from "@/lib/data";

export const instant = false;

export default async function HomePage() {
  await connection();
  // Fetch from Supabase with safe internal fallbacks
  const [siteConfig, events, testimonials, stateHeads, speakers, judges] =
    await Promise.all([
      getSiteConfig(),
      getEvents(),
      getTestimonials(),
      getStateHeads(),
      getSpeakers(),
      getJudges(),
    ]);

  return (
    <LandingExperience
      siteConfig={siteConfig}
      events={events}
      testimonials={testimonials}
      stateHeads={stateHeads}
      speakers={speakers}
      judges={judges}
    />
  );
}
