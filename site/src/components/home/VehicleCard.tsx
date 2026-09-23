import { Link } from "react-router-dom";
import type { Vehicle } from "../../data/vehicles";
import { useBooking } from "../../context/BookingContext";
import { SmartImage } from "../common/SmartImage";

interface VehicleCardProps {
  vehicle: Vehicle;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const { goToBooking } = useBooking();
  const detailsUrl = `/flotte/${vehicle.slug}`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-ink-soft transition-colors hover:border-gold/40">
      <Link
        to={detailsUrl}
        className="relative block aspect-[4/3] overflow-hidden"
        aria-label={`Voir le véhicule ${vehicle.name}`}
      >
        <SmartImage
          src={vehicle.images[0]}
          alt={vehicle.name}
          fallbackLabel={vehicle.name}
          imgClassName="transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <span
          className={`absolute right-3 top-3 rounded-full px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] ${
            vehicle.available ? "bg-gold text-ink" : "bg-ink/85 text-paper/70"
          }`}
        >
          {vehicle.available ? "Disponible" : "Indisponible"}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-mist">
          {vehicle.category} <span className="text-gold">•</span> {vehicle.transmission}
        </p>

        <h3 className="mt-3 font-serif text-xl font-semibold text-paper">
          <Link to={detailsUrl} className="transition-colors hover:text-gold">
            {vehicle.name}
          </Link>
        </h3>

        <p className="mt-4 border-t border-line pt-4 font-serif text-2xl text-gold">
          {vehicle.pricePerDay} €{" "}
          <span className="font-sans text-sm font-normal text-mist">/ jour</span>
        </p>

        <div className="mt-auto flex gap-2 pt-5">
          <Link
            to={detailsUrl}
            className="flex min-h-11 min-w-0 flex-1 items-center justify-center whitespace-nowrap rounded-full border border-paper/20 px-3 text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-paper transition-colors hover:border-gold hover:text-gold"
          >
            Voir le véhicule
          </Link>
          <button
            type="button"
            disabled={!vehicle.available}
            onClick={() => goToBooking(vehicle.slug)}
            className="flex min-h-11 min-w-0 flex-1 items-center justify-center whitespace-nowrap rounded-full bg-gold px-3 text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-ink transition hover:brightness-105 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-line disabled:text-mist"
          >
            Réserver
          </button>
        </div>
      </div>
    </article>
  );
}
