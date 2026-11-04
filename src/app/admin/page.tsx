import { connection } from 'next/server';
import {
  getSiteConfig,
  getEvents,
  getTestimonials,
  getStateHeads,
  getSpeakers,
  getJudges,
  getRoomCards,
} from '@/lib/data';
import { DraftProvider } from '@/context/DraftContext';
import { EditorPanel } from '@/components/admin/EditorPanel';
import { LivePreviewPane } from '@/components/admin/LivePreviewPane';
import { publishAcademyContent } from './actions/publish';

export const instant = false;

export default async function AdminDashboardPage() {
  await connection();
  // Fetch pristine initial records from Supabase
  const [siteConfig, events, testimonials, stateHeads, speakers, judges, roomCards] = await Promise.all([
    getSiteConfig(),
    getEvents(),
    getTestimonials(),
    getStateHeads(),
    getSpeakers(),
    getJudges(),
    getRoomCards(),
  ]);

  return (
    <DraftProvider
      initialConfig={siteConfig}
      initialEvents={events}
      initialTestimonials={testimonials}
      initialStateHeads={stateHeads}
      initialSpeakers={speakers}
      initialJudges={judges}
      initialRoomCards={roomCards}
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
