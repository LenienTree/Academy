import { createClient } from '@/lib/supabase/server';
import type { SiteConfig, EventItem, TestimonialItem, StateHeadItem, SpeakerItem, JudgeItem } from '@/types/database';

// Helper to guarantee media URLs work even if bucket is private
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function resolveMediaUrl(supabase: any, url: string | null | undefined): Promise<string | null> {
  if (!url) return null;
  if (!url.includes('/storage/v1/object/public/academy-media/')) return url;

  const path = url.split('/storage/v1/object/public/academy-media/')[1];
  if (!path) return url;

  try {
    const { data } = await supabase.storage.from('academy-media').createSignedUrl(path, 60 * 60 * 24 * 365);
    return data?.signedUrl || url;
  } catch {
    return url;
  }
}

export async function getSiteConfig(): Promise<SiteConfig> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('site_config')
    .select('*')
    .eq('id', 'main')
    .single();

  if (error || !data) {
    return {
      id: 'main',
      eyebrow: 'FullStack + AI · Live program',
      title: 'Learn it live. Build it real.',
      sub_text: 'Practical knowledge from founders and industry mentors. Seventeen days of theory, thirteen days of building.',
      hero_video_url: '/assets/hero.mp4',
      hero_poster_url: '/assets/hero-poster.jpg',
      reg_url: 'https://www.lenienttree.com/academy',
      updated_at: new Date().toISOString(),
    };
  }

  return {
    ...data,
    hero_video_url: (await resolveMediaUrl(supabase, data.hero_video_url)) || data.hero_video_url,
    hero_poster_url: (await resolveMediaUrl(supabase, data.hero_poster_url)) || data.hero_poster_url,
  };
}

export async function getEvents(): Promise<EventItem[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true });

  if (error || !data || data.length === 0) {
    return [
      {
        id: '1',
        title: 'Evoke',
        venue: 'To be added',
        date: 'To be added',
        about: 'Full event details will be added here.',
        image_url: '/assets/events/evoke.jpg',
        sort_order: 1,
        is_published: true,
        created_at: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Hack∞Finity',
        venue: 'SIMATS Engineering',
        date: 'To be added',
        about: 'An exclusive hackathon for agentic AI solution development, organised by the Department of Research & Innovation.',
        image_url: '/assets/events/hackinfinity.jpg',
        sort_order: 2,
        is_published: true,
        created_at: new Date().toISOString(),
      },
      {
        id: '3',
        title: 'Campus event',
        venue: 'To be added',
        date: 'To be added',
        about: 'The event name and full details will be added here.',
        image_url: '/assets/events/campus-event-1.jpg',
        sort_order: 3,
        is_published: true,
        created_at: new Date().toISOString(),
      },
      {
        id: '4',
        title: 'Govt. Engineering College, Thrissur',
        venue: 'Gloria Dopi Kumar Alumni Hall',
        date: 'To be added',
        about: 'Full event details will be added here.',
        image_url: '/assets/events/gec-thrissur.jpg',
        sort_order: 4,
        is_published: true,
        created_at: new Date().toISOString(),
      },
      {
        id: '5',
        title: 'Campus event',
        venue: 'To be added',
        date: 'To be added',
        about: 'The event name and full details will be added here.',
        image_url: '/assets/events/campus-event-2.jpg',
        sort_order: 5,
        is_published: true,
        created_at: new Date().toISOString(),
      },
    ];
  }

  const resolvedEvents = await Promise.all(
    data.map(async (e) => ({
      ...e,
      image_url: (await resolveMediaUrl(supabase, e.image_url)) || e.image_url,
    }))
  );
  return resolvedEvents;
}

export async function getTestimonials(): Promise<TestimonialItem[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true });

  if (error || !data || data.length === 0) {
    return [
      {
        id: '1',
        name: 'Christina',
        role_course: 'FullStack+AI',
        college: 'CUSAT, College of Engineering, Ernakulam',
        quote: 'The program helped me better understand deployment and practical full-stack application workflows.',
        image_url: '/assets/christina.jpg',
        linkedin_url: 'https://www.linkedin.com/',
        stars: 5,
        sort_order: 1,
        is_published: true,
        created_at: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Name Surname',
        role_course: 'FullStack+AI',
        college: 'College Name',
        quote: 'Nobody asked which college I came from. They asked what I could show.',
        image_url: null,
        linkedin_url: null,
        stars: 5,
        sort_order: 2,
        is_published: true,
        created_at: new Date().toISOString(),
      },
    ];
  }

  const resolvedTestimonials = await Promise.all(
    data.map(async (t) => ({
      ...t,
      image_url: await resolveMediaUrl(supabase, t.image_url),
    }))
  );
  return resolvedTestimonials;
}

export async function getStateHeads(): Promise<StateHeadItem[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('state_heads')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error || !data || data.length === 0) {
    return [
      { id: '1', name: 'Samyak Bhangare', title: 'State Head', state: 'Maharashtra', image_url: '/assets/heads/01.webp', sort_order: 1, created_at: new Date().toISOString() },
      { id: '2', name: 'Pranjal Dey', title: 'Community Head', state: 'West Bengal', image_url: '/assets/heads/02.webp', sort_order: 2, created_at: new Date().toISOString() },
      { id: '3', name: 'Abhishek Singh', title: 'State Head', state: 'Chhattisgarh', image_url: '/assets/heads/03.webp', sort_order: 3, created_at: new Date().toISOString() },
      { id: '4', name: 'Dev Shukla', title: 'State Head', state: 'Uttar Pradesh', image_url: '/assets/heads/04.webp', sort_order: 4, created_at: new Date().toISOString() },
      { id: '5', name: 'Anjal N S', title: 'State Head', state: 'Tamil Nadu', image_url: '/assets/heads/05.webp', sort_order: 5, created_at: new Date().toISOString() },
      { id: '6', name: 'Mohammed Fayaz', title: 'State Head', state: 'Jammu & Kashmir', image_url: '/assets/heads/06.webp', sort_order: 6, created_at: new Date().toISOString() },
      { id: '7', name: 'Bhavyakumar Pandya', title: 'State Head', state: 'Gujarat', image_url: '/assets/heads/07.webp', sort_order: 7, created_at: new Date().toISOString() },
      { id: '8', name: 'Pusp', title: 'State Head', state: 'Bihar', image_url: '/assets/heads/08.webp', sort_order: 8, created_at: new Date().toISOString() },
      { id: '9', name: 'Meera Surendran', title: 'State Head', state: 'Kerala', image_url: '/assets/heads/09.webp', sort_order: 9, created_at: new Date().toISOString() },
      { id: '10', name: 'M. V. Reddy', title: 'State Head', state: 'Andhra Pradesh', image_url: '/assets/heads/10.webp', sort_order: 10, created_at: new Date().toISOString() },
      { id: '11', name: 'Anand Bobba', title: 'State Head', state: 'Telangana', image_url: '/assets/heads/12.webp', sort_order: 11, created_at: new Date().toISOString() },
    ];
  }

  const resolvedHeads = await Promise.all(
    data.map(async (h) => ({
      ...h,
      image_url: (await resolveMediaUrl(supabase, h.image_url)) || h.image_url,
    }))
  );
  return resolvedHeads;
}

export async function getSpeakers(): Promise<SpeakerItem[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('speakers')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true });

  if (error || !data || data.length === 0) {
    return [
      { id: '1', name: 'Name Surname', role_company: 'Founder, Company', image_url: null, sort_order: 1, is_published: true, created_at: new Date().toISOString() },
      { id: '2', name: 'Name Surname', role_company: 'Business owner, Company', image_url: null, sort_order: 2, is_published: true, created_at: new Date().toISOString() },
      { id: '3', name: 'Name Surname', role_company: 'Industry mentor', image_url: null, sort_order: 3, is_published: true, created_at: new Date().toISOString() },
      { id: '4', name: 'Name Surname', role_company: 'Founder, Startup', image_url: null, sort_order: 4, is_published: true, created_at: new Date().toISOString() },
      { id: '5', name: 'Name Surname', role_company: 'Engineering lead', image_url: null, sort_order: 5, is_published: true, created_at: new Date().toISOString() },
      { id: '6', name: 'Name Surname', role_company: 'Founder, Company', image_url: null, sort_order: 6, is_published: true, created_at: new Date().toISOString() },
    ];
  }

  const resolvedSpeakers = await Promise.all(
    data.map(async (s) => ({
      ...s,
      image_url: (await resolveMediaUrl(supabase, s.image_url)) || s.image_url,
    }))
  );
  return resolvedSpeakers;
}

export async function getJudges(): Promise<JudgeItem[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('judges')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true });

  if (error || !data || data.length === 0) {
    return [
      { id: '1', name: 'Name Surname', role_company: 'Hackathon judge, Founder', image_url: null, sort_order: 1, is_published: true, created_at: new Date().toISOString() },
      { id: '2', name: 'Name Surname', role_company: 'Industry expert', image_url: null, sort_order: 2, is_published: true, created_at: new Date().toISOString() },
      { id: '3', name: 'Name Surname', role_company: 'Professor, College', image_url: null, sort_order: 3, is_published: true, created_at: new Date().toISOString() },
      { id: '4', name: 'Name Surname', role_company: 'Investor, Venture firm', image_url: null, sort_order: 4, is_published: true, created_at: new Date().toISOString() },
      { id: '5', name: 'Name Surname', role_company: 'Engineering manager', image_url: null, sort_order: 5, is_published: true, created_at: new Date().toISOString() },
      { id: '6', name: 'Name Surname', role_company: 'Founder, Company', image_url: null, sort_order: 6, is_published: true, created_at: new Date().toISOString() },
    ];
  }

  const resolvedJudges = await Promise.all(
    data.map(async (j) => ({
      ...j,
      image_url: (await resolveMediaUrl(supabase, j.image_url)) || j.image_url,
    }))
  );
  return resolvedJudges;
}

