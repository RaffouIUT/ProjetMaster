'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { InterEtendu, InterEtenduVide } from '@/components/utils/customTypes';
import { getInterById } from '@/components/utils/interUtils';
import { ToastContainer } from 'react-toastify';
import Cookies from "js-cookie";
import {Button} from "reactstrap";
import {fonctionRedirectHome, verifCookieInter} from "@/components/utils/connexionUtils";
import {useRouter} from "next/navigation";

export default function Page() {

    const [intervenant, setIntervenant] = useState<InterEtendu>(structuredClone(InterEtenduVide));
    const router = useRouter();


    useEffect(() => {
        let intervenantId: string ='';
        const cookie = Cookies.get('authInter')
        if(cookie === undefined) {
            alert('Erreur lors de la récupération du cookie');
            return
        }else{
            verifCookieInter(cookie).then((response) => {if(!response) {
                Cookies.set('authAdmin', 'false');
                fonctionRedirectHome().then();
            }});
        }

        intervenantId = cookie.toString();
        console.log(intervenantId)

        getInterById(intervenantId).then((inter) => {
            setIntervenant(inter)
        })
    }, []);

    async function HandleDeconnexion() {
        Cookies.set('authInter', 'false');
        router.push('/');
        const serverUrl = process.env.SERVER_URL;
        if(serverUrl === undefined) {
            alert('Erreur lors de la redirection');
            return ;
        }else{
            await fonctionRedirectHome()
        }
    }

    return (
        <section className={"p-3"}>
            <ToastContainer />
            <div className={"flex"}>
                <div className={"basis-1/8"}></div>
                <h1 className={"text-center basis-3/4"}>Séléction Conférence</h1>
                <div className={"basis-1/8 flex flex-row align-items-center justify-center"} >
                    <Button onClick={HandleDeconnexion} color={"danger"} >Déconnexion</Button>
                </div>
            </div>
            <div className={"grid grid-cols-3"}>
                {intervenant.cours.map((cours => (
                    <div key={cours.id} className={'flex bg-gray-300 rounded-lg mx-4 my-4 justify-center justify-self-center text-center w-5/6 h-5/6 text-2xl'}>
                        <Link className={'w-full h-full hover:bg-primary-700 rounded-lg'}
                              href={"/inter/session/" + cours.id}>
                            <p className={"mb-0"}>{cours.nom} <br /> {intervenant.nom + ' ' + intervenant.prenom} <br /> {cours.dateDebut.toLocaleDateString("fr-FR")}
                                <br />
                                {cours.dateDebut.toLocaleTimeString("fr-FR", {hour: "2-digit", minute: "2-digit", timeZone: "UTC"})
                                    + ' - ' +
                                 cours.dateFin.toLocaleTimeString("fr-FR", {hour: "2-digit", minute: "2-digit", timeZone: "UTC"})}
                            </p>
                        </Link>
                    </div>
                )))}
            </div>
        </section>
    );
}