import { Test } from '@prisma/client';
import prisma from '../config/database.js';

export type CreateTestData = Omit<Test, 'id' | 'createdAt'>;

export const create = async (createTestData: CreateTestData) => {
  const test = await prisma.test.create({
    data: createTestData,
  });
  return test;
};
