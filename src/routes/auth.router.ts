import { Router } from 'express';
import { signup, signin, checkAuth } from '../controllers/auth.controller.js';
import validateSchemaMiddleware from '../middlewares/validateSchemaMiddleware.js';
import verifiTokenMiddleware from '../middlewares/verifyTokenMiddleware.js';
import * as schemas from '../schemas/index.js';

const authRouter = Router();

authRouter.post('/signup', validateSchemaMiddleware(schemas.signup), signup);
authRouter.post('/signin', validateSchemaMiddleware(schemas.signin), signin);
authRouter.get('/check', verifiTokenMiddleware, checkAuth);

export default authRouter;
