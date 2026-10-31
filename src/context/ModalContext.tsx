"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { TestimonialItem, EventItem } from "@/types/academy";

type ModalType = "TESTIMONIAL" | "EVENT" | null;

interface ModalContextType {
  activeModal: ModalType;
  selectedTestimonial: TestimonialItem | null;
  selectedEvent: EventItem | null;
  openTestimonialModal: (
    item: TestimonialItem,
    triggerElement?: HTMLElement | null
  ) => void;
  openEventModal: (
    item: EventItem,
    triggerElement?: HTMLElement | null
  ) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [selectedTestimonial, setSelectedTestimonial] =
    useState<TestimonialItem | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);

  const openTestimonialModal = useCallback(
    (item: TestimonialItem, triggerElement?: HTMLElement | null) => {
      lastFocusRef.current =
        triggerElement || (document.activeElement as HTMLElement) || null;
      setSelectedTestimonial(item);
      setSelectedEvent(null);
      setActiveModal("TESTIMONIAL");
    },
    []
  );

  const openEventModal = useCallback(
    (item: EventItem, triggerElement?: HTMLElement | null) => {
      lastFocusRef.current =
        triggerElement || (document.activeElement as HTMLElement) || null;
      setSelectedEvent(item);
      setSelectedTestimonial(null);
      setActiveModal("EVENT");
    },
    []
  );

  const closeModal = useCallback(() => {
    setActiveModal(null);
    setSelectedTestimonial(null);
    setSelectedEvent(null);
    if (lastFocusRef.current && typeof lastFocusRef.current.focus === "function") {
      lastFocusRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const isOpen = activeModal !== null;
    document.documentElement.classList.toggle("lock", isOpen);
    document.body.classList.toggle("pop-open", isOpen);

    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.documentElement.classList.remove("lock");
      document.body.classList.remove("pop-open");
    };
  }, [activeModal, closeModal]);

  return (
    <ModalContext.Provider
      value={{
        activeModal,
        selectedTestimonial,
        selectedEvent,
        openTestimonialModal,
        openEventModal,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}

