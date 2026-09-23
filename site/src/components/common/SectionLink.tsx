import { Link, useLocation, type LinkProps } from "react-router-dom";
import type { SectionId } from "../../data/site";

type SectionLinkProps = Omit<LinkProps, "to" | "state" | "replace"> & {
  section: SectionId;
};

/**
 * Lien vers une section de la page d'accueil, utilisable depuis n'importe
 * quelle page. Le défilement est géré par useSectionScroll.
 *
 * Sur l'accueil, la navigation remplace l'entrée d'historique au lieu d'en
 * empiler une par section : le bouton "retour" du téléphone quitte alors
 * la page au lieu de rejouer chaque clic de menu.
 */
export function SectionLink({ section, ...props }: SectionLinkProps) {
  const { pathname } = useLocation();
  return <Link to="/" state={{ section }} replace={pathname === "/"} {...props} />;
}
