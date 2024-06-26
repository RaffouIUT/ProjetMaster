'use server';

import db from '@/modules/db';
import { Etudiant } from '@prisma/client';
import { deleteAllInscriptions } from '@/components/utils/inscriptionsUtils';
import { EtudiantVide } from '@/components/utils/customTypes';

export const getEtuById = async (id: string) => {
  const etu = await db.etudiant.findUnique({
    where: {
      id: id,
    }
  });
  return etu ?? structuredClone(EtudiantVide)
}

export const getAllEtuByPromoId = async(promoId: string) => {
  return db.etudiant.findMany({
    where: {
      promotionId: promoId
    }
  })
}

export const deleteAllEtu = async () => {
  await deleteAllInscriptions();

  await db.etudiant.deleteMany({});
}

export const addOrChangeEtu = async (etu: Etudiant) => {
  // Si l'id de l'étudiant est déjà dans la BD, alors l'étudiant sera modifié
  await db.etudiant.upsert({
    where: {
      id: etu.id
    },
    update: {
      nom: etu.nom,
      prenom: etu.prenom,
      promotionId: etu.promotionId
    },
    create: {
      id: etu.id,
      nom: etu.nom,
      prenom: etu.prenom,
      promotionId: etu.promotionId
    }
  })
}
