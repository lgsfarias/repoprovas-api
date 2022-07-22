import * as categoryRepository from '../repositories/category.repository.js';
import AppError from '../utils/AppError.js';

export const validateIfCategoryExist = async (categoryId: number) => {
  const category = await categoryRepository.getById(categoryId);
  if (!category) {
    throw new AppError('Category not found', 400);
  }
};
