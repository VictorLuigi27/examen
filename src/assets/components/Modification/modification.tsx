import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Importer useNavigate

export default function Modification() {
  const { gameId } = useParams<{ gameId: string }>(); // Récupère gameId depuis l'URL
  const navigate = useNavigate(); // Utilise navigate pour rediriger
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    picture: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Charger les données existantes du jeu
  useEffect(() => {
    const fetchGame = async () => {
      if (!gameId) return; // Vérifie si gameId existe avant de continuer

      try {
        const response = await fetch(`http://127.0.0.1:8000/${gameId}`);
        if (!response.ok) throw new Error("Erreur lors du chargement du jeu");

        const data = await response.json();
        setFormData({
          title: data.title || "",
          description: data.description || "",
          picture: data.picture || "",
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchGame();
  }, [gameId]); // Rechargement des données si gameId change

  // Gérer les modifications des inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Gérer le changement d'URL pour l'image
  const handleImageURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, picture: e.target.value });
  };

  // Gérer la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");
    setLoading(true);

    try {
      const response = await fetch(`http://127.0.0.1:8000/game/${gameId}/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Erreur lors de la modification du jeu.");

      setSuccessMessage("Jeu modifié avec succès ! 🎉");

      // Redirection vers la page d'accueil après succès
      setTimeout(() => {
        navigate("/"); // Redirige vers la page d'accueil
      }, 1500); // Attendre un peu avant de rediriger (pour afficher le message de succès)
    } catch (error) {
      console.error(error);
      setSuccessMessage("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  console.log("gameId récupéré :", gameId);

  return (
    <div className="bg-blue-950 text-white min-h-screen flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="bg-blue-900 p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Modifier le jeu {gameId}</h1>

        <label className="flex flex-col mb-4">
          <span className="text-gray-300">Titre du jeu</span>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="p-2 rounded bg-blue-800 text-white border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </label>

        <label className="flex flex-col mb-4">
          <span className="text-gray-300">Description</span>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="p-2 rounded bg-blue-800 text-white border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            required
          />
        </label>

        <label className="flex flex-col mb-4">
          <span className="text-gray-300">Image (URL)</span>
          <input
            type="text"
            name="picture"
            value={formData.picture}
            onChange={handleImageURLChange}
            className="p-2 rounded bg-blue-800 text-white border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Entrez l'URL de l'image"
          />
          {formData.picture && <img src={formData.picture} alt="Aperçu" className="mt-2 rounded w-full max-h-40 object-cover" />}
        </label>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded-md text-lg font-semibold transition duration-300"
          disabled={loading}
        >
          {loading ? "Enregistrement..." : "Enregistrer"}
        </button>

        {successMessage && (
          <p className="mt-4 text-center text-green-400 bg-gray-700 p-2 rounded">{successMessage}</p>
        )}
      </form>
    </div>
  );
}


