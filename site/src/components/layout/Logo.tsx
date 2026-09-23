import { SectionLink } from "../common/SectionLink";

interface LogoProps {
  onClick?: () => void;
}

/** Identité ALMA LOCATION — cliquable, ramène toujours en haut de l'accueil. */
export function Logo({ onClick }: LogoProps) {
  return (
    <SectionLink
      section="accueil"
      onClick={onClick}
      className="group inline-flex items-baseline gap-2 font-serif tracking-wide"
      aria-label="ALMA LOCATION — retour à l'accueil"
    >
      <span className="text-xl font-semibold text-paper transition-colors group-hover:text-gold md:text-2xl">
        ALMA
      </span>
      <span className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.3em] text-mist md:text-xs">
        Location
      </span>
    </SectionLink>
  );
}
