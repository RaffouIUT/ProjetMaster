'use client'
import React, { useEffect } from 'react';
import styles from '../app/styles/AjouterInterBlock.module.css';



const SupprInterBlock = () => {
    useEffect(() => {
        const listeIntervenant = ['Pomme', 'Banane', 'Orange', 'Fraise'];

        // Sélection de l'élément de liste déroulante
        const selectIntervenant = document.getElementById('choixIntervenant');

        // Ajout des options dynamiquement
        listeIntervenant.forEach(intervenant => {
            const option = document.createElement('option');
            option.value = intervenant.toLowerCase(); // Vous pouvez utiliser la version en minuscules comme valeur
            option.text = intervenant;
            selectIntervenant.add(option);
        });
    }, []);

    return (
        <div className={styles.MiddleSideBlock}>

            <div className={styles.element}>
                <label htmlFor="choixIntervenant">Choisissez un intervenant à supprimer :</label>
                <div>
                    <select className={styles.bar} id="choixIntervenant" name="choixIntervenant"></select>
                </div>
                <script>

                </script>
                <div className={styles.button}>
                    <button type="button">Valider</button>
                </div>
            </div>
        </div>
    );

};



export default SupprInterBlock;