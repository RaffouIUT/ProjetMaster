'use server';
import db from '@/modules/db';
import { EventInput } from '@fullcalendar/core';
import { revalidatePath } from 'next/cache';
import { FormCours } from '@/components/calendarEventUtils';

export const getSeances = async () => {
    const liste: EventInput[] = [];

    const response = await db.cours.findMany({
        include: {
            intervenant: {
                select: {
                    id: true,
                    prenom: true,
                    nom: true
                }
            },

        }
    });
    // l'heure est bonne en sortie de BD
    response.map((cours) => (
        liste.push({
            id: cours.id,
            title: cours.nom,
            start: new Date(cours.dateDebut),
            end: new Date(cours.dateFin),
            extendedProps: {
                intervenantId: cours.intervenantId,
                intervenant: cours.intervenant.prenom + " " + cours.intervenant.nom,
                salle: cours.salle,
                promo: cours.promotionVisee
            },
        })
    ))
    // Bonne heure en sortie de BD
    console.log(liste)

    return liste
};

export const addSeance = async (data: FormCours) => {
    await db.cours.create({
        data: {
            nom: data.nom,
            dateDebut: new Date(data.date + "T" + data.heureDeb +":00.000Z"),
            dateFin: new Date(data.date + "T" + data.heureFin + ":00.000Z"),
            salle: data.salle,
            promotionVisee: data.promo,
            intervenantId: data.intervenantId
        }
    });
};

export const updateSeance = async (data: FormCours) => {
    await db.cours.update({
        where: {
            id: data.id
        },
        data: {
            nom: data.nom,
            dateDebut:  new Date(data.date + "T" + data.heureDeb +":00.000Z"),
            dateFin: new Date(data.date + "T" + data.heureFin + ":00.000Z"),
            salle: data.salle,
            promotionVisee: data.promo,
            intervenantId: data.intervenantId
        }
    })
};

export const deleteSeance = async (id: string) => {
    await db.cours.delete({
        where: {
            id: id
        }
    })
};