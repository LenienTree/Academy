'use client';

import React, { useState } from 'react';
import { useDraft } from '@/context/DraftContext';
import type { RoomCardItem } from '@/types/database';

export function RoomTab() {
  const { roomCards, updateRoomCard, addRoomCard, removeRoomCard } = useDraft();
  const [selectedId, setSelectedId] = useState<string | null>(roomCards[0]?.id ?? null);

  const activeCard = roomCards.find((c) => c.id === selectedId) || roomCards[0];

  const handleAddCard = () => {
    const nextNumber = String(roomCards.length + 1).padStart(2, '0');
    const newCard: RoomCardItem = {
      id: `room-card-${Date.now()}`,
      number: nextNumber,
      title: 'New Room Initiative',
      tagline: 'Practical engagement',
      description: 'Describe what builders and participants experience inside this room.',
      badge: 'Interactive',
      highlight_text: 'Live Access',
      sort_order: roomCards.length + 1,
      is_published: true,
    };
    addRoomCard(newCard);
    setSelectedId(newCard.id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl text-[#19181D]">Be in the Room</h2>
          <p className="text-xs text-[#5D5B62] font-sans">
            Manage the interactive feature cards and pillar initiatives shown in the &quot;Be in the Room&quot; section.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddCard}
          className="px-3 py-1.5 bg-[#FE6500] text-[#19181D] font-sans font-semibold text-xs border border-[#FE6500] hover:shadow-[2px_2px_0px_#19181D]"
        >
          + Add Card
        </button>
      </div>

      {/* Card Selector Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-[#19181D]/15">
        {roomCards.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setSelectedId(c.id)}
            className={`px-3 py-1.5 text-xs font-sans font-medium whitespace-nowrap border transition-all ${
              (activeCard?.id === c.id)
                ? 'bg-[#19181D] text-[#F5EFE3] border-[#19181D]'
                : 'bg-[#F5EFE3] text-[#19181D] border-[#19181D]/30 hover:border-[#19181D]'
            }`}
          >
            {c.number ? `${c.number} ` : ''}{c.title || 'Untitled Card'}
          </button>
        ))}
      </div>

      {activeCard ? (
        <div className="space-y-4 bg-[#F5EFE3] p-4 border border-[#19181D]/20">
          <div className="flex justify-between items-center pb-2 border-b border-[#19181D]/10">
            <span className="text-xs font-mono font-semibold uppercase text-[#5D5B62]">
              Editing: {activeCard.title}
            </span>
            <button
              type="button"
              onClick={() => {
                if (confirm(`Delete card "${activeCard.title}"?`)) {
                  removeRoomCard(activeCard.id);
                  const remaining = roomCards.filter((c) => c.id !== activeCard.id);
                  setSelectedId(remaining[0]?.id ?? null);
                }
              }}
              className="text-xs text-red-600 font-sans hover:underline"
            >
              Delete Card
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-sans font-semibold uppercase text-[#19181D]">Number</label>
              <input
                type="text"
                value={activeCard.number || ''}
                onChange={(e) => updateRoomCard(activeCard.id, { number: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-[#19181D] text-sm font-sans outline-none focus:border-[#FE6500]"
                placeholder="01"
              />
            </div>
            <div className="col-span-2 flex flex-col gap-1.5">
              <label className="text-xs font-sans font-semibold uppercase text-[#19181D]">Title</label>
              <input
                type="text"
                value={activeCard.title}
                onChange={(e) => updateRoomCard(activeCard.id, { title: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-[#19181D] text-sm font-sans outline-none focus:border-[#FE6500]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-sans font-semibold uppercase text-[#19181D]">Tagline</label>
              <input
                type="text"
                value={activeCard.tagline || ''}
                onChange={(e) => updateRoomCard(activeCard.id, { tagline: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-[#19181D] text-sm font-sans outline-none focus:border-[#FE6500]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-sans font-semibold uppercase text-[#19181D]">Badge / Pill</label>
              <input
                type="text"
                value={activeCard.badge || ''}
                onChange={(e) => updateRoomCard(activeCard.id, { badge: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-[#19181D] text-sm font-sans outline-none focus:border-[#FE6500]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-sans font-semibold uppercase text-[#19181D]">Description</label>
            <textarea
              rows={3}
              value={activeCard.description}
              onChange={(e) => updateRoomCard(activeCard.id, { description: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-[#19181D] text-sm font-sans outline-none focus:border-[#FE6500]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-sans font-semibold uppercase text-[#19181D]">Highlight Callout</label>
            <input
              type="text"
              value={activeCard.highlight_text || ''}
              onChange={(e) => updateRoomCard(activeCard.id, { highlight_text: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-[#19181D] text-sm font-sans outline-none focus:border-[#FE6500]"
            />
          </div>
        </div>
      ) : (
        <div className="p-8 text-center border border-dashed border-[#19181D]/30 text-[#5D5B62] text-xs font-sans">
          No cards configured. Click &quot;+ Add Card&quot; to begin.
        </div>
      )}
    </div>
  );
}

