import { useEffect, useState } from "react";
import { getHeaderHeight, isScrollLocked } from "../lib/scroll";

export type Tone = "light" | "dark";

/**
 * Détermine si le header doit être clair ou sombre, d'après la section
 * qui passe sous lui. Chaque section déclare son fond via
 * `data-tone="light" | "dark"` : le header reste ainsi toujours lisible,
 * noir au-dessus d'un hero sombre, blanc cassé au-dessus d'une page claire.
 */
export function useHeaderTone(pathname: string): Tone {
  const [tone, setTone] = useState<Tone>("light");

  useEffect(() => {
    let frame = 0;

    const compute = () => {
      frame = 0;
      if (isScrollLocked()) return;
      const probe = getHeaderHeight() / 2;
      let next: Tone = "light";
      for (const el of document.querySelectorAll<HTMLElement>("[data-tone]")) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= probe && rect.bottom > probe) {
          next = el.dataset.tone === "dark" ? "dark" : "light";
        }
      }
      setTone(next);
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
  }, [pathname]);

  return tone;
}
