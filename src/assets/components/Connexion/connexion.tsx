import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Connexion() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('https://aqueous-hollows-77051-12a75dbea821.herokuapp.com/api/login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Token:', data.token); 
        localStorage.setItem("token", data.token); // Enregistrer le token

        // Forcer la mise à jour de l'état dans le Header
        window.dispatchEvent(new Event("storage")); // Déclenche l'événement storage pour mettre à jour le Header

        setSuccessMessage('Connexion réussie !'); 
        setErrorMessage(''); 
        navigate("/"); 
      } else {
        setErrorMessage(data.message || 'Une erreur est survenue.'); 
        setSuccessMessage(''); 
      }
    } catch (error) {
      setErrorMessage((error as Error).message || 'Une erreur est survenue.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-950 text-white">
      <div className="bg-blue-900 p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center mb-6">Connexion</h2>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-blue-800 border border-cyan-500 focus:ring-2 focus:ring-cyan-400 outline-none"
              placeholder="Entrez votre email"
            />
          </div>

          {/* Mot de passe */}
          <div>
            <label className="block mb-1 font-medium">Mot de passe</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-blue-800 border border-cyan-500 focus:ring-2 focus:ring-cyan-400 outline-none"
              placeholder="••••••••"
            />
          </div>

          {/* Affichage des messages d'erreur ou de succès */}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}

          {/* Bouton Connexion */}
          <button
            type="submit"
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white p-3 rounded-lg font-bold transition duration-300 cursor-pointer"
          >
            Se connecter
          </button>
        </form>

        {/* Lien mot de passe oublié */}
        <div className="text-center mt-4">
          <Link to="/inscription" className="text-cyan-400 hover:underline">
            Inscription
          </Link>
        </div>
      </div>
    </div>
  );
}

