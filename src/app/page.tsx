import LandingExperience from "@/components/home/LandingExperience";
import { getSiteConfig, getEvents, getTestimonials, getStateHeads } from "@/lib/data";

export const instant = false;

export default async function HomePage() {
  // Fetch from Supabase with safe internal fallbacks
  const [siteConfig, events, testimonials, stateHeads] = await Promise.all([
    getSiteConfig(),
    getEvents(),
    getTestimonials(),
    getStateHeads(),
  ]);

  return (
    <LandingExperience
      siteConfig={siteConfig}
      events={events}
      testimonials={testimonials}
      stateHeads={stateHeads}
    />
  );
}
