'use server';
import db from '@/modules/db';
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import Cookies from "js-cookie";
import {redirect} from "next/navigation";
import {compareHashPassword, hashPassword} from "@/components/utils/interUtils";

export async function fonctionConnexion(login: string, pdw: string) {
    const pwd_hash = await hashPassword(pdw);
    console.log(pwd_hash)
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