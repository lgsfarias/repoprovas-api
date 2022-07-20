import Joi from 'joi';
import { CreateTestData } from '../repositories/test.repository';

const createTestSchema = Joi.object<CreateTestData>({
  name: Joi.string().required(),
  pdfUrl: Joi.string().uri().required(),
  categoryId: Joi.number().integer().positive().required(),
  teacherDisciplineId: Joi.number().integer().positive().required(),
}).required();

export default createTestSchema;
