import db from '@/modules/db';

export async function Session() {
    const liste: string[] = [];
    const etu = await db.etudiant.findMany()

    etu.map((etudiant) => (
      liste.push(etudiant.nom + ' ' + etudiant.prenom)
    ))

    return (liste);
}