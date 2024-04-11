import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const category = await prisma.category.upsert({
    where: { name: 'Ženska majica' },
    update: {},
    create: {
      name: 'Ženska majica',
    },
  });

  const product = await prisma.product.upsert({
    where: { title: 'Ženska majica' },
    update: {},
    create: {
      title: 'Ženska majica',
      price: 10,
      categoryId: 1,
      description: 'Uska crna majica dugih rukava.',
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
