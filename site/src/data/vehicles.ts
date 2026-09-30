/**
 * Source de données centralisée pour la flotte ALMA LOCATION.
 *
 * Pour ajouter, modifier ou retirer un véhicule du site, il suffit de
 * modifier ce tableau : aucune autre partie du code n'a besoin d'être
 * touchée (carte véhicule, fiche détaillée, formulaire de réservation).
 *
 * Photos : déposez les fichiers dans `public/images/vehicules/` et listez
 * leurs chemins dans `images` (ex. "images/vehicules/clio-1.jpg"). La
 * première sert de visuel principal.
 *
 * Tant qu'aucun véhicule réel n'est renseigné, la Flotte (page et aperçu
 * d'accueil) affiche un état d'attente sobre à la place d'une grille vide
 * ou de véhicules fictifs — voir VehicleCard.tsx et FleetEmptyState.tsx.
 * Exemple d'entrée à dupliquer/adapter pour chaque véhicule réel :
 *
 * {
 *   slug: "clio-rs-line",
 *   name: "Renault Clio RS Line",
 *   category: "Citadine",
 *   transmission: "Automatique",
 *   fuel: "Essence",
 *   seats: 5,
 *   horsepower: 140,
 *   pricePerDay: 0,           // tarif réel à renseigner
 *   available: true,
 *   deposit: 0,                // caution réelle à renseigner
 *   includedKmPerDay: 0,       // km inclus réels à renseigner
 *   description: "",
 *   conditions: [],
 *   images: ["images/vehicules/clio-1.jpg"],
 * }
 */

export type FuelType = "Essence" | "Diesel" | "Hybride" | "Électrique";
export type Transmission = "Automatique" | "Manuelle";
export type VehicleCategory = "Sportive" | "Berline" | "Citadine" | "SUV";

export interface Vehicle {
  /** Identifiant unique, utilisé dans l'URL de la fiche véhicule. */
  slug: string;
  name: string;
  category: VehicleCategory;
  transmission: Transmission;
  fuel: FuelType;
  seats: number;
  /** Puissance en chevaux — optionnel, non affiché si absent. */
  horsepower?: number;
  pricePerDay: number;
  available: boolean;
  /** Caution en euros. */
  deposit: number;
  /** Kilométrage inclus par jour de location. */
  includedKmPerDay: number;
  description: string;
  conditions: string[];
  /** La première image sert de visuel principal (carte + fiche). Vide = visuel d'attente. */
  images: string[];
}

/**
 * Aucun véhicule fictif : la flotte réelle sera renseignée ici, avec ses
 * vraies photos, dès qu'elle sera fournie. Voir l'exemple ci-dessus.
 */
export const vehicles: Vehicle[] = [];

export const VEHICLE_CATEGORIES = Array.from(new Set(vehicles.map((v) => v.category)));

export function getVehicleBySlug(slug: string | null | undefined): Vehicle | undefined {
  if (!slug) return undefined;
  return vehicles.find((v) => v.slug === slug);
}
