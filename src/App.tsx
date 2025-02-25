import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Accueil from "./assets/components/Accueil/accueil";
import Footer from "./assets/components/Footer/footer";
import Header from "./assets/components/Header/header";
import Jeu from "./assets/components/Jeu/jeu";
import Modification from "./assets/components/Modification/modification";
import Ajout from "./assets/components/Ajout/ajout";
import Connexion from "./assets/components/Connexion/connexion";
import Inscription from "./assets/components/Inscription/inscription";
import Propos from "./assets/components/Propos/propos";
import Conditions from "./assets/components/Conditions/conditions";
import Confidentialite from "./assets/components/Confidentialites/confidentialites";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/jeu/:id" element={<Jeu />} />
        <Route path="/modifier" element={<Modification />} />
        <Route path="/ajouter" element={<Ajout />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/à-propos" element={<Propos />} />
        <Route path="/conditions-generales" element={<Conditions />} />
        <Route path="/confidentialites" element={<Confidentialite />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
