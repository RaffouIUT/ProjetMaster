'use server'
import {redirect, RedirectType, useSearchParams} from "next/navigation";


export async function redirectToCas(idSeance: string, idToken: string) {


    redirect(`https://cas-test.univ-lemans.fr/cas/login?service=http://umbriel.univ-lemans.fr/etu/${idSeance}/${idToken}`,RedirectType.push)

    // const res2 = await fetch('https://cas-test.univ-lemans.fr/cas/serviceValidate?ticket=LETICKET&service=LESERVICE', {
    //     method: "GET",
    //     //body: JSON.stringify({service: "http://umbriel.univ-lemans.fr", ticket: ""}) // TODO donner ticket
    // })

    // // redirection ici plutot qu'un get
    // const res = await fetch('https://cas-test.univ-lemans.fr/cas/login?service=http://umbriel.univ-lemans.fr', {
    //     method: "GET",
    //     //body: JSON.stringify({service: "http://umbriel.univ-lemans.fr"})// TODO page de validation
    // }).then(r => {console.log(r)})
    //
    //res.json()// donne un ticket ou faire avec url
    // ticket donné par l'url



    //return res2.json();
    return "";
}

export async function validateTicket(idToken: string, idSeance: string, ticket: string) {
    let res2 = await fetch(`https://cas-test.univ-lemans.fr/cas/serviceValidate?ticket=${ticket}&service=http://umbriel.univ-lemans.fr/etu/${idSeance}/${idToken}`, {
        method: "GET",
    });

    res2 = JSON.parse(JSON.stringify(res2))
    console.log(res2)
    return res2
}