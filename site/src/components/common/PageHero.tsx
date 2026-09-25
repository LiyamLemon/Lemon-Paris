import type { ComponentProps, ReactNode } from "react";
import { Backdrop } from "./Backdrop";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

type HeadingProps = Omit<ComponentProps<typeof SectionHeading>, "tone" | "as">;

interface PageHeroProps extends HeadingProps {
  /** Clair (fond blanc cassé) ou sombre (fond graphique / photo). */
  tone: "light" | "dark";
  backdrop?: ComponentProps<typeof Backdrop>;
  /** Contenu sous le titre (CTA, filtres...). */
  children?: ReactNode;
}

/**
 * En-tête de page. Il réserve lui-même la hauteur du header fixe : le
 * titre n'est jamais masqué. Son attribut `data-tone` indique au header
 * s'il doit passer en version claire ou sombre au-dessus de lui.
 */
export function PageHero({ tone, backdrop, children, ...heading }: PageHeroProps) {
  const dark = tone === "dark";
  return (
    <section
      data-tone={tone}
      className={`relative overflow-hidden ${dark ? "bg-ink" : "bg-paper"} pb-14 pt-[calc(var(--header-h)+3.5rem)] md:pb-20 md:pt-[calc(var(--header-h)+5.5rem)]`}
    >
      {backdrop && <Backdrop {...backdrop} />}
      <div className="container-alma relative">
        <Reveal>
          <SectionHeading {...heading} tone={tone} as="h1" />
        </Reveal>
        {children && <div className="relative mt-10">{children}</div>}
      </div>
    </section>
  );
}
