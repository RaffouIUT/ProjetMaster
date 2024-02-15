'use client'
import React from 'react';
import styles from '../styles/AjouterInterBlock.module.css';




const AjouterInterBlock = () => {
    const inter = "l'intervenant";

    return (
        <div className={styles.MiddleSideBlock}>

                <div className={styles.element}>
                    <div>
                        Nom de {inter}
                    </div>
                    <div className={styles.bar}>
                        <input type="text" id="textInput" name="textInput"/>
                    </div>
                    <div>
                        Prénom de {inter}
                    </div>
                    <div className={styles.bar}>
                        <input type="text" id="textInput" name="textInput"/>
                    </div>
                    <div>
                        Mail de {inter}
                    </div>
                    <div className={styles.bar}>
                        <input type="text" id="textInput" name="textInput"/>
                    </div>
                    <div className={styles.button}>
                        <button type="button">Valider</button>
                    </div>
                </div>
        </div>
    );
};

export default AjouterInterBlock;