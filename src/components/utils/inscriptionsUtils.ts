'use server';
import db from '@/modules/db';
import { getAllEtuByPromoId } from '@/components/utils/etuUtils';
import { getAllCoursByPromoId } from '@/components/utils/coursUtils';
import { PresenceCours, PresenceEtuCours, PresenceEtudiant } from '@/components/utils/customTypes';
import { Cours, Etudiant } from '@prisma/client';

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

export const getInscriptionsByCours = async (cours: Cours) => {
  /**
   * Je veux en sortie un objet qui me donne pour chaque élève s'il est inscrit au cours actuel (coursId) ou pas
   */
  let etuPresence: PresenceEtudiant[] = []
  await getAllEtuByPromoId(cours.promotionId).then((etus: Etudiant[]) => {
    etus.map((etu) => etuPresence.push({etudiant: etu, present: "absent"}) )
  });

  // Tous les étudiants inscrits
  const inscriptions: {etudiant: Etudiant, ponctualite: string}[] = await db.inscription.findMany({
    where: {
      coursId: cours.id
    },
    select: {
      etudiant: true,
      ponctualite: true
    },
    orderBy: {
      cours: {
        dateDebut: "asc"
      }
    }
  });

  etuPresence.map((etu) => {
    if (inscriptions.some( inscription => inscription.etudiant.id == etu.etudiant.id)) {
      etu.present = "present";
    }
  })

  return etuPresence
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

