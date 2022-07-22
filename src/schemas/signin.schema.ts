import Joi from 'joi';
import { CreateUserData } from '../repositories/user.repository.js';

const signinSchema = Joi.object<CreateUserData>({
  email: Joi.string().email().required(),
  password: Joi.string().min(10).required(),
}).required();

export default signinSchema;
