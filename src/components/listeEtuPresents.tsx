'use server';
import db from '@/modules/db';

export const listeEtuPresents = async (id_session: string) => {
  const liste: string[] = [];
  const listeIdEtu: string[] = [];
  const inscriptions = await db.inscription.findMany({
    where: {
      coursId: id_session,
    }
  })

  /* on a les id d'étudiants inscrits au cours donné en paramètre */
  inscriptions.map((inscription: { etudiantId: string; }) => (
    listeIdEtu.push(inscription.etudiantId)
  ))


  /* on cherche les noms & prénoms des étudiants de cette liste */
  const response = await db.etudiant.findMany({
    where: {
      id: { in: listeIdEtu},
    }
  })

  response.map((etu) => (
    liste.push(etu.nom + ' ' + etu.prenom)
  ))

  return liste
};