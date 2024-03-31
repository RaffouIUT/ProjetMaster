'use server';
import db from '@/modules/db';
import { EventInput } from '@fullcalendar/core';
import { FormCours } from '@/components/utils/customTypes';

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

export const addSeance = async (data: FormCours) => {
    await db.cours.create({
        data: {
            nom: data.nom,
            dateDebut: new Date(data.date + "T" + data.heureDeb +":00.000Z"),
            dateFin: new Date(data.date + "T" + data.heureFin + ":00.000Z"),
            salle: data.salle,
            promotionId: data.promo.id,
            intervenantId: data.intervenant.id
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
            promotionId: data.promo.id,
            intervenantId: data.intervenant.id
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

export const getSeanceById = async (id: string) => {
    return db.cours.findUnique({
        where: {
            id: id
        }
    });
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