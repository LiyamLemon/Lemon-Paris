import { useEffect, useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { vehicles } from "../../data/vehicles";
import { useBooking } from "../../context/BookingContext";
import { submitBooking } from "../../lib/api";
import {
  hasErrors,
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

export function Booking() {
  const { selectedVehicleSlug, setSelectedVehicleSlug } = useBooking();
  const [values, setValues] = useState<BookingFormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<BookingFormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<string | null>(null);

  // Reprend automatiquement le véhicule sélectionné depuis une carte ou une
  // fiche véhicule.
  useEffect(() => {
    if (selectedVehicleSlug) {
      setValues((prev) => ({ ...prev, vehicleSlug: selectedVehicleSlug }));
    }
  }, [selectedVehicleSlug]);

  function updateField<K extends keyof BookingFormValues>(key: K, value: BookingFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (key === "vehicleSlug") setSelectedVehicleSlug(value || null);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validationErrors = validateBookingForm(values);
    setErrors(validationErrors);
    if (hasErrors(validationErrors)) return;

    setSubmitting(true);
    try {
      const { requestId } = await submitBooking(values);
      setConfirmation(requestId);
      setValues(EMPTY_VALUES);
      setSelectedVehicleSlug(null);
      setErrors({});
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="reservation" className="bg-ink py-20 md:py-28">
      <div className="container-alma">
        <Reveal>
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            <span className="h-px w-8 bg-gold" />
            Réservation
          </p>
          <h2 className="mt-4 font-serif text-3xl font-semibold text-paper sm:text-4xl">
            Réservez Votre Véhicule
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-mist md:text-base">
            Complétez le formulaire ci-dessous. Notre équipe revient vers vous rapidement
            pour confirmer votre réservation.
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-10 max-w-2xl">
          {confirmation ? (
            <div className="flex flex-col items-start gap-3 rounded-2xl border border-gold/30 bg-ink-soft p-8">
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
                className="mt-2 rounded-full border border-line-soft/20 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-paper transition-colors hover:border-gold hover:text-gold"
              >
                Faire une nouvelle demande
              </button>
            </div>
          ) : (
            <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-10">
              <fieldset className="flex flex-col gap-5">
                <legend className="mb-1 font-serif text-lg font-semibold text-paper">
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
                  required
                  autoComplete="tel"
                  placeholder="06 12 34 56 78"
                  value={values.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  error={errors.phone}
                />
              </fieldset>

              <fieldset className="flex flex-col gap-5">
                <legend className="mb-1 font-serif text-lg font-semibold text-paper">
                  Détails de Réservation
                </legend>

                <div className="flex flex-col gap-2">
                  <label htmlFor="vehicleSlug" className="text-sm font-medium text-paper/80">
                    Véhicule souhaité <span className="text-gold">*</span>
                  </label>
                  <select
                    id="vehicleSlug"
                    value={values.vehicleSlug}
                    onChange={(e) => updateField("vehicleSlug", e.target.value)}
                    aria-invalid={Boolean(errors.vehicleSlug)}
                    className={`w-full rounded-lg border bg-ink px-4 py-3.5 text-base text-paper focus:outline-none focus:ring-2 focus:ring-gold/50 ${
                      errors.vehicleSlug ? "border-red-400/70" : "border-line-soft/15"
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
                    <p className="text-xs text-red-300">{errors.vehicleSlug}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <FormField
                    id="startDate"
                    label="Date début"
                    type="date"
                    required
                    value={values.startDate}
                    onChange={(e) => updateField("startDate", e.target.value)}
                    error={errors.startDate}
                  />
                  <FormField
                    id="endDate"
                    label="Date fin"
                    type="date"
                    required
                    min={values.startDate || undefined}
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
                className="w-full rounded-full bg-gold px-7 py-4 text-center text-sm font-semibold uppercase tracking-[0.12em] text-ink transition-transform hover:brightness-105 active:scale-[0.98] disabled:cursor-wait disabled:opacity-70 sm:w-fit"
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
