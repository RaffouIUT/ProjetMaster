import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getListeNoms } from "./bddIntervenant";


export let UEProcker : boolean = true;
export const UEProckerSwitch = () =>{
    UEProcker = false;
}
export const ListeNomsPage = () => {
    let noms: string[] = ["En attente des données ..."];

    const [listeNoms, setListeNoms] = useState<string[]>([]);

    const loadListeNoms = async () => {
        noms = await getListeNoms();
        setListeNoms(noms);
    };

    useEffect(() => {
        // Charge la liste des noms au montage de la page
        loadListeNoms().then(r => {});
        UEProcker = true;
    }, [UEProcker]);

    if (!Array.isArray(listeNoms)) {
        return <div>Loading...</div>;
    }

    return (
        <nav>
            <ul>
                {listeNoms.map((nom : string, index : number) => {
                    const [nomPart, prenomPart] = nom.split('.'); // Supposant que le login est sous la forme "nom.prenom"
                    const nomComplet = `${nomPart} ${prenomPart}`;
                    return <li key={index}>{nomComplet}</li>;
                })}
            </ul>
        </nav>
    );
};
