import { ROUTES, SITE_IMAGES } from "../../data/site";
import { Backdrop } from "../common/Backdrop";
import { Button } from "../common/Button";

export function HomeHero() {
  return (
    // Pas de overflow-hidden ici : le fond (Backdrop) a déjà le sien. En
    // garder un sur la section masquerait silencieusement le CTA sur les
    // écrans très courts au lieu de laisser la page défiler.
    <section data-tone="dark" className="relative flex min-h-svh items-end bg-ink">
      <Backdrop
        variant="showroom"
        image={SITE_IMAGES.homeHero}
        imageAlt="Renault Clio ALMA LOCATION, de nuit dans une rue parisienne"
        imagePosition="76% 58%"
        overlay="hero"
      />

      {/*
        Ancré en bas (items-end) plutôt que centré : quelle que soit la
        hauteur de l'écran, les CTA restent à distance fixe du bas et ne
        sortent jamais du cadre — le titre remonte au-dessus, jamais l'inverse.
      */}
      <div className="container-alma relative pb-10 pt-[calc(var(--header-h)+2.5rem)] sm:pb-14 md:pb-16">
        <p className="flex animate-fade items-center gap-4 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-paper">
          <span className="h-px w-10 bg-paper" />
          Location Premium Paris
        </p>

        <h1 className="mt-7 max-w-3xl font-serif text-[3.4rem] font-semibold leading-[0.98] text-paper sm:text-7xl md:text-8xl">
          Votre Route.
          <br />
          <span className="font-medium italic">Notre Signature.</span>
        </h1>

        <p className="mt-7 max-w-md text-base leading-relaxed text-mist md:text-lg">
          ALMA LOCATION met à votre disposition une flotte de véhicules soigneusement
          sélectionnés, pour conduire dans Paris l'esprit tranquille.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button to={ROUTES.fleet} variant="light" arrow>
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
