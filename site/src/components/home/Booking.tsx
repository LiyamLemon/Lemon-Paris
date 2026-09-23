import { useEffect, useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { vehicles } from "../../data/vehicles";
import { useBooking } from "../../context/BookingContext";
import { submitBooking } from "../../lib/api";
import { scrollToSection } from "../../lib/scroll";
import {
  hasErrors,
  localToday,
  validateBookingForm,
  type BookingFormErrors,
  type BookingFormValues,
} from "../../lib/validation";
import { Reveal } from "../common/Reveal";
import { FormField } from "../booking/FormField";

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

/** Ordre des champs dans le formulaire : le premier en erreur reçoit le focus. */
const FIELD_ORDER: (keyof BookingFormValues)[] = [
  "lastName",
  "firstName",
  "email",
  "phone",
  "vehicleSlug",
  "startDate",
  "endDate",
];

/**
 * Section Réservation : pensée comme une destination à part entière du
 * site (bloc pleine hauteur, fond distinct), pas comme un formulaire perdu
 * au milieu de la page.
 */
export function Booking() {
  const { selectedVehicleSlug, setSelectedVehicleSlug } = useBooking();
  const [values, setValues] = useState<BookingFormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<BookingFormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const [vehicleFlash, setVehicleFlash] = useState(false);

  // Reprend automatiquement le véhicule choisi depuis une carte ou une
  // fiche, et le signale brièvement dans le formulaire.
  useEffect(() => {
    if (!selectedVehicleSlug) return;
    setValues((prev) => ({ ...prev, vehicleSlug: selectedVehicleSlug }));
    setErrors((prev) => ({ ...prev, vehicleSlug: undefined }));
    setConfirmation(null);
    setVehicleFlash(true);
    const timeout = window.setTimeout(() => setVehicleFlash(false), 1600);
    return () => window.clearTimeout(timeout);
  }, [selectedVehicleSlug]);

  function updateField<K extends keyof BookingFormValues>(key: K, value: BookingFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    // L'erreur d'un champ disparaît dès qu'on le corrige.
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    if (key === "vehicleSlug") setSelectedVehicleSlug(value || null);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validationErrors = validateBookingForm(values);
    setErrors(validationErrors);
    if (hasErrors(validationErrors)) {
      const firstInvalid = FIELD_ORDER.find((key) => validationErrors[key]);
      if (firstInvalid) {
        const field = document.getElementById(firstInvalid);
        field?.focus({ preventScroll: true });
        field?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setSubmitting(true);
    try {
      const { requestId } = await submitBooking(values);
      setConfirmation(requestId);
      setValues(EMPTY_VALUES);
      setSelectedVehicleSlug(null);
      setErrors({});
      scrollToSection("reservation");
    } finally {
      setSubmitting(false);
    }
  }

  const today = localToday();

  return (
    <section
      id="reservation"
      data-section
      className="relative min-h-[calc(100svh-var(--header-h))] border-y border-line bg-ink-soft pb-20 pt-12 md:pb-28 md:pt-20"
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent"
      />

      <div className="container-alma grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <Reveal className="lg:sticky lg:top-[calc(var(--header-h)+3rem)] lg:self-start">
          <p className="eyebrow">
            <span className="h-px w-8 bg-gold" />
            Réservation
          </p>
          <h2 className="mt-4 font-serif text-[2.1rem] font-semibold leading-tight text-paper sm:text-4xl md:text-5xl">
            Réservez Votre Véhicule
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-mist md:text-base">
            Complétez le formulaire ci-dessous. Notre équipe revient vers vous rapidement
            pour confirmer votre réservation.
          </p>
        </Reveal>

        <Reveal delay={80} className="min-w-0">
          {confirmation ? (
            <div className="flex flex-col items-start gap-3 rounded-2xl border border-gold/30 bg-ink p-7 sm:p-10">
              <CheckCircle2 className="text-gold" size={32} strokeWidth={1.5} />
              <h3 className="font-serif text-xl font-semibold text-paper">
                Demande envoyée avec succès
              </h3>
              <p className="text-sm leading-relaxed text-mist">
                Référence de votre demande : <span className="text-gold">{confirmation}</span>.
                Notre équipe vous recontacte sous 24h pour confirmer votre réservation.
              </p>
              <button
                type="button"
                onClick={() => setConfirmation(null)}
                className="mt-2 rounded-full border border-paper/20 px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-paper transition-colors hover:border-gold hover:text-gold"
              >
                Faire une nouvelle demande
              </button>
            </div>
          ) : (
            <form
              noValidate
              onSubmit={handleSubmit}
              className="flex flex-col gap-10 rounded-2xl border border-line bg-ink p-5 sm:p-8 md:p-10"
            >
              <fieldset className="flex min-w-0 flex-col gap-5">
                <legend className="mb-1 flex items-baseline gap-3 font-serif text-lg font-semibold text-paper">
                  <span className="font-sans text-xs tabular-nums tracking-[0.2em] text-gold">01</span>
                  Informations Personnelles
                </legend>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <FormField
                    id="lastName"
                    label="Nom"
                    required
                    autoComplete="family-name"
                    value={values.lastName}
                    onChange={(e) => updateField("lastName", e.target.value)}
                    error={errors.lastName}
                  />
                  <FormField
                    id="firstName"
                    label="Prénom"
                    required
                    autoComplete="given-name"
                    value={values.firstName}
                    onChange={(e) => updateField("firstName", e.target.value)}
                    error={errors.firstName}
                  />
                </div>
                <FormField
                  id="email"
                  label="Email"
                  type="email"
                  inputMode="email"
                  required
                  autoComplete="email"
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
                  placeholder="06 12 34 56 78"
                  value={values.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  error={errors.phone}
                />
              </fieldset>

              <fieldset className="flex min-w-0 flex-col gap-5">
                <legend className="mb-1 flex items-baseline gap-3 font-serif text-lg font-semibold text-paper">
                  <span className="font-sans text-xs tabular-nums tracking-[0.2em] text-gold">02</span>
                  Détails de Réservation
                </legend>

                <div className="flex min-w-0 flex-col gap-2">
                  <label htmlFor="vehicleSlug" className="text-sm font-medium text-paper/80">
                    Véhicule souhaité <span className="text-gold">*</span>
                  </label>
                  <select
                    id="vehicleSlug"
                    value={values.vehicleSlug}
                    onChange={(e) => updateField("vehicleSlug", e.target.value)}
                    aria-invalid={Boolean(errors.vehicleSlug)}
                    aria-describedby={errors.vehicleSlug ? "vehicleSlug-error" : undefined}
                    className={`block w-full min-w-0 rounded-xl border bg-ink-soft px-4 py-3.5 text-base text-paper transition-[border-color,box-shadow] duration-500 focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/25 ${
                      errors.vehicleSlug
                        ? "border-red-400/70"
                        : vehicleFlash
                          ? "border-gold shadow-[0_0_0_4px_rgba(197,164,109,0.18)]"
                          : "border-line"
                    }`}
                  >
                    <option value="">Sélectionnez un véhicule</option>
                    {vehicles.map((v) => (
                      <option key={v.slug} value={v.slug} disabled={!v.available}>
                        {v.name} — {v.pricePerDay} €/jour {!v.available && "(indisponible)"}
                      </option>
                    ))}
                  </select>
                  {errors.vehicleSlug && (
                    <p id="vehicleSlug-error" className="text-xs text-red-300">
                      {errors.vehicleSlug}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <FormField
                    id="startDate"
                    label="Date début"
                    type="date"
                    required
                    min={today}
                    value={values.startDate}
                    onChange={(e) => updateField("startDate", e.target.value)}
                    error={errors.startDate}
                  />
                  <FormField
                    id="endDate"
                    label="Date fin"
                    type="date"
                    required
                    min={values.startDate || today}
                    value={values.endDate}
                    onChange={(e) => updateField("endDate", e.target.value)}
                    error={errors.endDate}
                  />
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <FormField
                    id="startTime"
                    label="Heure de départ"
                    type="time"
                    value={values.startTime}
                    onChange={(e) => updateField("startTime", e.target.value)}
                  />
                  <FormField
                    id="endTime"
                    label="Heure de retour"
                    type="time"
                    value={values.endTime}
                    onChange={(e) => updateField("endTime", e.target.value)}
                  />
                </div>
              </fieldset>

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-gold px-7 py-4 text-center text-sm font-semibold uppercase tracking-[0.12em] text-ink transition hover:brightness-105 active:scale-[0.98] disabled:cursor-wait disabled:opacity-70"
              >
                {submitting ? "Envoi en cours…" : "Envoyer ma demande"}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
