'use client';

import React from 'react';
import { useDraft } from '@/context/DraftContext';
import { MediaUploader } from '../MediaUploader';

export function HeroTab() {
  const { siteConfig, updateSiteConfig } = useDraft();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl text-[#19181D]">Hero Section</h2>
        <p className="text-xs text-[#5D5B62] font-sans">
          Main announcement headlines, sub-copy narrative, and hero video asset.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-sans font-semibold uppercase tracking-wider text-[#19181D]">
            Eyebrow Badge
          </label>
          <input
            type="text"
            value={siteConfig.eyebrow}
            onChange={(e) => updateSiteConfig({ eyebrow: e.target.value })}
            className="w-full px-3 py-2 bg-[#F5EFE3] border border-[#19181D] text-sm font-sans outline-none focus:border-[#FE6500]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-sans font-semibold uppercase tracking-wider text-[#19181D]">
            Headline (HTML / Line Breaks Supported)
          </label>
          <input
            type="text"
            value={siteConfig.title}
            onChange={(e) => updateSiteConfig({ title: e.target.value })}
            className="w-full px-3 py-2 bg-[#F5EFE3] border border-[#19181D] text-sm font-sans outline-none focus:border-[#FE6500]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-sans font-semibold uppercase tracking-wider text-[#19181D]">
            Program Sub-text
          </label>
          <textarea
            rows={3}
            value={siteConfig.sub_text}
            onChange={(e) => updateSiteConfig({ sub_text: e.target.value })}
            className="w-full px-3 py-2 bg-[#F5EFE3] border border-[#19181D] text-sm font-sans outline-none focus:border-[#FE6500]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-sans font-semibold uppercase tracking-wider text-[#19181D]">
            Registration External URL
          </label>
          <input
            type="url"
            value={siteConfig.reg_url}
            onChange={(e) => updateSiteConfig({ reg_url: e.target.value })}
            className="w-full px-3 py-2 bg-[#F5EFE3] border border-[#19181D] text-sm font-sans outline-none focus:border-[#FE6500]"
          />
        </div>

        {/* Hero Video Upload */}
        <div className="pt-2 border-t border-[#19181D]/15 space-y-4">
          <MediaUploader
            label="Upload Hero Video (.mp4)"
            accept="video/mp4"
            folder="hero"
            currentUrl={siteConfig.hero_video_url}
            onUploadComplete={(url) => updateSiteConfig({ hero_video_url: url })}
          />

          <MediaUploader
            label="Upload Video Poster / Thumbnail"
            accept="image/*"
            folder="hero"
            currentUrl={siteConfig.hero_poster_url}
            onUploadComplete={(url) => updateSiteConfig({ hero_poster_url: url })}
          />
        </div>
      </div>
    </div>
  );
}

