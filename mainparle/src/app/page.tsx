/**
 * Cette classe s'agit de la page d'accueil du site-web
 * PS: si le projet lance pleins d'erreurs lors du lancement, assurez vous d'avoir installé tous les dépendences
 * avec les commandes NPM. Ce projet utilise NextJS ainsi que la librairie CSS Mantine
 * -Adam Ibrahim
 * @returns 
 */
import Navbar from "./components/Navbar";
export default function Home() {
  return (
    <div>
      <Navbar></Navbar>
    </div>
  );
}
