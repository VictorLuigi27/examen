import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [search, setSearch] = useState("");
  const [games, setGames] = useState<{ id: number; title: string }[]>([]);
  const [filteredGames, setFilteredGames] = useState<{ id: number; title: string }[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Charger les jeux depuis l'API backend
  useEffect(() => {
    console.log("useEffect - Chargement des jeux depuis l'API...");
    fetch("http://127.0.0.1:8000/api/games")  // L'URL de ta route Symfony
      .then((res) => res.json())
      .then((data) => {
        console.log("Jeux récupérés:", data);
        setGames(data);
      })
      .catch((error) => console.error("Erreur lors du chargement des jeux :", error));
  }, []);

  // Filtrer et trier les jeux en fonction de la recherche
  useEffect(() => {
    console.log("useEffect - Recherche en cours, search:", search);
    if (search.trim() === "") {
      console.log("La recherche est vide, réinitialisation des jeux filtrés.");
      setFilteredGames([]);
    } else {
      const lowerSearch = search.toLowerCase();

      const filtered = games
        .filter((jeu) => jeu.title.toLowerCase().includes(lowerSearch)) // On garde les jeux qui contiennent le texte
        .sort((a, b) => {
          const aStarts = a.title.toLowerCase().startsWith(lowerSearch);
          const bStarts = b.title.toLowerCase().startsWith(lowerSearch);

          if (aStarts && !bStarts) return -1; // a en premier si c'est un match au début
          if (!aStarts && bStarts) return 1; // b en premier sinon
          return a.title.localeCompare(b.title); // Tri alphabétique pour les autres cas
        });

      console.log("Jeux filtrés et triés:", filtered);
      setFilteredGames(filtered);
    }
  }, [search, games]);

  // Vérifier si l'utilisateur est connecté en surveillant les changements du localStorage
  useEffect(() => {
    console.log("useEffect - Vérification de l'authentification...");
    const token = localStorage.getItem("token");
    console.log("Token récupéré dans le localStorage:", token);
  
    if (token) {
      console.log("Token trouvé. L'utilisateur est authentifié.");
      setIsAuthenticated(true); // Si le token existe, l'utilisateur est authentifié
    } else {
      console.log("Aucun token trouvé. L'utilisateur n'est pas authentifié.");
      setIsAuthenticated(false); // Si pas de token, utilisateur non authentifié
    }

    // Pour que le header se mette à jour immédiatement si le localStorage change
    const handleStorageChange = () => {
      const updatedToken = localStorage.getItem("token");
      setIsAuthenticated(!!updatedToken); // On met à jour isAuthenticated selon la présence du token
    };

    // Attacher l'écouteur d'événements pour suivre les changements dans le localStorage
    window.addEventListener("storage", handleStorageChange);

    // Nettoyage à la désactivation du composant
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []); // Ce useEffect se déclenche au premier montage du composant

  // Fonction de déconnexion
  const handleLogout = () => {
    console.log("Déconnexion en cours...");
    localStorage.removeItem("token");
    console.log("Token supprimé du localStorage.");
    setIsAuthenticated(false); // Met à jour l'état d'authentification
  };

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
            onChange={(e) => {
              console.log("Recherche modifiée, nouvelle valeur:", e.target.value);
              setSearch(e.target.value);
            }}
          />

          {/* Résultats de recherche affichés sous l'input */}
          {filteredGames.length > 0 && (
            <div className="absolute top-[2.5rem] w-full sm:w-[15rem] bg-blue-900 border border-cyan-500 rounded-lg shadow-lg mt-1">
              {filteredGames.map((jeu) => (
                <Link
                  key={jeu.id}
                  to={`/jeu/${jeu.id}`}
                  className="block px-4 py-2 hover:bg-blue-700 transition duration-300"
                  onClick={() => {
                    console.log("Jeu sélectionné:", jeu.title);
                    setSearch(""); // Réinitialise la recherche après clic
                  }}
                >
                  {jeu.title}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Bouton pour ajouter un jeu */}
        <div className="flex sm:flex-row flex-col gap-2">
          <Link to={"/ajouter"}>
            <button className="bg-green-600 hover:bg-green-500 text-white p-3 rounded-full transition duration-300 shadow-md flex items-center justify-center cursor-pointer">
              <span className="text-lg">+</span>
            </button>
          </Link>

          {/* Si l'utilisateur est authentifié, bouton de déconnexion */}
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
