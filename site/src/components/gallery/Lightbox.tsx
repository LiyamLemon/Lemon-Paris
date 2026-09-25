import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useScrollLock } from "../../hooks/useScrollLock";
import { SmartImage } from "../common/SmartImage";

interface LightboxProps {
  items: { src: string; alt: string; category: string }[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

/** Visionneuse plein écran, au-dessus de tout (portail, z-70), page bloquée. */
export function Lightbox({ items, index, onClose, onNavigate }: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const item = items[index];
  const count = items.length;
  const go = (delta: number) => onNavigate((index + delta + count) % count);

  useScrollLock(true);

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((index + 1) % count);
      if (e.key === "ArrowLeft") onNavigate((index - 1 + count) % count);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [index, count, onClose, onNavigate]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.alt}
      className="fixed inset-0 z-[70] flex animate-fade flex-col bg-ink/95 backdrop-blur-sm"
    >
      <div className="flex h-[var(--header-h)] shrink-0 items-center justify-between px-4 md:px-8">
        <span className="text-xs tabular-nums tracking-[0.2em] text-mist">
          {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          <span className="ml-3 uppercase">{item.category}</span>
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className="flex h-11 w-11 items-center justify-center text-paper transition-colors hover:text-gold"
        >
          <X size={26} strokeWidth={1.4} />
        </button>
      </div>

      <div className="relative mx-4 mb-6 flex-1 md:mx-20 md:mb-12">
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          <SmartImage
            key={`${index}-${item.src}`}
            src={item.src}
            alt={item.alt}
            placeholderLabel={item.category}
            placeholderTone="dark"
            loading="eager"
            imgClassName="!object-contain"
          />
        </div>
        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Photo précédente"
              className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ink/70 text-paper transition-colors hover:text-gold"
            >
              <ChevronLeft size={22} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Photo suivante"
              className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ink/70 text-paper transition-colors hover:text-gold"
            >
              <ChevronRight size={22} strokeWidth={1.5} />
            </button>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
