import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const admin = await prisma.user.upsert({
        where: { email: 'admin@solarflow.com' },
        update: {},
        create: {
            email: 'admin@solarflow.com',
            name: 'Admin',
            password: 'password123', // In real app, hash this!
        },
    })

    // Seed Categories
    const categories = [
        { name: 'Residential Solar', id: 'residential' },
        { name: 'Commercial', id: 'commercial' },
        { name: 'Technology', id: 'tech' },
        { name: 'Battery & Storage', id: 'storage' },
    ]

    for (const cat of categories) {
        await prisma.category.upsert({
            where: { name: cat.name },
            update: {},
            create: { name: cat.name, id: cat.id },
        })
    }

    console.log({ admin })
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
