/**
 * Composante réutilisable qui affiche une barre de navigation
 * -Adam Ibrahim
 */
import React from "react";
//Composante exportée (On utilise un ul comme "classe mère", et des éléments de listes avec hyperliens qui vont mener à de futur pages):
//PS: n'oubliez pas d'enlever les "bullet points" lors du Styling

export default function BarreNavigation(){
    return(
        <div>
            <ul>
                <li><a href="http://localhost:3000/">Acceuil</a></li>
                <li><a href="http://localhost:3000/cours">Cours</a></li>
                <li><a href="">Se connecter</a></li>
                <li><a href="http://localhost:3000/a-propos">À propos</a></li>
            </ul>
        </div>
    )
}