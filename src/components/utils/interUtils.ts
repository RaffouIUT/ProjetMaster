'use server';
import db from '@/modules/db';
import { EmailOptions, InterEtendu, InterEtenduVide, InterReduit } from '@/components/utils/customTypes';
import nodemailer from 'nodemailer';

export const getAllInter = async () => {
	const liste: InterReduit[] = [];

	const response = await db.intervenant.findMany()
	response.map((inter) => (
		liste.push({
			id: inter.id,
			nom: inter.nom,
			prenom: inter.prenom,
			mail: inter.mail,
			login: inter.login
		})
	))

	return liste
};

/*
* Fonction qui permet de rechercher un intervenant par son id
* @param id_inter : string
* @return intervenant : Intervenant
 */
export async function rechercherInter(id_inter: string) {
	return db.intervenant.findUnique({
		where: {
			id: id_inter,
		},
	});
}

export const deleteInter = async (idIntervenant: string) => {
	await db.intervenant.delete({
		where: {
			id: idIntervenant
		},
	});
}

const generateMdp = ():string => {
	let mdp:string = "";
	let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (let i = 0; i < 8; i++)
		mdp+= possible.charAt(Math.floor(Math.random() * possible.length));
	return mdp;
}

export const ajoutInter = async (nom: string, prenom: string, mail: string)=> {
	const mdp = generateMdp();

	await db.intervenant.create({
		data: {
			nom: nom,
			prenom: prenom,
			mail: mail,
			login: `${nom}.${prenom}`,
			password: mdp
		}
	});

	await sendEmailToInter({
		to: mail,
		subject: 'Enregistrement en tant qu\'intervenant - Le Mans Université',
		text: 'Bonjour ' + nom + ' ' + prenom + ',\nVous avez été ajouté en tant qu\'intervenant à l\'université du mans\nVotre login de session est ' + nom + '.' + prenom + '\nVoici votre mot passe : ' + mdp + '.'
	});
}

export const sendEmailToInter = async (options: EmailOptions): Promise<void> => {
	// Créez un transporteur SMTP réutilisable
	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'presence.gestion.lemans@gmail.com',
			pass: 'mgun enzv huoy ktvw'
		}
	});

	// Définissez les options de l'e-mail
	let mailOptions = {
		from: 'presence.gestion.lemans@gmail.com',
		to: options.to,
		subject: options.subject,
		text: options.text
	};

	// Envoyez l'e-mail
	await transporter.sendMail(mailOptions);
}

export const getInterById = async (interId: string) => {
	const interDB: InterEtendu | null = await db.intervenant.findUnique({
		where: {
			id: interId
		},
		select: {
			id: true,
			nom: true,
			prenom: true,
			mail: true,
			login: true,
			password: false,
			cours: true
		}
	});
	return interDB ?? structuredClone(InterEtenduVide)
}
