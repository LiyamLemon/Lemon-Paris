import { HomeHero } from "../components/home/HomeHero";
import { FleetPreview } from "../components/home/FleetPreview";
import { PromiseSection } from "../components/home/PromiseSection";
import { BookingBanner } from "../components/home/BookingBanner";
import { usePageTitle } from "../hooks/usePageTitle";

/**
 * Accueil éditorial : il présente et oriente, sans tout contenir.
 * Réservation, galerie, conciergerie et contact ont leurs propres pages.
 */
export function Home() {
  usePageTitle(null);
  return (
    <>
      <HomeHero />
      <FleetPreview />
      <PromiseSection />
      <BookingBanner />
      {/* Témoignages : à ajouter ici lorsque les vrais avis seront disponibles. */}
    </>
  );
}
