'use server';
import db from '@/modules/db';
import {redirect} from "next/navigation";
import {compareHashPassword} from "@/components/utils/interUtils";
import Cookies from "js-cookie";


export async function fonctionConnexion(login: string, pdw: string) {
    const inter = await db.intervenant.findFirst({
        where: {
            login: login,
        },
    });
    if(inter !== null && await compareHashPassword(pdw, inter.password)) {
        return ['inter', inter.id];
    }else{
        const admin = await db.administrateur.findFirst({
            where: {
                login: login,
            },
        });
        if(admin !== null && await compareHashPassword(pdw, admin.password)) {
            return ['admin', admin.id];
        }
    }
    return ['', ''];
}

export async function fonctionRedirectHome() {
    redirect('/');
}

export async function verifIDInter(id: string) {
    const inter = await db.intervenant.findFirst({
        where: {
            id: id,
        },
    });
    return inter !== null;
}

export async function verifIDAdmin(id: string) {
    const inter = await db.administrateur.findFirst({
        where: {
            id: id,
        },
    });
    //console.log('inter = '+inter)
    return (inter !== null && true);
}



export async function verifCookieAdmin(cookie: string) {
    return !(cookie === undefined || !await verifIDAdmin(cookie));
}

export async function verifCookieInter(cookie: string) {
    return !(cookie === undefined || !await verifIDInter(cookie));

}