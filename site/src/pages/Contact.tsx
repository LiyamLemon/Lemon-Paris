import type { ComponentType } from "react";
import { ArrowUpRight, Mail, MapPin, MessageCircle, Music2, Phone } from "lucide-react";
import { CONTACT } from "../data/site";
import { emailUrl, instagramUrl, phoneUrl, tiktokUrl, whatsappUrl } from "../lib/contact";
import { InstagramIcon } from "../components/common/icons";
import { PageHero } from "../components/common/PageHero";
import { Reveal } from "../components/common/Reveal";
import { BookingBanner } from "../components/home/BookingBanner";
import { usePageTitle } from "../hooks/usePageTitle";

interface ContactRow {
  icon: ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  label: string;
  value: string;
  href: string | null;
}

/**
 * Contact. Les coordonnées viennent de CONTACT (src/data/site.ts) : tant
 * qu'un champ est vide, il est affiché « À communiquer » et n'est pas cliquable.
 */
export function Contact() {
  usePageTitle("Contact");

  const rows: ContactRow[] = [
    { icon: Phone, label: "Téléphone", value: CONTACT.phone, href: phoneUrl(CONTACT.phone) },
    { icon: MessageCircle, label: "WhatsApp", value: CONTACT.whatsapp, href: whatsappUrl(CONTACT.whatsapp) },
    { icon: Mail, label: "Email", value: CONTACT.email, href: emailUrl(CONTACT.email) },
    {
      icon: InstagramIcon,
      label: "Instagram",
      value: CONTACT.instagram && `@${CONTACT.instagram.replace(/^@/, "")}`,
      href: instagramUrl(CONTACT.instagram),
    },
    {
      icon: Music2,
      label: "TikTok",
      value: CONTACT.tiktok && `@${CONTACT.tiktok.replace(/^@/, "")}`,
      href: tiktokUrl(CONTACT.tiktok),
    },
    { icon: MapPin, label: "Zone desservie", value: CONTACT.zone, href: null },
  ];

  return (
    <>
      <PageHero
        tone="light"
        eyebrow="Contact"
        title="Parlons de"
        titleItalic="Votre Location"
        description="Une question, une demande particulière ? Notre équipe vous répond avec plaisir."
      />

      <section data-tone="light" className="bg-paper pb-20 md:pb-28">
        <div className="container-alma">
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rows.map((row, i) => (
              <Reveal as="li" key={row.label} delay={(i % 3) * 70}>
                <ContactCard {...row} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <BookingBanner />
    </>
  );
}

function ContactCard({ icon: Icon, label, value, href }: ContactRow) {
  const content = (
    <>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-stone text-gold-deep">
        <Icon size={18} strokeWidth={1.5} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-graphite">
          {label}
        </span>
        <span
          className={`mt-1.5 block break-words ${value ? "text-anthracite" : "italic text-graphite/70"}`}
        >
          {value || "À communiquer"}
        </span>
      </span>
      {href && <ArrowUpRight size={18} strokeWidth={1.5} className="shrink-0 text-graphite" />}
    </>
  );
  const classes =
    "flex h-full min-h-24 items-center gap-4 rounded-2xl border border-stone bg-ivory p-5 transition-colors";

  return href ? (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className={`${classes} hover:border-anthracite/30`}
    >
      {content}
    </a>
  ) : (
    <div className={classes}>{content}</div>
  );
}
