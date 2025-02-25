import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Accueil from "./assets/components/Accueil/accueil";
import Footer from "./assets/components/Footer/footer";
import Header from "./assets/components/Header/header";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Accueil />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
