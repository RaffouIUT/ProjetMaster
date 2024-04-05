'use server';
import db from '@/modules/db';
import { Promotion } from '@prisma/client';

export const getAllPromo = async () => {
	return db.promotion.findMany({})
};