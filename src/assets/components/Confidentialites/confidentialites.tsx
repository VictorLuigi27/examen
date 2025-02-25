export default function Confidentialite() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-950 text-white p-6">
        <div className="bg-blue-900 p-8 rounded-2xl shadow-lg max-w-3xl text-left">
          <h1 className="text-4xl font-bold mb-6 text-cyan-400 text-center">Politique de Confidentialité</h1>
  
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-cyan-300">1. Collecte des données</h2>
            <p className="mt-2">
              Ce site ne collecte que les informations nécessaires pour son bon fonctionnement, comme votre pseudo et votre liste de jeux.
              Aucune donnée sensible (adresse, numéro de carte bancaire, etc.) n'est requise.
            </p>
          </section>
  
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-cyan-300">2. Utilisation des données</h2>
            <p className="mt-2">
              Les informations collectées sont utilisées uniquement pour personnaliser votre expérience sur le site et améliorer ses fonctionnalités.
              Nous ne partageons ni ne revendons vos données.
            </p>
          </section>
  
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-cyan-300">3. Stockage et sécurité</h2>
            <p className="mt-2">
              Vos données sont stockées en toute sécurité sur une base de données protégée.
              Des mesures sont mises en place pour éviter toute perte ou accès non autorisé.
            </p>
          </section>
  
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-cyan-300">4. Droits des utilisateurs</h2>
            <p className="mt-2">
              Vous avez le droit d’accéder, de modifier ou de supprimer vos données à tout moment.
              Pour cela, vous pouvez nous contacter via la page support ou depuis votre compte utilisateur.
            </p>
          </section>
  
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-cyan-300">5. Modifications de la politique</h2>
            <p className="mt-2">
              Cette politique de confidentialité peut être mise à jour. Toute modification importante sera signalée sur le site.
            </p>
          </section>
  
          <p className="text-center mt-6 text-gray-300">
            Dernière mise à jour : {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    );
  }
  