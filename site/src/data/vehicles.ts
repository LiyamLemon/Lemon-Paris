/**
 * Source de données centralisée pour la flotte ALMA LOCATION.
 *
 * Pour ajouter, modifier ou retirer un véhicule du site, il suffit de
 * modifier ce tableau : aucune autre partie du code n'a besoin d'être
 * touchée (carte véhicule, fiche détaillée, formulaire de réservation).
 *
 * Photos : déposez les fichiers dans `public/images/vehicules/` et listez
 * leurs chemins dans `images` (ex. "images/vehicules/berline-1.jpg"). La
 * première sert de visuel principal. Tant que la liste est vide, un visuel
 * d'attente « photo à venir » est affiché à la place.
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

export const vehicles: Vehicle[] = [
  {
    slug: "berline-signature",
    name: "Berline Signature",
    category: "Berline",
    transmission: "Automatique",
    fuel: "Hybride",
    seats: 5,
    horsepower: 204,
    pricePerDay: 180,
    available: true,
    deposit: 1500,
    includedKmPerDay: 200,
    description:
      "Une berline élégante et silencieuse, pensée pour les trajets d'affaires comme pour les escapades parisiennes. Confort, sobriété et finitions soignées.",
    conditions: [
      "Permis B valide depuis plus de 2 ans",
      "Conducteur supplémentaire sur demande",
      "Carburant restitué au niveau du départ",
    ],
    images: [],
  },
  {
    slug: "coupe-sport-gt",
    name: "Coupé Sport GT",
    category: "Sportive",
    transmission: "Automatique",
    fuel: "Essence",
    seats: 4,
    horsepower: 300,
    pricePerDay: 320,
    available: true,
    deposit: 3000,
    includedKmPerDay: 150,
    description:
      "Ligne athlétique et caractère affirmé. Le Coupé Sport GT offre des sensations de conduite premium pour un week-end ou une occasion particulière.",
    conditions: [
      "Permis B valide depuis plus de 3 ans",
      "Âge minimum 25 ans",
      "Conduite sportive sur circuit non autorisée",
    ],
    images: [],
  },
  {
    slug: "citadine-elegance",
    name: "Citadine Élégance",
    category: "Citadine",
    transmission: "Automatique",
    fuel: "Électrique",
    seats: 4,
    horsepower: 136,
    pricePerDay: 95,
    available: true,
    deposit: 800,
    includedKmPerDay: 180,
    description:
      "Compacte, silencieuse et agile, idéale pour se déplacer dans Paris avec style. Une citadine premium sans compromis sur la qualité.",
    conditions: [
      "Permis B valide depuis plus de 1 an",
      "Recharge à restituer à 80 % minimum",
    ],
    images: [],
  },
  {
    slug: "suv-prestige",
    name: "SUV Prestige",
    category: "SUV",
    transmission: "Automatique",
    fuel: "Diesel",
    seats: 5,
    horsepower: 249,
    pricePerDay: 260,
    available: false,
    deposit: 2200,
    includedKmPerDay: 220,
    description:
      "Position de conduite dominante, habitacle spacieux et présence assurée. Le SUV Prestige accompagne vos déplacements en famille comme en affaires.",
    conditions: [
      "Permis B valide depuis plus de 2 ans",
      "Siège enfant disponible sur demande",
    ],
    images: [],
  },
];

export const VEHICLE_CATEGORIES = Array.from(new Set(vehicles.map((v) => v.category)));

export function getVehicleBySlug(slug: string | null | undefined): Vehicle | undefined {
  if (!slug) return undefined;
  return vehicles.find((v) => v.slug === slug);
}
