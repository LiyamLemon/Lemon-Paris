import { ROUTES, SITE_IMAGES } from "../../data/site";
import { Backdrop } from "../common/Backdrop";
import { Button } from "../common/Button";
import { Reveal } from "../common/Reveal";
import { SectionHeading } from "../common/SectionHeading";

/**
 * Bandeau d'appel à la réservation, sur visuel de Paris. Réutilisé en bas
 * de l'accueil, de la flotte et du contact : il mène toujours à /reservation.
 */
export function BookingBanner() {
  return (
    <section
      data-tone="dark"
      className="relative flex min-h-[34rem] items-center overflow-hidden bg-ink py-24 md:min-h-[40rem]"
    >
      <Backdrop
        variant="dusk"
        image={SITE_IMAGES.bookingBanner}
        imageAlt="Paris au crépuscule"
        overlay="strong"
      />
      <div className="container-alma relative">
        <Reveal>
          <SectionHeading
            tone="dark"
            eyebrow="Réservation"
            title="Réservez Votre"
            titleItalic="Véhicule"
            description="Choisissez votre véhicule et vos dates : notre équipe revient vers vous rapidement pour confirmer votre réservation."
          />
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button to={ROUTES.booking} variant="gold" arrow>
              Réserver maintenant
            </Button>
            <Button to={ROUTES.contact} variant="outline-light">
              Nous contacter
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
