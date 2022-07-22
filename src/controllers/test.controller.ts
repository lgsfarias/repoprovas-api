import { Request, Response } from 'express';
import * as testService from '../services/test.service.js';
import {} from '../repositories/test.repository.js';
import { validateIfCategoryExist } from '../services/category.service.js';
import { validateIfTeacherExist } from '../services/teacher.service.js';
import { validateIfDisciplineExist } from '../services/discipline.service.js';
import { validateIfTeacherDisciplineExist } from '../services/teacher-discipline.service.js';

export const createTest = async (req: Request, res: Response) => {
  const { name, pdfUrl, categoryId, teacherId, disciplineId } = req.body;
  await validateIfCategoryExist(categoryId);
  await validateIfTeacherExist(teacherId);
  await validateIfDisciplineExist(disciplineId);
  const teacherDiscipline = await validateIfTeacherDisciplineExist(
    teacherId,
    disciplineId,
  );
  await testService.verifyIfTestExist({
    name,
    pdfUrl,
    categoryId,
    teacherDisciplineId: teacherDiscipline.id,
  });
  const test = await testService.create({
    name,
    pdfUrl,
    categoryId,
    teacherDisciplineId: teacherDiscipline.id,
  });
  res.status(201).json(test);
};

export const getTestsByTerm = async (req: Request, res: Response) => {
  const tests = await testService.getTestsByTerm();
  res.status(200).json(tests);
};

export const getTestsByTeacher = async (req: Request, res: Response) => {
  const tests = await testService.getTestsByTeacher();
  res.status(200).json(tests);
};
