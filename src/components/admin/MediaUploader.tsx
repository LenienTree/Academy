'use client';

import React, { useState, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';

interface MediaUploaderProps {
  label: string;
  accept: string;
  folder: 'hero' | 'events' | 'testimonials' | 'heads';
  currentUrl?: string;
  onUploadComplete: (url: string) => void;
}

export function MediaUploader({
  label,
  accept,
  folder,
  currentUrl,
  onUploadComplete,
}: MediaUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [progressText, setProgressText] = useState<string | null>(null);
  const [errorText, setErrorText] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setErrorText(null);
      setProgressText('Uploading to storage...');

      // Generate a clean sanitized unique filename
      const ext = file.name.split('.').pop();
      const cleanName = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${ext}`;
      const filePath = `${folder}/${cleanName}`;

      const { error: uploadError } = await supabase.storage
        .from('academy-media')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        });

      if (uploadError) {
        throw uploadError;
      }

      // Fetch public CDN URL
      const { data } = supabase.storage.from('academy-media').getPublicUrl(filePath);
      onUploadComplete(data.publicUrl);
      setProgressText(null);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Upload failed';
      setErrorText(`Upload error: ${message}`);
      setProgressText(null);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-sans font-semibold uppercase tracking-wider text-[#19181D]">
        {label}
      </label>

      <div className="flex items-center gap-3">
        {currentUrl && (
          <div className="w-14 h-14 bg-[#19181D] border border-[#19181D]/20 overflow-hidden flex-none relative">
            {accept.includes('video') ? (
              <video src={currentUrl} className="w-full h-full object-cover" muted />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={currentUrl} alt="Preview" className="w-full h-full object-cover" />
            )}
          </div>
        )}

        <div className="flex-1 flex flex-col gap-1">
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            disabled={isUploading}
            className="text-xs font-sans file:mr-3 file:py-1.5 file:px-3 file:border file:border-[#19181D] file:bg-[#F5EFE3] file:text-[#19181D] file:font-semibold hover:file:bg-[#FE6500] file:transition-colors file:cursor-pointer disabled:opacity-50"
          />
          {progressText && (
            <span className="text-[11px] font-sans text-[#FE6500] animate-pulse">
              {progressText}
            </span>
          )}
          {errorText && (
            <span className="text-[11px] font-sans text-red-600">
              {errorText}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

