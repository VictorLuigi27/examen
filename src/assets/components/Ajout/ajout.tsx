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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileURL = URL.createObjectURL(e.target.files[0]);
      setFormData({ ...formData, picture: fileURL });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(""); 

    try {
      const response = await fetch("http://127.0.0.1:8000/game/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout du jeu.");
      }

      await response.json();
      setSuccessMessage("Jeu ajouté avec succès ! 🎉");
      navigate("/");

      // Réinitialisation du formulaire après succès
      setFormData({
        title: "",
        description: "",
        picture: "",
      });
    } catch (error) {
      console.error(error);
      setSuccessMessage("Une erreur est survenue. Veuillez réessayer.");
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
          <label className="block text-gray-300 mb-2">Image</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            accept="image/*"
            required
          />
          {formData.picture && (
            <img src={formData.picture} alt="Aperçu" className="mt-2 rounded w-full max-h-40 object-cover" />
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg transition duration-300"
        >
          Ajouter
        </button>

        {/* Affichage du message de succès ou d'erreur */}
        {successMessage && (
          <p className="mt-4 text-center text-green-400 bg-gray-700 p-2 rounded">
            {successMessage}
          </p>
        )}
      </form>
    </div>
  );
}
