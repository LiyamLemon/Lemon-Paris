import { useBooking } from "../../context/BookingContext";
import { SectionLink } from "../common/SectionLink";
import { SmartImage } from "../common/SmartImage";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2000&auto=format&fit=crop";

export function Hero() {
  const { goToBooking } = useBooking();

  return (
    <section
      id="accueil"
      data-section
      className="relative flex min-h-[calc(100svh-var(--header-h))] items-center overflow-hidden bg-ink"
    >
      <SmartImage
        src={HERO_IMAGE}
        alt="Véhicule premium ALMA LOCATION dans la nuit"
        loading="eager"
        fetchPriority="high"
      />
      {/* Voile sombre : garantit la lisibilité quelle que soit la photo. */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/40" />

      <div className="container-alma relative py-16 md:py-24">
        <p className="eyebrow">
          <span className="h-px w-8 bg-gold" />
          Location Premium Paris
        </p>

        <h1 className="mt-6 max-w-xl font-serif text-[2.6rem] font-semibold leading-[1.08] text-paper sm:text-5xl md:text-6xl">
          Votre Route.
          <br />
          <span className="font-medium italic text-gold-soft">Notre Signature.</span>
        </h1>

        <p className="mt-6 max-w-md text-base leading-relaxed text-mist md:text-lg">
          ALMA LOCATION met à votre disposition une flotte de véhicules soigneusement
          sélectionnés, pour une expérience de conduite à la hauteur de vos exigences.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <SectionLink
            section="flotte"
            className="rounded-full bg-gold px-7 py-4 text-center text-sm font-semibold uppercase tracking-[0.12em] text-ink transition hover:brightness-105 active:scale-[0.98]"
          >
            Découvrir la Flotte
          </SectionLink>
          <button
            type="button"
            onClick={() => goToBooking()}
            className="rounded-full border border-paper/25 px-7 py-4 text-center text-sm font-semibold uppercase tracking-[0.12em] text-paper transition-colors hover:border-gold hover:text-gold"
          >
            Réservation Express
          </button>
        </div>
      </div>
    </section>
  );
}
