const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const result = await prisma.tour.delete({
    where: { id: "cmnm5kwku0000wlhcc37k8b5k" }
  });
  console.log('Deleted successfully:', result);
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
