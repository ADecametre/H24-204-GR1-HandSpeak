/**
 * Composante réutilisable qui représente une barre de navigation
 * -Adam Ibrahim
 */
import React from "react";

export default function Navbar(){
    return(
        <div>
            <ul>
                <li><a href="">Acceuil</a></li>
                <li><a href="">Cours</a></li>
                <li><a href="">Se connecter</a></li>
                <li><a href="">À propos</a></li>
            </ul>
        </div>
    )
}