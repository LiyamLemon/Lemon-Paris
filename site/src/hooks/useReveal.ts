import { useEffect, useRef } from "react";

/**
 * Ajoute la classe "is-visible" à l'élément dès qu'il entre dans le
 * viewport, déclenchant l'animation "reveal" définie dans index.css.
 * Utilisé pour l'apparition légère des sections et des cartes.
 */
export function useReveal<T extends HTMLElement>(delayMs = 0) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.setTimeout(() => el.classList.add("is-visible"), delayMs);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delayMs]);

  return ref;
}
