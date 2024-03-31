'use server';
import db from '@/modules/db';
import { getAllEtuByPromoId, getEtuById } from '@/components/utils/etuUtils';
import { getAllCoursByPromoId, getSeanceById } from '@/components/utils/coursUtils';
import { PresenceCours, PresenceEtuCours } from '@/components/utils/customTypes';
import { Cours, Etudiant } from '@prisma/client';

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


export const getInscriptionsByPromoId = async (id: string) => {
  const response = await db.inscription.findMany({
    where: {
      etudiant: {
        promotionId: id
      }
    },
    select: {
      etudiant: true,
      cours: true,
    },
    orderBy: {
      cours: {
        dateDebut: "asc"
      }
    }
  });

  let cours: Cours[] = [];
  await getAllCoursByPromoId(id).then((fetchCours) => cours = fetchCours );

  let presenceCoursListe: PresenceCours[] = [];
  cours.forEach((c) => {
    presenceCoursListe.push({
      cours: c,
      present: false
    })
  });

  let etudiants: Etudiant[] = [];
  await getAllEtuByPromoId(id).then(etu => etudiants = etu);

  let presencesListeTmp: PresenceEtuCours[] = [];
  etudiants.forEach((etu) => {
    presencesListeTmp.push({
      etudiant: etu,
      cours: structuredClone(presenceCoursListe)
    })
  })

  presencesListeTmp.map((etuPresent) => {
    etuPresent.cours.map((pres) => {
      // if (isInscrit(pres.cours.id, etuPresent.etudiant.id)) {
      //     console.log("machin")
      //     pres.present = true
      // }
      response.forEach((inscription) => {
        if (inscription.cours.id == pres.cours.id && inscription.etudiant.id == etuPresent.etudiant.id) {
          pres.present = true;
        }
      })
    })
  })
  return presencesListeTmp
}

