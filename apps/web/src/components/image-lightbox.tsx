"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Maximize2, X } from "lucide-react";

export function ImageLightbox({
  src,
  alt,
  frameClassName,
  imageClassName
}: {
  src: string;
  alt: string;
  frameClassName: string;
  imageClassName: string;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  const modal =
    open && mounted
      ? createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={alt || "Full image preview"}
            className="fixed inset-0 z-[130] flex items-center justify-center bg-black/90 p-3 sm:p-6"
            onClick={() => setOpen(false)}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close full image"
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-navy shadow-lg transition hover:bg-orange hover:text-white"
            >
              <X size={22} />
            </button>
            <img
              src={src}
              alt={alt}
              className="max-h-[92vh] max-w-[96vw] object-contain"
              onClick={(event) => event.stopPropagation()}
            />
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`View full image: ${alt}`}
        className={`group relative block w-full cursor-zoom-in overflow-hidden ${frameClassName}`}
      >
        <img src={src} alt={alt} className={imageClassName} />
        <span className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/65 text-white opacity-0 shadow-lg transition group-hover:opacity-100 group-focus-visible:opacity-100">
          <Maximize2 size={18} />
        </span>
      </button>
      {modal}
    </>
  );
}
