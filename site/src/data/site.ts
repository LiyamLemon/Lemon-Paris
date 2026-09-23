/**
 * Contenu et configuration globale du site ALMA LOCATION.
 * Les valeurs marquées "À REMPLACER" sont des placeholders volontaires :
 * aucune coordonnée réelle n'a été inventée pour cette V1.
 */

/**
 * Ordre réel des sections de la page d'accueil, de haut en bas. Sert à la
 * fois à la structure de la page et à la détection de la section active.
 * "engagements" est une vraie section mais n'a pas d'entrée de menu.
 */
export const SECTION_IDS = [
  "accueil",
  "flotte",
  "reservation",
  "galerie",
  "engagements",
  "conciergerie",
  "contact",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export const NAV_LINKS: readonly { label: string; section: SectionId }[] = [
  { label: "Accueil", section: "accueil" },
  { label: "Notre Flotte", section: "flotte" },
  { label: "Réservation", section: "reservation" },
  { label: "Galerie", section: "galerie" },
  { label: "Conciergerie", section: "conciergerie" },
  { label: "Contact", section: "contact" },
];

export const CONTACT_INFO = {
  phone: "À REMPLACER (ex. +33 1 23 45 67 89)",
  whatsapp: "À REMPLACER",
  email: "À REMPLACER (ex. contact@alma-location.fr)",
  instagram: "@alma.location — À REMPLACER",
  tiktok: "@alma.location — À REMPLACER",
  zone: "Paris & région parisienne — adresse précise à confirmer",
};

export const GALLERY_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1400&auto=format&fit=crop",
    alt: "Coupé sport premium sur route parisienne",
  },
  {
    src: "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1400&auto=format&fit=crop",
    alt: "Intérieur cuir d'une berline haut de gamme",
  },
  {
    src: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=1400&auto=format&fit=crop",
    alt: "Citadine premium garée devant un immeuble haussmannien",
  },
  {
    src: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1400&auto=format&fit=crop",
    alt: "Détail de jante sur véhicule sportif",
  },
  {
    src: "https://images.unsplash.com/photo-1519245659620-e859806a8d3b?q=80&w=1400&auto=format&fit=crop",
    alt: "SUV prestige de profil",
  },
  {
    src: "https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=1400&auto=format&fit=crop",
    alt: "Tableau de bord et instrumentation premium",
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
