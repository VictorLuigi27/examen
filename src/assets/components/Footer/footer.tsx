import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="bg-blue-950 text-white p-6 border-t-[3px] border-white">
      <div className="max-w-screen-lg mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
        
        {/* Logo + Copyright */}
        <div>
          <h2 className="text-2xl font-bold">PIXEL</h2>
          <p className="text-sm mt-2">&copy; {new Date().getFullYear()} Tous droits réservés.</p>
        </div>

        {/* Liens utiles */}
        <div className="flex flex-col gap-2">
          <Link to={"/à-propos"} className="hover:underline cursor-pointer">À propos</Link>
          <Link to={"/conditions-generales"} className="hover:underline cursor-pointer">Conditions générales</Link>
          <Link to={"/confidentialites"} className="hover:underline cursor-pointer">Confidentialité</Link>
        </div>

        {/* Réseaux sociaux */}
        <div className="flex flex-col items-center md:items-end gap-2">
          <a 
            href="https://www.linkedin.com/in/victordiazpro/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:underline cursor-pointer text-blue-400">
            LinkedIn
          </a>
          <a href="https://my-portfolio-theta-sage.vercel.app/" target="_blank"  className="hover:underline cursor-pointer text-blue-400">Portfolio</a>
          
        </div>
      </div>
    </div>
  );
}
