'use server';
import { redirect, RedirectType } from 'next/navigation';
import { DOMParser } from '@xmldom/xmldom';

export async function redirectToCas(idSeance: string, idToken: string) {
    redirect(`https://cas-test.univ-lemans.fr/cas/login?service=http://umbriel.univ-lemans.fr/etu/${idSeance}/${idToken}`,RedirectType.push)
}

export async function validateTicket(idSeance: string, idToken: string, ticket: string) {
    await fetch(`https://cas-test.univ-lemans.fr/cas/serviceValidate?ticket=${ticket}&service=http://umbriel.univ-lemans.fr/etu/${idSeance}/${idToken}`, {
        method: "GET"
    })
        .then(r => r.text())
        .then(str => new DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            // le "17" correspond à l'UID, il faudra regarder manuellement pour les autres infos
            // @ts-ignore
            console.log("FUCKING UID", data.childNodes[0].childNodes[1].childNodes[3].childNodes[17].childNodes[0].data)
        });
}