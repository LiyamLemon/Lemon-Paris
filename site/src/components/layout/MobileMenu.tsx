import { useEffect, useRef, type RefObject } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { NAV_LINKS } from "../../data/site";
import { useBooking } from "../../context/BookingContext";
import { useScrollLock } from "../../hooks/useScrollLock";
import { SectionLink } from "../common/SectionLink";
import { Logo } from "./Logo";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  /** Section actuellement lue, mise en évidence dans le menu. */
  activeSection: string | null;
  /** Bouton qui a ouvert le menu : il récupère le focus à la fermeture. */
  returnFocusRef: RefObject<HTMLButtonElement | null>;
}

/**
 * Menu mobile plein écran.
 *
 * Rendu dans un portail directement sous <body> : il ne dépend ainsi
 * d'aucun conteneur parent (header avec backdrop-filter, sections animées)
 * et passe toujours au-dessus de tout le contenu. La page derrière est
 * bloquée tant qu'il est ouvert.
 */
export function MobileMenu({ open, onClose, activeSection, returnFocusRef }: MobileMenuProps) {
  const { goToBooking } = useBooking();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  useScrollLock(open);

  // Focus : sur la croix à l'ouverture, sur le hamburger à la fermeture.
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
    // Le menu n'existe qu'en mobile : s'il reste ouvert pendant un passage
    // en largeur desktop (rotation d'une tablette), on le ferme pour ne
    // pas laisser la page bloquée.
    const desktop = window.matchMedia("(min-width: 768px)");
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
      role="dialog"
      aria-modal="true"
      aria-label="Menu de navigation"
      inert={!open}
      className={`fixed inset-0 z-[60] flex flex-col bg-ink transition-[opacity,visibility] duration-300 ease-out md:hidden ${
        open ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div className="container-alma flex h-[var(--header-h)] shrink-0 items-center justify-between border-b border-line">
        <Logo onClick={onClose} />
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Fermer le menu"
          className="-mr-2 flex h-11 w-11 items-center justify-center text-paper transition-colors hover:text-gold"
        >
          <X size={26} strokeWidth={1.5} />
        </button>
      </div>

      <nav
        aria-label="Navigation mobile"
        className="container-alma flex flex-1 flex-col overflow-y-auto overscroll-contain pb-[max(2rem,env(safe-area-inset-bottom))] pt-6"
      >
        <ul>
          {NAV_LINKS.map((link, i) => {
            const isActive = activeSection === link.section;
            return (
              <li
                key={link.section}
                style={{ transitionDelay: open ? `${80 + i * 40}ms` : "0ms" }}
                className={`border-b border-line transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                }`}
              >
                <SectionLink
                  section={link.section}
                  onClick={onClose}
                  aria-current={isActive ? "location" : undefined}
                  className="flex items-center gap-4 py-[1.1rem]"
                >
                  <span
                    aria-hidden="true"
                    className={`h-px shrink-0 bg-gold transition-all duration-300 ${
                      isActive ? "w-6 opacity-100" : "w-0 opacity-0"
                    }`}
                  />
                  <span
                    className={`font-serif text-[1.7rem] leading-tight transition-colors ${
                      isActive ? "text-gold" : "text-paper"
                    }`}
                  >
                    {link.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`ml-auto text-[0.7rem] tabular-nums tracking-[0.2em] ${
                      isActive ? "text-gold" : "text-mist/60"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </SectionLink>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={() => {
            onClose();
            goToBooking();
          }}
          className={`mt-10 w-full rounded-full bg-gold px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.15em] text-ink transition-[opacity,transform] duration-500 active:scale-[0.98] ${
            open ? "translate-y-0 opacity-100 delay-300" : "translate-y-2 opacity-0"
          }`}
        >
          Réserver
        </button>
      </nav>
    </div>,
    document.body,
  );
}
