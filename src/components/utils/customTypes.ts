import { Promotion } from '@prisma/client'

export type InterReduit = {
    id: string,
    nom: string,
    prenom: string,
    mail: string,
    login: string
}

export const InterReduitVide: InterReduit = {
    id: '', mail: '', nom: '', prenom: '', login: ''
}

export const PromotionVide: Promotion = {
    abreviation: '', id: '', nom: ''
}

export type FormCours = {
    id: string,
    nom: string,
    date: string,
    salle: string,
    intervenant: InterReduit,
    promo: Promotion,
    heureDeb: string,
    heureFin: string
}

export const FormCoursVide: FormCours = {
    id : '',
    nom: '',
    date: '',
    salle: '',
    intervenant: structuredClone(InterReduitVide),
    promo: structuredClone(PromotionVide),
    heureDeb: '',
    heureFin: ''
}