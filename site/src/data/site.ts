/**
 * Contenu et configuration globale du site ALMA LOCATION.
 * Les valeurs marquées "À REMPLACER" sont des placeholders volontaires :
 * aucune coordonnée réelle n'a été inventée pour cette V1.
 */

export const NAV_LINKS = [
  { label: "Accueil", href: "#accueil" },
  { label: "Notre Flotte", href: "#flotte" },
  { label: "Réservation", href: "#reservation" },
  { label: "Galerie", href: "#galerie" },
  { label: "Conciergerie", href: "#conciergerie" },
  { label: "Contact", href: "#contact" },
] as const;

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
    span: "tall",
  },
  {
    src: "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1400&auto=format&fit=crop",
    alt: "Intérieur cuir d'une berline haut de gamme",
    span: "wide",
  },
  {
    src: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=1400&auto=format&fit=crop",
    alt: "Citadine premium garée devant un immeuble haussmannien",
    span: "normal",
  },
  {
    src: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1400&auto=format&fit=crop",
    alt: "Détail de jante sur véhicule sportif",
    span: "normal",
  },
  {
    src: "https://images.unsplash.com/photo-1519245659620-e859806a8d3b?q=80&w=1400&auto=format&fit=crop",
    alt: "SUV prestige de profil",
    span: "wide",
  },
  {
    src: "https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=1400&auto=format&fit=crop",
    alt: "Tableau de bord et instrumentation premium",
    span: "tall",
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
