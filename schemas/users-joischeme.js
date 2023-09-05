import Joi from 'joi';

import { emailRegexp } from '../constants/user-constants.js';

const userCredentialsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .pattern(emailRegexp)
    .required()
    .email({ minDomainSegments: 2 })
    .messages({ 'any.required': 'missing required field email' }),
  password: Joi.string().min(6).required(),
});

const userLoginSchema = Joi.object({
  email: Joi.string()
    .pattern(emailRegexp)
    .required()
    .email({ minDomainSegments: 2 })
    .messages({ 'any.required': 'missing required field email' }),
  password: Joi.string().min(6).required(),
});

const usersUpdateTheme = Joi.object({
  theme: Joi.string().valid('Light', 'Dark', 'Violet'),
});

export default {
  userCredentialsSchema,
  userLoginSchema,
  usersUpdateTheme,
};
