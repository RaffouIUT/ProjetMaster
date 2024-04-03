'use client';
import React from 'react';
import styles from '../app/styles/AjouterInterBlock.module.css';
import { InterReduit } from '@/components/utils/customTypes';
import { deleteInter } from '@/components/utils/interUtils';
import { notifyFailure, notifySuccess } from '@/components/utils/toastUtils';
import { ToastContainer } from 'react-toastify';

interface Props {
    intervenants: InterReduit[]
}

export default function SupprInterBlock({ intervenants }: Props) {

    const handleValiderClick = async () => {
        const selectIntervenant = document.getElementById('choixIntervenant');
        if (selectIntervenant instanceof HTMLSelectElement) {
            deleteInter(selectIntervenant.value).then(() => {
                notifySuccess("L'intervenant a bien été supprimé.")
            }).catch(() => notifyFailure("Erreur lors de la suppression BD de l'intervenant. \n Vérifiez qu'il n'a plus de cours associé."));
        }
    };

    return (
        <div className={styles.MiddleSideBlock}>
            <ToastContainer />
            <div className={styles.element}>
                <label htmlFor="choixIntervenant">Choisissez un intervenant à supprimer :</label>
                <div>
                    <select className={styles.bar} id="choixIntervenant" name="choixIntervenant">
                        {intervenants.map((inter) =>(
                            <option key={inter.id} value={inter.id}>{inter.nom} {inter.prenom}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.button}>
                    <button onClick={handleValiderClick} type="button">Valider</button>
                </div>
            </div>
        </div>
    );
};