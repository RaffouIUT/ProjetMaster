'use client'

import Link from 'next/link';
import React, {useEffect, useState} from "react";
import {getListeNoms} from "./bddIntervenant";



const ListeNomsPage = () => {
    const [listeNoms, setListeNoms] = useState<string[]>([]);

    useEffect(() => {
        // Charge la liste des noms au montage de la page
        loadListeNoms();
    }, []);

    const loadListeNoms = async () => {
        const noms = await getListeNoms();
        setListeNoms(noms);
    };

    return (
        <nav>
            <ul>
                {listeNoms.map((nom, index) => {
                    const [nomPart, prenomPart] = nom.split('.'); // Supposant que le login est sous la forme "nom.prenom"
                    const nomComplet = `${nomPart} ${prenomPart}`;
                    return <li key={index}><Link href={"http://localhost:3000/"}>{nomComplet}</Link></li>;
                })}
            </ul>
        </nav>
    );
};

export default ListeNomsPage;