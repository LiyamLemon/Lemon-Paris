import { Link } from "react-router-dom";

interface LogoProps {
  tone?: "light" | "dark";
  onClick?: () => void;
}

/** Identité ALMA LOCATION — ramène toujours à l'accueil. */
export function Logo({ tone = "light", onClick }: LogoProps) {
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="ALMA LOCATION — accueil"
      className={`font-serif text-[1.15rem] font-semibold leading-none tracking-[0.14em] transition-colors duration-500 hover:text-gold md:text-xl ${
        tone === "dark" ? "text-paper" : "text-anthracite"
      }`}
    >
      ALMA <span className="font-medium">LOCATION</span>
    </Link>
  );
}
