import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="container-alma flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-serif text-6xl text-gold">404</p>
      <h1 className="mt-4 font-serif text-2xl font-semibold text-paper">Page introuvable</h1>
      <p className="mt-3 max-w-sm text-sm text-mist">
        La page que vous recherchez n'existe pas ou plus.
      </p>
      <Link
        to="/"
        className="mt-8 rounded-full bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-ink"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
}
