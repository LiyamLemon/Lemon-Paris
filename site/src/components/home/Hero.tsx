import { Link } from "react-router-dom";
import { useBooking } from "../../context/BookingContext";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2000&auto=format&fit=crop";

export function Hero() {
  const { goToBooking } = useBooking();

  return (
    <section
      id="accueil"
      className="relative flex min-h-[92vh] items-end overflow-hidden md:min-h-screen"
    >
      <img
        src={HERO_IMAGE}
        alt="Véhicule premium ALMA LOCATION dans la nuit"
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
      <div className="absolute inset-0 bg-ink/20" />

      <div className="container-alma relative pb-16 pt-32 md:pb-24">
        <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
          <span className="h-px w-8 bg-gold" />
          Location Premium Paris
        </p>

        <h1 className="mt-5 max-w-xl font-serif text-4xl font-semibold leading-[1.1] text-paper sm:text-5xl md:text-6xl">
          Votre Route.
          <br />
          <span className="italic text-gold-soft">Notre Signature.</span>
        </h1>

        <p className="mt-6 max-w-md text-base leading-relaxed text-paper/80 md:text-lg">
          ALMA LOCATION met à votre disposition une flotte de véhicules soigneusement
          sélectionnés, pour une expérience de conduite à la hauteur de vos exigences.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/"
            state={{ section: "flotte" }}
            className="rounded-full bg-gold px-7 py-4 text-center text-sm font-semibold uppercase tracking-[0.12em] text-ink transition-transform hover:brightness-105 active:scale-[0.98]"
          >
            Découvrir la Flotte
          </Link>
          <button
            type="button"
            onClick={() => goToBooking()}
            className="rounded-full border border-paper/30 px-7 py-4 text-center text-sm font-semibold uppercase tracking-[0.12em] text-paper transition-colors hover:border-gold hover:text-gold"
          >
            Réservation Express
          </button>
        </div>
      </div>
    </section>
  );
}
