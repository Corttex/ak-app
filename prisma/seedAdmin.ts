import bcrypt from 'bcrypt';
import prisma from '../src/lib/prisma';

async function main() {
  const pin = '220022';
  const saltRounds = 10;
  const pinHash = await bcrypt.hash(pin, saltRounds);

  const admins = ['Bruno', 'Fellipe'];

  for (const name of admins) {
    await prisma.adminUser.upsert({
      where: { name },
      update: { pinHash },
      create: { name, pinHash },
    });
    console.log(`Upserted admin: ${name}`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
