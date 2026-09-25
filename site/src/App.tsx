import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./data/site";
import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { Fleet } from "./pages/Fleet";
import { VehicleDetails } from "./pages/VehicleDetails";
import { Reservation } from "./pages/Reservation";
import { Gallery } from "./pages/Gallery";
import { Conciergerie } from "./pages/Conciergerie";
import { Contact } from "./pages/Contact";
import { LegalPage } from "./pages/LegalPage";
import { NotFound } from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={ROUTES.home} element={<Home />} />
        <Route path={ROUTES.fleet} element={<Fleet />} />
        <Route path={`${ROUTES.fleet}/:slug`} element={<VehicleDetails />} />
        <Route path={ROUTES.booking} element={<Reservation />} />
        <Route path={ROUTES.gallery} element={<Gallery />} />
        <Route path={ROUTES.concierge} element={<Conciergerie />} />
        <Route path={ROUTES.contact} element={<Contact />} />
        <Route path="/mentions-legales" element={<LegalPage title="Mentions légales" />} />
        <Route path="/confidentialite" element={<LegalPage title="Politique de confidentialité" />} />
        <Route path="/cgv" element={<LegalPage title="CGV / Conditions de location" />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
