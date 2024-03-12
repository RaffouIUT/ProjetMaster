'use server';
import db from '@/modules/db';
import { InterReduit } from '@/components/calendarEventUtils';

export const getAllInter = async () => {
	const liste: InterReduit[] = [];

	const response = await db.intervenant.findMany()
	response.map((inter) => (
		liste.push({
			id: inter.id,
			nom: inter.nom,
			prenom: inter.prenom,
			mail: inter.mail,
		})
	))

	return liste
};