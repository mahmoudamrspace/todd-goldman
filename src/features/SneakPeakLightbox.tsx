"use client";

import { useEffect } from "react";

export interface SneakPeakLightboxProps {
  images: string[];
  openIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function SneakPeakLightbox({
  images,
  openIndex,
  onClose,
  onNavigate,
}: SneakPeakLightboxProps) {
  const isOpen = openIndex !== null && openIndex >= 0 && openIndex < images.length;
  const src = isOpen ? images[openIndex] : "";

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft" && openIndex !== null) {
        onNavigate((openIndex - 1 + images.length) % images.length);
      }
      if (event.key === "ArrowRight" && openIndex !== null) {
        onNavigate((openIndex + 1) % images.length);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [images.length, isOpen, onClose, onNavigate, openIndex]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Sneak peak image preview"
      data-testid="sneak-peak-lightbox"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        backgroundColor: "rgba(248, 246, 243, 0.94)",
        cursor: "zoom-out",
      }}
    >
      <button
        type="button"
        aria-label="Previous image"
        onClick={(event) => {
          event.stopPropagation();
          if (openIndex !== null) {
            onNavigate((openIndex - 1 + images.length) % images.length);
          }
        }}
        style={{
          position: "absolute",
          left: 20,
          top: "50%",
          transform: "translateY(-50%)",
          border: "none",
          background: "transparent",
          fontSize: 32,
          cursor: "pointer",
          color: "rgb(15, 15, 15)",
          lineHeight: 1,
        }}
      >
        ‹
      </button>
      <img
        src={src}
        alt=""
        onClick={(event) => event.stopPropagation()}
        style={{
          display: "block",
          maxWidth: 1200,
          maxHeight: "calc(100vh - 40px)",
          width: "auto",
          height: "auto",
          objectFit: "contain",
          borderRadius: 16,
          cursor: "default",
        }}
      />
      <button
        type="button"
        aria-label="Next image"
        onClick={(event) => {
          event.stopPropagation();
          if (openIndex !== null) {
            onNavigate((openIndex + 1) % images.length);
          }
        }}
        style={{
          position: "absolute",
          right: 20,
          top: "50%",
          transform: "translateY(-50%)",
          border: "none",
          background: "transparent",
          fontSize: 32,
          cursor: "pointer",
          color: "rgb(15, 15, 15)",
          lineHeight: 1,
        }}
      >
        ›
      </button>
    </div>
  );
}
