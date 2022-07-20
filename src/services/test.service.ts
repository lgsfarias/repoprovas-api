import * as testRepository from '../repositories/test.repository.js';
import { CreateTestData } from '../repositories/test.repository.js';
import AppError from '../utils/AppError.js';

export const create = async (createTestData: CreateTestData) => {
  const test = await testRepository.create(createTestData);
  return test;
};

export const verifyIfTestExist = async (createTestData: CreateTestData) => {
  const test = await testRepository.getTestByAllAttributes(createTestData);
  if (test) {
    throw new AppError('Test already exists', 400);
  }
};
