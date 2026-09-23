import type { BookingFormValues } from "./validation";

/**
 * Point d'entrée unique pour l'envoi d'une demande de réservation.
 *
 * V1 : aucun backend n'est branché — la fonction simule un envoi réseau
 * et résout avec un identifiant de demande généré côté client.
 *
 * Pour connecter un vrai système plus tard, il suffira de remplacer le
 * contenu de cette fonction par un appel `fetch`/API réel : le reste du
 * code (formulaire, validation, confirmation) n'aura pas à changer.
 */
export async function submitBooking(
  values: BookingFormValues,
): Promise<{ requestId: string }> {
  // eslint-disable-next-line no-console -- utile en V1 pour vérifier le contenu envoyé
  console.info("[ALMA] Demande de réservation (simulation) :", values);
  await new Promise((resolve) => setTimeout(resolve, 700));
  return { requestId: `ALMA-${Date.now().toString(36).toUpperCase()}` };
}
