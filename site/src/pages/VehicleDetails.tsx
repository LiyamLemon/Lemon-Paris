import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Fuel, Gauge, Gem, ShieldCheck, Route, Users, Zap } from "lucide-react";
import { getVehicleBySlug } from "../data/vehicles";
import { ROUTES, bookingUrl } from "../data/site";
import { Button } from "../components/common/Button";
import { SmartImage } from "../components/common/SmartImage";
import { AvailabilityBadge } from "../components/vehicles/AvailabilityBadge";
import { usePageTitle } from "../hooks/usePageTitle";

export function VehicleDetails() {
  const { slug } = useParams<{ slug: string }>();
  const vehicle = getVehicleBySlug(slug);
  // La page est remontée à chaque changement de véhicule (clé = pathname
  // dans Layout) : la photo active repart donc toujours de la première.
  const [activeImage, setActiveImage] = useState(0);
  usePageTitle(vehicle ? vehicle.name : "Véhicule introuvable");

  if (!vehicle) {
    return (
      <section data-tone="light" className="bg-paper pb-28 pt-[calc(var(--header-h)+5rem)] text-center">
        <div className="container-alma">
          <h1 className="font-serif text-5xl font-semibold text-anthracite">Véhicule introuvable</h1>
          <p className="mt-4 text-graphite">Ce véhicule n'existe pas ou n'est plus proposé.</p>
          <Button to={ROUTES.fleet} variant="dark" className="mt-8">
            Retour à la flotte
          </Button>
        </div>
      </section>
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
    { icon: Route, label: "Km inclus / jour", value: `${vehicle.includedKmPerDay} km` },
  ];
  const photos = vehicle.images.length > 0 ? vehicle.images : [""];

  return (
    <section data-tone="light" className="bg-paper pb-20 pt-[calc(var(--header-h)+2rem)] md:pb-28 md:pt-[calc(var(--header-h)+3rem)]">
      <div className="container-alma">
        <Link
          to={ROUTES.fleet}
          className="inline-flex min-h-11 items-center gap-2 text-sm text-graphite transition-colors hover:text-anthracite"
        >
          <ArrowLeft size={16} strokeWidth={1.5} />
          Notre Flotte
        </Link>

        <div className="mt-4 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-stone">
              <SmartImage
                key={photos[activeImage]}
                src={photos[activeImage]}
                alt={vehicle.name}
                placeholderLabel={vehicle.name}
                loading="eager"
              />
              <AvailabilityBadge available={vehicle.available} className="absolute right-4 top-4" />
            </div>
            {photos.length > 1 && (
              <div className="mt-3 flex gap-3 overflow-x-auto">
                {photos.map((img, i) => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    aria-label={`Photo ${i + 1}`}
                    aria-pressed={activeImage === i}
                    className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border-2 transition-colors ${
                      activeImage === i ? "border-gold" : "border-transparent"
                    }`}
                  >
                    <SmartImage src={img} alt="" compact />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-graphite">
              {vehicle.category}
              <span className="mx-2 text-gold">•</span>
              {vehicle.transmission}
            </p>
            <h1 className="mt-3 font-serif text-5xl font-semibold leading-none text-anthracite md:text-6xl">
              {vehicle.name}
            </h1>
            <p className="mt-6 text-graphite">
              <span className="font-serif text-5xl font-semibold leading-none text-gold-deep">
                {vehicle.pricePerDay}
              </span>
              <span className="ml-2">€ / jour</span>
            </p>

            <p className="mt-7 text-base leading-relaxed text-graphite">{vehicle.description}</p>

            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-stone py-7">
              {specs.map(({ icon: Icon, label, value }) => (
                <div key={label} className="min-w-0">
                  <dt className="flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.15em] text-graphite">
                    <Icon size={14} strokeWidth={1.5} className="shrink-0 text-gold-deep" />
                    {label}
                  </dt>
                  <dd className="mt-1.5 font-medium text-anthracite">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8">
              <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-anthracite">
                Conditions principales
              </h2>
              <ul className="mt-4 flex flex-col gap-2.5 text-graphite">
                {vehicle.conditions.map((c) => (
                  <li key={c} className="flex gap-3">
                    <span className="mt-[0.7em] h-px w-4 shrink-0 bg-gold" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              {vehicle.available ? (
                <Button to={bookingUrl(vehicle.slug)} variant="dark" arrow fullWidth>
                  Réserver ce véhicule
                </Button>
              ) : (
                <Button variant="dark" disabled fullWidth>
                  Véhicule indisponible
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
