import { Gem, Handshake, ShieldCheck } from "lucide-react";
import { TRUST_POINTS } from "../../data/site";
import { Backdrop } from "../common/Backdrop";
import { Reveal } from "../common/Reveal";
import { SectionHeading } from "../common/SectionHeading";

const ICONS = [ShieldCheck, Handshake, Gem];

/** « Notre Promesse » : les engagements d'ALMA, sur fond dégradé sombre. */
export function PromiseSection() {
  return (
    <section data-tone="dark" className="relative overflow-hidden bg-ink py-20 md:py-28">
      <Backdrop variant="gradient" overlay="soft" />
      <div className="container-alma relative">
        <Reveal>
          <SectionHeading
            tone="dark"
            align="center"
            eyebrow="Notre Promesse"
            title="L'Excellence à Chaque Détail"
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-12 md:mt-20 md:grid-cols-3 md:gap-10">
          {TRUST_POINTS.map((point, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Reveal key={point.title} delay={i * 110}>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/15 text-gold">
                  <Icon size={22} strokeWidth={1.5} />
                </div>
                <h3 className="mt-6 font-serif text-[1.75rem] font-semibold text-paper">
                  {point.title}
                </h3>
                <p className="mt-3 max-w-sm text-base leading-relaxed text-mist">
                  {point.description}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
