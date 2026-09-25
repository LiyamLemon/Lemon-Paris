import { PageHero } from "../components/common/PageHero";
import { usePageTitle } from "../hooks/usePageTitle";

interface LegalPageProps {
  title: string;
}

/** Page légale générique — contenu à rédiger et fournir ultérieurement. */
export function LegalPage({ title }: LegalPageProps) {
  usePageTitle(title);
  return (
    <>
      <PageHero
        tone="light"
        eyebrow="Informations légales"
        title={title}
        description="Le contenu de cette page sera intégré une fois les informations juridiques d'ALMA LOCATION confirmées."
      />
      <div data-tone="light" className="bg-paper pb-16" />
    </>
  );
}
