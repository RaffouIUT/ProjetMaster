'use server';
import { redirect, RedirectType } from 'next/navigation';
import { DOMParser } from '@xmldom/xmldom';
import { Cours } from '@prisma/client';
import { getEtuById } from '@/components/utils/etuUtils';
import { addInscription } from '@/components/utils/inscriptionsUtils';

export async function redirectToCas(idSeance: string, idToken: string) {
    redirect(`https://cas-test.univ-lemans.fr/cas/login?service=http://umbriel.univ-lemans.fr/etu/${idSeance}/${idToken}`,RedirectType.push)
}

export async function validateTicket(cours: Cours, idToken: string, ticket: string) {
    let uid: string = ""
    let dateAuth: string = ""
    await fetch(`https://cas-test.univ-lemans.fr/cas/serviceValidate?ticket=${ticket}&service=http://umbriel.univ-lemans.fr/etu/${cours.id}/${idToken}`, {
        method: "GET"
    })
        .then(r => r.text())
        .then(str => new DOMParser().parseFromString(str, "application/xml"))
        .then(data => {
            uid = "" + data.getElementsByTagName("cas:uid")[0]?.textContent;
            dateAuth = "" + data.getElementsByTagName("cas:authenticationDate")[0]?.textContent;
        });

    getEtuById(uid).then((etu) => {
        if (etu && etu.promotionId == cours.promotionId) {
            // On changera le present en fonction de l'heure
            addInscription(cours.id, etu.id, "present")
        }
    })

}