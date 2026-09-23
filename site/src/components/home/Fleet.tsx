import { vehicles } from "../../data/vehicles";
import { Reveal } from "../common/Reveal";
import { VehicleCard } from "./VehicleCard";

export function Fleet() {
  return (
    <section id="flotte" data-section className="bg-ink py-16 md:py-24">
      <div className="container-alma">
        <Reveal>
          <p className="eyebrow">
            <span className="h-px w-8 bg-gold" />
            Flotte 2026
          </p>
          <h2 className="mt-4 max-w-lg font-serif text-3xl font-semibold text-paper sm:text-4xl">
            Une Flotte <span className="font-medium italic text-gold-soft">Pensée pour Vous</span>
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-mist md:text-base">
            Une sélection resserrée de véhicules premium, chacun entretenu avec soin pour
            vous garantir une expérience fiable, du premier au dernier kilomètre.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:mt-12">
          {vehicles.map((vehicle, i) => (
            <Reveal key={vehicle.slug} delay={(i % 3) * 80} className="h-full">
              <VehicleCard vehicle={vehicle} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
