import { ShieldCheck, Headset, Star } from "lucide-react";
import { TRUST_POINTS } from "../../data/site";
import { Reveal } from "../common/Reveal";

const ICONS = [ShieldCheck, Headset, Star];

export function Services() {
  return (
    <section className="border-y border-line bg-ink-soft py-20 md:py-28">
      <div className="container-alma">
        <Reveal>
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            <span className="h-px w-8 bg-gold" />
            Notre Engagement
          </p>
          <h2 className="mt-4 max-w-lg font-serif text-3xl font-semibold text-paper sm:text-4xl">
            L'Excellence <span className="italic text-gold-soft">à Chaque Détail</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {TRUST_POINTS.map((point, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Reveal key={point.title} delay={i * 100} className="flex flex-col gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 text-gold">
                  <Icon size={20} strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-lg font-semibold text-paper">{point.title}</h3>
                <p className="text-sm leading-relaxed text-mist">{point.description}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
