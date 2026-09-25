/**
 * Silhouette de profil d'une voiture, en trait fin. Utilisée dans les
 * visuels d'attente et les fonds graphiques, jamais comme illustration
 * principale.
 */
export function CarLineArt({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 130"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {/* Carrosserie */}
      <path d="M16 100 V92 C16 85 23 80 36 78 L102 71 C127 54 160 43 201 41 C240 40 270 47 296 62 L347 68 C367 71 381 79 384 91 V100" />
      {/* Bas de caisse et passages de roue */}
      <path d="M16 100 H70 M120 100 H284 M334 100 H384" />
      <path d="M70 100 A25 25 0 0 1 120 100 M284 100 A25 25 0 0 1 334 100" />
      {/* Vitrages */}
      <path d="M121 70 C141 57 168 50 200 49 C230 48 254 54 273 65 L277 70 Z" />
      <path d="M199 49 L197 70" />
      {/* Ligne de caractère */}
      <path d="M40 84 C120 80 260 78 360 80" opacity={0.5} />
      {/* Roues */}
      <circle cx="95" cy="100" r="19" />
      <circle cx="95" cy="100" r="8" opacity={0.6} />
      <circle cx="309" cy="100" r="19" />
      <circle cx="309" cy="100" r="8" opacity={0.6} />
    </svg>
  );
}
