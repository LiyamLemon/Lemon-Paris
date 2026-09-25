import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { CONTACT, NAV_LINKS } from "../../data/site";
import { instagramUrl, tiktokUrl } from "../../lib/contact";

const LEGAL_LINKS = [
  { label: "Mentions légales", to: "/mentions-legales" },
  { label: "Politique de confidentialité", to: "/confidentialite" },
  { label: "CGV / Conditions de location", to: "/cgv" },
];

const LINK = "w-fit text-[0.8rem] leading-snug text-mist transition-colors hover:text-paper md:text-sm";

/**
 * Footer compact : marque, puis navigation et informations légales côte à
 * côte dès le mobile, réseaux sociaux et copyright sur une même ligne basse.
 */
export function Footer() {
  const year = new Date().getFullYear();
  const socials = [
    { label: "Instagram", href: instagramUrl(CONTACT.instagram) },
    { label: "TikTok", href: tiktokUrl(CONTACT.tiktok) },
  ];

  return (
    <footer data-tone="dark" className="bg-ink text-paper">
      <div className="container-alma grid grid-cols-2 gap-x-6 gap-y-8 pb-8 pt-10 md:grid-cols-[1.4fr_1fr_1fr] md:gap-10 md:pb-12 md:pt-14">
        <div className="col-span-2 md:col-span-1">
          <p className="font-serif text-lg font-semibold tracking-[0.14em] md:text-xl">
            ALMA <span className="font-medium">LOCATION</span>
          </p>
          <p className="mt-2 max-w-xs text-[0.8rem] leading-relaxed text-mist md:text-sm">
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
      </div>

      <div className="border-t border-line">
        <div className="container-alma flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-4 text-xs text-mist">
          <p>© {year} ALMA LOCATION</p>
          <p className="flex items-center gap-4" aria-label="Réseaux sociaux">
            {socials.map((s) =>
              s.href ? (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="transition-colors hover:text-paper">
                  {s.label}
                </a>
              ) : (
                <span key={s.label} className="text-mist/60">
                  {s.label}
                </span>
              ),
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="text-[0.62rem] font-semibold uppercase tracking-[0.25em] text-gold">{title}</h2>
      <div className="mt-3 flex flex-col gap-2">{children}</div>
    </div>
  );
}
