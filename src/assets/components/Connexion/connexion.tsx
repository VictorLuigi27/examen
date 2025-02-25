export default function Connexion() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-950 text-white">
        <div className="bg-blue-900 p-8 rounded-2xl shadow-lg w-96">
          <h2 className="text-3xl font-bold text-center mb-6">Connexion</h2>
          
          <form className="space-y-4">
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
  
            {/* Bouton Connexion */}
            <button className="w-full bg-cyan-600 hover:bg-cyan-500 text-white p-3 rounded-lg font-bold transition duration-300">
              Se connecter
            </button>
          </form>
  
          {/* Lien mot de passe oublié */}
          <div className="text-center mt-4">
            <a href="#" className="text-cyan-400 hover:underline">
              Mot de passe oublié ?
            </a>
          </div>
        </div>
      </div>
    );
  }
  