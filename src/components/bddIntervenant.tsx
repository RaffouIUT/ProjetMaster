'use server';

import db from "@/modules/db";
import { revalidatePath } from "next/cache";
import nodemailer from 'nodemailer';


export const generateInterListe = async () => {
    await db.intervenant.createMany({
        data: [
            {nom: "test", prenom: "test", mail: "test.test@test.com", login: "test.test", password: "Test1234"}
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

export const getListeNoms = async (): Promise<string[]> => {
    const intervenants = await db.intervenant.findMany();
    return intervenants.map((intervenant) => intervenant.login);
};

type IntervenantWhereInput = {
    login: string;
};

export const handleSuppression = async (nomIntervenant: string) => {
    console.log('checkpoint 4');
    try {
        console.log('checkpoint 4');
        // Recherche de l'intervenant avec le login spécifié
        const intervenant = await db.intervenant.findFirst({
            where: {
                login: nomIntervenant.replace(' ', '.'),
            },
        });
        console.log('checkpoint 5');
        if (!intervenant) {
            console.error('Intervenant non trouvé.');
            return;
        }

        // Utilisation de l'ID récupéré pour supprimer l'intervenant de la base de données
        await db.intervenant.delete({
            where: {
                id: intervenant.id,
            },
        });

        console.log('Intervenant supprimé avec succès.');


    } catch (error) {
        console.error('Erreur lors de la suppression de l\'intervenant:', error);
    }
};

interface EmailOptions {
    to: string;
    subject: string;
    text: string;
}

export async function sendEmail(options: EmailOptions): Promise<void> {
    // Créez un transporteur SMTP réutilisable
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'leo.notelet@gmail.com',
            pass: 'wldp qqdo zqoy juac'
        }
    });

    // Définissez les options de l'e-mail
    let mailOptions = {
        from: 'leo.notelet@gmail.com',
        to: options.to,
        subject: options.subject,
        text: options.text
    };

    // Envoyez l'e-mail
    try {
        await transporter.sendMail(mailOptions);
        console.log('E-mail envoyé avec succès');
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'e-mail:', error);
        throw new Error('Une erreur s\'est produite lors de l\'envoi de l\'e-mail');
    }
}


