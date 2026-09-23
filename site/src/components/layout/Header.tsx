import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { NAV_LINKS } from "../../data/site";
import { useBooking } from "../../context/BookingContext";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { goToBooking } = useBooking();

  // Ferme le menu mobile automatiquement si l'URL change (ex. navigation
  // vers la fiche d'un véhicule).
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Le header devient opaque dès que l'utilisateur commence à scroller,
  // pour rester lisible au-dessus de n'importe quelle section.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled ? "bg-ink/90 backdrop-blur-md border-b border-line" : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container-alma flex h-16 items-center justify-between md:h-20">
        <Logo />

        <nav aria-label="Navigation principale" className="hidden md:flex md:items-center md:gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={`/${link.href}`}
              className="text-sm font-medium tracking-wide text-paper/85 transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => goToBooking()}
            className="rounded-full bg-gold px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.12em] text-ink transition-transform hover:brightness-105 active:scale-[0.98]"
          >
            Réserver
          </button>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Ouvrir le menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="flex h-10 w-10 items-center justify-center text-paper md:hidden"
        >
          <Menu size={26} strokeWidth={1.75} />
        </button>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
