import { CarLineArt } from "./CarLineArt";
import { SmartImage } from "./SmartImage";

interface BackdropProps {
  /**
   * Fond graphique affiché tant qu'aucune photo n'est fournie :
   * - "showroom" : salle d'exposition nocturne, projecteurs et sol réfléchissant ;
   * - "dusk" : ciel de Paris au crépuscule et ligne de toits ;
   * - "gradient" : dégradé gris vers noir (sections éditoriales).
   */
  variant: "showroom" | "dusk" | "gradient";
  /** Photo réelle optionnelle (prioritaire sur le fond graphique). */
  image?: string;
  imageAlt?: string;
  /** Intensité du voile sombre qui garantit la lisibilité du texte. */
  overlay?: "soft" | "strong";
}

/** Fond plein cadre des sections sombres (hero, bandeaux). Le parent doit être `relative`. */
export function Backdrop({ variant, image, imageAlt = "", overlay = "soft" }: BackdropProps) {
  return (
    <div aria-hidden={!image} className="absolute inset-0 overflow-hidden">
      {variant === "showroom" && <Showroom />}
      {variant === "dusk" && <Dusk />}
      {variant === "gradient" && (
        <div className="absolute inset-0 bg-[linear-gradient(155deg,#6f6a63_0%,#2c2925_38%,#0e0d0b_72%)]" />
      )}

      {image && <SmartImage src={image} alt={imageAlt} placeholderTone="dark" loading="eager" />}

      <div
        className={`absolute inset-0 ${
          overlay === "strong"
            ? "bg-gradient-to-t from-ink via-ink/80 to-ink/55"
            : "bg-gradient-to-t from-ink/90 via-ink/35 to-ink/10"
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
    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#151b27_0%,#3a3440_32%,#8a5b43_58%,#c78a55_68%,#2a211b_78%,#0e0d0b_100%)]">
      {/* Halo du soleil couchant */}
      <div className="absolute inset-x-0 top-[48%] h-[30%] bg-[radial-gradient(50%_60%_at_60%_60%,rgba(230,170,110,0.45),transparent_70%)]" />
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
