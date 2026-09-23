import { useEffect } from "react";
import { lockScroll, unlockScroll } from "../lib/scroll";

/** Bloque le défilement de la page tant que `active` est vrai. */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    lockScroll();
    return unlockScroll;
  }, [active]);
}
