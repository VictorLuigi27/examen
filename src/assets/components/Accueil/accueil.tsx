import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Game {
  id: number;
  title: string;
  description: string;
  picture: string;  // Optionnel si tu veux afficher une image
  categories?: string | string[];  // Peut être une chaîne ou un tableau de chaînes
}

export default function Accueil() {
  const [gamesData, setGamesData] = useState<Game[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(''); // Pour stocker la catégorie sélectionnée
  const navigate = useNavigate();

  // Liste des catégories principales à afficher
  const mainCategories = ['Action', 'RPG', 'Aventure', 'Plateforme', 'Survie'];

  // Charger les jeux depuis l'API backend
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/games")  // L'URL de ta route Symfony
      .then((res) => res.json())
      .then((data) => setGamesData(data))
      .catch((error) => console.error("Erreur de chargement des jeux :", error));
  }, []);

  // Filtrer les jeux en fonction de la catégorie sélectionnée
  const filteredGames = selectedCategory
    ? gamesData.filter((game) => {
        // Si game.categories est un tableau, vérifier si la catégorie sélectionnée est présente dedans
        if (Array.isArray(game.categories)) {
          return game.categories.some((category) =>
            category.toLowerCase() === selectedCategory.toLowerCase()
          );
        }
        // Sinon, comparer avec une seule chaîne de caractères
        return game.categories?.toLowerCase() === selectedCategory.toLowerCase();
      })
    : gamesData;

  return (
    <div className="bg-blue-950 text-white min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl sm:text-4xl mb-4">Accueil</h1>

      {/* Filtre par catégorie */}
      <div className="mb-6">
        <select
          className="p-2 bg-blue-800 text-white rounded-lg"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Toutes les catégories</option>
          {mainCategories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Affichage des jeux filtrés */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mt-10 mb-12">
        {filteredGames.map((game) => (
          <div
            key={game.id}
            onClick={() => navigate(`/jeu/${game.id}`)}
            className="bg-white rounded-2xl w-[12rem] sm:w-[15rem] h-[15rem] flex flex-col items-center justify-center shadow-lg cursor-pointer transition-transform transform hover:scale-105"
          >
            <h2 className="text-black text-sm sm:text-xl font-bold text-center">{game.title}</h2>
            <p className="text-center text-gray-600 text-xs">{game.categories}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
