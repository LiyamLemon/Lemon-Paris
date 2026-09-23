import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SectionNavigationState {
  section?: string;
}

/**
 * Fait défiler la page jusqu'à la section demandée (ex. depuis un lien
 * "Notre Flotte" cliqué depuis la fiche d'un véhicule) via l'état de
 * navigation de React Router, plutôt que via le hash de l'URL.
 *
 * On n'utilise volontairement pas le hash d'URL (`/#flotte`) : combiné à
 * un hébergement en aperçu (artifact, sous-répertoire, etc.), un chemin
 * absolu poussé par l'historique peut perdre son préfixe d'hébergement et
 * casser la navigation. L'état de navigation, lui, reste fiable quel que
 * soit l'endroit où le site est servi.
 */
export function useSectionScroll() {
  const location = useLocation();
  const state = location.state as SectionNavigationState | null;

  useEffect(() => {
    const section = state?.section;
    if (!section) return;
    const frame = requestAnimationFrame(() => {
      document.getElementById(section)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return () => cancelAnimationFrame(frame);
    // location.key change à chaque navigation, y compris vers la même section.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key]);
}
