'use client'
import { getCoursById, getTokenById } from '@/components/utils/coursUtils';
import { useEffect, useState } from 'react';
import {redirectToCas, validateTicket} from "@/components/casLogin";
import {useSearchParams} from "next/navigation";
import { Cours, Etudiant } from '@prisma/client';
import { CoursVide, EtudiantVide } from '@/components/utils/customTypes';
import Image from 'next/image';
import { Spinner } from 'reactstrap';

export default function Page({ params }: {
    params: {id: string, token: string}
}) {
    const [validToken, setValidToken] = useState<boolean>(false);

    const [validTicket, setValidTicket] = useState<boolean>(false);

    const [cours, setCours] = useState<Cours>(structuredClone(CoursVide));

    const [etu, setEtu] = useState<Etudiant>(structuredClone(EtudiantVide));

    const useParams = useSearchParams();
    useEffect(() => {
        getCoursById(params.id).then((coursU) => {
            setCours(coursU)
            // Avant de regarder le token, le CAS et tout ça, on vérifie que la date du jour soit bien celle du cours
            if (coursU.dateDebut.getDate() == new Date().getDate()) {
                getTokenById(params.id).then((response) => {
                    if (response && response.tokenQrCode === params.token) {
                        setValidToken(true);
                        const paramTicket = useParams.get("ticket");
                        if (!paramTicket) {
                            redirectToCas(params.id, params.token).then();
                        } else {
                            validateTicket(coursU, params.token, paramTicket).then((etuU) => {
                                setValidTicket(true);
                                setEtu(etuU);
                            });
                        }
                    }
                });
            }
        })
    }, []);


    return (
        <section className={"px-3 py-10 text-center"}>
            {validToken ? (<div className={"h-100"}>
                <h2 className={"mb-5"}>Inscription au cours {cours.nom} du {cours.dateDebut.toLocaleDateString("fr-FR")}</h2>
                {validTicket ? (<>
                    <div className={'h-1/8 flex justify-center mb-5'}>
                        <Image src={'/valideInscription.png'} alt={'Image de validation d\'inscription'} width={0} height={0}
                               sizes="100vw" className={"w-auto h-100"}
                        />
                    </div>
                    <h3 className={'mb-4'}>{etu.nom} {etu.prenom}</h3>
                    <p>
                        Votre inscription au cours a bien été prise en compte
                        à {new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}. <br />
                        Vous recevrez un mail de confirmation sous peu, veuillez le conserver en cas de litige.
                    </p>
                </>) : (
                    <div>
                        <p>Redirection vers le CAS en cours ...</p>
                        <Spinner />
                    </div>
                )}
            </div>) : (
                <h2>Le lien a expiré ou n'est pas valide, veuillez réessayer.</h2>
            )}
        </section>
    );
}