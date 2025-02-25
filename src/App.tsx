import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Accueil from "./assets/components/Accueil/accueil";
import Footer from "./assets/components/Footer/footer";
import Header from "./assets/components/Header/header";
import Jeu from "./assets/components/Jeu/jeu";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/jeu/:id" element={<Jeu />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
