import { ROUTES, SITE_IMAGES } from "../../data/site";
import { Backdrop } from "../common/Backdrop";
import { Button } from "../common/Button";
import { Reveal } from "../common/Reveal";
import { SectionHeading } from "../common/SectionHeading";

/**
 * Bandeau d'appel à la réservation. Réutilisé en bas de l'accueil, de la
 * flotte et du contact — toujours juste avant le footer. Hauteur pilotée
 * par son contenu (comme les autres sections), jamais forcée : un bandeau
 * plus haut que son texte ne laisse qu'un grand vide sombre avant le footer.
 */
export function BookingBanner() {
  return (
    <section data-tone="dark" className="relative overflow-hidden bg-ink py-20 md:py-28">
      <Backdrop
        variant="gradient"
        image={SITE_IMAGES.bookingBanner}
        imageAlt="Paris au crépuscule"
        overlay="soft"
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
            <Button to={ROUTES.booking} variant="light" arrow>
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
