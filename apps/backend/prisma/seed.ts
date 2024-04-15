import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const category1 = await prisma.category.upsert({
    where: { name: 'Ženska majica' },
    update: {},
    create: {
      name: 'Ženska majica',
    },
  });

  const category2 = await prisma.category.upsert({
    where: { name: 'Cardigan' },
    update: {},
    create: {
      name: 'Cardigan',
    },
  });

  const category3 = await prisma.category.upsert({
    where: { name: 'Šal' },
    update: {},
    create: {
      name: 'Šal',
    },
  });

  const product1 = await prisma.product.upsert({
    where: { title: 'Ženska majica' },
    update: {},
    create: {
      title: 'Taylor Swift The Eras Tour Official Merch Beige T-shirt',
      price: 40,
      categoryId: 1,
      description: 'Beige t-shirt featuring "Taylor Swift The Eras Tour" and photos printed on front with "Taylor Swift The Eras Tour", tour locations, and Taylor Swift album titles printed on back.\nOversized fit\nSuper Soft 100% Cotton',
      image: "https://images.tokopedia.net/img/cache/700/VqbcmM/2023/3/19/459220a1-d4c4-4a2a-8226-858341f2b4f1.png"
    },
  });

  const product2 = await prisma.product.upsert({
    where: { title: 'Ženska majica' },
    update: {},
    create: {
      title: 'Taylor Swift The Eras Tour Official Merch Black T-shirt',
      price: 40,
      categoryId: 1,
      description: 'Black t-shirt featuring "Taylor Swift The Eras Tour" and photos printed on front with "Taylor Swift The Eras Tour", tour locations, and Taylor Swift album titles printed on back.\nOversized fit\nSuper Soft 100% Cotton',
      image: "https://i.ebayimg.com/images/g/UXoAAOSwD2hk1dSb/s-l1200.webp"
    },
  });

  const product3 = await prisma.product.upsert({
    where: { title: 'Ženska majica' },
    update: {},
    create: {
      title: 'Taylor Swift folklore cardigan',
      price: 80,
      categoryId: 2,
      description: 'Folklore Stars Embroidery Cardigan \nLimited Edition',
      image: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1660752596-il_570xN.3902020028_mrj1.jpg?crop=1xw:1xh;center,top&resize=980:*"
    },
  });

  const product4 = await prisma.product.upsert({
    where: { title: 'Taylor Swift Red Scarf' },
    update: {},
    create: {
      title: 'Taylor Swift Red Scarf',
      price: 20,
      categoryId: 3,
      description: 'Knitted Red scarf\nPerfect buy for winter',
      image: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1660753253-TS2--scarf_1_1000x.png?crop=1xw:1xh"
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
