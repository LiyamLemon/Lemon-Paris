import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { CONTACT, NAV_LINKS } from "../../data/site";
import { instagramUrl, tiktokUrl } from "../../lib/contact";

const LEGAL_LINKS = [
  { label: "Mentions légales", to: "/mentions-legales" },
  { label: "Politique de confidentialité", to: "/confidentialite" },
  { label: "CGV / Conditions de location", to: "/cgv" },
];

const LINK = "w-fit text-sm text-mist transition-colors hover:text-paper";

export function Footer() {
  const year = new Date().getFullYear();
  const socials = [
    { label: "Instagram", href: instagramUrl(CONTACT.instagram) },
    { label: "TikTok", href: tiktokUrl(CONTACT.tiktok) },
  ];

  return (
    <footer data-tone="dark" className="bg-ink text-paper">
      <div className="container-alma grid grid-cols-2 gap-x-6 gap-y-12 py-16 md:grid-cols-4 md:py-20">
        <div className="col-span-2 md:col-span-1">
          <p className="font-serif text-2xl font-semibold tracking-[0.12em]">
            ALMA <span className="font-medium">LOCATION</span>
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-mist">
            Location de véhicules premium à Paris et en région parisienne.
          </p>
        </div>

        <FooterColumn title="Navigation">
          {NAV_LINKS.map((link) => (
            <Link key={link.to} to={link.to} className={LINK}>
              {link.label}
            </Link>
          ))}
        </FooterColumn>

        <FooterColumn title="Informations légales">
          {LEGAL_LINKS.map((link) => (
            <Link key={link.to} to={link.to} className={LINK}>
              {link.label}
            </Link>
          ))}
        </FooterColumn>

        <FooterColumn title="Réseaux sociaux">
          {socials.map((s) =>
            s.href ? (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className={LINK}>
                {s.label}
              </a>
            ) : (
              <span key={s.label} className="text-sm text-mist/60">
                {s.label} <span className="text-xs">— à venir</span>
              </span>
            ),
          )}
        </FooterColumn>
      </div>

      <div className="border-t border-line">
        <div className="container-alma flex flex-col gap-2 py-6 text-xs text-mist md:flex-row md:items-center md:justify-between">
          <p>© {year} ALMA LOCATION. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-gold">{title}</h2>
      <div className="mt-5 flex flex-col gap-3">{children}</div>
    </div>
  );
}
