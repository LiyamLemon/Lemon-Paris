import type { InputHTMLAttributes } from "react";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

/** Champ de formulaire réutilisable : label, input et message d'erreur. */
export function FormField({ label, error, id, required, ...inputProps }: FormFieldProps) {
  return (
    <div className="flex min-w-0 flex-col gap-2">
      <label htmlFor={id} className="text-sm text-paper/75">
        {label} {required && <span className="text-gold">*</span>}
      </label>
      <input
        id={id}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`block w-full min-w-0 rounded-xl border bg-ink px-4 py-3.5 text-base text-paper placeholder:text-mist/50 transition-colors focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/25 ${
          // Bordure de contrôle contrôlée : paper/40 sur ink = 3.59:1 (seuil non-texte : 3:1).
          // border-line (le filet décoratif) ne suffit pas pour un bord de champ.
          error ? "border-red-400/70" : "border-paper/40"
        }`}
        {...inputProps}
      />
      {error && (
        <p id={`${id}-error`} className="text-xs text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}
