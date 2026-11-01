import { getSiteConfig, getEvents, getTestimonials, getStateHeads, getSpeakers, getJudges } from '@/lib/data';
import { DraftProvider } from '@/context/DraftContext';
import { EditorPanel } from '@/components/admin/EditorPanel';
import { LivePreviewPane } from '@/components/admin/LivePreviewPane';
import { publishAcademyContent } from './actions/publish';

export default async function AdminDashboardPage() {
  // Fetch pristine initial records from Supabase
  const [siteConfig, events, testimonials, stateHeads, speakers, judges] = await Promise.all([
    getSiteConfig(),
    getEvents(),
    getTestimonials(),
    getStateHeads(),
    getSpeakers(),
    getJudges(),
  ]);

  return (
    <DraftProvider
      initialConfig={siteConfig}
      initialEvents={events}
      initialTestimonials={testimonials}
      initialStateHeads={stateHeads}
      initialSpeakers={speakers}
      initialJudges={judges}
      onPublish={publishAcademyContent}
    >
      <div className="flex flex-col md:flex-row h-[calc(100vh-3.5rem)] overflow-hidden">
        {/* Left: Non-tech editor controls */}
        <EditorPanel />

        {/* Right: Live reactive canvas */}
        <LivePreviewPane />
      </div>
    </DraftProvider>
  );
}
