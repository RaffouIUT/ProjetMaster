'use client'

import React, {useState} from 'react';
import styles from '../app/styles/SideBlockPage.module.css';
import AffIntervenants from "src/components/AffIntervenants";
import AjouterInterBlock from "src/components/AjouterInterBlock";
import SupprInterBlock from "src/components/SupprInterBlock";
import Button from "src/components/Button";
import {generateInterListe} from "src/components/bddIntervenant";


const liste_inter = [
    { path: '/', label: 'Home' },
    { path: '/admin', label: 'Admin' },
];


const liste_inter_bdd = []

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
                        <Button className={styles.button} onClick={generateInterListe}>Gérer les séances</Button>
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