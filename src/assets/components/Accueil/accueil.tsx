import { useState } from "react";
import gamesData from "../../../../public/data/data.json";

interface Game {
  id: number;
  title: string;
  category: string;
  rating: number; // Note du jeu
}

export default function Accueil() {
  const [selectedFilter, setSelectedFilter] = useState("");

  // Obtenir toutes les catégories uniques depuis le JSON
  const categories: string[] = Array.from(new Set(gamesData.map((game: Game) => game.category)));

  // Appliquer le filtre
  let filteredGames: Game[] = gamesData;

  if (selectedFilter === "rating") {
    filteredGames = [...gamesData].sort((a, b) => b.rating - a.rating); // Trie par note
  } else if (selectedFilter) {
    filteredGames = gamesData.filter((game: Game) => game.category.toLowerCase() === selectedFilter);
  }

  return (
    <div className="bg-blue-950 text-white min-h-screen flex flex-col items-center justify-center p-4">

      <h1 className="text-4xl mb-4">Accueil</h1>

      {/* Label accessible */}
      <label htmlFor="filter" className="block mb-2 mt-12 text-2xl font-bold">
        Filtrer par
      </label>

      {/* Sélecteur accessible */}
      <select
        id="filter"
        className="text-black p-3 rounded-md mb-4 mt-2 text-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        onChange={(e) => setSelectedFilter(e.target.value)}
        aria-label="Filtrer les jeux par catégorie ou note"
      >
        <option value="">Toutes les catégories</option>
        {categories.map((category) => (
          <option key={category} value={category.toLowerCase()}>
            {category}
          </option>
        ))}
        <option value="rating">Note</option> {/* Filtre par note */}
      </select>

      {/* Cartes des jeux */}
      <div className="grid grid-cols-3 gap-10 mt-20 mb-12">
        {filteredGames.map((game) => (
          <div
            key={game.id}
            className="bg-white rounded-2xl w-[15rem] h-[15rem] flex flex-col items-center justify-center shadow-lg"
          >
            <h2 className="text-black text-xl font-bold text-center">{game.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
