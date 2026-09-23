import { useEffect, useRef } from "react";

/**
 * Ajoute la classe "is-visible" à l'élément dès qu'il entre dans le
 * viewport, déclenchant l'animation "reveal" définie dans index.css.
 *
 * Seuil à 0 (et non en pourcentage) : un élément très haut, comme le
 * formulaire de réservation sur mobile, doit apparaître dès qu'il pointe
 * dans l'écran.
 */
export function useReveal<T extends HTMLElement>(delayMs = 0) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let timeout = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timeout = window.setTimeout(() => el.classList.add("is-visible"), delayMs);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      window.clearTimeout(timeout);
    };
  }, [delayMs]);

  return ref;
}
