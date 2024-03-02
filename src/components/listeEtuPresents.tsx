'use server';
import db from '@/modules/db';

export const listeEtuPresents = async () => {
  let isLoading = true;
  const liste: String[] = [];

  const response = await db.etudiant.findMany()
  response.map((etu) => (
    liste.push(etu.nom + ' ' + etu.prenom)
  ))

  return liste
};