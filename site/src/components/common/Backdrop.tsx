import { useState } from "react";
import { CarLineArt } from "./CarLineArt";

interface BackdropProps {
  /**
   * Fond graphique affiché TANT QU'AUCUNE PHOTO n'est fournie :
   * - "showroom" : salle d'exposition nocturne, projecteurs et sol réfléchissant ;
   * - "dusk" : ciel de Paris au crépuscule et ligne de toits ;
   * - "gradient" : dégradé gris vers noir (sections éditoriales).
   */
  variant: "showroom" | "dusk" | "gradient";
  /**
   * Photo réelle. Dès qu'elle est renseignée, le fond graphique (et son
   * dessin de voiture) n'est plus affiché : seule la photo est montrée.
   */
  image?: string;
  imageAlt?: string;
  /**
   * `object-position` CSS de la photo (ex. "76% 58%"), pour garder le bon
   * cadrage quand `object-fit: cover` recadre l'image sur un écran étroit.
   */
  imagePosition?: string;
  /**
   * Voile qui garantit la lisibilité du texte posé sur le fond :
   * - "soft" : bandeaux et sections éditoriales ;
   * - "strong" : texte long sur photo ;
   * - "hero" : grand hero, texte en bas à gauche (voile renforcé à gauche
   *   et en bas, photo laissée plus lumineuse en haut à droite).
   */
  overlay?: "soft" | "strong" | "hero";
}

const OVERLAYS = {
  soft: "bg-gradient-to-t from-ink/90 via-ink/35 to-ink/10",
  strong: "bg-gradient-to-t from-ink via-ink/80 to-ink/55",
  /*
   * Voile localisé pour le hero photo : sombre en haut à gauche (colonne de
   * texte), qui se dissipe en diagonale vers le bas-droite (la voiture),
   * sans jamais devenir totalement opaque — la carrosserie reste visible.
   * Un léger assombrissement horizontal en tout haut garantit la lisibilité
   * du header, quel que soit le contenu de la photo à cet endroit.
   */
  hero: "bg-[linear-gradient(125deg,rgba(8,8,8,0.88)_0%,rgba(8,8,8,0.72)_24%,rgba(8,8,8,0.44)_45%,rgba(8,8,8,0.2)_62%,rgba(8,8,8,0.05)_80%,rgba(8,8,8,0)_100%),linear-gradient(to_bottom,rgba(8,8,8,0.4)_0%,rgba(8,8,8,0)_16%)]",
};

/** Fond plein cadre des sections sombres (hero, bandeaux). Le parent doit être `relative`. */
export function Backdrop({ variant, image, imageAlt = "", imagePosition, overlay = "soft" }: BackdropProps) {
  return (
    <div aria-hidden={!image} className="absolute inset-0 overflow-hidden">
      {image ? (
        <BackdropPhoto src={image} alt={imageAlt} position={imagePosition} />
      ) : (
        <>
          {variant === "showroom" && <Showroom />}
          {variant === "dusk" && <Dusk />}
          {variant === "gradient" && (
            <div className="absolute inset-0 bg-[linear-gradient(155deg,#4a4a4a_0%,#1a1a1a_38%,#080808_72%)]" />
          )}
        </>
      )}
      <div className={`absolute inset-0 ${OVERLAYS[overlay]}`} />
    </div>
  );
}

/**
 * Photo plein cadre : fond noir pendant le chargement (jamais de dessin
 * ni d'icône par-dessus une vraie photo), puis apparition en fondu.
 */
function BackdropPhoto({ src, alt, position }: { src: string; alt: string; position?: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="absolute inset-0 bg-ink">
      <img
        src={src}
        alt={alt}
        fetchPriority="high"
        decoding="async"
        style={position ? { objectPosition: position } : undefined}
        ref={(img) => {
          if (img?.complete && img.naturalWidth > 0) setLoaded(true);
        }}
        onLoad={() => setLoaded(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}

function Showroom() {
  return (
    <div className="absolute inset-0 bg-ink">
      {/* Projecteurs */}
      <div className="absolute inset-0 bg-[radial-gradient(28%_45%_at_22%_0%,rgba(242,238,230,0.16),transparent_70%),radial-gradient(28%_45%_at_52%_0%,rgba(242,238,230,0.2),transparent_70%),radial-gradient(28%_45%_at_82%_0%,rgba(242,238,230,0.14),transparent_70%)]" />
      {/* Rails de plafond */}
      <div className="absolute inset-x-0 top-[9%] h-px bg-paper/10" />
      <div className="absolute inset-x-0 top-[15%] h-px bg-paper/5" />
      {/* Sol réfléchissant */}
      <div className="absolute inset-x-0 bottom-0 h-[7%] bg-[linear-gradient(to_bottom,rgba(242,238,230,0.08),transparent)]" />
      <div className="absolute inset-x-0 bottom-[7%] h-px bg-paper/10" />
      <CarLineArt className="absolute bottom-[3%] left-1/2 w-[118%] max-w-[900px] -translate-x-1/2 text-paper/20 md:w-[70%]" />
      {/* Reflet sur le sol */}
      <CarLineArt className="absolute bottom-[3%] left-1/2 w-[118%] max-w-[900px] -translate-x-1/2 translate-y-full -scale-y-100 text-paper/[0.07] md:w-[70%]" />
    </div>
  );
}

function Dusk() {
  return (
    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#1a1a1a_0%,#2a2a2a_32%,#3a3a3a_58%,#4a4a4a_68%,#1a1a1a_78%,#080808_100%)]">
      {/* Halo du crépuscule — gris neutre, sans teinte chaude */}
      <div className="absolute inset-x-0 top-[48%] h-[30%] bg-[radial-gradient(50%_60%_at_60%_60%,rgba(255,255,255,0.14),transparent_70%)]" />
      <svg
        viewBox="0 0 1200 400"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-x-0 bottom-0 h-[55%] w-full text-ink"
        fill="currentColor"
      >
        {/* Tour, au loin */}
        <path
          opacity={0.75}
          d="M742 60 h6 l3 40 l6 70 l10 70 l16 70 h-14 l-12 -44 h-26 l-12 44 h-14 l16 -70 l10 -70 l6 -70 z M735 168 h30 v6 h-30 z M724 238 h52 v7 h-52 z"
        />
        {/* Toits parisiens */}
        <path d="M0 330 V280 h40 v-18 h14 v18 h46 l20 -26 h70 l20 26 h30 v-40 h12 v40 h60 l18 -22 h90 l18 22 h40 v-30 h14 v30 h70 l22 -28 h96 l22 28 h28 v-20 h12 v20 h80 l18 -24 h84 l18 24 h40 v-36 h14 v36 h60 l20 -26 h90 l20 26 h40 v-22 h12 v22 h48 V400 H0 z" />
      </svg>
    </div>
  );
}
