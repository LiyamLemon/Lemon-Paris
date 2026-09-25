/**
 * Contenu et configuration globale du site ALMA LOCATION.
 *
 * Règle : aucune coordonnée, promesse commerciale ou photo n'est inventée.
 * Tout champ laissé vide ("") est affiché comme « à communiquer » ou
 * remplacé par un visuel d'attente, et se complète ici sans toucher au
 * reste du code.
 */

/* ─────────────────────────── Navigation ─────────────────────────── */

export const ROUTES = {
  home: "/",
  fleet: "/flotte",
  booking: "/reservation",
  gallery: "/galerie",
  concierge: "/conciergerie",
  contact: "/contact",
} as const;

export const NAV_LINKS: readonly { label: string; to: string }[] = [
  { label: "Accueil", to: ROUTES.home },
  { label: "Notre Flotte", to: ROUTES.fleet },
  { label: "Réservation", to: ROUTES.booking },
  { label: "Galerie", to: ROUTES.gallery },
  { label: "Conciergerie", to: ROUTES.concierge },
  { label: "Contact", to: ROUTES.contact },
];

/** URL de la page Réservation, avec un véhicule présélectionné si fourni. */
export function bookingUrl(vehicleSlug?: string) {
  return vehicleSlug
    ? `${ROUTES.booking}?vehicule=${encodeURIComponent(vehicleSlug)}`
    : ROUTES.booking;
}

/** Une rubrique est active sur sa page et ses sous-pages (ex. une fiche véhicule). */
export function isNavActive(to: string, pathname: string) {
  return to === "/" ? pathname === "/" : pathname === to || pathname.startsWith(`${to}/`);
}

/* ─────────────────────────── Coordonnées ────────────────────────── */

/** À compléter. Un champ vide s'affiche « À communiquer » et n'est pas cliquable. */
export const CONTACT = {
  /** Format international conseillé, ex. "+33 6 12 34 56 78". */
  phone: "",
  /** Numéro WhatsApp, format international, ex. "+33612345678". */
  whatsapp: "",
  email: "",
  /** Identifiant sans @, ex. "alma.location". */
  instagram: "",
  /** Identifiant sans @, ex. "alma.location". */
  tiktok: "",
  zone: "Paris & région parisienne — adresse précise à confirmer",
};

/* ─────────────────────────── Photos du site ─────────────────────── */

/**
 * Photos d'ambiance. Déposez les fichiers dans `public/images/` puis
 * renseignez le chemin (ex. "images/hero.jpg"). Tant qu'un champ est
 * vide, un fond graphique dessiné en CSS est affiché à la place.
 */
export const SITE_IMAGES = {
  homeHero: "",
  bookingBanner: "",
  conciergeHero: "",
};

export const GALLERY_CATEGORIES = ["Extérieur", "Intérieur", "Détails"] as const;
export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];

/**
 * Photos de la galerie. `src` vide = emplacement réservé, affiché comme
 * « photo à venir ». Ajoutez autant d'entrées que nécessaire.
 */
export const GALLERY_ITEMS: { src: string; alt: string; category: GalleryCategory }[] = [
  { src: "", alt: "Véhicule ALMA — vue extérieure", category: "Extérieur" },
  { src: "", alt: "Véhicule ALMA — habitacle", category: "Intérieur" },
  { src: "", alt: "Véhicule ALMA — détail", category: "Détails" },
  { src: "", alt: "Véhicule ALMA — vue extérieure", category: "Extérieur" },
  { src: "", alt: "Véhicule ALMA — détail", category: "Détails" },
  { src: "", alt: "Véhicule ALMA — habitacle", category: "Intérieur" },
];

/* ─────────────────────────── Contenus éditoriaux ────────────────── */

export const TRUST_POINTS = [
  {
    title: "Sécurité & Sérénité",
    description: "Véhicules contrôlés et entretenus avec rigueur avant chaque location.",
  },
  {
    title: "Service Personnalisé",
    description: "Une prise en charge simple avant, pendant et après votre location.",
  },
  {
    title: "Flotte Sélectionnée",
    description: "Des véhicules choisis pour leur qualité, leur confort et leurs performances.",
  },
] as const;

export const CONCIERGE_SERVICES = [
  {
    title: "Livraison du véhicule",
    description:
      "Sur demande, votre véhicule peut vous être livré à l'adresse de votre choix en région parisienne.",
  },
  {
    title: "Récupération du véhicule",
    description:
      "Nous organisons la reprise du véhicule à l'issue de votre location, selon les modalités convenues ensemble.",
  },
  {
    title: "Assistance pendant la location",
    description:
      "Une équipe reste joignable pour répondre à vos questions et vous accompagner en cas d'imprévu.",
  },
  {
    title: "Demandes personnalisées",
    description:
      "Durée, type de véhicule, besoins spécifiques : chaque demande particulière peut être étudiée au cas par cas.",
  },
] as const;
