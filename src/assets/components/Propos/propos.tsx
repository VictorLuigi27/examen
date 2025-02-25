export default function Propos() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-950 text-white">
        <div className="bg-blue-900 p-8 rounded-2xl shadow-lg max-w-2xl text-center">
          <h1 className="text-4xl font-bold mb-6 text-cyan-400">À Propos</h1>
          <p className="text-lg leading-relaxed">
            Ce site est une collection personnelle de jeux vidéo. Il permet de s'organiser, 
            de noter les jeux et de se motiver à collectionner. 🌟🎮
          </p>
  
          <p className="text-lg leading-relaxed mt-4">
            Il a été conçu dans le cadre d'un examen pour un <span className="font-bold">Titre Professionnel en développement web</span>. 
            Ce projet utilise les technologies suivantes :
          </p>
  
          <ul className="list-disc text-left mt-4 space-y-2 px-6">
            <li><span className="text-cyan-400 font-bold">Frontend :</span> ReactJS & Tailwind CSS</li>
            <li><span className="text-cyan-400 font-bold">Backend :</span> Symfony & MySQL</li>
          </ul>
  
          <p className="text-lg leading-relaxed mt-6">
            Merci de votre visite et bon jeu ! 🚀
          </p>
        </div>
      </div>
    );
  }
  