'use server';
import db from '@/modules/db';
import { revalidatePath } from 'next/cache';

export const handleCreerBdd = async () => {
  await db.etudiant.createMany({
    data: [
      {nom: "Chauve", prenom: "Amand", promotion: "L1"},
      {nom: "Gérald", prenom: "Roméo", promotion: "L1"},
      {nom: "Chuquet", prenom: "Jasmin", promotion: "L1"},
      {nom: "Vérany", prenom: "Gauthier", promotion: "L1"},
      {nom: "Marchant", prenom: "Jérémy", promotion: "L1"},
      {nom: "Durand", prenom: "Maxence", promotion: "L1"},
      {nom: "Jégou", prenom: "Maximilien", promotion: "L1"},
      {nom: "Cuvillier", prenom: "Capucine", promotion: "L1"},
      {nom: "Niel", prenom: "Amanda", promotion: "L1"},
    ],
  });

  revalidatePath('/');
};