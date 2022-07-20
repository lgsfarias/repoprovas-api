import { Router } from 'express';
import { createTest } from '../controllers/test.controller.js';
import validateSchemaMiddleware from '../middlewares/validateSchemaMiddleware.js';
import verifiTokenMiddleware from '../middlewares/verifyTokenMiddleware.js';
import * as schemas from '../schemas/index.js';

const testRouter = Router();

testRouter.post(
  '/',
  verifiTokenMiddleware,
  validateSchemaMiddleware(schemas.createTestSchema),
  createTest,
);

export default testRouter;
