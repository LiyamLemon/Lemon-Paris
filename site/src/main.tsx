import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";

// HashRouter plutôt que BrowserRouter : le site reste ainsi utilisable
// quel que soit l'endroit où il est hébergé (racine d'un domaine,
// sous-répertoire, aperçu en bac à sable...) sans configuration serveur
// particulière (pas de règle de réécriture nécessaire côté hébergeur).
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
);
