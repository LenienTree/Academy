'use client';

import React, { createContext, useContext, useState, useTransition } from 'react';
import type { SiteConfig, EventItem, TestimonialItem, StateHeadItem, SpeakerItem, JudgeItem } from '@/types/database';

export type PublishStatus = 'idle' | 'saving' | 'purging_cache' | 'success' | 'error';

export interface DraftContextType {
  siteConfig: SiteConfig;
  events: EventItem[];
  testimonials: TestimonialItem[];
  stateHeads: StateHeadItem[];
  speakers: SpeakerItem[];
  judges: JudgeItem[];
  
  updateSiteConfig: (updates: Partial<SiteConfig>) => void;
  updateEvent: (id: string, updates: Partial<EventItem>) => void;
  addEvent: (event: EventItem) => void;
  removeEvent: (id: string) => void;
  updateTestimonial: (id: string, updates: Partial<TestimonialItem>) => void;
  addTestimonial: (testimonial: TestimonialItem) => void;
  removeTestimonial: (id: string) => void;
  updateStateHead: (id: string, updates: Partial<StateHeadItem>) => void;
  updateSpeaker: (id: string, updates: Partial<SpeakerItem>) => void;
  addSpeaker: (speaker: SpeakerItem) => void;
  removeSpeaker: (id: string) => void;
  updateJudge: (id: string, updates: Partial<JudgeItem>) => void;
  addJudge: (judge: JudgeItem) => void;
  removeJudge: (id: string) => void;

  isDirty: boolean;
  activeTab: 'hero' | 'events' | 'testimonials' | 'stateHeads' | 'speakersJudges';
  setActiveTab: (tab: 'hero' | 'events' | 'testimonials' | 'stateHeads' | 'speakersJudges') => void;
  viewportMode: 'desktop' | 'tablet' | 'mobile';
  setViewportMode: (mode: 'desktop' | 'tablet' | 'mobile') => void;
  
  discardDraft: () => void;
  isPublishing: boolean;
  publishStatus: PublishStatus;
  publishErrorMsg: string | null;
  publishLive: () => Promise<void>;
  resetPublishStatus: () => void;
}

const DraftContext = createContext<DraftContextType | null>(null);

interface DraftProviderProps {
  initialConfig: SiteConfig;
  initialEvents: EventItem[];
  initialTestimonials: TestimonialItem[];
  initialStateHeads: StateHeadItem[];
  initialSpeakers?: SpeakerItem[];
  initialJudges?: JudgeItem[];
  children: React.ReactNode;
  onPublish: (data: {
    siteConfig: SiteConfig;
    events: EventItem[];
    testimonials: TestimonialItem[];
    stateHeads: StateHeadItem[];
    speakers: SpeakerItem[];
    judges: JudgeItem[];
  }) => Promise<{ success: boolean; error?: string }>;
}

export function DraftProvider({
  initialConfig,
  initialEvents,
  initialTestimonials,
  initialStateHeads,
  initialSpeakers = [],
  initialJudges = [],
  children,
  onPublish,
}: DraftProviderProps) {
  const [baseline] = useState({
    siteConfig: initialConfig,
    events: initialEvents,
    testimonials: initialTestimonials,
    stateHeads: initialStateHeads,
    speakers: initialSpeakers,
    judges: initialJudges,
  });

  const [siteConfig, setSiteConfig] = useState<SiteConfig>(initialConfig);
  const [events, setEvents] = useState<EventItem[]>(initialEvents);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(initialTestimonials);
  const [stateHeads, setStateHeads] = useState<StateHeadItem[]>(initialStateHeads);
  const [speakers, setSpeakers] = useState<SpeakerItem[]>(initialSpeakers);
  const [judges, setJudges] = useState<JudgeItem[]>(initialJudges);

  const [activeTab, setActiveTab] = useState<'hero' | 'events' | 'testimonials' | 'stateHeads' | 'speakersJudges'>('hero');
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isDirty, setIsDirty] = useState(false);

  const [isPublishing, startPublishTransition] = useTransition();
  const [publishStatus, setPublishStatus] = useState<PublishStatus>('idle');
  const [publishErrorMsg, setPublishErrorMsg] = useState<string | null>(null);

  const updateSiteConfig = (updates: Partial<SiteConfig>) => {
    setSiteConfig((prev) => ({ ...prev, ...updates }));
    setIsDirty(true);
  };

  const updateEvent = (id: string, updates: Partial<EventItem>) => {
    setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, ...updates } : e)));
    setIsDirty(true);
  };

  const addEvent = (newEvent: EventItem) => {
    setEvents((prev) => [...prev, newEvent]);
    setIsDirty(true);
  };

  const removeEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    setIsDirty(true);
  };

  const updateTestimonial = (id: string, updates: Partial<TestimonialItem>) => {
    setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
    setIsDirty(true);
  };

  const addTestimonial = (newTestimonial: TestimonialItem) => {
    setTestimonials((prev) => [...prev, newTestimonial]);
    setIsDirty(true);
  };

  const removeTestimonial = (id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
    setIsDirty(true);
  };

  const updateStateHead = (id: string, updates: Partial<StateHeadItem>) => {
    setStateHeads((prev) => prev.map((sh) => (sh.id === id ? { ...sh, ...updates } : sh)));
    setIsDirty(true);
  };

  const updateSpeaker = (id: string, updates: Partial<SpeakerItem>) => {
    setSpeakers((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
    setIsDirty(true);
  };

  const addSpeaker = (newSpeaker: SpeakerItem) => {
    setSpeakers((prev) => [...prev, newSpeaker]);
    setIsDirty(true);
  };

  const removeSpeaker = (id: string) => {
    setSpeakers((prev) => prev.filter((s) => s.id !== id));
    setIsDirty(true);
  };

  const updateJudge = (id: string, updates: Partial<JudgeItem>) => {
    setJudges((prev) => prev.map((j) => (j.id === id ? { ...j, ...updates } : j)));
    setIsDirty(true);
  };

  const addJudge = (newJudge: JudgeItem) => {
    setJudges((prev) => [...prev, newJudge]);
    setIsDirty(true);
  };

  const removeJudge = (id: string) => {
    setJudges((prev) => prev.filter((j) => j.id !== id));
    setIsDirty(true);
  };

  const discardDraft = () => {
    setSiteConfig(baseline.siteConfig);
    setEvents(baseline.events);
    setTestimonials(baseline.testimonials);
    setStateHeads(baseline.stateHeads);
    setSpeakers(baseline.speakers);
    setJudges(baseline.judges);
    setIsDirty(false);
  };

  const resetPublishStatus = () => {
    setPublishStatus('idle');
    setPublishErrorMsg(null);
  };

  const publishLive = async () => {
    setPublishStatus('saving');
    setPublishErrorMsg(null);

    startPublishTransition(async () => {
      try {
        setPublishStatus('saving');
        await new Promise((r) => setTimeout(r, 600)); // Visual pacing for step 1

        setPublishStatus('purging_cache');
        const res = await onPublish({ siteConfig, events, testimonials, stateHeads, speakers, judges });

        if (res.success) {
          setIsDirty(false);
          setPublishStatus('success');
        } else {
          setPublishStatus('error');
          setPublishErrorMsg(res.error || 'Failed to commit updates to database.');
        }
      } catch (err: unknown) {
        setPublishStatus('error');
        setPublishErrorMsg(err instanceof Error ? err.message : 'Unknown network error.');
      }
    });
  };

  return (
    <DraftContext.Provider
      value={{
        siteConfig,
        events,
        testimonials,
        stateHeads,
        speakers,
        judges,
        updateSiteConfig,
        updateEvent,
        addEvent,
        removeEvent,
        updateTestimonial,
        addTestimonial,
        removeTestimonial,
        updateStateHead,
        updateSpeaker,
        addSpeaker,
        removeSpeaker,
        updateJudge,
        addJudge,
        removeJudge,
        isDirty,
        activeTab,
        setActiveTab,
        viewportMode,
        setViewportMode,
        discardDraft,
        isPublishing,
        publishStatus,
        publishErrorMsg,
        publishLive,
        resetPublishStatus,
      }}
    >
      {children}
    </DraftContext.Provider>
  );
}

export function useDraft() {
  const context = useContext(DraftContext);
  if (!context) {
    throw new Error('useDraft must be used within a DraftProvider');
  }
  return context;
}
