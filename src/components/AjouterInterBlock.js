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


    const handleValiderClick = async () => {
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