import { Hero } from "../components/home/Hero";
import { Fleet } from "../components/home/Fleet";
import { Booking } from "../components/home/Booking";
import { Gallery } from "../components/home/Gallery";
import { Services } from "../components/home/Services";
import { Conciergerie } from "../components/home/Conciergerie";
import { Contact } from "../components/home/Contact";

/**
 * Page d'accueil. L'ordre des sections doit rester aligné sur SECTION_IDS
 * (src/data/site.ts), utilisé pour détecter la section active.
 */
export function Home() {
  return (
    <>
      <Hero />
      <Fleet />
      <Booking />
      <Gallery />
      <Services />
      <Conciergerie />
      <Contact />
    </>
  );
}
