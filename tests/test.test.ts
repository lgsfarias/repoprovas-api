import app from '../src/app.js';
import supertest from 'supertest';
import { faker } from '@faker-js/faker';
import prisma from '../src/config/database.js';

const EMAIL = faker.internet.email();
const PASSWORD = faker.internet.password();

const TEST_NAME = faker.word.noun();
const PDF_URL = faker.image.imageUrl();
const CATEGORY_ID = faker.datatype.number({ min: 7, max: 9 });
const TEACHER_ID = faker.datatype.number({ min: 1, max: 2 });
const DISCIPLINE_ID = faker.datatype.number({ min: 1, max: 6 });
const TEACHER_DISCIPLINE_ID = faker.datatype.number({ min: 1, max: 2 });
let TOKEN: string;

beforeAll(async () => {
  await prisma.$executeRaw`DELETE FROM users 
    WHERE email = '${EMAIL}'`;
  await supertest(app).post('/signup').send({
    email: EMAIL,
    password: PASSWORD,
    confirmPassword: PASSWORD,
  });
  const response = await supertest(app).post('/signin').send({
    email: EMAIL,
    password: PASSWORD,
  });
  TOKEN = response.body.token;
});

beforeEach(async () => {
  await prisma.$executeRaw`DELETE FROM tests
  WHERE name = '${TEST_NAME}'
  AND "pdf_url" = '${PDF_URL}'
  AND "category_id" = ${CATEGORY_ID}
  AND "teacher_discipline_id" = ${TEACHER_DISCIPLINE_ID}`;
});

describe('POST /tests', () => {
  it('should return a 201 status code when create test successfully', async () => {
    const response = await supertest(app)
      .post('/tests')
      .send({
        name: TEST_NAME,
        pdfUrl: PDF_URL,
        categoryId: CATEGORY_ID,
        teacherDisciplineId: TEACHER_DISCIPLINE_ID,
      })
      .set('Authorization', 'bearer ' + TOKEN);
    expect(response.status).toBe(201);
  });

  it('verify if test already exists', async () => {
    await supertest(app).post('/tests').send({
      name: TEST_NAME,
      pdfUrl: PDF_URL,
      categoryId: CATEGORY_ID,
      teacherDisciplineId: TEACHER_DISCIPLINE_ID,
    });
    const response = await supertest(app)
      .post('/tests')
      .send({
        name: TEST_NAME,
        pdfUrl: PDF_URL,
        categoryId: CATEGORY_ID,
        teacherDisciplineId: TEACHER_DISCIPLINE_ID,
      })
      .set('Authorization', 'bearer ' + TOKEN);
    expect(response.status).toBe(400);
  });

  it('verify users authorization', async () => {
    const response = await supertest(app)
      .post('/tests')
      .send({
        name: TEST_NAME,
        pdfUrl: PDF_URL,
        categoryId: CATEGORY_ID,
        teacherDisciplineId: TEACHER_DISCIPLINE_ID,
      })
      .set('Authorization', 'bearer ' + 'wrong token');
    expect(response.status).toBe(401);
  });
});
