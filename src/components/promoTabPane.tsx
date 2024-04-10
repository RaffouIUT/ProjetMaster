import React, { useState } from 'react';
import { notifyFailure, notifySuccess } from '@/components/utils/toastUtils';
import { Button, Input, Label, Table } from 'reactstrap';
import { checkField } from '@/components/utils/calendarUtils';
import { addPromo, deletePromo } from '@/components/utils/promotionUtils';
import { Promotion } from '@prisma/client';
import { PromotionVide } from '@/components/utils/customTypes';
import { TbHelp } from 'react-icons/tb';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
    promos: Promotion[],
    refreshPromos: any,
}

export default function PromoTabPane({ promos, refreshPromos }: Props) {

    const [idSelected, setIdSelected] = useState<string>("");

    const [nom, setNom] = useState<string>("");

    const [abreviation, setAbreviation] = useState<string>("");

    const ajouterPromo = async () => {
        // Vérification du format du nom et de l'abréviation
        if (checkField(nom) && checkField(abreviation)) {

            // Ajout dans la base de données
            addPromo({id: idSelected, nom: nom, abreviation: abreviation}).then(() => {
                notifySuccess(`La promotion ${nom} ${abreviation} a bien été modifié`)
                fillPromo(structuredClone(PromotionVide))
                refreshPromos();
            }).catch(() => notifyFailure("Erreur lors de l'insertion BD de la promotion, vérifier que le nom et l'abréviation n'existent pas déjà !"));
        } else {
            notifyFailure("Erreur de saisie dans le formulaire")
        }
    };

    const supprimerPromo = (idPromo: string) => {
        deletePromo(idPromo).then(() => {
            notifySuccess("La promotion a bien été supprimée.");
            refreshPromos();
        }).catch(() => notifyFailure("Erreur lors de la suppression de la promotion."))
    }

    const fillPromo = (promo: Promotion) => {
        setIdSelected(promo.id);
        setNom(promo.nom);
        setAbreviation(promo.abreviation);
    }

    return (
        <section className={"mb-4"}>
            <ToastContainer />
            <h3>Ajouter une Promotion</h3>
            <div className={"flex flex-row mb-5"}>
                <div className={"flex flex-column mr-4 basis-1/4"}>
                    <Label for={'nomPromo'}>Nom de la promotion</Label>
                    <Input type="text" id="nomPromo" name="nomPromo" value={nom}
                           onChange={(e) => setNom(e.target.value)}
                           placeholder={"BUT CHIMIE 1"} />
                </div>
                <div className={"flex flex-column mr-4 basis-1/4"}>
                    <Label for={'abreviationPromo'}>Abréviation de la promotion</Label>
                    <Input type="text" id={"abreviationPromo"} name="abreviationPromo" value={abreviation}
                           onChange={(e) => setAbreviation(e.target.value)}
                           placeholder={"BC1"} />
                </div>
                <div className={"align-content-end"}>
                    <Button color={"primary"} onClick={ajouterPromo} type="button">{idSelected ? "Modifier" : "Ajouter"}</Button>
                </div>
            </div>
            <Table id={"tab-promos"}>
                <thead>
                <tr>
                    <th className={'flex'}>
                        <button onClick={() => fillPromo(structuredClone(PromotionVide))}>Nom</button>
                        &nbsp;
                        <span className={'align-content-center'}>
                            <TbHelp className={'cursor-help'}
                                    title={'Cliquer sur le nom d\'une promotion pour la modifier. Cliquer sur l\'en-tête de la colonne pour vider le formulaire.'} />
                        </span>
                    </th>
                    <th>Abréviation</th>
                    <th>Supprimer la promotion</th>
                </tr>
                </thead>
                <tbody>
                {promos.map((promo) => (
                    <tr id={promo.id} key={promo.id} className={'align-middle'}>
                        <td>
                            <button onClick={() => fillPromo(promo)}>{promo.nom}</button></td>
                        <td>{promo.abreviation}</td>
                        <td>
                            <Button onClick={() => supprimerPromo(promo.id)} size={"sm"} color={"danger"} >Supprimer</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </section>
        );
};