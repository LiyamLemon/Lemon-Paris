import { ROUTES, SITE_IMAGES } from "../../data/site";
import { Backdrop } from "../common/Backdrop";
import { Button } from "../common/Button";

export function HomeHero() {
  return (
    <section data-tone="dark" className="relative flex min-h-svh items-center overflow-hidden bg-ink">
      <Backdrop
        variant="showroom"
        image={SITE_IMAGES.homeHero}
        imageAlt="Véhicule ALMA LOCATION"
      />

      <div className="container-alma relative pb-52 pt-[calc(var(--header-h)+3.5rem)] md:pb-60">
        <p className="flex animate-fade items-center gap-4 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-gold">
          <span className="h-px w-10 bg-gold" />
          Location Premium Paris
        </p>

        <h1 className="mt-7 max-w-3xl font-serif text-[3.4rem] font-semibold leading-[0.98] text-paper sm:text-7xl md:text-8xl">
          Votre Route.
          <br />
          <span className="font-medium italic">Notre Signature.</span>
        </h1>

        <p className="mt-7 max-w-md text-base leading-relaxed text-mist md:text-lg">
          ALMA LOCATION met à votre disposition une flotte de véhicules soigneusement
          sélectionnés, pour une expérience de conduite à la hauteur de vos exigences.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button to={ROUTES.fleet} variant="gold" arrow>
            Découvrir la flotte
          </Button>
          <Button to={ROUTES.booking} variant="outline-light">
            Réservation Express
          </Button>
        </div>
      </div>
    </section>
  );
}
