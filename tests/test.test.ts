import app from '../src/app.js';
import supertest from 'supertest';
import { faker } from '@faker-js/faker';
import prisma from '../src/config/database.js';

const EMAIL = faker.internet.email();
const PASSWORD = faker.internet.password();

const TEST_NAME = faker.word.noun();
const PDF_URL = faker.image.imageUrl();
const CATEGORY_ID = faker.datatype.number({ min: 1, max: 3 });
const TEACHER_ID = faker.datatype.number({ min: 1, max: 2 });
const DISCIPLINE_ID = faker.datatype.number({ min: 1, max: 6 });
let TEACHER_DISCIPLINE_ID: number;
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

  const teacherDiscipline = await prisma.teacherDiscipline.findFirst({
    where: { AND: { teacherId: TEACHER_ID, disciplineId: DISCIPLINE_ID } },
  });

  if (teacherDiscipline) {
    TEACHER_DISCIPLINE_ID = teacherDiscipline.id;
  } else {
    TEACHER_DISCIPLINE_ID =
      await prisma.$executeRaw`INSERT INTO teachers_disciplines (teacher_id, discipline_id)
    VALUES (${TEACHER_ID}, ${DISCIPLINE_ID})
    RETURNING id`;
  }
});

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE tests;`;
});

describe('POST /tests', () => {
  it('should return a 201 status code when create test successfully', async () => {
    const response = await supertest(app)
      .post('/tests')
      .send({
        name: TEST_NAME,
        pdfUrl: PDF_URL,
        categoryId: CATEGORY_ID,
        teacherId: TEACHER_ID,
        disciplineId: DISCIPLINE_ID,
      })
      .set('Authorization', 'bearer ' + TOKEN);
    expect(response.status).toBe(201);

    const test = await prisma.test.findFirst({
      where: { name: TEST_NAME },
    });
    expect(test).toBeDefined();
  });

  it('should return a 400 status code when test already exists', async () => {
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

  it('should return a 400 status code when user has invalid token', async () => {
    const response = await supertest(app)
      .post('/tests')
      .send({
        name: TEST_NAME,
        pdfUrl: PDF_URL,
        categoryId: CATEGORY_ID,
        teacherDisciplineId: TEACHER_DISCIPLINE_ID,
      })
      .set('Authorization', `bearer wrong${TOKEN}`);
    expect(response.status).toBe(401);
  });
});

describe('GET /tests/byterms', () => {
  it('should return a 200 status code when get tests group by terms successfully', async () => {
    const response = await supertest(app)
      .get('/tests/byterms')
      .set('Authorization', `bearer ${TOKEN}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toHaveLength(6);
  });

  it('should return a 401 status code when user has invalid token', async () => {
    const response = await supertest(app)
      .get('/tests/byterms')
      .set('Authorization', `bearer wrong${TOKEN}`);
    expect(response.status).toBe(401);
  });
});

describe('GET /tests/byteachers', () => {
  it('should return a 200 status code when get tests group by teachers successfully', async () => {
    const response = await supertest(app)
      .get('/tests/byteachers')
      .set('Authorization', `bearer ${TOKEN}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toHaveLength(2);
  });

  it('should return a 401 status code when user has invalid token', async () => {
    const response = await supertest(app)
      .get('/tests/byteachers')
      .set('Authorization', `bearer wrong${TOKEN}`);
    expect(response.status).toBe(401);
  });
});
