import { Link, useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

interface JeuData {
  id: number;
  title: string;
  description: string;
  picture: string;
}

export default function Jeu() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate(); // Pour rediriger après la suppression
  const [jeu, setJeu] = useState<JeuData | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Charger les données du jeu
  useEffect(() => {
    if (id) {
      fetch(`https://aqueous-hollows-77051-12a75dbea821.herokuapp.com/game/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erreur réseau');
          }
          return response.json();
        })
        .then((data) => {
          setJeu(data);
        })
        .catch((error) => console.error('Erreur lors du chargement du jeu:', error));
    }
  }, [id]);

  // Fonction pour supprimer le jeu
  const handleDelete = async () => {
    if (id) {
      try {
        const response = await fetch(`https://aqueous-hollows-77051-12a75dbea821.herokuapp.com/game/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la suppression du jeu');
        }

        // Afficher le message de succès
        setShowSuccessMessage(true);
        
        // Rediriger après quelques secondes
        setTimeout(() => {
          navigate("/"); // Rediriger vers la page principale
        }, 2000);

      } catch (error) {
        console.error("Erreur de suppression :", error);
        alert("Une erreur est survenue lors de la suppression du jeu.");
      }
    }
  };

  if (!jeu) {
    return <div className="text-center text-white text-xl">Jeu non trouvé</div>;
  }

  return (
    <div className="bg-blue-950 text-white min-h-screen flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-blue-900 p-6 rounded-lg shadow-lg flex flex-col md:flex-row gap-6">

        {/* Partie gauche : Image, boutons */}
        <div className="md:w-1/3 flex flex-col items-center">
          <img src={jeu.picture} alt={jeu.title} className="rounded-lg shadow-md w-full mb-3" />

          {/* Les boutons de modifications et supprimer */}
          <div className="flex flex-col gap-2 w-full">
            <Link to={`/modifier/${jeu.id}`}>
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-lg flex items-center justify-center gap-2 transition duration-300 cursor-pointer w-full">
                <FaEdit /> Modifier
              </button>
            </Link>

            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-500 text-white px-3 py-2 rounded-lg flex items-center justify-center gap-2 transition duration-300 cursor-pointer w-full"
            >
              <FaTrash /> Supprimer
            </button>
          </div>
        </div>

        {/* Partie droite : Titre + Description */}
        <div className="md:w-2/3 flex flex-col">
          <h1 className="text-2xl font-bold mb-3">{jeu.title}</h1>
          <p className="text-gray-300">{jeu.description}</p>

  
        </div>

      </div>

      {/* Message de succès */}
      {showSuccessMessage && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-4 rounded-lg shadow-lg">
          Jeu supprimé avec succès !
        </div>
      )}
    </div>
  );
}
