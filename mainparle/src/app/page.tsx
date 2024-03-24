/**
 * Cette classe s'agit de la page d'accueil du site-web
 * PS: si le projet lance pleins d'erreurs lors du lancement, assurez vous d'avoir installé tous les dépendences
 * avec les commandes NPM. Ce projet utilise NextJS ainsi que la librairie CSS Mantine
 * -Adam Ibrahim
 * IMPORTANT: On uitilise la commande : npm run dev , dans le terminal afin de visualiser le projet en créant un lien temporaire
 */
import BarreNavigation from "./composantes/BarreNavigation";
import HeaderTitre from "./composantes/HeaderTitre";
export default function Home() {
  return (
    <div>
      <BarreNavigation></BarreNavigation>
      <div>
        <HeaderTitre titre = 'Apprenez le language des signes gratuitement avec SigneFacile! Communiquez sans barrières dès aujourd&apos;hui!'></HeaderTitre>
      </div>
    </div>
  );
}
//on utilise le symbole &apos pour écrire les apostrophes en HTML