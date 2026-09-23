import type { InputHTMLAttributes } from "react";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

/** Champ de formulaire réutilisable : label, input et message d'erreur. */
export function FormField({ label, error, id, required, ...inputProps }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-paper/80">
        {label} {required && <span className="text-gold">*</span>}
      </label>
      <input
        id={id}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full rounded-lg border bg-ink px-4 py-3.5 text-base text-paper placeholder:text-mist/60 focus:outline-none focus:ring-2 focus:ring-gold/50 ${
          error ? "border-red-400/70" : "border-line-soft/15"
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
