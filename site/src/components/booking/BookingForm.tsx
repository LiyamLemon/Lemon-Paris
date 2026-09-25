import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { useSearchParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { getVehicleBySlug, vehicles } from "../../data/vehicles";
import { submitBooking } from "../../lib/api";
import {
  hasErrors,
  localToday,
  validateBookingForm,
  type BookingFormErrors,
  type BookingFormValues,
} from "../../lib/validation";
import { Button } from "../common/Button";
import { SmartImage } from "../common/SmartImage";
import { FormField } from "./FormField";

/** Paramètre d'URL portant le véhicule présélectionné (/reservation?vehicule=…). */
const VEHICLE_PARAM = "vehicule";

const EMPTY_VALUES: BookingFormValues = {
  lastName: "",
  firstName: "",
  email: "",
  phone: "",
  vehicleSlug: "",
  startDate: "",
  endDate: "",
  startTime: "",
  endTime: "",
};

/** Ordre visuel des champs : le premier en erreur reçoit le focus. */
const FIELD_ORDER: (keyof BookingFormValues)[] = [
  "lastName",
  "firstName",
  "email",
  "phone",
  "vehicleSlug",
  "startDate",
  "endDate",
];

/** Un slug d'URL n'est retenu que s'il désigne un véhicule existant et disponible. */
function bookableSlug(slug: string | null) {
  const vehicle = getVehicleBySlug(slug);
  return vehicle?.available ? vehicle.slug : "";
}

/**
 * Formulaire de réservation. Le véhicule choisi est synchronisé avec l'URL :
 * un lien « Réserver » depuis une carte ou une fiche arrive donc avec la
 * bonne voiture déjà sélectionnée, et le lien reste partageable.
 */
export function BookingForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const slugFromUrl = bookableSlug(searchParams.get(VEHICLE_PARAM));

  const [values, setValues] = useState<BookingFormValues>({
    ...EMPTY_VALUES,
    vehicleSlug: slugFromUrl,
  });
  const [errors, setErrors] = useState<BookingFormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<string | null>(null);

  // Nouveau lien « Réserver » alors que la page est déjà ouverte.
  useEffect(() => {
    if (slugFromUrl) setValues((prev) => ({ ...prev, vehicleSlug: slugFromUrl }));
  }, [slugFromUrl]);

  const selected = getVehicleBySlug(values.vehicleSlug);
  const today = localToday();

  function updateField<K extends keyof BookingFormValues>(key: K, value: BookingFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    if (key === "vehicleSlug") {
      setSearchParams(value ? { [VEHICLE_PARAM]: value } : {}, { replace: true });
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validationErrors = validateBookingForm(values);
    setErrors(validationErrors);
    if (hasErrors(validationErrors)) {
      const firstInvalid = FIELD_ORDER.find((key) => validationErrors[key]);
      const field = firstInvalid && document.getElementById(firstInvalid);
      if (field) {
        field.focus({ preventScroll: true });
        field.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setSubmitting(true);
    try {
      const { requestId } = await submitBooking(values);
      setConfirmation(requestId);
      setValues(EMPTY_VALUES);
      setSearchParams({}, { replace: true });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setSubmitting(false);
    }
  }

  if (confirmation) {
    return (
      <div className="flex flex-col items-start gap-4 rounded-[1.75rem] border border-gold/30 bg-ink-soft p-7 sm:p-10">
        <CheckCircle2 className="text-gold" size={34} strokeWidth={1.4} />
        <h2 className="font-serif text-3xl font-semibold text-paper">Demande envoyée avec succès</h2>
        <p className="text-base leading-relaxed text-mist">
          Référence de votre demande : <span className="text-gold">{confirmation}</span>. Notre
          équipe revient vers vous rapidement pour confirmer votre réservation.
        </p>
        <Button variant="outline-light" onClick={() => setConfirmation(null)} className="mt-2">
          Faire une nouvelle demande
        </Button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="flex flex-col gap-12 rounded-[1.75rem] border border-line bg-ink-soft p-6 sm:p-10"
    >
      <Step number="01" title="Informations personnelles">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField
            id="lastName"
            label="Nom"
            required
            autoComplete="family-name"
            enterKeyHint="next"
            value={values.lastName}
            onChange={(e) => updateField("lastName", e.target.value)}
            error={errors.lastName}
          />
          <FormField
            id="firstName"
            label="Prénom"
            required
            autoComplete="given-name"
            enterKeyHint="next"
            value={values.firstName}
            onChange={(e) => updateField("firstName", e.target.value)}
            error={errors.firstName}
          />
          <FormField
            id="email"
            label="Email"
            type="email"
            inputMode="email"
            autoCapitalize="off"
            spellCheck={false}
            required
            autoComplete="email"
            enterKeyHint="next"
            placeholder="vous@exemple.fr"
            value={values.email}
            onChange={(e) => updateField("email", e.target.value)}
            error={errors.email}
          />
          <FormField
            id="phone"
            label="Téléphone"
            type="tel"
            inputMode="tel"
            required
            autoComplete="tel"
            enterKeyHint="next"
            placeholder="06 12 34 56 78"
            value={values.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            error={errors.phone}
          />
        </div>
      </Step>

      <Step number="02" title="Détails de réservation">
        <div className="flex min-w-0 flex-col gap-2">
          <label htmlFor="vehicleSlug" className="text-sm text-paper/75">
            Véhicule souhaité <span className="text-gold">*</span>
          </label>
          <select
            id="vehicleSlug"
            value={values.vehicleSlug}
            onChange={(e) => updateField("vehicleSlug", e.target.value)}
            aria-invalid={Boolean(errors.vehicleSlug)}
            aria-describedby={errors.vehicleSlug ? "vehicleSlug-error" : undefined}
            className={`block w-full min-w-0 rounded-xl border bg-ink px-4 py-3.5 text-base text-paper transition-colors focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/25 ${
              errors.vehicleSlug ? "border-red-400/70" : "border-line"
            }`}
          >
            <option value="">Sélectionnez un véhicule</option>
            {vehicles.map((v) => (
              <option key={v.slug} value={v.slug} disabled={!v.available}>
                {v.name} — {v.pricePerDay} €/jour{v.available ? "" : " (indisponible)"}
              </option>
            ))}
          </select>
          {errors.vehicleSlug && (
            <p id="vehicleSlug-error" className="text-xs text-red-300">
              {errors.vehicleSlug}
            </p>
          )}
        </div>

        {selected && (
          <div className="flex items-center gap-4 rounded-2xl border border-line bg-ink p-3">
            <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl">
              <SmartImage src={selected.images[0]} alt="" compact placeholderTone="dark" />
            </div>
            <div className="min-w-0">
              <p className="truncate font-serif text-xl font-semibold text-paper">{selected.name}</p>
              <p className="text-sm text-mist">
                {selected.category} · {selected.transmission} ·{" "}
                <span className="text-gold">{selected.pricePerDay} € / jour</span>
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField
            id="startDate"
            label="Date de départ"
            type="date"
            required
            min={today}
            value={values.startDate}
            onChange={(e) => updateField("startDate", e.target.value)}
            error={errors.startDate}
          />
          <FormField
            id="startTime"
            label="Heure de départ"
            type="time"
            value={values.startTime}
            onChange={(e) => updateField("startTime", e.target.value)}
          />
          <FormField
            id="endDate"
            label="Date de retour"
            type="date"
            required
            min={values.startDate || today}
            value={values.endDate}
            onChange={(e) => updateField("endDate", e.target.value)}
            error={errors.endDate}
          />
          <FormField
            id="endTime"
            label="Heure de retour"
            type="time"
            value={values.endTime}
            onChange={(e) => updateField("endTime", e.target.value)}
          />
        </div>
      </Step>

      <div>
        <Button type="submit" variant="gold" fullWidth disabled={submitting} className="uppercase tracking-[0.14em]">
          {submitting ? "Envoi en cours…" : "Envoyer ma demande"}
        </Button>
        <p className="mt-4 text-center text-xs text-mist">
          Les champs marqués <span className="text-gold">*</span> sont obligatoires.
        </p>
      </div>
    </form>
  );
}

function Step({ number, title, children }: { number: string; title: string; children: ReactNode }) {
  return (
    <fieldset className="flex min-w-0 flex-col gap-5">
      <legend className="mb-2 flex w-full items-baseline gap-4 border-b border-line pb-4">
        <span className="text-xs font-semibold tabular-nums tracking-[0.2em] text-gold">{number}</span>
        <span className="font-serif text-[1.65rem] font-semibold text-paper">{title}</span>
      </legend>
      {children}
    </fieldset>
  );
}
