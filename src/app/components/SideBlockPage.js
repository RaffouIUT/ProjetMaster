'use client'

import React, {useState} from 'react';
import styles from '../styles/SideBlockPage.module.css';
import AffIntervenants from "@/app/components/AffIntervenants";
import AjouterInterBlock from "@/app/components/AjouterInterBlock";
import SupprInterBlock from "@/app/components/SupprInterBlock";


const liste_inter = [
    { path: '/', label: 'Home' },
    { path: '/admin', label: 'Admin' },
];


const SideBlockPage = () => {
    const [isAjouterIntervenant, setIsAjouterIntervenant] = useState(false);

    const toggleVisibilityAjouter = () => {
        setIsAjouterIntervenant(!isAjouterIntervenant);
        setIsSupprIntervenant(false);
        setIsParametre(false);
    }

    const [isSupprIntervenant, setIsSupprIntervenant] = useState(false);

    const toggleVisibilitySupprimer = () => {
        setIsAjouterIntervenant(false);
        setIsSupprIntervenant(!isSupprIntervenant);
        setIsParametre(false);
    }

    const [isParametre, setIsParametre] = useState(false);

    const toggleVisibilityParametre = () => {
        setIsAjouterIntervenant(false);
        setIsSupprIntervenant(false);
        setIsParametre(!isParametre);
    }

    return (
        <div className={styles.root}>
            <div className={styles.LeftSideBlock}>
                <div className={styles.content}>
                    <p>
                        <button className={styles.button} onClick={toggleVisibilityAjouter} type="button">Ajouter un intervenant </button>
                    </p>
                    <p>
                        <button className={styles.button} onClick={toggleVisibilitySupprimer} type="button">Supprimer un intervenant </button>
                    </p>
                    <p>
                        <button className={styles.button} type="button">Gérer les données de présence</button>
                    </p>
                    <p>
                        <button className={styles.button} type="button">Paramètres</button>
                    </p>
                </div>
            </div>
            <div className={styles.RightSideBlock}>
                <div className={styles.content}>
                    <h1>Liste des intervenants</h1>
                    <AffIntervenants liste= {liste_inter}/>
                </div>
            </div>
            <div>
                {isAjouterIntervenant && <AjouterInterBlock />}
            </div>
            <div>
                {isSupprIntervenant && <SupprInterBlock />}
            </div>
        </div>
    );
};

export default SideBlockPage;