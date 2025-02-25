import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Game {
  id: number;
  title: string;
  category: string;
  rating: number;
}

export default function Accueil() {
  const [gamesData, setGamesData] = useState<Game[]>([]);
  const [selectedFilter, setSelectedFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("../public/data/data.json")
      .then((res) => res.json())
      .then((data) => setGamesData(data))
      .catch((error) => console.error("Erreur de chargement des jeux :", error));
  }, []);

  const categories: string[] = Array.from(new Set(gamesData.map((game) => game.category)));

  let filteredGames = gamesData;
  if (selectedFilter === "rating") {
    filteredGames = [...gamesData].sort((a, b) => b.rating - a.rating);
  } else if (selectedFilter) {
    filteredGames = gamesData.filter((game) => game.category.toLowerCase() === selectedFilter.toLowerCase());
  }

  return (
    <div className="bg-blue-950 text-white min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl mb-4">Accueil</h1>

      <label htmlFor="filter" className="block mb-2 mt-12 text-2xl font-bold">
        Filtrer par
      </label>

      <select
        id="filter"
        className="text-black p-3 rounded-md mb-4 mt-2 text-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        onChange={(e) => setSelectedFilter(e.target.value)}
        aria-label="Filtrer les jeux par catégorie ou note"
      >
        <option value="">Toutes les catégories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
        <option value="rating">Note</option>
      </select>

      <div className="grid grid-cols-3 gap-10 mt-20 mb-12">
        {filteredGames.map((game) => (
          <div
            key={game.id}
            onClick={() => navigate(`/jeu/${game.id}`)}
            className="bg-white rounded-2xl w-[15rem] h-[15rem] flex flex-col items-center justify-center shadow-lg cursor-pointer transition-transform transform hover:scale-105"
          >
            <h2 className="text-black text-xl font-bold text-center">{game.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
