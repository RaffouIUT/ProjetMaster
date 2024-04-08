'use server';
import db from '@/modules/db';
import { EventInput } from '@fullcalendar/core';
import { CoursVide, FormCours } from '@/components/utils/customTypes';
import { deleteAllInscriptions } from '@/components/utils/inscriptionsUtils';
import { Cours } from '@prisma/client';

export const getCours = async () => {
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
            promotion: {
                select: {
                    id: true,
                    nom: true,
                    abreviation: true
                }
            }
        }
    });
    response.map((cours) => (
        liste.push({
            id: cours.id,
            title: cours.nom,
            start: new Date(cours.dateDebut),
            end: new Date(cours.dateFin),
            extendedProps: {
                intervenant: cours.intervenant,
                salle: cours.salle,
                promo: cours.promotion
            },
        })
    ))
    return liste
};

export const addCours = async (data: FormCours) => {
    await db.cours.create({
        data: {
            nom: data.nom,
            dateDebut: new Date(data.date + "T" + data.heureDeb +":00.000Z"),
            dateFin: new Date(data.date + "T" + data.heureFin + ":00.000Z"),
            salle: data.salle,
            promotionId: data.promo.id,
            intervenantId: data.intervenant.id,
            tokenQrCode: ""
        }
    });
};

export const updateCours = async (data: FormCours) => {
    await db.cours.update({
        where: {
            id: data.id
        },
        data: {
            nom: data.nom,
            dateDebut:  new Date(data.date + "T" + data.heureDeb +":00.000Z"),
            dateFin: new Date(data.date + "T" + data.heureFin + ":00.000Z"),
            salle: data.salle,
            promotionId: data.promo.id,
            intervenantId: data.intervenant.id
        }
    })
};

export const deleteCours = async (id: string) => {
    await db.cours.delete({
        where: {
            id: id
        }
    })
};

export const getCoursById = async (id: string) => {
    const cours: Cours | null = await db.cours.findUnique({
        where: {
            id: id
        }
    })
    return cours ?? structuredClone(CoursVide)
}

export const getAllCoursByPromoId = async(promoId: string) => {
    return db.cours.findMany({
        where: {
            promotionId: promoId
        }
    })
}

export const getTokenById = async (id: string) => {
    return db.cours.findUnique({
        where: {
            id: id
        },
        select: {
            tokenQrCode: true
        }
    });
}

export const setTokenById = async (id: string, token: string) => {
    await db.cours.update({
        where: {
            id: id
        },
        data: {
            tokenQrCode: token
        }
    })
}

export const deleteAllCours = async () => {
    // On doit d'abord supprimer toutes les inscriptions associées aux cours
    await deleteAllInscriptions();

    await db.cours.deleteMany({});
}