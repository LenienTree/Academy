'use client';

import React, { useState } from 'react';
import { useDraft } from '@/context/DraftContext';
import { MediaUploader } from '../MediaUploader';
import type { TestimonialItem } from '@/types/database';

export function TestimonialsTab() {
  const { testimonials, updateTestimonial, addTestimonial, removeTestimonial } = useDraft();
  const [editingId, setEditingId] = useState<string | null>(testimonials[0]?.id ?? null);

  const activeTesti = testimonials.find((t) => t.id === editingId);

  function handleCreateTestimonial() {
    const newTesti: TestimonialItem = {
      id: `new-${Date.now()}`,
      name: 'Student Name',
      role_course: 'FullStack+AI',
      college: 'College Name',
      quote: 'Great live mentorship experience and practical projects.',
      image_url: null,
      linkedin_url: 'https://www.linkedin.com/',
      stars: 5,
      sort_order: testimonials.length + 1,
      is_published: true,
      created_at: new Date().toISOString(),
    };
    addTestimonial(newTesti);
    setEditingId(newTesti.id);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl text-[#19181D]">Testimonials</h2>
          <p className="text-xs text-[#5D5B62] font-sans">
            Manage student feedback, college credits, and LinkedIn references.
          </p>
        </div>
        <button
          type="button"
          onClick={handleCreateTestimonial}
          className="px-3 py-1.5 bg-[#FE6500] text-[#19181D] font-sans font-semibold text-xs border border-[#FE6500] hover:shadow-[2px_2px_0px_#19181D]"
        >
          + Add Review
        </button>
      </div>

      {/* Testimonial Selection Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-[#19181D]/15">
        {testimonials.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setEditingId(t.id)}
            className={`px-3 py-1.5 text-xs font-sans font-medium whitespace-nowrap border transition-all ${
              editingId === t.id
                ? 'bg-[#19181D] text-[#F5EFE3] border-[#19181D]'
                : 'bg-[#F5EFE3] text-[#19181D] border-[#19181D]/30 hover:border-[#19181D]'
            }`}
          >
            {t.name || 'Anonymous'}
          </button>
        ))}
      </div>

      {activeTesti ? (
        <div className="space-y-4 bg-[#F5EFE3] p-4 border border-[#19181D]/20">
          <div className="flex justify-between items-center pb-2 border-b border-[#19181D]/10">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#5D5B62]">
              Editing: {activeTesti.name}
            </span>
            <button
              type="button"
              onClick={() => {
                if (confirm(`Remove review by "${activeTesti.name}"?`)) {
                  removeTestimonial(activeTesti.id);
                  setEditingId(testimonials.filter((t) => t.id !== activeTesti.id)[0]?.id ?? null);
                }
              }}
              className="text-xs text-red-600 font-sans hover:underline"
            >
              Delete Review
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-sans font-semibold uppercase tracking-wider text-[#19181D]">
                Student Full Name
              </label>
              <input
                type="text"
                value={activeTesti.name}
                onChange={(e) => updateTestimonial(activeTesti.id, { name: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-[#19181D] text-sm font-sans outline-none focus:border-[#FE6500]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-sans font-semibold uppercase tracking-wider text-[#19181D]">
                Program / Track
              </label>
              <input
                type="text"
                value={activeTesti.role_course}
                onChange={(e) => updateTestimonial(activeTesti.id, { role_course: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-[#19181D] text-sm font-sans outline-none focus:border-[#FE6500]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-sans font-semibold uppercase tracking-wider text-[#19181D]">
              College / Institution Name
            </label>
            <input
              type="text"
              value={activeTesti.college}
              onChange={(e) => updateTestimonial(activeTesti.id, { college: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-[#19181D] text-sm font-sans outline-none focus:border-[#FE6500]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-sans font-semibold uppercase tracking-wider text-[#19181D]">
              Testimonial Quote
            </label>
            <textarea
              rows={3}
              value={activeTesti.quote}
              onChange={(e) => updateTestimonial(activeTesti.id, { quote: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-[#19181D] text-sm font-sans outline-none focus:border-[#FE6500]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-sans font-semibold uppercase tracking-wider text-[#19181D]">
                LinkedIn URL (Optional)
              </label>
              <input
                type="url"
                value={activeTesti.linkedin_url || ''}
                onChange={(e) => updateTestimonial(activeTesti.id, { linkedin_url: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-[#19181D] text-sm font-sans outline-none focus:border-[#FE6500]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-sans font-semibold uppercase tracking-wider text-[#19181D]">
                Star Rating
              </label>
              <select
                value={activeTesti.stars ?? 5}
                onChange={(e) =>
                  updateTestimonial(activeTesti.id, {
                    stars: parseInt(e.target.value, 10),
                  })
                }
                className="w-full px-3 py-2 bg-white border border-[#19181D] text-sm font-sans outline-none focus:border-[#FE6500]"
              >
                <option value={5}>5 Stars (★★★★★)</option>
                <option value={4}>4 Stars (★★★★☆)</option>
                <option value={3}>3 Stars (★★★☆☆)</option>
                <option value={2}>2 Stars (★★☆☆☆)</option>
                <option value={1}>1 Star  (★☆☆☆☆)</option>
              </select>
            </div>
          </div>

          <MediaUploader
            label="Student Headshot (Leave empty for procedural avatar)"
            accept="image/*"
            folder="testimonials"
            currentUrl={activeTesti.image_url || undefined}
            onUploadComplete={(url) => updateTestimonial(activeTesti.id, { image_url: url })}
          />
        </div>
      ) : null}
    </div>
  );
}

