'use server';
import db from '@/modules/db';
import { Promotion } from '@prisma/client';

export const getAllPromo = async () => {
	const liste: Promotion[] = [];

	const response = await db.promotion.findMany()
	response.map((promo) => (
		liste.push({
			id: promo.id,
			nom: promo.nom,
			abreviation: promo.abreviation,
		})
	))

	return liste
};