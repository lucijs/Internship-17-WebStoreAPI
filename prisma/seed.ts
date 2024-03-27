import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const category = await prisma.category.upsert({
        where: {name: "Ženska majica"},
        update:{},
        create:{
            name: "Ženska majica",
        },
    });

    const product = await prisma.product.upsert({
        where: { title: "Ženska majica" }, 
        update: {},
        create: {
            title: "Ženska majica",
            price: 10,
            categoryId: 1,
            description: "Uska crna majica dugih rukava."
        },
    });

    const user = await prisma.user.upsert({
        where: { username: "luce" }, 
        update: {},
        create: {
            username: "luce",
            email: "luce@pmfst.hr",
            password: "12345678",
            firstName: "Lucija",
            lastName: "Fradelić",
            cityAdress: "Split",
            streetAdress: "Makarska",
            numberAdress: "15",
            phone: "0995779220",
            isAdmin: true,
        },
    });
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});