'use client';
import React, { useEffect, useState } from 'react';
import styles from '../app/styles/AjouterInterBlock.module.css';
import { getListeNoms, handleSuppression } from '@/components/bddIntervenant';
import {UEProckerSwitch , UEProcker} from "@/components/AffIntervenants";

const SupprInterBlock = () => {
    const [intervenants, setIntervenants] = useState([]);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const listeIntervenants = await getListeNoms();
                if (isMounted) {
                    setIntervenants(listeIntervenants);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des intervenants:', error);
            }
        };

        fetchData().then();

        return () => {
            isMounted = false;
        };
    }, []);


    const handleValiderClick = async () => {
        const selectIntervenant = document.getElementById('choixIntervenant');
        if (selectIntervenant instanceof HTMLSelectElement) {
            const nomIntervenant = selectIntervenant.value;
            await handleSuppression(nomIntervenant);
        }
        // Mettez à jour la liste des intervenants après la suppression
        const updatedIntervenants = await getListeNoms();
        setIntervenants(updatedIntervenants);
        console.log(UEProcker);
        UEProckerSwitch();
        console.log(UEProcker);
    };


    useEffect(() => {
        console.log("test");
        const selectIntervenant = document.getElementById('choixIntervenant');

        // Effacer la liste déroulante avant d'ajouter les nouvelles options
        selectIntervenant.innerHTML = '';

        intervenants.forEach(intervenant => {
            // Remplacer le point par un espace dans le nom
            const nomAvecEspace = intervenant.replace('.', ' ');

            const option = document.createElement('option');
            option.value = nomAvecEspace;
            option.text = nomAvecEspace;
            selectIntervenant.add(option);
        });
    }, [intervenants]);

    return (
        <div className={styles.MiddleSideBlock}>
            <div className={styles.element}>
                <label htmlFor="choixIntervenant">Choisissez un intervenant à supprimer :</label>
                <div>
                    <select className={styles.bar} id="choixIntervenant" name="choixIntervenant"></select>
                </div>
                <div className={styles.button}>
                    <button onClick={handleValiderClick} type="button">Valider</button>
                </div>
            </div>
        </div>
    );
};


export default SupprInterBlock;