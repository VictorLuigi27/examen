import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Game {
  id: number;
  title: string;
}

export default function Accueil() {
  const [gamesData, setGamesData] = useState<Game[]>([]);
  const navigate = useNavigate();

  // Charger les jeux depuis l'API backend
  useEffect(() => {
    fetch("https://aqueous-hollows-77051.herokuapp.com/api/games")  // L'URL de ta route Symfony
      .then((res) => res.json())
      .then((data) => setGamesData(data))
      .catch((error) => console.error("Erreur de chargement des jeux :", error));
  }, []);

  return (
    <div className="bg-blue-950 text-white min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl sm:text-4xl mb-4">Accueil</h1>

      {/* Affichage des noms des jeux */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mt-10 mb-12">
        {gamesData.map((game) => (
          <div
            key={game.id}
            onClick={() => navigate(`/jeu/${game.id}`)}
            className="bg-white rounded-2xl w-[12rem] sm:w-[15rem] h-[15rem] flex flex-col items-center justify-center shadow-lg cursor-pointer transition-transform transform hover:scale-105"
          >
            <h2 className="text-black text-sm sm:text-xl font-bold text-center">{game.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
