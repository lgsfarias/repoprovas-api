import * as disciplineRepository from '../repositories/discipline.repository.js';
import AppError from '../utils/AppError.js';

export const validateIfDisciplineExist = async (disciplineId: number) => {
  const discipline = await disciplineRepository.getById(disciplineId);
  if (!discipline) {
    throw new AppError('Discipline not found', 400);
  }
};
