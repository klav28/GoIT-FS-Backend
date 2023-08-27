import Joi from "joi"

const boardSchema = Joi.object({
    title: Joi
        .string()
        .alphanum()
        .min(3)
        .max(60)
        .required()
        .messages({ 'any.required': "missing required title field" }),
    icon: Joi
        .string()
        .required()
        .messages({ 'any.required': "missing required icon field" }),
    background: Joi
        .string()
        .required()
        .messages({ 'any.required': "missing required background field" }),
})

const boardBackgroundSchema = Joi.object({
    background_xxl_src: Joi
        .string()
        .required()
        .messages({ 'any.required': "missing required name field" }),
    background_lg_src: Joi
        .string()
        .messages({ 'any.required': "missing required name field" }),
    background_sm_src: Joi
        .string()
        .messages({ 'any.required': "missing required name field" }),
    background_icon_src: Joi
        .string()
        .messages({ 'any.required': "missing required name field" }),
    background: Joi.any().required(),
})


export default { boardSchema, boardBackgroundSchema }