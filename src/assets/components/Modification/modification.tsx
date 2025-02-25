export default function Modification() {
    return (
      <div className="bg-blue-950 text-white min-h-screen flex items-center justify-center p-6">
        <div className="bg-blue-900 p-6 rounded-lg shadow-lg w-full max-w-lg flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-center">Modifier le jeu</h1>
          
          <label className="flex flex-col">
            <span className="text-gray-300">Titre du jeu</span>
            <input type="text" className="p-2 rounded bg-blue-800 text-white border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </label>
          
          <label className="flex flex-col">
            <span className="text-gray-300">Description</span>
            <textarea className="p-2 rounded bg-blue-800 text-white border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500" rows={4}></textarea>
          </label>
          
          <label className="flex flex-col">
            <span className="text-gray-300">Image</span>
            <input type="file" className="p-2 bg-blue-800 text-white border border-blue-700 rounded" />
          </label>
          
          <div>
            <span className="text-gray-300">Note</span>
            <div className="flex gap-2 mt-1">
              {[...Array(5)].map((_, index) => (
                <button key={index} className="text-yellow-400 text-2xl">★</button>
              ))}
            </div>
          </div>
          
          <button className="bg-green-600 hover:bg-green-500 text-white py-2 rounded-md text-lg font-semibold transition duration-300">
            Enregistrer
          </button>
        </div>
      </div>
    );
  }
  