# Hero cinématique — préparé, pas branché

Ce dossier contient le moteur technique du futur hero vidéo de l'accueil,
inspiré de la méthode du skill `10k-websites` (scroll-scrub) et adapté à
l'architecture React d'ALMA. Rien ici n'est encore utilisé par une page :
c'est une préparation, en attendant une vraie vidéo cinématique.

## Pourquoi ce n'est pas encore branché

Construire le hero maintenant obligerait à le faire une première fois
avec les fonds temporaires actuels, puis à le refaire entièrement à
l'arrivée des vrais assets (storyboard, palette et rythme des légendes
dépendent tous de la vidéo réelle). On a choisi d'attendre l'asset
définitif et de brancher directement la bonne version.

## Ce qui existe déjà

- **`src/hooks/useHeroCapability.ts`** — décide, en direct, si le
  visiteur doit voir la version cinématique (desktop) ou la version
  statique légère (téléphone, tablette, mouvement réduit). Les cinq
  conditions de bascule sont documentées dans ce fichier.
- **`ScrollScrubVideo.tsx`** — le moteur vidéo lui-même : chargement en
  Blob (fonctionne même sur un hébergeur sans support HTTP Range),
  lissage de la position lue, déplacements mis en file pour ne jamais se
  chevaucher, et un rappel `onError` pour que le parent garde son fond de
  repli si quoi que ce soit échoue.
- **`src/hooks/useReducedMotion.ts`** — pour toute autre décision qui
  doit respecter la préférence « mouvement réduit ».

## Comment le brancher, le jour venu

1. **Storyboarder d'abord la page, puis la vidéo.** Décider les sections
   et les moments du scroll qui ont besoin d'un temps fort visuel, avant
   d'écrire le moindre prompt de génération. C'est l'ordre qui fait la
   différence entre une vidéo décorative et une vidéo qui raconte
   quelque chose.
2. Dans `HomeHero.tsx`, mesurer la progression du scroll dans le bloc
   épinglé (un `IntersectionObserver` ou un calcul de position suffit),
   et la passer à `<ScrollScrubVideo progress={...} src={...} />`
   uniquement quand `useHeroCapability()` renvoie `"cinematic"`. En
   `"static"`, garder le hero actuel tel quel (image ou `Backdrop`
   dessiné) : c'est déjà l'expérience mobile prévue par ce hook.
3. **Ajouter le système de légendes en bandes** (une légende par plage de
   progression, avec ses marges d'apparition/disparition en douceur) une
   fois le découpage de la vidéo connu. La méthode complète — le calcul
   des bandes, le test au flick pour vérifier qu'aucune légende n'est
   trop courte à la lecture, le système de lisibilité du texte sur une
   vidéo en mouvement — est décrite dans le skill `10k-websites`
   (`references/scrub-pipeline.md`, sections « caption-band pattern » et
   « legibility system »). Rien de tout ça n'a de sens sans la vidéo
   réelle : c'est pourquoi ce n'est pas encore codé.
4. Garder la CSS des cinq bascules (`HERO_STATIC_GATES`, exporté par
   `useHeroCapability.ts`) strictement identique entre le JS et toute
   media query CSS ajoutée à ce moment-là.

## Ce qui ne changera pas

Le hero statique actuel (`Backdrop`, `HomeHero.tsx`) reste l'expérience
par défaut et l'expérience mobile définitive, pas un simple repli
provisoire. Quoi qu'il arrive à la vidéo (absente, en échec de
chargement, préférence de mouvement réduit), la page reste complète et
lisible sans elle.
