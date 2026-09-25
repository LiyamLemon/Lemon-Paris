import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { NAV_LINKS, ROUTES, isNavActive } from "../../data/site";
import { useHeaderTone } from "../../hooks/useHeaderTone";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

/**
 * Header fixe, toujours au-dessus du contenu (z-50). Il prend le ton de
 * la section qui passe dessous : sombre sur un hero noir, clair sur une
 * page blanc cassé. Le menu mobile est rendu à part, dans un portail.
 */
export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const { pathname } = useLocation();
  const tone = useHeaderTone(pathname);
  const dark = tone === "dark";

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        data-site-header
        className={`fixed inset-x-0 top-0 z-50 h-[var(--header-h)] border-b backdrop-blur-md transition-colors duration-500 ${
          dark ? "border-paper/5 bg-ink/85" : "border-stone bg-paper/90"
        }`}
      >
        <div className="container-alma flex h-full items-center justify-between">
          <Logo tone={tone} />

          <nav aria-label="Navigation principale" className="hidden lg:flex lg:items-center lg:gap-8">
            {NAV_LINKS.map((link) => {
              const active = isNavActive(link.to, pathname);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  aria-current={active ? "page" : undefined}
                  className={`relative py-2 text-sm tracking-wide transition-colors ${
                    active
                      ? dark
                        ? "text-gold"
                        : "text-gold-deep"
                      : dark
                        ? "text-paper/75 hover:text-paper"
                        : "text-graphite hover:text-anthracite"
                  }`}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 -bottom-0.5 mx-auto h-px bg-gold transition-all duration-300 ${
                      active ? "w-full opacity-100" : "w-0 opacity-0"
                    }`}
                  />
                </Link>
              );
            })}
            <Link
              to={ROUTES.booking}
              className={`inline-flex min-h-11 items-center rounded-full px-6 text-sm font-medium transition-colors ${
                dark ? "bg-gold text-ink hover:bg-gold-soft" : "bg-anthracite text-paper hover:bg-ink"
              }`}
            >
              Réserver
            </Link>
          </nav>

          <button
            ref={burgerRef}
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Ouvrir le menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className={`-mr-2.5 flex h-11 w-11 flex-col items-center justify-center gap-[7px] lg:hidden ${
              dark ? "text-paper" : "text-anthracite"
            }`}
          >
            <span className="h-[1.5px] w-7 rounded-full bg-current" />
            <span className="h-[1.5px] w-7 rounded-full bg-current" />
            <span className="h-[1.5px] w-7 rounded-full bg-current" />
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} returnFocusRef={burgerRef} />
    </>
  );
}
