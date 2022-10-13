import Joi from 'joi';

export const loginValidation = Joi.object({
  email: Joi.string().email().min(6).max(255),
  password: Joi.string().min(6).max(1024),
});

export const registerValidation = Joi.object({
  fullname: Joi.string().min(4).max(200).required(),
  username: Joi.string().min(2).max(20).required(),
  email: Joi.string().email().min(6).max(255).required(),
  institution: Joi.string(),
  password: Joi.string().min(6).max(1024).required(),
});
