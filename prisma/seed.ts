import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
async function main() {
	const promos = await insertPromo();
	const inters = await insertInters();
	const cours = await insertCours(promos, inters);

	const etus = await insertEtu(promos);
	await insertInscriptions(etus, cours);
}

const insertPromo = async () => {
	const licence1 = await prisma.promotion.upsert({
		where: { abreviation: 'L1' },
		update: {},
		create: {
			nom: 'LICENCE 1',
			abreviation: 'L1',
		},
	})
	const licence2 = await prisma.promotion.upsert({
		where: { abreviation: 'L2' },
		update: {},
		create: {
			nom: 'LICENCE 2',
			abreviation: 'L2',
		},
	})
	const licence3 = await prisma.promotion.upsert({
		where: { abreviation: 'L3' },
		update: {},
		create: {
			nom: 'LICENCE 3',
			abreviation: 'L3',
		},
	})
	const master1 = await prisma.promotion.upsert({
		where: { abreviation: 'M1' },
		update: {},
		create: {
			nom: 'MASTER 1',
			abreviation: 'M1',
		},
	})
	const master2 = await prisma.promotion.upsert({
		where: { abreviation: 'M2' },
		update: {},
		create: {
			nom: 'MASTER 2',
			abreviation: 'M2',
		},
	})
	return { l1: licence1, l2: licence2, l3: licence3, m1: master1, m2:master2 };
}

const insertInters = async () => {
	const inter1 = await prisma.intervenant.upsert({
		where: { id: "clufqzjyg0000fenckivgu4vo" },
		update: {},
		create: {
			id: "clufqzjyg0000fenckivgu4vo",
			nom: "Laurent",
			prenom: "Antoine",
			mail: "antoine.laurent@mail.fr",
			login: "alaurent",
			password: "password1"
		}
	})
	const inter2 = await prisma.intervenant.upsert({
		where: { id: "clufqzjyk0001fenc6y35q56z" },
		update: {},
		create: {
			id: "clufqzjyk0001fenc6y35q56z",
			nom: "Piau-Toffolon",
			prenom: "Claudine",
			mail: "cpt@mail.fr",
			login: "cpt",
			password: "password2"
		}
	})
	const inter3 = await prisma.intervenant.upsert({
		where: { id: "clufqzjyk0002fencprizs3o3" },
		update: {},
		create: {
			id: "clufqzjyk0002fencprizs3o3",
			nom: "Tahon",
			prenom: "Marie",
			mail: "marie.tahon@mail.fr",
			login: "mtahon",
			password: "password3"
		}
	})

	return { i1: inter1, i2: inter2, i3: inter3 }
}

const insertCours = async (promos: any, inters: any) => {
	const cours1 = await prisma.cours.upsert({
		where: { id: "clufs40le0003nkjmngll87y1" },
		update: {},
		create: {
			id: "clufs40le0003nkjmngll87y1",
			nom: "Projet",
			dateDebut: new Date("2024-04-02T19:12:00.000Z"),
			dateFin: new Date("2024-04-02T20:12:00.000Z"),
			intervenantId: inters.i1.id,
			promotionId: promos.m1.id,
			updatedAt: new Date("2024-03-31T17:12:05.377Z"),
			salle: "Salle master",
			tokenQrCode: ""
		}
	})
	const cours2 = await prisma.cours.upsert({
		where: { id: "clufs4jpj0005nkjm00wwa7s0" },
		update: {},
		create: {
			id: "clufs4jpj0005nkjm00wwa7s0",
			nom: "Génie Logiciel",
			dateDebut: new Date("2024-04-03T14:12:00.000Z"),
			dateFin: new Date("2024-04-03T15:12:00.000Z"),
			intervenantId: inters.i2.id,
			promotionId: promos.m1.id,
			updatedAt: new Date("2024-03-31T17:12:05.377Z"),
			salle: "TP3",
			tokenQrCode: ""
		}
	})
	const cours3 = await prisma.cours.upsert({
		where: { id: "clufs59ro0007nkjm2hnhtph6" },
		update: {},
		create: {
			id: "clufs59ro0007nkjm2hnhtph6",
			nom: "Maths IA",
			dateDebut: new Date("2024-04-09T15:12:00.000Z"),
			dateFin: new Date("2024-04-09T16:12:00.000Z"),
			intervenantId: inters.i3.id,
			promotionId: promos.m1.id,
			updatedAt: new Date("2024-03-31T17:12:05.377Z"),
			salle: "TD3",
			tokenQrCode: ""
		}
	})
	const cours4 = await prisma.cours.upsert({
		where: { id: "clufs5kbu0009nkjm8tceqial" },
		update: {},
		create: {
			id: "clufs5kbu0009nkjm8tceqial",
			nom: "Méthodo et Données",
			dateDebut: new Date("2024-04-11T19:13:00.000Z"),
			dateFin: new Date("2024-04-11T21:13:00.000Z"),
			intervenantId: inters.i3.id,
			promotionId: promos.m1.id,
			updatedAt: new Date("2024-03-31T17:12:05.377Z"),
			salle: "TD5",
			tokenQrCode: ""
		}
	})
	const cours5 = await prisma.cours.upsert({
		where: { id: "clufs63ho000bnkjmt9elh2pg" },
		update: {},
		create: {
			id: "clufs63ho000bnkjmt9elh2pg",
			nom: "Programmation",
			dateDebut: new Date("2024-04-15T16:13:00.000Z"),
			dateFin: new Date("2024-04-15T18:13:00.000Z"),
			intervenantId: inters.i1.id,
			promotionId: promos.l2.id,
			updatedAt: new Date("2024-03-31T17:12:05.377Z"),
			salle: "Salle de cours",
			tokenQrCode: ""
		}
	})

	return { c1: cours1, c2: cours2, c3: cours3, c4: cours4, c5: cours5 }
}

const insertEtu = async (promos: any) => {
	const etu1 = await prisma.etudiant.upsert({
		where: { id: "s200718" },
		update: {},
		create: {
			id: "s200718",
			nom: "Guimbert",
			prenom: "Alexis",
			promotionId: promos.m1.id,
		}
	})
	const etu2 = await prisma.etudiant.upsert({
		where: { id: "s2301453" },
		update: {},
		create: {
			id: "s2301453",
			nom: "Giraud",
			prenom: "Nicolas",
			promotionId: promos.m1.id
		}
	})
	const etu3 = await prisma.etudiant.upsert({
		where: { id: "i182554" },
		update: {},
		create: {
			id: "i182554",
			nom: "Doneau",
			prenom: "Rafael",
			promotionId: promos.m1.id
		}
	})
	const etu4 = await prisma.etudiant.upsert({
		where: { id: "s203404" },
		update: {},
		create: {
			id: "s203404",
			nom: "Notelet",
			prenom: "Leo",
			promotionId: promos.m1.id
		}
	})
	return { e1: etu1, e2: etu2, e3: etu3, e4: etu4 }
}

const insertInscriptions = async(etus: any, cours: any) => {
	await prisma.inscription.createMany({
		data: [
			{ coursId: cours.c1.id, etudiantId: etus.e1.id, ponctualite: "retard" },
			{ coursId: cours.c1.id, etudiantId: etus.e2.id, ponctualite: "present" },
			{ coursId: cours.c1.id, etudiantId: etus.e3.id, ponctualite: "present" },
			{ coursId: cours.c2.id, etudiantId: etus.e1.id, ponctualite: "retard" },
			{ coursId: cours.c2.id, etudiantId: etus.e2.id, ponctualite: "present" },
			{ coursId: cours.c3.id, etudiantId: etus.e2.id, ponctualite: "retard" },
			{ coursId: cours.c3.id, etudiantId: etus.e3.id, ponctualite: "present" },
			{ coursId: cours.c3.id, etudiantId: etus.e4.id, ponctualite: "present" },
			{ coursId: cours.c4.id, etudiantId: etus.e1.id, ponctualite: "retard" },
			{ coursId: cours.c4.id, etudiantId: etus.e2.id, ponctualite: "present" },
			{ coursId: cours.c4.id, etudiantId: etus.e3.id, ponctualite: "present" },
			{ coursId: cours.c4.id, etudiantId: etus.e4.id, ponctualite: "present" }
		]
	})
}


main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})