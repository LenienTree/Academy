"use client";

import React from "react";
import { ModalProvider, useModal } from "@/context/ModalContext";
import { HeroSection } from "@/components/sections/HeroSection";
import { ValueBand } from "@/components/sections/ValueBand";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { StorySection } from "@/components/sections/StorySection";
import { EventsSection } from "@/components/sections/EventsSection";
import { StateHeadsSection } from "@/components/sections/StateHeadsSection";
import { BeInTheRoomSection } from "@/components/sections/BeInTheRoomSection";
import { SpeakersJudgesSection } from "@/components/sections/SpeakersJudgesSection";
import { ProgramsSection } from "@/components/sections/ProgramsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { ClosingCtaSection } from "@/components/sections/ClosingCtaSection";
import { TestimonialModal } from "@/components/modals/TestimonialModal";
import { EventDetailModal } from "@/components/modals/EventDetailModal";

import type {
  SiteConfig,
  EventItem as DbEventItem,
  TestimonialItem as DbTestimonialItem,
  StateHeadItem as DbStateHeadItem,
} from "@/types/database";

export interface LandingExperienceProps {
  siteConfig?: SiteConfig;
  events?: DbEventItem[];
  testimonials?: DbTestimonialItem[];
  stateHeads?: DbStateHeadItem[];
}

function ModalsHost() {
  const { activeModal, selectedTestimonial, selectedEvent, closeModal } =
    useModal();

  return (
    <>
      <TestimonialModal
        testimonial={activeModal === "TESTIMONIAL" ? selectedTestimonial : null}
        onClose={closeModal}
      />
      <EventDetailModal
        event={activeModal === "EVENT" ? selectedEvent : null}
        onClose={closeModal}
      />
    </>
  );
}

export function LandingExperience({
  siteConfig,
  events,
  testimonials,
  stateHeads,
}: LandingExperienceProps = {}) {
  return (
    <ModalProvider>
      <HeroSection siteConfig={siteConfig} />
      <ValueBand />
      <TestimonialsSection testimonials={testimonials} />
      <StorySection />
      <EventsSection events={events} />
      <StateHeadsSection stateHeads={stateHeads} />
      <BeInTheRoomSection />
      <SpeakersJudgesSection />
      <ProgramsSection />
      <FaqSection />
      <ClosingCtaSection />
      <ModalsHost />
    </ModalProvider>
  );
}

export default LandingExperience;
