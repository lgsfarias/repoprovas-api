import { teacherDiscipline } from '@prisma/client';
import * as teacherDisciplineRepository from '../repositories/teacher-discipline.repository.js';
import AppError from '../utils/AppError.js';

export const validateIfTeacherDisciplineExist = async (
  teacherId: number,
  disciplineId: number,
): Promise<teacherDiscipline> => {
  const teacherDiscipline =
    await teacherDisciplineRepository.getByTeacherAndDisciplineIds(
      teacherId,
      disciplineId,
    );
  if (!teacherDiscipline) {
    throw new AppError('No teacher teaching this discipline', 400);
  }

  return teacherDiscipline;
};
