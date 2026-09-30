import { Car } from "lucide-react";
import { ROUTES } from "../../data/site";
import { Button } from "../common/Button";

/**
 * Affiché tant que `vehicles` (src/data/vehicles.ts) est vide : jamais de
 * grille de véhicules fictifs ni de cartes « photo à venir » en série,
 * juste un état sobre, cohérent avec l'identité du site, qui oriente vers
 * le contact en attendant les vrais véhicules.
 */
export function FleetEmptyState({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`mx-auto flex max-w-xl flex-col items-center gap-5 rounded-[1.75rem] border border-stone bg-ivory px-8 text-center ${
        compact ? "py-14 sm:py-16" : "py-16 sm:py-20"
      }`}
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-anthracite/20 text-anthracite">
        <Car size={24} strokeWidth={1.4} />
      </span>
      <h3 className="font-serif text-2xl font-semibold text-anthracite sm:text-3xl">
        Notre flotte est en cours de mise à jour
      </h3>
      <p className="max-w-sm text-graphite">
        Les véhicules ALMA LOCATION seront présentés ici très prochainement, avec leurs
        photos et leurs tarifs. Contactez-nous pour connaître les modèles disponibles dès
        maintenant.
      </p>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <Button to={ROUTES.contact} variant="dark" arrow>
          Nous contacter
        </Button>
        <Button to={ROUTES.booking} variant="outline-dark">
          Réservation Express
        </Button>
      </div>
    </div>
  );
}
