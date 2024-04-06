'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { InterEtendu, InterEtenduVide } from '@/components/utils/customTypes';
import { getInterById } from '@/components/utils/interUtils';
import { ToastContainer } from 'react-toastify';
import Cookies from "js-cookie";

export default function Page() {

    const [intervenant, setIntervenant] = useState<InterEtendu>(structuredClone(InterEtenduVide));



    useEffect(() => {
        let intervenantId: string ='';
        const cookie = Cookies.get('authInter')
        if(cookie === undefined || cookie === '') {
            alert('Vous n\'êtes pas connecté');
        }else{
            intervenantId = cookie.toString();
            console.log(intervenantId)
        }
        getInterById(intervenantId).then((inter) => {
            setIntervenant(inter)
        })
    }, []);

    return (
        <section className={"p-3"}>
            <ToastContainer />
            <h1 className={"text-center"}>Séléction Conférence</h1>
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