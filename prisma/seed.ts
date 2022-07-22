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

  await prisma.$queryRaw`INSERT INTO terms ("number") VALUES (1);
  INSERT INTO terms ("number") VALUES (2);
  INSERT INTO terms ("number") VALUES (3);
  INSERT INTO terms ("number") VALUES (4);
  INSERT INTO terms ("number") VALUES (5);
  INSERT INTO terms ("number") VALUES (6);
  
  INSERT INTO categories ("name") VALUES ('Projeto');
  INSERT INTO categories ("name") VALUES ('Prática');
  INSERT INTO categories ("name") VALUES ('Recuperação');
  
  INSERT INTO teachers ("name") VALUES ('Diego Pinho');
  INSERT INTO teachers ("name") VALUES ('Bruna Hamori');
  
  INSERT INTO disciplines ("name", "termId") VALUES ('HTML e CSS', 1);
  INSERT INTO disciplines ("name", "termId") VALUES ('JavaScript', 2);
  INSERT INTO disciplines ("name", "termId") VALUES ('React', 3);
  INSERT INTO disciplines ("name", "termId") VALUES ('Humildade', 1);
  INSERT INTO disciplines ("name", "termId") VALUES ('Planejamento', 2);
  INSERT INTO disciplines ("name", "termId") VALUES ('Autoconfiança', 3);
  
  INSERT INTO "teachersDisciplines" ("teacherId", "disciplineId") VALUES (1, 1);
  INSERT INTO "teachersDisciplines" ("teacherId", "disciplineId") VALUES (1, 2);
  INSERT INTO "teachersDisciplines" ("teacherId", "disciplineId") VALUES (1, 3); 
  INSERT INTO "teachersDisciplines" ("teacherId", "disciplineId") VALUES (2, 4);
  INSERT INTO "teachersDisciplines" ("teacherId", "disciplineId") VALUES (2, 5);
  INSERT INTO "teachersDisciplines" ("teacherId", "disciplineId") VALUES (2, 6);`;
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
