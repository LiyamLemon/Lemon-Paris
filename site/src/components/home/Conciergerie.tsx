import { Truck, Undo2, LifeBuoy, Sparkles } from "lucide-react";
import { CONCIERGE_SERVICES } from "../../data/site";
import { Reveal } from "../common/Reveal";

const ICONS = [Truck, Undo2, LifeBuoy, Sparkles];

export function Conciergerie() {
  return (
    <section id="conciergerie" className="bg-ink py-20 md:py-28">
      <div className="container-alma">
        <Reveal>
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            <span className="h-px w-8 bg-gold" />
            Conciergerie
          </p>
          <h2 className="mt-4 max-w-lg font-serif text-3xl font-semibold text-paper sm:text-4xl">
            Plus qu'une Location, <span className="italic text-gold-soft">une Expérience</span>
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-mist md:text-base">
            ALMA LOCATION accompagne chaque location au-delà de la simple remise des clés.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {CONCIERGE_SERVICES.map((service, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Reveal key={service.title} delay={i * 80} className="bg-ink-soft p-8">
                <Icon className="text-gold" size={22} strokeWidth={1.5} />
                <h3 className="mt-4 font-serif text-lg font-semibold text-paper">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{service.description}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
