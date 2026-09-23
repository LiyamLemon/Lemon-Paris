import { Outlet } from "react-router-dom";
import { useSectionScroll } from "../../hooks/useSectionScroll";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout() {
  useSectionScroll();

  return (
    // overflow-x: clip (et non hidden) : empêche tout débordement horizontal
    // sans créer de conteneur de scroll qui casserait le header fixe ou les
    // éléments sticky.
    <div className="flex min-h-svh flex-col overflow-x-clip bg-ink">
      <Header />
      <main className="flex-1 pt-[var(--header-h)]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
