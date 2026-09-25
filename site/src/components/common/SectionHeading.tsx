import type { ReactNode } from "react";

interface SectionHeadingProps {
  /** Petit label en capitales au-dessus du titre (ex. « FLOTTE 2026 »). */
  eyebrow: string;
  /** Première partie du titre, en serif droit. */
  title: string;
  /** Suite du titre en serif italique, à la ligne. Optionnelle : à réserver aux titres majeurs. */
  titleItalic?: string;
  description?: ReactNode;
  /** Couleurs adaptées au fond de la section. */
  tone?: "light" | "dark";
  align?: "left" | "center";
  /** h1 pour le titre de page, h2 pour une section. */
  as?: "h1" | "h2";
  size?: "md" | "lg";
}

/** Titre de section éditorial, commun à toutes les pages. */
export function SectionHeading({
  eyebrow,
  title,
  titleItalic,
  description,
  tone = "light",
  align = "left",
  as: Heading = "h2",
  size = "md",
}: SectionHeadingProps) {
  const dark = tone === "dark";
  const centered = align === "center";

  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p
        className={`flex items-center gap-4 text-[0.7rem] font-semibold uppercase tracking-[0.3em] ${
          centered ? "justify-center" : ""
        } ${dark ? "text-gold" : "text-graphite"}`}
      >
        <span className="h-px w-10 shrink-0 bg-gold" />
        {eyebrow}
        {centered && <span className="h-px w-10 shrink-0 bg-gold" />}
      </p>

      <Heading
        className={`mt-5 font-serif font-semibold leading-[1.02] ${
          size === "lg" ? "text-[3.1rem] sm:text-6xl md:text-7xl" : "text-[2.6rem] sm:text-5xl md:text-6xl"
        } ${dark ? "text-paper" : "text-anthracite"}`}
      >
        {title}
        {titleItalic && (
          <>
            <br />
            <span className="font-medium italic">{titleItalic}</span>
          </>
        )}
      </Heading>

      {description && (
        <p
          className={`mt-6 text-base leading-relaxed md:text-lg ${
            centered ? "mx-auto max-w-xl" : "max-w-lg"
          } ${dark ? "text-mist" : "text-graphite"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
