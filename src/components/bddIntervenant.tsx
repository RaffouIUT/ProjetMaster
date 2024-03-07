'use server';

import db from "@/modules/db";
import { revalidatePath } from "next/cache";


export const generateInterListe = async () => {
    await db.intervenant.createMany({
        data: [
            {nom: "Helloworld", prenom: "Test", mail: "test.test@test.com", login: "Tester", password: "Test1234"}
        ],
    });
    revalidatePath('/');
};

export const AjoutInterBDD = async (nom: string, prenom: string, mail:string) => {
    await db.intervenant.createMany({
        data: [
            { nom, prenom, mail: mail, login: `${nom}.${prenom}`, password: "test" },
        ],
    });
    revalidatePath('/');
};