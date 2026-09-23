import { Route, Routes } from "react-router-dom";
import { BookingProvider } from "./context/BookingContext";
import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { VehicleDetails } from "./pages/VehicleDetails";
import { LegalPage } from "./pages/LegalPage";
import { NotFound } from "./pages/NotFound";

export default function App() {
  return (
    <BookingProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/flotte/:slug" element={<VehicleDetails />} />
          <Route path="/mentions-legales" element={<LegalPage title="Mentions légales" />} />
          <Route path="/confidentialite" element={<LegalPage title="Politique de confidentialité" />} />
          <Route path="/cgv" element={<LegalPage title="CGV / Conditions de location" />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BookingProvider>
  );
}
