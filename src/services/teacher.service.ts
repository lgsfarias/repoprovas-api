import * as teacherRepository from '../repositories/teacher.repository.js';
import AppError from '../utils/AppError.js';

export const validateIfTeacherExist = async (teacherId: number) => {
  const teacher = await teacherRepository.getById(teacherId);
  if (!teacher) {
    throw new AppError('Teacher not found', 400);
  }
};
