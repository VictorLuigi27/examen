export default function Conditions() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-950 text-white p-6">
        <div className="bg-blue-900 p-8 rounded-2xl shadow-lg max-w-3xl text-left">
          <h1 className="text-4xl font-bold mb-6 text-cyan-400 text-center">Conditions Générales d'Utilisation</h1>
          
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-cyan-300">1. Présentation du site</h2>
            <p className="mt-2">
              Ce site est un outil personnel permettant de gérer une collection de jeux vidéo, de les noter et de s’organiser.
              Il a été créé dans le cadre d’un examen pour un titre professionnel en développement web.
            </p>
          </section>
  
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-cyan-300">2. Accès au site</h2>
            <p className="mt-2">
              L’accès au site est libre et gratuit. Cependant, certaines fonctionnalités peuvent nécessiter la création d’un compte utilisateur.
            </p>
          </section>
  
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-cyan-300">3. Responsabilités</h2>
            <p className="mt-2">
              L’administrateur du site ne pourra être tenu responsable en cas d’éventuels dysfonctionnements, pertes de données ou mauvais usage du site.
            </p>
          </section>
  
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-cyan-300">4. Données personnelles</h2>
            <p className="mt-2">
              Aucune donnée personnelle sensible n’est collectée. L’utilisateur peut demander la suppression de son compte et de ses informations à tout moment.
            </p>
          </section>
  
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-cyan-300">5. Modifications des conditions</h2>
            <p className="mt-2">
              L’éditeur du site se réserve le droit de modifier ces conditions à tout moment. Les utilisateurs seront informés des mises à jour importantes.
            </p>
          </section>
  
          <p className="text-center mt-6 text-gray-300">
            Dernière mise à jour : {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    );
  }
  