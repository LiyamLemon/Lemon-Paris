import { useEffect, useState } from "react";

export type HeroMode = "cinematic" | "static";

/**
 * Décide si le futur hero de l'accueil doit tenter l'expérience
 * cinématique (vidéo pilotée par le scroll, desktop) ou servir la version
 * statique légère (téléphone, tablette, mouvement réduit).
 *
 * Cinq conditions basculent vers "static", réévaluées en direct — pas
 * une seule fois au chargement — pour rester correctes après une
 * rotation d'écran, un redimensionnement de fenêtre ou un changement de
 * préférence pendant que la page est ouverte :
 *
 * 1. Téléphone (largeur ≤ 720px)
 * 2. Tablette en portrait (portrait ET largeur ≤ 1024px)
 * 3. Pointeur imprécis en portrait (portrait ET pointeur tactile)
 * 4. Téléphone en paysage (paysage ET pointeur tactile ET hauteur ≤ 560px :
 *    un téléphone tenu à l'horizontale passe les tests de largeur mais n'a
 *    pas la hauteur nécessaire pour le voyage au scroll)
 * 5. Mouvement réduit demandé par l'utilisateur
 *
 * N'est pas encore utilisé par HomeHero : cette décision sera branchée
 * au moment de construire le hero avec de vrais assets (voir le README
 * dans src/components/cinematic/).
 */
export function useHeroCapability(): HeroMode {
  const [mode, setMode] = useState<HeroMode>("static");

  useEffect(() => {
    const queries = HERO_STATIC_GATES.map((query) => window.matchMedia(query));

    const evaluate = () => {
      setMode(queries.some((query) => query.matches) ? "static" : "cinematic");
    };

    evaluate();
    queries.forEach((query) => query.addEventListener("change", evaluate));
    return () => queries.forEach((query) => query.removeEventListener("change", evaluate));
  }, []);

  return mode;
}

/**
 * Les cinq media queries elles-mêmes, exportées pour être reproduites à
 * l'identique côté CSS (ex. masquer les commandes vidéo, figer le poster)
 * le jour où le hero cinématique existe. Les deux côtés doivent toujours
 * matcher caractère pour caractère.
 */
export const HERO_STATIC_GATES = [
  "(max-width: 720px)",
  "(orientation: portrait) and (max-width: 1024px)",
  "(orientation: portrait) and (pointer: coarse)",
  "(orientation: landscape) and (pointer: coarse) and (max-height: 560px)",
  "(prefers-reduced-motion: reduce)",
] as const;
