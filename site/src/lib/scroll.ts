/**
 * Utilitaires de défilement partagés par le menu mobile, la lightbox de la
 * galerie et la navigation entre sections.
 */

let lockCount = 0;
let savedScrollY = 0;

/**
 * Bloque le défilement de la page derrière un calque (menu, lightbox).
 *
 * `overflow: hidden` sur le body ne suffit pas sur iOS Safari : on fige
 * donc le body en `position: fixed` à sa position courante, puis on la
 * restaure exactement au déverrouillage. Les appels sont comptés, ce qui
 * permet d'empiler plusieurs calques sans se marcher dessus.
 */
export function lockScroll() {
  lockCount += 1;
  if (lockCount > 1) return;

  savedScrollY = window.scrollY;
  const { style, dataset } = document.body;
  dataset.scrollLocked = "true";
  style.position = "fixed";
  style.top = `-${savedScrollY}px`;
  style.left = "0";
  style.right = "0";
  style.width = "100%";
  style.overflow = "hidden";
}

export function unlockScroll() {
  if (lockCount === 0) return;
  lockCount -= 1;
  if (lockCount > 0) return;

  const { style, dataset } = document.body;
  style.position = "";
  style.top = "";
  style.left = "";
  style.right = "";
  style.width = "";
  style.overflow = "";
  delete dataset.scrollLocked;
  window.scrollTo({ top: savedScrollY, behavior: "instant" });
}

export function isScrollLocked() {
  return document.body.dataset.scrollLocked === "true";
}

/** Hauteur réelle du header fixe, en pixels. */
export function getHeaderHeight() {
  return document.querySelector("[data-site-header]")?.getBoundingClientRect().height ?? 64;
}

/**
 * Fait défiler jusqu'au début d'une section. Le décalage du header est
 * géré en CSS par `scroll-margin-top` sur `[data-section]`.
 *
 * Si la page est encore verrouillée (menu en cours de fermeture), on
 * attend son déverrouillage pour ne pas défiler un body figé.
 */
export function scrollToSection(id: string, behavior: ScrollBehavior = "smooth", attempts = 20) {
  if (isScrollLocked()) {
    if (attempts > 0) {
      requestAnimationFrame(() => scrollToSection(id, behavior, attempts - 1));
    }
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior, block: "start" });
}
