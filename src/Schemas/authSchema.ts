import joi from 'joi'

export const signinSchema = joi.object({

    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
    passwordConfirm: joi.required().valid(joi.ref("password"))
}) 

export const loginSchema = joi.object({

    email: joi.string().email().required(),
    password: joi.string().min(8).required()
})