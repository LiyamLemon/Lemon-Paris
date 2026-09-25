import { useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { scrollToTopInstant } from "../../lib/scroll";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout() {
  const { pathname } = useLocation();

  // Chaque nouvelle page s'ouvre en haut, avant d'être affichée.
  // (La présélection d'un véhicule sur /reservation ne change que la
  // query string : elle ne fait pas remonter la page.)
  useLayoutEffect(() => {
    scrollToTopInstant();
  }, [pathname]);

  return (
    // overflow-x: clip (et non hidden) : aucun débordement horizontal, sans
    // créer de conteneur de scroll qui casserait le header fixe.
    <div className="flex min-h-svh flex-col overflow-x-clip bg-paper">
      <Header />
      {/* Chaque page réserve elle-même la hauteur du header dans son en-tête. */}
      <main key={pathname} className="flex-1 animate-page">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
