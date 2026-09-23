import { useEffect, useState } from "react";
import { getHeaderHeight, isScrollLocked } from "../lib/scroll";

/**
 * Détermine la section actuellement lue par l'utilisateur.
 *
 * Une section devient active dès que son début franchit une ligne située
 * sous le header (à 30 % de la hauteur visible restante). Arrivée par le
 * menu, une section est calée pile sous le header : elle est donc active
 * immédiatement. En bas de page, la dernière section est forcée active
 * (elle peut être trop courte pour atteindre la ligne).
 *
 * Calcul basé sur la position réelle des éléments à chaque frame de
 * scroll — plus fiable qu'un IntersectionObserver pour des sections de
 * hauteurs très différentes.
 */
export function useActiveSection(ids: readonly string[], enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      setActive(null);
      return;
    }

    let frame = 0;

    const compute = () => {
      frame = 0;
      // Page figée derrière le menu : on conserve la section courante.
      if (isScrollLocked()) return;

      const headerHeight = getHeaderHeight();
      const line = headerHeight + (window.innerHeight - headerHeight) * 0.3;

      let current: string | null = null;
      let last: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        last = id;
        if (el.getBoundingClientRect().top <= line) current = id;
      }

      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom && last) current = last;

      setActive(current ?? ids[0] ?? null);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ids, enabled]);

  return active;
}
