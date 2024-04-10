'use server';
import db from '@/modules/db';
import { Promotion } from '@prisma/client';

export const getAllPromo = async () => {
	return db.promotion.findMany({
		orderBy: {
			nom: 'asc'
		}
	})
};

export const addPromo = async (promo: Promotion) => {
	return db.promotion.upsert({
		where: {
			id: promo.id
		},
		update: {
			nom: promo.nom,
			abreviation: promo.abreviation
		},
		create: {
			nom: promo.nom,
			abreviation: promo.abreviation
		}
	})
}

export const deletePromo = async (id: string) => {
	await db.promotion.delete({
		where: {
			id: id
		}
	})
}