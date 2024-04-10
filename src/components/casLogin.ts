'use server';
import { redirect, RedirectType } from 'next/navigation';
import { DOMParser } from '@xmldom/xmldom';
import { Cours, Etudiant } from '@prisma/client';
import { addOrChangeEtu, getEtuById } from '@/components/utils/etuUtils';
import { addOrUpdateInscription } from '@/components/utils/inscriptionsUtils';
import { EtudiantVide } from '@/components/utils/customTypes';
import { sendEmail } from '@/components/utils/interUtils';

export async function redirectToCas(idSeance: string, idToken: string) {
    redirect(`https://cas-test.univ-lemans.fr/cas/login?service=${process.env.SERVER_URL}/etu/${idSeance}/${idToken}`,RedirectType.push)
}

export async function validateTicket(cours: Cours, idToken: string, ticket: string) {
    let dateAuth: string = "";
    let mail: string = "";
    let etudiant: Etudiant = structuredClone(EtudiantVide);
    await fetch(`https://cas-test.univ-lemans.fr/cas/serviceValidate?ticket=${ticket}&service=${process.env.SERVER_URL}/etu/${cours.id}/${idToken}`, {
        method: "GET"
    })
        .then(r => r.text())
        .then(str => new DOMParser().parseFromString(str, "application/xml"))
        .then(data => {
            etudiant.id = "" + data.getElementsByTagName("cas:uid")[0]?.textContent;
            etudiant.nom = "" + data.getElementsByTagName("cas:Sn")[0]?.textContent;
            etudiant.prenom = "" + data.getElementsByTagName("cas:givenName")[0]?.textContent;
            dateAuth = "" + data.getElementsByTagName("cas:authenticationDate")[0]?.textContent;
            mail = "" + data.getElementsByTagName("cas:mail")[0]?.textContent;
        });

    const etuFromBD: Etudiant = await getEtuById(etudiant.id)

    if (!etuFromBD.id) {
        // Puisqu'on ne récupère pas la promotion, si c'est un nouvel étudiant,
        // alors on lui affecte la promotion du cours auquel il veut s'inscrire
        etudiant.promotionId = cours.promotionId
        await addOrChangeEtu(etudiant);
    }

    // Le "present" est à modifier suivant l'heure d'inscription
    await addOrUpdateInscription(cours.id, etudiant.id, "present")

    // On envoie le mail pour confirmer
    if (mail) {
        await sendEmail({
            subject: `Inscription au cours de ${cours.nom}`,
            text: `Votre présence au cours de ${cours.nom} du ${cours.dateDebut.toLocaleDateString("fr-FR")} a bien été enregistrée à ${new Date(dateAuth).toLocaleTimeString("fr-FR", { hour: '2-digit', minute: '2-digit' })}`,
            to: mail
        })
    } else {
        console.log("Impossible d'envoyer le mail.")
    }

    return etudiant
}