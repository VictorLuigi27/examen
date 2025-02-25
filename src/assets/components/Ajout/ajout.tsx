export default function AjoutJeu() {
    return (
      <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center p-6">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg">
          <h1 className="text-2xl font-bold mb-6 text-center">Ajouter un Jeu</h1>
          
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Titre</label>
            <input type="text" className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Titre du jeu" />
          </div>
  
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Description</label>
            <textarea className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Description du jeu"></textarea>
          </div>
  
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Image</label>
            <input type="file" className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="URL de l'image" />
          </div>
  
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Note</label>
            <select className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              {[1, 2, 3, 4, 5].map((note) => (
                <option key={note} value={note}>{note} étoile{note > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>
  
          <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg transition duration-300">Ajouter</button>
        </div>
      </div>
    );
  }
  