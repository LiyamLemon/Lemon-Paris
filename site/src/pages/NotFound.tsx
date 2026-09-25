import { Button } from "../components/common/Button";
import { usePageTitle } from "../hooks/usePageTitle";

export function NotFound() {
  usePageTitle("Page introuvable");
  return (
    <section
      data-tone="light"
      className="flex min-h-[80svh] items-center bg-paper pb-20 pt-[calc(var(--header-h)+3rem)]"
    >
      <div className="container-alma text-center">
        <p className="font-serif text-8xl font-medium italic text-gold-deep">404</p>
        <h1 className="mt-4 font-serif text-4xl font-semibold text-anthracite">Page introuvable</h1>
        <p className="mx-auto mt-3 max-w-sm text-graphite">
          La page que vous recherchez n'existe pas ou plus.
        </p>
        <Button to="/" variant="dark" className="mt-8">
          Retour à l'accueil
        </Button>
      </div>
    </section>
  );
}
