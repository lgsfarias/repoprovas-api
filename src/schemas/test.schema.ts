import Joi from 'joi';
import { CreateTestData } from '../repositories/test.repository.js';

type CreateTestSchema = Omit<CreateTestData, 'teacherDisciplineId'> & {
  teacherId: number;
  disciplineId: number;
};

const createTestSchema = Joi.object<CreateTestSchema>({
  name: Joi.string().required(),
  pdfUrl: Joi.string().uri().required(),
  categoryId: Joi.number().integer().positive().required(),
  teacherId: Joi.number().integer().positive().required(),
  disciplineId: Joi.number().integer().positive().required(),
}).required();

export default createTestSchema;
