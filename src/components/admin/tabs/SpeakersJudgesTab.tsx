'use client';

import React, { useState } from 'react';
import { useDraft } from '@/context/DraftContext';
import { MediaUploader } from '../MediaUploader';
import type { SpeakerItem, JudgeItem } from '@/types/database';

export function SpeakersJudgesTab() {
  const {
    speakers,
    judges,
    updateSpeaker,
    addSpeaker,
    removeSpeaker,
    updateJudge,
    addJudge,
    removeJudge,
  } = useDraft();

  const [subSection, setSubSection] = useState<'speakers' | 'judges'>('speakers');

  const handleAddSpeaker = () => {
    const newItem: SpeakerItem = {
      id: `new-${Date.now()}`,
      name: 'Speaker Name',
      role_company: 'Founder, Startup',
      image_url: null,
      sort_order: speakers.length + 1,
      is_published: true,
      created_at: new Date().toISOString(),
    };
    addSpeaker(newItem);
  };

  const handleAddJudge = () => {
    const newItem: JudgeItem = {
      id: `new-${Date.now()}`,
      name: 'Judge Name',
      role_company: 'Hackathon Judge, Founder',
      image_url: null,
      sort_order: judges.length + 1,
      is_published: true,
      created_at: new Date().toISOString(),
    };
    addJudge(newItem);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl text-[#19181D]">Speakers & Judges</h2>
        <p className="text-xs text-[#5D5B62] font-sans">
          Manage individuals appearing in the &quot;Previous speakers&quot; and &quot;Previous judges&quot; marquees.
        </p>
      </div>

      {/* Sub-section Switcher */}
      <div className="flex border border-[#19181D] bg-[#F5EFE3] p-1 gap-1">
        <button
          type="button"
          onClick={() => setSubSection('speakers')}
          className={`flex-1 py-1.5 text-xs font-sans font-semibold transition-colors ${
            subSection === 'speakers'
              ? 'bg-[#19181D] text-[#F5EFE3]'
              : 'text-[#19181D] hover:bg-[#EBDBCD]'
          }`}
        >
          Previous Speakers ({speakers.length})
        </button>
        <button
          type="button"
          onClick={() => setSubSection('judges')}
          className={`flex-1 py-1.5 text-xs font-sans font-semibold transition-colors ${
            subSection === 'judges'
              ? 'bg-[#19181D] text-[#F5EFE3]'
              : 'text-[#19181D] hover:bg-[#EBDBCD]'
          }`}
        >
          Previous Judges ({judges.length})
        </button>
      </div>

      {/* ================= Speakers Panel ================= */}
      {subSection === 'speakers' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-sans font-semibold uppercase tracking-wider text-[#5D5B62]">
              Speakers List
            </span>
            <button
              type="button"
              onClick={handleAddSpeaker}
              className="px-3 py-1.5 bg-[#FE6500] text-[#19181D] font-sans font-semibold text-xs border border-[#FE6500] hover:shadow-[2px_2px_0px_#19181D]"
            >
              + Add Speaker
            </button>
          </div>

          <div className="space-y-3">
            {speakers.map((s, idx) => (
              <div key={s.id} className="p-4 bg-[#F5EFE3] border border-[#19181D]/20 space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-[#19181D]/10">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-semibold text-[#FE6500]">#{idx + 1}</span>
                    <span className="font-serif text-sm">{s.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Remove speaker "${s.name}"?`)) removeSpeaker(s.id);
                    }}
                    className="text-xs text-red-600 font-sans hover:underline"
                  >
                    Delete
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-sans font-semibold uppercase text-[#19181D]">Name</label>
                    <input
                      type="text"
                      value={s.name}
                      onChange={(e) => updateSpeaker(s.id, { name: e.target.value })}
                      className="px-2.5 py-1.5 bg-white border border-[#19181D] text-xs font-sans outline-none focus:border-[#FE6500]"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-sans font-semibold uppercase text-[#19181D]">Role / Company</label>
                    <input
                      type="text"
                      value={s.role_company}
                      onChange={(e) => updateSpeaker(s.id, { role_company: e.target.value })}
                      className="px-2.5 py-1.5 bg-white border border-[#19181D] text-xs font-sans outline-none focus:border-[#FE6500]"
                    />
                  </div>
                </div>

                <MediaUploader
                  label="Portrait Image (Leave empty for brand SVG avatar)"
                  accept="image/*"
                  folder="heads"
                  currentUrl={s.image_url || undefined}
                  onUploadComplete={(url) => updateSpeaker(s.id, { image_url: url })}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= Judges Panel ================= */}
      {subSection === 'judges' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-sans font-semibold uppercase tracking-wider text-[#5D5B62]">
              Judges List
            </span>
            <button
              type="button"
              onClick={handleAddJudge}
              className="px-3 py-1.5 bg-[#FE6500] text-[#19181D] font-sans font-semibold text-xs border border-[#FE6500] hover:shadow-[2px_2px_0px_#19181D]"
            >
              + Add Judge
            </button>
          </div>

          <div className="space-y-3">
            {judges.map((j, idx) => (
              <div key={j.id} className="p-4 bg-[#F5EFE3] border border-[#19181D]/20 space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-[#19181D]/10">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-semibold text-[#FE6500]">#{idx + 1}</span>
                    <span className="font-serif text-sm">{j.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Remove judge "${j.name}"?`)) removeJudge(j.id);
                    }}
                    className="text-xs text-red-600 font-sans hover:underline"
                  >
                    Delete
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-sans font-semibold uppercase text-[#19181D]">Name</label>
                    <input
                      type="text"
                      value={j.name}
                      onChange={(e) => updateJudge(j.id, { name: e.target.value })}
                      className="px-2.5 py-1.5 bg-white border border-[#19181D] text-xs font-sans outline-none focus:border-[#FE6500]"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-sans font-semibold uppercase text-[#19181D]">Role / Company</label>
                    <input
                      type="text"
                      value={j.role_company}
                      onChange={(e) => updateJudge(j.id, { role_company: e.target.value })}
                      className="px-2.5 py-1.5 bg-white border border-[#19181D] text-xs font-sans outline-none focus:border-[#FE6500]"
                    />
                  </div>
                </div>

                <MediaUploader
                  label="Portrait Image (Leave empty for brand SVG avatar)"
                  accept="image/*"
                  folder="heads"
                  currentUrl={j.image_url || undefined}
                  onUploadComplete={(url) => updateJudge(j.id, { image_url: url })}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

