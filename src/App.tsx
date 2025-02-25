import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Accueil from "./assets/components/Accueil/accueil";
import Footer from "./assets/components/Footer/footer";
import Header from "./assets/components/Header/header";
import Jeu from "./assets/components/Jeu/jeu";
import Modification from "./assets/components/Modification/modification";
import Ajout from "./assets/components/Ajout/ajout";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/jeu/:id" element={<Jeu />} />
        <Route path="/modifier" element={<Modification />} />
        <Route path="/ajouter" element={<Ajout />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
