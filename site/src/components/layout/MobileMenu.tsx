import { useEffect, useRef, type RefObject } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import { NAV_LINKS, ROUTES, isNavActive } from "../../data/site";
import { useScrollLock } from "../../hooks/useScrollLock";
import { Logo } from "./Logo";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  /** Bouton qui a ouvert le menu : il récupère le focus à la fermeture. */
  returnFocusRef: RefObject<HTMLButtonElement | null>;
}

/**
 * Menu mobile : panneau clair qui descend du haut de l'écran, au-dessus
 * d'un voile qui recouvre le reste de la page.
 *
 * Rendu dans un portail sous <body> (z-60) : aucun conteneur de la page
 * ne peut le recouvrir. La page est bloquée tant qu'il est ouvert, et la
 * rubrique de la page courante est mise en évidence.
 */
export function MobileMenu({ open, onClose, returnFocusRef }: MobileMenuProps) {
  const { pathname } = useLocation();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  useScrollLock(open);

  useEffect(() => {
    if (open) {
      closeButtonRef.current?.focus({ preventScroll: true });
    } else if (wasOpen.current) {
      returnFocusRef.current?.focus({ preventScroll: true });
    }
    wasOpen.current = open;
  }, [open, returnFocusRef]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    // Le menu n'existe que sous 1024px : s'il reste ouvert pendant un
    // passage en largeur desktop, on le ferme pour ne pas bloquer la page.
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onBreakpoint = () => desktop.matches && onClose();
    window.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [open, onClose]);

  return createPortal(
    <div
      id="mobile-menu"
      inert={!open}
      className={`fixed inset-0 z-[60] transition-[visibility] lg:hidden ${open ? "visible delay-0" : "invisible delay-500"}`}
    >
      {/* Voile : recouvre la page sous le panneau, ferme au toucher */}
      <button
        type="button"
        tabIndex={-1}
        aria-label="Fermer le menu"
        onClick={onClose}
        className={`absolute inset-0 bg-ink/55 backdrop-blur-[2px] transition-opacity duration-500 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navigation"
        className={`absolute inset-x-0 top-0 flex max-h-svh flex-col overflow-hidden bg-paper shadow-[0_30px_60px_-20px_rgba(14,13,11,0.45)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="shrink-0 border-b border-stone bg-ivory">
          <div className="container-alma flex h-[var(--header-h)] items-center justify-between">
            <Logo tone="light" onClick={onClose} />
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Fermer le menu"
              className="-mr-3 flex h-11 w-11 items-center justify-center text-anthracite"
            >
              <X size={21} strokeWidth={1.25} />
            </button>
          </div>
        </div>

        <nav
          aria-label="Navigation mobile"
          className="container-alma overflow-y-auto overscroll-contain pb-[max(2.25rem,env(safe-area-inset-bottom))] pt-4"
        >
          <ul>
            {NAV_LINKS.map((link, i) => {
              const active = isNavActive(link.to, pathname);
              return (
                <li
                  key={link.to}
                  style={{ transitionDelay: open ? `${120 + i * 45}ms` : "0ms" }}
                  className={`border-b border-stone/70 transition-[opacity,transform] duration-500 ${
                    open ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
                  }`}
                >
                  <Link
                    to={link.to}
                    onClick={onClose}
                    aria-current={active ? "page" : undefined}
                    className="flex min-h-[3.75rem] items-center gap-4"
                  >
                    <span
                      aria-hidden="true"
                      className={`h-px shrink-0 bg-gold transition-all duration-300 ${
                        active ? "w-6 opacity-100" : "w-0 opacity-0"
                      }`}
                    />
                    <span
                      className={`font-serif text-[1.85rem] font-medium leading-none ${
                        active ? "text-gold-deep italic" : "text-anthracite"
                      }`}
                    >
                      {link.label}
                    </span>
                    {active && (
                      <span className="ml-auto text-[0.6rem] font-semibold uppercase tracking-[0.25em] text-gold-deep">
                        Vous êtes ici
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            to={ROUTES.booking}
            onClick={onClose}
            style={{ transitionDelay: open ? "420ms" : "0ms" }}
            className={`mt-8 inline-flex min-h-[3.25rem] items-center rounded-full bg-anthracite px-10 text-sm font-medium tracking-[0.04em] text-paper transition-[opacity,transform] duration-500 active:scale-[0.98] ${
              open ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
            }`}
          >
            Réserver
          </Link>
        </nav>
      </div>
    </div>,
    document.body,
  );
}
