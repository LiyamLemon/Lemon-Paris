import { Phone, Mail, MapPin, Music2, MessageCircle } from "lucide-react";
import { CONTACT_INFO } from "../../data/site";
import { Reveal } from "../common/Reveal";
import { InstagramIcon } from "../common/icons";

const ROWS = [
  { icon: Phone, label: "Téléphone", value: CONTACT_INFO.phone },
  { icon: MessageCircle, label: "WhatsApp", value: CONTACT_INFO.whatsapp },
  { icon: Mail, label: "Email", value: CONTACT_INFO.email },
  { icon: InstagramIcon, label: "Instagram", value: CONTACT_INFO.instagram },
  { icon: Music2, label: "TikTok", value: CONTACT_INFO.tiktok },
  { icon: MapPin, label: "Zone desservie", value: CONTACT_INFO.zone },
];

export function Contact() {
  return (
    <section id="contact" data-section className="border-t border-line bg-ink-soft py-16 md:py-24">
      <div className="container-alma">
        <Reveal>
          <p className="eyebrow">
            <span className="h-px w-8 bg-gold" />
            Contact
          </p>
          <h2 className="mt-4 font-serif text-3xl font-semibold text-paper sm:text-4xl">
            Parlons de Votre Location
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-mist md:text-base">
            Une question, une demande particulière ? Notre équipe vous répond avec plaisir.
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {ROWS.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex min-w-0 items-start gap-4 rounded-xl border border-line bg-ink p-5"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/30 text-gold">
                <Icon size={18} strokeWidth={1.5} />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-mist">
                  {label}
                </p>
                <p className="mt-1 break-words text-sm text-paper/90">{value}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
