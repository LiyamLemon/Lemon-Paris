import { useState } from "react";
import { VEHICLE_CATEGORIES, vehicles, type VehicleCategory } from "../data/vehicles";
import { FilterChips } from "../components/common/FilterChips";
import { PageHero } from "../components/common/PageHero";
import { Reveal } from "../components/common/Reveal";
import { VehicleCard } from "../components/vehicles/VehicleCard";
import { BookingBanner } from "../components/home/BookingBanner";
import { usePageTitle } from "../hooks/usePageTitle";

export function Fleet() {
  usePageTitle("Notre Flotte");
  const [category, setCategory] = useState<VehicleCategory | null>(null);
  const shown = category ? vehicles.filter((v) => v.category === category) : vehicles;

  return (
    <>
      <PageHero
        tone="light"
        eyebrow="Flotte 2026"
        title="Notre"
        titleItalic="Flotte"
        description="Une sélection resserrée de véhicules premium, chacun entretenu avec soin pour vous garantir une expérience fiable, du premier au dernier kilomètre."
      >
        <FilterChips
          label="Filtrer par catégorie"
          allLabel="Tous les véhicules"
          options={VEHICLE_CATEGORIES}
          value={category}
          onChange={setCategory}
        />
      </PageHero>

      <section data-tone="light" className="bg-paper pb-20 md:pb-28">
        <div className="container-alma">
          <p className="mb-6 text-sm text-graphite" aria-live="polite">
            {shown.length} véhicule{shown.length > 1 ? "s" : ""}
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((vehicle, i) => (
              <Reveal key={vehicle.slug} delay={(i % 3) * 90} className="h-full">
                <VehicleCard vehicle={vehicle} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <BookingBanner />
    </>
  );
}
