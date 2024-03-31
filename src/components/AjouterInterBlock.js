'use client'
import styles from '../app/styles/AjouterInterBlock.module.css';
import {AjoutInterBDD, getListeNoms} from "@/components/bddIntervenant";
import React, { useState } from 'react';
import {ListeNomsPage, UEProcker, UEProckerSwitch} from "@/components/AffIntervenants";

const AjouterInterBlock = () => {
    const inter = "l'intervenant";
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [mail, setMail] = useState("");


    /*const handleValiderClick = async () => {
        await AjoutInterBDD(nom, prenom, mail);
        setNom("");
        setPrenom("");
        setMail("");
        UEProckerSwitch();
    };*/

    const handleValiderClick = async () => {
        // Vérification du format du nom et du prénom
        const nomRegex = /^[A-Z][a-z]*$/;
        const prenomRegex = /^[A-Z][a-z]*$/;

        if (!nom.match(nomRegex) || !prenom.match(prenomRegex)) {
            alert("Le nom et le prénom doivent commencer par une majuscule suivie de minuscules sans chiffre.");
            return;
        }

        // Vérification du format de l'adresse e-mail
        const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!mail.match(mailRegex)) {
            alert("Veuillez saisir une adresse e-mail valide.");
            return;
        }

        // Ajout dans la base de données
        await AjoutInterBDD(nom, prenom, mail);
        setNom("");
        setPrenom("");
        setMail("");
        UEProckerSwitch();
    };

    return (
        <div className={styles.MiddleSideBlock}>
            <div className={styles.element}>
                <div>
                    Nom de {inter}
                </div>
                <div className={styles.bar}>
                    {/* Update the input value and onChange */}
                    <input
                        type="text"
                        id="nomInput"
                        name="nomInput"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                    />
                </div>
                <div>
                    Prénom de {inter}
                </div>
                <div className={styles.bar}>
                    {/* Update the input value and onChange */}
                    <input
                        type="text"
                        id="prenomInput"
                        name="prenomInput"
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                    />
                </div>
                <div>
                    Mail de {inter}
                </div>
                <div className={styles.bar}>
                    {/* Update the input value and onChange */}
                    <input
                        type="text"
                        id="mailInput"
                        name="mailInput"
                        value={mail}
                        onChange={(e) => setMail(e.target.value)}
                    />
                </div>
                <div className={styles.button}>
                    {/* Remove the () after AjoutInterBDD */}
                    <button onClick={handleValiderClick} type="button">Valider</button>
                </div>
            </div>
        </div>
    );
};

export default AjouterInterBlock;