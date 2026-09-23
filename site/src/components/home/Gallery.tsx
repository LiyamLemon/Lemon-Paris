import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { GALLERY_IMAGES } from "../../data/site";
import { useScrollLock } from "../../hooks/useScrollLock";
import { Reveal } from "../common/Reveal";
import { SmartImage } from "../common/SmartImage";

/**
 * Mise en page éditoriale, calculée d'après la position de la photo (et
 * non stockée dans les données) pour ne jamais laisser de trou :
 * - mobile, 2 colonnes : une large, deux carrées, une large, deux carrées…
 * - tablette/desktop, 3 colonnes sur des lignes de 240px : motif de 6 cases
 *   (haute | large / — | normale | normale / large | normale).
 */
function tileClasses(index: number) {
  const mobile = index % 3 === 0 ? "col-span-2 aspect-[16/10]" : "aspect-square";
  const desktop = ["sm:row-span-2", "sm:col-span-2", "", "", "sm:col-span-2", ""][index % 6];
  return `${mobile} sm:aspect-auto sm:col-span-1 ${desktop}`;
}

export function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const isOpen = openIndex !== null;
  const count = GALLERY_IMAGES.length;

  useScrollLock(isOpen);

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (delta: number) => setOpenIndex((i) => (i === null ? i : (i + delta + count) % count)),
    [count],
  );

  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus({ preventScroll: true });
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close, step]);

  const active = isOpen ? GALLERY_IMAGES[openIndex] : null;

  return (
    <section id="galerie" data-section className="bg-ink py-16 md:py-24">
      <div className="container-alma">
        <Reveal>
          <p className="eyebrow">
            <span className="h-px w-8 bg-gold" />
            Galerie
          </p>
          <h2 className="mt-4 font-serif text-3xl font-semibold text-paper sm:text-4xl">
            L'Automobile <span className="font-medium italic text-gold-soft">en Image</span>
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:auto-rows-[240px] sm:grid-cols-3 md:mt-12 md:gap-4">
          {GALLERY_IMAGES.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setOpenIndex(i)}
              aria-label={`Agrandir : ${img.alt}`}
              className={`group relative overflow-hidden rounded-xl bg-ink-soft ${tileClasses(i)}`}
            >
              <SmartImage
                src={img.src}
                alt={img.alt}
                imgClassName="transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <span className="absolute inset-0 bg-ink/0 transition-colors group-hover:bg-ink/15" />
            </button>
          ))}
        </div>
      </div>

      {active &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={active.alt}
            className="fixed inset-0 z-[70] flex animate-fade flex-col bg-ink/95 backdrop-blur-sm"
            onClick={close}
          >
            <div className="flex h-[var(--header-h)] shrink-0 items-center justify-between px-4 md:px-8">
              <span className="text-xs tabular-nums tracking-[0.2em] text-mist">
                {String((openIndex ?? 0) + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
              </span>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={close}
                aria-label="Fermer l'image"
                className="flex h-11 w-11 items-center justify-center rounded-full text-paper transition-colors hover:text-gold"
              >
                <X size={26} strokeWidth={1.5} />
              </button>
            </div>

            <div className="relative mx-4 mb-4 flex-1 md:mx-16 md:mb-10" onClick={(e) => e.stopPropagation()}>
              <div className="absolute inset-0 overflow-hidden rounded-xl">
                <SmartImage
                  key={active.src}
                  src={active.src}
                  alt={active.alt}
                  loading="eager"
                  imgClassName="!object-contain"
                />
              </div>
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Image précédente"
                className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ink/70 text-paper transition-colors hover:text-gold"
              >
                <ChevronLeft size={22} strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Image suivante"
                className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ink/70 text-paper transition-colors hover:text-gold"
              >
                <ChevronRight size={22} strokeWidth={1.5} />
              </button>
            </div>
          </div>,
          document.body,
        )}
    </section>
  );
}
