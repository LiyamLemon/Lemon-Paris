import { CarLineArt } from "./CarLineArt";

interface PhotoPlaceholderProps {
  /** Nom affiché (ex. modèle du véhicule, catégorie de la galerie). */
  label?: string;
  tone?: "light" | "dark";
  /** Version compacte pour les petites vignettes (pas de texte). */
  compact?: boolean;
}

/**
 * Visuel d'attente pour une photo pas encore fournie.
 *
 * Conçu comme un fond de studio photo (dégradé, sol, silhouette en trait
 * fin) et clairement légendé « Photo à venir » : il remplit son cadre et
 * ne ressemble jamais à une image cassée.
 */
export function PhotoPlaceholder({ label, tone = "light", compact = false }: PhotoPlaceholderProps) {
  const light = tone === "light";
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden ${
        light
          ? "bg-[radial-gradient(120%_80%_at_50%_0%,#fbfaf7_0%,#ebe7df_55%,#ddd8ce_100%)]"
          : "bg-[radial-gradient(120%_80%_at_50%_0%,#2a2621_0%,#171512_60%,#0e0d0b_100%)]"
      }`}
    >
      {/* Ligne d'horizon du studio */}
      <div
        className={`absolute inset-x-0 top-[68%] h-px ${light ? "bg-stone" : "bg-line"}`}
      />
      {/* Ombre au sol */}
      <div
        className={`absolute left-1/2 top-[70%] h-6 w-[62%] -translate-x-1/2 rounded-[50%] blur-md ${
          light ? "bg-anthracite/10" : "bg-black/50"
        }`}
      />
      <CarLineArt
        className={`absolute left-1/2 top-[68%] w-[62%] max-w-[420px] -translate-x-1/2 -translate-y-[86%] ${
          light ? "text-anthracite/25" : "text-paper/20"
        }`}
      />
      {!compact && (
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 px-5 pb-4">
          {label && (
            <span
              className={`truncate font-serif text-base italic ${
                light ? "text-anthracite/55" : "text-paper/50"
              }`}
            >
              {label}
            </span>
          )}
          <span
            className={`ml-auto shrink-0 text-[0.6rem] font-semibold uppercase tracking-[0.22em] ${
              light ? "text-graphite/70" : "text-mist/70"
            }`}
          >
            Photo à venir
          </span>
        </div>
      )}
    </div>
  );
}
