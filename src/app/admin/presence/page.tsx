'use client';
import React, { useEffect, useState } from 'react';
import { Cours, Promotion } from '@prisma/client';
import { getAllPromo } from '@/components/utils/promotionUtils';
import {
    addOrUpdateInscription,
    deleteInscription,
    getInscriptionsByPromoId
} from '@/components/utils/inscriptionsUtils';
import { Button, Input, Label, Table } from 'reactstrap';
import { PresenceEtuCours } from '@/components/utils/customTypes';
import { getAllCoursByPromoId } from '@/components/utils/coursUtils';
import 'jspdf-autotable';
import NavBarAdmin from '@/components/navBarAdmin';
import { notifyFailure, notifySuccess } from '@/components/utils/toastUtils';
import { deleteAllEtu } from '@/components/utils/etuUtils';

import ExportPresenceTable from '@/components/exportPresenceTable';
import {fonctionRedirectHome, verifCookieAdmin, verifCookieInter} from "@/components/utils/connexionUtils";
import Cookies from "js-cookie";


export default function Page() {


    const [promos, setPromos] = useState<Promotion[]>([]);

    const [selectedPromoId, setSelectedPromoId] = useState<string>('');

    const [inscriptions, setInscriptions] = useState<PresenceEtuCours[]>([]);

    const [cours, setCours] = useState<Cours[]>([]);

    const [actualize, setActualize] = useState<boolean>(true);

    useEffect(() => {
        const cookie = Cookies.get('authAdmin');
        if(cookie === undefined) {
            alert('Erreur lors de la récupération du cookie');
            return
        }else{
            const cookie = Cookies.get('authAdmin');
            if(cookie === undefined) {
                alert('Erreur lors de la récupération du cookie');
                return
            }else{
                verifCookieAdmin(atob(cookie)).then((response) => {if(!response) {
                    Cookies.set('authAdmin', 'false');
                    fonctionRedirectHome().then();
                }});
            }

        }
        if (actualize) {
            getInscriptionsByPromoId(selectedPromoId).then((inscriptions) => {
                setInscriptions(inscriptions);
            });
            getAllCoursByPromoId(selectedPromoId).then((cours) => {
                setCours(cours);
            });
            setActualize(false);
        }
    }, [selectedPromoId, actualize]);

    useEffect(() => {
        getAllPromo().then((promos) => {
            setPromos(promos);
        });
    }, []);

    const handlePromo = (elem:  React.ChangeEvent<HTMLInputElement>) => {
        setSelectedPromoId(elem.target.value);
        setActualize(true);
    }

    const deleteAllStudents = () => {
        if (confirm("Etes-vous sûr de supprimer TOUS les étudiants enregistrés ? \nCela supprimera également toutes les inscriptions associées à ces étudiants. \nATTENTION cette action est irréversible !")) {
            deleteAllEtu().then(() => {
                setActualize(true);
                notifySuccess("Tous les étudiants et inscriptions associées ont bien été supprimés.");
            }).catch(() => notifyFailure("Erreur lors de la suppression des étudiants."))
        }
    }

    const changeInscription = (e: React.ChangeEvent<HTMLSelectElement>) => {
        let newPonctualite = e.target.value;
        // @ts-ignore
        const [coursId, etuId] = e.target.parentNode.id.split("-");

        switch (newPonctualite) {
            case "absent":
                deleteInscription(coursId, etuId).then(() => {
                    setActualize(true);
                    notifySuccess("L'étudiant a bien été mis absent");
                }).catch(() => notifyFailure("Erreur lors de la mise à jour de l'inscription."))
                break;

            case "retard":
                addOrUpdateInscription(coursId, etuId, "retard").then(() => {
                    setActualize(true);
                    notifySuccess(`L'étudiant a bien été mis en retard.`);
                }).catch(() => notifyFailure("Erreur lors de la mise à jour de l'inscription."))
                break;

            case "present":
                addOrUpdateInscription(coursId, etuId, "present").then(() => {
                    setActualize(true);
                    notifySuccess(`L'étudiant a bien été mis présent.`);
                }).catch(() => notifyFailure("Erreur lors de la mise à jour de l'inscription."))
                break;
        }
    }

    return (
        <section className={"flex flex-column min-h-screen"}>
            <NavBarAdmin presence={false}/>
            <section className={"p-4"}>
                <section>
                    <h3>Visualiser les présences</h3>
                    <div className={"flex flex-row items-center"}>
                        <div className={"basis-1/5 flex flex-row items-center"}>
                            <Label for={"promo"} className={"my-0 mr-2"}>Promotion </Label>
                            <Input id={"promo"} name={"promo_cours"} type={"select"} onChange={handlePromo}
                                   defaultValue={""} required>
                                <option disabled value={""}>Sélectionner une promo</option>
                                {promos.map((promo) => (
                                    <option value={promo.id} key={promo.id}>{promo.nom}</option>
                                ))}
                            </Input>
                        </div>
                        <div className={"basis-1/5 mx-3"}>
                            <ExportPresenceTable />
                        </div>
                        <div className={"basis-3/5 text-right"}>
                            <Button color={"danger"} onClick={deleteAllStudents}>Supprimer tous les étudiants</Button>
                        </div>
                    </div>
                </section>
                <hr />
                <section>
                    <Table id={"tab-activite"}>
                        <thead>
                        <tr>
                            <th>Cours</th>
                            {cours.map((cours) => (
                                <th className={'text-center'}
                                    key={cours.id}>{cours.dateDebut.toLocaleDateString('fr-FR')}</th>
                            ))}
                            <th className={"text-center"}>Total présence</th>
                        </tr>
                        </thead>
                        <tbody>
                        {inscriptions.map((inscription) => (
                            <tr key={inscription.etudiant.id}>
                                <th scope={"row"}>{inscription.etudiant.nom} {inscription.etudiant.prenom}</th>
                                {inscription.cours.map((presenceCours) => (
                                    <td className={"text-center"}
                                        key={presenceCours.cours.id + "-" + inscription.etudiant.id}
                                        id={presenceCours.cours.id + "-" + inscription.etudiant.id}>
                                        <select value={presenceCours.present} onChange={changeInscription}>
                                            <option value={"absent"}>Absent</option>
                                            <option value={"present"}>Présent</option>
                                            <option value={"retard"}>En retard</option>
                                        </select>
                                    </td>
                                ))}
                                <td className={"text-center"}>{inscription.total} / {cours.length}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </section>
            </section>
        </section>
    );
}