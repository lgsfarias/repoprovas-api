import { Request, Response } from 'express';
import * as testService from '../services/test.service.js';

export const createTest = async (req: Request, res: Response) => {
  const { name, pdfUrl, categoryId, teacherDisciplineId } = req.body;
  const test = await testService.create({
    name,
    pdfUrl,
    categoryId,
    teacherDisciplineId,
  });
  res.status(201).json(test);
};
