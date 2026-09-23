import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Fuel, Gauge, Gem, ShieldCheck, Users, Zap } from "lucide-react";
import { getVehicleBySlug } from "../data/vehicles";
import { useBooking } from "../context/BookingContext";

export function VehicleDetails() {
  const { slug } = useParams<{ slug: string }>();
  const vehicle = getVehicleBySlug(slug);
  const { goToBooking } = useBooking();
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    document.title = vehicle
      ? `${vehicle.name} — ALMA LOCATION`
      : "Véhicule introuvable — ALMA LOCATION";
  }, [vehicle]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    setActiveImage(0);
  }, [slug]);

  if (!vehicle) {
    return (
      <div className="container-alma py-28 text-center">
        <h1 className="font-serif text-3xl font-semibold text-paper">Véhicule introuvable</h1>
        <p className="mt-4 text-mist">Ce véhicule n'existe pas ou n'est plus disponible.</p>
        <Link
          to="/"
          state={{ section: "flotte" }}
          className="mt-8 inline-block rounded-full bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-ink"
        >
          Retour à la flotte
        </Link>
      </div>
    );
  }

  const specs = [
    { icon: Gem, label: "Catégorie", value: vehicle.category },
    { icon: Zap, label: "Transmission", value: vehicle.transmission },
    { icon: Users, label: "Places", value: `${vehicle.seats} places` },
    { icon: Fuel, label: "Carburant", value: vehicle.fuel },
    ...(vehicle.horsepower
      ? [{ icon: Gauge, label: "Puissance", value: `${vehicle.horsepower} ch` }]
      : []),
    { icon: ShieldCheck, label: "Caution", value: `${vehicle.deposit} €` },
  ];

  return (
    <article className="py-10 md:py-16">
      <div className="container-alma">
        <nav aria-label="Fil d'Ariane" className="mb-6 text-xs text-mist">
          <Link to="/" state={{ section: "flotte" }} className="hover:text-gold">
            Notre Flotte
          </Link>
          <span className="mx-2">/</span>
          <span className="text-paper/80">{vehicle.name}</span>
        </nav>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-ink-soft">
              <img
                src={vehicle.images[activeImage]}
                alt={vehicle.name}
                className="h-full w-full object-cover"
              />
              <span
                className={`absolute right-3 top-3 rounded-full px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] ${
                  vehicle.available ? "bg-gold text-ink" : "bg-ink/80 text-paper/70"
                }`}
              >
                {vehicle.available ? "Disponible" : "Indisponible"}
              </span>
            </div>
            {vehicle.images.length > 1 && (
              <div className="mt-3 flex gap-3">
                {vehicle.images.map((img, i) => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    className={`h-16 w-20 overflow-hidden rounded-lg border transition-colors ${
                      activeImage === i ? "border-gold" : "border-line-soft/15"
                    }`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-mist">
              {vehicle.category} <span className="text-gold">•</span> {vehicle.transmission}
            </p>
            <h1 className="mt-2 font-serif text-3xl font-semibold text-paper sm:text-4xl">
              {vehicle.name}
            </h1>
            <p className="mt-4 font-serif text-3xl text-gold">
              {vehicle.pricePerDay} €{" "}
              <span className="font-sans text-base font-normal text-mist">/ jour</span>
            </p>

            <p className="mt-6 max-w-lg text-sm leading-relaxed text-paper/80 md:text-base">
              {vehicle.description}
            </p>

            <dl className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3">
              {specs.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex flex-col gap-1.5">
                  <dt className="flex items-center gap-1.5 text-xs uppercase tracking-[0.1em] text-mist">
                    <Icon size={14} strokeWidth={1.75} className="text-gold" />
                    {label}
                  </dt>
                  <dd className="text-sm font-medium text-paper">{value}</dd>
                </div>
              ))}
              <div className="flex flex-col gap-1.5">
                <dt className="text-xs uppercase tracking-[0.1em] text-mist">Km inclus / jour</dt>
                <dd className="text-sm font-medium text-paper">{vehicle.includedKmPerDay} km</dd>
              </div>
            </dl>

            <div className="mt-8 rounded-xl border border-line-soft/10 bg-ink-soft p-5">
              <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-gold">
                Conditions principales
              </h2>
              <ul className="mt-3 flex flex-col gap-2 text-sm text-paper/80">
                {vehicle.conditions.map((c) => (
                  <li key={c} className="flex gap-2">
                    <span className="text-gold">—</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              disabled={!vehicle.available}
              onClick={() => goToBooking(vehicle.slug)}
              className="mt-8 w-full rounded-full bg-gold px-7 py-4 text-center text-sm font-semibold uppercase tracking-[0.12em] text-ink transition-transform hover:brightness-105 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-line disabled:text-mist sm:w-fit"
            >
              {vehicle.available ? "Réserver ce véhicule" : "Véhicule indisponible"}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
