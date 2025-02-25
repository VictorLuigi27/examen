import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className="bg-blue-950 text-white p-4 border-b-[3px] border-blue-600 shadow-lg pr-[4.5rem]">
      <div className="max-w-screen-lg mx-auto flex items-center justify-between">
        
        {/* Logo du site */}
        <Link to={"/"}>
          <h1 className="text-4xl font-bold">PIXEL</h1>
        </Link>
        

        {/* La barre de recherche */}
        <div className="flex-1 flex justify-center">
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-[15rem] p-2 bg-transparent border-2 border-cyan-400 text-white rounded-full outline-none focus:ring-2 focus:ring-cyan-500 transition duration-300 placeholder-gray-400"
          />
        </div>

        {/* Pour ajouter un jeu */}
        <button className="bg-green-600 hover:bg-green-500 text-white p-3 rounded-full transition duration-300 shadow-md flex items-center justify-center cursor-pointer">
          <span className="text-2xl font-bold">+</span>
        </button>

      </div>
    </div>
  );
}
