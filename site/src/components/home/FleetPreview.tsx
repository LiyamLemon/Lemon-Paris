import { ROUTES } from "../../data/site";
import { vehicles } from "../../data/vehicles";
import { Button } from "../common/Button";
import { Reveal } from "../common/Reveal";
import { SectionHeading } from "../common/SectionHeading";
import { VehicleCard } from "../vehicles/VehicleCard";

/** Nombre de véhicules mis en avant sur l'accueil (les disponibles d'abord). */
const PREVIEW_COUNT = 3;

export function FleetPreview() {
  const featured = [...vehicles]
    .sort((a, b) => Number(b.available) - Number(a.available))
    .slice(0, PREVIEW_COUNT);

  return (
    <section data-tone="light" className="bg-paper py-20 md:py-28">
      <div className="container-alma">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow="Flotte 2026"
              title="Une Flotte"
              titleItalic="Pensée pour Vous"
              description="Une sélection resserrée de véhicules premium, chacun entretenu avec soin pour vous garantir une expérience fiable, du premier au dernier kilomètre."
            />
          </Reveal>
          <Reveal className="hidden shrink-0 md:block">
            <Button to={ROUTES.fleet} variant="outline-dark" arrow>
              Voir toute la flotte
            </Button>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:mt-16">
          {featured.map((vehicle, i) => (
            <Reveal key={vehicle.slug} delay={i * 90} className="h-full">
              <VehicleCard vehicle={vehicle} />
            </Reveal>
          ))}
        </div>

        <div className="mt-10 md:hidden">
          <Button to={ROUTES.fleet} variant="dark" arrow fullWidth>
            Voir toute la flotte
          </Button>
        </div>
      </div>
    </section>
  );
}
