'use client';

import React from 'react';
import { useDraft } from '@/context/DraftContext';
import { MediaUploader } from '../MediaUploader';

export function StateHeadsTab() {
  const { stateHeads, updateStateHead } = useDraft();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl text-[#19181D]">State Heads ({stateHeads.length})</h2>
        <p className="text-xs text-[#5D5B62] font-sans">
          Regional coordinators bringing Lenienttree Academy to colleges in their states.
        </p>
      </div>

      <div className="space-y-4">
        {stateHeads.map((sh, idx) => (
          <div
            key={sh.id}
            className="p-4 bg-[#F5EFE3] border border-[#19181D]/20 space-y-3"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#19181D]/10">
              <span className="text-xs font-sans font-semibold text-[#FE6500]">
                Slot #{idx + 1} &middot; {sh.state}
              </span>
              <span className="text-[10px] font-mono text-[#5D5B62]">{sh.title}</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-sans font-semibold uppercase text-[#19181D]">
                  Name
                </label>
                <input
                  type="text"
                  value={sh.name}
                  onChange={(e) => updateStateHead(sh.id, { name: e.target.value })}
                  className="px-2.5 py-1.5 bg-white border border-[#19181D] text-xs font-sans outline-none focus:border-[#FE6500]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-sans font-semibold uppercase text-[#19181D]">
                  State / Region
                </label>
                <input
                  type="text"
                  value={sh.state}
                  onChange={(e) => updateStateHead(sh.id, { state: e.target.value })}
                  className="px-2.5 py-1.5 bg-white border border-[#19181D] text-xs font-sans outline-none focus:border-[#FE6500]"
                />
              </div>
            </div>

            <MediaUploader
              label="Headshot Portrait (.webp / .jpg)"
              accept="image/*"
              folder="heads"
              currentUrl={sh.image_url}
              onUploadComplete={(url) => updateStateHead(sh.id, { image_url: url })}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

