'use server'

import db from '@/modules/db'

export const getEtuById = async (id: string) => {
  return db.etudiant.findUnique({
    where: {
      id: id,
    }
  })
}

export const getListeEtuById = async (listeIdEtu: string[]) => {
  return db.etudiant.findMany({
    where: {
      id: { in: listeIdEtu},
    }
  })
}

export const getListeEtuByIdNotInList = async (listeIdEtu: string[]) => {
  return db.etudiant.findMany({
    where: {
      id: { notIn: listeIdEtu},
    }
  })
}

export const getAllEtuByPromoId = async(promoId: string) => {
  return db.etudiant.findMany({
    where: {
      promotionId: promoId
    }
  })
}
