import Joi from "joi";
import {emailRegexp} from "../constants/user-constants.js";

const needHelpSchema   = Joi.object({
    email: Joi.string()
        .pattern(emailRegexp)
        .required()
        .email({ minDomainSegments: 2 })
        .messages({ "any.required": "missing required field email" }),
    message: Joi.string().min(6).required(),
});

export default {
    needHelpSchema,
};
