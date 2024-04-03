'use client'
import styles from '../app/styles/AjouterInterBlock.module.css';
import {AjoutInterBDD, getListeNoms, sendEmail} from "@/components/bddIntervenant";
import React, { useState } from 'react';
import {ListeNomsPage, UEProcker, UEProckerSwitch} from "@/components/AffIntervenants";

const AjouterInterBlock = () => {
    const inter = "l'intervenant";
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [mail, setMail] = useState("");

    const handleSendEmail = async (nom, prenom, email) => {
        try {
            await sendEmail({
                to: email,
                subject: 'Enregistrement en tant qu\'intervenant - Le Mans Université',
                text: 'Bonjour '+ nom + ' ' + prenom + ',\nVous avez été ajouté en tant qu\'intervenant à l\'université du mans'
            });
            console.log('E-mail envoyé avec succès');
        } catch (error) {
            alert('Une erreur s\'est produite lors de l\'envoi de l\'e-mail');
        }
    };


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
        const n = nom;
        const pn = prenom;
        const m = mail;
        setNom("");
        setPrenom("");
        setMail("");
        UEProckerSwitch();
        await handleSendEmail(n, pn, m);
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