import { Link } from "react-router-dom";
import type { Vehicle } from "../../data/vehicles";
import { bookingUrl } from "../../data/site";
import { SmartImage } from "../common/SmartImage";
import { AvailabilityBadge } from "./AvailabilityBadge";

interface VehicleCardProps {
  vehicle: Vehicle;
}

/** Carte véhicule, sur fond clair. Toutes les données viennent de src/data/vehicles.ts. */
export function VehicleCard({ vehicle }: VehicleCardProps) {
  const detailsUrl = `/flotte/${vehicle.slug}`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-stone bg-ivory transition-shadow duration-500 hover:shadow-[0_24px_50px_-28px_rgba(29,27,24,0.35)]">
      <Link
        to={detailsUrl}
        aria-label={`Voir le véhicule ${vehicle.name}`}
        className="relative block aspect-[4/3] overflow-hidden"
      >
        <SmartImage
          src={vehicle.images[0]}
          alt={vehicle.name}
          placeholderLabel={vehicle.name}
          imgClassName="transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <AvailabilityBadge available={vehicle.available} className="absolute right-4 top-4" />
      </Link>

      <div className="flex flex-1 flex-col px-6 pb-6 pt-6">
        <p className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-graphite">
          {vehicle.category}
          <span className="mx-2 text-gold">•</span>
          {vehicle.transmission}
        </p>

        <h3 className="mt-3 font-serif text-[1.75rem] font-semibold leading-tight text-anthracite">
          <Link to={detailsUrl} className="transition-colors hover:text-gold-deep">
            {vehicle.name}
          </Link>
        </h3>

        <p className="mt-5 border-t border-stone pt-5 text-graphite">
          <span className="font-serif text-[2rem] font-semibold leading-none text-gold-deep">
            {vehicle.pricePerDay}
          </span>
          <span className="ml-1.5 text-sm">€ / jour</span>
        </p>

        <div className="mt-auto grid grid-cols-2 gap-2 pt-6">
          <Link
            to={detailsUrl}
            className="flex min-h-12 items-center justify-center whitespace-nowrap rounded-full border border-anthracite/20 px-3 text-[0.8rem] font-medium text-anthracite transition-colors hover:border-anthracite"
          >
            Voir le véhicule
          </Link>
          {vehicle.available ? (
            <Link
              to={bookingUrl(vehicle.slug)}
              className="flex min-h-12 items-center justify-center rounded-full bg-anthracite px-3 text-[0.8rem] font-medium text-paper transition-colors hover:bg-ink"
            >
              Réserver
            </Link>
          ) : (
            <span
              aria-disabled="true"
              className="flex min-h-12 items-center justify-center rounded-full bg-stone px-3 text-[0.8rem] font-medium text-graphite"
            >
              Indisponible
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
