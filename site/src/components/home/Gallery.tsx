import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { GALLERY_IMAGES } from "../../data/site";
import { Reveal } from "../common/Reveal";

const SPAN_CLASSES: Record<string, string> = {
  tall: "sm:row-span-2",
  wide: "sm:col-span-2",
  normal: "",
};

export function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openIndex]);

  const active = openIndex !== null ? GALLERY_IMAGES[openIndex] : null;

  return (
    <section id="galerie" className="bg-ink-soft py-20 md:py-28">
      <div className="container-alma">
        <Reveal>
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            <span className="h-px w-8 bg-gold" />
            Galerie
          </p>
          <h2 className="mt-4 font-serif text-3xl font-semibold text-paper sm:text-4xl">
            L'Automobile <span className="italic text-gold-soft">en Image</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:auto-rows-[220px] sm:grid-cols-3 md:gap-4">
          {GALLERY_IMAGES.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setOpenIndex(i)}
              className={`group relative col-span-1 overflow-hidden rounded-xl ${SPAN_CLASSES[img.span]}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="h-full min-h-[140px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-ink/0 transition-colors group-hover:bg-ink/20" />
            </button>
          ))}
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm animate-fade"
          onClick={() => setOpenIndex(null)}
        >
          <button
            type="button"
            onClick={() => setOpenIndex(null)}
            aria-label="Fermer l'image"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-ink-soft text-paper hover:text-gold"
          >
            <X size={22} strokeWidth={1.75} />
          </button>
          <img
            src={active.src}
            alt={active.alt}
            className="max-h-[85vh] max-w-full rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
