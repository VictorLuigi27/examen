import { Link } from 'react-router-dom';

export default function Inscription() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-950 text-white">
        <div className="bg-blue-900 p-8 rounded-2xl shadow-lg w-96">
          <h2 className="text-3xl font-bold text-center mb-6">Inscription</h2>
          
          <form className="space-y-4">
            {/* Nom d'utilisateur */}
            <div>
              <label className="block mb-1 font-medium">Nom d'utilisateur</label>
              <input
                type="text"
                className="w-full p-3 rounded-lg bg-blue-800 border border-cyan-500 focus:ring-2 focus:ring-cyan-400 outline-none"
                placeholder="Votre pseudo"
              />
            </div>
  
            {/* Email */}
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                className="w-full p-3 rounded-lg bg-blue-800 border border-cyan-500 focus:ring-2 focus:ring-cyan-400 outline-none"
                placeholder="Entrez votre email"
              />
            </div>
  
            {/* Mot de passe */}
            <div>
              <label className="block mb-1 font-medium">Mot de passe</label>
              <input
                type="password"
                className="w-full p-3 rounded-lg bg-blue-800 border border-cyan-500 focus:ring-2 focus:ring-cyan-400 outline-none"
                placeholder="••••••••"
              />
            </div>
  
            {/* Confirmation du mot de passe */}
            <div>
              <label className="block mb-1 font-medium">Confirmez le mot de passe</label>
              <input
                type="password"
                className="w-full p-3 rounded-lg bg-blue-800 border border-cyan-500 focus:ring-2 focus:ring-cyan-400 outline-none"
                placeholder="••••••••"
              />
            </div>
  
            {/* Bouton Inscription */}
            <button className="w-full bg-green-600 hover:bg-green-500 text-white p-3 rounded-lg font-bold transition duration-300">
              S'inscrire
            </button>
          </form>
  
          {/* Lien vers la connexion */}
          <div className="text-center mt-4">
            <p>
              Déjà un compte ?{" "}
              <Link to={"/connexion"} className="text-cyan-400 hover:underline">
                Connectez-vous
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
  