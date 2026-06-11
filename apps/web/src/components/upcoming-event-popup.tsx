"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarDays, Clock3, MapPin, X } from "lucide-react";
import type { CmsEventItem } from "@/lib/cms-content";

const parseDate = (value: string) => new Date(`${value}T00:00:00`);

const formatDate = (value: string) =>
  value
    ? new Intl.DateTimeFormat("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric"
      }).format(parseDate(value))
    : "";

const getToday = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

export function UpcomingEventPopup({ events, ready }: { events: CmsEventItem[]; ready: boolean }) {
  const [open, setOpen] = useState(false);
  const activeEvent = useMemo(() => {
    const today = getToday();

    return [...events]
      .filter((event) => event.active && parseDate(event.endDate || event.startDate) >= today)
      .sort((a, b) => parseDate(a.startDate).getTime() - parseDate(b.startDate).getTime())[0];
  }, [events]);

  useEffect(() => {
    if (!ready || !activeEvent) return;

    const dismissalKey = `krsa-event-popup-dismissed:${activeEvent.id}`;
    if (window.sessionStorage.getItem(dismissalKey)) return;

    const timer = window.setTimeout(() => setOpen(true), 650);
    return () => window.clearTimeout(timer);
  }, [activeEvent, ready]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePopup();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  if (!activeEvent || !open) return null;

  const today = getToday();
  const ongoing = parseDate(activeEvent.startDate) <= today;
  const dateText =
    activeEvent.endDate && activeEvent.endDate !== activeEvent.startDate
      ? `${formatDate(activeEvent.startDate)} - ${formatDate(activeEvent.endDate)}`
      : formatDate(activeEvent.startDate);

  function closePopup() {
    if (activeEvent) {
      window.sessionStorage.setItem(`krsa-event-popup-dismissed:${activeEvent.id}`, "true");
    }
    setOpen(false);
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="krsa-event-title"
      className="fixed inset-0 z-[120] flex items-center justify-center bg-[#080815]/85 p-3 backdrop-blur-sm sm:p-6"
      onClick={closePopup}
    >
      <div
        className="relative grid max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-lg border border-white/15 bg-navy text-white shadow-2xl lg:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)]"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={closePopup}
          aria-label="Close event popup"
          className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-navy shadow-lg transition hover:bg-orange hover:text-white"
        >
          <X size={20} />
        </button>

        <div className="flex min-h-64 items-center justify-center bg-white p-3 sm:min-h-96">
          <img src={activeEvent.image} alt={activeEvent.title} className="max-h-[70vh] w-full object-contain" />
        </div>

        <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
          <span className="w-fit rounded-full bg-orange px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-white">
            {ongoing ? "Event ongoing" : "Upcoming event"}
          </span>
          <h2 id="krsa-event-title" className="mt-5 font-display text-4xl font-bold uppercase leading-tight sm:text-5xl">
            {activeEvent.title}
          </h2>

          <div className="mt-6 grid gap-3 text-sm font-bold text-white/75">
            <p className="flex items-start gap-3">
              <CalendarDays size={19} className="mt-0.5 shrink-0 text-orange" />
              {dateText}
            </p>
            {activeEvent.time ? (
              <p className="flex items-start gap-3">
                <Clock3 size={19} className="mt-0.5 shrink-0 text-orange" />
                {activeEvent.time}
              </p>
            ) : null}
            {activeEvent.venue ? (
              <p className="flex items-start gap-3">
                <MapPin size={19} className="mt-0.5 shrink-0 text-orange" />
                {activeEvent.venue}
              </p>
            ) : null}
          </div>

          {activeEvent.description ? (
            <p className="mt-6 text-sm leading-7 text-white/65">{activeEvent.description}</p>
          ) : null}

          <button type="button" onClick={closePopup} className="btn-primary mt-8 w-fit">
            Continue to website
          </button>
        </div>
      </div>
    </div>
  );
}
