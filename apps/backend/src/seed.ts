import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@moosathegreat.com' },
    update: {},
    create: {
      email: 'admin@moosathegreat.com',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
    },
  });

  // Create default settings
  await prisma.systemSetting.upsert({
    where: { key: 'maintenance_mode' },
    update: {},
    create: { key: 'maintenance_mode', value: 'false' },
  });

  // Create sample page
  await prisma.page.upsert({
    where: { slug: 'home' },
    update: {},
    create: {
      slug: 'home',
      title: 'Welcome to MoosaTheGreat.com',
      content: { type: 'text', value: 'This is the home page.' },
      published: true,
      roles: ['USER', 'ADMIN', 'SUPER_ADMIN'],
    },
  });

  console.log('Seeding completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
