import * as testRepository from '../repositories/test.repository.js';
import { CreateTestData } from '../repositories/test.repository';
import AppError from '../utils/AppError';

export const create = async (createTestData: CreateTestData) => {
  const test = await testRepository.create(createTestData);
  return test;
};
