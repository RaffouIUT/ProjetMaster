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
    },
    include: {
      etudiant: true
    }
  });
};

export const addInscription = async (id_session:string, id_etu:string, ponctualite: string) => {
  let etu = await getEtuById(id_etu);
  let seance = await getSeanceById(id_session);

  if(etu  && seance){
    await db.inscription.create({
      data: {
        etudiantId: id_etu,
        coursId: id_session,
        ponctualite: ponctualite
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
      ponctualite: true
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
      present: "absent"
    })
  });

  let etudiants: Etudiant[] = [];
  await getAllEtuByPromoId(id).then(etu => etudiants = etu);

  let presencesListeTmp: PresenceEtuCours[] = [];
  etudiants.forEach((etu) => {
    presencesListeTmp.push({
      etudiant: etu,
      cours: structuredClone(presenceCoursListe),
      total: 0
    })
  })

  presencesListeTmp.map((etuPresent) => {
    let cpt: number = 0
    etuPresent.cours.map((pres) => {
      response.forEach((inscription) => {
        if (inscription.cours.id == pres.cours.id && inscription.etudiant.id == etuPresent.etudiant.id) {
          pres.present = inscription.ponctualite;
          cpt ++
        }
      })
    })
    etuPresent.total = cpt
  })
  return presencesListeTmp
}

export const deleteAllInscriptions = async () => {
  await db.inscription.deleteMany({})
}

export const deleteInscription = async (coursId: string, etuId: string) => {
  await db.inscription.delete({
    where: {
      coursId_etudiantId: {
        coursId: coursId,
        etudiantId: etuId
      }
    }
  })
}

export const addOrUpdateInscription = async (coursId: string, etuId: string, ponctualite: string) => {
  await db.inscription.upsert({
    where: {
      coursId_etudiantId: {
        coursId: coursId,
        etudiantId: etuId
      }
    },
    update: {
      ponctualite: ponctualite
    },
    create: {
      coursId: coursId,
      etudiantId: etuId,
      ponctualite: ponctualite
    }
  })
}

