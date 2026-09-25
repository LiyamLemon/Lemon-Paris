import { useEffect, useRef } from "react";

interface ScrollScrubVideoProps {
  /** Chemin du fichier vidéo. Rien n'est chargé tant qu'il est vide. */
  src?: string;
  /**
   * Progression 0..1 à suivre (calculée par le parent, généralement à
   * partir de la position de scroll dans un conteneur épinglé). Le
   * composant ne dicte aucune mise en page : il ne fait qu'illustrer
   * cette valeur sur la vidéo.
   */
  progress: number;
  className?: string;
  /** Appelé une fois la vidéo prête à être scrubée (métadonnées chargées). */
  onReady?: () => void;
  /** Appelé si le chargement échoue : le parent garde son fond de repli. */
  onError?: () => void;
}

/**
 * Moteur vidéo « scroll-scrub » : une vidéo dont la position de lecture
 * suit une progression 0..1 fournie par le parent, au lieu de jouer en
 * continu. Composant technique pur, sans mise en page ni habillage
 * visuel — voir README.md dans ce dossier pour l'intégration future dans
 * le hero de l'accueil.
 *
 * Ce composant n'est pas encore utilisé ailleurs dans le site. Il existe
 * pour être prêt le jour où une vraie vidéo cinématique est fournie.
 *
 * Comportement, dans l'ordre :
 * - Rien n'est chargé si `src` est vide : le composant ne rend rien
 *   (jamais de requête réseau, jamais de dépendance qui pourrait casser
 *   le hero actuel).
 * - Le fichier est récupéré en Blob (et non en `<video src>` direct) :
 *   de nombreux hébergeurs ne supportent pas le "Range" HTTP partiel, et
 *   sans ça, chaque déplacement dans la vidéo revient à zéro. Le Blob
 *   fonctionne partout.
 * - La progression affichée est lissée (`lerp`) vers la progression
 *   cible dans une boucle `requestAnimationFrame` qui s'arrête dès
 *   qu'elle a rattrapé sa cible : pas de boucle qui tourne dans le vide
 *   et vide la batterie.
 * - Les déplacements dans la vidéo (`currentTime`) sont mis en file :
 *   jamais deux déplacements simultanés, qui bloqueraient la lecture sur
 *   certains navigateurs.
 * - En cas d'échec (réseau, format, fichier manquant), `onError` prévient
 *   le parent, qui garde son fond de repli. Le composant ne casse jamais
 *   la page : au pire, il ne montre rien.
 */
export function ScrollScrubVideo({ src, progress, className = "", onReady, onError }: ScrollScrubVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef(progress);
  const shownRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastTickRef = useRef(0);
  const seekingRef = useRef(false);
  const pendingSeekRef = useRef<number | null>(null);
  const onReadyRef = useRef(onReady);
  const onErrorRef = useRef(onError);
  onReadyRef.current = onReady;
  onErrorRef.current = onError;

  // La progression cible est lue dans la boucle rAF via une ref : la
  // mettre à jour ne doit jamais réinitialiser la boucle ni le lissage.
  useEffect(() => {
    progressRef.current = progress;
    wake();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress]);

  function wake() {
    if (rafRef.current === null) rafRef.current = requestAnimationFrame(tick);
  }

  function requestSeek(time: number) {
    const video = videoRef.current;
    if (!video || !Number.isFinite(time)) return;
    if (seekingRef.current) {
      pendingSeekRef.current = time;
      return;
    }
    seekingRef.current = true;
    video.currentTime = time;
  }

  function tick(now: number) {
    rafRef.current = null;
    const video = videoRef.current;
    if (!video || !video.duration) return;

    const dt = Math.min(100, now - (lastTickRef.current || now));
    lastTickRef.current = now;
    const k = 0.16; // lissage par frame à 60fps ; le point de départ éprouvé du skill de référence
    const target = progressRef.current;
    shownRef.current += (target - shownRef.current) * (1 - Math.pow(1 - k, dt / 16.667));

    if (Math.abs(target - shownRef.current) < 0.0005) {
      shownRef.current = target;
      lastTickRef.current = 0; // convergé : la boucle se repose
    } else {
      rafRef.current = requestAnimationFrame(tick);
    }

    requestSeek(shownRef.current * video.duration);
  }

  useEffect(() => {
    if (!src) return;

    const video = videoRef.current;
    if (!video) return;

    const controller = new AbortController();
    let objectUrl: string | null = null;
    let cancelled = false;

    const onSeeked = () => {
      seekingRef.current = false;
      if (pendingSeekRef.current !== null) {
        const next = pendingSeekRef.current;
        pendingSeekRef.current = null;
        requestSeek(next);
      }
    };
    const onLoadedMetadata = () => {
      if (cancelled) return;
      onReadyRef.current?.();
      wake();
    };
    const onVideoError = () => {
      if (cancelled) return;
      onErrorRef.current?.();
    };

    video.addEventListener("seeked", onSeeked);
    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("error", onVideoError);

    fetch(src, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.blob();
      })
      .then((blob) => {
        if (cancelled) return;
        objectUrl = URL.createObjectURL(blob);
        video.src = objectUrl;
      })
      .catch((error) => {
        if (cancelled || (error instanceof DOMException && error.name === "AbortError")) return;
        onErrorRef.current?.();
      });

    return () => {
      cancelled = true;
      controller.abort();
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("error", onVideoError);
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [src]);

  if (!src) return null;

  return (
    <video
      ref={videoRef}
      className={className}
      muted
      playsInline
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}
