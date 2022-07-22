import app from '../src/app.js';
import supertest from 'supertest';
import { faker } from '@faker-js/faker';
import prisma from '../src/config/database.js';

const EMAIL = faker.internet.email();
const PASSWORD = faker.internet.password(10);
const CONFIRM_PASSWORD = PASSWORD;

beforeEach(async () => {
  await prisma.$executeRaw`DELETE FROM users WHERE email = '${EMAIL}'`;
});

describe('POST /signup', () => {
  it('should return a 201 status code when signup successfully', async () => {
    const response = await supertest(app).post('/signup').send({
      email: EMAIL,
      password: PASSWORD,
      confirmPassword: CONFIRM_PASSWORD,
    });
    expect(response.status).toBe(201);
  });

  it('shold return a 400 status code when user already exists', async () => {
    await supertest(app).post('/signup').send({
      email: EMAIL,
      password: PASSWORD,
      confirmPassword: CONFIRM_PASSWORD,
    });
    const response = await supertest(app).post('/signup').send({
      email: EMAIL,
      password: PASSWORD,
      confirmPassword: CONFIRM_PASSWORD,
    });
    expect(response.status).toBe(400);
  });
});

describe('POST /signin', () => {
  it('should return a 200 status code when signin successfully', async () => {
    await supertest(app).post('/signup').send({
      email: EMAIL,
      password: PASSWORD,
      confirmPassword: CONFIRM_PASSWORD,
    });
    const response = await supertest(app).post('/signin').send({
      email: EMAIL,
      password: PASSWORD,
    });
    expect(response.status).toBe(200);
  });

  it('should return a 401 status code when user does not exists', async () => {
    const response = await supertest(app).post('/signin').send({
      email: 'wrong_email@gmail.com',
      password: PASSWORD,
    });
    expect(response.status).toBe(401);
  });

  it('should return a 401 status code when password is wrong', async () => {
    await supertest(app).post('/signup').send({
      email: EMAIL,
      password: PASSWORD,
    });
    const response = await supertest(app).post('/signin').send({
      email: EMAIL,
      password: 'wrong password',
    });
    expect(response.status).toBe(401);
  });

  it('should send a token', async () => {
    await supertest(app).post('/signup').send({
      email: EMAIL,
      password: PASSWORD,
    });
    const response = await supertest(app).post('/signin').send({
      email: EMAIL,
      password: PASSWORD,
    });
    expect(response.body.token).toBeDefined();
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
