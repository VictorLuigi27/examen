import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [search, setSearch] = useState("");
  const [games, setGames] = useState<{ id: number; title: string }[]>([]);
  const [filteredGames, setFilteredGames] = useState<{ id: number; title: string }[]>([]);

  // Charger les jeux depuis l'API backend
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/games")  // L'URL de ta route Symfony
      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch((error) => console.error("Erreur lors du chargement des jeux :", error));
  }, []);

  // Filtrer et trier les jeux en fonction de la recherche
  useEffect(() => {
    if (search.trim() === "") {
      setFilteredGames([]);
    } else {
      const lowerSearch = search.toLowerCase();

      setFilteredGames(
        games
          .filter((jeu) => jeu.title.toLowerCase().includes(lowerSearch)) // On garde les jeux qui contiennent le texte
          .sort((a, b) => {
            const aStarts = a.title.toLowerCase().startsWith(lowerSearch);
            const bStarts = b.title.toLowerCase().startsWith(lowerSearch);

            if (aStarts && !bStarts) return -1; // a en premier si c'est un match au début
            if (!aStarts && bStarts) return 1; // b en premier sinon
            return a.title.localeCompare(b.title); // Tri alphabétique pour les autres cas
          })
      );
    }
  }, [search, games]);

  return (
    <div className="bg-blue-950 text-white p-4 border-b-[3px] border-blue-600 shadow-lg relative">
      <div className="max-w-screen-lg mx-auto flex flex-col sm:flex-row items-center justify-between">

        {/* Logo du site */}
        <Link to={"/"} className="mb-2 sm:mb-0">
          <h1 className="text-4xl font-bold">PIXEL</h1>
        </Link>

        {/* Barre de recherche */}
        <div className="flex-1 flex justify-center relative mb-2 sm:mb-0">
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-full sm:w-[15rem] p-2 bg-transparent border-2 border-cyan-400 text-white rounded-full outline-none focus:ring-2 focus:ring-cyan-500 transition duration-300 placeholder-gray-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Résultats de recherche affichés sous l'input */}
          {filteredGames.length > 0 && (
            <div className="absolute top-[2.5rem] w-full sm:w-[15rem] bg-blue-900 border border-cyan-500 rounded-lg shadow-lg mt-1">
              {filteredGames.map((jeu) => (
                <Link
                  key={jeu.id}
                  to={`/jeu/${jeu.id}`}
                  className="block px-4 py-2 hover:bg-blue-700 transition duration-300"
                  onClick={() => setSearch("")} // Réinitialise la recherche après clic
                >
                  {jeu.title}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Boutons (ajouter un jeu et connexion) */}
        <div className="flex sm:flex-row flex-col gap-2 sm:gap-0 sm:ml-4">
          <Link to={"/ajouter"}>
            <button className="bg-green-600 hover:bg-green-500 text-white p-3 rounded-full transition duration-300 shadow-md flex items-center justify-center cursor-pointer sm:mr-2 ml-9">
              <span className="text-2xl font-bold">+</span>
            </button>
          </Link>

          {/* Bouton de connexion */}
          <Link to={"/connexion"}>
            <button className="bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-full transition duration-300 shadow-md flex items-center justify-center cursor-pointer">
              Connexion
            </button>
          </Link>
        </div>
        
      </div>
    </div>
  );
}


