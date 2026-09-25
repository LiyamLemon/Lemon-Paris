import { Link } from "react-router-dom";

interface LogoProps {
  tone?: "light" | "dark";
  onClick?: () => void;
}

/** Identité ALMA LOCATION — ramène toujours à l'accueil. */
export function Logo({ tone = "light", onClick }: LogoProps) {
  const dark = tone === "dark";
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="ALMA LOCATION — accueil"
      className="group inline-flex items-center gap-3"
    >
      <span
        aria-hidden="true"
        className={`flex h-8 w-8 items-center justify-center rounded-full border font-serif text-lg font-semibold italic leading-none transition-colors ${
          dark ? "border-paper/30 text-paper" : "border-anthracite/25 text-anthracite"
        } group-hover:border-gold`}
      >
        A
      </span>
      <span
        className={`font-serif text-[1.35rem] font-semibold tracking-[0.12em] transition-colors md:text-2xl ${
          dark ? "text-paper" : "text-anthracite"
        }`}
      >
        ALMA <span className="font-medium">LOCATION</span>
      </span>
    </Link>
  );
}
