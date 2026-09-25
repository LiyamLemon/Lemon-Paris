export function AvailabilityBadge({
  available,
  className = "",
}: {
  available: boolean;
  className?: string;
}) {
  return (
    <span
      className={`rounded-full px-3.5 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] ${
        available ? "bg-gold text-ink" : "bg-anthracite/85 text-paper/80"
      } ${className}`}
    >
      {available ? "Disponible" : "Indisponible"}
    </span>
  );
}
