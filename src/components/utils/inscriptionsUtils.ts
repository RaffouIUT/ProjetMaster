'use server';
import db from '@/modules/db';
import { getEtuById } from '@/components/utils/etuUtils';
import { getSeanceById } from '@/components/utils/coursUtils';

export const getInsciptionBySessionId = async (id_session:string) => {
  return db.inscription.findMany({
    where: {
      coursId: id_session,
    }
  });
};

export const addInscription = async (id_session:string, id_etu:string) => {
  let etu = await getEtuById(id_etu);
  let seance = await getSeanceById(id_session);

  if(etu  && seance){
    await db.inscription.create({
      data: {
        etudiantId: id_etu,
        coursId: id_session,
      }
    }).then(() => { // @ts-ignore impossible qu'ils soient null
      console.log("Inscription ajoutée de l'étudiant " + etu.nom + " " + etu.prenom + " au cours " + seance.nom)});
  }

};

