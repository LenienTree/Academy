'use client';

import React, { useState } from 'react';
import { useDraft } from '@/context/DraftContext';
import { MediaUploader } from '../MediaUploader';
import type { EventItem } from '@/types/database';

export function EventsTab() {
  const { events, updateEvent, addEvent, removeEvent } = useDraft();
  const [editingId, setEditingId] = useState<string | null>(events[0]?.id ?? null);

  const activeEvent = events.find((e) => e.id === editingId);

  function handleCreateEvent() {
    const newEvent: EventItem = {
      id: `new-${Date.now()}`,
      title: 'New Campus Event',
      venue: 'To be added',
      date: 'To be added',
      about: 'Details about this event will be announced soon.',
      image_url: '/assets/events/campus-event-1.jpg',
      sort_order: events.length + 1,
      is_published: true,
      created_at: new Date().toISOString(),
    };
    addEvent(newEvent);
    setEditingId(newEvent.id);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl text-[#19181D]">Events Directory</h2>
          <p className="text-xs text-[#5D5B62] font-sans">
            Add or edit offline events, hackathons, and webinars.
          </p>
        </div>
        <button
          type="button"
          onClick={handleCreateEvent}
          className="px-3 py-1.5 bg-[#FE6500] text-[#19181D] font-sans font-semibold text-xs border border-[#FE6500] hover:shadow-[2px_2px_0px_#19181D]"
        >
          + Add Event
        </button>
      </div>

      {/* Event Selection Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-[#19181D]/15">
        {events.map((e) => (
          <button
            key={e.id}
            type="button"
            onClick={() => setEditingId(e.id)}
            className={`px-3 py-1.5 text-xs font-sans font-medium whitespace-nowrap border transition-all ${
              editingId === e.id
                ? 'bg-[#19181D] text-[#F5EFE3] border-[#19181D]'
                : 'bg-[#F5EFE3] text-[#19181D] border-[#19181D]/30 hover:border-[#19181D]'
            }`}
          >
            {e.title || 'Untitled Event'}
          </button>
        ))}
      </div>

      {activeEvent ? (
        <div className="space-y-4 bg-[#F5EFE3] p-4 border border-[#19181D]/20">
          <div className="flex justify-between items-center pb-2 border-b border-[#19181D]/10">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#5D5B62]">
              Editing: {activeEvent.title}
            </span>
            <button
              type="button"
              onClick={() => {
                if (confirm(`Remove "${activeEvent.title}"?`)) {
                  removeEvent(activeEvent.id);
                  setEditingId(events.filter((e) => e.id !== activeEvent.id)[0]?.id ?? null);
                }
              }}
              className="text-xs text-red-600 font-sans hover:underline"
            >
              Delete Event
            </button>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-sans font-semibold uppercase tracking-wider text-[#19181D]">
              Event Title
            </label>
            <input
              type="text"
              value={activeEvent.title}
              onChange={(e) => updateEvent(activeEvent.id, { title: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-[#19181D] text-sm font-sans outline-none focus:border-[#FE6500]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-sans font-semibold uppercase tracking-wider text-[#19181D]">
                Venue
              </label>
              <input
                type="text"
                value={activeEvent.venue}
                onChange={(e) => updateEvent(activeEvent.id, { venue: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-[#19181D] text-sm font-sans outline-none focus:border-[#FE6500]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-sans font-semibold uppercase tracking-wider text-[#19181D]">
                Date
              </label>
              <input
                type="text"
                value={activeEvent.date}
                onChange={(e) => updateEvent(activeEvent.id, { date: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-[#19181D] text-sm font-sans outline-none focus:border-[#FE6500]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-sans font-semibold uppercase tracking-wider text-[#19181D]">
              Event Description / About
            </label>
            <textarea
              rows={3}
              value={activeEvent.about}
              onChange={(e) => updateEvent(activeEvent.id, { about: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-[#19181D] text-sm font-sans outline-none focus:border-[#FE6500]"
            />
          </div>

          <MediaUploader
            label="Event Flyer / Poster Image"
            accept="image/*"
            folder="events"
            currentUrl={activeEvent.image_url}
            onUploadComplete={(url) => updateEvent(activeEvent.id, { image_url: url })}
          />
        </div>
      ) : (
        <div className="p-8 text-center border border-dashed border-[#19181D]/30 text-[#5D5B62] text-xs font-sans">
          No event selected. Click &quot;+ Add Event&quot; to create one.
        </div>
      )}
    </div>
  );
}

