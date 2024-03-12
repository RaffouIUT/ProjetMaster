import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
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
	console.log({ licence1, licence2, licence3, master1, master2 })
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