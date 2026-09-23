import { Hero } from "../components/home/Hero";
import { Fleet } from "../components/home/Fleet";
import { Services } from "../components/home/Services";
import { Booking } from "../components/home/Booking";
import { Gallery } from "../components/home/Gallery";
import { Conciergerie } from "../components/home/Conciergerie";
import { Contact } from "../components/home/Contact";

export function Home() {
  return (
    <>
      <Hero />
      <Fleet />
      <Services />
      <Booking />
      <Gallery />
      <Conciergerie />
      <Contact />
    </>
  );
}
