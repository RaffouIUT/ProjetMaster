'use client'
import ListeNom from "@/components/listenom";
import {useQRCode} from "next-qrcode";
import {SetStateAction, useState} from "react";

export default function Page() {
    const {SVG} = useQRCode();
    const [options, setOption] = useState<boolean>(false)
    const [recherche, setRecherche] = useState<boolean>(false)
    const [code, setCode] = useState<boolean>(false)
    const [nom_recherche, setNom_recherche] = useState('');
    const listeEtu: string[] = [];
    const listeEtuMatch: string[] = [];


    {/*TODO à changer pour chercher les etudiants dans la bdd */}
    for (let i = 0; i < 60; i++) {
        listeEtu.push("Nom" + i + " Prenom" + i);
    }

    const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setNom_recherche(event.target.value);
    };

    {/*TODO actu liste etu avec ceux qui match la recherche */}
    listeEtu.map((etu) => {
        if (etu.match(nom_recherche)) {
            listeEtuMatch.push(etu);
        }
    })

    const afficherCode = () => {
        setCode(!code);
    }


    const afficherRecherche = () => {
        if (options) {
            setOption(false);
        }
        setRecherche(!recherche)
    }

    const afficherOptions = () => {
        if (recherche) {
            setRecherche(false);
        }
        setOption(!options);
    }

    const fermerOptions = () => {
        setOption(false);
    }

    const fermerRecherche = () => {
        setRecherche(false);
    }

    return (
        <body className={"flex flex-row h-screen text-4xl"}>

            {/* Menu latéral gauche, boutons d'actions */}
            <div className={"w-1/4 max-h-screen"}>
                <div className={"h-1/6 flex items-center ml-5"}>
                    <button onClick={afficherRecherche} className="flex text-black hover:bg-primary-700 rounded-lg text-xl px-5 py-2.5 text-center bg-gray-300 leading-tight tracking-tight">Ajouter étudiant </button>
                    <button className="ml-5 flex text-black hover:bg-primary-700 rounded-lg text-xl px-5 py-2.5 text-center bg-gray-300  leading-tight tracking-tight">?</button>
                </div>
                {
                    options ? (
                        <div className={"m-4 bg-gray-500"}> PAGE OPTIONS</div>
                    ) :
                        recherche ? (
                            <div className={"flex flex-col items-center m-4 bg-gray-300 "}>
                                <input onChange={handleChange} type="text" id="recherche" name="recherche" size={50} className="flex border mx-4 my-4 border-black text-white-900 text-sm rounded-lg focus:ring-black focus:border-black-500 w-1/2 p-2.5"/>
                                <div className={"text-center overflow-hidden max-h-96 space-y-0.5"}><ListeNom listeNom={listeEtuMatch}/></div>
                            </div>
                        ) : (
                            <div className={"m-4"}></div>
                        )
                }
            </div>

            {/* Partie centrale, QR CODE*/}
            <div className={"w-1/2"}>
                {/* 3 boutons centraux */}
                <div className={"h-1/6 items-center flex flex-row justify-center"}>
                    <button onClick={afficherOptions} className="ml-5  flex text-black hover:bg-primary-700 rounded-lg text-xl px-5 py-2.5 text-center bg-gray-300  leading-tight tracking-tight">⚙️</button>
                    <button onClick={afficherCode} className="ml-5 flex text-black hover:bg-primary-700 rounded-lg text-xl px-5 py-2.5 text-center bg-gray-300  leading-tight tracking-tight">Afficher code</button>
                    <button className="ml-5 mr-5 flex text-black hover:bg-primary-700 rounded-lg text-xl px-5 py-2.5 text-center bg-gray-300  leading-tight tracking-tight">?</button>
                </div>
                {/* barre de chargement */}
                <div className={" flex flex-row justify-center"}>
                    <div className={"mt-4 w-5/6 h-1/6 bg-gray-500 text-center"}> BARRE DE CHARGEMENT</div>
                </div>
                {/* QR CODE */}
                <div className={"flex justify-center mt-4"}>
                    <SVG
                        text={'http://localhost:3000/inter/session'}
                        options={{
                            errorCorrectionLevel: 'M',
                            margin: 0,
                            scale: 0,
                            width: 620,
                            color: {
                                dark: '#000000',
                                light: '#ffffff',
                            },
                        }}
                    />
                </div>
                {
                    code ? (
                        <div className={"flex text-xl text-center justify-center"}>Code et lien pour s’inscrire :<br/>
                            https://inscription-cours.univ-lemans.fr<br/>
                            256318342
                        </div>
                    ) : (
                        <div className={"flex text-xl text-center justify-center"}>Veuillez cliquer sur le boutton pour afficher le code</div>
                    )
                }
            </div>

            {/* Partie droite, liste des étudiants */}
            <div className={"w-1/4 bg-gray-400"}>
                <div className={"h-1/6 items-center flex flex-row justify-center"}>LISTE NOMS ETU</div>
                <div className={"h-5/6 text-center max-h-full overflow-scroll "}><ListeNom listeNom={listeEtu}/></div>
            </div>
        </body>
    );
}