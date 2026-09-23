import { Link } from "react-router-dom";

interface LogoProps {
  onClick?: () => void;
}

/** Identité ALMA LOCATION — cliquable, ramène toujours à l'accueil. */
export function Logo({ onClick }: LogoProps) {
  return (
    <Link
      to="/#accueil"
      onClick={onClick}
      className="group inline-flex items-baseline gap-2 font-serif tracking-wide"
      aria-label="ALMA LOCATION — retour à l'accueil"
    >
      <span className="text-xl md:text-2xl font-semibold text-paper transition-colors group-hover:text-gold">
        ALMA
      </span>
      <span className="text-[0.65rem] md:text-xs font-sans font-medium tracking-[0.3em] text-mist uppercase">
        Location
      </span>
    </Link>
  );
}
