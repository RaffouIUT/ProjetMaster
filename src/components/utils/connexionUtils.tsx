'use server';
import db from '@/modules/db';
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import Cookies from "js-cookie";
import {redirect} from "next/navigation";

export async function fonctionConnexion(login: string, pdw: string) {
    const inter = await db.intervenant.findFirst({
        where: {
            login: login,
            password: pdw
        },
    });
    if(inter !== null) {
        return ['inter', inter.id];
    }else{
        const admin = await db.administrateur.findFirst({
            where: {
                login: login,
                password: pdw
            },
        });
        if(admin !== null) {
            return ['admin', 'true'];
        }
    }
    return ['', ''];
}

export async function fonctionRedirectHome() {
    redirect('/');
}