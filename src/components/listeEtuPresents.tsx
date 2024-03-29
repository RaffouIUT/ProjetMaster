'use server';
import db from '@/modules/db';
import { Etudiant } from '@/components/utils/customTypes';
import { getInsciptionBySessionId } from '@/components/utils/inscriptionsUtils';
import { getListeEtuById } from '@/components/utils/etuUtils';

export const listeEtuPresents = async (id_session: string) => {
  const liste: Etudiant[] = [];
  const listeIdEtu: string[] = [];

  const inscriptions = await getInsciptionBySessionId(id_session);

  /* on a les id d'étudiants inscrits au cours donné en paramètre */
  inscriptions.map((inscription: { etudiantId: string; }) => (
    listeIdEtu.push(inscription.etudiantId)
  ))

  getListeEtuById(listeIdEtu).then((response) => (
      response.map((etu) => (
      liste.push(etu)
    ))
  ))

  return liste
};