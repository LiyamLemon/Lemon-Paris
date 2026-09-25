/**
 * Validation du formulaire de réservation. Volontairement indépendante de
 * tout état React pour rester facile à tester et à réutiliser côté serveur
 * le jour où un vrai backend de réservation sera branché.
 */

export interface BookingFormValues {
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  vehicleSlug: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
}

export type BookingFormErrors = Partial<Record<keyof BookingFormValues, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Accepte les formats français courants : 0612345678, 06 12 34 56 78, +33 6 12 34 56 78
const PHONE_RE = /^(\+33|0)[\s.]?[1-9]([\s.]?\d{2}){4}$/;

export function validateBookingForm(values: BookingFormValues): BookingFormErrors {
  const errors: BookingFormErrors = {};

  if (!values.lastName.trim()) errors.lastName = "Le nom est obligatoire.";
  if (!values.firstName.trim()) errors.firstName = "Le prénom est obligatoire.";

  if (!values.email.trim()) {
    errors.email = "L'email est obligatoire.";
  } else if (!EMAIL_RE.test(values.email.trim())) {
    errors.email = "Format d'email invalide.";
  }

  if (!values.phone.trim()) {
    errors.phone = "Le téléphone est obligatoire.";
  } else if (!PHONE_RE.test(values.phone.trim())) {
    errors.phone = "Format de téléphone invalide.";
  }

  if (!values.vehicleSlug) errors.vehicleSlug = "Veuillez sélectionner un véhicule.";

  if (!values.startDate) {
    errors.startDate = "La date de départ est obligatoire.";
  } else if (values.startDate < localToday()) {
    errors.startDate = "La date de départ ne peut pas être dans le passé.";
  }
  if (!values.endDate) {
    errors.endDate = "La date de retour est obligatoire.";
  }

  if (values.startDate && values.endDate) {
    const start = new Date(`${values.startDate}T${values.startTime || "00:00"}`);
    const end = new Date(`${values.endDate}T${values.endTime || "00:00"}`);
    if (end < start) {
      errors.endDate = "Le retour ne peut pas être antérieur au départ.";
    }
  }

  return errors;
}

/** Date du jour au format AAAA-MM-JJ, dans le fuseau de l'utilisateur. */
export function localToday(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

export function hasErrors(errors: BookingFormErrors): boolean {
  return Object.values(errors).some(Boolean);
}
