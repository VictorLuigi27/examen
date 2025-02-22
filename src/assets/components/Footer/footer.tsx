export default function Footer() {
    return (
      <div className="bg-blue-950 text-white p-4 flex items-center justify-between">
        {/* Copyright */}
        <p className="text-sm">&copy; {new Date().getFullYear()} PIXEL. Tous droits réservés.</p>
  
        {/* Conditions générales */}
        <p className="text-sm hover:underline cursor-pointer">Conditions générales</p>
  
        {/* Lien LinkedIn */}
        <a 
          href="https://www.linkedin.com/in/victordiazpro/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-sm hover:underline cursor-pointer text-blue-400">
          LinkedIn
        </a>
      </div>
    );
  }
  