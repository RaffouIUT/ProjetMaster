import db from '@/modules/db';
import { JSX } from 'react';
import Link from 'next/link';

export default async function Session() {
  let liste: JSX.Element[] = [];
  /*TODO donner l'id de l'intervenant connecté en param_id*/
  let param_id = 'truc';
  const cours = await db.cours.findMany({
    where: {
      intervenantId : param_id,
    },
    orderBy: {
      dateDebut: 'asc',
    },
  })

  async function rechercherInter(id_inter: string) {
    return db.intervenant.findUnique({
      where: {
        id: id_inter,
      },
    });
  }

  /*TODO fixer les dates il y a rien qui va*/
  function fabriquerDateString(date: Date) {
    let jour = date.getDay() > 9 ? date.getDay() : '0' + date.getDay();
    let mois = date.getMonth() > 9 ? date.getMonth() : '0' + date.getMonth()
    let annee = date.getFullYear();
    return jour + '/' + mois + '/' + annee;
  }

  function  fabriquerHeureString(date: Date) {
    let heure = date.getUTCHours() > 9 ? date.getUTCHours() : '0' + date.getUTCHours();
    let minute = date.getUTCMinutes() > 9 ? date.getUTCMinutes() : '0' + date.getUTCMinutes();
    return heure + ':' + minute;
  }

  for (const cour of cours) {
    let intervenant = await rechercherInter(cour.intervenantId);
    let date = fabriquerDateString(cour.dateDebut);
    let heure_deb = fabriquerHeureString(cour.dateDebut);
    let heure_fin = fabriquerHeureString(cour.dateFin);

    liste.push(
      <div
        className={'flex bg-gray-300 rounded-lg mx-4 my-4 justify-center justify-self-center text-center w-5/6 h-5/6 text-2xl'}>
        {
          intervenant ? (
            <Link className={'w-full h-full hover:bg-primary-700 rounded-lg'} href={"/inter/session/" + cour.id}>
              <p>{cour.nom} <br /> {intervenant.nom + ' ' + intervenant.prenom} <br /> {date} <br /> {heure_deb + ' - ' + heure_fin}</p>
            </Link>
          ) : (
            <Link className={'w-full h-full hover:bg-primary-700 rounded-lg'} href={"/inter/session/" + cour.id}>
              <p>{cour.nom} <br /> {date} <br /> {heure_deb + ' - ' + heure_fin}</p>
            </Link>

          )

        }

      </div>
    );
  }

  return (liste);
}