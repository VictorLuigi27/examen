import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaStar, FaRegStar, FaEdit, FaTrash } from "react-icons/fa";

interface JeuData {
  id: number;
  title: string;
  description: string;
  category: string;
  rating: number;
  image: string;
}

export default function Jeu() {
  const { id } = useParams<{ id: string }>();
  const [jeu, setJeu] = useState<JeuData | null>(null);

  useEffect(() => {
    fetch("/data/data.json")
      .then((res) => res.json())
      .then((data: JeuData[]) => {
        const selectedGame = data.find((item) => item.id === Number(id));
        setJeu(selectedGame || null);
      })
      .catch((error) => console.error("Erreur lors du chargement du jeu :", error));
  }, [id]);

  if (!jeu) {
    return <div className="text-center text-white text-xl">Jeu non trouvé</div>;
  }

  return (
    <div className="bg-blue-950 text-white min-h-screen flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-blue-900 p-6 rounded-lg shadow-lg flex flex-col md:flex-row gap-6">

        {/* Partie gauche : Image, étoiles, boutons */}
        <div className="md:w-1/3 flex flex-col items-center">
          <img src={jeu.image} alt={jeu.title} className="rounded-lg shadow-md w-full mb-3" />

          {/* Étoiles */}
          <div className="flex gap-1 mb-3">
            {[...Array(5)].map((_, index) =>
              index < jeu.rating ? (
                <FaStar key={index} className="text-yellow-400 text-xl" />
              ) : (
                <FaRegStar key={index} className="text-gray-500 text-xl" />
              )
            )}
          </div>

          {/* Boutons */}
          <div className="flex flex-col gap-2 w-full">
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-lg flex items-center justify-center gap-2 transition duration-300 cursor-pointer w-full">
              <FaEdit /> Modifier
            </button>
            <button className="bg-red-600 hover:bg-red-500 text-white px-3 py-2 rounded-lg flex items-center justify-center gap-2 transition duration-300 cursor-pointer w-full">
              <FaTrash /> Supprimer
            </button>
          </div>
        </div>

        {/* Partie droite : Titre + Description */}
        <div className="md:w-2/3 flex flex-col">
          <h1 className="text-2xl font-bold mb-3">{jeu.title}</h1> {/* Espacement réduit */}
          <p className="text-gray-300">{jeu.description}</p> {/* Moins d'écart */}
        </div>

      </div>
    </div>
  );
}
