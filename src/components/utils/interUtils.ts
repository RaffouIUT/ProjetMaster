'use server';
import db from '@/modules/db';
import { InterReduit } from '@/components/utils/customTypes';

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