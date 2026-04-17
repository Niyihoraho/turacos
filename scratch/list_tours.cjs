const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const tours = await prisma.tour.findMany({
    select: {
      id: true,
      slug: true,
      title: true
    }
  });
  console.log(JSON.stringify(tours, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
