import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { scrollToSection } from "../lib/scroll";

interface SectionNavigationState {
  section?: string;
}

/**
 * Gère le défilement à chaque navigation :
 * - vers une section (état `{ section }` porté par le lien) : défilement
 *   fluide si l'on est déjà sur la page, saut direct si l'on arrive d'une
 *   autre page (ex. "Réserver" depuis une fiche véhicule) ;
 * - vers une nouvelle page sans section : retour en haut.
 *
 * L'état de navigation est préféré au hash d'URL, déjà utilisé par le
 * HashRouter.
 */
export function useSectionScroll() {
  const location = useLocation();
  const previousPath = useRef<string | null>(null);

  useEffect(() => {
    const section = (location.state as SectionNavigationState | null)?.section;
    const samePage = previousPath.current === location.pathname;

    // Le chemin précédent n'est mis à jour qu'une fois le défilement
    // exécuté, pour rester correct si l'effet est rejoué (StrictMode).
    const frame = requestAnimationFrame(() => {
      previousPath.current = location.pathname;
      if (section) {
        scrollToSection(section, samePage ? "smooth" : "instant");
      } else if (!samePage) {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    });
    return () => cancelAnimationFrame(frame);
    // location.key change à chaque navigation, y compris vers la même section.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key]);
}
