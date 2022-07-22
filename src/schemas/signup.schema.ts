import Joi from 'joi';
import { CreateUserData } from '../repositories/user.repository';

type CreateUserDataWithConfirmPassword = CreateUserData & {
  confirmPassword: string;
};

const signupSchema = Joi.object<CreateUserDataWithConfirmPassword>({
  email: Joi.string().email().required(),
  password: Joi.string().min(10).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Passwords must match',
    'any.required': 'Confirm password is required',
  }),
}).required();

export default signupSchema;
