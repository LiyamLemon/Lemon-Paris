import { Link } from "react-router-dom";
import type { Vehicle } from "../../data/vehicles";
import { useBooking } from "../../context/BookingContext";

interface VehicleCardProps {
  vehicle: Vehicle;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const { goToBooking } = useBooking();

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-ink-soft transition-colors hover:border-gold/40">
      <Link to={`/flotte/${vehicle.slug}`} className="relative block aspect-[4/3] overflow-hidden">
        <img
          src={vehicle.images[0]}
          alt={vehicle.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span
          className={`absolute right-3 top-3 rounded-full px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] ${
            vehicle.available ? "bg-gold text-ink" : "bg-ink/80 text-paper/70"
          }`}
        >
          {vehicle.available ? "Disponible" : "Indisponible"}
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-mist">
          {vehicle.category} <span className="text-gold">•</span> {vehicle.transmission}
        </p>

        <Link to={`/flotte/${vehicle.slug}`}>
          <h3 className="font-serif text-xl font-semibold text-paper transition-colors hover:text-gold">
            {vehicle.name}
          </h3>
        </Link>

        <p className="font-serif text-2xl text-gold">
          {vehicle.pricePerDay} €{" "}
          <span className="font-sans text-sm font-normal text-mist">/ jour</span>
        </p>

        <div className="mt-2 flex flex-col gap-2 sm:flex-row">
          <Link
            to={`/flotte/${vehicle.slug}`}
            className="flex-1 rounded-full border border-line-soft/20 px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.1em] text-paper transition-colors hover:border-gold hover:text-gold"
          >
            Voir le véhicule
          </Link>
          <button
            type="button"
            disabled={!vehicle.available}
            onClick={() => goToBooking(vehicle.slug)}
            className="flex-1 rounded-full bg-gold px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.1em] text-ink transition-transform hover:brightness-105 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-line disabled:text-mist"
          >
            Réserver
          </button>
        </div>
      </div>
    </article>
  );
}
