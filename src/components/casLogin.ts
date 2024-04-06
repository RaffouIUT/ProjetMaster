'use server';
import { redirect, RedirectType } from 'next/navigation';
import { DOMParser } from '@xmldom/xmldom';
import { Cours, Etudiant } from '@prisma/client';
import { getEtuById } from '@/components/utils/etuUtils';
import { addOrUpdateInscription } from '@/components/utils/inscriptionsUtils';
import { EtudiantVide } from '@/components/utils/customTypes';

export async function redirectToCas(idSeance: string, idToken: string) {
    redirect(`https://cas-test.univ-lemans.fr/cas/login?service=${process.env.SERVER_URL}/etu/${idSeance}/${idToken}`,RedirectType.push)
}

export async function validateTicket(cours: Cours, idToken: string, ticket: string) {
    let uid: string = ""
    let dateAuth: string = ""
    let etudiant: Etudiant = structuredClone(EtudiantVide);
    await fetch(`https://cas-test.univ-lemans.fr/cas/serviceValidate?ticket=${ticket}&service=${process.env.SERVER_URL}/etu/${cours.id}/${idToken}`, {
        method: "GET"
    })
        .then(r => r.text())
        .then(str => new DOMParser().parseFromString(str, "application/xml"))
        .then(data => {
            uid = "" + data.getElementsByTagName("cas:uid")[0]?.textContent;
            dateAuth = "" + data.getElementsByTagName("cas:authenticationDate")[0]?.textContent;
        });

    await getEtuById(uid).then((etu) => {
        // On regarde si l'étudiant est de la bonne promotion
        if (etu.promotionId == cours.promotionId) {
            // On changera le present en fonction de l'heure
            addOrUpdateInscription(cours.id, etu.id, "present")
            etudiant = etu;
        }
    })
    return etudiant
}