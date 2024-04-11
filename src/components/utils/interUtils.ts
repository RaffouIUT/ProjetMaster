'use server';
import db from '@/modules/db';
import {EmailOptions, InterEtendu, InterEtenduVide, InterReduit} from '@/components/utils/customTypes';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';

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

export async function hashPassword(password: string) {
	try {
		return await bcrypt.hash(password, 10);
	} catch (error) {
		console.error(error);
		throw new Error('Erreur lors du hachage du mot de passe');
	}
}

export async function compareHashPassword(password: string, hashedPassword: string) {
	return  bcrypt.compare(password, hashedPassword)
}

/*export async function devHashPassword() {
	let password = 'password1';
	let hashedPassword = await hashPassword(password);
	let compare = await compareHashPassword(password, hashedPassword);
	console.log('mot de passe : '+password + '\nmot de passe hash : ' + hashedPassword, '\nbon mot de passe : ' + compare);

	password = 'password2';
	hashedPassword = await hashPassword(password);
	compare = await compareHashPassword(password, hashedPassword);
	console.log('mot de passe : '+password + '\nmot de passe hash : ' + hashedPassword, '\nbon mot de passe : ' + compare);

	password = 'password3';
	hashedPassword = await hashPassword(password);
	compare = await compareHashPassword(password, hashedPassword);
	console.log('mot de passe : '+password + '\nmot de passe hash : ' + hashedPassword, '\nbon mot de passe : ' + compare);
}*/


export const addInter = async (id: string, nom: string, prenom: string, mail: string)=> {
	const mdp = generateMdp();
	const mdp_hash = await hashPassword(mdp);
	const bonPwd =  await compareHashPassword(mdp, mdp_hash);
	//console.log('mot de passe : '+mdp + '\nmot de passe hash : ' + mdp_hash, '\nbon mot de passe : ' + bonPwd);
	//await devHashPassword();
	if(!bonPwd) {
		console.error('Erreur de hashage du mot de passe');
		alert('Erreur de hashage du mot de passe');
	}

	await db.intervenant.upsert({
		where: {
			id: id
		},
		update: {
			nom: nom,
			prenom: prenom,
			mail: mail
		},
		create: {
			nom: nom,
			prenom: prenom,
			mail: mail,
			login: `${nom}.${prenom}`,
			password: mdp_hash
		}
	});

	await sendEmail({
		to: mail,
		subject: 'Enregistrement en tant qu\'intervenant - Le Mans Université',
		text: 'Bonjour ' + nom + ' ' + prenom + ',\nVous avez été ajouté en tant qu\'intervenant à l\'université du mans\nVotre login de session est ' + nom + '.' + prenom + '\nVoici votre mot passe : ' + mdp + '.'
	});
}

export const sendEmail = async (options: EmailOptions): Promise<void> => {
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
	interDB?.cours.sort((a, b) => (a.dateDebut < b.dateDebut) ? 1 : -1)

	return interDB ?? structuredClone(InterEtenduVide)
}
