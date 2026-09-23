import { Outlet } from "react-router-dom";
import { useHashScroll } from "../../hooks/useHashScroll";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout() {
  useHashScroll();

  return (
    <div className="flex min-h-screen flex-col bg-ink">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
