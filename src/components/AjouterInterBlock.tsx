'use client';
import styles from '../app/styles/AjouterInterBlock.module.css';
import React, { useState } from 'react';
import { ajoutInter, sendEmailToInter } from '@/components/utils/interUtils';
import { notifyFailure, notifySuccess } from '@/components/utils/toastUtils';
import { ToastContainer } from 'react-toastify';

const AjouterInterBlock = () => {
    const [nom, setNom] = useState<string>("");
    const [prenom, setPrenom] = useState<string>("");
    const [mail, setMail] = useState<string>("");

    const handleValiderClick = async () => {
        // Vérification du format du nom et du prénom
        const nomRegex = /^[A-Z][a-z]*$/;
        const prenomRegex = /^[A-Z][a-z]*$/;

        if (!nom.match(nomRegex) || !prenom.match(prenomRegex)) {
            alert("Le nom et le prénom doivent commencer par une majuscule suivi de minuscules sans chiffre.");
            return;
        }

        // Vérification du format de l'adresse e-mail
        const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!mail.match(mailRegex)) {
            alert("Veuillez saisir une adresse e-mail valide.");
            return;
        }

        // Ajout dans la base de données
        ajoutInter(nom, prenom, mail).then(() => {
            notifySuccess(`L'intervenant ${nom} ${prenom} a bien été ajouté. Un mail lui a été envoyé.`)
        }).catch(() => notifyFailure("Erreur lors de l'insertion BD de l'intervenant"));

        setNom("");
        setPrenom("");
        setMail("");
    };

    return (
        <div className={styles.MiddleSideBlock}>
            <ToastContainer />
            <div className={styles.element}>
                <div>
                    Nom de l'intervenant
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
                    Prénom de l'intervenant
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
                    Mail de l'intervenant
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