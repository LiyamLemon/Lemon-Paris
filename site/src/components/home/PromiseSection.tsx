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

        <ul className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-12 md:mt-20 md:grid-cols-3 md:gap-10">
          {TRUST_POINTS.map((point, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Reveal as="li" key={point.title} delay={i * 110} className="flex flex-col items-center text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold/25 bg-gold/10 text-gold">
                  <Icon size={20} strokeWidth={1.4} />
                </span>
                <h3 className="mt-6 font-serif text-[1.65rem] font-semibold leading-tight text-paper">
                  {point.title}
                </h3>
                <span aria-hidden="true" className="mt-4 h-px w-8 bg-gold/40" />
                <p className="mt-4 max-w-xs text-[0.95rem] leading-relaxed text-mist">
                  {point.description}
                </p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
