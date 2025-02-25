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
        <div className="md:w-1/3 flex justify-center">
          <img src={jeu.image} alt={jeu.title} className="rounded-lg shadow-md w-full" />
        </div>

        <div className="md:w-2/3 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{jeu.title}</h1>
            <p className="text-gray-300 mb-4">{jeu.description}</p>
            <p className="text-cyan-400 font-semibold">Catégorie : {jeu.category}</p>

            <div className="flex mt-2">
              {[...Array(5)].map((_, index) =>
                index < jeu.rating ? (
                  <FaStar key={index} className="text-yellow-400 text-xl" />
                ) : (
                  <FaRegStar key={index} className="text-gray-500 text-xl" />
                )
              )}
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-full flex items-center gap-2 transition duration-300 cursor-pointer">
              <FaEdit /> Modifier
            </button>
            <button className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-full flex items-center gap-2 transition duration-300 cursor-pointer">
              <FaTrash /> Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

