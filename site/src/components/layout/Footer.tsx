import { Link } from "react-router-dom";
import { Music2 } from "lucide-react";
import { CONTACT_INFO } from "../../data/site";
import { InstagramIcon } from "../common/icons";
import { SectionLink } from "../common/SectionLink";
import type { SectionId } from "../../data/site";

const NAV_COLUMN: { label: string; section: SectionId }[] = [
  { label: "Notre Flotte", section: "flotte" },
  { label: "Réservation", section: "reservation" },
  { label: "Conciergerie", section: "conciergerie" },
  { label: "Contact", section: "contact" },
];

const LEGAL_COLUMN = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/confidentialite" },
  { label: "CGV / Conditions de location", href: "/cgv" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-ink">
      <div className="container-alma grid grid-cols-1 gap-12 py-16 md:grid-cols-4 md:gap-8">
        <div className="md:col-span-1">
          <span className="font-serif text-2xl font-semibold text-paper">ALMA</span>
          <span className="ml-2 font-sans text-xs font-medium tracking-[0.3em] text-mist uppercase">
            Location
          </span>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-mist">
            Location de véhicules premium à Paris et en région parisienne.
          </p>
        </div>

        <FooterColumn title="Navigation">
          {NAV_COLUMN.map((item) => (
            <SectionLink key={item.section} section={item.section} className="footer-link">
              {item.label}
            </SectionLink>
          ))}
        </FooterColumn>

        <FooterColumn title="Informations légales">
          {LEGAL_COLUMN.map((item) => (
            <Link key={item.href} to={item.href} className="footer-link">
              {item.label}
            </Link>
          ))}
        </FooterColumn>

        <FooterColumn title="Réseaux sociaux">
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="footer-link inline-flex items-center gap-2"
            aria-label={CONTACT_INFO.instagram}
          >
            <InstagramIcon size={16} />
            Instagram
          </a>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="footer-link inline-flex items-center gap-2"
            aria-label={CONTACT_INFO.tiktok}
          >
            <Music2 size={16} strokeWidth={1.75} />
            TikTok
          </a>
        </FooterColumn>
      </div>

      <div className="border-t border-line">
        <div className="container-alma flex flex-col gap-2 py-6 text-xs text-mist md:flex-row md:items-center md:justify-between">
          <p>© {year} ALMA LOCATION. Tous droits réservés.</p>
          <p>Site en cours de finalisation — informations à confirmer.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{title}</h3>
      <div className="mt-4 flex flex-col gap-3">{children}</div>
    </div>
  );
}
