import { useEffect } from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { NAV_LINKS } from "../../data/site";
import { useBooking } from "../../context/BookingContext";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Panneau de navigation mobile en plein écran, ouvert/fermé par le bouton
 * hamburger du Header. Se ferme au clic sur un lien, sur la croix, ou sur
 * l'overlay.
 */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { goToBooking } = useBooking();

  // Empêche le scroll du fond pendant que le menu est ouvert.
  useEffect(() => {
    if (open) {
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previous;
      };
    }
  }, [open]);

  // Fermeture au clavier (touche Échap).
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 md:hidden ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      {/* Overlay */}
      <button
        type="button"
        aria-label="Fermer le menu"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
        className={`absolute inset-0 bg-ink/70 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Panneau */}
      <nav
        id="mobile-menu"
        aria-label="Navigation principale"
        className={`absolute inset-y-0 right-0 flex w-[85%] max-w-sm flex-col bg-ink-soft px-7 pb-8 pt-6 shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="font-serif text-lg font-semibold tracking-wide text-paper">
            ALMA <span className="font-sans text-xs font-medium tracking-[0.3em] text-mist">LOCATION</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer le menu"
            className="flex h-10 w-10 items-center justify-center rounded-full text-paper transition-colors hover:bg-white/5 hover:text-gold"
          >
            <X size={22} strokeWidth={1.75} />
          </button>
        </div>

        <ul className="mt-12 flex flex-1 flex-col gap-1">
          {NAV_LINKS.map((link, i) => (
            <li
              key={link.section}
              className={`border-b border-line ${open ? "animate-fade" : ""}`}
              style={{ animationDelay: open ? `${80 + i * 45}ms` : undefined, opacity: open ? undefined : 0 }}
            >
              <Link
                to="/"
                state={{ section: link.section }}
                onClick={onClose}
                className="block py-4 font-serif text-2xl text-paper transition-colors hover:text-gold"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => {
            onClose();
            goToBooking();
          }}
          className="mt-8 w-full rounded-full bg-gold px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.15em] text-ink transition-transform active:scale-[0.98]"
        >
          Réserver
        </button>
      </nav>
    </div>
  );
}
