'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import type { SiteConfig, EventItem, TestimonialItem, StateHeadItem, SpeakerItem, JudgeItem } from '@/types/database';

export async function publishAcademyContent(payload: {
  siteConfig: SiteConfig;
  events: EventItem[];
  testimonials: TestimonialItem[];
  stateHeads: StateHeadItem[];
  speakers: SpeakerItem[];
  judges: JudgeItem[];
}) {
  const supabase = await createClient();

  // 1. Commit site_config
  const { error: configError } = await supabase
    .from('site_config')
    .upsert({
      id: 'main',
      eyebrow: payload.siteConfig.eyebrow,
      title: payload.siteConfig.title,
      sub_text: payload.siteConfig.sub_text,
      hero_video_url: payload.siteConfig.hero_video_url,
      hero_poster_url: payload.siteConfig.hero_poster_url,
      reg_url: payload.siteConfig.reg_url,
      updated_at: new Date().toISOString(),
    });

  if (configError) {
    return { success: false, error: `Config: ${configError.message}` };
  }

  // 2. Commit events (clean replace of published set)
  await supabase.from('events').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (payload.events.length > 0) {
    const formattedEvents = payload.events.map((e, idx) => ({
      title: e.title,
      venue: e.venue,
      date: e.date,
      about: e.about,
      image_url: e.image_url,
      sort_order: idx + 1,
      is_published: true,
    }));
    const { error: eventErr } = await supabase.from('events').insert(formattedEvents);
    if (eventErr) return { success: false, error: `Events: ${eventErr.message}` };
  }

  // 3. Commit testimonials
  await supabase.from('testimonials').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (payload.testimonials.length > 0) {
    const formattedTestis = payload.testimonials.map((t, idx) => ({
      name: t.name,
      role_course: t.role_course,
      college: t.college,
      quote: t.quote,
      image_url: t.image_url,
      linkedin_url: t.linkedin_url,
      stars: t.stars,
      sort_order: idx + 1,
      is_published: true,
    }));
    const { error: testiErr } = await supabase.from('testimonials').insert(formattedTestis);
    if (testiErr) return { success: false, error: `Testimonials: ${testiErr.message}` };
  }

  // 4. Commit state heads
  await supabase.from('state_heads').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (payload.stateHeads.length > 0) {
    const formattedHeads = payload.stateHeads.map((sh, idx) => ({
      name: sh.name,
      title: sh.title,
      state: sh.state,
      image_url: sh.image_url,
      sort_order: idx + 1,
    }));
    const { error: headsErr } = await supabase.from('state_heads').insert(formattedHeads);
    if (headsErr) return { success: false, error: `State Heads: ${headsErr.message}` };
  }

  // 5. Commit speakers
  await supabase.from('speakers').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (payload.speakers.length > 0) {
    const formattedSpeakers = payload.speakers.map((s, idx) => ({
      name: s.name,
      role_company: s.role_company,
      image_url: s.image_url,
      sort_order: idx + 1,
      is_published: true,
    }));
    const { error: speakersErr } = await supabase.from('speakers').insert(formattedSpeakers);
    if (speakersErr) return { success: false, error: `Speakers: ${speakersErr.message}` };
  }

  // 6. Commit judges
  await supabase.from('judges').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (payload.judges.length > 0) {
    const formattedJudges = payload.judges.map((j, idx) => ({
      name: j.name,
      role_company: j.role_company,
      image_url: j.image_url,
      sort_order: idx + 1,
      is_published: true,
    }));
    const { error: judgesErr } = await supabase.from('judges').insert(formattedJudges);
    if (judgesErr) return { success: false, error: `Judges: ${judgesErr.message}` };
  }

  // 7. Invalidate Next.js cache
  revalidatePath('/');
  revalidatePath('/admin');

  return { success: true };
}
