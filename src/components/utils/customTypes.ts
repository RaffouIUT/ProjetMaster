import { Cours, Promotion, Etudiant } from '@prisma/client';

export type InterReduit = {
    id: string,
    nom: string,
    prenom: string,
    mail: string,
    login: string
}

export type InterEtendu = {
    id: string,
    nom: string,
    prenom: string,
    mail: string,
    login: string,
    cours: Cours[]
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

export type PresenceCours = {
    cours: Cours,
    present: string,
}
export type PresenceEtuCours = {
    etudiant: Etudiant,
    cours: PresenceCours[]
    total: number
}

export type PresenceEtudiant = {
    etudiant: Etudiant,
    present: string
}

export type EmailOptions = {
    to: string;
    subject: string;
    text: string;
}

export const InterReduitVide: InterReduit = {
    id: '', mail: '', nom: '', prenom: '', login: ''
}

export const InterEtenduVide: InterEtendu = {
    id: "",
    nom: "",
    prenom: "",
    mail: "",
    login: "",
    cours: []
}

export const PromotionVide: Promotion = {
    abreviation: '', id: '', nom: ''
}

export const CoursVide: Cours = {
    dateDebut: new Date(),
    dateFin: new Date(),
    id: '',
    intervenantId: '',
    nom: '',
    promotionId: '',
    salle: '',
    tokenQrCode: '',
    updatedAt: new Date()
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

export const EtudiantVide: Etudiant = {
    id: '', nom: '', prenom: '', promotionId: ""
}
