import bcrypt from 'bcrypt';

import prisma from '../src/config/database.js';
async function main() {
  const SALT = 10;
  const hashedPassword = bcrypt.hashSync('admin', SALT);

  await prisma.user.upsert({
    where: { email: 'admin@gmail.com' },
    update: {},
    create: {
      email: 'admin@gmail.com',
      password: hashedPassword,
    },
  });

  await prisma.$queryRaw`INSERT INTO terms ("number") VALUES (1)`;
  await prisma.$queryRaw`INSERT INTO terms ("number") VALUES (2)`;
  await prisma.$queryRaw`INSERT INTO terms ("number") VALUES (3)`;
  await prisma.$queryRaw`INSERT INTO terms ("number") VALUES (4)`;
  await prisma.$queryRaw`INSERT INTO terms ("number") VALUES (5)`;
  await prisma.$queryRaw`INSERT INTO terms ("number") VALUES (6)`;

  await prisma.$queryRaw`INSERT INTO categories ("name") VALUES ('Projeto')`;
  await prisma.$queryRaw`INSERT INTO categories ("name") VALUES ('Prática')`;
  await prisma.$queryRaw`INSERT INTO categories ("name") VALUES ('Recuperação')`;

  await prisma.$queryRaw`INSERT INTO teachers ("name") VALUES ('Diego Pinho')`;
  await prisma.$queryRaw`INSERT INTO teachers ("name") VALUES ('Bruna Hamori')`;

  await prisma.$queryRaw`INSERT INTO disciplines ("name", "term_id") VALUES ('HTML e CSS', 1)`;
  await prisma.$queryRaw`INSERT INTO disciplines ("name", "term_id") VALUES ('JavaScript', 2)`;
  await prisma.$queryRaw`INSERT INTO disciplines ("name", "term_id") VALUES ('React', 3)`;
  await prisma.$queryRaw`INSERT INTO disciplines ("name", "term_id") VALUES ('Humildade', 1)`;
  await prisma.$queryRaw`INSERT INTO disciplines ("name", "term_id") VALUES ('Planejamento', 2)`;
  await prisma.$queryRaw`INSERT INTO disciplines ("name", "term_id") VALUES ('Autoconfiança', 3)`;

  await prisma.$queryRaw`INSERT INTO "teachers_disciplines" ("teacher_id", "discipline_id") VALUES (1, 1)`;
  await prisma.$queryRaw`INSERT INTO "teachers_disciplines" ("teacher_id", "discipline_id") VALUES (1, 2)`;
  await prisma.$queryRaw`INSERT INTO "teachers_disciplines" ("teacher_id", "discipline_id") VALUES (1, 3)`;
  await prisma.$queryRaw`INSERT INTO "teachers_disciplines" ("teacher_id", "discipline_id") VALUES (2, 4)`;
  await prisma.$queryRaw`INSERT INTO "teachers_disciplines" ("teacher_id", "discipline_id") VALUES (2, 5)`;
  await prisma.$queryRaw`INSERT INTO "teachers_disciplines" ("teacher_id", "discipline_id") VALUES (2, 6)`;
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
