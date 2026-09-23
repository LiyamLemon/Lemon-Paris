import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface BookingContextValue {
  /** Slug du véhicule actuellement présélectionné pour la réservation. */
  selectedVehicleSlug: string | null;
  setSelectedVehicleSlug: (slug: string | null) => void;
  /**
   * Présélectionne un véhicule (optionnel) puis emmène l'utilisateur au
   * début de la section Réservation, depuis n'importe quelle page du site.
   */
  goToBooking: (slug?: string) => void;
}

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [selectedVehicleSlug, setSelectedVehicleSlug] = useState<string | null>(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const value = useMemo<BookingContextValue>(
    () => ({
      selectedVehicleSlug,
      setSelectedVehicleSlug,
      goToBooking: (slug?: string) => {
        if (slug) setSelectedVehicleSlug(slug);
        navigate("/", { state: { section: "reservation" }, replace: pathname === "/" });
      },
    }),
    [selectedVehicleSlug, navigate, pathname],
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking doit être utilisé à l'intérieur de BookingProvider");
  return ctx;
}
