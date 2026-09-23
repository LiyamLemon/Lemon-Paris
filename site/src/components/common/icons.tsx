/**
 * Icônes de marque non fournies par lucide-react (qui n'inclut plus les
 * logos de réseaux sociaux). Tracé minimaliste, cohérent avec le reste de
 * l'iconographie du site (stroke fin, 1.5-1.75).
 */

export function InstagramIcon({
  size = 18,
  strokeWidth = 1.75,
}: {
  size?: number;
  strokeWidth?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}
