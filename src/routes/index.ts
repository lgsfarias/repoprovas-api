import { Router } from 'express';
import authRouter from './auth.router.js';
import testRouter from './test.router.js';

const router = Router();

router.use('/', authRouter);
router.use('/tests', testRouter);

export default router;
