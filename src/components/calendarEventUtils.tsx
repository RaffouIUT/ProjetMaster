export type FormCours = {
    id: string,
    nom: string,
    date: string,
    salle: string,
    intervenant: string,
    intervenantId: string
    promo: string,
    heureDeb: string,
    heureFin: string
}

export const FormCoursVide: FormCours = {
    id : '',
    nom: '',
    date: '',
    salle: '',
    intervenant: '',
    intervenantId: '',
    promo: '',
    heureDeb: '',
    heureFin: ''
}

export type InterReduit = {
    id: string,
    nom: string,
    prenom: string,
    mail: string
}