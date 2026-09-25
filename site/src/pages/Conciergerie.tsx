import { LifeBuoy, PackageCheck, Sparkles, Truck } from "lucide-react";
import { CONCIERGE_SERVICES, ROUTES, SITE_IMAGES } from "../data/site";
import { Backdrop } from "../components/common/Backdrop";
import { Button } from "../components/common/Button";
import { PageHero } from "../components/common/PageHero";
import { Reveal } from "../components/common/Reveal";
import { SectionHeading } from "../components/common/SectionHeading";
import { usePageTitle } from "../hooks/usePageTitle";

const ICONS = [Truck, PackageCheck, LifeBuoy, Sparkles];

/**
 * Conciergerie. Seuls les services listés dans CONCIERGE_SERVICES
 * (src/data/site.ts) sont présentés : aucune prestation n'est inventée.
 */
export function Conciergerie() {
  usePageTitle("Conciergerie");
  return (
    <>
      <PageHero
        tone="dark"
        backdrop={{ variant: "showroom", image: SITE_IMAGES.conciergeHero, overlay: "strong" }}
        eyebrow="Conciergerie"
        title="Plus qu'une Location,"
        titleItalic="une Expérience"
        description="ALMA LOCATION accompagne chaque location au-delà de la simple remise des clés."
      />

      <section data-tone="light" className="bg-paper py-20 md:py-28">
        <div className="container-alma">
          <ol className="grid grid-cols-1 border-t border-stone md:grid-cols-2">
            {CONCIERGE_SERVICES.map((service, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <Reveal
                  as="li"
                  key={service.title}
                  delay={(i % 2) * 90}
                  className="border-b border-stone py-10 md:px-8 md:py-12 md:odd:border-r md:odd:pl-0 md:even:pr-0"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold tabular-nums tracking-[0.2em] text-gold-deep">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Icon size={22} strokeWidth={1.4} className="text-gold-deep" />
                  </div>
                  <h2 className="mt-6 font-serif text-[2rem] font-semibold leading-tight text-anthracite">
                    {service.title}
                  </h2>
                  <p className="mt-3 max-w-md text-base leading-relaxed text-graphite">
                    {service.description}
                  </p>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </section>

      <section data-tone="dark" className="relative overflow-hidden bg-ink py-20 md:py-28">
        <Backdrop variant="gradient" />
        <div className="container-alma relative">
          <Reveal>
            <SectionHeading
              tone="dark"
              align="center"
              eyebrow="Sur mesure"
              title="Une demande particulière ?"
              description="Une question, une demande particulière ? Notre équipe vous répond avec plaisir."
            />
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Button to={ROUTES.contact} variant="gold" arrow>
                Nous contacter
              </Button>
              <Button to={ROUTES.booking} variant="outline-light">
                Réserver un véhicule
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
