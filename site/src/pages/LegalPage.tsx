import { useEffect } from "react";

interface LegalPageProps {
  title: string;
}

/** Page légale générique — contenu à rédiger et fournir ultérieurement. */
export function LegalPage({ title }: LegalPageProps) {
  useEffect(() => {
    document.title = `${title} — ALMA LOCATION`;
  }, [title]);

  return (
    <div className="container-alma py-20 md:py-28">
      <h1 className="font-serif text-3xl font-semibold text-paper sm:text-4xl">{title}</h1>
      <p className="mt-6 max-w-xl text-sm leading-relaxed text-mist">
        Le contenu de cette page sera rédigé et intégré ultérieurement, une fois les
        informations juridiques d'ALMA LOCATION confirmées.
      </p>
    </div>
  );
}
