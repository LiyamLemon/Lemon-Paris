# ALMA LOCATION — Site Web

Site vitrine et de réservation pour ALMA LOCATION, agence de location de
véhicules premium en région parisienne.

## Stack

- **Vite + React 19 + TypeScript**
- **React Router (HashRouter)** : de vraies pages (`#/flotte`, `#/reservation`...).
  Le HashRouter fonctionne quel que soit l'hébergement, sans règle serveur.
  Pour des URL sans `#` en production, remplacer `HashRouter` par
  `BrowserRouter` dans `src/main.tsx` et configurer l'hébergeur pour
  renvoyer `index.html` sur toutes les routes.
- **Tailwind CSS v4** : palette et typographies dans `src/index.css` (`@theme`).
- **lucide-react** : icônes.

```bash
npm install
npm run dev       # développement
npm run build     # build de production (inclut le typecheck)
npm run preview   # sert le build localement
```

## Pages

| Route              | Page                                                            |
| ------------------ | --------------------------------------------------------------- |
| `/`                | Accueil : hero, aperçu flotte, Notre Promesse, bandeau réservation |
| `/flotte`          | Tous les véhicules, filtrables par catégorie                    |
| `/flotte/:slug`    | Fiche d'un véhicule                                             |
| `/reservation`     | Formulaire. `?vehicule=<slug>` présélectionne un véhicule       |
| `/galerie`         | Photos filtrables + visionneuse                                 |
| `/conciergerie`    | Services                                                        |
| `/contact`         | Coordonnées                                                     |

## Architecture

```
src/
  data/
    vehicles.ts   # source UNIQUE de la flotte (modèles, prix, dispo, photos)
    site.ts       # routes, navigation, coordonnées, photos d'ambiance, galerie, textes
  pages/          # une page = une route
  components/
    layout/       # Header, MobileMenu, Footer, Logo, Layout
    common/       # Button, SectionHeading, PageHero, Backdrop, SmartImage,
                  # PhotoPlaceholder, FilterChips, Reveal
    vehicles/     # VehicleCard, AvailabilityBadge
    home/         # sections de l'accueil (HomeHero, FleetPreview, PromiseSection, BookingBanner)
    booking/      # BookingForm, FormField
    gallery/      # Lightbox
  hooks/          # useHeaderTone, useScrollLock, useReveal, usePageTitle
  lib/            # scroll (verrou iOS), contact (liens tel/mail/réseaux), validation, api
```

## Modifier le contenu

- **Véhicules** : `src/data/vehicles.ts`. Cartes, fiches, filtres et
  formulaire se mettent à jour automatiquement.
- **Photos des véhicules** : fichiers dans `public/images/vehicules/`, chemins
  dans le champ `images` du véhicule. Liste vide = visuel « Photo à venir ».
- **Photos d'ambiance** (hero, bandeau réservation, conciergerie) :
  `SITE_IMAGES` dans `src/data/site.ts`. Vide = fond graphique dessiné en CSS.
- **Galerie** : `GALLERY_ITEMS` dans `src/data/site.ts`.
- **Coordonnées** : `CONTACT` dans `src/data/site.ts`. Un champ vide est
  affiché « À communiquer » et n'est pas cliquable ; renseigné, il devient
  un lien (appel, WhatsApp, e-mail, Instagram, TikTok).
- **Envoi des réservations** : `src/lib/api.ts` simule l'envoi. Remplacer
  le corps de `submitBooking` par un vrai appel API.

## Règles de mise en page

- **Clair / sombre** : chaque section déclare `data-tone="light" | "dark"`.
  Le header lit la section qui passe sous lui et s'adapte.
- **Header fixe** : sa hauteur est `--header-h`. Le premier bloc de chaque
  page (`PageHero`, `HomeHero`) réserve cet espace : aucun titre n'est masqué.
- **Menu mobile et visionneuse** : rendus dans un portail sous `<body>`
  (`z-60` / `z-70`), page bloquée derrière (compatible iOS).
- **Champagne** : réservé aux labels, filets, badges, prix, états actifs et
  CTA principaux. Il ne doit pas devenir une couleur de fond.
