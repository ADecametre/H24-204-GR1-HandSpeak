//Note laissée par Adam Ibrahim (adam4718 sur gitHub): Afin de pouvoir visualiser le développement du site web, il est important de créer un lien "serveur"
//qu'on peut copier-coller dans un navigateur. On peut faire cela en ouvrant le terminal et en ecrivant la commande: npm run dev (il faut écrire : cd ReactApp, avant de faire cela
//afin de se trouver dans le bon folder) Date: 3/10/24
//IMPORTS:
import Header from './Header.jsx';
//FONCTION:
function App() {
  //composante principale du site web , on importe d'autre composantes dans celle-ci pour ensuite l'importer dans le root (main.jsx)
  return(
    <Header></Header>  
  );
}

export default App
