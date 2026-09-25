import { useEffect, useState } from "react";

/**
 * Préférence système « mouvement réduit », mise à jour en direct si
 * l'utilisateur la change pendant que la page est ouverte (et pas
 * seulement lue une fois au chargement).
 *
 * Utile pour toute décision en JavaScript qui doit respecter cette
 * préférence (ex. ne pas lancer le chargement d'une vidéo). Les
 * animations purement CSS du site (`.reveal` dans src/index.css) la
 * respectent déjà via une media query et n'ont pas besoin de ce hook.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(query.matches);
    onChange();
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
