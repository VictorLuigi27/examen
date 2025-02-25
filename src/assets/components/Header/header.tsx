export default function Header() {
    return (
      <div className="bg-blue-950 text-white p-4 border-b-3 border-t-blue-600 flex items-center">
        
        <h1 className="text-4xl font-bold">PIXEL</h1>
  
        <div className="flex-1 flex justify-center">
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-64 p-2 bg-transparent border-2 border-cyan-400 text-white rounded-full outline-none focus:ring-2 focus:ring-cyan-500 transition duration-300 placeholder-gray-400"
          />
        </div>
  
        <button className="bg-green-600 hover:bg-green-500 text-white p-3 rounded-full flex items-center justify-center transition duration-300 cursor-pointer">
          <span className="text-2xl font-bold">+</span>
        </button>
        
      </div>
    );
  }
  