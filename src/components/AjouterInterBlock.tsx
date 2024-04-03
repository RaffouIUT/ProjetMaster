'use client';
import React, { useState } from 'react';
import { ajoutInter } from '@/components/utils/interUtils';
import { notifyFailure, notifySuccess } from '@/components/utils/toastUtils';
import { ToastContainer } from 'react-toastify';
import { Button, Input, Label } from 'reactstrap';

interface params {
    setActualize: React.Dispatch<React.SetStateAction<boolean>>;
}

const AjouterInterBlock = ({ setActualize }: params) => {
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
        setActualize(true);
    };

    return (
        <section className={"mb-4"}>
            <ToastContainer />
            <h3>Ajouter un Intervenant</h3>
            <div className={"flex flex-row"}>
                <div className={"flex flex-column mr-4"}>
                    <Label for={'nomInput'}>Nom de l'intervenant</Label>
                    <Input type="text" id="nomInput" name="nomInput" value={nom}
                           onChange={(e) => setNom(e.target.value)}
                           placeholder={"Laurent"}/>
                </div>
                <div className={"flex flex-column mr-4"}>
                    <Label for={'prenomInput'}>Prénom de l'intervenant</Label>
                    <Input type="text" id={"prenomInput"} name="prenomInput" value={prenom}
                           onChange={(e) => setPrenom(e.target.value)}
                           placeholder={"Antoine"}/>
                </div>
                <div className={"flex flex-column mr-4"}>
                    <Label for={'mailInput'}>Adresse Mail de l'intervenant</Label>
                    <Input type="text" id={'mailInput'} name="mailInput" value={mail}
                           onChange={(e) => setMail(e.target.value)}
                           placeholder={"antoine.laurent2@mail.com"}/>
                </div>
                <div className={"align-content-end"}>
                    <Button color={"primary"} onClick={handleValiderClick} type="button">Ajouter</Button>
                </div>
            </div>
        </section>
    );
};

export default AjouterInterBlock;