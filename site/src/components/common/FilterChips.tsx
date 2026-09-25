interface FilterChipsProps<T extends string> {
  options: readonly T[];
  /** `null` = « Tout ». */
  value: T | null;
  onChange: (value: T | null) => void;
  allLabel?: string;
  label: string;
}

/**
 * Filtres en pastilles, défilables horizontalement sur mobile sans
 * provoquer de débordement de la page.
 */
export function FilterChips<T extends string>({
  options,
  value,
  onChange,
  allLabel = "Tout",
  label,
}: FilterChipsProps<T>) {
  const items: (T | null)[] = [null, ...options];
  return (
    <div
      role="group"
      aria-label={label}
      className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0 [&::-webkit-scrollbar]:hidden"
    >
      {items.map((item) => {
        const active = item === value;
        return (
          <button
            key={item ?? "__all"}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(item)}
            className={`min-h-11 shrink-0 rounded-full border px-5 text-sm transition-colors ${
              active
                ? "border-anthracite bg-anthracite text-paper"
                : "border-stone bg-transparent text-graphite hover:border-anthracite/40 hover:text-anthracite"
            }`}
          >
            {item ?? allLabel}
          </button>
        );
      })}
    </div>
  );
}
