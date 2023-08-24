import Joi from "joi";

import { emailRegexp } from "../constants/user-constants.js";

const usersSchema = Joi.object({
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2 })
    .pattern(emailRegexp)
    .messages({ "any.required": "missing fields" }),
  password: Joi.string().min(6).required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
});

const userEmailSchema = Joi.object({
  email: Joi.string()
    .pattern(emailRegexp)
    .required()
    .messages({ "any.required": "missing required field email" }),
});

const usersUpdateSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business"),
});

export default {
  usersSchema,
  usersUpdateSubscriptionSchema,
  userEmailSchema,
};
