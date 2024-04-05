'use client';
import { ChangeEvent, SetStateAction, useEffect, useState } from 'react';
import { Cours, Etudiant } from '@prisma/client';
import { addInscription, getInscriptionsByCours } from '@/components/utils/inscriptionsUtils';
import { getCoursById } from '@/components/utils/coursUtils';
import { CoursVide } from '@/components/utils/customTypes';
import { ToastContainer } from 'react-toastify';
import { notifySuccess } from '@/components/utils/toastUtils';
import QrCode from '@/components/qrCode';

export default function Page({ params }: {
    params: { id: string }
}) {
    const [actualizeEtuNonPresents, setActualize] = useState<boolean>(true);

    const [options, setOption] = useState<boolean>(false)
    const [recherche, setRecherche] = useState<boolean>(false)
    const [nom_recherche, setNom_recherche] = useState('');
    const [TempsMaxQR, setTempsMaxQR] = useState(12);


    const [cours, setCours] = useState<Cours>(structuredClone(CoursVide))

    const [etusPresents, setEtusPresents] = useState<Etudiant[]>([]);
    const [etusNonPresents, setEtusNonPresents] = useState<Etudiant[]>([]);

    useEffect(() => {
        getCoursById(params.id).then(coursBD => setCours(coursBD))
    }, []);

    useEffect(() => {
        getInscriptionsByCours(cours).then((inscriptions) => {
            let presentsTmp: Etudiant[] = []
            let nonPresentsTmp: Etudiant[] = []
            inscriptions.map((inscription) =>  {
                if (inscription.present == "absent") {
                    nonPresentsTmp.push(inscription.etudiant);
                } else {
                    presentsTmp.push(inscription.etudiant);
                }
            })
            setEtusPresents(presentsTmp);
            setEtusNonPresents(nonPresentsTmp);
        })
    }, [cours, actualizeEtuNonPresents]);

    const handleBuffTempsMaxQR = (event: ChangeEvent<HTMLInputElement>) => {
        setTempsMaxQR(parseInt(event.target.value));
    }

    const ajouterEtudiant = (idEtu: string) => {
        addInscription(cours.id, idEtu, "present").then(() => {
            notifySuccess("L'étudiant a bien été inscrit.");
            setActualize(true)
        })
    }

    function actualiserListeMatch(){
        let listeEtuMatch: Etudiant[] = [];
        // on actualise la liste des étudiants qui matchent avec la recherche de l'intervenant
        etusNonPresents.map((etu) => {
            if ((etu.nom+" "+etu.prenom).match(nom_recherche)) {
                listeEtuMatch.push(etu);
            }
        })
        return listeEtuMatch;
    }

    const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setNom_recherche(event.target.value);
    };

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

    return (
        <section className={"flex flex-row w-screen h-screen p-3"}>
            <ToastContainer />
            {/* Menu latéral gauche, boutons d'actions */}
            <div className={"basis-1/4"}>
                <div className={'h-1/6 flex items-center ml-5'}>
                    <button onClick={afficherRecherche}
                            className="flex text-black hover:bg-primary-700 rounded-lg text-xl px-5 py-2.5 text-center bg-gray-300 leading-tight tracking-tight">Ajouter étudiant
                    </button>
                    <button onClick={afficherOptions}
                            className="ml-5  flex text-black hover:bg-primary-700 rounded-lg text-xl px-5 py-2.5 text-center bg-gray-300  leading-tight tracking-tight">⚙️
                    </button>
                </div>
                {
                    options ? (
                        <div className={'flex flex-col m-4 bg-gray-500 text-center'}>

                            <div>Paramètres</div>
                                <div className={"mt-2 bg-gray-400"}>Temps Qr Code</div>
                                <div className={"flex flex-cols justify-center space-x-2"}>
                                    <input onChange={handleBuffTempsMaxQR} type="range" id="volume" name="volume" min="2" max="20" value={TempsMaxQR}/>
                                    <p>{TempsMaxQR} sec</p>
                                </div>

                            </div>
                        ) :
                        recherche ? (
                            <div className={"flex flex-col items-center m-4 bg-gray-300 "}>
                                <input onChange={handleChange} type="text" id="recherche" name="recherche" size={50}
                                       className="flex border mx-4 my-4 border-black text-white-900 text-sm rounded-lg focus:ring-black focus:border-black-500 w-1/2 p-2.5"/>
                                <div className={'text-center overflow-scroll max-h-96'}>
                                    {actualiserListeMatch().map((etu) => (
                                      <button key={etu.id}
                                              type="button"
                                              onClick={() => ajouterEtudiant(etu.id)}>{etu.nom + ' ' + etu.prenom}</button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className={"m-4"}></div>
                        )
                }
            </div>

            {/* Partie centrale, QR CODE*/}
            <QrCode tempsMaxQr={TempsMaxQR} coursId={cours.id} />

            {/* Partie droite, liste des étudiants */}
            <div className={"basis-1/4 bg-gray-400"}>
                <h2 className={"text-center m-2"}>Etudiants Inscrits</h2>
                <ul className={"h-5/6 overflow-scroll max-h-full"}>
                    {etusPresents.map((etu) => (
                        <li key={etu.id}>{etu.nom + ' ' + etu.prenom}</li>
                    ))}
                </ul>
            </div>
        </section>
    );
}