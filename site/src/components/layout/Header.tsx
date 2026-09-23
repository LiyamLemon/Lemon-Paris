import { useCallback, useEffect, useRef, useState } from "react";
import { Menu } from "lucide-react";
import { useLocation } from "react-router-dom";
import { NAV_LINKS, SECTION_IDS } from "../../data/site";
import { useBooking } from "../../context/BookingContext";
import { useActiveSection } from "../../hooks/useActiveSection";
import { SectionLink } from "../common/SectionLink";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

/**
 * Header fixe, toujours visible et toujours au-dessus du contenu (z-50).
 * Le menu mobile est rendu à part, dans un portail, au-dessus du header.
 */
export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const { pathname } = useLocation();
  const { goToBooking } = useBooking();

  const isHome = pathname === "/";
  const spiedSection = useActiveSection(SECTION_IDS, isHome);
  // Hors de l'accueil : une fiche véhicule appartient à "Notre Flotte".
  const activeSection = isHome ? spiedSection : pathname.startsWith("/flotte/") ? "flotte" : null;

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        data-site-header
        className={`fixed inset-x-0 top-0 z-50 h-[var(--header-h)] border-b bg-ink/95 backdrop-blur-md transition-colors duration-300 ${
          scrolled ? "border-line" : "border-transparent"
        }`}
      >
        <div className="container-alma flex h-full items-center justify-between">
          <Logo />

          <nav aria-label="Navigation principale" className="hidden md:flex md:items-center md:gap-7">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.section;
              return (
                <SectionLink
                  key={link.section}
                  section={link.section}
                  aria-current={isActive ? "location" : undefined}
                  className={`relative py-2 text-sm font-medium tracking-wide transition-colors hover:text-gold ${
                    isActive ? "text-gold" : "text-paper/80"
                  }`}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 -bottom-0.5 mx-auto h-px bg-gold transition-all duration-300 ${
                      isActive ? "w-full opacity-100" : "w-0 opacity-0"
                    }`}
                  />
                </SectionLink>
              );
            })}
            <button
              type="button"
              onClick={() => goToBooking()}
              className="rounded-full bg-gold px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.12em] text-ink transition hover:brightness-105 active:scale-[0.98]"
            >
              Réserver
            </button>
          </nav>

          <button
            ref={burgerRef}
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Ouvrir le menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="-mr-2 flex h-11 w-11 items-center justify-center text-paper transition-colors hover:text-gold md:hidden"
          >
            <Menu size={26} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={closeMenu}
        activeSection={activeSection}
        returnFocusRef={burgerRef}
      />
    </>
  );
}
