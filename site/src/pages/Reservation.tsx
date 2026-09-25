import { PageHero } from "../components/common/PageHero";
import { Reveal } from "../components/common/Reveal";
import { BookingForm } from "../components/booking/BookingForm";
import { usePageTitle } from "../hooks/usePageTitle";

/** Page Réservation : une vraie destination, pas une section d'accueil. */
export function Reservation() {
  usePageTitle("Réservation");
  return (
    <>
      <PageHero
        tone="dark"
        align="center"
        backdrop={{ variant: "gradient" }}
        eyebrow="Réservation"
        title="Réservez Votre"
        titleItalic="Véhicule"
        description="Complétez le formulaire ci-dessous. Notre équipe revient vers vous rapidement pour confirmer votre réservation."
      />
      <section data-tone="dark" className="bg-ink pb-20 md:pb-28">
        <div className="container-alma">
          <Reveal className="mx-auto max-w-3xl">
            <BookingForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
