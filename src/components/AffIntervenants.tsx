'use client'

import Link from 'next/link';
import db from "../modules/db";
import {revalidatePath} from "next/cache";
import React, {useEffect, useState} from "react";
import {getListeNoms} from "./bddIntervenant";



/*export const AffIntervenants = ({ liste }) => {
    return (
        <nav>
            <ul>
                {liste.map((page) => (
                    <li key={page.path}>
                        <Link href={page.path}>{page.label}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};*/



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
                    return <li key={index}>{nomComplet}</li>;
                })}
            </ul>
        </nav>
    );
};

export default ListeNomsPage;