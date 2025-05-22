import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function AjoutJeu() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    picture: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    // Vérification des champs avant d'envoyer la requête
    if (!formData.title || !formData.description || !formData.picture) {
      setErrorMessage("Tous les champs sont requis.");
      return;
    }

    try {
      // Construire l'objet JSON à envoyer
      const jsonData = {
        title: formData.title,
        description: formData.description,
        picture: formData.picture, // URL de l'image
      };

      // Envoyer la requête
      fetch("https://aqueous-hollows-77051-12a75dbea821.herokuapp.com/game/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      })
        .then(async (response) => {
          const responseText = await response.text();
          console.log("Réponse brute du serveur :", responseText);

          if (!response.ok) throw new Error(responseText);

          setSuccessMessage("Jeu ajouté avec succès !");
          navigate("/");
          setFormData({
            title: "",
            description: "",
            picture: "",
          });
        })
        .catch((error) => {
          console.error("Erreur:", error);
          setErrorMessage("Une erreur est survenue. Veuillez réessayer.");
        });
    } catch (error) {
      console.error("Erreur:", error);
      setErrorMessage("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Ajouter un Jeu</h1>

        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Titre</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Titre du jeu"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Description du jeu"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 mb-2">URL de l'image</label>
          <input
            type="text"
            name="picture"
            value={formData.picture}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="URL de l'image"
            required
          />
          {formData.picture && (
            <img src={formData.picture} alt="Aperçu" className="mt-2 rounded w-full max-h-40 object-cover" />
          )}
        </div>

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg transition duration-300">
          Ajouter
        </button>

        {successMessage && (
          <p className="mt-4 text-center text-green-400 bg-gray-700 p-2 rounded">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="mt-4 text-center text-red-400 bg-gray-700 p-2 rounded">{errorMessage}</p>
        )}
      </form>
    </div>
  );
}