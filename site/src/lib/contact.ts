/**
 * Transforme les coordonnées brutes de `CONTACT` (src/data/site.ts) en
 * liens cliquables. Chaque fonction renvoie `null` si l'information n'a
 * pas encore été renseignée : l'interface affiche alors « à communiquer ».
 */

const digits = (value: string) => value.replace(/[^\d+]/g, "");

export const phoneUrl = (phone: string) => (phone ? `tel:${digits(phone)}` : null);

export const whatsappUrl = (phone: string) =>
  phone ? `https://wa.me/${digits(phone).replace(/^\+/, "")}` : null;

export const emailUrl = (email: string) => (email ? `mailto:${email}` : null);

export const instagramUrl = (handle: string) =>
  handle ? `https://www.instagram.com/${handle.replace(/^@/, "")}` : null;

export const tiktokUrl = (handle: string) =>
  handle ? `https://www.tiktok.com/@${handle.replace(/^@/, "")}` : null;
