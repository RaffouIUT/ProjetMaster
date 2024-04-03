'use client';
import AjouterInterBlock from '@/components/AjouterInterBlock';
import React, { useEffect, useState } from 'react';
import styles from '@/app/styles/SideBlockPage.module.css';
import Link from 'next/link';
import SupprInterBlock from '@/components/SupprInterBlock';
import { InterReduit } from '@/components/utils/customTypes';
import { getAllInter } from '@/components/utils/interUtils';


export default function Page() {

    const [isAjouterIntervenant, setIsAjouterIntervenant] = useState(true);

    const toggleVisibilityAjouter = () => {
        setIsAjouterIntervenant(!isAjouterIntervenant);
        setIsSupprIntervenant(false);
    }

    useEffect(() => {
        getAllInter().then((inters) => setIntervenants(inters));
    }, []);

    const [intervenants, setIntervenants] = useState<InterReduit[]>([]);

    const [isSupprIntervenant, setIsSupprIntervenant] = useState(false);

    const toggleVisibilitySupprimer = () => {
        setIsAjouterIntervenant(false);
        setIsSupprIntervenant(!isSupprIntervenant);
    }

    return (
        <section className="flex flex-column min-h-screen">
            <div className={styles.root}>
                <div className={styles.LeftSideBlock}>
                <div className={styles.content}>
                    <button className={styles.button} onClick={toggleVisibilityAjouter} type="button">Ajouter un
                        intervenant
                    </button>
                    <button className={styles.button} onClick={toggleVisibilitySupprimer}
                            type="button">Supprimer un intervenant
                    </button>
                    <Link href={'http://localhost:3000/admin/presence'}>
                        <button className={styles.button} type="button">Gérer les données de présence</button>
                    </Link>
                    <Link href={'http://localhost:3000/admin/seance'}>
                        <button className={styles.button} type="button">Gérer les séances</button>
                    </Link>
                    <button className={styles.button} type={'button'}>Déconnexion</button>
                </div>
                </div>
                <div className={styles.RightSideBlock}>
                    <div className={styles.content}>
                        <h1>Liste des intervenants</h1>
                        {intervenants.map((inter) => (
                            <li key={inter.id}>{inter.nom} {inter.prenom}</li>
                        ))}
                    </div>
                </div>
                <div>
                    {isAjouterIntervenant && <AjouterInterBlock />}
                </div>
                <div>
                    {isSupprIntervenant && <SupprInterBlock intervenants={intervenants} />}
                </div>
            </div>
        </section>
    );
};
