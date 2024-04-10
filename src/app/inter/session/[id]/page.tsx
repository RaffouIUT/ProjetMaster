'use client';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Cours, Etudiant } from '@prisma/client';
import { addOrUpdateInscription, getInscriptionsByCours } from '@/components/utils/inscriptionsUtils';
import { getCoursById, setTokenById } from '@/components/utils/coursUtils';
import { CoursVide } from '@/components/utils/customTypes';
import { ToastContainer } from 'react-toastify';
import { notifySuccess } from '@/components/utils/toastUtils';
import QrCode from '@/components/qrCode';
import { Button, Card, CardBody, CardHeader, Input } from 'reactstrap';
import { TbHelp } from 'react-icons/tb';

import '@/components/custom.css';
import { GoArrowLeft } from 'react-icons/go';

export default function Page({ params }: {
    params: { id: string }
}) {
    const [actualizeEtuNonPresents, setActualize] = useState<boolean>(false);

    const [options, setOption] = useState<boolean>(false)
    const [recherche, setRecherche] = useState<boolean>(false)
    const [TempsMaxQR, setTempsMaxQR] = useState(12);


    const [cours, setCours] = useState<Cours>(structuredClone(CoursVide))

    const [etusPresents, setEtusPresents] = useState<Etudiant[]>([]);
    const [etusNonPresents, setEtusNonPresents] = useState<Etudiant[]>([]);

    useEffect(() => {
        getCoursById(params.id).then(coursBD => setCours(coursBD))

        function beforeUnload(e: BeforeUnloadEvent) {
            setTokenById(params.id, "");
        }

        window.addEventListener('beforeunload', beforeUnload);

        return () => {
            window.removeEventListener('beforeunload', beforeUnload);
        };
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

    const ajouterEtudiant = () => {
        const select = document.getElementById("select_etu")
        let idEtu = "";
        if (select && select instanceof HTMLSelectElement) { idEtu = select.value }
        if (idEtu != "")
            addOrUpdateInscription(cours.id, idEtu, "present").then(() => {
                notifySuccess("L'étudiant a bien été inscrit.");
                setActualize(!actualizeEtuNonPresents)
            })
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

    return (
        <section className={"flex flex-row w-screen h-screen"}>
            <ToastContainer />
            {/* Menu latéral gauche, boutons d'actions */}
            <div className={"basis-1/4 p-3"}>
                <div className={"flex flex-column"}>
                    <li className={"list-none mb-4 ml-2"}><a href={"/inter"} className={"flex flex-row align-items-center"}><GoArrowLeft /> &nbsp; <span className={"underline underline-offset-4"}>Revenir à la sélection des conférences</span></a></li>
                    <div className={'flex items-center justify-around mb-3'}>
                        <div className={"flex flex-row"}>
                            <Button onClick={afficherRecherche} className={'mr-3'}>Ajouter étudiant</Button>
                            <span className={'align-content-center'}>
                                <TbHelp className={'cursor-help'}
                                        title={"Si certains étudiants n'arrivent pas à scanner le QR code ni à accéder au lien, vous pouvez les ajouter manuellement \n" +
                                            "S'ils sont dans la promo qui assiste au cours, ils devraient être dans la liste."} />
                            </span>
                        </div>
                        <div className={"flex flex-row"}>
                            <Button onClick={afficherOptions} className={'mr-3'}>⚙️</Button>
                            <span className={'align-content-center'}>
                                <TbHelp className={'cursor-help'}
                                        title={"Si le temps pour scanner le QR code et s'inscrire, vous pouvez augmenter le temps avant qu'il ne change."} />
                            </span>
                        </div>
                    </div>
                </div>
                {options ? (<>
                    <Card className="my-2" color="secondary" inverse>
                        <CardHeader>Changer le temps du QR code</CardHeader>
                        <CardBody className={'flex flex-row align-items-center'}>
                        <input className={"basis-3/4 mr-1"} onChange={handleBuffTempsMaxQR} type="range" id="volume" name="volume"
                                   min="2" max="20" value={TempsMaxQR} />
                            <label htmlFor={'volume'} className={"basis-1/4 text-right"}>{TempsMaxQR} sec</label>
                        </CardBody>
                    </Card>
                </>) : recherche ? (<>
                        <Card className="my-2" color="secondary" inverse>
                            <CardHeader>Ajouter un étudiant</CardHeader>
                            <CardBody className={"flex flex-row"}>
                                <Input className={"mr-3"} id={'select_etu'} name={'select_etu'} type={'select'}
                                       defaultValue={""} required>
                                    <option disabled value={''}>Sélectionner un étudiant</option>
                                    {etusNonPresents.map((etu) => (
                                        <option value={etu.id} key={etu.id}>{etu.nom} {etu.prenom}</option>
                                    ))}
                                </Input>
                                <Button onClick={ajouterEtudiant} color={"primary"}>Ajouter</Button>
                            </CardBody>
                        </Card>
                    </>) : ""
                }
            </div>

            {/* Partie centrale, QR CODE*/}
            <section className={'basis-1/2 flex flex-column py-3'}>
                <div className={"text-center mb-4"}>
                    <h2 className={"m-0"}>Module {cours.nom}</h2>
                </div>
                <QrCode tempsMaxQr={TempsMaxQR} coursId={cours.id} setActualize={setActualize} actualize={actualizeEtuNonPresents}/>
            </section>

            {/* Partie droite, liste des étudiants */}
            <div className={"basis-1/4 flex flex-column col-droite-session p-3"}>
                <h1 className={"text-center mb-4"}>Etudiants Inscrits</h1>
                <ul className={"overflow-y-scroll h-fit flex-1"}>
                    {etusPresents.map((etu) => (
                        <li className={"text-2xl"} key={etu.id}>{etu.nom + ' ' + etu.prenom}</li>
                    ))}
                </ul>
            </div>
        </section>
    );
}