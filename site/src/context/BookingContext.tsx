import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface BookingContextValue {
  /** Slug du véhicule actuellement présélectionné pour la réservation. */
  selectedVehicleSlug: string | null;
  setSelectedVehicleSlug: (slug: string | null) => void;
  /**
   * Présélectionne un véhicule (optionnel) puis emmène l'utilisateur vers
   * la section Réservation, depuis n'importe quelle page du site.
   */
  goToBooking: (slug?: string) => void;
}

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [selectedVehicleSlug, setSelectedVehicleSlug] = useState<string | null>(null);
  const navigate = useNavigate();

  const value = useMemo<BookingContextValue>(
    () => ({
      selectedVehicleSlug,
      setSelectedVehicleSlug,
      goToBooking: (slug?: string) => {
        if (slug) setSelectedVehicleSlug(slug);
        navigate("/#reservation");
      },
    }),
    [selectedVehicleSlug, navigate],
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking doit être utilisé à l'intérieur de BookingProvider");
  return ctx;
}
