import { Request, Response } from 'express';
import * as testService from '../services/test.service.js';
import {} from '../repositories/test.repository.js';

export const createTest = async (req: Request, res: Response) => {
  const { name, pdfUrl, categoryId, teacherDisciplineId } = req.body;
  await testService.verifyIfTestExist({
    name,
    pdfUrl,
    categoryId,
    teacherDisciplineId,
  });
  const test = await testService.create({
    name,
    pdfUrl,
    categoryId,
    teacherDisciplineId,
  });
  res.status(201).json(test);
};
