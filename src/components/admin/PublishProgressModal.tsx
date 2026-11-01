'use client';

import React from 'react';
import { useDraft } from '@/context/DraftContext';

export function PublishProgressModal() {
  const { publishStatus, publishErrorMsg, resetPublishStatus } = useDraft();

  if (publishStatus === 'idle') return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#19181D]/75 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-[#F5EFE3] text-[#19181D] w-full max-w-[460px] p-6 md:p-8 border-2 border-[#19181D] shadow-[8px_8px_0px_#19181D] space-y-6">
        
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-[#19181D]/15 pb-4">
          <span className="w-8 h-8 bg-[#FE6500] text-[#19181D] font-bold text-sm flex items-center justify-center border border-[#19181D]">
            L
          </span>
          <div>
            <h3 className="font-serif text-2xl font-normal leading-none">Publishing Updates</h3>
            <p className="font-sans text-xs text-[#5D5B62] mt-1">Applying changes to the live production website</p>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="space-y-3 font-sans text-sm">
          {/* Step 1: Saving */}
          <div className="flex items-center gap-3">
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                publishStatus === 'saving'
                  ? 'border-2 border-[#FE6500] text-[#FE6500] animate-spin'
                  : publishStatus === 'purging_cache' || publishStatus === 'success'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#19181D]/20 text-[#19181D]'
              }`}
            >
              {publishStatus === 'saving' ? '⟳' : publishStatus === 'purging_cache' || publishStatus === 'success' ? '✓' : '1'}
            </span>
            <span className={publishStatus === 'saving' ? 'font-semibold text-[#19181D]' : 'text-[#5D5B62]'}>
              Committing records to database...
            </span>
          </div>

          {/* Step 2: Purging Cache */}
          <div className="flex items-center gap-3">
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                publishStatus === 'purging_cache'
                  ? 'border-2 border-[#FE6500] text-[#FE6500] animate-spin'
                  : publishStatus === 'success'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#19181D]/20 text-[#19181D]'
              }`}
            >
              {publishStatus === 'purging_cache' ? '⟳' : publishStatus === 'success' ? '✓' : '2'}
            </span>
            <span className={publishStatus === 'purging_cache' ? 'font-semibold text-[#19181D]' : 'text-[#5D5B62]'}>
              Revalidating Next.js static cache...
            </span>
          </div>

          {/* Step 3: Finished */}
          <div className="flex items-center gap-3">
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                publishStatus === 'success'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#19181D]/20 text-[#19181D]'
              }`}
            >
              {publishStatus === 'success' ? '✓' : '3'}
            </span>
            <span className={publishStatus === 'success' ? 'font-semibold text-emerald-800' : 'text-[#5D5B62]'}>
              Changes are live on Lenienttree Academy
            </span>
          </div>
        </div>

        {/* Error Notification */}
        {publishStatus === 'error' && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 text-xs font-sans rounded">
            <b>Error:</b> {publishErrorMsg || 'Failed to publish. Check your connection.'}
          </div>
        )}

        {/* Action Controls */}
        <div className="pt-2 flex justify-end gap-3 border-t border-[#19181D]/15">
          {publishStatus === 'success' && (
            <button
              type="button"
              onClick={resetPublishStatus}
              className="px-5 py-2.5 bg-[#FE6500] text-[#19181D] font-sans font-semibold text-xs border border-[#19181D] hover:shadow-[3px_3px_0px_#19181D] transition-all"
            >
              Done & Return
            </button>
          )}

          {publishStatus === 'error' && (
            <button
              type="button"
              onClick={resetPublishStatus}
              className="px-4 py-2 bg-transparent text-[#19181D] font-sans font-semibold text-xs border border-[#19181D] hover:bg-[#19181D] hover:text-[#F5EFE3] transition-colors"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

