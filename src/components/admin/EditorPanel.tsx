'use client';

import React from 'react';
import { useDraft } from '@/context/DraftContext';
import { HeroTab } from './tabs/HeroTab';
import { EventsTab } from './tabs/EventsTab';
import { TestimonialsTab } from './tabs/TestimonialsTab';
import { StateHeadsTab } from './tabs/StateHeadsTab';
import { SpeakersJudgesTab } from './tabs/SpeakersJudgesTab';
import { PublishProgressModal } from './PublishProgressModal';

export function EditorPanel() {
  const {
    activeTab,
    setActiveTab,
    isDirty,
    discardDraft,
    publishLive,
    isPublishing,
    publishStatus,
  } = useDraft();

  const isBusy = isPublishing || publishStatus === 'saving' || publishStatus === 'purging_cache';

  return (
    <>
      <PublishProgressModal />
      <div className="w-full md:w-[460px] xl:w-[500px] flex-none border-r border-[#19181D]/15 bg-[#EBDBCD] flex flex-col h-[calc(100vh-3.5rem)] overflow-hidden">
        {/* Editor Section Switcher */}
        <div className="flex border-b border-[#19181D]/20 bg-[#F5EFE3] overflow-x-auto text-xs font-sans font-semibold">
          {(['hero', 'events', 'testimonials', 'stateHeads', 'speakersJudges'] as const).map((tab) => {
            const labels: Record<string, string> = {
              hero: 'Hero & Media',
              events: 'Events',
              testimonials: 'Testimonials',
              stateHeads: 'State Heads',
              speakersJudges: 'Speakers & Judges',
            };
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 whitespace-nowrap border-b-2 transition-all ${
                  isActive
                    ? 'border-[#FE6500] text-[#19181D] bg-[#EBDBCD]'
                    : 'border-transparent text-[#5D5B62] hover:text-[#19181D]'
                }`}
              >
                {labels[tab]}
              </button>
            );
          })}
        </div>

        {/* Editor Form Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'hero' && <HeroTab />}
          {activeTab === 'events' && <EventsTab />}
          {activeTab === 'testimonials' && <TestimonialsTab />}
          {activeTab === 'stateHeads' && <StateHeadsTab />}
          {activeTab === 'speakersJudges' && <SpeakersJudgesTab />}
        </div>

        {/* Persistent Footer Action Bar */}
        <div className="p-4 bg-[#F5EFE3] border-t border-[#19181D]/20 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isDirty ? 'bg-[#FE6500] animate-pulse' : 'bg-emerald-600'
              }`}
            />
            <span className="text-xs font-sans font-medium text-[#5D5B62]">
              {isDirty ? 'Unsaved draft changes' : 'Draft synchronized'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isDirty && !isBusy && (
              <button
                type="button"
                onClick={discardDraft}
                className="px-3 py-2 text-xs font-sans font-semibold text-[#19181D] hover:underline"
              >
                Discard
              </button>
            )}

            <button
              type="button"
              disabled={!isDirty || isBusy}
              onClick={publishLive}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#FE6500] text-[#19181D] font-sans font-semibold text-xs border border-[#FE6500] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_#19181D] transition-all disabled:opacity-40 disabled:hover:translate-x-0 disabled:hover:shadow-none"
            >
              {isBusy && (
                <svg className="w-3.5 h-3.5 animate-spin text-[#19181D]" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
              )}
              <span>{isBusy ? 'Publishing...' : 'Publish Live 🚀'}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
