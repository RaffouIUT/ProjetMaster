import React, { useState } from 'react';
import { addInter, deleteInter } from '@/components/utils/interUtils';
import { notifyFailure, notifySuccess } from '@/components/utils/toastUtils';
import { ToastContainer } from 'react-toastify';
import { Button, Input, Label, Table } from 'reactstrap';
import 'react-toastify/dist/ReactToastify.css';
import { InterReduit, InterReduitVide } from '@/components/utils/customTypes';
import { TbHelp } from 'react-icons/tb';

interface params {
    inters: InterReduit[],
    refreshInters: any
}

const InterTabPane = ({ inters, refreshInters }: params) => {
    const [id, setId] = useState<string>("");
    const [nom, setNom] = useState<string>("");
    const [prenom, setPrenom] = useState<string>("");
    const [mail, setMail] = useState<string>("");

    const ajouterInter = async () => {
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
        addInter(id, nom, prenom, mail).then(() => {
            notifySuccess(`L'intervenant ${nom} ${prenom} a bien été ajouté. Un mail lui a été envoyé.`)
        }).catch(() => notifyFailure("Erreur lors de l'insertion BD de l'intervenant"));

        fillInter(structuredClone(InterReduitVide));
        refreshInters(true);
    };

    const supprimerInter = (idInter: string) => {
        deleteInter(idInter).then(() => {
            notifySuccess("L'intervenant a bien été supprimé.", "toastInter")
            refreshInters()
        }).catch(() => notifyFailure("Erreur lors de la suppression BD de l'intervenant. \n Vérifiez qu'il n'a plus de cours associé.", "toastInter"));
    };

    const fillInter = (inter: InterReduit) => {
        setId(inter.id);
        setNom(inter.nom);
        setPrenom(inter.prenom);
        setMail(inter.mail);
    }

    return (
        <section className={"mb-4"}>
            <ToastContainer containerId={"toastInter"} />
            <h3>Ajouter un Intervenant</h3>
            <div className={"flex flex-row mb-5"}>
                <div className={"flex flex-column mr-4 basis-1/4"}>
                    <Label for={'nomInput'}>Nom de l'intervenant</Label>
                    <Input type="text" id="nomInput" name="nomInput" value={nom}
                           onChange={(e) => setNom(e.target.value)}
                           placeholder={"Laurent"} />
                </div>
                <div className={"flex flex-column mr-4 basis-1/4"}>
                    <Label for={'prenomInput'}>Prénom de l'intervenant</Label>
                    <Input type="text" id={"prenomInput"} name="prenomInput" value={prenom}
                           onChange={(e) => setPrenom(e.target.value)}
                           placeholder={"Antoine"} />
                </div>
                <div className={"flex flex-column mr-4 basis-1/4"}>
                    <Label for={'mailInput'}>Adresse Mail de l'intervenant</Label>
                    <Input type="text" id={'mailInput'} name="mailInput" value={mail}
                           onChange={(e) => setMail(e.target.value)}
                           placeholder={"antoine.laurent2@mail.com"} />
                </div>
                <div className={"align-content-end"}>
                    <Button color={"primary"} onClick={ajouterInter} type="button">{id ? "Modifier" : "Ajouter"}</Button>
                </div>
            </div>
            <section>
                <h3>Liste des intervenants</h3>
                <Table id={"tab-intervenants"}>
                    <thead>
                    <tr>
                        <th className={"flex"}>
                            <button onClick={() => fillInter(structuredClone(InterReduitVide))}>Nom</button>
                            &nbsp;
                            <span className={'align-content-center'}>
                            <TbHelp className={'cursor-help'}
                                    title={'Cliquer sur le nom d\'un intervenant pour le modifier. Cliquer sur l\'en-tête de la colonne pour vider le formulaire.'} />
                        </span>
                        </th>
                        <th>Prenom</th>
                        <th>Login</th>
                        <th>Adresse mail</th>
                        <th>Supprimer l'intervenant</th>
                    </tr>
                    </thead>
                    <tbody>
                    {inters.map((inter) => (
                        <tr key={inter.id} className={'align-middle'}>
                            <td>
                                <button onClick={() => fillInter(inter)}>{inter.nom}</button></td>
                            <td>{inter.prenom}</td>
                            <td>{inter.login}</td>
                            <td>{inter.mail}</td>
                            <td>
                                <Button onClick={() => supprimerInter(inter.id)} size={"sm"} color={"danger"}>Supprimer</Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </section>
        </section>
    );
};

export default InterTabPane;