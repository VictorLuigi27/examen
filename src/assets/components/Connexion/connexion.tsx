import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [search, setSearch] = useState("");
  const [games, setGames] = useState<{ id: number; title: string }[]>([]);
  const [filteredGames, setFilteredGames] = useState<{ id: number; title: string }[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    console.log("useEffect - Chargement des jeux depuis l'API...");
    fetch("http://127.0.0.1:8000/api/games")
      .then((res) => res.json())
      .then((data) => {
        console.log("Jeux récupérés:", data);
        setGames(data);
      })
      .catch((error) => console.error("Erreur lors du chargement des jeux :", error));
  }, []);

  // Filtrer et trier les jeux en fonction de la recherche
  useEffect(() => {
    if (search.trim() === "") {
      setFilteredGames([]);
    } else {
      const lowerSearch = search.toLowerCase();
      const filtered = games
        .filter((jeu) => jeu.title.toLowerCase().includes(lowerSearch))
        .sort((a, b) => a.title.localeCompare(b.title));

      setFilteredGames(filtered);
    }
  }, [search, games]);

  // Vérifier si l'utilisateur est authentifié
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    // Écouter les changements du localStorage
    const handleStorageChange = () => {
      const updatedToken = localStorage.getItem("token");
      setIsAuthenticated(!!updatedToken);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <div className="bg-blue-950 text-white p-4 border-b-[3px] border-blue-600 shadow-lg relative">
      <div className="max-w-screen-lg mx-auto flex flex-col sm:flex-row items-center justify-between">
        <Link to={"/"} className="mb-2 sm:mb-0">
          <h1 className="text-4xl font-bold">PIXEL</h1>
        </Link>

        <div className="flex-1 flex justify-center relative mb-2 sm:mb-0">
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-full sm:w-[15rem] p-2 bg-transparent border-2 border-cyan-400 text-white rounded-full outline-none focus:ring-2 focus:ring-cyan-500 transition duration-300 placeholder-gray-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {filteredGames.length > 0 && (
            <div className="absolute top-[2.5rem] w-full sm:w-[15rem] bg-blue-900 border border-cyan-500 rounded-lg shadow-lg mt-1">
              {filteredGames.map((jeu) => (
                <Link
                  key={jeu.id}
                  to={`/jeu/${jeu.id}`}
                  className="block px-4 py-2 hover:bg-blue-700 transition duration-300"
                >
                  {jeu.title}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="flex sm:flex-row flex-col gap-2">
          <Link to={"/ajouter"}>
            <button className="bg-green-600 hover:bg-green-500 text-white p-3 rounded-full transition duration-300 shadow-md flex items-center justify-center cursor-pointer">
              <span className="text-lg">Ajouter un jeu</span>
            </button>
          </Link>

          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-500 text-white p-3 rounded-full transition duration-300 shadow-md flex items-center justify-center cursor-pointer"
            >
              <span className="text-lg">Se déconnecter</span>
            </button>
          ) : (
            <Link to={"/connexion"}>
              <button className="bg-cyan-600 hover:bg-cyan-500 text-white p-3 rounded-full transition duration-300 shadow-md flex items-center justify-center cursor-pointer">
                <span className="text-lg">Se connecter</span>
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

