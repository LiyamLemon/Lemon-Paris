import { useState } from "react";
import { GALLERY_CATEGORIES, GALLERY_ITEMS, type GalleryCategory } from "../data/site";
import { FilterChips } from "../components/common/FilterChips";
import { PageHero } from "../components/common/PageHero";
import { Reveal } from "../components/common/Reveal";
import { SmartImage } from "../components/common/SmartImage";
import { Lightbox } from "../components/gallery/Lightbox";
import { usePageTitle } from "../hooks/usePageTitle";

/**
 * Mise en page éditoriale calculée d'après la position (jamais de trou,
 * quel que soit le nombre de photos ou le filtre actif) :
 * - mobile, 2 colonnes : une large, deux carrées, une large…
 * - tablette/desktop, 3 colonnes : motif de 6 cases haute / large / normales.
 */
function tileClasses(index: number) {
  const mobile = index % 3 === 0 ? "col-span-2 aspect-[16/10]" : "aspect-square";
  const desktop = ["sm:row-span-2", "sm:col-span-2", "", "", "sm:col-span-2", ""][index % 6];
  return `${mobile} sm:aspect-auto sm:col-span-1 ${desktop}`;
}

export function Gallery() {
  usePageTitle("Galerie");
  const [category, setCategory] = useState<GalleryCategory | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const shown = category ? GALLERY_ITEMS.filter((item) => item.category === category) : GALLERY_ITEMS;

  return (
    <>
      <PageHero
        tone="light"
        eyebrow="Galerie"
        title="L'Automobile"
        titleItalic="en Image"
      >
        <FilterChips
          label="Filtrer les photos"
          options={GALLERY_CATEGORIES}
          value={category}
          onChange={(value) => {
            setCategory(value);
            setOpenIndex(null);
          }}
        />
      </PageHero>

      <section data-tone="light" className="bg-paper pb-20 md:pb-28">
        <div className="container-alma">
          <div className="grid grid-cols-2 gap-3 sm:auto-rows-[260px] sm:grid-cols-3 md:gap-4">
            {shown.map((item, i) => (
              <Reveal
                key={`${category ?? "all"}-${i}`}
                delay={(i % 3) * 70}
                className={`relative ${tileClasses(i)}`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(i)}
                  aria-label={`Agrandir : ${item.alt}`}
                  className="group absolute inset-0 overflow-hidden rounded-2xl"
                >
                  <SmartImage
                    src={item.src}
                    alt={item.alt}
                    placeholderLabel={item.category}
                    compact={i % 3 !== 0}
                    imgClassName="transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {openIndex !== null && shown[openIndex] && (
        <Lightbox
          items={shown}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </>
  );
}
