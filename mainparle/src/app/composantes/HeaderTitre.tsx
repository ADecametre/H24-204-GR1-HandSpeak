/**
 * Composante réutilisable qui affiche un grand header pour le titre de la page,
 * on peut passer une valeur dans l'espace des props lorsque la composante est utilisée
 * afin de pouvoir la re-utiliser
 * -Adam Ibrahim
 */
import React, { ReactNode } from "react";

//Propriétés de la composante:
interface Props {
    titre?: ReactNode
}
//Composante exportée:
export default function HeaderTitre({titre}: Props){
    return(
        <div>
            <h1>{titre}</h1>
        </div>
    )
}