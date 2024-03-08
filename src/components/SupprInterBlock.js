'use client'
import React, { useEffect } from 'react';
import styles from '../app/styles/AjouterInterBlock.module.css';
import {generateInterListe, getListeNoms, handleSuppression} from "@/components/bddIntervenant";
import {useState} from "react";
import db from "@/modules/db";
import Button from "src/components/Button";

const SupprInterBlock = () => {
    const [intervenants, setIntervenants] = useState([]);

    useEffect(() => {
        console.log('montage useeffect');
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
        console.log('Je clique');
        const selectIntervenant = document.getElementById('choixIntervenant');
        console.log('checkpoint 1');
        if (selectIntervenant instanceof HTMLSelectElement) {
            console.log('checkpoint 2');
            const nomIntervenant = selectIntervenant.value;
            console.log('checkpoint 3 '+nomIntervenant);
            await handleSuppression(nomIntervenant);
        }
        console.log('Traitement terminé');
        // Mettez à jour la liste des intervenants après la suppression
        const updatedIntervenants = await getListeNoms();
        setIntervenants(updatedIntervenants);
    };

    useEffect(() => {
        const selectIntervenant = document.getElementById('choixIntervenant');

        // Effacer la liste déroulante avant d'ajouter les nouvelles options
        selectIntervenant.innerHTML = '';

        intervenants.forEach(intervenant => {
            // Remplacer le point par un espace dans le nom
            const nomAvecEspace = intervenant.replace('.', ' ');

            const option = document.createElement('option');
            option.value = nomAvecEspace.toLowerCase();
            option.text = nomAvecEspace;
            selectIntervenant.add(option);
        });
    }, [intervenants, setIntervenants]);

    return (
        <div className={styles.MiddleSideBlock}>
            <div className={styles.element}>
                <label htmlFor="choixIntervenant">Choisissez un intervenant à supprimer :</label>
                <div>
                    <select className={styles.bar} id="choixIntervenant" name="choixIntervenant"></select>
                </div>
                <div className={styles.button}>
                    <Button onClick={handleValiderClick}>Valider</Button>
                </div>
            </div>
        </div>
    );
};


export default SupprInterBlock;