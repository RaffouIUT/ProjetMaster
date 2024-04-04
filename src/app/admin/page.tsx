'use client';
import AddInterBlock from '@/components/addInterBlock';
import React, { useEffect, useState } from 'react';
import { InterReduit } from '@/components/utils/customTypes';
import { deleteInter, getAllInter } from '@/components/utils/interUtils';
import { Button, Table } from 'reactstrap';
import { notifyFailure, notifySuccess } from '@/components/utils/toastUtils';
import NavBarAdmin from '@/components/navBarAdmin';


export default function Page() {

    const [intervenants, setIntervenants] = useState<InterReduit[]>([]);

    const [actualizeInters, setActualizeInters] = useState<boolean>(true);

    useEffect(() => {
        if (actualizeInters) {
            getAllInter().then((inters) => setIntervenants(inters));
            setActualizeInters(false)
        }
    }, [actualizeInters]);

    const supprimerInter = async (e:  React.MouseEvent<HTMLButtonElement>) => {
        // @ts-ignore
        const idInter = e.target.parentElement.parentElement.id
        deleteInter(idInter).then(() => {
            notifySuccess("L'intervenant a bien été supprimé.")
            setActualizeInters(true)
        }).catch(() => notifyFailure("Erreur lors de la suppression BD de l'intervenant. \n Vérifiez qu'il n'a plus de cours associé."));
    };

    return (
        <section className="flex flex-column min-h-screen">
            <NavBarAdmin />
            <section className={"p-4"}>
                <AddInterBlock setActualize={setActualizeInters}/>
                <section>
                    <h3>Liste des intervenants</h3>
                    <Table id={"tab-intervenants"}>
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Prenom</th>
                                <th>Login</th>
                                <th>Adresse mail</th>
                                <th>Supprimer l'intervenant</th>
                            </tr>
                        </thead>
                        <tbody>
                            {intervenants.map((inter) => (
                                <tr id={inter.id} key={inter.id} className={"align-middle"}>
                                    <td>{inter.nom}</td>
                                    <td>{inter.prenom}</td>
                                    <td>{inter.login}</td>
                                    <td>{inter.mail}</td>
                                    <td>
                                        <Button onClick={supprimerInter} size={"sm"} color={"danger"} >Supprimer</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </section>
            </section>
        </section>
)
    ;
};
