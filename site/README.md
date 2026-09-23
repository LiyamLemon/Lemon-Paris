# ALMA LOCATION — Site Web

Site vitrine et de réservation pour ALMA LOCATION, agence de location de
véhicules premium en région parisienne.

## Stack

- **Vite + React 19 + TypeScript** — base de l'application.
- **React Router (HashRouter)** — navigation entre l'accueil (sections) et
  les fiches véhicule (`#/flotte/:slug`). Le HashRouter fonctionne quel que
  soit l'hébergement, sans règle de réécriture côté serveur.
- **Tailwind CSS v4** — thème défini dans `src/index.css` (`@theme`) :
  couleurs, typographies, animations.
- **lucide-react** — iconographie fine et minimaliste.

Aucune dépendance superflue : pas de gestionnaire d'état externe, pas de
librairie de formulaires — la validation est écrite à la main dans
`src/lib/validation.ts`.

## Démarrer

```bash
npm install
npm run dev       # serveur de développement
npm run build     # build de production (inclut le typecheck)
npm run preview   # sert le build de production localement
```

## Architecture

```
src/
  data/
    vehicles.ts    # source de données UNIQUE de la flotte
    site.ts        # nav, contact (placeholders), galerie, textes de section
  context/
    BookingContext.tsx   # véhicule présélectionné + navigation vers la réservation
  hooks/
    useSectionScroll.ts  # défilement vers une section / haut de page à chaque navigation
    useActiveSection.ts  # détection de la section en cours de lecture (menu actif)
    useScrollLock.ts     # blocage du fond sous le menu mobile et la lightbox
    useReveal.ts         # animation d'apparition au scroll
  lib/
    scroll.ts        # verrouillage du scroll (compatible iOS), scroll vers section
    validation.ts   # règles de validation du formulaire de réservation
    api.ts           # point d'entrée pour brancher un vrai backend plus tard
  components/
    layout/          # Header, MobileMenu, Footer, Logo, Layout
    home/             # sections de la page d'accueil (Hero, Fleet, Booking, …)
    booking/          # composants du formulaire
    common/           # SectionLink, SmartImage, Reveal, icônes maison
  pages/
    Home.tsx
    VehicleDetails.tsx
    LegalPage.tsx
    NotFound.tsx
```

### Modifier la flotte

Toute la flotte est décrite dans `src/data/vehicles.ts` (un objet par
véhicule : nom, photos, prix, caractéristiques, disponibilité...). Ajouter,
modifier ou retirer un véhicule ne demande de toucher qu'à ce fichier — la
carte véhicule, la fiche détaillée et le sélecteur du formulaire de
réservation se mettent à jour automatiquement.

### Navigation

- Ordre des sections : `SECTION_IDS` dans `src/data/site.ts` (doit suivre
  l'ordre de `src/pages/Home.tsx`). Chaque section porte `id` + `data-section`.
- Les liens vers une section passent par `<SectionLink section="…">` :
  jamais de lien `#ancre` en dur.
- Le header est fixe (`z-50`), sa hauteur est la variable CSS `--header-h`.
  `scroll-margin-top` cale automatiquement chaque section juste dessous.
- Le menu mobile et la lightbox sont rendus dans un portail sous `<body>`
  (`z-60` / `z-70`) : aucun contenu de la page ne peut passer au-dessus.

### Photos

`SmartImage` garantit qu'aucune zone photo ne reste vide : un visuel de
remplacement s'affiche pendant le chargement ou si la photo est
inaccessible. Pour les photos définitives, déposez-les dans `public/images/`
et référencez-les en chemin relatif (`images/ma-voiture.jpg`).

### Modifier un composant isolément

Chaque section de la page d'accueil est un composant indépendant dans
`src/components/home/`. Modifier un composant (ex. `Header.tsx`,
`VehicleCard.tsx`) n'affecte pas les autres.

### Placeholders à remplacer

- Coordonnées de contact (`src/data/site.ts` → `CONTACT_INFO`).
- Photos de la flotte et de la galerie (actuellement des images Unsplash de
  démonstration, `src/data/vehicles.ts` et `src/data/site.ts`).
- Contenu des pages légales (`src/pages/LegalPage.tsx` — texte générique en
  attendant les mentions légales définitives).
- `src/lib/api.ts` : la fonction `submitBooking` simule un envoi réseau.
  Elle est isolée du reste du code pour être remplacée par un véritable
  appel API sans toucher au formulaire.
