import { useEffect } from "react";

const SITE_TITLE = "ALMA LOCATION — Location de Voitures Premium à Paris";

/** Titre de l'onglet par page (SEO). `null` = titre principal du site. */
export function usePageTitle(title: string | null) {
  useEffect(() => {
    document.title = title ? `${title} — ALMA LOCATION` : SITE_TITLE;
  }, [title]);
}
