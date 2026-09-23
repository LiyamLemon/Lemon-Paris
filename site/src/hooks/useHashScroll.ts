import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Fait défiler la page jusqu'à l'élément correspondant au hash de l'URL
 * (ex. "/#reservation") à chaque changement de route ou de hash. Nécessaire
 * car React Router ne gère pas nativement le scroll-to-hash entre pages.
 */
export function useHashScroll() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    // Laisse le temps au DOM de la nouvelle page de se peindre.
    const frame = requestAnimationFrame(() => {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return () => cancelAnimationFrame(frame);
  }, [location.pathname, location.hash]);
}
