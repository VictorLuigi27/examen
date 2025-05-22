import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Inscription() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
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

        if (formData.password !== formData.confirmPassword) {
            setErrorMessage("Les mots de passe ne correspondent pas.");
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/register', { 
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

            if (!response.ok) {
                throw new Error(data.error || 'Erreur lors de l\'inscription');
            }

            setSuccessMessage('Inscription réussie ! Vous pouvez vous connecter maintenant.');
            setErrorMessage('');
            navigate("/connexion");
        } catch (error) {
            setErrorMessage((error as Error).message || 'Une erreur est survenue.');
            setSuccessMessage('');
        }
    };

    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-950 text-white">
        <div className="bg-blue-900 p-8 rounded-2xl shadow-lg w-96">
          <h2 className="text-3xl font-bold text-center mb-6">Inscription</h2>
          
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

            {/* Confirmation du mot de passe */}
            <div>
              <label className="block mb-1 font-medium">Confirmez le mot de passe</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-blue-800 border border-cyan-500 focus:ring-2 focus:ring-cyan-400 outline-none"
                placeholder="••••••••"
              />
            </div>

            {/* Affichage des messages d'erreur ou de succès */}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}

            {/* Bouton Inscription */}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-500 text-white p-3 rounded-lg font-bold transition duration-300"
            >
              S'inscrire
            </button>
          </form>

          {/* Lien vers la connexion */}
          <div className="text-center mt-4">
            <p>
              Déjà un compte ?{" "}
              <Link to="/connexion" className="text-cyan-400 hover:underline">
                Connectez-vous
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
}